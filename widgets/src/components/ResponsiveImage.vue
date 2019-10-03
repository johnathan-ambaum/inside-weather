<template>
  <div class="ResponsiveImage__Wrapper">
    <img
      v-if="showPlaceholder"
      :src="placeholderSrc"
      :class="imageClasses"
      class="ResponsiveImage ResponsiveImage__Placeholder">
    <img
      v-if="src.length"
      :sizes="sizes"
      :src="src"
      :srcset="srcset"
      :style="imageStyles"
      :class="imageClasses"
      class="ResponsiveImage"
      @load="finishLoading">
    <glyph-loading
      v-if="showSpinner && sizes.length < 10"
      class="ResponsiveImage__Spinner"
    />
  </div>
</template>

<script>
import GlyphLoading from './GlyphLoading.vue';

export default {
  components: {
    GlyphLoading,
  },

  props: {
    load: { type: Boolean, default: true },
    images: { type: Object, required: true },
    defaultSize: { type: String, default: 'medium' },
    sizes: { type: String, default: '' },
    scale: { type: Number, default: 100 },
    initialSpinner: { type: Boolean, default: false },
  },

  data() {
    return {
      loaded: this.load,
      src: this.getSrc(),
      srcset: this.getSrcSet(),
      showSpinner: this.initialSpinner,
      loading: true,
    };
  },

  computed: {
    placeholderSrc() {
      if (this.images.thumbnail !== undefined) {
        return this.images.thumbnail;
      }

      return null;
    },

    showPlaceholder() {
      return !this.loaded && this.placeholderSrc;
    },

    imageStyles() {
      return {
        width: `${this.scale}%`,
      };
    },

    imageClasses() {
      return {
        'ResponsiveImage--Loaded': this.loaded,
        'ResponsiveImage--Loading': this.loading,
      };
    },
  },

  watch: {
    load(loadNow) {
      if (loadNow) {
        this.loadImages();
      }
    },

    images(newImages) {
      if (this.load) {
        this.loading = true;
        this.loadImages();
      }
    },
  },

  methods: {
    getSrc() {
      if (!this.load || this.images[this.defaultSize] === undefined) {
        return '';
      }

      return this.images[this.defaultSize];
    },

    getSrcSet() {
      if (!this.load) {
        return null;
      }

      const sources = [];

      if (this.images.full) {
        sources.push(`${this.images.full} 2000w`);
      }

      if (this.images.large) {
        sources.push(`${this.images.large} 1200w`);
      }

      if (this.images.medium) {
        sources.push(`${this.images.medium} 800w`);
      }

      if (this.images.thumbnail) {
        sources.push(`${this.images.thumbnail} 100w`);
      }

      return sources.join(',');
    },

    loadImages() {
      this.srcset = this.getSrcSet();
      this.src = this.getSrc();
    },

    finishLoading() {
      this.loaded = true;
      this.loading = false;
      this.showSpinner = false;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ResponsiveImage {
  bottom: 0;
  filter: blur(4px);
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  transition: filter .2s linear;
  width: 100%;

  &--Loading {
    opacity: .6;
  }

  &--Loaded {
    filter: blur(0);
  }

  &__Wrapper {
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  &__Spinner {
    bottom: 0;
    left: 0;
    margin: auto;
    max-width: 30%;
    opacity: .5;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
