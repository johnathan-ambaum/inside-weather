<template>
  <div>
    <div
      v-if="showEmpty"
      class="ProductGrid--Empty"
    >
      <slot/>
    </div>
    <div
      :class="{ 'ProductGrid--Favorites': showFavorites }"
      class="ProductGrid"
    >
      <template
        v-for="(row, rowNum) in productTriplets"
      >
        <div
          :key="rowNum"
          class="ProductGridRow"
        >
          <product-grid-item
            v-for="product in row"
            :key="product.id"
            :product="product"
            :filters="itemFilters(product.primary_category)"
            :is-favorite="isFavoriteProduct(product.sku)"
            :load-mobile="loadRowMobile(rowNum)"
            :is-mobile="screenWidth < 1024"/>
          <div
            v-for="i in (3 - row.length)"
            :key="i"
            class="ProductGridItem is-empty"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ProductGridItem from './ProductGridItem.vue';
import screenMonitor from '../mixins/screenMonitor';
import FilterStorage from '../util/FilterStorage';

export default {
  components: {
    ProductGridItem,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    showFavorites: { type: Boolean, default: false },
  },

  data() {
    return {
      cachedFilters: {},
      mobileLoadCount: 0,
    };
  },

  computed: {
    ...mapState({
      filters: state => state.filters,
      favorites: state => state.favorites,
    }),

    showEmpty() {
      if (this.showFavorites) {
        return !this.favorites.length;
      }

      return !this.products.length;
    },

    itemFilters() {
      return (category) => {
        if (!this.showFavorites) {
          return this.filters;
        }

        if (this.cachedFilters[category]) {
          return this.cachedFilters[category];
        }

        return {};
      };
    },

    productTriplets() {
      const tuples = [];
      const copy = [...this.products];

      while (copy.length > 0) {
        tuples.push(copy.splice(0, 3));
      }

      return tuples;
    },

    isFavoriteProduct() {
      return sku => this.favorites.includes(sku);
    },

    loadRowMobile() {
      return rowNum => this.mobileLoadCount >= (rowNum * 3);
    },
  },

  watch: {
    products(newProducts) {
      if (!this.showFavorites) {
        return;
      }

      const processed = [];

      newProducts.map(product => product.primary_category).forEach((category) => {
        if (this.cachedFilters[category] || processed.includes(category)) {
          return;
        }

        FilterStorage.getItem(category).then((filters) => {
          this.$set(this.cachedFilters, category, filters);
        });

        processed.push(category);
      });
    },
  },

  created() {
    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }
  },

  mounted() {
    this.$bus.$on('favorite', (product) => {
      this.toggleFavorite({ product, customerId: this.customerId });
    });

    this.$bus.$on('grid-item:loaded', () => {
      this.mobileLoadCount += 1;
      if (this.mobileLoadCount > 5) {
        this.$bus.$emit('product-grid:loaded');
      }
    });
  },

  methods: {
    ...mapMutations([
      'toggleFavorite',
      'setFavorites',
    ]),
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductGrid {
  font-family: $font-stack-avalon;
  margin: 2rem 0;

  @include at-query($breakpoint-large) {
    @include clearfix;
    margin: 160px 0 2rem;
    padding: 0 $gutter;

    &--Favorites {
      margin-top: 40px;
    }
  }

  &--Empty {
    align-items: center;
    display: flex;
    font-family: $font-stack-avalon;
    font-size: 18px;
    font-weight: 500;
    height: 75vh;
    justify-content: center;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
}

.ProductGridRow {
  @include at-query($breakpoint-large) {
    // slightly less tall than the full available space with header and BrowseWidgetNav taken into account
    display: flex;
    height: calc(80vh - 245px);
    justify-content: space-between;
    margin-bottom: $gutter;
    max-height: 2000px - 245px;

    .MainNav--Small & {
      height: calc(80vh - 205px);
      max-height: 2000px - 205px;
    }
  }
}
</style>
