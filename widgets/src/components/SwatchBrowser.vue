<template>
  <div>
    <div class="SwatchBrowser__Trigger">
      <div>
        <h3>Stop drooling over your keyboard.</h3>
        <p>Have your favorites delivered to you in less than 3 days, for free.</p>
        <button
          v-if="isMobile"
          :class="triggerClasses"
          @click="active = true"
        >Get Free Swatches</button>
      </div>
      <div>
        <img
          :src="triggerImage"
          @click="active = true"
        >
        <button
          v-if="!isMobile"
          class="SwatchBrowser__TriggerButton"
          @click="active = true"
        >Get Free Swatches</button>
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
        <div class="SwatchBrowser__Main">
          <transition-group
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <swatches-order-form
              v-if="showOrderForm"
              key="order-form"
              :cart="cart"
              @close="showOrderForm = false"
              @exit="active = false"
            />
            <div
              v-else
              key="browser"
              class="SwatchBrowser__Browse"
            >
              <div class="SwatchBrowser__Header">
                <div class="SwatchBrowser__Description">
                  <h3>{{ category }} Swatches</h3>
                  <p>Select up to {{ maxSwatches }} of your favorites and we'll send &amp; ship them to your doorstep for free!</p>
                </div>
                <div class="SwatchBrowser__BadgeKeys">
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-ez-clean.png"
                      alt="Easy clean icon"
                    >
                    <span>EZ Clean</span>
                  </div>
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-performance.png"
                      alt="Performance icon"
                    >
                    <span>Performance</span>
                  </div>
                  <div class="SwatchBrowser__BadgeKey">
                    <img
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-pet-friendly.png"
                      alt="Pet friendly icon"
                    >
                    <span>Pet Friendly</span>
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
              <div class="SwatchBrowser__Swatches">
                <div
                  v-for="swatch in filteredSwatches"
                  :key="swatch.variant_id"
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
                      class="SwatchBrowser__SwatchDescription"
                      v-html="swatch.description"
                    />
                  </div>
                  <div
                    v-if="swatch.easy_clean || swatch.performance || swatch.pet_friendly"
                    class="SwatchBrowser__Badges"
                  >
                    <img
                      v-if="swatch.easy_clean"
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-ez-clean.png"
                      alt="Easy clean icon"
                    >
                    <img
                      v-if="swatch.performance"
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-performance.png"
                      alt="Performance icon"
                    >
                    <img
                      v-if="swatch.pet_friendly"
                      src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/icon-swatch-pet-friendly.png"
                      alt="Pet friendly icon"
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
                  >Oops! You already have {{ maxSwatches }} in your cart!</div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="SwatchBrowser__Cart">
          <div class="SwatchBrowser__CartHeader">
            <h2>Your Cart</h2>
            <close-button @click.native="active = false" />
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
              <button @click="toggleLineItem(item)">remove</button>
            </div>
          </div>
          <div class="SwatchBrowser__CartFooter">
            <div class="SwatchBrowser__CartCounter">
              <div class="SwatchBrowser__CounterLabel">Total Swatches:</div>
              <div class="SwatchBrowser__CartCount">{{ cart.length }}/{{ maxSwatches }}</div>
            </div>
            <button
              class="SwatchBrowser__OrderButton SwatchBrowser__Button SwatchBrowser__Button--Black"
              @click="startOrder"
            >ORDER NOW</button>
            <button
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
      group: '',
    };
  },

  computed: {
    ...mapState({
      category: state => state.category,
      swatches: state => state.swatches.swatches || [],
      groups: state => state.swatches.groups || [],
    }),

    groupOptions() {
      return this.groups.map((group) => {
        let display = this.isMobile ? group.name : `<strong>${group.name}</strong>`;
        if (group.group_type === 'sort') {
          display = `SORT: ${display}`;
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
        SwatchBrowser__TriggerButton: this.isTablet,
      };
    },

    triggerImage() {
      if (this.isTablet) {
        return '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/free-swatches-tablet.jpg?1668478';
      }
      return '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/free-swatches.jpg?1668478';
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
      document.documentElement.style.overflow = isActive ? 'hidden' : 'auto';
    },

    groups(groups) {
      if (groups && groups.length > 0) {
        [this.group] = groups;
      }
    },
  },

  created() {
    this.maxSwatches = window.theme.settings.swatchBrowser.maxSwatches || 15;
  },

  mounted() {
    this.pullSwatches();
  },

  methods: {
    ...mapActions([
      'pullSwatches',
    ]),

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
        return;
      }
      if (this.cart.length >= this.maxSwatches) {
        this.errorOn = swatch.variant_id;
        return;
      }
      this.cart.push(swatch);
    },

    startOrder() {
      if (this.cart.length < 1) {
        return;
      }
      this.showOrderForm = true;
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
      display: block;
      margin: 0;
      padding: 48px 20px 50px;
      position: sticky;
      text-align: center;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
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
      margin-top: 10px;
      text-decoration: underline;
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
          padding-right: 20px;
        }

        @include at-query($breakpoint-large) {
          margin: 0 auto;
          max-width: 282px;
        }
      }

      &:last-child {
        flex: 0 0 35%;

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

  &__Main {
    flex: 1;
    overflow-y: auto;
  }

  &__Browse {
    display: flex;
    flex-direction: column;
    margin: 0 67px 40px 73px;
  }

  &__Header {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    padding: 30px 0;

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
    }

    @include at-query($breakpoint-large) {
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
      margin-left: 30px;
      margin-right: 100px;
      max-width: 300px;
    }
  }

  &__BadgeKey {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .035em;

    @include at-query($breakpoint-large) {
      font-size: 14px;
    }

    img {
      height: 24px;
      width: auto;
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

  &__Swatches {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__Swatch {
    align-items: center;
    box-shadow: .9px .9px .4px 0 rgba(139,137,134,.5);
    display: flex;
    flex: 0 0 20%;
    padding: 15px;
    position: relative;
    flex-direction: column;
    text-align: center;

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
      width: 150px;
    }

    #{&}Name {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .05em;
      line-height: 1;

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

    #{&}Description {
      font-family: $font-stack-roboto;
      font-size: 10px;
      letter-spacing: .15em;
      line-height: 13px;
      margin: 15px 0;

      @include at-query($breakpoint-large) {
        font-size: 12px;
        letter-spacing: .25em;
        line-height: 16px;
      }
    }

    #{&}Toggle--InCart {
      text-decoration: none;
    }
  }

  &__Badges {
    margin: 15px 0;

    img {
      height: 24px;
      width: auto;
    }
  }

  &__Alert {
    background: #e4baa9;
    font-size: 14px;
    letter-spacing: .035em;
    line-height: 20px;
    top: 100%;
    padding: 10px 35px 20px;
    position: absolute;
    right: 10%;
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
  }

  &__LineImage {
    border-radius: 50%;
    flex: 0 0 60px;
    margin-right: 30px;
  }

  &__LineDescription {
    flex: 1;
  }

  &__Cart {
    display: flex;
    flex: 0 0 445px;
    flex-direction: column;

    #{&}Header {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;

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
      padding: 0 40px 10px 40px;
    }

    #{&}Counter {
      display: flex;
      font-size: 13px;
      font-weight: 500;
      justify-content: space-between;
      letter-spacing: .05em;
      padding: 20px 0;

      @include at-query($breakpoint-large) {
        font-size: 16px;
      }
    }

  }

  &__CartCount {
    color: #c98975;
  }

  &__CartItems {
    flex: 1;
    padding: 20px 0;
    overflow: auto;
  }

  &__CartItem {
    align-items: center;
    display: flex;
    font-size: 12px;
    letter-spacing: .05em;
    line-height: 18px;
    padding: 10px 30px;

    @include at-query($breakpoint-large) {
      font-size: 14px;
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
      margin-left: 30px;
      text-decoration: underline;
    }
  }

  &__OrderButton {

  }

  &__ContinueButton {
    margin-top: 10px;

    @include at-query($breakpoint-small) {
      display: none;
    }
  }
}
</style>
