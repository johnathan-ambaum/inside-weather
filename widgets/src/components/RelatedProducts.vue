<template>
  <div v-if="relatedProductsData.length" class="related-products__wrapper">
    <div class="related-products__main-title">
      Related Products
    </div>
    <div class="related-products__cards">
      <div class="related-products__card" v-for="relatedProduct in relatedProducts" :key="relatedProduct.title">
        <a :href="relatedProduct.url"><img class="related-products__image" v-if="relatedProduct.image" :src="relatedProduct.image"></a>
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
      relatedProductsData: state => state.filters.new_related_products_data || [], //REMOVE new_ FOR PRODUCTION
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

          const cylindo_sku = response.cylindo_sku;
          const baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/" + cylindo_sku + "/frames/1/" + cylindo_sku + ".jpg";
          var cylindoProductFeaturesArray = []
          for(var option in selectedOptions){
            var foundAttribute = attributes.find((attribute) => attribute.parameter === option);
            var foundValue = foundAttribute.values.find((value) => value.value === selectedOptions[option]);
            if(foundValue.cylindo_features){
              cylindoProductFeaturesArray = [...cylindoProductFeaturesArray, ...foundValue.cylindo_features];
            }
          }
          var cylindoFeatureKeyValues = cylindoProductFeaturesArray.map((feature, index) => {
            if(index % 2 !== 0 ){
              return false;
            }
            return cylindoProductFeaturesArray[index] + ':' + cylindoProductFeaturesArray[index +1 ];
          });
          cylindoFeatureKeyValues = cylindoFeatureKeyValues.filter(Boolean);
          const cylindoFeatureQueryString ="?feature=" + cylindoFeatureKeyValues.join("&feature=");
          const cylindoFeatureQueryStringURI = encodeURI(cylindoFeatureQueryString);
          const cylindoImageOptions = '&background=FFFFFF&encoding=jpg&smartCrop=false';
          relatedProduct.image = baseCylindoImageUrl + cylindoFeatureQueryStringURI + cylindoImageOptions;
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