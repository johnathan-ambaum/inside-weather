<template>
  <div class="ProductDetail">
    <product-gallery
      v-if="!isMobile"
      :images="productImages"
      :cylindo="useCylindo"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductGallery from './ProductGallery.vue';
import ZoomGallery from './ZoomGallery.vue';
import TemplateBlock from './TemplateBlock.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

export default {
  components: {
    TemplateBlock,
    ProductGallery,
    ZoomGallery,
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  computed: {
    ...mapState({
      filters: state => state.filters,
      productImages: state => state.productImages,
    }),

    useCylindo() {
      if (!this.filters) {
        return false;
      }
      // double ! to cast truthy/falsy values to boolean
      return !!this.filters.cylindo_sku;
    },

    isDecor() {
      return this.filters.configurator_type === 'small';
    },

    dimensionImages() {
      const images = [];

      if (!this.filters.templates) {
        return images;
      }

      let image;
      image = this.filters.templates.find(item => item.key === 'dimensions_image_1');
      image = this.interpolateString(image.template || '');
      if (image) {
        images.push(image);
      }
      image = this.filters.templates.find(item => item.key === 'dimensions_image_2');
      image = this.interpolateString(image.template || '');
      if (image) {
        images.push(image);
      }

      return images;
    },

    interpolatedAssembly() {
      if (!this.filters.templates) {
        return '';
      }

      const { template } = this.filters.templates.find(item => item.key === 'assembly') || { template: '' };
      return this.interpolateString(template);
    },

    interpolatedShipping() {
      if (!this.filters.templates) {
        return '';
      }

      const { template } = this.filters.templates.find(item => item.key === 'shipping') || { template: '' };
      return this.interpolateString(template);
    },

    interpolatedDescription() {
      if (!this.filters.templates) {
        return '';
      }

      const { template } = this.filters.templates.find(item => item.key === 'description') || { template: '' };
      return this.interpolateString(template);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductDetail {
  position: relative;

  .ProductCustomizer--Simple & {
    padding-bottom: 80px;
  }

  &, h1, h2, h3, p {
    font-family: $font-stack-avalon;
  }

  .ProductGallery {
    top: -30px;

    &--Cylindo {
      justify-content: flex-start;
      margin-left: 110px;

      @include at-query($breakpoint-large) {
        .ProductGallery__FeaturedImage {
          flex: 0 1 775px;
        }
      }
    }
  }

  &__Heading {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 45px;

    @include at-query($breakpoint-small) {
      padding: 0 $horizontal-wrapper-padding;
    }

    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin-bottom: 60px;
    }
  }

  &__Description {
    &, p {
      color: #202020;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .035em;
      line-height: 16px;

      @include at-query($breakpoint-large) {
        font-family: $font-stack-avalon;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
      }
    }

    @include at-query($breakpoint-small) {
      padding: 0 $horizontal-wrapper-padding;
    }
  }

  &__Dimensions {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    img {
      flex: 0 0 auto;
      margin-bottom: 50px;
    }

    @include at-query($breakpoint-small) {
      padding: 0 $horizontal-wrapper-padding;
    }

    @include at-query($breakpoint-large) {
      flex-direction: row;

      img + img {
        margin-left: 40px;
      }
    }
  }

  &__SplitBlocks {
    display: flex;
    margin-bottom: 80px;

    @include at-query($breakpoint-small) {
      flex-direction: column;

      & > div:first-child {
        margin-bottom: 50px;
      }
    }

    & > div {
      @include at-query($breakpoint-large) {
        flex: 0 0 50%;
        padding-right: 10%;

        &:last-child {
          padding-right: 5%;
        }
      }
    }

    h2 {
      margin-bottom: 20px;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .025em;
      line-height: 18px;
      margin: 0;

      @include at-query($breakpoint-small) {
        padding: 0 $horizontal-wrapper-padding;
      }

      @include at-query($breakpoint-large) {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>
