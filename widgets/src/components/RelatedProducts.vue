<template>
  <div v-if="relatedProductsData.length" class="related-products__wrapper">
    <div class="related-products__main-title">
      Related Products
    </div>
    <div class="related-products__cards">
      <div class="related-products__card" v-for="relatedProduct in relatedProducts" :key="relatedProduct.title">
        <a :href="relatedProduct.url"><img class="related-products__image" v-if="relatedProduct.image.medium" :src="relatedProduct.image.medium[0]"></a>
        <a :href="relatedProduct.url"><p class="related-products__title">{{relatedProduct.title}}</p></a>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
import interpolator from '../mixins/interpolator';

const apiClient = new ApiClient();

export default {
  computed: {
    ...mapState({
      filters: state => state.filters,
      activeProduct: state => state.activeProduct,
      relatedProductsData: state => state.filters.related_products_data || [],
      selectedOptions: state => state.selectedOptions
    })
  },
  data() {
    return {
      relatedProducts:[]
    };
  },
  mixins: [
    interpolator
  ],
  methods:{
    populateCurrentRelatedProducts(){
      if(!this.relatedProductsData){
        setTimeout(handler, 200);
        return
      }

      this.relatedProducts = []; 
      this.relatedProductsData.slice(0,4).forEach(element => {
        let relatedProduct = {
          title: "",
          url: "",
          image: []
        };
        FilterStorage.getItem(element.product_type).then((response)=>{
          if (!response.templates) {
            return '';
          }
          const { template = '' } = response.templates.find(item => item.key === 'name') || {};
          const attributes = response.attributes;
          const selectedOptions = {};
          Object.entries(element.attributes).forEach(([parameter, value]) => {
            if (value !== null) {
              selectedOptions[parameter] = value;
            } else {
              selectedOptions[parameter] = this.selectedOptions[parameter];
            }
          });
          const productTitle = this.interpolateWithValues({template, attributes, selectedOptions, debug:false});
          relatedProduct.title = productTitle;
          const attributeString = Object.entries(selectedOptions).map(([param, value]) => `${param}:${value}`).join(',');
          const productURL = element.base_product_handle + '?attributes=' + attributeString;
          relatedProduct.url = productURL;
          
          apiClient.getImages({
            type: element.product_type,
            attributes: selectedOptions,
            debounce: false
          }).then((images) => {
            relatedProduct.image = images;
          });

          this.relatedProducts.push(relatedProduct);
          });           
      });
    }
  },
  mounted(){
    this.$bus.$on('customizer-close', this.populateCurrentRelatedProducts);
  },
  watch: {
    selectedOptions: {
      handler () {
        this.populateCurrentRelatedProducts();
      }
    }
  }
}
</script>