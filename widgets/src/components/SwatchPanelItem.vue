<template>
  <div
    :class="{ 'is-selected': value }"
    class="SwatchPanelItem"
    @click="toggle"
  >
    <img
      v-if="load"
      ref="img"
      :src="option.swatch_url"
      :title="option.name"
      class="SwatchPanelItem__Swatch"
      @mouseenter="swapImage(true)"
      @mouseleave="swapImage(false)"
    >
    <div class="SwatchPanelItem__Title">{{ option.name }}</div>
    <div
      v-if="option.subname"
      class="SwatchPanelItem__Subtitle"
    >{{ option.subname }}</div>
  </div>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
    value: { type: Boolean, default: false },
    load: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
  },

  watch: {
    load: {
      immediate: true,
      handler(newValue) {
        if (newValue && this.option.swatch_hover_url) {
          this.hoverImage = new Image();
          this.hoverImage.src = this.option.swatch_hover_url;
        }
      },
    },
  },

  methods: {
    toggle() {
      if (!this.value) {
        this.$emit('input', !this.value);
      }
    },

    swapImage(hover) {
      if (!this.isMobile && this.option.swatch_hover_url) {
        this.$refs.img.src = hover ? this.option.swatch_hover_url : this.option.swatch_url;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchPanelItem {
  align-items: center;
  border: 1px solid #c8c8c8;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 20px;
  position: relative;
  text-align: center;

  @include at-query($breakpoint-large) {
    flex: 0 0 50%;
  }

  &.is-selected {
    border-color: #202020;
  }

  &__Swatch {
    display: block;
    margin-bottom: 12px;

    &[src=""] {
      visibility: hidden;
    }
  }

  &__Title {
    color: #202020;
    font-family: $font-stack-avalon;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 14px;
    }
  }

  &__Subtitle {
    color: #202020;
    font-family: $font-stack-roboto;
    font-size: 8px;
    letter-spacing: .075em;
    margin-top: 7px;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      font-size: 10px;
    }
  }
}
</style>
