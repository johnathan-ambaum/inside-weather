import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';

const apiClient = new ApiClient();

/**
 * Set up filter definition for category
 */
export function pullFilter({ dispatch, commit, state }) {
  if (!state.category) {
    setTimeout(() => {
      dispatch('pullFilter');
    }, 200);
    return;
  }

  FilterStorage.getItem(state.category).then((filter) => {
    commit('defineFilter', { filter });
  });
}

/**
 * Retrieves product images for selected options
 */
export function loadProductImages({ dispatch, commit, state }) {
  if (!state.filters.attributes) {
    // keep retrying if still waiting on filter retrieval
    setTimeout(() => {
      dispatch('loadProductImages');
    }, 200);
    return;
  }

  if (!state.filters.attributes.every(attribute => state.selectedOptions[attribute.parameter])) {
    return;
  }

  apiClient
    .getImages(state.selectedOptions)
    .then((images) => {
      commit('setProductImages', images);
    });
}

/**
 * Pre-select filters and options that apply to the currently displayed product on PDP
 */
export function populateSelectedFromActive({ state, commit }) {
  if (!state.activeProduct || !state.filters || !state.filters.filterGroups) {
    return;
  }

  const options = [];
  state.filters.filterGroups.forEach(({ parameter }) => {
    if (typeof state.activeProduct[parameter] !== 'undefined') {
      options.push({
        group: parameter,
        parameter,
        values: [state.activeProduct[parameter]],
      });
    }
  });

  commit('setSelectedOptions', options);
}

export function getReviews({ commit }, { category = 'sofas', from = 0, size = 20 }) {
  apiClient
    .getReviews(category, from, size)
    .then((results) => {
      commit('setReviews', { reviews: results.reviews });
      commit('setTotalReviews', { totalReviews: results.total });
      commit('updateCategory', category);
    });
}

export function getProductReviews({ commit }, {
  primaryCategory = 'coffee-tables',
  productFamily = 'kloss',
}) {
  apiClient
    .getProductReviews(primaryCategory, productFamily)
    .then((results) => {
      commit('setProductReviews', {
        reviews: results.reviews,
      });
    });
}

export function createProductFromSelected({ state, commit }, { name, image }) {
  commit('setProductCreationInProgress', true);

  apiClient
    .createProduct({
      name,
      image,
      attributes: state.selectedOptions,
    })
    .then(({ variant: { id } }) => {
      commit('setVariantId', id);
      commit('setProductCreationInProgress', false);
    });
}

export default {
  loadProductImages,
  pullFilter,
  populateSelectedFromActive,
  getReviews,
  getProductReviews,
  createProductFromSelected,
};
