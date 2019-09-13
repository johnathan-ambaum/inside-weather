<template>
  <div 
    class="categoryValueProps"
    ref="categoryValueProps"
    :style="{ 'background': backgroundColor }"
  >
    <div class="--custom-container">
      <ul class="category-value-props jishnu">
        <li
          v-for="item in categoryValueProps"
          :key="item.id"
          class="category-value-prop"
        >
          <figure
            :class="animationClass"
          >
            <img :src="isBigScreen ? item.image : item.imageSm"/>
          </figure>
          <div class="categoryValueProps--content">
            <h2
              :class="animationClass"
            >
              {{item.title}}
            </h2>
            <p
              :class="animationClass"
            >
              {{item.description}}
            </p>
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
    backgroundColor: {type: String, default: "transparent"},
    isScrollAnimationRequire: {type: Boolean, default: true}
  },
  data() {
    return {
      isBigScreen: true
    }
  },
  created: function () {
    if(window.innerWidth > 991) {
      this.isBigScreen = true
    }else {
      this.isBigScreen = false
    }
  },
  computed: {
    animationClass() {
      return {
        '--animElement': this.isScrollAnimationRequire
      }
    }
  },
  mounted() {
    const changeTheBanner = () => {
      if (window.innerWidth > 991) {
       this.isBigScreen = true
      } else {
        this.isBigScreen = false
      }
    };
    
    window.addEventListener('resize', changeTheBanner);
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.categoryValueProps {
  position: relative;
  padding: 90px 0;
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

        &:not(:last-child) {
          margin: 0 0 45px;
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
          padding-left: 20px;
          h2 {
            font-size: 14px;
            margin: 0 0 14px;
            text-align: left;
            text-transform: uppercase;
            padding: 0;
          }
          p {
            font-size: 12px;
            line-height: 1.66;
            margin: 0;
            padding: 0;
            text-align: left;
          }
        }
        &:nth-child(even) {
          flex-direction: row-reverse;
          >div {
            padding-left: 0;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>
