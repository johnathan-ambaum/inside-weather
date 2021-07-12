<template>
  <div class="CategoryProductGrid">
    <div class="CategoryProductGrid__inner" :style="styleObject">
      <div class="CategoryProductGrid__item" v-for="(product, index) in products" :key="index">
        <a :href="product.destination">
          <img class="CategoryProductGrid__image" :src="product.image" :alt="product.titleCopy">
          <div class="CategoryProductGrid__title">{{product.titleCopy}}</div>
          <div class="CategoryProductGrid__cta">CUSTOMIZE NOW</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array
  },

  computed: {
    styleObject(){
      const productsPerRow = 4;
      return this.products.length < productsPerRow ? {'justify-content': 'center'} : '';
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

.CategoryProductGrid{
  font-family: Avalon;
  text-align: center;
  color:#202020;
  margin:1px;

  *{
    display: block;
  }

  a:hover{
    text-decoration: none;
  }

  &__inner{
    display:flex;
    flex-wrap: wrap;
    margin-top: -1px;
    margin-left: -1px;
  }

  &__item{
    flex-basis: calc(50% - 1px);
    outline: 1px solid #D4D0CA;
    margin-top: 1px;
    margin-left: 1px;

    @include at-query($breakpoint-large) {
      flex-basis: calc(25% - 1px);
    }
  }

  &__image{
    padding: 0 9px 8px 9px;

    @include at-query($breakpoint-large) {
      padding: 0 44px 3px 44px
    }
  }

  &__title{
    font-weight: 600;
    font-size:12px;
    letter-spacing: 0.05em;
    line-height: 16px;
    margin:0 8px 5px 8px;

    @include at-query($breakpoint-large) {
      font-size:20px;
      line-height: 22px;
    }
  }

  &__cta{
    font-weight: 500;
    font-size:8px;
    letter-spacing: 0.12em;
    text-decoration: underline;
    margin-bottom:12px;

    @include at-query($breakpoint-large) {
      margin-bottom:32px;
      font-size:14px;
    }
  }
}
</style>
