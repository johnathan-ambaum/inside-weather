<template>
  <div class="ProductDimensions">
    <div class="ProductDimensions__Body">
      <div class="ProductDimensions__LabelWrap">
        <h2 class="ProductDimensions__Label">DIMENSIONS</h2>
      </div>
      <div class="ProductDimensions__Images">
        <div
          v-for="(image, index) in product.dimensions_images"
          :key="index"
          class="ProductDimensions__Images--Items"
        >
          <img :src="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      product: state => state.activeProduct,
    }),
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductDimensions {
  z-index: 10;

  @include at-query($breakpoint-large) {
    margin-bottom: 150px;
  }

  &, p {
    line-height: 1;
  }

  &__LabelWrap {
    @include at-query($breakpoint-large) {
      text-align: center;
    }
  }

  &__Label {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: .0125em;
    margin-bottom: 2rem;
    top: .5rem;

    @include at-query($breakpoint-large) {
      display: inline-block;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: .035em;
      margin-bottom: 65px;
      padding: 0 20px;
      position: relative;

      &::after {
        background: #c7d0c7;
        content: '';
        display: block;
        height: 20px;
        left: 0;
        opacity: .7;
        position: absolute;
        top: 50%;
        width: 100%;
        z-index: -1;
      }
    }
  }

  &__Body {
    padding: 5%;

    @include at-query($breakpoint-large) {
      padding: 0;
    }
  }

  &__Images {
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
    }

    @include at-query($breakpoint-small) {
      flex-wrap: wrap;

      & > div + div {
        margin-top: 20px;
      }
    }

    @include at-query($breakpoint-large) {
      align-items: center;
      flex-direction: column;

      & > div + div {
        margin-top: 70px;
      }
    }

    &--Items {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
    }
  }
}
</style>
