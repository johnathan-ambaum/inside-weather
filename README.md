# Shopify Theme

## Setup

### Clone and install dependencies
```
# clone the theme repo and the widgets repo set up as a submodule
git clone --recurse-submodules git@gitlab.com:btownweb/olavier/shopify-theme.git olavier.com

# enter theme directory
cd olavier.com

# install theme Javascript dependencies
yarn install

# enter Vue widgets directory
cd widgets

# install widget Javascript dependencies
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

### Pull latest changes
```
# get theme changes
git pull
# get widget changes
git submodule update --remote --recursive --merge
```

### Build and deploy with automatic file sync
```
slate start
```

### Automatic file sync
```
slate watch
```

### Build and push to Shopify
```
slate deploy
```

### Push changes to remote
```
# the flag will ensure you didn't forget to commit any submodule changes
git push origin branch-name --recurse-submodules=on-demand
```
