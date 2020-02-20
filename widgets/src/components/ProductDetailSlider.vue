<template>
  <div>
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
        v-if="cylindo"
        id="cylindo-viewer"
      />
      <div
        v-else
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
                :initial-spinner="true"
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
        v-if="!isMobile"
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
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

export default {
  components: {
    ResponsiveImage,
    ArrowButton,
    ZoomButton,
    ZoomGallery,
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  props: {
    cylindo: { type: Boolean, default: false },
  },

  data() {
    return {
      showZoom: false,
      currentImage: 0,
    };
  },

  computed: {
    ...mapState({
      productImages: state => state.productImages,
      filters: state => state.filters,
      favorites: state => state.favorites,
    }),
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

  methods: {
    getCurrentIndex() {
      return this.glide.index;
    },

    triggerZoom(index) {
      this.currentImage = index === null ? this.getCurrentIndex() : index;
      this.showZoom = true;
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
