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
          <div 
            class="--lg-hidden more-info"
            @click="displayMoreInfo($event)"
          ></div>
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

export default {
  components: {
    HeadingWithDescription,
  },
  props: {
    recentlySoldProducts: Array
  },
  data() {
    return {
      imageGridRow: this.recentlySoldProducts
    }
  },
  methods: {
    displayMoreInfo(e) {
      const targetElement = e.target.parentElement
      $(e.target).toggleClass('close')
      $(targetElement).find('.RecentlySoldProducts--overlayWrapper').toggleClass('show')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
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
    position: relative;
    background: #FFFFFF;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    .more-info {
      height: 24px;
      position: absolute;
      right: 12.5px;
      top: 11px;
      opacity: 0;
      width: 24px;
      z-index: 9;
      &::after, &::before {
        content: "";
        background-size: cover;
        background-repeat: no-repeat;
        height: 24px;
        width: 24px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      &::before {
        background-image: url('https://cdn2.shopify.com/s/files/1/2994/0144/files/icon-plus-gray_3x_643f55a3-9c52-414a-9f49-2f0e7d975fd9.png?1249665');
      }
      &::after {
        background-image: url('https://cdn2.shopify.com/s/files/1/2994/0144/files/icon-cross_2bbf5dcb-d61e-44c4-8951-b50402a548a0.png?1250475');
        width: 30px;
        height: 30px;
        left: -4px;
        top: -3px;
        opacity: 0;
        visibility: hidden;
      }
      &.close {
        &::before {
          opacity: 0;
          visibility: hidden;
        }
        &::after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    &.--animLoaded {
      pointer-events: all;
      .more-info {
        opacity: 1;
      }
      figure {
        box-shadow: inset 0.2px 0.25px 0.25px 0px #202020;
      }
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
      @include at-query('max-width: 1024px') {
        display: none;
        &.show {
          display: block;
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }
      }
      >div {
        color: #FFFFFF;
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        padding: 5px;
        transform: translate(0,-50%);
        z-index: 3;
        span {
          display: block;
          font-size: 14px;
          font-family: $font-stack-avalon;
          font-weight: 400;
          line-height: 1.21;
          letter-spacing: 0.04em;
          text-align: center;
        }
        p {
          display: block;
          font-size: 15px;
          font-family: $font-stack-avalon;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.04em;
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

  @include at-query('max-width: 1280px') {
    .RecentlySoldProducts--column figure {
      min-height: unset;
    }
  }

  @include at-query('max-width: 1024px') {
    padding: 75px 0 0;
    .RecentlySoldProducts--column-1, .RecentlySoldProducts--column-2, .RecentlySoldProducts--column-3 {
      grid-column-end: span 14;
    }
    .RecentlySoldProducts--column-1 {
      grid-column-start: 1;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-2 {
      grid-column-start: 15;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-3 {
      grid-column-start: 29;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-4 {
      grid-column-start: 1;
      grid-column-end: span 21;
      grid-row: 2/span 2;
    }
    .RecentlySoldProducts--column-5 {
      grid-column-start: 22;
      grid-column-end: -1;
      grid-row: 2/span 2;
    }
    .RecentlySoldProducts--column-6 {
      grid-column-start: 1;
      grid-column-end: span 11;
      grid-row: 4/span 1;
    }
    .RecentlySoldProducts--column-7 {
      grid-column-start: 12;
      grid-column-end: span 10;
      grid-row: 4/span 1;
    }
    .RecentlySoldProducts--column-8 {
      grid-column-start: 22;
      grid-column-end: span 10;
      grid-row: 4/span 1;
    }
    .RecentlySoldProducts--column-9 {
      grid-column-start: 32;
      grid-column-end: span 10;
      grid-row: 4/span 1;
    }
  }
  @include at-query('max-width: 767px') {
    padding: 42px 0 0;
    .RecentlySoldProducts--column  {
      .RecentlySoldProducts--overlayWrapper {
        > div {
          span {
            font-size: 10px;
            font-weight: 400;
          }
          p {
            font-size: 12px;
            font-weight: 500;
            line-height: 14px;
          }
        }
      }
    }
    .RecentlySoldProducts--column-1, .RecentlySoldProducts--column-2, .RecentlySoldProducts--column-6, .RecentlySoldProducts--column-7{
      grid-column-end: span 21;
    }
    .RecentlySoldProducts--column-1 {
      grid-column-start: 1;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-2 {
      grid-column-start: 22;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-3, .RecentlySoldProducts--column-8, .RecentlySoldProducts--column-9 {
      display: none;
    }
    .RecentlySoldProducts--column-4 {
      grid-column-start: 1;
      grid-column-end: -1;
      grid-row: 2/span 2;
    }
    .RecentlySoldProducts--column-5 {
      grid-column-start: 1;
      grid-column-end: -1;
      grid-row: 5/span 2;
    }
    .RecentlySoldProducts--column-6 {
      grid-column-start: 1;
      grid-row: 4/span 1;
    }
    .RecentlySoldProducts--column-7 {
      grid-column-start: 22;
      grid-column-end: -1;
    }
  }
}
</style>