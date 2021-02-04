<template>
  <div :class="{ 'ProductDetailSlider--Cylindo': cylindo }">
    <arrow-button
      v-if="!cylindo"
      class="ProductDetailSlider__Arrow"
      direction="left"
      @click.native="prevImage"
    />
    <arrow-button
      v-if="!cylindo"
      class="ProductDetailSlider__Arrow"
      direction="right"
      @click.native="nextImage"
    />
    <div class="ProductDetailSlider">
      <div
        v-show="cylindo"
        :id="cylindoId"
        class="cylindo-frame"
      />
      <div
        v-if="cylindo"
        class="Viewer__360Icons"
      >
        <div class="Viewer__RotateIcon">
          <img
            src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/360-rotate-ico.png?v=3363465804650087788"
            alt="Drag to rotate"
          >
          <span>Rotate</span>
        </div>
        <div v-show="showAR && !customizerActive" class="Viewer__ARIcon" @click.stop="triggerAR">
          <img
            src="https://cdn.shopify.com/s/files/1/2994/0144/files/ar-ico.svg?v=1605141835"
            alt="AR Button"
          >
          <span>View In AR</span>
        </div>
        <template v-if="isCustomer">
          <div v-show="customizerActive" class="Viewer__favoritesIcon" @click.stop="triggerFavorite">
            <font-awesome-icon :icon="favoriteIcon"/>
            <span>Favorite</span>
          </div>
        </template>
        <template v-else>
          <div v-show="customizerActive" class="Viewer__favoritesIcon" data-ajax-customer-onboard="true" >
            <font-awesome-icon :icon="favoriteIcon"/>
            <span>Favorite</span>
          </div>
        </template>
        <div
          class="Viewer__ZoomIcon"
          @click.stop="triggerZoom"
        >
          <img
            src="//cdn.insideweather.com/temp_icons/zoom-ico.png"
            alt="Click to zoom"
          >
          <span>Zoom</span>
        </div>
      </div>
      <div
        v-if="!cylindo"
        ref="slider"
        class="glide"
      >
        <div
          class="glide__track ProductDetailSlider__Track"
          data-glide-el="track"
        >
          <ul class="glide__slides ProductDetailSlider__Slides">
            <li
              v-for="(image, index) in productImages"
              :key="image.thumbnail"
              class="glide__slide ProductDetailSlider__Slide"
            >
              <responsive-image
                :images="image"
                @click.native="triggerZoom(index)"
              />
            </li>
          </ul>
        </div>
        <div class="ProductDetailSlider__Footer">
          <div
            class="glide__bullets ProductDetailSlider__Bullets"
            data-glide-el="controls[nav]"
          >
            <button
              v-for="(image, index) in productImages"
              :key="image.thumb"
              :data-glide-dir="`=${index}`"
              class="glide__bullet ProductDetailSlider__Bullet"
            />
          </div>
          <zoom-button
            v-if="isMobile"
            class="ProductDetailSlider__Zoom"
            @click.native.prevent="triggerZoom()"
          />
        </div>
      </div>
      <zoom-button
        v-if="!cylindo && !isMobile"
        class="ProductDetailSlider__Zoom"
        @click.native.prevent="triggerZoom()"
      />
    </div>
    <transition name="fade">
      <zoom-gallery
        v-if="!cylindo && showZoom"
        :images="productImages"
        :is-mobile="true"
        :start-at="currentImage"
        @close="showZoom = false"
      />
      <div
        v-show="cylindo"
        :id="`${cylindoId}-zoom`"
        :class="{ 'is-active': showZoom }"
        class="cylindo-zoom-target"
      >
        <close-button
          :size="32"
          stroke="semibold"
          class="ZoomGallery__Close"
          @click.native.capture.prevent="closeZoom()"
          @touchstart.native.capture.prevent="closeZoom()"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Glide, { Swipe, Controls } from '@glidejs/glide/dist/glide.modular.esm';
import ZoomGallery from './ZoomGallery.vue';
import ResponsiveImage from './ResponsiveImage.vue';
import ArrowButton from './ArrowButton.vue';
import ZoomButton from './ZoomButton.vue';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    ResponsiveImage,
    ArrowButton,
    ZoomButton,
    ZoomGallery,
    CloseButton,
    FontAwesomeIcon
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  props: {
    cylindo: { type: Boolean, default: false },
    cylindoId: { type: String, default: 'cylindo-secondary' },
    customizerActive: {type:Boolean, default:false},
    favoriteIcon: {type: Array, default: ['fal', 'heart']}
  },

  data() {
    return {
      showZoom: false,
      showAR: false,
      currentImage: 0,
      isCustomer: !!window.customerId
    };
  },

  computed: {
    ...mapState({
      productImages: state => state.productImages,
      filters: state => state.filters,
      favorites: state => state.favorites,
      cylindoViewers: state => state.cylindoViewers,
    }),

    viewer() {
      return this.cylindoViewers.find(viewer => viewer.containerID === this.cylindoId);
    },
  },

  watch: {
    productImages: {
      immediate: true,
      handler(newImages) {
        if (this.cylindo || !newImages || !newImages.length) {
          return;
        }

        if (this.glide) {
          this.glide.destroy();
        }

        this.$nextTick(() => {
          this.glide = new Glide(this.$refs.slider, {
            animationDuration: 200,
            gap: 0,
          });

          this.glide.mount({ Swipe, Controls });

          this.$on('hook:beforeDestroy', () => {
            this.glide.destroy();
          });
        });
      },
    },
  },

  mounted() {
    this.listenForZoom();
    this.listenForAR();
  },

  methods: {
    listenForZoom() {
      if (!this.viewer) {
        setTimeout(() => {
          this.listenForZoom();
        }, 200);
        return;
      }
      this.viewer.instance.on(this.viewer.instance.events.ZOOM_ENTER, () => {
        this.showZoom = true;
      });
      this.viewer.instance.on(this.viewer.instance.events.ZOOM_EXIT, () => {
        this.showZoom = false;
      });
    },

    listenForAR(){
      if (!this.viewer) {
        setTimeout(() => {
          this.listenForAR();
        }, 200);
        return;
      }
      this.viewer.instance.on(this.viewer.instance.events.AR_BUTTON_READY, () => {
        this.showAR = true;
      });
    },

    getCurrentIndex() {
      return this.glide.index;
    },

    triggerZoom(index) {
      if (this.cylindo) {
        this.viewer.instance.zoom(0.5, 0.5);
        return;
      }
      this.currentImage = index === null ? this.getCurrentIndex() : index;
      this.showZoom = true;
    },

    triggerAR(){
      var target = document.querySelector(".cylindo-button.cylindo-ar-button a");
      var touch = new Touch({
        identifier: new Date().getTime(),
        target: target,
      });
      var touchEvent = new TouchEvent("touchend", {
        touches: [touch],
        view: window,
        cancelable: true,
        bubbles: true,
      });
      target.dispatchEvent(touchEvent);
      document.querySelector(".cylindo-button.cylindo-ar-button a div.ar-glyph-background").click();
    },
    triggerFavorite(){
      this.$bus.$emit('detailSlider:favorite')
    },

    closeZoom() {
      if (this.cylindo) {
        this.viewer.instance.exitZoom();
      }
      this.showZoom = false;
    },

    prevImage() {
      this.glide.go('<');
    },

    nextImage() {
      this.glide.go('>');
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$tile-size-mobile: 100vw;
$tile-size-desktop: 100%;

.glide {
  overflow: hidden;
}

.ProductDetailSlider {
  margin-left: -$horizontal-wrapper-padding;
  margin-top: $top-bar-height;
  position: relative;
  width: 100vw;

  @include at-query($breakpoint-large) {
    bottom: 80px;
    left: 0;
    margin: auto;
    max-width: 775px;
    position: absolute;
    right: 0;
    top: 55px;
    width: 100%;
  }

  // CYLINDO
  &--Cylindo {
    .cylindo-frame {
      height: 100%;
    }

    .cylindo-drag-tooltip,
    .cylindo-drag-to-rotate-tooltip,
    .cylindo-icon-zoom-on {
      display: none !important;
    }

    .cylindo-thumbnail-wrapper.thumb-location-bottom.has-thumbs {
      bottom: 10px;
    }

    .cylindo-zoom-target {
      display: none;
      height: 100%;
      left: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99999;

      &.is-active {
        display: block;
      }

      .ZoomGallery__Close {
        z-index: 999999;
      }
    }

    .Viewer__360Icons {
      align-items: flex-end;
      bottom: 55px;
      display: flex;
      justify-content: space-between;
      padding: 0 18px;
      pointer-events: none;
      position: absolute;
      text-align: center;
      width: 100%;
      z-index: 10;

      @include at-query($breakpoint-large) {
        bottom: 25px;
        justify-content: center;
      }

      img, svg {
        display: inline-block;
        height: auto;
        width: 14px;

        @include at-query($breakpoint-large) {
          width: 16px;
        }
      }

      span {
        color: #202020;
        display: block;
        font-size: 9px;
        font-weight: 500;
        letter-spacing: .05em;

        @include at-query($breakpoint-large) {
          font-size: 12px;
        }
      }
    }

    .Viewer__RotateIcon {
      margin-right: 31px;
    }

    .Viewer__ZoomIcon {
      margin-left: 31px;
    }
    .Viewer__ARIcon img{
      width: 20px;
    }

    @include at-query($breakpoint-small) {
      .ProductDetailSlider {
        height: 100vw;
      }

      .cylindo-action-button-group.right {
        right: 4px;
        top: 32px;
      }
    }
    .Viewer__ARIcon,
    .Viewer__favoritesIcon,
    .Viewer__ZoomIcon {
      pointer-events: auto;
    }
    .Viewer__favoritesIcon{
      margin-top: 10px;
      @include at-query($breakpoint-large) {
        margin:0 41px;
      }
    }

  }
  // END CYLINDO

  &__Arrow {
    align-items: center;
    bottom: 0;
    display: flex;
    font-size: 30px;
    height: 40px;
    line-height: 1;
    margin: auto;
    padding: 0;
    position: absolute;
    top: 0;
    z-index: 100;

    &.left {
      left: 60px;
    }

    &.right {
      right: 60px;
    }

    @include at-query($breakpoint-small) {
      display: none;
    }
  }

  &__Track {
    height: $tile-size-mobile;

    @include at-query($breakpoint-large) {
      height: $tile-size-desktop;
    }
  }

  &__Slides {
    display: flex;
    list-style: none;
    margin: 0;
  }

  &__Slide {
    flex: 0 0 $tile-size-mobile;

    @include at-query($breakpoint-large) {
      flex-basis: auto;
    }
  }

  &__Footer {
    bottom: 50px;
    position: absolute;
    width: 100%;

    @media only screen and ($breakpoint-mlarge) and ($breakpoint-small) {
      bottom: 22vw;
    }

    @include at-query($breakpoint-large) {
      bottom: 80px;
    }
  }

  &__Bullets {
    align-items: center;
    bottom: 0;
    display: flex;
    font-size: 0;
    justify-content: center;
    left: 0;
    position: absolute;
    text-align: center;
    width: $tile-size-mobile;
    padding-left: 10px;

    @include at-query($breakpoint-large) {
      padding-left: 0;
      width: $tile-size-desktop;
    }
  }

  &__Bullet {
    border: 2px solid #202020;
    border-radius: 50%;
    height: 8px;
    margin: 2px;
    padding: 0;
    width: 8px;

    @include at-query($breakpoint-large) {
      margin: 2px 4px;
    }

    &.glide__bullet--active {
      background: #202020;
    }
  }

  &__Zoom {
    bottom: -4px;
    position: absolute;
    right: 15px;

    @include at-query($breakpoint-large) {
      bottom: 20px;
      right: -15px;
    }
  }
}
</style>
