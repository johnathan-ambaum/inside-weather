# Shopify Theme

## Setup

### Configuration

In the `src/` directory, copy `config.yml.example` to `config.yml` and set the appropriate theme_id and password.  The theme ID can be looked up [here](https://loomandloft.myshopify.com/admin/themes.xml) and the password will be in the ThemeKit private app [here](https://loomandloft.myshopify.com/admin/apps/private).

## Development

Theme files are synced with Shopify using [ThemeKit](https://shopify.github.io/themekit/).

The `theme` command should be run from the `src/` directory.  When uploading or downloading files, you can define exclusions in your `config.yml`.  See ThemeKit docs for more info.

When running any `theme` commands, you can switch the environment configuration that is used with the `-e` flag.  The environment name will correspond to a key in `config.yml`

Example:
```
theme watch -e staging
```

### Download theme files
```
# entire theme
theme download

# specific files
theme download layouts/theme.liquid assets/style.css.liquid
```

### Watch for changes and auto-upload
```
theme watch
```

### Upload full theme
```
theme deploy
```
