<template>
  <div
    :class="wrapperClasses"
    class="ResponsiveImage__Wrapper"
  >
    <img
      v-if="showPlaceholder"
      :src="placeholderSrc"
      :class="{ 'ResponsiveImage--Loading': showSpinner }"
      class="ResponsiveImage ResponsiveImage__Placeholder">
    <img
      v-if="src.length"
      :sizes="sizes"
      :src="src"
      :srcset="srcset"
      :style="imageStyles"
      :class="{ 'ResponsiveImage--Loading': showSpinner }"
      class="ResponsiveImage"
      @load="finishLoading">
    <transition name="fade">
      <glyph-loading
        v-if="showSpinner"
        class="ResponsiveImage__Spinner"
      />
    </transition>
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
    };
  },

  computed: {
    placeholderSrc() {
      if (this.images.thumbnail !== undefined) {
        return this.images.thumbnail.replace(/^https?:/i, '');
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

    wrapperClasses() {
      return {
        'ResponsiveImage__Wrapper--Loaded': this.loaded,
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
        this.showSpinner = true;
        this.loadImages();
      }
    },
  },

  methods: {
    getSrc() {
      if (!this.load || this.images[this.defaultSize] === undefined) {
        return '';
      }

      return this.images[this.defaultSize].replace(/^https?:/i, '');
    },

    getSrcSet() {
      if (!this.load) {
        return null;
      }

      const sources = [];

      if (this.images.full) {
        sources.push(`${this.images.full.replace(/^https?:/i, '')} 2000w`);
      }

      if (this.images.large) {
        sources.push(`${this.images.large.replace(/^https?:/i, '')} 1200w`);
      }

      if (this.images.medium) {
        sources.push(`${this.images.medium.replace(/^https?:/i, '')} 800w`);
      }

      if (this.images.thumbnail) {
        sources.push(`${this.images.thumbnail.replace(/^https?:/i, '')} 100w`);
      }

      return sources.join(',');
    },

    loadImages() {
      this.srcset = this.getSrcSet();
      this.src = this.getSrc();
    },

    finishLoading() {
      this.loaded = true;
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
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 90% !important;

  @include at-query($breakpoint-mlarge) {
    width: 100% !important;
  }

  @include at-query($breakpoint-xsmall) {
    width: 85% !important;
  }

  &--Loading {
    opacity: .6;
  }

  &__Wrapper {
    filter: blur(4px);
    height: 0;
    padding-top: 100%;
    position: relative;
    transition: filter .2s linear;

    &--Loaded {
      filter: blur(0);
    }
  }

  &__Spinner {
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: .5;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
