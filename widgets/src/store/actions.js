import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';

const apiClient = new ApiClient();

/**
 * Set up filter definition for category
 */
export function pullFilter({ commit, state }) {
  FilterStorage.getItem(state.category).then((filter) => {
    commit('defineFilter', { filter });
    // TODO: DELETE THIS WHEN POSSIBLE
    filter.attributes.forEach(({ parameter, values }) => {
      commit('setOption', { parameter, value: values[0].value });
    });
    // TODO: END DELETE BLOCK
  });
}

/**
 * Get single product matching SKU or selected option configuration for PDP
 */
export function loadProduct({ commit, dispatch, state }, { last = null, sku = null }) {
  apiClient
    .applyFilters({
      category: state.category,
      filters: sku
        ? [{ parameter: 'sku', values: [sku] }]
        : state.selectedOptions,
    })
    .perPage(1)
    .getPage(1)
    .then(({ hits: results }) => {
      // eslint-disable-next-line
      commit('setProduct', results.hits[0]._source);

      if (sku) {
        dispatch('populateSelectedFromActive');
      }
    });
}

/**
 * Retrieves product images for selected options
 */
export function loadProductImages({ commit, state }) {
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

/**
 * Load products from API for specific batch of SKUs
 */
export function loadSKUs({ commit }, skus) {
  apiClient
    .applyFilters({
      category: null,
      filters: [{
        parameter: 'sku',
        values: skus,
      }],
    })
    .perPage(skus.length)
    .getPage(1)
    .then(({ hits: results }) => {
      commit('saveProducts', {
        total: results.total,
        /* eslint-disable-next-line */
        products: results.hits.map(product => product._source),
        append: false,
      });
    });
}

/**
 * Load user's favorited products (if they've favorited any)
 */
export function loadFavorites({ state, dispatch }) {
  if (state.favorites) {
    dispatch('loadSKUs', state.favorites);
  }
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

export default {
  loadProduct,
  loadProductImages,
  loadSKUs,
  loadFavorites,
  pullFilter,
  populateSelectedFromActive,
  getReviews,
  getProductReviews,
};
