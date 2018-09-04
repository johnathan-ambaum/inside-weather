# Shopify Theme

## Setup

### Clone and install dependencies
```
git clone git@gitlab.com:btownweb/olavier/shopify-theme.git olavier.com

cd olavier.com

yarn install
```

### Configuration

Copy `config.yml.example` to `config.yml` and set the appropriate theme_id and password.  The theme ID can be looked up [here](https://loomandloft.myshopify.com/admin/themes.xml) and the password will be in the ThemeKit private app [here](https://loomandloft.myshopify.com/admin/apps/private).

## Development

This theme is using [Shopify Slate](https://shopify.github.io/slate/).

When running any `slate` commands, you can switch the environment configuration that is used with the `-e` flag.

Example:
```
slate start -e staging
```

### Build and deploy with automatic file sync
```
slate start
```

### Automatic file sync
```
slate watch
```

### Build and push to remote
```
slate deploy
```
