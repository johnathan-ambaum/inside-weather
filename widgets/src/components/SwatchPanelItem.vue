<template>
  <div
    ref="item"
    :class="{ 'is-selected': value, 'is-option': isOption }"
    class="SwatchPanelItem"
    @click="toggle"
  >
    <div
      :class="frameClasses"
      class="SwatchPanelItem__Frame"
    >
      <img
        v-if="load"
        ref="img"
        :src="item.swatchURL"
        :title="item.name"
        class="SwatchPanelItem__Swatch"
        @mouseenter="swapImage(true)"
        @mouseleave="swapImage(false)"
      >
      <transition name="fade">
        <div
          v-if="hasError"
          ref="errorTooltip"
          class="SwatchPanelItem__Error"
          @click.stop="dismissError"
        >Hey, sorry this combination doesn’t exist</div>
      </transition>
    </div>
    <slot>
      <div v-if="showLabel">
        <div class="SwatchPanelItem__Title">{{ item.name }}</div>
        <div
          v-if="item.subname"
          class="SwatchPanelItem__Subtitle"
        >{{ item.subname }}</div>
      </div>
    </slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    item: { type: Object, required: true },
    value: { type: Boolean, default: false },
    isOption: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: true },
    shape: { type: String, default: 'square' },
    border: { type: Boolean, default: true },
    hasError: { type: Boolean, default: false },
    load: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
  },

  computed: {
    frameClasses() {
      return {
        'has-label': this.showLabel,
        'has-border': this.border,
        'SwatchPanelItem__Frame--Round': !this.isOption && this.shape === 'round',
      };
    },
  },

  watch: {
    load: {
      immediate: true,
      handler(newValue) {
        if (!this.isMobile && this.isOption && newValue) {
          this.hoverImage = new Image();
          this.hoverImage.src = this.item.swatchHoverURL;
        }
      },
    },
  },

  methods: {
    ...mapMutations([
      'setErrorTrigger',
    ]),

    toggle() {
      this.$emit('input', !this.value);
    },

    swapImage(hover) {
      if (!this.isMobile && this.isOption) {
        this.$refs.img.src = hover ? this.item.swatchHoverURL : this.item.swatchURL;
      }
    },

    dismissError() {
      this.setErrorTrigger(null);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchPanelItem {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  margin-bottom: 12px;
  position: relative;
  text-align: center;

  @include at-query($breakpoint-small) {
    .SwatchPanel__Body--swatch & {
      justify-content: flex-start;
    }
  }

  &__Frame {
    border: 4px solid transparent;
    position: relative;

    &.has-label {
      margin-bottom: 10px;
    }

    &--Round {
      border-radius: 50%;
      border-width: 2px;
    }
  }

  &__Error {
    background: #fff;
    border: 1px solid #acacac;
    bottom: 100%;
    font-family: $font-stack-roboto;
    font-size: 10px;
    left: 50%;
    line-height: 28px;
    padding: 5px;
    position: absolute;
    transform: translateX(-50%);
    width: 210px;
  }

  &.is-selected &__Frame.has-border {
    border-color: #212121;
  }

  &__Swatch {
    display: block;

    &[src=""] {
      visibility: hidden;
    }

    @at-root {
      .SwatchPanelItem__Frame--Round & {
        border: 2px solid #ccc;
        border-radius: 50%;

        .SwatchPanelItem.is-selected & {
          border-color: #212121;
        }
      }
    }
  }

  &__Title {
    color: #202020;
    font-family: $font-stack-avalon;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;

    @include at-query($breakpoint-small) {
      .SwatchPanel__Body--swatch {
        flex: 1 1 auto;
      }
    }
  }

  &__Subtitle {
    color: #202020;
    font-family: $font-stack-roboto;
    font-size: 10px;
    letter-spacing: .075em;
    margin-top: 7px;
    text-transform: uppercase;
  }
}
</style>
