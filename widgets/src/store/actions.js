import ApiClient from '../util/ApiClient';
import FilterStorage from '../util/FilterStorage';
import { parsePreselectedFilters } from './helpers';

const apiClient = new ApiClient();

/**
 * Set up filter definition for category
 */
export function pullFilter({ commit, state }) {
  FilterStorage.getItem(state.category).then((filter) => {
    commit('defineFilter', { filter });
  });
}

/**
 * Get single product matching SKU or selected option configuration for PDP
 */
export function loadProduct({ commit, dispatch, state }, { last = null, sku = null }) {
  // clear last error before checking for new product
  commit('setErrorTrigger', null);

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
      if (!results.hits.length) {
        commit('setErrorTrigger', last);
        return;
      }

      // eslint-disable-next-line
      commit('setProduct', results.hits[0]._source);

      if (sku) {
        dispatch('populateSelectedFromActive');
      }
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
  commit('setSelectedFilters', parsePreselectedFilters(state));
}

/**
 * Loads pre-selected featured products for first page of unfiltered results
 */
export function loadFeatured({ commit, state }) {
  const cacheKey = `featured.${state.category}`;
  const now = (new Date()).getTime();
  const oldExpires = localStorage.getItem(`${cacheKey}.expires`);
  const featuredCache = localStorage.getItem(cacheKey);

  if (featuredCache && (!oldExpires || oldExpires > now)) {
    try {
      commit('saveProducts', JSON.parse(featuredCache));
      return;
    } catch (err) {}
  }

  apiClient
    .perPage(state.perPage)
    .getFeatured(state.category)
    // eslint-disable-next-line
    .then(({ hits: results, total_item_count }) => {
      const featuredProducts = {
        total: total_item_count,
        /* eslint-disable-next-line */
        products: results.hits.map(product => product._source),
        append: false,
      };
      commit('saveProducts', featuredProducts);

      // cache featured items
      const currentTimeInMilliseconds = (new Date()).getTime();
      const hoursToKeep = 6;
      const millisecondsPerHour = 60 * 60 * 1000;
      const expires = currentTimeInMilliseconds + hoursToKeep * millisecondsPerHour;
      localStorage.setItem(cacheKey, JSON.stringify(featuredProducts));
      localStorage.setItem(`${cacheKey}.expires`, JSON.stringify(expires));
    });
}

/**
 * Get page of product results based on current filters and update
 * the URL to include the current filters
 */
export function loadProducts({ commit, state }, page = null) {
  if (window.history.replaceState) {
    const { protocol, host, pathname } = window.location;
    let newUrl = `${protocol}//${host}${pathname}`;

    const params = [];
    state.selectedFilters.forEach((filter) => {
      params.push(`f:${filter.group}:${filter.parameter}=${filter.values.join(',')}`);
    });
    state.selectedOptions.forEach((option) => {
      params.push(`o:${option.parameter}=${option.values.join(',')}`);
    });

    if (params.length) {
      const queryString = encodeURI(params.join('&'));
      newUrl += `?${queryString}`;
    }

    window.history.replaceState({ path: newUrl }, '', newUrl);
  }

  if (page !== null) {
    commit('setPage', page);
  }

  commit('setLoading', true);

  apiClient
    .applyFilters({
      category: state.category,
      filters: state.selectedOptions.concat(state.selectedFilters),
    })
    .perPage(state.perPage)
    .getPage(state.currentPage)
    .then(({ hits: results }) => {
      commit('setLoading', false);
      commit('saveProducts', {
        total: results.total,
        /* eslint-disable-next-line */
        products: results.hits.map(product => product._source),
        append: page !== 1,
      });
    });
}

/**
 * Increment page number and load next page of products
 */
export function nextPage({ state, commit, dispatch }) {
  commit('setPage', state.currentPage + 1);
  dispatch('loadProducts');
}

/**
 * Clear all filters for filter group
 */
export function clearSelections({ state, dispatch, commit }, group) {
  commit('setSelectedOptions', state.selectedOptions.filter(option => option.group !== group));
  commit('setSelectedFilters', state.selectedFilters.filter(filter => filter.group !== group));
  dispatch('loadProducts');
}

/**
 * Add or remove selected filter/option
 */
// eslint-disable-next-line
export function updateFilter({ commit }, { group, parameter, value, queryParam, singleMode = false }) {
  if (queryParam) {
    // eslint-disable-next-line
    commit('toggleOption', { group, parameter, value, singleMode });
    return;
  }

  // eslint-disable-next-line
  commit('toggleFilter', { group, parameter, value, singleMode });
}

/**
 * Set temporary flash message, with timed removal
 */
export function flashMessage({ commit }, message) {
  commit('setNotification', message);

  const duration = document.documentElement.clientWidth >= 1024 ? 5000 : 4000;

  setTimeout(() => {
    commit('setNotification', '');
  }, duration);
}

/**
 * Load products from API for specific batch of SKUs
 */
export function loadSKUs({ state, commit }, skus) {
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

export function getReviews({ commit }, { category = 'sofa', from = 0, size = 20 }) {
  apiClient
    .getReviews(category, from, size)
    .then((results) => {
      console.log('--results--', results);
      commit('setReviews', {
        reviews: results,
      });
    });
}

export default {
  loadProduct,
  loadFeatured,
  loadProducts,
  loadSKUs,
  loadFavorites,
  nextPage,
  pullFilter,
  updateFilter,
  clearSelections,
  populateSelectedFromActive,
  flashMessage,
  getReviews,
};
