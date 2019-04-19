let customer = [];
if (window.pnwCfg && window.pnwCfg.favoriteProducts) {
  customer = window.pnwCfg.favoriteProducts;
}

let local = [];

if (localStorage.getItem('favoriteProducts')) {
  try {
    local = JSON.parse(localStorage.getItem('favoriteProducts'));
  } catch (err) {
    console.warn('Invalid favorites data detected');
  }
}

export const customerFavorites = customer;
export const localFavorites = local;
export const favorites = customerFavorites.length ? [...customerFavorites] : [...localFavorites];

export default {
  localFavorites,
  customerFavorites,
  favorites,
};
