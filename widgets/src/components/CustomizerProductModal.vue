
<template>
  <div v-if="showModal">
    <div id="modal" class="product-customizer__modal">
      <div class="product-customizer__modal-content">
        <h3>Looking Good</h3>
        <p>Nice Design! You are the first person to create this combination. We'd love to feature your item in a photoshoot!</p>
        <img :src="productImages[0].thumbnail">
        <button class="btn btn--full add-to-cart">Count Me In</button>
        <button @click="hide">Close</button>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';

 export default {
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