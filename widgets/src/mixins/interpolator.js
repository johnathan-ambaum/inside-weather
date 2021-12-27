import { mapState } from 'vuex';
import ApiClient from '../util/ApiClient';
import { getStaticImageUrl, getViewerParameters } from '../util/cylindo';
import FilterStorage from '../util/FilterStorage';

const apiClient = new ApiClient();

export default {
  computed: {
    ...mapState({
      filters: state => state.filters,
      attributes: state => state.filters.attributes,
      basePrice: state => state.filters.price,
      templates: state => state.filters.templates,
      selectedOptions: state => state.selectedOptions,
      activeProduct: state => state.activeProduct,
      productType: state => state.category,
    }),

    productName() {
      if (!this.templates) {
        return '';
      }
      const { template = '' } = this.templates.find(item => item.key === 'name') || {};
      return this.interpolateString(template);
    },

    modelNumber() {
      if (!this.templates) {
        return '';
      }
      const { template = '' } = this.templates.find(item => item.key === 'model_number') || {};
      return this.interpolateString(template);
    },

    productSku() {
      return this.modelNumber;
    },

    productPrice() {
      if (!this.basePrice || Object.keys(this.selectedOptions).length < 1) {
        return null;
      }

      return Object.entries(this.selectedOptions).reduce((total, [parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return total;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected || !selected.price_markup) {
          return total;
        }
        return total + Number(selected.price_markup);
      }, Number(this.basePrice));
    },

    msrp() {
      return this.productPrice * this.filters.msrp_markup;
    },

    msrpDisplay() {
      return `$${Math.round(this.msrp)}`;
    },

    savings() {
      const savings = this.msrp - this.productPrice;
      return Math.round(savings);
    },

    fulfillmentDays() {
      const min = this.filters.min_fulfillment_days;
      const max = this.filters.max_fulfillment_days;
      const selectedOptionsMin = [0];
      const selectedOptionsMax = [0];

      Object.entries(this.selectedOptions).forEach(([parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return true;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return true;
        }
        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });

      const finalMin = min + Math.max(...selectedOptionsMin);
      const finalMax = max + Math.max(...selectedOptionsMax);

      return {
        minDays: finalMin,
        maxDays: finalMax,
      };
    },

    fulfillmentTime() {
      if (!this.filters || !this.filters.min_fulfillment_days) {
        return null;
      }

      const { minDays, maxDays } = this.fulfillmentDays;

      return `${minDays}-${maxDays} days`;
    },

    emailFulfillmentTime() {
      if (!this.filters || !this.filters.email_min_fulfillment_days) {
        return null;
      }

      let min = this.filters.email_min_fulfillment_days;
      let max = this.filters.email_max_fulfillment_days;
      let selectedOptionsMin = [];
      let selectedOptionsMax = [];

      Object.entries(this.selectedOptions).forEach(([parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return true;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return true;
        }
        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });

      let finalMin = min + Math.max(...selectedOptionsMin);
      let finalMax = max + Math.max(...selectedOptionsMax);

      return `${finalMin}-${finalMax} business days`;
    },

    hasFulfillmentMarkup() {
      return Object.entries(this.selectedOptions).some(([parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return false;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return false;
        }
        return selected.min_fulfillment_days_markup || selected.max_fulfillment_days_markup;
      });
    },

    fullProduct() {
      let image = null;
      if (this.productImages.length) {
        image = this.productImages[0].large || this.productImages[0].full;
      }
      return {
        name: this.productName,
        handle: this.activeProduct.handle,
        sku: this.productSku,
        model: this.modelNumber,
        price: this.productPrice,
        msrp: this.msrp,
        category: this.productType,
        image,
      };
    },
  },

  methods: {
    interpolateString(template, debug = false) {
      return this.interpolateWithValues({
        template,
        attributes: this.attributes,
        selectedOptions: this.selectedOptions,
        debug,
      });
    },

    interpolateWithValues({
      template, attributes, selectedOptions, debug = false,
    }) {
      if (debug) {
        console.log({ selectedOptions });
      }

      if (!Object.keys(selectedOptions).length) {
        return '';
      }

      // placeholders for interpolation are formatted as {{Attribute Dislay Name.selected_value_property}}
      const matches = template.match(/\{\{[^.]+\.[^}]+\}\}/g);

      if (debug) {
        console.log({ matches });
      }

      if (!matches) {
        return template;
      }

      let content = template;

      matches.forEach((placeholder) => {
        let replacement;
        const [attributeName, property] = placeholder.replace(/[{}]/g, '').split('.');
        const attribute = attributes.find(att => att.name === attributeName);
        if (debug) {
          console.log({ attributeName, property, attribute: JSON.parse(JSON.stringify(attribute)) });
        }
        if (attribute) {
          const selected = attribute.values.find(item => item.value === selectedOptions[attribute.parameter]) || {};
          replacement = selected[property] || '';
          if (debug) {
            console.log({ selectedValue: selectedOptions[attribute.parameter], selected: JSON.parse(JSON.stringify(selected)), replacement });
          }
        }
        content = content.split(placeholder).join(replacement);
      });

      return content;
    },

    getFulfillmentTime(filters, selectedOptions, attributes) {
      if (!filters || !filters.min_fulfillment_days) {
        return null;
      }

      let min = filters.min_fulfillment_days;
      let max = filters.max_fulfillment_days;
      let selectedOptionsMin = [];
      let selectedOptionsMax = [];

      Object.entries(selectedOptions).forEach(([parameter, value]) => {
        const attribute = attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return true;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return true;
        }
        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });

      let finalMin = min + Math.max(...selectedOptionsMin);
      let finalMax = max + Math.max(...selectedOptionsMax);

      return `${finalMin}-${finalMax} days`;
    },

    getEmailFulfillmentTime(filters, selectedOptions, attributes) {
      if (!filters || !filters.email_min_fulfillment_days) {
        return null;
      }

      let min = filters.email_min_fulfillment_days;
      let max = filters.email_max_fulfillment_days;
      let selectedOptionsMin = [];
      let selectedOptionsMax = [];

      Object.entries(selectedOptions).forEach(([parameter, value]) => {
        const attribute = attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return true;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return true;
        }
        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });

      let finalMin = min + Math.max(...selectedOptionsMin);
      let finalMax = max + Math.max(...selectedOptionsMax);

      return `${finalMin}-${finalMax} business days`;
    },

    buildSelectedOptions(attributeMatches, attributes, existingSelections) {
      const selectedOptions = {};
      Object.entries(attributeMatches).forEach(([parameter, { matches, value }]) => {
        if (value) { // having a defined value overrules everything
          selectedOptions[parameter] = value;
          return;
        }

        const foundAttribute = attributes.find(attribute => attribute.parameter === matches);
        const foundValue = foundAttribute.values.find((item) => item.value === existingSelections[matches]) || foundAttribute.values[0];
        if (foundValue) {
          selectedOptions[parameter] = foundValue.value;
        }
      });

      return selectedOptions;
    },

    createCylindoImageUrl(selectedOptions, relatedProductFilterDefs) {
      const { productCode, features } = getViewerParameters({
        baseSku: relatedProductFilterDefs.cylindo_sku,
        attributes: relatedProductFilterDefs.attributes,
        selectedOptions,
      });

      let frame = 1;
      if (relatedProductFilterDefs && relatedProductFilterDefs.cylindo_overrides && relatedProductFilterDefs.cylindo_overrides.startFrame) {
        frame = relatedProductFilterDefs.cylindo_overrides.startFrame;
      }

      return getStaticImageUrl({ productCode, features, frame });
    },

    async buildRelatedProducts(products, selections) {
      const relatedProducts = [];

      products.forEach(async (relatedProductData) => {
        const relatedProduct = {
          title: '',
          url: '',
          image: [],
          product_type: '',
        };

        await FilterStorage.getItem(relatedProductData.product_type).then((response) => {
          if (!response.templates) {
            return;
          }

          const { attributes } = response;
          const selectedOptions = this.buildSelectedOptions(relatedProductData.attributes, attributes, selections);

          const { template = '' } = response.templates.find(item => item.key === 'name') || {};
          const attributeString = Object.entries(selectedOptions).map(([param, value]) => `${param}:${value}`).join(',');
          relatedProduct.title = this.interpolateWithValues({ template, attributes, selectedOptions, debug: false });
          relatedProduct.url = `/products/${relatedProductData.base_product_handle}?attributes=${attributeString}`;

          if (!response.cylindo_sku) {
            apiClient.getImages({
              type: relatedProductData.product_type,
              attributes: selectedOptions,
              debounce: false
            }).then((images) => {
              relatedProduct.image = images;
              relatedProduct.product_type = relatedProductData.product_type;
            });
          } else {
            relatedProduct.image = this.createCylindoImageUrl(selectedOptions, response);
            relatedProduct.product_type = relatedProductData.product_type;
          }

          relatedProducts.push(relatedProduct);
        });
      });

      relatedProducts.sort((a, b) => (a.priority < b.priority ? -1 : 1));

      return relatedProducts;
    },
  },
};
