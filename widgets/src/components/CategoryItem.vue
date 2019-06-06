<template>
  <div class="CategoryItem" @click="switchPage(categoryLink)">
    <div v-if="isMobile">
      <div
        class="CategoryItem__Image"
        :style="styleImageObject"
      />
      <div
        class="CategoryItem__Label"
        :style="styleLabelObject"
      >
        {{ this.categoryLabel }}
      </div>
    </div>
    <div v-else>
      <div
        class="CategoryItem__Image"
        :style="styleImageObject"
        @mouseenter="updateHoverState(true)"
        @mouseleave="updateHoverState(false)"
      />
      <div
        class="CategoryItem__Label"
        :style="styleLabelObject"
        @mouseenter="updateHoverState(true)"
        @mouseleave="updateHoverState(false)"
      >
        {{ this.categoryLabel }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import screenMonitor from '../mixins/screenMonitor';

export default {
  mixins: [
    screenMonitor,
  ],

  props: {
    categoryImage: { type: String, default: '' },
    categoryLabel: { type: String, default: '' },
    categoryColor: { type: String, default: '' },
    categoryLink: { type: String, default: '' },
    isActive: { type: Boolean, default: false },
  },

  data() {
    return {
      catItem: {
        backgroundImage: 'url(' + this.categoryImage + ')',
        colorBgHover: this.categoryColor,
        fontWeightHover: '600',
        opacityHover: 1,
        borderBottomHover: '2px solid #202020',
      },
      hoverState: this.isSelected ? true : false,
    };
  },

  computed: {
    ...mapState({
      category: state => state.category,
    }),

    styleImageObject() {
      const isSelected = this.category === this.categoryLink;
      let modifier = '';
      if (this.hoverState || isSelected) {
        modifier = 'Hover';
      }

      if (this.isActive) modifier = 'Hover';

      return {
        backgroundImage: this.catItem['backgroundImage'],
        backgroundColor: this.catItem['colorBg' + modifier],
        color: this.catItem['colorLabel' + modifier],
        cursor: modifier == 'Hover' ? 'pointer' : 'normal',
        opacity: this.catItem['opacity' + modifier]
      }
    },
    styleLabelObject() {
      const isSelected = this.category === this.categoryLink;
      let modifier = '';
      if (this.hoverState || isSelected) {
        modifier = 'Hover';
      }

      if (this.isActive) modifier = 'Hover';

      return {
        fontWeight: this.catItem['fontWeight' + modifier],
        cursor: modifier == 'Hover' ? 'pointer' : 'normal',
        borderBottom: this.catItem['borderBottom' + modifier],
      }
    }
  },

  methods: {
    updateHoverState(isHover) {
      this.hoverState = isHover;
    },

    switchPage(categoryLink) {
      // if (!this.isMobile) {
        this.$bus.$emit('switch:reviewpage', {
          primaryCategory: categoryLink,
          from: 1,
        });
      // }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.CategoryItem {
  &__Image {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 115px;
    height: 115px;
    text-align: center;
    opacity: 0.4;
  }

  &__Label {
    letter-spacing: 0.075em;
    color: rgb(32, 32, 32);
    padding: 14px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 13px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @include at-query($breakpoint-small) {
    &__Image {
      @include at-query($breakpoint-msmall) {
        width: 66px;
        height: 66px;
        margin: 0 auto;
      }
    }

    &__Label {
      min-height: 42px;
      font-size: 11px;
      padding: 7px 4px;
    }
  }
}
</style>
