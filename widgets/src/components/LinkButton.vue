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
    stroke: {type: String, default: 'normal'},
    fill: {type: Boolean, default: false},
    border: {type: Boolean, default: true},
    hoverAction: {type: Boolean, default: true}
  },
  computed: {
    buttonClass() {
      return {
        'linkButton--fill': this.fill,
        'linkButton--white': this.stroke === 'white',
        'linkButton--noBorder': !this.border,
        'linkButton--noHover': !this.hoverAction
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
    color: #ffffff;
    background: #202020;
  }

  &.linkButton--white {
    color: #ffffff;
    border-color: #ffffff;
    &:hover {
      background: #ffffff;
      color: #202020;
    }
  }
  
  &.linkButton--noBorder {
    border: none;
  }

  &.linkButton--noHover {
    &::after {
      display: none;
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