<template>
  <div class="Press" ref="Press">
    <ul>
      <li v-for="item in PressList" :key="item.$id">
        <figure>
          <img :src="item.image">
          
        </figure>
        <span>{{item.description}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as ScrollMagic from "scrollmagic"
import { TimelineLite, TimelineMax, TweenMax} from "gsap"
import $ from 'jquery'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import gsap from 'scrollmagic'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)
export default {
  data() {
    return {
      PressList: [
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_housemethod.png?751632',
          description: 'Inside Weather is out to prove that ease and customization are not mutually exclusive.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_domino_2x_788a469b-7ccf-4ec6-a2eb-6b46463c92bb.png?751631',
          description: 'A welcome addition to the new design world of ultra simplicity.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_realsimple.png?751634',description: 'Inside Weather is out to prove that ease and customization are not mutually exclusive.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_washingtonpost.png?751634',
          description: 'A welcome addition to the new design world of ultra simplicity.'
        }
      ]   
    }
  },
  mounted() {
    const controller = new ScrollMagic.Controller();
    const pressTimeline = new TimelineLite()
    pressTimeline.fromTo($('.Press ul li'), 1,{opacity: 0, y: 20}, {opacity: 1, y: 0})
    const pressTimelineScene = new ScrollMagic.Scene({
      triggerElement: '.Press',
      reverse: false
    }).setTween(pressTimeline).addTo(controller);
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.PressContainer {
  padding: 173px 0;
  @include block();
  .press--container {
    max-width: calc(100% - (136px * 2));
    margin: auto;
    @include block();
  }
  ul {
    align-items: baseline;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 -10px;
    li {
      text-align: center;
      padding: 0 10px;
      figure {
        margin: 0 auto 20px;
        img {
          display: block;
          height: auto;
          margin: auto;
          max-height: 25px;
          width: auto;
        }
      }
      span {
        font-family: $font-stack-avalon;
        font-weight: 500;
        display: inline-block;
        @include fonts(16px,#98958F,1.18, 0.035em);
      }
    }
  }
  @include at-query('max-width: 1280px'){
    padding: 150px 0;
    .press--container {
      max-width: 100%;
      padding: 0 15px;
    }
    ul li span {
      font-size: 15px;
    }
  }
  @include at-query('max-width: 1280px') {
    padding: 100px 0;
  }
  @include at-query('max-width: 1119px') {
    ul {
      align-items: center;
      flex-wrap: wrap;
      margin: 0 -20px;

      li {
        flex-basis: 45%;
        margin: 0 0 50px;
        span {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    ul {
      flex-direction: column;
      li {
        flex-basis: unset;
        max-width: 500px;
        max-resolution: 0 0 80px;
        &:last-child {
          display: none;
        }
      }
    }
  }
}
</style>
