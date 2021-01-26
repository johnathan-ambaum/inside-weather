<template>
  <div
    ref="body"
    class="SwatchPanel"
  >
    <swatch-panel-item
      v-for="option in values"
      ref="options"
      :key="option.value"
      :option="option"
      :value="isSelected(option)"
      :type="swatchType"
      :load="load"
      :is-mobile="isMobile"
      :price-differential="priceDifferential(option)"
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
    swatchType: { type: String, default: 'square' },
    values: { type: Array, default: () => [] },
    load: { type: Boolean, default: false },
  },
  computed: {
    ...mapState({
      selectedOptions: state => state.selectedOptions,
      priceMarkupsActive: state => state.themeSettings.vwo.optionPriceMarkups.active,
      priceMarkupsNoDelta: state => state.themeSettings.vwo.optionPriceMarkups.noDelta,
      priceMarkupsSelectedOption: state => state.themeSettings.vwo.optionPriceMarkups.selectedOption
    }),

    isSelected() {
      return option => this.selectedOptions[this.parameter] === option.value;
    },

    priceDifferential() {
      return (currentOption) => {
        const selectedOption = this.values.find(item => this.selectedOptions[this.parameter] === item.value);
        const selectedOptionPriceMarkup = selectedOption && selectedOption.price_markup ? parseFloat(selectedOption.price_markup) : 0;
        const currentOptionPriceMarkup = parseFloat(currentOption.price_markup);
        const priceDifferential = currentOptionPriceMarkup - selectedOptionPriceMarkup;
        if(isNaN(priceDifferential) || selectedOption === undefined || !this.priceMarkupsActive){return ''}
        if(currentOption.value === selectedOption.value){return this.priceMarkupsSelectedOption;}
        if(priceDifferential == 0){return this.priceMarkupsNoDelta;}
        if(priceDifferential >= 0){
          return '+$' + priceDifferential;
        }else{
          return '-$' + Math.abs(priceDifferential);
        }
      };
    }
  },

  watch: {
    values() {
      if (this.isMobile) {
        this.$refs.body.scrollLeft = 0;
      } else {
        this.$refs.body.scrollTop = 0;
      }
    },
  },

  mounted() {
    this.$bus.$on('panel:show', (parameter) => {
      if (this.parameter !== parameter) {
        return;
      }
      this.$nextTick(() => {
        const index = this.values.findIndex(item => this.selectedOptions[parameter] === item.value);
        const selectedEl = this.$refs.options[index].$el;
        const { top: parentTop } = selectedEl.parentNode.getBoundingClientRect();
        let { top } = selectedEl.getBoundingClientRect();
        top += this.$refs.body.scrollTop;
        this.$refs.body.scrollTop = top - parentTop;
      });
    });
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
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  @include at-query($breakpoint-large) {
    align-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
