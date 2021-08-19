<template>
  <div v-if="open" class="UpsellModal">
    <div class="UpsellModal__inner">
      <div class="UpsellModal__header">
        <div class="UpsellModal__close" @click="close">No thanks <close-button></close-button></div>
        <div class="UpsellModal__title">{{ upsell_products_data_v1.title }}</div>
        <div class="UpsellModal__subtitle">{{ upsell_products_data_v1.subtitle }}</div>
      </div>
      <div class="UpsellModal__content">
        <div class="UpsellModal__items">
          <!-- loop -->
          <div class="UpsellModal__item" v-for="upsellProduct in upsellProducts" :key="upsellProduct.title">
            <div class="UpsellModal__item-image">
              <img :src="upsellProduct.image" alt="Product Image">
            </div>
            <div class="UpsellModal__item-title">{{ upsellProduct.title }}</div>
            <div class="UpsellModal__item-price">{{ upsellProduct.price }}</div>
            <div class="UpsellModal__item-customize UpsellModal__btn-clear">CUSTOMIZE</div>
            <div class="UpsellModal__item-atc UpsellModal__btn-black">ADD TO CART</div>
          </div>
        </div>
      </div>
      <div class="UpsellModal__footer">
        <div class="UpsellModal__footer-image">
          <img :src="upsell_products_data_v1.footer_image" :alt="upsell_products_data_v1.footer_alt_text">
        </div>
        <div class="UpsellModal__footer-content">
          <div class="UpsellModal__footer-title">{{ upsell_products_data_v1.footer_title }}</div>
          <a class="UpsellModal__footer-cta UpsellModal__btn-black" :href="upsell_products_data_v1.button_url">{{ upsell_products_data_v1.button_text }}</a>
          <div v-if="isMobile" class="UpsellModal__footer-close" @click="close">No thanks</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
import interpolator from '../mixins/interpolator';

const apiClient = new ApiClient();

export default {
  components: { CloseButton },
  computed: {
    ...mapState({
      // upsellProductsData: state => state.filters.upsell_products_data_v1 || [],
      selectedOptions: state => state.selectedOptions
    })
  },
  data() {
    return {
      upsellProducts:[],
      open: true,//change, true only for dev
      upsell_products_data_v1:{//example object, get this from filters
        "title":"Add Throw Pillows?",
        "subtitle":"Add a throw pillow to your sofa! Match your sofa upholstry or choose from 100+ fabrics and leathers",
        "footer_image":"https://i.picsum.photos/id/1071/500/300.jpg?hmac=xQJZVvzAmoi_RxNTel2Q9m28smnO5p__SJzN56_TRjk",
        "footer_alt_text":"car",
        "footer_title":"Want to customize your own?",
        "button_text":"SHOP ALL PILLOWS",
        "button_url":"https://insideweather.com/pages/sofas",
        "upsell_products":[
            {
              "product_type":"Custom Sectional",
              "base_product_handle":"custom-sectional-base",
              "attributes":{
                  "arm_style":{
                    "matches":"arm_style",
                    "value":null
                  },
                  "color_name":{
                    "matches":"color_name",
                    "value":null
                  },
                  "configuration":{
                    "matches":"configuration",
                    "value":"classic-classic"
                  },
                  "pillow_cushion_shape":{
                    "matches":"pillow_cushion_shape",
                    "value":null
                  },
                  "pillow_detail":{
                    "matches":"pillow_detail",
                    "value":null
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":null
                  },
                  "accent_pillow":{
                    "matches":"accent_pillow",
                    "value":null
                  },
                  "custom_comfort":{
                    "matches":"custom_comfort",
                    "value":null
                  }
              }
            },
            {
              "product_type":"Custom Sofette",
              "base_product_handle":"custom-sofette-base",
              "attributes":{
                  "arm_style":{
                    "matches":"arm_style",
                    "value":null
                  },
                  "color_name":{
                    "matches":"color_name",
                    "value":null
                  },
                  "configuration":{
                    "matches":"configuration",
                    "value":"classic-classic"
                  },
                  "pillow_cushion_shape":{
                    "matches":"pillow_cushion_shape",
                    "value":null
                  },
                  "pillow_detail":{
                    "matches":"pillow_detail",
                    "value":null
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":null
                  },
                  "accent_pillow":{
                    "matches":"accent_pillow",
                    "value":null
                  },
                  "custom_comfort":{
                    "matches":"custom_comfort",
                    "value":null
                  }
              }
            },
            {
              "product_type":"Custom Sofette Sectional",
              "base_product_handle":"custom-sofette-sectional-base",
              "attributes":{
                  "arm_style":{
                    "matches":"arm_style",
                    "value":null
                  },
                  "color_name":{
                    "matches":"color_name",
                    "value":null
                  },
                  "configuration":{
                    "matches":"configuration",
                    "value":"classic-classic"
                  },
                  "pillow_cushion_shape":{
                    "matches":"pillow_cushion_shape",
                    "value":null
                  },
                  "pillow_detail":{
                    "matches":"pillow_detail",
                    "value":null
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":null
                  },
                  "accent_pillow":{
                    "matches":"accent_pillow",
                    "value":null
                  },
                  "custom_comfort":{
                    "matches":"custom_comfort",
                    "value":null
                  }
              }
            },
            {
              "product_type":"Custom Armchair",
              "base_product_handle":"custom-armchair-base",
              "attributes":{
                  "arm_style":{
                    "matches":"arm_style",
                    "value":null
                  },
                  "color_name":{
                    "matches":"color_name",
                    "value":null
                  },
                  "pillow_cushion_shape":{
                    "matches":"pillow_cushion_shape",
                    "value":null
                  },
                  "pillow_detail":{
                    "matches":"pillow_detail",
                    "value":null
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":null
                  },
                  "accent_pillow":{
                    "matches":"accent_pillow",
                    "value":"no-pillows"
                  },
                  "custom_comfort":{
                    "matches":"custom_comfort",
                    "value":null
                  }
              }
            },
            {
              "product_type":"Custom Ottoman",
              "base_product_handle":"custom-ottoman-base",
              "attributes":{
                  "color_name":{
                    "matches":"color_name",
                    "value":null
                  },
                  "pillow_cushion_shape":{
                    "matches":"pillow_cushion_shape",
                    "value":null
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":null
                  },
                  "custom_comfort":{
                    "matches":"custom_comfort",
                    "value":null
                  }
              }
            },
            {
              "product_type":"Classic Via Coffee Table (plywood)",
              "base_product_handle":"classic-via-coffee-table-plywood-base",
              "attributes":{
                  "shape":{
                    "matches":"shape",
                    "value":"rectangle"
                  },
                  "finish":{
                    "matches":"finish",
                    "value":"latte-wood"
                  },
                  "base_style":{
                    "matches":"base_style",
                    "value":"latte-flare"
                  }
              }
            }
        ]
      }
    };
  },
  mixins: [
    screenMonitor,
    interpolator
  ],
  methods: {
    close(){
      this.open = false;
    },
    buildSelectedOptions(relatedProductAttributes, filterStorageAttributes){
      const selectedOptions = {};
      Object.entries(relatedProductAttributes).forEach(([parameter, matchObj]) => {
        if(matchObj.value){
          selectedOptions[parameter] = matchObj.value;
          return
        }

        if(matchObj.matches === parameter){
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

        let foundAttribute = filterStorageAttributes.find((attribute) => attribute.parameter === matchObj.matches);
        let foundValue = foundAttribute.values.find((value) => value.value === matchObj.value);
        if(!foundValue){
          selectedOptions[parameter] = foundAttribute.values[0].value;
        }else{
          selectedOptions[parameter] = foundValue.value;
        }
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
      // if(!this.relatedProductsData){
      //   setTimeout(handler, 200);
      //   return
      // }

      this.relatedProductsTemp = [];
      this.upsell_products_data_v1.upsell_products.forEach(async relatedProductData => {

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

          if(this.upsell_products_data_v1.upsell_products.indexOf(A) > this.upsell_products_data_v1.upsell_products.indexOf(B)){
            return 1;
          }
          return -1;
        });

        this.upsellProducts = this.relatedProductsTemp;

      });
    }
  },
  mounted(){
    // this.$bus.$on('some-event', this.populateCurrentRelatedProducts);
    this.populateCurrentRelatedProducts();
  },
}
</script>


<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.UpsellModal{
  position: fixed; /* Stay in place */
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden;
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.5); /* Black w/ opacity */

  *{
    font-family: $font-stack-avalon;
  }

  &__inner{
    position:relative;
    background-color: white;
    // margin: 12% auto;
    padding: 20px;
    border-radius: 20px;
    width: calc(100% - 30px);
    margin: 70px 15px 0 15px;
    // width: 700px;
    // height: 700px;
  }

  &__title{
    font-size: 26px;
    text-align: center;
    font-weight: 600;
  }

  &__subtitle{
    font-size: 14px;
    font-weight: 500;
    margin-top:10px;
  }

  &__close,&__footer-close{
    display:flex;
    align-items: center;
    text-transform: uppercase;
    font-size:13px;
    font-weight: 500;
    gap:10px;

    svg{
      width:20px;
    }
  }

  &__close{
    justify-content: flex-end;
  }
  &__footer-close{
    text-decoration: underline;
    justify-content: center;
  }

  &__btn-clear,
  &__btn-black{

  }

  &__btn-clear{

  }

  &__btn-black{

  }

}




</style>