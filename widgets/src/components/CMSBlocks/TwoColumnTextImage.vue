<template>
  <div class="TwoColumnTextImage" :style="styleObject">
    <div class="TwoColumnTextImage__title">{{titleCopy}}</div>
    <div class="TwoColumnTextImage__body">{{bodyCopy}}</div>
    <div v-if="isMobile">
      <glide-slider>
        <glide-slide v-for='(column, index) in columns' :key="index">
          <div class="TwoColumnTextImage__column">
            <img class="TwoColumnTextImage__column-image" :src="column.mobileImage" :alt="column.altText">
            <div class="TwoColumnTextImage__column-caption">{{column.caption}}</div>
            <div class="TwoColumnTextImage__column-title">{{column.titleCopy}}</div>
            <div class="TwoColumnTextImage__column-support-text">{{column.supportText}}</div>
            <img class="TwoColumnTextImage__column-support-image" :src="column.supportImage" :alt="column.supportAltText">
            <div class="TwoColumnTextImage__column-body">{{column.bodyCopy}}</div>
          </div>
        </glide-slide>
      </glide-slider>
    </div>
    <div v-else>
      <div class="TwoColumnTextImage__columns">
        <div class="TwoColumnTextImage__column" v-for='(column, index) in columns' :key="index">
          <img class="TwoColumnTextImage__column-image" :src="column.image" :alt="column.altText">
          <div class="TwoColumnTextImage__column-caption">{{column.caption}}</div>
          <div class="TwoColumnTextImage__column-title">{{column.titleCopy}}</div>
          <div class="TwoColumnTextImage__column-support-text">{{column.supportText}}</div>
          <img class="TwoColumnTextImage__column-support-image" :src="column.supportImage" :alt="column.supportAltText">
          <div class="TwoColumnTextImage__column-body">{{column.bodyCopy}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlideSlider from '../GlideSlider';
import GlideSlide from '../GlideSlide';
import screenMonitor from '../../mixins/screenMonitor';

export default {
  components: {
    GlideSlider,
    GlideSlide
  },

  mixins: [
    screenMonitor
  ],

  props: {
    titleCopy: String,
    bodyCopy: String,
    backgroundColor: String,
    columns: Array
  },

  computed: {
    styleObject(){
      return {'background-color': this.backgroundColor};
    }
  }

}

</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.TwoColumnTextImage{
  overflow: auto;

  *{
    font-family: $font-stack-avalon;
    text-align: center;
    color:#202020;
    font-weight: 500;
  }

  &__columns{
    @include at-query($breakpoint-large) {
      display: grid;
      overflow: hidden;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 1fr;
      grid-column-gap: 26px;
      max-width: 750px;
      margin: 28px auto 68px auto;
    }
  }

  &__column{
    @include at-query($breakpoint-large) {
      max-width: 375px;
    }
  }

  &__title{
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.05em;
    line-height: 30px;
    margin: 36px auto 24px auto;

    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin: 68px auto 28px auto;
    }
  }

  &__body{
    font-size: 13px;
    letter-spacing: 0.04em;
    line-height: 20px;
    margin:24px 24px 18px 24px;

    @include at-query($breakpoint-large) {
      max-width: 700px;
      font-size: 14px;
      line-height: 22px;
      margin:28px auto 28px auto;
    }
  }

  &__column-image{
    display:block;
    margin:0 auto;
    width:100%;

    @include at-query($breakpoint-large) {
      max-width: 375px;
      max-height: auto;
    }
  }

  &__column-caption{
    font-size: 12px;
    letter-spacing: 0.12em;
    margin:24px 0 10px 0;

    @include at-query($breakpoint-large) {
      display:none;
    }
  }

  &__column-title{
    font-size: 18px;
    letter-spacing: 0.12em;
    margin: 10px auto 8px auto;

    @include at-query($breakpoint-large) {
      font-size:26px;
      margin: 28px auto 8px auto;
    }
  }

  &__column-support-text{
    font-size:13px;
    letter-spacing: 0.05em;
    margin: 8px auto 20px auto;

    @include at-query($breakpoint-large) {
      font-size: 15px
    }
  }

  &__column-support-image{
    display: block;
    margin:20px auto 24px auto;
    width:100px;
    height: auto;

    @include at-query($breakpoint-large) {
      width: 115px;
      margin:20px auto 20px auto;
    }
  }

  &__column-body{
    font-size: 12px;
    letter-spacing: 0.04em;
    line-height: 20px;
    margin: 24px 24px 0px 24px;

    @include at-query($breakpoint-large) {
      max-width: 285px;
      margin: 20px auto 0px auto;
      font-size:14px;
      line-height:22px;
    }
  }

  .glide__bullets{
    margin: 18px auto 36px auto;
  }

}
</style>
