<template>
  <div>
    <div
      v-if="!results.length"
      class="ProductGrid--Empty"
    >
      <div class="ProductGrid--Empty-favorites" :class="{'ProductGrid--Empty-tabActive': activeTab === 'favorites'}">You don't have any favorites yet!</div>
      <div class="ProductGrid--Empty-history" :class="{'ProductGrid--Empty-tabActive': activeTab === 'history'}">You don't have any browsing history yet!</div>
    </div>
    <transition name="slide-fade" mode="out-in">
    <div class="ProductGrid" :key="activeTab">
      <product-grid-item
        v-for="(product, index) in results"
        :key="product.id"
        :product="product"
        :is-favorite="isFavoriteProduct(product.handle)"
        :load-mobile="loadItemMobile(index)"
      />
    </div>
    </transition>
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
      results: [],
      activeTab: 'favorites'
    };
  },

  computed: {
    ...mapState({
      favorites: state => state.favorites,
      history: state => state.history,
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

    this.$bus.$on('Favorites:showFavorites', (payload) => {
      this.show(this.favorites);
      this.activeTab = 'favorites';
    });

    this.$bus.$on('Favorites:showBrowsingHistory', (payload) => {
      this.show(this.history);
      this.activeTab = 'history';
    });
  },

  mounted() {
    this.results = this.favorites;//initialize results to the favorites array on load.

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

    show(arr){
      this.results = arr;
    }
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
  &--Empty div{
    display:none;
  }
  &--Empty-tabActive{
    display:block !important;
  }
}

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
