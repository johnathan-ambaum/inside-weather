<template>
  <div>
    <div class="CarouselItem">
      <div class="CarouselItem__Left">
        <div class="CarouselItem__Left--Content">
          <div class="CarouselItem__Mobile--Right">
            <div class="CarouselItem__Left--Product">
              <div class="CarouselItem__Left--Text CarouselItem__Left--Title">{{ productName }}</div>
              <div class="CarouselItem__Left--Checkbox">
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
            <star :star-count="starRating" />
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

    <b-modal v-model="modalShow" hide-footer size="xl" >
      <b-container fluid>
        <b-row>
          <b-col sm="8">
            <img :src="modalImage" class="ReviewModal__Image" />
          </b-col>
          <b-col sm="4">
            <div class="CarouselItem ReviewModal">
              <div class="CarouselItem__Left ReviewModal__Left">
                <div class="CarouselItem__Left--Content ReviewModal__Left--Content">
                  <div class="CarouselItem__Mobile--Right ReviewModal__Mobile--Right">
                    <div class="CarouselItem__Left--Product ReviewModal__Left--Product">
                      <div class="CarouselItem__Left--Text CarouselItem__Left--Title ReviewModal__Left--Title">{{ productName }}</div>
                      <div class="CarouselItem__Left--Checkbox">
                        <selected-checkbox />
                      </div>
                    </div>
                    <div class="CarouselItem__Left--Text CarouselItem__Left--Address ReviewModal__Left--Address">{{ productCity }}, {{ productStateAbbr }}</div>
                  </div>
                  <div class="CarouselItem__Left--Image ReviewModal__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}"></div>
                </div>
              </div>
              <div class="ReviewModal__Right">
                <div class="CarouselItem__Right--Rectangle ReviewModal__Right--Rectangle">
                  <div class="CarouselItem__Right--Top ReviewModal__Right--Top">
                    <star :star-count="starRating" />
                    <div class="CarouselItem__Right--Date ReviewModal__Right--Date">{{ convertedReviewDate }}</div>
                  </div>
                  <div class="CarouselItem__Right--Title ReviewModal__Right--Title">{{ reviewTitle }}</div>
                  <div class="CarouselItem__Right--Content ReviewModal__Right--Content">{{ reviewContent }}</div>
                  <div v-if="reviewImages.length > 0" class="CarouselItem__Right--Images ReviewModal__Right--Images">
                    <div
                      class="CarouselItem__Right--Image ReviewModal__Right--Image"
                      v-for="(image, index) in reviewImages"
                      :key="index"
                      :style="{ 'background-image': 'url(' + image.url + ')'}"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
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
    productName: { type: String, default: '' },
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
      modalShow: false,
      modalImage: '',
      hoverState: false,
      stateData: STATE,
      starRating: parseInt(this.starCount),
      convertedReviewDate: '',
      productStateAbbr: '',
    };
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

    handleModal(image) {
      this.modalShow = !this.modalShow;
      this.modalImage = image;
    }
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
  margin: 0 9px;
  min-height: 450px;

  &__Left {
    width: 100%;

    &--Content {
      padding-bottom: 18px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    &--Product {
      display: flex;
      align-items: center;
      margin-bottom:18px;
      padding-left: 20px;
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

    &--Address {
      font-weight: 400;
      margin-bottom: 0;
      padding-left: 20px;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      min-width: 85px;
      height: 85px;
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
      margin-right: 12px;
    }

    &--Date {
      font-weight: 400;
      font-size: 18px;
      letter-spacing: 0.05em;
      padding-bottom: 18px;
    }

    &--Title {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.05em;
      line-height: 22px;
      text-align: left;
      margin-bottom: 18px;
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 13px;
      letter-spacing: 0.03em;
      line-height: 21px;
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
      height: 80px;
      border: 1px solid #d4d0ca;
      margin-right: 18px;
      margin-top: 18px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .fa-star {
    margin-right: 12px;
  }
}

.modal-dialog .modal-body {
  padding: 0;
}

.modal-dialog .modal-content {
  border-radius: 0;
}

.modal-dialog .container-fluid {
  padding: 0;
}

.modal-dialog .modal-header {
  border-bottom: 0;
  z-index: 1000;
}

.modal-header .close {
  @include at-query($breakpoint-small) {
    color: white;
  }
}

.modal-dialog .container-fluid {
  margin-top: -57px;
}

.ReviewModal {
  flex-direction: column;
  border: 0;

  &__Image {
    border-top: 80px solid #202020;
    border-bottom: 80px solid #202020;

    @include at-query($breakpoint-small) {
      border-top: 60px solid #202020;
      border-bottom: 60px solid #202020;
    }
  }

  &__Left {
    width: 100%;

    &--Content {
      padding: 42px 24px 18px;
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

    &--Image {
      min-width: 85px;
    }
  }

  &__Right {
    margin: 0;
    padding: 0 24px 24px;
    width: 100%;

    &--Rectangle {
      border-left: 0;
      min-height: 167px;
      padding-left: 0;
    }

    &--Top {
      flex-flow: column-reverse;
      align-items: end;
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
      margin-top: 18px;
    }
  }
}
</style>
