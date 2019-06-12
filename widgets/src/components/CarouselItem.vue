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
          <a :href="'https://insideweather.com/collections/' + productCategory + '/products/' + productHandle" target="_blank" class="ReviewItem__Left--Link ReviewModal__Left--Link">
            <div class="CarouselItem__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}" />
          </a>
        </div>
      </div>
      <div class="CarouselItem__Right">
        <div class="CarouselItem__Right--Rectangle">
          <div class="CarouselItem__Right--Top">
            <star :star-count="starRating" class-name="CarouselItem__Right--Star" />
            <div class="CarouselItem__Right--Date">{{ convertedReviewDate }}</div>
          </div>
          <div class="CarouselItem__Right--Title">{{ reviewTitle }}</div>
          <div v-if="reviewImages.length > 0" class="CarouselItem__Right--ContentWrap" :id="elementId + 'review'">
            {{ reviewContent }}
          </div>
          <div v-else class="CarouselItem__Right--ContentWrapOnlyText" :id="elementId + 'reviewtext'">
            {{ reviewContent }}
          </div>
          <div v-if="reviewContentHeight > 139 || reviewContentOnlyTextHeight > 199" class="CarouselItem__Right--Readmore">
            <span
              class="CarouselItem__Right--Readmore__Text"
              @click="handleModal(firstReviewImage)"
            >
              Continue Reading
            </span>
          </div>
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

    <b-modal v-model="modalShow" v-if="modalImage" hide-footer size="xl">
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
            <div :style="{ 'background-image': 'url(' + modalImage + ')'}" class="ReviewModal__Image" />
            </div>
          </b-col>
          <b-col sm="12" lg="4" class="ReviewModal__ContentBox">
            <div class="ReviewItem ReviewModal">
              <div class="ReviewItem__Left ReviewModal__Left">
                <div class="ReviewItem__Left--Content ReviewModal__Left--Content">
                  <div class="ReviewItem__Mobile--Right ReviewModal__Mobile--Right">
                    <div class="ReviewItem__Left--Product ReviewModal__Left--Product" :style="styleModalReviewItem">
                      <div class="ReviewItem__Left--Text ReviewItem__Left--Title ReviewModal__Left--Title" id="imageModalTitleId">{{ firstName }} {{ lastName }}</div>
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

    <!-- no image modal -->
    <b-modal v-model="modalShow" v-else hide-footer size="sm">
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
          <b-col class="ReviewModal__ContentBox">
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
              <div class="ReviewModal__Right ReviewModal__Right--Small">
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
      firstReviewImage: '',
      hoverState: false,
      stateData: STATE,
      starRating: parseInt(this.starCount),
      convertedReviewDate: '',
      productStateAbbr: '',
      elementHeight: 0,
      reviewContentHeight: 0,
      reviewContentOnlyTextHeight: 0,
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
    this.firstReviewImage = this.reviewImages.length ? this.reviewImages[0].url : '';

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
      if (this.reviewImages.length > 0) {
        this.reviewContentHeight = document.getElementById(id + 'review').offsetHeight;
      } else {
        this.reviewContentOnlyTextHeight = document.getElementById(id + 'reviewtext').offsetHeight;
      }
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
      if (this.modalImage) {
        this.getModalTitleElementSize('imageModalTitleId');
      } else {
        this.getModalTitleElementSize('modalTitleId');
      }
    },

    handleModal(image) {
      this.modalShow = !this.modalShow;
      this.modalImage = image;
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

.CarouselItem {
  display: flex;
  flex-direction: column;
  color: #202020;
  background: white;
  border: 1px solid #d4d0ca;
  padding: 42px;
  min-height: 560px;
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

    &--ContentWrap {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      @include multiLineEllipsis($lineHeight: 20px, $lineCount: 7, $bgColor: white);
    }

    &--ContentWrapOnlyText {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      @include multiLineEllipsis($lineHeight: 20px, $lineCount: 10, $bgColor: white);
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      line-height: 22px;
      margin-bottom: 0;
      word-break: break-all;
      position: relative;
      display: block;
      max-height: 9em;
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
    padding: 24px;
    min-height: 478px;

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

      &--Image {
        width: 75px;
        height: 50px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
