<template>
  <div>
    <div class="CarouselItem">
      <div class="CarouselItem__Left">
        <div class="CarouselItem__Left--Content">
          <div class="CarouselItem__Left--Info">
            <div class="CarouselItem__Left--Product" :style="styleReviewItem">
              <div class="CarouselItem__Left--Text CarouselItem__Left--Title" :id="elementId">{{ firstName }} {{ lastName }}</div>
              <div class="CarouselItem__Left--Checkbox" :style="styleCheckmark">
                <selected-checkbox />
              </div>
            </div>
            <div class="CarouselItem__Left--Text CarouselItem__Left--Address">{{ productCity }}, {{ productStateAbbr }}</div>
          </div>
          <div class="CarouselItem__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}"></div>
        </div>
      </div>
      <div class="CarouselItem__Right">
        <div class="CarouselItem__Right--Rectangle">
          <div class="CarouselItem__Right--Top">
            <star :star-count="starRating" class-name="CarouselItem__Right--Star" />
            <div class="CarouselItem__Right--Date">{{ convertedReviewDate }}</div>
          </div>
          <div class="CarouselItem__Right--Title">{{ reviewTitle }}</div>
          <div class="CarouselItem__Right--Content">{{ reviewContent }}</div>
          <div v-if="reviewImages.length > 0" class="CarouselItem__Right--Images">
            <div
              class="CarouselItem__Right--Image"
              v-for="(image, index) in reviewImages"
              :key="index"
              :style="{ 'background-image': 'url(' + image.url + ')'}"
               @click="handleModal(image.url)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faStar, faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  BContainer,
  BModal,
  BRow,
  BCol,
} from 'bootstrap-vue/es/components';

import SelectedCheckbox from './SelectedCheckbox.vue';
import Star from './Star.vue';
import STATE from '../static/STATE';

library.add(faStar);

export default {
  components: {
    FontAwesomeIcon,
    SelectedCheckbox,
    BContainer,
    BModal,
    BRow,
    BCol,
    Star,
  },

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
    reviewImages: { type: Array, default: [] },
    starCount: { type: String, default: '' },
  },

  data() {
    return {
      hoverState: false,
      stateData: STATE,
      starRating: parseInt(this.starCount),
      convertedReviewDate: '',
      productStateAbbr: '',
      elementHeight: 0,
    };
  },

  created() {
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.convertedReviewDate = this.convertDate(this.reviewDate);
    this.productStateAbbr = this.getAbbrState(this.productState);
  },

  methods: {
    convertDate(isoDate) {
      const date = new Date(isoDate);
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    },

    getAbbrState(us_state) {
      let state_abbreviation = '';
      this.stateData.forEach(item => {
        if (item.name === us_state) {
          state_abbreviation = item.abbreviation;
          return;
        }
      });
      return state_abbreviation;
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

  computed: {
    styleReviewItem() {
      if (this.elementHeight > 30) {
        return {
          display: 'flex',
          alignItems: 'flex-start',
        }
      } else {
        return {
          display: 'flex',
          alignItems: 'center',
        }
      }
    },
    styleCheckmark() {
      if (this.elementHeight > 30) {
        return {
          paddingTop: '7px',
        }
      } else {
        return {
          paddingTop: '0',
        }
      }
    },
  }
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.CarouselItem {
  display: flex;
  flex-direction: column;
  color: #202020;
  border: 1px solid #d4d0ca;
  padding: 42px;
  // margin: 0 9px;
  min-height: 538px;

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

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      min-width: 75px;
      height: 75px;
      border: 1px solid #d4d0ca;
    }
  }

  &__Right {
    margin: 0;
    border-left: 0;
    width: 100%;

    &--Top {
      display: flex;
      flex-flow: column-reverse;
      align-items: end;
      justify-content: space-between;
      margin-bottom: 18px;
    }

    &--Rectangle {
      padding-left: 0;
      min-height: 167px;
    }

    &--Star {
      margin-right: 10px !important;
    }

    &--Date {
      font-weight: 300;
      font-size: 14px;
      letter-spacing: 0.05em;
      padding-bottom: 18px;
    }

    &--Title {
      font-size: 18px;
      letter-spacing: 0.05em;
      line-height: 24px;
      text-align: left;
      margin-bottom: 18px;
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      line-height: 22px;
      margin-bottom: 0;
    }

    &--Images {
      display: flex;
      flex-flow: wrap;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      width: 100px;
      height: 75px;
      max-height: 75px;
      border: 1px solid #d4d0ca;
      margin-right: 18px;
      margin-top: 18px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
