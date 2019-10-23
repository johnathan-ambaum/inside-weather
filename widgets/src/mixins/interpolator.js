import { mapState } from 'vuex';

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

    fulfillmentTime() {
      if (!this.filters) {
        return null;
      }

      let min = this.filters.min_fulfillment_days;
      let max = this.filters.max_fulfillment_days;

      Object.entries(this.selectedOptions).forEach(([parameter, value]) => {
        const attribute = this.attributes.find(item => item.parameter === parameter);
        if (!attribute) {
          return true;
        }
        const selected = attribute.values.find(item => item.value === value);
        if (!selected) {
          return true;
        }
        min += selected.min_fulfillment_days_markup || 0;
        max += selected.max_fulfillment_days_markup || 0;
      });

      return `${min}-${max} days`;
    },

    fullProduct() {
      return {
        name: this.productName,
        handle: this.activeProduct.handle,
        sku: this.productSku,
        model: this.modelNumber,
        price: this.productPrice,
        msrp: this.msrp,
        category: this.productType,
        image: this.productImages.length ? this.productImages[0].large : null,
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
  },
};
