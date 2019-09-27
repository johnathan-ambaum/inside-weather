import './util/polyfills';
import Vue from 'vue';
import { mapState } from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import '../node_modules/swiper/dist/css/swiper.css';

import ProductGrid from './components/ProductGrid.vue';
import ProductCustomizer from './components/ProductCustomizer.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductFamily from './components/ProductFamily.vue';
import ProductDetailSlider from './components/ProductDetailSlider.vue';
import GlyphLoading from './components/GlyphLoading.vue';
import CategoryItem from './components/CategoryItem.vue';
import FullReviews from './containers/FullReviews.vue';
import ReviewCarousel from './components/ReviewCarousel.vue';
import screenMonitor from './mixins/screenMonitor';
import store from './store';

Vue.config.productionTip = false;

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

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
    CategoryItem,
    FullReviews,
    ReviewCarousel,
    BootstrapVue,
  },

  mixins: [
    screenMonitor,
  ],

  store,

  computed: {
    ...mapState({
      favorites: state => state.favorites,
    }),
  },

  created() {
    this.customerId = null;
    if (typeof window.pnwCfg !== 'undefined') {
      this.customerId = window.pnwCfg.id;
    }
  },
});

// function disableAdminBar() {
//   const bar = document.querySelector('#preview-bar-iframe');
//   if (!bar) {
//     setTimeout(disableAdminBar, 100);
//     return;
//   }
//   bar.parentNode.removeChild(bar);
// }

// const uri = window.location.pathname;

// if (uri.includes('/products/')) {
//   disableAdminBar();
// }
