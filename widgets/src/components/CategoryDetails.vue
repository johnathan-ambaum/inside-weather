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
        <figure
          v-if="isBigScreen"
        >
          <img 
            :src="productDetail.objectUrl" 
            v-if="productDetail.isVideo === 'false'"
          />
          <video 
            v-if="productDetail.isVideo === 'true'"
            loop autoplay muted playsinline
          >
            <source 
              :src="productDetail.objectUrl"
              type="video/mp4"
            /> 
          </video>
        </figure>
        <figure
          v-if="!isBigScreen"
        >
          <img 
            :src="productDetail.objectUrlMob" 
            v-if="productDetail.isVideo === 'false'"
          />
          <video 
            v-if="productDetail.isVideo === 'true'"
            loop autoplay muted playsinline
          >
            <source 
              :src="productDetail.objectUrlMob"
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
  },
  data() {
    return {
      isBigScreen: Boolean
    }
  },
  created: function () {
    if(window.innerWidth > 767) {
      this.isBigScreen = true
    }else {
      this.isBigScreen = false
    }
  },
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
      margin: 0 0 100px;
    }
    figure {
      margin: 0;
      flex-basis: 67%;
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
        object-fit: cover;
        @include block(100%);
      }
    }
    .HeadingWithDescription {
      margin: auto 0;
      padding: 0 0 0 77px;
      flex-basis: 33%;
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
        flex-basis: 43%;
        padding-bottom: 25%;
        img {
          right: auto;
        }
      }
      .HeadingWithDescription {
        padding: 0 77px 0 85px;
        flex-basis: 57%
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
      figure {
        padding-bottom: 56.25%;
      }
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
          padding-bottom: 56.25%;
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
        padding-bottom: 56.25%;
        height: 0;
        img, video {
          height: 100%;
          width: 100%;
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
  @include at-query('max-width: 480px') {
    .--custom-container {
      padding: 0;
    }
    .image-content-box {
      &:nth-child(even) { 
        figure {
          padding-bottom: 100%;
        }
      }
      figure {
        padding-bottom: 100%;
      }
    }
  }
}
</style>



