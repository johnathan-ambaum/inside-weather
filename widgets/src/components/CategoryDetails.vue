<template>
  <div 
    class="CategoryDetails image-content-wrapper"
    ref="CategoryDetails"
  >
    <div class="--custom-container">
      <div 
        v-for="(productDetail, index) in productDetails"
        :key="index"
        class="image-content-box"
        :class="[
          (isMattress && index == 2) ? 'mattressthirdDetailSection' : ' ',
          (isMattress && index == 4) ? 'mattressfifthDetailSection' : ' ',
        ]" 
      >
        
        <div 
          v-if="isMattress && index == 2"
          class="number-details-section"
        >
          <ul class="list-items">
            <li 
              class="list-item"
              v-for="listItem in listItems"
              :key="listItem.id"
            >
              <figure>
                <img 
                  :src="listItem.imageUrl" 
                />
              </figure>
              <p>{{listItem.title}}</p>
            </li>
          </ul>
        </div>
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
    productDetails: Array,
    listItems: Array,
    isMattress: {type: Boolean, default: false}
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
    &.mattressthirdDetailSection,
    &.mattressfifthDetailSection {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 100vw;
        height: 100%;
        z-index: -1;
        top: 0;
        bottom: 0;
        pointer-events: none;
      }
      @include at-query('max-width: 767px') {
        &:after {
          display: none;
        }
        figure {
          img {
            max-width: 100%;
          }
        }
        .HeadingWithDescription {
          top: auto;
          background: transparent;
        }
      }
    }

    &.mattressthirdDetailSection {
      align-items: center;
      display: flex;
      flex-direction: column-reverse;
      padding-top: 66px;
      padding-bottom: 66px;
      background: #d5e4e6;

      &:after {
        background: #d5e4e6;
      }

      &:nth-child(even) {
        figure {
          padding-bottom: 0;
        }
      }
      figure {
        position: static;
        padding: 0;
        flex-basis: 100%;
        height: 100%;
        img {
          max-width: 1168px;
          position: static;
          margin-bottom: 2px;
        }
      }
      .HeadingWithDescription {
        margin: auto 0;
        padding: 0;
        flex-basis: 100%;
        h2 {
          font-weight: 600;
          font-size: 34px;
          letter-spacing: 0.05em;
          text-align: center;
          color: #202020;
          margin: 0 0 34px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.04em;
          text-align: center;
          color: #202020;
          padding-bottom: 44px;
        }        
      }
      @include at-query('max-width: 767px') {
        padding-top: 34px;
        padding-bottom: 42px;

        figure {
          position: static;
          padding: 0;
          flex-basis: 100%;
          height: 100%;
          img {
            max-width: 100%;
            margin-bottom: 20px;
          }
        }
        .HeadingWithDescription {
          h2 {
            font-size: 20px;
            margin: 0 0 13px;
            text-align: center;
          }
          p {
            font-size: 13px;
            line-height: 18px;
            padding-bottom: 34px;
          }        
        }
      }
      .number-details-section {
        ul {
          align-items: baseline;
          display: flex;
          justify-content: space-between;
          margin: 0;
          max-width: 70%;
          margin: 0 auto;
          li {
            flex-basis: 25%;
            padding: 0 10px;
            figure {
              width: auto;
              height: auto;
              img {
                width: 32px;
                height: 32px;
                max-width: 100%;
                object-fit: contain;
                margin-bottom: 0;
              }
            }
            p {
              font-weight: 600;
              font-size: 16px;
              letter-spacing: 0.1em;
              font-family: $font-stack-avalon;
              line-height: 25px;
              text-align: center;
              color: #202020;
              text-transform: uppercase;
              padding-top: 20px;
            }
          }
        }
        @include at-query('max-width: 767px') {
          ul {
            flex-wrap: wrap;
            max-width: 90%;
            margin: 0 auto;
            li {
              display: flex;
              flex-basis: 100%;
              width: 100%;
              flex-direction: row;
              align-items: center;
              margin: 0;
              &:not(last-child) {
                padding-bottom: 13px;
              }
              figure {
                width: 26px;
                height: 26px;
                flex-basis: 26px;
                img {
                  width: 26px;
                  height: 26px;
                }
              }
              p {
                font-size: 13px;
                line-height: 18px;
                text-align: left;
                padding-left: 15px;
                padding-top: 0;
                margin-bottom: 0;
                @include at-query('max-width: 640px') {
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }
    &.mattressfifthDetailSection {
      align-items: center;
      display: flex;
      flex-direction: column-reverse;
      padding-top: 60px;
      padding-bottom: 34px;
      background: #f2f2f2;
      
      &:after {
        background: #f2f2f2;
      }
      
      &:nth-child(even) {
        figure {
          padding-bottom: 0;
        }
      }
      figure {
        position: static;
        padding: 0;
        flex-basis: 100%;
        height: 100%;
        img {
          max-width: 950px;
          position: static;
        }
      }
      .HeadingWithDescription {
        margin: auto 0;
        padding: 0;
        flex-basis: 100%;
        h2 {
          font-weight: 600;
          font-size: 34px;
          letter-spacing: 0.05em;
          text-align: center;
          color: #202020;
          margin: 0 0 34px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.04em;
          line-height: 22px;
          text-align: center;
          color: #202020;
          padding-bottom: 30px;
        }
      }
      @include at-query('max-width: 767px') {
        padding-top: 34px;
        padding-bottom: 15px;
        
        figure {
          img {
            max-width: 100%;
          }
        }
        .HeadingWithDescription {
          margin: auto 0;
          padding: 0;
          flex-basis: 100%;
          h2 {
            font-size: 20px;
            margin: 0 0 15px;
            text-align: center;
          }
          p {
            font-size: 13px;
            line-height: 18px;
            padding-bottom: 15px;
          }
        }
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