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
    <div class="ReviewCarousel__Category">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in reviewData" :key="index">
          <carousel-item
            :key=index
            :element-id=item.updated_at
            :first-name=item.first_name
            :last-name=item.last_name
            :product-city=item.city
            :product-state=item.state
            :product-image=item.item_data.medium_image
            :review-date=item.updated_at
            :review-title=item.title
            :review-content=item.body
            :review-images=item.images
            :star-count=item.rating
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="ReviewCarousel__Read">
        <a class="ReviewCarousel__Read--Link" href="https://insideweather.com/pages/reviews">
          <span class="ReviewCarousel__Read--BtnLabel">Read All Reviews</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import screenMonitor from '../mixins/screenMonitor';
import CarouselItem from './CarouselItem.vue';
import Star from './Star.vue';

export default {
  mixins: [
    screenMonitor,
  ],

  components: {
    CarouselItem,
    Star,
  },

  props: {
    primaryCategory: { type: String, default: '' },
    productFamily: { type: String, default: '' },
  },

  data() {
    return {
      reviewData: [],

      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 18,
        slidesPerGroup: 3,
        // centeredSlides: true,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        onSlideChangeEnd: function() {
          this.onSwipe();
        },

        breakpoints: {
          368: { // when window width is <= 320px
            slidesPerView: 1,
          },
          736: {
            slidesPerView: 1.2,
          },
          // 1154: {
          //   slidesPerView: 2,
          // },
          // 1512: {
          //   slidesPerView: 3,
          // },
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
  },

  watch: {
    primaryCategory(newCategory) {
      console.log('--watch--', newCategory, this.product.product_family);
      this.getProductReviews({ primaryCategory: newCategory, productFamily: this.product.product_family });
    },
    propReviews(newPropReviews) {
      console.log('--popreviews--', newPropReviews);
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
  },
};

</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewCarousel {
  margin: 60px auto;
  font-family: $font-stack-avalon;

  .swiper-container {
    padding-bottom: 45px;
  }

  .swiper-slide {
    width: 28%;
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

  &__Title {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-align: center;
  }

  &__Write {
    padding: 18px 0 42px;
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
      font-weight: normal;
      font-family: $font-stack-roboto;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #202020;
    }
  }

  &__Read {
    width: 240px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px auto 0;
    text-align: center;
    border: 1px solid #202020;

    &--Link {
      font-weight: 600;

      &:hover {
        font-weight: 700;
        text-decoration: none;
      }
    }

    &--BtnLabel {
      font-size: 14px;
      color: #202020;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

   @include at-query($breakpoint-small) {
    margin: 0 16px;

    &__Title {
      font-size: 24px;
      padding: 30px 0 18px 0;
    }

    &__Category {
      height: auto;
    }

    &__Write {
      flex-direction: column;

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
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-bottom: 1px solid #202020;
      }
    }
  }
}
</style>
