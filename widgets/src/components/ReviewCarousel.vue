<template>
  <div 
    class="ReviewCarousel" 
    ref="ReviewCarousel"
  >
    <slider 
      :items="sliderProps.items"
      :margin="sliderProps.margin"
      :loop="sliderProps.loop"
      :nav="sliderProps.nav"
      :autoplay="sliderProps.autoplay"
      :dots="sliderProps.dots"
      :navText="sliderProps.navText"
    >
      <div 
        class="Review__items"
        v-for="review in reviewRow"
        :key="review.$id"
      >
        <div class="Review__content">
          <h5>{{review.headContent}}</h5>
          <div class="Review__rating">
            <figure
              v-for="i in review.starCount"
              :key="i.$id"
            >
              <img src="https://cdn.shopify.com/s/files/1/2994/0144/files/star_c541c21b-071c-4fb3-ad61-d937c0c58c54.png?753977"/>
            </figure>
          </div>
          <p>{{review.reviewDetail}}</p>
          <div class="Review__author">
            <span>{{review.authorName}}</span>
            <span>{{review.authorAddress}}</span>
          </div>
          <a 
            href="./" 
            class="--caps"
          >
            Read All Reviews
          </a>
        </div>
        <div class="Review__image">
          <figure>
            <img :src="review.image">
          </figure>
        </div>
      </div>
    </slider>  
  </div>
</template>

<script>
import Slider from './Slider.vue' 

export default {
  components: {
    Slider
  },
  data() {
    return {
      reviewRow: [
        {
          headContent: 'Love It!',
          starCount: 5,
          reviewDetail: 'Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping',
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/reviews_img1.png?753978',
          authorName: 'Sophia',
          authorAddress: 'Santa Ana, CA'
        },
        {
          headContent: 'Exactly what I wanted!',
          starCount: 4,
          reviewDetail: 'Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping',
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/reviews_img2.png?753979',
          authorName: 'Ashley',
          authorAddress: 'Miami, FL'
        },
        {
          headContent: 'Love It!',
          starCount: 5,
          reviewDetail: 'Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping',
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/reviews_img1.png?753978',
          authorName: 'Sophia',
          authorAddress: 'Santa Ana, CA'
        }
      ],
      sliderProps: {
        items: 1,
        margin: 10,
        loop: true,
        nav: true,
        autoplay: true,
        dots: true,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>']
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.ReviewCarousel {
  width: 100%;
  height: auto;
  display: block;
  .Review__items {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    .Review__content {
      flex-basis: 50%;
      font-family: $font-stack-avalon;
      h5 {
        display: block;
        font-weight: 400;
        margin: 0 0 25px;
        @include fonts(22px,#202020,1.18,0.026em);
      }
      p {
        display: block;
        font-weight: 400;
        margin: 0 0 23px;
        @include fonts(18px,#202020,1.6,0.035em);
      }
      .Review__author {
        display: block;
        margin: 0 0 38px;
        span {
          display: block;
          font-weight: 400;
          @include fonts(18px,#212121,1.6,0.05em);
        }
      }
      a {
        border-bottom: 1px solid #212121;
        font-weight: 400;
        @include fonts(18px,#212121,1.6,0.05em);
      }
    }
    .Review__image {
      flex-basis: 50%;
      figure {
        height: auto;
        width: auto;
        img {
          display: block;
          height: auto;
          margin: 0 0 0 auto;
          max-width: 100%;
          width: auto;
        }
      }
    }

  }
  .Review__rating {
    display: block;
    margin: 0 0 25px;
    figure {
      display: inline-block;
      height: 20px;
      margin-right: 13px;
      width: 20px;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
}

.ReviewCarouselWrapper {
  padding: 0 0 117px;
  position: relative;
  &::before {
    content: "";
    background: #E8E6E2;
    height: calc(100% - 96px);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
  .owl-theme {
    .owl-nav {
      position: absolute;
      left: calc((1215px - 100vw) / 2);
      top: 50%;
      transform: translate(0,-50%);
      width: 100vw;
    }
    .owl-dots {
      position: absolute;
      right: 0;
      bottom: -40px;
      width: 565px;
      .owl-dot {
        outline: none;
        box-shadow: none;
        span {
          background: transparent;
          border: 1px solid #000000;
          @include transition();
        }
        &:hover {
          span {
            background: transparent;
          }
        }
        &.active {
          span {
            background: #000000;
          }
        }
      }
    }
  }
  &:hover {
    .owl-theme {
      .owl-nav {
        div {
          opacity: 1;
          pointer-events: all;
          visibility: visible;
  
          &.owl-prev, &.owl-next{
            @include translate(0,0);
          }
        }
      }
    }
  }
}
</style>

