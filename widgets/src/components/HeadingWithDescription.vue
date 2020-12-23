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
    margin: 0 0 28px;
    text-align: center;
  }

  p, a {
    color: #202020;
    display: block;
    font-family: $font-stack-avalon;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.04em;
    line-height: 1.5;
    max-width: 765px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
  }

  @media only screen and (max-width: 767px) {
    h2 {
      font-weight: 600;
      font-size: 24px;
      margin: 0 0 24px;
    }
    p {
      font-size: 13px;
      line-height: 20px;
      padding: 0 15px;
      margin-bottom: 18px;
      font-weight: 500;
      max-width: 100%;
      padding: 0 24px;
    }
  }
}
</style>


