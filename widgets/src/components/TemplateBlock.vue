<template>
  <div
    :class="blockClasses"
    class="TemplateBlock"
  >
    <div
      v-if="image"
      class="TemplateBlock__ImageSection"
    >
      <img :src="image">
    </div>
    <div class="TemplateBlock__TextSection">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: null },
    text: { type: String, required: true },
    reverse: { type: Boolean, default: false },
  },

  computed: {
    blockClasses() {
      return {
        'TemplateBlock--Reversed': this.reverse,
      };
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
