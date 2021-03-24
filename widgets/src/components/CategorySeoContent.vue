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
          <p :class="linkTextClass">{{content.copy_one}}
            <a :href="content.copy_one_linkto_one">{{content.copy_one_linktext_one}}</a>
            <span>{{content.copy_one_sub_one}}</span>
            <a :href="content.copy_one_linkto_two">{{content.copy_one_linktext_two}}</a>
            <span>{{content.copy_one_sub_two}}</span>
          </p>
          <p :class="linkTextClass">{{content.copy_two}}
            <a :href="content.copy_two_linkto_one">{{content.copy_two_linktext_one}}</a>
            <span>{{content.copy_two_sub_one}}</span>
            <a :href="content.copy_two_linkto_two">{{content.copy_two_linktext_two}}</a>
            <span>{{content.copy_two_sub_two}}</span>
            <a :href="content.copy_two_linkto_three">{{content.copy_two_linktext_three}}</a>
            <span>{{content.copy_two_sub_three}}</span>
            <a :href="content.copy_two_linkto_four">{{content.copy_two_linktext_four}}</a>
            <span>{{content.copy_two_sub_four}}</span>
            <a :href="content.copy_two_linkto_five">{{content.copy_two_linktext_five}}</a>
            <span>{{content.copy_two_sub_five}}</span>
          </p>
          <p :class="linkTextClass">{{content.copy_three}}
            <a :href="content.copy_three_linkto_one">{{content.copy_three_linktext_one}}</a>
            <span>{{content.copy_three_sub_one}}</span>
            <a :href="content.copy_three_linkto_two">{{content.copy_three_linktext_two}}</a>
            <span>{{content.copy_three_sub_two}}</span>
            <a :href="content.copy_three_linkto_three">{{content.copy_three_linktext_three}}</a>
            <span>{{content.copy_three_sub_three}}</span>
          </p>
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
    seoContent: Array,
    isLinkText:{type: Boolean, default: false},
  },
  computed: {
    linkTextClass() {
      return {
        'link-text': this.isLinkText
      }
    }
  },
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

    a {
      display: inline;
      text-decoration: underline;
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
