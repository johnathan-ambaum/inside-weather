<template>
  <div class="SupportBanner" :style="styleObject">
    <div class="SupportBanner__title">{{titleCopy}}</div>
    <div class="SupportBanner__body" v-html="sanitizedBody"></div>
    <div v-if="isMobile">
      <glide-slider>
        <glide-slide v-for="(mobileSlide, index) in mobileImages" :key="index">
          <img :src="mobileSlide.image" :alt="altText">
        </glide-slide>
      </glide-slider>
    </div>
    <div v-else>
      <img :src="image" :alt="altText">
    </div>
  </div>
</template>

<script>
import GlideSlider from '../GlideSlider';
import GlideSlide from '../GlideSlide';
import screenMonitor from '../../mixins/screenMonitor';
import DOMPurify from 'dompurify';

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
    image: String,
    altText: String,
    mobileImages: Array
  },

  computed: {
    styleObject(){
      return {'background-color': this.backgroundColor};
    },

    sanitizedBody(){
      return DOMPurify.sanitize(this.bodyCopy)
    }
  }

}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.SupportBanner{
  overflow: auto;

  *{
    font-family: $font-stack-avalon;
    text-align: center;
    color:#202020;
    font-weight: 500;
  }

  a{
    text-decoration: underline;
  }

  img{
    display:block;
    width:100%;
    height:auto;
    margin:0 auto;

    @include at-query($breakpoint-large) {
      max-width:1350px;
      margin:28px auto 68px auto;
    }
  }

  &__title{
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.05em;
    line-height: 30px;
    margin: 36px 24px 24px 24px;

    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin: 68px auto 28px auto;
    }
  }

   &__body{
     font-size: 13px;
     letter-spacing: 0.04em;
     line-height: 20px;
     margin: 24px 24px 18px 24px;

     @include at-query($breakpoint-large) {
       max-width: 700px;
       font-size: 14px;
       line-height: 22px;
       margin: 28px auto 28px auto;
     }
   }

  .glide__bullets{
    margin: 18px auto 36px auto;
  }
}
</style>
