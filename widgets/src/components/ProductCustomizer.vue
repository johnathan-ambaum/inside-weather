<template>
  <div>
    <div class="ProductCustomizer__Name">
      {{ productName }}
      <div class="ProductCustomizer__Model">{{ modelNumber }}</div>
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

  props: {
    initialVariant: { type: Number, required: true },
  },

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
      fulfillmentTime: state => `${state.filters.min_fulfillment_days}-${state.filters.max_fulfillment_days} days`,
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

    // product(newProduct, oldProduct) {
    //   if (!newProduct) {
    //     return;
    //   }

    //   fetch(`/products/${newProduct.handle}?view=json`)
    //     .then(response => response.text())
    //     .then((productJSON) => {
    //       const priceEl = document.querySelector('.product__price');
    //       priceEl.innerHTML = `$${parseInt(newProduct.price, 10)}`;
    //       priceEl.content = newProduct.price;
    //       const fulfillmentTime = `${newProduct.min_fulfillment_time}-${newProduct.max_fulfillment_time} days`;
    //       document.querySelector('.Product__ShippingDays').innerHTML = `FREE Shipping | Custom made in ${fulfillmentTime}`;
    //       document.querySelector('.affirm-as-low-as').setAttribute('data-amount', newProduct.price * 100);
    //       window.affirm.ui.refresh();

    //       let product = null;

    //       try {
    //         product = JSON.parse(productJSON);
    //       } catch (err) {
    //         throw new Error('Failed to parse product JSON');
    //       }

    //       if (product.variants.length) {
    //         document.querySelector('input[name="id"]').value = product.variants[0].id;
    //       }

    //       // below here is manual pageview stuff not needed on initial load, only when switching product by customizer
    //       // if (!oldProduct) {
    //       //   return;
    //       // }

    //       // const productPrice = (product.price / 100).toFixed(2);

    //       // const { protocol, host } = window.location;
    //       // const uri = `/collections/${newProduct.primary_category}/products/${newProduct.handle}`;
    //       // const fullUrl = `${protocol}//${host}${uri}`;

    //       // const productSection = document.querySelector('.product-section');
    //       // productSection.querySelector('[itemprop="brand"]').content = product.vendor;
    //       // productSection.querySelector('[itemprop="name"]').content = product.title;
    //       // productSection.querySelector('[itemprop="description"]').content = newProduct.description.replace('"', '&quot;');
    //       // productSection.querySelector('[itemprop="productID"]').content = newProduct.sku;
    //       // productSection.querySelector('[itemprop="url"]').content = fullUrl;
    //       // // eslint-disable-next-line
    //       // productSection.querySelector('[itemprop="image"]').content = newProduct.images.large[0];

    //       // // manually fire product view events when navigating via customizer
    //       // window.fbq('track', 'Microdata');
    //       // window.dataLayer.push({
    //       //   event: 'VirtualPageview',
    //       //   productIds: [newProduct.sku],
    //       //   productName: newProduct.long_display_name,
    //       //   totalValue: productPrice,
    //       //   productHandle: newProduct.handle,
    //       // });
    //       // window.dataLayer.push({
    //       //   event: 'PDPView',
    //       //   ecommerce: {
    //       //     detail: {
    //       //       products: [{
    //       //         name: newProduct.long_display_name,
    //       //         id: newProduct.sku,
    //       //         price: productPrice,
    //       //         category: newProduct.raw.primary_category,
    //       //       }],
    //       //     },
    //       //   },
    //       // });

    //       // window.klaviyoItem = {
    //       //   Name: newProduct.long_display_name,
    //       //   ProductID: product.id,
    //       //   Categories: [newProduct.raw.primary_category],
    //       //   ImageURL: newProduct.images.medium[0],
    //       //   URL: fullUrl,
    //       //   Brand: product.vendor,
    //       //   Price: productPrice,
    //       //   CompareAtPrice: (product.compare_at_price_max / 100).toFixed(2),
    //       // };
    //       // // eslint-disable-next-line
    //       // window._learnq.push(['track', 'Viewed Product', window.klaviyoItem]);
    //       // // eslint-disable-next-line
    //       // window._learnq.push(['trackViewedItem', {
    //       //   Title: window.klaviyoItem.Name,
    //       //   ItemId: window.klaviyoItem.ProductID,
    //       //   Categories: window.klaviyoItem.Categories,
    //       //   ImageUrl: window.klaviyoItem.ImageURL,
    //       //   Url: window.klaviyoItem.URL,
    //       //   Metadata: {
    //       //     Brand: window.klaviyoItem.Brand,
    //       //     Price: window.klaviyoItem.Price,
    //       //     CompareAtPrice: window.klaviyoItem.CompareAtPrice,
    //       //   },
    //       // }]);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
  },

  created() {
    this.setVariantId(this.initialVariant);

    this.$bus.$on('filter:toggle', (payload) => {
      this.setOption(payload);
      setTimeout(window.affirm.ui.refresh, 200);
    });

    // window.addEventListener('popstate', ({ state }) => {
    //   if (state) {
    //     this.loadProduct({ sku: state.sku });
    //   }
    // });
  },

  mounted() {
    // const sidebar = document.querySelector('.ProductDetailGrid__Sidebar');
    // const reviewSection = document.querySelector('.ReviewCarousel');
    // const desktopWatcher = scrollMonitor.create(reviewSection);
    // let mobileWatcher;

    // window.addEventListener('wheel', (e) => {
    //   if (this.isMobile) {
    //     return;
    //   }

    //   const scrollDistance = Math.sign(e.deltaY) * 40;
    //   const { top: builderTop } = reviewSection.getBoundingClientRect();
    //   const inViewport = builderTop <= this.screenHeight + scrollDistance;
    //   const scrollingToBottom = inViewport && scrollDistance > 0 && sidebar.scrollHeight - sidebar.scrollTop >= sidebar.clientHeight + 20;
    //   const scrollingToTop = window.pageYOffset === 0 && scrollDistance < 0 && sidebar.scrollHeight > 0;

    //   if (scrollingToBottom) {
    //     window.scroll(0, builderTop + window.pageYOffset - this.screenHeight);
    //   }

    //   if (scrollingToBottom || scrollingToTop) {
    //     e.preventDefault();
    //     sidebar.scrollTop += scrollDistance;
    //   }
    // }, false);

    // const positionSidebar = (watcher) => {
    //   if (watcher.isInViewport) {
    //     sidebar.classList.remove('is-fixed');
    //     sidebar.classList.add('hug-bottom');
    //   } else {
    //     sidebar.classList.add('is-fixed');
    //     sidebar.classList.remove('hug-bottom');
    //   }
    // };

    // /**
    //  * Because the height of the slider is tied to viewport width, we need to reinitialize
    //  * the scrollMonitor instance with a new offset any time the screen is resized, so we need
    //  * to encapsulate that initialization logic for reuse.
    //  */
    // const setupMobile = () => {
    //   if (!this.isMobile) {
    //     return;
    //   }

    //   if (mobileWatcher) {
    //     mobileWatcher.destroy();
    //   }

    //   // slider height is set to 75vw in ProductDetailSlider
    //   let fixedSliderHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.75;
    //   /**
    //    * 45px top padding added from body.ProductDetailSlider--Fixed
    //    * 40px bottom margin added from .ProductCustomizer
    //    * Both need to be deducted from scrollMonitor offset to ensure it triggers at the right time
    //    */
    //   fixedSliderHeight -= 85;
    //   mobileWatcher = scrollMonitor.create(reviewSection, { top: -fixedSliderHeight });

    //   mobileWatcher.visibilityChange(() => {
    //     if (!this.isMobile || this.repositioning) {
    //       return;
    //     }
    //     positionSidebar(mobileWatcher);
    //   });
    // };

    // if (this.isMobile) {
    //   setupMobile();
    // }
    // window.addEventListener('resize', setupMobile);

    // // fire on load in case initial scroll position is low on the page, since scrollMonitor won't catch it
    // positionSidebar(this.isMobile ? mobileWatcher : desktopWatcher);

    // desktopWatcher.visibilityChange(() => {
    //   if (this.isMobile) {
    //     return;
    //   }
    //   positionSidebar(desktopWatcher);
    // });
  },

  methods: {
    ...mapActions([
      'createProductFromSelected',
    ]),

    ...mapMutations([
      'selectPanel',
      'setOption',
      'setVariantId',
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

    // productAdded() {
    //   const formattedPrice = Number(this.product.price).toFixed(2);
    //   window.dataLayer.push({
    //     event: 'addToCart',
    //     totalValue: formattedPrice,
    //     productSKU: this.product.sku,
    //     productCategory: this.product.raw.primary_category,
    //     ecommerce: {
    //       currencyCode: 'USD',
    //       add: {
    //         products: [{
    //           name: this.product.long_display_name,
    //           id: this.product.sku,
    //           price: formattedPrice,
    //           category: this.product.raw.primary_category,
    //         }],
    //       },
    //     },
    //   });
    // },
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
    font-size: 20px;
    font-weight: 700;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 28px;
      font-weight: 500;
      letter-spacing: .025em;
      line-height: 34px;
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
    font-size: 32px;
    font-weight: 600;
    line-height: 1;
    margin-right: 10px;
  }

  &__ShippingDays {
    margin: 20px 0;
    font-size: 12px;
    letter-spacing: .035em;
    font-weight: 500;

    @media only screen and (max-width: 1023px) {
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
    font-size: 1.2rem;
    font-weight: 600;
    justify-content: center;
    text-align: center;
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
    justify-content: center;
    padding: 20px 0;

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
}
</style>
