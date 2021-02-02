<template>
  <a :href="review_link">
    <div class="ReviewStars">
      <img
        v-for="i in fullStars"
        :key="i"
        class="ReviewStars__Image"
        src="https://cdn.shopify.com/s/files/1/2994/0144/files/star-full.svg?v=1609377767"
      >
      <img
        v-if="halfStar"
        class="ReviewStars__Image"
        src="https://cdn.shopify.com/s/files/1/2994/0144/files/star-half.svg?v=1609377767"
      >
      <img
        v-for="j in emptyStars"
        :key="j + '-empty'"
        class="ReviewStars__Image"
        src="https://cdn.shopify.com/s/files/1/2994/0144/files/star-empty.svg?v=1609377767"
      >
      <div class="ReviewStars__Count">{{review_count}} reviews</div>
    </div>
  </a>
</template>
<script>
  export default {
    props: {
      review_count: { type: Number, required: true },
      review_average: { type: String, required: true },
      review_link: {type: String, required: false, default:'#'}
    },
    methods: {
      roundHalf(num) {
        const numFloat = parseFloat(num);
        return Math.round(numFloat*2)/2;
      }
    },
    computed: {
      formatRating: function(){
        const min_rating = 0;
        const max_rating = 5;
        if(!this.review_average || this.review_average < min_rating){
          return min_rating;
        }else if(this.review_average > max_rating){
          return max_rating;
        }
        return this.review_average;
      },
      fullStars: function(){
        return Math.floor(this.roundHalf(this.formatRating));
      },
      halfStar: function(){
        return Number.isInteger(this.roundHalf(this.formatRating)) ? 0 : 1;
      },
      emptyStars: function(){
        const max_rating = 5;
        return max_rating - this.fullStars - this.halfStar;
      }
    },
  };
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewStars {
  display: flex;
  align-items: center;
  margin-top:14px;
  @include at-query($breakpoint-small) {
    margin-top:9px;
  }

  &__Image {
    width: 11px;
    height: 11px;

    & + & {
      margin-left: 4px;
      @include at-query($breakpoint-small) {
        font-size: 3px;
      }
    }
  }

  &__Count {
    font-family: Avalon;
    text-transform: uppercase;
    font-weight:500;
    font-size:10px;
    letter-spacing: 0.13em;
    color:#202020;
    margin-left:9px;
    line-height: 10px;
    @include at-query($breakpoint-small) {
      margin-left:8px;
    }
  }
}
</style>