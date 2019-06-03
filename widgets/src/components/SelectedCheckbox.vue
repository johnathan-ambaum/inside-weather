<template>
  <div class="SelectedCheckbox" />
</template>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SelectedCheckbox {
  background: url('https://cdn.shopify.com/s/files/1/2994/0144/files/checkmark_3x_daff5553-7f9e-4098-a799-30fb6dfee695.png?291296');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;

  @include at-query($breakpoint-small) {
    width: 18px;
    height: 18px;
  }
}
</style>
