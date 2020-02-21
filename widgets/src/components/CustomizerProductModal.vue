
<template>
  <div v-if="showModal">
    <div id="modal" class="product-customizer-modal">
      <div class="product-customizer-modal__inner">
        <close-button class="product-customizer-modal__close-btn"  @click.native.prevent="hide" size="15"/>
        <h3 class="product-customizer-modal__title">Looking Good </h3>
        <p class="product-customizer-modal__content">Nice Design! You are the first person to create this combination. We'd love to feature your item in a photoshoot!</p>
        <img class="product-customizer-modal__img" :src="productImages[0].thumbnail">
        <button class="product-customizer-modal__add">COUNT ME IN</button>
        <button class="product-customizer-modal__close" @click="hide">NO THANKS</button>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CloseButton from './CloseButton.vue'

 export default {
  components: {
    CloseButton,
  },
   data() {
     return {
      showModal: false
     }
   },
  computed: {
    ...mapState({
      filters: state => state.filters,
      productImages: state => state.productImages,
    }),
  },
   methods: {
     show() {
      this.showModal = true
      console.log(this.productImages[0].thumbnail);
     },
     hide(){
      this.showModal = false
     }
   }
 }
</script>