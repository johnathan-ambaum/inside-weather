export default {
  watch: {
    product(newProduct, oldProduct) {
      if (!newProduct) {
        return;
      }

      fetch(`/products/${newProduct.handle}?view=json`)
        .then(response => response.text())
        .then((productJSON) => {
          const priceEl = document.querySelector('.product__price');
          priceEl.innerHTML = `$${parseInt(newProduct.price, 10)}`;
          priceEl.content = newProduct.price;
          const fulfillmentTime = `${newProduct.min_fulfillment_time}-${newProduct.max_fulfillment_time} days`;
          document.querySelector('.Product__ShippingDays').innerHTML = `FREE Shipping | Custom made in ${fulfillmentTime}`;
          document.querySelector('.affirm-as-low-as').setAttribute('data-amount', newProduct.price * 100);
          window.affirm.ui.refresh();

          let product = null;

          try {
            product = JSON.parse(productJSON);
          } catch (err) {
            throw new Error('Failed to parse product JSON');
          }

          if (product.variants.length) {
            document.querySelector('input[name="id"]').value = product.variants[0].id;
          }

          // below here is manual pageview stuff not needed on initial load, only when switching product by customizer
          if (!oldProduct) {
            return;
          }

          const productPrice = (product.price / 100).toFixed(2);

          const { protocol, host } = window.location;
          const uri = `/collections/${newProduct.primary_category}/products/${newProduct.handle}`;
          const fullUrl = `${protocol}//${host}${uri}`;

          const productSection = document.querySelector('.product-section');
          productSection.querySelector('[itemprop="brand"]').content = product.vendor;
          productSection.querySelector('[itemprop="name"]').content = product.title;
          productSection.querySelector('[itemprop="description"]').content = newProduct.description.replace('"', '&quot;');
          productSection.querySelector('[itemprop="productID"]').content = newProduct.sku;
          productSection.querySelector('[itemprop="url"]').content = fullUrl;
          // eslint-disable-next-line
          productSection.querySelector('[itemprop="image"]').content = newProduct.images.large[0];

          // manually fire product view events when navigating via customizer
          window.fbq('track', 'Microdata');
          window.dataLayer.push({
            event: 'VirtualPageview',
            productIds: [newProduct.sku],
            productName: newProduct.long_display_name,
            totalValue: productPrice,
            productHandle: newProduct.handle,
          });
          window.dataLayer.push({
            event: 'PDPView',
            ecommerce: {
              detail: {
                products: [{
                  name: newProduct.long_display_name,
                  id: newProduct.sku,
                  price: productPrice,
                  category: newProduct.raw.primary_category,
                }],
              },
            },
          });

          window.klaviyoItem = {
            Name: newProduct.long_display_name,
            ProductID: product.id,
            Categories: [newProduct.raw.primary_category],
            ImageURL: newProduct.images.medium[0],
            URL: fullUrl,
            Brand: product.vendor,
            Price: productPrice,
            CompareAtPrice: (product.compare_at_price_max / 100).toFixed(2),
          };
          // eslint-disable-next-line
          window._learnq.push(['track', 'Viewed Product', window.klaviyoItem]);
          // eslint-disable-next-line
          window._learnq.push(['trackViewedItem', {
            Title: window.klaviyoItem.Name,
            ItemId: window.klaviyoItem.ProductID,
            Categories: window.klaviyoItem.Categories,
            ImageUrl: window.klaviyoItem.ImageURL,
            Url: window.klaviyoItem.URL,
            Metadata: {
              Brand: window.klaviyoItem.Brand,
              Price: window.klaviyoItem.Price,
              CompareAtPrice: window.klaviyoItem.CompareAtPrice,
            },
          }]);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    const sidebar = document.querySelector('.ProductDetailGrid__Sidebar');
    const reviewSection = document.querySelector('.ReviewCarousel');
    const desktopWatcher = scrollMonitor.create(reviewSection);
    let mobileWatcher;

    window.addEventListener('wheel', (e) => {
      if (this.isMobile) {
        return;
      }

      const scrollDistance = Math.sign(e.deltaY) * 40;
      const { top: builderTop } = reviewSection.getBoundingClientRect();
      const inViewport = builderTop <= this.screenHeight + scrollDistance;
      const scrollingToBottom = inViewport && scrollDistance > 0 && sidebar.scrollHeight - sidebar.scrollTop >= sidebar.clientHeight + 20;
      const scrollingToTop = window.pageYOffset === 0 && scrollDistance < 0 && sidebar.scrollHeight > 0;

      if (scrollingToBottom) {
        window.scroll(0, builderTop + window.pageYOffset - this.screenHeight);
      }

      if (scrollingToBottom || scrollingToTop) {
        e.preventDefault();
        sidebar.scrollTop += scrollDistance;
      }
    }, false);

    const positionSidebar = (watcher) => {
      if (watcher.isInViewport) {
        sidebar.classList.remove('is-fixed');
        sidebar.classList.add('hug-bottom');
      } else {
        sidebar.classList.add('is-fixed');
        sidebar.classList.remove('hug-bottom');
      }
    };

    /**
     * Because the height of the slider is tied to viewport width, we need to reinitialize
     * the scrollMonitor instance with a new offset any time the screen is resized, so we need
     * to encapsulate that initialization logic for reuse.
     */
    const setupMobile = () => {
      if (!this.isMobile) {
        return;
      }

      if (mobileWatcher) {
        mobileWatcher.destroy();
      }

      // slider height is set to 75vw in ProductDetailSlider
      let fixedSliderHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.75;
      /**
       * 45px top padding added from body.ProductDetailSlider--Fixed
       * 40px bottom margin added from .ProductCustomizer
       * Both need to be deducted from scrollMonitor offset to ensure it triggers at the right time
       */
      fixedSliderHeight -= 85;
      mobileWatcher = scrollMonitor.create(reviewSection, { top: -fixedSliderHeight });

      mobileWatcher.visibilityChange(() => {
        if (!this.isMobile || this.repositioning) {
          return;
        }
        positionSidebar(mobileWatcher);
      });
    };

    if (this.isMobile) {
      setupMobile();
    }
    window.addEventListener('resize', setupMobile);

    // fire on load in case initial scroll position is low on the page, since scrollMonitor won't catch it
    positionSidebar(this.isMobile ? mobileWatcher : desktopWatcher);

    desktopWatcher.visibilityChange(() => {
      if (this.isMobile) {
        return;
      }
      positionSidebar(desktopWatcher);
    });
  },

  methods: {
    productAdded() {
      const formattedPrice = Number(this.product.price).toFixed(2);
      window.dataLayer.push({
        event: 'addToCart',
        totalValue: formattedPrice,
        productSKU: this.product.sku,
        productCategory: this.product.raw.primary_category,
        ecommerce: {
          currencyCode: 'USD',
          add: {
            products: [{
              name: this.product.long_display_name,
              id: this.product.sku,
              price: formattedPrice,
              category: this.product.raw.primary_category,
            }],
          },
        },
      });
    },
  },
};