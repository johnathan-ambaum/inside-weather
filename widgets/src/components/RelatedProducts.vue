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
import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
import interpolator from '../mixins/interpolator';

const apiClient = new ApiClient();

export default {
  computed: {
    ...mapState({
      filters: state => state.filters,
      activeProduct: state => state.activeProduct,
      relatedProductsData: state => state.filters.related_products_data_v3 || [],
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
    buildSelectedOptions(relatedProductAttributes, filterStorageAttributes){
      const selectedOptions = {};
      Object.entries(relatedProductAttributes).forEach(([parameter, matchObj]) => {
        if(matchObj.value){//having a defined value overrules everything
          selectedOptions[parameter] = matchObj.value;
          return
        }

        if(matchObj.matches === parameter){// if the match object and the parameter are the same, respond normally by matching like parameters
          if(this.selectedOptions[parameter]){
            let foundAttribute = filterStorageAttributes.find((attribute) => attribute.parameter === parameter);
            let foundValue = matchObj.value ? matchObj : foundAttribute.values.find((value) => value.value === this.selectedOptions[parameter]);
            if(foundValue){
              selectedOptions[parameter] = this.selectedOptions[parameter];
              return
            }

            selectedOptions[parameter] = foundAttribute.values[0].value;
            return
          }

          let foundAttribute = filterStorageAttributes.find((attribute) => attribute.parameter === parameter);
          selectedOptions[parameter] = foundAttribute.values[0].value;
          return
        }

        // if the match object and the parameter are not the same, match the specified parameters
        if(this.selectedOptions[matchObj.matches]){
          selectedOptions[parameter] = this.selectedOptions[matchObj.matches];
          return
        }

        // if this.selectedOptions[matchObj.matches] is not true, this indicates that the current product does not
        // have a matching attribute compared to the one defined in the cms. ie admin user error.
        // example: matches: "blueberry_sprinkles" on sofas
        // if this happens we will return nothing

      });

      return selectedOptions;
    },

    createCylindoImageUrl(selectedOptions, relatedProductFilterDefs){
      let productCodePriority = Infinity;
      let cylindo_sku = relatedProductFilterDefs.cylindo_sku;
      Object.entries(selectedOptions).forEach(([parameter, value]) => {// choose the cylindo_sku of the prodcut with the highest priority
        const { values } = relatedProductFilterDefs.attributes.find(att => att.parameter === parameter);
        const selected = values.find(item => item.value === value);
        const { cylindo_override_priority } = relatedProductFilterDefs.attributes.find(att => att.parameter === parameter);
        if((selected.cylindo_sku_override && cylindo_override_priority) && cylindo_override_priority < productCodePriority){// if an override and a priority exist, AND the priority is higher
          cylindo_sku = selected.cylindo_sku_override;
          productCodePriority = cylindo_override_priority;
        }
      });

      // if the startFrame exists, use it, otherwise default to first frame, 1.
      const startFrame = relatedProductFilterDefs && relatedProductFilterDefs.cylindo_overrides && relatedProductFilterDefs.cylindo_overrides.startFrame ? relatedProductFilterDefs.cylindo_overrides.startFrame : 1;
      const baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/" + cylindo_sku + "/frames/" + startFrame +"/"+ cylindo_sku + ".jpg";
      let cylindoProductFeaturesArray = []
      for(let option in selectedOptions){
        let foundAttribute = relatedProductFilterDefs.attributes.find((attribute) => attribute.parameter === option);
        let foundValue = foundAttribute.values.find((value) => value.value === selectedOptions[option]);
        if(foundValue.cylindo_features){
          cylindoProductFeaturesArray = [...cylindoProductFeaturesArray, ...foundValue.cylindo_features];
        }
      }
      let cylindoFeatureKeyValues = cylindoProductFeaturesArray.map((feature, index) => {
        if(index % 2 !== 0 ){
          return false;
        }
        return cylindoProductFeaturesArray[index] + ':' + cylindoProductFeaturesArray[index +1 ];
      });
      cylindoFeatureKeyValues = cylindoFeatureKeyValues.filter(Boolean);
      const cylindoFeatureQueryString ="?feature=" + cylindoFeatureKeyValues.join("&feature=");
      const cylindoFeatureQueryStringURI = encodeURI(cylindoFeatureQueryString);
      const cylindoImageOptions = '&background=FFFFFF&encoding=jpg&smartCrop=false';

      return baseCylindoImageUrl + cylindoFeatureQueryStringURI + cylindoImageOptions;
    },

    populateCurrentRelatedProducts(){
      if(!this.relatedProductsData){
        setTimeout(handler, 200);
        return
      }

      this.relatedProductsTemp = [];
      this.relatedProductsData.forEach(async relatedProductData => {

        let relatedProduct = {
          title: "",
          url: "",
          image: [],
          product_type: ""
        };

        await FilterStorage.getItem(relatedProductData.product_type).then((response)=>{
          if (!response.templates) {
            return '';
          }

          const attributes = response.attributes;
          const selectedOptions = this.buildSelectedOptions(relatedProductData.attributes, attributes);

          const { template = '' } = response.templates.find(item => item.key === 'name') || {};
          const attributeString = Object.entries(selectedOptions).map(([param, value]) => `${param}:${value}`).join(',');
          relatedProduct.title = this.interpolateWithValues({template, attributes, selectedOptions, debug:false});
          relatedProduct.url = relatedProductData.base_product_handle + '?attributes=' + attributeString;

          let cylindo_sku = response.cylindo_sku;
          if(!cylindo_sku){
            apiClient.getImages({
              type: relatedProductData.product_type,
              attributes: selectedOptions,
              debounce: false
            }).then((images) => {
              relatedProduct.image = images;
              relatedProduct.product_type = relatedProductData.product_type;
            });

          }else{
            relatedProduct.image = this.createCylindoImageUrl(selectedOptions, response);
            relatedProduct.product_type = relatedProductData.product_type;
          }

          this.relatedProductsTemp.push(relatedProduct);
        });

        this.relatedProductsTemp.sort((a,b) => {
          const A = a['product_type'];
          const B = b['product_type'];

          if(this.relatedProductsData.indexOf(A) > this.relatedProductsData.indexOf(B)){
            return 1;
          }
          return -1;
        });

        this.relatedProducts = this.relatedProductsTemp;

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
