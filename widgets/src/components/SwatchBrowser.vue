<template>
  <div>
    <div class="SwatchBrowser__Trigger">
      <div>
        <h3>Still Deciding?</h3>
        <p>Get 15 samples shipped to your door.</p>
        <span
          v-if="screenWidth < 768"
          class="SwatchBrowser__TriggerLink"
        >Get Free Swatches</span>
        <button
          v-if="isTablet"
          @click.prevent
        >Get Free Swatches</button>
      </div>
      <div>
        <img src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/free-swatches.png">
        <button
          v-if="!isMobile"
          @click.prevent
        >Get Free Swatches</button>
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
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser {
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
      padding: 48px 0 50px;
      position: sticky;
      text-align: center;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;

      @include at-query($breakpoint-mlarge) {
        font-size: 32px;
      }

      @include at-query($breakpoint-large) {
        font-size: 28px;
      }
    }

    p {
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      line-height: 23px;
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

    button,
    #{&}Link {
      display: block;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    #{&}Link {
      margin-top: 10px;
      text-decoration: underline;
    }

    button {
      background: #fff;
      border: 1px solid #202020;
      margin-top: 30px;
      padding: 12px 0;
      width: 100%;

      &:hover, &:active {
        background: #202020;
        border: none;
        color: #fff;
      }

      @include at-query($breakpoint-large) {
        margin-top: 0;
      }
    }

    & > div {
      &:first-child {
        @include at-query($breakpoint-small) {
          padding-right: 20px;
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
