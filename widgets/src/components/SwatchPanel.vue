<template>
  <div
    :class="{ 'is-active': active || queryParam }"
    class="SwatchPanel"
  >
    <div
      v-if="!queryParam"
      class="SwatchPanel__Toggle"
      @click="toggleSwatchPanel"
    >
      <div class="SwatchPanel__Label">FILTER BY</div>
      <span class="SwatchPanel__Title">{{ displayName }}</span>
      <template v-if="hasToggle">
        <font-awesome-icon
          v-if="active"
          :icon="['fal', 'minus']"
          class="SwatchPanel__ToggleIcon"
        />
        <font-awesome-icon
          v-else
          :icon="['fal', 'plus']"
          class="SwatchPanel__ToggleIcon"
        />
      </template>
    </div>
    <div class="SwatchPanel__Subtext">{{ subtext }}</div>
    <div
      :class="bodyClasses"
      class="SwatchPanel__Body"
    >
      <template
        v-for="(option, index) in sanitizedOptions"
      >
        <input-checkbox
          v-if="type === 'checkbox'"
          :key="index"
          :value="isSelected(option)"
          class="SwatchPanel__Checkbox"
          @input="toggleOption(option)"
        >{{ option.name }}</input-checkbox>
        <swatch-panel-item
          v-else
          :key="index"
          :item="option"
          :is-option="queryParam"
          :show-label="showLabel"
          :shape="swatchShape"
          :border="isSwatch"
          :has-error="hasError(option)"
          :value="isSelected(option)"
          :load="load"
          :is-mobile="isMobile"
          @input="toggleOption(option)"
        >
          <input-checkbox
            v-if="type === 'hybrid'"
            :value="isSelected(option)"
            class="SwatchPanel__HybridCheckbox"
            @input="toggleOption(option)"
          >{{ option.name }}</input-checkbox>
        </swatch-panel-item>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SwatchPanelItem from './SwatchPanelItem.vue';
import InputCheckbox from './InputCheckbox.vue';
import screenMonitor from '../mixins/screenMonitor';

library.add(faMinus, faPlus);

export default {
  components: {
    SwatchPanelItem,
    InputCheckbox,
    FontAwesomeIcon,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    name: { type: String, default: '' },
    subtext: { type: String, default: '' },
    type: { type: String, default: 'swatch' },
    values: { type: Array, default: () => [] },
    group: { type: Object, required: true },
    defaultActive: { type: Boolean, default: true },
    wide: { type: Boolean, default: false },
    queryParam: { type: Boolean, default: false },
    hasToggle: { type: Boolean, default: true },
    parameter: { type: String, required: true },
    load: { type: Boolean, default: false },
  },

  data() {
    return {
      active: this.defaultActive,
    };
  },

  computed: {
    ...mapState({
      selectedFilters: state => state.selectedFilters,
      selectedOptions: state => state.selectedOptions,
      lastErrorTrigger: state => state.lastErrorTrigger,
    }),

    sanitizedOptions() {
      return this.values.filter(option => option !== null && typeof option === 'object');
    },

    displayName() {
      if (this.isMobile) {
        return `FILTER BY ${this.name}`;
      }

      return this.name;
    },

    showLabel() {
      const unlabeled = ['small_swatch', 'hybrid'];
      return !unlabeled.includes(this.type);
    },

    swatchShape() {
      return this.isSwatch ? 'round' : 'square';
    },

    isSwatch() {
      return this.type.includes('swatch');
    },

    isSelected() {
      return option => this.selectedForPanel.includes(option.value);
    },

    hasError() {
      return option => this.lastErrorTrigger
        && this.lastErrorTrigger.parameter === this.group.parameter
        && this.lastErrorTrigger.value === option.value;
    },

    selectedForPanel() {
      const filter = this.queryParam ? this.selectedOptions : this.selectedFilters;
      const selected = filter.find(option => option.parameter === this.parameter);
      return selected ? selected.values : [];
    },

    bodyClasses() {
      let perRow = 4;

      if (this.type === 'checkbox' || this.type === 'hybrid') {
        perRow = 2;
      } else if (this.name === 'Finish' && this.sanitizedOptions.length === 4) {
        perRow = 4;
      }

      return {
        'SwatchPanel__Body--Wide': this.wide,
        [`SwatchPanel__Body--${this.name}`]: true,
        [`SwatchPanel__Body--${this.type}`]: true,
        'single-row': this.sanitizedOptions.length === perRow,
      };
    },
  },

  methods: {
    toggleOption(option) {
      this.$bus.$emit('filter:toggle', {
        group: this.group.parameter,
        parameter: this.parameter,
        value: option.value,
        queryParam: this.queryParam,
      });
    },

    toggleSwatchPanel() {
      if (!this.hasToggle) {
        return;
      }
      this.active = !this.active;
      this.$emit('swatch-panel:toggle', this.active);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$swatch-margin: 5px;

.SwatchPanel {
  &__Toggle {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    letter-spacing: .025em;
    padding: 17px 0;
    user-select: none;

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        border-top: 1px solid #acacac;
        flex-direction: column;
        margin-top: 48px;
        padding: 60px 0 10px;
      }

      .FilterPanel--Full .SwatchPanel:first-child & {
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }
    }
  }

  @include at-query($breakpoint-large) {
    .FilterPanel--Full &__ToggleIcon {
      font-size: 2em;
    }
  }

  &__Label {
    display: none;

    @include at-query($breakpoint-large) {
      display: block;

      .FilterPanel--Full & {
        color: #202020;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: .05em;
        line-height: 1;
        margin-bottom: 8px;
        text-align: center;
      }

      .FilterPanel:not(.FilterPanel--Full) & {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .025em;
        margin-right: 3px;
        text-transform: uppercase;
      }
    }
  }

  &__Title {
    flex: 1;
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: .025em;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        font-size: 18px;
        line-height: 1;
        text-align: center;
      }
    }
  }

  &__Subtext {
    display: none;
    font-family: $font-stack-roboto;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: center;

    .SwatchPanel.is-active & {
      display: block;
    }

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        display: block;
        margin-bottom: 30px;
      }
    }
  }

  &__Body {
    align-items: flex-start;
    display: none;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-bottom: 17px;
    width: 100%;

    @include at-query($breakpoint-large) {
      .FilterPanel--Full .SwatchPanel:not(:last-child) & {
        padding-bottom: 0;
      }
    }

    & > * {
      flex: 0 1 50%;
    }

    &--small_swatch {
      width: 280px;
    }

    &--swatch {
      max-width: 360px;
    }

    &--small_swatch,
    &--swatch {
      & > * {
        flex: 0 1 calc(25% - #{$swatch-margin * 3 / 4});
        margin-left: $swatch-margin;

        &:nth-child(4n+1) {
          margin-left: 0;
        }
      }
    }

    &--hybrid {
      max-width: 375px;

      & > .SwatchPanelItem {
        align-items: flex-start;
      }
    }

    &--Height {
      max-width: 230px;

      & > *:nth-child(2n+2) {
        padding-left: 40px;
      }
    }

    &--Finish {
      max-width: 300px;

      & > * {
        flex: 0 1 calc(#{percentage(1 / 3)} - #{$swatch-margin * 2 / 3});
        margin-left: $swatch-margin;

        &:nth-child(3n+1) {
          margin-left: 0;

          & + * {
            margin-left: $swatch-margin;
          }
        }
      }

      &.single-row {
        max-width: 400px;

        & > * {
          flex: 0 1 calc(25% - #{$swatch-margin * 3 / 4});
        }
      }
    }

    &--checkbox {
      align-items: center;
      justify-content: flex-start;
      max-width: 340px;
    }

    &--Wide {
      max-width: 100%;
    }

    .FilterPanel__Options & {
      justify-content: center;
      max-width: 100%;
    }

    @at-root {
      .SwatchPanel.is-active & {
        display: flex;

        &--Wide {
          flex-wrap: wrap;

          & > * {
            flex: 0 0 auto;
            margin-left: 20px;
          }
        }
      }
    }
  }

  & &__Checkbox {
    margin: 4px 0 12px;

    &:nth-child(2n+2) {
      padding-left: 20px;
    }

    &:nth-child(n+3) {
      margin-top: 30px;
    }
  }

  &__Body.single-row &__Checkbox {
    justify-content: center;
  }

  & &__HybridCheckbox {
    margin-left: 6px;
    margin-top: 1rem;
    max-width: 80%;
  }
}
</style>
