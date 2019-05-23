<template>
  <div class="ReviewItemStar">
    <img
      v-for="i in starCount"
      :key="i"
      class="ReviewItemStar__Image"
      src="https://cdn.shopify.com/s/files/1/2994/0144/files/star.png?254334"
    />
  </div>
</template>

<script>
export default {
  props: {
    starCount: { type: Number, default: 0 },
  },
};
</script>

<style lang="scss">
.ReviewItemStar {
  display: flex;

  &__Image {
    margin-right: 12px;
  }
}
</style>
