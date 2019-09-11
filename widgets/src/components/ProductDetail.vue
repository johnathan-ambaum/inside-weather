<template>
  <div class="ProductDetail">
    <template v-if="screenWidth >= 1024">
      <product-gallery :images="productImages" />
      <h2 class="ProductDetail__Heading">Dimensions</h2>
      <div class="ProductDetail__Dimensions">
        <img
          v-for="image in dimensionImages"
          :key="image"
          :src="image">
      </div>
      <h2
        v-if="filters.contents"
        class="ProductDetail__Heading"
      >Details</h2>
      <template-block
        v-for="(block, index) in filters.contents"
        :key="index"
        :image="block.image_template"
        :heading="block.header_template"
        :text="block.content_template"
        :reverse="index % 2 !== 0" />
        <!-- <product-family
        v-if="'related_items' in product && product.related_items.length"
        id="families"
        class="ProductDetail__Family"
      /> -->
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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

  props: {
    category: { type: String, required: true },
    initialVariant: { type: Number, required: true },
    initialAttributes: { type: Object, required: true },
  },

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
  },

  created() {
    if (this.category) {
      this.updateCategory(this.category);
      this.pullFilter();
    }

    this.setVariantId(this.initialVariant);
    this.setSelectedOptions(this.initialAttributes);
    this.loadProductImages();
  },

  methods: {
    ...mapActions([
      'pullFilter',
      'loadProductImages',
    ]),

    ...mapMutations([
      'updateCategory',
      'setSelectedOptions',
      'setVariantId',
    ]),
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
    font-weight: 600;
    margin-bottom: 60px;
  }

  &__Dimensions {
    display: flex;
    margin-bottom: 80px;
  }
}
</style>
