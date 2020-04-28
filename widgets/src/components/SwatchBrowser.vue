<template>
  <div>
    <div class="SwatchBrowser__Trigger" v-if="!isMobile">
      <div>
        <img :src="triggerImage">
      </div>
      <div>
        <h3>Stop drooling over your keyboard.</h3>
        <p>Have your favorites delivered to you in less than 3 days, for free.</p>
        <a
          v-if="!isMobile"
          href="/pages/free-swatches"
          class="SwatchBrowser__TriggerButton"
        >Get Free Swatches</a>
        <a
          v-if="isMobile"
          :class="triggerClasses"
          href="/pages/free-swatches"
        >Get Free Swatches</a>
      </div>
    </div>
    <div class="SwatchMobile__Trigger" v-if="isMobile">
      <div>
        <h3>Stop drooling over your keyboard.</h3>
        <p>Have your favorites delivered to you in less than 3 days, for free.</p>
        <a
          v-if="isMobile"
          :class="triggerClassesMobile"
          href="/pages/free-swatches"
        >Get Free Swatches</a>
      </div>
      <div>
        <img :src="triggerImage">
        <a
          v-if="!isMobile"
          href="/pages/free-swatches"
          class="SwatchMobile__TriggerButton"
        >Get Free Swatches</a>
      </div>
    </div>
    <div class="SwatchBrowser" />
  </div>
</template>

<script>
import screenMonitor from '../mixins/screenMonitor';

export default {
  mixins: [
    screenMonitor,
  ],

  computed: {
    triggerClasses() {
      return {
        SwatchBrowser__TriggerLink: this.screenWidth < 768,
        SwatchBrowser__TriggerButton: this.isTablet,
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
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser{
  margin-bottom:0px;
  @include at-query($breakpoint-mlarge) {
    margin-bottom:130px;
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
          padding-right: 22px;
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
  }
</style>
