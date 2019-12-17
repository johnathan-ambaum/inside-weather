<template>
  <div
    :class="{ 'StyledSelect--Open': active }"
    class="StyledSelect"
  >
    <div
      class="StyledSelect__Value"
      @click="active = !active"
      v-html="displayValue"
    />
    <div class="StyledSelect__List">
      <div
        v-for="option in options"
        :key="option.value"
        :class="{ 'is-active': value === option.value }"
        class="StyledSelect__Option"
        @click="selectOption(option.value)"
        v-html="option.display"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => ([]) },
    value: { type: [String, Number], default: '' },
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
        return selected.display;
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

  methods: {
    selectOption(value) {
      this.$emit('input', value);
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$height: 38px;

.StyledSelect {
  align-items: center;
  border: 1px solid #D4D0CA;
  cursor: pointer;
  font-family: $font-stack-avalon;
  font-size: 13px;
  display: flex;
  height: $height;
  letter-spacing: .075em;
  max-width: 250px;
  position: relative;
  text-align: left;
  width: 100%;
  z-index: 10;

  &__Value {
    background: {
      image: url('https://cdn.shopify.com/s/files/1/2994/0144/t/21/assets/ico-select.svg?1678558');
      repeat: no-repeat;
      position: right 10px center;
      color: transparent;
      size: 11px;
    }
    flex: 1;
    padding: 0 28px 0 0;
  }

  &--Open &__Value {
    box-shadow: -2px 2px 8px rgba(0, 0, 0, .2);
  }

  &__Value,
  &__Option {
    align-items: center;
    display: flex;
    font-weight: 400;
    height: $height;
    padding-left: 15px;

    strong {
      font-weight: 500;
      margin: 0 3px;
    }
  }

  &__List {
    background: #fff;
    border: 1px solid #D4D0CA;
    border-top: none;
    box-shadow: -2px 2px 8px rgba(0, 0, 0, .2);
    display: none;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 100;
  }

  &--Open &__List {
    display: block;
  }

  &__Option {
    &:hover,
    &.is-active {
      background: #f2f0ed;
    }

    & + & {
      border-top: 1px solid #D4D0CA;
    }
  }
}
</style>
