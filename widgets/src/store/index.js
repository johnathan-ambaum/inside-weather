import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { favorites } from './favorites';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeProduct: null,
    category: '',
    currentPage: 1,
    favorites,
    filters: {},
    lastErrorTrigger: null,
    loadingProducts: false,
    notificationMessage: '',
    openPanel: '',
    perPage: 54,
    products: [],
    selectedFilters: [],
    selectedOptions: [],
    totalResults: null,
    reviews: [],
    totalReviews: 0,
    productReviews: [],
  },
  mutations,
  actions,
});
