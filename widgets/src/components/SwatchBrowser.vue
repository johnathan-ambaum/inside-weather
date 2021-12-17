<template>
  <div class="SwatchBrowser">
    <div class="SwatchBrowser__Filters">
      <div
        v-if="isMobile"
        class="SwatchBrowser__FilterGroup"
      >
        <button
          class="SwatchBrowser__Pill"
          @click="openFilter = swatchFilters[0].key"
        >FILTERS</button>
      </div>
      <div
        :class="{ 'is-active': openFilter && openFilter !== 'sort' }"
        class="SwatchBrowser__FilterGroup SwatchBrowser__FilterPanel"
      >
        <h3 class="SwatchBrowser__Label">FILTERS</h3>
        <close-button
          v-if="isMobile"
          :size="20"
          @click.native.prevent=""
        />
        <div
          v-for="filter in swatchFilters"
          :key="filter.key"
          :class="{ active: openFilter === filter.key }"
          class="SwatchBrowser__Filter"
        >
          <button
            class="SwatchBrowser__Pill"
            @click="openFilter = openFilter === filter.key ? '' : filter.key"
          >
            {{ filter.label }}
            <img src="https://cdn.insideweather.com/icons/dropdown-down-arrow@2x.png" alt="Dropdown arrow">
          </button>
          <div
            v-show="openFilter === filter.key"
            class="SwatchBrowser__Dialog"
          >
            <div
              v-for="option in filter.options"
              :key="option.value"
              :class="filterRowClasses(option)"
              class="SwatchBrowser__DialogRow"
            >
              <input
                :id="`filter-${filter.key}-${option.value}`"
                v-model="appliedFilters[filter.key]"
                type="checkbox"
                :value="option.value"
                :checked="isChecked(filter.key, option.value)"
                :class="{ checked: isChecked(filter.key, option.value) }"
              >
              <label
                :for="`filter-${filter.key}-${option.value}`"
                :class="{ 'has-description': option.description }"
                class="SwatchBrowser__Label"
              >
                <div
                  v-if="option.color"
                  class="SwatchBrowser__Color"
                  :style="{ background: option.color }"
                />
                <img
                  v-if="option.iconLeft"
                  :src="option.iconLeft"
                  class="SwatchBrowser__Icon--Left"
                >
                {{ option.display }}
                <img
                  v-if="option.iconRight"
                  :src="option.iconRight"
                  class="SwatchBrowser__Icon--Right"
                >
                <p
                  v-if="option.description"
                  v-html="purify(option.description)"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="SwatchBrowser__FilterGroup">
        <h3 class="SwatchBrowser__Label">SORT</h3>
        <div
          :class="{ active: openFilter === 'sort' }"
          class="SwatchBrowser__Filter SwatchBrowser__Sort"
        >
          <button
            class="SwatchBrowser__Pill"
            @click="openFilter = openFilter === 'sort' ? '' : 'sort'"
          >
            {{ sortDisplay }}
            <img src="https://cdn.insideweather.com/icons/dropdown-down-arrow@2x.png" alt="Dropdown arrow">
          </button>
          <div
            v-show="openFilter === 'sort'"
            class="SwatchBrowser__Dialog"
          >
            <div
              v-for="option in sortOptions"
              :key="option.value"
              class="SwatchBrowser__DialogRow"
            >
              <input
                :id="`sortBy-${option.value}`"
                v-model="sortBy"
                type="radio"
                class="visually-hidden"
                :value="option.value"
                @change="openFilter = ''"
              >
              <label
                :for="`sortBy-${option.value}`"
                :class="{ active: sortBy === option.value }"
                class="SwatchBrowser__Label"
              >{{ option.display }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :style="{ opacity: openFilter === '' ? 1 : 0.6 }"
      class="SwatchBrowser__Body"
    >
      <div
        ref="mainContainer"
        :class="mainClasses"
        class="SwatchBrowser__Main"
      >
        <transition
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutRight"
        >
          <swatches-order-form
            v-show="showOrderForm"
            :cart="cart"
            :is-mobile="isMobile"
            :is-submitting="isSubmitting"
            :completed="completed"
            class="SwatchBrowser__Form"
            @close="showOrderForm = false"
          />
        </transition>
        <div class="SwatchBrowser__Browse">
          <div
            ref="swatchContainer"
            class="SwatchBrowser__SwatchContainer"
          >
            <div class="SwatchBrowser__Swatches">
              <div
                v-if="swatches.length && !filteredSwatches.length"
                class="SwatchBrowser__Empty"
              >
                <h3>Sorry, there are no matching swatches.</h3>
                <p>To see more results, try clearing your filters.</p>
                <button
                  class="SwatchBrowser__Button SwatchBrowser__Button--Black"
                  @click="clearFilters"
                >CLEAR FILTERS</button>
              </div>
              <div
                v-for="(swatch, index) in filteredSwatches"
                ref="swatches"
                :key="swatch.variant_id"
                :class="{ 'is-selected': inCart(swatch.variant_id), 'info-active': infoActive(swatch.variant_id) }"
                class="SwatchBrowser__Swatch"
              >
                <button
                  v-if="!infoActive(swatch.variant_id)"
                  class="SwatchBrowser__SwatchInfoToggle"
                  @click="toggleInfo(swatch.variant_id, index)"
                >
                  <img
                    src="https://cdn.insideweather.com/icons/i-circle-gray_ico@2x.png"
                    alt="info"
                  >
                </button>
                <close-button
                  v-else
                  :size="24"
                  class="SwatchBrowser__SwatchInfoToggle"
                  @click.native="toggleInfo(swatch.variant_id, index)"
                />
                <div class="SwatchBrowser__SwatchDetail">
                  <img
                    :src="swatch.image_url"
                    :alt="`${swatch.name} sample`"
                    class="SwatchBrowser__SwatchImage"
                    @click="toggleInfo(swatch.variant_id, index)"
                  >
                  <div
                    class="SwatchBrowser__SwatchBackground"
                    :style="{ backgroundImage: `url(${swatch.image_url})` }"
                  />
                  <div class="SwatchBrowser__SwatchName">{{ swatch.name }}</div>
                  <div class="SwatchBrowser__SwatchSubName">{{ swatch.swatch_type }}</div>
                  <div
                    v-if="swatch.commercial || swatch.performance || swatch.pet_friendly || swatch.water_resistant"
                    class="SwatchBrowser__Badges"
                  >
                    <img
                      v-if="swatch.commercial"
                      src="https://cdn.insideweather.com/icons/commercial_ico@2x.png"
                      alt="Commercial icon"
                    >
                    <img
                      v-if="swatch.pet_friendly"
                      src="https://cdn.insideweather.com/icons/pet-friendly_ico@2x.png"
                      alt="Pet friendly icon"
                    >
                    <img
                      v-if="swatch.performance"
                      src="https://cdn.insideweather.com/icons/performance_ico@2x.png"
                      alt="Performance icon"
                    >
                    <img
                      v-if="swatch.water_resistant"
                      src="https://cdn.insideweather.com/icons/water-resistant_ico@2x.png"
                      alt="Water resistant icon"
                    >
                  </div>
                  <button
                    class="SwatchBrowser__SwatchToggle SwatchBrowser__Button"
                    @click="toggleLineItem(swatch)"
                  >
                    <span v-if="!inCart(swatch.variant_id)">+ ADD</span>
                    <span v-else>REMOVE</span>
                  </button>
                  <div
                    v-if="hasError(swatch.variant_id)"
                    class="SwatchBrowser__Alert"
                  >
                    <close-button
                      :size="14"
                      @click.native.prevent="errorOn = null"
                    />
                    Oops! You already have {{ maxSwatches }} swatches in your cart!
                  </div>
                </div>
                <transition
                  enter-active-class="animated fadeInRight"
                >
                  <swatch-info
                    v-if="infoActive(swatch.variant_id)"
                    :swatch="activeSwatch"
                    :related-products="relatedProducts"
                  />
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="{ full: showOrderForm && showCart }"
        class="SwatchBrowser__Cart"
      >
        <transition
          enter-active-class="animated slideInUp"
          leave-active-class="animated slideOutDown"
        >
          <div
            v-show="!showOrderForm || showCart"
            :class="{ 'is-open': isMobile && showOrderForm && showCart }"
            class="SwatchBrowser__CartBody"
          >
            <div class="SwatchBrowser__CartHeader">
              <h2>
                Your Swatch {{ showOrderForm ? 'Order' : 'Cart' }}
                <span>(Choose up to 10)</span>
              </h2>
              <close-button
                :size="isMobile ? 20 : 24"
                label="BACK TO SWATCHES"
                @click.native="closeFromCart"
              />
            </div>
            <div class="SwatchBrowser__CartCounter">
              <div class="SwatchBrowser__CounterLabel">Your Swatch Cart</div>
              <div class="SwatchBrowser__CartCount">
                {{ cart.length }}/{{ maxSwatches }}
              </div>
            </div>
            <div class="SwatchBrowser__CartItems">
              <cart-swatch
                v-for="item in cart"
                :key="item.variant_id"
                :swatch="item"
                :static="completed"
                @toggle="toggleLineItem(item)"
              />
            </div>
          </div>
        </transition>
        <div
          v-if="!completed"
          class="SwatchBrowser__CartFooter"
        >
          <div class="SwatchBrowser__CartCounter">
            <div class="SwatchBrowser__CounterLabel">Total Swatches:</div>
            <div class="SwatchBrowser__CartCount">
              {{ cart.length }}/{{ maxSwatches }}
            </div>
            <button
              v-if="isMobile && !showCart && showOrderForm"
              class="SwatchBrowser__FooterLink"
              @click.prevent="openCart"
            >VIEW YOUR ORDER</button>
          </div>
          <button
            v-show="!showCart && !showOrderForm"
            class="SwatchBrowser__CartButton SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click.prevent="openCart"
          >ORDER NOW</button>
          <button
            v-show="(showCart && !showOrderForm) || (isMobile && showOrderForm && !showCart)"
            :disabled="isSubmitting"
            :class="{ 'btn--loading': isSubmitting }"
            class="SwatchBrowser__OrderButton SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click.prevent="submitFromCart"
          >{{ showOrderForm && !showCart ? 'SUBMIT SWATCH ORDER' : 'ORDER NOW' }}</button>
          <button
            v-if="isMobile && showOrderForm && showCart"
            class="SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click.prevent="closeFromCart"
          >BACK TO INFORMATION</button>
          <p>Swatches are FREE and arrive in 2-4 business days</p>
        </div>
        <p>
          Are you a Design Professional?
          Join our <a href="https://insideweather.com/pages/designer-trade-program">Designer Trade Program</a>
          to get set up with our exclusive Trade Kit!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DOMPurify from 'dompurify';
import SwatchesOrderForm from './SwatchesOrderForm.vue';
import SwatchInfo from './SwatchInfo.vue';
import CartSwatch from './CartSwatch.vue';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import { filters, sortOptions } from '../static/swatchFilters';
import ApiClient from '../util/ApiClient';
import interpolator from '../mixins/interpolator';

const apiClient = new ApiClient();

export default {
  components: {
    SwatchesOrderForm,
    CloseButton,
    SwatchInfo,
    CartSwatch,
  },

  mixins: [
    interpolator,
    screenMonitor,
  ],

  data() {
    return {
      swatchFilters: filters,
      sortOptions,
      openFilter: '',
      cart: [],
      activeSwatch: null,
      relatedProducts: [],
      errorOn: null,
      maxSwatches: 15,
      showOrderForm: false,
      isSubmitting: false,
      completed: false,
      showCart: !this.isMobile,
      appliedFilters: {
        upholstery_family: [],
        features: [],
        color_family: [],
        design_style: [],
      },
      sortBy: 'color',
    };
  },

  computed: {
    ...mapState({
      swatches: state => state.swatches || [],
    }),

    purify() {
      return html => DOMPurify.sanitize(html);
    },

    filterRowClasses() {
      return option => ({
        top: option.description,
      });
    },

    sortDisplay() {
      const { display } = this.sortOptions.find(option => option.value === this.sortBy);
      return display;
    },

    mainClasses() {
      return {
        'order-form-active': this.showOrderForm,
      };
    },

    isChecked() {
      return (filter, value) => this.appliedFilters[filter].includes(value);
    },

    filteredSwatches() {
      const selections = Object.entries(this.appliedFilters);

      if (!selections.some(([, values]) => !!values.length)) {
        return this.swatches;
      }

      return this.swatches.filter(swatch => (
        selections
          .every(([key, values]) => (
            !values.length || values.some((value) => {
              if (typeof swatch[value] !== 'undefined' && !!swatch[value] === swatch[value]) {
                return swatch[value];
              }
              return swatch[key] === value;
            })
          ))
      )).sort((a, b) => (
        a[`${this.sortBy}_sort_order`] < b[`${this.sortBy}_sort_order`] ? -1 : 1
      ));
    },

    infoActive() {
      return variantId => this.activeSwatch && this.activeSwatch.variant_id === variantId;
    },

    hasError() {
      return variantId => this.errorOn === variantId;
    },

    inCart() {
      return variantId => this.cart.some(item => item.variant_id === variantId);
    },
  },

  watch: {
    openFilter(newValue) {
      const bindCloseEvents = (e) => {
        const clickedOutside = e.type === 'click' && !e.target.closest('.SwatchBrowser__Dialog') && !e.target.closest('.SwatchBrowser__Pill');
        const pressedEscape = e.type === 'keydown' && e.keyCode === 27;
        if (clickedOutside || pressedEscape) {
          this.openFilter = '';
        }
      };

      if (newValue) {
        document.body.addEventListener('click', bindCloseEvents);
        window.addEventListener('keydown', bindCloseEvents);
      } else {
        document.body.removeEventListener('click', bindCloseEvents);
        window.removeEventListener('keydown', bindCloseEvents);
      }
    },
  },

  created() {
    this.pullSwatches();
    this.loadCart();
    this.maxSwatches = window.theme.settings.swatchBrowser.maxSwatches || 15;
    this.$bus.$on('swatch-browser:submission-in-progress', (isSubmitting) => {
      this.isSubmitting = isSubmitting;
    });
    this.$bus.$on('swatch-browser:order-complete', () => {
      this.completed = true;
      this.$refs.mainContainer.scrollTop = 0;
      localStorage.removeItem('swatches.cart');
    });
  },

  mounted() {
    this.$bus.$on('swatch-browser:focus-field', (e) => {
      if (!this.isMobile) {
        return;
      }
      setTimeout(() => {
        const { top, height } = e.target.parentNode.getBoundingClientRect();
        this.$refs.mainContainer.scrollTop = this.$refs.mainContainer.scrollTop + top - height;
      }, 100);
    });
  },

  methods: {
    ...mapActions([
      'pullSwatches',
    ]),

    clearFilters() {
      this.appliedFilters = {
        upholstery_family: [],
        features: [],
        color_family: [],
        design_style: [],
      };
    },

    toggleInfo(variantId, index) {
      const bookends = document.querySelectorAll('.bookend');
      if (bookends.length) {
        bookends.forEach(el => el.classList.remove('bookend'));
      }

      const isCloseAction = this.infoActive(variantId);
      this.activeSwatch = null;

      if (isCloseAction) {
        return;
      }

      this.$nextTick(() => {
        for (let i = index; i >= 0; i--) {
          if (this.$refs.swatches[i].getBoundingClientRect().left < 100) {
            const bookendIndex = i === index ? i + 1 : i;
            this.$refs.swatches[bookendIndex].classList.add('bookend');
            break;
          }
        }
      });

      this.activeSwatch = { variant_id: variantId };
      const selected = this.swatches.find(swatch => swatch.variant_id === variantId);
      apiClient.getSwatchDetail(selected.name).then((swatch) => {
        this.activeSwatch = swatch;
        this.buildRelatedProducts(swatch.related_products, { color_name: swatch.name }).then((products) => {
          this.relatedProducts = products;
        });
      });
    },

    toggleLineItem(swatch) {
      this.errorOn = null;
      const index = this.cart.findIndex(item => item.variant_id === swatch.variant_id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        if (this.cart.length < 1) {
          this.showOrderForm = false;
        }
        this.saveCart();
        return;
      }
      if (this.cart.length >= this.maxSwatches) {
        this.errorOn = swatch.variant_id;
        return;
      }
      this.cart.push(swatch);
      this.saveCart();
    },

    loadCart() {
      const cart = localStorage.getItem('swatches.cart');
      if (cart) {
        this.cart = JSON.parse(cart);
      }
    },

    saveCart() {
      localStorage.setItem('swatches.cart', JSON.stringify(this.cart));
    },

    openCart() {
      this.errorOn = null;
      this.showCart = true;
    },

    backToSwatches() {
      this.showCart = true;
      this.showOrderForm = false;
    },

    closeFromCart() {
      this.showOrderForm = this.isMobile;
      this.showCart = !this.isMobile;
    },

    submitFromCart() {
      if (!this.showOrderForm) {
        this.startOrder();
        return;
      }
      if (this.isMobile && this.showCart) {
        this.showCart = false;
        return;
      }
      this.$bus.$emit('swatch-browser:submit-order');
    },

    startOrder() {
      if (this.cart.length < 1) {
        return;
      }
      this.showOrderForm = true;
      if (this.isMobile) {
        this.showCart = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$filter-height: 120px;

.template-page-swatches {
  @include at-query($breakpoint-small) {
    .main-content {
      position: relative;
      z-index: 1001;
    }

    .orb-chat-mount {
      display: none !important;
    }
  }
}

.SwatchBrowser {
  background: #fff;

  &__Body {
    align-items: flex-start;
    display: flex;
    margin: 40px 0;
    padding: 0 10px;
    transition: opacity .2s linear;

    @include at-query($breakpoint-large) {
      margin: 70px 0;
      padding: 0 40px;
    }
  }

  &__Button {
    background: transparent;
    border: none;
    border-radius: 50px;
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    letter-spacing: .12em;
    padding: 0;
    text-align: center;
    text-transform: uppercase;
    transition: background-color .15s ease-in-out;
    width: 100%;
  }

  &__Button--Black {
    background: #202020;
    color: #fff;
    text-decoration: none;

    &:hover {
      background-color: #3B3B3B;
    }
  }

  &__Trigger {
    align-items: center;
    background: #f2f4f4;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding: 34px;

    @include at-query($breakpoint-mlarge) {
      padding: 36px;
    }

    @include at-query($breakpoint-large) {
      display: flex;
      margin: 0;
      padding: 48px 20px 50px;
      position: sticky;
      text-align: center;
    }

    h3 {
      font-family: $font-stack-avalon;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0.05em;
      line-height: 39px;
      text-align: left;
      color: #202020;
      margin-bottom:16px;

      @include at-query($breakpoint-mlarge) {
        font-size: 34px;
        line-height: 34px;
      }

      @include at-query($breakpoint-large) {
        font-size: 28px;
      }
    }

    p {
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      margin: 0;
      margin-bottom:16px;
      letter-spacing: 0.04em;
      text-align: left;
      color:#202020;

      @include at-query($breakpoint-mlarge) {
        font-size: 15px;
        letter-spacing: .035em;
      }
    }

    img {
      display: block;
      width: 240px;
      height: 196px;
      margin: 18px 25px 18px auto;

    }

    #{&}Button,
    #{&}Link {
      display: block;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .12em;
      text-transform: uppercase;
      text-align: center;
    }

    #{&}Link {
      display: block;
      margin-top: 10px;
      text-decoration: underline;
    }

    #{&}Button {
      background: #fff;
      border: 1px solid #202020;
      margin-top: 30px;
      padding: 12px 0;
      display: block;
      margin-top: 0;
      width: 100%;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.12em;
      color:#202020;

      &:hover, &:active {
        background: #202020;
        border-color: transparent;
        color: #fff;
        text-decoration: none;
      }

    }

    & > div {
      &:first-child {
        margin-left: auto;
        max-width: 282px;
      }

      &:last-child {
        flex: 0 0 35%;
        margin-right:auto;
        margin-left:25px;
        max-width: 284px;

      }
    }
  }

  &__Main {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;

    &.order-form-active + .SwatchBrowser__Cart {

      @include at-query($breakpoint-small) {
        width: 100vw;
        z-index: 1020;

        .SwatchBrowser__CartFooter {
          align-items: flex-end;
          flex: 1;

          button {
            border-radius: 0;
            width: 100%;
          }
        }
      }
    }
  }

  &__Browse {
    display: flex;
    flex-direction: column;
  }

  &__Form {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1020;
  }

  &__Filters {
    background: #f2f0ed;
    display: flex;
    justify-content: center;
    padding: 20px 20px 30px;
    position: sticky;
    top: $header-height;
    z-index: 1010;

    @include at-query($breakpoint-small) {
      top: 0;
    }
  }

  &__FilterGroup {
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;

    & > .SwatchBrowser__Label {
      flex: 1 0 100%;
      margin-bottom: 8px;
    }

    @include at-query($breakpoint-small) {
      flex: 1 1 auto;
      min-width: 0;

      &:first-child {
        margin-right: 8px;

        .SwatchBrowser__Pill {
          font-weight: 600;
          max-width: 110px;
          text-align: center;
        }
      }

      &:last-child > .SwatchBrowser__Label {
        display: none;
      }
    }
  }

  &__FilterPanel {
    @include at-query($breakpoint-small) {
      align-content: flex-start;
      align-items: center;
      background: white;
      height: 100%;
      left: 0;
      overflow-y: auto;
      padding: 0 20px;
      position: fixed;
      top: 0;
      transform: translateY(-100%);
      transition: transform .3s ease-in-out;
      width: 100vw;
      z-index: 10;

      &.is-active {
        padding: 15px;
        transform: translateY(0);
      }

      .SwatchBrowser__Label {
        flex: 1;
        font-weight: 600;
      }

      h3 {
        font-size: 18px;
      }
    }
  }

  &__Filter {
    color: #5a5a5a;
    font-size: 14px;
    margin-right: 30px;
    position: relative;

    input[type="checkbox"] {
      flex: 0 0 auto;
      height: 28px;
      width: 28px;
    }

    @include at-query($breakpoint-small) {
      margin-right: 0;
      width: 100%;

      @at-root {
        .SwatchBrowser__FilterPanel & {
          border-top: 1px solid #D4D0CA;
        }
      }
    }
  }

  &__Label,
  &__Pill {
    font-family: $font-stack-avalon;
    font-size: 14px;
    letter-spacing: 0.05em;
    text-transform: none;
    white-space: nowrap;
  }

  &__Dialog,
  &__Pill {
    background: #fff;
    border: 1px solid #d4d0ca;
    border-radius: 30px;
    text-align: left;

    .active & {
      border-color: #202020;
      color: #202020;
    }

    @include at-query($breakpoint-small) {
      @at-root {
        .SwatchBrowser__FilterPanel & {
          padding-left: 10px;
        }
      }
    }
  }

  &__Pill {
    font-size: 13px;
    padding: 12px 25px;
    position: relative;
    max-width: 100%;
    text-transform: uppercase;
    width: 215px;

    .active & {
      font-weight: 600;
    }

    .SwatchBrowser__Sort & {
      width: 250px;
    }

    img {
      bottom: 0;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 0;
      transition: transform .2s ease-in-out;
      width: 14px;

      @at-root {
        .active & {
          transform: rotate(180deg);
        }
      }
    }

    @include at-query($breakpoint-small) {
      @at-root {
        .SwatchBrowser__FilterPanel & {
          border: none;
          font-weight: 600;
          padding: 20px 0;
          width: 100%;
        }
      }
    }
  }

  &__Dialog {
    margin-top: 15px;
    left: 0;
    min-width: 100%;
    padding: 20px 34px;
    position: absolute;
    top: 100%;
    width: max-content;
    z-index: 10;

    @include at-query($breakpoint-small) {
      @at-root {
        .SwatchBrowser__FilterPanel & {
          border: none;
          margin: 0;
          padding: 0 15px 20px;
          position: static;
          width: 100%;
        }
      }
    }
  }

  &__DialogRow {
    align-items: center;
    display: flex;
    padding: 10px 0;
    position: relative;

    input[type="checkbox"] {
      background: #fff;
      border: 1px solid #202020;
      border-radius: 8px;
      color: #202020;

      &:checked,
      &.checked {
        background: #202020;
        color: #fff;
      }

      &:checked + label::before,
      &.checked + label::before {
        color: white;
        content: "✓";
        display: block;
        font-size: 30px;
        left: 3px;
        line-height: 1;
        position: absolute;
        top: 10px;
      }
    }

    &.top {
      align-items: flex-start;
      margin-top: 10px;

      input {
        margin-top: 2px;
      }
    }

    label {
      align-items: center;
      display: flex;
      font-size: 15px;
      font-weight: 500;
      margin: 0 0 0 15px;

      &.has-description {
        flex-wrap: wrap;
      }

      &.active {
        font-weight: 600;
      }

      p {
        flex: 0 0 100%;
        font-family: $font-stack-avalon;
        font-size: 1em;
        font-weight: 500;
        margin: 5px 0 0;
        white-space: normal;
      }
    }

    .SwatchBrowser__Sort & {
      padding: 30px 0;
    }

    .SwatchBrowser__Sort & + & {
      border-top: 1px solid #d4d0ca;
    }
  }

  &__Color {
    border-radius: 50%;
    height: 20px;
    margin-right: 8px;
    width: 20px;
  }

  &__Icon {
    &--Left {
      border-radius: 50%;
      height: auto;
      margin-right: 15px;
      width: 50px;
    }

    &--Right {
      margin-left: 8px;
      max-height: 20px;
      max-width: 25px;
    }
  }

  &__SwatchContainer {
    height: 100%;
    overflow-y: auto;

    @include at-query($breakpoint-large) {
      margin-right: 40px;
    }
  }

  &__Swatches {
    display: grid;
    flex: 1;
    flex-wrap: wrap;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 92px;

    @include at-query($breakpoint-large) {
      gap: 20px;
      grid-auto-flow: dense;
      grid-template-columns: repeat(auto-fill,245px);
      margin-bottom: 40px;
      padding-bottom: 0;
    }
  }

  &__Empty {
    align-items: center;
    display: flex;
    flex-direction: column;
    grid-column-start: 1;
    grid-column-end: -1;
    justify-content: center;

    h3, p {
      font-family: $font-stack-avalon;
    }

    h3 {
      font-size: 22px;
      text-align: center;
    }

    p {
      font-size: 14px;
      font-weight: 500;
    }

    button {
      max-width: 100%;
      width: 300px;
    }
  }

  &__Swatch {
    align-items: center;
    border: 1px solid #e1deda;
    border-radius: 30px;
    display: flex;
    flex: 0 0 50%;
    padding: 15px 15px 5px 15px;
    position: relative;
    // flex-direction: column;
    justify-content: center;
    text-align: center;

    @include at-query($breakpoint-large) {
      flex: 0 0 225px;
    }

    &.is-selected:not(.info-active) {
      background: #f2f2f2;
      border-color: #202020;
    }

    &.bookend,
    &.bookend ~ & {
      order: 2;
    }

    &.info-active {
      align-items: flex-start;
      grid-column-start: 1;
      grid-column-end: -1;
      justify-content: flex-start;
      order: 1 !important;

      @include at-query($breakpoint-small) {
        background: white;
        flex-direction: column;
        height: 100%;
        left: 0;
        padding: 0;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 1000;
      }
    }

    #{&}InfoToggle {
      position: absolute;
      right: 10px;
      top: 10px;

      @include at-query($breakpoint-large) {
        right: 15px;
        top: 10px;
      }

      img {
        display: block;
        width: 24px;
      }
    }

    #{&}Background {
      display: none;
    }

    #{&}Detail {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex: 0 1 auto;
    }

    &.info-active #{&}Detail {
      margin-top: 20px;
      padding: 0 15px;

      @include at-query($breakpoint-small) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0;
        width: 100vw;

        .SwatchBrowser__SwatchImage {
          display: none;
        }

        .SwatchBrowser__SwatchBackground {
          background-position: center;
          background-size: cover;
          display: block;
          flex: 1 0 100%;
          height: 150px;
          margin: -15px -15px 0;
          width: 100%;
        }

        .SwatchBrowser__SwatchName {
          flex: 0 0 51%;
          font-size: 20px;
          text-align: left;
        }

        .SwatchBrowser__SwatchSubName {
          flex: 0 0 51%;
          font-size: 14px;
          text-align: left;
        }

        .SwatchBrowser__Badges {
          display: none;
        }

        button {
          background: #202020;
          color: #fff;
          margin-top: -20px;
          padding: 10px 30px;
        }
      }
    }

    #{&}Info {
      display: flex;
      height: 100%;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      padding: 0 15px;

      @include at-query($breakpoint-small) {
        margin-top: 20px;
        padding: 0;
        width: 100%;
      }

      @include at-query($breakpoint-large) {
        padding: 0 30px;
      }
    }

    #{&}Image {
      border-radius: 50%;
      height: auto;
      width: 134px;

      @include at-query($breakpoint-large) {
        width: 200px;
      }
    }

    @at-root {
      #{&}Name {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .05em;
        line-height: 1.1;
        margin-bottom: 5px;
        margin-top: 15px;

        @include at-query($breakpoint-large) {
          font-size: 16px;
          line-height: 18px;
        }
      }

      #{&}SubName {
        font-family: $font-stack-avalon;
        font-size: 8px;
        letter-spacing: .1em;
        text-transform: uppercase;
        white-space: nowrap;

        @include at-query($breakpoint-large) {
          font-size: 12px;
        }
      }
    }

    #{&}Description,
    #{&}Composition {
      font-family: $font-stack-roboto;
      font-size: 10px;
      letter-spacing: .015em;
      line-height: 13px;
      margin: 15px 0;

      @include at-query($breakpoint-large) {
        font-size: 12px;
        letter-spacing: .025em;
        line-height: 16px;
      }
    }

    #{&}Composition {
      margin-bottom: 0;
    }

    #{&}Toggle {
      height: auto;
      padding: 18px 15px;
      width: auto;

      span {
        border-bottom: 1px solid #202020;
        line-height: 1.1;
      }
    }
  }

  &__Details {
    padding-left: 20px;
    text-align: left;

    &, p, span, th, td {
      font-family: $font-stack-avalon;
    }

    & > p {
      margin: 20px 0 40px;
    }

    @include at-query($breakpoint-small) {
      padding: 0 15px;
    }
  }

  &__Badges {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    img {
      height: 20px;
      margin: 0 5px;
      width: auto;
    }

    & > span {
      align-items: center;
      display: flex;
      flex: 1;
      margin: 5px 40px 5px 0;
      white-space: nowrap;
    }
  }

  &__Alert {
    background: #202020;
    border-radius: 50px;
    color: #fff;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .035em;
    line-height: 20px;
    top: 100%;
    padding: 12px 30px;
    position: absolute;
    right: 10%;
    text-align: left;
    width: 150px;
    z-index: 10;

    @include at-query($breakpoint-large) {
      width: 225px;
    }

    &::before {
      border: solid transparent;
      bottom: 100%;
      content: '';
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 30%;
      width: 0;
    }

    &::before {
      border-bottom-color: #202020;
      border-width: 0 12px 12px 12px;
      margin-left: -12px;
    }

    .CloseButton {
      position: absolute;
      right: 10px;
      top: 6px;
    }
  }

  &__LineImage {
    border-radius: 50%;
    flex: 0 0 35px;
    width: 35px;

    @include at-query($breakpoint-large) {
      flex-basis: 64px;
      width: 64px;
    }
  }

  .full &__LineImage {
    @include at-query($breakpoint-small) {
      flex-basis: 70px;
      width: 70px;
    }
  }

  &__LineDescription {
    color: #202020;
    flex: 1;
    font-weight: 500;
  }

  &__Cart {
    border-radius: 50px;
    display: flex;
    flex: 0 0 445px;
    flex-direction: column;
    overflow: visible;

    p {
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      margin: 15px;
      text-align: center;

      a {
        font-weight: 700;
        text-decoration: underline;
      }
    }

    @at-root {
      .order-form-active + & {
        p {
          display: none;
        }
      }
    }

    @include at-query($breakpoint-small) {
      background: #F2F0ED;
      border: none;
      border-radius: 0;
      bottom: 0;
      flex-direction: row;
      height: 90px;
      justify-content: flex-end;
      left: 0;
      pointer-events: none;
      position: fixed;
      width: 100vw;

      p {
        display: none;
      }

      #{&}Footer button {
        padding-left: 15px;
        padding-right: 15px;
        width: auto;
      }
    }

    @include at-query($breakpoint-large) {
      max-height: calc(100vh - #{$header-height + $filter-height + 20px});
      position: sticky;
      top: $header-height + $filter-height + 20px;

      & > p {
        margin: 0 70px;
        transform: translateY(50%);
      }

      @at-root {
        .order-form-active + & {
          background: #fff;
          border: none;
          border-left: 1px solid #D4D0CA;
          border-radius: 0;
          height: 100%;
          max-height: 100vh;
          padding: 0 40px;
          position: fixed;
          right: 0;
          top: 0;
          width: 480px;
          z-index: 1020;

          .SwatchBrowser__CartHeader {
            flex-wrap: wrap;
            justify-content: flex-end;

            h2 {
              flex: 1 1 100%;

              span {
                display: none;
              }
            }

            .CloseButton {
              display: flex;
              order: -1;
            }
          }

          .SwatchBrowser__CartBody {
            border: none;
            border-radius: 0;
            flex: 0 1 auto;
          }

          .SwatchBrowser__CartItems {
            align-content: flex-start;
            align-items: flex-start;
            margin: 20px 0;
            overflow-y: auto;
            flex-wrap: wrap;
            align-content: flex-start;
          }

          .SwatchBrowser__LineImage {
            flex: 0 0 70px;
            width: 70px;
          }

          .SwatchBrowser__CartFooter {
            border: none;
          }
        }
      }
    }

    #{&}Header {
      color: #202020;
      display: none;
      justify-content: space-between;
      padding: 20px;
      pointer-events: all;

      @include at-query($breakpoint-large) {
        display: flex;
        padding: 30px 30px 10px;
      }

      h2 {
        align-items: center;
        display: flex;
        font-size: 20px;
        font-weight: 600;
        margin: 0;

        span {
          font-family: $font-stack-avalon;
          font-size: 14px;
          font-weight: 400;
          margin-left: 15px;
        }
      }

      .CloseButton {
        @include at-query($breakpoint-large) {
          display: none;
        }
      }
    }

    #{&}Footer {
      pointer-events: all;

      @include at-query($breakpoint-small) {
        align-items: center;
        display: flex;
        flex: 0 1 40%;
        justify-content: center;

        @at-root {
          .SwatchBrowser__Main:not(.order-form-active) + .SwatchBrowser__Cart .SwatchBrowser__CartFooter .SwatchBrowser__CartCounter {
            display: none;
          }
        }
      }

      @include at-query($breakpoint-large) {
        border: 1px solid #e1deda;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        border-top: none;
        padding: 0 30px;
      }
    }

    #{&}Counter {
      display: flex;
      font-size: 13px;
      font-weight: 500;
      justify-content: space-between;
      letter-spacing: .05em;
      line-height: 14px;
      padding: 15px;

      @include at-query($breakpoint-large) {
        font-size: 16px;
        padding: 10px 0 20px 0;
      }

      #{&}Label {
        @include at-query($breakpoint-small) {
          display: none;
        }
      }
    }

  }

  &__CartCount {
    margin-left: 15px;
  }

  &__FooterLink {
    flex: 1;
    font-family: $font-stack-avalon;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: .12em;
    line-height: 1;
    padding: 0;
    text-align: right;
    text-decoration: underline;
  }

  &__CartBody {
    animation-duration: .3s;
    background: #fff;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    pointer-events: all;

    @include at-query($breakpoint-small) {
      background: #F2F0ED;
      flex: 1 1 60%;
      overflow-x: auto;

      & > .SwatchBrowser__CartCounter {
        padding: 5px 0 5px 15px;
      }

      &.is-open {
        position: fixed;
        top: 0;
        left: 0;
        background: white;
        height: calc(100% - 90px);
        width: 100%;

        & > .SwatchBrowser__CartCounter {
          display: none;
        }

        .SwatchBrowser__CartHeader {
          display: flex;

          span {
            display: none;
          }

          h3 {
            flex: 1;
          }

          button {
            flex: 0;
          }
        }
      }

      @at-root {
        .order-form-active + .SwatchBrowser__Cart .SwatchBrowser__CartFooter {
          flex-wrap: wrap;

          .SwatchBrowser__CartCounter {
            flex: 1 1 100%;
          }
        }
      }
    }

    @include at-query($breakpoint-large) {
      border: 1px solid #e1deda;
      border-bottom: none;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      overflow: auto;

      & > .SwatchBrowser__CartCounter {
        display: none;
      }
    }
  }

  &__CartItems {
    display: flex;
    flex: 1;
    padding: 0 15px;
    overflow-x: auto;

    @include at-query($breakpoint-large) {
      flex-wrap: wrap;
      min-height: 155px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}

.SwatchMobile {
  &__Trigger {
    align-items: center;
    background: #f2f4f4;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding: 30px 26px;
    @include at-query($breakpoint-mlarge) {
      padding: 36px;
    }
    @include at-query($breakpoint-large) {
      display: block;
      margin: 0;
      padding: 48px 20px 50px;
      position: sticky;
      text-align: center;
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom:16px;
      line-height: 24px;
      @include at-query($breakpoint-mlarge) {
        font-size: 32px;
        line-height: 32px;
      }
      @include at-query($breakpoint-large) {
        font-size: 28px;
      }
    }
    p {
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      margin: 0;
      @include at-query($breakpoint-mlarge) {
        font-size: 15px;
        letter-spacing: .035em;
      }
    }
    img {
      display: block;
      @include at-query($breakpoint-large) {
        margin: 35px 0;
      }
    }
    #{&}Button,
    #{&}Link {
      display: block;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    #{&}Link {
      display: block;
      margin-top: 20px;
      padding-left: 0;
      padding-right: 0;
      text-align: left;
      text-decoration: underline;
      white-space: nowrap;
    }
    #{&}Button {
      background: #fff;
      border: 1px solid #202020;
      margin-top: 30px;
      padding: 12px 0;
      &:hover, &:active {
        background: #202020;
        border-color: transparent;
        color: #fff;
        text-decoration: none;
      }
      @include at-query($breakpoint-mlarge) {
        display: inline-block;
        padding: 12px 30px;
      }
      @include at-query($breakpoint-large) {
        display: block;
        margin-top: 0;
        width: 100%;
      }
    }
    & > div {
      &:first-child {
        @include at-query($breakpoint-small) {
          padding-right: 22px;
        }
        @include at-query($breakpoint-large) {
          margin: 0 auto;
          max-width: 282px;
        }
      }
      &:last-child {
        flex: 0 0 135px;
        @include at-query($breakpoint-mlarge) {
          display: flex;
          flex: 0 0 45%;
          justify-content: flex-end;
        }
        @include at-query($breakpoint-large) {
          display: inline-block;
        }
      }
    }
  }
}
</style>
