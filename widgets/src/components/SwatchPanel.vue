<template>
  <div class="SwatchPanel">
    <swatch-panel-item
      v-for="option in values"
      :key="option.value"
      :option="option"
      :value="isSelected(option)"
      :load="load"
      :is-mobile="isMobile"
      @input="toggleOption(option)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SwatchPanelItem from './SwatchPanelItem.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    SwatchPanelItem,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    parameter: { type: String, required: true },
    values: { type: Array, default: () => [] },
    load: { type: Boolean, default: false },
  },

  computed: {
    ...mapState({
      selectedOptions: state => state.selectedOptions,
    }),

    isSelected() {
      return option => this.selectedOptions[this.parameter] === option.value;
    },
  },

  methods: {
    toggleOption(option) {
      this.$bus.$emit('filter:toggle', {
        parameter: this.parameter,
        value: option.value,
      });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$swatch-margin: 5px;

.SwatchPanel {
  align-items: flex-start;
  display: flex;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  @include at-query($breakpoint-large) {
    flex-wrap: wrap;
  }
}
</style>
