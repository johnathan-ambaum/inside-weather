<template>
  <button class="ZoomButton">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.296"
      height="17.296"
      viewBox="0 0 17.296 17.296"
    >
      <g transform="translate(-940.5 -824.5)">
        <path
          d="M118.489,123.638l-.483.483-5.095-5.095a6.295,6.295,0,1,1,.483-.483Zm-4.156-9.3a5.6,5.6,0,1,0-5.6,5.6A5.6,5.6,0,0,0,114.332,114.333Z"
          transform="translate(838.6 716.968)"
          fill="#202020"
          stroke="#202020"
          stroke-width="1"
          fill-rule="evenodd"
        />
        <g transform="translate(12 6)">
          <line
            y2="6"
            transform="translate(935.5 822.5)"
            fill="none"
            stroke="#202020"
            stroke-width="1"
          />
          <line
            y2="6"
            transform="translate(938.5 825.5) rotate(90)"
            fill="none"
            stroke="#202020"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
    <span class="ZoomButton__Text">click to zoom</span>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ZoomButton {
  align-items: center;
  background: none;
  border: none;
  color: #202020;
  display: flex;
  font-size: 18px;
  padding: 0;

  &__Text {
    font-family: $font-stack-roboto;
    font-size: 10px;
    margin-left: 8px;
    letter-spacing: $normal-text-spacing;

    @include at-query($breakpoint-small) {
      display: none;
    }
  }
}
</style>
