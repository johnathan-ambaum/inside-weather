<template>
  <div 
    class="Banner" 
    ref="Banner"
  >
    <div
      :class="bannerClass"
      class="Banner__wrapper"
      v-bind:style="{ backgroundImage: 'url(' + bannerImageUrl + ')' }"
    >
      <div class="Banner__content">
        <h2>{{bannerHeading}}</h2>
        <p>{{bannerDescription}}</p>
        <link-button :btnText="buttonText" :linkTo="buttonLink" stroke="white" />
      </div>
    </div>
  </div>
</template>

<script>
import LinkButton from './LinkButton.vue'

export default {
  components: {
    LinkButton
  },
  props: {
    hasOverlay: {type: Boolean, default: true},
    fillColor: {type: String, default: 'white'},
    bannerImage: Array,
    bannerHeading: String,
    bannerDescription: String,
    buttonText: String,
    buttonLink: String
  },
  data() {
    return {
      bannerImageUrl: ''
    }
  },
  created() {
    this.updateBanner();
    window.addEventListener('resize', this.updateBanner);
  },
  methods: {
    bannerClass() {
      return {
        'Banner--hideOverlay': !this.hasOverlay,
        'Banner--darkColor': this.fillColor === 'black'
      }
    },
    updateBanner() {
      if(window.innerWidth >= 481) {
        this.bannerImageUrl = this.bannerImage[0].bgLarge;
      }else {
        if(window.innerWidth < 481) {
          if(this.bannerImage[0].bgSmall) {
            this.bannerImageUrl = this.bannerImage[0].bgSmall;
          }else {
            this.bannerImageUrl = this.bannerImage[0].bgLarge;
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.Banner {
  display: block;
  height: auto;
  width: 100%;
  .Banner__wrapper {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: auto;
    position: relative;
    width: 100%;
    &::after {
      content: "";
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba($color: #202020, $alpha: 0.1);
      width: 100%;
    }
    .Banner__content {
      display: block;
      font-family: $font-stack-avalon;
      height: auto;
      max-width: 600px;
      margin: 0 auto;
      padding: 145px 0;
      position: relative;
      width: 100%;
      z-index: 2;
      text-align: center;
      h2 {
        color: #ffffff;
        display: block;
        font-family: $font-stack-avalon;
        font-size: 34px;
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: 0.05em;
        margin: 0 0 16px;
      }
      p {
        color: #ffffff;
        display: block;
        font-family: $font-stack-avalon;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.04em;
        line-height: 22px;
        margin: 0 0 46.5px;
      }
    }
    &.Banner--darkColor {
      .Banner__content {
        h2, p {
          color: #000;
        }
      }
    }
  }
  @include at-query('max-width: 1024px') {
    .Banner__wrapper {
      .Banner__content {
        padding: 80px 0;
        h2 {
          font-size: 25px;
          margin: 0 0 13px;
        }
        p {
          font-size: 13px;
          margin: 0 0 30px
        }
      }
    }
  }
  @include at-query('max-width: 992px') {
    .Banner__wrapper {
      .Banner__content {
        padding: 48px 15px 35px;
        h2 {
          font-size: 24px;
          margin: 0 0 6px;
        }
        p {
          font-size: 13px;
          margin: 0 0 37px
        }
        a {
          height: auto;
          border: none;
          border-bottom: 1px solid #ffffff;
          font-size: 15px;
          letter-spacing: 0.12em;
          line-height: 1.2;
          width: auto;
        }
      }
    }
  }
}
</style>
