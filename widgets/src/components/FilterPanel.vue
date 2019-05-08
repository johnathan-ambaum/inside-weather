<template>
  <div
    :class="panelClasses"
    class="FilterPanel"
  >
    <div
      :class="panelHeadingClasses"
      class="FilterPanel__Heading"
      @click.stop="togglePanel"
    >
      <template v-if="!useFull">
        <span class="FilterPanel__ToggleLabel">{{ toggleLabel(group.name) }}</span>
        <button
          v-if="showMobileClear"
          class="FilterPanel__ToggleClear"
          @click.stop="clearSelectedOptions"
        >Clear All</button>
        <div class="FilterPanel__ToggleIcon">
          <font-awesome-icon
            v-if="active"
            :icon="['fal', 'minus']"
          />
          <font-awesome-icon
            v-else
            :icon="['fal', 'plus']"
            class="SwatchPanel__ToggleIcon"
          />
        </div>
      </template>
      <template v-if="useFull">
        <animated-results-button :count="numResults || 0">
          <div
            slot-scope="{ count }"
            class="FilterPanel__Results"
          ><strong>{{ count }}</strong> RESULTS</div>
        </animated-results-button>
        <close-button
          :size="40"
          stroke="bold"
          class="FilterPanel__Close"
          @click="$emit('panel:close')"
        />
      </template>
    </div>

    <div class="FilterPanel__Body">
      <nav
        :class="scrollableClass"
        class="FilterPanel__Nav"
      >
        <div class="FilterPanel__NavBody">
          <template
            v-for="(filter, index) in group.filters"
          >
            <swatch-panel
              v-if="!isHidden(filter)"
              :key="filter.parameter"
              :group="group"
              v-bind="filter"
              :has-toggle="!useFull"
              :default-active="isDefaultActive(index)"
              :load="loadImages"
              class="FilterPanel__NavItem"
            />
          </template>
        </div>
      </nav>
      <div class="FilterPanel__OptionsContainer">
        <div class="FilterPanel__OptionsHeader">
          SELECT {{ group.name }} OPTIONS
          <div class="FilterPanel__Subtext">{{ group.subtext }}</div>
        </div>
        <div
          :class="optionPanelClasses"
          class="FilterPanel__Options"
        >
          <swatch-panel
            :values="availableOptions"
            :group="group"
            :parameter="group.parameter"
            :wide="useFull"
            :has-toggle="false"
            :query-param="true"
            :load="loadImages"
            class="FilterPanel__Swatches"
          />
        </div>
        <div
          v-if="useFull"
          class="FilterPanel__OptionsFooter"
        >
          <div class="FilterPanel__ClearWrap">
            <button
              type="button"
              class="FilterPanel__Clear"
              @click="clearSelectedOptions"
            >CLEAR ALL</button>
          </div>
          <button
            type="button"
            class="FilterPanel__OptionsFooterClose"
            @click.stop="$emit('panel:close')"
          >SEE RESULTS</button>
          <span
            v-if="nextStep"
            class="FilterPanel__FooterSeparator"
          >OR</span>
          <button
            v-if="nextStep"
            type="button"
            class="FilterPanel__Next"
            @click.stop="$emit('panel:toggle', nextStep.parameter)"
            @mouseenter.once="$emit('preopen', nextStep.parameter)"
          >
            Continue to <span class="FilterPanel__Step">{{ nextStep.number }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SimpleScrollbar from 'simple-scrollbar';
import * as shvl from 'shvl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SwatchPanel from './SwatchPanel.vue';
import AnimatedResultsButton from './AnimatedResultsButton.vue';
import CloseButton from './CloseButton.vue';

library.add(faMinus, faPlus);

export default {
  components: {
    SwatchPanel,
    FontAwesomeIcon,
    AnimatedResultsButton,
    CloseButton,
  },

  props: {
    full: { type: Boolean, default: false },
    default: { type: Boolean, default: false },
    group: { type: Object, required: true },
    screenWidth: { type: Number, required: true },
    isPdp: { type: Boolean, default: false },
    panelActive: { type: Boolean, default: false },
    load: { type: Boolean, default: false },
  },

  computed: {
    ...mapState({
      openPanel: state => state.openPanel,
      selectedFilters: state => state.selectedFilters,
      selectedOptions: state => state.selectedOptions,
      numResults: state => state.totalResults,
      filters: state => shvl.get(state.filters, 'filterGroups', []),
    }),

    nextStep() {
      const currentIndex = this.filters.findIndex(group => group.parameter === this.group.parameter);
      const currentNumber = currentIndex + 1;

      if (currentNumber >= this.filters.length) {
        return null;
      }

      return {
        parameter: this.filters[currentIndex + 1].parameter,
        number: currentNumber + 1,
      };
    },

    isHidden() {
      return filter => this.isPdp && filter.ignoreOnPDP;
    },

    loadImages() {
      return this.isPdp || this.load;
    },

    scrollableClass() {
      return {
        scrollable: this.useFull,
      };
    },

    optionPanelClasses() {
      return {
        'FilterPanel__Options--Standalone': this.group.filters.every(filter => filter.ignoreOnPDP),
        scrollable: this.useFull,
      };
    },

    isDefaultActive() {
      // default all collapsed on PDP, all open category desktop, first open on category mobile
      return index => !this.isPdp && (this.useFull || index === 0);
    },

    hasSelected() {
      if (this.selectedFilters.some(filter => filter.group === this.group.parameter)) {
        return true;
      }

      if (this.selectedOptions.some(filter => filter.group === this.group.parameter)) {
        return true;
      }

      return false;
    },

    showMobileClear() {
      return this.full && this.screenWidth < 1024 && this.hasSelected;
    },

    useFull() {
      return this.full && this.screenWidth >= 1024;
    },

    title() {
      return this.group.name.toUpperCase();
    },

    panelClasses() {
      return {
        'is-active': this.active,
        'FilterPanel--Full': this.full,
      };
    },

    panelHeadingClasses() {
      return {
        FilterPanel__Toggle: !this.useFull,
      };
    },

    active() {
      if (this.isPdp && this.screenWidth < 1024) {
        return this.panelActive;
      }

      return this.openPanel === this.group.parameter;
    },

    toggleLabel() {
      return label => (this.full
        ? label.toUpperCase()
        : `CHOOSE YOUR ${label.toUpperCase()}:`);
    },

    availableOptions() {
      if (!this.selectedFilters.length || !this.group.options.length) {
        return this.group.options;
      }

      const currentSelected = {};
      this.selectedFilters.forEach((filter) => {
        currentSelected[filter.parameter] = filter.values;
      });

      return this.group.options.filter(
        option => Object.entries(option.parameters)
          // only show options that match one of the selected filter values (if any) for all filter parameters
          .every(([parameter, optionValues]) => typeof currentSelected[parameter] === 'undefined'
          // additive filtering, so we want to include all options that match ANY of the selected filters
            || currentSelected[parameter].some(filterValue => optionValues.includes(filterValue)))
      );
    },
  },

  watch: {
    active(newValue) {
      if (this.full) {
        document.body.style.overflow = newValue ? 'hidden' : '';
      }
    },
  },

  created() {
    if (this.default && !this.openPanel) {
      this.selectPanel(this.group.parameter);
    }
  },

  mounted() {
    this.$el.querySelectorAll('.scrollable').forEach((el) => {
      SimpleScrollbar.initEl(el);
    });
  },

  methods: {
    ...mapMutations([
      'selectPanel',
    ]),

    ...mapActions([
      'clearSelections',
    ]),

    togglePanel() {
      if (!this.useFull) {
        this.$emit('panel:toggle');
      }
    },

    clearSelectedOptions() {
      this.clearSelections(this.group.parameter);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$filter-body-gutter: 30px;
$filter-header-offset: $top-bar-height + $header-height-small + $browse-bar-height + $filter-body-gutter;
$options-header-height: 50px;
$options-footer-height: 105px;

@mixin counter() {
  &::before {
    align-items: center;
    background: #121212;
    border-radius: 50%;
    color: #fff;
    content: counter(panel);
    display: flex;
    flex: 0 0 auto;
    font-weight: bold;
    height: 24px;
    justify-content: center;
    margin-right: 8px;
    width: 24px;
  }
}

.FilterPanel {
  color: #121212;
  counter-increment: panel;
  display: flex;
  flex-direction: column;
  font-family: $font-stack-avalon;

  &:not(.FilterPanel--Full) + & {
    border-top: 1px solid #ababab;
  }

  @include at-query($breakpoint-small) {
    &:not(.FilterPanel--Full).is-active + & {
      border-top: none;
    }
  }

  @include at-query($breakpoint-large) {
    &--Full {
      background: rgba(255, 255, 255, .95);
      height: 100vh;
      left: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      transform: translateY(-100%);
      transition: transform .2s ease-in-out;
      width: 100vw;
      z-index: 1001;

      &.is-active {
        transform: translateY(0);
      }
    }
  }

  &__Heading {
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
    line-height: 1;
    padding: 15px;
    width: 100%;

    @include at-query($breakpoint-small) {
      .FilterPanel--Full.is-active & {
        box-shadow: 0 3px 8px -4px rgba(0, 0, 0, .3);
        z-index: 10;
      }

      .FilterPanel--Full.is-active + .FilterPanel & {
        box-shadow: 0 -3px 8px -4px rgba(0, 0, 0, .3);
      }
    }

    @include at-query($breakpoint-large) {
      align-items: center;

      .FilterPanel--Full & {
        height: $header-height-small + $top-bar-height;
        margin-bottom: $browse-bar-height;
      }
    }
  }

  &__Results {
    align-items: center;
    display: flex;
    flex-grow: 1;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 2px;

    strong {
      font-size: 24px;
      margin-right: 8px;
    }
  }

  &__Close {
    height: 60px;
  }

  &__Toggle {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 0 0 55px;
    font-weight: 600;
    padding: 0 15px;

    .FilterPanel:not(.FilterPanel--Full) & {
      @include counter;

      @include at-query($breakpoint-large) {
        flex: 0 0 55px;
        padding: 0 30px;
      }
    }

    @include at-query($breakpoint-small) {
      background: #f4f4f4;
      @include counter;

      .FilterPanel--Full:not(.is-active) + .FilterPanel & {
        border-top: 1px solid #cfcfcf;
      }
    }
  }

  &__ToggleClear {
    font-size: 11px;
    font-weight: 400;
    margin: 0 0 3px 20px;
    text-decoration: underline;
  }

  &__ToggleLabel {
    flex: 0 0 auto;
    font-size: 16px;
    font-weight: 700;
    user-select: none;
  }

  @include at-query($breakpoint-large) {
    &:not(.FilterPanel--Full) &__ToggleLabel {
      font-size: 17px;
    }
  }

  &__ToggleIcon {
    flex: 1 0 auto;
    text-align: right;
  }

  &__Body {
    display: none;
    flex-direction: column;
    flex-grow: 1;

    .FilterPanel.is-active & {
      display: flex;
    }

    @include at-query($breakpoint-small) {
      background: #fff;

      .FilterPanel.is-active & {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        flex-direction: row;
        padding-top: $filter-body-gutter;
      }

      .FilterPanel:not(.FilterPanel--Full) & {
        border-top: 1px solid #b7b7b7;
      }
    }
  }

  &__Nav {
    padding: 0 15px;

    @include at-query($breakpoint-large) {
      .FilterPanel:not(.FilterPanel--Full) & {
        padding: 0 30px;
      }

      .FilterPanel--Full & {
        border-right: 1px solid #acacac;
        flex: 0 0 30%;
      }

      .ss-scroll {
        transform: translateX(-20px);
      }
    }
  }

  @include at-query($breakpoint-large) {
    .FilterPanel--Full &__NavBody {
      max-height: calc(100vh - #{$filter-header-offset});
    }
  }

  &__NavItem {
    @at-root {
      .FilterPanel:not(.FilterPanel--Full) & {
        border-bottom: 1px solid #acacac;

        &:last-child {
          margin-bottom: 20px;
        }
      }
    }

    @include at-query($breakpoint-small) {
      border-bottom: 1px solid #acacac;
      position: relative;

      &:last-child {
        margin-bottom: 20px;
      }

      @at-root {
        .FilterPanel--Full &:first-child::before {
          background: #fff;
          content: '';
          display: block;
          height: 10px;
          left: -15px;
          position: absolute;
          top: 0;
          z-index: 99999;
          width: 100vw;
        }
      }
    }
  }

  &__OptionsContainer {
    display: none;

    .is-active & {
      display: block;
    }

    @include at-query($breakpoint-small) {
      padding: 0 15px;
    }

    @include at-query($breakpoint-large) {
      padding: 0 30px;

      .FilterPanel--Full & {
        display: block;
        flex: 1 1 75%;
        padding: 0;
      }
    }
  }

  &__Options {

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        height: calc(100vh - #{$filter-header-offset} - #{$options-header-height} - #{$options-footer-height});
        // overflow: auto;
        padding: 0 50px;
        -webkit-overflow-scrolling: touch;
      }

      .ss-scroll {
        transform: translateX(-55px);
      }
    }
  }

  &__OptionsHeader {
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: .025em;
    margin-bottom: 24px;
    margin-top: 24px;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      @at-root {
        .FilterPanel--Full & {
          font-size: 18px;
          height: $options-header-height;
          margin-bottom: 0;
          margin-top: 0;
          text-align: center;
        }
      }
    }
  }

  &__Subtext {
    font-family: $font-stack-roboto;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    margin: 17px 0 20px;
    text-align: center;
    text-transform: none;

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        margin: 10px 0 30px;
      }
    }
  }

  &__OptionsFooter {
    align-items: center;
    display: flex;
    height: $options-footer-height;
    justify-content: flex-end;
    padding: 40px 90px 15px;
  }

  &__OptionsFooterClose {
    align-items: center;
    background: transparent;
    border: 2px solid #202020;
    color: #202020;
    display: flex;
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 600;
    height: 100%;
    justify-content: center;
    text-transform: uppercase;
    width: 230px;
  }

  &__ClearWrap {
    flex-grow: 1;
    text-align: left;
  }

  &__Clear {
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 600;
    margin-right: $gutter;
    text-decoration: underline;
  }

  &__FooterSeparator {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    margin: 0 20px;
  }

  &__Next {
    align-items: center;
    background: #202020;
    border: 2px solid #202020;
    color: #fff;
    display: flex;
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 600;
    height: 100%;
    justify-content: center;
    text-transform: uppercase;
    width: 230px;
  }

  &__Step {
    align-items: center;
    background: #fff;
    border-radius: 50%;
    color: #212121;
    display: flex;
    flex: 0 0 auto;
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 700;
    height: 20px;
    justify-content: center;
    margin-left: 8px;
    width: 20px;
  }

  &__Swatches {
    background: #fdfdfd;
    clear: right;

    @include at-query($breakpoint-large) {
      .FilterPanel--Full & {
        background: transparent;
      }
    }
  }
}

.ss-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  float: left;
}

.ss-content {
  box-sizing: border-box;
  height: 100%;
  padding: 0 0 0 0;
  width: 100%;

  @include at-query($breakpoint-large) {
    overflow: auto;
    position: relative;
    width: calc(100% + 18px);
  }
}

.ss-scroll {
  position: relative;
  background: #bebebe;
  width: 3px;
  border-radius: 4px;
  top: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s linear;

  @include at-query($breakpoint-small) {
    display: none;
  }
}

.ss-hidden {
  display: none;
}

.ss-container:hover .ss-scroll,
.ss-container:active .ss-scroll {
  opacity: 1;
}

.ss-grabbed {
  -o-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
