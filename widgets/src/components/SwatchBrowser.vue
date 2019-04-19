<template>
  <div class="SwatchBrowser">
    <nav class="SwatchBrowser__Nav">
      <div
        v-for="category in categories"
        :key="category.handle"
        :class="{ 'SwatchBrowser__NavItem--Active': activeCategory === category.handle }"
        class="SwatchBrowser__NavItem"
        @click="activeCategory = category.handle"
      >
        <img :src="category.image">
        <div class="SwatchBrowser__NavLabel">{{ category.name.toUpperCase() }}</div>
      </div>
    </nav>
    <div class="SwatchBrowser__Filters">
      <swatch-panel
        v-for="filter in filters"
        :key="filter.parameter"
        v-bind="filter"
        :has-toggle="false"
        :group="{ parameter: 'swatches' }"
      />
    </div>
    <div class="SwatchBrowser__Body">
      <section
        v-for="group in swatchGroups"
        :key="group.name"
        class="SwatchBrowser__Section"
      >
        <h2 class="SwatchBrowser__SectionTitle">{{ group.name.toUpperCase() }}</h2>
        <header class="SwatchBrowser__Header">
          <div
            class="SwatchBrowser__Description"
            v-html="group.description"
          />
          <div class="SwatchBrowser__Availability">
            <div class="SwatchBrowser__AvailabilityLabel">AVAILABLE ON:</div>
          </div>
        </header>
        <div
          v-for="swatch in group.swatches"
          :key="swatch.id"
          class="SwatchBrowser__Product"
        >
          <img :src="swatch.image">
          <div class="SwatchBrowser__ProductName">{{ swatch.name }}</div>
          <div class="SwatchBrowser__ProductSubname">{{ swatch.subname }}</div>
          <button
            class="SwatchBrowser__Button"
            @click="toggleCartStatus(swatch.id)"
          >
            ADD
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SwatchPanel from './SwatchPanel.vue';

export default {
  components: {
    SwatchPanel,
  },

  data() {
    return {
      activeCategory: 'sofas',
      categories: [
        { handle: 'sofas', name: 'Sofas', image: 'https://via.placeholder.com/150' },
        { handle: 'sofettes', name: 'Sofettes', image: 'https://via.placeholder.com/150' },
        { handle: 'armchairs', name: 'Armchairs', image: 'https://via.placeholder.com/150' },
        { handle: 'lounge-chairs', name: 'Lounge Chairs', image: 'https://via.placeholder.com/150' },
        { handle: 'dining-chairs', name: 'Dining Chairs', image: 'https://via.placeholder.com/150' },
        { handle: 'tables', name: 'Tables', image: 'https://via.placeholder.com/150' },
        { handle: 'storage', name: 'Storage', image: 'https://via.placeholder.com/150' },
      ],
      filters: [
        {
          name: 'Type',
          type: 'checkbox',
          values: [
            {
              name: 'Design',
              value: 'design',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_pattern_type/primary_pattern_type_design.png',
              swatchHoverURL: null,
            },
            {
              name: 'Solid',
              value: 'solid',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_pattern_type/primary_pattern_type_solid.png',
              swatchHoverURL: null,
            },
          ],
          parameter: 'primary_pattern_type',
        },
        {
          name: 'Color',
          type: 'small_swatch',
          parameter: 'primary_color',
          values: [
            {
              name: 'Beige',
              value: 'beige',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_beige.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_beige_hover.png',
            },
            {
              name: 'Blue',
              value: 'blue',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_blue.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_blue_hover.png',
            },
            {
              name: 'Gray',
              value: 'gray',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_gray.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_gray_hover.png',
            },
            {
              name: 'Brown',
              value: 'brown',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_brown.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_brown_hover.png',
            },
            {
              name: 'Green',
              value: 'green',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_green.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_green_hover.png',
            },
            {
              name: 'Red',
              value: 'red',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_red.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_red_hover.png',
            },
            {
              name: 'Black/White',
              value: 'black-white',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_black-white.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_black-white_hover.png',
            },
            {
              name: 'Yellow',
              value: 'yellow',
              swatchURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_yellow.png',
              swatchHoverURL: 'https://banksy-images.s3.amazonaws.com/swatches/primary_color/primary_color_yellow_hover.png',
            },
          ],
        },
      ],
      swatchGroups: [
        {
          name: 'Cross Weave',
          description: `
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas beatae architecto,
              nulla minus repudiandae esse magnam ad et, dolorem modi soluta. Tenetur, provident?
              Cumque perferendis placeat pariatur soluta tempora alias!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas beatae architecto,
              nulla minus repudiandae esse magnam ad et, dolorem modi soluta. Tenetur, provident?
              Cumque perferendis placeat pariatur soluta tempora alias!
            </p>
          `,
          swatches: [
            {
              id: 1, name: 'Aegean Blue', subname: 'Oxford Weave', image: 'https://via.placeholder.com/150',
            },
          ],
        },
      ],
    };
  },

  methods: {
    toggleCartStatus(variantId) {
      console.log(`TOGGLED VARIANT ${variantId} IN CART`);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchBrowser {
  &__Title {
    font-family: $font-stack-avalon;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
    padding-top: 40px;

    @include at-query($breakpoint-large) {
      font-size: 44px;
    }
  }

  &__Nav {
    display: flex;
    justify-content: center;
  }

  &__NavItem {
    cursor: pointer;
    margin: 0 30px;
    padding-bottom: 20px;
    position: relative;
    text-align: center;
    user-select: none;

    img {
      display: block;
      margin-bottom: 15px;
    }

    &--Active::after {
      border: 18px solid transparent;
      border-top-color: #fff;
      content: '';
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  &__NavLabel {
    display: inline-block;
    font-family: $font-stack-avalon;
    font-size: 11px;
    letter-spacing: .125em;
    line-height: 14px;
    padding: 0 0 2px;

    @at-root {
      .SwatchBrowser__NavItem--Active & {
        border-bottom: 1px solid #202020;
      }
    }

    @include at-query($breakpoint-large) {
      font-size: 13px;
      line-height: 17px;
    }
  }

  &__Filters {
    background: #f0efef;
    display: flex;
    justify-content: center;
  }
}
</style>
