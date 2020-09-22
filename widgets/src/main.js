import './util/polyfills';
import Vue from 'vue';
import { mapState } from 'vuex';
import BootstrapVue from 'bootstrap-vue';
// this import moved into ReviewModal to fix not being included in CSS output
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// this import moved into ReviewCarousel to fix not being included in CSS output
// import '../node_modules/swiper/dist/css/swiper.css';

import ProductGrid from './components/ProductGrid.vue';
import ProductCustomizer from './components/ProductCustomizer.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductInformation from './components/ProductInformation.vue';
import ProductFamily from './components/ProductFamily.vue';
import ProductDetailSlider from './components/ProductDetailSlider.vue';
import GlyphLoading from './components/GlyphLoading.vue';
import BannerCarousel from './components/BannerCarousel.vue';
import StaticBanner from './components/StaticBanner.vue';
import CategoryList from './components/CategoryList.vue';
import ValueProps from './components/ValueProps.vue';
import Press from './components/Press.vue';
import ReviewCarousel from './components/ReviewCarousel.vue';
import Banner from './components/Banner.vue';
import BannerReviewCarousel from './components/BannerReviewCarousel.vue';
import CategoryBanner from './components/CategoryBanner.vue';
import HiwProps from './components/HiwProps.vue';
import CustomizableCategory from './components/CustomizableCategory.vue';
import CustomComfort from './components/CustomComfort.vue';
import RecentlySoldProducts from './components/RecentlySoldProducts.vue';
import CategoryCollections from './components/CategoryCollections.vue';
import WallArtCategoryCollections from './components/WallArtCategoryCollections.vue';
import CategoryDetails from './components/CategoryDetails.vue';
import CategoryDetail from './components/CategoryDetail.vue';
import CategoryVideo from './components/CategoryVideo.vue';
import CategoryVprops from './components/CategoryVprops.vue';
import LifeStylePhotos from './components/LifeStylePhotos.vue';
import CategoryItem from './components/CategoryItem.vue';
import FullReviews from './containers/FullReviews.vue';
import screenMonitor from './mixins/screenMonitor';
import store from './store';

(function init() {
  const rootEl = document.querySelector('#app');

  if (!rootEl) {
    return;
  }

  Vue.config.productionTip = false;

  const bus = new Vue();

  Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

  Vue.use(VueAwesomeSwiper);

  const app = new Vue({
    el: rootEl,

    components: {
      ProductGrid,
      ProductCustomizer,
      ProductDetail,
      ProductInformation,
      ProductFamily,
      ProductDetailSlider,
      GlyphLoading,
      CategoryItem,
      FullReviews,
      ReviewCarousel,
      FontAwesomeIcon,
      BannerCarousel,
      StaticBanner,
      CategoryList,
      ValueProps,
      Press,
      Banner,
      BannerReviewCarousel,
      RecentlySoldProducts,
      CategoryBanner,
      HiwProps,
      CustomizableCategory,
      CustomComfort,
      CategoryCollections,
      WallArtCategoryCollections,
      CategoryDetails,
      CategoryDetail,
      CategoryVideo,
      CategoryVprops,
      LifeStylePhotos,
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
}());
