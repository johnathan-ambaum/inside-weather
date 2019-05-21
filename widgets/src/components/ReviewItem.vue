<template>
  <div class="ReviewItem">
    <div class="ReviewItem__Left">
      <div class="ReviewItem__Left--Content">
        <div class="ReviewItem__Left--Product">
          <div class="ReviewItem__Left--Text ReviewItem__Left--Title">{{ productName }}</div>
          <div class="ReviewItem__Left--Checkbox">
            <selected-checkbox />
          </div>
        </div>
        <div class="ReviewItem__Left--Text ReviewItem__Left--Address">{{ productCity }}, {{ productState }}</div>
        <div class="ReviewItem__Left--Image" :style="{ 'background-image': 'url(' + productImage + ')'}"></div>
      </div>
    </div>
    <div class="ReviewItem__Right">
      <div class="ReviewItem__Right--Rectangle">
        <div class="ReviewItem__Right--Top">
          <star :star-count="starRating" />
          <div class="ReviewItem__Right--Date">{{ convertedReviewDate }}</div>
        </div>
        <div class="ReviewItem__Right--Title">{{ reviewTitle }}</div>
        <div class="ReviewItem__Right--Content">{{ reviewContent }}</div>
        <div v-if="reviewImages.length > 0" class="ReviewItem__Right--Images">
          <div
            class="ReviewItem__Right--Image"
            v-for="(image, index) in reviewImages"
            :key="index"
            :style="{ 'background-image': 'url(' + image.url + ')'}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SelectedCheckbox from './SelectedCheckbox.vue';
import Star from './Star.vue';

library.add(faStar);

export default {
  components: {
    FontAwesomeIcon,
    SelectedCheckbox,
    Star,
  },

  props: {
    productName: { type: String, default: '' },
    productCity: { type: String, default: '' },
    productState: { type: String, default: '' },
    productImage: { type: String, default: '' },
    reviewDate: { type: String, default: '' },
    reviewTitle: { type: String, default: '' },
    reviewContent: { type: String, default: '' },
    reviewImages: { type: Array, default: [] },
    starCount: { type: String, default: '' },
  },

  data() {
    return {
      hoverState: false,
      starRating: parseInt(this.starCount),
      convertedReviewDate: this.convertDate(this.reviewDate),
    };
  },

  methods: {
    convertDate(isoDate) {
      const date = new Date(isoDate);
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
  }
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewItem {
  display: flex;
  color: #202020;
  border: 1px solid #d4d0ca;
  margin-bottom: 24px;

  &__Left {
    width: 40%;

    &--Content {
      padding: 46px 68px 0 84px;
    }

    &--Product {
      display: flex;
      align-items: center;
      margin-bottom:18px;
    }

    &--Text {
      font-size: 18px;
      letter-spacing: 0.05em;
    }

    &--Title {
      font-weight: 600;
      padding-right: 16px;
    }

    &--Address {
      font-weight: 400;
      margin-bottom: 32px;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      width: 85px;
      height: 85px;
      border: 1px solid #d4d0ca;
    }
  }

  &__Right {
    margin: 46px 84px 46px 0;
    width: 100%;

    &--Top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    &--Rectangle {
      padding-left: 68px;
      border-left: 1px solid #d4d0ca;
      min-height: 167px;
    }

    &--Star {
      margin-right: 12px;
    }

    &--Date {
      font-weight: 400;
      font-size: 18px;
      letter-spacing: 0.05em;
    }

    &--Title {
      font-size: 18px;
      letter-spacing: 0.05em;
      line-height: 24px;
      text-align: left;
      margin-bottom: 24px;
    }

    &--Content {
      font-family: $font-stack-roboto;
      font-size: 14px;
      letter-spacing: 0.03em;
      line-height: 22px;
      margin-bottom: 24px;
    }

    &--Images {
      display: flex;
    }

    &--Image {
      background-repeat: no-repeat;
      background-size: cover;
      width: 100px;
      height: 80px;
      border: 1px solid #d4d0ca;
      margin-right: 18px;
    }
  }

  .fa-star {
    margin-right: 12px;
  }
}
</style>
