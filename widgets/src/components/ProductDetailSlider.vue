<template>
  <div>

    <div
      :class="{ 'ProductDetailSlider--Shadow': hasShadow }"
      class="ProductDetailSlider"
    >
      <div class="ProductDetailSlider__Header">
        <div class="ProductDetailSlider__HeaderRow">
          <h1 class="ProductDetailSlider__Title ProductDetail__Title">
            {{ product.long_display_name }}
            <small class="ProductDetailSlider__Model">{{ product.model_number }}</small>
          </h1>
          <div>
            <div class="ProductDetailSlider__ShippingNote Product__ShippingNote">SHIPS FREE in {{ product.min_fulfillment_time }}-{{ product.max_fulfillment_time }} days</div>
            <div class="ProductDetailSlider__Price">${{ dollarPrice }}</div>
            <div class="ProductDetailSlider__Favorite">
              <span
                role="button"
                @click="favoriteCurrentProduct"
              >
                <font-awesome-icon :icon="favoriteIcon"/>
              </span>
            </div>
            <div class="ProductDetailSlider__Rating">
              &nbsp;
              <!--<font-awesome-icon-->
              <!--v-for="i in 4"-->
              <!--:key="i"-->
              <!--:icon="['fas', 'star']"-->
              <!--/><font-awesome-icon :icon="['fal', 'star']"/>-->
              <!--<span class="ProductDetailSlider__RatingCount">132 reviews</span>-->
            </div>
          </div>
        </div>
        <div class="ProductDetailSlider__HeaderRow">
          <div>
            <div
              class="ProductDetailSlider__PopupLink"
              @click="openPopup('details')"
            >Details</div>
            <div
              class="ProductDetailSlider__PopupLink"
              @click="openPopup('dimensions')"
            >Dimensions</div>
          </div>
        </div>
      </div>

      <div class="ProductDetailSlider__Container">
        <div
          ref="slider"
          class="ProductDetailSlider__Glide"
        >
          <div
            ref="track"
            :style="trackStyles"
            class="ProductDetailSlider__Track"
          >
            <div
              v-for="(image, index) in images"
              ref="slides"
              :key="index"
              class="ProductDetailSlider__Slide"
              @click="triggerZoom(index)"
            >
              <responsive-image
                :images="image"
                :scale="scale"
                default-size="medium"
                sizes="125vw"/>
            </div>
          </div>
        </div>
        <div class="ProductDetailSlider__Footer">
          <button
            class="ProductDetailSlider__Zoom"
            @click="showZoom = true"
          >
            <font-awesome-icon :icon="['fas', 'search-plus']" />
          </button>
          <div class="ProductDetailSlider__Nav">
            <div
              ref="navTrack"
              class="ProductDetailSlider__NavTrack"
            >
              <hr>
              <div
                ref="navBar"
                class="ProductDetailSlider__NavBar"
                @touchstart="startDragging"
                @touchmove="dragBar"
                @touchend="stopDragging"
              />
            </div>
          </div>
          <div class="ProductDetailSlider__Controls">
            <div class="ProductDetailSlider__Pagination">{{ currentIndex }}/{{ images.length }}</div>
            <div class="ProductDetailSlider__Arrows">
              <button @click="prevSlide">
                <font-awesome-icon :icon="['fal', 'arrow-left']"/>
              </button>
              <button @click="nextSlide">
                <font-awesome-icon :icon="['fal', 'arrow-right']"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div
          v-show="activePopup.length"
          :class="popupClasses"
          class="ProductDetailSlider__Popup"
        >
          <close-button
            size="50"
            class="ProductDetailSlider__PopupClose"
            @click="closePopup"
          />
          <product-description
            v-show="activePopup === 'details'"
            class="ProductDetailSlider__PopupBody"
          />
          <product-dimensions
            v-show="activePopup === 'dimensions'"
            class="ProductDetailSlider__PopupBody"
          />
        </div>
      </transition>
    </div>
    <transition name="fade">
      <zoom-gallery
        v-if="showZoom"
        :images="images"
        :is-mobile="true"
        :start-at="currentImage"
        @close="showZoom = false"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft, faArrowRight, faStar, faHeart as emptyHeart,
} from '@fortawesome/pro-light-svg-icons';
import { faSearchPlus, faHeart as filledHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ProductDescription from './ProductDescription.vue';
import ProductDimensions from './ProductDimensions.vue';
import ZoomGallery from './ZoomGallery.vue';
import ResponsiveImage from './ResponsiveImage.vue';
import CloseButton from './CloseButton.vue';
import productHandler from '../mixins/productHandler';
import screenMonitor from '../mixins/screenMonitor';
import { debounce } from '../util/helpers';

library.add(faArrowLeft, faArrowRight, faStar, emptyHeart, faSearchPlus, filledHeart);

export default {
  components: {
    ResponsiveImage,
    CloseButton,
    FontAwesomeIcon,
    ProductDescription,
    ProductDimensions,
    ZoomGallery,
  },

  mixins: [
    productHandler,
    screenMonitor,
  ],

  data() {
    return {
      currentIndex: 1,
      activePopup: '',
      isFixed: false,
      hasShadow: false,
      showZoom: false,
      currentImage: 0,
    };
  },

  computed: {
    ...mapState({
      product: state => state.activeProduct,
      filters: state => state.filters,
      favorites: state => state.favorites,
    }),

    dollarPrice() {
      return parseInt(this.product.price, 10);
    },

    trackStyles() {
      const size = this.isFixed ? 100 : 130;
      return {
        width: `${this.images.length * size}vw`,
      };
    },

    scale() {
      return this.filters.detailScale;
    },

    popupClasses() {
      return {
        'ProductDetailSlider__Popup--Blue': this.activePopup === 'details',
      };
    },

    isFavorite() {
      return this.product && this.favorites.includes(this.product.sku);
    },

    favoriteIcon() {
      if (this.isFavorite) {
        return ['fas', 'heart'];
      }

      return ['fal', 'heart'];
    },
  },

  watch: {
    activePopup(newName) {
      document.body.classList.toggle('popup-active', newName.length > 0);
    },

    isFixed: {
      immediate: true,
      handler(fixed) {
        document.body.classList.toggle('ProductDetailSlider--Fixed', fixed);
      },
    },
  },

  created() {
    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }
  },

  mounted() {
    const fixedStart = 40;

    const debouncedWindowScroll = debounce(() => {
      if (!this.isMobile) {
        return;
      }

      const needsFixing = window.pageYOffset > 10 && !this.isFixed;
      const needsReleasing = window.pageYOffset < 10 && this.isFixed;
      if (needsFixing || needsReleasing) {
        this.isFixed = needsFixing;
      } else if (!this.hasShadow && window.pageYOffset > fixedStart + 10) {
        this.hasShadow = true;
      } else if (this.hasShadow && window.pageYOffset <= fixedStart + 10) {
        this.hasShadow = false;
      }
    }, 10);

    window.addEventListener('scroll', debouncedWindowScroll);
    // fire once immediately in case we're already scrolled down
    debouncedWindowScroll();

    // map custom slider bar to element scroll position
    const debouncedSliderScroll = debounce(() => {
      if (this.dragging) {
        return;
      }

      const { sliderScrollWidth, barScrollWidth } = this.getSliderWidths();

      const left = this.$refs.slider.scrollLeft / sliderScrollWidth * barScrollWidth;
      this.$refs.navBar.style.left = `${left}px`;

      this.setIndexByPosition();
    }, 10);

    this.$refs.slider.addEventListener('scroll', debouncedSliderScroll);

    this.$on('hook:beforeDestroy', () => {
      this.$refs.slider.removeEventListener('scroll', debouncedSliderScroll);
    });
  },

  methods: {
    ...mapMutations([
      'toggleFavorite',
    ]),

    openPopup(name) {
      this.activePopup = name;
    },

    closePopup() {
      this.activePopup = '';
    },

    getSliderWidths() {
      const { width: barWidth } = this.$refs.navBar.getBoundingClientRect();
      const { width: barTrackWidth } = this.$refs.navTrack.getBoundingClientRect();
      const barScrollWidth = barTrackWidth - barWidth;

      const { width: trackWidth } = this.$refs.track.getBoundingClientRect();
      const sliderScrollWidth = trackWidth - this.screenWidth;

      return {
        barScrollWidth,
        sliderScrollWidth,
      };
    },

    setIndexByPosition() {
      const { width } = this.$refs.slides[0].getBoundingClientRect();
      const newIndex = Math.floor(this.$refs.slider.scrollLeft / width) + 1;
      if (this.currentIndex !== newIndex) {
        this.currentIndex = newIndex;
      }
    },

    startDragging(e) {
      if (e.targetTouches.length !== 1) {
        return;
      }

      this.dragging = true;
      this.startX = e.targetTouches[0].screenX;
      this.startScrollX = parseInt(this.$refs.navBar.style.left || 0, 10);
    },

    dragBar(e) {
      if (!this.dragging) {
        return;
      }

      if (e.targetTouches.length !== 1) {
        return;
      }

      const { sliderScrollWidth, barScrollWidth } = this.getSliderWidths();

      let navBarLeft = this.startScrollX + e.targetTouches[0].screenX - this.startX;
      if (navBarLeft < 0) {
        navBarLeft = 0;
      } else if (navBarLeft > barScrollWidth) {
        navBarLeft = barScrollWidth;
      }
      this.$refs.navBar.style.left = `${navBarLeft}px`;

      const sliderLeft = navBarLeft / barScrollWidth * sliderScrollWidth;
      this.$refs.slider.scroll(sliderLeft, 0);

      this.setIndexByPosition();
    },

    stopDragging() {
      this.dragging = false;
    },

    prevSlide() {
      if (this.currentIndex > 1) {
        this.goTo(this.currentIndex - 1);
      }
    },

    nextSlide() {
      if (this.currentIndex < this.images.length) {
        this.goTo(this.currentIndex + 1);
      }
    },

    goTo(index) {
      this.currentIndex = index;
      const newSlide = this.$refs.slides[index - 1];

      if (!newSlide) {
        return;
      }

      const { left, width } = newSlide.getBoundingClientRect();
      const offset = (width - this.screenWidth) / 2;

      window.$(this.$refs.slider).animate({
        scrollLeft: this.$refs.slider.scrollLeft + left + offset,
      }, 200);
    },

    favoriteCurrentProduct() {
      if (!this.product) {
        return;
      }
      this.toggleFavorite({
        product: this.product,
        customerId: this.customerId,
      });
    },

    triggerZoom(index) {
      this.currentImage = index;
      this.showZoom = true;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$bar-height: 10px;
$bar-width: 90px;
$fixed-duration-easing: .3s linear;

body.popup-active {
  overflow: hidden;
}

@include at-query($breakpoint-small) {

  body.ProductDetailSlider--Fixed {
    // 3vw spacing so add to cart row doesn't immediately scroll under slider
    padding-top: calc(75vw + 45px);

    &.MainNav--Small .MainNav {
      box-shadow: none;
    }

    main {
      margin-top: 0;
    }

    .Product__AddToCartRow {
      margin-top: 0;
    }
  }
}

.ProductDetailSlider {
  margin-top: $top-bar-height;
  padding-top: 18px;
  width: 100vw;

  & ~ * {
    opacity: 1;
    transition: opacity .3s;
  }

  &__Header {
    padding: 0 15px;
    position: absolute;
    width: 100%;
    z-index: 10;

    .ProductDetailSlider--Fixed & {
      top: $header-height-small;
    }
  }

  &__HeaderRow {
    align-items: center;
    display: flex;
    justify-content: space-between;

    & + & {
      margin-top: 25px;
    }

    & > * {
      flex: 0 1 auto;
    }
  }

  & &__ShippingNote {
    font-size: 10px;
    font-weight: 500;
    text-align: right;
  }

  &__Title {
    margin: 0;
    transition: font-size $fixed-duration-easing;
  }

  &__Model {
    display: block;
    font-size: 13px;
    font-weight: 700px;
    margin-top: 8px;
  }

  &__Price {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    text-align: right;
    transition: font-size $fixed-duration-easing;
  }

  &__Favorite {
    font-size: 18px;
    text-align: right;
  }

  &__Rating {
    font-size: 12px;
    letter-spacing: 0;
    white-space: nowrap;
  }

  &__RatingCount {
    font-size: 13px;
    font-weight: 500;
  }

  &__PopupLink {
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    margin: 0 40px 0 0;
    text-decoration: underline;
    text-transform: uppercase;
    user-select: none;
  }

  &__Popup {
    background: rgba(200, 209, 201, .95);
    height: 100vh;
    left: 0;
    overflow: auto;
    padding-top: 40px;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1001;

    &--Blue {
      background: rgba(173, 204, 208, .95);
    }

    #{&}Body {
      transform: none;

      * {
        background: none;
      }
    }
  }

  &__PopupClose {
    position: absolute;
    right: 0;
    top: 0;
  }

  &__Container {
    position: relative;
  }

  &__Glide {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__Track {
    display: flex;
    height: 130vw;
    overflow: hidden;
    transition: height $fixed-duration-easing;
  }

  &__Slide {
    height: 100%;
    width: 130vw;
  }

  &__Footer {
    bottom: 0;
    left: 0;
    padding: 0 20px;
    position: absolute;
    text-align: right;
    transition: bottom $fixed-duration-easing;
    width: 100%;
  }

  &__NavTrack {
    align-items: center;
    display: flex;
    height: $bar-height;
    position: relative;
    transition: height $fixed-duration-easing, width $fixed-duration-easing;
    width: 100%;

    .ProductDetailSlider--Fixed & {
      height: $bar-height / 2;
      margin: 0 auto;
      width: 60%;
    }

    hr {
      border-color: #202020;
      display: block;
      width: 100%;
    }
  }

  &__Zoom {
    background: none;
    border: none;
    font-size: 18px;
    margin-bottom: 5px;
    padding: 0;

    .ProductDetailSlider--Fixed & {
      display: none;
    }
  }

  &__Nav {
    position: relative;
  }

  &__NavBar {
    background: #202020;
    border-radius: 8px;
    bottom: 0;
    height: $bar-height;
    left: 0;
    margin: auto 0;
    position: absolute;
    top: 0;
    transition: height $fixed-duration-easing, width $fixed-duration-easing;
    width: $bar-width;

    .ProductDetailSlider--Fixed & {
      height: $bar-height / 2;
      width: $bar-width / 2;
    }
  }

  &__Controls {
    display: flex;
    font-size: 13px;
    font-weight: bold;
    justify-content: space-between;
    margin-top: 5px;
    max-height: 20px;
    overflow: hidden;
    transition: max-height $fixed-duration-easing;

    .ProductDetailSlider--Fixed & {
      max-height: 0;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: inherit;
      padding: 0;

      & + button {
        margin-left: 10px;
      }
    }

    & > * {
      flex: 0 0 auto;
    }
  }

  // fixed layout overrides
  @include at-query($breakpoint-small) {
    &--Fixed & {
      background: #fff;
      padding-top: 0;
      position: fixed;
      top: 0;
      z-index: 100;
    }

    &--Shadow {
      box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.125);
    }

    &--Fixed.js-drawer-open & {
      z-index: 20;
    }

    &--Fixed .hug-bottom & {
      bottom: 0;
      position: absolute;
      top: auto;
    }

    &--Fixed &__Header {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    &--Fixed &__HeaderRow {
      flex: 0 0 auto;
      margin: 0;

      &:first-child {
        order: 2;
      }
    }

    &--Fixed &__ShippingNote {
      display: none;
    }

    &--Fixed &__Title {
      display: none;
    }

    &--Fixed &__Price {
      font-size: 13px;
    }

    &--Fixed &__Rating {
      display: none;
    }

    &--Fixed &__Track {
      height: 75vw;
    }

    &--Fixed &__Slide {
      width: 100vw;
    }

    .ProductDetailSlider--Fixed &__Footer {
      bottom: 20px;
    }

    .popup-active & {
      z-index: 1000;
    }
  }
}
</style>
