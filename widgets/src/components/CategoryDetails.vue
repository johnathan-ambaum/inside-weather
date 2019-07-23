<template>
  <div class="image-content-wrapper">
    <div class="--custom-container">
      <div 
        class="image-content-box _pd-b-50"
        v-for="productDetail in productDetails"
        :key="productDetail.id"
      >
        <figure>
          <img :src="productDetail.imageUrl" />
        </figure>
        <heading-with-description>
          <h2>{{productDetail.title}}</h2>
          <p>{{productDetail.description}}</p>
        </heading-with-description>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingWithDescription from './HeadingWithDescription.vue'

export default {
  components: {
    HeadingWithDescription,
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
    display: inline-flex;
    figure {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 65%;
      height: 0;
      position: relative;
      overflow: hidden;
      padding-bottom: 43%;
      img {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
      }
    }
    .HeadingWithDescription {
      margin: auto 0;
      padding: 0 0 0 77px;
      text-align: center;
      width: 35%;
      h2 {
        margin: 0 0 32px;
      }
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      figure {
        width: 55%;
      }
      .HeadingWithDescription {
        width: 45%;
        padding: 0 77px 0 0;
      }
    }
  }
}
</style>



