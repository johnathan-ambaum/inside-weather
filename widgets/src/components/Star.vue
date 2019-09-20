<template>
  <div class="ReviewItemStar">
    <img
      v-for="i in starCount"
      :key="i"
      :class="className"
      class="ReviewItemStar__Image"
      src="https://cdn.shopify.com/s/files/1/2994/0144/files/star_2x_157511bd-230e-435d-a13f-242fd235281b.png?290387"
    />
  </div>
</template>

<script>
export default {
  props: {
    starCount: { type: Number, default: 0 },
    className: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ReviewItemStar {
  display: flex;

  &__Image {
    margin-right: 12px;
    width: 18px;
    height: 18px;

    @include at-query($breakpoint-small) {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
