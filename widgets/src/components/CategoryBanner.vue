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
            v-bind:style="{ backgroundImage: 'url('+ item.image +')' }"
          >
          </figure>
        </div>
        <div class="CategoryBanner--content">
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
    categoryBannerAccordion: Array
  },
  data() {
    return {
      bannerContentItems: this.bannerContent.items,
      categoryAccordion: this.categoryBannerAccordion,
      anchorTageRequire: true,
      sliderProps: {
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{nav:false, autoplayTimeout: 5000},1025:{nav:!this.hideDesktopSlider, autoplayTimeout: 5000, mouseDrag: !this.hideDesktopSlider, touchDrag: !this.hideDesktopSlider, pullDrag: !this.hideDesktopSlider, dots: !this.hideDesktopSlider, loop: !this.hideDesktopSlider, URLhashListener: true}}
      }
    }
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
    display: inline-block;
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
  }

}
</style>


