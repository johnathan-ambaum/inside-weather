<template>
  <div class="TitleText">
    <h2>{{titleCopy}}</h2>
    <p v-html="sanitizedBody"></p>
  </div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
  props: {
    titleCopy: String,
    bodyCopy: String
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

.TitleText {
  max-width: 800px;
  color:#202020;
  text-align: center;
  margin:0 34px;

  @include at-query($breakpoint-large) {
    margin:0 auto;
  }

  h2{
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.05em;
    margin-bottom:15px;
    font-family: $font-stack-avalon;

    @include at-query($breakpoint-large) {
      font-size: 34px;
      margin-bottom:26px;
    }
  }

  p{
    font-size: 13px;
    letter-spacing: 0.04em;
    line-height: 20px;
    font-family: $font-stack-avalon;
    font-weight: 500;

    @include at-query($breakpoint-large) {
      font-size: 14px;
      line-height: 22px;
    }
  }

  a{
    text-decoration: underline;
  }
}

</style>