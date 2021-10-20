<template>
  <div
    class="PressContainer"
    :style="containerStyles"
  >
    <div class="press--container">
      <div class="Press">
        <ul>
          <li
            v-for="(item, index) in sortedItems"
            ref="items"
            :key="item.$id"
            v-bind:class="['press-list-' + (index + 1)]"
            >
            <a :href="item.linkTo">
              <figure>
                <img :src="image(item)">
              </figure>
              <span :style="textStyles(item)">{{ item.description }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import screenMonitor from '../../mixins/screenMonitor';

export default {
  props: {
    items: { type: Array, default: () => ([]) },
    backgroundColor: { type: String, default: 'white' },
  },

  mixins: [
    screenMonitor,
  ],

  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => a.priority < b.priority ? -1 : 1);
    },

    containerStyles() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },

    image() {
      return ({ imageMobile, imageDesktop }) => {
        if (this.isMobile && imageMobile) {
          return imageMobile;
        }
        return imageDesktop;
      }
    },

    textStyles() {
      return ({ descriptionColor = '#202020', descriptionItalic = false }) => {
        return {
          color: descriptionColor,
          fontStyle: descriptionItalic ? 'italic' : 'normal',
        };
      };
    },
  },

  mounted() {
    if (!this.items.length) {
      return;
    }

    const controller = new ScrollMagic.Controller();
    const pressTimeline = new TimelineLite()
    pressTimeline.fromTo(this.$refs.items, 1,{opacity: 0, y: 100}, {opacity: 1, y: 0, ease: Circ.easeOut});
    const pressTimelineScene = new ScrollMagic.Scene({
      triggerElement: '.PressContainer',
      reverse: false
    }).setTween(pressTimeline).addTo(controller);
  },
};
</script>

<style lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.PressContainer {
  padding: 165px 0;
  @include block();
  .press--container {
    max-width: calc(100% - (136px * 2));
    margin: auto;
    @include block();
  }
  ul {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 -35px;
    li {
      flex-basis: 33.333%;
      text-align: center;
      padding: 0 35px;
      margin: 0;
      figure {
        display: flex;
        margin: 0 auto 20px;
        min-height: 25px;
        img {
          display: block;
          height: auto;
          margin: auto;
          max-height: 25px;
          width: auto;
        }
      }
      span {
        display: inline-block;
        font-family: $font-stack-avalon;
        font-weight: 500;
        font-style: italic;
        text-align: center;
        @include fonts(15px,#98958F, 22px, 0.04em);
      }
    }
  }
  @include at-query('max-width: 1280px'){
    padding: 100px 0;
    .press--container {
      max-width: 100%;
      padding: 0 15px;
    }
    ul {
      margin: 0 -20px;
      li {
        padding: 0 20px;
        span {
          font-size: 13px;
        }
      }
    }
  }
  @include at-query('max-width: 1119px') {
    ul {
      align-items: center;
      flex-wrap: wrap;
      li {
        flex-basis: 45%;
        margin: 0 0 50px;
        span {
          font-size: 16px;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    padding: 59px 0 27px;
    ul {
      flex-direction: column;
      margin: 0;
      li {
        flex-basis: unset;
        max-width: 500px;
        padding: 0 21px;
        &:last-child {
          display: none;
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    ul {
      li {
        span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
