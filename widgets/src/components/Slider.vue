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
    smartSpeed: {type: Number, default: 1000},
    navText: Array,
    responsive: Object,
    mouseDrag: {type: Boolean, default: true},
    touchDrag: {type: Boolean, default: true},
    pullDrag: {type: Boolean, default: true}
  },
  data() {
    return {
      currentpos: 1
    }
  },
  methods: {
    animateDots(e) {
      var currentEventTarget = e.currentTarget,
          home_totitems,
          banner_index,
          homecurrent = 1,
          target_index = e.page.index + 1

      banner_index = target_index;
      home_totitems = $(currentEventTarget).find('.owl-dots .owl-dot').length;
      if (banner_index > home_totitems) {
        banner_index = 1;
      }

      if(!$(currentEventTarget).find('.owl-dots').hasClass('disabled')) {
        $(currentEventTarget).find('.owl-dots').attr('class', 'owl-dots').addClass("indi_" + banner_index);
      }

      if (banner_index > this.currentpos) {
        $(currentEventTarget).find('.owl-dots').attr('data-dir','navleft');
      }
      else {
        $(currentEventTarget).find('.owl-dots').attr('data-dir','navright');
      }
      this.currentpos = banner_index;
    }
  },
}
</script>
