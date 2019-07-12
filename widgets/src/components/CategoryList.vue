<template>
  <div class="CategoryList">
    <div class="_category-list-wrapper">
      <slider 
        class="_category-lists --clearfix" 
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
          class="category-list-item"
          v-for="item in categoryListItems"
          :key="item.id"
        >
          <img :src="item.image "/>
          <link-button
            :btnText="item.buttonText"
            :linkTo="item.link"
          />
          <p v-if="item.desc">
            {{item.desc}}
          </p>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import slider from './Slider.vue'
import LinkButton from './LinkButton.vue'
import * as ScrollMagic from "scrollmagic"
import { TimelineLite, TimelineMax, TweenMax} from "gsap"
import $ from 'jquery'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import gsap from 'scrollmagic'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)
export default {
  components: {
    slider,
    LinkButton
  },
  props: {
    listItems: Array
  },
  data() {
    return {
      categoryListItems: this.$attrs.listitems,
      sliderProps: {
        items: 3,
        margin: 0,
        loop: false,
        nav: false,
        autoplay: false,
        dots: false,
        smartSpeed: 1200,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, items: 1, dots: true},768:{items: 3, loop: false, mouseDrag: false, touchDrag: false, pullDrag: false, dots: false}}
      }
    }
  },
  mounted() {
    const controller = new ScrollMagic.Controller();
    const catTimeline = new TimelineLite()
    catTimeline.fromTo($('._category-lists'), 0.7, {opacity:0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut})
    const catTimelineSet = new ScrollMagic.Scene({
      triggerElement: '.CategoryList',  
      reverse: false
    }).setTween(catTimeline).addTo(controller);
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
@import '../scss/base-layout';

.CategoryList {
  @include at-query('max-width: 640px') {
    margin: 0 -15px;
  }
}
._category-list-wrapper {
  position: relative;
  ._category-lists {
    .category-list-item {
      width: 100%;
      padding: 0 23px;
      text-align: center;
      
      img {
        margin: 0 0 28.5px;
        @include block();
      }
    }
  }
  .owl-theme {
    .owl-dots {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -50px;
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
  @include at-query('max-width: 1199px') {
    ._category-lists {
      .category-list-item {
        padding: 0 10px;
      }
    }
  }

  @include at-query('max-width: 767px') {
    .owl-carousel {
      padding: 0 75px;
      .owl-stage-outer {
        overflow: visible;
        .owl-item {
          transition: opacity 0.3s ease-in-out;
          &:not(.active) {
            opacity: 0.5;
          }
        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .owl-carousel {
      padding: 0 25px;
    }
  }
}

</style>
