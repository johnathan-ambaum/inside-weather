<template>
  <div
    :class="{ 'ProductGallery--Cylindo': cylindo }"
    class="ProductGallery"
  >
    <div
      class="ProductGallery__FeaturedImage"
      @click="showZoom = true"
    >
      <div
        v-show="cylindo"
        class="cylindo-wrap"
      >
        <div
          id="cylindo-main"
          class="cylindo-frame"
        />
      </div>
      <responsive-image
        v-if="!cylindo"
        :images="images[galleryImage] || {}"
        :initial-spinner="true"
      />
    </div>
    <nav
      v-if="!cylindo"
      class="ProductGallery__Nav"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'ProductGallery__Item--Active': galleryImage === index }"
        class="ProductGallery__Item"
        @click="swapImage(index)"
      >
        <responsive-image
          :images="image"
          class="ProductGallery__Thumb"
          sizes="70px"
        />
      </div>
      <zoom-button
        class="ProductGallery__Zoom"
        @click.native.prevent="showZoom = true"
      />
    </nav>
    <transition name="fade">
      <zoom-gallery
        v-if="!cylindo && showZoom"
        :images="images"
        :start-at="galleryImage"
        @close="showZoom = false"
      />
    </transition>
  </div>
</template>

<script>
import ResponsiveImage from './ResponsiveImage.vue';
import ZoomButton from './ZoomButton.vue';
import ZoomGallery from './ZoomGallery.vue';

export default {
  components: {
    ResponsiveImage,
    ZoomButton,
    ZoomGallery,
  },

  props: {
    images: { type: Array, default: () => [] },
    cylindo: { type: Boolean, default: false },
  },

  data() {
    return {
      galleryImage: 0,
      showZoom: false,
    };
  },

  methods: {
    swapImage(index) {
      this.galleryImage = index;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductGallery {
  display: flex;
  justify-content: center;
  position: relative;
  top: -40px;

  @include at-query($breakpoint-large) {
    margin-bottom: 30px;
  }

  // CYLINDO
  &--Cylindo {
    .cylindo-viewer-container {
      z-index: 0;
    }

    .cylindo-wrap {
      height: 0;
      padding-top: 100%;
      position: relative;
      width: 100%;
    }

    .cylindo-frame {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .cylindo-action-button-group {
      &.left, &.right {
        top: 50px;
      }
    }

    .cylindo-drag-tooltip.cylindo-drag-to-rotate-tooltip {
      bottom: 120px;
    }

    .cylindo-thumbnail-wrapper.thumb-location-bottom.has-thumbs {
      bottom: 120px;
    }
  }
  // END CYLINDO

  &__FeaturedImage {
    cursor: zoom-in;
    flex: 0 1 775px;
  }

  &__Nav {
    align-items: center;
    bottom: 70px;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &__Item {
    border: 1px solid transparent;
    cursor: pointer;
    flex: 0 1 74px;

    & + & {
      margin-left: 20px;
    }

    &--Active {
      border-color: #202020;
    }
  }

  &__Thumb img {
    border: 1px solid #D4D0CA;
  }

  &__Zoom {
    margin-left: 24px;
  }
}
</style>
