<template>
  <div class="LifeStyleGrid">
    <div class="LifeStyleGrid__grid">
      <div v-for="(lifeStyleImage, index) in images" :key="index" :class="getGridItemClasses(index)" @click="toggleModal(index)">
        <img :src="lifeStyleImage.image" :alt="lifeStyleImage.altText">
      </div>
    </div>
    <div class="LifeStyleGrid__modal" v-if="showModal">
      <div class="LifeStyleGrid__modal-inner">
        <div class="LifeStyleGrid__modal-content">
          <div class="LifeStyleGrid__modal-close" @click="toggleModal()">&#xd7;</div>
          <div class="LifeStyleGrid__modal-image">
            <img :src="modalImage" :alt="modalAlt">
          </div>
          <div class="LifeStyleGrid__modal-products">
            <div class="LifeStyleGrid__modal-products-heading">Get Inspired</div>
            <a class="LifeStyleGrid__modal-product" v-for="(product, index) in modalProducts" :key="index" :href="product.destination">
              <img :src="product.image" :alt="product.altText" width="65" height="65">
              <div>
                <div class="LifeStyleGrid__modal-product-title">{{product.titleCopy}}</div>
                <div class="LifeStyleGrid__modal-product-price">{{product.price}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array
  },
  data(){
    return {
      showModal: false,
      modalImage: "",
      modalAlt: "",
      modalProducts: []
    }
  },
  methods:{
    getGridItemClasses(index){
      const indexToLetter = String.fromCharCode(index+97);// a, b, c, etc
      return `LifeStyleGrid__grid-item item-${indexToLetter}`;
    },

    toggleModal(index){
      if(Number.isInteger(index)){
        this.populateModal(index);
      }
      document.querySelector('html').classList.toggle('lock');
      const chatOrb = document.querySelector('.orb-chat-mount');
      if(chatOrb && this.showModal){
        chatOrb.style.display = 'block';
      }else if(chatOrb && !this.showModal){
        chatOrb.style.display = 'none';
      }
      this.showModal = !this.showModal;
    },

    populateModal(index){
      this.modalImage = this.images[index].image;
      this.modalAlt = this.images[index].altText;
      this.modalProducts = this.images[index].products;
    }
  }
}
</script>

<style lang='scss'>
@import '../../scss/mixins';
@import '../../scss/variables';

html {
  &.lock {
    overflow: hidden;
    body {
      overflow: hidden;
    }
  }
}

.LifeStyleGrid{
  overflow: auto;
  max-width: 1186px;
  margin: 0 auto;

  *{
    font-family: $font-stack-avalon;
    color:#202020;
    font-weight: 500;
  }

  &__grid{
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 175px;
    grid-template-areas: "a b b"
                         "c c d"
                         "c c e"
                         "f f g"
                         "h i i"
                         "j i i";

    @include at-query($breakpoint-large) {
      grid-auto-rows: 564px;
      gap: 16px;
    }
  }

  &__grid-item{
    background-color:#f2f2f2;
    position: relative;
    cursor: pointer;

    img{
      display:block;
      width:100%;
      height:100%;
      object-fit: cover;
    }

    &:after{
      content: '';
      background:url('https://cdn.shopify.com/s/files/1/2994/0144/files/more-info.png?v=1622720343');
      width: 21px;
      height: 21px;
      display: block;
      position: absolute;
      bottom: 9px;
      right: 7.5px;
      cursor: pointer;
      z-index: 9;
      background-size:contain;

      @include at-query($breakpoint-large) {
        bottom: 15px;
        right: 20px;
        width: 29px;
        height: 29px;
      }
    }
  }

  .item-a{
    grid-area: a;
  }
  .item-b{
    grid-area: b;
  }
  .item-c{
    grid-area: c;
  }
  .item-d{
    grid-area: d;
  }
  .item-e{
    grid-area: e;
  }
  .item-f{
    grid-area: f;
  }
  .item-g{
    grid-area: g;
  }
  .item-h{
    grid-area: h;
  }
  .item-i{
    grid-area: i;
  }
  .item-j{
    grid-area: j;
  }

  &__modal{
    position: fixed; /* Stay in place */
    z-index: 1000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

    &-inner{
      display:block;
      transition: all .3s ease-in-out;
      background-color: white;
      width:calc(100% - 48px);
      margin: 15% auto;
      @include at-query($breakpoint-large) {
        height: 800px;
        margin: 5% auto;
        width: 1000px;
      }
    }

    &-content{
      position:relative;
      display:flex;
      flex-direction: column;

      @include at-query($breakpoint-large) {
        flex-direction: row;
      }
    }

    &-image{
      background-color: #202020;

      @include at-query($breakpoint-large) {
        flex-basis: 65%;
        height: 800px;
      }


      img{
        object-fit: contain;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50%;
        width: 100%;
        height:345px;
        @include at-query($breakpoint-large) {

          height: 800px;
        }
      }
    }

    &-products{
      overflow: scroll;
      padding: 0 20px 25px 20px;

      @include at-query($breakpoint-large) {
        overflow: auto;
      }

    }

    &-product{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;

      img{
        display:block;
        margin-right: 10px;
        border: 1px solid #ebebeb;
      }

      &-title,&-price{
        line-height: 1.41;
        letter-spacing: .04em;
        font-size: 12px;

        @include at-query($breakpoint-large) {
          font-size: 14px;
        }
      }

      &-title{
        font-weight: 500;
      }

      &-price{
        font-weight: 400;
        margin-top:5px;
      }
    }

    &-products-heading{
      font-size: 24px;
      padding: 25px 20px 0px;
      text-align: center;
      font-weight: 600;
      line-height: 1.27;
      letter-spacing: .04em;

      @include at-query($breakpoint-large) {
        text-align: left;
      }
    }
  }

  &__modal-close{
    position: absolute;
    top: -65px;
    right: -5px;
    padding: 15px;
    font-size: 40px;
    cursor: pointer;
    color:white;

    @include at-query($breakpoint-large) {
      color:black;
      top: -25px;
    }
  }
}


</style>
