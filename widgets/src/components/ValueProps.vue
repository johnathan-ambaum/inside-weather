<template>
  <div class="ValueProps">
    <div class="content">
      <div class="image_wrapper">
        <figure class="default" data-src="default">
          <img src='https://cdn.shopify.com/s/files/1/2994/0144/files/vprop_img1.png?748574'>
        </figure>
        <figure data-src="free-shipping">
          <img src='https://cdn.shopify.com/s/files/1/2994/0144/files/vprop_img2.png?748574'>
        </figure>
        <figure data-src="365-day-home-trial">
          <img src='https://cdn.shopify.com/s/files/1/2994/0144/files/vprop_img1.png?748574'>
        </figure>
        <figure data-src="crafted">
          <img src='https://cdn.shopify.com/s/files/1/2994/0144/files/vprop_img2.png?748574'>
        </figure>
      </div>
      <div class="descriptions">
        <h2>A better way to shop for furniture</h2>
        <div class="details">
          <div class="point">
            <h3 data-target="free-shipping">Free shipping</h3>
            <p>Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping.</p>
          </div>
          <div class="point">
            <h3 data-target="365-day-home-trial">365 Day Home Trial</h3>
            <p>Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping.</p>
          </div>
          <div class="point">
            <h3 data-target="crafted">California Crafted</h3>
            <p>Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping. Made-to-order furniture, shipped in days, because life is too short to wait. Take the stress out of furniture shopping.</p>
          </div>
        </div>
      </div>
    </div>
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
  mounted() {
    const controller = new ScrollMagic.Controller();
    const valuePropsTimeline = new TimelineLite()
    valuePropsTimeline.fromTo($('.ValueProps .image_wrapper'), 0.7, {opacity: 0, y: 20, ease: Power2.easeInOut}, {opacity: 1, y: 0})
      .fromTo($('.ValueProps .descriptions h2'), 0.9, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 0.5)
      .call(function () {
        $('.ValueProps .descriptions .details .point').each(function (i){
          var row = $(this);
          setTimeout(function() {
            TweenMax.fromTo(row, 0.5, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Power2.easeInOut}, 1);
          }, 200 * i);
        });
      })
    const valuePropsTimelineScene = new ScrollMagic.Scene({
      triggerElement: '.CategoryList ._button-wrapper',
      reverse: false
    }).setTween(valuePropsTimeline).addTo(controller);
  }
}
</script>


<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.ValuePropsWrapper {
  background: transparent;
  margin: 45px 0 0;
  padding: 0 0 70px;
  position: relative;
  &::before {
    content: "";
    background: #D4D0CA;
    height: calc(100% - 70px);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
  .--custom-container {
    position: relative;
    z-index: 2;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    .image_wrapper {
      flex-basis: 55%;
      overflow: hidden;
      position: relative;
      height: 0;
      padding-bottom: 39%;
      figure {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        overflow: hidden;
        @include block(100%);
        @include transition();
        @include translate(0,100%);
        img {
          height: 100%;
          display: block;
          object-fit: cover;
        }
        &.default {
          @include translate(0,0);
          top: auto;
          bottom: 0;
          height: 100%;
        }
        &.slide_up {
          top: auto;
          bottom: 0;
          height: 100%;
          @include translate(0,0);
          &.default {
            @include translate(0,-100%);
          }
        }
      }
    }
    .descriptions {
      flex-basis: 45%;
      padding-left: 133.4px;
      h2 {
        display: block;
        font-family: $font-stack-avalon;
        margin: 0;
        position: absolute;
        top: 130px;
        @include fonts(34px,#202020,1.2,0.04em);
      }
      .details {
        .point {
          opacity: 0;
          &:not(:last-child) {
            margin: 0 0 30px;
          }
          h3 {
            cursor: pointer;
            display: block;
            font-family: $font-stack-avalon;
            font-weight: 500;
            margin: 0;
            padding: 10px 0 10px 52px;
            position: relative;
            @include fonts(18px,#202020,1.2,0.02em);
            &::before, &::after{
              content: "";
              width: 29px;
              height: 29px;
              background-position: center;
              background-repeat: no-repeat;
              position: absolute;
              left: 0;
              top: 50%;
              @include translate(0,-50%);
            }
            &::before {
              background-image: url('https://cdn.shopify.com/s/files/1/2994/0144/files/icon-plus.png?749588');
            }
            &::after {
              opacity: 0;
              background-image: url('https://cdn.shopify.com/s/files/1/2994/0144/files/icon-cross.png?749587');
            }
          }
          &.show-details {
            h3 {
              &::before {
                opacity: 0;
              }
              &::after {
                opacity: 1;
              }
            }
          }
          p {
            display: none;
            font-family: $font-stack-avalon;
            font-weight: 500;
            margin: 0;
            padding: 0px 0 0px 52px;
            @include fonts(14px,#202020,2,0.022em);
          }
        }
      }
    }
  }
}
</style>
