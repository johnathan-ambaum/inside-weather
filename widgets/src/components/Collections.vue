<template>

  <div 
    class="Collections"  
    ref="Collections"
  >
    <div class="Collections--heading">
      <heading-with-description>
        <h2>{{sectionHeading}}</h2>
        <p>{{sectionDescription}}</p>
      </heading-with-description>
    </div>
    <ul class="Collections--itemWrapper">
      <li
        v-for="item in productsList"
        :key="item.id"
      >
        <a :href="item.hyperLink">
          <figure>
            <img :src="item.image">
          </figure>
          <h3>{{item.title}}</h3>
          <span>{{item.linkText}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import HeadingWithDescription from './HeadingWithDescription.vue'
export default {
  name: 'collections',
  components: {
    HeadingWithDescription,
  },
  props: {
    productCollections: Array,
    sectionHeading: String,
    sectionDescription: String
  },
  data() {
    return {
      productsList: this.productCollections
    }
  }
  
}
</script>
<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.Collections--itemWrapper {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 75px 0 50px;
  width: 100%;
  li {
    flex-basis: 25%;
    text-align: center;
    margin: 0;
    &:nth-last-child(-n+4) {
      box-shadow: inset 0 -0.25px 0 0 #202020;
    }
    a {
      box-shadow: inset 0.2px 0.25px 0.25px 0px #202020;
      padding: 15px 44px 54px;
      @include block();
    }
    figure {
      overflow: hidden;
      position: relative;
      padding-bottom: 100%;
      @include block(0);
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        @include block(100%);
      }
    }
    h3 {
      display: block;
      font-family: $font-stack-avalon;
      font-weight: $demi;
      margin: 0 0 14px;
      @include fonts(20px,#202020,1.1,0.05em);
    }
    span {
      border-bottom: 1px solid;
      display: inline-block;
      font-family: $font-stack-avalon;
      font-weight: 500;
      text-transform: uppercase;
      @include fonts(14px,#202020,1.5,0.121em);
    }
  }
}
</style>


