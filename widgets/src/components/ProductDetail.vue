<template>
  <div class="ProductDetail">
    <product-gallery
      v-if="!isMobile"
      :images="productImages"
    />
    <h2 class="ProductDetail__Heading">Dimensions</h2>
    <div class="ProductDetail__Dimensions">
      <img
        v-for="image in dimensionImages"
        :key="image"
        :src="image">
    </div>
    <div class="ProductDetail__SplitBlocks">
      <div>
        <h2 class="ProductDetail__Heading">Assembly</h2>
        <p>{{ interpolatedAssembly }}</p>
      </div>
      <div>
        <h2 class="ProductDetail__Heading">Shipping</h2>
        <p>{{ interpolatedShipping }}</p>
      </div>
    </div>
    <h2
      v-if="filters.contents"
      class="ProductDetail__Heading"
    >Details</h2>
    <template-block
      v-for="(block, index) in filters.contents"
      :key="index"
      :image="block.image_template"
      :mobile-image="block.mobile_image_template"
      :heading="block.header_template"
      :text="block.content_template"
      :reverse="index % 2 !== 0"
      :is-mobile="isMobile"
    />
      <!-- <product-family
      v-if="'related_items' in product && product.related_items.length"
      id="families"
      class="ProductDetail__Family"
    /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductGallery from './ProductGallery.vue';
import ZoomGallery from './ZoomGallery.vue';
import TemplateBlock from './TemplateBlock.vue';
import ProductFamily from './ProductFamily.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

export default {
  components: {
    TemplateBlock,
    ProductFamily,
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
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductDetail {
  position: relative;

  &, h1, h2, h3, p {
    font-family: $font-stack-avalon;
  }

  .ProductGallery {
    top: -40px;
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

  &__Dimensions {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;

    @include at-query($breakpoint-small) {
      padding: 0 $horizontal-wrapper-padding;

      img + img {
        margin-top: 50px;
      }
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
