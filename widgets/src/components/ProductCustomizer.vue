<template>
  <div>
    <div class="ProductCustomizer__Name">
      {{ productName }}
      <!-- <div class="ProductCustomizer__Model">{{ modelNumber }}</div> -->
    </div>
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
    <div
      :class="{ 'ProductCustomizer--Active': active }"
      class="ProductCustomizer"
    >
      <div class="ProductCustomizer__NameOverlay">
        <div class="ProductCustomizer__Name">
          {{ productName }}
          <div class="ProductCustomizer__Model">{{ modelNumber }}</div>
        </div>
        <div class="ProductCustomizer__PriceRow">
          <span class="ProductCustomizer__Price">${{ productPrice }}</span>
        </div>
      </div>
      <product-gallery
        :images="productImages"
        class="ProductCustomizer__Gallery"
      />
      <div class="ProductCustomizer__Sidebar">
        <div class="ProductCustomizer__SidebarBody">
          <nav
            v-if="!openPanel"
            class="ProductCustomizer__Nav"
          >
            <div class="ProductCustomizer__NavHeading">Customise your {{ category }}</div>
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
import ProductGallery from './ProductGallery.vue';
import FilterPanel from './FilterPanel.vue';
import AddToCart from './AddToCart.vue';
import screenMonitor from '../mixins/screenMonitor';
import interpolator from '../mixins/interpolator';

export default {
  components: {
    ProductGallery,
    FilterPanel,
    AddToCart,
  },

  mixins: [
    screenMonitor,
    interpolator,
  ],

  data() {
    return {
      active: false,
      addToCartProcessing: false,
    };
  },

  computed: {
    ...mapState({
      category: state => state.filters.name,
      basePrice: state => state.filters.price,
      templates: state => state.filters.templates,
      attributes: state => state.filters.attributes,
      minDays: state => state.filters.min_fulfillment_days,
      maxDays: state => state.filters.max_fulfillment_days,
      openPanel: state => state.openPanel,
      productImages: state => state.productImages,
      selectedOptions: state => state.selectedOptions,
      productCreationInProgress: state => state.productCreationInProgress,
      variantId: state => state.variantId,
    }),

    isOpen() {
      return panel => this.openPanel === panel;
    },

    productName() {
      if (!this.templates) {
        return '';
      }
      const { template = '' } = this.templates.find(item => item.key === 'name') || {};
      return this.interpolateString(template);
    },

    modelNumber() {
      return '';
    },

    productPrice() {
      if (!this.basePrice || Object.keys(this.selectedOptions).length < 1) {
        return null;
      }

      return Object.entries(this.selectedOptions).reduce((total, [parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        const selected = attribute.values.find(item => item.value === value);
        if (!selected.price_markup) {
          return total;
        }
        return total + Number(selected.price_markup);
      }, Number(this.basePrice));
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
      document.body.style.overflow = isActive ? 'hidden' : '';
    },
  },

  created() {
    this.$bus.$on('filter:toggle', (payload) => {
      this.setOption(payload);
      setTimeout(window.affirm.ui.refresh, 200);
    });
  },

  methods: {
    ...mapActions([
      'createProductFromSelected',
    ]),

    ...mapMutations([
      'selectPanel',
      'setOption',
    ]),

    close() {
      if (this.openPanel) {
        this.selectPanel('');
        return;
      }

      this.createProductFromSelected({
        name: this.productName,
        image: this.productImages[0].full,
      });
      this.active = false;
    },

    showCustomizer() {
      this.active = true;
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
          id: this.variantId,
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

.ProductCustomizer {
  background: #fff;
  display: flex;
  height: 100vh;
  left: 0;
  opacity: 0;
  position: fixed;
  top: -100vh;
  transition: opacity .2s linear, top 0s linear .2s;
  width: 100vw;
  z-index: 1001;

  &--Active {
    opacity: 1;
    top: 0;
    transition: opacity .2s linear;
  }

  &__Name {
    font-family: $font-stack-avalon;
    font-size: 18px;
    font-weight: 500;
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
    font-size: 18px;
    font-weight: 700;
    padding-top: 10px;
    letter-spacing: $normal-text-spacing;
  }

  &__PriceRow {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  &__Price {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    margin-right: 10px;

    @include at-query($breakpoint-large) {
      font-size: 22px;
    }
  }

  &__ShippingDays {
    margin: 25px 0;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: .035em;
    line-height: 15px;

    @include at-query($breakpoint-small) {
      font-size: 11px;
      line-height: 14px;
      margin: 8px 0 12px;
      text-align: right;
    }
  }

  &__Trigger {
    background: transparent;
    border: 2px solid #202020;
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-weight: 600;
    height: 48px;
    margin-bottom: 40px;
    letter-spacing: .05em;
    text-transform: uppercase;
    width: 100%;
  }

  &__NameOverlay {
    left: 60px;
    position: absolute;
    top: 40px;
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

  &__Gallery {
    flex: 1;
  }

  &__Sidebar {
    border-left: 1px solid #b7b7b7;
    display: flex;
    flex: 0 0 440px;
    flex-direction: column;
  }

  &__SidebarBody {
    flex: 1;
  }

  &__Nav {
    display: flex;
    flex-direction: column;
    height: calc(100vh - #{$sidebar-footer-height});
  }

  &__NavHeading {
    align-items: center;
    border-bottom: 1px solid #c8c8c8;
    display: flex;
    flex: 0 0 110px;
    font-size: 18px;
    font-weight: 600;
    justify-content: center;
    line-height: 30px;
    text-align: center;

    @include at-query($breakpoint-large) {
      font-size: 24px;
    }
  }

  &__NavBody {
    display: flex;
    flex: 0 1 calc(100% - #{$sidebar-heading-height});
    flex-direction: column;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__NavItem {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    padding: 30px 0;

    & + & {
      border-top: 1px solid #c8c8c8;
    }
  }

  &__Panel:not(&__Panel--Active) {
    display: none;
  }

  &__Close {
    background: #202020;
    color: #fff;
    flex: 0 0 $sidebar-footer-height;
    font-family: $font-stack-avalon;
    font-weight: 600;
    letter-spacing: .05em;
    text-transform: uppercase;
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
