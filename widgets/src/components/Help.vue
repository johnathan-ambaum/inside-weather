<template>
  <div>
    <div class="hero-section">
      <h2>Let's Get in Touch</h2>
    </div>

    <div class="help-section">
      <p>
        Need help pronto? The fastest assistance is via our AI Concierge. Simply chat whatever question or dilemma you might have below and our insider will provide you with ninja-quick responses or put you directly in touch with the correct live agent to service your needs
      </p>

      <p>
        Just want to read up on the into yourself? Feel free to check out the informational pages below
      </p>

      <div class="informational-pages">
        <ul>
          <li>
            <a href="https://insideweather.com/pages/shipping">
              Shipping
            </a>
          </li>
          <li>
            <a href="https://insideweather.com/pages/returns">
              Returns
            </a>
          </li>
          <li>
            <a href="https://insideweather.com/pages/home-trial">
              Home Trial
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../scss/mixins';
  @import '../scss/variables';

  .help-section {
    max-width: 770px;
    margin: 50px auto 0;

    @media screen and (max-width: 580px) {
      margin: 30px 20px 0;
    }

    p {
      font-family: Avalon;
      font-weight: 500;
      font-size: 15px;
      line-height: 21px;
      letter-spacing: 0.04em;
      color: #202020;
      text-align: center;

      @media screen and (max-width: 580px) {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .informational-pages {
      text-align: center;
      margin-top: 26px;

      @media screen and (max-width: 580px) {
        margin-top: 30px;
      }

      ul li {
        display: inline;

        &:not(:last-child) {
          margin-right: 40px;

          @media screen and (max-width: 580px) {
            margin-right: 36px;
          }
        }

        a {
          font-family: Avalon;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.1em;
          color: #202020;
          text-transform: uppercase;
          text-decoration: underline;
        }
      }
    }
  }
</style>
