<template>
  <nav
    v-if="hasFilters"
    :class="navClasses"
    class="BrowseWidgetNav"
  >
    <div
      v-for="filter in filters"
      :key="filter.parameter"
      :class="{ 'is-active': openPanel === filter.parameter }"
      class="BrowseWidgetNav__Item"
      @click="toggleFilter(filter.parameter)"
      @mouseenter.once="$emit('preopen', filter.parameter)"
    >
      {{ filterLabel(filter) }}
      <font-awesome-icon
        v-if="openPanel === filter.parameter"
        :icon="['fal', 'minus']"
        class="BrowseWidgetNav__ToggleIcon"
      />
      <font-awesome-icon
        v-else
        :icon="['fal', 'plus']"
        class="BrowseWidgetNav__ToggleIcon"
      />
    </div>
    <div
      :class="{ 'is-active': filtersActive }"
      class="BrowseWidgetNav__Toggle"
      @click="toggleFilter(filters[0].parameter)"
    >
      <div
        :class="{ 'Animation--Pulse': isCycling }"
        class="BrowseWidgetNav__ToggleBackdrop"
      />
      <div class="BrowseWidgetNav__ToggleLabel">Customize</div>
      <div class="BrowseWidgetNav__Plus">+</div>
    </div>
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="!isMobile"
        v-show="showHelp"
        class="BrowseWidgetNav__Help"
      >
        Quick Tip: Use our customization tool to narrow down your options
        <close-button
          class="BrowseWidgetNav__HelpClose"
          size="15"
          stroke="semibold"
          @click="dismissHelp"
        />
      </div>
    </transition>
  </nav>
</template>

<script>
import * as shvl from 'shvl';
import { mapState, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CloseButton from './CloseButton.vue';

library.add(faMinus, faPlus);

export default {
  components: {
    CloseButton,
    FontAwesomeIcon,
  },

  props: {
    filtersActive: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
  },

  data() {
    return {
      isCycling: false,
      showHelp: false,
    };
  },

  computed: {
    ...mapState({
      filters: state => shvl.get(state.filters, 'filterGroups', []),
      openPanel: state => state.openPanel,
    }),

    hasFilters() {
      return this.filters.length > 0;
    },

    filterLabel() {
      return filter => filter.name.toUpperCase();
    },

    navClasses() {
      return {
        'BrowseWidgetNav--Cycling': this.isCycling,
      };
    },
  },

  mounted() {
    const cycleColors = () => {
      if (!this.isCycling && !this.openPanel) {
        this.isCycling = true;
        setTimeout(() => {
          this.isCycling = false;
        }, 2000);
      }
    };

    setTimeout(cycleColors, 5000);

    if (!this.helpDismissed()) {
      this.showHelpTimer = setTimeout(() => {
        this.showHelp = true;
      }, 5000);
    }

    this.$bus.$on('browse:cycle-colors', cycleColors);
  },

  methods: {
    ...mapMutations([
      'selectPanel',
    ]),

    toggleFilter(filter) {
      this.selectPanel(filter !== this.openPanel ? filter : '');
      if (!this.helpDismissed()) {
        this.dismissHelp();
      }
    },

    dismissHelp() {
      if (this.showHelpTimer) {
        clearTimeout(this.showHelpTimer);
      }
      localStorage.setItem('browse-help.dismissed', 1);
      this.showHelp = false;
    },

    helpDismissed() {
      return localStorage.getItem('browse-help.dismissed');
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$colors: (#eec4af #f6eac4 #c2d1c5 #a5cace #9aa4a9);

.BrowseWidgetNav {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  transition: z-index 0s linear .3s;
  width: 100vw;
  z-index: 998;

  .MainNav--Active & {
    transition: z-index 0s;
    z-index: 900;
  }

  .BrowseFilters--Open & {
    transition: z-index 0s;
    z-index: 9999;
  }

  @include at-query($breakpoint-large) {
    background-color: #212121;
    display: flex;
    height: $browse-bar-height;
    left: 0;
    position: fixed;
    top: $header-height-small + $top-bar-height;
    z-index: 1002;
  }

  &__Item {
    align-items: center;
    animation-iteration-count: 1;
    animation-play-state: running;
    counter-increment: browseNav;
    cursor: pointer;
    display: flex;
    flex: 1;
    justify-content: center;
    transition: background-color .2s linear, color .2s linear;

    @include at-query($breakpoint-small) {
      display: none;
    }

    &::before {
      align-items: center;
      background: #fff;
      border-radius: 50%;
      color: #212121;
      content: counter(browseNav);
      display: flex;
      flex: 0 0 auto;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 700;
      height: 20px;
      justify-content: center;
      margin-right: 15px;
      width: 20px;
    }

    &:hover, &.is-active {
      color: #202020;

      @for $i from 1 through length($colors) {
        &:nth-child(5n+#{$i}) {
          background-color: nth($colors, $i);

          &::before {
            background-color: #202020;
            color: nth($colors, $i);
          }
        }
      }
    }

    .BrowseWidgetNav--Cycling & {
      @for $i from 1 through length($colors) {
        @keyframes flash-active-#{$i} {
          0%, 100% {
            background-color: #212121;
            color: #fff;
          }
          25%, 75% {
            color: #282828;
          }
          50% {
            background-color: nth($colors, $i);
          }
        }

        @keyframes flash-counter-active-#{$i} {
          0%, 25%, 75%, 100% {
            background-color: #fff;
            color: #202020;
          }
          50% {
            background-color: #202020;
            color: nth($colors, $i);
          }
        }

        &:nth-child(5n+#{$i}) {
          $delay: .2 * ($i - 1);
          animation: flash-active-#{$i} 1s linear #{$delay}s;

          &::before {
            animation: flash-counter-active-#{$i} 1s linear #{$delay}s;
          }
        }
      }
    }
  }

  &__ToggleIcon {
    margin-left: 8px;
  }

  &__Toggle {
    color: #fff;
    height: $filter-panel-toggle-size / 2;
    left: 0;
    margin: 0 auto;
    position: fixed;
    right: 0;
    text-align: center;
    top: $header-height-small + $top-bar-height;
    transform: translateY(0);
    transition: transform .3s ease-in-out;
    width: $filter-panel-toggle-size;
    z-index: 500;

    &.is-active {
      transform: translateY(100vh);
    }

    @include at-query($breakpoint-large) {
      display: none;
    }

    #{&}Backdrop {
      background: transparent !important;
      border: none;
      border-bottom: ($filter-panel-toggle-size / 2) solid #1d1d1d;
      border-radius: $filter-panel-toggle-size;
      height: $filter-panel-toggle-size;
      position: absolute;
      transform: translateY(-50%);
      width: 100%;
      z-index: -1;
    }

    #{&}Label {
      cursor: pointer;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: .125em;
      line-height: 1;
      margin: 6px 0 3px;
      text-transform: uppercase;
    }

    .BrowseWidgetNav__Plus {
      font-size: 40px;
      font-weight: 100;
      line-height: .5;
      margin-top: 3px;
    }
  }

  &__Help {
    background: rgba(235, 194, 175, .9);
    color: #202020;
    font-weight: 600;
    left: 0;
    margin: auto;
    padding: 20px 40px;
    position: absolute;
    right: 0;
    top: calc(100% + 13px);
    width: 275px;

    &::before {
      border-style: solid;
      border-width: 0 10px 13px 10px;
      border-color: transparent transparent rgba(235, 194, 175, .9) transparent;
      bottom: 100%;
      content: '';
      display: block;
      height: 0;
      position: absolute;
      width: 0;
    }
  }

  &__HelpClose {
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>
