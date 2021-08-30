<template>
  <div v-if="open" class="UpsellModal" ref="UpsellModal">
    <div class="UpsellModal__inner">
      <div class="UpsellModal__header">
        <div class="UpsellModal__close" @click="close"><span>{{ closeText }}</span> <close-button></close-button></div>
        <div class="UpsellModal__title">{{ upsellProductsData.title }}</div>
        <div class="UpsellModal__subtitle">{{ upsellProductsData.subtitle }}</div>
      </div>
      <div class="UpsellModal__content">
        <div class="UpsellModal__items">
          <div class="UpsellModal__item" v-for="upsellProduct in upsellProducts" :key="upsellProduct.priority">
            <a class="UpsellModal__item-image" :href="upsellProduct.url">
              <img :src="upsellProduct.image" alt="Product Image">
            </a>
            <a class="UpsellModal__item-title" :href="upsellProduct.url">{{ upsellProduct.title }}</a>
            <div class="UpsellModal__item-price">${{ formatProductPrice(upsellProduct.price) }}</div>
            <a class="UpsellModal__item-customize UpsellModal__btn-clear" :href="upsellProduct.url">CUSTOMIZE</a>
            <div 
              :class="addToCartClasses(upsellProduct.priority)"
              class="UpsellModal__item-atc UpsellModal__btn-black" 
              @click="addUpsellProductToCart(upsellProduct)"
            >
              <span class="UpsellModal__item-atc-text">{{ addToCartText(upsellProduct.priority) }}</span>
              <loader size="20"></loader>
            </div>
          </div>
        </div>
      </div>
      <div class="UpsellModal__footer">
        <div class="UpsellModal__footer-image">
          <img :src="upsellProductsData.footer_image" :alt="upsellProductsData.footer_alt_text">
        </div>
        <div class="UpsellModal__footer-content">
          <div class="UpsellModal__footer-title">{{ upsellProductsData.footer_title }}</div>
          <a class="UpsellModal__footer-cta UpsellModal__btn-black" :href="upsellProductsData.button_url">{{ upsellProductsData.button_text }}</a>
          <div v-if="isMobile" class="UpsellModal__footer-close" @click="close">{{ closeText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
import interpolator from '../mixins/interpolator';
import Loader from './Loader.vue';

const apiClient = new ApiClient();

export default {
  components: { CloseButton, Loader },

  computed: {
    ...mapState({
      upsellProductsData: state => state.filters.upsell_products_data_v1 || [],
      selectedOptions: state => state.selectedOptions,
    }),

    addToCartClasses() {
      return (priority) => ({
        'is-adding': priority === this.currentlyAdding,
      });
    },

    addToCartText() {
      return (priority) => {
        if (this.lastAdded === priority) {
          return 'ADDED';
        }
        return 'ADD TO CART';
      }
    },
  },

  data() {
    return {
      upsellProducts:[],
      open: false,
      upsellProductsSelectedOptions: [],
      upsellProductsTemplates: [],
      closeText: 'No thanks',
      currentlyAdding: null,
      lastAdded: null,
    };
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  methods: {
    waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
      var startTimeInMs = Date.now();
      (function loopSearch() {
        if (document.querySelector(selector) != null) {
          callback();
          return;
        }
        else {
          setTimeout(function () {
            if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
              return;
            loopSearch();
          }, checkFrequencyInMs);
        }
      })();
    },

    hideOnTopElements() {
      this.waitForElementToDisplay('.orb-chat-mount>div',function(){
        $('.orb-chat-mount>div').css('margin-right', '10000px');
      },100,9000);
      this.waitForElementToDisplay('#attentive_overlay',function(){
        $('#attentive_overlay').css('display', 'none');
      },100,9000);

    },

    showOnTopElements(){
      $('.orb-chat-mount>div').css('margin-right', '0px');
      $('#attentive_overlay').css('display', 'initial');
    },

    resetTimer(delay){
      setTimeout(() => {
        this.lastAdded = null;
      }, delay);
    },

    addUpsellProductToCart(upsellProduct){
      this.currentlyAdding = upsellProduct.priority;

      const templates = this.upsellProductsTemplates.find(product => product.hasOwnProperty(upsellProduct.title)) || {};
      const templateObj = templates[upsellProduct.title].find(item => item.key === 'model_number') || {};
      const upsellProductSelectedOptions = this.upsellProductsSelectedOptions.find(product => product.hasOwnProperty(upsellProduct.title))[upsellProduct.title];

      apiClient.createProduct({
        name: upsellProduct.title,
        model: this.interpolateWithValues({ template: templateObj.template, attributes: upsellProduct.attributes, selectedOptions: upsellProductSelectedOptions }),
        type: upsellProduct.product_type,
        image: upsellProduct.image,
        attributes: upsellProductSelectedOptions,
      }).then(res => {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: res.variant.id,
            quantity: 1,
            properties: {
              'Estimated time to ship': this.getEmailFulfillmentTime(upsellProduct.filters, upsellProductSelectedOptions, upsellProduct.attributes),
              'User Fulfillment Display': this.getFulfillmentTime(upsellProduct.filters, upsellProductSelectedOptions, upsellProduct.attributes),
            }
          }),
        }).then(() => {
          this.closeText = 'DONE';
          this.currentlyAdding = null;
          this.lastAdded = upsellProduct.priority;
          this.resetTimer(8000);

          let buildCart = jQuery.Event( "buildCart" );
          buildCart.openCartDrawer = false;
          $('body').trigger(buildCart);
        })
      });
    },

    close(){
      let addedAjaxProuct = jQuery.Event( "added.ajaxProduct" );
      $('body').trigger(addedAjaxProuct);
      this.showOnTopElements();
      this.open = false;
    },

    formatProductPrice(productPrice){
      if(!productPrice){return}

      let price =  productPrice;

      const isWholeNumber = price.toFixed(2) % 1 == 0;
      if(isWholeNumber){
        return price;
      }

      return price.toFixed(2);
    },

    buildSelectedOptions(upsellProductAttributes, filterStorageAttributes){
      const selectedOptions = {};
      Object.entries(upsellProductAttributes).forEach(([parameter, matchObj]) => {
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

        // if the match object and the parameter are not the same, match the specified parameters
        if(this.selectedOptions[matchObj.matches]){
          selectedOptions[parameter] = this.selectedOptions[matchObj.matches];
          return
        }
      });
      return selectedOptions;
    },

    createCylindoImageUrl(selectedOptions, upsellProductFilterDefs){
      let productCodePriority = Infinity;
      let cylindo_sku = upsellProductFilterDefs.cylindo_sku;
      Object.entries(selectedOptions).forEach(([parameter, value]) => {// choose the cylindo_sku of the prodcut with the highest priority
        const { values } = upsellProductFilterDefs.attributes.find(att => att.parameter === parameter);
        const selected = values.find(item => item.value === value);
        const { cylindo_override_priority } = upsellProductFilterDefs.attributes.find(att => att.parameter === parameter);
        if((selected.cylindo_sku_override && cylindo_override_priority) && cylindo_override_priority < productCodePriority){// if an override and a priority exist, AND the priority is higher
          cylindo_sku = selected.cylindo_sku_override;
          productCodePriority = cylindo_override_priority;
        }
      });

      // if the startFrame exists, use it, otherwise default to first frame, 1.
      const startFrame = upsellProductFilterDefs && upsellProductFilterDefs.cylindo_overrides && upsellProductFilterDefs.cylindo_overrides.startFrame ? upsellProductFilterDefs.cylindo_overrides.startFrame : 1;
      const baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/" + cylindo_sku + "/frames/" + startFrame +"/"+ cylindo_sku + ".jpg";
      let cylindoProductFeaturesArray = []
      for(let option in selectedOptions){
        let foundAttribute = upsellProductFilterDefs.attributes.find((attribute) => attribute.parameter === option);
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

    populateCurrentUpsellProducts(){
      if(!this.upsellProductsData){
        setTimeout(this.populateCurrentUpsellProducts, 200);
        return
      }

      this.upsellProductsTemp = [];
      this.upsellProductsSelectedOptions = [];
      this.upsellProductsTemplates = [];
      this.upsellProductsData.upsell_products.forEach(async upsellProductData => {

        let upsellProduct = {
          title: "",
          url: "",
          image: [],
          product_type: "",
          price: 0,
          attributes: '',
          filters: {},
          priority: upsellProductData.priority,
        };

        await FilterStorage.getItem(upsellProductData.product_type).then((response)=>{
          if (!response.templates) {
            return '';
          }

          upsellProduct.filters = response

          const attributes = response.attributes;
          const selectedOptions = this.buildSelectedOptions(upsellProductData.attributes, attributes);


          const { template = '' } = response.templates.find(item => item.key === 'name') || {};
          const attributeString = Object.entries(selectedOptions).map(([param, value]) => `${param}:${value}`).join(',');
          upsellProduct.title = this.interpolateWithValues({template, attributes, selectedOptions, debug:false});
          upsellProduct.url = upsellProductData.base_product_handle + '?attributes=' + attributeString;
          upsellProduct.price = parseFloat(response.price);
          upsellProduct.attributes = attributes;

          this.upsellProductsTemplates.push({[upsellProduct.title]: response.templates});
          this.upsellProductsSelectedOptions.push({[upsellProduct.title]: selectedOptions});
          Object.entries(selectedOptions).forEach(([parameter, value]) => {
            const { values } = attributes.find(att => att.parameter === parameter);
            const selected = values.find(item => item.value === value);
            if(selected && selected.price_markup){
              upsellProduct.price += parseFloat(selected.price_markup);
            }

          });

          let cylindo_sku = response.cylindo_sku;
          if(!cylindo_sku){
            apiClient.getImages({
              type: upsellProductData.product_type,
              attributes: selectedOptions,
              debounce: false
            }).then((images) => {
              upsellProduct.image = images;
              upsellProduct.product_type = upsellProductData.product_type;
            });

          }else{
            upsellProduct.image = this.createCylindoImageUrl(selectedOptions, response);
            upsellProduct.product_type = upsellProductData.product_type;
          }

          this.upsellProductsTemp.push(upsellProduct);
        });

        this.upsellProductsTemp.sort((a,b) => {
          if(a.priority > b.priority){
            return 1;
          }
          return -1;
        });

        this.upsellProducts = this.upsellProductsTemp;
        this.hideOnTopElements();
        this.open = true;

      });
    }
  },
  mounted(){
    this.$bus.$on('openUpsellModal', this.populateCurrentUpsellProducts);
    // this.populateCurrentRelatedProducts();
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
  overflow: scroll;
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.5); /* Black w/ opacity */

  @include at-query($breakpoint-large) {
    overflow: hidden;
  }

  *{
    font-family: $font-stack-avalon;
  }

  &__inner{
    position:relative;
    background-color: white;
    border-radius: 20px;
    width: calc(100% - 30px);
    top:7%;
    margin: 0 auto;
    @include at-query($breakpoint-large) {
      margin-left: auto;
      margin-right: auto;
      max-width: 750px;
      max-height: 850px;
    }

  }

  &__header{
    padding: 0 20px 20px 16px;
  }

  &__title{
    font-size: 26px;
    text-align: center;
    font-weight: 600;
    line-height: 32px;

    @include at-query($breakpoint-large) {
      line-height: 38px;
      font-size: 32px;
      text-align: left;
      padding: 30px 30px 0px 30px;
    }
  }

  &__subtitle{
    font-size: 14px;
    font-weight: 500;
    margin-top:10px;

    @include at-query($breakpoint-large) {
      font-size: 14px;
      text-align: left;
      padding:0 30px;
      width: 70%;
    }
  }

  &__close,&__footer-close{
    display:flex;
    align-items: center;
    text-transform: uppercase;
    font-size:12px;
    font-weight: 500;
    gap:10px;
    cursor: pointer;
    letter-spacing: 0.12em;

    svg{
      width:20px;
    }
  }

  &__close{
    justify-content: flex-end;
    margin-bottom: 15px;
    padding-top:20px;

    @include at-query($breakpoint-large) {
      float:right;
    }
  }

  &__footer-close{
    text-decoration: underline;
    justify-content: center;
    padding-bottom:20px;
  }

  &__content{
    padding: 0 13px;
    overflow-y: scroll;
    @include at-query($breakpoint-large) {
      height: 400px;
    }

    @media(max-height: 800px){
      padding-bottom:20px;
    }
  }

  &__items{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    @include at-query($breakpoint-large) {
      padding: 0 20px;
    }

  }

  &__item{
    flex-basis:50%;
    @include at-query($breakpoint-large) {
      flex-basis: 33%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 186px;
      margin: 0 17px;
    }
  }

  &__item-atc{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .Loader{
      display: none;
    }

    &.is-adding .Loader {
      display: block;
    }
  }

  &__item-title{
    font-size:13px;
    text-align: center;
    font-weight: 600;
    margin: 5px;
    display:block;
    flex-grow: 1;
  }


  &__item-price{
    text-align: center;
    font-size:14px;
    font-weight: 500;
    margin-bottom:10px;
  }

  &__btn-clear,
  &__btn-black{
    font-weight: 500;
    text-align: center;
    font-size: 12px;
    border: 1px solid #202020;
    border-radius: 9999px;
    padding: 5px 1px;
    letter-spacing: 0.12em;
    margin: 7px;
    cursor:pointer;
    user-select: none;
    text-decoration: none;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    @include at-query($breakpoint-large) {
      font-size:14px;
      margin: 7px 0;
    }

  }

  &__btn-clear{
    color: #202020;

    &:hover{
      color:#202020;
      text-decoration: none;
    }
  }

  &__btn-black{
    color:white;
    background-color:#202020;

    &:hover{
      color: white;
      text-decoration: none;
    }
  }

  &__footer{
    margin-top:20px;

    @include at-query($breakpoint-large) {
      border-top:1px solid #d4d0ca;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px;
    }

    @media(max-height: 800px){
      display:none;
      padding-bottom:20px;
    }

    img{
      max-width: 300px;
      display:block;
      margin: 0 auto;
    }
  }

  &__footer-title{
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    margin: 15px 0;
    line-height: 25px;

    @include at-query($breakpoint-large) {
      font-size: 24px;
      line-height: 30px;
    }
  }

  &__footer-cta{
    margin: 0 auto;
    display: block;
    max-width: 200px;
    margin-bottom: 30px;
    @include at-query($breakpoint-large) {
      font-size: 14px;
    }

  }

}




</style>