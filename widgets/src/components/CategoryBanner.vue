<template>
  <div 
    class="CategoryBanner CategoryBanner--sliderWrapper"
    ref="CategoryBanner--sliderWrapper"
    >
    <slider
      :items="sliderProps.items"
      :animateIn="sliderProps.animateIn"
      :animateOut="sliderProps.animateOut"
      :navText="sliderProps.navText"
      :responsive="sliderProps.responsive"
    >
      <div 
        class="CategoryBanner--items"
        v-for="item in bannerContentItems" 
        :key="item.$id"
        :data-src="item.dataSource"
        :data-hash="item.dataSource"
      >
        <div class="CategoryBanner--imageWrapper">
          <figure 
            v-bind:style="[{'background-image': 'url(' + item.image + ')'}]"
            v-if="isBigScreen"
          >
          </figure>

          <figure 
            v-bind:style="[{'background-image': 'url(' + item.imageSm + ')'}]"
            v-if="!isBigScreen" 
          >
          </figure>
        </div>
        <div 
          class="CategoryBanner--content">
          <h2 class="--caps">
            {{item.heading}}
          </h2>
          <p>
            {{item.description}}
          </p>
          <div
            class="CarouselBannerAction"
          >
            <a 
              :href="item.url" 
              class="--caps"
            >
              {{item.linkText}}
            </a>
          </div>
        </div>
      </div>
    </slider>
    <div class="CategoryBanner--clasification">
      <accordion
        v-for="accItem in categoryAccordion"
        :key="accItem.id"
        :accordionHead="accItem.accordionHead"
        :accordionDescription="accItem.accordionDescription"
        :accordionTriggerElement="accItem.accordionTarget"
        :anchorTageRequire="anchorTageRequire"
      />
    </div>
  </div>  
</template>
<script>
import slider from './Slider.vue'
import accordion from './accordion'
export default {
  components: {
    slider,
    accordion
  },
  props: {
    bannerContent: Object,
    hideDesktopSlider:{type: Boolean, default: false},
    categoryBannerAccordion: Array,
  },
  data() {
    return {
      bannerContentItems: this.bannerContent.items,
      categoryAccordion: this.categoryBannerAccordion,
      anchorTageRequire: true,
      isBigScreen: true,
      sliderProps: {
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:false, autoplayTimeout: 5000, dots: true, loop: true, URLhashListener: false, animateIn: 'slideInRight', animateOut: 'slideOutLeft', mouseDrag: true, touchDrag: true, pullDrag: true}, 992:{nav:!this.hideDesktopSlider, mouseDrag: !this.hideDesktopSlider, touchDrag: !this.hideDesktopSlider, pullDrag: !this.hideDesktopSlider, dots: !this.hideDesktopSlider, loop: !this.hideDesktopSlider, URLhashListener: true, animateIn: 'fadeIn', animateOut: 'fadeOut',}}
      }
    }
  },
  mounted() {
    const changeTheBanner = () => {
      if (window.innerWidth > 991) {
       this.isBigScreen = true
      } else {
        this.isBigScreen = false
      }
    };
    
    window.addEventListener('resize', changeTheBanner);
    window.addEventListener('load', changeTheBanner);
  }
}
</script>
<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.CategoryBanner {
  position: relative;
  @include block();
  .CategoryBanner--items {
    @include block();
    .CategoryBanner--imageWrapper {
      @include block(651px);
      figure {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        @include block(100%);
      }
    }
    .CategoryBanner--content {
      width: auto;
      height: auto;
      max-width: 540px;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 36px;
      margin: 0 auto;
      z-index: 8;
      h2 {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: $demi;
        text-align: center;
        margin: 0 0 7px;
        @include fonts(52px,#202020,1,0.05em);
      }
      p {
        display: block;
        font-family: $font-stack-roboto;
        font-weight: 500;
        margin: 0 0 12px;
        text-align: center;
        @include fonts(15px,#202020,1.46,0.035em);
      }
      a {
        border-bottom: 1px solid;
        box-shadow: none;
        display: inline-block;
        font-family: $font-stack-avalon;
        font-weight: 500;
        outline: none;
        text-decoration: none;
        @include fonts(14px,#202020,1.21,0.12em);
      }
    }
  }
  .CategoryBanner--clasification {
    width: 220px;
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: calc((100% - 1245px) / 2);
    z-index: 9;
    .point {
      p {
        font-family: $font-stack-roboto;
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 0.04em;
        line-height: 1.46;
      }
    }
    @include at-query('min-width: 992px') {
      display: inline-block;
    }

  }

  @include at-query('max-width: 1280px') {
    .CategoryBanner--clasification {
      right: calc((100% - 1170px) / 2);
      .point {
        p {
          font-size: 13px;
        }
        h3 {
          &::after, &::before {
            width: 29px;
            height: 29px;
          }
        }
      }
    }
    .CategoryBanner--items {
      .CategoryBanner--content {
        h2 {
          font-size: 40px;
        }
        p {
          font-size: 14px;
        }
        a {
          font-size: 13px;
        }
      }
      .CategoryBanner--imageWrapper {
        height: 551px;
      }
    }
  }
  @include at-query('max-width: 1199px') {
    .CategoryBanner--clasification {
      right: calc((100% - 962px) / 2)
    }
    .CategoryBanner--items {
      .CategoryBanner--content {
        max-width: 450px;
        h2 {
          font-size: 35px;
        }
      }
      .CategoryBanner--imageWrapper {
        height: calc(100vh - 102px);
      }
    } 
  }
  @include at-query('max-width: 991px') {
    .owl-theme {
      .owl-dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 19px;
        button {
          box-shadow: none;
          outline: none;
          transition: all 0.3s ease-in-out;
          height: 20px;
          width: 14px;
          span {
            background: transparent;
            border: 1.5px solid #ffffff;
            border-radius: 50%;
            display: block;
            height: 8px;
            margin: 0 auto;
            width: 8px;
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
  }
  @include at-query('max-width: 767px') {
    .CategoryBanner--items .CategoryBanner--content {
      max-width: 75%;
      h2 {
        font-size: 28px;
      }
      p {
        font-size: 11px;
      }
    }
  }
  @include at-query('max-width: 640px') {
    .CategoryBanner--items .CategoryBanner--content {
      max-width: 90%;
    }
  }
}
</style>


