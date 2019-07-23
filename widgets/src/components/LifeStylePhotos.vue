<template>
  <div 
    class="LifeStylePhotos"
    ref="LifeStylePhotos"
  >
    <heading-with-description>
      <h2>{{sectionHeading}}</h2>
      <p>{{sectionDescription}}</p>
    </heading-with-description> 
  </div>
</template>
<script>
import HeadingWithDescription from './HeadingWithDescription.vue'
export default {
  components: {
    HeadingWithDescription,
  },
  props: {
    sectionHeading: String,
    sectionDescription: String
  } 
}
</script>
<style lang="scss">

</style>


