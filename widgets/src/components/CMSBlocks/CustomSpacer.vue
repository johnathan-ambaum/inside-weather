<template>
  <div class="CustomSpacer">
    <div class="CustomSpacer__desktop" :style="styleObject"></div>
    <div class="CustomSpacer__mobile" :style="styleObjectMobile"></div>
  </div>
</template>

<script>
export default{
  props: {
    desktopSpacing: {type: String, default: '15px'},
    mobileSpacing:{type: String },
    backgroundColor: {type: String, default: '#FFFFFF'}
  },

  computed: {
    styleObject(){
      return {
        'background-color': this.backgroundColor,
        'height': this.desktopSpacing
      }
    },

    styleObjectMobile(){
      return {
        'background-color': this.backgroundColor,
        'height': this.mobileSpacing || this.desktopSpacing
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.CustomSpacer{
  width:100%;

  &__desktop{
    display:none;
    @include at-query($breakpoint-large) {
      display:block;
    }
  }

  &__mobile{
    display:block;
    @include at-query($breakpoint-large) {
      display:none;
    }
  }
}
</style>