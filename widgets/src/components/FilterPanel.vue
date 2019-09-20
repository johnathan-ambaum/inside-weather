<template>
  <div class="FilterPanel">
    <div class="FilterPanel__Header">
      <div class="FilterPanel__Title">{{ index + 1 }}. {{ name }}</div>
      <div
        v-if="groups.length > 0"
        class="FilterPanel__Filter"
      >
        <select
          v-model="group"
          class="FilterPanel__GroupSelect"
        >
          <option
            v-for="group in groups"
            :key="group.id"
            :value="group"
          >
            <template v-if="group.group_type === 'sort'">Sort: <strong>A-Z</strong></template>
            <template v-else>{{ group.name }}</template>
          </option>
        </select>
      </div>
    </div>
    <swatch-panel
      :parameter="parameter"
      :values="filteredValues"
      :load="load"
      class="FilterPanel__Body"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SwatchPanel from './SwatchPanel.vue';

export default {
  components: {
    SwatchPanel,
  },

  props: {
    parameter: { type: String, required: true },
    index: { type: Number, required: true },
    name: { type: String, required: true },
    groups: { type: Array, default: () => [] },
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
  },

  // mounted() {
  //   this.$el.querySelectorAll('.scrollable').forEach((el) => {
  //     SimpleScrollbar.initEl(el);
  //   });
  // },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.FilterPanel {
  color: #121212;
  display: flex;
  flex-direction: column;
  font-family: $font-stack-avalon;
  height: 100%;

  @include at-query($breakpoint-large) {
    height: calc(100vh - #{$sidebar-footer-height});
  }

  &__Header {
    align-items: center;
    border-bottom: .25px solid #202020;
    display: flex;
    font-size: 24px;
    font-size: 600;
    line-height: 30px;
    text-align: center;

    @include at-query($breakpoint-small) {
      border-top: .25px solid #202020;
      flex-direction: row;
      font-size: 18px;
      justify-content: space-between;
      padding: 20px $horizontal-wrapper-padding;
    }

    @include at-query($breakpoint-large) {
      flex: 0 0 $sidebar-heading-height;
      flex-direction: column;
      justify-content: center;
    }
  }

  &__Title {
    line-height: 1;

    @include at-query($breakpoint-small) {
      padding: 6px 30px 6px 0;
    }
  }

  &__Filter {
    @include at-query($breakpoint-small) {
      flex: 1;
    }
  }

  &__GroupSelect {
    border: .25px solid #202020;
    color: #202020;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: .08em;
    line-height: 28px;
    max-width: 195px;
    padding-bottom: 0;
    padding-top: 0;
    width: 100%;

    strong {
      font-weight: 500;
    }

    @include at-query($breakpoint-large) {
      font-size: 13px;
      margin-top: 18px;
    }
  }

  &__Title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__Body {
    @include at-query($breakpoint-large) {
      flex-grow: 1;
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
