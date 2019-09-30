<template>
  <div class="ReviewCarousel">
    <div class="ReviewCarousel__Title">Reviews</div>

    <!-- Review Write section -->
    <div class="ReviewCarousel__Write">
      <a
        class="ReviewCarousel__Write--Link"
        href="https://insideweather.com/pages/write-a-review"
      >
        <span class="ReviewCarousel__Write--BtnLabel">Write a Review</span>
      </a>
    </div>

    <!-- Review Items section -->
    <div
      v-if="reviewData.length > 0"
      class="ReviewCarousel__Category"
    >
      <div
        @mouseenter="updateHoverState(true)"
        @mouseleave="updateHoverState(false)"
      >
        <swiper
          ref="swiper"
          :options="swiperOption"
          @click.native="sliderClicked"
        >
          <swiper-slide
            v-for="(item, index) in reviews"
            :key="`${index}`"
          >
            <carousel-item
              :key="item.id"
              :element-id="item.id.toString()"
              :first-name="item.first_name"
              :last-name="item.last_name"
              :product-city="item.city"
              :product-state="item.state"
              :product-image="item.item_data.thumbnail_image"
              :review-date="convertDate(item.submitted_at)"
              :review-title="item.title"
              :review-content="cutoffReviewContent(item.images, item.body)"
              :is-ellipsis="getEllipsisStatus(item.images, item.body)"
              :review-images="item.images"
              :product-category="item.item_data.primary_category"
              :product-handle="item.item_data.handle"
              :star-count="item.rating"
              :set-modal-image="setModalImage"
            />
          </swiper-slide>
          <div
            slot="button-next"
            :style="styleSliderButton"
            class="swiper-button-next swiper-button"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/0144/files/swiper-next.png?342072"
              alt="Pre"
              width="18px"
              height="20px" >
          </div>
          <div
            slot="button-prev"
            :style="styleSliderButton"
            class="swiper-button-prev swiper-button"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/0144/files/swiper-prev.png?342072"
              alt="Pre"
              width="18px"
              height="20px" >
          </div>
          <div
            slot="pagination"
            class="swiper-pagination"/>
        </swiper>
      </div>
      <div class="ReviewCarousel__Read">
        <a
          class="ReviewCarousel__Read--Link"
          href="https://insideweather.com/pages/reviews">
          <span class="ReviewCarousel__Read--BtnLabel">Read All Reviews</span>
        </a>
      </div>
    </div>

    <!-- Review Modal section -->
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
  components: {
    CarouselItem,
    ReviewModal,
    Star,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    category: { type: String, required: true },
  },

  data() {
    return {
      isShowSliderButton: false,
      modalShow: false,
      modalImage: '',
      modalData: {},
      silderWidth: 0,

      swiperOption: {
        slidesPerView: 4.75,
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
          clickable: true,
        },
        on: {
          slideChange() {
          },
        },
        breakpoints: {
          405: { // when window width is <= 375px
            slidesPerView: 1.2, // 300-330
          },
          440: {
            slidesPerView: 1.3,
          },
          475: {
            slidesPerView: 1.4,
          },
          510: {
            slidesPerView: 1.5,
          },
          545: {
            slidesPerView: 1.6,
          },
          580: {
            slidesPerView: 1.7,
          },
          615: {
            slidesPerView: 1.8,
          },
          650: {
            slidesPerView: 1.9,
          },
          685: {
            slidesPerView: 2,
          },
          720: {
            slidesPerView: 2.1,
          },
          755: {
            slidesPerView: 2.2,
          },
          790: {
            slidesPerView: 2.3,
          },
          825: {
            slidesPerView: 2.4,
          },
          860: {
            slidesPerView: 2.5,
          },
          895: {
            slidesPerView: 2.6,
          },
          930: {
            slidesPerView: 2.7,
          },
          965: {
            slidesPerView: 2.8,
          },
          1023: {
            slidesPerView: 2.9,
          },
          1078: {
            slidesPerView: 2.7,
          },
          1118: {
            slidesPerView: 2.8,
          },
          1175: {
            slidesPerView: 2.9,
          },
          1194: {
            slidesPerView: 3.05,
          },
          1234: {
            slidesPerView: 3.1, //
          },
          1272: {
            slidesPerView: 3.2, //
          },
          1310: {
            slidesPerView: 3.3, //
          },
          1349: {
            slidesPerView: 3.4, //
          },
          1388: {
            slidesPerView: 3.5, //
          },
          1427: {
            slidesPerView: 3.6, //
          },
          1466: {
            slidesPerView: 3.7, //
          },
          1500: {
            slidesPerView: 3.8, //
          },
          1524: {
            slidesPerView: 3.85, //
          },
          1563: {
            slidesPerView: 3.95, // 370-379
          },
          1582: {
            slidesPerView: 4.05, // 370-374
          },
          1621: {
            slidesPerView: 4.1, // 370-378
          },
          1660: {
            slidesPerView: 4.2, // 370-378
          },
          1699: {
            slidesPerView: 4.3, // 370-378
          },
          1737: {
            slidesPerView: 4.4, // 370-378
          },
          1776: {
            slidesPerView: 4.5, // 370-378
          },
          1834: {
            slidesPerView: 4.6, // 370 - 382
          },
          1900: {
            slidesPerView: 4.75, // 370
          },
        },
      },
    };
  },

  computed: {
    ...mapState({
      // product: state => state.activeProduct,
      reviews: state => state.productReviews,
      totalReviews: state => state.totalReviews,
    }),

    styleSliderButton() {
      const showItem = {
        visibility: this.isShowSliderButton ? 'visible' : 'hidden',
      };

      return showItem;
    },

    swiper() {
      return this.$refs.swiper.swiper;
    },
  },

  watch: {
    primaryCategory(newCategory) {
      this.getProductReviews({ primaryCategory: newCategory, productFamily: this.product.product_family });
    },
    propReviews(newPropReviews) {
      this.reviewData.push(...newPropReviews);
    },
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
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
      const imgCount = reviewImages.length;
      // this.getSliderWidth();

      // const imageW = 85 + 8;

      // const allImageW = imageW * imgCount;
      // const itemClientW = this.isMobile ? this.silderWidth - 48 : this.silderWidth - 84;

      // let imageLine = 0;
      // if (allImageW === 0 ) {
      //   imageLine = 0;
      // } else if (allImageW > 0 && itemClientW > allImageW) {
      //   imageLine = 1
      // } else {
      //   imageLine = 2
      // }

      if (this.isMobile) {
        if (imgCount === 0) {
          if (reviewContent.length > 370) {
            ellipsisReviewContent = reviewContent.substring(0, 350);
          }
        } else if (imgCount < 3 && imgCount > 0) {
          if (reviewContent.length > 250) {
            ellipsisReviewContent = reviewContent.substring(0, 220);
          }
        } else if (reviewContent.length > 150) {
          ellipsisReviewContent = reviewContent.substring(0, 120);
        }
      } else if (imgCount === 0) {
        if (reviewContent.length > 420) {
          ellipsisReviewContent = reviewContent.substring(0, 390);
        }
      } else if (imgCount < 4 && imgCount > 0) {
        if (reviewContent.length > 270) {
          ellipsisReviewContent = reviewContent.substring(0, 240);
        }
      } else if (reviewContent.length > 150) {
        ellipsisReviewContent = reviewContent.substring(0, 110);
      }

      return ellipsisReviewContent;
    },

    getEllipsisStatus(reviewImages, reviewContent) {
      let isEllipsis = false;
      const imgCount = reviewImages.length;

      if (this.isMobile) {
        if (imgCount === 0) {
          if (reviewContent.length > 370) {
            isEllipsis = true;
          }
        } else if (imgCount < 3 && imgCount > 0) {
          if (reviewContent.length > 250) {
            isEllipsis = true;
          }
        } else if (reviewContent.length > 150) {
          isEllipsis = true;
        }
      } else if (imgCount === 0) {
        if (reviewContent.length > 420) {
          isEllipsis = true;
        }
      } else if (imgCount < 4 && imgCount > 0) {
        if (reviewContent.length > 270) {
          isEllipsis = true;
        }
      } else if (reviewContent.length > 150) {
        isEllipsis = true;
      }

      return isEllipsis;
    },

    sliderClicked(event) {
      let selectedItem;

      if (this.modalImage !== '') {
        if (event.target.classList.contains('CarouselItem__Right--Image')) {
          this.reviewData.forEach((item, index) => {
            item.images.forEach((img) => {
              if (img.medium.url === this.modalImage) {
                selectedItem = item;
              }
            });
          });
        }
      } else if (event.target.classList.contains('CarouselItem__Right--Readmore__Text') || event.target.classList.contains('CarouselItem__Right--Image')) {
        this.reviewData.forEach((item, index) => {
          if (event.target.classList.contains(item.id)) {
            selectedItem = item;
          }
        });
      } else if (event.target.classList.contains('CarouselItem__Left--Image')) {
        this.reviewData.forEach((item, index) => {
          if (event.target.classList.contains(item.id)) {
            window.open(`https://insideweather.com/collections/${item.item_data.primary_category}/products/${item.item_data.handle}`, '_blank');
          }
        });
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
@import '../../node_modules/swiper/dist/css/swiper.css';

.ReviewCarousel {
  margin: 0 auto;
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
