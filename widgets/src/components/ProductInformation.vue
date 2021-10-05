<template>
  <div class="ProductDetail">
    <swatch-browser v-if="!isDecor && isMobile && !disabled" />
    <div
      v-if="!isMobile && detailTabs.length"
      class="ProductDetail-information-tabs__wrapper"
    >
      <div class="ProductDetail-information-tabs__headings">
        <p
          v-for="tab in detailTabs"
          :key="tab.title"
          :class="{ 'ProductDetail-information-tabs__heading--active': tab.title === activeTab.title }"
          class="ProductDetail-information-tabs__heading"
          @click="openTab(tab)"
        ><span>{{ tab.title }}</span></p>
      </div>
      <div class="ProductDetail-information-tabs__bg">
        <div class="ProductDetail-information-tabs__tabs">
          <transition-group
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <div
              v-for="tab in detailTabs"
              v-if="tab.title === activeTab.title /* eslint-disable-line */"
              :key="tab.title"
              class="ProductDetail-information-tabs__tab"
            >
              <div
                v-if="tab.title === 'Dimensions'"
                class="ProductDetail-information-tabs__images-tab"
              >
                <img v-for="image in dimensionImages"
                  :key="image"
                  :src="image">
              </div>
              <p v-else>
                {{ interpolate(tab.template) }}
              </p>
            </div>
          </transition-group>
          <div
            v-if="!detailTabs.length"
            class="ProductDetail-information-tabs__tab"
          ><p>{{ interpolatedDescription }}</p></div>
        </div>
      </div>
    </div>
    <div
      v-if="isMobile && detailTabs.length"
      class="ProductDetail__Headings"
    >
      <template v-if="detailTabs.some(tab => tab.title === 'Dimensions')">
        <h2 class="ProductDetail__Heading">Dimensions</h2>
        <div class="ProductDetail__Dimensions">
          <img
            v-for="image in dimensionImages"
            :key="image"
            :src="image">
        </div>
      </template>
      <div class="ProductDetail__SplitBlocks">
        <div
          v-for="tab in detailTabs.filter(tab => tab.title !== 'Dimensions')"
          :key="tab.title"
        >
          <h2 class="ProductDetail__Heading">{{ tab.title }}</h2>
          <p>{{ interpolate(tab.template) }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="isDecor && interpolatedDescription.length"
      class="ProductDetail__Description --custom-container"
    >
      <p>{{ interpolatedDescription }}</p>
    </div>
    <related-products v-if="!disabled"></related-products>
    <swatch-browser v-if="!isDecor && !isMobile  && !disabled" />
    <div class="--custom-container desktop-spacing">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductGallery from './ProductGallery.vue';
import ZoomGallery from './ZoomGallery.vue';
import TemplateBlock from './TemplateBlock.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';
import SwatchBrowser from './SwatchBrowser.vue';
import RelatedProducts from './RelatedProducts.vue';
export default {
  components: {
    TemplateBlock,
    ProductGallery,
    ZoomGallery,
    SwatchBrowser,
    RelatedProducts
  },
  mixins: [
    screenMonitor,
    interpolator,
  ],
  data() {
    return {
      activeTab: {},
    };
  },
  computed: {
    ...mapState({
      filters: state => state.filters,
      productImages: state => state.productImages,
      detailTabs: state => state.filters.details || [],
      disabled: state => state.filters.disabled,
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
    interpolate() {
      return template => this.interpolateString(template);
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
  watch: {
    detailTabs: {
      immediate: true,
      handler(newTabs) {
        if (!this.activeTab.title && newTabs.length > 0) {
          this.openTab(newTabs[0]);
        }
      },
    },
  },
  methods: {
    openTab(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';
.ProductDetail {
  position: relative;
  .animated {
    animation-duration: .3s;
  }
  .animated.fadeInUp {
    animation-delay: .4s;
  }
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
      padding:0 18px;
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
    :last-child{
      margin-bottom: 0px;
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
      & > div:not(:last-child) {
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
  .ProductDetail-information-tabs__tabs {
    height: 100%;
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
    letter-spacing: 0.05em;
    color: #202020;
    font-family: Avalon;
    font-size: 24px;
    font-weight: 600;
    margin-top: 58px;
    margin-bottom:32px;
    padding: 0 18px;
    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin-bottom: 60px;
      padding: 0;
    }
  }
  .desktop-spacing{
    @include at-query($breakpoint-large) {
      margin-top:130px;
    }
  }
}
</style>