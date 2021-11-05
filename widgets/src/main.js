import './util/polyfills';
import Vue from 'vue';
import { mapState } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ProductGrid from './components/ProductGrid.vue';
import StaticBanner from './components/StaticBanner.vue';
import CategoryList from './components/CategoryList.vue';
import CategoryBanner from './components/CategoryBanner.vue';
import CategoryCollections from './components/CategoryCollections.vue';
import CategoryDetails from './components/CategoryDetails.vue';
import CategoryVprops from './components/CategoryVprops.vue';
import LifeStylePhotos from './components/LifeStylePhotos.vue';
import screenMonitor from './mixins/screenMonitor';
import store from './store';
import Help from './components/Help.vue';
import PageNotFoundBanner from './components/PageNotFoundBanner.vue';
import CategorySeoContent from './components/CategorySeoContent.vue';

// CMS Blocks
import CategoryProductGrid from './components/CMSBlocks/CategoryProductGrid';
import CustomSpacer from './components/CMSBlocks/CustomSpacer';
import ImageText from './components/CMSBlocks/ImageText';
import ImageTextCta from './components/CMSBlocks/ImageTextCta';
import LifestyleGrid from './components/CMSBlocks/LifestyleGrid';
import MultiColumnTextImage from './components/CMSBlocks/MultiColumnTextImage';
import SupportBanner from './components/CMSBlocks/SupportBanner';
import TopBanner from './components/CMSBlocks/TopBanner'
import TwoColumnTextImage from './components/CMSBlocks/TwoColumnTextImage';
import VpropIcons from './components/CMSBlocks/VpropIcons';
import TitleText from './components/CMSBlocks/TitleText';
import ReviewCarousel from './components/CMSBlocks/ReviewCarousel';
import BannerSlider from './components/CMSBlocks/BannerSlider';
import RecentlySold from './components/CMSBlocks/RecentlySold';
import TextBanner from './components/CMSBlocks/TextBanner';
import PressList from './components/CMSBlocks/PressList';
import FeaturedCategories from './components/CMSBlocks/FeaturedCategories';
import VProps from './components/CMSBlocks/VProps';

(function init() {
  const rootEl = document.querySelector('#app');
  window.updateThemeSettings = function(){store.commit('updateThemeSettings', window.theme.settings)};
  window.updateThemeSettings();

  if (!rootEl) {
    return;
  }

  Vue.config.productionTip = false;

  const bus = new Vue();

  Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

  const app = new Vue({
    el: rootEl,

    components: {
      ProductGrid,
      FontAwesomeIcon,
      StaticBanner,
      CategoryList,
      CategoryBanner,
      CategoryCollections,
      CategoryDetails,
      CategoryVprops,
      LifeStylePhotos,
      Help,
      PageNotFoundBanner,
      CategorySeoContent,
      CategoryProductGrid,
      CustomSpacer,
      ImageText,
      ImageTextCta,
      LifestyleGrid,
      MultiColumnTextImage,
      SupportBanner,
      TopBanner,
      TwoColumnTextImage,
      VpropIcons,
      TitleText,
      ReviewCarousel,
      BannerSlider,
      RecentlySold,
      TextBanner,
      PressList,
      FeaturedCategories,
      VProps,
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
