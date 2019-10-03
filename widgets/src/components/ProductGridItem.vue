<template>
  <div class="ProductGridItem">
    <a
      :href="detailUrl"
      class="ProductGridItem__Link"
    >
      <responsive-image
        :images="featuredImage"
        :scale="80"
        sizes="(min-width: 1025px) 340px, 50vw"
        class="ProductGridItem__Image"
      />
      <span class="ProductGridItem__TitleRow">
        <span class="ProductGridItem__Title">
          {{ product.name }}
          <span class="ProductGridItem__Model">Model No&deg; {{ modelNumber }}</span>
        </span>
        <span class="ProductGridItem__Price">${{ dollarPrice }}</span>
      </span>
      <span
        :class="{ isFavorite }"
        role="button"
        class="ProductGridItem__Favorite"
        @click.stop.prevent="$bus.$emit('favorite', product)"
      >
        <font-awesome-icon :icon="favoriteIcon"/>
      </span>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as emptyHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ResponsiveImage from './ResponsiveImage.vue';
import interpolator from '../mixins/interpolator';

library.add(emptyHeart, filledHeart);

export default {
  components: {
    ResponsiveImage,
    FontAwesomeIcon,
  },

  mixins: [
    interpolator,
  ],

  props: {
    product: { type: Object, required: true },
    filters: { type: Object, required: true },
    isMobile: { type: Boolean, required: true },
    isFavorite: { type: Boolean, default: false },
    loadMobile: { type: Boolean, default: false },
  },

  computed: {
    ...mapState({
      category: state => state.category,
    }),

    detailUrl() {
      return `/products/${this.product.handle}`;
    },

    featuredImage() {
      const nameParts = this.product.cover_image_url.split('.');
      const extension = nameParts.pop();
      const name = nameParts.join('.');
      return {
        full: this.product.cover_image_url,
        large: `${name}_large.${extension}`,
        medium: `${name}_medium.${extension}`,
        thumbnail: `${name}_thumb.${extension}`,
      };
    },

    modelNumber() {
      if (!this.filters.templates) {
        return '';
      }

      const { template = '' } = this.filters.templates.find(t => t.key === 'model_number') || {};

      return this.interpolateWithValues({
        template,
        attributes: this.filters.attributes,
        selectedOptions: this.product.attributes,
      });
    },

    dollarPrice() {
      return parseInt(this.product.price, 10);
    },

    favoriteIcon() {
      if (this.isFavorite) {
        return ['fas', 'heart'];
      }

      return ['fal', 'heart'];
    },
  },

  watch: {
    loadMobile: {
      immediate: true,
      handler(load) {
        if (this.isMobile && load) {
          setTimeout(() => {
            this.$bus.$emit('grid-item:loaded');
          }, 50);
        }
      },
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductGridItem {
  border-bottom: 1px solid #d4d0ca;
  flex: 0 0 50%;
  margin: 0;
  overflow: hidden;
  padding: 0 10px 10px;
  position: relative;
  text-align: center;

  @include at-query($breakpoint-small) {
    @at-root {
      &:nth-child(1),
      &:nth-child(2) {
        border-top: 1px solid #d4d0ca;
      }
    }
  }

  @include at-query($breakpoint-large) {
    flex: 0 0 25%;
    padding: 0;

    @at-root {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        border-top: 1px solid #d4d0ca;
      }
    }
  }

  & + & {
    border-left: 1px solid #d4d0ca;

    @include at-query($breakpoint-small) {
      @at-root {
        & + &:nth-child(2n+3) {
          border-left: none;
        }
      }
    }

    @include at-query($breakpoint-large) {
      @at-root {
        & + &:nth-child(4n+5) {
          border-left: none;
        }
      }
    }
  }

  &:last-child {
    &:nth-child(1) {
      border-right: 1px solid #d4d0ca;
    }

    @include at-query($breakpoint-small) {
      &:nth-child(2n+3) {
        border-right: 1px solid #d4d0ca;
      }
    }

    @include at-query($breakpoint-large) {
      &:nth-child(4n+1),
      &:nth-child(4n+2),
      &:nth-child(4n+3) {
        border-right: 1px solid #d4d0ca;
      }
    }
  }

  & &__Image {
    margin: 0 auto;
    width: 100%;

    img {
      bottom: auto;
      top: 0;
    }
  }

  &__Link {
    text-decoration: none !important;
  }

  &__TitleRow {
    display: block;
    margin-top: -25%;
    padding: 0 20px;
    position: relative;
    width: 100%;
    z-index: 100;

    @include at-query($breakpoint-large) {
      bottom: 20px;
      left: 0;
      margin-top: 0;
      position: absolute;
    }
  }

  &__Title {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .05em;
    line-height: 16px;
    margin: -10% auto 0;
    max-width: 26ch;

    @include at-query($breakpoint-large) {
      font-size: 20px;
      line-height: 22px;
    }
  }

  &__Model {
    display: block;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: .1em;
    line-height: 1;
    margin: 12px 0 6px;
    text-transform: uppercase;

    @include at-query($breakpoint-large) {
      font-size: 10px;
      line-height: 1;
    }
  }

  &__Favorite {
    background: none;
    border: none;
    font-size: 15px;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;

    @include at-query($breakpoint-large) {
      font-size: 18px;
      right: 20px;
      top: 20px;
      z-index: 20;
    }
  }

  &__Price {
    font-size: 12px;
    font-weight: 500;
    line-height: 1;

    @include at-query($breakpoint-large) {
      font-size: 14px;
    }
  }
}
</style>
