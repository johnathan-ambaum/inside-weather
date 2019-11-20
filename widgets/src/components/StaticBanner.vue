<template>
  <div 
    class="StaticBanner"
    ref="StaticBanner"
  >
    <a href="javascript:void(0)">
      <picture>
        <source 
          v-bind:media="'(max-width:' + responsivePoint + ')' "
          :srcset="mobileBanner">
        <img 
          :src="desktopBanner"
        >
      </picture>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    desktopBanner: String,
    mobileBanner: String,
    responsivePoint: String
  }
}
</script>
<style lang="scss">
.StaticBanner {
  a {
    height: auto;
    width: 100%;
    
    img {
      display: block;
      margin: auto;
      width: 100%
    }
  }
}
</style>


