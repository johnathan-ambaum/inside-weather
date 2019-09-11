<template>
  <div
    :class="blockClasses"
    class="TemplateBlock"
  >
    <div
      v-if="image"
      class="TemplateBlock__ImageSection"
    >
      <img :src="interpolatedImage">
    </div>
    <div class="TemplateBlock__TextSection">
      <h3>{{ interpolatedHeading }}</h3>
      <p>{{ interpolatedText }}</p>
    </div>
  </div>
</template>

<script>
import interpolator from '../mixins/interpolator';

export default {
  mixins: [
    interpolator,
  ],

  props: {
    image: { type: String, default: null },
    heading: { type: String, default: '' },
    text: { type: String, required: true },
    reverse: { type: Boolean, default: false },
  },

  computed: {
    blockClasses() {
      return {
        'TemplateBlock--Reversed': this.reverse,
      };
    },

    interpolatedImage() {
      return this.interpolateString(this.image);
    },

    interpolatedHeading() {
      return this.interpolateString(this.heading);
    },

    interpolatedText() {
      return this.interpolateString(this.text);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.TemplateBlock {
  align-items: center;
  display: flex;
  margin-bottom: 100px;

  @include at-query($breakpoint-small) {
    flex-direction: column;
  }

  &__TextSection {
    flex: 1 1 auto;
    padding: 0 80px 0 50px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 30px;

      @include at-query($breakpoint-large) {
        font-size: 28px;
      }
    }

    p {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .025em;
      line-height: 16px;

      @include at-query($breakpoint-large) {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }

  &--Reversed &__TextSection {
    padding: 0 50px 0 80px;
  }

  &__ImageSection {
    flex: 0 0 60%;
  }

  &--Reversed &__ImageSection {
    flex: 0 0 45%;
    order: 2;
  }
}
</style>
