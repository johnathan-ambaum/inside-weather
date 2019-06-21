<template>
  <b-modal v-model="modalShow" v-if="modalImage" @hidden="onHideModal" hide-footer size="xl">
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
                    <div class="ReviewItem__Left--Text ReviewItem__Left--Title ReviewModal__Left--Title" id="modalTitleId">{{ modalData.first_name }} {{ modalData.last_name }}</div>
                    <div class="ReviewItem__Left--Checkbox" :style="styleModalCheckmark">
                      <selected-checkbox
                        class-name="ReviewModal__Left--Checkbox"
                      />
                    </div>
                  </div>
                  <div class="ReviewItem__Left--Text ReviewItem__Left--Address ReviewModal__Left--Address">{{ modalData.city }}, {{ productStateAbbr }}</div>
                </div>
                <a :href="'https://insideweather.com/collections/' + modalData.item_data.primary_category + '/products/' + modalData.item_data.handle" target="_blank" class="ReviewItem__Left--Link ReviewModal__Left--Link">
                  <div class="ReviewItem__Left--Image ReviewModal__Left--Image" :style="{ 'background-image': 'url(' + modalData.item_data.medium_image + ')'}"></div>
                </a>
              </div>
            </div>
            <div class="ReviewModal__Right">
              <div class="ReviewItem__Right--Rectangle ReviewModal__Right--Rectangle">
                <div class="ReviewItem__Right--Top ReviewModal__Right--Top">
                  <star :star-count="starRating" class-name="ReviewModal__Right--Star" />
                  <div class="ReviewItem__Right--Date ReviewModal__Right--Date">{{ convertedReviewDate }}</div>
                </div>
                <div class="ReviewItem__Right--Title ReviewModal__Right--Title">{{ modalData.title }}</div>
                <div class="ReviewItem__Right--Content ReviewModal__Right--Content">{{ modalData.body }}</div>
                <div v-if="modalData.images.length > 0" class="ReviewItem__Right--Images ReviewModal__Right--Images">
                  <div
                    class="ReviewItem__Right--Image ReviewModal__Right--Image"
                    v-for="(image, index) in modalData.images"
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

  <b-modal v-model="modalShow" v-else @hidden="onHideModal" hide-footer size="sm">
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
                    <div class="ReviewItem__Left--Text ReviewItem__Left--Title ReviewModal__Left--Title" id="modalTitleId">{{ modalData.first_name }} {{ modalData.last_name }}</div>
                    <div class="ReviewItem__Left--Checkbox" :style="styleModalCheckmark">
                      <selected-checkbox
                        class-name="ReviewModal__Left--Checkbox"
                      />
                    </div>
                  </div>
                  <div class="ReviewItem__Left--Text ReviewItem__Left--Address ReviewModal__Left--Address">{{ modalData.city }}, {{ productStateAbbr }}</div>
                </div>
                <a :href="'https://insideweather.com/collections/' + modalData.item_data.primary_category + '/products/' + modalData.item_data.handle" target="_blank" class="ReviewItem__Left--Link ReviewModal__Left--Link">
                  <div class="ReviewItem__Left--Image ReviewModal__Left--Image" :style="{ 'background-image': 'url(' + modalData.item_data.medium_image + ')'}"></div>
                </a>
              </div>
            </div>
            <div class="ReviewModal__Right ReviewModal__Right--Small">
              <div class="ReviewItem__Right--Rectangle ReviewModal__Right--Rectangle">
                <div class="ReviewItem__Right--Top ReviewModal__Right--Top">
                  <star :star-count="starRating" class-name="ReviewModal__Right--Star" />
                  <div class="ReviewItem__Right--Date ReviewModal__Right--Date">{{ convertedReviewDate }}</div>
                </div>
                <div class="ReviewItem__Right--Title ReviewModal__Right--Title">{{ modalData.title }}</div>
                <div class="ReviewItem__Right--Content ReviewModal__Right--Content">{{ modalData.body }}</div>
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

  created() {
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.convertedReviewDate = this.convertDate(this.modalData.submitted_at);
    this.productStateAbbr = this.getAbbrState(this.modalData.state);
    console.log('--modaldefaultimage', this.modalDefaultImage);

    if (this.modalDefaultImage) {
      this.modalImage = this.modalDefaultImage;
    } else {
      if (this.modalData.images.length > 0)
        this.modalImage = this.modalData.images[0].url;
      else this.modalImage = null;
    }
  },

  computed: {
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
    handlePopupImage(image) {
      this.modalImage = image;
    },

    onHideModal(modalShow) {
      console.log('onhide modal');
      this.closeModal(false);
    },

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

    handleResize() {
      this.modalTitleElementHeight = document.getElementById('modalTitleId').clientHeight;
    },
  },
};
</script>

<style lang="scss">

</style>
