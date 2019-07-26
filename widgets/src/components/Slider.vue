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
        :responsive="responsive"
        :mouseDrag="mouseDrag"
        :touchDrag="touchDrag"
        :pullDrag="pullDrag"
        :animateOut="animateOut[0]"
        :animateIn="animateIn[0]"
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
    smartSpeed: {type: Number, default: 1000},
    navText: Array,
    responsive: Object,
    mouseDrag: {type: Boolean, default: true},
    touchDrag: {type: Boolean, default: true},
    pullDrag: {type: Boolean, default: true},
    animateOut: {type: [String, Boolean, Array], default: false},
    animateIn: {type: [String, Boolean, Array], default: false}
  },
}
</script>
