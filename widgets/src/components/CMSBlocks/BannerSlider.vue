<template>
  <div
    ref="CarouselBanner"
    class="CarouselBanner"
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
        v-for="slide in sortedSlides"
        :key="slide.$id"
        class="CarouselBanner__items"
      >
        <div
          v-if="slide.headingCopy"
          class="CarouselBanner__image"
          :style="[{ 'background': hasBannerImage(slide) ? 'transparent' : '#E5C78A' }]"
        >
          <!-- Dekstop Banner -->
          <figure
            v-if="hasBannerImage(slide) && isBigScreen"
            :style="{ backgroundImage: 'url('+ slide.imageDesktop +')' }"
          />

          <!-- mobile Banner -->
          <figure
            v-if="hasBannerImage(slide, true) && !isBigScreen"
            :style="{ backgroundImage: 'url('+ slide.imageMobile +')' }"
          />
        </div>
        <div
          v-if="!slide.headingCopy"
          class="static_image_wrapper"
        >
          <a
            v-if="slide.linkUrl.length > 0"
            :href="slide.linkUrl"
            class="common-link"
          />
          <static-banner
            :desktop-banner="slide.imageDesktop"
            :mobile-banner="slide.imageMobile"
            :responsive-point="991 + 'px'"
          />
        </div>
        <div
          v-if="slide.headingCopy"
          class="CarouselBanner__content"
        >
          <h2 class="--caps">
            {{ slide.headingCopy }}
          </h2>
          <p>
            {{ slide.descriptionCopy }}
          </p>
          <div
            class="CarouselBannerAction"
          >
            <a
              :href="slide.linkUrl"
              class="--caps"
            >
              {{ slide.linkCopy }}
            </a>
          </div>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
import slider from '../Slider.vue';
import StaticBanner from '../StaticBanner.vue';

export default {
  components: {
    slider,
    StaticBanner,
  },

  props: {
    slides: { type: Array, default: () => ([]) },
    autoplay: { type: Boolean, default: false },
    playSpeed: { type: Number, default: 3000 },
  },

  computed: {
    hasBannerImage() {
      return (slide, mobile = false) => {
        if (mobile) {
          return slide.imageMobile && slide.imageMobile.trim() !== '';
        }
        return slide.imageDesktop && slide.imageDesktop.trim() !== '';
      };
    },

    sortedSlides() {
      return [...this.slides].sort((a, b) => (a.priority < b.priority ? -1 : 1));
    },
  },

  data() {
    return {
      isBigScreen: true,
      sliderProps: {
        items: 1,
        margin: 0,
        loop: true,
        nav: true,
        autoplay: this.autoplay,
        autoplaySpeed: this.playSpeed,
        dots: true,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:false, autoplayTimeout: 5000},1025:{nav:true, autoplayTimeout: 5000}}
      }
    }
  },

  created() {
    if (this.slides.length > 1) {
      this.sliderProps.loop = true;
    } else {
      this.sliderProps.loop = false;
    }

    if (window.innerWidth > 991) {
      this.isBigScreen = true;
    } else {
      this.isBigScreen = false;
    }
  },

  mounted() {
    const changeTheBanner = () => {
      if (window.innerWidth > 991) {
        this.isBigScreen = true;
      } else {
        this.isBigScreen = false;
      }
    };

    window.addEventListener('resize', changeTheBanner);

    const controller = new ScrollMagic.Controller();

    const bannerCarouselTimeline = new TimelineLite();
    bannerCarouselTimeline.fromTo($('.CarouselBanner__image'), 0.8, {opacity: 0, scale: 1.05}, {opacity: 1, scale: 1, ease: ExpoScaleEase.config(1.05, 1, Power0.easeIn)})
      .fromTo($('.CarouselBanner__content h2'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Circ.easeOut}, 0.5)
      .fromTo($('.CarouselBanner__content p'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Circ.easeOut}, 0.5)
      .fromTo($('.CarouselBanner__content a'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Circ.easeOut}, 0.75)
      .call(function(){
        $('.CarouselBanner .owl-dots button').each(function(i){
          var row = $(this);
          setTimeout(function() {
            TweenMax.fromTo(row, 0.5,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Circ.easeOut}, 0.8)
            if($('.CarouselBanner .owl-dots button').length === (i + 1)) {
              $('.CarouselBanner').addClass('--animLoaded');
            }
          }, 200 * i);
        });
      });
    const bannerCarouselTimelineSet = new ScrollMagic.Scene({
      triggerElement: '.CarouselBanner',
      reverse: false
    }).setTween(bannerCarouselTimeline).addTo(controller);
  },
};
</script>

<style lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.CarouselBanner {
  position: relative;
  .CarouselBanner__items {
    position: relative;
    @include block();
    .CarouselBanner__image {
      position: relative;
      @include block(580px);

      figure {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        @include block(100%);
      }
    }
    .CarouselBanner__content {
      max-width: 800px;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      margin: auto;
      text-align: center;
      @include block();
      @include translate(0,-50%);
      * {
        text-align: center;
      }
      h2 {
        display: block;
        margin: 0 0 16px;
        font-family: $font-stack-avalon;
        font-weight: 700;
        opacity: 0;
        @include fonts(48px,#ffffff,1.18,0.05em);
      }
      p {
        display: block;
        margin: 0 0 23px;
        font-family: $font-stack-avalon;
        font-weight: 500;
        opacity: 0;
        @include fonts(18px,#ffffff,1.33,0.035em);
      }
      a {
        display: inline-block;
        padding: 5px 0;
        position: relative;
        font-family: $font-stack-avalon;
        font-weight: 600;
        opacity: 0;
        @include fonts(16px,#ffffff,1.18,0.1em);
        &::after {
          content: "";
          width: 100%;
          height: 1.5px;
          background: #ffffff;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 3px;
        }
      }
    }
    .static_image_wrapper {
      position: relative;
    }

    .common-link {
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      width: 100%;
    }
  }
  .owl-theme {
    .owl-nav {
      div {
        top: 50%;
        margin: 0;
        @include translate(0,-50%);
        &.owl-prev {
          position: absolute;
          left: 0;
        }
        &.owl-next {
          position: absolute;
          right: 0;
        }
      }
    }
    &:hover {
      .owl-nav {
        div {
          opacity: 1;
          pointer-events: all;
          visibility: visible;

          &.owl-prev, &.owl-next {
            @include translate(0, -50%);
          }
        }
      }
    }
    .owl-dots {
      position: absolute;
      left: 50%;
      bottom: 41px;
      transform: translate(-50%,0);
      &::after {
        opacity: 0
      }
      .owl-dot {
        outline: none;
        box-shadow: none;
        opacity: 0;
        span {
          background: transparent;
          border: 1.5px solid #ffffff;
          margin: 4px;
          @include transition();
        }
        &:hover {
          span {
            background: transparent;
          }
        }
        &.active {
          span {
            background: #ffffff;
          }
        }
      }
    }
  }

  @include at-query('max-width: 1280px') {
    .CarouselBanner__items {
      .CarouselBanner__content h2 {
        font-size: 40px;
      }
      .CarouselBanner__image {
        height: 500px;
      }
    }
  }

  @include at-query('max-width: 1199px') {
    .CarouselBanner__items {
      .CarouselBanner__content h2 {
        font-size: 35px;
      }
      .CarouselBanner__image {
        height: 450px;
      }
    }
  }
  @include at-query('max-width: 991px') {
    .CarouselBanner__items .CarouselBanner__image {
      height: calc(100vh - 102px);
    }
  }
  @include at-query('max-width: 767px') {
    .owl-theme .owl-dots {
      bottom: 27px;
      span {
        margin: 3px;
      }
    }
    .CarouselBanner__items {
      .CarouselBanner__content {
        height: 100%;
        transform: none;
        top: 0;
        padding: 45px 15px 0;
        h2 {
          font-size: 34px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
  .owl-theme.owl-carousel {
    .owl-dots {
      &::after {
        opacity: 0;
      }
    }
  }
}
.owl-theme.owl-carousel {
  .owl-nav {
    div {
      align-items: center;
      background: rgba($color: #ffffff, $alpha: 0.8);
      border: none;
      border-radius: 50%;
      box-shadow: none;
      display: flex;
      justify-content: center;
      height: 70px;
      margin: 0 33px;
      outline: none;
      opacity: 0;
      padding: 0;
      pointer-events: none;
      visibility: hidden;
      width: 70px;
      @include transition(all,.3s,cubic-bezier(.55, .085, .68, .53));

      span {
        background-position: center;
        background-repeat: no-repeat;
        color: transparent;
        display: block;
        font-size: 0;
        height: 21px;
        position: absolute;
        width: 21px;

        &.next-hidden {
          opacity: 0;
          @include translate(-100%,0);
        }

        &.prev-hidden {
          opacity: 0;
          @include translate(100%,0);
        }
      }

      &.owl-prev {
        float: left;
        @include translate(-32px,0);

        span {
          background-image: url('https://cdn.shopify.com/s/files/1/2994/0144/files/left-arrow.png?738766');
        }

        &:hover {
          background: rgba($color: #ffffff, $alpha: 0.8);
          span {
            &.prev {
              opacity: 0;
              @include transition(all,.3s,cubic-bezier(.55, .085, .68, .53));
              @include translate(-100%,0);
            }
            &.prev-hidden {
              opacity: 1;
              transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -webkit-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -moz-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -ms-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -o-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              @include translate(0,0);
            }
          }
        }
      }
      &.owl-next {
        float: right;
        @include translate(32px,0);

        span {
          background-image: url('https://cdn.shopify.com/s/files/1/2994/0144/files/right-arrow.png?738361');
        }

        &:hover {
          background: rgba($color: #ffffff, $alpha: 0.8);
          span {
            &.next {
              opacity: 0;
              @include transition(all,.3s,cubic-bezier(.55, .085, .68, .53));
              @include translate(100%,0);
            }

            &.next-hidden {
              opacity: 1;
              transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -webkit-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -moz-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -ms-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              -o-transition: all .6s cubic-bezier(.165, .84, .44, 1) .2s;
              @include translate(0,0);
            }
          }
        }
      }
    }
  }
  @include at-query('max-width: 1280px') {
    .owl-nav div {
      height: 50px;
      width: 50px;
      margin: 0 15px;

      span {
        background-size: cover;
        height: 17px;
        width: 17px;
      }
    }
  }
  @include at-query('max-width: 1204px') {
    .owl-nav {
      display: none;
    }
  }
}
</style>