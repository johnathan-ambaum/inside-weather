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
      background-position: right 20px center;
      border: 1px solid #959595;
      height: 100%;
      margin-right: 10px;
      padding: 0 35px 0 20px;
    }
  }

  button {
    font-family: $font-stack-avalon;
    letter-spacing: .05em;
    text-transform: uppercase;

    &, &:hover {
      padding-bottom: 15px;
      padding-top: 15px;
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
