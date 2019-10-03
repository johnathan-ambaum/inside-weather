<template>
  <div class="InfoPopup">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
    >
      <defs>
        <style>
          .a{fill:#fff;stroke:#959595;}
          .b{fill:#959595;font-size:11px;font-family:Roboto-Regular, Roboto;letter-spacing:0.05em;}
          .c{stroke:none;}
          .d{fill:none;}
        </style>
      </defs>
      <g transform="translate(-435 -377)">
        <g
          class="a"
          transform="translate(435 377)"
        >
          <circle
            class="c"
            cx="8.5"
            cy="8.5"
            r="8.5"
          />
          <circle
            class="d"
            cx="8.5"
            cy="8.5"
            r="8"
          />
        </g>
        <text
          class="b"
          transform="translate(441.873 389.273)"
        >
          <tspan
            x="0"
            y="0"
          >i</tspan>
        </text>
      </g>
    </svg>
    <div
      v-show="show"
      class="InfoPopup__Dialog"
    >
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
  },

  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss">
.InfoPopup {
  &__Dialog {
    bottom: 100%;
    position: absolute;
    right: 0;

    &--Bottom {
      bottom: auto;
      top: 100%;
    }
  }
}
</style>
