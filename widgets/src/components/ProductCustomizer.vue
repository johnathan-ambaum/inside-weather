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
        <span
          v-if="msrp"
          class="ProductCustomizer__MSRP"
        >{{ msrpDisplay }}</span>
        <span
          v-if="msrp"
          class="ProductCustomizer__Savings"
        >YOU SAVE ${{ savings }}</span>
        <div
          class="ProductCustomizer__TooltipTrigger"
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/2994/0144/files/i.svg?1672261"
            @click="showTooltip = !showTooltip"
          >
          <div
            :class="{ open: showTooltip }"
            class="ProductCustomizer__TooltipBody"
          >
            <p>In-house design &amp; manufacturing means no inventory and no wasted material. The result? You save $$$.</p>
            <close-button
              v-if="isMobile"
              :size="10"
              class="ProductCustomizer__TooltipClose"
              @click.native.prevent="showTooltip = false"
            />
          </div>
        </div>
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
    <inspiration-options :products="filters.featured_products || []" />
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
      <div class="ProductCustomizer__Slider">
        <product-detail-slider />
        <button
          v-if="!isMobile"
          class="ProductCustomizer__Close"
          @click.prevent="close(true)"
        >Save Customization</button>
      </div>
      <div class="ProductCustomizer__Sidebar">
        <div
          :class="{ 'has-footer': isMobile || hasPrev }"
          class="ProductCustomizer__SidebarBody"
        >
          <nav
            v-show="!openPanel"
            class="ProductCustomizer__Nav"
          >
            <div class="ProductCustomizer__NavHeading">Customize</div>
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
        <div class="ProductCustomizer__Footer">
          <button
            v-if="hasPrev"
            class="ProductCustomizer__Skip"
            @click.prevent="backToStart"
          >Back</button>
          <button
            v-if="hasPrev && hasNext"
            class="ProductCustomizer__Skip"
            @click.prevent="nextPanel"
          >Next</button>
          <button
            v-if="isMobile && !hasPrev"
            class="ProductCustomizer__Close"
            @click.prevent="close(false)"
          >Save Customization</button>
        </div>
      </div>
      <close-button
        v-if="isMobile"
        class="ProductCustomizer__Exit"
        @click.native.prevent="close(true)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ProductDetailSlider from './ProductDetailSlider.vue';
import ProductGallery from './ProductGallery.vue';
import FilterPanel from './FilterPanel.vue';
import AddToCart from './AddToCart.vue';
import CloseButton from './CloseButton.vue';
import InspirationOptions from './InspirationOptions.vue';
import SwatchBrowser from './SwatchBrowser.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';
import tracker from '../mixins/tracker';

library.add(faHeart);

export default {
  components: {
    ProductDetailSlider,
    FontAwesomeIcon,
    ProductGallery,
    FilterPanel,
    AddToCart,
    CloseButton,
    InspirationOptions,
    SwatchBrowser,
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
  },

  data() {
    return {
      active: false,
      addToCartProcessing: false,
      showTooltip: false,
    };
  },

  computed: {
    ...mapState({
      attributes: state => state.filters.attributes || [],
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

    activeIndex() {
      return this.attributes.findIndex(attribute => attribute.parameter === this.openPanel);
    },

    hasPrev() {
      return this.openPanel !== '';
    },

    hasNext() {
      return this.activeIndex < this.attributes.length - 1;
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
  },

  watch: {
    active(isActive) {
      const openClass = 'ProductCustomizer--Open';
      if (isActive) {
        document.documentElement.classList.add(openClass);
        return;
      }

      document.documentElement.classList.remove(openClass);
      const zendesk = document.querySelector('.zEWidget-launcher');
      if (zendesk) {
        // fix bug causing widget to be set to 5px wide by some zendesk javascript after closing customizer
        zendesk.style.width = '';
      }
    },
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
      });
      this.populateSelected({
        selectedOptions: this.initialAttributes,
        exists: true,
      }).then(() => {
        this.trackViewProduct();
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
      }).then(() => {
        this.trackViewProduct();
      });
    },

    backToStart() {
      this.selectPanel('');
    },

    nextPanel() {
      if (this.activeIndex >= this.attributes.length) {
        this.selectPanel('');
        return;
      }
      const { parameter } = this.attributes[this.activeIndex + 1];
      this.selectPanel(parameter);
    },

    close(closeAll) {
      if (this.openPanel && !closeAll) {
        this.selectPanel('');
        return;
      }

      this.createProduct();
      this.active = false;
    },

    showCustomizer() {
      this.selectPanel('');
      this.active = true;
    },

    favoriteCurrentProduct() {
      if (!this.attributes) {
        return;
      }

      this.toggleFavorite({
        customerId: this.customerId,
        sku: this.productSku,
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

      if (!this.activeProduct.id) {
        this.createProduct();
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
          properties: {
            'Estimated time to ship': this.fulfillmentTime,
          },
        }),
      })
        .then((cart) => {
          this.addToCartProcessing = false;
          window.$('body').trigger('added.ajaxProduct');
          this.trackAddToCart(this.fullProduct);
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

html.ProductCustomizer--Open {
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
    @include at-query($breakpoint-small) {
      margin-bottom: 80px;
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

    @include at-query($breakpoint-large) {
      margin-top: 15px;
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

  &__TooltipTrigger {
    display: inline-block;
    position: relative;
  }

  &__TooltipBody {
    background: #fff;
    border: 1px solid #959595;
    color: #a9a9a9;
    display: none;
    padding: 10px 15px;
    position: absolute;
    right: -60px;
    width: 240px;

    @include at-query($breakpoint-small) {
      top: calc(100% + 12px);
    }

    @include at-query($breakpoint-large) {
      bottom: calc(100% + 12px);
    }

    @media only screen and (min-width: 1201px) {
      left: -60px;
      right: auto;
    }

    &.open {
      display: block;
    }

    &::after,
    &::before {
      border: solid transparent;
      bottom: 100%;
      content: '';
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 62px;
      width: 0;

      @include at-query($breakpoint-large) {
        bottom: auto;
        top: 100%;
      }

      @media only screen and (min-width: 1201px) {
        left: 70px;
        right: auto;
      }
    }

    &::after {
      border-bottom-color: #fff;
      border-width: 0 6px 10px 6px;
      margin-left: -10px;

      @include at-query($breakpoint-large) {
        border-top-color: #fff;
        border-bottom-color: transparent;
        border-width: 10px 6px 0 6px;
      }
    }

    &::before {
      border-bottom-color: #959595;
      border-width: 0 6px 12px 9px;
      margin-left: -12px;

      @include at-query($breakpoint-large) {
        border-bottom-color: transparent;
        border-top-color: #959595;
        border-width: 12px 6px 0 9px;
      }
    }

    p {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .035em;
      line-height: 17px;
      margin: 0;
    }
  }

  &__TooltipClose {
    line-height: 1;
    position: absolute;
    right: 8px;
    top: 2px;
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
    z-index: 100;

    @include at-query($breakpoint-large) {
      box-shadow: -0.9px 0.9px 0.4px 0 rgba(139, 137, 134, 0.5);
      flex: 0 0 458px;
    }
  }

  &__Exit {
    position: absolute;
    right: 18px;
    top: 18px;

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

      &.has-footer {
        flex: 0 0 calc(100vh - #{$sidebar-footer-height});
      }
    }
  }

  &__Nav {
    display: flex;
    flex-direction: column;
    height: 100%;

    @include at-query($breakpoint-large) {
      height: 100vh;
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

  &__Footer {
    background: #dfb2a3;
    display: flex;
    flex: 0 0 $sidebar-footer-height-mobile;

    @include at-query($breakpoint-large) {
      background: #f2f0ed;
      flex-basis: $sidebar-footer-height;
      padding-right: 12px;
    }
  }

  &__Skip {
    align-items: center;
    background: transparent;
    color: #fff;
    display: flex;
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    letter-spacing: .12em;
    text-transform: uppercase;

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
        border-color: #202020;
      }
    }

    & + & {
      border-left: 1px solid #fff;

      &::after {
        content: '';
        display: block;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        height: 7px;
        margin-left: 5px;
        transform: rotate(45deg);
        width: 7px;

        @include at-query($breakpoint-large) {
          border-color: #202020;
        }
      }
    }

    @include at-query($breakpoint-large) {
      color: #202020;
    }
  }

  &__Close {
    background: #202020;
    color: #fff;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    width: 100%;

    @include at-query($breakpoint-large) {
      bottom: 80px;
      height: 58px;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      width: 324px;
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
