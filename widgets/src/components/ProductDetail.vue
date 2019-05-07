<template>
  <div
    :class="{ 'is-zoomed': showZoom }"
    class="ProductDetail"
  >
    <slot v-if="!product"/>
    <template v-if="product">
      <template v-if="screenWidth >= 1024">
        <h1 class="ProductDetail__Title">
          {{ product.long_display_name }}
          <small class="ProductDetail__Model">{{ product.model_number }}</small>
        </h1>
        <div class="ProductDetail__Gallery">
          <div
            class="ProductDetail__FeaturedImage"
            @click="showZoom = true"
          >
            <responsive-image :images="images[galleryImage]" />
          </div>
          <button
            class="ProductDetail__GalleryZoom"
            @click="showZoom = true"
          >
            <font-awesome-icon :icon="['fas', 'search-plus']" />
            <span class="ProductDetail__GalleryZoomText">click to zoom</span>
          </button>
          <nav class="ProductDetail__GalleryNav">
            <div
              v-for="(image, index) in images"
              :key="index"
              :class="{ 'ProductDetail__GalleryItem--Active': galleryImage === index }"
              class="ProductDetail__GalleryItem"
              @click="swapImage(index)"
            >
              <responsive-image
                :images="image"
                class="ProductDetail__GalleryThumb"
                sizes="70px"
              />
            </div>
          </nav>
        </div>
        <product-description id="details"/>
        <product-dimensions
          id="dimensions"
          class="ProductDetail__Dimensions"
        />
        <product-family
          v-if="'related_items' in product && product.related_items !== []"
          id="families"
          class="ProductDetail__Family"
        />
      </template>
    </template>
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
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ZoomGallery from './ZoomGallery.vue';
import ProductDescription from './ProductDescription.vue';
import ProductDimensions from './ProductDimensions.vue';
import ProductFamily from './ProductFamily.vue';
import ResponsiveImage from './ResponsiveImage.vue';
import productHandler from '../mixins/productHandler';
import screenMonitor from '../mixins/screenMonitor';

library.add(faSearchPlus);

export default {
  components: {
    ResponsiveImage,
    ProductDescription,
    ProductDimensions,
    ProductFamily,
    FontAwesomeIcon,
    ZoomGallery,
  },

  mixins: [
    productHandler,
    screenMonitor,
  ],

  data() {
    return {
      galleryImage: 0,
      showZoom: false,
    };
  },

  computed: {
    ...mapState({
      product: state => state.activeProduct,
      filters: state => state.filters,
    }),

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

.ProductDetail {
  position: relative;

  &.is-zoomed + .ProductDetailGrid__Sidebar.is-fixed {
    display: none;
  }

  &, h1, h2, h3, p {
    font-family: $font-stack-avalon;
  }

  &__Title {
    font-family: $font-stack-avalon;
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    max-width: 60%;

    @include at-query($breakpoint-small) {
      .ProductDetailGrid__Main > & {
        margin-left: $gutter / 2;
      }
    }

    @include at-query($breakpoint-large) {
      font-size: 34px;
      font-weight: 700;
      left: 0;
      letter-spacing: .025em;
      line-height: 35px;
      max-width: 800px;
      position: absolute;
      top: 0;
      z-index: 10;
    }
  }

  &__Model {
    display: block;
    font-size: 18px;
    font-weight: 700;
    padding-top: 10px;
    letter-spacing: $normal-text-spacing;
  }

  &__Gallery {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    position: relative;
    top: -40px;
  }

  &__GalleryNav {
    align-items: center;
    bottom: 70px;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &__GalleryItem {
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

  &__GalleryThumb img {
    border: 1px solid #d4d0ca;

    .ProductDetail__GalleryItem--Active & {
      border: 2px solid #202020;
    }
  }

  &__FeaturedImage {
    cursor: zoom-in;
    flex: 0 1 775px;
  }

  &__GalleryZoom {
    align-items: center;
    bottom: 98px;
    color: #202020;
    display: flex;
    font-size: 18px;
    position: absolute;
    right: 0;
    z-index: 10;
  }

  &__GalleryZoomText {
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
