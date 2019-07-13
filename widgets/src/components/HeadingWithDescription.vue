<template>
  <div 
    class="HeadingWithDescription" 
    ref="HeadingWithDescription">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '../scss/variables';

.HeadingWithDescription {
  padding: 0 15px;
  h2 {
    display: block;
    font-family: $font-stack-avalon;
    font-weight: 600;
    font-size: 34px;
    color: #202020;
    line-height: 1.2;
    letter-spacing: 0.05em;
    margin: 0 0 10px;
    text-align: center;
  }
  p {
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.035em;
    line-height: 1.2;
    text-align: center;
    margin: 0;
  }
  @media only screen and (max-width: 767px) {
    h2 {
      font-weight: 400;
    }
    p {
      line-height: 1.538;
      padding: 0 15px;
    }
  }
}
</style>


