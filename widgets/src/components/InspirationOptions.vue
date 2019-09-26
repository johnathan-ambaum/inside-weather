<template>
  <div class="InspirationOptions">
    <h3 class="InspirationOptions__Heading">Spark Your Creativity</h3>
    <div class="InspirationOptions__Body">
      <div
        v-for="option in options"
        :key="option.image"
        class="InspirationOptions__Item"
      >
        <img :src="option.image">
      </div>
    </div>
  </div>
</template>

<script>
const options = [
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-1.png' },
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-2.png' },
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-3.png' },
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-4.png' },
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-5.png' },
  { image: '//cdn.shopify.com/s/files/1/2994/0144/t/21/assets/tmp-spark-6.png' },
];

export default {
  data() {
    return {
      options,
    };
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.InspirationOptions {
  &__Heading {
    font-family: $font-stack-avalon;
    font-size: 16px;
    font-weight: 600;
    padding: 0 $horizontal-wrapper-padding;

    @include at-query($breakpoint-large) {
      font-size: 15px;
    }
  }

  &__Body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @include at-query($breakpoint-large) {
      justify-content: space-between;
    }
  }

  &__Item {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 1 1 50%;
    justify-content: center;

    @include at-query($breakpoint-mlarge) {
      flex: 1 1 percentage(1 / 3);
    }
  }
}
</style>
