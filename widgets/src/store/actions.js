import Vue from 'vue';
import ApiClient from '../util/ApiClient';
import { applyFeatureOverrides, getStaticImageUrl, getViewerParameters } from '../util/cylindo';
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
  if (!state.filters.attributes || !window.cylindo) {
    // keep retrying if still waiting on filter retrieval
    setTimeout(() => {
      dispatch('loadProductImages');
    }, 200);
    return;
  }

  if (!state.filters.attributes.every(attribute => state.selectedOptions[attribute.parameter])) {
    console.error('Option selections missing, aborting image population');
    return;
  }

  // fall back to IW API for images if cylindo parameters not set in the filter definitions
  if (!state.filters.cylindo_sku) {
    apiClient
      .getImages({
        type: state.category,
        attributes: state.selectedOptions,
      })
      .then((images) => {
        commit('setProductImages', images);
      });
    return;
  }

  // static cylindo images for non-360 products
  if (state.filters.configurator_type === 'static_image' && state.filters.static_images) {
    const images = state.filters.static_images
      .sort((a, b) => (a.priority < b.priority ? -1 : 1))
      .map((image) => {
        const { productCode, features } = getViewerParameters({
          baseSku: image.cylindo_sku || state.filters.cylindo_sku,
          attributes: state.filters.attributes,
          selectedOptions: state.selectedOptions,
        });
        const src = getStaticImageUrl({
          productCode,
          features: applyFeatureOverrides({
            features,
            overwrites: image.cylindo_overwrite_features || [],
            removals: image.cylindo_remove_features || [],
          }),
          frame: image.cylindo_frame,
        });
        return {
          medium: src,
          large: src,
          full: src,
        };
      });
    commit('setProductImages', images);
    return;
  }

  const { productCode, features } = getViewerParameters({
    baseSku: state.filters.cylindo_sku,
    attributes: state.filters.attributes,
    selectedOptions: state.selectedOptions,
  });

  if (state.cylindoViewers.length > 0) {
    state.cylindoViewers.forEach(({ instance }) => {
      instance.setProduct(productCode)
      instance.setFeatures(features);
    });
    return;
  }

  window.cylindo.on('ready', () => {
    const containerIds = ['cylindo-main', 'cylindo-secondary'].filter(id => document.getElementById(id) !== null);

    const globalDefaults = {
      debug: false,
      accountID: 4931,
      SKU: productCode,
      productCode,
      features,
      country: 'us',
      viewerType: 2,
      thumbs: false,
      zoomButton: false,
      fullscreen: false,
    };

    const cylindoViewers = containerIds.map(containerID => ({
      containerID,
      instance: window.cylindo.viewer.create({
        ...globalDefaults,
        ...(state.filters.cylindo_overrides || {}),
        customZoomContainer: `${containerID}-zoom`,
        containerID,
      }),
    }));
    Vue.set(state, 'cylindoViewers', cylindoViewers);
    cylindoViewers[0].instance.on('instance:viewer:ready', () => {
      dispatch('getCylindoImage');
    });
  });
}

export function getCylindoImage({ state, commit }) {
  return new Promise((resolve, reject) => {
    if (state.cylindoViewers.length < 1) {
      // if cylindo failed to initialize, no point in throwing more errors
      resolve();
      return;
    }
    const cylindo = state.cylindoViewers[0].instance;
    let frame = 1;
    if (state.filters && state.filters.cylindo_overrides && state.filters.cylindo_overrides.startFrame) {
      frame = state.filters.cylindo_overrides.startFrame;
    }
    cylindo.getFrameUrl(frame, 2000, (url, errorMessage) => {
      if (errorMessage) {
        reject(errorMessage);
        return;
      }
      commit('setProductImages', [{ full: url }]);
      resolve();
    });
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
        console.warn(`Attribute "${parameter}" not found`);
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

  return apiClient
    .createProduct({
      name,
      model,
      type: state.category,
      image,
      attributes: state.selectedOptions,
    })
    .then(({ handle, variant: { id, inventory_data: inventory } }) => {
      commit('setActiveProduct', { id, handle, inventory });
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
    const urlParams = new URLSearchParams();
    // maintain any existing query string parameters not related to customizer choices
    for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
      if (key !== 'attributes') {
        urlParams.set(key, value);
      }
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
    const { title } = document;

    if (replace && window.history.replaceState) {
      window.history.replaceState(navState, title, newUrl);
      return;
    }

    window.history.pushState(navState, title, newUrl);
  }
}

export function pullSwatches({ commit }, isTrade) {
  apiClient
    .getSwatches(isTrade)
    .then((swatches) => {
      commit('setSwatches', swatches);
    });
}

export default {
  loadProductImages,
  getCylindoImage,
  pullFilter,
  populateSelected,
  getReviews,
  getProductReviews,
  createProductFromSelected,
  updateUrl,
  pullSwatches,
};
