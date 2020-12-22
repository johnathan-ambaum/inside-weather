<template>
  <div
    class="CategorySeoContent seo-content-wrapper"
    ref="CategorySeoContent"
  >
    <div class="--custom-container">
      <div
        v-for="(content, index) in seoContent"
        :key="index"
        class="seo-content-box"
      >
        <heading-with-description>
          <h2 v-if="content.isTitle === 'true'">{{content.title}}</h2>
          <p>{{content.copy_one}}</p>
          <p>{{content.copy_two}}</p>
          <p>{{content.copy_three}}</p>
          <p>{{content.copy_four}}</p>
        </heading-with-description>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingWithDescription from './HeadingWithDescription.vue'

export default {
  components: {
    HeadingWithDescription,
  },
  props: {
    seoContent: Array
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.seo-content-wrapper {
  .seo-content-box {
    padding: 0 0 100px;
    .HeadingWithDescription {
      margin: auto 0;
      h2 {
        margin: 0 0 34px;
        text-align: center;
        line-height: 40px;
      }
      p {
        line-height: 22px;
        text-align: center;
        max-width: 750px;
        margin-bottom: 20px;
      }
    }
  }
  @include at-query('max-width: 767px') {
    .seo-content-box {
      padding: 26px 0 76px;
      .HeadingWithDescription {
        padding: 0 28px;
        h2 {
          line-height: 30px;
          margin: 0 0 15px;
        }
        p {
          font-size: 13px;
          line-height: 20px;
          padding: 0;
          margin-bottom: 12px;
        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .--custom-container {
      padding: 0;
    }
  }
  @include at-query('max-width: 480px') {
    .--custom-container {
      padding: 0;
    }
  }
}
</style>
