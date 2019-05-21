<template>
  <div class="SelectedCheckbox">
    <span />
	</div>
</template>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SelectedCheckbox {
  & span {
    width: 22px;
    height: 22px;
    display: block;
    background: #B1C8CD;
    border-radius: 50%;

    &::after {
      content: '\2714';
      padding: 0 5px;
      color: white;
    }
  }
}
</style>
