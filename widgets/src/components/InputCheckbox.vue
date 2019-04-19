<template>
  <label
    :class="{ 'is-checked': value }"
    class="InputCheckbox__Label"
  >
    <div class="InputCheckbox__Box">
      <div class="InputCheckbox__Check"/>
    </div>
    <input
      type="checkbox"
      class="InputCheckbox"
      @change="$emit('input', !value)"
    >
    <div class="InputCheckbox__LabelText">
      <slot/>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.InputCheckbox {
  height: 1px !important;
  position: absolute;
  visibility: hidden;
  width: 1px !important;

  &__Label {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .025em;
    margin: 0;
    text-align: left;
  }

  &__Box {
    background: #fff;
    border: 1px solid #acacac;
    flex: 0 0 2em;
    height: 2em;
    margin-right: 1em;
    position: relative;
    width: 2em;
  }

  &__Check {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform: scale(0);
    transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 100%;

    .is-checked & {
      transform: scale(1);
    }

    &::before,
    &::after {
      background: #212121;
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: 0;
      width: 142%;
    }

    &::before {
      left: 0;
      transform: rotate(45deg);
      transform-origin: center left;
    }

    &::after {
      right: 0;
      transform: rotate(-45deg);
      transform-origin: center right;
    }
  }

  &__LabelText {
    text-transform: none;
  }
}
</style>
