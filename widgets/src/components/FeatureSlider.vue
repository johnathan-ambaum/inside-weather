<template>
  <div class="FeatureSlider glide">
    <div
      ref="slider"
      class="glide"
    >
      <div
        class="glide__track FeatureSlider__Track"
        data-glide-el="track"
      >
        <ul class="glide__slides FeatureSlider__Slides">
          <li class="glide__slide FeatureSlider__Slide">
            <a
              :href="detailUrl"
              class="FeatureSlider__Link"
            >
              <responsive-image
                :images="featuredImage"
                :alt="product.short_display_name"
                default-size="medium"/>
              <div class="FeatureSlider__Footer">
                <span class="ProductGridItem__Title">
                  {{ product.short_display_name }}
                  <small class="ProductGridItem__Model">{{ product.model_number }}</small>
                </span>
                <div class="ProductGridItem__Price">${{ dollarPrice }}</div>
                <span
                  :class="{ isFavorite }"
                  role="button"
                  class="FeatureSlider__Favorite"
                  @click.stop.prevent="$bus.$emit('favorite', product.sku)"
                >
                  <font-awesome-icon :icon="favoriteIcon"/>
                </span>
              </div>
            </a>
          </li>
          <li
            v-for="feature in features"
            :key="feature.parameter"
            class="glide__slide FeatureSlider__Slide"
          >
            <a
              :href="detailUrl"
              class="FeatureSlider__Link"
            >
              <responsive-image
                :images="feature.image"
                :alt="feature.label"
                :load="loadImages"/>
              <div
                class="FeatureSlider__Label"
                @click.stop.prevent="openPanel(feature.parameter)"
              >
                <img
                  v-if="loadImages"
                  :src="feature.icon"
                  class="FeatureSlider__LabelIcon"
                >
                <div class="FeatureSlider__LabelText">
                  {{ featureText(feature.parameter) }}
                </div>
                <div class="FeatureSlider__AddFilter">
                  <span class="FeatureSlider__AddFilterLabel">Customize</span>
                  <span class="FeatureSlider__AddFilterIcon">+</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div
          class="glide__bullets FeatureSlider__Bullets"
          data-glide-el="controls[nav]"
        >
          <button
            data-glide-dir="=0"
            class="glide__bullet FeatureSlider__Bullet"
          />
          <button
            v-for="(feature, index) in features"
            :key="feature.parameter"
            :data-glide-dir="`=${index+1}`"
            class="glide__bullet FeatureSlider__Bullet"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Glide, { Swipe, Controls } from '@glidejs/glide/dist/glide.modular.esm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ResponsiveImage from './ResponsiveImage.vue';
import productHandler from '../mixins/productHandler';

library.add(faHeart);

export default {
  components: {
    ResponsiveImage,
    FontAwesomeIcon,
  },

  mixins: [
    productHandler,
  ],

  props: {
    product: { type: Object, required: true },
    filters: { type: Object, default: null },
    detailUrl: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
  },

  data() {
    return {
      loadImages: false,
    };
  },

  computed: {
    dollarPrice() {
      return parseInt(this.product.price, 10);
    },

    favoriteIcon() {
      if (this.isFavorite) {
        return ['fas', 'heart'];
      }

      return ['fal', 'heart'];
    },
  },

  mounted() {
    const glide = new Glide(this.$refs.slider, {
      animationDuration: 200,
      gap: 0,
    });

    glide.mount({ Swipe, Controls });

    glide.on('swipe.start', () => {
      this.loadImages = true;
    });

    this.$on('hook:beforeDestroy', () => {
      glide.destroy();
    });
  },

  methods: {
    ...mapMutations([
      'selectPanel',
    ]),

    openPanel(panel) {
      this.selectPanel(panel);
    },
  },
};
</script>

<style lang="scss">
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
@import '../scss/variables';
@import '../scss/mixins';

$tile-size: 100vw;

.FeatureSlider {
  &__Track {
    height: $tile-size;
  }

  &__Slides {
    margin: 0;
  }

  &__Slide {
    position: relative;
    width: $tile-size !important;
  }

  &__Footer {
    bottom: 0;
    position: absolute;
    width: 100%;
  }

  &__Bullets {
    align-items: center;
    bottom: 50px;
    display: flex;
    font-size: 0;
    justify-content: center;
    left: 0;
    position: absolute;
    text-align: center;
    width: $tile-size;
    padding-left: 10px;
  }

  &__Bullet {
    border: 1px solid #212121;
    border-radius: 50%;
    height: 5px;
    margin: 2px;
    padding: 0;
    width: 5px;

    &.glide__bullet--active {
      background: #212121;
      height: 7px;
      width: 7px;
    }
  }

  &__Label {
    align-items: center;
    background: rgba(244, 244, 244, .7);
    bottom: 0;
    cursor: pointer;
    display: flex;
    font-family: $font-stack-roboto;
    font-size: 13px;
    font-weight: 600;
    left: 0;
    padding: .75rem 1rem;
    position: absolute;
    right: 0;
    z-index: 15;
  }

  &__LabelIcon {
    height: 1.5em;
    margin-right: 13px;
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
    margin-right: 8px;
    text-decoration: underline;
    text-transform: uppercase;
  }

  &__AddFilterIcon {
    font-size: 22px;
    font-weight: 400;
    line-height: 10px;
  }

  &__Favorite {
    font-size: 1.1em;
    line-height: 1;
    position: absolute;
    right: ($gutter / 2);
    top: 15px;
  }
}
</style>
