<template>
  <div 
    class="Banner" 
    ref="Banner"
  >
    <div
      :class="bannerClass"
      class="Banner__wrapper"
      v-bind:style="{ backgroundImage: 'url(' + bannerImageUrl + ')' }"
    >
      <div class="Banner__content">
        <h2>Get professional help</h2>
        <p>First Class Service. I’m able to purchase exactly what I want without falling short of my dreams.</p>
        <link-button btnText="Send an sos" linkTo="./" stroke="white" />
      </div>
    </div>
  </div>
</template>

<script>
import LinkButton from './LinkButton.vue'
import * as ScrollMagic from "scrollmagic"
import { TimelineLite, TimelineMax, TweenMax} from "gsap"
import $ from 'jquery'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import gsap from 'scrollmagic'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

export default {
  components: {
    LinkButton
  },
  props: {
    hasOverlay: {type: Boolean, default: true},
    fillColor: {type: String, default: 'white'},
    bannerImage: String
  },
  data() {
    return {
      bannerImageUrl: this.$attrs.bannerimage
    }
  },
  methods: {
    bannerClass() {
      return {
        'Banner--hideOverlay': !this.hasOverlay,
        'Banner--darkColor': this.fillColor === 'black'
      }
    }
  },
  mounted() {
    const controller = new ScrollMagic.Controller();
    const bannerTimeline = new TimelineLite();
    bannerTimeline.fromTo($('.Banner .Banner__wrapper'), 0.8, {opacity: 0, scale: 1.05}, {opacity: 1, scale: 1})
      .fromTo($('.Banner .Banner__wrapper .Banner__content h2'), 1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.5)
      .fromTo($('.Banner .Banner__wrapper .Banner__content p'), 1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.5)
      .fromTo($('.Banner .Banner__wrapper .Banner__content ._button-wrapper'), 1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.5)
    const bannerScene = new ScrollMagic.Scene({
      triggerElement: '.ReviewCarouselWrapper .owl-item.active .Review__content',
      reverse: false
    }).setTween(bannerTimeline).addTo(controller);
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.Banner {
  display: block;
  height: auto;
  width: 100%;
  .Banner__wrapper {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: auto;
    position: relative;
    width: 100%;
    &::after {
      content: "";
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba($color: #202020, $alpha: 0.1);
      width: 100%;
    }
    .Banner__content {
      display: block;
      font-family: $font-stack-avalon;
      height: auto;
      max-width: 458px;
      margin: 0 auto;
      padding: 145px 0;
      position: relative;
      width: 100%;
      z-index: 2;
      text-align: center;
      h2 {
        color: #ffffff;
        display: block;
        font-size: 34px;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.05em;
        margin: 0 0 16px;
      }
      p {
        color: #ffffff;
        display: block;
        font-size: 14px;
        letter-spacing: 0.035em;
        line-height: 1.57;
        margin: 0 0 46.5px;
      }
    }
    &.Banner--darkColor {
      .Banner__content {
        h2, p {
          color: #000;
        }
      }
    }
  }
}
</style>
