<template>
  <div 
    class="CarouselBanner"
    ref="CarouselBanner"
    :class="[hasImage ? 'imageContain' : ' ']"
  >
    <slider 
      :items="sliderProps.items"
      :margin="sliderProps.margin"
      :loop="sliderProps.loop"
      :nav="sliderProps.nav"
      :autoplay="sliderProps.autoplay"
      :dots="sliderProps.dots"
      :smartSpeed="sliderProps.smartSpeed"
      :navText="sliderProps.navText"
      :responsive="sliderProps.responsive"
    >
      <div 
        class="CarouselBanner__items" 
        v-for="items in bannerContentItems" 
        :key="items.$id"
      >
        <div 
          class="CarouselBanner__image"
          :style="[hasImage ? {'background': 'transparent'} : {'background': '#E5C78A'}]"
        >
          <figure 
            v-if="hasImage"
            v-bind:style="{ backgroundImage: 'url('+ items.image +')' }"
          >
          </figure>
        </div>
        <div class="CarouselBanner__content">
          <h2 class="--caps">
            {{items.heading}}
          </h2>
          <p>
            {{items.description}}
          </p>
          <div
            class="CarouselBannerAction"
          >
            <a 
              :href="items.url" 
              class="--caps"
            >
              {{items.linkText}}
            </a>
          </div>
          <span class="down-arrow-xs"></span>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
import slider from './Slider.vue'
import * as ScrollMagic from "scrollmagic"
import { TimelineLite, TimelineMax, TweenMax} from "gsap"
import $ from 'jquery'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import gsap from 'scrollmagic'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

export default {
  components: {
    slider
  },
  props: {
    bannerImage: String,
    hasImage: {type: Boolean, default: false},
    bannerContent: Object
  },
  data() {
    return {
      bannerContentItems: this.$attrs.bannercontent.items,
      sliderProps: {
        items: 1,
        margin: 0,
        loop: false,
        nav: true,
        autoplay: false,
        dots: true,
        smartSpeed: 1200,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:false},1025:{nav:true}}
      }
    }
  },
  mounted() {
    const controller = new ScrollMagic.Controller();
    const bannerCarouselTimeline = new TimelineLite();
    bannerCarouselTimeline.fromTo($('.CarouselBanner__image'), 0.8, {opacity: 0, scale: 1.05}, {opacity: 1, scale: 1})
      .fromTo($('.CarouselBanner__content h2'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 0.5)
      .fromTo($('.CarouselBanner__content p'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 0.5)
      .fromTo($('.CarouselBanner__content a'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 0.75)
      .call(function(){
        $('.CarouselBanner .owl-dots button').each(function(i){
          var row = $(this);
          setTimeout(function() {
            TweenMax.fromTo(row, 0.5,{opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 0.8)
          }, 200 * i);
        });
      });
    const bannerCarouselTimelineSet = new ScrollMagic.Scene({
      triggerElement: '.CarouselBanner',
      reverse: false
    }).setTween(bannerCarouselTimeline).addTo(controller);
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.CarouselBanner {
  position: relative;
  .CarouselBanner__items {
    position: relative;
    @include block();
    .CarouselBanner__image {
      @include block(580px);
      figure {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        @include block(100%);
        &:before {
          content: "";
          background: rgba($color: #000000, $alpha: 0.2);
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          @include block(100%);
        }
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
        @include fonts(45px,#ffffff,1.18,0.05em);
      }
      p {
        display: block;
        margin: 0 0 23px;
        font-family: $font-stack-avalon;
        font-weight: 500;
        @include fonts(18px,#ffffff,1.33,0);
      }
      a {
        display: inline-block;
        padding: 5px 0;
        position: relative;
        font-family: $font-stack-avalon;
        font-weight: 700;
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
  }
  .owl-theme {
    .owl-nav {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      margin: 0;
      text-align: unset;
      @include block();
      @include translate(0,-50%);
    }
    &:hover {
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
    .owl-dots {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 41px;
      .owl-dot {
        outline: none;
        box-shadow: none;
        opacity: 0;
        span {
          background: transparent;
          border: 1px solid #ffffff;
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
  .down-arrow-xs {
    border-bottom: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    display: block;
    height: 20px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 45px;
    margin: 0 auto;
    transform: rotate(-45deg);
    width: 20px;
    -webkit-animation: mouseWheel 0.9s infinite linear;
    -moz-animation: mouseWheel 0.9s infinite linear;
    -ms-animation: mouseWheel 0.9s infinite linear;
    -o-animation: mouseWheel 0.9s infinite linear;
    animation: mouseWheel 0.9s infinite linear;

    @include at-query('min-width: 768px') {
      display: none;
    }
  }
  @keyframes mouseWheel {
    0% {
      transform: translateY(0) rotate(-45deg);
    }
    50% {
      transform: translateY(10px) rotate(-45deg);
    }
    100% {
      transform: translateY(25px) rotate(-45deg);
    }
  }
  &.imageContain {
    .down-arrow-xs {
      display: none;
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
        a {
          font-weight: 400;
        }
      }
    }
    &:not(.imageContain) {
      .CarouselBanner__items {
        .CarouselBanner__content {
          .CarouselBannerAction {
            position: absolute;
            bottom: 180px;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-align: center;
          }
        }
      }
      .owl-theme .owl-dots {
        bottom: 95px;
        .owl-dot {
          span {
            border: 2px solid #ffffff;
          }
        }
      }
    }
  }

}
.owl-theme.owl-carousel {
  .owl-nav {
    div {
      align-items: center;
      background: #ffffff;
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
      position: relative;
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
          background: #ffffff;
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
          background: #ffffff;
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