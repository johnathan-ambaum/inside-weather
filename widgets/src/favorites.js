import './util/polyfills';
import Vue from 'vue';

import store from './store';
import Favorites from './components/Favorites.vue';

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
      Favorites,
    },

    store,
  });
}());
