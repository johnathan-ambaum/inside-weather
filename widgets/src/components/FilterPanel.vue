<template>
  <div class="FilterPanel">
    <div class="FilterPanel__Header">
      <div class="FilterPanel__Title">{{ index + 1 }}. {{ name }}</div>
      <div
        v-if="groups"
        class="FilterPanel__Filter"
      >
        <select
          v-model="group"
          class="FilterPanel__GroupSelect"
        >
          <option value="">SORT: A-Z</option>
          <option
            v-for="group in groups"
            :key="group"
            :value="group"
          >{{ group }}</option>
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
// import SimpleScrollbar from 'simple-scrollbar';
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
      group: '',
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

      return this.values.filter(value => value.groups && value.groups.includes(this.group));
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
  height: calc(100vh - #{$sidebar-footer-height});

  &__Header {
    align-items: center;
    border-bottom: 1px solid #c8c8c8;
    display: flex;
    flex: 0 0 $sidebar-heading-height;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @include at-query($breakpoint-small) {
      flex-direction: row;
    }
  }

  &__Title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__Body {
    flex-grow: 1;
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
