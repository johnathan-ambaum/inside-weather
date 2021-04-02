<template>
  <div
    class="CollectionDetails collection-content-wrapper"
    ref="CollectionDetails"
  >
    <div class="--custom-container">
      <div
        v-for="(bannerDetail, index) in collectionDetails"
        :key="index"
        class="image-content-box"
      >
        <figure
        >
          <img
            :src="bannerDetail.imageUrl"
            :alt="bannerDetail.altText"
          />
        </figure>
        <div class="content-wrapper">
          <heading-with-description>
            <h2>{{bannerDetail.title}}</h2>
            <p>{{bannerDetail.description}}</p>
          </heading-with-description>

          <div class="link-wrapper">
            <a
              :href="bannerDetail.url"
              v-if="bannerDetail.linkText.length > 0"
            >
              {{bannerDetail.linkText}}
            </a>
          </div>
        </div>
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
    collectionDetails: Array
  },
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.collection-content-wrapper {
  .--custom-container {
    padding: 0;
    max-width: unset;

    .image-content-box {
      align-items: stretch;
      display: flex;
      flex-direction: row-reverse;

      figure {
        flex-basis: 50%;
        margin: 0;

        img {
          @include block(100%);
        }
      }

      .content-wrapper {
        display: block;
        flex-basis: 50%;
        padding: 50px;
        background: #f2f2f2;

        .HeadingWithDescription {
          margin: auto 0;
          padding: 0;
          h2 {
            margin: 0 0 22px;
            text-align: left;
            font-size: 34px;
            font-weight: 500;
            letter-spacing: 0.12em;
            line-height: 30px;
          }
          p {
            margin: 0 0 22px;
            line-height: 1.57;
            text-align: left;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.04em;
            line-height: 22px;
          }
        }

        .link-wrapper {
          a {
            padding: 16px;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.12em;
            line-height: 30px;
            border-radius: 24px;
            background: #fff;
            border: 1px solid #202020;
            display: inline-block;
            &:hover {
              text-decoration: none;
            }
          }
        }
      }
    }



    @include at-query('max-width: 767px') {
      .image-content-box {
        display: block;
        padding: 0;

        .content-wrapper {
          text-align: center;
          padding: 0;
          .HeadingWithDescription {
            margin: 0 auto;
            position: relative;
            padding: 30px 14px 0;

            h2 {
              font-size: 24px;
              margin: 0 0 16px;
              letter-spacing: 0.02em;
              line-height: 30px;
              text-align: center;
            }
            p {
              line-height: 20px;
              padding: 0;
              font-size: 13px;
              letter-spacing: 0.04em;
              text-align: center;
              margin: 0 0 32px;
            }
          }
          .link-wrapper {
            a {
              padding: 12px;
              margin: 0 auto 34px;
              font-size: 12px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
