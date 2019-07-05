<template>
  <div class="CategoryList">
    <div class="_category-list-wrapper">
      <ul class="_category-lists --clearfix">
        <li 
          class="category-list"
          v-for="item in listItems"
          :key="item.id"
        >
          <img :src="item.image "/>
          <link-button
            :btnText="item.buttonText"
            :linkTo="item.link"
          />
          <p v-if="item.desc">
            {{item.desc}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LinkButton from './LinkButton.vue'

export default {
  components: {
    LinkButton
  },
  data() {
    return {
      listItems: [
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/cat-link_1_livingrm.png?742906',
          buttonText: 'Shop Living',
          link: 'pages/category-sofa'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/cat-link_2_diningrm.png?742909',
          buttonText: 'Shop Dining',
          link: 'pages/category-dining-tables'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/cat-link_3_office.png?737551',
          buttonText: 'Shop Office',
          link: 'pages/category-lounge-chairs'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
@import '../scss/base-layout';

._category-list-wrapper {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -23px;

    li {
      flex-basis: 33.33%;
      padding: 0 23px;
      text-align: center;
      
      img {
        margin: 0 0 28.5px;
        @include block();
      }
    }
  }
}
</style>