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
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('version');
    let filterEndpoint = `https://iw-content.herokuapp.com/api/v1/product/${category}`;
    if (version) {
      filterEndpoint += `?version=${version}`;
    }

    return fetch(filterEndpoint)
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
