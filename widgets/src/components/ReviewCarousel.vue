<template>
  <div class="ReviewCarousel">
    <div class="ReviewCarousel__Title">Reviews</div>

    <!-- Review Write section -->
    <div class="ReviewCarousel__Write">
      <a class="ReviewCarousel__Write--Link" href="https://insideweather.com/pages/write-a-review">
        <span class="ReviewCarousel__Write--BtnLabel">Write a Review</span>
      </a>
    </div>

    <!-- Review Items section -->
    <div
      class="ReviewCarousel__Category"
      v-if="reviewData.length > 0"
    >
      <div
        @mouseenter="updateHoverState(true)"
        @mouseleave="updateHoverState(false)"
      >
        <swiper
          :options="swiperOption"
          ref="swiper"
          @click.native="sliderClicked"
        >
          <swiper-slide
            v-for="(item, index) in reviewData"
            :key="`${index}`"
          >
            <carousel-item
              :key=item.id
              :element-id="item.id.toString()"
              :first-name=item.first_name
              :last-name=item.last_name
              :product-city=item.city
              :product-state=item.state
              :product-image=item.item_data.thumbnail_image
              :review-date="convertDate(item.submitted_at)"
              :review-title=item.title
              :review-content="cutoffReviewContent(item.images, item.body)"
              :is-ellipsis="getEllipsisStatus(item.images, item.body)"
              :review-images=item.images
              :product-category=item.item_data.primary_category
              :product-handle=item.item_data.handle
              :star-count=item.rating
              :set-modal-image="setModalImage"
            />
          </swiper-slide>
          <div
            class="swiper-button-next swiper-button" slot="button-next"
            :style="styleSliderButton"
          >
            <img src="https://cdn.shopify.com/s/files/1/2994/0144/files/swiper-next.png?342072" alt="Pre" width="18px" height="20px" />
          </div>
          <div
            class="swiper-button-prev swiper-button" slot="button-prev"
            :style="styleSliderButton"
          >
            <img src="https://cdn.shopify.com/s/files/1/2994/0144/files/swiper-prev.png?342072" alt="Pre" width="18px" height="20px" />
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="ReviewCarousel__Read">
        <a class="ReviewCarousel__Read--Link" href="https://insideweather.com/pages/reviews">
          <span class="ReviewCarousel__Read--BtnLabel">Read All Reviews</span>
        </a>
      </div>
    </div>
    <review-modal
      v-if="modalShow"
      :show="modalShow"
      :modal-data="modalData"
      :modal-default-image="modalImage"
      :close-modal="closeModal"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import screenMonitor from '../mixins/screenMonitor';
import CarouselItem from './CarouselItem.vue';
import ReviewModal from './ReviewModal.vue';
import Star from './Star.vue';

export default {
  mixins: [
    screenMonitor,
  ],

  components: {
    CarouselItem,
    ReviewModal,
    Star,
  },

  props: {
    primaryCategory: { type: String, default: '' },
    productFamily: { type: String, default: '' },
  },

  data() {
    return {
      reviewData: [],
      isShowSliderButton: false,
      modalShow: false,
      modalImage: '',
      modalData: {},
      silderWidth: 0,

      swiperOption: {
        slidesPerView: 4.25,
        spaceBetween: 18,
        centeredSlides: true,
        allowTouchMove: false,
        loop: true,
        watchSlidesVisibility: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          slideChange: function () {
          }
        },
        breakpoints: {
          450: { // when window width is <= 450px
            slidesPerView: 1.2,
          },
          720: {
            slidesPerView: 1.5,
          },
          900: {
            slidesPerView: 2.2,
          },
          1150: {
            slidesPerView: 2.75,
          },
          1300: {
            slidesPerView: 3.25,
          },
          1440: {
            slidesPerView: 3.75,
          },
        }
      }
    };
  },

  mounted() {
    if (this.isMobile) {
      this.swiperOption.centeredSlides = true;
      this.swiperOption.allowTouchMove = true;
    }
  },

  created() {
    if (this.isMobile) {
      this.swiperOption.centeredSlides = true;
    }
  },

  computed: {
    ...mapState({
      product: state => state.activeProduct,
      propReviews: state => state.productReviews,
      totalReviews: state => state.totalReviews,
    }),

    styleSliderButton() {
      const showItem = {
        visibility: this.isShowSliderButton ? 'visible' : 'hidden',
      };

      return showItem;
    },

    swiper() {
      return this.$refs.swiper.swiper
    }
  },

  watch: {
    primaryCategory(newCategory) {
      this.getProductReviews({ primaryCategory: newCategory, productFamily: this.product.product_family });
    },
    propReviews(newPropReviews) {
      this.reviewData.push(...newPropReviews);
    }
  },

  methods: {
    ...mapActions([
      'getProductReviews',
    ]),

    ...mapMutations([
      'updateCategory',
      'selectPanel',
    ]),

    convertDate(isoDate) {
      const date = new Date(isoDate);
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    },

    updateHoverState(isHover) {
      this.isShowSliderButton = isHover;
    },

    setModalImage(image) {
      this.modalImage = image;
    },

    getSliderWidth() {
      const screenW = this.screenWidth;
      let sliderW = 0;
      if (screenW > 1440) {
        sliderW = screenW / 4.25;
      } else if (screenW <= 1440 && screenW > 1300) {
        sliderW = screenW / 3.75;
      } else if (screenW <= 1300 && screenW > 1150) {
        sliderW = screenW / 3.25;
      } else if (screenW <= 1150 && screenW > 800) {
        sliderW = screenW / 2.75;
      } else if (screenW <= 800 && screenW > 690) {
        sliderW = screenW / 2.2;
      } else if (screenW <= 690 && screenW > 450) {
        sliderW = screenW / 1.5;
      } else if (screenW <= 450) {
        sliderW = screenW / 1.2;
      }

      this.silderWidth = sliderW - 20;
    },

    cutoffReviewContent(reviewImages, reviewContent) {
      let ellipsisReviewContent = reviewContent;
      this.getSliderWidth();

      const imgCount = reviewImages.length;
      const itemClientW = this.isMobile ? this.silderWidth - 48 : this.silderWidth - 84;
      const imageW = 85 + 8;
      const allImageW = imageW * imgCount;

      let imageLine = 0;
      if (allImageW === 0 ) {
        imageLine = 0;
      } else if (allImageW > 0 && itemClientW > allImageW) {
        imageLine = 1
      } else {
        imageLine = 2
      }

      console.log('itemClientW', itemClientW);

      if (itemClientW > 340) {
        if (imageLine === 0) {
          ellipsisReviewContent = reviewContent.substring(0, 500);
        } else if (imageLine === 1) {
          ellipsisReviewContent = reviewContent.substring(0, 380);
        } else {
          ellipsisReviewContent = reviewContent.substring(0, 230);
        }
      } else if (itemClientW <= 340 && itemClientW > 300) {
        if (imageLine === 0) {
          ellipsisReviewContent = reviewContent.substring(0, 450);
        } else if (imageLine === 1) {
          ellipsisReviewContent = reviewContent.substring(0, 320);
        } else {
          ellipsisReviewContent = reviewContent.substring(0, 190);
        }
      } else if (itemClientW <= 300 && itemClientW > 250) {
        if (imageLine === 0) {
          ellipsisReviewContent = reviewContent.substring(0, 425);
        } else if (imageLine === 1) {
          ellipsisReviewContent = reviewContent.substring(0, 280);
        } else {
          ellipsisReviewContent = reviewContent.substring(0, 160);
        }
      } else if (itemClientW <= 250 && itemClientW > 230) {
        if (imageLine === 0) {
          ellipsisReviewContent = reviewContent.substring(0, 370);
        } else if (imageLine === 1) {
          ellipsisReviewContent = reviewContent.substring(0, 250);
        } else {
          ellipsisReviewContent = reviewContent.substring(0, 160);
        }
      } else {
        if (imageLine === 0) {
          ellipsisReviewContent = reviewContent.substring(0, 360);
        } else if (imageLine === 1) {
          ellipsisReviewContent = reviewContent.substring(0, 250);
        } else {
          ellipsisReviewContent = reviewContent.substring(0, 160);
        }
      }

      return ellipsisReviewContent;
    },

    getEllipsisStatus(reviewImages, reviewContent) {
      let isEllipsis = false;

      const imgCount = reviewImages.length;
      const itemClientW = this.isMobile ? this.silderWidth - 48 : this.silderWidth - 84;
      const imageW = 85 + 8;
      const allImageW = imageW * imgCount;

     let imageLine = 0;
      if (allImageW === 0 ) {
        imageLine = 0;
      } else if (allImageW > 0 && itemClientW > allImageW) {
        imageLine = 1
      } else {
        imageLine = 2
      }

      if (itemClientW > 340) {
        if (imageLine === 0) {
          if (reviewContent.length > 500) isEllipsis = true;
        } else if (imageLine === 1) {
          if (reviewContent.length > 380) isEllipsis = true;
        } else {
          if (reviewContent.length > 230) isEllipsis = true;
        }
      } else if (itemClientW <= 340 && itemClientW > 300) {
        if (imageLine === 0) {
          if (reviewContent.length > 450) isEllipsis = true;
        } else if (imageLine === 1) {
          if (reviewContent.length > 320) isEllipsis = true;
        } else {
          if (reviewContent.length > 190) isEllipsis = true;
        }
      } else if (itemClientW <= 300 && itemClientW > 250) {
        if (imageLine === 0) {
          if (reviewContent.length > 425) isEllipsis = true;
        } else if (imageLine === 1) {
          if (reviewContent.length > 280) isEllipsis = true;
        } else {
          if (reviewContent.length > 160) isEllipsis = true;
        }
      } else if (itemClientW <= 250 && itemClientW > 230) {
        if (imageLine === 0) {
          if (reviewContent.length > 370) isEllipsis = true;
        } else if (imageLine === 1) {
          if (reviewContent.length > 250) isEllipsis = true;
        } else {
          if (reviewContent.length > 160) isEllipsis = true;
        }
      }  else {
        if (imageLine === 0) {
          if (reviewContent.length > 360) isEllipsis = true;
        } else if (imageLine === 1) {
          if (reviewContent.length > 250) isEllipsis = true;
        } else {
          if (reviewContent.length > 160) isEllipsis = true;
        }
      }

      return isEllipsis;
    },

    sliderClicked: function (event) {
      let selectedItem;

      if (event.target.classList.contains('CarouselItem__Right--Image')) {
        console.log('image clicked');
        this.reviewData.forEach((item, index) => {
          item.images.forEach(img => {
            if(img.medium.url === this.modalImage) {
              selectedItem = item;
              return;
            }
          })
        })
      }

      if (event.target.classList.contains('CarouselItem__Right--Readmore__Text')) {

        this.reviewData.forEach((item, index) => {
          if(event.target.classList.contains(item.id)) {
            selectedItem = item;
            return;
          }
        })
      }

      this.openModal(selectedItem);
    },

    openModal(item) {
      if (!item) return;
      this.modalShow = true;
      this.modalData = item;
    },

    closeModal() {
      this.modalShow = false;
      this.modalImage = '';
    },
  },
};

</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewCarousel {
  margin: 60px auto 0;
  padding: 60px 0;
  background: #f2f0ed;
  font-family: $font-stack-avalon;

  .swiper-container {
    padding: 45px 0;
  }

  .swiper-slide {
    width: 28%;
  }

  .swiper-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #e8e6e2;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;

    @include at-query($breakpoint-msmall) {
      display: none;
    }
    @include at-query($breakpoint-mlarge) {
      display: flex;
    }
  }

  .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: white;
    border: 2px solid #202020;
    opacity: 1;

    &.swiper-pagination-bullet-active {
      background: #202020;
    }
  }

  &__Category {
    margin: 0 5px;
  }

  &__Title {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-align: center;
  }

  &__Write {
    padding: 4px 0 -3px;
    text-align: center;

    &--Link {
      color: #202020;

      &:hover {
        color: #202020;
        font-weight: 700;
        text-decoration: none;
      }
    }

    &--BtnLabel {
      font-size: 13px;
      font-weight: 400;
      font-family: $font-stack-roboto;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #202020;
    }
  }

  &__Read {
    width: 240px;
    height: 48px;
    margin: 25px auto 0;
    text-align: center;
    background: white;
    border: 1px solid #202020;

    &--Link {
      display: inline-block;
      width: 100%;
      padding: 12px;
      color: #202020;
      font-weight: 600;

      &:hover {
        background: #202020;
        color: #fff;
        text-decoration: none;
      }
    }

    &--BtnLabel {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

   @include at-query($breakpoint-small) {
    margin: 0;
    padding: 0 0 24px;

    .swiper-container {
      padding: 26px 0 50px;
    }

    .swiper-pagination-bullets .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
    }

    &__Read {
      margin: 6px auto 0;
    }

    &__Title {
      font-size: 28px;
      padding: 24px 0;
      line-height: 19px;
    }

    &__Category {
      height: auto;
    }

    &__Write {
      flex-direction: column;
      line-height: 9px;

      &--Title {
        font-size: 18px;
      }

      &--Button {
        width: auto;
        height: auto;
        border: 0;
        text-align: left;
      }

      &--Link {
        padding: 0;
      }

      &--BtnLabel {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.05em;
        border-bottom: 1px solid #202020;
      }
    }
  }
}
</style>
