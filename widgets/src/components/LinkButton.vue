<template>
  <div class="_button-wrapper">
    <a
      :href="linkTo"
      :class="buttonClass"
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
    stroke: {type: String, default: 'normal'},
    fill: {type: Boolean, default: false},
    bgBlack: {type: Boolean, default: false},
    border: {type: Boolean, default: true},
    hoverAction: {type: Boolean, default: true}
  },
  computed: {
    buttonClass() {
      return {
        'linkButton--fill': this.fill,
        'linkButton--fillBlack': this.bgBlack,
        'linkButton--white': this.stroke === 'white',
        'linkButton--noBorder': !this.border,
        'linkButton--noHover': !this.hoverAction,
        'category-list-item-btn': this.categoryListItem
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.--btn {
  background: transparent;
  border: 1px solid #202020;
  border-radius: 0;
  color: #202020;
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
    background: #202020;
    color: #ffffff;
    text-decoration: none;
  }

  &.linkButton--white {
    color: #ffffff;
    border-color: #ffffff;
    &:hover {
      background: #ffffff;
      color: #202020;
    }
  }

  &.linkButton--fill {
    background: #ffffff;
    color: #202020;
  }
  &.linkButton--fillBlack {
    background: #202020;
    color: #ffffff;
  }

  &.linkButton--noBorder {
    border: none;
  }

  &.linkButton--noHover {
    &::after {
      display: none;
    }
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
      color: #202020;
    }
    &.linkButton--white {
      &:hover {
        background: transparent;
        color: #ffffff;
      }
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
