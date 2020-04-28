<template>
  <div class="ProductDetail">
    <swatch-browser v-if="!isDecor && isMobile" />
    <template v-if="!isDecor">

      <div class="ProductDetail-information-tabs__wrapper" v-if="!isMobile">
        <div class="ProductDetail-information-tabs__headings">
          <p class="ProductDetail-information-tabs__heading ProductDetail-information-tabs__heading--active" data-tab="0" @click = "openTab(0)"><span>Dimensions</span></p>
          <p class="ProductDetail-information-tabs__heading" data-tab="1" @click = "openTab(1)"><span>Assembly</span></p>
          <p class="ProductDetail-information-tabs__heading" data-tab="2" @click = "openTab(2)"><span>Shipping</span></p>
        </div>
        <div class="ProductDetail-information-tabs__bg">
          <div class="ProductDetail-information-tabs__tabs">
            <div class="ProductDetail-information-tabs__tab" data-tab="0">
              <div class="ProductDetail-information-tabs__images-tab">
                <img v-for="image in dimensionImages"
                  :key="image"
                  :src="image">
              </div>
              
            </div>
            <div class="ProductDetail-information-tabs__tab" style="display:none;" data-tab="1">
              <p>{{ interpolatedAssembly }}</p>
            </div>
            <div class="ProductDetail-information-tabs__tab" style="display:none;" data-tab="2">
              <p>{{ interpolatedShipping }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ProductDetail__Headings" v-if="isMobile">
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
      </div>
    </template>
    <related-products></related-products>
    <swatch-browser v-if="!isDecor && !isMobile" />
    <h2
      v-if="isDecor || filters.contents"
      class="ProductDetail__Heading-details"
    >Details</h2>
    <div
      v-if="isDecor"
      class="ProductDetail__Description --custom-container"
    >
      <p>{{ interpolatedDescription }}</p>
    </div>
    <div class="--custom-container">
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
    </div>
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
import SwatchBrowser from './SwatchBrowser.vue';
import RelatedProducts from './RelatedProducts.vue';

export default {
  components: {
    TemplateBlock,
    ProductFamily,
    ProductGallery,
    ZoomGallery,
    SwatchBrowser,
    RelatedProducts
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
  methods: {
    openTab(tab){
      if(! $(`.ProductDetail-information-tabs__tab[data-tab="${tab}"]`).is(':visible')){
        $(".ProductDetail-information-tabs__heading").removeClass('ProductDetail-information-tabs__heading--active');
        $(`.ProductDetail-information-tabs__heading[data-tab="${tab}"]`).addClass('ProductDetail-information-tabs__heading--active');
        $(".ProductDetail-information-tabs__tab").slideUp();
        $(`.ProductDetail-information-tabs__tab[data-tab="${tab}"]`).slideDown();
      }
    }
  }
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
    top: -40px;
  }
  &__Headings{
    margin-top:58px;
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
    margin-bottom: 58px;
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
    margin-bottom: 58px;
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
  .ProductDetail-information-tabs__heading{
    font-weight: 500;
    font-size:15px;
    letter-spacing: 0.08em;
    color: #202020;
    text-transform: uppercase;
  }
  .ProductDetail-information-tabs__heading--active{
    font-weight: 600;
  }
  @include at-query($breakpoint-small) {
    .\--custom-container {
      padding: 0;
    }
  }
  .ProductDetail__Heading-details{

  }
}
</style>