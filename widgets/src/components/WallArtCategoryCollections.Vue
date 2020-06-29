<template>
  <div 
    class="wallArtCtegoryCollections --custom-container"  
    ref="wallArtCtegoryCollections"
  >
    <div class="wallArtCtegoryCollections--heading"
      >
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
      class="wallArtCtegoryCollections--itemWrapper"
      :class="catCollectionClasses"
    >
      <li
        v-for="item in wallArtProductCollections"
        :key="item.id"
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
    wallArtProductCollections: Array,
    sectionHeading: String,
    sectionDescription: String,
    isScrollAnimationRequire: {type: Boolean, default: true},
    collectionCustomImageStyle:{type: Boolean, default: false},
    isWallArt: {type: Boolean, default: false},
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
        '--alignCenter': this.wallArtProductCollections.length < 4,
      }
    },
    customImageClass() {
      return {
        '--customImageStyle': this.collectionCustomImageStyle
      }
    }
  },
  
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.wallArtCtegoryCollections--itemWrapper {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 30px;
  margin: 0;
  li {
    margin: 0;
    text-align: center;
    a {
      text-decoration: none;
      @include block();
      figure {
        margin: 0 0 1.6rem;
      }
      img {
        max-width: 190px;
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
      padding-bottom: 35px;
      a figure {
        margin: 0 0 1.1rem;
      }
      a img {
        max-width: 126px;
      }
      h3 {
        font-size: 13px;
      }
      span {
        display: inline;
        font-size: 9px;
        
        &[data-type="limittedText"] {
          font-size: 10px;
        }
      }
    }
  }
}

@include at-query('max-width: 640px') {
  .wallArtCtegoryCollections--itemWrapper {
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
  .wallArtCtegoryCollections--itemWrapper {
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

.wallArtproductCollection {
  &:not([class^="--pd-t-"]) {
    padding-top: 70px;
    padding-bottom: 70px;

    @include at-query('max-width: 767px') {  
      padding-top: 50px;
      padding-bottom: 15px;
    }
  }
}
</style>