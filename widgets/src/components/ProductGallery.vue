<template>
  <div class="ProductGallery">
    <div
      class="ProductGallery__FeaturedImage"
      @click="showZoom = true"
    >
      <responsive-image :images="images[galleryImage] || {}" />
    </div>
    <button
      class="ProductGallery__Zoom"
      @click.prevent="showZoom = true"
    >
      <font-awesome-icon :icon="['fas', 'search-plus']" />
      <span class="ProductGallery__ZoomText">click to zoom</span>
    </button>
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ResponsiveImage from './ResponsiveImage.vue';
import ZoomGallery from './ZoomGallery.vue';

library.add(faSearchPlus);

export default {
  components: {
    ResponsiveImage,
    ZoomGallery,
    FontAwesomeIcon,
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

  computed: {
    scale() {
      return this.filters.detailScale;
    },
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
  margin-bottom: 30px;
  position: relative;
  top: -40px;

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
    border: 1px solid #d4d0ca;
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
    border: 1px solid #d4d0ca;

    .ProductDetail__Item--Active & {
      border: 2px solid #202020;
    }
  }

  &__Zoom {
    align-items: center;
    bottom: 98px;
    color: #202020;
    display: flex;
    font-size: 18px;
    position: absolute;
    right: 10%;
    z-index: 10;
  }

  &__ZoomText {
    font-family: $font-stack-roboto;
    font-size: 10px;
    margin-left: 8px;
    letter-spacing: $normal-text-spacing;

    @include at-query($breakpoint-small) {
      display: none;
    }
  }
}
</style>
