<template>
  <div 
    class="Banner" 
    ref="Banner"
  >
    <div
      :class="bannerClass"
      class="Banner__wrapper"
      v-bind:style="{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/2994/0144/files/design-services_bnr.png?751635)' }"
    >
      <div class="Banner__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasOverlay: {type: Boolean, default: true},
    fillColor: {type: String, default: 'white'},
    bannerImage: String
  },
  computed: {
    bannerClass() {
      return {
        'Banner--hideOverlay': !this.hasOverlay,
        'Banner--darkColor': this.fillColor === 'black'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.Banner {
  display: block;
  height: auto;
  width: 100%;
  .Banner__wrapper {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: auto;
    position: relative;
    width: 100%;

    &::after {
      content: "";
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba($color: #202020, $alpha: 0.1);
      width: 100%;
    }

    .Banner__content {
      display: block;
      font-family: $font-stack-avalon;
      height: auto;
      max-width: 458px;
      margin: 0 auto;
      padding: 145px 0;
      position: relative;
      width: 100%;
      z-index: 2;
      text-align: center;
      h2 {
        color: #ffffff;
        display: block;
        font-size: 34px;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.05em;
        margin: 0 0 16px;
      }
      p {
        color: #ffffff;
        display: block;
        font-size: 14px;
        letter-spacing: 0.035em;
        line-height: 1.57;
        margin: 0 0 46.5px;
      }
    }
    &.Banner--darkColor {
      .Banner__content {
        h2, p {
          color: #000;
        }
      }
    }
  }
}
</style>
