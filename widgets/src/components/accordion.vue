<template>
  <div class="point">
    <h3 :data-target="accordionTriggerElement">{{accordionHead}}</h3>
    <p>{{accordionDescription}}</p>
  </div>  
</template>
<script>
export default {
  props: {
    accordionHead: String,
    accordionDescription: String,
    accordionTriggerElement: String
  }
}
</script>
<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.point{
  &:not(:last-child) {
    margin: 0 0 25px;
  }
  h3 {
    cursor: pointer;
    display: block;
    font-family: $font-stack-avalon;
    font-weight: 500;
    margin: 0;
    padding: 5px 0 5px 52px;
    position: relative;
    @include fonts(18px,#202020,1.2,0.05em);
    &::before, &::after{
      content: "";
      width: 28px;
      height: 28px;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      top: 50%;
      @include translate(0,-50%);
    }
    &::before {
      background-image: url('https://cdn2.shopify.com/s/files/1/2994/0144/files/icon-round-plus.svg?1287374');
    }
    &::after {
      opacity: 0;
      background-image: url('https://cdn2.shopify.com/s/files/1/2994/0144/files/icon-round-fill-close.svg?1287579');
    }
  }
  &.show-details {
    h3 {
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    }
  }
  p {
    display: none;
    font-family: $font-stack-avalon;
    font-weight: 500;
    margin: 0;
    padding: 11px 0 0px 52px;
    @include fonts(14px,#202020,22px,0.04em);
  }
  @include at-query('max-width: 1280px') {
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 13px;
    }
  }
  @include at-query('max-width: 1199px') {
    &:not(:last-child) {
      margin: 0 0 15px;
    }
  }
  @include at-query('max-width: 991px') {
    &:not(:last-child) {
      margin: 0 0 29px;
    }
    p {
      padding: 11px 0 0px 52px;
    }
  }
}
</style>


