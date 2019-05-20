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
        <div class="FullReviews__Write--Title">{{ weatherTitle }}</div>
        <div class="FullReviews__Write--Star">
          <star :star-count="starCount" />
          <div class="FullReviews__Write--Number">{{ reviewNumbers }} reviews</div>
        </div>
        <div class="FullReviews__Write--Label">Shop</div>
      </div>
      <div class="FullReviews__Write--Right">
        <div class="FullReviews__Write--Button">
          <a class="FullReviews__Write--Link" href="https://insideweather.com/pages/write-a-review">
            <span class="FullReviews__Write--BtnLabel">Write Review</span>
          </a>
        </div>
      </div>
    </div>

    <div class="FullReviews__Reviewdata" v-if="reviewsData.length">
      <review-item
        v-for="item in reviewData"
        :key=item.sku
        :product-name=item.item_data.short_display_name
        :product-city=item.city
        :product-state=item.state
        :product-image=item.item_data.thumbnail_image
        :review-date=item.updated_at
        :review-title=item.title
        :review-content=item.body
        :review-images=item.images
        :star-count=item.rating
      />

      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more">End</div>
      </infinite-loading>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import CategoryItem from '../components/CategoryItem.vue';
import ReviewItem from '../components/ReviewItem.vue';
import Star from '../components/Star.vue'
import DATA from '../static/CATEGORYDATA';

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
      reviewData: this.reviewsData ? this.reviewsData : [],
      currentCategory: 'sofa',
      from: 0,
      //temp
      weatherTitle: 'Lounge Chairs',
      starCount: 4,
      reviewNumbers: 1421,
      productName: 'Sohpie',
      productAddr: 'abcd, CA',
      prouductImage: 'https://cdn.shopify.com/s/files/1/2994/0144/files/page_nav_sofette-min.png',
      reviewDate: '02/02/2019',
      reviewTitle: 'I call it my soba school',
      reviewContent: 'Love my custom dining table! Assembly was easy. I had it set up in like 3 seconds! The packaging was kinda banged up when it arrived, but no damage to the table thankfully.',
      reviewImages: [
        'https://cdn.shopify.com/s/files/1/2994/0144/files/page_nav_sofette-min.png',
        'https://cdn.shopify.com/s/files/1/2994/0144/files/page_nav_sofette-min.png',
      ],
      //...
      swiperOption: {
        slidesPerView: 6,
        pagination: {
          el: '.swiper-scrollbar',
          clickable: true,
          hide: false,
        },
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is <= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }
      }
    };
  },

  created() {
    this.$bus.$on('switch:reviewpage', (payload) => {
      console.log('-----------called---------------------------------------');
      this.currentCategory = payload.primaryCategory;
      this.from = payload.from;
      this.getReviews({ category: this.currentCategory, from: this.from, size: 20 })
    });
  },

  computed: {
    ...mapState({
      reviewsData: state => state.reviews,
    }),
  },

  methods: {
    ...mapActions([
      'getReviews',
    ]),

    ...mapMutations([
      'updateCategory',
      'selectPanel',
    ]),

    infiniteHandler($state) {
      if (!this.reviewsData.length || !this.from) {
        $state.complete();
      }

      console.log('--infinite--------------', this.from);

      this.$bus.$emit('switch:reviewpage', {
        primaryCategory: this.currentCategory,
        from: this.from,
      });

      if (this.reviewsData.length) {
        this.from += 20;
        this.reviewData.push(...this.reviewsData);
        $state.loaded();
      } else {
        $state.complete();
      }
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
    height: 162px;
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

    &--Button {
      width: 240px;
      height: 48px;
      border: 1px solid #202020;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-align: center;
    }

    &--Link {
      display: inline-block;
      width: 100%;
      padding: 14px;
    }
  }
}
</style>
