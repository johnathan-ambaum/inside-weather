<template>
  <div
    ref="pageBuilderSection"
    class="PageBuilderSection"
  />
</template>

<script>
import { mapState } from 'vuex';
import productHandler from '../mixins/productHandler';

export default {
  mixins: [
    productHandler,
  ],

  computed: {
    ...mapState({
      product: state => state.activeProduct,
    }),
  },

  watch: {
    product: {
      immediate: true,
      handler(newProduct, oldProduct) {
        const current = newProduct || oldProduct;

        if (!current) {
          return;
        }

        let handle = newProduct.primary_category;

        if (handle === 'dining-chairs' || handle === 'lounge-chairs') {
          // the word at the beginning of short names is the family, which is the page handle for these categories
          handle = newProduct.short_name.replace(/^([A-z]+).+/, '$1').toLowerCase();
        }

        fetch(`/pages/${handle}`, {
          credentials: 'same-origin',
        })
          .then(response => response.text())
          .then((html) => {
            let openIndex;

            let header = '';
            const openHeader = '<!-- Start PageFly Header';
            const closeHeader = '<!-- End PageFly Header -->';

            openIndex = html.indexOf(openHeader);
            if (openIndex !== -1) {
              header = html.substring(openIndex);
              header = header.substring(header.indexOf('>') + 1);
              header = header.substring(0, header.indexOf(closeHeader));
            }

            let body = '';
            let openTag = '<main';
            let closeTag = '</main>';

            openIndex = html.indexOf(openTag);

            if (openIndex === -1) {
              openTag = '<body';
              closeTag = '</body>';
              openIndex = html.indexOf(openTag);
            }

            if (openIndex !== -1) {
              // find start of actual page content
              body = html.substring(openIndex);
              // omit actual <main> tag since we already have one
              body = body.substring(body.indexOf('>') + 1);
              // take only contents before </main>
              body = body.substring(0, body.indexOf(closeTag));
            }

            this.$refs.pageBuilderSection.innerHTML = header + body;

            const styles = header.match(/<link rel="preload"[^>]*?>/gi);
            if (styles) {
              styles.forEach((style) => {
                const tag = document.createElement('link');
                tag.rel = 'stylesheet';
                const hrefOpen = 'href="';
                let hrefStart = style.indexOf(hrefOpen);
                if (hrefStart !== -1) {
                  hrefStart += hrefOpen.length;
                  tag.href = style.substring(hrefStart, style.indexOf('"', hrefStart + 1));
                  this.$refs.pageBuilderSection.appendChild(tag);
                }
              });
            }

            const scripts = body.match(/<script[^>]*?>[\s\S]*?<\/script>/gi);
            scripts.concat(header.match(/<script[^>]*?>[\s\S]*?<\/script>/gi));
            if (scripts) {
              scripts.forEach((script) => {
                const tag = document.createElement('script');
                const srcOpen = 'src="';
                let srcStart = script.indexOf(srcOpen);
                if (srcStart !== -1) {
                  srcStart += srcOpen.length;
                  tag.src = script.substring(srcStart, script.indexOf('"', srcStart + 1));
                }
                // eslint-disable-next-line
                tag.text = script.substring(script.indexOf('>') + 1, script.indexOf('<\/script>'));
                this.$refs.pageBuilderSection.appendChild(tag);
              });
            }
          });
      },
    },
  },
};
</script>

<style lang="scss">
.PageBuilderSection {
  overflow: hidden;

  .main-content {
    margin-top: 0 !important;

    section {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
}
</style>
