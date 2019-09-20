<template>
  <div>
    <div
      ref="slider"
      class="ProductDetailSlider glide"
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
          class="ProductDetailSlider__Zoom"
          @click.native.prevent="triggerZoom()"
        />
      </div>
    </div>
    <transition name="fade">
      <zoom-gallery
        v-if="showZoom"
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
import ZoomButton from './ZoomButton.vue';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

export default {
  components: {
    ResponsiveImage,
    ZoomButton,
    CloseButton,
    ZoomGallery,
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

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
        if (!newImages || !newImages.length) {
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
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$tile-size: 100vw;

.ProductDetailSlider {
  margin-left: -$horizontal-wrapper-padding;
  margin-top: $top-bar-height;
  overflow: hidden;
  position: relative;
  width: 100vw;

  &__Track {
    height: $tile-size;
  }

  &__Slides {
    display: flex;
    list-style: none;
    margin: 0;
  }

  &__Slide {
    flex: 0 0 $tile-size;
  }

  &__Footer {
    bottom: 50px;
    position: absolute;
    width: 100%;
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
    width: $tile-size;
    padding-left: 10px;
  }

  &__Bullet {
    border: 2px solid #212121;
    border-radius: 50%;
    height: 8px;
    margin: 2px;
    padding: 0;
    width: 8px;

    &.glide__bullet--active {
      background: #212121;
    }
  }

  &__Zoom {
    bottom: -4px;
    position: absolute;
    right: 15px;
  }
}
</style>
