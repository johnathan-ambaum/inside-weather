<template>
  <div
    :class="rolloverClasses"
    class="FeatureRollover"
    @mouseleave="activeFeature = 0"
  >
    <template
      v-for="(feature, index) in features"
    >
      <transition
        :key="feature.parameter"
        name="fade"
      >
        <div
          v-show="isActive(index + 1)"
          class="FeatureRollover__Feature"
        >
          <img
            :src="lazyLoad(feature.image.medium)"
            :alt="featureText(feature.parameter)"
            class="FeatureRollover__Image">
          <div
            class="FeatureRollover__Description"
            @click.stop.prevent="openPanel(feature.parameter)"
          >
            <img
              :src="lazyLoad(feature.icon)"
              class="FeatureRollover__Icon"
            >
            <div class="FeatureRollover__Label">{{ featureText(feature.parameter) }}</div>
            <div
              v-if="filterGroups"
              class="FeatureRollover__AddFilter"
            >
              <span class="FeatureRollover__AddFilterLabel">Customize</span>
              <span class="FeatureRollover__AddFilterIcon">+</span>
            </div>
          </div>
        </div>
      </transition>
    </template>
    <button
      class="FeatureRollover__Prev"
      @click.stop.prevent="prevImage"
    >
      <font-awesome-icon
        :icon="['far', 'arrow-left']"
        class="FeatureRollover__Arrow"
      />
    </button>
    <button
      class="FeatureRollover__Next"
      @click.stop.prevent="nextImage"
    >
      <font-awesome-icon
        :icon="['far', 'arrow-right']"
        class="FeatureRollover__Arrow"
      />
    </button>
    <div class="FeatureRollover__Bullets">
      <button
        :class="bulletClasses(0)"
        class="FeatureRollover__Bullet"
        @click.stop.prevent="goTo(0)"
      />
      <button
        v-for="(feature, index) in features"
        :key="feature.parameter"
        :class="bulletClasses(index + 1)"
        class="FeatureRollover__Bullet"
        @click.stop.prevent="goTo(index + 1)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import productHandler from '../mixins/productHandler';

library.add(faArrowRight, faArrowLeft);

export default {
  components: {
    FontAwesomeIcon,
  },

  mixins: [
    productHandler,
  ],

  props: {
    product: { type: Object, required: true },
    filters: { type: Object, default: null },
    loadImages: { type: Boolean, default: false },
  },

  data() {
    return {
      activeFeature: 0,
    };
  },

  computed: {
    lazyLoad() {
      return src => (this.loadImages ? src : '');
    },

    isActive() {
      return index => this.activeFeature === index;
    },

    rolloverClasses() {
      return {
        'FeatureRollover--Active': this.activeFeature !== 0,
      };
    },

    bulletClasses() {
      return index => ({
        'FeatureRollover__Bullet--Active': this.activeFeature === index,
      });
    },
  },

  watch: {
    activeFeature(newFeature) {
      this.$emit('activate', newFeature > 0);
    },
  },

  methods: {
    ...mapMutations([
      'selectPanel',
    ]),

    prevImage() {
      this.goTo(this.activeFeature - 1);
    },

    nextImage() {
      this.goTo(this.activeFeature + 1);
    },

    goTo(index) {
      if (index < 0) {
        this.activeFeature = this.features.length;
        return;
      }

      if (index > this.features.length) {
        this.activeFeature = 0;
        return;
      }

      this.activeFeature = index;
    },

    openPanel(panel) {
      this.selectPanel(panel);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

$feature-desc-height: 80px;
$feature-overlay-color: rgba(255, 255, 255, .9);

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.FeatureRollover {
  &,
  &__Feature,
  &__Image {
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__Image[src=""] {
    opacity: 0;
    transition: opacity .1s linear;
  }

  &--Active {
    background: #fff;
  }

  .ProductGridItem:hover & {
    z-index: 25;
  }

  &__Description {
    align-items: center;
    background-color: $feature-overlay-color;
    bottom: 0;
    cursor: pointer;
    display: flex;
    font-family: $font-stack-roboto;
    font-size: 18px;
    font-weight: 500;
    height: $feature-desc-height;
    left: 0;
    padding: 0 $gutter;
    position: absolute;
    width: 100%;
  }

  &__AddFilter {
    align-items: center;
    display: flex;
    flex-grow: 1;
    font-family: $font-stack-avalon;
    font-size: 10px;
    font-weight: 500;
    justify-content: flex-end;
  }

  &__AddFilterLabel {
    font-family: $font-stack-avalon;
    font-size: 13px;
    text-decoration: underline;
    text-transform: uppercase;
    margin-right: 8px;
    text-decoration: underline;
    text-transform: uppercase;
  }

  &__AddFilterIcon {
    font-family: $font-stack-avalon;
    font-size: 22px;
    font-weight: 400;
    line-height: 13px;
    margin-bottom: 1px;

    &[src=""] {
      visibility: hidden;
    }
  }

  &__Label {
    flex-grow: 1;
  }

  &__Icon {
    height: 40px;
    margin-right: 15px;
  }

  &__Prev,
  &__Next {
    background: $feature-overlay-color;
    border-radius: 50%;
    bottom: 0;
    color: #212121;
    font-size: 26px;
    height: 80px;
    opacity: 0;
    margin: auto;
    padding: 10px;
    position: absolute;
    top: 0;
    transition: opacity .3s linear;
    width: 80px;

    .ProductGridItem:hover & {
      opacity: 1;
    }
  }

  &__Prev {
    left: 0;
    text-align: right;
    transform: translateX(-50%);
  }

  &__Next {
    right: 0;
    text-align: left;
    transform: translateX(50%);
  }

  &__Bullets {
    align-items: center;
    bottom: $feature-desc-height + 10px;
    display: flex;
    font-size: 0;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    transition: opacity .3s linear;
    width: 100%;

    .ProductGridItem:hover & {
      opacity: 1;
      z-index: 20;
    }
  }

  &__Bullet {
    border: 2px solid #212121;
    border-radius: 50%;
    height: 10px;
    margin: 2px;
    padding: 0;
    width: 10px;

    &--Active {
      background: #212121;
    }
  }
}
</style>
