<template>
  <div v-if="relatedProductsData.length" class="related-products__wrapper">
    <div class="related-products__main-title">
      Related Products
    </div>
    <div class="related-products__cards">
      <div class="related-products__card" v-for="relatedProduct in relatedProducts" :key="relatedProduct.title">
        <template v-if="relatedProduct.image.medium">
          <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image.medium[0]"></a>
        </template>
        <template v-else>
          <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image"></a>
        </template>
        <a :href="relatedProduct.url"><p class="related-products__title">{{relatedProduct.title}}</p></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import interpolator from '../mixins/interpolator';

export default {
  mixins: [
    interpolator,
  ],

  data() {
    return {
      relatedProducts: [],
    };
  },

  computed: {
    ...mapState({
      filters: state => state.filters,
      activeProduct: state => state.activeProduct,
      relatedProductsData: state => state.filters.related_products_data_v3 || [],
      selectedOptions: state => state.selectedOptions,
    }),
  },

  watch: {
    selectedOptions: {
      handler() {
        this.populateCurrentRelatedProducts();
      },
    },
  },

  mounted() {
    this.$bus.$on('customizer-close', this.populateCurrentRelatedProducts);
  },

  methods: {
    async populateCurrentRelatedProducts() {
      if (!this.relatedProductsData) {
        setTimeout(this.populateCurrentRelatedProducts, 200);
        return;
      }

      this.relatedProducts = await this.buildRelatedProducts(this.relatedProductsData, this.selectedOptions);
    },
  },
};
</script>
