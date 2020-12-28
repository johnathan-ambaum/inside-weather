<template>
  <div
    :class="itemClasses"
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
      class="SwatchPanelItem__Subtitle"
    >{{ option.subname }}</div>
    <div
      class="SwatchPanelItem__Icons"
    >
      <img
        v-for="icon in option.icons"
        :key="icon.name"
        :src="icon.image_url"
        :alt="icon.name"
        :title="icon.description"
        class="SwatchPanelItem__Icon"
      >
    </div>
    <div class="SwatchPanelItem__Price-Markup">{{ this.priceDifferential }}</div>
  </div>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
    type: { type: String, default: 'square' },
    value: { type: Boolean, default: false },
    load: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
    priceDifferential: {type: String, default: false },
  },
  computed: {
    itemClasses() {
      return {
        'is-selected': this.value,
        [`SwatchPanelItem--${this.type}`]: true,
      };
    },
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
  box-shadow: .9px .9px .4px 0 rgba(139,137,134,.5);
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  padding: 18px;
  position: relative;
  text-align: center;

  &--square {
    padding: 11px 32px;
  }

  @include at-query($breakpoint-large) {
    flex: 0 0 100%;

    @at-root {
      #{&}--square {
        flex: 0 0 50%;
      }
    }
  }

  &.is-selected {
    background: #f2f0ed;
    border: 1px solid #202020;
    box-shadow: none;
  }

  &__Swatch {
    display: block;
    margin-bottom: 12px;

    &[src=""] {
      visibility: hidden;
    }

    @include at-query($breakpoint-small) {
      height: 92px;
      margin-bottom: 6px;
      width: auto;
    }
  }

  &__Title {
    color: #202020;
    font-family: $font-stack-avalon;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .05em;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 14px;
      line-height: 18px;
    }
  }

  &__Subtitle {
    color: #202020;
    font-family: $font-stack-roboto;
    font-size: 8px;
    letter-spacing: .075em;
    text-transform: uppercase;
    height:12px;

    @include at-query($breakpoint-large) {
      font-size: 10px;
      margin-top: 2px;
    }
  }

  &__Icons {
    height:24px;
    // margin-top: 8px;
  }

  &__Icon {
    display: inline-block;
    height: 15px;
    margin: 0 8px;
    width: auto;

    @include at-query($breakpoint-large) {
      height: 20px;
    }
  }
  &__Price-Markup {
    font-family: Avalon;
    font-weight: 400;
    font-size:11px;
    letter-spacing: 0.1em;
    color:#202020;
    padding-top:10px;
    @include at-query($breakpoint-large) {
      height: 11px;
    }
  }
}
</style>
