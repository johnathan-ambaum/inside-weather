<template>
  <div>
    <div class="SwatchBrowser__Trigger">
      <div>
        <h3>Still Deciding?</h3>
        <p>Get 15 samples shipped to your door.</p>
        <span class="SwatchBrowser__TriggerLink">Get Free Swatches</span>
      </div>
      <div>
        <img src="//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/free-swatches.png">
        <button @click.prevent>Get Free Swatches</button>
      </div>
    </div>
    <div class="SwatchBrowser" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser {
  &__Trigger {
    align-items: center;
    background: #f2f4f4;
    display: flex;
    margin-bottom: 50px;
    padding: 30px $horizontal-wrapper-padding;

    @include at-query($breakpoint-large) {
      display: block;
      margin: 0;
      padding: 20px 0 50px;
      position: sticky;
      text-align: center;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;

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

      @include at-query($breakpoint-large) {
        display: none;
      }
    }

    button {
      background: #fff;
      border: 1px solid #202020;
      padding: 12px 0;
      width: 100%;

      @include at-query($breakpoint-small) {
        display: none;
      }
    }

    & > div {
      &:first-child {
        @include at-query($breakpoint-small) {
          padding-right: 20px;
        }
      }

      &:last-child {
        display: inline-block;
        flex: 0 0 35%;
      }
    }
  }
}
</style>
