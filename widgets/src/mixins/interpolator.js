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
        const selected = attribute.values.find(item => item.value === value);
        if (!selected.price_markup) {
          return total;
        }
        return total + Number(selected.price_markup);
      }, Number(this.basePrice));
    },
  },

  methods: {
    interpolateString(text) {
      // placeholders for interpolation are formatted as {{Attribute Dislay Name.selected_value_property}}
      const matches = text.match(/\{\{[^.]+\.[^}]+\}\}/g);

      if (!matches) {
        return text;
      }

      let content = text;

      matches.forEach((placeholder) => {
        let replacement;
        const [attributeName, property] = placeholder.replace(/[{}]/g, '').split('.');
        const attribute = this.attributes.find(att => att.name === attributeName);
        if (attribute) {
          const selected = attribute.values.find(item => item.value === this.selectedOptions[attribute.parameter]) || {};
          replacement = selected[property] || '';
        }
        content = content.split(placeholder).join(replacement);
      });

      return content;
    },
  },
};
