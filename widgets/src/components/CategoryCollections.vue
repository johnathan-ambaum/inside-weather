<template>
  <div
    class="CtegoryCollections"
    ref="CtegoryCollections"
  >
    <div
      class="CtegoryCollections--heading"
      >
      <heading-with-description>
        <h2>
          {{sectionHeading}}
        </h2>
        <p :class="linkTextClass">{{sectionDescription}}
          <a :href="sectionLinkto">{{sectionLinktext}}</a>
          {{sectionDescriptiontwo}}
        </p>
      </heading-with-description>
      <figure v-if="isWallArt">
        <img src="https://cdn.shopify.com/s/files/1/2994/0144/files/3.0_cat_wall-art_col_finishes.png?v=1593038202"/>
      </figure>
    </div>
    <ul
      class="CtegoryCollections--itemWrapper"
      :class="catCollectionClasses"
    >
      <li
        v-for="(item, index) in productCollections"
        :key="item.key"
        class="categoryListItem"
        :class="categoryCollectionsListItemClasses(index)"
        >
        <a :href="item.hyperLink">
          <figure
            :class="animationElementClass"
          >
            <img :src="item.image" :class="customImageClass">
          </figure>
          <h3
            :class="animationElementClass"
          >
            {{item.title}}
          </h3>
          <span
            :class="animationElementClass"
            :data-type="[item.linkText.length > 10 ? animationElementClass : 'limittedText']"
          >
            {{item.linkText}}
            <span
              v-if="isOriginalPrice"
              class="original-price"
            >
              {{item.originalPrice}}
            </span>
            <span
              v-if="isDiscountPrice"
              class="discount-price"
            >
              {{item.discountPrice}}
            </span>
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
    sectionLinktext: String,
    sectionLinkto: String,
    sectionDescriptiontwo: String,
    isScrollAnimationRequire: {type: Boolean, default: true},
    collectionCustomImageStyle:{type: Boolean, default: false},
    removeAnimation:{type: Boolean, default: false},
    isLinkText:{type: Boolean, default: false},
    isWallArt: {type: Boolean, default: false},
    isWorkDesk: {type: Boolean, default: false},
    isOriginalPrice: {type: Boolean, default: false},
    isDiscountPrice: {type: Boolean, default: false}
  },
  data() {
    return {
      numberOfElements: Number
    }
  },
  created: function () {
    if (window.innerWidth >= 768) {
      this.numberOfElements = 4;
    } else {
      this.numberOfElements = 2;
    }
  },
  methods: {
    categoryCollectionsListItemClasses: function (index) {
      if(index < this.numberOfElements) {
        return {
          'removeAnimation': this.removeAnimation,
          'onlythreecategories': this.isWorkDesk
        }
      } else {
        return {
          '': this.removeAnimation,
          'onlythreecategories': this.isWorkDesk
        };
      }
    }
  },
  computed: {
    animationElementClass() {
      return {
        '--animElement': this.isScrollAnimationRequire
      }
    },
    catCollectionClasses() {
      return {
        '--hasAnimation': this.isScrollAnimationRequire,
        '--alignCenter': this.productCollections.length < 4,
        'wall-art': this.isWallArt,
      }
    },
    customImageClass() {
      return {
        '--customImageStyle': this.collectionCustomImageStyle
      }
    },
    linkTextClass() {
      return {
        'link-text': this.isLinkText
      }
    }
  },

}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.CtegoryCollections--heading {
  figure {
    text-align: center;
    padding: 20px 0 40px;
    @include at-query('max-width: 991px') {
      padding: 22px 0 40px;
    }
  }
  .HeadingWithDescription {
    padding: 0 15px;
    text-align: center;
    margin: 0 auto;
    max-width: 700px;
  }
  .link-text {
    display: inline;
  }
  a {
    display: inline;
    text-decoration: underline;
  }
}
.CtegoryCollections--itemWrapper {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 75px 0 50px;
  width: 100%;

  &.wall-art {
    padding: 0 0 50px 0;
  }

  li {
    flex-basis: 25%;
    text-align: center;
    margin: 0;
    box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
    -webkit-box-shadow: inset -0.25px -0.25px 0 0 #8B8986;
    &.onlythreecategories {
      flex-basis: 33.3%;
    }
    &.removeAnimation {
      .--animElement {
        opacity: 1;
      }
    }
    .--animElement {
      opacity: 0;
    }
    a {
      text-decoration: none;
      padding: 2px 44px 32px;
      @include block();

      .original-price {
        position: relative;
        display: inline-block;
        line-height: 1.2;
        &:before {
          content: '';
          border-bottom: 1px solid #202020;
          width: 100%;
          position: absolute;
          right: 0;
          top: 50%;
        }
      }
    }
    &:nth-of-type(-n+4) {
      a {
        box-shadow: inset 0px 0.25px 0 0 #8B8986;
        -webkit-box-shadow: inset 0px 0.25px 0 0 #8B8986;
      }
    }
    figure {
      margin: 0;
      overflow: hidden;
      position: relative;
      padding-bottom: 100%;
      @include block(0);
      img {
        object-fit: cover;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        @include block(100%);
        &.--customImageStyle {
          object-fit: contain;
        }
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
  &.--alignCenter {
    justify-content: center;
    &.--hasAnimation {
      &.--animLoaded {
        li {
          &:nth-of-type(1) {
            a {
              box-shadow: inset 0.25px 0.25px 0 0 #8B8986;
            }
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
      }
      h3 {
        font-size: 13px;
      }
      span {
        font-size: 9px;

        &[data-type="limittedText"] {
          font-size: 10px;
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    li {
      flex-basis: 50%;
      a {
        padding: 10px 10px 25px;
        figure {
          padding-bottom: 85%;
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
    &.--alignCenter {
      justify-content: left;
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
      figure {
        img {
          &.--customImageStyle {
            @include Scale(1.2);
          }
        }
      }
    }
  }
}
@include at-query('max-width: 480px') {
  .CtegoryCollections--itemWrapper{
    li {
      h3 {
        font-size: 12px;
        position: relative;
        top: 10px;
      }
      span {
        font-size: 8px;
      }
    }
  }
}

.productCollection {
  &:not([class^="--pd-t-"]) {
    padding-top: 70px;

    @include at-query('max-width: 767px') {
      padding-top: 35px;
    }
  }
  &.no-padding {
    padding: 0;
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
