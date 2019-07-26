<template>
  <div class="ValueProps">
    <div class="content">
      <div class="image_wrapper">
        <figure class="default" data-src="default">
          <img :src='defaultImage'>
        </figure>
        <figure 
          v-for="item in valuePropsContent"
          :key="item.id"
          v-bind:data-src="item.targetPoint"
        >
          <img :src="item.image">
        </figure>
      </div>
      <div class="descriptions">
        <h2>{{mainHeading}}</h2>
        <div class="details">
          <accordion
            v-for="Item in valuePropsContent"
            :key="Item.id"
            :accordionHead="Item.accordionHead"
            :accordionDescription="Item.accordionDescription"
            :accordionTriggerElement="Item.targetPoint"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import accordion from './Accordion'
export default {
  props: {
    valuePropsItems: Array,
    defaultImage: String,
    mainHeading: String
  },
  components: {
    accordion
  },
  data() {
    return {
      valuePropsContent: this.valuePropsItems  
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.ValuePropsWrapper {
  background: transparent;
  margin: 45px 0 0;
  padding: 0 0 70px;
  position: relative;
  &::before {
    content: "";
    background: #D4D0CA;
    height: calc(100% - 70px);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
  .--custom-container {
    position: relative;
    z-index: 2;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    .image_wrapper {
      flex-basis: 55%;
      overflow: hidden;
      position: relative;
      height: 0;
      padding-bottom: 37%;
      figure {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        overflow: hidden;
        @include block(100%);
        @include transition();
        @include translate(0,100%);
        img {
          height: 100%;
          display: block;
          object-fit: cover;
        }
        &.default {
          @include translate(0,0);
          top: auto;
          bottom: 0;
          height: 100%;
        }
        &.slide_up {
          top: auto;
          bottom: 0;
          height: 100%;
          @include translate(0,0);
          &.default {
            @include translate(0,-100%);
          }
        }
      }
    }
    .descriptions {
      flex-basis: 45%;
      padding-left: 133.4px;
      h2 {
        display: block;
        font-family: $font-stack-avalon;
        font-weight: 600;
        margin: 0;
        position: absolute;
        text-transform: capitalize;
        top: 163px;
        @include fonts(34px,#202020,1.2,0.04em);
      }
      .details {
        .point{
          opacity: 0;
        }
      }
    }
  }
  @include at-query('max-width: 1280px') {
    .content {
      .image_wrapper {
        flex-basis: 50%;
      }
      .descriptions {
        flex-basis: 50%;
        padding-left: 100px;

        h2 {
          font-size: 34px;
        }
      }
      
    }
  }
  @include at-query('max-width: 1199px') {
    .content {
      .image_wrapper {
        padding-bottom: 42.5%;
      }

      .descriptions {
        padding-left: 75px;
        h2 {
          font-size: 28px;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    padding: 0 0 53px;    
    .content {
      flex-wrap: wrap;
      .image_wrapper {
        flex-basis: 100%;
        padding-bottom: 64%;
        figure {
          img {
            margin: 0 auto;
          }
        }
      }
      .descriptions {
        flex-basis: 100%;
        padding: 40px 17px 0;

        h2 {
          color: #202020;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.04em;
          line-height: 32px;
          padding: 0 0 31px;
          position: static;

        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .content {
      .descriptions {
        p {
          padding: 14px 0 0 52px;
        }
      }
    }
  }
}
</style>
