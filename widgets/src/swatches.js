import './util/polyfills';
import Vue from 'vue';

import store from './store';
import SwatchBrowser from './components/SwatchBrowser.vue';

(function init() {
  const rootEl = document.querySelector('#app');

  if (!rootEl) {
    return;
  }

  Vue.config.productionTip = false;

  const bus = new Vue();

  Object.defineProperty(Vue.prototype, '$bus', { get() { return bus; } });

  const app = new Vue({
    el: rootEl,

    components: {
      SwatchBrowser,
    },

    store,
  });
}());
