
<template v-if="photoshootActive">
  <div v-if="showModal">
    <div id="modal" class="product-customizer-modal">
      <div class="product-customizer-modal__inner">
        <close-button class="product-customizer-modal__close-btn"  @click.native.prevent="hide" :size=15></close-button>
        <h3 class="product-customizer-modal__title">{{modalTitle}}</h3>
        <p class="product-customizer-modal__content">{{modalContent}}</p>
        <img class="product-customizer-modal__img" :src="productImages[0].thumbnail">
        <button class="product-customizer-modal__add" @click="acceptBtn">{{acceptBtnText}}</button>
        <button class="product-customizer-modal__close" @click="hide">{{declineBtnText}}</button>
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
      showModal: false,
      photoshootActive: theme.settings.vwo.photoshootModal.photoshootActive,
      modalTitle: theme.settings.vwo.photoshootModal.modalTitle,
      modalContent: theme.settings.vwo.photoshootModal.modalContent,
      acceptBtnText: theme.settings.vwo.photoshootModal.acceptBtnText,
      declineBtnText: theme.settings.vwo.photoshootModal.declineBtnText,
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
      this.showModal = true;
     },
     hide(){
      this.showModal = false;
     },
     acceptBtn(){
      this.$emit('photoshoot');
      this.hide();
     }
   }
 }
</script>