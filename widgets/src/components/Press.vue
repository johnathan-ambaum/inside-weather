<template>
  <div class="Press" ref="Press">
    <ul>
      <li 
        v-for="(item , index) in pressListItems" 
        :key="item.$id"
        v-bind:class="['press-list-' + (index + 1)]"
        >
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
  props: {
    pressList: Array
  },
  data() {
    return {
      pressListItems: this.pressList
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
    align-items: baseline;
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
        @include fonts(16px,#98958F,22px, 0.04em);
      }
    }
  }
  @include at-query('max-width: 1280px'){
    padding: 100px 0;
    .press--container {
      max-width: 100%;
      padding: 0 15px;
    }
    ul li span {
      font-size: 15px;
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
          font-weight: 400;
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    padding: 59px 0 27px;
    ul {
      flex-direction: column;
      li {
        flex-basis: unset;
        max-width: 500px;
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
