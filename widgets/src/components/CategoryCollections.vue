<template>
  <div 
    class="CtegoryCollections"  
    ref="CtegoryCollections"
  >
    <div class="CtegoryCollections--heading">
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
      class="CtegoryCollections--itemWrapper"
      :class="hasAnimation"
    >
      <li
        v-for="item in productCollections"
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
  components: {
    HeadingWithDescription,
  },
  props: {
    productCollections: Array,
    sectionHeading: String,
    sectionDescription: String,
    isScrollAnimationRequire: {type: Boolean, default: true}
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

.CtegoryCollections--itemWrapper {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 75px 0 50px;
  width: 100%;
  li {
    flex-basis: 25%;
    text-align: center;
    margin: 0;
    box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
    -webkit-box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
    .--animElement {
      opacity: 0;
    }
    a {
      padding: 2px 44px 32px;
      @include block();
    }
    &:nth-of-type(-n+4) {
      a {
        box-shadow: inset 0px 0.25px 0 0 #8B8986;
        -webkit-box-shadow: inset 0px 0.25px 0 0 #8B8986;
      }
    }
    figure {
      overflow: hidden;
      position: relative;
      padding-bottom: 80%;
      @include block(0);
      img {
        object-fit: contain;
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
      margin: 0 0 7px;
      @include fonts(20px,#202020,1.1,0.05em);
    }
    span {
      border-bottom: 1px solid;
      display: inline;
      font-family: $font-stack-avalon;
      font-weight: 500;
      text-transform: uppercase;
      @include fonts(14px,#202020,1.5,0.121em);
    }
  }
  &.--hasAnimation {
    li {
      box-shadow: none;
      -webkit-box-shadow: none;
      &:nth-of-type(-n+4) {
        a {
          box-shadow: none;
          -webkit-box-shadow: none;
        }
      }
    }
    &.--animLoaded {
      li {
        box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
        -webkit-box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
        &:nth-of-type(-n+4) {
          a {
            box-shadow: inset 0px 0.25px 0 0 #8B8986;
            -webkit-box-shadow: inset 0px 0.25px 0 0 #8B8986;
          }
        }
      }
    }

  }
  @include at-query('max-width: 1280px') {
    justify-content: left;
  }
  @include at-query('max-width: 1024px') {
    li {
      h3 {
        font-size: 16px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  @include at-query('max-width: 991px') {
    li {
      a {
        padding: 15px 10px 20px;
      }
      span {
        display: inline;
      }
      figure {
        padding-bottom: 66.66%;
        img {
          object-fit: contain;
        }
      }
      h3 {
        font-size: 13px;
      }
      span {
        font-size: 9px;
      }
    }
  }
  @include at-query('max-width: 767px') {
    li {
      flex-basis: 50%;
      a {
        padding: 10px 10px 25px;
        figure {
          padding-bottom: 66.66%;
          img {
            object-fit: contain;
          }
        }
      }
      &:nth-of-type(3) {
        a {
          box-shadow: none;
          -webkit-box-shadow: none;
        }
      }
    }
    &.--hasAnimation {
      &.--animLoaded {
        li {
          &:nth-of-type(3) {
            a {
              box-shadow: none;
              -webkit-box-shadow: none;
            }
          }
        }
      }
    }
  }
}
@include at-query('max-width: 640px') {
  .CtegoryCollections--itemWrapper{
    padding: 50px 0 22px;
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
@include at-query('max-width: 480px') {
  .CtegoryCollections--itemWrapper{
    li {
      h3 {
        font-size: 12px;
      }
      span {
        font-size: 8px;
      }
    }
  }
}

@-moz-document url-prefix() {
  .CtegoryCollections--itemWrapper {
    li {
      box-shadow: 0.9px 0.9px 0.4px 0px rgba($color: #8B8986, $alpha: 0.5);
      -webkit-box-shadow: 0.9px 0.9px 0.4px 0px rgba($color: #8B8986, $alpha: 0.5);
      &:nth-of-type(-n+4) {
        a {
          box-shadow: inset 0px 1px 0 0 rgba($color: #8B8986, $alpha: 0.5);
          -webkit-box-shadow: inset 0px 1px 0 0 rgba($color: #8B8986, $alpha: 0.5);
        }
      }
    } 
    &.--hasAnimation {
      li {
        box-shadow: none;
        -webkit-box-shadow: none;
        &:nth-of-type(-n+4) {
          box-shadow: none;
          -webkit-box-shadow: none;
        }
      }
      &.--animLoaded {
        li {
          box-shadow: 0.9px 0.9px 0.4px 0px rgba($color: #8B8986, $alpha: 0.5);
          -webkit-box-shadow: 0.9px 0.9px 0.4px 0px rgba($color: #8B8986, $alpha: 0.5);
          &:nth-of-type(-n+4) {
            a {
              box-shadow: inset 0px 1px 0 0 rgba($color: #8B8986, $alpha: 0.5);
              -webkit-box-shadow: inset 0px 1px 0 0 rgba($color: #8B8986, $alpha: 0.5);
            }
          }
        }
      }
    }
  }
}
</style>