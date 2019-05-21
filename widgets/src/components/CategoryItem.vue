<template>
  <div class="CategoryItem" @click="switchPage(categoryLink)">
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    categoryImage: { type: String, default: '' },
    categoryLabel: { type: String, default: '' },
    categoryColor: { type: String, default: '' },
    categoryLink: { type: String, default: '' },
  },

  data() {
    return {
      catItem: {
        backgroundImage: 'url(' + this.categoryImage + ')',
        colorBgHover: this.categoryColor,
        fontWeightHover: 'bold',
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
      this.$bus.$emit('switch:reviewpage', {
        primaryCategory: categoryLink,
        from: 0,
      });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.CategoryItem {
  padding: 0 15px;

  &__Image {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 120px;
    height: 120px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.4;
  }

  &__Label {
    letter-spacing: 0.075em;
    color: rgb(32, 32, 32);
    padding: 5px 0 13px 0;
    font-size: 14px;
    text-align: center;
  }
}
</style>
