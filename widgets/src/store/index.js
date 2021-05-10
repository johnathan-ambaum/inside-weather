import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { favorites } from './favorites';
import { history } from './history';
import userData from './userData'

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
    history,
    filters: {},
    openPanel: '',
    selectedOptions: {},
    reviews: [],
    totalReviews: 0,
    productReviews: [],
    productImages: [],
    swatches: [],
    cylindoViewers: [],
    revertConfiguration:{},
    pt: userData.pt
  },
  mutations,
  actions,
});
