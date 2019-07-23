<template>
  <div class="image-content-wrapper">
    <div 
      class="image-content-box _pd-b-50"
      v-for="productDetail in productDetails"
      :key="productDetail.id"
    >
      <div 
        class="col col-image"
        v-bind:style="{ backgroundImage: 'url('+ productDetail.imageUrl +')' }"
      >
      </div>
      <div class="col col-text">
        <div class="aligner-item">
          <heading-with-description>
            <h2>{{productDetail.title}}</h2>
            <p>{{productDetail.description}}</p>
          </heading-with-description>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headingWithDescription from './HeadingWithDescription.vue'

export default {
  name: 'CategoryDetails',
  components: {
    headingWithDescription
  },
  props: {
    productDetails: Array
  }
} 
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.image-content-wrapper {
  .image-content-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    flex-direction: row; 
    -webkit-flex-direction: row;
    -webkit-flex-wrap: wrap;
    -webkit-justify-content: space-around;
    &:nth-child(even) {
      -webkit-flex-direction: row-reverse;
      flex-direction: row-reverse;
    }
  }
  .col {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    &.col-text {
      height:20em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.col-image {
      background-size: cover;
      background-position:center center;
    }
  }
  .aligner-item {
    width: 60%;
  }
  @include at-query('max-width: 640px') {
    .image-content-box {
      height: 40em;
      display: -webkit-flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      &:nth-child(even) {
        -webkit-flex-direction: column;
        flex-direction: column;
      }
    }
    .col {
      order: vertical;
      &.col-text div p {
        padding: 1em;
      }
    }
    .aligner-item {
      width: 90%;
    }
  }
}
</style>



