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
          <div class="SwatchBrowser__Header">
            <h3>{{ category }} Swatches</h3>
          </div>
          <div class="SwatchBrowser__Swatches">
            <div
              v-for="swatch in swatches"
              :key="swatch.variantId"
              class="SwatchBrowser__Swatch"
            >
              <button @click="toggleInfo(swatch.variantId)">info</button>
              <div
                v-if="!infoActive(swatch.variantId)"
                class="SwatchBrowser__SwatchSample"
              >
                <img
                  :src="swatch.image_url"
                  :alt="`${swatch.name} sample`"
                  class="SwatchBrowser__SwatchImage"
                >
                <div>{{ swatch.name }}</div>
                <div>{{ swatch.swatch_type }}</div>
              </div>
              <div
                v-if="infoActive(swatch.variantId)"
                class="SwatchBrowser__SwatchInfo"
              >
                <close-button @click.native="toggleInfo(swatch.variantId)" />
                <div>{{ swatch.name }}</div>
                <div>{{ swatch.swatch_type }}</div>
                <div v-html="swatch.description" />
              </div>
              <div
                v-if="swatch.easy_clean || swatch.performance || swatch.pet_friendly"
                class="SwatchBrowser__Badges"
              >
                <img
                  v-if="swatch.easy_clean"
                  src=""
                  alt="Easy clean icon"
                >
                <img
                  v-if="swatch.performance"
                  src=""
                  alt="Performance icon"
                >
                <img
                  v-if="swatch.pet_friendly"
                  src=""
                  alt="Pet friendly icon"
                >
              </div>
              <button
                @click="toggleLineItem(swatch)"
              >
                <span v-if="!inCart(swatch.variantId)">+ ADD</span>
                <span v-else>REMOVE</span>
              </button>
              <div
                v-if="hasError(swatch.variantId)"
                class="SwatchBrowser__Alert"
              >Oops! You already have {{ maxSwatches }} in your cart!</div>
            </div>
          </div>
        </div>
        <div class="SwatchBrowser__Cart">
          <div class="SwatchBrowser__CartHeader">
            <h2>Your Cart</h2>
            <close-button @click.native="active = false" />
          </div>
          <div class="SwatchBrowser__CartItems">
            <div
              v-for="item in cart"
              :key="item.variantId"
              class="SwatchBrowser__CartItem"
            >
              <img
                :src="item.image_url"
                :alt="`${item.name} sample`"
                class="SwatchBrowser__LineImage"
              >
              <span>{{ item.name }} {{ item.swatch_type }}</span>
              <button @click="toggleLineItem(item)">remove</button>
            </div>
          </div>
          <div class="SwatchBrowser__CartFooter">
            <div class="SwatchBrowser__CartCounter">
              <div class="SwatchBrowser__CounterLabel">Total Swatches:</div>
              <div class="SwatchBrowser__CartCount">{{ cart.length }}/15</div>
            </div>
            <button
              class="SwatchBrowser__OrderButton"
              @click="startOrder"
            >ORDER NOW</button>
            <a
              href="#"
              class="SwatchBrowser__ContinueLink"
              @click.prevent="active = false"
            >CONTINUE SHOPPING</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    CloseButton,
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
    };
  },

  computed: {
    ...mapState({
      category: state => state.category,
      swatches: state => state.swatches,
    }),

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
      return variantId => this.cart.some(item => item.variantId === variantId);
    },
  },

  mounted() {
    this.pullSwatches();
  },

  methods: {
    ...mapActions([
      'pullSwatches',
    ]),

    toggleInfo(variantId) {
      const index = this.activeInfos.findIndex(item => item === variantId);
      if (index !== -1) {
        this.activeInfos.splice(index, 1);
        return;
      }
      this.activeInfos.push(variantId);
    },

    toggleLineItem(swatch) {
      const index = this.cart.findIndex(item => item.variantId === swatch.variantId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        return;
      }
      if (this.cart.length >= this.maxSwatches) {
        this.errorOn = swatch.variantId;
        return;
      }
      this.cart.push(swatch);
    },

    startOrder() {

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
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &__Header {
    flex: 0 0 auto;
  }

  &__Swatches {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__Swatch {
    flex: 0 0 20%;

    #{&}Image {
      border-radius: 50%;
      height: auto;
      width: 150px;
    }
  }

  &__Cart {
    flex: 0 0 445px;
  }
}
</style>
