<template>
  <div class="_button-wrapper">
    <a
      :href="linkTo"
      :class="buttonClass"
      :style="buttonStyles"
      class="--btn"
    >
    {{btnText}}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    btnText: String,
    linkTo: String,
    categoryListItem: {type: Boolean, default: false},
    border: {type: Boolean, default: true},
    radius: { type: String, default: '0' },
    strokeColor: { type: String, default: '#202020' },
    bgColor: { type: String, default: 'transparent' },
  },

  computed: {
    buttonClass() {
      return {
        'linkButton--fill': this.fill,
        'linkButton--noBorder': !this.border,
        'category-list-item-btn': this.categoryListItem
      };
    },

    buttonStyles() {
      return {
        '--border-radius': this.radius,
        '--stroke-color': this.strokeColor,
        '--bg-color': this.bgColor,
      };
    },
  },
};
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.--btn {
  background: var(--bg-color);
  border: 1px solid var(--stroke-color);
  border-radius: var(--border-radius);
  color: var(--stroke-color);
  display: inline-block;
  font-family: $font-stack-avalon;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  letter-spacing: 0.12em;
  line-height: 46px;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 240px;
  @include transition(all,.3s,cubic-bezier(.55, .085, .68, .53));

  &:hover {
    background: var(--stroke-color);
    color: var(--bg-color);
    text-decoration: none;
  }

  &.linkButton--noBorder {
    border: none;
  }

  @include at-query('max-width: 992px') {
    &.linkButton--fill {
      background: transparent;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 875px) {
    &.category-list-item-btn {
      width: 160px;
    }
  }
  @include at-query('max-width: 1199px') {
    font-size: 13px;
    height: 40px;
    line-height: 38px;
    width: 200px;
  }
  @include at-query('max-width: 1024px') {
    &:hover {
      background: transparent;
      color: var(--stroke-color);
    }
  }
}

._button-disabled {
  .--btn {
    border: none;
    padding: 10px 0;
    pointer-events: none;
  }
}
</style>
