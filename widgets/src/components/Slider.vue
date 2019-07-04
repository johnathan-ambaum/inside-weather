<template>
  <div class="Slider">
    <div class="owl_carousel_main_wrapper">
      <carousel 
        :items="items"
        :margin="margin"
        :loop="loop"
        :nav="nav"
        :autoplay="autoplay"
        :dots="dots"
        :smartSpeed="smartSpeed"
        :navText="navText"
      >
        <slot></slot>
      </carousel>
    </div>
  </div>
</template>

<script>
import Carousel from 'vue-owl-carousel'

export default {
  components: {
    Carousel
  },
  props: {
    items: {type: Number, default: 1},
    margin: {type: Number, default: 0},
    loop: {type: Boolean, default: false},
    nav: {type: Boolean, default: true},
    autoplay: {type: Boolean, default: false},
    dots: {type: Boolean, default: true},
    smartSpeed: {type: Number, default: 800},
    navText: Array
  }
}
</script>
