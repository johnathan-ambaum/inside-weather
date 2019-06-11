<template>
  <div class="FullReviews">
    <div class="FullReviews__Title">Check the Weather</div>
    <div class="FullReviews__Subtitle">We’ve got high standards and we do everything we can to uphold them. But we’re obviously biased. So don’t take our word for it; read reviews from real people who have customized and purchased their own Inside Weather.</div>

    <!-- Category Swiper section -->
    <div v-if="isMobile" class="FullReviews__Category">
      <swiper :options="swiperOption" ref="mySwiper" @click.native="sliderClicked">
        <swiper-slide v-for="(item, index) in categoryItemData" :key="item.key">
          <category-item
            :category-image="item.image"
            :category-label="item.text"
            :category-color="item.hoverColor"
            :category-link="item.key"
            :is-active="activeIndex === index"
          />
        </swiper-slide>
        <!-- <div class="swiper-pagination"></div> -->
      </swiper>
    </div>
    <div v-else class="FullReviews__Category">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in categoryItemData" :key="item.key">
          <category-item
            :category-image="item.image"
            :category-label="item.text"
            :category-color="item.hoverColor"
            :category-link="item.key"
          />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Review Write section -->
    <div class="FullReviews__Write">
      <div class="FullReviews__Write--Left">
        <div class="FullReviews__Write--Mobileleft">
          <div class="FullReviews__Write--Title">{{ weatherTitle }}</div>
          <div class="FullReviews__Write--Star">
            <star :star-count="starCount" />
            <div class="FullReviews__Write--Number">{{ totalReviews }} reviews</div>
          </div>
        </div>
      </div>
      <div class="FullReviews__Write--Right">
        <div class="FullReviews__Write--Button">
          <a class="FullReviews__Write--Link" href="https://insideweather.com/pages/write-a-review">
            <span class="FullReviews__Write--BtnLabel">Write a Review</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Review Items section -->
    <div class="FullReviews__Reviewdata" v-if="reviewData.length">
      <review-item
        v-for="(item, index) in reviewData"
        :key=index
        :element-id=item.submitted_at
        :first-name=item.first_name
        :last-name=item.last_name
        :product-city=item.city
        :product-state=item.state
        :product-image=item.item_data.medium_image
        :review-date=item.submitted_at
        :review-title=item.title
        :review-content=item.body
        :review-images=item.images
        :star-count=item.rating
        :product-category=item.item_data.primary_category
        :product-handle=item.item_data.handle
      />
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" style="padding-bottom: 20px;"></div>
        <div slot="no-results" style="padding-bottom: 20px;"></div>
      </infinite-loading>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';

import screenMonitor from '../mixins/screenMonitor';
import CategoryItem from '../components/CategoryItem.vue';
import ReviewItem from '../components/ReviewItem.vue';
import ApiClient from '../util/ApiClient';
import Star from '../components/Star.vue';
import DATA from '../static/CATEGORYDATA';

const apiClient = new ApiClient();
const REVIEW_LOAD_SIZE = 20;

export default {
  mixins: [
    screenMonitor,
  ],

  components: {
    InfiniteLoading,
    CategoryItem,
    ReviewItem,
    Star,
  },

  data() {
    return {
      categoryItemData: DATA,
      weatherTitle: DATA[0].text,
      currentCategory: DATA[0].key,
      from: 1,
      starCount: 5,
      activeIndex: 0,
      reviewData: [],

      swiperOption: {
        slidesPerView: 6,
        centeredSlides: false, //this.isMobile ? true : false,
        allowSlidePrev: false,
        allowSlideNext: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          hide: false,
        },
        breakpoints: {
          320: { // when window width is <= 320px
            slidesPerView: 2,
          },
          400: { // when window width is <= 640px
            slidesPerView: 4,
          },
          825: {
            slidesPerView: 4,
          },
          960: {
            slidesPerView: 5,
          }
        }
      }
    };
  },

  mounted() {
    this.loadMore(this.currentCategory, this.from);
  },

  created() {
    if (this.isMobile) {
      this.swiperOption.allowSlidePrev = true;
      this.swiperOption.allowSlideNext = true;
    }
    this.$bus.$on('switch:reviewpage', (payload) => {
      this.from = payload.from;
      this.setCurrentCategory(payload.primaryCategory);

      if (this.from === 1) {
        this.reviewData = [];
      }

      // Get current selected category title.
      this.categoryItemData.forEach(item => {
        if (item.key === this.currentCategory) {
          this.weatherTitle = item.text;
        }
      });

      // Call api to get review data.
      this.getReviews({ category: this.currentCategory, from: this.from, size: REVIEW_LOAD_SIZE });
    });
  },

  computed: {
    ...mapState({
      propReviews: state => state.reviews,
      totalReviews: state => state.totalReviews,
    }),

    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },

  watch: {
    propReviews(newPropReviews) {
      this.reviewData.push(...newPropReviews);
      this.from += 1;
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

    sliderClicked(e) {
      this.activeIndex = this.swiper.clickedIndex;
      this.swiper.slideTo(this.activeIndex, 300);
    },

    loadMore(category, from) {
      this.$bus.$emit('switch:reviewpage', {
        primaryCategory: category,
        from: from,
      });
    },

    setCurrentCategory(category) {
      this.currentCategory = category;
    },

    infiniteHandler($state) {
      if (this.from === 1) return;

      apiClient
        .getReviews(this.currentCategory, this.from, REVIEW_LOAD_SIZE)
        .then((results) => {
          if (results.reviews.length) {
            this.from += 1;
            this.reviewData.push(...results.reviews);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};

</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.FullReviews {
  max-width: 1312px;
  margin: 0 auto;
  font-family: $font-stack-avalon;

  .swiper-container {
    .swiper-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      @include at-query($breakpoint-small) {
        justify-content: flex-start;
      }
    }

    .swiper-slide {
      @include at-query($breakpoint-large) {
        width: 115px !important;
        margin: 0 25px;
      }

      @include at-query($breakpoint-small) {
        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  @include at-query("max-width: 1392px") {
    margin: 0 $gutter;
  }

  &__Title {
    font-size: 44px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 46px 0 32px 0;
    text-transform: uppercase;
    text-align: center;
  }

  &__Subtitle {
    font-family: $font-stack-roboto;
    font-size: 13px;
    letter-spacing: 0.05em;
    line-height: 18px;
    text-align: center;
    padding-bottom: 46px;
    max-width: 992px;
    margin: 0 auto;
  }

  &__Category {
    border-bottom: 1px solid #d4d0ca;
    height: 158px;
  }

  &__Write {
    padding: 46px 0 36px;
    display: flex;
    justify-content: space-between;

    &--Title {
      font-weight: 600;
      font-size: 28px;
      letter-spacing: 0.05em;
      margin-bottom: 18px;
    }

    &--Star {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
    }

    &--Number {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.05em;
      margin-left: 4px;
    }

    &--Label {
      font-size: 14px;
      letter-spacing: 0.08em;
      border-bottom: 1px solid #202020;
      text-transform: uppercase;
    }

    &--Button {
      width: 240px;
      height: 48px;
      border: 1px solid #202020;
      text-align: center;
    }

    &--Link {
      display: inline-block;
      width: 100%;
      padding: 12px;
      color: #202020;

      &:hover {
        background: #202020;
        color: #fff;
        text-decoration: none;
      }
    }

    &--BtnLabel {
      font-size: 14px;
      letter-spacing: 0.08em;
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  @include at-query($breakpoint-small) {
    margin: 0 16px;

    &__Title {
      font-size: 24px;
      padding: 30px 0 18px 0;
    }

    &__Subtitle {
      font-size: 12px;
      padding-bottom: 40px;
    }

    &__Category {
      height: auto;
      margin: 0 4px;

      &::after {
        left: 0;
        width: 100%;
        content: " ";
        display: block;
        position:absolute;
        border-bottom: 1px solid #d4d0ca;
      }
    }

    &__Write {
      flex-direction: column;
      padding: 40px 0 36px;

      &--Left {
        display: flex;
        justify-content: space-between;
      }

      &--Title {
        font-size: 18px;
      }

      &--Number {
        font-size: 13px;
      }

      &--Label {
        font-size: 12px;
        letter-spacing: 0.05em;
        font-weight: 600;
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
