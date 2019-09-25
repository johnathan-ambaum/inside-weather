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
    .getImages({
      type: state.category,
      attributes: state.selectedOptions,
    })
    .then((images) => {
      commit('setProductImages', images);
    });
}

export function populateSelected({ state, dispatch, commit }, selectedOptions) {
  if (!state.filters.attributes) {
    // wait for filters to be available if not loaded yet
    setTimeout(() => {
      dispatch('populateSelected', selectedOptions);
    }, 100);
    return;
  }

  const cleanOptions = {};
  Object.entries(selectedOptions || {}).forEach(([parameter, value]) => {
    const attribute = state.filters.attributes.find(item => item.parameter === parameter);
    if (!attribute) {
      console.error(`Attribute "${parameter}" not found`);
      return;
    }
    let selected = attribute.values.find(item => item.value === value);
    if (!selected) {
      console.error(`Attribute value "${value}" not found`);
      selected = attribute.values[0] || {};
    }
    cleanOptions[parameter] = selected.value;
  });

  state.filters.attributes.forEach(({ parameter, values }) => {
    if (!cleanOptions[parameter]) {
      cleanOptions[parameter] = values[0].value;
    }
  });

  commit('setSelectedOptions', cleanOptions);
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

export function createProductFromSelected({ state, commit }, { name, model, image }) {
  commit('setProductCreationInProgress', true);

  apiClient
    .createProduct({
      name,
      model,
      type: state.category,
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
  populateSelected,
  getReviews,
  getProductReviews,
  createProductFromSelected,
};
