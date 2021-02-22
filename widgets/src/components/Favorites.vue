<template>
  <div class="Favorites">
    <h1 class="Favorites__title">Your customizations</h1>
    <div class="Favorites__action-row">
      <div class="Favorites__action">
        <div class="Favorites__action-icon"><img src="https://cdn.insideweather.com/icons/acct_your-custom_favs.png" alt="Favorites"></div>
        <div class="Favorites__action-title">Favorites</div>
      </div>
      <div class="Favorites__action">
        <div class="Favorites__action-icon"><img src="https://cdn.insideweather.com/icons/acct_your-custom_history.png" alt="Browsing History"></div>
        <div class="Favorites__action-title">Browsing History</div>
      </div>
    </div>
    <div class="Favorites__content">
      <div class="Favorites__grid">
        <product-grid  v-cloak>
            You don't have any favorites yet
        </product-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ProductGrid from './ProductGrid';

export default {
  components: {
    ProductGrid

  },

  props: {

  },

  computed: {
    ...mapState({
      favorites: state => state.favorites,
    }),
  },

  watch: {

  },

  created() {

  },

  mounted() {
    // console.log(favorites)
  },

  methods: {

  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.Favorites{
  font-family: $font-stack-avalon;
  color:#202020;

  &__wrapper{

  }

  &__title{
    text-align: center;
    font-weight: 600;
    font-size:26px;
    letter-spacing: 0.05em;
    padding: 45px 0 28px 0;

    @include at-query($breakpoint-large) {
      font-size:44px;
      padding: 52px 0;

    }
  }
  &__action-row{
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom:19px;
    text-align: center;
  }

  &__action{
    margin:0 22px;
    cursor: pointer;
    @include at-query($breakpoint-large) {
      margin:0 39px;
    }
  }

  &__action:hover .Favorites__action-title{
    border-bottom: 1px solid #202020;
  }

  &__action-icon img{
    display:block;
    margin:0 auto 5px auto;
    width:28px;
    height:28px;
  }

  &__action-title{
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom:1px solid transparent;
    cursor:pointer;

    @include at-query($breakpoint-large) {
      font-size:15px;
    }
  }

  &__content{
    background-color:#f2f2f2;
  }
  &__grid{
    width:calc(100% - 32px);
    padding-top:34px;
    padding-bottom:65px;
    margin:0 auto;
    @include at-query($breakpoint-large) {
      padding-top:80px;
      padding-bottom:110px;
      width:80%;

    }
  }
}
</style>