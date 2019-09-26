import Vue from 'vue';
import ApiClient from '../util/ApiClient';
import { localFavorites, customerFavorites } from './favorites';

const apiClient = new ApiClient();

/**
 * Save products, appending to existing products if some have already been populated
 */
export function saveProducts(state, { products, append }) {
  if (append) {
    products.forEach((product) => {
      state.products.push(product);
    });
  } else {
    Vue.set(state, 'products', products);
  }
}

/**
 * Save filter definition, populating pre-selected filters if necessary
 */
export function defineFilter(state, { filter }) {
  Vue.set(state, 'filters', filter);
}

/**
 * Parse the category page state query string and use it to pre-define the selected options,
 * so that the URL is shareable to see the same results
 */
export function applyQueryString(state) {
  const queryString = decodeURIComponent(window.location.search.substring(1));

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
}

/**
 * Activate/deactivate a clicked option
 */
export function setOption(state, { parameter, value }) {
  Vue.set(state.selectedOptions, parameter, value);
  this.dispatch('loadProductImages');
  this.dispatch('updateUrl');
}

/**
 *  Set object containing the multiple sizes of product image set
 */
export function setProductImages(state, images) {
  let newImages = images;

  if (typeof newImages.thumb !== 'undefined') {
    newImages = images.thumb.map((thumbnail, index) => ({
      thumbnail,
      medium: images.medium[index],
      large: images.large[index],
      full: images.full[index],
    }));
  }

  Vue.set(state, 'productImages', newImages);
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


/**
 * Override all selected options with a new set
 */
export function setSelectedOptions(state, selected) {
  Vue.set(state, 'selectedOptions', selected);
  this.dispatch('loadProductImages');
}

/**
 * Add or remove a product from the user's favorites
 */
export function toggleFavorite(state, { customerId, product }) {
  if (!product.id || !product.handle) {
    return;
  }

  const index = state.favorites.findIndex(fav => fav && fav.handle === product.handle);

  if (index !== -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(product);
  }

  // window.dataLayer.push({
  //   event: 'AddToWishlist',
  //   eventCategory: 'Favorite',
  //   eventAction: index === -1 ? 'add' : 'remove',
  //   eventLabel: product.name,
  //   productIds: [product.sku],
  //   productName: product.name,
  //   totalValue: product.price,
  //   productHandle: product.handle,
  // });

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
    apiClient.removeFavorites(customerId, product);
    return;
  }

  apiClient.addFavorites(customerId, product);
}

export function setReviews(state, { reviews }) {
  Vue.set(state, 'reviews', reviews);
}

export function setTotalReviews(state, { totalReviews }) {
  Vue.set(state, 'totalReviews', totalReviews);
}

export function setProductReviews(state, { reviews }) {
  Vue.set(state, 'productReviews', reviews);
}

export function setProductCreationInProgress(state, inProgress) {
  Vue.set(state, 'productCreationInProgress', inProgress);
}

export function setActiveProduct(state, product) {
  Vue.set(state, 'activeProduct', product);
}

export default {
  saveProducts,
  defineFilter,
  setOption,
  setProductImages,
  updateCategory,
  selectPanel,
  setSelectedOptions,
  applyQueryString,
  toggleFavorite,
  setReviews,
  setTotalReviews,
  setProductReviews,
  setProductCreationInProgress,
  setActiveProduct,
};
