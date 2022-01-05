<template>
  <div class="SwatchBrowser__SwatchInfo">
    <div class="SwatchBrowser__Tabs">
      <button
        class="SwatchBrowser__Tab"
        :class="{ 'is-active': activeTab === 'details' }"
        @click="activeTab = 'details'"
      >DETAILS</button>
      <button
        v-if="hasPhotos"
        class="SwatchBrowser__Tab"
        :class="{ 'is-active': activeTab === 'photos' }"
        @click="activeTab = 'photos'"
      >PHOTOS</button>
      <button
        v-if="hasRelated"
        class="SwatchBrowser__Tab"
        :class="{ 'is-active': activeTab === 'shop' }"
        @click="activeTab = 'shop'"
      >SHOP</button>
    </div>
    <div
      v-show="activeTab === 'details'"
      class="SwatchBrowser__Details"
    >
      <div
        v-if="swatch.commercial || swatch.performance || swatch.pet_friendly || swatch.water_resistant"
        class="SwatchBrowser__Badges"
      >
        <span v-if="swatch.commercial">
          <img
            src="https://cdn.insideweather.com/icons/commercial-ico_v2.png"
            alt="Commercial icon"
          >
          Commercial
        </span>
        <span v-if="swatch.pet_friendly">
          <img
            src="https://cdn.insideweather.com/icons/pet-friendly-ico_v2.png"
            alt="Pet friendly icon"
          >
          Pet-Friendly
        </span>
        <span v-if="swatch.performance">
          <img
            src="https://cdn.insideweather.com/icons/performance-ico_v2.png"
            alt="Performance icon"
          >
          Performance
        </span>
        <span v-if="swatch.water_resistant">
          <img
            src="https://cdn.insideweather.com/icons/liquid-ico_v2.png"
            alt="Water resistant icon"
          >
          Water Resistant
        </span>
      </div>
      <p>{{ swatch.description }}</p>
      <div class="SwatchBrowser__Specs">
        <div
          v-if="swatch.composition"
          style="float: left;"
        >
          <span>COMPOSITION</span>
          {{ swatch.composition }}
        </div>
        <div v-if="swatch.durability_description">
          <span>DURABILITY</span>
          {{ swatch.durability_description }}
        </div>
        <div v-if="swatch.cleaning_description">
          <span>CLEANING</span>
          {{ swatch.cleaning_description }}
        </div>
        <div v-if="swatch.enable_stain_chart">
          <span>STAIN RESISTANT TEST RESULTS</span>
          <table>
            <thead>
              <tr>
                <th>Mustard</th>
                <th>Wine</th>
                <th>Soda</th>
                <th>Water</th>
                <th>Oil</th>
                <th>Ketchup</th>
                <th>Soil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ swatch.stain_chart_data.stain_resistant_mustard }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_wine }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_soda }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_water }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_oil }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_ketchup }}</td>
                <td>{{ swatch.stain_chart_data.stain_resistant_soil }}</td>
              </tr>
            </tbody>
            <tfoot v-if="!isMobile">
              <tr>
                <td colspan="2">1 = Partial stain release</td>
                <td colspan="3">3.5+ = Commercial passing score</td>
                <td colspan="2">5 = Complete stain release</td>
              </tr>
            </tfoot>
          </table>
          <div v-if="isMobile">
            <p>1 = Partial stain release</p>
            <p>3.5+ = Commercial passing score</p>
            <p>5 = Complete stain release</p>
          </div>
        </div>
      </div>
    </div>
    <lifestyle-grid
      v-if="hasPhotos"
      v-show="activeTab === 'photos'"
      class="SwatchBrowser__Photos"
      :images="swatch.lifestyle_grid.images"
    />
    <div
      v-if="hasRelated"
      v-show="activeTab === 'shop'"
      class="SwatchBrowser__Shop"
    >
      <div class="SwatchBrowser__RelatedProducts related-products__cards">
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.title"
          class="related-products__card"
        >
          <template v-if="relatedProduct.image.medium">
            <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image.medium[0]"></a>
          </template>
          <template v-else>
            <a :href="relatedProduct.url"><img class="related-products__image" :src="relatedProduct.image"></a>
          </template>
          <a :href="relatedProduct.url"><p class="related-products__title">{{ relatedProduct.title }}</p></a>
          <a :href="relatedProduct.url">SHOP</a>
        </div>
      </div>
    </div>
    <button
      v-if="isMobile"
      class="SwatchBrowser__Button SwatchBrowser__Button--Black"
      @click.prevent="$emit('close')"
    >BACK TO SWATCHES</button>
  </div>
</template>

<script>
import LifestyleGrid from './CMSBlocks/LifestyleGrid.vue';
import screenMonitor from '../mixins/screenMonitor';

export default {
  components: {
    LifestyleGrid,
  },

  mixins: [
    screenMonitor,
  ],

  props: {
    swatch: { type: Object, default: () => null },
    relatedProducts: { type: Array, default: () => ([]) },
  },

  data() {
    return {
      activeTab: 'details',
    };
  },

  computed: {
    hasPhotos() {
      if (!this.swatch || !this.swatch.lifestyle_grid) {
        return false;
      }
      return this.swatch.lifestyle_grid.images && this.swatch.lifestyle_grid.images.length;
    },

    hasRelated() {
      return this.swatch && this.swatch.related_products && this.relatedProducts.length;
    },
  },

  watch: {
    swatch() {
      this.activeTab = 'details';
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser {
  &__Tabs {
    display: flex;
    max-width: 100%;
    width: 660px;
  }

  &__Tab {
    border-bottom: 2px solid #D4D0CA;
    flex: 1;
    font-family: $font-stack-avalon;
    font-size: 15px;
    letter-spacing: 0.125em;
    padding: 10px 0 15px 0;

    @include at-query($breakpoint-large) {
      font-size: 17px;
    }

    &.is-active {
      border-bottom-color: #202020;
      font-weight: 500;
    }
  }

  &__SwatchInfo .SwatchBrowser__Button {
    border-radius: 0;
    bottom: 0;
    left: 0;
    padding: 12px;
    position: absolute;
    z-index: 100;
  }

  .LifeStyleGrid__grid {
    grid-auto-rows: initial;
  }

  .LifeStyleGrid__modal {
    z-index: 1020;
  }

  .LifeStyleGrid__modal-product-title {
    text-align: left;
  }

  &__Specs {
    font-size: 14px;

    & > div {
      margin-bottom: 15px;

      &:first-child {
        margin-right: 50px;

        @include at-query($breakpoint-small) {
          float: none !important;
        }
      }
    }

    span {
      margin-right: 8px;
      font-weight: 600;
    }

    table {
      background: white;
      border-collapse: collapse;
      width: auto;
    }

    th {
      font-size: 13px;
      font-weight: 500;
      padding: 4px 10px;
    }

    tbody {
      border-top: 1px solid #D4D0CA;
    }

    th, td {
      padding-bottom: 4px;
      padding-top: 4px;
      text-align: center;

      @include at-query($breakpoint-small) {
        font-size: 10px;
      }
    }

    td {
      padding: 4px 10px;

      @include at-query($breakpoint-large) {
        padding: 4px 25px;
      }
    }

    th + th,
    td + td {
      border-left: 1px solid #D4D0CA;
    }

    tfoot {
      margin-top: 10px;

      td {
        border: none;
        font-size: 12px;
        font-weight: 400;

        @include at-query($breakpoint-small) {
          display: block;
          text-align: left;
        }
      }
    }

    p {
      font-size: 12px;
      margin: 5px 0;
    }
  }

  &__Photos {
    max-height: 500px;
    margin: 30px 0;
    padding: 0 5px;
  }

  &__RelatedProducts {
    justify-content: flex-start;
    margin-top: 30px;
    max-height: 500px;
    overflow-y: auto;

    .related-products__card {
      flex-basis: 50%;
    }

    .related-products__title {
      margin-bottom: 5px;
    }

    a:last-child {
      border-bottom: 1px solid #202020;
      font-family: $font-stack-avalon;
      font-size: 14px;
    }
  }
}
</style>
