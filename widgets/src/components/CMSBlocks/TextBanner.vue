<template>
  <div class="Banner">
    <div
      ref="wrapper"
      class="Banner__wrapper"
      :style="backgroundStyles"
    >
      <div class="Banner__content">
        <h2
          ref="heading"
          :style="titleStyles"
        >{{ titleCopy }}</h2>
        <p
          ref="body"
          :style="bodyStyles"
        >{{ bodyCopy }}</p>
        <div
          ref="button"
          class="_button-wrapper"
        >
          <a
            :href="linkUrl"
            :style="buttonStyles"
            class="--btn linkButton--noBorder"
          >
          {{ buttonCopy }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenMonitor from '../../mixins/screenMonitor';

const mobileImageCutoff = 481;

export default {
  props: {
    imageDesktop: { type: String, default: null },
    imageMobile: { type: String, default: null },
    fillColor: {type: String, default: 'white'},
    titleCopy: { type: String, default: null },
    titleColor: { type: String, default: 'white' },
    bodyCopy: { type: String, default: null },
    bodyColor: { type: String, default: 'white' },
    buttonMobile: { type: Object, default: () => ({ text: '', backgroundColor: 'transparent', textColor: 'white'}) },
    buttonDesktop: { type: Object, default: () => ({ text: '', backgroundColor: 'white', textColor: '#202020'}) },
    linkUrl: { type: String, default: null },
  },

  mixins: [
    screenMonitor,
  ],

  computed: {
    backgroundStyles() {
      if (this.screenWidth < mobileImageCutoff && this.imageMobile) {
        return { backgroundImage: `url(${this.imageMobile})` };
      }

      if (this.imageDesktop) {
        return { backgroundImage: `url(${this.imageDesktop})` };
      }

      return {};
    },

    titleStyles() {
      return {
        color: this.titleColor,
      };
    },

    bodyStyles() {
      return {
        color: this.bodyColor,
      };
    },

    buttonCopy() {
      if (this.isMobile) {
        return this.buttonMobile.text || '';
      }

      return this.buttonDesktop.text || '';
    },

    buttonStyles() {
      const buttonProps = this.isMobile ? this.buttonMobile : this.buttonDesktop;

      const defaultTextColor = this.isMobile ? 'white' : '#202020';
      const defaultBackgroundColor = this.isMobile ? 'transparent' : 'white';

      const backgroundColor = buttonProps.backgroundColor || defaultBackgroundColor;
      const color = buttonProps.textColor || defaultTextColor;

      return {
        backgroundColor,
        color,
        borderBottomColor: backgroundColor === 'transparent' ? color : 'transparent',
        '--border-radius': this.isMobile ? 0 : '60px',
      };
    },
  },

  mounted() {
    const controller = new ScrollMagic.Controller();
    const bannerTimeline = new TimelineLite();
    bannerTimeline
      .fromTo(this.$refs.wrapper, 0.8, {opacity: 0, scale: 1.05}, {opacity: 1, scale: 1, ease: ExpoScaleEase.config(1.05, 1)})
      .fromTo(this.$refs.heading, 1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.75)
      .fromTo(this.$refs.body, 1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 1)
      .fromTo(this.$refs.button, 1, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: Circ.easeOut}, 1.5);
    const bannerScene = new ScrollMagic.Scene({
      triggerElement: '.Banner',
      reverse: false,
      triggerHook: 'onEnter',
      offset: 250,
    }).setTween(bannerTimeline).addTo(controller);
  },
};
</script>

<style lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

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
          color: #ffffff;
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
