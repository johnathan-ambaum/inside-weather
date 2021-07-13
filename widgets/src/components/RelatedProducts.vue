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

      this.relatedProductsTemp = [];
      const RELATED_PRODUCTS_NUM = 6;
      this.relatedProductsData.slice(0,RELATED_PRODUCTS_NUM).forEach(async element => {
        let relatedProduct = {
          title: "",
          url: "",
          image: []
        };
        await FilterStorage.getItem(element.product_type).then((response)=>{
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
          for(var option in selectedOptions){
            var foundAttribute = attributes.find((attribute) => attribute.parameter === option);
            var foundValue = foundAttribute.values.find((value) => value.value === selectedOptions[option]);
            if(!foundValue){
              selectedOptions[option] = foundAttribute.values[0].value;
            }
          }
          const productTitle = this.interpolateWithValues({template, attributes, selectedOptions, debug:false});
          relatedProduct.title = productTitle;
          const attributeString = Object.entries(selectedOptions).map(([param, value]) => `${param}:${value}`).join(',');
          const productURL = element.base_product_handle + '?attributes=' + attributeString;
          relatedProduct.url = productURL;

          let cylindo_sku = response.cylindo_sku;
          if(!cylindo_sku){
            apiClient.getImages({
              type: element.product_type,
              attributes: selectedOptions,
              debounce: false
            }).then((images) => {
              relatedProduct.image = images;
            });
          }else{
            let productCodePriority = Infinity;
            Object.entries(selectedOptions).forEach(([parameter, value]) => {
              const { values } = attributes.find(att => att.parameter === parameter);
              const selected = values.find(item => item.value === value);
              const { cylindo_override_priority } = attributes.find(att => att.parameter === parameter);
              if(selected.cylindo_sku_override && cylindo_override_priority){
                if(cylindo_override_priority < productCodePriority){
                  cylindo_sku = selected.cylindo_sku_override;
                  productCodePriority = cylindo_override_priority;
                }
              }
            });

            const startFrame = response && response.cylindo_overrides && response.cylindo_overrides.startFrame ? response.cylindo_overrides.startFrame : 1;
            const baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/" + cylindo_sku + "/frames/" + startFrame +"/"+ cylindo_sku + ".jpg";
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
            relatedProduct.product_type = element.product_type;
          }
          this.relatedProductsTemp.push(relatedProduct);
        });
        this.relatedProductsSorted = this.relatedProductsTemp.sort((a,b) => {
          const A = a['product_type'];
          const B = b['product_type'];

          if(this.relatedProductsData.indexOf(A) > this.relatedProductsData.indexOf(B)){
            return 1;
          }
          return -1;
        });
        this.relatedProducts = this.relatedProductsSorted;
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
