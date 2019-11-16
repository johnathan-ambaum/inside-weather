<template>
  <div
    ref="ReviewCarousel"
    class="BannerReviewCarousel"
  >
    <slider
      :items="sliderProps.items"
      :margin="sliderProps.margin"
      :loop="sliderProps.loop"
      :nav="sliderProps.nav"
      :autoplay="sliderProps.autoplay"
      :dots="sliderProps.dots"
      :nav-text="sliderProps.navText"
      :responsive="sliderProps.responsive"
    >
      <div
        v-for="review in reviewContentItems"
        :key="review.$id"
        class="Review__items"
      >
        <div class="Review__content">
          <h5>{{ review.headContent }}</h5>
          <div class="Review__rating clearfix">
            <i
              v-for="i in review.starCount"
              :key="i.$id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20.967 20">
                <path
                  id="Path_556"
                  data-name="Path 556"
                  d="M85.008,92.492l-6.613.733a.632.632,0,0,0-.529.431.621.621,0,0,0,.176.654c1.966,1.794,4.92,4.481,4.92,4.481s-.811,3.908-1.348,6.516a.633.633,0,0,0,.246.635.623.623,0,0,0,.675.035c2.315-1.316,5.782-3.294,5.782-3.294l5.78,3.3a.626.626,0,0,0,.924-.67c-.537-2.609-1.345-6.517-1.345-6.517s2.954-2.687,4.92-4.477a.633.633,0,0,0,.176-.658.626.626,0,0,0-.527-.428c-2.646-.3-6.615-.736-6.615-.736L88.89,86.428a.635.635,0,0,0-.572-.369.626.626,0,0,0-.569.369C86.651,88.854,85.008,92.492,85.008,92.492Z"
                  transform="translate(-77.835 -86.059)"
                  fill="#202020"/>
              </svg>
            </i>
          </div>
          <p>{{ review.reviewDetail }}</p>
          <div class="Review__author">
            <span>{{ review.reviewer }}</span>
            <span>{{ review.reviewerAddress }}</span>
          </div>
          <a
            :href="linkTo"
            class="--caps"
          >
            {{ linkText }}
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
      :href="linkTo"
      class="--caps read-all-review-sm"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<script>
import Slider from './Slider.vue';

export default {
  components: {
    Slider,
  },
  props: {
    reviewContent: Array,
    linkText: String,
    linkTo: String,
  },
  data() {
    return {
      reviewContentItems: this.reviewContent,
      sliderProps: {
        items: 1,
        margin: 10,
        loop: true,
        nav: true,
        autoplay: false,
        dots: true,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {
          0: { nav: false, dots: false, autoplay: false },
          992: {
            nav: true, dots: true, autoplay: false, autoplayTimeout: 6000,
          },
        },
      },
    };
  },
  mounted() {
    window.addEventListener('load', updateOwlDotsPosition);
    window.addEventListener('resize', updateOwlDotsPosition);
    function updateOwlDotsPosition() {
      setTimeout(() => {
        const reviewImage = document.querySelector('.owl-item.active .Review__image');
        const getTheWidth = reviewImage.clientWidth;
        const targetElement = document.querySelector('.ReviewCarousel .owl-dots');
        targetElement.style.right = `${reviewImage.parentElement.clientWidth - (reviewImage.offsetLeft + reviewImage.clientWidth)}px`;
        targetElement.style.width = `${getTheWidth}px`;
      }, 500);
    }
  },
};
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.BannerReviewCarousel {
  width: 100%;
  height: auto;
  display: block;
  padding: 0 0 117px;
  .Review__items {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    .Review__content {
      flex-basis: 50%;
      padding-right: 110px;
      padding-bottom: 65px;
      h5 {
        font-family: $font-stack-avalon;
        display: block;
        font-weight: 600;
        margin: 0 0 22px;
        @include fonts(22px,#202020,1.18,0.026em);
      }
      p {
        font-family: $font-stack-avalon;
        display: block;
        font-weight: 500;
        margin: 0 0 22px;
        @include fonts(14px,#202020,22px,0.04em);
      }
      .Review__author {
        display: block;
        margin: 0 0 37px;
        span {
          font-family: $font-stack-avalon;
          display: block;
          font-weight: 400;
          @include fonts(14px,#202020,1.33,0.05em);
          &:first-child {
            color: #212121;
            font-weight: 600;
            margin: 0 0 5px;
          }
        }
      }
      a {
        font-family: $font-stack-avalon;
        border-bottom: 1px solid #202020;
        font-weight: 500;
        @include fonts(14px,#202020,1.21,0.12em);
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
    margin: 0 0 24px;
    i {
      display: inline-block;
      float: left;
      height: 20px;
      margin-right: 13px;
      width: 20px;
      svg {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
  .read-all-review-sm {
    border-bottom: 1px solid #202020;
    display: inline-block;
    font-weight: 500;
    font-family: $font-stack-avalon;
    margin: 30px 0 0 15px;
    position: relative;
    @include fonts(14px,#202020,1.21,0.12em);
    @include at-query('min-width: 992px') {
      display: none;
    }
  }
  @include at-query('max-width: 1500px') {
    .Review__items {
      justify-content: center;
      .Review__content {
        flex-basis: 42%;
        padding-right: 100px;
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
        padding-bottom: 35px;
        h5 {
          margin: 0 0 20px;
        }
        p {
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
    }
    .Review__rating {
      margin: 0 0 20px;
      i {
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
      }
    }
  }
  @include at-query('max-width: 767px') {
    width: auto;
    margin-right: -15px;
    .owl-carousel {
      padding: 0 55px 0 0;
    }
    .Review__items .Review__content {
      h5 {
        font-size: 16px;
        margin: 0 0 22px;
      }
      p {
        font-size: 13px;
      }
      .Review__author {
        margin: 0;
        span {
          font-size: 13px;
          font-weight: 400;
          &:first-child {
            color: #202020;
          }
        }
      }
    }
    .Review__rating {
      margin: 0 0 22px;
      i {
        height: 14px;
        width: 14px;
      }
    }
  }
  @include at-query('max-width: 767px') {
    padding: 0 0 58px;
  }
}
.ReviewCarouselWrapper {
  // padding: 0 0 117px;
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
      top: calc(50% + 96px);
      transform: translate(0,-50%);
      width: 100vw;
    }
    .owl-dots {
      width: 50%;
      position: absolute;
      right: 0;
      text-align: center;
      .owl-dot {
        outline: none;
        box-shadow: none;
        span {
          background: transparent;
          border: 1.5px solid #000000;
          margin: 0 4px;
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
  @include at-query('max-width: 1500px')  {
    .owl-theme {
      .owl-dots {
        width: 45%;
        right: calc((100% - 87%) / 2);
      }
    }
  }
  @include at-query('max-width: 1280px') {
    .owl-theme {
      .owl-dots {
        right: calc((100% - 90%) / 2);
      }
    }
  }
  @include at-query('max-width: 1274px') {
    .owl-theme {
      .owl-nav {
        left: calc((1140px - 100vw) / 2);
      }
    }
  }
  @include at-query('max-width: 1199px') {
    padding: 0 0 75px;
    .owl-theme {
      .owl-nav {
        left: calc((932px - 100vw) / 2);
      }
      .owl-dots {
        width: 52%;
        right: calc((100% - 92%) / 2);
      }
    }
  }

}
</style>
