<template>
  <div class="Product__AddToCartRow">
    <div class="select-wrap">
      <label
        for="quantity"
        class="visually-hidden"
      >Quantity</label>
      <select
        id="quantity"
        v-model="quantity"
      >
        <option
          v-for="i in 10"
          :key="i"
          :value="i"
        >{{ i }}</option>
      </select>
    </div>
    <button
      :class="{ 'btn--loading': processing }"
      class="btn btn--full add-to-cart"
      @click.prevent="$emit('addToCart', quantity)"
    >
      <span>Add to Cart</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    processing: { type: Boolean, default: false },
  },

  data() {
    return {
      quantity: 1,
    };
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.Product__AddToCartRow {
  display: flex;
  margin: 0 0 15px;

  .product__quantity {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .select-wrap {
    select {
      background-position: right 15px center;
      border: .25px solid #202020;
      height: 100%;
      margin-right: 20px;
      padding: 0 22px 0 10px;
      width: 60px;
    }
  }

  button {
    font-family: $font-stack-avalon;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;

    &, &:hover {
      padding-bottom: 13px;
      padding-top: 12px;
    }
  }

  .add-to-cart {
    color: #fff;
    background: #202020;

    &:hover {
      color: #fff;
    }
  }
}
</style>
