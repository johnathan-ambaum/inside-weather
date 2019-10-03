const mix = require('laravel-mix');
const autoprefixer = require('autoprefixer');

mix
  .setPublicPath('../src/assets')
  .js('src/main.js', 'widgets.js')
  .extract([
    '@glidejs/glide',
    'scrollmonitor',
    'vue',
    'vuex',
  ], 'widgets.vendor.js')
  .options({
    extractVueStyles: 'widgets.css',
    postCss: [autoprefixer],
  });
