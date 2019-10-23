<template>
  <div>
    <div class="CarouselItem">
      <div class="CarouselItem__Left">
        <div class="CarouselItem__Left--Content">
          <div class="CarouselItem__Left--Info">
            <div
              :style="styleReviewItem"
              class="CarouselItem__Left--Product">
              <div
                :id="elementId"
                class="CarouselItem__Left--Text CarouselItem__Left--Title">{{ firstName }} {{ lastName }}</div>
              <div
                :style="styleCheckmark"
                class="CarouselItem__Left--Checkbox">
                <selected-checkbox />
              </div>
            </div>
            <div class="CarouselItem__Left--Text CarouselItem__Left--Address">{{ productCity }}, {{ productStateAbbr }}</div>
          </div>
          <!-- <a :href="'https://insideweather.com/collections/' + productCategory + '/products/' + productHandle" target="_blank" class="CarouselItem__Left--Link"> -->
          <div
            :style="{ 'background-image': 'url(' + productImage + ')'}"
            :class="elementId"
            class="CarouselItem__Left--Image" />
            <!-- </a> -->
        </div>
      </div>
      <div class="CarouselItem__Right">
        <div class="CarouselItem__Right--Rectangle">
          <div class="CarouselItem__Right--Top">
            <star
              :star-count="starRating"
              class-name="CarouselItem__Right--Star" />
            <div class="CarouselItem__Right--Date">{{ reviewDate }}</div>
          </div>
          <div class="CarouselItem__Right--Title">{{ reviewTitle }}</div>

          <div
            :class="{'CarouselItem__Right--EllipsisContent': isEllipsis }"
            class="CarouselItem__Right--Content">
            {{ reviewContent }}
          </div>

          <div
            v-if="isEllipsis"
            class="CarouselItem__Right--Readmore">
            <span
              :class="elementId"
              class="CarouselItem__Right--Readmore__Text"
            >
              Continue Reading
            </span>
          </div>

          <div
            v-if="reviewImages.length > 0"
            class="CarouselItem__Right--Images">
            <div
              v-for="(image, index) in reviewImages"
              :key="index"
              :class="elementId"
              :style="{ 'background-image': 'url(' + image.thumb.url + ')' }"
              class="CarouselItem__Right--Image"
              @click="setModalImage(image.medium.url)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faStar } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import screenMonitor from '../mixins/screenMonitor';
import SelectedCheckbox from './SelectedCheckbox.vue';
import Star from './Star.vue';
import STATE from '../static/STATE';

library.add(faStar);

export default {

  components: {
    FontAwesomeIcon,
    SelectedCheckbox,
    Star,
  },
  mixins: [
    screenMonitor,
  ],

  props: {
    elementId: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    productCity: { type: String, default: '' },
    productState: { type: String, default: '' },
    productImage: { type: String, default: '' },
    reviewDate: { type: String, default: '' },
    reviewTitle: { type: String, default: '' },
    reviewContent: { type: String, default: '' },
    isEllipsis: { type: Boolean, default: false },
    reviewImages: { type: Array, default: () => [] },
    starCount: { type: String, default: '' },
    productCategory: { type: String, default: '' },
    productHandle: { type: String, default: '' },
    setModalImage: { type: Function, default: () => {} },
  },

  data() {
    return {
      hoverState: false,
      stateData: STATE,
      starRating: parseInt(this.starCount, 10),
      productStateAbbr: '',
      elementHeight: 0,
      reviewContentHeight: 0,
      reviewContentOnlyTextHeight: 0,
      // ellipsisReviewContent: this.reviewContent,
      reviewContentClassName: '',
    };
  },

  computed: {
    styleReviewItem() {
      if (this.elementHeight > 30) {
        return {
          display: 'flex',
          alignItems: 'flex-start',
        };
      }
      return {
        display: 'flex',
        alignItems: 'center',
      };
    },
    styleCheckmark() {
      if (this.elementHeight > 30) {
        return {
          paddingTop: '7px',
        };
      }
      return {
        paddingTop: '0',
      };
    },
  },

  created() {
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.productStateAbbr = this.getAbbrState(this.productState);

    const id = this.elementId;
    this.getElementSize(id);
  },

  methods: {
    getAbbrState(state) {
      const { abbreviation = '' } = this.stateData.find(item => item.name === state) || {};
      return abbreviation;
    },

    getElementSize(id) {
      if (id) {
        this.elementHeight = document.getElementById(id).clientHeight;
      }
    },

    handleResize() {
      const id = this.elementId;
      this.getElementSize(id);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.CarouselItem {
  display: flex;
  flex-direction: column;
  color: #202020;
  background: white;
  border: 1px solid #d4d0ca;
  padding: 42px;
  min-height: 600px;
  position: relative;

  &__Left {
    width: 100%;

    &--Content {
      padding-bottom: 18px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    &--Info {
      padding-left: 18px;
    }

    &--Product {
      display: flex;
      padding-bottom: 6px;
    }


    &--Address {
      font-weight: 400;
      margin-bottom: 0;
    }

    &--Text {
      font-size: 18px;
      letter-spacing: 0.05em;
    }

    &--Title {
      font-weight: 600;
      padding-right: 16px;
      letter-spacing: 0.05em;
    }

    &--Link {
      display: inline-block;
      width: 75px;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      min-width: 75px;
      height: 75px;
      border: 1px solid #d4d0ca;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__Right {
    margin: 0;
    border-left: 0;
    width: 100%;

    &--Top {
      display: flex;
      flex-flow: column-reverse;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 18px;
    }

    &--Rectangle {
      padding-left: 0;
      min-height: 167px;
    }

    &--Star {
      & + & {
        margin-left: 10px !important;
      }
    }

    &--Date {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.05em;
      padding-bottom: 18px;
    }

    &--Title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-align: left;
      margin-bottom: 18px;
    }

    &--EllipsisContent::after {
      position: relative;
      box-sizing: content-box;
      content: "\02026";
      transform: translateX(-100%);
      right: 0;
      text-align: right;
      background: linear-gradient(to right, rgba(255,255,255,0), #fff 50%, #fff);
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      line-height: 22px;
    }

    &--Readmore {
      margin-top: 10px;
      line-height: 12px;

      &:hover {
        cursor: pointer;
      }

      &__Text {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        color: #202020;
        border-bottom: 1px solid #202020;
        padding-bottom: 1px;
      }
    }

    &--Images {
      display: flex;
      flex-flow: wrap;
      margin-top: 10px;
    }

    &--Image {
      width: 85px;
      height: 60px;
      margin: 8px 8px 0 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border: 1px solid #d4d0ca;

      &:hover {
        cursor: pointer;
      }
    }
  }

  @include at-query($breakpoint-small) {
    padding: 24px;
    min-height: 545px;

    &__Left {
      &--Image {
        min-width: 66px;
        height: 66px;
      }

      &--Text {
        font-size: 16px;
        font-weight: 400;
      }

       &--Title {
        padding-right: 16px;
        font-weight: 600;
      }

      &--Link {
        width: 66px;
      }

      &--Product {
        padding-bottom: 4px;
      }
    }

    &__Right {
      &--Date {
        font-weight: 400;
        line-height: 12px;
      }

      &--Title {
        font-size: 16px;
      }

      &--ContentWrap {
        font-size: 13px;
      }

      &--Readmore {
        margin-top: 12px;
      }

      &--Images {
        bottom: 24px;
      }
    }
  }
}
</style>
