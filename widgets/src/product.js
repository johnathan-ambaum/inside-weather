import './util/polyfills';
import Vue from 'vue';
import { mapState } from 'vuex';

import store from './store';
import ProductCustomizer from './components/ProductCustomizer.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductInformation from './components/ProductInformation.vue';
import CategoryVprops from './components/CategoryVprops.vue';
import UpsellModal from './components/UpsellModal.vue'

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
      ProductCustomizer,
      ProductDetail,
      ProductInformation,
      CategoryVprops,
      UpsellModal,
    },

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
