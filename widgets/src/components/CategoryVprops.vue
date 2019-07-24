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
          <figure>
            <img :src="item.image"/>
          </figure>
          <div class="categoryValueProps--content">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
          </div>
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
    display: flex;
    margin: 0 -23px;
    flex-direction: row;
    justify-content: space-between;

    .category-value-prop {
      flex-basis: 33.333%;
      padding: 0 23px;
      text-align: center;

      figure {
        margin: 0 0 28.5px;
        overflow: hidden;
        position: relative;
        padding-bottom: 62.5%;
        @include block(0);
        
        img {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          margin: auto;
          @include block();
        }
      }
      >div {
        @include block();

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
          @include fonts(14px,#202020,1.46,0.035em);
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    .category-value-props {
      .category-value-prop {
        >div {
          h2 {
            font-size: 20px;
          }
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    .category-value-props {
      display: block;
      margin: 0;
      .category-value-prop {
        align-items: center;
        display: flex;
        flex-basis: 100%;
        padding: 0;
        margin: 0 0 40px;
        &:nth-child(even) {
          flex-direction: row-reverse;
        }
        figure {
          height: auto;
          margin: 0;
          padding-bottom: 0;
          img {
            position: relative;
          }
        }
        >div {
          h2 {
            margin: 0 0 14px;
            padding-left: 20px;
            text-align: left;
          }
          p {
            margin: 0;
            padding-left: 20px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
