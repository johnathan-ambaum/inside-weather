import { debounce } from './helpers';

export default class ApiClient {
  constructor(options) {
    this.options = Object.assign({}, {
      // starting record (default: 0)
      from: 0,
      // page size (default: 50)
      size: 54,
      primary_category: null,
    }, options);
    this.filters = [];

    // eslint-disable-next-line
    this.sendRequest = ({ method, url, body, resolve, reject }) => {
      const fetchOptions = {
        method,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      return fetch(url, fetchOptions)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    };
    this.debouncedSendRequest = debounce(this.sendRequest, 1000);
  }

  /**
   * Overwrite filter parameters with new ones
   */
  applyFilters({ category, filters }) {
    this.options.primary_category = category || this.options.primary_category;
    this.filters = filters || [];
    return this;
  }

  /**
   * Remove all applied filter parameters
   */
  clearFilters() {
    this.filters = [];
    return this;
  }

  /**
   * Construct proper request to favorites endpoint, wrapping the request
   * in a Promise which is returned to the caller for handling
   */
  sendFavoriteRequest({ method, customerId, favorites }) {
    const url = 'https://iw-favorites.herokuapp.com/api/v2/favorites';
    const body = {
      user_id: customerId,
      favorites,
    };

    return new Promise((resolve, reject) => this.sendRequest({
      method, url, body, resolve, reject,
    }));
  }

  /**
   * Add SKU(s) to customer's saved favorites
   * @param {Number} customerId
   * @param {Object} productData
   */
  addFavorites(customerId, productData) {
    const favorites = Array.isArray(productData) ? productData : [productData];
    return this.sendFavoriteRequest({ method: 'POST', customerId, favorites });
  }

  /**
   * Remove SKU(s) from customer's saved favorites
   * @param {Number} customerId
   * @param {Object} productData
   */
  removeFavorites(customerId, productData) {
    const favorites = Array.isArray(productData) ? productData : [productData];
    return this.sendFavoriteRequest({ method: 'DELETE', customerId, favorites });
  }

  getReviews(category, from, size) {
    this.options.primary_category = category;
    this.options.from = from;
    this.options.size = size;

    // eslint-disable-next-line max-len
    let url = `https://iw-reviews.herokuapp.com/api/v1/reviews/search?primary_category=${category}`;

    if (this.options.size) {
      url += `&page=${this.options.from}&size=${this.options.size}`;
    }

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  getProductReviews(primaryCategory, productFamily) {
    // eslint-disable-next-line max-len
    let url = `https://iw-reviews.herokuapp.com/api/v1/reviews/for_product?primary_category=${primaryCategory}&product_family=${productFamily}`;

    if (this.options.size) {
      url += `&page=${this.options.from}&size=${this.options.size}`;
    }

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  createProduct({
    name, model, type, image, attributes,
  }) {
    const url = `https://iw-content.herokuapp.com/api/v1/product/${type}`;
    const body = {
      name,
      model_number: model,
      product_type: type,
      image_url: image,
      attributes,
    };

    return new Promise((resolve, reject) => this.debouncedSendRequest({
      method: 'POST', url, body, resolve, reject,
    }));
  }
}
