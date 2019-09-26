import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      attributes: state => state.filters.attributes,
      basePrice: state => state.filters.price,
      templates: state => state.filters.templates,
      selectedOptions: state => state.selectedOptions,
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
            console.log({ selected: JSON.parse(JSON.stringify(selected)), replacement });
          }
        }
        content = content.split(placeholder).join(replacement);
      });

      return content;
    },
  },
};
