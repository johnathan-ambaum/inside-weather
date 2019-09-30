<template>
  <div
    v-if="products.length"
    class="InspirationOptions"
  >
    <h3 class="InspirationOptions__Heading">Curator's Picks</h3>
    <div class="InspirationOptions__Body">
      <a
        v-for="product in products"
        :key="product.product_url"
        :href="product.product_url"
        class="InspirationOptions__Item"
      >
        <img :src="product.product_thumbnail">
      </a>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    products: { type: Array, required: true },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.InspirationOptions {
  margin-bottom: 40px;

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
    display: flex;
    flex: 1 1 50%;
    justify-content: center;
    padding: 0 18px;

    @include at-query($breakpoint-mlarge) {
      flex: 1 1 percentage(1 / 3);
    }

    @include at-query($breakpoint-large) {
      padding: 0;
    }
  }
}
</style>
