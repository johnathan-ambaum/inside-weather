<template>
  <div class="TopBanner category">
    <img class="TopBanner__mobile-image" :src="mobileImage" :alt="altText">
    <img class="TopBanner__desktop-image" :src="image" :alt="altText">
    <transition enter-active-class="animated fadeInUp" appear>
      <div class="TopBanner__info">
        <div class="TopBanner__title" :style="titleStyleObject">{{titleCopy}}</div>
        <div class="TopBanner__body" :style="bodyStyleObject">{{bodyCopy}}</div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    image: String,
    altText: String,
    mobileImage: String,
    titleCopy: String,
    titleCopyColor: String,
    bodyCopy: String,
    bodyCopyColor: String
  },
  computed: {
    titleStyleObject(){
      return {
        'color': this.titleCopyColor
      }
    },

    bodyStyleObject(){
      return {
        'color': this.bodyCopyColor
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.TopBanner{
  position: relative;
  text-align: center;
  font-family: Avalon;

  &__mobile-image{
    display:block;
    width:100%;
    margin:0 auto;
    @include at-query($breakpoint-large) {
      display:none;
    }
  }

  &__desktop-image{
    display:none;
    width:100%;
    margin:0 auto;
    @include at-query($breakpoint-large) {
      display:block;
    }
  }

  &__info{
    position: absolute;
    top:35px;
    width:100%;
    padding:0 30px;
  }

  &__title{
    font-weight: 600;
    font-size:30px;
    letter-spacing: 0.05em;
    line-height: 40px;
    margin-bottom:12px;
    @include at-query($breakpoint-large) {
      margin-bottom:14px;
      font-size:45px;
      line-height: 51px;
    }
  }

  &__body{
    font-weight: 500;
    font-size:13px;
    letter-spacing: 0.05em;
    line-height: 18px;
    @include at-query($breakpoint-large) {
      max-width: 630px;
      margin:0 auto;
      font-size:15px;
      line-height: 22px;
    }
  }
}
</style>