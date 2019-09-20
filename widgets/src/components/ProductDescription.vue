<template>
  <div class="ProductDescription">
    <div class="ProductDescription__Body">
      <div class="ProductDescription__LabelWrap">
        <h2 class="ProductDescription__Label">DETAILS</h2>
      </div>
      <div class="ProductDescription__Column">
        <template v-for="item in product.details.left_pane">
          <h3
            :key="`${item.key}-head`"
            class="ProductDescription__Heading"
          >{{ item.key }}</h3>
          <div
            :key="`${item.key}-text`"
            class="ProductDescription__Text"
          >{{ item.value }}</div>
        </template>
      </div>
      <div class="ProductDescription__Column">
        <template v-for="item in product.details.right_pane">
          <h3
            :key="`${item.key}-head`"
            class="ProductDescription__Heading"
          >{{ item.key }}</h3>
          <div
            :key="`${item.key}-text`"
            class="ProductDescription__Text"
          >{{ item.value }}</div>
        </template>
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

.ProductDescription {
  z-index: 10;

  &, p {
    line-height: 1;
  }

  @include at-query($breakpoint-large) {
    margin-bottom: 150px;
  }

  &__Body {
    padding: 5%;

    &::after {
      clear: both;
      content: '';
      display: table;
    }

    @include at-query($breakpoint-large) {
      padding: 0 40px;
    }
  }

  &__Column {
    padding-right: 0;
    width: 100%;

    @include at-query($breakpoint-large) {
      float: left;
      padding: 0 40px;
      width: 50%;
    }
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
      margin-bottom: 50px;
      padding: 0 20px;
      position: relative;

      &::after {
        background: #9ecdd3;
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

  &__Heading {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: .5rem;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      font-size: 15px;
      line-height: 1;
      margin-bottom: 20px;
      letter-spacing: $normal-text-spacing;
    }
  }

  &__Text {
    font-family: $font-stack-roboto;
    font-size: 13px;
    line-height: 15px;
    margin-bottom: 20px;

    @include at-query($breakpoint-large) {
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 30px;
      letter-spacing: $normal-text-spacing;
    }
  }
}
</style>
