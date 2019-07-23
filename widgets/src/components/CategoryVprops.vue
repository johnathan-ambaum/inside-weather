<template>
  <div 
    class="categoryValueProps"
    ref="categoryValueProps"
    :style="{ 'background': backgroundColor }"
  >
    <div class="--custom-container">
      <ul class="category-value-props --pd-t-130 --pd-b-130">
        <li
          class="category-value-prop"
          v-for="item in categoryValueProps"
          :key="item.id"
        >
          <img :src="item.image"/>
          <h2>{{item.title}}</h2>
          <p>{{item.description}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryValueProps: Array,
    backgroundColor: {type: String, default: "transparent"}
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.categoryValueProps {
  position: relative;
  .category-value-props {
    display: inline-flex;
    .category-value-prop {
      width: 100%;
      padding: 0 23px;
      text-align: center;
      img {
        margin: 0 0 28.5px;
        @include block();
      }
      h2 {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: $demi;
        margin: 0 0 18px;
        @include fonts(24px,#202020,1.2,0.05em);
      }
      p {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: 500;
        margin: 0 0 12px;
        text-align: center;
        @include fonts(15px,#202020,1.46,0.035em);
      }
    }
  }
}
</style>
