<template>
  <div>
    <div class="ReviewItem">
      <div class="ReviewItem__Left">
        <div class="ReviewItem__Left--Content">
          <div class="ReviewItem__Mobile--Right">
            <div :style="styleReviewItem" class="ReviewItem__Left--Product">
              <div :id="elementId" class="ReviewItem__Left--Text ReviewItem__Left--Title">{{ reviewData.first_name }} {{ reviewData.last_name }}</div>
              <div :style="styleCheckmark" class="ReviewItem__Left--Checkbox">
                <selected-checkbox />
              </div>
            </div>
            <div class="ReviewItem__Left--Text ReviewItem__Left--Address">{{ reviewData.city }}, {{ productStateAbbr }}</div>
          </div>
          <a :href="'https://insideweather.com/collections/' + reviewData.item_data.primary_category + '/products/' + reviewData.item_data.handle" 
target="_blank" class="ReviewItem__Left--Link">
            <div :style="{ 'background-image': 'url(' + reviewData.item_data.medium_image + ')'}" class="ReviewItem__Left--Image" />
          </a>
        </div>
      </div>
      <div class="ReviewItem__Right">
        <div class="ReviewItem__Right--Rectangle">
          <div class="ReviewItem__Right--Top">
            <star :star-count="starRating" />
            <div class="ReviewItem__Right--Date">{{ convertedReviewDate }}</div>
          </div>
          <div class="ReviewItem__Right--Title">{{ reviewData.title }}</div>
          <div class="ReviewItem__Right--Content">{{ reviewData.body }}</div>
          <div v-if="reviewData.images.length > 0" 
class="ReviewItem__Right--Images">
            <div
              v-for="(image, index) in reviewData.images"
              class="ReviewItem__Right--Image"
              :key="index"
              :style="{ 'background-image': 'url(' + image.thumb.url + ')'}"
              @click="handleModal(image.medium.url)"
            />
          </div>
        </div>
      </div>
    </div>

    <review-modal
      v-if="modalShow"
      :show="modalShow"
      :modal-data="reviewData"
      :modal-default-image="modalImage"
      :close-modal="closeModal"
    />
  </div>
</template>

<script>
import { faStar, faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  BContainer,
  BRow,
  BCol,
} from 'bootstrap-vue/es/components';

import screenMonitor from '../mixins/screenMonitor';
import SelectedCheckbox from './SelectedCheckbox.vue';
import ReviewModal from './ReviewModal.vue';
import Star from './Star.vue';
import STATE from '../static/STATE';

library.add(faStar);

export default {

  components: {
    FontAwesomeIcon,
    SelectedCheckbox,
    BContainer,
    ReviewModal,
    BRow,
    BCol,
    Star,
  },
  mixins: [
    screenMonitor,
  ],

  props: {
    reviewData: { type: Object, default: {} },
  },

  data() {
    return {
      modalShow: false,
      modalImage: '',
      hoverState: false,
      stateData: STATE,
      starRating: parseInt(this.reviewData.rating),
      convertedReviewDate: '',
      productStateAbbr: '',
      elementId: this.reviewData.id.toString(),
      elementHeight: 0,
    };
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
  },

  created() {
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.convertedReviewDate = this.convertDate(this.reviewData.submitted_at);
    this.productStateAbbr = this.getAbbrState(this.reviewData.state);

    const id = this.elementId;
    this.getElementSize(id);
  },

  methods: {
    convertDate(isoDate) {
      const date = new Date(isoDate);
      return `${date.getMonth() + 1  }/${  date.getDate()  }/${  date.getFullYear()}`;
    },

    getAbbrState(us_state) {
      let state_abbreviation = '';
      this.stateData.forEach((item) => {
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

    handleModal(image) {
      this.modalShow = !this.modalShow;
      this.modalImage = image;
    },

    closeModal() {
      this.modalShow = false;
      this.modalImage = '';
    },

    handlePopupImage(image) {
      this.modalImage = image;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewItem {
  display: flex;
  color: #202020;
  border: 1px solid #d4d0ca;
  margin-bottom: 24px;

  &__Left {
    width: 28%;

    &--Content {
      padding: 46px 68px 46px 84px;
    }

    &--Product {
      display: flex;
      margin-bottom: 12px;
    }

    &--Checkbox {
      padding-top: 0;
    }

    &--Text {
      font-size: 16px;
      letter-spacing: 0.05em;
    }

    &--Title {
      font-weight: 600;
      padding-right: 16px;
    }

    &--Address {
      font-weight: 400;
      margin-bottom: 32px;
    }

    &--Link {
      display: inline-block;
      width: 85px;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      width: 85px;
      height: 85px;
      border: 1px solid #d4d0ca;
    }
  }

  &__Right {
    margin: 46px 84px 46px 0;
    width: 72%;
    border-left: 1px solid #d4d0ca;

    &--Top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    &--Rectangle {
      padding-left: 68px;
      min-height: 167px;
    }

    &--Star {
      margin-right: 12px;
    }

    &--Date {
      font-weight: 400;
      font-size: 18px;
      letter-spacing: 0.05em;
    }

    &--Title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.05em;
      line-height: 24px;
      text-align: left;
      margin-bottom: 24px;
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      line-height: 22px;
    }

    &--Content::-webkit-scrollbar {
      width: 10px;
    }

    &--Content::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &--Content::-webkit-scrollbar-thumb {
      background: #888;
    }

    &--Content::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    &--Images {
      display: flex;
      flex-flow: wrap;
      margin-top: 10px;
    }

    &--Image {
      width: 100px;
      height: 75px;
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
    flex-direction: column;

    &__Left {
      width: 100%;

      &--Content {
        padding: 24px 24px 18px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: flex-end;
      }

      &--Title {
        letter-spacing: 0.05em;
      }

      &--Address {
        margin-bottom: 0;
        padding-left: 20px;
      }

      &--Product {
        padding-left: 20px;
      }

      &--Link {
        width: 66px;
      }

      &--Image {
        max-width: 66px;
        height: 66px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &__Right {
      margin: 0;
      padding: 0 24px 24px;
      border-left: 0;
      width: 100%;

      &--Rectangle {
        min-height: 167px;
        padding-left: 0;
      }

      &--Top {
        flex-flow: column-reverse;
        align-items: flex-end;
        margin-bottom: 18px;
      }

      &--Date {
        padding-bottom: 18px;
      }

      &--Title {
        margin-bottom: 18px;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
      }

      &--Content {
        font-size: 13px;
        line-height: 21px;
        margin-bottom: 0;
      }

      &--Image {
        width: 75px;
        height: 50px;
      }
    }
  }

  .fa-star {
    margin-right: 12px;
  }
}
</style>
