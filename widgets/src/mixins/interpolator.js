import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      attributes: state => state.filters.attributes,
      selectedOptions: state => state.selectedOptions,
    }),
  },

  methods: {
    interpolateString(text) {
      // placeholders for interpolation are formatted as {{Attribute Dislay Name.selected_value_property}}
      const matches = text.match(/\{\{[A-z_ ]+\.[A-z_ ]+\}\}/g);

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
