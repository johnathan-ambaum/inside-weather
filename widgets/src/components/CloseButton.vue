<template>
  <button
    :class="buttonClasses"
    type="button"
    class="CloseButton"
    @click="$emit('click')"
  >
    <div
      :style="iconStyles"
      class="CloseButton__Icon"
    />
    <span class="visually-hidden">Close</span>
  </button>
</template>

<script>
export default {
  props: {
    size: { type: [String, Number], default: 98 },
    active: { type: Boolean, default: true },
    stroke: { type: String, default: 'normal' },
  },

  computed: {
    buttonClasses() {
      return {
        'is-active': this.active,
        'CloseButton--SemiBold': this.stroke === 'semibold',
        'CloseButton--Bold': this.stroke === 'bold',
      };
    },

    iconStyles() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
  },
};
</script>

<style lang="scss">
$close-icon-size: 98px;

.CloseButton {
  cursor: pointer;
  padding: 0;

  &__Icon {
    height: $close-icon-size;
    position: relative;
    width: $close-icon-size;

    &::before,
    &::after {
      content: '';
      border-top: 1px solid #212121;
      height: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: scale(0) rotate(0deg);
      transform-origin: center;
      transition: all .4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      width: 100%;

      .CloseButton--SemiBold & {
        border-top-width: 2px;
      }

      .CloseButton--Bold & {
        border-top-width: 3px;
      }

      .is-active & {
        transition-delay: .125s;
      }
    }

    .is-active &::before {
      transform: scale(1) rotate(45deg);
    }

    .is-active &::after {
      transform: scale(1) rotate(-45deg);
    }
  }
}
</style>
