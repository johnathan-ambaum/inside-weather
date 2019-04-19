# Project Setup

## Install dependencies
```
yarn install
```

## Development

Build files will be placed directly into the Shopify theme.  For syncing to remote, use [Shopify ThemeKit](https://shopify.github.io/themekit/) from the `{PROJECT_ROOT}/src/` directory.

### Build unminified with source maps
```
yarn dev
```

### Compile unminified with hot-reload
```
yarn watch
```

### Build and minify for production

This will be slow, the tree shaking for FontAwesome icon imports takes a long time.

```
yarn prod
```
