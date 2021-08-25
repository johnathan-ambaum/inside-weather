import interpolator from './interpolator';

export default {
  mixins: [
    interpolator,
  ],

  methods: {
    trackViewProduct() {
      const {
        name, sku, handle, price, msrp, category, image,
      } = this.fullProduct;

      if (!this.filters || !sku || !image) {
        setTimeout(() => {
          this.trackViewProduct();
        }, 300);
        return;
      }

      const productPrice = price.toFixed(2);

      const { protocol, host } = window.location;
      const uri = `/products/${handle}`;
      const fullUrl = `${protocol}//${host}${uri}`;

      const productSection = document.querySelector('.product-section');
      productSection.querySelector('[itemprop="name"]').content = name;
      productSection.querySelector('[itemprop="productID"]').content = sku;
      productSection.querySelector('[itemprop="url"]').content = fullUrl;
      productSection.querySelector('[itemprop="image"]').content = image;

      // manually fire product view events when navigating via customizer
      window.dataLayer.push({
        event: 'VirtualPageview',
        productIds: [sku],
        productName: name,
        totalValue: productPrice,
        productHandle: handle,
        eventId: Math.random().toString(16).slice(2)
      });
      window.dataLayer.push({
        event: 'PDPView',
        ecommerce: {
          detail: {
            products: [{
              name,
              id: sku,
              price: productPrice,
              category,
            }],
          },
        },
      });

      window.klaviyoItem = {
        Name: name,
        ProductID: sku,
        Categories: [category],
        ImageURL: image,
        URL: fullUrl,
        Brand: 'Inside Weather',
        Price: productPrice,
        CompareAtPrice: msrp.toFixed(2),
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
    },

    trackAddToCart({
      name, sku, category, price,
    }) {
      const formattedPrice = Number(price).toFixed(2);
      window.dataLayer.push({
        event: 'addToCart',
        eventId: Math.random().toString(16).slice(2),
        totalValue: formattedPrice,
        productSKU: sku,
        productCategory: category,
        ecommerce: {
          currencyCode: 'USD',
          add: {
            products: [{
              name,
              id: sku,
              price: formattedPrice,
              category,
            }],
          },
        },
      });
    },
  },
};
