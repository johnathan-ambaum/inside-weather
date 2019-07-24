<template>
  <div
    class="PopUp"
    ref="PopUp"
    :id="popUpId"
  >
    <div class="PopUp--dialog">
      <div class="PopUp--body">
        <div class="PopUp--imageWrapper">
          <figure>
            <img :src="PopUpImageSource">
          </figure>
        </div>
        <div class="PopUp--content">
          <button
            class="PopUp--close"
            @click="closePopUp(popUpId)"
          >
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.414 17.414">
                <g id="Group_176" data-name="Group 176" transform="translate(-1267.793 -302.793)">
                  <line id="Line_117" data-name="Line 117" x2="16" y2="16" transform="translate(1268.5 303.5)" fill="none" stroke="#202020" stroke-width="2"/>
                  <line id="Line_118" data-name="Line 118" x2="16" y2="16" transform="translate(1284.5 303.5) rotate(90)" fill="none" stroke="#202020" stroke-width="2"/>
                </g>
              </svg>
            </i>
          </button>
          <h2 class="PopUp--heading">{{popUpHeading}}</h2>
          <ul>
            <li
              v-for="item in PopUpContentList"
              :key="item.$id"
            >
              <figure>
                <img :src="item.image">
              </figure>
              <div>
                <p>{{item.title}}</p>
                <span>{{item.price}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    PopUpContentList: Array,
    PopUpImageSource: String,
    popUpId: String,
    popUpHeading: String
  },
  methods: {
    closePopUp(id) {
      const getTarget = document.getElementById(id);
      getTarget.classList.remove('in');
      setTimeout(function() {
        getTarget.classList.remove('fade');
      }, 300);
    }
  }
}
</script>
<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.PopUp {
  background: rgba($color: #000000, $alpha: 0.5);
  display: none;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
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
          background: #202020;
          height: 100%;
          position: relative;
          overflow: hidden;

          img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            height: auto;
            margin: auto;
            object-fit: contain;
            max-height: 100%;
            max-width: 100%;
            width: auto;
          }
        }
      }
      .PopUp--content {
        flex-basis: 35%;
        height: 100%;
        padding: 25px 0 25px 30px;
        position: relative;

        ul {
          overflow: hidden;
          overflow-y: auto;
          padding-right: 40px;
          @include block(calc(100% - 65px));

          li {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin: 0 0 25px;
            width: 100%;

            figure {
              box-shadow: inset 0.2px 0.25px 0.25px 0px #202020;
              height: 67px;
              padding: 0.125px;
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
                font-weight: 500;
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
      .PopUp--dialog {
        opacity: 1;
        transform: translateY(-50%);
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
    margin: 0 0 30px;
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
    .PopUp--dialog {
      width: calc(100% - 30px);
      height: calc(100% - 200px);
      .PopUp--body {
        flex-direction: column;
        position: relative;
        .PopUp--imageWrapper {
          flex-basis: 100%;
          height: 56.25%;
        }
        .PopUp--content {
          flex-basis: 100%;
          height: 45%;
          position: static;
        }
      }
    }
    .PopUp--heading {
      font-size: 24px;
      text-align: center;
    }
    .PopUp--close {
      top: -50px;
      i {
        svg {
          line {
            stroke: #ffffff;
          }
        }
      }
    }
  }
  @include at-query('max-width: 640px') {
    .PopUp--dialog {
      .PopUp--body {
        .PopUp--imageWrapper {
          height: 41.6666%;
        }
        .PopUp--content {
          flex-basis: 100%;
          height: calc(100% - 41.6666%);
          position: static;
        }
      }
    }
  }
}
</style>


