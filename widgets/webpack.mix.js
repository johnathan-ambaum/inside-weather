const mix = require('laravel-mix');

mix
  .js('src/main.js', 'widgets.js')
  .js('src/product.js', 'product.js')
  .js('src/favorites.js', 'favorites.js')
  .vue({
    extractStyles: 'widgets.css',
    version: 2,
  })
  .extract([
    'vue',
    'vuex',
    'dompurify',
    '@glidejs/glide',
    '@fortawesome/vue-fontawesome',
    '@fortawesome/fontawesome-svg-core',
  ], 'widgets.vendor.js')
  .setPublicPath('../src/assets');
