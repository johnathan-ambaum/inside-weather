<template>
  <b-modal
    v-if="modalImage"
    v-model="modalShow"
    hide-footer
    size="xl"
    @hidden="onHideModal">
    <template
      slot="modal-header"
      slot-scope="{ close }">
      <h5/>
      <!-- Emulate built in modal header close button action -->
      <div
        size="sm"
        variant="outline-danger"
        @click="close()">
        <img
          v-if="isMobile"
          src="https://cdn.shopify.com/s/files/1/2994/0144/files/close-white_3x_fda3deb6-ddda-4808-aaea-4968ff309aff.png?305245"
          class="ReviewModal__Close" >
        <img
          v-else
          src="https://cdn.shopify.com/s/files/1/2994/0144/files/close_3x_0b0ac7a3-5104-40a7-8fec-ff4a4cffc4a5.png?304049"
          class="ReviewModal__Close" >
      </div>
    </template>
    <b-container fluid>
      <b-row class="ReviewModalWrap">
        <b-col
          sm="12"
          lg="8"
          class="ReviewModal__ImageWrap"
        >
          <div v-if="screenWidth < 992 && modalData.images.length > 0">
            <carousel
              ref="carousel"
              :navigation-enabled="true"
              :loop="true"
              :per-page="1"
              :pagination-size="4"
              pagination-position="bottom-overlay"
              pagination-active-color="#fff"
              navigation-prev-label="<img width='12px' src='https://cdn.shopify.com/s/files/1/2994/0144/files/arrow-left_wht.png?605840' />"
              navigation-next-label="<img width='12px' src='https://cdn.shopify.com/s/files/1/2994/0144/files/arrow-right_wht.png?605840' />"
            >
              <slide
                v-for="(image, index) in modalData.images"
                :key="`${index}`">
                <div class="ReviewModal__ImageBox">
                  <div
                    :style="{ 'background-image': 'url(' + image.medium.url + ')'}"
                    class="ReviewModal__Image" />
                </div>
              </slide>
            </carousel>
          </div>
          <div
            v-else
            class="ReviewModal__ImageBox">
            <div
              :style="{ 'background-image': 'url(' + modalImage + ')'}"
              class="ReviewModal__Image" />
          </div>
        </b-col>
        <b-col
          sm="12"
          lg="4"
          class="ReviewModal__ContentBox">
          <div class="ReviewModal ReviewItem">
            <div class="ReviewModal__Left">
              <div class="ReviewModal__Left--Content">
                <div class="ReviewModal__Mobile--Right ReviewItem__Mobile--Right">
                  <div
                    :style="styleModalReviewItem"
                    class="ReviewModal__Left--Product ReviewItem__Left--Product">
                    <div
                      id="modalTitleId"
                      class="ReviewItem__Left--Text ReviewItem__Left--Title ReviewModal__Left--Title">{{ modalData.first_name }} {{ modalData.last_name }}</div>
                    <div
                      :style="styleModalCheckmark"
                      class="ReviewItem__Left--Checkbox">
                      <selected-checkbox
                        class-name="ReviewModal__Left--Checkbox"
                      />
                    </div>
                  </div>
                  <div class="ReviewModal__Left--Address ReviewItem__Left--Text ReviewItem__Left--Address">{{ modalData.city }}, {{ productStateAbbr }}</div>
                </div>
                <a
                  :href="'https://insideweather.com/collections/' + modalData.item_data.primary_category + '/products/' + modalData.item_data.handle"
                  target="_blank"
                  class="ReviewItem__Left--Link ReviewModal__Left--Link">
                  <div
                    :style="{ 'background-image': 'url(' + modalData.item_data.medium_image + ')'}"
                    class="ReviewModal__Left--Image ReviewItem__Left--Image"/>
                </a>
              </div>
            </div>
            <div class="ReviewModal__Right">
              <div class="ReviewModal__Right--Rectangle">
                <div class="ReviewModal__Right--Top ReviewItem__Right--Top">
                  <star
                    :star-count="starRating"
                    class-name="ReviewModal__Right--Star" />
                  <div class="ReviewModal__Right--Date ReviewItem__Right--Date">{{ convertedReviewDate }}</div>
                </div>
                <div class="ReviewModal__Right--Title ReviewItem__Right--Title">{{ modalData.title }}</div>
                <div class="ReviewModal__Right--Content ReviewItem__Right--Content">{{ modalData.body }}</div>
                <div
                  v-if="modalData.images.length > 0"
                  class="ReviewModal__Right--Images ReviewItem__Right--Images">
                  <div
                    v-for="(image, index) in modalData.images"
                    :key="index"
                    :style="{ 'background-image': 'url(' + image.thumb.url + ')'}"
                    class="ReviewModal__Right--Image ReviewItem__Right--Image"
                    @click="handlePopupImage(image.medium.url, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>

  <b-modal
    v-else
    v-model="modalShow"
    hide-footer
    size="sm"
    @hidden="onHideModal">
    <template
      slot="modal-header"
      slot-scope="{ close }">
      <h5/>
      <!-- Emulate built in modal header close button action -->
      <div
        size="sm"
        variant="outline-danger"
        @click="close()">
        <img
          v-if="isMobile"
          src="https://cdn.shopify.com/s/files/1/2994/0144/files/close-white_3x_fda3deb6-ddda-4808-aaea-4968ff309aff.png?305245"
          class="ReviewModal__Close" >
        <img
          v-else
          src="https://cdn.shopify.com/s/files/1/2994/0144/files/close_3x_0b0ac7a3-5104-40a7-8fec-ff4a4cffc4a5.png?304049"
          class="ReviewModal__Close" >
      </div>
    </template>
    <b-container fluid>
      <b-row class="ReviewModalWrap">
        <b-col class="ReviewModal__ContentBox">
          <div class="ReviewModal ReviewItem">
            <div class="ReviewModal__Left">
              <div class="ReviewModal__Left--Content">
                <div class="ReviewModal__Mobile--Right ReviewItem__Mobile--Right">
                  <div
                    :style="styleModalReviewItem"
                    class="ReviewModal__Left--Product ReviewItem__Left--Product">
                    <div
                      id="modalTitleId"
                      class="ReviewModal__Left--Title ReviewItem__Left--Text ReviewItem__Left--Title">{{ modalData.first_name }} {{ modalData.last_name }}</div>
                    <div
                      :style="styleModalCheckmark"
                      class="ReviewItem__Left--Checkbox">
                      <selected-checkbox
                        class-name="ReviewModal__Left--Checkbox"
                      />
                    </div>
                  </div>
                  <div class="ReviewModal__Left--Address ReviewItem__Left--Text ReviewItem__Left--Address">{{ modalData.city }}, {{ productStateAbbr }}</div>
                </div>
                <a
                  :href="'https://insideweather.com/collections/' + modalData.item_data.primary_category + '/products/' + modalData.item_data.handle"
                  target="_blank"
                  class="ReviewItem__Left--Link ReviewModal__Left--Link">
                  <div
                    :style="{ 'background-image': 'url(' + modalData.item_data.medium_image + ')'}"
                    class="ReviewModal__Left--Image ReviewItem__Left--Image"/>
                </a>
              </div>
            </div>
            <div class="ReviewModal__Right--NoImage">
              <div class="ReviewModal__Right--Rectangle">
                <div class="ReviewModal__Right--Top ReviewItem__Right--Top">
                  <star
                    :star-count="starRating"
                    class-name="ReviewModal__Right--Star" />
                  <div class="ReviewModal__Right--Date ReviewItem__Right--Date">{{ convertedReviewDate }}</div>
                </div>
                <div class="ReviewModal__Right--Title ReviewItem__Right--Title">{{ modalData.title }}</div>
                <div class="ReviewModal__Right--Content ReviewModal__Right--ContentTextOnly ReviewItem__Right--Content">{{ modalData.body }}</div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { faStar, faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Carousel, Slide } from 'vue-carousel';
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

  components: {
    FontAwesomeIcon,
    SelectedCheckbox,
    BContainer,
    BModal,
    BRow,
    BCol,
    Star,
    Carousel,
    Slide,
  },
  mixins: [
    screenMonitor,
  ],

  props: {
    show: { type: Boolean },
    modalData: { type: Object },
    modalDefaultImage: { type: String },
    closeModal: { type: Function },
  },

  data() {
    return {
      modalShow: this.show,
      modalImage: '',
      stateData: STATE,
      productStateAbbr: '',
      convertedReviewDate: '',
      starRating: parseInt(this.modalData.rating),
      modalTitleElementHeight: 0,
    };
  },

  computed: {
    // Modal style
    styleModalReviewItem() {
      if (this.modalTitleElementHeight > 30) {
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
    styleModalCheckmark() {
      if (this.modalTitleElementHeight > 30) {
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
    this.convertedReviewDate = this.convertDate(this.modalData.submitted_at);
    this.productStateAbbr = this.getAbbrState(this.modalData.state);

    if (this.modalDefaultImage) {
      this.modalImage = this.modalDefaultImage;
    } else if (this.modalData.images.length > 0) { this.modalImage = this.modalData.images[0].medium.url; } else this.modalImage = null;

    if (this.screenWidth < 992) {
      setTimeout(() => {
        this.$refs.carousel.onResize();
        this.$refs.carousel.goToPage(0);
      }, 200);
    }
  },

  methods: {
    handlePopupImage(image, index) {
      this.modalImage = image;
      if (this.screenWidth < 992) {
        this.$refs.carousel.goToPage(index);
      }
    },

    onHideModal(modalShow) {
      this.closeModal(false);
    },

    convertDate(isoDate) {
      const date = new Date(isoDate);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },

    getAbbrState(us_state) {
      let state_abbreviation = '';
      this.stateData.forEach((item) => {
        if (item.name === us_state) {
          state_abbreviation = item.abbreviation;
        }
      });
      return state_abbreviation;
    },

    handleResize() {
      this.modalTitleElementHeight = document.getElementById('modalTitleId').clientHeight;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

.VueCarousel-pagination {
  & .VueCarousel-dot {
    padding: 0 !important;
    border: 2px solid white !important;
    margin: 0 4px 15px !important;
    background-color: transparent !important;
  }

  & .VueCarousel-dot--active,
  & .VueCarousel-dot:focus {
    outline: 0 !important;
    background: white !important;
  }
}

.VueCarousel-navigation-button {
  color: white !important;
  font-size: 32px !important;
}

.VueCarousel-navigation-next {
  right: 35px !important;
}

.VueCarousel-navigation-prev {
  left: 35px !important;
}

.VueCarousel-navigation-next:focus,
.VueCarousel-navigation-prev:focus {
  outline: 0 !important;
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
  border: 0 !important;

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
      font-size: 18px !important;
    }

    &--Checkbox {
      width: 18px;
      height: 18px;
    }

    &--Address {
      margin-bottom: 0 !important;
      padding-left: 18px;
      font-weight: 400 !important;
      font-size: 18px !important;
    }

    &--Product {
      padding-left: 18px !important;
      margin-bottom: 6px !important;
    }

    &--Link {
      width: 66px !important;
    }

    &--Image {
      min-width: 66px !important;
      width: 66px !important;
      height: 66px !important;
    }
  }

  &__Right {
    margin: 0;
    padding: 0 42px 42px 25px;
    width: 100%;

    &--Rectangle {
      border-left: 0;
      min-height: 167px;
      padding-left: 0;
    }

    &--Top {
      flex-flow: column-reverse;
      align-items: flex-end !important;
      margin-bottom: 18px !important;
    }

    &--Star {
      width: 15px;
      height: 15px;
    }

    &--Date {
      padding-bottom: 18px;
      font-size: 16px !important;
    }

    &--Title {
      margin-bottom: 18px !important;
      font-size: 18px !important;
      font-weight: 600 !important;
    }

    &--Content {
      font-size: 14px !important;
      line-height: 22px !important;
      overflow-y: auto !important;
      max-height: 252px !important;
    }

    &__Images {
      margin-top: 10px !important;
    }

    &--NoImage {
      padding: 0 24px;
    }

    &--Image {
      width: 75px !important;
      height: 50px !important;
      margin: 8px 8px 0 0 !important;
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

      &--ContentTextOnly {
        max-height: 252px;
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
