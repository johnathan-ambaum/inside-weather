<template>
  <div class="MainHome" ref="MainHome">
    <bannerCarousel></bannerCarousel>
    <div class="MainHome--productGrid">
      <headingWithDescription>
        <h2>Recently Sold</h2>
        <h1 :class="dummy">{{dummy}}</h1>
        <p>Made-to-order furniture, shipped in days, because life is too short to wait.</p>
      </headingWithDescription>
      <recentlySoldProducts></recentlySoldProducts>
    </div>
  </div>
</template>
<script>
  import bannerCarousel from './BannerCarousel.vue'
  import headingWithDescription from './HeadingWithDescription.vue'
  import recentlySoldProducts from './RecentlySoldProducts.vue'
  export default {
    name: 'main-home',
    props: {
      pdtImg: String,
      dummy: String
    },
    components: {
      bannerCarousel,
      headingWithDescription,
      recentlySoldProducts
    },
    data() {
      return {
        dummy: pdtImg
      }
    }
  }
</script>
<style lang="scss" scoped>
  .MainHome--productGrid {
    padding: 130px 0 0;
    display: block;
  }
</style>

