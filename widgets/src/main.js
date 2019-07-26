import './util/polyfills';
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as emptyHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BrowseWidget from './components/BrowseWidget.vue';
import SearchResults from './components/SearchResults.vue';
import ProductGrid from './components/ProductGrid.vue';
import ProductCustomizer from './components/ProductCustomizer.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductDetailSlider from './components/ProductDetailSlider.vue';
import PageBuilderSection from './components/PageBuilderSection.vue';
import GlyphLoading from './components/GlyphLoading.vue';
import SwatchBrowser from './components/SwatchBrowser.vue';
import BannerCarousel from './components/BannerCarousel.vue';
import CategoryList from './components/CategoryList.vue';
import ValueProps from './components/ValueProps.vue';
import Press from './components/Press.vue';
import ReviewCarousel from './components/ReviewCarousel.vue';
import Banner from './components/Banner.vue';
import CategoryBanner from './components/CategoryBanner';
import RecentlySoldProducts from './components/RecentlySoldProducts.vue';
import CategoryCollections from './components/CategoryCollections.vue';
import CategoryDetails from './components/CategoryDetails.vue';
import CategoryVideo from './components/CategoryVideo.vue';
import CategoryVprops from './components/CategoryVprops.vue';
import LifeStylePhotos from './components/LifeStylePhotos.vue'
import screenMonitor from './mixins/screenMonitor';
import store from './store';


Vue.config.productionTip = false;

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

library.add(emptyHeart, filledHeart);

const app = new Vue({
  el: '#app',

  components: {
    BrowseWidget,
    SearchResults,
    ProductGrid,
    ProductCustomizer,
    ProductDetail,
    ProductDetailSlider,
    PageBuilderSection,
    GlyphLoading,
    SwatchBrowser,
    FontAwesomeIcon,
    BannerCarousel,
    CategoryList,
    ValueProps,
    Press,
    ReviewCarousel,
    Banner,
    RecentlySoldProducts,
    CategoryBanner,
    CategoryCollections,
    CategoryDetails,
    CategoryVideo,
    CategoryVprops,
    LifeStylePhotos,
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
