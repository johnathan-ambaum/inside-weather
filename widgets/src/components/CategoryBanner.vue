<template>
  <div 
    class="CategoryBanner CategoryBanner--sliderWrapper"
    ref="CategoryBanner--sliderWrapper"
    :class="hasAnimation"
    >
    <slider
      :items="sliderProps.items"
      :animateIn="[isBigScreen ? 'fadeIn' : false]"
      :animateOut="[isBigScreen ? 'fadeOut' : false]"
      :navText="sliderProps.navText"
      :responsive="sliderProps.responsive"
    >
      <div 
        v-for="item in bannerContentItems" 
        :key="item.$id"
        :data-src="item.dataSource"
        :data-hash="item.dataSource"
        class="CategoryBanner--items"
        :class="bannerClass"
      >
        <div 
          class="CategoryBanner--imageWrapper"
          :class="bannerHeight"
          >
          <figure 
            v-if="isBigScreen"
            v-bind:style="[{'background-image': 'url(' + item.image + ')'}]"
            :class="animationClass"
          >
          </figure>

          <figure 
            v-if="!isBigScreen" 
            v-bind:style="[{'background-image': 'url(' + item.imageSm + ')'}]"
            :class="animationClass"
          >
          </figure>
        </div>
        <div 
          class="CategoryBanner--content"
          v-if="hasBannerContent"
          :class="[hasBannerAccoridon ? '' : 'large-content-frame']"
        >
          <h2 
            class="--caps"
            :class="animationClass"
            v-if="isBigScreen"
          >
            {{bannerContentItems[0].heading}}
          </h2>
          <p
            :class="[
              (animationClass),
              (newButton ? 'new-button' : '')
            ]"
            v-if="isBigScreen"
          >
            {{bannerContentItems[0].description}}
          </p>
          <h2 
            class="--caps"
            :class="[
              (animationClass),
              (newButton ? 'new-button' : '')
            ]"
            v-if="!isBigScreen"
          >
            {{item.heading}}
          </h2>
          <p
            :class="animationClass"
            v-if="!isBigScreen"
          >
            {{item.description}}
          </p>
          <div
            class="CarouselBannerAction"
            :class="[
              (animationClass),
              (newButton ? 'new-button' : '')
            ]"
          >
            <a 
              :href="item.url" 
              class="--caps"
              v-if="item.linkText.length > 0"
              :class="[newButton ? 'new-button' : '']"
            >
              {{item.linkText}}
            </a>
          </div>
        </div>
      </div>
    </slider>
    <div 
      class="CategoryBanner--clasification"
      v-if="hasBannerContent || hasBannerAccoridon"
    >
      <accordion
        v-for="accItem in categoryBannerAccordion"
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
import accordion from './Accordion'

export default {
  components: {
    slider,
    accordion,
  },
  props: {
    bannerContent: Object,
    hideDesktopSlider:{type: Boolean, default: false},
    hideMobileSlider:{type: Boolean, default: false},
    categoryBannerAccordion: Array,
    isScrollAnimationRequire: {type: Boolean, default: true},
    hasBannerContent: {type: Boolean, default: true},
    hasBannerAccoridon: {type: Boolean, default: true},
    enableMediumHeight: {type: Boolean, default: false},
    newButton: {type: Boolean, default: false },
  },
  data() {
    return {
      bannerContentItems: this.bannerContent.items,
      anchorTageRequire: true,
      isBigScreen: true,
      sliderProps: {
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:!this.hideMobileSlider, autoplayTimeout: 5000, dots: !this.hideMobileSlider, loop: !this.hideMobileSlider, URLhashListener: false, mouseDrag: !this.hideMobileSlider, touchDrag: !this.hideMobileSlider, pullDrag: !this.hideMobileSlider, startPosition: 0}, 992:{nav:!this.hideDesktopSlider, mouseDrag: !this.hideDesktopSlider, touchDrag: !this.hideDesktopSlider, pullDrag: !this.hideDesktopSlider, dots: true, loop: !this.hideDesktopSlider, URLhashListener: true}}
      }
    }
  },
  created: function () {
    if(window.innerWidth > 991) {
      this.isBigScreen = true
    }else {
      this.isBigScreen = false
    }
  },
  computed: {
    animationClass() {
      return {
        '--animElement': this.isScrollAnimationRequire,
      }
    },
    hasAnimation() {
      return {
        '--hasAnimation': this.isScrollAnimationRequire
      }
    },
    bannerClass() {
      return {
        '--simpleBanner': !this.hasBannerContent
      }
    },
    bannerHeight() {
      return {
        '--mediumHeight': this.enableMediumHeight
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
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.--hasAnimation {
  .point {
    opacity: 0;
  }
  .active {
    .--animElement {
      opacity: 0;
    }
  }
}
.CategoryBanner {
  position: relative;
  @include block();
  .CategoryBanner--items {
    @include block();
    .CategoryBanner--imageWrapper {
      @include block(651px);
      &.--mediumHeight {
        height: 500px;
      }

      figure {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0;
        @include block(100%);
      }
      @include at-query('min-width: 1601px'){
        height: 660px;
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
      top: 35px;
      margin: 0 auto;
      z-index: 8;

      &.large-content-frame {
        max-width: calc(100% - 30px);
      }

      h2 {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: $demi;
        text-align: center;
        font-weight: 600;
        margin: 0 0 18px;
        @include fonts(45px,#202020,1,0.05em);
      }
      p {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: 500;
        margin: 0 0 28px;
        text-align: center;
        @include fonts(15px,#202020,1.46,0.05em);
        &.new-button {
          max-width: 650px;
        }
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
        &.new-button {
          border: 0 none;
          background-color: #202020;
          text-decoration: none;
          padding: 18px 72px;
          @include fonts(14px,#ffffff,1.21,0.12em);
        }
      }
    }
    &.--simpleBanner {
      .CategoryBanner--imageWrapper {
        height: 0;
        overflow: hidden;
        padding-bottom: 27.5%;
        position: relative;
        figure {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      
        &.is-category-page {
          padding-bottom: 34.4%;
        }
      }
    }
  }
  .CategoryBanner--clasification {
    width: 245px;
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: calc((100% - 1245px) / 2);
    z-index: 9;
    .point {
      &:not(:last-child) {
        margin: 0 0 20px;
      }
      p {
        font-family: $font-stack-roboto;
        font-weight: 400;
        font-size: 14px;
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
          font-size: 34px;
          margin: 0 0 12px;
        }
        p {
          font-size: 13px;
          margin: 0 0 18px;
        }
        a {
          font-size: 12px;
          &.new-button {
            padding: 14px 45px;
          }
        }
      }
      .CategoryBanner--imageWrapper {
        height: 448px;
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
  @include at-query('min-width: 992px') {
    .owl-theme {
      .owl-dots {
        opacity: 0;
        position: absolute;
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
    .CategoryBanner--items {
      .CategoryBanner--imageWrapper {
        &.--mediumHeight {
          height: 0;
          overflow: hidden;
          padding-bottom: 100%;

          figure {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    .CategoryBanner--items .CategoryBanner--content {
      max-width: 75%;
      height: calc(100% - 35px);
      h2 {
        font-size: 28px;
      }
      p {
        font-size: 11px;
      }
      a {
        &.new-button {
          padding: 12px 45px;
        }
      }
      .CarouselBannerAction {
        &.new-button {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .CategoryBanner--items .CategoryBanner--content {
      max-width: 90%;
      // padding: 0 75px;
    }
    .CategoryBanner--items .CategoryBanner--imageWrapper {
      height: calc(100vh - 220px);
    }
  }
  @include at-query('max-width: 480px') {
    .CategoryBanner--items .CategoryBanner--content {
      max-width: calc(100% - 30px);
      h2 {
        font-size: 22px;
      }
    }
  }
}
</style>


