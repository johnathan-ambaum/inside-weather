<template>
  <div
    :class="{ 'InfoPopup--Active': show }"
    class="InfoPopup"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <span @click="show = !show">
      <slot />
    </span>
    <div
      :class="{ 'InfoPopup__Dialog--AlwaysOnTop': alwaysOnTop }"
      class="InfoPopup__Dialog"
    >
      <p>{{ text }}</p>
      <close-button
        v-if="isMobile"
        :size="10"
        class="InfoPopup__Close"
        @click.native.prevent="show = false"
      />
    </div>
  </div>
</template>

<script>
import CloseButton from './CloseButton.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    CloseButton,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    text: { type: String, required: true },
    alwaysOnTop: { type: Boolean, default: false },
  },

  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.InfoPopup {
  cursor: pointer;
  display: inline;
  align-items: center;
  position: relative;

  &__Dialog {
    background: #fff;
    border: 1px solid #959595;
    color: #a9a9a9;
    display: none;
    padding: 10px 15px;
    position: absolute;
    right: -60px;
    text-align: left;
    width: 240px;
    z-index: 100;

    @at-root {
      .InfoPopup--Active & {
        display: block;
      }
    }

    @include at-query($breakpoint-small) {
      padding-right: 20px;
      top: calc(100% + 12px);
    }

    @include at-query($breakpoint-large) {
      bottom: calc(100% + 12px);
    }

    @media only screen and (min-width: 1201px) {
      left: -60px;
      right: auto;
    }

    &--AlwaysOnTop {
      bottom: calc(100% + 12px);
      right: 0;
      top: auto;
      width: 260px;

      @include at-query($breakpoint-large) {
        width: 310px;
      }

      @media only screen and (min-width: 1201px) {
        left: 0;
      }
    }

    &::after,
    &::before {
      border: solid transparent;
      bottom: 100%;
      content: '';
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 62px;
      width: 0;

      @include at-query($breakpoint-large) {
        bottom: auto;
        top: 100%;
      }

      @media only screen and (min-width: 1201px) {
        left: 70px;
        right: auto;
      }
    }

    &--AlwaysOnTop {
      &::after,
      &::before {
        bottom: auto;
        top: 100%;

        @include at-query($breakpoint-small) {
          right: 20px;
        }

        @media only screen and (min-width: 1201px) {
          left: 69px;
        }
      }
    }

    &::after {
      border-bottom-color: #fff;
      border-width: 0 6px 10px 6px;
      margin-left: -10px;

      @include at-query($breakpoint-large) {
        border-top-color: #fff;
        border-bottom-color: transparent;
        border-width: 10px 6px 0 6px;
      }
    }

    &::before {
      border-bottom-color: #959595;
      border-width: 0 7px 12px 7px;
      margin-left: -12px;

      @include at-query($breakpoint-small) {
        right: 61px;
      }

      @include at-query($breakpoint-large) {
        border-bottom-color: transparent;
        border-top-color: #959595;
        border-width: 12px 6px 0 9px;
      }
    }

    &--AlwaysOnTop {
      &::after {
        border-top-color: #fff;
        border-bottom-color: transparent;
        border-width: 10px 6px 0 6px;
      }

      &::before {
        border-bottom-color: transparent;
        border-top-color: #959595;
        border-width: 12px 6px 0 9px;
        right: 19px;

        @include at-query($breakpoint-large) {
          left: 69px;
        }
      }
    }

    p {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .035em;
      line-height: 17px;
      margin: 0;
    }
  }

  &__Close {
    line-height: 1;
    position: absolute;
    right: 6px;
    top: 4px;
  }
}
</style>
