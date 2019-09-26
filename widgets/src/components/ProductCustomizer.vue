<template>
  <div>
    <div class="ProductCustomizer__DetailWrapper">
      <div class="ProductCustomizer__HeaderRow">
        <div class="ProductCustomizer__Name">
          {{ productName }}
          <div
            v-if="modelNumber"
            class="ProductCustomizer__Model"
          >Model No&deg; {{ modelNumber }}</div>
        </div>
        <span
          :class="{ isFavorite }"
          role="button"
          class="ProductCustomizer__Favorite"
          @click.stop.prevent="favoriteCurrentProduct"
        >
          <font-awesome-icon :icon="favoriteIcon"/>
        </span>
      </div>
      <product-detail-slider v-if="isMobile" />
      <div class="ProductCustomizer__PriceRow">
        <span class="ProductCustomizer__Price">{{ productPrice ? `$${productPrice}` : '' }}</span>
      </div>
      <div class="ProductCustomizer__ShippingDays">
        FREE Shipping | Custom made in {{ fulfillmentTime }}
      </div>
      <button
        class="ProductCustomizer__Trigger"
        @click.prevent="showCustomizer"
      >Customize</button>
      <add-to-cart
        :processing="addToCartProcessing"
        @addToCart="addToCart"
      />
      <p
        :data-amount="productPrice * 100"
        data-page-type="product"
        class="affirm-as-low-as"
      />
    </div>
    <hr>
    <inspiration-options />
    <swatch-browser />
    <div
      :class="{ 'ProductCustomizer--Active': active }"
      class="ProductCustomizer"
    >
      <div class="ProductCustomizer__NameOverlay">
        <div class="ProductCustomizer__Name">
          {{ productName }}
        </div>
        <div class="ProductCustomizer__PriceRow">
          <span class="ProductCustomizer__Price">${{ productPrice }}</span>
        </div>
      </div>
      <product-detail-slider
        v-if="isMobile"
        class="ProductCustomizer__Slider"
      />
      <product-gallery
        v-if="!isMobile"
        :images="productImages"
        class="ProductCustomizer__Gallery"
      />
      <div class="ProductCustomizer__Sidebar">
        <div class="ProductCustomizer__SidebarBody">
          <nav
            v-show="!openPanel"
            class="ProductCustomizer__Nav"
          >
            <div class="ProductCustomizer__NavHeading">Customize Your {{ category }}</div>
            <div class="ProductCustomizer__NavBody">
              <div
                v-for="(attribute, index) in attributes"
                :key="attribute.parameter"
                class="ProductCustomizer__NavItem"
                @click="selectPanel(attribute.parameter)"
              >
                <img
                  v-if="attribute.cover_image_url"
                  ref="coverImages"
                  :src="attribute.cover_image_url"
                  :alt="attribute.name"
                >
                <span class="ProductCustomizer__NavItemTitle">{{ index + 1 }}. {{ attribute.name }}</span>
              </div>
            </div>
          </nav>
          <div
            v-for="(attribute, index) in attributes"
            :key="attribute.parameter"
            :class="{ 'ProductCustomizer__Panel--Active': isOpen(attribute.parameter) }"
            class="ProductCustomizer__Panel"
          >
            <filter-panel
              v-bind="attribute"
              :index="index"
              :load="active"
            />
          </div>
        </div>
        <button
          class="ProductCustomizer__Close"
          @click.prevent="close"
        >{{ closeButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
// import scrollMonitor from 'scrollmonitor';
import { mapState, mapActions, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ProductDetailSlider from './ProductDetailSlider.vue';
import ProductGallery from './ProductGallery.vue';
import FilterPanel from './FilterPanel.vue';
import AddToCart from './AddToCart.vue';
import InspirationOptions from './InspirationOptions.vue';
import SwatchBrowser from './SwatchBrowser.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

library.add(faHeart);

export default {
  components: {
    ProductDetailSlider,
    FontAwesomeIcon,
    ProductGallery,
    FilterPanel,
    AddToCart,
    InspirationOptions,
    SwatchBrowser,
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  props: {
    category: { type: String, required: true },
    initialVariant: { type: Number, required: true },
    initialHandle: { type: String, required: true },
    initialAttributes: { type: Object, required: true },
  },

  data() {
    return {
      active: false,
      addToCartProcessing: false,
    };
  },

  computed: {
    ...mapState({
      attributes: state => state.filters.attributes,
      minDays: state => state.filters.min_fulfillment_days,
      maxDays: state => state.filters.max_fulfillment_days,
      openPanel: state => state.openPanel,
      productImages: state => state.productImages,
      selectedOptions: state => state.selectedOptions,
      productCreationInProgress: state => state.productCreationInProgress,
      activeProduct: state => state.activeProduct,
      favorites: state => state.favorites,
    }),

    isOpen() {
      return panel => this.openPanel === panel;
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

    fulfillmentTime() {
      let text = '';

      if (this.minDays) {
        text += this.minDays;
        if (this.maxDays) {
          text += '-';
        }
      }

      if (this.maxDays) {
        text += this.maxDays;
      }

      if (text.length > 0) {
        text += ' days';
      }

      return text;
    },

    closeButtonText() {
      if (this.openPanel) {
        return 'Back to main menu';
      }

      return 'Done';
    },
  },

  watch: {
    active(isActive) {
      const bodyClass = 'ProductCustomizer--Open';
      if (isActive) {
        document.body.classList.add(bodyClass);
        return;
      }

      document.body.classList.remove(bodyClass);
      const zendesk = document.querySelector('.zEWidget-launcher');
      if (zendesk) {
        // fix bug causing widget to be set to 5px wide by some zendesk javascript after closing customizer
        zendesk.style.width = '';
      }
    },
  },

  created() {
    if (this.category) {
      this.updateCategory(this.category);
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
      });
      this.populateSelected({
        selectedOptions: this.initialAttributes,
        exists: true,
      });
    }

    this.$bus.$on('filter:toggle', (payload) => {
      this.setOption(payload);
      this.$nextTick(() => {
        window.affirm.ui.refresh();
      });
    });

    window.addEventListener('popstate', ({ state }) => {
      if (state) {
        this.setActiveProduct(state.product);
        this.setSelectedOptions(state.attributes);
      }
    });
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
  },

  methods: {
    ...mapActions([
      'pullFilter',
      'populateSelected',
      'createProductFromSelected',
    ]),

    ...mapMutations([
      'updateCategory',
      'toggleFavorite',
      'setActiveProduct',
      'setSelectedOptions',
      'selectPanel',
      'setOption',
    ]),

    createProduct() {
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
      });
    },

    close() {
      if (this.openPanel) {
        this.selectPanel('');
        return;
      }

      this.createProduct();
      this.active = false;
    },

    showCustomizer() {
      this.active = true;
    },

    favoriteCurrentProduct() {
      if (!this.attributes) {
        return;
      }

      this.toggleFavorite({
        customerId: this.customerId,
        product: {
          ...this.activeProduct,
          product_type: this.category,
          name: this.productName,
          price: this.productPrice,
          cover_image_url: this.productImages[0].full,
          attributes: this.selectedOptions,
        },
      });
    },

    addToCart(quantity) {
      this.addToCartProcessing = true;

      if (this.productCreationInProgress) {
        setTimeout(() => {
          this.addToCart(quantity);
        }, 250);
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
        }),
      })
        .then((cart) => {
          this.addToCartProcessing = false;
          window.$('body').trigger('added.ajaxProduct');
        });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

[v-cloak] {
  display: none;
}

body.ProductCustomizer--Open {
  overflow: hidden;

  // zendesk widget
  .zEWidget-launcher {
    display: none !important;
  }
}

.ProductCustomizer {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  left: 0;
  opacity: 0;
  position: fixed;
  top: -100vh;
  transition: opacity .2s linear, top 0s linear .2s;
  width: 100vw;
  z-index: 1001;

  @include at-query($breakpoint-large) {
    flex-direction: row;
  }

  &--Active {
    opacity: 1;
    top: 0;
    transition: opacity .2s linear;
  }

  &__DetailWrapper {
    @include at-query($breakpoint-small) {
      margin-bottom: 80px;
      padding: 0 $horizontal-wrapper-padding;
    }

    & + hr {
      display: none;

      @include at-query($breakpoint-large) {
        display: block;
      }
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

    @include at-query($breakpoint-large) {
      font-size: 22px;
      letter-spacing: .025em;
      line-height: 30px;
      margin-bottom: 20px;
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

  &__ShippingDays {
    margin: 25px 0;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: .075em;
    line-height: 15px;

    @include at-query($breakpoint-small) {
      font-size: 11px;
      line-height: 14px;
      margin: 12px 0 20px;
      text-align: center;
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
    margin-bottom: 40px;
    text-transform: uppercase;
    width: 100%;
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
    margin: 0;
  }

  &__Slider,
  &__Gallery {
    flex: 1;
    min-height: 0;
  }

  &__Slider {
    @media only screen and ($breakpoint-mlarge) and ($breakpoint-small) {
      flex: 0 1 calc(100vh - 350px);
      margin-top: -10%;
    }
  }

  &__Sidebar {
    background: #fff;
    border-left: 1px solid #b7b7b7;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    z-index: 100;

    @include at-query($breakpoint-large) {
      flex: 0 0 458px;
    }
  }

  &__SidebarBody {
    flex: 1;

    @include at-query($breakpoint-small) {
      flex: 0 0 auto;
      z-index: 100;
    }
  }

  &__Nav {
    display: flex;
    flex-direction: column;
    height: 100%;

    @include at-query($breakpoint-large) {
      height: calc(100vh - #{$sidebar-footer-height});
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
      padding: 24px 18px;

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

  &__Panel {
    height: 100%;

    &:not(#{&}--Active) {
      display: none;
    }
  }

  &__Close {
    background: #202020;
    color: #fff;
    flex: 0 0 $sidebar-footer-height-mobile;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      flex: 0 0 $sidebar-footer-height;
    }
  }

  .ProductGallery {
    top: 0;

    &__Nav {
      bottom: 0;
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
</style>
