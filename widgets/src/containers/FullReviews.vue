<template>
  <div class="FullReviews">
    <div class="FullReviews__Title">Check the Weather</div>
    <div class="FullReviews__Subtitle">We’ve got high standards and we do everything we can to uphold them. But we’re obviously biased. So don’t take our word for it; read reviews from real people who have customized and purchased their own Inside Weather.</div>

    <div class="FullReviews__Category">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in categoryItemData" :key="item.key">
          <category-item
            :category-image="item.image"
            :category-label="item.text"
            :category-color="item.hoverColor"
            :category-link="item.key"
          />
        </swiper-slide>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
    </div>

    <div class="FullReviews__Write">
      <div class="FullReviews__Write--Left">
        <div class="FullReviews__Write--Mobileleft">
          <div class="FullReviews__Write--Title">{{ weatherTitle }}</div>
          <div class="FullReviews__Write--Star">
            <star :star-count="starCount" />
            <div class="FullReviews__Write--Number">{{ totalReviews }} reviews</div>
          </div>
        </div>
        <div class="FullReviews__Write--Shop">
          <span class="FullReviews__Write--Label">Shop</span>
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

    <div class="FullReviews__Reviewdata" v-if="reviewData.length">
      <review-item
        v-for="(item, index) in reviewData"
        :key=index
        :product-name=item.item_data.short_display_name
        :product-city=item.city
        :product-state=item.state
        :product-image=item.item_data.thumbnail_image
        :review-date=item.updated_at
        :review-title=item.title
        :review-content=item.body
        :review-images=item.images
        :star-count=item.rating
        :temp-number=index
      />

      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" style="padding-bottom: 20px;">No more Data</div>
      </infinite-loading>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import ApiClient from '../util/ApiClient';
import CategoryItem from '../components/CategoryItem.vue';
import ReviewItem from '../components/ReviewItem.vue';
import Star from '../components/Star.vue'
import DATA from '../static/CATEGORYDATA';

const apiClient = new ApiClient();
const REVIEW_LOAD_SIZE = 20;

export default {
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
      from: 1,
      starCount: 5,
      currentCategory: DATA[0].key,
      reviewData: [],

      swiperOption: {
        slidesPerView: 6,
        centeredSlides: true,
        centerInsufficientSlides: true,
        pagination: {
          el: '.swiper-scrollbar',
          clickable: true,
          hide: false,
        },
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 2,
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 4,
          }
        }
      }
    };
  },

  mounted() {
    this.loadMore(this.currentCategory, this.from);
  },

  created() {
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
    height: 164px;
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

      &:hover {
        background: #202020;
        color: #fff;
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
    }

    &__Write {
      flex-direction: column;

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
