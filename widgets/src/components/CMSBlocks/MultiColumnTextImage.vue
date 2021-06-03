<template>
  <div class="MultiColumnTextImage" :style="styleObject">
    <div class="MultiColumnTextImage__columns">
      <div class="MultiColumnTextImage__column" v-for="(column, index) in columns" :key="index">
        <img class="MultiColumnTextImage__column-image" :src="isMobile ? column.mobileImage : column.image" :alt="column.altText">
        <div class="MultiColumnTextImage__column-content">
           <div class="MultiColumnTextImage__column-title">{{column.titleCopy}}</div>
          <div class="MultiColumnTextImage__column-body">{{column.bodyCopy}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenMonitor from '../../mixins/screenMonitor';

export default {
  props: {
    backgroundColor: String,
    columns: Array
  },

  mixins: [
    screenMonitor
  ],

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

.MultiColumnTextImage{
  overflow: auto;
  *{
    font-family: $font-stack-avalon;
    text-align: left;
    color:#202020;
    font-weight: 500;

    @include at-query($breakpoint-large) {
      text-align: center;
    }
  }

  &__columns{
    display:flex;
    flex-direction: column;
    margin:45px 24px;
    gap:30px;
    @include at-query($breakpoint-large) {
      margin: 94px auto 94px auto;
      flex-basis: 280px;
      justify-content: center;
      align-items: center;
      gap:78px;
      flex-direction: row;
    }
  }

  &__column{
    display:flex;
    flex-direction: row;
    align-items: center;
    gap:20px;
    &:nth-child(2n){
      flex-direction: row-reverse;
    }

    @include at-query($breakpoint-large) {
      max-width: 280px;
      flex-direction: column;
      &:nth-child(2n){
        flex-direction: column;
      }
    }
  }

  &__column-image{
    display:block;
    object-fit: cover;
    margin: 0 auto;
    width: 47%;
    height: fit-content;
    @include at-query($breakpoint-large) {
      width:100%;
    }
  }

  &__column-title{
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin:0 0 5px 0;
    @include at-query($breakpoint-large) {
      font-size:24px;
      margin:40px 0 18px 0;
    }
  }

  &__column-body{
    font-size: 12px;
    letter-spacing: 0.05em;
    @include at-query($breakpoint-large) {
      font-size: 14px;
      line-height:22px;
    }
  }
}

</style>