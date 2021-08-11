<template>
  <div>
    <div v-if="!disabled" class="ProductCustomizer__DetailWrapper">
      <div class="ProductCustomizer__FlagRow">
        <div v-if="isClearance" class="ProductCustomizer__Flag" :style="{ color: '#fff', background: '#202020' }">CLEARANCE</div>
        <div v-for="flag in flags" :key="flag.title" class="ProductCustomizer__Flag" :style="{ color: flag.titleColor, background: flag.titleBackground }">
          <div>{{ flag.title }}</div>
          <div class="ProductCustomizer__FlagBody" v-html="flag.body" />
        </div>
      </div>
      <div class="ProductCustomizer__HeaderRow">
        <div class="ProductCustomizer__Name">
          {{ productName }}
          <span
          class="stamped-product-reviews-badge stamped-main-badge"
          :data-id="initialId"
          :data-product-sku="initialHandle"
          :data-product-title="productName"
          :data-product-type="category"
          style="display: block;">
          {{ stampedBadge }}
          </span>
        </div>
        <div v-if="isCustomer">
          <span :class="{ isFavorite }" role="button" class="ProductCustomizer__Favorite"
            @click.stop.prevent="favoriteCurrentProduct">
            <font-awesome-icon :icon="favoriteIcon" />
          </span>
        </div>
        <div v-else-if="!isClearance">
          <span :class="{ isFavorite }" role="button" class="ProductCustomizer__Favorite"
            data-ajax-customer-onboard="true">
            <font-awesome-icon :icon="favoriteIcon" />
          </span>
        </div>
      </div>
      <product-detail-slider v-if="isMobile" :cylindo="useCylindo" cylindo-id="cylindo-main" :customizer-active="active"
        :favoriteIcon="favoriteIcon" />
      <div class="ProductCustomizer__PriceRow">
        <span class="ProductCustomizer__Price">{{ formattedProductPrice ? `$${formattedProductPrice}` : '' }}</span>
        <span v-if="msrp" class="ProductCustomizer__MSRP">{{ msrpDisplay }}</span>
        <span v-if="msrp" class="ProductCustomizer__Savings">YOU SAVE ${{ isClearance ? clearanceData.savings : savings }}</span>
        <info-popup v-if="!isDecor"
          text="In-house design &amp; manufacturing means no inventory and no wasted material. The result? You save $$$.">
          <img src="https://cdn.shopify.com/s/files/1/2994/0144/files/i.svg?1672261">
        </info-popup>
      </div>
      <div v-if="isClearance" class="ProductCustomizer__clearance-condition">
        Condition: <span>{{clearanceData.condition}}</span>
      </div>
      <div class="ProductCustomizer__ShippingDays">
        <template v-if="isDecor">
          Ships in
        </template>
        <template v-else>
          Custom made in the USA<br>
          Estimated to ship in
        </template>

        <info-popup v-if="hasFulfillmentMarkup && !isClearance" always-on-top
          text="Heads up! We’re a bit backed up due to safety mandates in place in light of COVID-19. Please note this is an estimate but we’re workin’ around the clock (literally) to produce each custom piece!">
          <span class="ProductCustomizer__ShippingDays--Delayed">{{ fulfillmentTime }}</span>
        </info-popup>
        <span v-else-if="isClearance"> 2-3 Days </span>
        <span v-else>{{ fulfillmentTime }}</span>
      </div>
      <simple-customizer v-if="isDecor && !isClearance" />
      <button v-else-if="!isClearance" class="ProductCustomizer__Trigger" @click.prevent="showCustomizer">Customize</button>
      <add-to-cart v-if="!clearanceData.floorFound" :processing="addToCartProcessing" :out-of-stock="!inStock" @addToCart="addToCart" />
      <a v-else :href="clearanceData.floorFoundUrl" rel="noreferrer" class="ProductCustomizer__floorfound-link">View Product on Floorfound</a>
      <p :data-amount="formattedProductPrice * 100" data-page-type="product" class="affirm-as-low-as" />
    </div>
    <div v-else class="ProductCustomizer__DetailWrapper ProductCustomizer__404">
      <div class="ProductCustomizer__FlagRow">
        <div class="ProductCustomizer__Flag ProductCustomizer__404-notice">404 Error</div>
      </div>
      <div>
        <div class="ProductCustomizer__Name">
          {{ productName }}
          <span
          class="stamped-product-reviews-badge stamped-main-badge"
          :data-id="initialId"
          :data-product-sku="initialHandle"
          :data-product-title="productName"
          :data-product-type="category"
          style="display: block;">
          {{ stampedBadge }}
          </span>
        </div>
        <span v-if="!disabled" :class="{ isFavorite }" role="button" class="ProductCustomizer__Favorite"
          @click.stop.prevent="favoriteCurrentProduct">
          <font-awesome-icon :icon="favoriteIcon" />
        </span>
        <product-detail-slider v-if="isMobile" :cylindo="useCylindo" cylindo-id="cylindo-main" />
      </div>
      <div class="ProductCustomizer__404-content">
        <h2>{{ disabledInfo.disabled_title }}</h2>
        <p>{{ disabledInfo.disabled_content }}</p>
        <a v-bind:href="disabledInfo.disabled_button_url">{{ disabledInfo.disabled_button_content }}</a>
      </div>
    </div>
    <div v-if="!disabled">
      <hr>
      <inspiration-options :products="filters.featured_products || []" />
    </div>
    <div v-if="!isDecor" :class="{ 'ProductCustomizer--Active': active, 'ProductCustomizer--Cylindo': useCylindo }"
      class="ProductCustomizer">
      <div class="ProductCustomizer__NameOverlay">
        <div class="ProductCustomizer__Name">
          {{ productName }}
        </div>
        <div class="ProductCustomizer__PriceRow">
          <span class="ProductCustomizer__Price--mt">${{ formattedProductPrice }}</span>
        </div>
      </div>
      <div class="ProductCustomizer__Slider">
        <product-detail-slider :cylindo="useCylindo" :customizer-active="active" :favoriteIcon="favoriteIcon" />
        <button v-if="!isMobile" class="ProductCustomizer__Close" @click.prevent="close(true)">
          Save Customization
          <span :class="historyLoading ? 'ProductCustomizer__loading' : 'ProductCustomizer__loading--hide' ">
            <loader></loader>
            </span>
          </button>
        <button v-if="!isMobile" class="ProductCustomizer__cancel-and-close"
          @click.prevent="cancelAndClose(true)">CANCEL & CLOSE</button>
      </div>
      <div class="ProductCustomizer__Sidebar">
        <div class="ProductCustomizer__SidebarBody">
          <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <nav v-show="active && !openPanel" class="ProductCustomizer__Nav" ref="productCustomizerNav">
              <div class="ProductCustomizer__NavHeading">Customize</div>
              <div class="ProductCustomizer__NavBody">
                <div v-for="(attribute) in attributes" :key="attribute.parameter" class="ProductCustomizer__NavItem"
                  @click="showPanel(attribute.parameter)" v-show="!attribute.hidden">
                  <img v-if="attribute.cover_image_url" ref="coverImages" :src="attribute.cover_image_url"
                    :alt="attribute.name">
                  <span class="ProductCustomizer__NavItemTitle">{{ getAttributeIndex(attribute, attributes) }}.
                    {{ attribute.name }}</span>
                </div>
              </div>
            </nav>
          </transition>
          <div v-for="(attribute) in attributes" :key="attribute.parameter" class="ProductCustomizer__Panel"
            v-show="!attribute.hidden">
            <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
              <filter-panel v-show="isOpen(attribute.parameter)" v-bind="attribute"
                :index="getAttributeIndex(attribute, attributes)" :load="true" />
            </transition>
          </div>
        </div>
        <div class="ProductCustomizer__Footer" ref="productCustomizerFooter">
          <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <button v-if="hasPrev" class="ProductCustomizer__Skip" @click.prevent="backToStart">Back</button>
          </transition>
          <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <button v-if="hasPrev" :class="{ 'ProductCustomizer__Skip--Last': ! hasNext }"
              class="ProductCustomizer__Skip"
              @click.prevent="nextPanel">
                {{ hasNext ? 'Next' : 'Save Customization' }}
                <span v-if="!hasNext" :class="historyLoading ? 'ProductCustomizer__loading' : 'ProductCustomizer__loading--hide' ">
                  <loader></loader>
                </span>
            </button>
          </transition>
          <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <button v-if="active && isMobile && !hasPrev" class="ProductCustomizer__Close"
              @click.prevent="close(false)">
              Save Customization
              <span :class="historyLoading ? 'ProductCustomizer__loading' : 'ProductCustomizer__loading--hide' ">
                <loader></loader>
              </span>
            </button>
          </transition>
        </div>
      </div>
      <div class="ProductCustomizer__Exit">
        <close-button v-if="isMobile" @click.native.prevent="cancelAndClose(true)" />
        <span>CANCEL & CLOSE</span>
      </div>
      <photoshoot-modal @photoshoot="photoShootHandler" ref="modal"></photoshoot-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import DOMPurify from 'dompurify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ProductDetailSlider from './ProductDetailSlider.vue';
import ProductGallery from './ProductGallery.vue';
import FilterPanel from './FilterPanel.vue';
import AddToCart from './AddToCart.vue';
import CloseButton from './CloseButton.vue';
import InfoPopup from './InfoPopup.vue';
import SimpleCustomizer from './SimpleCustomizer.vue';
import InspirationOptions from './InspirationOptions.vue';
import SwatchBrowser from './SwatchBrowser.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';
import tracker from '../mixins/tracker';
import PhotoshootModal from './PhotoshootModal.vue';
import ReviewStars from './ReviewStars.vue';
import Loader from './Loader.vue';
import TemplateBlock from './TemplateBlock.vue';

library.add(faHeart);

export default {
  components: {
    ProductDetailSlider,
    FontAwesomeIcon,
    ProductGallery,
    FilterPanel,
    AddToCart,
    CloseButton,
    InfoPopup,
    SimpleCustomizer,
    InspirationOptions,
    SwatchBrowser,
    PhotoshootModal,
    ReviewStars,
    Loader,
    TemplateBlock
  },

  mixins: [
    screenMonitor,
    interpolator,
    tracker,
  ],

  props: {
    category: { type: String, required: true },
    initialVariant: { type: Number, required: true },
    initialHandle: { type: String, required: true },
    initialAttributes: { type: Object, required: true },
    initialQuantity: { type: Number, default: 1 },
    metafields: {type: Object, required: true },
    shopifyProduct: {type: Object, required:true},
    stampedBadge: { type: String },
    initialId: { type: String }
  },

  data() {
    return {
      active: false,
      optionsChanged: false,
      addToCartProcessing: false,
      closedNum: 0,
      actionBarOffset: 0,
      isCustomer: !!window.customerId,
      historyLoading: false
    };
  },

  computed: {
    ...mapState({
      filters: state => state.filters,
      attributes: state => state.filters.attributes || [],
      openPanel: state => state.openPanel,
      productImages: state => state.productImages,
      selectedOptions: state => state.selectedOptions,
      revertConfiguration: state => state.revertConfiguration,
      productCreationInProgress: state => state.productCreationInProgress,
      activeProduct: state => state.activeProduct,
      favorites: state => state.favorites,
      flags: (state) => {
        if (!state.filters || !state.filters.flags) {
          return [];
        }
        return state.filters.flags.map(({title, title_color, title_background_color, body}) => ({
          title,
          titleColor: title_color || '#fff',
          titleBackground: title_background_color || '#202020',
          body: DOMPurify.sanitize(body),
        }));
      },
      disabled: state => state.filters.disabled,
      disabledInfo: state => {
        return {
          disabled_title: state.filters.disabled_title,
          disabled_content: state.filters.disabled_content,
          disabled_button_content: state.filters.disabled_button_content,
          disabled_button_url: state.filters.disabled_button_url
        }
      },
      cylindoViewers: state => state.cylindoViewers || []
    }),

    useCylindo() {
      // double ! to cast truthy/falsy values to boolean
      return !!this.filters.cylindo_sku;
    },

    inStock() {
      if (!this.filters.track_inventory) {
        return true;
      }
      return this.activeProduct.inventory && this.activeProduct.inventory.available > 0;
    },

    isDecor() {
      return this.filters.configurator_type === 'small';
    },

    isOpen() {
      return panel => this.openPanel === panel;
    },

    visibleAttributes(){
      return this.attributes.filter((attribute) => attribute.hidden === false);
    },

    activeIndex() {
      return this.attributes.findIndex(attribute => attribute.parameter === this.openPanel);
    },

    hasPrev() {
      return this.openPanel !== '';
    },

    hasNext() {
      return this.openPanel !== '' && this.activeIndex + 1 < this.visibleAttributes.length;
    },

    isFavorite() {
      return this.favorites.some(favorite => favorite && favorite.handle === this.activeProduct.handle);
    },

    favoriteIcon() {
      if (this.isFavorite) {
        return ['fas', 'heart'];
      }

      return ['fal', 'heart'];
    },

    formattedProductPrice(){
      if(!this.productPrice){return}

      let price =  this.productPrice;
      if(this.isClearance){
        price = this.shopifyProduct.price/100;
      }

      const isWholeNumber = price.toFixed(2) % 1 == 0;
      if(isWholeNumber){
        return price;
      }

      return price.toFixed(2);
    },

    isClearance(){
      return this.category.toLowerCase().includes('clearance');
    },

    clearanceData(){
      if(!this.metafields.floorfound_data){return false}

      return {
        condition: this.metafields.condition,
        floorFound: this.metafields.floorfound_data.floor_found,
        floorFoundUrl: this.metafields.floorfound_data.floor_found_url,
        savings: Math.ceil(this.msrp - this.shopifyProduct.price/100)
      }
    }
  },

  watch: {
    active(isActive) {
      const openClass = 'ProductCustomizer--Open';
      if (isActive) {
        document.documentElement.classList.add(openClass);
        setTimeout(this.checkActionBar, 200);
        return;
      }

      document.documentElement.classList.remove(openClass);

      const orb = document.querySelector('.orb-chat-mount');
      if (orb) {
        orb.style.visibility = 'visible';
      }
    },
    actionBarOffset(offset){
      if(this.$refs.productCustomizerFooter){
        this.$refs.productCustomizerFooter.style.bottom = offset + 'px';
      }
      if(this.$refs.productCustomizerNav){
        this.$refs.productCustomizerNav.style.bottom = offset + 56 + 'px';
      }
    }
  },

  created() {
    let { category } = this;

    if (category.startsWith('Lounge Chair')) {
      const matches = this.initialHandle.match(/[^A-z]*?(ace|vita)[^A-z]*?/);
      const prefix = matches && matches[1] ? matches[1] : '';
      category = `${prefix} ${category}`.trim();
    } else if (category.startsWith('Dining Chair')) {
      category = /[^A-z]*?nola[^A-z]*?/.test(this.initialHandle) ? 'Nola Dining Chairs' : 'Canvas Dining Chairs';
    }
    category = category.charAt(0).toUpperCase() + category.substring(1);

    if (category) {
      this.updateCategory(category);
      this.pullFilter();
    }

    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }

    const params = new URLSearchParams(window.location.search);

    if (params.has('attributes')) {
      const queryAttributes = {};
      params.get('attributes').split(',').forEach((attribute) => {
        const [key, value] = decodeURIComponent(attribute).split(':');
        queryAttributes[key] = value;
      });
      this.populateSelected({
        selectedOptions: queryAttributes,
      }).then(() => {
        this.createProduct();
      });
    } else {
      this.setActiveProduct({
        id: this.initialVariant,
        handle: this.initialHandle,
        inventory: {
          available: this.initialQuantity,
        },
      });
      this.populateSelected({
        selectedOptions: this.initialAttributes,
        exists: true,
      }).then(() => {
        this.trackViewProduct();
      });
    }

    this.$bus.$on('filter:toggle', (payload) => {
      this.optionsChanged = true;
      this.setOption(payload)
      if (this.filters.track_inventory) {
        this.createProduct();
      }
      this.$nextTick(() => {
        window.affirm.ui.refresh();
      });

      let currentConfigurationIsFavorited = this.favorites.find((favorite) => {
        return JSON.stringify(favorite.attributes) === JSON.stringify(this.selectedOptions);
      });

      if(currentConfigurationIsFavorited){
        this.setActiveProduct(currentConfigurationIsFavorited);
      }else{
        this.setActiveProduct({});
      }
    });

    this.$bus.$on('detailSlider:favorite', (payload) => {
      $('[data-icon="heart"]').addClass('favorites__loading');
      this.getCylindoImage().then(() => {
        this.createProductFromSelected({
          name: this.productName,
          model: this.modelNumber,
          image: this.productImages[0].full,
        }).then(() => {
          this.favoriteCurrentProduct();
           $('[data-icon="heart"]').removeClass('favorites__loading');
        });
      });
    });

    window.addEventListener('popstate', ({ state }) => {
      if (state) {
        this.setActiveProduct(state.product);
        this.setSelectedOptions(state.attributes);
      }
    });

    this.addCylindoItemToHistory();
  },

  mounted() {
    const updateAffirm = () => {
      if (!window.affirm || !window.affirm.ui || !window.affirm.ui.refresh) {
        setTimeout(updateAffirm, 200);
        return;
      }
      window.affirm.ui.refresh();
    };

    this.$nextTick(() => {
      updateAffirm();
    });

    const setupMulberry = () => {
      if (!window.theme.settings.mulberry || !window.theme.settings.mulberry.active) {
        return;
      }
      if (!window.mulberry) {
        setTimeout(setupMulberry, 200);
        return;
      }
      document.addEventListener('mulberry-shopify:loaded', async () => {
        await window.mulberry.core.init({
          publicToken: '6oMVIT3bWc-8sWgS12eToRhzV8I',
        });
      });
    };
    setupMulberry();
    this.setProductOnLoad();
    StampedFn.reloadUGC();//reloads stamped.io widget so it can mount within a vue

  },

  methods: {
    ...mapActions([
      'pullFilter',
      'populateSelected',
      'createProductFromSelected',
      'getCylindoImage',
    ]),

    ...mapMutations([
      'updateCategory',
      'toggleFavorite',
      'addHistoryItem',
      'setActiveProduct',
      'setSelectedOptions',
      'setRevertConfiguration',
      'selectPanel',
      'setOption',
    ]),

    async initializeMulberry(quantity = 1) {
      const { id } = this.activeProduct;
      const { name: title, price, sku } = this.fullProduct;
      const offer = await window.mulberry.core.getWarrantyOffer({ id, title, price, sku });

      window.mulberry.modal.init({
        offers: offer,
        settings: window.mulberry.core.settings,
        onWarrantySelect: async (warranty) => {
          const result = await window.mulberryShop.addToProductCatalog(warranty);
          await window.mulberryShop.addWarrantyToCart(result)
          window.mulberry.modal.close();
          this.addToCart(quantity, true);
        },
        onWarrantyDecline: () => {
          window.mulberry.modal.close();
          this.addToCart(quantity, true);
        },
      });
    },

    createProduct(refreshImages = true) {
      if (this.useCylindo && refreshImages) {
        this.getCylindoImage().then(() => {
          this.createProduct(false);
        });
        return;
      }

      if (!this.productImages.length) {
        setTimeout(() => {
          this.createProduct();
        }, 200);
        return;
      }

      this.createProductFromSelected({
        name: this.productName,
        model: this.modelNumber,
        image: this.productImages[0].full,
      }).then(() => {
        this.trackViewProduct();
        this.optionsChanged = false;
      });
    },
    openModal() {
      if(theme.settings.vwo.photoshootModal.photoshootActive){
        this.closedNum = this.closedNum + 1;
        if(this.closedNum > 1){
          if(localStorage.getItem("PDPModalTimestamp")){
            const PDPModalTimestamp = JSON.parse(localStorage.getItem("PDPModalTimestamp"));
            const is_in_past = new Date() > Date.parse(PDPModalTimestamp);
            if(is_in_past){
              this.$refs.modal.show();
              PDPModalTimestamp = new Date();
              PDPModalTimestamp.setDate(PDPModalTimestamp.getDate()+1);
              localStorage.setItem("PDPModalTimestamp", JSON.stringify(PDPModalTimestamp));
            }
          }else{
            this.$refs.modal.show();
            const PDPModalTimestamp = new Date();
            PDPModalTimestamp.setDate(PDPModalTimestamp.getDate()+1);
            localStorage.setItem("PDPModalTimestamp", JSON.stringify(PDPModalTimestamp));
          }
        }
      }
    },
    photoShootHandler(){
      this.addToCart(1);
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: {
          id: theme.settings.vwo.photoshootModal.photoshootProductID,
          quantity: 1
        },
        dataType: 'json'
      });
    },
    showPanel(parameter) {
      this.selectPanel(parameter);
      this.$bus.$emit('panel:show', parameter);
    },

    backToStart() {
      this.selectPanel('');
    },

    nextPanel() {
      this.checkActionBar();
      if (!this.hasNext) {
        this.close(true);
        return;
      }

      if (this.activeIndex >= this.attributes.length) {
        this.selectPanel('');
        return;
      }
      const { parameter } = this.visibleAttributes[this.activeIndex + 1];
      this.selectPanel(parameter);
      this.$bus.$emit('panel:show', parameter);
    },

    close(closeAll) {
      this.openModal();
      if (this.openPanel && !closeAll) {
        this.selectPanel('');
        return;
      }

      this.$bus.$emit('customizer-close');

      if(this.customerId){
        this.historyLoading = true;
        this.getCylindoImage().then(() => {
          this.createProductFromSelected({
            name: this.productName,
            model: this.modelNumber,
            image: this.productImages[0].full,
          }).then(() => {
            this.addHistoryItem({
              customerId: this.customerId,
              sku: this.productSku,
              product: {
                ...this.activeProduct,
                product_type: this.category,
                name: this.productName,
                price: this.productPrice,
                cover_image_url: this.productImages[0].full,
                attributes: {...this.selectedOptions},
              },
            });
            this.historyLoading = false;
            this.active = false;
            this.showOnTopElements();
          });
        });
      }else{
        this.createProduct();
        this.active = false;
        this.showOnTopElements();
      }
    },

    cancelAndClose(closeAll){
      this.openModal();
      if (this.openPanel && !closeAll) {
        this.selectPanel('');
        return;
      }
      this.populateSelected({
        selectedOptions: this.revertConfiguration,
        exists: true,
      }).then(()=>{
        this.createProduct();
        this.$bus.$emit('customizer-close');
        this.active = false;
        this.showOnTopElements();
      });
    },

    showCustomizer() {
      this.setRevertConfiguration(this.selectedOptions);
      this.selectPanel('');
      this.active = true;
      this.hideOnTopElements();
    },

    getCylindoImageForFavorite(){
      if (this.useCylindo) {
        this.getCylindoImage().then(() => {
          this.toggleFavorite({
            customerId: this.customerId,
            sku: this.productSku,
            product: {
              ...this.activeProduct,
              product_type: this.category,
              name: this.productName,
              price: this.productPrice,
              cover_image_url: this.productImages[0].full,
              attributes: {...this.selectedOptions},
            },
          });
        });
      }else{
        this.toggleFavorite({
          customerId: this.customerId,
          sku: this.productSku,
          product: {
            ...this.activeProduct,
            product_type: this.category,
            name: this.productName,
            price: this.productPrice,
            cover_image_url: this.productImages[0].full,
            attributes: {...this.selectedOptions},
          },
        });
      }
    },

    favoriteCurrentProduct() {
      if (!this.attributes) {
        return;
      }
      this.getCylindoImageForFavorite();
    },

    async addToCart(quantity, warrantySelected = false) {
      this.addToCartProcessing = true;

      if (this.productCreationInProgress) {
        setTimeout(() => {
          this.addToCart(quantity);
        }, 250);
        return;
      }

      if (this.optionsChanged || !this.activeProduct.id) {
        this.createProduct();
        setTimeout(() => {
          this.addToCart(quantity);
        }, 250);
        return;
      }

      if (theme.settings.mulberry.active && ! warrantySelected) {
        await this.initializeMulberry(quantity);
        mulberry.modal.open();
        return;
      }

      if (!this.inStock) {
        this.addToCartProcessing = false;
        return;
      }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.activeProduct.id,
          quantity,
          properties: {
            'Estimated time to ship': this.emailFulfillmentTime,
            'User Fulfillment Display': this.fulfillmentTime,
          },
        }),
      })
        .then((cart) => {
          this.addToCartProcessing = false;
          var addedAjaxProuct = jQuery.Event( "added.ajaxProduct" );
          addedAjaxProuct.modelNumber = this.modelNumber;
          addedAjaxProuct.currentProduct = {
            name: this.productName,
            model_number: this.modelNumber,
            product_type: this.category,
            // image: this.productImages[0].full,
            attributes: this.selectedOptions,
          }
          $('body').trigger(addedAjaxProuct);
          this.trackAddToCart(this.fullProduct);
        });
    },
    checkActionBar() {
      if(window.innerWidth > 600){return}
      const productCustomizerFooterBottom = this.$refs.productCustomizerFooter.getBoundingClientRect().bottom;
      const difference = Math.abs(window.innerHeight - productCustomizerFooterBottom);
      this.actionBarOffset = difference;
    },
    getAttributeIndex(attribute, attributes){
      const visibleAttributes = attributes.filter(a => a.hidden !== true);
      return visibleAttributes.findIndex(a => a.name === attribute.name) + 1;
    },
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

    addCylindoItemToHistory(){
      if(!this.customerId){return}
      if(!this.attributes.length || Object.keys(this.selectedOptions).length === 0){
        setTimeout(() => {
          this.addCylindoItemToHistory();
        }, 250);
        return
      }

      let cylindoSku = this.filters.cylindo_sku;
      if(!cylindoSku){
        const productImagesLoaded = this.productImages[0] && this.productImages[0].full;
        if(!productImagesLoaded){
          setTimeout(() => {
            this.addCylindoItemToHistory();
          }, 250);
          return
        }

        let productImage = this.productImages[0].full;
        this.addHistoryItem({
          customerId: this.customerId,
          sku: this.productSku,
          product: {
            ...this.activeProduct,
            product_type: this.category,
            name: this.productName,
            price: this.productPrice,
            cover_image_url: productImage,
            attributes: {...this.selectedOptions},
          },
        });
        return;
      }

      const baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/" + cylindoSku + "/frames/" + 1 +"/"+ cylindoSku + ".jpg";
      let cylindoProductFeaturesArray = [];
      let selectedOptions = {...this.selectedOptions};
      for(let option in selectedOptions){
        let foundAttribute = this.attributes.find((attribute) => attribute.parameter === option);
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
      let cylindoImage = baseCylindoImageUrl + cylindoFeatureQueryStringURI + cylindoImageOptions;

      if(this.activeProduct.id){
        this.addHistoryItem({
          customerId: this.customerId,
          sku: this.productSku,
          product: {
            ...this.activeProduct,
            product_type: this.category,
            name: this.productName,
            price: this.productPrice,
            cover_image_url: cylindoImage,
            attributes: {...this.selectedOptions},
          },
        });
      }
    },
    setProductOnLoad(){
      if(!this.selectedOptions){
        setTimeout(this.setProductOnLoad, 200);
        return;
      }
      this.setSelectedOptions(this.selectedOptions);
      return
    }
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

[v-cloak] {
  display: none;
}

html.ProductCustomizer--Open {
  overflow: hidden;

  .orb-chat-mount {
    display: none !important;
  }
}

.ProductCustomizer {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  left: 0;
  opacity: 0;
  position: fixed;
  top: -100vh;
  transition: opacity .2s linear, top 0s linear .2s;
  width: 100vw;
  z-index: -1;

  @include at-query($breakpoint-large) {
    flex-direction: row;
  }

  &--Active {
    opacity: 1;
    top: 0;
    transition: opacity .2s linear;
    z-index: 1001;
  }

  &__DetailWrapper {
    .btn.btn--full.add-to-cart{
      border-radius: 24px;
    }
    @include at-query($breakpoint-small) {
      margin-bottom: 68px;
      padding: 0 $horizontal-wrapper-padding;
    }

    & + hr {
      display: none;

      @include at-query($breakpoint-large) {
        display: block;
        margin-bottom: 30px;
      }
    }
  }

  &__FlagRow {
    align-items: center;
    display: flex;
    font-weight: 500;
    letter-spacing: .12em;
    margin: 15px 15px 13px 0;

    @include at-query($breakpoint-large) {
      margin: 0 0 13px 0;
    }
  }

  &__Flag {
    font-size: 11px;
    line-height: 1;
    margin-right: 15px;
    padding: 9px 12px;

    @include at-query($breakpoint-large) {
      padding: 7px 16px;
    }
  }

  &__FlagBody {
    font-size: 12px;

    b, strong {
      font-weight: 700;
    }
  }

  &__Flag,
  &__FlagBody {
    @include at-query($breakpoint-large) {
      font-size: 13px;
    }
  }

  &__HeaderRow {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 100;

    @include at-query($breakpoint-small) {
      position: absolute;
      width: calc(100% - #{$horizontal-wrapper-padding * 2});
    }
  }

  &__Name {
    flex: 0 1 70%;
    font-family: $font-stack-avalon;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: .05em;
    line-height: 22px;

    @include at-query($breakpoint-small) {
      padding-right: 40px;
    }

    @include at-query($breakpoint-large) {
      font-size: 22px;
      letter-spacing: .025em;
      line-height: 30px;
      margin-bottom: 30px;
    }
  }

  &__Model {
    display: block;
    font-family: $font-stack-avalon;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: .12em;
    margin-top: 5px;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      font-size: 10px;
      margin-top: 0;
    }
  }

  &__Favorite {
    cursor: pointer;
    flex: 0 0 30px;
    font-size: 1.2em;
    text-align: center;
  }

  &__PriceRow {
    align-items: center;
    display: flex;
    flex-wrap: wrap;

    @include at-query($breakpoint-small) {
      justify-content: center;
      margin-top: -20px;
      position: relative;
      z-index: 10;
    }


    & > * {
      margin-right: 15px;

      &.ProductCustomizer__Savings {
        margin-right: 10px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &--Active &__PriceRow {
    @include at-query($breakpoint-small) {
      justify-content: flex-start;
      margin: 0;
    }
  }

  &__Price {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .05em;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 22px;
    }
  }
  &__Price--mt{
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .05em;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 22px;
    }
    @include at-query($breakpoint-small) {
      margin-top:14px;
    }
  }

  &__MSRP {
    color: #959595;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .05em;
    text-decoration: line-through;
  }

  &__Savings {
    color: #a9a9a9;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .075em;
  }

  &__ShippingDays {
    color: #202020;
    margin: 30px 0;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: .075em;
    line-height: 19px;

    @include at-query($breakpoint-small) {
      font-family: $font-stack-avalon;
      font-size: 11px;
      letter-spacing: .08em;
      line-height: 15px;
      margin: 12px 0 20px;
      text-align: center;
    }

    &--Delayed {
      border-bottom: 1px solid #202020;
      display: inline-block;
    }
  }

  &__Trigger {
    background: transparent;
    border: 1.5px solid #202020;
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    letter-spacing: .12em;
    margin-bottom: 24px;
    text-transform: uppercase;
    width: 100%;
    border-radius: 24px;

    &:hover,
    &:active {
      background: #202020;
      color: #fff;
    }
  }

  &__NameOverlay {
    left: $horizontal-wrapper-padding;
    position: absolute;
    top: 20px;
    z-index: 100;

    @include at-query($breakpoint-large) {
      left: 60px;
      top: 40px;
    }
  }

  &__NameOverlay &__Name {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 0;

    @include at-query($breakpoint-large) {
      font-size: 22px;
      line-height: 30px;
    }
  }

  &__NameOverlay &__Price {
    @include at-query($breakpoint-small) {
      font-size: 14px;
    }
  }

  .ProductDetailSlider {
    @include at-query($breakpoint-small) {
      margin: 0;
    }
  }

  &__Slider {
    flex: 1;
    min-height: 0;

    @media only screen and ($breakpoint-mlarge) and ($breakpoint-small) {
      flex: 0 1 calc(100vh - 350px);
      margin-top: -10%;
    }

    @include at-query($breakpoint-large) {
      position: relative;
    }
  }

  &__Sidebar {
    background: #fff;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    position: relative;
    z-index: 100;

    @include at-query($breakpoint-large) {
      flex: 0 0 458px;
    }
  }

  &__Exit {
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    max-width: 40px;
    @include at-query($breakpoint-large) {
      display:none;
    }
    z-index: 10;

    span{
      font-family: Avalon;
      font-weight: 500;
      font-size:8px;
      letter-spacing: 0.1em;
      line-height: 11px;
      text-align: center;
      color:#202020;
      margin-top:12px;
    }

    svg {
      @include at-query($breakpoint-small) {
        height: auto;
        width: 16px;
      }
    }

    @include at-query($breakpoint-large) {
      right: 498px;
      top: 40px;
    }
  }

  &__SidebarBody {
    flex: 0 0 auto;
    z-index: 100;

    @include at-query($breakpoint-large) {
      flex: 1;
      padding-bottom: $sidebar-footer-height;
    }
  }

  &__Nav {
    animation-delay: .6s;
    animation-duration: .5s;
    background: #fff;
    bottom: $sidebar-footer-height-mobile;
    display: flex;
    flex-direction: column;
    height: auto;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 100;

    @include at-iphone {
      bottom: $iphone-action-bar-height + $sidebar-footer-height-mobile;
    }

    @include at-query($breakpoint-large) {
      bottom: 0;
      box-shadow: -0.9px 0.9px 0.4px 0 rgba(139, 137, 134, 0.5);
      height: 100vh;
    }

    &.slideOutRight {
      animation-delay: 0s
    }
  }

  &__NavHeading {
    border-bottom: 1px solid #D4D0CA;
    display: flex;
    font-size: 18px;
    font-weight: 600;
    justify-content: center;
    line-height: 1;
    padding: 26px 0;
    text-align: center;

    @include at-query($breakpoint-small) {
      padding: 18px 0;
      font-size: 16px;
      border-top: 1px solid #D4D0CA;
    }

    @include at-query($breakpoint-large) {
      align-items: center;
      flex: 0 0 110px;
      font-size: 24px;
      padding: 0;
    }
  }

  &__NavBody {
    display: flex;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    @include at-query($breakpoint-large) {
      flex: 0 1 100%;
      flex-direction: column;
    }
  }

  &__NavItem {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    letter-spacing: .05em;
    padding: 30px 0;

    &:hover {
      -webkit-filter: contrast(115%); /* Safari 6.0 - 9.0 */
      filter: contrast(115%);
    }

    @include at-query($breakpoint-small) {
      padding: 22px 18px;

      & + & {
        border-left: 1px solid #D4D0CA;
      }

      img {
        height: 92px;
      }
    }

    @include at-query($breakpoint-large) {
      & + & {
        border-top: 1px solid #D4D0CA;
      }
    }
  }

  &__404-notice {
    color:#FFFFFF;
    background: #202020
  }

  &__404-content {
    h2 {
      font-family: Avalon;
      font-weight: bold;
      font-style: italic;
      font-size: 22px;
      line-height: 30px;
      color: #202020;

      @include at-query($breakpoint-small) {
        font-size: 18px;
        letter-spacing: 0.05em;
        text-align: center;
        margin-bottom:18px;
      }
    }
    p {
      font-family: Avalon, sans-serif;
      font-size: 14px;
      font-weight: 500;
      margin-bottom:34px;
      @include at-query($breakpoint-small) {
        margin-bottom:32px;
      }
    }
    a {
      font-family: Avalon;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.12em;
      display: block;
      background-color: #202020;
      color: #fff;
      text-align: center;
      padding: 14.5px;
      @include at-query($breakpoint-small) {
        padding: 14px;
      }
      &:hover {
        color: #fff;
      }
    }
  }

  &__Footer {
    bottom: 0;
    display: flex;
    height: $sidebar-footer-height-mobile;
    left: 0;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: 100;

    @include at-iphone {
      bottom: $iphone-action-bar-height;
    }

    @include at-query($breakpoint-large) {
      height: $sidebar-footer-height;
      padding-right: 12px;
    }
  }

  &__Footer &__Close {
    animation-delay: 1s;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    &.slideOutDown {
      animation-delay: 0s;
    }
  }

  &__Skip {
    align-items: center;
    animation-delay: 1s;
    animation-duration: .5s;
    background: #dfb2a3;
    color: #fff;
    display: flex;
    flex: 0 0 50%;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    letter-spacing: .12em;
    position: relative;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      background: #f2f0ed;
      color: #202020;
    }

    &.slideOutDown {
      animation-delay: 0s;
    }

    &:first-child::before {
      content: '';
      display: block;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      height: 7px;
      margin-right: 5px;
      transform: rotate(-45deg);
      width: 7px;

      @include at-query($breakpoint-large) {
        border-left-color: #202020;
        border-top-color: #202020;
      }
    }

    & + & {
      border-left: 1px solid #fff;

      &:not(.ProductCustomizer__Skip--Last)::after {
        content: '';
        display: block;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        height: 7px;
        margin-left: 5px;
        transform: rotate(45deg);
        width: 7px;

        @include at-query($breakpoint-large) {
          border-right-color: #202020;
          border-top-color: #202020;
        }
      }

      @include at-query($breakpoint-large) {
        // this is to add extra background color beyond the edge of the Next button
        // needs to be part of the button to facilitate animations, used to be the whole footer bg color
        &::before {
          background: inherit;
          content: '';
          height: 100%;
          left: 100%;
          position: absolute;
          top: 0;
          width: 20px;
          z-index: -1;
        }
      }
    }
  }

  &__Close {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #202020;
    color: #fff;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    width: 100%;
    z-index: 10;
    @include at-query($breakpoint-large) {
      bottom: 80px;
      height: 50px;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      width: 350px;
      border-radius: 29px;
    }
  }

  &__cancel-and-close{
    position:absolute;
    bottom:28px;
    left:0;
    right:0;
    margin:0 auto;
    text-align: center;
    font-family: Avalon;
    font-weight: 500;
    text-decoration: underline;
    font-size:14px;
    letter-spacing: 0.1em;
    color:#202020;
    z-index: 10;
  }
  &--Cylindo &__Close {
    @include at-query($breakpoint-large) {
      bottom: 73px;
    }
  }

  .ProductGallery {
    top: 0;

    &__Nav {
      bottom: 0;
    }
  }

  &__floorfound-link{
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #fff;
    background: #202020;
    border-radius:24px;
    border:2px solid black;
    width:100%;
    display: block;
    text-align: center;
    padding: 10px;

    &:hover{
      background: #fff;
      color: #202020;
      text-decoration: none;
    }
  }

  &__clearance-condition{
    font-family: $font-stack-avalon;
    font-size: 14px;
    text-align: center;
    margin-top:8px;
    span{
      font-weight: bold;
      font-size: 14px;
    }

    @include at-query($breakpoint-large) {
      text-align: left;
      margin-top: 15px;
      margin-bottom: -15px;
    }
  }
}

.affirm-as-low-as {
  margin: 0 0 25px;
  text-align: right;

  &, a {
    color: #8a8a8a;
    font-family: $font-stack-roboto;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }

  a {
    text-decoration: underline;
  }
}
.favorites__loading{
  animation-name: heartBeat;
  animation-duration: 2s;
  animation-iteration-count:infinite;
}

@keyframes heartBeat {
  from {opacity: .2}
  35%  {opacity: .8; transform:scale(1.2)}
  40%  {opacity: .8; transform:scale(1)}
  45%  {opacity: .8;transform:scale(1.2)}
  50%  {opacity: .8; transform:scale(1.2)}
  55%  {opacity: .8; transform:scale(1)}
  to   {opacity: .2}
}

.ProductCustomizer__loading--hide{
  display:none;
}

.ProductCustomizer__loading{
  display:block;
}

.fa-star-half-o:before,
.fa-star-o:before,
.fa-star:before,
.stamped-fa-star-half-o:before,
.stamped-fa-star-o:before,
.stamped-fa-star:before {
  font-size: 15px;
  margin-right: -1px;
}

.stamped-badge{
  display: flex;
  align-items: center;
  margin-left: -2px;
}

.stamped-badge-caption{
  margin-left: 10px;
  font-size: 10px;
  text-transform: uppercase;
  @include at-query($breakpoint-large) {
    margin-top: 4px;
  }

  &:hover{
    text-decoration: underline;
  }
}

</style>
