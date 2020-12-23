<template>
  <div
    class="PageNotFoundBanner"
    ref="PageNotFoundBanner"
  >
    <a :href="this.bannerImage[0].url">
      <div
        :class="bannerClass"
        class="Banner__wrapper"
        v-bind:style="{ backgroundImage: 'url(' + bannerImageUrl + ')' }"
      >
        <div class="Banner__content">
          <span>{{bannerText}}</span>
          <h2>{{bannerHeading}}</h2>
          <p>{{bannerDescription}}</p>
          <link-button :btnText="buttonText" :linkTo="buttonLink" :bgBlack="true" :border="false" />
        </div>
      </div>
    </a>
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
    fillColor: {type: String, default: 'black'},
    bannerImage: Array,
    bannerText: String,
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
        'PageNotFoundBanner--hideOverlay': !this.hasOverlay,
        'PageNotFoundBanner--darkColor': this.fillColor === 'black'
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

.PageNotFoundBanner {
  display: block;
  height: auto;
  width: 100%;
  a {
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
        max-width: 500px;
        margin-left: 80px;
        padding: 65px 0 145px;
        position: relative;
        width: 100%;
        z-index: 2;
        text-align: left;
        h2 {
          color: #ffffff;
          display: block;
          font-family: $font-stack-avalon;
          font-size: 44px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0em;
          margin: 0 0 26px;
        }
        p {
          color: #ffffff;
          display: block;
          font-family: $font-stack-avalon;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.03em;
          line-height: 33px;
          margin: 0 0 46px;
        }
        span {
          color: #ffffff;
          display: block;
          font-family: $font-stack-avalon;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.08em;
          line-height: 22px;
          margin: 0 0 34px;
        }
        @include at-query('max-width: 1199px') {
          .--btn {
            width: 250px;
          }
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
    &:hover {
      text-decoration: none;
    }
  }
  @include at-query('max-width: 1024px') {
    a {
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
  }
  @include at-query('max-width: 992px') {
    a {
      .Banner__wrapper {
        .Banner__content {
          padding: 42px 55px 280px;
          margin-left: 0;
          text-align: center;
          h2 {
            font-size: 26px;
            margin: 0 0 20px;
          }
          p {
            font-size: 16px;
            margin: 0 0 30px;
          }
          span {
            font-size: 14px;
            margin: 0 0 26px;
          }
          a {
            font-size: 14px;
            letter-spacing: 0.12em;
          }
          .--btn {
            width: 236px;
          }
        }
      }
    }
  }
}
.page-not-found-container {
  @include at-query('min-width: 768px') {
    .--pd-t-90 {
      padding-top: 82px;
    }
    .--pd-b-130 {
      padding-bottom: 82px;
    }
  }
  @include at-query('max-width: 767px') {
    .--pd-b-130 {
      padding-bottom: 100px;
    }
  }
}
</style>
