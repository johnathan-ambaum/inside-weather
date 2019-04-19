<template>
  <div class="BrowseWidget">
    <notification-bar/>
    <slot/>
    <div
      :class="{ 'is-active': filtersActive }"
      class="BrowseWidget__Body"
    >
      <filter-panel
        v-for="group in filterGroups"
        :key="group.parameter"
        :screen-width="screenWidth"
        :group="group"
        :full="true"
        :style="filterPanelStyles"
        :load="lazyLoad(group.parameter)"
        class="BrowseWidget__Panel"
        @preopen="loadPanel"
        @panel:toggle="param => togglePanel(param || group.parameter)"
        @panel:close="closePanel"/>
      <animated-results-button
        v-if="isMobile"
        :count="totalResults || 0"
        :on-start="pulseButtonStart"
        :on-complete="pulseButtonEnd"
      >
        <button
          ref="resultButton"
          slot-scope="{ count }"
          class="BrowseWidget__Close"
          @click="closePanel"
        >
          SHOW <strong>{{ count }}</strong> RESULTS
        </button>
      </animated-results-button>
    </div>
    <browse-widget-nav
      :value="openPanel"
      :filters-active="filtersActive"
      :is-mobile="isMobile"
      @input="togglePanel"
      @preopen="loadPanel"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import NotificationBar from './NotificationBar.vue';
import BrowseWidgetNav from './BrowseWidgetNav.vue';
import AnimatedResultsButton from './AnimatedResultsButton.vue';
import FilterPanel from './FilterPanel.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    NotificationBar,
    BrowseWidgetNav,
    AnimatedResultsButton,
    FilterPanel,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    category: { type: String, required: true },
  },

  data() {
    return {
      filtersActive: false,
      loadedPanels: [],
      gridLoaded: false,
    };
  },

  computed: {
    ...mapState({
      filterGroups: state => state.filters.filterGroups,
      openPanel: state => state.openPanel,
      totalResults: state => state.totalResults,
      hasSelected: state => state.selectedOptions.length > 0 || state.selectedFilters.length > 0,
    }),

    lazyLoad() {
      return (panel) => {
        if (this.isMobile) {
          return this.gridLoaded;
        }

        return this.loadedPanels.includes(panel);
      };
    },

    filterPanelStyles() {
      if (!this.isMobile) {
        return {};
      }

      const otherPanelSpace = this.filterGroups.length * 55;
      const borderSpace = this.filterGroups.length - 1;
      return {
        'max-height': `${this.screenHeight - otherPanelSpace + borderSpace}px`,
      };
    },
  },

  watch: {
    openPanel(newPanel) {
      if (newPanel) {
        this.filtersActive = true;
      }
    },
  },

  created() {
    this.applyQueryString();
    this.updateCategory(this.category);
    this.pullFilter();
    if (this.hasSelected) {
      this.loadProducts(1);
    } else {
      this.setPage(0);
      this.loadFeatured();
    }

    this.$bus.$on('filter:toggle', (payload) => {
      this.updateFilter(payload);
    });

    this.$bus.$on('browse:customize', () => {
      this.selectPanel(this.filterGroups[0].parameter);
    });

    this.$bus.$on('product-grid:loaded', () => {
      this.gridLoaded = true;
    });
  },

  methods: {
    ...mapMutations([
      'updateCategory',
      'selectPanel',
      'applyQueryString',
      'setPage',
    ]),

    ...mapActions([
      'pullFilter',
      'updateFilter',
      'loadFeatured',
      'loadProducts',
    ]),

    loadPanel(panel) {
      this.loadedPanels.push(panel);
    },

    togglePanel(panel) {
      this.selectPanel(panel === this.openPanel ? '' : panel);
    },

    pulseButtonStart() {
      if (this.$refs.resultButton) {
        this.$refs.resultButton.classList.add('Animation--Pulse');
      }
    },

    pulseButtonEnd() {
      if (this.$refs.resultButton) {
        this.$refs.resultButton.classList.remove('Animation--Pulse');
      }
    },

    closePanel() {
      this.filtersActive = false;
      this.selectPanel('');
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$close-bar-height: 50px;

@keyframes pulse {
  0%, 100% {
    background-color: #212121;
    border-color: #212121;
  }
  20% {
    background-color: #e8c5b2;
    border-color: #e8c5b2;
  }
  40% {
    background-color: #cad1ca;
    border-color: #cad1ca;
  }
  60% {
    background-color: #b3cacf;
    border-color: #b3cacf;
  }
  80% {
    background-color: #9fa6aa;
    border-color: #9fa6aa;
  }
}

.Animation--Pulse {
  animation: pulse 1s;
}

.template-collection.BrowseFilters--Open {
  overflow: hidden;
}

.BrowseWidget {
  font-family: $font-stack-avalon;
  transition: z-index 0s linear .3s;
  z-index: 1000;

  .BrowseFilters--Open & {
    transition: z-index 0s;
    z-index: 9999;
  }

  @include at-query($breakpoint-small) {
    &__Body {
      background: #fff;
      display: flex;
      flex-direction: column;
      height: 100%;
      left: 0;
      padding-bottom: $close-bar-height;
      position: fixed;
      right: 0;
      top: 0;
      transform: translateY(-100%);
      transition: transform .3s ease-in-out;
      width: 100vw;
      z-index: 1000;

      &.is-active {
        transform: translateY(0);
      }
    }

    &__Close {
      align-items: center;
      background: #212121;
      border: none;
      bottom: 0;
      color: #fff;
      display: flex;
      font-family: $font-stack-avalon;
      font-size: 16px;
      font-weight: 600;
      height: $close-bar-height;
      justify-content: center;
      position: absolute;
      padding: 0;
      text-shadow: 1px 1px 0 #212121;
      width: 100%;

      strong {
        margin: 0 3px;
      }
    }
  }
}
</style>
