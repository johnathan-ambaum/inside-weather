import './util/polyfills';
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as emptyHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/pro-solid-svg-icons';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import '../node_modules/swiper/dist/css/swiper.css';

import ProductGrid from './components/ProductGrid.vue';
import ProductCustomizer from './components/ProductCustomizer.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductFamily from './components/ProductFamily.vue';
import ProductDetailSlider from './components/ProductDetailSlider.vue';
import GlyphLoading from './components/GlyphLoading.vue';
import SwatchBrowser from './components/SwatchBrowser.vue';
import CategoryItem from './components/CategoryItem.vue';
import FullReviews from './containers/FullReviews.vue';
import ReviewCarousel from './components/ReviewCarousel.vue';
import screenMonitor from './mixins/screenMonitor';
import store from './store';

Vue.config.productionTip = false;

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

library.add(emptyHeart, filledHeart);

Vue.use(VueAwesomeSwiper);

const app = new Vue({
  el: '#app',

  components: {
    ProductGrid,
    ProductCustomizer,
    ProductDetail,
    ProductFamily,
    ProductDetailSlider,
    GlyphLoading,
    SwatchBrowser,
    CategoryItem,
    FullReviews,
    ReviewCarousel,
    FontAwesomeIcon,
    BootstrapVue,
  },

  store,

  mixins: [
    screenMonitor,
  ],

  computed: {
    ...mapState({
      product: state => state.activeProduct,
      favorites: state => state.favorites,
    }),

    isFavorite() {
      return this.product && this.favorites.includes(this.product.sku);
    },

    favoriteIcon() {
      if (this.isFavorite) {
        return ['fas', 'heart'];
      }

      return ['fal', 'heart'];
    },
  },

  created() {
    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }
  },

  methods: {
    ...mapMutations([
      'toggleFavorite',
    ]),

    favoriteCurrentProduct() {
      if (!this.product) {
        return;
      }
      this.toggleFavorite({
        product: this.product,
        customerId: this.customerId,
      });
    },
  },
});

function disableAdminBar() {
  const bar = document.querySelector('#preview-bar-iframe');
  if (!bar) {
    setTimeout(disableAdminBar, 100);
    return;
  }
  bar.parentNode.removeChild(bar);
}

const uri = window.location.pathname;

if (uri.includes('/collections/') || uri.includes('/products/')) {
  disableAdminBar();
}
