<template>
  <div class="Press" ref="Press">
    <ul>
      <li v-for="item in PressList" :key="item.$id">
        <figure>
          <img :src="item.image">
          
        </figure>
        <span>{{item.description}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PressList: [
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_domino_2x_788a469b-7ccf-4ec6-a2eb-6b46463c92bb.png?751631',
          description: 'A welcome addition to the new design world of ultra simplicity.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_housemethod.png?751632',
          description: 'Inside Weather is out to prove that ease and customization are not mutually exclusive.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_realsimple.png?751634',description: 'Inside Weather is out to prove that ease and customization are not mutually exclusive.'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2994/0144/files/press_logo_washingtonpost.png?751634',
          description: 'A welcome addition to the new design world of ultra simplicity.'
        }
      ]   
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.PressContainer {
  padding: 173px 0;
  @include block();
  .press--container {
    max-width: calc(100% - (136px * 2));
    margin: auto;
    @include block();
  }
  ul {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 -10px;
    li {
      text-align: center;
      padding: 0 10px;
      figure {
        margin: 0 auto 20px;
        img {
          display: block;
          height: auto;
          margin: auto;
          width: auto;
        }
      }
      span {
        font-family: $font-stack-avalon;
        font-weight: 600;
        display: inline-block;
        @include fonts(16px,#98958F,1.18, 0.035em);
      }
    }
  }
}
</style>