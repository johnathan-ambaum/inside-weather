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
        :disabled="outOfStock"
      >
        <option
          v-for="i in 11"
          :key="i"
          :value="i - 1"
        >{{ i - 1 }}</option>
      </select>
    </div>
    <button
      :class="{ 'btn--loading': processing }"
      :disabled="outOfStock"
      class="btn btn--full add-to-cart"
      @click.prevent="$emit('addToCart', quantity)"
    >
      <span>{{ buttonText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    processing: { type: Boolean, default: false },
    outOfStock: { type: Boolean, default: false },
  },

  data() {
    return {
      quantity: 1,
    };
  },

  computed: {
    buttonText() {
      if (this.outOfStock) {
        return 'Sold Out';
      }
      return 'Add to Cart';
    },
  },

  watch: {
    outOfStock: {
      immediate: true,
      handler(outOfStock) {
        if (outOfStock) {
          this.quantity = 0;
          return;
        }
        this.quantity = 1;
      },
    },
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
      border: 1px solid #D4D0CA;
      height: 100%;
      margin-right: 20px;
      padding: 0 22px 0 10px;
      width: 60px;

      &[disabled] {
        background-color: #fff;
        border-color: #959595;
        color: #959595;
        opacity: .4;
      }
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

    &[disabled] {
      &, &:hover {
        background: #959595;
      }
    }
  }

  .add-to-cart {
    color: #fff;
    background: #202020;

    &:hover,
    &:active {
      background: #3B3B3B;
      color: #fff;
    }
  }
}
</style>
