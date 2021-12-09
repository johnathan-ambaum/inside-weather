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
              class="SwatchBrowser__DialogRow"
            >
              <input
                :id="`filter-${filter.key}-${option.value}`"
                v-model="appliedFilters[filter.key]"
                type="checkbox"
                :value="option.value"
                :checked="isChecked(filter.key, option.value)"
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
                v-for="swatch in filteredSwatches"
                :key="swatch.variant_id"
                :class="{ 'is-selected': inCart(swatch.variant_id), 'info-active': infoActive(swatch.variant_id) }"
                class="SwatchBrowser__Swatch"
              >
                <button
                  v-if="!infoActive(swatch.variant_id)"
                  class="SwatchBrowser__SwatchInfoToggle"
                  @click="toggleInfo(swatch.variant_id)"
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
                  @click.native="toggleInfo(swatch.variant_id)"
                />
                <div class="SwatchBrowser__SwatchDetail">
                  <img
                    :src="swatch.image_url"
                    :alt="`${swatch.name} sample`"
                    class="SwatchBrowser__SwatchImage"
                    @click="toggleInfo(swatch.variant_id)"
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
                      style="width: 20px;"
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
                      style="width: 12px;"
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
                  leave-active-class="animated fadeOutRight"
                >
                  <div
                    v-if="infoActive(swatch.variant_id)"
                    class="SwatchBrowser__SwatchInfo"
                  >
                    <div class="SwatchBrowser__Tabs">
                      <button
                        class="SwatchBrowser__Tab"
                        :class="{ 'is-active': activeTab === 'details' }"
                        @click="activeTab = 'details'"
                      >DETAILS</button>
                      <button
                        v-if="hasPhotos"
                        class="SwatchBrowser__Tab"
                        :class="{ 'is-active': activeTab === 'photos' }"
                        @click="activeTab = 'photos'"
                      >PHOTOS</button>
                      <button
                        v-if="hasRelated"
                        class="SwatchBrowser__Tab"
                        :class="{ 'is-active': activeTab === 'shop' }"
                        @click="activeTab = 'shop'"
                      >SHOP</button>
                    </div>
                    <div
                      v-show="activeTab === 'details'"
                      class="SwatchBrowser__Details"
                    >
                      <div
                        v-if="activeSwatch.commercial || activeSwatch.performance || activeSwatch.pet_friendly || activeSwatch.water_resistant"
                        class="SwatchBrowser__Badges"
                      >
                        <span v-if="swatch.commercial">
                          <img
                            src="https://cdn.insideweather.com/icons/commercial_ico@2x.png"
                            alt="Commercial icon"
                            style="width: 20px;"
                          >
                          Commercial
                        </span>
                        <span v-if="swatch.pet_friendly">
                          <img
                            src="https://cdn.insideweather.com/icons/pet-friendly_ico@2x.png"
                            alt="Pet friendly icon"
                          >
                          Pet-Friendly
                        </span>
                        <span v-if="swatch.performance">
                          <img
                            src="https://cdn.insideweather.com/icons/performance_ico@2x.png"
                            alt="Performance icon"
                          >
                          Performance
                        </span>
                        <span v-if="swatch.water_resistant">
                          <img
                            src="https://cdn.insideweather.com/icons/water-resistant_ico@2x.png"
                            alt="Water resistant icon"
                            style="width: 12px;"
                          >
                          Water Resistant
                        </span>
                      </div>
                      <p>{{ activeSwatch.description }}</p>
                      <div class="SwatchBrowser__Specs">
                        <div
                          v-if="activeSwatch.composition"
                          style="float: left;"
                        >
                          <span>COMPOSITION</span>
                          {{ activeSwatch.composition }}
                        </div>
                        <div v-if="activeSwatch.durability_description">
                          <span>DURABILITY</span>
                          {{ activeSwatch.durability_description }}
                        </div>
                        <div v-if="activeSwatch.cleaning_description">
                          <span>CLEANING</span>
                          {{ activeSwatch.cleaning_description }}
                        </div>
                        <div v-if="activeSwatch.enable_stain_chart">
                          <span>STAIN RESISTANT TEST RESULTS</span>
                          <table>
                            <thead>
                              <tr>
                                <th>Mustard</th>
                                <th>Wine</th>
                                <th>Soda</th>
                                <th>Water</th>
                                <th>Oil</th>
                                <th>Ketchup</th>
                                <th>Soil</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_mustard }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_wine }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_soda }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_water }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_oil }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_ketchup }}</td>
                                <td>{{ activeSwatch.stain_chart_data.stain_resistant_soil }}</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colspan="2">1 = Partial stain release</td>
                                <td colspan="3">3.5+ = Commercial passing score</td>
                                <td colspan="2">5 = Complete stain release</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                    <lifestyle-grid
                      v-if="hasPhotos"
                      v-show="activeTab === 'photos'"
                      class="SwatchBrowser__Photos"
                      :images="activeSwatch.lifestyle_grid.images"
                    />
                    <div
                      v-if="hasRelated"
                      v-show="activeTab === 'shop'"
                      class="SwatchBrowser__Shop"
                    >
                      <div class="SwatchBrowser__RelatedProducts related-products__cards">
                        <div
                          v-for="relatedProduct in relatedProducts"
                          :key="relatedProduct.title"
                          class="related-products__card"
                        >
                          <template v-if="relatedProduct.image.medium">
                            <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image.medium[0]"></a>
                          </template>
                          <template v-else>
                            <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image"></a>
                          </template>
                          <a :href="relatedProduct.url"><p class="related-products__title">{{ relatedProduct.title }}</p></a>
                          <a :href="relatedProduct.url">SHOP</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="SwatchBrowser__Cart">
        <transition
          enter-active-class="animated slideInUp"
          leave-active-class="animated slideOutDown"
        >
          <div
            v-show="showCart"
            class="SwatchBrowser__CartBody"
          >
            <div class="SwatchBrowser__CartHeader">
              <h2>
                Your Swatch Cart
                <span>(Choose up to 10)</span>
              </h2>
              <close-button
                :size="isMobile ? 20 : 24"
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
              <div
                v-for="item in cart"
                :key="item.variant_id"
                class="SwatchBrowser__CartItem"
              >
                <img
                  :src="item.image_url"
                  :alt="`${item.name} sample`"
                  class="SwatchBrowser__LineImage"
                >
                <div class="SwatchBrowser__SwatchName">{{ item.name }}</div>
                <div class="SwatchBrowser__SwatchSubName">{{ item.swatch_type }}</div>
                <button
                  v-if="!completed"
                  @click="toggleLineItem(item)"
                >
                  <img src="https://cdn.insideweather.com/icons/x-circle-black_ico@2x.png" alt="Remove from cart">
                </button>
              </div>
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
            >VIEW YOUR CART</button>
            <button
              v-if="isMobile && showCart"
              class="SwatchBrowser__FooterLink"
              @click.prevent="backToSwatches"
            >BACK TO SWATCHES</button>
          </div>
          <button
            v-show="!showCart && !showOrderForm"
            class="SwatchBrowser__CartButton SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click.prevent="openCart"
          >ORDER NOW</button>
          <button
            v-show="(showCart && !showOrderForm) || (isMobile && showOrderForm)"
            :disabled="isSubmitting"
            :class="{ 'btn--loading': isSubmitting }"
            class="SwatchBrowser__OrderButton SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click.prevent="submitFromCart"
          >{{ showOrderForm && !showCart ? 'SUBMIT SWATCH ORDER' : 'ORDER NOW' }}</button>
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
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';
import { filters, sortOptions } from '../static/swatchFilters';
import ApiClient from '../util/ApiClient';
import LifestyleGrid from './CMSBlocks/LifestyleGrid.vue';
import interpolator from '../mixins/interpolator';

const apiClient = new ApiClient();

export default {
  components: {
    SwatchesOrderForm,
    CloseButton,
    LifestyleGrid,
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
      activeTab: 'details',
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

    sortDisplay() {
      const { display } = this.sortOptions.find(option => option.value === this.sortBy);
      return display;
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

    hasPhotos() {
      if (!this.activeSwatch || !this.activeSwatch.lifestyle_grid) {
        return false;
      }
      return this.activeSwatch.lifestyle_grid.images && this.activeSwatch.lifestyle_grid.images.length;
    },

    hasRelated() {
      return this.activeSwatch && this.activeSwatch.related_products && this.relatedProducts.length;
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

    toggleInfo(variantId) {
      this.activeTab = 'details';
      if (this.infoActive(variantId)) {
        this.activeSwatch = null;
        return;
      }

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
      this.showCart = false;
      this.showOrderForm = false;
    },

    closeFromCart() {
      if (this.isMobile) {
        this.showCart = false;
      }
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

.template-page-swatches .main-content {
  @include at-query($breakpoint-small) {
    position: relative;
    z-index: 1001;
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
    z-index: 1000;
  }

  &__Filters {
    background: #f2f0ed;
    display: flex;
    justify-content: center;
    padding: 20px 20px 30px;
    position: sticky;
    top: $header-height;
    z-index: 10;

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
      flex: 1 1 50%;
      min-width: 0;

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
    padding: 20px 30px;
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

    label {
      align-items: center;
      display: flex;
      margin: 0 0 0 15px;
      font-weight: 600;

      &.has-description {
        flex-wrap: wrap;
      }

      &.active {
        font-weight: 700;
      }

      p {
        flex: 0 0 100%;
        font-family: $font-stack-avalon;
        font-size: 1em;
        font-weight: 500;
        margin: 5px 0 0;
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
      grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
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
    padding: 15px 15px 10px 15px;
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

    &.info-active {
      align-items: flex-start;
      grid-column-start: 1;
      grid-column-end: -1;
      justify-content: flex-start;

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
        right: 20px;
        top: 20px;
      }

      img {
        display: block;
        width: 20px;
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
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .05em;
        line-height: 1;
        margin-top: 15px;

        @include at-query($breakpoint-large) {
          font-size: 14px;
          line-height: 18px;
        }
      }

      #{&}SubName {
        font-family: $font-stack-roboto;
        font-size: 8px;
        letter-spacing: .1em;
        text-transform: uppercase;
        white-space: nowrap;

        @include at-query($breakpoint-large) {
          font-size: 10px;
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

  &__Tabs {
    display: flex;
    max-width: 100%;
    width: 660px;
  }

  &__Tab {
    border-bottom: 2px solid #D4D0CA;
    flex: 1;
    font-family: $font-stack-avalon;
    font-size: 17px;
    letter-spacing: 0.125em;
    padding: 10px 0 15px 0;

    &.is-active {
      border-bottom-color: #202020;
      font-weight: 500;
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

  &__Specs {
    font-size: 15px;

    & > div {
      margin-bottom: 10px;

      &:first-child {
        margin-right: 50px;

        @include at-query($breakpoint-small) {
          float: none !important;
        }
      }
    }

    span {
      margin-right: 8px;
    }

    span, th {
      font-weight: 500;
    }

    table {
      background: white;
      border-collapse: collapse;
      width: auto;
    }

    th {
      font-size: 13px;
      padding: 4px 0;
    }

    tbody {
      border-top: 1px solid #D4D0CA;
    }

    th, td {
      padding-bottom: 4px;
      padding-top: 4px;
      text-align: center;

      @include at-query($breakpoint-small) {
        font-size: 10px;
      }
    }

    td {
      padding: 4px 10px;

      @include at-query($breakpoint-large) {
        padding: 4px 25px;
      }
    }

    th + th,
    td + td {
      border-left: 1px solid #D4D0CA;
    }

    tfoot {
      margin-top: 10px;

      td {
        border: none;
        font-size: 12px;
        font-weight: 400;

        @include at-query($breakpoint-small) {
          display: block;
          text-align: left;
        }
      }
    }
  }

  &__Badges {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    img {
      height: auto;
      margin: 0 5px;
      width: 15px;
    }

    & > span {
      align-items: center;
      display: flex;
      flex: 1;
      margin: 5px 40px 5px 0;
      white-space: nowrap;
    }
  }

  &__Photos {
    max-height: 500px;
    margin: 30px 0;
    padding: 0 5px;
  }

  &__RelatedProducts {
    justify-content: flex-start;
    margin-top: 30px;
    max-height: 500px;
    overflow-y: auto;

    .related-products__title {
      margin-bottom: 5px;
    }

    a:last-child {
      border-bottom: 1px solid #202020;
      font-family: $font-stack-avalon;
      font-size: 14px;
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
    width: 225px;
    z-index: 10;

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

  &__LineDescription {
    color: #202020;
    flex: 1;
    font-weight: 500;
  }

  &__Cart {
    border: 1px solid #e1deda;
    border-radius: 50px;
    display: flex;
    flex: 0 0 445px;
    flex-direction: column;
    overflow: hidden;

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

      button {
        padding-left: 15px;
        padding-right: 15px;
        width: auto;
      }
    }

    @include at-query($breakpoint-large) {
      max-height: calc(100vh - #{$header-height + $filter-height + 20px});
      overflow: auto;
      position: sticky;
      top: $header-height + $filter-height + 20px;
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
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }

      span {
        font-family: $font-stack-roboto;
        font-size: .7em;
        font-weight: 400;
        margin-left: 15px;
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

        .SwatchBrowser__CartCounter {
          display: none;
        }
      }

      @include at-query($breakpoint-large) {
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
    font-weight: 500;
    letter-spacing: .12em;
    padding: 0;
    text-align: right;
    text-decoration: underline;

    @include at-query($breakpoint-small) {
      display: none;
    }
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
    }

    @include at-query($breakpoint-large) {
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

  &__CartItem {
    align-items: center;
    display: flex;
    flex: 0 0 33.333%;
    flex-direction: column;
    font-size: 12px;
    letter-spacing: .05em;
    line-height: 18px;
    min-width: 0;
    padding: 10px 5px;
    position: relative;
    text-align: center;

    @include at-query($breakpoint-small) {
      @at-root {
        .SwatchBrowser__Cart:not(.full) & {
          flex: 0 0 45px;

          .SwatchBrowser__SwatchName,
          .SwatchBrowser__SwatchSubName {
            display: none;
          }

          button {
            right: 2px;
          }
        }
      }
    }

    @include at-query($breakpoint-large) {
      flex: 0 0 25%;
      font-size: 14px;
    }

    button {
      background: none;
      border: none;
      color: #202020;
      flex: 0;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: .05em;
      margin-left: 22px;
      padding: 0;
      position: absolute;
      right: 15px;
      text-decoration: underline;
      top: 5px;
      width: 20px;
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
