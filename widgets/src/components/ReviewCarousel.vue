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
              :element-id="item.id + item.first_name"
              :first-name=item.first_name
              :last-name=item.last_name
              :product-city=item.city
              :product-state=item.state
              :product-image=item.item_data.medium_image
              :review-date="convertDate(item.submitted_at)"
              :review-title=item.title
              :review-content=item.body
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
        breakpoints: {
          450: { // when window width is <= 450px
            slidesPerView: 1.2,
          },
          690: {
            slidesPerView: 1.5,
          },
          768: {
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
          // 1840: {
          //   slidesPerView: 4,
          // },
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

    sliderClicked: function (event) {
      if (event.target.classList.contains('CarouselItem__Right--Image') ||
          event.target.classList.contains('CarouselItem__Right--Readmore__Text')
      ) {
        const clickedIndex = this.swiper.clickedIndex;
        const loopedSlides = this.swiper.loopedSlides;
        const realIndex = (clickedIndex - loopedSlides + 5) % 5;
        // console.log('this.swiper', this.swiper);
        // console.log('activeIndex', activeIndex);
        // console.log('realIndex', this.swiper.realIndex);
        // console.log('previousIndex', this.swiper.previousIndex);
        // console.log('snapIndex', this.swiper.snapIndex);
        // console.log('loopedSlides', loopedSlides);
        // console.log('realindex', realIndex);
        const item = this.reviewData[realIndex];
        this.openModal(item);
      }
    },

    openModal(item) {
      console.log('openmodal', item);
      if (!item) return;
      this.modalShow = true;
      this.modalData = item;
    },

    closeModal() {
      console.log('close modal');
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
