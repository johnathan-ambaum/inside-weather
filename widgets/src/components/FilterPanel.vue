<template>
  <div class="FilterPanel">
    <div class="FilterPanel__Header">
      <div class="FilterPanel__Title">{{ index + 1 }}. {{ name }}</div>
      <div
        v-if="groups.length > 0"
        class="FilterPanel__Filter"
      >
        <select
          v-if="isMobile"
          :value="group.id"
          class="FilterPanel__GroupSelect"
          @change="e => setGroup(e.target.value)"
        >
          <option
            v-for="option in groupOptions"
            :key="option.value"
            :value="option.value"
          >{{ option.display }}</option>
        </select>
        <styled-select
          v-else
          :options="groupOptions"
          :value="group.id"
          class="FilterPanel__GroupSelect"
          @input="setGroup"
        />
      </div>
    </div>
    <swatch-panel
      :parameter="parameter"
      :swatch-type="swatch_type"
      :values="filteredValues"
      :load="load"
      class="FilterPanel__Body"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import StyledSelect from './StyledSelect.vue';
import SwatchPanel from './SwatchPanel.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    StyledSelect,
    SwatchPanel,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    parameter: { type: String, required: true },
    index: { type: Number, required: true },
    name: { type: String, required: true },
    groups: { type: Array, default: () => [] },
    swatch_type: { type: String, default: 'square' },
    values: { type: Array, required: true },
    load: { type: Boolean, default: false },
  },

  data() {
    return {
      group: this.groups[0] || '',
    };
  },

  computed: {
    ...mapState({
      openPanel: state => state.openPanel,
      selectedOptions: state => state.selectedOptions,
    }),

    filteredValues() {
      if (!this.group) {
        return this.values;
      }

      if (this.group.group_type === 'sort') {
        return [...this.values].sort((a, b) => (a[this.group.reference] < b[this.group.reference] ? -1 : 1));
      }

      return this.values.filter(value => value[this.group.reference]);
    },

    groupOptions() {
      return this.groups.map((group) => {
        let display = this.isMobile ? group.name : `<strong>${group.name}</strong>`;
        if (group.prefix) {
          display = `${group.prefix} ${display}`;
        }
        return {
          value: group.id,
          display,
        };
      });
    },
  },

  methods: {
    setGroup(selectedId) {
      const selected = this.groups.find(group => group.id == selectedId);
      if (selected) {
        this.group = selected;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.FilterPanel {
  animation-delay: .6s;
  animation-duration: .5s;
  background: #fff;
  bottom: $sidebar-footer-height-mobile;
  color: #121212;
  display: flex;
  flex-direction: column;
  font-family: $font-stack-avalon;
  height: auto;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 200;

  @include at-iphone {
    bottom: $iphone-action-bar-height + $sidebar-footer-height-mobile;
  }

  @include at-query($breakpoint-large) {
    bottom: 0;
    box-shadow: -0.9px 0.9px 0.4px 0 rgba(139, 137, 134, 0.5);
    height: 100vh;
  }

  &.slideOutRight {
    animation-delay: 0s;
  }

  &__Header {
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #D4D0CA;
    display: flex;
    text-align: center;

    @include at-query($breakpoint-small) {
      border-top: 1px solid #D4D0CA;
      flex-direction: row;
      padding: 11px $horizontal-wrapper-padding;
      font-size: 16px;
    }

    @include at-query($breakpoint-large) {
      flex: 0 0 auto;
      flex-direction: column;
      justify-content: center;
      padding: 40px 0 28px;
    }
  }

  &__Title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;

    @include at-query($breakpoint-small) {
      padding: 6px 30px 6px 0;
      font-size: 15px;
    }

    @include at-query($breakpoint-large) {
      font-size: 24px;
    }
  }

  &__Filter {
    @include at-query($breakpoint-small) {
      flex: 1 0 auto;
    }
  }

  &__GroupSelect {
    background-color: #fff;
    border: 1px solid #D4D0CA;
    color: #202020;
    font-weight: 400;
    max-width: 195px;
    width: 100%;
    font-size:10px;

    strong {
      font-weight: 500;
    }

    @include at-query($breakpoint-large) {
      font-size: 13px;
      margin-top: 15px;
      max-width: 100%;
      width: 250px;
    }
  }

  &__Body {
    @include at-query($breakpoint-large) {
      flex-grow: 1;

      &::after {
        content: '';
        height: $sidebar-footer-height;
        flex: 0 0 100%;
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
  width: 10px;
  border-radius: 2px;
  top: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 1;
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
