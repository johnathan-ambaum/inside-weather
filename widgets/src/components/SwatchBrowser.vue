<template>
  <div v-if="enable">
    <div
      v-if="!isMobile"
      class="SwatchBrowser__Trigger">
      <div>
        <img :src="triggerImage">
      </div>
      <div>
        <h3>Stop drooling over your keyboard.</h3>
        <p>Have your favorites delivered to you in less than 3 days, for free.</p>
        <button
          :class="triggerClasses"
          @click="active = true"
        >Get Free Swatches</button>
      </div>
    </div>
    <div
      v-if="isMobile"
      class="SwatchMobile__Trigger">
      <div>
        <h3>Stop drooling over your keyboard.</h3>
        <p>Have your favorites delivered to you in less than 3 days, for free.</p>
        <button
          :class="triggerClassesMobile"
          @click="active = true"
        >Get Free Swatches</button>
      </div>
      <div>
        <img
          :src="triggerImage"
          @click="active = true"
        >
      </div>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="active"
        class="SwatchBrowser"
      >
        <div
          ref="mainContainer"
          class="SwatchBrowser__Main"
        >
          <transition-group
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          >
            <swatches-order-form
              v-show="showOrderForm"
              key="order-form"
              :cart="cart"
              :is-mobile="isMobile"
              :is-submitting="isSubmitting"
              :completed="completed"
              class="SwatchBrowser__Form"
              @close="showOrderForm = false"
              @exit="active = false"
            />
            <div
              v-show="!showOrderForm"
              key="browser"
              class="SwatchBrowser__Browse"
            >
              <div class="SwatchBrowser__Header">
                <close-button
                  v-if="isMobile"
                  :size="20"
                  @click.native.prevent="active = false"
                />
                <div class="SwatchBrowser__Description">
                  <h2>{{ category }} Swatches</h2>
                  <p ref="description">Select up to {{ maxSwatches }} of your favorites and we'll send &amp; ship them to your doorstep for free!</p>
                </div>
                <div
                  ref="legend"
                  class="SwatchBrowser__BadgeKeys"
                >
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-pet-friendly.png?1111111111111"
                      alt="Pet friendly icon"
                    >
                    <span>Pet Friendly</span>
                  </div>
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-performance.png?1111111111111"
                      alt="Performance icon"
                    >
                    <span>Performance</span>
                  </div>
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-ez-clean.png?1111111111111"
                      alt="Commercial icon"
                    >
                    <span>Commercial</span>
                  </div>
                </div>
                <div
                  v-if="groups.length > 0"
                  class="SwatchBrowser__Filter"
                >
                  <select
                    v-if="isMobile"
                    :value="group.name"
                    class="FilterPanel__GroupSelect"
                    @change="e => setGroup(e.target.value)"
                  >
                    <option
                      v-for="option in groupOptions"
                      :key="option.value"
                      :value="option.value"
                    >{{ option.display }}</option>
                  </select>
                  <styled-select
                    v-else
                    :options="groupOptions"
                    :value="group.name"
                    class="FilterPanel__GroupSelect"
                    @input="setGroup"
                  />
                </div>
              </div>
              <div
                ref="swatchContainer"
                class="SwatchBrowser__SwatchContainer"
                @scroll="onScroll"
              >
                <div class="SwatchBrowser__Swatches">
                  <div
                    v-for="swatch in filteredSwatches"
                    :key="swatch.variant_id"
                    :class="{ 'is-selected': inCart(swatch.variant_id) }"
                    class="SwatchBrowser__Swatch"
                  >
                    <button
                      v-if="!infoActive(swatch.variant_id)"
                      class="SwatchBrowser__SwatchInfoToggle"
                      @click="toggleInfo(swatch.variant_id)"
                    >
                      <img
                        src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-info.png"
                        alt="info"
                      >
                    </button>
                    <close-button
                      v-else
                      size="16"
                      class="SwatchBrowser__SwatchInfoToggle"
                      @click.native="toggleInfo(swatch.variant_id)"
                    />
                    <div class="SwatchBrowser__SwatchDetail">
                      <img
                        v-if="!infoActive(swatch.variant_id)"
                        :src="swatch.image_url"
                        :alt="`${swatch.name} sample`"
                        class="SwatchBrowser__SwatchImage"
                      >
                      <div class="SwatchBrowser__SwatchName">{{ swatch.name }}</div>
                      <div class="SwatchBrowser__SwatchSubName">{{ swatch.swatch_type }}</div>
                      <div
                        v-if="infoActive(swatch.variant_id)"
                        class="SwatchBrowser__SwatchComposition"
                      >{{ swatch.composition }}</div>
                      <div
                        v-if="infoActive(swatch.variant_id)"
                        class="SwatchBrowser__SwatchDescription"
                        v-html="swatch.description"
                      />
                    </div>
                    <div
                      v-if="swatch.easy_clean || swatch.performance || swatch.pet_friendly"
                      class="SwatchBrowser__Badges"
                    >
                      <img
                        v-if="swatch.pet_friendly"
                        src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-pet-friendly.png?111111111111"
                        alt="Pet friendly icon"
                      >
                      <img
                        v-if="swatch.performance"
                        src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-performance.png?111111111111"
                        alt="Performance icon"
                      >
                      <img
                        v-if="swatch.easy_clean"
                        src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-ez-clean.png?111111111111"
                        alt="Commercial icon"
                      >
                    </div>
                    <button
                      :class="{ 'SwatchBrowser__SwatchToggle--InCart': inCart(swatch.variant_id) }"
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
                </div>
              </div>
            </div>
          </transition-group>
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
                <h2>Your Cart</h2>
                <close-button
                  :size="isMobile ? 20 : 24"
                  @click.native="closeFromCart"
                />
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
                  <span class="SwatchBrowser__LineDescription">{{ item.name }} {{ item.swatch_type }}</span>
                  <button
                    v-if="!completed"
                    @click="toggleLineItem(item)"
                  >remove</button>
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
              <div
                :class="{ 'is-full': cart.length >= maxSwatches }"
                class="SwatchBrowser__CartCount"
              >{{ cart.length }}/{{ maxSwatches }}</div>
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
            >VIEW YOUR CART</button>
            <button
              v-show="(showCart && !showOrderForm) || (isMobile && showOrderForm)"
              :disabled="isSubmitting"
              :class="{ 'btn--loading': isSubmitting }"
              class="SwatchBrowser__OrderButton SwatchBrowser__Button SwatchBrowser__Button--Black"
              @click.prevent="submitFromCart"
            >{{ showOrderForm && !showCart ? 'SUBMIT SWATCH ORDER' : 'ORDER NOW' }}</button>
            <button
              v-show="!showOrderForm"
              class="SwatchBrowser__ContinueButton SwatchBrowser__Button"
              @click.prevent="active = false"
            >CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SwatchesOrderForm from './SwatchesOrderForm.vue';
import CloseButton from './CloseButton.vue';
import StyledSelect from './StyledSelect.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    SwatchesOrderForm,
    CloseButton,
    StyledSelect,
  },

  mixins: [
    screenMonitor,
  ],

  data() {
    return {
      active: false,
      cart: [],
      activeInfos: [],
      errorOn: null,
      maxSwatches: 15,
      showOrderForm: false,
      isSubmitting: false,
      completed: false,
      showCart: false,
      group: '',
    };
  },

  computed: {
    ...mapState({
      enable: state => state.filters && state.filters.enable_swatches === true,
      category: state => state.category,
      swatches: state => state.swatches.swatches || [],
      groups: state => state.swatches.groups || [],
    }),

    groupOptions() {
      return this.groups.map((group) => {
        let display = this.isMobile ? group.name : `<strong>${group.name}</strong>`;
        if (group.prefix) {
          display = `${group.prefix} ${display}`;
        }
        return {
          value: group.name,
          display,
        };
      });
    },

    filteredSwatches() {
      if (!this.group) {
        return this.swatches;
      }

      if (this.group.group_type === 'sort') {
        return [...this.swatches].sort((a, b) => (a[this.group.reference] < b[this.group.reference] ? -1 : 1));
      }

      return this.swatches.filter(swatch => swatch[this.group.reference]);
    },

    triggerClasses() {
      return {
        SwatchBrowser__TriggerLink: this.screenWidth < 768,
        SwatchBrowser__TriggerButton: this.isTablet || this.screenWidth > 768,
      };
    },

    triggerClassesMobile() {
      return {
        SwatchMobile__TriggerLink: this.screenWidth < 768,
        SwatchMobile__TriggerButton: this.isTablet,
      };
    },

    triggerImage() {
      if (this.isTablet) {
        return '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/free-swatches-tablet.jpg?1668478';
      }
      return 'https://cdn.shopify.com/s/files/1/2994/0144/files/free-swatch_bnr_m_x2_d5eb0690-b50a-4554-81d8-e8f46257701c.png?v=1588099414';
    },

    infoActive() {
      return variantId => this.activeInfos.includes(variantId);
    },

    hasError() {
      return variantId => this.errorOn === variantId;
    },

    inCart() {
      return variantId => this.cart.some(item => item.variant_id === variantId);
    },
  },

  watch: {
    active(isActive) {
      const zendesk = document.querySelector('#launcher');
      zendesk.style.visibility = isActive ? "hidden" : "visible";
      document.documentElement.style.overflow = isActive ? 'hidden' : 'auto';
      document.documentElement.classList.toggle('ProductCustomizer--Open', isActive);
      if (isActive) {
        this.showCart = !this.isMobile;
      }
    },

    groups(groups) {
      if (groups && groups.length > 0) {
        [this.group] = groups;
      }
    },
  },

  created() {
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
    this.pullSwatches();
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

    onScroll() {
      if (!this.active || !this.isMobile) {
        return;
      }
      const newState = this.$refs.swatchContainer.scrollTop > 50;
      this.$refs.description.classList.toggle('is-scrolled', newState);
      this.$refs.legend.classList.toggle('is-scrolled', newState);
    },

    setGroup(selectedName) {
      const selected = this.groups.find(group => group.name == selectedName);
      if (selected) {
        this.group = selected;
      }
    },

    toggleInfo(variantId) {
      const index = this.activeInfos.findIndex(item => item === variantId);
      if (index !== -1) {
        this.activeInfos.splice(index, 1);
        return;
      }
      this.activeInfos.push(variantId);
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
        return;
      }
      this.active = false;
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

.SwatchBrowser {
  animation-duration: .3s;
  background: #fff;
  display: flex;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;

  &__Button {
    background: transparent;
    border: none;
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    letter-spacing: .12em;
    padding: 0;
    text-align: center;
    text-decoration: underline;
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

  &__Browse,
  &__Form {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__Header {
    color: #202020;
    padding: 15px 20px;

    .CloseButton {
      position: absolute;
      right: 15px;
      top: 15px;
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 30px;
    }

    p {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .035em;
      line-height: 20px;
      margin: 0;

      @include at-query($breakpoint-small) {
        max-height: 100px;
        overflow: hidden;
        transition: max-height .2s ease-in-out;

        &.is-scrolled {
          max-height: 0;
        }
      }
    }

    .FilterPanel__GroupSelect {
      @include at-query($breakpoint-small) {
        font-size: 11px;
        height: 30px;
        line-height: 30px;
        padding-bottom: 0;
        padding-top: 0;
      }
    }

    @include at-query($breakpoint-large) {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      padding: 40px 60px;

      h2 {
        font-size: 28px;
      }

      p {
        font-size: 14px;
      }
    }
  }

  &__Description {
    @include at-query($breakpoint-large) {
      margin-right: 40px;
      max-width: 300px;
    }
  }

  &__BadgeKeys {
    @include at-query($breakpoint-small) {
      display: flex;
      justify-content: space-between;
      margin: 18px 0;
      transition: margin-top .2s ease-in-out;

      &.is-scrolled {
        margin-top: 0;
      }
    }

    @include at-query($breakpoint-large) {
      margin-right: 40px;
    }

    @media only screen and (min-width: 1025px) and (max-width: 1320px) {
      text-align: center;
    }
  }

  &__BadgeKey {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .035em;
    padding: 2px;

    @include at-query($breakpoint-large) {
      font-size: 14px;
    }

    img {
      height: 24px;
      width: auto;
    }

    span {
      @media only screen and (min-width: 1025px) and (max-width: 1320px) {
        display: block;
      }
    }
  }

  &__Filter {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;

    @include at-query($breakpoint-large) {
      justify-content: flex-end;
    }
  }

  &__SwatchContainer {
    height: 100%;
    overflow-y: auto;
    padding-top: 5px;

    @include at-query($breakpoint-large) {
      padding: 5px 60px;
    }
  }

  &__Swatches {
    box-shadow: -1.4px 0 0.5px 0px rgba(139, 137, 134, .6),
                0 -1.4px 0.5px 0px rgba(139, 137, 134, .6);
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    padding-bottom: 92px;

    @include at-query($breakpoint-large) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      margin-bottom: 40px;
      padding-bottom: 0;
    }
  }

  &__Swatch {
    align-items: center;
    border: 1px solid transparent;
    box-shadow: 0.9px 0.9px 0.4px 0 rgba(139, 137, 134, 0.5);
    display: flex;
    flex: 0 0 50%;
    padding: 15px 15px 10px 15px;
    position: relative;
    flex-direction: column;
    text-align: center;

    @include at-query($breakpoint-large) {
      flex: 0 0 200px;
    }

    &:last-child {
      box-shadow: 0 0.9px 0.4px 0 rgba(139, 137, 134, 0.5),
                  0.9px 0 0.4px 0 rgba(139, 137, 134, 0.5);
    }

    &.is-selected {
      background: #f2f0ed;
      border-color: #202020;
      box-shadow: none;

      & + .is-selected {
        border-left-color: rgba(32, 32, 32, .2);
      }
    }

    #{&}InfoToggle {
      align-self: flex-end;
      padding: 0;

      img {
        display: block;
        width: 20px;
      }
    }

    #{&}Detail {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    #{&}Image {
      border-radius: 50%;
      height: auto;
      width: 134px;

      @include at-query($breakpoint-large) {
        width: 150px;
      }
    }

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

      @include at-query($breakpoint-large) {
        font-size: 10px;
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
      padding: 18px 15px 0 15px;
      width: auto;
    }

    #{&}Toggle--InCart {
      text-decoration: none;
    }
  }

  &__Badges {
    margin-top: 10px;

    img {
      height: 24px;
      width: auto;
    }
  }

  &__Alert {
    background: #e4baa9;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .035em;
    line-height: 20px;
    top: 100%;
    padding: 10px 35px 15px 20px;
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
      border-bottom-color: #e4baa9;
      border-width: 0 7px 12px 7px;
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
    flex: 0 0 56px;
    margin-right: 18px;
    width: 56px;

    @include at-query($breakpoint-large) {
      flex-basis: 64px;
      margin-right: 28px;
      width: 64px;
    }
  }

  &__LineDescription {
    color: #202020;
    flex: 1;
    font-weight: 500;
  }

  &__Cart {
    display: flex;
    flex: 0 0 445px;
    flex-direction: column;

    @include at-query($breakpoint-small) {
      bottom: 0;
      height: 100%;
      justify-content: flex-end;
      left: 0;
      pointer-events: none;
      position: fixed;
      width: 100%;
    }

    @include at-query($breakpoint-large) {
      border-left: 1px solid #dedede;
    }

    #{&}Header {
      color: #202020;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      pointer-events: all;

      @include at-query($breakpoint-large) {
        padding: 35px 20px 20px 44px;
      }

      h2 {
        font-size: 22px;
        font-weight: 600;
        margin: 0;

        @include at-query($breakpoint-large) {
          font-size: 28px;
        }
      }
    }

    #{&}Footer {
      background: #f2f0ed;
      pointer-events: all;

      @include at-query($breakpoint-large) {
        padding: 0 40px;
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
        padding: 20px 0;
      }
    }

  }

  &__CartCount {
    margin-left: 15px;

    &.is-full {
      color: #c98975;
    }
  }

  &__FooterLink {
    flex: 1;
    font-weight: 500;
    letter-spacing: .12em;
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
  }

  &__CartItems {
    flex: 1;
    padding: 0 0 20px 0;
    overflow: auto;
  }

  &__CartItem {
    align-items: center;
    display: flex;
    font-size: 12px;
    letter-spacing: .05em;
    line-height: 18px;
    padding: 10px 18px 10px 24px;

    @include at-query($breakpoint-large) {
      font-size: 14px;
      padding: 10px 28px 10px 44px;
    }

    @include at-query($breakpoint-small) {
      &:first-child {
        padding-top: 5px;
      }
    }

    &:last-child {
      margin-bottom: 20px;
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
      text-decoration: underline;

      @include at-query($breakpoint-large) {
        margin-left: 24px;
      }
    }
  }

  &__ContinueButton {
    height: auto;
    margin: 8px 0 10px;
    padding: 4px 0 10px;

    @include at-query($breakpoint-small) {
      display: none;
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
