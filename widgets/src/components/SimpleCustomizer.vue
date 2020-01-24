<template>
  <div class="SimpleCustomizer">
    <div
      v-for="attribute in attributes"
      :key="attribute.parameter"
      class="SimpleCustomizer__Row"
    >
      <label class="SimpleCustomizer__Label">{{ attribute.name }}:</label>
      <div
        v-for="option in attribute.values"
        :key="option.value"
        :class="optionClasses(attribute, option)"
        class="SimpleCustomizer__Option"
        @click="toggleOption(attribute.parameter, option.value)"
      >
        <img
          v-if="isSwatch(attribute.swatch_type)"
          :src="option.swatch_url"
          :alt="option.name"
          class="SimpleCustomizer__Swatch">
        <div v-else>{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      attributes: state => state.filters.attributes || [],
      selectedOptions: state => state.selectedOptions,
    }),

    isSwatch() {
      return type => type === 'circle';
    },

    optionClasses() {
      return (attribute, option) => ({
        SimpleCustomizer__Circle: this.isSwatch(attribute.swatch_type),
        SimpleCustomizer__Square: !this.isSwatch(attribute.swatch_type),
        'is-active': this.selectedOptions[attribute.parameter] === option.value,
      });
    },
  },

  mounted() {
    document.body.classList.add('ProductCustomizer--Simple');
  },

  methods: {
    toggleOption(parameter, value) {
      this.$bus.$emit('filter:toggle', { parameter, value });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SimpleCustomizer {
  font-family: $font-stack-avalon;
  margin: 22px 0 24px;

  @include at-query($breakpoint-large) {
    margin: 34px 0 26px;
  }

  &__Row {
    align-items: center;
    display: flex;

    & + & {
      margin-top: 22px;

      @include at-query($breakpoint-large) {
        margin-top: 24px;
      }
    }
  }

  &__Label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  &__Option {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-left: 12px;
    text-align: center;
    user-select: none;
  }

  &__Circle {
    border: 1px solid transparent;
    border-radius: 50%;

    &.is-active {
      border-color: #202020;
    }
  }

  &__Swatch {
    border: 2px solid #fff;
    border-radius: 50%;
    width: 34px;
  }

  &__Square {
    border: 1px solid transparent;
    font-weight: 400;
    letter-spacing: .1em;
    line-height: 1;
    text-transform: uppercase;

    &.is-active {
      border-color: #202020;
      font-weight: 500;
    }

    div {
      background: #f2f0ed;
      border: 2px solid #fff;
      padding: 10px 20px;
    }
  }
}
</style>
