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
            :product-name=item.item_data.short_display_name
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
      </swiper>
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

  data() {
    return {
      reviewData: [],

      swiperOption: {
        currentCategory: 'armchairs',
        slidesPerView: 3,
        centeredSlides: false,// this.isMobile ? true : false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          hide: false,
        },
        onSlideChangeEnd: function() {
          this.onSwipe();
        },

        breakpoints: {
          320: { // when window width is <= 320px
            slidesPerView: 1,
          },
          640: { // when window width is <= 640px
            slidesPerView: 1,
          }
        }
      }
    };
  },

  mounted() {
    this.loadMore(this.currentCategory, this.from);
    if (this.isMobile) {
      this.swiperOption.centeredSlides = true;
      this.swiper.on('slideChange',()=>{
        this.onSwipe(this)
      });
    }
  },

  created() {
    if (this.isMobile) {
      // this.swiperOption.centeredSlides = true;
    }

    this.getReviews({ category: this.currentCategory, from: this.from, size: 20 });
  },

  computed: {
    ...mapState({
      propReviews: state => state.reviews,
      totalReviews: state => state.totalReviews,
    }),

    swiper() {
      // return this.$refs.mySwiper.swiper
    },
  },

  watch: {
    propReviews(newPropReviews) {
      this.reviewData.push(...newPropReviews);
    }
  },

  methods: {
    ...mapActions([
      'getReviews',
    ]),

    ...mapMutations([
      'updateCategory',
      'selectPanel',
    ]),

    onSwipe(varuable) {
    },

    loadMore(category, from) {
      this.$bus.$emit('switch:reviewpage', {
        primaryCategory: category,
        from: from,
      });
    },
  },
};

</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewCarousel {
  max-width: 1312px;
  margin: 60px;
  font-family: $font-stack-avalon;

  // @include at-query("max-width: 1392px") {
  //   margin: 0 $gutter;
  // }

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
      font-size: 12px;
      font-weight: 600;
      font-family: $font-stack-roboto;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #202020;
    }
  }

  &__Category {
    // height: 164px;
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
