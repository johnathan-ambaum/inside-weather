<template>
  <div
    ref="PopUp"
    :id="popUpId"
    class="PopUp"
  >
    <div class="PopUp--dialog">
      <div class="PopUp--body">
        <div class="PopUp--imageWrapper">
          <figure
            :style="{ backgroundImage: 'url('+ PopUpImageSource +')' }"
          />
        </div>
        <div class="PopUp--content">
          <button
            class="PopUp--close"
            @click="closePopUp(popUpId)"
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17.414 17.414">
                <g
                  id="Group_176"
                  data-name="Group 176"
                  transform="translate(-1267.793 -302.793)">
                  <line
                    id="Line_117"
                    data-name="Line 117"
                    x2="16"
                    y2="16"
                    transform="translate(1268.5 303.5)"
                    fill="none"
                    stroke="#202020"
                    stroke-width="2"/>
                  <line
                    id="Line_118"
                    data-name="Line 118"
                    x2="16"
                    y2="16"
                    transform="translate(1284.5 303.5) rotate(90)"
                    fill="none"
                    stroke="#202020"
                    stroke-width="2"/>
                </g>
              </svg>
            </i>
          </button>
          <h2 class="PopUp--heading">{{ popUpHeading }}</h2>
          <ul>
            <li
              v-for="item in PopUpContentList"
              :key="item.$id"
            >
              <a
                :href="item.productUrl"
                target="_blank">
                <figure>
                  <img :src="item.productImage">
                </figure>
                <div>
                  <p>{{ item.title }}</p>
                  <span>{{ item.price }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="PopUp--courtain"
      @click="closePopUp(popUpId)"
    />
  </div>
</template>

<script>
export default {
  props: {
    PopUpContentList: Array,
    PopUpImageSource: String,
    popUpId: String,
    popUpHeading: String,
  },
  methods: {
    closePopUp(id) {
      const getTarget = document.getElementById(id);
      const html = document.querySelector('html');
      getTarget.classList.remove('in');
      setTimeout(() => {
        getTarget.classList.remove('fade');
        html.classList.remove('lock');
      }, 300);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

html {
  &.lock {
    overflow: hidden;
    body {
      overflow: hidden;
    }
  }
}
.PopUp {
  display: none;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  .PopUp--courtain {
    background: rgba($color: #000000, $alpha: 0.5);
    cursor: pointer;
    height: 100%;
    opacity: 0;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    width: 100%;
    z-index: 9;
  }
  .PopUp--dialog {
    display: block;
    opacity: 0;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-60%);
    transition: all 0.3s ease-in-out;
    height: 81.125%;
    margin: 0 auto;
    width: 1000px;
    z-index: 99;
    .PopUp--body {
      background: #ffffff;
      display: flex;
      height: 100%;
      justify-content: space-between;
      .PopUp--imageWrapper {
        background: #202020;
        flex-basis: 65%;
        height: 100%;
        figure {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
        }
      }
      .PopUp--content {
        flex-basis: 35%;
        height: 100%;
        padding: 25px 0;
        position: relative;
        ul {
          overflow: hidden;
          overflow-y: auto;
          padding: 0 40px 0 30px;
          @include block(calc(100% - 65px));
          li {
            margin: 0 0 25px;
            @include block();
            a {
              align-items: center;
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
            figure {
              box-shadow: inset 0.25px 0.25px 5px -3px #202020;
              height: 67px;
              padding: 1px;
              width: 67px;
              img {
                @include block();
              }
            }
            div {
              width: calc(100% - 70px);
              padding-left: 10px;
              p {
                display: block;
                font-family: $font-stack-avalon;
                font-weight: 500;
                margin: 0 0 5px;
                @include fonts(14px,#202020,1.41,0.04em);
              }
              span {
                display: block;
                font-family: $font-stack-avalon;
                font-weight: 400;
                @include fonts(14px,#202020,1.41,0.04em);
              }
            }
          }
        }
      }
    }
  }
  &.fade {
    display: block;
    &.in {
      opacity: 1;
      .PopUp--dialog {
        opacity: 1;
        transform: translateY(-50%);
      }
      .PopUp--courtain {
        opacity: 1;
      }
    }
  }
  .PopUp--close {
    box-shadow: none;
    cursor: pointer;
    height: auto;
    outline: none;
    padding: 15px;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
    i {
      width: 18px;
      height: 18px;
      display: block;
      svg {
        @include block(100%);
      }
    }
  }
  .PopUp--heading {
    display: block;
    font-family: $font-stack-avalon;
    font-weight: $demi;
    margin: 0;
    padding: 0 25px 30px;
    @include fonts(28px,#202020,1.27,0.04em);
  }
  @include at-query('max-width: 1280px') {
    .PopUp--dialog {
      width: 75%;
      .PopUp--body {
        .PopUp--imageWrapper {
          flex-basis: 60%;
        }
        .PopUp--content {
          flex-basis: 40%;
        }
      }
    }
    .PopUp--heading {
      font-size: 25px;
    }
  }
  @include at-query('max-width: 1199px') {
    .PopUp--dialog {
      .PopUp--body {
        .PopUp--imageWrapper {
          flex-basis: 50%;
        }
        .PopUp--content {
          flex-basis: 50%;
          ul {
            li {
              margin: 0 0 20px;
            }
          }
        }
      }
    }
  }
  @include at-query('max-width: 991px') {
    overflow: hidden;
    overflow-y: auto;
    .PopUp--dialog {
      height: auto;
      margin-bottom: 20px;
      min-height: calc(100% - 200px);
      top: 0;
      transform: translateY(0);
      width: calc(100% - 30px);

      .PopUp--body {
        display: block;
        position: relative;
        .PopUp--imageWrapper {
          width: 100%;
          height: auto;
          figure {
            padding-bottom: 100%;
          }
        }
        .PopUp--content {
          width: 100%;
          position: static;
          ul {
            padding: 0 20px;
          }
        }
      }
    }
    &.fade {
      &.in {
        .PopUp--dialog  {
          transform: translateY(48px);
        }
      }
    }
    .PopUp--heading {
      font-size: 24px;
      padding: 0 20px 19px;
      text-align: center;
    }
    .PopUp--close {
      top: -28px;
      padding: 7px;
      i {
        width: 14px;
        height: 14px;
        svg {
          line {
            stroke: #ffffff;
          }
        }
      }
    }
  }
  @include at-query('max-width: 767px') {
    .PopUp--dialog .PopUp--body .PopUp--content ul li div {
      p, span{
        font-size: 12px;
      }
    }
  }
}
</style>
