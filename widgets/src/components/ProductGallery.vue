<template>
  <div class="ProductGallery">
    <div
      class="ProductGallery__FeaturedImage"
      @click="showZoom = true"
    >
      <responsive-image
        :images="images[galleryImage] || {}"
        :initial-spinner="true"
      />
    </div>
    <nav class="ProductGallery__Nav">
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
        v-if="showZoom"
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
    border: .25px solid #202020;
  }

  &__Zoom {
    margin-left: 24px;
  }
}
</style>
