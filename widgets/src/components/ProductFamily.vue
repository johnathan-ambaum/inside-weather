<template>
  <div class="ProductFamily">
    <div class="ProductFamily__Body">
      <div class="ProductFamily__LabelWrap">
        <h2
          v-if="product.related_items && product.related_items.length"
          class="ProductFamily__Label"
        >MEET THE REST OF THE FAMILY</h2>
      </div>
      <div class="ProductFamily__Images">
        <div
          v-for="(item, index) in product.related_items"
          :key="index"
          class="ProductFamily__Images--Items"
        >
          <a
            :href="'/collections/' + item.primary_category + '/products/' + item.handle"
            :title="item.short_display_name"
            target="blank">
            <img :src="item.images.medium">
          </a>
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

.ProductFamily {
  z-index: 10;

  @include at-query($breakpoint-large) {
    margin-bottom: 150px;
  }

  &, p {
    line-height: 1;
  }

  &__LabelWrap {
    text-align: center;
  }

  &__Label {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: .0125em;
    margin-bottom: 2rem;
    top: .5rem;

    display: inline-block;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: .035em;
    margin-bottom: 55px;
    padding: 0 20px;
    position: relative;

    &::after {
      background: #e4baa9;
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

    @include at-query($breakpoint-small) {
      font-size: 20px;
      margin-bottom: 40px;

      &::after {
        height: 17px;
      }
    }
  }

  &__Body {
    padding: 0;
  }

  &__Images {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    img {
      max-width: 100%;
      width: 180px;
      height: 180px;

      @include at-query($breakpoint-msmall) {
        width: 145px;
        height: 145px;
      }
    }

    @include at-query($breakpoint-small) {
      flex-wrap: wrap;
    }

    @include at-query($breakpoint-large) {
      align-items: center;
    }

    &--Items {
      width: 180px;
      height: 180px;
      margin: 0 25px 50px;

      @include at-query($breakpoint-msmall) {
        width: 145px;
        height: 145px;
        margin: 4px 12.5px;
      }
    }
  }
}
</style>
