<template>
  <div class="SearchResults">
    <product-grid/>
    <div
      ref="more"
      class="SearchResults__Loading"
    >
      <glyph-loading v-show="loading"/>
    </div>
  </div>
</template>

<script>
import scrollMonitor from 'scrollmonitor';
import { mapState, mapActions } from 'vuex';
import ProductGrid from './ProductGrid.vue';
import GlyphLoading from './GlyphLoading.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    ProductGrid,
    GlyphLoading,
  },

  mixins: [
    screenMonitor,
  ],

  computed: {
    ...mapState({
      totalResults: state => state.totalResults,
      products: state => state.products,
      loading: state => state.loadingProducts,
    }),

    currentCount() {
      return this.products.length;
    },

    hasMoreResults() {
      return (this.currentCount && this.totalResults === null) || this.currentCount < this.totalResults;
    },
  },

  mounted() {
    const monitor = scrollMonitor.create(this.$refs.more);

    monitor.fullyEnterViewport(() => {
      if (!this.loading) {
        this.loadMore();
      }
    });
  },

  methods: {
    ...mapActions([
      'nextPage',
    ]),

    loadMore() {
      this.nextPage();
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.slide-fade-enter {
  transform: translateX(20px);
  opacity: 0;

  &-active {
    transition: all .5s ease;
    transition-delay: .75s;
  }
}

.SearchResults {
  &__Loading {
    display: flex;
    justify-content: center;
    padding-bottom: 80px;
  }
}
</style>
