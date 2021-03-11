<template>
  <div
    :class="{ 'ProductGallery--Cylindo': cylindo }"
    class="ProductGallery"
  >
    <div
      class="ProductGallery__FeaturedImage"
      @click="triggerZoom(false)"
    >
      <div
        v-show="cylindo"
        class="cylindo-wrap"
      >
        <div
          id="cylindo-main"
          class="cylindo-frame"
        />
        <div class="Viewer__360Icons">
          <div class="Viewer__RotateIcon">
            <img
              src="https://cdn.insideweather.com/icons/360-rotate-ico.png"
              alt="Drag to rotate"
            >
            <span>Rotate</span>
          </div>
          <div
            class="Viewer__ZoomIcon"
            @click.stop="triggerZoom"
          >
            <img
              src="https://cdn.insideweather.com/icons/zoom-ico.png"
              alt="Click to zoom"
            >
            <span>Zoom</span>
          </div>
        </div>
      </div>
      <responsive-image
        v-if="!cylindo"
        :images="images[galleryImage] || {}"
      />
    </div>
    <nav
      v-if="images.length > 0 && !cylindo"
      class="ProductGallery__Nav"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'ProductGallery__Item--Active': galleryImage === index }"
        class="ProductGallery__Item"
        @click="swapImage(index)"
      >
        <responsive-image
          :images="image"
          class="ProductGallery__Thumb"
          sizes="70px"
        />
      </div>
      <zoom-button
        class="ProductGallery__Zoom"
        @click.native.prevent="showZoom = true"
      />
    </nav>
    <transition name="fade">
      <zoom-gallery
        v-if="!cylindo && showZoom"
        :images="images"
        :start-at="galleryImage"
        @close="showZoom = false"
      />
      <div
        v-if="cylindo"
        id="cylindo-main-zoom"
        :class="{ 'is-active': showZoom }"
      >
        <close-button
          :size="32"
          stroke="semibold"
          class="ZoomGallery__Close"
          @click.native.capture.prevent="closeZoom()"
          @touchstart.native.capture.prevent="closeZoom()"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ResponsiveImage from './ResponsiveImage.vue';
import ZoomButton from './ZoomButton.vue';
import ZoomGallery from './ZoomGallery.vue';
import CloseButton from './CloseButton.vue';

export default {
  components: {
    ResponsiveImage,
    ZoomButton,
    ZoomGallery,
    CloseButton,
  },

  props: {
    images: { type: Array, default: () => [] },
    cylindo: { type: Boolean, default: false },
  },

  data() {
    return {
      galleryImage: 0,
      showZoom: false,
    };
  },

  computed: {
    ...mapState({
      viewer: state => state.cylindoViewers.find(viewer => viewer.containerID === 'cylindo-main'),
    }),
  },

  mounted() {
    this.listenForZoom();
  },

  methods: {
    listenForZoom() {
      if (!this.viewer) {
        setTimeout(() => {
          this.listenForZoom();
        }, 200);
        return;
      }
      this.viewer.instance.on(this.viewer.instance.events.ZOOM_ENTER, () => {
        this.showZoom = true;
      });
      this.viewer.instance.on(this.viewer.instance.events.ZOOM_EXIT, () => {
        this.showZoom = false;
      });
    },

    triggerZoom(includeCylindo = false) {
      if (this.cylindo && !includeCylindo) {
        return;
      }
      if (this.cylindo) {
        this.viewer.instance.zoom(0.5, 0.5);
        return;
      }
      this.showZoom = true;
    },
    closeZoom() {
      if (this.cylindo) {
        this.viewer.instance.exitZoom();
      }
      this.showZoom = false;
    },

    swapImage(index) {
      this.galleryImage = index;
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.ProductGallery {
  display: flex;
  justify-content: center;
  position: relative;
  top: -40px;

  @include at-query($breakpoint-large) {
    margin-bottom: 30px;
  }

  // CYLINDO
  &--Cylindo {
    .cylindo-viewer-container {
      z-index: 0;
    }

    .cylindo-wrap {
      height: 0;
      padding-top: 100%;
      position: relative;
      width: 100%;
    }

    .cylindo-frame {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .cylindo-action-button-group {
      &.left, &.right {
        top: 50px;
      }
    }

    .cylindo-drag-tooltip.cylindo-drag-to-rotate-tooltip,
    .cylindo-tooltip.cylindo-drag-tooltip {
      display: none !important;
    }

    .cylindo-thumbnail-wrapper.thumb-location-bottom.has-thumbs {
      bottom: 120px;
    }

    .Viewer__360Icons {
      align-items: center;
      bottom: 75px;
      pointer-events: none;
      display: flex;
      justify-content: center;
      position: absolute;
      text-align: center;
      width: 100%;

      img {
        display: inline-block;
        height: auto;
        width: 16px;
      }

      span {
        color: #202020;
        display: block;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .05em;
      }
    }

    .Viewer__RotateIcon {
      margin-right: 31px;
    }

    .Viewer__ZoomIcon {
      margin-left: 31px;
    }

    @include at-query($breakpoint-small) {
      pointer-events: auto;
    }

    #cylindo-main-zoom {
      display: none;
      height: 100%;
      left: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99999;

      &.is-active {
        display: block;
      }

      .ZoomGallery__Close {
        z-index: 999999;
      }
    }
  }
  // END CYLINDO

  &__FeaturedImage {
    flex: 0 1 775px;
  }

  &:not(&--Cylindo) &__FeaturedImage {
    cursor: zoom-in;
  }

  &__Nav {
    align-items: center;
    bottom: 70px;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &__Item {
    border: 1px solid transparent;
    cursor: pointer;
    flex: 0 1 74px;

    & + & {
      margin-left: 20px;
    }

    &--Active {
      border-color: #202020;
    }
  }

  &__Thumb img {
    border: 1px solid #D4D0CA;
  }

  &__Zoom {
    margin-left: 24px;
  }
}
</style>
