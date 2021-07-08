<template>
  <div class="ImageTextCta">
    <div class="ImageTextCta__content">
      <div class="ImageTextCta__content-inner">
        <div class="ImageTextCta__title">{{titleCopy}}</div>
        <div class="ImageTextCta__body" v-html="sanitizedBody"></div>
        <a class="ImageTextCta__cta" :href="buttonUrl">{{buttonText}}</a>
      </div>
    </div>
    <div class="ImageTextCta__image">
      <img :src="image" :alt="altText">
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
    altText: String,
    buttonText: String,
    buttonUrl: String,
  },
  computed: {
    sanitizedBody(){
      return DOMPurify.sanitize(this.bodyCopy)
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.ImageTextCta{
  display:flex;
  background-color: #f2f2f2;
  font-family: Avalon;
  font-weight: 500;
  text-align: center;
  flex-direction: column-reverse;
  @include at-query($breakpoint-large) {
    flex-direction: row;
    text-align: left;
  }

  a:not(.ImageTextCta__cta){
    text-decoration: underline;
  }

  &__content,
  &__image{
    flex:1;
    @include at-query($breakpoint-large) {
      flex-basis: 50%;
    }
  }

  &__content{
    padding: 0 14px;
    @include at-query($breakpoint-large) {
      padding-right:100px;
    }

  }

  &__content-inner{
    @include at-query($breakpoint-large) {
      width: 70%;
      margin-left: auto;
    }
  }

  &__title{
    margin-top:30px;
    margin-bottom:16px;
    font-size:22px;
    letter-spacing: 0.2em;
    line-height: 28px;
    @include at-query($breakpoint-large) {
      font-size: 28px;
      letter-spacing: 0.12em;
      line-height: 33px;
      margin-top:50px;
      margin-bottom:22px;
    }
  }

  &__body{
    font-size:13px;
    letter-spacing: 0.04em;
    line-height: 20px;
    margin-bottom:32px;
    @include at-query($breakpoint-large) {
      margin-bottom:22px;
      font-size: 14px;
      line-height: 22px;
    }
  }

  &__cta{
    display: block;
    width: fit-content;
    padding: 16px 32px;
    margin: 0 auto 34px auto;
    border-radius: 9999px;
    background-color: white;
    border:1px solid black;
    font-size: 14px;
    letter-spacing: 0.12em;
    text-decoration: none;

    &:empty{
      display:none;
    }

    @include at-query($breakpoint-large) {
      margin: 0 auto 50px 0;

    }

  }

  &__image img{
    display:block;
    object-fit: cover;
    margin: 0;
    width: 100%;
    height:100%;
  }


}

</style>