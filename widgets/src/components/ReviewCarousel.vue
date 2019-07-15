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
      :responsive="sliderProps.responsive"
    >
      <div 
        class="Review__items"
        v-for="review in reviewContentItems"
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
    <a 
      href="./" 
      class="--caps read-all-review-sm"
    >
      Read All Reviews
    </a>  
  </div>
</template>

<script>
import Slider from './Slider.vue' 
export default {
  components: {
    Slider
  },
  props: {
    reviewContent: Array
  },
  data() {
    return {
      reviewContentItems: this.reviewContent,
      sliderProps: {
        items: 1,
        margin: 10,
        loop: true,
        nav: true,
        autoplay: true,
        dots: true,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:false, dots: false, autoplay: false, autoplayTimeout: 1500},1025:{nav:true, dots: true, autoplay: true, autoplayTimeout: 4000}}
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
  .read-all-review-sm {
    border-bottom: 1px solid #212121;
    display: inline-block;
    font-weight: 400;
    font-family: $font-stack-avalon;
    margin: 30px 0 0 15px;
    position: relative;
    @include fonts(18px,#212121,1.6,0.05em);
    @include at-query('min-width: 992px') {
      display: none;
    }
  }
  @include at-query('max-width: 1500px') {
    .Review__items {
      justify-content: center;
      .Review__content {
        flex-basis: 42%
      }
      .Review__image {
        flex-basis: 45%;
      }
    }
  }
  @include at-query('max-width: 1280px') {
    .Review__items {
      justify-content: center;
      .Review__content {
        flex-basis: 45%;
        padding-right: 25px;
        h5 {
          font-size: 20px;
          margin: 0 0 20px;
        }
        p {
          font-size: 15px;
          margin: 0 0 20px;
        }
        .Review__author {
          margin: 0 0 20px;
          span {
            font-size: 15px;
          }
        }
        a {
          font-size: 17px;
        }
      }
      .Review__image {
        flex-basis: 45%;
      }
    }
    .Review__rating {
      margin: 0 0 20px;
      figure {
        margin-right: 8px;
      }
    }
  }
  @include at-query('max-width: 1199px') {
    .Review__items {
      .Review__content {
        flex-basis: 40%;
      }
      .Review__image {
        flex-basis: 52%;
      }
    }
  }
  @include at-query('max-width: 991px') {
    .Review__items {
      flex-direction: column-reverse;
      flex-wrap: wrap;
      .Review__image {
        flex-basis: 100%;
        width: 100%;
        figure {
          img {
            margin: 0 auto 0 0;
          }
        }
      }
      .Review__content {
        flex-basis: 100%;
        padding: 25px 35px 0 15px;
        width: 100%;
        a {
          display: none;
        }
      }
    }
    .owl-carousel {
      padding: 0 100px 0 0;
      overflow: hidden;
      .owl-stage-outer {
        overflow: visible;
        .owl-item{
          transition: opacity 0.3 ease-in-out;
          &:not(.active) {
            opacity: 0.5;
          }
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    width: auto;
    margin-right: -15px;
    .owl-carousel {
      padding: 0 55px 0 0;
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
  .owl-theme.owl-carousel {
    .owl-nav {
      position: absolute;
      left: calc((1215px - 100vw) / 2);
      top: 50%;
      transform: translate(0,-50%);
      width: 100vw;
    }
    .owl-dots {
      position: absolute;
      right: 20%;
      bottom: -40px;
      &::after {
        background-color: #000000;
      }
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
  @include at-query('max-width: 1274px') {
    .owl-theme .owl-nav {
      left: calc((1140px - 100vw) / 2);
    }
  }
  @include at-query('max-width: 1199px') {
    .owl-theme .owl-nav {
      left: calc((932px - 100vw) / 2);
    }
  }
}
</style>