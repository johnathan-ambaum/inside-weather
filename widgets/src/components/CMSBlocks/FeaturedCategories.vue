<template>
  <div :style="{ backgroundColor: this.backgroundColor }">
    <div class="category-list-container">
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
              v-for="item in sortedCategories"
              :key="item.id"
            >
              <a :href="item.linkUrl">
                <img 
                  :src="slideImage(item)"
                  :alt="slideAlt(item)"
                />
              </a>
              <link-button
                :btnText="item.buttonText"
                :linkTo="item.linkUrl"
                :categoryListItem="true"
                radius="60px"
                :strokeColor="item.buttonTextColor"
                :bgColor="item.buttonBackgroundColor"
              />
            </div>
          </slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from '../Slider.vue'
import LinkButton from '../LinkButton.vue'
import screenMonitor from '../../mixins/screenMonitor';

export default {
  components: {
    slider,
    LinkButton
  },
  
  props: {
    backgroundColor: { type: String, default: 'transparent' },
    categories: { type: Array, default: () => ([]) },
    autoplay: { type: Boolean, default: false },
    playSpeed: { type: Number, default: 3000 },
  },

  mixins: [
    screenMonitor,
  ],

  computed: {
    sortedCategories() {
      return [...this.categories].sort((a, b) => a.priority < b.priority ? -1 : 1);
    },

    slideImage() {
      return ({ imageDesktop, imageMobile }) => {
        if (this.isMobile && imageMobile) {
          return imageMobile;
        }
        return imageDesktop;
      }
    },

    slideAlt() {
      return ({ imageDesktopAlt, imageMobileAlt }) => {
        if (this.isMobile && imageMobileAlt) {
          return imageMobileAlt;
        }
        return imageDesktopAlt;
      }
    },
  },
  
  data() {
    return {
      sliderProps: {
        items: 4,
        margin: 0,
        loop: false,
        nav: false,
        autoplay: this.autoplay,
        dots: false,
        autoplaySpeed: this.playSpeed,
        smartSpeed: 1200,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, items: 1, dots: true},768:{items: 4, loop: false, mouseDrag: false, touchDrag: false, pullDrag: false, dots: false}}
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';
@import '../../scss/base-layout';

@include at-query('min-width: 1599px') {
  .category-list-container {
    width: 100%;
    max-width: calc(100vw - 408px);
    margin: 0 auto;
  }
}

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
      padding: 0 20px;
      text-align: center;
      
      img {
        margin: 0 0 46px;
        @include block();
      }
    }
  }
  .owl-theme {
    .owl-dots {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -50px;
      &::after {
        background: #000000;
      }
      .owl-dot {
        outline: none;
        box-shadow: none;
        span {
          background: transparent;
          border: 1.5px solid #000000;
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
