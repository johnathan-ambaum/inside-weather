<template>
  <div class="StyledSelect">
    <div
      class="StyledSelect__Value"
      @click="active = true"
      v-html="displayValue"
    />
    <div
      :class="{ 'StyledSelect__List--Open': active }"
      class="StyledSelect__List"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="StyledSelect__Option"
        @click="$emit('input', option.value)"
      >{{ option.display }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => ([]) },
    value: { type: String, default: '' },
  },

  data() {
    return {
      active: false,
    };
  },

  computed: {
    displayValue() {
      const selected = this.options.find(option => option.value === this.value);
      if (selected) {
        return selected.text;
      }
      return '';
    },
  },

  mounted() {
    function clickOutside(e) {
      if (this.active) {
        this.active = !this.active;
      }
    }

    document.body.addEventListener('click', clickOutside);
    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener('click', clickOutside);
    });
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.StyledSelect {
  font-family: $font-stack-avalon;
  font-size: 13px;
  letter-spacing: .075em;
  max-width: 250px;
  position: relative;
  width: 100%;

  &__Value {
    background: {
      image: url('https://cdn.shopify.com/s/files/1/2994/0144/t/21/assets/ico-select.svg?1678558');
      repeat: no-repeat;
      position: right 10px center;
      color: transparent;
      size: 11px;
    }
    padding-right: 28px;
  }

  &__Value,
  &__Option {
    font-weight: 500;

    span {
      font-weight: 400;
    }
  }

  &__List {
    display: none;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;

    &--Open {
      display: block;
    }
  }

  &__Option {

  }
}
</style>
