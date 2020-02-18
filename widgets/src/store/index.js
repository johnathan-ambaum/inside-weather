import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { favorites } from './favorites';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeProduct: {
      id: null,
      handle: '',
      inventory: {},
    },
    productCreationInProgress: false,
    category: '',
    favorites,
    filters: {},
    openPanel: '',
    selectedOptions: {},
    reviews: [],
    totalReviews: 0,
    productReviews: [],
    productImages: [],
  },
  mutations,
  actions,
});
