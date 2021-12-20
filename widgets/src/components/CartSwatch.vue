<template>
  <div class="SwatchBrowser__CartItem">
    <img
      :src="swatch.image_url"
      :alt="`${swatch.name} sample`"
      class="SwatchBrowser__LineImage"
    >
    <div class="SwatchBrowser__SwatchName">{{ swatch.name }}</div>
    <div class="SwatchBrowser__SwatchSubName">{{ swatch.swatch_type }}</div>
    <button
      v-if="!static"
      @click="$emit('toggle')"
    >
      <img src="https://cdn.insideweather.com/icons/x-circle-black_ico@2x.png" alt="Remove from cart">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    swatch: { type: Object, required: true },
    static: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser {
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

    .SwatchBrowser__SwatchName {
      font-size: 13px;
      margin-bottom: 0;
    }

    .SwatchBrowser__SwatchSubName {
      font-size: 9px;
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
</style>
