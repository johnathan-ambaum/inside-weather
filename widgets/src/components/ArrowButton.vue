<template>
  <button
    :class="buttonClasses"
    class="ArrowButton"
  >
    <svg
      class="ArrowButton__Icon"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 70 70">
      <g transform="translate(70 70) rotate(180)">
        <g transform="translate(1542 2749) rotate(180)">
          <circle
            cx="35"
            cy="35"
            r="35"
            transform="translate(1542 2749) rotate(180)"
            fill="#fff"
            opacity="0.8"/>
          <g transform="translate(1709.253 2880.724) rotate(180)">
            <line
              x1="19"
              transform="translate(192.5 167.5)"
              fill="none"
              stroke="#202020"
              stroke-width="1.5"/>
            <path
              d="M-7193.336,249.724l-10.411,10.411,10.411,10.411"
              transform="translate(7396 -93)"
              fill="none"
              stroke="#202020"
              stroke-width="1.5"/>
          </g>
        </g>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    direction: { type: String, default: 'left' },
  },

  computed: {
    buttonClasses() {
      return [this.direction];
    },
  },
};
</script>

<style lang="scss">
.ArrowButton {
  &.down &__Icon {
    transform: rotate(90deg);
  }

  &.left &__Icon {
    transform: rotate(180deg);
  }

  &.up &__Icon {
    transform: rotate(270deg);
  }
}
</style>
