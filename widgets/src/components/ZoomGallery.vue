<template>
  <div
    ref="container"
    class="ZoomGallery"
    @touchstart="startSwipe"
    @touchmove="swipe"
  >
    <div
      ref="leftEdge"
      class="ZoomGallery__Edge ZoomGallery__Edge--Left"
    />
    <responsive-image
      :images="images[activeImage]"
      class="ZoomGallery__Image"
    />
    <div
      ref="rightEdge"
      class="ZoomGallery__Edge ZoomGallery__Edge--Right"
    />
    <nav class="ZoomGallery__Nav">
      <button
        class="ZoomGallery__Arrow"
        @click="prevImage"
      >
        <font-awesome-icon :icon="['fal', 'arrow-left']"/>
      </button>
      <button
        class="ZoomGallery__Arrow"
        @click="nextImage"
      >
        <font-awesome-icon :icon="['fal', 'arrow-right']"/>
      </button>
      <close-button
        :size="32"
        stroke="semibold"
        class="ZoomGallery__Close"
        @click="$emit('close')"
      />
    </nav>
    <nav class="ZoomGallery__Bullets">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'ZoomGallery__Bullet--Active' : index === activeImage }"
        class="ZoomGallery__Bullet"
        @click="activeImage = index"
      />
    </nav>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ResponsiveImage from './ResponsiveImage.vue';
import CloseButton from './CloseButton.vue';
import { debounce } from '../util/helpers';

library.add(faArrowLeft, faArrowRight);

export default {
  components: {
    ResponsiveImage,
    FontAwesomeIcon,
    CloseButton,
  },

  props: {
    images: { type: Array, required: true },
    isMobile: { type: Boolean, default: false },
    startAt: { type: Number, default: 0 },
  },

  data() {
    return {
      activeImage: this.startAt,
      atLeftEdge: true,
      atRightEdge: false,
    };
  },

  mounted() {
    document.body.style.overflow = 'hidden';

    const managePosition = debounce((e) => {
      const { left } = this.$refs.leftEdge.getBoundingClientRect();
      const { right } = this.$refs.rightEdge.getBoundingClientRect();
      const windowRight = window.innerWidth || document.documentElement.clientWidth;

      if (left < 0 && this.atLeftEdge) {
        this.atLeftEdge = false;
      } else if (left >= 0 && !this.atLeftEdge) {
        this.atLeftEdge = true;
        this.swipeStartX = null;
      }

      console.log({ right, windowRight });
      if (right > windowRight && this.atRightEdge) {
        this.atRightEdge = false;
      } else if (right <= windowRight && !this.atRightEdge) {
        this.atRightEdge = true;
        this.swipeStartX = null;
      }
    }, 100);

    this.$refs.container.addEventListener('touchmove', managePosition);
    this.$refs.container.addEventListener('touchstart', managePosition);
    this.$refs.container.addEventListener('touchend', managePosition);
  },

  beforeDestroy() {
    document.body.style.overflow = '';
  },

  methods: {
    prevImage() {
      if (this.activeImage === 0) {
        this.activeImage = this.images.length - 1;
      } else {
        this.activeImage = this.activeImage - 1;
      }
    },

    nextImage() {
      if (this.activeImage >= this.images.length - 1) {
        this.activeImage = 0;
      } else {
        this.activeImage = this.activeImage + 1;
      }
    },

    startSwipe(e) {
      this.swipeStartX = e.touches[0].screenX;
    },

    swipe(e) {
      if (!this.isMobile || !this.swipeStartX) {
        return;
      }

      const threshold = 100;
      const currentX = e.touches[0].screenX;
      const swipeDistance = this.swipeStartX - currentX;

      if (this.atLeftEdge && swipeDistance <= -threshold) {
        this.prevImage();
        this.swipeStartX = null;
      }

      if (this.atRightEdge && swipeDistance >= threshold) {
        this.nextImage();
        this.swipeStartX = null;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ZoomGallery {
  background: #fff;
  height: 100%;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;

  &__Image {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vh;

    @include at-query($breakpoint-large) {
      height: auto;
      width: 100%;
    }
  }

  &__Edge {
    height: 100%;
    position: absolute;
    width: 0;

    &--Left {
      left: 0;
    }

    &--Right {
      left: 100vh;
    }
  }

  &__Nav {
    align-items: center;
    display: flex;
    position: fixed;
    right: 13px;
    top: 17px;

    @include at-query($breakpoint-large) {
      right: 40px;
      top: 40px;
    }
  }

  &__Arrow {
    font-size: 30px;
    line-height: 1;
    padding: 0;

    & + & {
      margin: 0 68px 0 40px;
    }

    @include at-query($breakpoint-small) {
      display: none;
    }
  }

  &__Close {
    margin-top: -4px;
  }

  &__Bullets {
    bottom: 60px;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    width: 100%;
  }

  &__Bullet {
    border: 2px solid #212121;
    border-radius: 50%;
    height: 8px;
    margin: 0 5px;
    padding: 0;
    width: 8px;

    &--Active {
      background: #212121;
    }
  }
}
</style>
