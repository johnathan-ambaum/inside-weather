<template>
  <div class="SoldProducts">
    <div class="RecentlySoldProducts">
      <div class="RecentlySoldProducts--container grid--container">
        <div
          v-for="(item, index) in items"
          :key="item.$id"
          ref="products"
          v-bind:class="['RecentlySoldProducts--column column RecentlySoldProducts--column-'+ (index + 1)]"
        >
          <div
            class="--lg-hidden more-info"
            @click="toggleInfo"
          >
            <i class="more-info-trigger-icons info-icon-plus">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g id="Group_318" data-name="Group 318" transform="translate(-343 -3113)">
                  <circle id="Ellipse_9" data-name="Ellipse 9" cx="12" cy="12" r="12" transform="translate(343 3113)" fill="#efedea"/>
                  <g id="Group_57" data-name="Group 57" transform="translate(349 3119)">
                    <line id="Line_7" data-name="Line 7" y2="12" transform="translate(6)" fill="none" stroke="#7b7974" stroke-width="0.5"/>
                    <line id="Line_8" data-name="Line 8" y1="12" transform="translate(12 6) rotate(90)" fill="none" stroke="#7b7974" stroke-width="0.5"/>
                  </g>
                </g>
              </svg>
            </i>
            <i class="more-info-trigger-icons info-icon-cross">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.941 33.941">
                <g id="Group_315" data-name="Group 315" transform="translate(-2443.761 -1941.715) rotate(-45)">
                  <circle id="Ellipse_9" data-name="Ellipse 9" cx="12" cy="12" r="12" transform="translate(343 3113)" fill="none"/>
                  <g id="Group_57" data-name="Group 57" transform="translate(349 3119)">
                    <line id="Line_7" data-name="Line 7" y2="14" transform="translate(7)" fill="none" stroke="#fff" stroke-width="1"/>
                    <line id="Line_8" data-name="Line 8" y1="14" transform="translate(14 7) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                  </g>
                </g>
              </svg>
            </i>
          </div>
          <a
            :href="item.linkUrl"
            >
            <figure>
              <img :src="item.image">
            </figure>
            <div
              class="RecentlySoldProducts--overlayWrapper"
              >
              <div>
                <span>{{ item.firstName + ' ' + item.lastName }} bought</span>
                <p>{{ item.productName }}</p>
                <span>for {{ item.price }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => ([]) },
  },

  mounted() {
    const maintainSquareBox = () => {
      setTimeout(() => {
        for (let i = 0; i < this.$refs.products.length; i++) {
          const findTheCurrentWidth = this.$refs.products[i].clientWidth;
          this.$refs.products[i].querySelector('figure').style.minHeight = findTheCurrentWidth + 'px';
        }
      }, 300);
    };

    this.$nextTick(() => {
      maintainSquareBox();
      window.addEventListener('resize', maintainSquareBox);

      const controller = new ScrollMagic.Controller();
      const soldProductTimeline = new TimelineLite();

      soldProductTimeline.call(() => {
        this.$refs.products.forEach((el, i) => {
          const secondRow = el.querySelector('img');
          setTimeout(() => {
            TweenMax.fromTo(secondRow, 0.9, {opacity: 0, y: 50}, {opacity: 1, y: 0, ease: Circ.easeOut});
            if (this.$refs.products.length === (i + 1)) {
              this.$refs.products.forEach(col => col.classList.add('--animLoaded'));
            }
          }, 200 * i);
        });
      });
      const soldProductSecondScene = new ScrollMagic.Scene({
        triggerElement: '.SoldProducts',
        reverse: false,
        triggerHook: 'onEnter',
        offset: 250,
      }).setTween(soldProductTimeline).addTo(controller);
    });
  },

  methods: {
    toggleInfo(e) {
      e.target.classList.toggle('close');
      e.target.parentElement.querySelector('.RecentlySoldProducts--overlayWrapper').classList.toggle('show');
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

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
  overflow: hidden;
  .RecentlySoldProducts--column {
    position: relative;
    background: #FFFFFF;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    a {
      @include block();
    }
    .more-info {
      height: 29px;
      position: absolute;
      right: 12.5px;
      top: 11px;
      opacity: 0;
      width: 29px;
      z-index: 9;
      i {
        display: block;
        height: 100%;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        &.info-icon-cross {
          opacity: 0;
          visibility: hidden;
        }
        svg {
          display: block;
          height: 100%;
          width: 100%;
        }
      }
      &.close {
        i {
          &.info-icon-plus {
            opacity: 0;
            visibility: hidden;
          }
          &.info-icon-cross {
            opacity: 1;
            visibility: visible;
          }
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
      margin: 0;
      img {
        display: block;
        margin: 0;
        opacity: 0;
        padding: 1px;
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
    .RecentlySoldProducts--column {
      figure {
        img {
          max-width: 85%;
          max-height: 85%;
        }
      }
      .more-info {
        height: 25px;
        right: 10px;
        top: 10px;
        width: 25px;
      }
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
      figure {
        img {
          max-width: 80%;
          max-height: 80%;
        }
      }
    }
    .RecentlySoldProducts--column-1, .RecentlySoldProducts--column-2, .RecentlySoldProducts--column-9, .RecentlySoldProducts--column-7{
      grid-column-end: span 20;
    }
    .RecentlySoldProducts--column-1 {
      grid-column-start: 1;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-2 {
      grid-column-start: 21;
      grid-row: 1 / auto;
    }
    .RecentlySoldProducts--column-3 {
      grid-column-start: 1;
      grid-row: 4/span 1;
      grid-column-end: span 20;
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
      grid-row: 8/span 1;
      grid-column-end: -1;
    }

    .RecentlySoldProducts--column-7 {
      grid-column-start: 21;
      grid-column-end: -1;
      grid-row: 4/span 1;
    }
    .RecentlySoldProducts--column-8 {
      grid-column-start: 21;
      grid-column-end: -1;
      grid-row: 7/span 1;
    }
    .RecentlySoldProducts--column-9 {
      grid-column-start: 1;
      grid-row: 7/span 1;
    }
  }
}
</style>