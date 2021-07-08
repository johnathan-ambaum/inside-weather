<template>
  <div class="ImageText" :style="desktopStyleObject">
    <div class="ImageText__mobile-image">
      <figure>
          <img
            :src="mobileImage"
            v-if="!mobileImage.includes('mp4')"
            :alt="titleCopy"
          />
          <video
            v-if="mobileImage.includes('mp4')"
            loop autoplay muted playsinline
          >
            <source
              :src="mobileImage"
              type="video/mp4"
            />
          </video>
      </figure>
    </div>
    <div :class="[largeImage ? 'ImageText__desktop-image' : 'ImageText__desktop-image--small']">
      <figure>
          <img
            :src="image"
            v-if="!image.includes('mp4')"
            :alt="titleCopy"
          />
          <video
            v-if="image.includes('mp4')"
            loop autoplay muted playsinline
          >
            <source
              :src="image"
              type="video/mp4"
            />
          </video>
      </figure>
    </div>
    <div :class="[largeImage ? 'ImageText__content' : 'ImageText__content--large']">
      <div class="ImageText__title">{{titleCopy}}</div>
      <div class="ImageText__body" v-html="sanitizedBody"></div>
      <div v-if="mobileSupportImage" class="ImageText__mobile-support-image"><img :src="mobileSupportImage" :alt="titleCopy"></div>
      <div v-if="desktopSupportImage" class="ImageText__desktop-support-image"><img :src="desktopSupportImage" :alt="titleCopy"></div>
    </div>
  </div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
  props: {
    titleCopy: String,
    bodyCopy: String,
    image: String,
    mobileImage: String,
    desktopSupportImage: String,
    mobileSupportImage: String,
    reverse: {type: Boolean, default: false},
    largeImage: {type: Boolean, default: false}
  },

  computed: {
    mobileStyleObject(){
      return {}
    },
    desktopStyleObject(){
      return {
        'flex-direction': this.reverse ? 'row-reverse' : ''
      }
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

.ImageText{
  font-family: Avalon;
  color: #202020;
  font-weight: 500;

  @include at-query($breakpoint-large) {
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 78px;
    max-width: 90%;
    margin:auto;
  }

  figure{
    margin:0;
    padding:0;
    line-height: 0;
  }

  video{
    width:100%;
  }

  img{
    display:block;
    margin: 0 auto;

    @include at-query($breakpoint-large) {
      margin: unset;
    }
  }

  a{
    text-decoration: underline;
  }

  &__desktop-image,
  &__desktop-image--small,
  &__desktop-support-image{
    display:none;

    @include at-query($breakpoint-large) {
      display:block;
    }
  }

  &__mobile-image,
  &__mobile-support-image{
    display:block;

    @include at-query($breakpoint-large) {
      display:none;
    }

    video{
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  &__content,
  &__content--large{
    backface-visibility: hidden;
    background-color: white;
    margin: -90px 28px 0px 28px;
    padding:26px 22px 0px 22px;

    @include at-query($breakpoint-large) {
      margin:0;
      padding:0;
      max-width: 423px;
    }
  }

  &__content--large{
    @include at-query($breakpoint-large) {
      max-width: 523px;
    }
  }

  &__title{
    font-weight: 600;
    font-size:20px;
    letter-spacing: 0.05em;
    margin-bottom:17px;

    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin-bottom:30px;
    }
  }

  &__body{
    font-size: 12px;
    letter-spacing: 0.04em;

    @include at-query($breakpoint-large) {
      font-size:14px;
    }
  }

  &__mobile-support-image{
    margin-top:20px;
  }


  &__desktop-image{
    max-width: 815px;
  }
  &__desktop-image--small{
    max-width: 520px;
  }

  &__desktop-support-image{
    margin-top:34px;
  }
}


</style>
