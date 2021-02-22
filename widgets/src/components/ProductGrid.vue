<template>
  <div>
    <div
      v-if="!favorites.length"
      class="ProductGrid--Empty"
    >
      <slot/>
    </div>
    <div class="ProductGrid">
      <product-grid-item
        v-for="(product, index) in favorites"
        :key="product.id"
        :product="product"
        :is-favorite="isFavoriteProduct(product.handle)"
        :load-mobile="loadItemMobile(index)"
      />
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

  data() {
    return {
      cachedFilters: {},
      mobileLoadCount: 0,
      filtersLoaded: false,
    };
  },

  computed: {
    ...mapState({
      favorites: state => state.favorites,
    }),

    itemFilters() {
      return (category) => {
        if (this.cachedFilters[category]) {
          return this.cachedFilters[category];
        }

        return {};
      };
    },

    isFavoriteProduct() {
      return handle => this.favorites.some(product => product.handle === handle);
    },

    loadItemMobile() {
      return index => this.mobileLoadCount >= index;
    },
  },

  created() {
    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }

    this.loadFilters();
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
    ]),

    loadFilters() {
      if (!this.favorites.length) {
        this.filtersLoaded = true;
        return;
      }

      const processed = [];

      this.favorites.map(product => product.product_type).forEach((category) => {
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
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.Favorites__Header {
  color: #202020;
  font-family: $font-stack-avalon;
  font-size: 24px;
  font-weight: 600;
  padding-top: 80px;

  @include at-query($breakpoint-large) {
    font-size: 34px;
  }
}

.ProductGrid {
  display: flex;
  flex-wrap: wrap;
  font-family: $font-stack-avalon;
  margin: 40px 0;

  @include at-query($breakpoint-large) {
    margin-top: 50px;
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
</style>
