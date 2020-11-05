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
    <arrow-button
      class="ZoomGallery__Arrow"
      direction="left"
      @click.native="prevImage"
    />
    <responsive-image
      :images="images[activeImage]"
      class="ZoomGallery__Image"
    />
    <arrow-button
      class="ZoomGallery__Arrow"
      direction="right"
      @click.native="nextImage"
    />
    <div
      ref="rightEdge"
      class="ZoomGallery__Edge ZoomGallery__Edge--Right"
    />
    <close-button
      :size="32"
      stroke="semibold"
      class="ZoomGallery__Close"
      @click.native="$emit('close')"
    />
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
import ResponsiveImage from './ResponsiveImage.vue';
import ArrowButton from './ArrowButton.vue';
import CloseButton from './CloseButton.vue';
import { debounce } from '../util/helpers';

export default {
  components: {
    ResponsiveImage,
    ArrowButton,
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
    const orb = document.querySelector('.orb-chat-mount');

    if (orb) {
      orb.style.display = 'none';
    }

    const { height } = this.$refs.container.getBoundingClientRect();
    this.$refs.container.scrollTop = height / 3;

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

    const orb = document.querySelector('.orb-chat-mount');
    if (orb) {
      orb.style.display = 'none';
    }
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

  &__Arrow {
    bottom: 0;
    font-size: 30px;
    line-height: 1;
    margin: auto;
    padding: 0;
    position: fixed;
    top: 0;
    z-index: 100;

    &.left {
      left: 60px;
    }

    &.right {
      right: 60px;
    }

    @include at-query($breakpoint-small) {
      display: none;
    }
  }

  &__Close {
    position: fixed;
    right: 13px;
    top: 17px;

    @include at-query($breakpoint-large) {
      right: 40px;
      top: 40px;
    }
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
    margin: 0 4px;
    padding: 0;
    width: 8px;

    &--Active {
      background: #212121;
    }

    @include at-query($breakpoint-small) {
      margin: 0 2px;
    }
  }
}
</style>
