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
  if (state.activeProduct) {
    this.dispatch('populateSelectedFromActive');
  }
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
 * Set result count limit (for API pagination)
 */
export function setPerPage(state, newLimit) {
  Vue.set(state, 'perPage', newLimit);
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

export function setProductReviews(state, { reviews }) {
  Vue.set(state, 'productReviews', reviews);
}

export function setProductCreationInProgress(state, inProgress) {
  Vue.set(state, 'productCreationInProgress', inProgress);
}

export function setVariantId(state, id) {
  Vue.set(state, 'variantId', id);
}

export default {
  saveProducts,
  defineFilter,
  setOption,
  setProductImages,
  updateCategory,
  setProduct,
  selectPanel,
  setSelectedOptions,
  setPerPage,
  applyQueryString,
  toggleFavorite,
  setFavorites,
  setReviews,
  setTotalReviews,
  setProductReviews,
  setProductCreationInProgress,
  setVariantId,
};
