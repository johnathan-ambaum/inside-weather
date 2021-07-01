<template>
  <div class="VpropIcons" :style="styleObject">
    <div class="VpropIcons__inner">
      <div class="VpropIcons__icon" v-for="(icon, index) in icons" :key="index">
        <img :src="icon.image" :alt="icon.text">
        <span>{{icon.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    backgroundColor: String,
    icons: Array
  },

  computed: {
    styleObject(){
      return {
        'background-color': this.backgroundColor
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.VpropIcons{
  padding:7px;
  font-family: Avalon;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.15em;
  color:#202020;

  @include at-query($breakpoint-large) {
    font-size:12px;
    padding:14px;
  }

  &__inner{
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    width:100%;
    margin:0 auto;

    @include at-query($breakpoint-large) {
      max-width: 1000px;
      margin:0 auto;
    }
  }

  &__icon{
    flex-basis: 45%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    margin:4px;

    @include at-query($breakpoint-large) {
      flex:1;
      justify-content: center;
    }
  }

  img{
    display: block;
    width: 40px;
    height: auto;
  }

  span{
    padding-left:4px;
  }
}


</style>

