<template>
  <div>
    <div class="ReviewItem">
      <div class="ReviewItem__Left">
        <div class="ReviewItem__Left--Content">
          <div class="ReviewItem__Mobile--Right">
            <div class="ReviewItem__Left--Product" :style="styleReviewItem">
              <div class="ReviewItem__Left--Text ReviewItem__Left--Title" :id="elementId">{{ firstName }} {{ lastName }}</div>
              <div class="ReviewItem__Left--Checkbox" :style="styleCheckmark">
                <selected-checkbox />
              </div>
            </div>
            <div class="ReviewItem__Left--Text ReviewItem__Left--Address">{{ productCity }}, {{ productStateAbbr }}</div>
          </div>
          <a :href="'https://insideweather.com/collections/' + productCategory + '/products/' + productHandle" target="_blank" class="ReviewItem__Left--Link">
            <div class="ReviewItem__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}" />
          </a>
        </div>
      </div>
      <div class="ReviewItem__Right">
        <div class="ReviewItem__Right--Rectangle">
          <div class="ReviewItem__Right--Top">
            <star :star-count="starRating" />
            <div class="ReviewItem__Right--Date">{{ convertedReviewDate }}</div>
          </div>
          <div class="ReviewItem__Right--Title">{{ reviewTitle }}</div>
          <div class="ReviewItem__Right--Content">{{ reviewContent }}</div>
          <div v-if="reviewImages.length > 0" class="ReviewItem__Right--Images">
            <div
              class="ReviewItem__Right--Image"
              v-for="(image, index) in reviewImages"
              :key="index"
              :style="{ 'background-image': 'url(' + image.url + ')'}"
              @click="handleModal(image.url)"
            />
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" hide-footer size="xl">
      <template slot="modal-header" slot-scope="{ close }">
        <h5></h5>
        <!-- Emulate built in modal header close button action -->
        <div size="sm" variant="outline-danger" @click="close()">
          <img v-if="isMobile" src="https://cdn.shopify.com/s/files/1/2994/0144/files/close-white_3x_fda3deb6-ddda-4808-aaea-4968ff309aff.png?305245" class="ReviewModal__Close" />
          <img v-else src="https://cdn.shopify.com/s/files/1/2994/0144/files/close_3x_0b0ac7a3-5104-40a7-8fec-ff4a4cffc4a5.png?304049" class="ReviewModal__Close" />
        </div>
      </template>
      <b-container fluid>
        <b-row class="ReviewModalWrap">
          <b-col
            sm="12"
            lg="8"
            class="ReviewModal__ImageWrap"
          >
            <div class="ReviewModal__ImageBox">
              <!-- <img :src="modalImage" class="ReviewModal__Image" /> -->
              <div :style="{ 'background-image': 'url(' + modalImage + ')'}" class="ReviewModal__Image" />
            </div>
          </b-col>
          <b-col sm="12" lg="4" class="ReviewModal__ContentBox">
            <div class="ReviewItem ReviewModal">
              <div class="ReviewItem__Left ReviewModal__Left">
                <div class="ReviewItem__Left--Content ReviewModal__Left--Content">
                  <div class="ReviewItem__Mobile--Right ReviewModal__Mobile--Right">
                    <div class="ReviewItem__Left--Product ReviewModal__Left--Product" :style="styleModalReviewItem">
                      <div class="ReviewItem__Left--Text ReviewItem__Left--Title ReviewModal__Left--Title" id="modalTitleId">{{ firstName }} {{ lastName }}</div>
                      <div class="ReviewItem__Left--Checkbox" :style="styleModalCheckmark">
                        <selected-checkbox
                          class-name="ReviewModal__Left--Checkbox"
                        />
                      </div>
                    </div>
                    <div class="ReviewItem__Left--Text ReviewItem__Left--Address ReviewModal__Left--Address">{{ productCity }}, {{ productStateAbbr }}</div>
                  </div>
                  <a :href="'https://insideweather.com/collections/' + productCategory + '/products/' + productHandle" target="_blank" class="ReviewItem__Left--Link ReviewModal__Left--Link">
                    <div class="ReviewItem__Left--Image ReviewModal__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}"></div>
                  </a>
                </div>
              </div>
              <div class="ReviewModal__Right">
                <div class="ReviewItem__Right--Rectangle ReviewModal__Right--Rectangle">
                  <div class="ReviewItem__Right--Top ReviewModal__Right--Top">
                    <star :star-count="starRating" class-name="ReviewModal__Right--Star" />
                    <div class="ReviewItem__Right--Date ReviewModal__Right--Date">{{ convertedReviewDate }}</div>
                  </div>
                  <div class="ReviewItem__Right--Title ReviewModal__Right--Title">{{ reviewTitle }}</div>
                  <div class="ReviewItem__Right--Content ReviewModal__Right--Content">{{ reviewContent }}</div>
                  <div v-if="reviewImages.length > 0" class="ReviewItem__Right--Images ReviewModal__Right--Images">
                    <div
                      class="ReviewItem__Right--Image ReviewModal__Right--Image"
                      v-for="(image, index) in reviewImages"
                      :key="index"
                      :style="{ 'background-image': 'url(' + image.url + ')'}"
                      @click="handlePopupImage(image.url)"
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

import screenMonitor from '../mixins/screenMonitor';
import SelectedCheckbox from './SelectedCheckbox.vue';
import Star from './Star.vue';
import STATE from '../static/STATE';

library.add(faStar);

export default {
  mixins: [
    screenMonitor,
  ],

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
    productCategory: { type: String, default: '' },
    productHandle: { type: String, default: '' },
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
      elementHeight: 0,
      modalTitleElementHeight: 0,
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

    const id = this.elementId;
    this.getElementSize(id);
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
    // Modal style
    styleModalReviewItem() {
      if (this.modalTitleElementHeight > 30) {
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
    styleModalCheckmark() {
      if (this.modalTitleElementHeight > 30) {
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

    getModalTitleElementSize(id) {
      if (id) {
        this.modalTitleElementHeight = document.getElementById(id).clientHeight;
      }
    },

    handleResize() {
      const id = this.elementId;
      this.getElementSize(id);
      this.getModalTitleElementSize('modalTitleId')
    },

    handleModal(image) {
      this.modalShow = !this.modalShow;
      this.modalImage = image;
    },

    handlePopupImage(image) {
      this.modalImage = image;
    },
  }
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
        width: 75px;
        height: 50px;
      }
    }
  }

  .fa-star {
    margin-right: 12px;
  }
}

.modal-dialog.modal-xl {
  @include at-query($breakpoint-large) {
    max-width: 1000px;
  }

  @include at-query($breakpoint-small) {
    margin: 50px auto;
  }

  @include at-query("max-width: 576px") {
    margin: 50px 24px;
  }
}

.modal-dialog.modal-sm {
  @include at-query($breakpoint-small) {
    margin: 50px auto;
  }

  @include at-query("max-width: 576px") {
    margin: 50px 24px;
  }
}

.modal-dialog .modal-body {
  padding: 0;
}

.modal-dialog .modal-content {
  max-width: 1000px;
  height: 630px;
  border: none;
  border-radius: 0;

  @include at-query($breakpoint-small) {
    height: 100%;
  }
}

.modal-dialog .container-fluid {
  padding: 0;
  margin-top: -40px;

  @include at-query($breakpoint-small) {
    margin-top: -40px;
    margin-top: 0;
  }
}

.modal-dialog .modal-header {
  border-bottom: 0;
  z-index: 1000;
  padding: 0.5rem 0.7rem;

  @include at-query($breakpoint-small) {
    margin-top: -40px;

    // & > div {
    //   margin: -8px -20px 0 0;
    // }
  }
}

.modal-header .close {
  @include at-query($breakpoint-small) {
    color: white;
  }
}

.ReviewModalWrap {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ReviewModal {
  flex-direction: column;
  font-family: $font-stack-avalon;
  border: 0;

  &__Close {
    width: 16px;
    height: 16px;

    &:hover {
      cursor: pointer;
    }
  }

  &__ImageWrap {
    padding-right: 17px !important;
    padding-left: 0 !important;
  }

  &__ContentBox {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  &__ImageBox {
    background: #202020;
  }

  &__Image {
    width: 100%;
    height: 630px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  &__Left {
    width: 100%;

    &--Content {
      padding: 42px 42px 18px 25px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    &--Title {
      font-size: 18px;
      letter-spacing: 0.05em;
    }

    &--Checkbox {
      width: 18px;
      height: 18px;
    }

    &--Address {
      margin-bottom: 0;
      padding-left: 18px;
      font-weight: 400;
      font-size: 18px;
    }

    &--Product {
      padding-left: 18px;
      margin-bottom: 6px;
    }

    &--Link {
      width: 66px;
    }

    &--Image {
      min-width: 66px;
      width: 66px;
      height: 66px;
    }
  }

  &__Right {
    margin: 0;
    padding: 0 42px 42px 25px;
    width: 100%;

    &--Small {
      padding: 0 42px 42px;
    }

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

    &--Star {
      width: 15px;
      height: 15px;
    }

    &--Date {
      padding-bottom: 18px;
      font-size: 16px;
    }

    &--Title {
      margin-bottom: 18px;
      font-size: 18px;
      font-weight: 600;
    }

    &--Content {
      font-size: 14px;
      line-height: 22px;
      overflow-y: auto;
      max-height: 272px;
    }

    &__Images {
      margin-top: 10px;
    }

    &--Image {
      width: 75px;
      height: 50px;
      margin: 8px 8px 0 0;
    }
  }

  // Review Modal Mobile Layout
  @include at-query($breakpoint-small) {
    &__Close {
      width: 14px;
      height: 14px;
    }

    &__ImageWrap {
      padding-right: 0 !important;
      padding-left: 0 !important;
    }

    // &__ImageBox {
    //   position: relative;
    //   width: 100%;
    //   padding-top: 100%;
    // }

    &__Image {
      width: 100%;
      padding-bottom: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    &__Left {
      &--Content {
        padding: 24px 24px 18px;
      }

      &--Title {
        font-size: 16px;
      }

      &--Address {
        padding-left: 20px;
        font-size: 16px;
      }

       &--Product {
        padding-left: 20px;
      }
    }

    &__Right {
      padding: 0 24px;

      &--Date {
        font-size: 14px;
      }

      &--Title {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
      }

      &--Content {
        font-size: 13px;
        line-height: 21px;
        max-height: 147px;
      }
    }
  }


  @include at-query("max-width: 991px") {
    &__Image {
      height: 315px;
    }
  }
}
</style>
