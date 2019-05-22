import Vue from 'vue';
import ApiClient from '../util/ApiClient';
import { localFavorites, customerFavorites } from './favorites';

const apiClient = new ApiClient();

export function setLoading(state, isLoading) {
  Vue.set(state, 'loadingProducts', isLoading);
}

/**
 * Save products, appending to existing products if some have already been populated
 */
export function saveProducts(state, { products, total, append }) {
  if (append) {
    products.forEach((product) => {
      state.products.push(product);
    });
  } else {
    Vue.set(state, 'products', products);
  }

  if (total !== null) {
    this.commit('setTotalResults', total);
  }
}

export function setTotalResults(state, total) {
  Vue.set(state, 'totalResults', total);
}

/**
 * Save filter definition, populating pre-selected filters if necessary
 */
export function defineFilter(state, { filter }) {
  Vue.set(state, 'filters', filter);
  if (state.activeProduct) {
    this.dispatch('populateSelectedFromActive');
  }
}

/**
 * Parse the category page state query string and use it to pre-define the selected options,
 * so that the URL is shareable to see the same results
 */
export function applyQueryString(state) {
  const queryString = window.location.search.substring(1);

  if (!queryString.length) {
    return;
  }

  const options = queryString
    .split('&')
    .filter(item => item.indexOf('o:') === 0)
    .map((item) => {
      const [prefixedParameter, values] = item.split('=');

      if (values === '') {
        return null;
      }

      const parameter = prefixedParameter.substring(2);

      return {
        // option parameter always matches group, only filters differ
        group: parameter,
        parameter,
        values: values.split(','),
      };
    })
    .filter(option => option !== null);

  if (options.length > 0) {
    Vue.set(state, 'selectedOptions', options);
  }

  const filters = queryString
    .split('&')
    .filter(item => item.indexOf('f:') === 0)
    .map((item) => {
      const [prefixedParameter, values] = item.split('=');

      if (values === '') {
        return null;
      }

      const [group, parameter] = prefixedParameter.substring(2).split(':');

      return {
        group,
        parameter,
        values: values.split(','),
      };
    })
    .filter(filter => filter !== null);

  if (filters.length > 0) {
    Vue.set(state, 'selectedFilters', filters);
  }
}

/**
 * Save which filter triggered a 404 and needs an error message popup
 */
export function setErrorTrigger(state, newTrigger) {
  Vue.set(state, 'lastErrorTrigger', newTrigger);
}

/**
 * Activate/deactivate a clicked filter
 */
export function toggleFilter(state, {
  group, parameter, value, singleMode = false,
}) {
  const currentIndex = state.selectedFilters.findIndex(
    filter => filter.parameter === parameter
  );

  let added = false;

  if (currentIndex === -1) {
    state.selectedFilters.push({
      group,
      parameter,
      values: [value],
    });
    added = true;
  }

  let currentSelected = state.selectedFilters[currentIndex];
  currentSelected = currentSelected ? currentSelected.values : [];

  if (!added && !currentSelected.includes(value)) {
    state.selectedFilters[currentIndex].values.push(value);
    added = true;
  }

  if (!added) {
    const filtered = currentSelected.filter(option => option !== value);

    if (filtered.length > 0) {
      Vue.set(state.selectedFilters[currentIndex], 'values', filtered);
    } else {
      state.selectedFilters.splice(currentIndex, 1);
    }
  }

  if (singleMode) {
    return;
  }

  /**
   * If a new filter was added, we need to check that all currently selected options fall within the new
   * filter parameters.  Leaving invalid options selected after the filters are changed will cause 0 results.
   */
  if (added) {
    const optionIndex = state.selectedOptions.findIndex(
      opt => opt.parameter === group
    );

    if (optionIndex !== -1) {
      // get the option definitions for the filter's filterGroup, so that we can check their valid filter parameters
      const optionGroup = state.filters.filterGroups.find(
        filterGroup => filterGroup.parameter === group
      );

      /**
       * We need to get the invalid option values which need to be deselected in 2 steps:
       *
       * 1. Find options that don't fit the new filter
       * 2. Find options that do still apply
       *
       * We need both sets, so that we can use the eliminated options for messaging to the user
       */
      const eliminated = state.selectedOptions[optionIndex].values.filter(
        (val) => {
          // get the filter parameters that are valid for the selected option
          const { parameters } = optionGroup.options.find(
            option => option.value === val
          );
          // filter out selected options which still fit the new filter
          return !parameters[parameter].includes(value);
        }
      );
      const newSelected = state.selectedOptions[optionIndex].values.filter(
        val => !eliminated.includes(val)
      );

      if (newSelected.length > 0) {
        Vue.set(state.selectedOptions[optionIndex], 'values', newSelected);
      } else {
        state.selectedOptions.splice(optionIndex, 1);
      }

      if (eliminated.length > 0) {
        const filter = optionGroup.filters.find(
          item => item.parameter === parameter
        );
        const { name: filterValue } = filter.values.find(
          item => item.value === value
        );

        let message = '<strong>WE REMOVED</strong> ';
        message += eliminated
          .slice(0, 2)
          .map((val) => {
            const { name } = optionGroup.options.find(
              option => option.value === val
            );
            return `${optionGroup.name} | ${name}`;
          })
          .join(', ');
        if (eliminated.length > 2) {
          message += `, +${eliminated.length - 2} other options`;
        }
        message += ` &nbsp;&nbsp;&nbsp;<br><strong>BECAUSE YOU SELECTED</strong> ${
          filter.name
        } | ${filterValue}`;
        this.dispatch('flashMessage', message);
      }
    }
  }

  this.dispatch('loadProducts', 1);
}

/**
 * Activate/deactivate a clicked option
 */
export function toggleOption(state, {
  group, parameter, value, singleMode,
}) {
  let updated = false;

  const currentIndex = state.selectedOptions.findIndex(
    option => option.parameter === parameter
  );

  if (currentIndex === -1) {
    state.selectedOptions.push({
      group,
      parameter,
      values: [value],
    });
    updated = true;
  }

  let currentSelected = state.selectedOptions[currentIndex] || null;
  currentSelected = currentSelected ? currentSelected.values : [];

  if (!updated && !currentSelected.includes(value)) {
    Vue.set(
      state.selectedOptions[currentIndex],
      'values',
      singleMode
        ? [value]
        : state.selectedOptions[currentIndex].values.concat([value])
    );
    updated = true;
  }

  if (!updated) {
    const filtered = currentSelected.filter(option => option !== value);

    if (filtered.length > 0) {
      Vue.set(state.selectedOptions[currentIndex], 'values', filtered);
    } else if (!singleMode) {
      state.selectedOptions.splice(currentIndex, 1);
    }
  }

  if (singleMode) {
    this.dispatch('loadProduct', {
      last: {
        parameter,
        value,
      },
    });
  } else {
    this.dispatch('loadProducts', 1);
  }
}

/**
 * Set current category
 */
export function updateCategory(state, newCategory) {
  Vue.set(state, 'category', newCategory);
}

/**
 * Set currently open filter group and add class to body if a filter is open,
 * so that this can be used to prevent scrolling on category desktop page
 */
export function selectPanel(state, newPanel) {
  Vue.set(state, 'openPanel', newPanel);
  document.body.classList.toggle('BrowseFilters--Open', newPanel !== '');
}

export function setProduct(state, newProduct) {
  Vue.set(state, 'activeProduct', newProduct);

  if (window.history.pushState && newProduct && newProduct.handle) {
    const { protocol, host, pathname } = window.location;
    const uri = `/collections/${newProduct.primary_category}/products/${
      newProduct.handle
    }`;
    const newUrl = `${protocol}//${host}${uri}`;
    const navState = {
      path: newUrl,
      sku: newProduct.sku,
    };
    const title = `${newProduct.name} - Inside Weather`;

    document.title = title;

    if (uri === pathname) {
      // need to replace current state on initial load so that we have a state object when back button clicked later
      window.history.replaceState(navState, title, newUrl);
    } else {
      window.history.pushState(navState, title, newUrl);
    }
  }

  if (state.category) {
    return;
  }

  this.commit('updateCategory', newProduct.primary_category);
  this.dispatch('pullFilter');
}

/**
 * Override all selected options with a new set
 */
export function setSelectedOptions(state, selected) {
  Vue.set(state, 'selectedOptions', selected);
}

/**
 * Override all selected filters with a new set
 */
export function setSelectedFilters(state, selected) {
  Vue.set(state, 'selectedFilters', selected);
}

/**
 * Set current result page number (for API pagination)
 */
export function setPage(state, newPage) {
  Vue.set(state, 'currentPage', newPage);
}

/**
 * Set result count limit (for API pagination)
 */
export function setPerPage(state, newLimit) {
  Vue.set(state, 'perPage', newLimit);
}

/**
 * Set notification message to pop up for the user
 */
export function setNotification(state, message) {
  Vue.set(state, 'notificationMessage', message);
}

/**
 * Add or remove a product from the user's favorites
 */
export function toggleFavorite(state, { product, customerId }) {
  const index = state.favorites.findIndex(fav => fav === product.sku);

  if (index !== -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(product.sku);
  }

  window.dataLayer.push({
    event: 'AddToWishlist',
    eventCategory: 'Favorite',
    eventAction: index === -1 ? 'add' : 'remove',
    eventLabel: product.long_display_name,
    productIds: [product.sku],
    productName: product.long_display_name,
    totalValue: product.price,
    productHandle: product.handle,
  });

  if (!customerId) {
    localStorage.setItem('favoriteProducts', JSON.stringify(state.favorites));
    return;
  }

  // sync all local favorites to server if first time
  if (!customerFavorites.length && localFavorites.length) {
    apiClient
      .addFavorites(customerId, Array.from(state.favorites))
      .then(() => {
        localStorage.removeItem('favoriteProducts');
      });
    return;
  }

  if (index !== -1) {
    apiClient.removeFavorites(customerId, product.sku);
    return;
  }

  apiClient.addFavorites(customerId, product.sku);
}

/**
 * Override the currently favorited products. This affects local state only,
 * for displaying the icon filled or not.
 */
export function setFavorites(state, { skus }) {
  Vue.set(state, 'favorites', skus);
}

export function setReviews(state, { reviews }) {
  Vue.set(state, 'reviews', reviews);
}

export function setTotalReviews(state, { totalReviews }) {
  Vue.set(state, 'totalReviews', totalReviews);
}

export default {
  setLoading,
  saveProducts,
  setTotalResults,
  defineFilter,
  toggleFilter,
  toggleOption,
  updateCategory,
  setProduct,
  selectPanel,
  setSelectedOptions,
  setSelectedFilters,
  setPage,
  setPerPage,
  applyQueryString,
  setErrorTrigger,
  setNotification,
  toggleFavorite,
  setFavorites,
  setReviews,
  setTotalReviews,
};
