import { mapState } from 'vuex';

const emptyImage = {
  full: [],
  large: [],
  medium: [],
  thumbnail: [],
};

export default {
  computed: {
    ...mapState({
      filterGroups: state => state.filters.filterGroups,
    }),

    multiLineName() {
      return this.product.short_name.split(' ').join('<br> ');
    },

    featureText() {
      return (feature) => {
        let text = this.product.raw[feature] || '';

        let groups = this.filterGroups;

        if (!groups && this.filters) {
          groups = this.filters.filterGroups;
        }

        if (!groups) {
          return text;
        }

        const featureGroup = groups.find(group => group.parameter === feature);
        if (featureGroup) {
          text = `${featureGroup.name}: ${text}`;
        }

        return text;
      };
    },

    features() {
      if (!this.product) {
        return [];
      }

      return this.product.featured_parameters.map((filter) => {
        const lastIndex = filter.hover_image.lastIndexOf('.');
        let name = filter.hover_image.substr(0, lastIndex);
        const suffix = name.split('_').pop();
        if (suffix === 'medium') {
          name = name.replace('_medium', '');
        }
        const extension = filter.hover_image.substr(lastIndex + 1);
        return {
          parameter: filter.key,
          image: {
            full: null,
            large: filter.hover_image,
            medium: `${name}_medium.${extension}`,
            thumbnail: `${name}_thumb.${extension}`,
          },
          icon: filter.icon,
        };
      });
    },

    images() {
      if (!this.product) {
        return emptyImage;
      }

      const imageObject = this.product.images || null;

      if (!imageObject) {
        return emptyImage;
      }

      const images = [];
      imageObject.thumbnail.forEach((src, index) => {
        images.push({
          full: imageObject.full && imageObject.full[index],
          large: imageObject.large && imageObject.large[index],
          medium: imageObject.medium && imageObject.medium[index],
          thumbnail: src,
        });
      });

      return images;
    },

    featuredImage() {
      return this.images[0] || emptyImage;
    },

    secondImage() {
      return this.images[1] || emptyImage;
    },

    secondaryImages() {
      return this.images.slice(2);
    },
  },
};
