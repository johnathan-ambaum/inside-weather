<template>
  <button class="CloseButton">
    <svg
      :width="size"
      :height="size"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32.121 32.121"
    >
      <g transform="translate(-1800.004 -54.004)">
        <line
          y2="42.426"
          transform="translate(1801.065 55.065) rotate(-45)"
          fill="none"
          stroke="#202020"
          stroke-width="3"
        />
        <line
          y2="42.426"
          transform="translate(1831.065 55.065) rotate(45)"
          fill="none"
          stroke="#202020"
          stroke-width="3"
        />
      </g>
    </svg>
    <span v-if="label">{{ label }}</span>
    <span v-else class="visually-hidden">Close</span>
  </button>
</template>

<script>
export default {
  props: {
    size: { type: Number, default: 32.121 },
    label: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.CloseButton {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;

  span {
    font-family: $font-stack-avalon;
    font-size: 9px;
    font-weight: 400;
    margin: 5px 0 0;
    max-width: 60px;
    text-align: center;
  }
}
</style>
