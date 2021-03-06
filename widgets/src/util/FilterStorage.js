import { getCookie } from './helpers';

export default class FilterStorage {
  /**
   * Filters will be cached to localStorage, but if not yet cached must be pulled from the API.
   * Because we may need to wait for an async operation, we need to return a Promise even if we
   * are only pulling from the cache.
   * @param {String} category
   */
  static getItem(category) {
    let filters;

    const now = (new Date()).getTime();
    const expires = localStorage.getItem(`filters.${category}.expires`);
    const keyIncludesExpires = RegExp('^filters\.[^.]+\.expires$');
    Object.entries(localStorage).forEach(([key, value]) => {
      if(keyIncludesExpires.test(key)){
        const now = (new Date()).getTime();
        const expires = localStorage.getItem(key);
        if (expires < now) {
          localStorage.removeItem(key);
          localStorage.removeItem(key.replace('.expires',''));
        }
      }
    });
    if (!expires || expires > now) {
      filters = localStorage.getItem(`filters.${category}`);
    }

    if (!filters) {
      return FilterStorage.requestFilter(category);
    }

    try {
      filters = JSON.parse(filters);
    } catch (err) {
      console.warn('Unable to parse filter definition. Falling back to remote source.');
      return FilterStorage.requestFilter(category);
    }

    return new Promise(resolve => resolve(filters));
  }

  /**
   * Cache the filter definition for a single category to localStorage, set to expire in 6 hours
   * @param {String} category
   * @param {Object} filters
   */
  static setItem(category, filters) {
    const currentTimeInMilliseconds = (new Date()).getTime();
    const hoursToKeep = 6;
    const millisecondsPerHour = 60 * 60 * 1000;
    const expires = currentTimeInMilliseconds + hoursToKeep * millisecondsPerHour;

    try {
      localStorage.setItem(`filters.${category}`, JSON.stringify(filters));
      localStorage.setItem(`filters.${category}.expires`, JSON.stringify(expires));
    } catch (err) {
      console.warn('Unable to access localStorage to cache filters');
    }
  }

  /**
   * Pull the filter definition for the category from the API
   * @param {String} category
   */
  static requestFilter(category) {
    category = category.replace("Clearance ", "");

    const keyIncludesExpires = RegExp('^filters\.[^.]+\.expires$');
    const categoryTimestamps = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      if(keyIncludesExpires.test(key)){
        categoryTimestamps.push({key, value})
      }
    })
    const OrderedCategoryTimestamps = categoryTimestamps.sort((a,b) => parseInt(a.value) - parseInt(b.value));
    const maxAllowedFilters = 10;
    if(OrderedCategoryTimestamps.length > maxAllowedFilters ){
      const oldestFilter = OrderedCategoryTimestamps[0].key;
      localStorage.removeItem(oldestFilter);
      localStorage.removeItem(oldestFilter.replace('.expires',''));
    }
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('version');
    let filterEndpoint = `https://iw-content.herokuapp.com/api/v1/product/${category}`;

    let queryParams = new URLSearchParams();
    const pt = getCookie('pt');

    if(pt){
      queryParams.append('pt', pt);
    }

    if (version) {
      queryParams.append('version', version);
    }

    const hasQuery = Array.from(queryParams).length > 0;
    const endpoint = hasQuery ? `${filterEndpoint}?${queryParams.toString()}` : filterEndpoint;
    return fetch(endpoint)
      .then(response => response.json())
      .then((filters) => {
        FilterStorage.setItem(category, filters);
        return filters;
      })
      .catch((filterFetchError) => {
        console.error({ filterFetchError });
      });
  }
}
