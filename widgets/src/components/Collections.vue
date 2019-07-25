<template>

  <div 
    class="Collections"  
    ref="Collections"
  >
    <div class="Collections--heading">
      <heading-with-description>
        <h2>
          {{sectionHeading}}
        </h2>
        <p>
          {{sectionDescription}}
        </p>
      </heading-with-description>
    </div>
    <ul 
      class="Collections--itemWrapper"
      :class="hasAnimation"
    >
      <li
        v-for="item in productsList"
        :key="item.id"
      >
        <a :href="item.hyperLink">
          <figure
            :class="animationElementClass"
          >
            <img :src="item.image">
          </figure>
          <h3
            :class="animationElementClass"
          >
            {{item.title}}
          </h3>
          <span
            :class="animationElementClass"
          >
            {{item.linkText}}
          </span>
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
    sectionDescription: String,
    isScrollAnimationRequire: {type: Boolean, default: true}
  },
  data() {
    return {
      productsList: this.productCollections
    }
  },
  computed: {
    animationElementClass() {
      return {
        '--animElement': this.isScrollAnimationRequire
      }
    },
    hasAnimation() {
      return {
        '--hasAnimation': this.isScrollAnimationRequire
      }
    }
  },
  
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
    box-shadow: inset -0.25px -0.25px 0 0 #202020;
    .--animElement {
      opacity: 0;
    }
    &:nth-of-type(-n+4) {
      a {
        box-shadow: inset 0px 0.25px 0 0 #202020;
      }
    }
    a {
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
  &.--hasAnimation {
    li {
      box-shadow: none;
      &:nth-of-type(-n+4) {
        a {
          box-shadow: none;
        }
      }
    }
    &.--animLoaded {
      li {
        box-shadow: inset -0.25px -0.25px 0 0 #202020;
      }
      &:nth-of-type(-n+4) {
        a {
          box-shadow: inset 0px 0.25px 0 0 #202020;
        }
      }
    }

  }
  @include at-query('max-width: 1280px') {
    justify-content: left;

    li {
      flex-basis: 33.3333%;

      &:nth-of-type(-n+4) {  
        a {
          box-shadow: none;
        }
      }

      &:nth-of-type(-n+3) {
        a {
          box-shadow: inset 0px 0.25px 0 0 #202020;
        }
      }
    }
    &.--animLoaded {
      li {
        box-shadow: inset -0.25px -0.25px 0 0 #202020;
      }
      &:nth-of-type(-n+4) {
        a {
          box-shadow: none;
        }
      }
      &:nth-of-type(-n+3) {
        a {
          box-shadow: inset 0px 0.25px 0 0 #202020;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    li {
      a {
        padding: 15px 10px 40px;
        span {
          display: inline;
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    li {
      flex-basis: 50%;
      a {
        padding: 10px 10px 30px;
      }
      &:nth-of-type(-n+3) {
        a {
          box-shadow: none;
        }
      }
      &:nth-of-type(-n+2) {
        a {
          box-shadow: inset 0px 0.25px 0 0 #202020;
        }
      }
    }
    &.--animLoaded {
      li {
        box-shadow: inset -0.25px -0.25px 0 0 #202020;
      }
      &:nth-of-type(-n+3) {
        a {
          box-shadow: none;
        }
      }
      &:nth-of-type(-n+2) {
        a {
          box-shadow: inset 0px 0.25px 0 0 #202020;
        }
      }
    }
  }
}
@include at-query('max-width: 640px') {
  .Collections--itemWrapper{
    padding: 50px 0;
    li {
      h3 {
        font-size: 14px;
        margin: 0 0 5px;
      }
      span {
        font-size: 11px;
      }
    }
  }
}
</style>


