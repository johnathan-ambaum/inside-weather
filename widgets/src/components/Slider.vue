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
        @changed="animateDots($event)"
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
    navText: Array,
    responsive: Object
  },
  methods: {
    animateDots(e) {
      var home_totitems,
          currentpos = 1,
          banner_index,
          homecurrent = 1,
          target_index = e.property.value - 1,
          currentEventTarget = e.currentTarget;

      banner_index = target_index;

      if (banner_index > home_totitems) {
        banner_index = 1;
      }

      $(currentEventTarget).find('.owl-dots').attr('class', 'owl-dots').addClass("indi_" + banner_index);

      if (banner_index > currentpos) {
        $(currentEventTarget).find('.owl-dots').attr('data-dir','navleft');
      }
      else {
        $(currentEventTarget).find('.owl-dots').attr('data-dir','navright');
      }
      currentpos = banner_index;
    }
  },
}
</script>
