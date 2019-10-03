<template>
  <div class="FilterSelect">
    <div
      class="FilterSelect__Display"
      @click="open = !open"
    >{{ displayValue }}</div>
    <div
      :class="{ 'is-open': open }"
      class="FilterSelect__Options"
    >
      <div
        v-for="option in options"
        :key="option.key"
        :class="{ 'is-active': value === option.value }"
        class="FilterSelect__Option"
        @click.stop="$emit('input', option.value)"
        v-html="option.display"
      />
      <select
        class="FilterSelect__Input"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true },
    value: { type: [String, Number, Object], required: true },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    displayValue() {
      const option = this.options.find(opt => opt.value === this.value);
      if (!option) {
        return '';
      }
      return option.display;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.FilterDropdown {
  border: 1px solid #D4D0CA;
  color: #202020;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: .075em;
  line-height: 28px;
  max-width: 195px;
  position: relative;
  text-align: left;
  width: 100%;

  strong {
    font-weight: 500;
  }

  @include at-query($breakpoint-large) {
    font-size: 13px;
    margin-top: 15px;
  }

  &__Display {
    background: #fff;
    line-height: 1;
    padding: 14px 35px 14px 14px;
    white-space: nowrap;
  }

  &__Options {
    background: #fff;
    display: none;
    position: absolute;
    top: 100%;
    width: 100%;

    &.is-open {
      display: block;
    }
  }

  &__Option {
    line-height: 1;
    padding: 14px;

    &:hover,
    .is-active {
      background: #f2f0ed;
    }
  }

  &:hover &.is-active:not(:hover) {
    background: #fff;
  }
}
</style>
