<template>
  <div class="SoldProducts --pd-t-130" ref="SoldProducts">
    <div class="heading">
      <heading-with-description>
        <h2>Recently Sold</h2>
        <p>Made-to-order furniture, shipped in days, because life is too short to wait.</p>
      </heading-with-description>
    </div>
    <div 
      class="RecentlySoldProducts" 
      ref="RecentlySoldProducts"
      >
      <div 
        class="RecentlySoldProducts--container grid--container"
        >
        <div 
          v-for="(items, index) in imageGridRow" 
          :key="items.$id" 
          v-bind:class="['RecentlySoldProducts--column column RecentlySoldProducts--column-'+ (index + 1)]"
          >
          <figure>
            <img :src="items.picture">
          </figure>
          <div 
            class="RecentlySoldProducts--overlayWrapper"
            >
            <div>
              <span>{{items.userFirstName + ' ' + items.userSecondName}} bought</span>
              <p>{{items.productName}}</p>
              <span>for {{items.price}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingWithDescription from './HeadingWithDescription.vue'
import * as ScrollMagic from "scrollmagic"
import { TimelineLite, TimelineMax, TweenMax} from "gsap"
import $ from 'jquery'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import gsap from 'scrollmagic'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

export default {
  components: {
    HeadingWithDescription,
  },
  data() {
    return {
      imageGridRow: [
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-1.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-2.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-3.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-4.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-5.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-6.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-7.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-8.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        },
        {
          picture: 'https://cdn.shopify.com/s/files/1/2994/0144/files/product-9.png?744727', userFirstName:'Sara',
          userSecondName:'F',
          productName:'Mod Velvet Powell Sofa in Jade Green',
          price:'$1198'
        }
      ]
    }
  },
  mounted() {
    const controller = new ScrollMagic.Controller();
    const productTimeline = new TimelineLite()
      productTimeline.fromTo($('.SoldProducts .heading h2'), 0.7, {opacity: 0, y: 20}, {opacity: 1, y: 0})
        .fromTo($('.SoldProducts .heading  p'), 0.7, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.5)
        .call(function(){
          $('.RecentlySoldProducts .RecentlySoldProducts--column').each(function (i) {
            var row = $(this).find('img');
            setTimeout(function () {
              TweenMax.fromTo(row, 0.5, {opacity: 0, y: 20}, {opacity: 1, y: 0});
              if($('.RecentlySoldProducts .RecentlySoldProducts--column').length === (i + 1)) {
                $('.RecentlySoldProducts .RecentlySoldProducts--column').addClass('--animLoaded');
              }
            }, 200 * i)
          });
        })
      const productScene = new ScrollMagic.Scene({
        triggerElement: '.SoldProducts',
        reverse: false
      }).setTween(productTimeline).addTo(controller);
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.grid--container {
  display: grid;
  grid-template-columns: repeat(var(--cells),1fr);
  grid-auto-rows: minmax(max-content, var(--cellSize));
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  margin: auto;
  
  .column {
    display: initial;
    position: initial;
    top: initial;
    width: initial;
    padding-left: initial;
    margin: initial;
    grid-row: auto / auto;
  }
}
.RecentlySoldProducts {
  padding: 100px 0 0;
  .RecentlySoldProducts--column {
    padding: 1.2px 0 0px 1px;
    position: relative;
    background: #FFFFFF;
    pointer-events: none;
    transition: all 0.3s ease-in-out;

    &.--animLoaded {
      background: rgba(32, 32, 32, 0.3);
      pointer-events: all;
    }
    figure {
      align-items: center;
      background: #FFFFFF;
      display: flex;
      height: 100%;
      justify-content: center;
      min-height: 320px;
      img {
        display: block;
        margin: 0;
        opacity: 0;
      }
    }
    .RecentlySoldProducts--overlayWrapper {
      width: 100%;
      height: 100%;
      background: rgba($color: #202020, $alpha: 0.52);
      opacity: 0;
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: all 0.3s ease-in-out;
      visibility: hidden;
      z-index: 2;

      >div {
        color: #FFFFFF;
        font-family: $font-stack-avalon;
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translate(0,-50%);
        z-index: 3;
        span {
          display: block;
          font-size: 14px;
          line-height: 1.21;
          letter-spacing: 0.035em;
          text-align: center;
        }
        p {
          display: block;
          font-size: 15px;
          line-height: 1.2;
          letter-spacing: 0.035em;
          margin: 0;
          padding: 11.6px 0 14.7px;
          text-align: center;
        }
      }
    }
    &:hover {
      .RecentlySoldProducts--overlayWrapper {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
    }
  }
  .RecentlySoldProducts--column-1, .RecentlySoldProducts--column-2, .RecentlySoldProducts--column-3, .RecentlySoldProducts--column-6, .RecentlySoldProducts--column-7, .RecentlySoldProducts--column-8, .RecentlySoldProducts--column-9 {
    grid-column-end: span 8;
  }
  .RecentlySoldProducts--column-1 {
    grid-column-start: 1;
    grid-row: 1 / auto;
  }
  .RecentlySoldProducts--column-2 {
    grid-column-start: 9;
    grid-row: 1 / auto;
  }
  .RecentlySoldProducts--column-3 {
    grid-column-start: 17;
    grid-row: 1 / auto;
  }
  .RecentlySoldProducts--column-4 {
    grid-column-start: 25;
    grid-column-end: -1;
    grid-row: 1 / span 2;
  }
  .RecentlySoldProducts--column-5 {
    grid-column-start: 1;
    grid-column-end: span 16;
    grid-row: 2 / span 2;
  }
  .RecentlySoldProducts--column-6 {
    grid-column-start: 17;
    grid-row: 2 / span 1;
  }
  .RecentlySoldProducts--column-7 {
    grid-column-start: 17;
    grid-row: 3 / span 1;
  }
  .RecentlySoldProducts--column-8 {
    grid-column-start: 25;
  }
  .RecentlySoldProducts--column-9 {
    grid-column-start: 33;
  }
}
</style>
