import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
// import interpolator from '../mixins/interpolator';

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

export function populateSelected({ state, dispatch, commit }, { selectedOptions, exists = false }) {
  return new Promise((resolve) => {
    if (!state.filters.attributes) {
      // wait for filters to be available if not loaded yet
      setTimeout(() => {
        dispatch('populateSelected', { selectedOptions, exists });
      }, 100);
      return resolve();
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
        console.error(`Missing value for "${parameter}" attribute`);
        cleanOptions[parameter] = values[0].value;
      }
    });

    commit('setSelectedOptions', cleanOptions);
    dispatch('updateUrl', { replace: true, handle: exists ? state.activeProduct.handle : null });
    return resolve();
  });
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

export function createProductFromSelected({ state, dispatch, commit }, { name, model, image }) {
  commit('setProductCreationInProgress', true);

  apiClient
    .createProduct({
      name,
      model,
      type: state.category,
      image,
      attributes: state.selectedOptions,
    })
    .then(({ handle, variant: { id } }) => {
      commit('setActiveProduct', { id, handle });
      commit('setProductCreationInProgress', false);
      dispatch('updateUrl', { handle, replace: true });
    })
    .catch((err) => {
      console.error(err);
      commit('setProductCreationInProgress', false);
    });
}

export function updateUrl({ state, dispatch }, { replace = false, handle = null } = {}) {
  if (!state.filters.attributes) {
    setTimeout(() => {
      dispatch('updateUrl', { replace, handle });
    }, 200);
    return;
  }

  if (window.history.pushState) {
    const { protocol, host, pathname } = window.location;
    let urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('version');
    urlParams = new URLSearchParams();
    if (version) {
      urlParams.set('version', version);
    }
    if (!handle) {
      const attributeString = Object.entries(state.selectedOptions)
        .map(([param, value]) => `${param}:${value}`)
        .join(',');
      urlParams.set('attributes', attributeString);
    }

    const uri = handle ? `/products/${handle}` : pathname;
    let queryString = urlParams.toString();
    if (queryString.length) {
      queryString = `?${queryString}`;
    }
    const newUrl = `${protocol}//${host}${uri}${queryString}`;
    const navState = {
      path: newUrl,
      product: state.activeProduct,
      attributes: state.selectedOptions,
    };
    // const title = interpolator.computed.productName();
    const { title } = document;

    if (replace && window.history.replaceState) {
      window.history.replaceState(navState, title, newUrl);
      return;
    }

    window.history.pushState(navState, title, newUrl);
  }
}

export default {
  loadProductImages,
  pullFilter,
  populateSelected,
  getReviews,
  getProductReviews,
  createProductFromSelected,
  updateUrl,
};
