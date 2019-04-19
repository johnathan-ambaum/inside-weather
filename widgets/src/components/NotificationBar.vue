<template>
  <transition name="fade">
    <div
      v-if="message"
      class="NotificationBar"
      v-html="message"
    />
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      message: state => state.notificationMessage,
    }),
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.NotificationBar {
  background: #ebc2af;
  font-family: $font-stack-roboto;
  font-size: 10px;
  left: 0;
  line-height: 15px;
  padding: 15px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 99999;

  @include at-query($breakpoint-large) {
    align-items: center;
    display: flex;
    font-size: 14px;
    height: $browse-bar-height;
    justify-content: center;
    padding: 0 15px;
    top: $header-height-small + $top-bar-height;

    br {
      display: none;
    }
  }

  strong {
    font-weight: 900;
    margin-right: 5px;
  }
}
</style>
