<template>
  <div
    class="ProductGridItem"
    @mouseenter.once="hasHovered = true"
  >
    <a
      v-if="!isMobile"
      :href="detailUrl"
      class="ProductGridItem__ImageLink"
    >
      <responsive-image
        :images="featuredImage"
        :scale="scale"
        sizes="(min-width: 1024px) 60vw, 100vw"
        class="ProductGridItem__Image"/>
    </a>
    <a
      :href="detailUrl"
      class="ProductGridItem__Link"
    >
      <component
        :is="featureComponent"
        :product="product"
        :detail-url="detailUrl"
        :is-favorite="isFavorite"
        :filters="filters"
        :load-images="loadFeatureImages"
        @activate="toggleTitleRowVisibility"
        @loaded="$bus.$emit('grid-item:loaded')"
      />
    </a>
    <a
      v-if="!isMobile"
      v-show="!hideTitleRow"
      :href="detailUrl"
      class="ProductGridItem__TitleRow ProductGridItem__Link"
    >
      <span class="ProductGridItem__Title">
        {{ product.short_display_name }}
        <span class="ProductGridItem__Model">{{ product.model_number }}</span>
      </span>
      <span class="ProductGridItem__Price">${{ dollarPrice }}</span>
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
import FeatureRollover from './FeatureRollover.vue';
import ResponsiveImage from './ResponsiveImage.vue';
import productHandler from '../mixins/productHandler';

library.add(emptyHeart, filledHeart);

export default {
  components: {
    FeatureRollover,
    ResponsiveImage,
    FontAwesomeIcon,
  },

  mixins: [
    productHandler,
  ],

  props: {
    product: { type: Object, required: true },
    filters: { type: Object, required: true },
    isMobile: { type: Boolean, required: true },
    isFavorite: { type: Boolean, default: false },
    loadMobile: { type: Boolean, default: false },
  },

  data() {
    return {
      hideTitleRow: false,
      hasHovered: false,
    };
  },

  computed: {
    ...mapState({
      category: state => state.category,
    }),

    detailUrl() {
      return `/collections/${this.product.primary_category}/products/${this.product.handle}`;
    },

    featureComponent() {
      return FeatureRollover;
    },

    loadFeatureImages() {
      return this.hasHovered;
    },

    dollarPrice() {
      return parseInt(this.product.price, 10);
    },

    scale() {
      return this.filters.categoryScale;
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

  methods: {
    toggleTitleRowVisibility(rolloverFocused) {
      this.hideTitleRow = rolloverFocused;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductGridItem {
  margin: 0 0 2rem 0;
  overflow: hidden;

  @include at-query($breakpoint-large) {
    flex: 0 0 30%;
    height: 100%;
    max-width: 2000px;
    position: relative;
    transition: flex-basis .3s ease-in-out;

    &:not(.is-empty):hover {
      flex-basis: 40%;
    }

    &__Image {
      bottom: auto;
      left: 0;
      margin: auto;
      position: absolute !important;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }

  &__TitleRow {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    outline: none;
    padding: $gutter ($gutter / 2) 0 0;
    position: relative;
    z-index: 25;
    color: #202020;
  }

  &__Link {
    text-decoration: none !important;
  }

  &__Title {
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;

    @include at-query($breakpoint-small) {
      display: block;
      font-size: 12px;
      margin: 16px auto 5px;
      max-width: 36ch;
      text-align: center;

      br {
        display: none;
      }
    }

    @include at-query($breakpoint-large) {
      color: rgba(222, 200, 186, .3);
      font-size: 54px;
      left: 0;
      line-height: 60px;
      opacity: 0;
      position: absolute;
      top: 15px;
      transition: opacity .3s linear;
      z-index: 10;

      .ProductGridItem:hover & {
        opacity: 1;
      }
    }
  }

  &__Model {
    display: inline;
    font-size: 12px;

    @include at-query($breakpoint-large) {
      display: block;
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
    }
  }

  &__Price,
  &__Favorite {
    font-size: 15px;

    @include at-query($breakpoint-large) {
      font-size: 24px;
      opacity: 0;
      transition: opacity .3s linear;
      z-index: 20;

      .ProductGridItem:hover & {
        opacity: 1;
      }
    }
  }

  &__Favorite {
    background: none;
    border: none;
    margin: 0 0 0 20px;
    padding: 0;
  }

  &__Price {
    font-weight: 600;
    text-align: center;
  }
}
</style>
