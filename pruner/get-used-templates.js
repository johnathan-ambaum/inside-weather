const path = require('path');
const Shopify = require('shopify-api-node');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const {
  SHOP: shopName,
  KEY: apiKey,
  PASSWORD: password,
} = process.env;

const shopify = new Shopify({ shopName, apiKey, password, autoLimit: true });

module.exports = async () => {
  let params = { limit: 250 };
  let templates = [];

  /**
   * Pages
   */
  do {
    const pages = await shopify.page.list(params);
    templates = templates.concat(pages.map(page => page.template_suffix));

    params = pages.nextPageParameters;
  } while (params !== undefined);

  const pageTemplates = [...new Set(templates.filter(template => template && template.length))].sort();

  /**
   * Articles
   */
  params = { limit: 250 };
  templates = [];

  do {
    const articles = await shopify.article.list(51157499988, params);
    templates = templates.concat(articles.map(article => article.template_suffix));

    params = articles.nextPageParameters;
  } while (params !== undefined);

  articleTemplates = [...new Set(templates.filter(template => template && template.length))].sort();

  return {
    pageTemplates,
    articleTemplates,
  };
};
