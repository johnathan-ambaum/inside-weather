<template>
  <div class="image-content-wrapper">
    <div class="--custom-container">
      <div 
        class="image-content-box"
        v-for="productDetail in productDetails"
        :key="productDetail.id"
      >
        <figure>
          <img :src="productDetail.imageUrl" />
        </figure>
        <heading-with-description>
          <h2>{{productDetail.title}}</h2>
          <p>{{productDetail.description}}</p>
        </heading-with-description>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingWithDescription from './HeadingWithDescription.vue'

export default {
  components: {
    HeadingWithDescription,
  },
  props: {
    productDetails: Array
  }
} 
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.image-content-wrapper {
  .image-content-box {
    align-items: center;
    display: flex;
    flex-direction: row;
    figure {
      flex-basis: 65%;
      height: 0;
      position: relative;
      overflow: hidden;
      padding-bottom: 43%;
      img {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
      }
    }
    .HeadingWithDescription {
      margin: auto 0;
      padding: 0 0 0 77px;
      flex-basis: 35%;
      h2 {
        margin: 0 0 32px;
        text-align: left;
      }
      p {
        line-height: 1.57;
        text-align: left;
      }
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      figure {
        flex-basis: 55%;
        img {
          right: auto;
        }
      }
      .HeadingWithDescription {
        padding: 0 77px 0 85px;
        flex-basis: 45%
      }
    }
  }
  @include at-query('max-width: 1280px') {
    .image-content-box {
      .HeadingWithDescription {
        padding: 0 0 0 67px;
      }
      &:nth-child(even) {
        .HeadingWithDescription {
          padding: 0 67px 0 75px;
        }
      }
    }
  }
  @include at-query('max-width: 1199px') {
    .image-content-box {
      .HeadingWithDescription {
        h2 {
          font-size: 32px;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    .image-content-box {
      .HeadingWithDescription {
        padding: 0 0 0 30px;
        h2 {
          font-size: 30px;
          margin: 0 0 22px;
        }
      }
      &:nth-child(even) {
        figure {
          flex-basis: 50%;
        }
        .HeadingWithDescription {
          flex-basis: 50%;
          padding: 0 30px 0 45px;
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    .image-content-box {
      flex-wrap: wrap;
      figure {
        padding-bottom: 64.5%;
      }
      figure,
      .HeadingWithDescription {
        flex-basis: 100%;
      }
      .HeadingWithDescription {
        margin: 0 27.5px;
        position: relative;
        background: #fff;
        top: -4rem;
        padding: 27px 23px;
        h2 {
          font-size: 20px;
          font-weight: 500;
        }
        p {
          @include fonts(12px,#202020,1.2,0.04em);
          padding: 0;
        }
      }
      &:nth-child(even) {
        figure {
          img {
            width: 100%;
          }
        }
        figure,
        .HeadingWithDescription {
          flex-basis: 100%;  
        }
        .HeadingWithDescription {
          padding: 27px 23px;
        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .image-content-box {
      .HeadingWithDescription {
        top: -3.5rem;
      }
    }
  }
  @include at-query('max-width: 640px') {
    .image-content-box {
      .HeadingWithDescription {
        top: -2.4rem;
      }
    }
  }
}
</style>



