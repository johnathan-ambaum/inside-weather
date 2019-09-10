<template>
  <div 
    class="CategoryDetails image-content-wrapper"
    ref="CategoryDetails"
  >
    <div class="--custom-container">
      <div 
        v-for="productDetail in productDetails"
        :key="productDetail.id"
        class="image-content-box"
      >
        <figure>
          <img 
            :src="productDetail.objectUrl" 
            v-if="productDetail.isVideo === 'false'"
          />
          <video 
            v-if="productDetail.isVideo === 'true'"
            loop autoplay muted
          >
            <source 
              :src="productDetail.objectUrl"
              type="video/mp4"
            /> 
          </video>
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
    &:not(:last-child) {
      margin: 0 0 45px;
    }
    figure {
      flex-basis: 65%;
      height: 0;
      position: relative;
      overflow: hidden;
      padding-bottom: 43%;
      img, video {
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
      &:not(:last-child) {
        margin: 0 0 -7px;
      }
      &:last-child {
        margin: 0 0 -51px;
      }
      figure {
        padding-bottom: 100%;
        height: 0;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
      figure, .HeadingWithDescription {
        flex-basis: 100%;
      }

      .HeadingWithDescription {
        background: #fff;
        max-width: calc(100% - 56px);
        margin: 0 auto;
        padding: 23px 23px 0;
        position: relative;
        top: -57px;

        h2 {
          font-size: 20px;
          margin: 0 0 16px;
        }
        p {
          line-height: 1.4;
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
    .--custom-container {
      padding: 0;
    }
  }
}
</style>



