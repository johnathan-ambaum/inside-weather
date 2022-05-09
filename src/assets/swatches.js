(self["webpackChunkproduct_navigation_widgets"] = self["webpackChunkproduct_navigation_widgets"] || []).push([["/swatches"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    direction: {
      type: String,
      "default": 'left'
    }
  },
  computed: {
    buttonClasses: function buttonClasses() {
      return [this.direction];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    images: Array
  },
  created: function created() {
    var _this = this;

    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        document.querySelector('html').classList.remove('lock');
        _this.showModal = false;
      }
    });
    document.addEventListener('click', function (evt) {
      if (!evt.target.closest('.LifeStyleGrid__modal-content') && _this.showModal) {
        document.querySelector('html').classList.remove('lock');
        _this.showModal = false;
      }
    });
  },
  data: function data() {
    return {
      showModal: false,
      modalImage: "",
      modalAlt: "",
      modalProducts: []
    };
  },
  methods: {
    getGridItemClasses: function getGridItemClasses(index) {
      var indexToLetter = String.fromCharCode(index + 97); // a, b, c, etc

      return "LifeStyleGrid__grid-item item-".concat(indexToLetter);
    },
    toggleModal: function toggleModal(index) {
      if (Number.isInteger(index)) {
        this.populateModal(index);
      }

      document.querySelector('html').classList.toggle('lock');
      var chatOrb = document.querySelector('.orb-chat-mount');

      if (chatOrb && this.showModal) {
        chatOrb.style.display = 'block';
      } else if (chatOrb && !this.showModal) {
        chatOrb.style.display = 'none';
      }

      this.showModal = !this.showModal;
    },
    populateModal: function populateModal(index) {
      this.modalImage = this.images[index].image;
      this.modalAlt = this.images[index].altText;
      this.modalProducts = this.images[index].products;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    swatch: {
      type: Object,
      required: true
    },
    "static": {
      type: Boolean,
      "default": false
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    size: {
      type: Number,
      "default": 32.121
    },
    label: {
      type: String,
      "default": ''
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SwatchesOrderForm_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SwatchesOrderForm.vue */ "./src/components/SwatchesOrderForm.vue");
/* harmony import */ var _SwatchInfo_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwatchInfo.vue */ "./src/components/SwatchInfo.vue");
/* harmony import */ var _CartSwatch_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CartSwatch.vue */ "./src/components/CartSwatch.vue");
/* harmony import */ var _CloseButton_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CloseButton.vue */ "./src/components/CloseButton.vue");
/* harmony import */ var _mixins_screenMonitor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mixins/screenMonitor */ "./src/mixins/screenMonitor.js");
/* harmony import */ var _static_swatchFilters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../static/swatchFilters */ "./src/static/swatchFilters.js");
/* harmony import */ var _util_ApiClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/ApiClient */ "./src/util/ApiClient.js");
/* harmony import */ var _mixins_interpolator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mixins/interpolator */ "./src/mixins/interpolator.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










var apiClient = new _util_ApiClient__WEBPACK_IMPORTED_MODULE_7__["default"]();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    SwatchesOrderForm: _SwatchesOrderForm_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    CloseButton: _CloseButton_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    SwatchInfo: _SwatchInfo_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CartSwatch: _CartSwatch_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mixins: [_mixins_interpolator__WEBPACK_IMPORTED_MODULE_8__["default"], _mixins_screenMonitor__WEBPACK_IMPORTED_MODULE_5__["default"]],
  props: {
    isTrade: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      swatchFilters: _static_swatchFilters__WEBPACK_IMPORTED_MODULE_6__.filters,
      sortOptions: _static_swatchFilters__WEBPACK_IMPORTED_MODULE_6__.sortOptions,
      openFilters: [],
      cart: [],
      activeSwatch: null,
      relatedProducts: [],
      errorOn: null,
      maxSwatches: 15,
      showOrderForm: false,
      isSubmitting: false,
      completed: false,
      showCart: !this.isLargeMobile,
      appliedFilters: {
        upholstery_family: [],
        features: [],
        color_family: [],
        design_style: []
      },
      sortBy: 'upholstery'
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_9__.mapState)({
    swatches: function swatches(state) {
      return state.swatches || [];
    }
  })), {}, {
    purify: function purify() {
      return function (html) {
        return dompurify__WEBPACK_IMPORTED_MODULE_0___default().sanitize(html);
      };
    },
    isFilterOpen: function isFilterOpen() {
      var _this = this;

      return function (key) {
        return _this.openFilters.includes(key);
      };
    },
    filterRowClasses: function filterRowClasses() {
      return function (option) {
        return {
          top: option.description
        };
      };
    },
    sortDisplay: function sortDisplay() {
      var _this2 = this;

      var _this$sortOptions$fin = this.sortOptions.find(function (option) {
        return option.value === _this2.sortBy;
      }),
          display = _this$sortOptions$fin.display;

      return display;
    },
    mainClasses: function mainClasses() {
      return {
        'order-form-active': this.showOrderForm
      };
    },
    isChecked: function isChecked() {
      var _this3 = this;

      return function (filter, value) {
        return _this3.appliedFilters[filter].includes(value);
      };
    },
    filteredSwatches: function filteredSwatches() {
      var _this4 = this;

      var sorter = function sorter(a, b) {
        return a["".concat(_this4.sortBy, "_sort_order")] < b["".concat(_this4.sortBy, "_sort_order")] ? -1 : 1;
      };

      var selections = Object.entries(this.appliedFilters);

      if (!selections.some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            values = _ref2[1];

        return !!values.length;
      })) {
        return _toConsumableArray(this.swatches).sort(sorter);
      }

      return this.swatches.filter(function (swatch) {
        return selections.every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              values = _ref4[1];

          return !values.length || values.some(function (value) {
            if (typeof swatch[value] !== 'undefined' && !!swatch[value] === swatch[value]) {
              return swatch[value];
            }

            var _this4$swatchFilters$ = _this4.swatchFilters.find(function (item) {
              return item.key === key;
            }),
                isArray = _this4$swatchFilters$.isArray;

            if (isArray && swatch[key] && swatch[key].length) {
              return swatch[key].includes(value);
            }

            return swatch[key] === value;
          });
        });
      }).sort(sorter);
    },
    infoActive: function infoActive() {
      var _this5 = this;

      return function (variantId) {
        return _this5.activeSwatch && _this5.activeSwatch.variant_id === variantId;
      };
    },
    hasError: function hasError() {
      var _this6 = this;

      return function (variantId) {
        return _this6.errorOn === variantId;
      };
    },
    inCart: function inCart() {
      var _this7 = this;

      return function (variantId) {
        return _this7.cart.some(function (item) {
          return item.variant_id === variantId;
        });
      };
    }
  }),
  watch: {
    openFilters: function openFilters(newValue) {
      var _this8 = this;

      var bindCloseEvents = function bindCloseEvents(e) {
        var clickedOutside = e.type === 'click' && !e.target.closest('.SwatchBrowser__Dialog') && !e.target.closest('.SwatchBrowser__Pill');
        var pressedEscape = e.type === 'keydown' && e.keyCode === 27;

        if (clickedOutside || pressedEscape) {
          _this8.openFilters = [];
        }
      };

      if (newValue.length) {
        document.body.addEventListener('click', bindCloseEvents);
        window.addEventListener('keydown', bindCloseEvents);
      } else {
        document.body.removeEventListener('click', bindCloseEvents);
        window.removeEventListener('keydown', bindCloseEvents);
      }
    },
    filteredSwatches: function filteredSwatches(newSwatches, oldSwatches) {
      if (oldSwatches.length) {
        this.returnToTop();
      }
    },
    showOrderForm: function showOrderForm(newValue) {
      if (this.isLargeMobile) {
        document.querySelector('html').classList.toggle('ProductCustomizer--Open', newValue);
      }
    },
    activeSwatch: function activeSwatch(swatch) {
      if (this.isLargeMobile) {
        document.querySelector('html').classList.toggle('ProductCustomizer--Open', swatch !== null);
      }
    }
  },
  created: function created() {
    var _this9 = this;

    this.pullSwatches(this.isTrade);
    this.loadCart();
    this.maxSwatches = window.theme.settings.swatchBrowser.maxSwatches || 15;
    this.$bus.$on('swatch-browser:submission-in-progress', function (isSubmitting) {
      _this9.isSubmitting = isSubmitting;
    });
    this.$bus.$on('swatch-browser:order-complete', function () {
      _this9.completed = true;
      _this9.$refs.mainContainer.scrollTop = 0;
      localStorage.removeItem('swatches.cart');
    });
  },
  mounted: function mounted() {
    var _this10 = this;

    this.$bus.$on('swatch-browser:focus-field', function (e) {
      if (!_this10.isLargeMobile) {
        return;
      }

      setTimeout(function () {
        var _e$target$parentNode$ = e.target.parentNode.getBoundingClientRect(),
            top = _e$target$parentNode$.top,
            height = _e$target$parentNode$.height;

        _this10.$refs.mainContainer.scrollTop = _this10.$refs.mainContainer.scrollTop + top - height;
      }, 100);
    });
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_9__.mapActions)(['pullSwatches'])), {}, {
    returnToTop: function returnToTop() {
      var _this11 = this;

      window.requestAnimationFrame(function () {
        var offsetTop = _this11.$refs.swatchContainer.getBoundingClientRect().top;

        var headerHeight = document.querySelector('.ambaum__header').getBoundingClientRect().height;

        var filterHeight = _this11.$refs.filters.getBoundingClientRect().height;

        var extraPadding = 80;
        window.scrollTo({
          top: window.pageYOffset + offsetTop - headerHeight - filterHeight - extraPadding,
          behavior: 'smooth'
        });
      });
    },
    toggleFilter: function toggleFilter(key) {
      this.activeSwatch = null; // allow multiple expanded filters on mobile, but only one at a time on desktop

      if (!this.isLargeMobile) {
        this.openFilters = this.isFilterOpen(key) ? [] : [key];
        return;
      }

      var index = this.openFilters.findIndex(function (item) {
        return item === key;
      });

      if (index === -1) {
        this.openFilters.push(key);
        return;
      }

      this.openFilters.splice(index, 1); // if all filters closed on mobile, keep a dummy open filter to prevent filter overlay from closing

      if (!this.openFilters.length && key !== 'sort') {
        this.openFilters = [''];
      }
    },
    closeFilters: function closeFilters() {
      this.openFilters = [];
    },
    clearFilters: function clearFilters() {
      this.appliedFilters = {
        upholstery_family: [],
        features: [],
        color_family: [],
        design_style: []
      };
    },
    toggleInfo: function toggleInfo(variantId, index) {
      var _this12 = this;

      var bookends = document.querySelectorAll('.bookend');

      if (bookends.length) {
        bookends.forEach(function (el) {
          return el.classList.remove('bookend');
        });
      }

      var isCloseAction = this.infoActive(variantId);
      this.activeSwatch = null;

      if (isCloseAction) {
        return;
      }

      if (!this.isLargeMobile) {
        this.$nextTick(function () {
          for (var i = index; i >= 0; i--) {
            if (_this12.$refs.swatches[i].getBoundingClientRect().left < 100) {
              var bookendIndex = i === index ? i + 1 : i;

              _this12.$refs.swatches[bookendIndex].classList.add('bookend');

              var _this12$$refs$swatche = _this12.$refs.swatches[i].getBoundingClientRect(),
                  top = _this12$$refs$swatche.top;

              var headerHeight = document.querySelector('.ambaum__header').getBoundingClientRect().height;

              var filterHeight = _this12.$refs.filters.getBoundingClientRect().height;

              window.scrollTo({
                top: window.pageYOffset + top - headerHeight - filterHeight - 80,
                behavior: 'smooth'
              });
              break;
            }
          }
        });
      }

      this.activeSwatch = {
        variant_id: variantId
      };
      var selected = this.swatches.find(function (swatch) {
        return swatch.variant_id === variantId;
      });
      apiClient.getSwatchDetail(selected.name).then(function (swatch) {
        _this12.activeSwatch = swatch;

        _this12.buildRelatedProducts(swatch.related_products, {
          color_name: swatch.parameter
        }).then(function (products) {
          _this12.relatedProducts = products;
        });
      });
    },
    toggleLineItem: function toggleLineItem(swatch) {
      this.errorOn = null;
      var index = this.cart.findIndex(function (item) {
        return item.variant_id === swatch.variant_id;
      });

      if (index !== -1) {
        this.cart.splice(index, 1);

        if (this.cart.length < 1) {
          this.showOrderForm = false;
        }

        this.saveCart();
        return;
      }

      if (this.cart.length >= this.maxSwatches) {
        this.errorOn = swatch.variant_id;
        return;
      }

      this.cart.push(swatch);
      this.saveCart();
    },
    loadCart: function loadCart() {
      var cart = localStorage.getItem('swatches.cart');

      if (cart) {
        this.cart = JSON.parse(cart);
      }
    },
    saveCart: function saveCart() {
      localStorage.setItem('swatches.cart', JSON.stringify(this.cart));
    },
    openCart: function openCart() {
      this.errorOn = null;
      this.showCart = true;
    },
    backToSwatches: function backToSwatches() {
      this.showCart = true;
      this.showOrderForm = false;
    },
    closeFromCart: function closeFromCart() {
      this.showOrderForm = this.isLargeMobile;
      this.showCart = !this.isLargeMobile;
    },
    submitFromCart: function submitFromCart() {
      if (!this.showOrderForm) {
        this.startOrder();
        return;
      }

      if (this.isLargeMobile && this.showCart) {
        this.showCart = false;
        return;
      }

      this.$bus.$emit('swatch-browser:submit-order');
    },
    startOrder: function startOrder() {
      if (this.cart.length < 1) {
        return;
      }

      this.showOrderForm = true;

      if (this.isLargeMobile) {
        this.showCart = false;
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CMSBlocks_LifestyleGrid_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CMSBlocks/LifestyleGrid.vue */ "./src/components/CMSBlocks/LifestyleGrid.vue");
/* harmony import */ var _mixins_screenMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/screenMonitor */ "./src/mixins/screenMonitor.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    LifestyleGrid: _CMSBlocks_LifestyleGrid_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mixins: [_mixins_screenMonitor__WEBPACK_IMPORTED_MODULE_1__["default"]],
  props: {
    swatch: {
      type: Object,
      "default": function _default() {
        return null;
      }
    },
    relatedProducts: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      activeTab: 'details'
    };
  },
  computed: {
    hasPhotos: function hasPhotos() {
      if (!this.swatch || !this.swatch.lifestyle_grid) {
        return false;
      }

      return this.swatch.lifestyle_grid.images && this.swatch.lifestyle_grid.images.length;
    },
    hasRelated: function hasRelated() {
      return this.swatch && this.swatch.related_products && this.relatedProducts.length;
    }
  },
  watch: {
    swatch: function swatch() {
      this.activeTab = 'details';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _static_STATE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/STATE */ "./src/static/STATE.js");
/* harmony import */ var _util_ApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ApiClient */ "./src/util/ApiClient.js");
/* harmony import */ var _ArrowButton_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrowButton.vue */ "./src/components/ArrowButton.vue");
/* harmony import */ var _CloseButton_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CloseButton.vue */ "./src/components/CloseButton.vue");
var _excluded = ["email"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var apiClient = new _util_ApiClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    ArrowButton: _ArrowButton_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CloseButton: _CloseButton_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    cart: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    isMobile: {
      type: Boolean,
      "default": false
    },
    isSubmitting: {
      type: Boolean,
      "default": false
    },
    completed: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      address: {
        first_name: '',
        last_name: '',
        address1: '',
        address2: '',
        phone: '',
        city: '',
        province: '',
        country: 'US',
        zip: '',
        email: ''
      },
      errors: [],
      tooManySwatchOrders: false,
      thankYouMessage: ''
    };
  },
  computed: {
    hasErrors: function hasErrors() {
      return this.errors.length > 0;
    },
    hasError: function hasError() {
      var _this = this;

      return function (field) {
        return _this.errors.some(function (error) {
          return error.key === field;
        });
      };
    },
    errorFor: function errorFor() {
      var _this2 = this;

      return function (field) {
        return (_this2.errors.find(function (error) {
          return error.key === field;
        }) || {}).message || '';
      };
    },
    fields: function fields() {
      return [{
        name: 'first_name',
        label: 'FIRST NAME',
        type: 'text',
        required: true,
        fullWidth: false
      }, {
        name: 'last_name',
        label: 'LAST NAME',
        type: 'text',
        required: true,
        fullWidth: false
      }, {
        name: 'email',
        label: 'EMAIL ADDRESS',
        type: 'text',
        required: true,
        fullWidth: true
      }, {
        name: 'address1',
        label: 'Address',
        type: 'text',
        required: true,
        fullWidth: true
      }, {
        name: 'address2',
        label: 'APT/SUITE #',
        type: 'text',
        required: false,
        fullWidth: true
      }, {
        name: 'city',
        label: 'CITY',
        type: 'text',
        required: true,
        fullWidth: true
      }, {
        name: 'province',
        label: 'STATE',
        type: 'state',
        required: true,
        fullWidth: false
      }, {
        name: 'zip',
        label: 'ZIP',
        type: 'number',
        required: true,
        fullWidth: false
      }, {
        name: 'phone',
        label: 'PHONE NUMBER',
        type: 'number',
        required: true,
        fullWidth: true
      }];
    },
    states: function states() {
      return _static_STATE__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
  },
  created: function created() {
    var _this3 = this;

    this.thankYouMessage = window.theme.settings.swatchBrowser.thankYouMessage || '';
    this.$bus.$on('swatch-browser:submit-order', function () {
      _this3.submit();
    });
  },
  methods: {
    validate: function validate() {
      var _this4 = this;

      this.errors = [];
      this.fields.forEach(function (_ref) {
        var name = _ref.name,
            required = _ref.required;

        if (required && _this4.address[name].trim() === '') {
          _this4.errors.push({
            key: name,
            message: 'Required'
          });
        }
      });
      return this.errors.length < 1;
    },
    setCookie: function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    },
    submit: function submit() {
      var _this5 = this;

      if (this.isSubmitting) {
        return;
      }

      if (!this.validate()) {
        return;
      }

      if (this.getCookie('customerOrderedSwatch') === 'true') {
        this.tooManySwatchOrders = true;
        return;
      }

      this.setCookie('customerOrderedSwatch', 'true', 7);
      this.$bus.$emit('swatch-browser:submission-in-progress', true);

      var _this$address = this.address,
          email = _this$address.email,
          address = _objectWithoutProperties(_this$address, _excluded); // send order to API for creation


      apiClient.submitSwatchOrder({
        items: this.cart.map(function (swatch) {
          return swatch.variant_id;
        }),
        email: email,
        address: address
      }).then(function (response) {
        _this5.$bus.$emit('swatch-browser:order-complete');
      })["catch"](function (_ref2) {
        var _ref2$errors = _ref2.errors,
            errors = _ref2$errors === void 0 ? [] : _ref2$errors;
        _this5.errors = errors;
      })["finally"](function () {
        _this5.$bus.$emit('swatch-browser:submission-in-progress', false);
      });
    }
  }
});

/***/ }),

/***/ "./src/mixins/interpolator.js":
/*!************************************!*\
  !*** ./src/mixins/interpolator.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _util_ApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ApiClient */ "./src/util/ApiClient.js");
/* harmony import */ var _util_cylindo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/cylindo */ "./src/util/cylindo.js");
/* harmony import */ var _util_FilterStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/FilterStorage */ "./src/util/FilterStorage.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var apiClient = new _util_ApiClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapState)({
    filters: function filters(state) {
      return state.filters;
    },
    attributes: function attributes(state) {
      return state.filters.attributes;
    },
    basePrice: function basePrice(state) {
      return state.filters.price;
    },
    templates: function templates(state) {
      return state.filters.templates;
    },
    selectedOptions: function selectedOptions(state) {
      return state.selectedOptions;
    },
    activeProduct: function activeProduct(state) {
      return state.activeProduct;
    },
    productType: function productType(state) {
      return state.category;
    }
  })), {}, {
    productName: function productName() {
      if (!this.templates) {
        return '';
      }

      var _ref = this.templates.find(function (item) {
        return item.key === 'name';
      }) || {},
          _ref$template = _ref.template,
          template = _ref$template === void 0 ? '' : _ref$template;

      return this.interpolateString(template);
    },
    modelNumber: function modelNumber() {
      if (!this.templates) {
        return '';
      }

      var _ref2 = this.templates.find(function (item) {
        return item.key === 'model_number';
      }) || {},
          _ref2$template = _ref2.template,
          template = _ref2$template === void 0 ? '' : _ref2$template;

      return this.interpolateString(template);
    },
    productSku: function productSku() {
      return this.modelNumber;
    },
    productPrice: function productPrice() {
      var _this = this;

      if (!this.basePrice || Object.keys(this.selectedOptions).length < 1) {
        return null;
      }

      return Object.entries(this.selectedOptions).reduce(function (total, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            parameter = _ref4[0],
            value = _ref4[1];

        var attribute = _this.attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return total;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected || !selected.price_markup) {
          return total;
        }

        return total + Number(selected.price_markup);
      }, Number(this.basePrice));
    },
    msrp: function msrp() {
      return this.productPrice * this.filters.msrp_markup;
    },
    msrpDisplay: function msrpDisplay() {
      return Math.round(this.msrp);
    },
    savings: function savings() {
      var savings = this.msrp - this.productPrice;
      return Math.round(savings);
    },
    fulfillmentTime: function fulfillmentTime() {
      if (!this.filters || !this.filters.min_fulfillment_days) {
        return null;
      }

      var _this$fulfillmentDays = this.fulfillmentDays,
          minDays = _this$fulfillmentDays.minDays,
          maxDays = _this$fulfillmentDays.maxDays;
      return "".concat(minDays, "-").concat(maxDays, " days");
    },
    emailFulfillmentTime: function emailFulfillmentTime() {
      var _this2 = this;

      if (!this.filters || !this.filters.email_min_fulfillment_days) {
        return null;
      }

      var min = this.filters.email_min_fulfillment_days;
      var max = this.filters.email_max_fulfillment_days;
      var selectedOptionsMin = [];
      var selectedOptionsMax = [];
      Object.entries(this.selectedOptions).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            parameter = _ref6[0],
            value = _ref6[1];

        var attribute = _this2.attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return true;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected) {
          return true;
        }

        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });
      var finalMin = min + Math.max.apply(Math, selectedOptionsMin);
      var finalMax = max + Math.max.apply(Math, selectedOptionsMax);
      return "".concat(finalMin, "-").concat(finalMax, " business days");
    },
    hasFulfillmentMarkup: function hasFulfillmentMarkup() {
      var _this3 = this;

      return Object.entries(this.selectedOptions).some(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            parameter = _ref8[0],
            value = _ref8[1];

        var attribute = _this3.attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return false;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected) {
          return false;
        }

        return selected.min_fulfillment_days_markup || selected.max_fulfillment_days_markup;
      });
    },
    fullProduct: function fullProduct() {
      var image = null;

      if (this.productImages.length) {
        image = this.productImages[0].large || this.productImages[0].full;
      }

      return {
        name: this.productName,
        handle: this.activeProduct.handle,
        sku: this.productSku,
        model: this.modelNumber,
        price: this.productPrice,
        msrp: this.msrp,
        category: this.productType,
        image: image
      };
    }
  }),
  methods: {
    interpolateString: function interpolateString(template) {
      var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.interpolateWithValues({
        template: template,
        attributes: this.attributes,
        selectedOptions: this.selectedOptions,
        debug: debug
      });
    },
    interpolateWithValues: function interpolateWithValues(_ref9) {
      var template = _ref9.template,
          attributes = _ref9.attributes,
          selectedOptions = _ref9.selectedOptions,
          _ref9$debug = _ref9.debug,
          debug = _ref9$debug === void 0 ? false : _ref9$debug;

      if (debug) {
        console.log({
          selectedOptions: selectedOptions
        });
      }

      if (!Object.keys(selectedOptions).length) {
        return '';
      } // placeholders for interpolation are formatted as {{Attribute Dislay Name.selected_value_property}}


      var matches = template.match(/\{\{[^.]+\.[^}]+\}\}/g);

      if (debug) {
        console.log({
          matches: matches
        });
      }

      if (!matches) {
        return template;
      }

      var content = template;
      matches.forEach(function (placeholder) {
        var replacement;

        var _placeholder$replace$ = placeholder.replace(/[{}]/g, '').split('.'),
            _placeholder$replace$2 = _slicedToArray(_placeholder$replace$, 2),
            attributeName = _placeholder$replace$2[0],
            property = _placeholder$replace$2[1];

        var attribute = attributes.find(function (att) {
          return att.name === attributeName;
        });

        if (debug) {
          console.log({
            attributeName: attributeName,
            property: property,
            attribute: JSON.parse(JSON.stringify(attribute))
          });
        }

        if (attribute) {
          var selected = attribute.values.find(function (item) {
            return item.value === selectedOptions[attribute.parameter];
          }) || {};
          replacement = selected[property] || '';

          if (debug) {
            console.log({
              selectedValue: selectedOptions[attribute.parameter],
              selected: JSON.parse(JSON.stringify(selected)),
              replacement: replacement
            });
          }
        }

        content = content.split(placeholder).join(replacement);
      });
      return content;
    },
    fulfillmentDays: function fulfillmentDays() {
      var _this4 = this;

      var emailDays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var min = emailDays ? this.filters.email_min_fulfillment_days : this.filters.min_fulfillment_days;
      var max = emailDays ? this.filters.email_max_fulfillment_days : this.filters.max_fulfillment_days;
      var selectedOptionsMin = [0];
      var selectedOptionsMax = [0];
      Object.entries(this.selectedOptions).forEach(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            parameter = _ref11[0],
            value = _ref11[1];

        var attribute = _this4.attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return true;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected) {
          return true;
        }

        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });
      var finalMin = min + Math.max.apply(Math, selectedOptionsMin);
      var finalMax = max + Math.max.apply(Math, selectedOptionsMax);
      return {
        minDays: finalMin,
        maxDays: finalMax
      };
    },
    getFulfillmentTime: function getFulfillmentTime(filters, selectedOptions, attributes) {
      if (!filters || !filters.min_fulfillment_days) {
        return null;
      }

      var min = filters.min_fulfillment_days;
      var max = filters.max_fulfillment_days;
      var selectedOptionsMin = [];
      var selectedOptionsMax = [];
      Object.entries(selectedOptions).forEach(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
            parameter = _ref13[0],
            value = _ref13[1];

        var attribute = attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return true;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected) {
          return true;
        }

        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });
      var finalMin = min + Math.max.apply(Math, selectedOptionsMin);
      var finalMax = max + Math.max.apply(Math, selectedOptionsMax);
      return "".concat(finalMin, "-").concat(finalMax, " days");
    },
    getEmailFulfillmentTime: function getEmailFulfillmentTime(filters, selectedOptions, attributes) {
      if (!filters || !filters.email_min_fulfillment_days) {
        return null;
      }

      var min = filters.email_min_fulfillment_days;
      var max = filters.email_max_fulfillment_days;
      var selectedOptionsMin = [];
      var selectedOptionsMax = [];
      Object.entries(selectedOptions).forEach(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
            parameter = _ref15[0],
            value = _ref15[1];

        var attribute = attributes.find(function (item) {
          return item.parameter === parameter;
        });

        if (!attribute) {
          return true;
        }

        var selected = attribute.values.find(function (item) {
          return item.value === value;
        });

        if (!selected) {
          return true;
        }

        selectedOptionsMin.push(selected.min_fulfillment_days_markup || 0);
        selectedOptionsMax.push(selected.max_fulfillment_days_markup || 0);
      });
      var finalMin = min + Math.max.apply(Math, selectedOptionsMin);
      var finalMax = max + Math.max.apply(Math, selectedOptionsMax);
      return "".concat(finalMin, "-").concat(finalMax, " business days");
    },
    buildSelectedOptions: function buildSelectedOptions(attributeMatches, attributes, existingSelections) {
      var selectedOptions = {};
      Object.entries(attributeMatches).forEach(function (_ref16) {
        var _ref17 = _slicedToArray(_ref16, 2),
            parameter = _ref17[0],
            _ref17$ = _ref17[1],
            matches = _ref17$.matches,
            value = _ref17$.value;

        if (value) {
          // having a defined value overrules everything
          selectedOptions[parameter] = value;
          return;
        }

        var foundAttribute = attributes.find(function (attribute) {
          return attribute.parameter === parameter;
        });
        var foundValue = foundAttribute.values.find(function (item) {
          return item.value === existingSelections[matches];
        }) || foundAttribute.values[0];

        if (foundValue) {
          selectedOptions[parameter] = foundValue.value;
        }
      });
      return selectedOptions;
    },
    createCylindoImageUrl: function createCylindoImageUrl(selectedOptions, relatedProductFilterDefs) {
      var _getViewerParameters = (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_2__.getViewerParameters)({
        baseSku: relatedProductFilterDefs.cylindo_sku,
        attributes: relatedProductFilterDefs.attributes,
        selectedOptions: selectedOptions
      }),
          productCode = _getViewerParameters.productCode,
          features = _getViewerParameters.features;

      var frame = 1;

      if (relatedProductFilterDefs && relatedProductFilterDefs.cylindo_overrides && relatedProductFilterDefs.cylindo_overrides.startFrame) {
        frame = relatedProductFilterDefs.cylindo_overrides.startFrame;
      }

      return (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_2__.getStaticImageUrl)({
        productCode: productCode,
        features: features,
        frame: frame
      });
    },
    buildRelatedProducts: function buildRelatedProducts(products, selections) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var relatedProducts;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                relatedProducts = [];
                products.forEach( /*#__PURE__*/function () {
                  var _ref18 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(relatedProductData) {
                    var relatedProduct;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            relatedProduct = {
                              title: '',
                              url: '',
                              image: [],
                              product_type: ''
                            };
                            _context.next = 3;
                            return _util_FilterStorage__WEBPACK_IMPORTED_MODULE_3__["default"].getItem(relatedProductData.product_type).then(function (response) {
                              if (!response.templates) {
                                return;
                              }

                              var attributes = response.attributes;

                              var selectedOptions = _this5.buildSelectedOptions(relatedProductData.attributes, attributes, selections);

                              var _ref19 = response.templates.find(function (item) {
                                return item.key === 'name';
                              }) || {},
                                  _ref19$template = _ref19.template,
                                  template = _ref19$template === void 0 ? '' : _ref19$template;

                              var attributeString = Object.entries(selectedOptions).map(function (_ref20) {
                                var _ref21 = _slicedToArray(_ref20, 2),
                                    param = _ref21[0],
                                    value = _ref21[1];

                                return "".concat(param, ":").concat(value);
                              }).join(',');
                              relatedProduct.title = _this5.interpolateWithValues({
                                template: template,
                                attributes: attributes,
                                selectedOptions: selectedOptions,
                                debug: false
                              });
                              relatedProduct.url = "/products/".concat(relatedProductData.base_product_handle, "?attributes=").concat(attributeString);

                              if (!response.cylindo_sku) {
                                apiClient.getImages({
                                  type: relatedProductData.product_type,
                                  attributes: selectedOptions,
                                  debounce: false
                                }).then(function (images) {
                                  relatedProduct.image = images;
                                  relatedProduct.product_type = relatedProductData.product_type;
                                });
                              } else {
                                relatedProduct.image = _this5.createCylindoImageUrl(selectedOptions, response);
                                relatedProduct.product_type = relatedProductData.product_type;
                              }

                              relatedProducts.push(relatedProduct);
                            });

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref18.apply(this, arguments);
                  };
                }());
                relatedProducts.sort(function (a, b) {
                  return a.priority < b.priority ? -1 : 1;
                });
                return _context2.abrupt("return", relatedProducts);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./src/mixins/screenMonitor.js":
/*!*************************************!*\
  !*** ./src/mixins/screenMonitor.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      screenWidth: null,
      screenHeight: null,
      isMobile: false,
      isTablet: false,
      isLargeMobile: false
    };
  },
  created: function created() {
    var _this = this;

    var saveSize = function saveSize() {
      _this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      _this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      _this.isMobile = _this.screenWidth < 1025;
      _this.isTablet = _this.screenWidth < 1025 && _this.screenWidth > 767;
      _this.isLargeMobile = _this.screenWidth <= 1145;
    };

    window.addEventListener('resize', saveSize);
    saveSize();
  }
});

/***/ }),

/***/ "./src/static/STATE.js":
/*!*****************************!*\
  !*** ./src/static/STATE.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  name: 'Alabama',
  abbreviation: 'AL'
}, {
  name: 'Alaska',
  abbreviation: 'AK'
}, {
  name: 'American Samoa',
  abbreviation: 'AS'
}, {
  name: 'Arizona',
  abbreviation: 'AZ'
}, {
  name: 'Arkansas',
  abbreviation: 'AR'
}, {
  name: 'California',
  abbreviation: 'CA'
}, {
  name: 'Colorado',
  abbreviation: 'CO'
}, {
  name: 'Connecticut',
  abbreviation: 'CT'
}, {
  name: 'Delaware',
  abbreviation: 'DE'
}, {
  name: 'District Of Columbia',
  abbreviation: 'DC'
}, {
  name: 'Federated States Of Micronesia',
  abbreviation: 'FM'
}, {
  name: 'Florida',
  abbreviation: 'FL'
}, {
  name: 'Georgia',
  abbreviation: 'GA'
}, {
  name: 'Guam',
  abbreviation: 'GU'
}, {
  name: 'Hawaii',
  abbreviation: 'HI'
}, {
  name: 'Idaho',
  abbreviation: 'ID'
}, {
  name: 'Illinois',
  abbreviation: 'IL'
}, {
  name: 'Indiana',
  abbreviation: 'IN'
}, {
  name: 'Iowa',
  abbreviation: 'IA'
}, {
  name: 'Kansas',
  abbreviation: 'KS'
}, {
  name: 'Kentucky',
  abbreviation: 'KY'
}, {
  name: 'Louisiana',
  abbreviation: 'LA'
}, {
  name: 'Maine',
  abbreviation: 'ME'
}, {
  name: 'Marshall Islands',
  abbreviation: 'MH'
}, {
  name: 'Maryland',
  abbreviation: 'MD'
}, {
  name: 'Massachusetts',
  abbreviation: 'MA'
}, {
  name: 'Michigan',
  abbreviation: 'MI'
}, {
  name: 'Minnesota',
  abbreviation: 'MN'
}, {
  name: 'Mississippi',
  abbreviation: 'MS'
}, {
  name: 'Missouri',
  abbreviation: 'MO'
}, {
  name: 'Montana',
  abbreviation: 'MT'
}, {
  name: 'Nebraska',
  abbreviation: 'NE'
}, {
  name: 'Nevada',
  abbreviation: 'NV'
}, {
  name: 'New Hampshire',
  abbreviation: 'NH'
}, {
  name: 'New Jersey',
  abbreviation: 'NJ'
}, {
  name: 'New Mexico',
  abbreviation: 'NM'
}, {
  name: 'New York',
  abbreviation: 'NY'
}, {
  name: 'North Carolina',
  abbreviation: 'NC'
}, {
  name: 'North Dakota',
  abbreviation: 'ND'
}, {
  name: 'Northern Mariana Islands',
  abbreviation: 'MP'
}, {
  name: 'Ohio',
  abbreviation: 'OH'
}, {
  name: 'Oklahoma',
  abbreviation: 'OK'
}, {
  name: 'Oregon',
  abbreviation: 'OR'
}, {
  name: 'Palau',
  abbreviation: 'PW'
}, {
  name: 'Pennsylvania',
  abbreviation: 'PA'
}, {
  name: 'Puerto Rico',
  abbreviation: 'PR'
}, {
  name: 'Rhode Island',
  abbreviation: 'RI'
}, {
  name: 'South Carolina',
  abbreviation: 'SC'
}, {
  name: 'South Dakota',
  abbreviation: 'SD'
}, {
  name: 'Tennessee',
  abbreviation: 'TN'
}, {
  name: 'Texas',
  abbreviation: 'TX'
}, {
  name: 'Utah',
  abbreviation: 'UT'
}, {
  name: 'Vermont',
  abbreviation: 'VT'
}, {
  name: 'Virgin Islands',
  abbreviation: 'VI'
}, {
  name: 'Virginia',
  abbreviation: 'VA'
}, {
  name: 'Washington',
  abbreviation: 'WA'
}, {
  name: 'West Virginia',
  abbreviation: 'WV'
}, {
  name: 'Wisconsin',
  abbreviation: 'WI'
}, {
  name: 'Wyoming',
  abbreviation: 'WY'
}]);

/***/ }),

/***/ "./src/static/swatchFilters.js":
/*!*************************************!*\
  !*** ./src/static/swatchFilters.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "filters": () => (/* binding */ filters),
/* harmony export */   "sortOptions": () => (/* binding */ sortOptions)
/* harmony export */ });
var filters = [{
  key: 'upholstery_family',
  label: 'UPHOLSTERY FAMILY',
  isArray: true,
  options: [{
    value: 'Velvet & Chenille',
    display: 'Velvet & Chenille'
  }, {
    value: 'Vegan Leather & Suede',
    display: 'Vegan Leather & Suede'
  }, {
    value: 'Woven',
    display: 'Woven'
  }, {
    value: 'Boucle',
    display: 'Bouclé'
  }, {
    value: 'Patterns & Prints',
    display: 'Patterns & Prints'
  }]
}, {
  key: 'features',
  label: 'MATERIAL FEATURES',
  isArray: false,
  options: [{
    value: 'water_resistant',
    display: 'Liquid Repellent',
    iconRight: 'https://cdn.insideweather.com/icons/water-resistant_ico@2x.png',
    description: 'Resilient fabrics with a nontoxic finish that makes them resistant to water-based liquids.'
  }, {
    value: 'performance',
    display: 'Performance',
    iconRight: '//cdn.insideweather.com/pdp/customizer/ico/performance.png',
    description: 'Stain resistant and highly durable with excellent cleanability.'
  }, {
    value: 'pet_friendly',
    display: 'Pet Friendly',
    iconRight: '//cdn.insideweather.com/pdp/customizer/ico/pet-friendly.png',
    description: 'Durable and tightly woven textures that stand strong against claws and fine hairs.'
  }, {
    value: 'commercial',
    display: 'Commercial Grade',
    iconRight: '//cdn.insideweather.com/pdp/customizer/ico/commercial.png',
    description: 'Designed for high traffic environments, these high-abrasion fabrics meet or exceed 50,000 double rubs.'
  }, {
    value: 'trade',
    display: 'Hard Material Samples',
    description: 'We offer mini samples of our FSC-Certified woods and powder coated metals made available exclusively for our trade members.'
  }]
}, {
  key: 'color_family',
  label: 'COLOR',
  isArray: true,
  options: [{
    value: 'Beiges | Creams | Whites',
    display: 'Beiges, Creams, Whites',
    color: '#D9CFC2'
  }, {
    value: 'Browns | Tans',
    display: 'Browns, Tans',
    color: '#A87A4A'
  }, {
    value: 'Light Grays',
    display: 'Light Grays',
    color: '#A5A5A5'
  }, {
    value: 'Dark Grays | Blacks',
    display: 'Dark Grays, Blacks',
    color: '#525252'
  }, {
    value: 'Blues',
    display: 'Blues',
    color: '#6A7E9D'
  }, {
    value: 'Greens',
    display: 'Greens',
    color: '#627957'
  }, {
    value: 'Yellows',
    display: 'Yellows',
    color: '#DFB52B'
  }, {
    value: 'Pinks',
    display: 'Pinks',
    color: '#EF9B9B'
  }, {
    value: 'Purples',
    display: 'Purples',
    color: '#684668'
  }, {
    value: 'Reds',
    display: 'Reds',
    color: '#BE2E2E'
  }, {
    value: 'Oranges',
    display: 'Oranges',
    color: '#D6864B'
  }]
}, {
  key: 'design_style',
  label: 'DESIGN STYLE',
  isArray: true,
  options: [{
    value: 'Solid Colors Only',
    display: 'Solid Colors Only',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/solids.png'
  }, {
    value: 'Graphic Only',
    display: 'Graphic Only',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/graphics.png'
  }, {
    value: 'Terrazzo & Marble',
    display: 'Terrazzo & Marble',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/terrazzo-marble.png'
  }, {
    value: 'Nordic & Mid-Century',
    display: 'Nordic & Mid-Century',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/nordic-mid-century.png'
  }, {
    value: 'Art Deco & Glam',
    display: 'Art Deco & Glam',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/art-deco-glam.png'
  }, {
    value: 'Botanical',
    display: 'Botanical',
    iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/sweet-palm.png'
  }, {
    value: 'Watercolor & Ink',
    display: 'Watercolor & Ink',
    iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/pacific-waters.png'
  }, {
    value: 'Southwest',
    display: 'Southwest',
    iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/southwest-sunset.png'
  }, {
    value: 'Abstract',
    display: 'Abstract',
    iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/evening-abstraction.png'
  }, {
    value: 'Frank Lloyd Wright Usonia™',
    display: 'Frank Lloyd Wright Usonia™',
    iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/usonia.png'
  }]
}];
var sortOptions = [{
  value: 'upholstery',
  display: 'Upholstery Type'
}, {
  value: 'color',
  display: 'Color'
}, {
  value: 'best_selling',
  display: 'Best Selling'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  filters: filters,
  sortOptions: sortOptions
});

/***/ }),

/***/ "./src/store/actions.js":
/*!******************************!*\
  !*** ./src/store/actions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProductFromSelected": () => (/* binding */ createProductFromSelected),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getCylindoImage": () => (/* binding */ getCylindoImage),
/* harmony export */   "getProductReviews": () => (/* binding */ getProductReviews),
/* harmony export */   "getReviews": () => (/* binding */ getReviews),
/* harmony export */   "loadProductImages": () => (/* binding */ loadProductImages),
/* harmony export */   "populateSelected": () => (/* binding */ populateSelected),
/* harmony export */   "pullFilter": () => (/* binding */ pullFilter),
/* harmony export */   "pullSwatches": () => (/* binding */ pullSwatches),
/* harmony export */   "updateUrl": () => (/* binding */ updateUrl)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _util_ApiClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ApiClient */ "./src/util/ApiClient.js");
/* harmony import */ var _util_cylindo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/cylindo */ "./src/util/cylindo.js");
/* harmony import */ var _util_FilterStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/FilterStorage */ "./src/util/FilterStorage.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var apiClient = new _util_ApiClient__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
 * Set up filter definition for category
 */

function pullFilter(_ref) {
  var dispatch = _ref.dispatch,
      commit = _ref.commit,
      state = _ref.state;

  if (!state.category) {
    setTimeout(function () {
      dispatch('pullFilter');
    }, 200);
    return;
  }

  _util_FilterStorage__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(state.category).then(function (filter) {
    commit('defineFilter', {
      filter: filter
    });
  });
}
/**
 * Retrieves product images for selected options
 */

function loadProductImages(_ref2) {
  var dispatch = _ref2.dispatch,
      commit = _ref2.commit,
      state = _ref2.state;

  if (!state.filters.attributes || !window.cylindo) {
    // keep retrying if still waiting on filter retrieval
    setTimeout(function () {
      dispatch('loadProductImages');
    }, 200);
    return;
  }

  if (!state.filters.attributes.every(function (attribute) {
    return state.selectedOptions[attribute.parameter];
  })) {
    console.error('Option selections missing, aborting image population');
    return;
  } // fall back to IW API for images if cylindo parameters not set in the filter definitions


  if (!state.filters.cylindo_sku) {
    apiClient.getImages({
      type: state.category,
      attributes: state.selectedOptions
    }).then(function (images) {
      commit('setProductImages', images);
    });
    return;
  } // static cylindo images for non-360 products


  if (state.filters.configurator_type === 'static_image' && state.filters.static_images) {
    var images = state.filters.static_images.sort(function (a, b) {
      return a.priority < b.priority ? -1 : 1;
    }).map(function (image) {
      var _getViewerParameters = (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_1__.getViewerParameters)({
        baseSku: image.cylindo_sku || state.filters.cylindo_sku,
        attributes: state.filters.attributes,
        selectedOptions: state.selectedOptions
      }),
          productCode = _getViewerParameters.productCode,
          features = _getViewerParameters.features;

      var src = (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_1__.getStaticImageUrl)({
        productCode: productCode,
        features: (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_1__.applyFeatureOverrides)({
          features: features,
          overwrites: image.cylindo_overwrite_features || [],
          removals: image.cylindo_remove_features || []
        }),
        frame: image.cylindo_frame
      });
      return {
        medium: src,
        large: src,
        full: src
      };
    });
    commit('setProductImages', images);
    return;
  }

  var _getViewerParameters2 = (0,_util_cylindo__WEBPACK_IMPORTED_MODULE_1__.getViewerParameters)({
    baseSku: state.filters.cylindo_sku,
    attributes: state.filters.attributes,
    selectedOptions: state.selectedOptions
  }),
      productCode = _getViewerParameters2.productCode,
      features = _getViewerParameters2.features;

  if (state.cylindoViewers.length > 0) {
    state.cylindoViewers.forEach(function (_ref3) {
      var instance = _ref3.instance;
      instance.setProduct(productCode);
      instance.setFeatures(features);
    });
    return;
  }

  window.cylindo.on('ready', function () {
    var containerIds = ['cylindo-main', 'cylindo-secondary'].filter(function (id) {
      return document.getElementById(id) !== null;
    });
    var globalDefaults = {
      debug: false,
      accountID: 4931,
      SKU: productCode,
      productCode: productCode,
      features: features,
      country: 'us',
      viewerType: 2,
      thumbs: false,
      zoomButton: false,
      fullscreen: false
    };
    var cylindoViewers = containerIds.map(function (containerID) {
      return {
        containerID: containerID,
        instance: window.cylindo.viewer.create(_objectSpread(_objectSpread(_objectSpread({}, globalDefaults), state.filters.cylindo_overrides || {}), {}, {
          customZoomContainer: "".concat(containerID, "-zoom"),
          containerID: containerID
        }))
      };
    });
    vue__WEBPACK_IMPORTED_MODULE_3__["default"].set(state, 'cylindoViewers', cylindoViewers);
    cylindoViewers[0].instance.on('instance:viewer:ready', function () {
      dispatch('getCylindoImage');
    });
  });
}
function getCylindoImage(_ref4) {
  var state = _ref4.state,
      commit = _ref4.commit;
  return new Promise(function (resolve, reject) {
    if (state.cylindoViewers.length < 1) {
      // if cylindo failed to initialize, no point in throwing more errors
      resolve();
      return;
    }

    var cylindo = state.cylindoViewers[0].instance;
    var frame = 1;

    if (state.filters && state.filters.cylindo_overrides && state.filters.cylindo_overrides.startFrame) {
      frame = state.filters.cylindo_overrides.startFrame;
    }

    cylindo.getFrameUrl(frame, 2000, function (url, errorMessage) {
      if (errorMessage) {
        reject(errorMessage);
        return;
      }

      commit('setProductImages', [{
        full: url
      }]);
      resolve();
    });
  });
}
function populateSelected(_ref5, _ref6) {
  var state = _ref5.state,
      dispatch = _ref5.dispatch,
      commit = _ref5.commit;
  var selectedOptions = _ref6.selectedOptions,
      _ref6$exists = _ref6.exists,
      exists = _ref6$exists === void 0 ? false : _ref6$exists;
  return new Promise(function (resolve) {
    if (!state.filters.attributes) {
      // wait for filters to be available if not loaded yet
      setTimeout(function () {
        dispatch('populateSelected', {
          selectedOptions: selectedOptions,
          exists: exists
        });
      }, 100);
      return resolve();
    }

    var cleanOptions = {};
    Object.entries(selectedOptions || {}).forEach(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          parameter = _ref8[0],
          value = _ref8[1];

      var attribute = state.filters.attributes.find(function (item) {
        return item.parameter === parameter;
      });

      if (!attribute) {
        console.warn("Attribute \"".concat(parameter, "\" not found"));
        return;
      }

      var selected = attribute.values.find(function (item) {
        return item.value === value;
      });

      if (!selected) {
        console.error("Attribute value \"".concat(value, "\" not found"));
        selected = attribute.values[0] || {};
      }

      cleanOptions[parameter] = selected.value;
    });
    state.filters.attributes.forEach(function (_ref9) {
      var parameter = _ref9.parameter,
          values = _ref9.values;

      if (!cleanOptions[parameter]) {
        console.error("Missing value for \"".concat(parameter, "\" attribute"));
        cleanOptions[parameter] = values[0].value;
      }
    });
    commit('setSelectedOptions', cleanOptions);
    dispatch('updateUrl', {
      replace: true,
      handle: exists ? state.activeProduct.handle : null
    });
    return resolve();
  });
}
function getReviews(_ref10, _ref11) {
  var commit = _ref10.commit;
  var _ref11$category = _ref11.category,
      category = _ref11$category === void 0 ? 'sofas' : _ref11$category,
      _ref11$from = _ref11.from,
      from = _ref11$from === void 0 ? 0 : _ref11$from,
      _ref11$size = _ref11.size,
      size = _ref11$size === void 0 ? 20 : _ref11$size;
  apiClient.getReviews(category, from, size).then(function (results) {
    commit('setReviews', {
      reviews: results.reviews
    });
    commit('setTotalReviews', {
      totalReviews: results.total
    });
    commit('updateCategory', category);
  });
}
function getProductReviews(_ref12, _ref13) {
  var commit = _ref12.commit;
  var _ref13$primaryCategor = _ref13.primaryCategory,
      primaryCategory = _ref13$primaryCategor === void 0 ? 'coffee-tables' : _ref13$primaryCategor,
      _ref13$productFamily = _ref13.productFamily,
      productFamily = _ref13$productFamily === void 0 ? 'kloss' : _ref13$productFamily;
  apiClient.getProductReviews(primaryCategory, productFamily).then(function (results) {
    commit('setProductReviews', {
      reviews: results.reviews
    });
  });
}
function createProductFromSelected(_ref14, _ref15) {
  var state = _ref14.state,
      dispatch = _ref14.dispatch,
      commit = _ref14.commit;
  var name = _ref15.name,
      model = _ref15.model,
      image = _ref15.image;
  commit('setProductCreationInProgress', true);
  return apiClient.createProduct({
    name: name,
    model: model,
    type: state.category,
    image: image,
    attributes: state.selectedOptions
  }).then(function (_ref16) {
    var handle = _ref16.handle,
        _ref16$variant = _ref16.variant,
        id = _ref16$variant.id,
        inventory = _ref16$variant.inventory_data;
    commit('setActiveProduct', {
      id: id,
      handle: handle,
      inventory: inventory
    });
    commit('setProductCreationInProgress', false);
    dispatch('updateUrl', {
      handle: handle,
      replace: true
    });
  })["catch"](function (err) {
    console.error(err);
    commit('setProductCreationInProgress', false);
  });
}
function updateUrl(_ref17) {
  var state = _ref17.state,
      dispatch = _ref17.dispatch;

  var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref18$replace = _ref18.replace,
      replace = _ref18$replace === void 0 ? false : _ref18$replace,
      _ref18$handle = _ref18.handle,
      handle = _ref18$handle === void 0 ? null : _ref18$handle;

  if (!state.filters.attributes) {
    setTimeout(function () {
      dispatch('updateUrl', {
        replace: replace,
        handle: handle
      });
    }, 200);
    return;
  }

  if (window.history.pushState) {
    var _window$location = window.location,
        protocol = _window$location.protocol,
        host = _window$location.host,
        pathname = _window$location.pathname;
    var urlParams = new URLSearchParams(); // maintain any existing query string parameters not related to customizer choices

    var _iterator = _createForOfIteratorHelper(new URLSearchParams(window.location.search).entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        if (key !== 'attributes') {
          urlParams.set(key, value);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!handle) {
      var attributeString = Object.entries(state.selectedOptions).map(function (_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
            param = _ref20[0],
            value = _ref20[1];

        return "".concat(param, ":").concat(value);
      }).join(',');
      urlParams.set('attributes', attributeString);
    }

    var uri = handle ? "/products/".concat(handle) : pathname;
    var queryString = urlParams.toString();

    if (queryString.length) {
      queryString = "?".concat(queryString);
    }

    var newUrl = "".concat(protocol, "//").concat(host).concat(uri).concat(queryString);
    var navState = {
      path: newUrl,
      product: state.activeProduct,
      attributes: state.selectedOptions
    };
    var _document = document,
        title = _document.title;

    if (replace && window.history.replaceState) {
      window.history.replaceState(navState, title, newUrl);
      return;
    }

    window.history.pushState(navState, title, newUrl);
  }
}
function pullSwatches(_ref21, isTrade) {
  var commit = _ref21.commit;
  apiClient.getSwatches(isTrade).then(function (swatches) {
    commit('setSwatches', swatches);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  loadProductImages: loadProductImages,
  getCylindoImage: getCylindoImage,
  pullFilter: pullFilter,
  populateSelected: populateSelected,
  getReviews: getReviews,
  getProductReviews: getProductReviews,
  createProductFromSelected: createProductFromSelected,
  updateUrl: updateUrl,
  pullSwatches: pullSwatches
});

/***/ }),

/***/ "./src/store/favorites.js":
/*!********************************!*\
  !*** ./src/store/favorites.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customerFavorites": () => (/* binding */ customerFavorites),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "favorites": () => (/* binding */ favorites),
/* harmony export */   "localFavorites": () => (/* binding */ localFavorites)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var customer = [];

if (window.pnwCfg && window.pnwCfg.favoriteProducts) {
  customer = window.pnwCfg.favoriteProducts;
}

var local = [];

if (localStorage.getItem('favoriteProducts')) {
  try {
    local = JSON.parse(localStorage.getItem('favoriteProducts'));
  } catch (err) {
    console.warn('Invalid favorites data detected');
  }
}

var customerFavorites = customer;
var localFavorites = local;
var favorites = customerFavorites.length ? _toConsumableArray(customerFavorites) : _toConsumableArray(localFavorites);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  localFavorites: localFavorites,
  customerFavorites: customerFavorites,
  favorites: favorites
});

/***/ }),

/***/ "./src/store/history.js":
/*!******************************!*\
  !*** ./src/store/history.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customerHistory": () => (/* binding */ customerHistory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "history": () => (/* binding */ history),
/* harmony export */   "localHistory": () => (/* binding */ localHistory)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var customer = [];

if (window.pnwCfg && window.pnwCfg.historyProducts) {
  customer = window.pnwCfg.historyProducts;
}

var local = [];

if (localStorage.getItem('historyProducts')) {
  try {
    local = JSON.parse(localStorage.getItem('historyProducts'));
  } catch (err) {
    console.warn('Invalid favorites data detected');
  }
}

var customerHistory = customer;
var localHistory = local;
var history = customerHistory.length ? _toConsumableArray(customerHistory) : _toConsumableArray(localHistory);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  customerHistory: customerHistory,
  localHistory: localHistory,
  history: history
});

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mutations */ "./src/store/mutations.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/store/actions.js");
/* harmony import */ var _favorites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./favorites */ "./src/store/favorites.js");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history */ "./src/store/history.js");
/* harmony import */ var _userData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./userData */ "./src/store/userData.js");







vue__WEBPACK_IMPORTED_MODULE_5__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new vuex__WEBPACK_IMPORTED_MODULE_6__["default"].Store({
  state: {
    activeProduct: {
      id: null,
      handle: '',
      inventory: {}
    },
    productCreationInProgress: false,
    category: '',
    favorites: _favorites__WEBPACK_IMPORTED_MODULE_2__.favorites,
    history: _history__WEBPACK_IMPORTED_MODULE_3__.history,
    filters: {},
    openPanel: '',
    selectedOptions: {},
    reviews: [],
    totalReviews: 0,
    productReviews: [],
    productImages: [],
    swatches: [],
    cylindoViewers: [],
    revertConfiguration: {},
    pt: _userData__WEBPACK_IMPORTED_MODULE_4__["default"].pt
  },
  mutations: _mutations__WEBPACK_IMPORTED_MODULE_0__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_1__["default"]
}));

/***/ }),

/***/ "./src/store/mutations.js":
/*!********************************!*\
  !*** ./src/store/mutations.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addHistoryItem": () => (/* binding */ addHistoryItem),
/* harmony export */   "applyQueryString": () => (/* binding */ applyQueryString),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "defineFilter": () => (/* binding */ defineFilter),
/* harmony export */   "saveProducts": () => (/* binding */ saveProducts),
/* harmony export */   "selectPanel": () => (/* binding */ selectPanel),
/* harmony export */   "setActiveProduct": () => (/* binding */ setActiveProduct),
/* harmony export */   "setOption": () => (/* binding */ setOption),
/* harmony export */   "setProductCreationInProgress": () => (/* binding */ setProductCreationInProgress),
/* harmony export */   "setProductImages": () => (/* binding */ setProductImages),
/* harmony export */   "setProductReviews": () => (/* binding */ setProductReviews),
/* harmony export */   "setRevertConfiguration": () => (/* binding */ setRevertConfiguration),
/* harmony export */   "setReviews": () => (/* binding */ setReviews),
/* harmony export */   "setSelectedOptions": () => (/* binding */ setSelectedOptions),
/* harmony export */   "setSwatches": () => (/* binding */ setSwatches),
/* harmony export */   "setTotalReviews": () => (/* binding */ setTotalReviews),
/* harmony export */   "toggleFavorite": () => (/* binding */ toggleFavorite),
/* harmony export */   "updateCategory": () => (/* binding */ updateCategory),
/* harmony export */   "updateThemeSettings": () => (/* binding */ updateThemeSettings)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _util_ApiClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ApiClient */ "./src/util/ApiClient.js");
/* harmony import */ var _favorites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./favorites */ "./src/store/favorites.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var apiClient = new _util_ApiClient__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
 * Save products, appending to existing products if some have already been populated
 */

function saveProducts(state, _ref) {
  var products = _ref.products,
      append = _ref.append;

  if (append) {
    products.forEach(function (product) {
      state.products.push(product);
    });
  } else {
    vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'products', products);
  }
}
/**
 * Save filter definition, populating pre-selected filters if necessary
 */

function defineFilter(state, _ref2) {
  var filter = _ref2.filter;
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'filters', filter);
}
/**
 * Parse the category page state query string and use it to pre-define the selected options,
 * so that the URL is shareable to see the same results
 */

function applyQueryString(state) {
  var queryString = decodeURIComponent(window.location.search.substring(1));

  if (!queryString.length) {
    return;
  }

  var options = queryString.split('&').filter(function (item) {
    return item.indexOf('o:') === 0;
  }).map(function (item) {
    var _item$split = item.split('='),
        _item$split2 = _slicedToArray(_item$split, 2),
        prefixedParameter = _item$split2[0],
        values = _item$split2[1];

    if (values === '') {
      return null;
    }

    var parameter = prefixedParameter.substring(2);
    return {
      // option parameter always matches group, only filters differ
      group: parameter,
      parameter: parameter,
      values: values.split(',')
    };
  }).filter(function (option) {
    return option !== null;
  });

  if (options.length > 0) {
    vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'selectedOptions', options);
  }
}
/**
 * Activate/deactivate a clicked option
 */

function setOption(state, _ref3) {
  var parameter = _ref3.parameter,
      value = _ref3.value;
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state.selectedOptions, parameter, value);
  this.dispatch('loadProductImages');
  this.dispatch('updateUrl');
}
/**
 *  Set object containing the multiple sizes of product image set
 */

function setProductImages(state, images) {
  var newImages = images;

  if (typeof newImages.thumb !== 'undefined') {
    newImages = images.thumb.map(function (thumbnail, index) {
      return {
        thumbnail: thumbnail,
        medium: images.medium[index],
        large: images.large[index],
        full: images.full[index]
      };
    });
  }

  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'productImages', newImages);
}
/**
 * Set current category
 */

function updateCategory(state, newCategory) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'category', newCategory);
}
/**
 * Set currently open filter group and add class to body if a filter is open,
 * so that this can be used to prevent scrolling on category desktop page
 */

function selectPanel(state, newPanel) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'openPanel', newPanel);
  document.body.classList.toggle('BrowseFilters--Open', newPanel !== '');
}
/**
 * Override all selected options with a new set
 */

function setSelectedOptions(state, selected) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'selectedOptions', selected);
  this.dispatch('loadProductImages');
}
function setRevertConfiguration(state, selected) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'revertConfiguration', _objectSpread({}, selected));
  this.dispatch('loadProductImages');
}
/**
 * Add or remove a product from the user's favorites
 */

function toggleFavorite(state, _ref4) {
  var customerId = _ref4.customerId,
      sku = _ref4.sku,
      product = _ref4.product;

  if (!product.id || !product.handle) {
    return;
  }

  var index = state.favorites.findIndex(function (fav) {
    return fav && fav.handle === product.handle;
  });

  if (index !== -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(product);
  }

  if (sku) {
    window.dataLayer.push({
      event: 'AddToWishlist',
      eventCategory: 'Favorite',
      eventAction: index === -1 ? 'add' : 'remove',
      eventLabel: product.name,
      productIds: [sku],
      productName: product.name,
      totalValue: product.price,
      productHandle: product.handle
    });
  }

  if (!customerId) {
    localStorage.setItem('favoriteProducts', JSON.stringify(state.favorites));
    return;
  } // sync all local favorites to server if first time -- EDIT 2/25/2021, NOT NEEDED ANYMORE SINCE FAVORITES ARE LOGIN GATED


  if (!_favorites__WEBPACK_IMPORTED_MODULE_1__.customerFavorites.length && _favorites__WEBPACK_IMPORTED_MODULE_1__.localFavorites.length) {
    apiClient.addFavorites(customerId, Array.from(state.favorites)).then(function () {
      localStorage.removeItem('favoriteProducts');
    });
    return;
  }

  if (index !== -1) {
    apiClient.removeFavorites(customerId, product);
    return;
  }

  apiClient.addFavorites(customerId, product);
}
function addHistoryItem(state, _ref5) {
  var customerId = _ref5.customerId,
      sku = _ref5.sku,
      product = _ref5.product;

  if (!product.id || !product.handle) {
    return;
  }

  var index = state.history.findIndex(function (historyItem) {
    return historyItem && historyItem.handle === product.handle;
  });

  if (index == -1) {
    //Don't add an item to history if it is already added.
    window.dataLayer.push({
      event: 'AddToHistory',
      eventCategory: 'History',
      eventAction: 'add',
      eventLabel: product.name,
      productIds: [sku],
      productName: product.name,
      totalValue: product.price,
      productHandle: product.handle
    });
    apiClient.addHistory(customerId, product);
  }

  if (!customerId) {
    localStorage.setItem('historyProducts', JSON.stringify(state.history));
    return;
  }
}
function setReviews(state, _ref6) {
  var reviews = _ref6.reviews;
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'reviews', reviews);
}
function setTotalReviews(state, _ref7) {
  var totalReviews = _ref7.totalReviews;
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'totalReviews', totalReviews);
}
function setProductReviews(state, _ref8) {
  var reviews = _ref8.reviews;
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'productReviews', reviews);
}
function setProductCreationInProgress(state, inProgress) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'productCreationInProgress', inProgress);
}
function setActiveProduct(state, product) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'activeProduct', product);
}
function setSwatches(state, swatches) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'swatches', swatches);
}
/**
 * updates the state's theme.settings object to get changes from vwo
 */

function updateThemeSettings(state, themeSettings) {
  vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(state, 'themeSettings', themeSettings);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  saveProducts: saveProducts,
  defineFilter: defineFilter,
  setOption: setOption,
  setProductImages: setProductImages,
  updateCategory: updateCategory,
  selectPanel: selectPanel,
  setSelectedOptions: setSelectedOptions,
  setRevertConfiguration: setRevertConfiguration,
  applyQueryString: applyQueryString,
  toggleFavorite: toggleFavorite,
  addHistoryItem: addHistoryItem,
  setReviews: setReviews,
  setTotalReviews: setTotalReviews,
  setProductReviews: setProductReviews,
  setProductCreationInProgress: setProductCreationInProgress,
  setActiveProduct: setActiveProduct,
  setSwatches: setSwatches,
  updateThemeSettings: updateThemeSettings
});

/***/ }),

/***/ "./src/store/userData.js":
/*!*******************************!*\
  !*** ./src/store/userData.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var userData = {};
var ptDataLayer = window.dataLayer.find(function (data) {
  return data.pt !== undefined;
});
userData.pt = undefined;

if (ptDataLayer) {
  userData.pt = ptDataLayer.pt;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userData);

/***/ }),

/***/ "./src/swatches.js":
/*!*************************!*\
  !*** ./src/swatches.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/polyfills */ "./src/util/polyfills.js");
/* harmony import */ var _util_polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store/index.js");
/* harmony import */ var _components_SwatchBrowser_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SwatchBrowser.vue */ "./src/components/SwatchBrowser.vue");





(function init() {
  var rootEl = document.querySelector('#app');

  if (!rootEl) {
    return;
  }

  vue__WEBPACK_IMPORTED_MODULE_3__["default"].config.productionTip = false;
  var bus = new vue__WEBPACK_IMPORTED_MODULE_3__["default"]();
  Object.defineProperty(vue__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, '$bus', {
    get: function get() {
      return bus;
    }
  });
  var app = new vue__WEBPACK_IMPORTED_MODULE_3__["default"]({
    el: rootEl,
    components: {
      SwatchBrowser: _components_SwatchBrowser_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
    },
    store: _store__WEBPACK_IMPORTED_MODULE_1__["default"]
  });
})();

/***/ }),

/***/ "./src/util/ApiClient.js":
/*!*******************************!*\
  !*** ./src/util/ApiClient.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiClient)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/util/helpers.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ApiClient = /*#__PURE__*/function () {
  function ApiClient(options) {
    _classCallCheck(this, ApiClient);

    this.options = Object.assign({}, {
      // starting record (default: 0)
      from: 0,
      // page size (default: 50)
      size: 54,
      primary_category: null
    }, options);
    this.filters = []; // eslint-disable-next-line

    this.sendRequest = function (_ref) {
      var _ref$method = _ref.method,
          method = _ref$method === void 0 ? 'GET' : _ref$method,
          url = _ref.url,
          body = _ref.body,
          resolve = _ref.resolve,
          reject = _ref.reject;
      var fetchOptions = {
        method: method,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      return fetch(url, fetchOptions).then(function (response) {
        if ([200, 201].includes(response.status)) {
          return response.json();
        }

        return response.json().then(function (errorResponse) {
          reject(errorResponse);
        });
      }).then(function (response) {
        return resolve(response);
      })["catch"](function (err) {
        return reject(err);
      });
    };

    this.debouncedImagesRequest = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.debounce)(this.sendRequest, 500);
    this.debouncedProductRequest = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.debounce)(this.sendRequest, 1000);
  }
  /**
   * Overwrite filter parameters with new ones
   */


  _createClass(ApiClient, [{
    key: "applyFilters",
    value: function applyFilters(_ref2) {
      var category = _ref2.category,
          filters = _ref2.filters;
      this.options.primary_category = category || this.options.primary_category;
      this.filters = filters || [];
      return this;
    }
    /**
     * Remove all applied filter parameters
     */

  }, {
    key: "clearFilters",
    value: function clearFilters() {
      this.filters = [];
      return this;
    }
    /**
     * Construct proper request to favorites endpoint, wrapping the request
     * in a Promise which is returned to the caller for handling
     */

  }, {
    key: "sendFavoriteRequest",
    value: function sendFavoriteRequest(_ref3) {
      var _this = this;

      var method = _ref3.method,
          customerId = _ref3.customerId,
          favorites = _ref3.favorites;
      var url = 'https://iw-favorites.herokuapp.com/api/v2/favorites';
      var body = {
        user_id: customerId,
        favorites: favorites
      };
      return new Promise(function (resolve, reject) {
        return _this.sendRequest({
          method: method,
          url: url,
          body: body,
          resolve: resolve,
          reject: reject
        });
      });
    }
    /**
     * Add SKU(s) to customer's saved favorites
     * @param {Number} customerId
     * @param {Object} productData
     */

  }, {
    key: "addFavorites",
    value: function addFavorites(customerId, productData) {
      var favorites = Array.isArray(productData) ? productData : [productData];
      return this.sendFavoriteRequest({
        method: 'POST',
        customerId: customerId,
        favorites: favorites
      });
    }
    /**
     * Remove SKU(s) from customer's saved favorites
     * @param {Number} customerId
     * @param {Object} productData
     */

  }, {
    key: "removeFavorites",
    value: function removeFavorites(customerId, productData) {
      var favorites = Array.isArray(productData) ? productData : [productData];
      return this.sendFavoriteRequest({
        method: 'DELETE',
        customerId: customerId,
        favorites: favorites
      });
    }
    /**
     * Construct proper request to history endpoint, wrapping the request
     * in a Promise which is returned to the caller for handling
     */

  }, {
    key: "sendHistoryRequest",
    value: function sendHistoryRequest(_ref4) {
      var _this2 = this;

      var method = _ref4.method,
          customerId = _ref4.customerId,
          history = _ref4.history;
      var url = 'https://iw-favorites.herokuapp.com/api/v2/history';
      var body = {
        user_id: customerId,
        history: history
      };
      return new Promise(function (resolve, reject) {
        return _this2.sendRequest({
          method: method,
          url: url,
          body: body,
          resolve: resolve,
          reject: reject
        });
      });
    }
    /**
     * Add SKU(s) to customer's saved history
     * @param {Number} customerId
     * @param {Object} productData
     */

  }, {
    key: "addHistory",
    value: function addHistory(customerId, productData) {
      var history = Array.isArray(productData) ? productData : [productData];
      return this.sendHistoryRequest({
        method: 'POST',
        customerId: customerId,
        history: history
      });
    }
    /**
     * Remove SKU(s) from customer's saved history
     * @param {Number} customerId
     * @param {Object} productData
     */

  }, {
    key: "removeHistory",
    value: function removeHistory(customerId, productData) {
      var history = Array.isArray(productData) ? productData : [productData];
      return this.sendHistoryRequest({
        method: 'DELETE',
        customerId: customerId,
        history: history
      });
    }
  }, {
    key: "getReviews",
    value: function getReviews(category, from, size) {
      this.options.primary_category = category;
      this.options.from = from;
      this.options.size = size; // eslint-disable-next-line max-len

      var url = "https://iw-reviews.herokuapp.com/api/v1/reviews/search?primary_category=".concat(category);

      if (this.options.size) {
        url += "&page=".concat(this.options.from, "&size=").concat(this.options.size);
      }

      return new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          return response.json();
        }).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "getProductReviews",
    value: function getProductReviews(primaryCategory, productFamily) {
      // eslint-disable-next-line max-len
      var url = "https://iw-reviews.herokuapp.com/api/v1/reviews/for_product?primary_category=".concat(primaryCategory, "&product_family=").concat(productFamily);

      if (this.options.size) {
        url += "&page=".concat(this.options.from, "&size=").concat(this.options.size);
      }

      return new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          return response.json();
        }).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "getImages",
    value: function getImages(_ref5) {
      var type = _ref5.type,
          attributes = _ref5.attributes,
          _ref5$debounce = _ref5.debounce,
          debounce = _ref5$debounce === void 0 ? true : _ref5$debounce;
      var attributeString = Object.entries(attributes).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            parameter = _ref7[0],
            value = _ref7[1];

        return "".concat(parameter, ":").concat(value);
      }).join(',');
      var url = "https://iw-images.herokuapp.com/api/v1/images?product_type=".concat(type, "&attributes=").concat(attributeString);
      var request = debounce ? this.debouncedImagesRequest : this.sendRequest;
      return new Promise(function (resolve, reject) {
        return request({
          method: 'GET',
          url: url,
          resolve: resolve,
          reject: reject
        });
      });
    }
  }, {
    key: "createProduct",
    value: function createProduct(_ref8) {
      var _this3 = this;

      var name = _ref8.name,
          model = _ref8.model,
          type = _ref8.type,
          image = _ref8.image,
          attributes = _ref8.attributes;
      var url = "https://iw-content.herokuapp.com/api/v1/product/".concat(type);
      var body = {
        name: name,
        model_number: model,
        product_type: type,
        image_url: image,
        attributes: attributes
      };
      var userData = {};
      userData.pt = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCookie)('pt');
      body.userData = userData;
      return new Promise(function (resolve, reject) {
        return _this3.debouncedProductRequest({
          method: 'POST',
          url: url,
          body: body,
          resolve: resolve,
          reject: reject
        });
      });
    }
  }, {
    key: "getSwatches",
    value: function getSwatches(isTrade) {
      var _this4 = this;

      var url = 'https://iw-content.herokuapp.com/api/v1/swatch';

      if (isTrade) {
        url += '?trade=true';
      }

      return new Promise(function (resolve, reject) {
        return _this4.sendRequest({
          url: url,
          resolve: resolve,
          reject: reject
        });
      });
    }
  }, {
    key: "getSwatchDetail",
    value: function getSwatchDetail(name) {
      var _this5 = this;

      var url = "https://iw-content.herokuapp.com/api/v1/swatch/".concat(name);
      return new Promise(function (resolve, reject) {
        return _this5.sendRequest({
          url: url,
          resolve: resolve,
          reject: reject
        });
      });
    }
  }, {
    key: "submitSwatchOrder",
    value: function submitSwatchOrder(_ref9) {
      var _this6 = this;

      var items = _ref9.items,
          email = _ref9.email,
          address = _ref9.address;
      var url = 'https://iw-content.herokuapp.com/api/v1/swatch_order';
      var body = {
        line_items: items.map(function (variantId) {
          return {
            variant_id: variantId,
            quantity: 1
          };
        }),
        email: email,
        shipping_address: address
      };
      return new Promise(function (resolve, reject) {
        return _this6.sendRequest({
          method: 'POST',
          url: url,
          resolve: resolve,
          reject: reject,
          body: body
        });
      });
    }
  }]);

  return ApiClient;
}();



/***/ }),

/***/ "./src/util/FilterStorage.js":
/*!***********************************!*\
  !*** ./src/util/FilterStorage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterStorage)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/util/helpers.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FilterStorage = /*#__PURE__*/function () {
  function FilterStorage() {
    _classCallCheck(this, FilterStorage);
  }

  _createClass(FilterStorage, null, [{
    key: "getItem",
    value:
    /**
     * Filters will be cached to localStorage, but if not yet cached must be pulled from the API.
     * Because we may need to wait for an async operation, we need to return a Promise even if we
     * are only pulling from the cache.
     * @param {String} category
     */
    function getItem(category) {
      var filters;
      var now = new Date().getTime();
      var expires = localStorage.getItem("filters.".concat(category, ".expires"));
      var keyIncludesExpires = RegExp('^filters\.[^.]+\.expires$');
      Object.entries(localStorage).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (keyIncludesExpires.test(key)) {
          var _now = new Date().getTime();

          var _expires = localStorage.getItem(key);

          if (_expires < _now) {
            localStorage.removeItem(key);
            localStorage.removeItem(key.replace('.expires', ''));
          }
        }
      });

      if (!expires || expires > now) {
        filters = localStorage.getItem("filters.".concat(category));
      }

      if (!filters) {
        return FilterStorage.requestFilter(category);
      }

      try {
        filters = JSON.parse(filters);
      } catch (err) {
        console.warn('Unable to parse filter definition. Falling back to remote source.');
        return FilterStorage.requestFilter(category);
      }

      return new Promise(function (resolve) {
        return resolve(filters);
      });
    }
    /**
     * Cache the filter definition for a single category to localStorage, set to expire in 6 hours
     * @param {String} category
     * @param {Object} filters
     */

  }, {
    key: "setItem",
    value: function setItem(category, filters) {
      var currentTimeInMilliseconds = new Date().getTime();
      var hoursToKeep = 6;
      var millisecondsPerHour = 60 * 60 * 1000;
      var expires = currentTimeInMilliseconds + hoursToKeep * millisecondsPerHour;

      try {
        localStorage.setItem("filters.".concat(category), JSON.stringify(filters));
        localStorage.setItem("filters.".concat(category, ".expires"), JSON.stringify(expires));
      } catch (err) {
        console.warn('Unable to access localStorage to cache filters');
      }
    }
    /**
     * Pull the filter definition for the category from the API
     * @param {String} category
     */

  }, {
    key: "requestFilter",
    value: function requestFilter(category) {
      category = category.replace("Clearance ", "");
      var keyIncludesExpires = RegExp('^filters\.[^.]+\.expires$');
      var categoryTimestamps = [];
      Object.entries(localStorage).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (keyIncludesExpires.test(key)) {
          categoryTimestamps.push({
            key: key,
            value: value
          });
        }
      });
      var OrderedCategoryTimestamps = categoryTimestamps.sort(function (a, b) {
        return parseInt(a.value) - parseInt(b.value);
      });
      var maxAllowedFilters = 10;

      if (OrderedCategoryTimestamps.length > maxAllowedFilters) {
        var oldestFilter = OrderedCategoryTimestamps[0].key;
        localStorage.removeItem(oldestFilter);
        localStorage.removeItem(oldestFilter.replace('.expires', ''));
      }

      var urlParams = new URLSearchParams(window.location.search);
      var version = urlParams.get('version');
      var filterEndpoint = "https://iw-content.herokuapp.com/api/v1/product/".concat(category);
      var queryParams = new URLSearchParams();
      var pt = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCookie)('pt');

      if (pt) {
        queryParams.append('pt', pt);
      }

      if (version) {
        queryParams.append('version', version);
      }

      var hasQuery = Array.from(queryParams).length > 0;
      var endpoint = hasQuery ? "".concat(filterEndpoint, "?").concat(queryParams.toString()) : filterEndpoint;
      return fetch(endpoint).then(function (response) {
        return response.json();
      }).then(function (filters) {
        FilterStorage.setItem(category, filters);
        return filters;
      })["catch"](function (filterFetchError) {
        console.error({
          filterFetchError: filterFetchError
        });
      });
    }
  }]);

  return FilterStorage;
}();



/***/ }),

/***/ "./src/util/cylindo.js":
/*!*****************************!*\
  !*** ./src/util/cylindo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyFeatureOverrides": () => (/* binding */ applyFeatureOverrides),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticImageUrl": () => (/* binding */ getStaticImageUrl),
/* harmony export */   "getViewerParameters": () => (/* binding */ getViewerParameters)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Calculates cylindo sku and feature array, taking into account user option selections
 * and any applicable overrides
 */
function getViewerParameters(_ref) {
  var baseSku = _ref.baseSku,
      attributes = _ref.attributes,
      selectedOptions = _ref.selectedOptions;
  var productCode = baseSku;
  var productCodePriority = Infinity;
  var features = [];
  Object.entries(selectedOptions).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        parameter = _ref3[0],
        value = _ref3[1];

    var _attributes$find = attributes.find(function (att) {
      return att.parameter === parameter;
    }),
        values = _attributes$find.values;

    var selected = values.find(function (item) {
      return item.value === value;
    });

    var _attributes$find2 = attributes.find(function (att) {
      return att.parameter === parameter;
    }),
        overridePriority = _attributes$find2.cylindo_override_priority;

    if (selected.cylindo_sku_override && overridePriority) {
      if (overridePriority < productCodePriority) {
        productCode = selected.cylindo_sku_override;
        productCodePriority = overridePriority;
      }
    }

    features = features.concat(selected.cylindo_features || []);
  });
  return {
    productCode: productCode,
    features: features
  };
}
function getStaticImageUrl(_ref4) {
  var productCode = _ref4.productCode,
      features = _ref4.features,
      _ref4$frame = _ref4.frame,
      frame = _ref4$frame === void 0 ? 1 : _ref4$frame;
  // eslint-disable-next-line max-len
  var baseCylindoImageUrl = "https://content-v2.cylindo.com/api/v2/4931/products/".concat(productCode, "/frames/").concat(frame, "/").concat(productCode, ".jpg");
  var cylindoFeatureKeyValues = features.map(function (feature, index) {
    if (index % 2 !== 0) {
      return false;
    } // eslint-disable-next-line prefer-template


    return features[index] + ':' + features[index + 1];
  }).filter(Boolean);
  var cylindoFeatureQueryString = "?feature=".concat(cylindoFeatureKeyValues.join('&feature='));
  var cylindoFeatureQueryStringURI = encodeURI(cylindoFeatureQueryString);
  var cylindoImageOptions = '&background=FFFFFF&encoding=jpg&smartCrop=false';
  return baseCylindoImageUrl + cylindoFeatureQueryStringURI + cylindoImageOptions;
}
/**
 * Removes or replaces cylindo features according to override rules in filters.static_images
 */

function applyFeatureOverrides(_ref5) {
  var _ref5$features = _ref5.features,
      features = _ref5$features === void 0 ? [] : _ref5$features,
      _ref5$overwrites = _ref5.overwrites,
      overwrites = _ref5$overwrites === void 0 ? [] : _ref5$overwrites,
      _ref5$removals = _ref5.removals,
      removals = _ref5$removals === void 0 ? [] : _ref5$removals;

  var updatedFeatures = _toConsumableArray(features);

  removals.forEach(function (feature) {
    var index = updatedFeatures.findIndex(function (item) {
      return item === feature;
    });

    if (index !== -1) {
      updatedFeatures.splice(index, 2);
    }
  });
  overwrites.forEach(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        feature = _ref7[0],
        value = _ref7[1];

    var index = updatedFeatures.findIndex(function (item) {
      return item === feature;
    });

    if (index !== -1 && index < updatedFeatures.length - 1) {
      // cylindo feature key/value pairs are just neighboring array elements
      updatedFeatures[index + 1] = value;
    }
  });
  return updatedFeatures;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getViewerParameters: getViewerParameters,
  getStaticImageUrl: getStaticImageUrl,
  applyFeatureOverrides: applyFeatureOverrides
});

/***/ }),

/***/ "./src/util/helpers.js":
/*!*****************************!*\
  !*** ./src/util/helpers.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "setCookie": () => (/* binding */ setCookie)
/* harmony export */ });
function debounce(func, wait, immediate) {
  var timeout;
  return function debounced() {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  debounce: debounce,
  setCookie: setCookie,
  getCookie: getCookie
});

/***/ }),

/***/ "./src/util/polyfills.js":
/*!*******************************!*\
  !*** ./src/util/polyfills.js ***!
  \*******************************/
/***/ (() => {

/* eslint-disable */
if (!Object.entries) {
  Object.entries = function entries(obj) {
    var ownProps = Object.keys(obj);
    var i = ownProps.length;
    var resArray = new Array(i); // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./src/components/ArrowButton.vue":
/*!****************************************!*\
  !*** ./src/components/ArrowButton.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArrowButton.vue?vue&type=template&id=3bf3d5ca& */ "./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca&");
/* harmony import */ var _ArrowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArrowButton.vue?vue&type=script&lang=js& */ "./src/components/ArrowButton.vue?vue&type=script&lang=js&");
/* harmony import */ var _ArrowButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrowButton.vue?vue&type=style&index=0&lang=scss& */ "./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ArrowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__.render,
  _ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/ArrowButton.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/CMSBlocks/LifestyleGrid.vue":
/*!****************************************************!*\
  !*** ./src/components/CMSBlocks/LifestyleGrid.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LifestyleGrid.vue?vue&type=template&id=633cb79b& */ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b&");
/* harmony import */ var _LifestyleGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LifestyleGrid.vue?vue&type=script&lang=js& */ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js&");
/* harmony import */ var _LifestyleGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LifestyleGrid.vue?vue&type=style&index=0&lang=scss& */ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LifestyleGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__.render,
  _LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CMSBlocks/LifestyleGrid.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/CartSwatch.vue":
/*!***************************************!*\
  !*** ./src/components/CartSwatch.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartSwatch.vue?vue&type=template&id=75679fac& */ "./src/components/CartSwatch.vue?vue&type=template&id=75679fac&");
/* harmony import */ var _CartSwatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CartSwatch.vue?vue&type=script&lang=js& */ "./src/components/CartSwatch.vue?vue&type=script&lang=js&");
/* harmony import */ var _CartSwatch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CartSwatch.vue?vue&type=style&index=0&lang=scss& */ "./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CartSwatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__.render,
  _CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CartSwatch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/CloseButton.vue":
/*!****************************************!*\
  !*** ./src/components/CloseButton.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=template&id=25b3204a& */ "./src/components/CloseButton.vue?vue&type=template&id=25b3204a&");
/* harmony import */ var _CloseButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=script&lang=js& */ "./src/components/CloseButton.vue?vue&type=script&lang=js&");
/* harmony import */ var _CloseButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=style&index=0&lang=scss& */ "./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CloseButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__.render,
  _CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CloseButton.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/SwatchBrowser.vue":
/*!******************************************!*\
  !*** ./src/components/SwatchBrowser.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SwatchBrowser.vue?vue&type=template&id=a3d19d68& */ "./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68&");
/* harmony import */ var _SwatchBrowser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SwatchBrowser.vue?vue&type=script&lang=js& */ "./src/components/SwatchBrowser.vue?vue&type=script&lang=js&");
/* harmony import */ var _SwatchBrowser_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwatchBrowser.vue?vue&type=style&index=0&lang=scss& */ "./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SwatchBrowser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__.render,
  _SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/SwatchBrowser.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/SwatchInfo.vue":
/*!***************************************!*\
  !*** ./src/components/SwatchInfo.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SwatchInfo.vue?vue&type=template&id=2f4ef43a& */ "./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a&");
/* harmony import */ var _SwatchInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SwatchInfo.vue?vue&type=script&lang=js& */ "./src/components/SwatchInfo.vue?vue&type=script&lang=js&");
/* harmony import */ var _SwatchInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwatchInfo.vue?vue&type=style&index=0&lang=scss& */ "./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SwatchInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__.render,
  _SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/SwatchInfo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/SwatchesOrderForm.vue":
/*!**********************************************!*\
  !*** ./src/components/SwatchesOrderForm.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SwatchesOrderForm.vue?vue&type=template&id=421cf268& */ "./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268&");
/* harmony import */ var _SwatchesOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SwatchesOrderForm.vue?vue&type=script&lang=js& */ "./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _SwatchesOrderForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss& */ "./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SwatchesOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__.render,
  _SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/SwatchesOrderForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/ArrowButton.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/ArrowButton.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ArrowButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LifestyleGrid.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CartSwatch.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/components/CartSwatch.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CartSwatch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CloseButton.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/CloseButton.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CloseButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/SwatchBrowser.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/components/SwatchBrowser.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchBrowser.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/SwatchInfo.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/components/SwatchInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchesOrderForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************!*\
  !*** ./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ArrowButton.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************!*\
  !*** ./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LifestyleGrid.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************!*\
  !*** ./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CartSwatch.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************!*\
  !*** ./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CloseButton.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************!*\
  !*** ./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchBrowser.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************!*\
  !*** ./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************!*\
  !*** ./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_0_rules_0_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_11_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11[0].rules[0].use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-11[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca&":
/*!***********************************************************************!*\
  !*** ./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArrowButton_vue_vue_type_template_id_3bf3d5ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ArrowButton.vue?vue&type=template&id=3bf3d5ca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca&");


/***/ }),

/***/ "./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b&":
/*!***********************************************************************************!*\
  !*** ./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LifestyleGrid_vue_vue_type_template_id_633cb79b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LifestyleGrid.vue?vue&type=template&id=633cb79b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b&");


/***/ }),

/***/ "./src/components/CartSwatch.vue?vue&type=template&id=75679fac&":
/*!**********************************************************************!*\
  !*** ./src/components/CartSwatch.vue?vue&type=template&id=75679fac& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CartSwatch_vue_vue_type_template_id_75679fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CartSwatch.vue?vue&type=template&id=75679fac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=template&id=75679fac&");


/***/ }),

/***/ "./src/components/CloseButton.vue?vue&type=template&id=25b3204a&":
/*!***********************************************************************!*\
  !*** ./src/components/CloseButton.vue?vue&type=template&id=25b3204a& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_template_id_25b3204a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CloseButton.vue?vue&type=template&id=25b3204a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=template&id=25b3204a&");


/***/ }),

/***/ "./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68&":
/*!*************************************************************************!*\
  !*** ./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchBrowser_vue_vue_type_template_id_a3d19d68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchBrowser.vue?vue&type=template&id=a3d19d68& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68&");


/***/ }),

/***/ "./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a&":
/*!**********************************************************************!*\
  !*** ./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchInfo_vue_vue_type_template_id_2f4ef43a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchInfo.vue?vue&type=template&id=2f4ef43a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a&");


/***/ }),

/***/ "./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268&":
/*!*****************************************************************************!*\
  !*** ./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SwatchesOrderForm_vue_vue_type_template_id_421cf268___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SwatchesOrderForm.vue?vue&type=template&id=421cf268& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ArrowButton.vue?vue&type=template&id=3bf3d5ca& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    { staticClass: "ArrowButton", class: _vm.buttonClasses },
    [
      _c(
        "svg",
        {
          staticClass: "ArrowButton__Icon",
          attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "70",
            height: "70",
            viewBox: "0 0 70 70"
          }
        },
        [
          _c("g", { attrs: { transform: "translate(70 70) rotate(180)" } }, [
            _c(
              "g",
              { attrs: { transform: "translate(1542 2749) rotate(180)" } },
              [
                _c("circle", {
                  attrs: {
                    cx: "35",
                    cy: "35",
                    r: "35",
                    transform: "translate(1542 2749) rotate(180)",
                    fill: "#fff",
                    opacity: "0.8"
                  }
                }),
                _vm._v(" "),
                _c(
                  "g",
                  {
                    attrs: {
                      transform: "translate(1709.253 2880.724) rotate(180)"
                    }
                  },
                  [
                    _c("line", {
                      attrs: {
                        x1: "19",
                        transform: "translate(192.5 167.5)",
                        fill: "none",
                        stroke: "#202020",
                        "stroke-width": "1.5"
                      }
                    }),
                    _vm._v(" "),
                    _c("path", {
                      attrs: {
                        d: "M-7193.336,249.724l-10.411,10.411,10.411,10.411",
                        transform: "translate(7396 -93)",
                        fill: "none",
                        stroke: "#202020",
                        "stroke-width": "1.5"
                      }
                    })
                  ]
                )
              ]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CMSBlocks/LifestyleGrid.vue?vue&type=template&id=633cb79b& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "LifeStyleGrid" }, [
    _c(
      "div",
      { staticClass: "LifeStyleGrid__grid" },
      _vm._l(_vm.images, function(lifeStyleImage, index) {
        return _c(
          "div",
          {
            key: index,
            class: _vm.getGridItemClasses(index),
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.toggleModal(index)
              }
            }
          },
          [
            _c("img", {
              attrs: { src: lifeStyleImage.image, alt: lifeStyleImage.altText }
            })
          ]
        )
      }),
      0
    ),
    _vm._v(" "),
    _vm.showModal
      ? _c("div", { staticClass: "LifeStyleGrid__modal" }, [
          _c("div", { staticClass: "LifeStyleGrid__modal-inner" }, [
            _c("div", { staticClass: "LifeStyleGrid__modal-content" }, [
              _c(
                "div",
                {
                  staticClass: "LifeStyleGrid__modal-close",
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.toggleModal()
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 32.121 32.121"
                      }
                    },
                    [
                      _c(
                        "g",
                        {
                          attrs: { transform: "translate(-1800.004 -54.004)" }
                        },
                        [
                          _c("line", {
                            attrs: {
                              y2: "42.426",
                              transform:
                                "translate(1801.065 55.065) rotate(-45)",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }
                          }),
                          _vm._v(" "),
                          _c("line", {
                            attrs: {
                              y2: "42.426",
                              transform:
                                "translate(1831.065 55.065) rotate(45)",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }
                          })
                        ]
                      )
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "LifeStyleGrid__modal-image" }, [
                _c("img", { attrs: { src: _vm.modalImage, alt: _vm.modalAlt } })
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "LifeStyleGrid__modal-products" },
                [
                  _c(
                    "div",
                    { staticClass: "LifeStyleGrid__modal-products-heading" },
                    [_vm._v("Get Inspired")]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.modalProducts, function(product, index) {
                    return _c(
                      "div",
                      {
                        key: index,
                        staticClass: "LifeStyleGrid__modal-product"
                      },
                      [
                        _c("a", { attrs: { href: product.destination } }, [
                          _c("img", {
                            attrs: {
                              src: product.image,
                              alt: product.altText,
                              width: "65",
                              height: "65"
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", [
                          _c("a", { attrs: { href: product.destination } }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "LifeStyleGrid__modal-product-title"
                              },
                              [_vm._v(_vm._s(product.titleCopy))]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "LifeStyleGrid__modal-product-price"
                            },
                            [_vm._v(_vm._s(product.price))]
                          )
                        ])
                      ]
                    )
                  })
                ],
                2
              )
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=template&id=75679fac&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CartSwatch.vue?vue&type=template&id=75679fac& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "SwatchBrowser__CartItem" }, [
    _c("img", {
      staticClass: "SwatchBrowser__LineImage",
      attrs: { src: _vm.swatch.image_url, alt: _vm.swatch.name + " sample" }
    }),
    _vm._v(" "),
    _c("div", { staticClass: "SwatchBrowser__SwatchName" }, [
      _vm._v(_vm._s(_vm.swatch.name))
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "SwatchBrowser__SwatchSubName" }, [
      _vm._v(_vm._s(_vm.swatch.swatch_type))
    ]),
    _vm._v(" "),
    !_vm.static
      ? _c(
          "button",
          {
            on: {
              click: function($event) {
                return _vm.$emit("toggle")
              }
            }
          },
          [
            _c("img", {
              attrs: {
                src:
                  "https://cdn.insideweather.com/icons/x-circle-black_ico@2x.png",
                alt: "Remove from cart"
              }
            })
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=template&id=25b3204a&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CloseButton.vue?vue&type=template&id=25b3204a& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("button", { staticClass: "CloseButton" }, [
    _c(
      "svg",
      {
        attrs: {
          width: _vm.size,
          height: _vm.size,
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 32.121 32.121"
        }
      },
      [
        _c("g", { attrs: { transform: "translate(-1800.004 -54.004)" } }, [
          _c("line", {
            attrs: {
              y2: "42.426",
              transform: "translate(1801.065 55.065) rotate(-45)",
              fill: "none",
              stroke: "#202020",
              "stroke-width": "3"
            }
          }),
          _vm._v(" "),
          _c("line", {
            attrs: {
              y2: "42.426",
              transform: "translate(1831.065 55.065) rotate(45)",
              fill: "none",
              stroke: "#202020",
              "stroke-width": "3"
            }
          })
        ])
      ]
    ),
    _vm._v(" "),
    _vm.label
      ? _c("span", [_vm._v(_vm._s(_vm.label))])
      : _c("span", { staticClass: "visually-hidden" }, [_vm._v("Close")])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchBrowser.vue?vue&type=template&id=a3d19d68& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "SwatchBrowser" }, [
    !_vm.isLargeMobile || !_vm.activeSwatch
      ? _c("div", { ref: "filters", staticClass: "SwatchBrowser__Filters" }, [
          _vm.isLargeMobile
            ? _c("div", { staticClass: "SwatchBrowser__FilterGroup" }, [
                _c(
                  "button",
                  {
                    staticClass: "SwatchBrowser__Pill",
                    on: {
                      click: function($event) {
                        return _vm.toggleFilter(_vm.swatchFilters[0].key)
                      }
                    }
                  },
                  [_vm._v("FILTERS")]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "SwatchBrowser__FilterGroup SwatchBrowser__FilterPanel",
              class: {
                "is-active":
                  _vm.openFilters.filter(function(filter) {
                    return filter !== "sort"
                  }).length > 0
              }
            },
            [
              _c("h3", { staticClass: "SwatchBrowser__Label" }, [
                _vm._v("FILTERS")
              ]),
              _vm._v(" "),
              _vm.isLargeMobile
                ? _c("close-button", {
                    attrs: { size: 20 },
                    nativeOn: {
                      click: function($event) {
                        $event.preventDefault()
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.swatchFilters, function(filter) {
                return _c(
                  "div",
                  {
                    key: filter.key,
                    staticClass: "SwatchBrowser__Filter",
                    class: { active: _vm.isFilterOpen(filter.key) }
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "SwatchBrowser__Pill",
                        on: {
                          click: function($event) {
                            return _vm.toggleFilter(filter.key)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(filter.label) + "\n          "
                        ),
                        _c("img", {
                          attrs: {
                            src:
                              "https://cdn.insideweather.com/icons/dropdown-down-arrow@2x.png",
                            alt: "Dropdown arrow"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.isFilterOpen(filter.key),
                            expression: "isFilterOpen(filter.key)"
                          }
                        ],
                        staticClass: "SwatchBrowser__Dialog"
                      },
                      _vm._l(filter.options, function(option) {
                        return _c(
                          "div",
                          {
                            key: option.value,
                            staticClass: "SwatchBrowser__DialogRow",
                            class: _vm.filterRowClasses(option)
                          },
                          [
                            option.value !== "trade" || _vm.isTrade
                              ? [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.appliedFilters[filter.key],
                                        expression: "appliedFilters[filter.key]"
                                      }
                                    ],
                                    class: {
                                      checked: _vm.isChecked(
                                        filter.key,
                                        option.value
                                      )
                                    },
                                    attrs: {
                                      id:
                                        "filter-" +
                                        filter.key +
                                        "-" +
                                        option.value,
                                      type: "checkbox"
                                    },
                                    domProps: {
                                      value: option.value,
                                      checked: _vm.isChecked(
                                        filter.key,
                                        option.value
                                      ),
                                      checked: Array.isArray(
                                        _vm.appliedFilters[filter.key]
                                      )
                                        ? _vm._i(
                                            _vm.appliedFilters[filter.key],
                                            option.value
                                          ) > -1
                                        : _vm.appliedFilters[filter.key]
                                    },
                                    on: {
                                      change: function($event) {
                                        var $$a =
                                            _vm.appliedFilters[filter.key],
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = option.value,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              _vm.$set(
                                                _vm.appliedFilters,
                                                filter.key,
                                                $$a.concat([$$v])
                                              )
                                          } else {
                                            $$i > -1 &&
                                              _vm.$set(
                                                _vm.appliedFilters,
                                                filter.key,
                                                $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1))
                                              )
                                          }
                                        } else {
                                          _vm.$set(
                                            _vm.appliedFilters,
                                            filter.key,
                                            $$c
                                          )
                                        }
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "label",
                                    {
                                      staticClass: "SwatchBrowser__Label",
                                      class: {
                                        "has-description": option.description
                                      },
                                      attrs: {
                                        for:
                                          "filter-" +
                                          filter.key +
                                          "-" +
                                          option.value
                                      }
                                    },
                                    [
                                      option.color
                                        ? _c("div", {
                                            staticClass: "SwatchBrowser__Color",
                                            style: { background: option.color }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      option.iconLeft
                                        ? _c("img", {
                                            staticClass:
                                              "SwatchBrowser__Icon--Left",
                                            attrs: { src: option.iconLeft }
                                          })
                                        : _vm._e(),
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(option.display) +
                                          "\n                "
                                      ),
                                      option.iconRight
                                        ? _c("img", {
                                            staticClass:
                                              "SwatchBrowser__Icon--Right",
                                            attrs: { src: option.iconRight }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      option.description
                                        ? _c("p", {
                                            domProps: {
                                              innerHTML: _vm._s(
                                                _vm.purify(option.description)
                                              )
                                            }
                                          })
                                        : _vm._e()
                                    ]
                                  )
                                ]
                              : _vm._e()
                          ],
                          2
                        )
                      }),
                      0
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _vm.isLargeMobile
                ? _c(
                    "button",
                    {
                      staticClass:
                        "SwatchBrowser__Button SwatchBrowser__Button--Black"
                    },
                    [_vm._v("BACK TO SWATCHES")]
                  )
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "SwatchBrowser__FilterGroup" }, [
            _c("h3", { staticClass: "SwatchBrowser__Label" }, [_vm._v("SORT")]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "SwatchBrowser__Filter SwatchBrowser__Sort",
                class: { active: _vm.isFilterOpen("sort") }
              },
              [
                _c(
                  "button",
                  {
                    staticClass: "SwatchBrowser__Pill",
                    on: {
                      click: function($event) {
                        return _vm.toggleFilter("sort")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          " + _vm._s(_vm.sortDisplay) + "\n          "
                    ),
                    _c("img", {
                      attrs: {
                        src:
                          "https://cdn.insideweather.com/icons/dropdown-down-arrow@2x.png",
                        alt: "Dropdown arrow"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.isFilterOpen("sort"),
                        expression: "isFilterOpen('sort')"
                      }
                    ],
                    staticClass: "SwatchBrowser__Dialog"
                  },
                  _vm._l(_vm.sortOptions, function(option) {
                    return _c(
                      "div",
                      {
                        key: option.value,
                        staticClass: "SwatchBrowser__DialogRow"
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.sortBy,
                              expression: "sortBy"
                            }
                          ],
                          staticClass: "visually-hidden",
                          attrs: {
                            id: "sortBy-" + option.value,
                            type: "radio"
                          },
                          domProps: {
                            value: option.value,
                            checked: _vm._q(_vm.sortBy, option.value)
                          },
                          on: {
                            change: [
                              function($event) {
                                _vm.sortBy = option.value
                              },
                              _vm.closeFilters
                            ]
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          {
                            staticClass: "SwatchBrowser__Label",
                            class: { active: _vm.sortBy === option.value },
                            attrs: { for: "sortBy-" + option.value }
                          },
                          [_vm._v(_vm._s(option.display))]
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "SwatchBrowser__Body",
        style: { opacity: !_vm.openFilters.length ? 1 : 0.6 }
      },
      [
        _c(
          "div",
          {
            ref: "mainContainer",
            staticClass: "SwatchBrowser__Main",
            class: _vm.mainClasses
          },
          [
            _c("swatches-order-form", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showOrderForm,
                  expression: "showOrderForm"
                }
              ],
              staticClass: "SwatchBrowser__Form",
              attrs: {
                cart: _vm.cart,
                "is-mobile": _vm.isLargeMobile,
                "is-submitting": _vm.isSubmitting,
                completed: _vm.completed
              },
              on: {
                close: function($event) {
                  _vm.showOrderForm = false
                }
              }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "SwatchBrowser__Browse" }, [
              _c(
                "div",
                {
                  ref: "swatchContainer",
                  staticClass: "SwatchBrowser__SwatchContainer"
                },
                [
                  _c(
                    "div",
                    { staticClass: "SwatchBrowser__Swatches" },
                    [
                      _vm.swatches.length && !_vm.filteredSwatches.length
                        ? _c("div", { staticClass: "SwatchBrowser__Empty" }, [
                            _c("h3", [
                              _vm._v("Sorry, there are no matching swatches.")
                            ]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "To see more results, try clearing your filters."
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass:
                                  "SwatchBrowser__Button SwatchBrowser__Button--Black",
                                on: { click: _vm.clearFilters }
                              },
                              [_vm._v("CLEAR FILTERS")]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.filteredSwatches, function(swatch, index) {
                        return _c(
                          "div",
                          {
                            key: swatch.variant_id,
                            ref: "swatches",
                            refInFor: true,
                            staticClass: "SwatchBrowser__Swatch",
                            class: {
                              "is-selected": _vm.inCart(swatch.variant_id),
                              "info-active": _vm.infoActive(swatch.variant_id)
                            }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "SwatchBrowser__SwatchInfoToggle",
                                on: {
                                  click: function($event) {
                                    return _vm.toggleInfo(
                                      swatch.variant_id,
                                      index
                                    )
                                  }
                                }
                              },
                              [
                                !_vm.infoActive(swatch.variant_id)
                                  ? _c("img", {
                                      attrs: {
                                        src:
                                          "https://cdn.insideweather.com/icons/i-circle-gray_ico@2x.png",
                                        alt: "info"
                                      }
                                    })
                                  : _c("img", {
                                      attrs: {
                                        src:
                                          "https://cdn.insideweather.com/icons/x-circle-white_ico@2x.png",
                                        alt: "close"
                                      }
                                    })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "SwatchBrowser__SwatchDetail" },
                              [
                                _c("img", {
                                  staticClass: "SwatchBrowser__SwatchImage",
                                  attrs: {
                                    src: swatch.image_url,
                                    alt: swatch.name + " sample"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.toggleInfo(
                                        swatch.variant_id,
                                        index
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass:
                                    "SwatchBrowser__SwatchBackground",
                                  style: {
                                    backgroundImage:
                                      "url(" + swatch.image_url + ")"
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "SwatchBrowser__SwatchName" },
                                  [_vm._v(_vm._s(swatch.name))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "SwatchBrowser__SwatchSubName"
                                  },
                                  [_vm._v(_vm._s(swatch.swatch_type))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "SwatchBrowser__Badges" },
                                  [
                                    swatch.commercial
                                      ? _c("img", {
                                          attrs: {
                                            src:
                                              "https://cdn.insideweather.com/icons/commercial-ico_v2.png",
                                            alt: "Commercial icon"
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    swatch.pet_friendly
                                      ? _c("img", {
                                          attrs: {
                                            src:
                                              "https://cdn.insideweather.com/icons/pet-friendly-ico_v2.png",
                                            alt: "Pet friendly icon"
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    swatch.performance
                                      ? _c("img", {
                                          attrs: {
                                            src:
                                              "https://cdn.insideweather.com/icons/performance-ico_v2.png",
                                            alt: "Performance icon"
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    swatch.water_resistant
                                      ? _c("img", {
                                          attrs: {
                                            src:
                                              "https://cdn.insideweather.com/icons/liquid-ico_v2.png",
                                            alt: "Water resistant icon"
                                          }
                                        })
                                      : _vm._e()
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "SwatchBrowser__SwatchToggle SwatchBrowser__Button",
                                    on: {
                                      click: function($event) {
                                        return _vm.toggleLineItem(swatch)
                                      }
                                    }
                                  },
                                  [
                                    !_vm.inCart(swatch.variant_id)
                                      ? _c("span", [_vm._v("+ ADD")])
                                      : _c("span", [_vm._v("REMOVE")])
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.hasError(swatch.variant_id)
                                  ? _c(
                                      "div",
                                      { staticClass: "SwatchBrowser__Alert" },
                                      [
                                        _c("close-button", {
                                          attrs: { size: 14 },
                                          nativeOn: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              _vm.errorOn = null
                                            }
                                          }
                                        }),
                                        _vm._v(
                                          "\n                  Oops! You already have " +
                                            _vm._s(_vm.maxSwatches) +
                                            " swatches in your cart!\n                "
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              ]
                            ),
                            _vm._v(" "),
                            _vm.infoActive(swatch.variant_id)
                              ? _c("swatch-info", {
                                  attrs: {
                                    swatch: _vm.activeSwatch,
                                    "related-products": _vm.relatedProducts
                                  },
                                  on: {
                                    close: function($event) {
                                      return _vm.toggleInfo(
                                        swatch.variant_id,
                                        index
                                      )
                                    }
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                ]
              )
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.isLargeMobile || !_vm.activeSwatch,
                expression: "!isLargeMobile || !activeSwatch"
              }
            ],
            staticClass: "SwatchBrowser__Cart",
            class: { full: _vm.showOrderForm && _vm.showCart }
          },
          [
            _c(
              "transition",
              {
                attrs: {
                  "enter-active-class": "animated slideInUp",
                  "leave-active-class": "animated slideOutDown"
                }
              },
              [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.showOrderForm || _vm.showCart,
                        expression: "!showOrderForm || showCart"
                      }
                    ],
                    staticClass: "SwatchBrowser__CartBody",
                    class: {
                      "is-open":
                        _vm.isLargeMobile && _vm.showOrderForm && _vm.showCart
                    }
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "SwatchBrowser__CartHeader" },
                      [
                        _c("h2", [
                          _vm._v(
                            "\n              Your Swatch " +
                              _vm._s(_vm.showOrderForm ? "Order" : "Cart") +
                              "\n              "
                          ),
                          _c("span", [
                            _vm._v(
                              "(Choose up to " + _vm._s(_vm.maxSwatches) + ")"
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("close-button", {
                          attrs: {
                            size: _vm.isLargeMobile ? 20 : 24,
                            label: "BACK TO SWATCHES"
                          },
                          nativeOn: {
                            click: function($event) {
                              return _vm.closeFromCart.apply(null, arguments)
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "SwatchBrowser__CartCounter" }, [
                      _c(
                        "div",
                        { staticClass: "SwatchBrowser__CounterLabel" },
                        [_vm._v("Your Swatch Cart")]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "SwatchBrowser__CartCount" }, [
                        _vm._v(
                          "\n              " +
                            _vm._s(_vm.cart.length) +
                            "/" +
                            _vm._s(_vm.maxSwatches) +
                            "\n            "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "SwatchBrowser__CartItems" },
                      _vm._l(_vm.cart, function(item) {
                        return _c("cart-swatch", {
                          key: item.variant_id,
                          attrs: { swatch: item, static: _vm.completed },
                          on: {
                            toggle: function($event) {
                              return _vm.toggleLineItem(item)
                            }
                          }
                        })
                      }),
                      1
                    )
                  ]
                )
              ]
            ),
            _vm._v(" "),
            !_vm.completed
              ? _c("div", { staticClass: "SwatchBrowser__CartFooter" }, [
                  _c("div", { staticClass: "SwatchBrowser__CartCounter" }, [
                    _c("div", { staticClass: "SwatchBrowser__CounterLabel" }, [
                      _vm._v("Total Swatches:")
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "SwatchBrowser__CartCount" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.cart.length) +
                          "/" +
                          _vm._s(_vm.maxSwatches) +
                          "\n          "
                      )
                    ]),
                    _vm._v(" "),
                    _vm.isLargeMobile && !_vm.showCart && _vm.showOrderForm
                      ? _c(
                          "button",
                          {
                            staticClass: "SwatchBrowser__FooterLink",
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.openCart.apply(null, arguments)
                              }
                            }
                          },
                          [_vm._v("VIEW YOUR ORDER")]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.showCart && !_vm.showOrderForm,
                          expression: "!showCart && !showOrderForm"
                        }
                      ],
                      staticClass:
                        "SwatchBrowser__CartButton SwatchBrowser__Button SwatchBrowser__Button--Black",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.openCart.apply(null, arguments)
                        }
                      }
                    },
                    [_vm._v("ORDER NOW")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            (_vm.showCart && !_vm.showOrderForm) ||
                            (_vm.isLargeMobile &&
                              _vm.showOrderForm &&
                              !_vm.showCart),
                          expression:
                            "(showCart && !showOrderForm) || (isLargeMobile && showOrderForm && !showCart)"
                        }
                      ],
                      staticClass:
                        "SwatchBrowser__OrderButton SwatchBrowser__Button SwatchBrowser__Button--Black",
                      class: { "btn--loading": _vm.isSubmitting },
                      attrs: { disabled: _vm.isSubmitting },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.submitFromCart.apply(null, arguments)
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.showOrderForm && !_vm.showCart
                            ? "SUBMIT SWATCH ORDER"
                            : "ORDER NOW"
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.isLargeMobile && _vm.showOrderForm && _vm.showCart
                    ? _c(
                        "button",
                        {
                          staticClass:
                            "SwatchBrowser__Button SwatchBrowser__Button--Black",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.closeFromCart.apply(null, arguments)
                            }
                          }
                        },
                        [_vm._v("BACK TO INFORMATION")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v("Swatches are FREE and arrive in 2-4 business days")
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._m(0)
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("\n        Are you a Design Professional?\n        Join our "),
      _c(
        "a",
        {
          attrs: {
            href: "https://insideweather.com/pages/designer-trade-program"
          }
        },
        [_vm._v("Designer Trade Program")]
      ),
      _vm._v("\n        to get set up with our exclusive Trade Kit!\n      ")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchInfo.vue?vue&type=template&id=2f4ef43a& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "SwatchBrowser__SwatchInfo" },
    [
      _c("div", { staticClass: "SwatchBrowser__Tabs" }, [
        _c(
          "button",
          {
            staticClass: "SwatchBrowser__Tab",
            class: { "is-active": _vm.activeTab === "details" },
            on: {
              click: function($event) {
                _vm.activeTab = "details"
              }
            }
          },
          [_vm._v("DETAILS")]
        ),
        _vm._v(" "),
        _vm.hasPhotos
          ? _c(
              "button",
              {
                staticClass: "SwatchBrowser__Tab",
                class: { "is-active": _vm.activeTab === "photos" },
                on: {
                  click: function($event) {
                    _vm.activeTab = "photos"
                  }
                }
              },
              [_vm._v("PHOTOS")]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.hasRelated
          ? _c(
              "button",
              {
                staticClass: "SwatchBrowser__Tab",
                class: { "is-active": _vm.activeTab === "shop" },
                on: {
                  click: function($event) {
                    _vm.activeTab = "shop"
                  }
                }
              },
              [_vm._v("SHOP")]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.activeTab === "details",
              expression: "activeTab === 'details'"
            }
          ],
          staticClass: "SwatchBrowser__Details"
        },
        [
          _vm.swatch.commercial ||
          _vm.swatch.performance ||
          _vm.swatch.pet_friendly ||
          _vm.swatch.water_resistant
            ? _c("div", { staticClass: "SwatchBrowser__Badges" }, [
                _vm.swatch.commercial
                  ? _c("span", [
                      _c("img", {
                        attrs: {
                          src:
                            "https://cdn.insideweather.com/icons/commercial-ico_v2.png",
                          alt: "Commercial icon"
                        }
                      }),
                      _vm._v("\n        Commercial\n      ")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.swatch.pet_friendly
                  ? _c("span", [
                      _c("img", {
                        attrs: {
                          src:
                            "https://cdn.insideweather.com/icons/pet-friendly-ico_v2.png",
                          alt: "Pet friendly icon"
                        }
                      }),
                      _vm._v("\n        Pet-Friendly\n      ")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.swatch.performance
                  ? _c("span", [
                      _c("img", {
                        attrs: {
                          src:
                            "https://cdn.insideweather.com/icons/performance-ico_v2.png",
                          alt: "Performance icon"
                        }
                      }),
                      _vm._v("\n        Performance\n      ")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.swatch.water_resistant
                  ? _c("span", [
                      _c("img", {
                        attrs: {
                          src:
                            "https://cdn.insideweather.com/icons/liquid-ico_v2.png",
                          alt: "Water resistant icon"
                        }
                      }),
                      _vm._v("\n        Water Resistant\n      ")
                    ])
                  : _vm._e()
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.swatch.description))]),
          _vm._v(" "),
          _c("div", { staticClass: "SwatchBrowser__Specs" }, [
            _vm.swatch.composition
              ? _c("div", { staticStyle: { float: "left" } }, [
                  _c("span", [_vm._v("COMPOSITION")]),
                  _vm._v(
                    "\n        " + _vm._s(_vm.swatch.composition) + "\n      "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.swatch.durability_description
              ? _c("div", [
                  _c("span", [_vm._v("DURABILITY")]),
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.swatch.durability_description) +
                      "\n      "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.swatch.cleaning_description
              ? _c("div", [
                  _c("span", [_vm._v("CLEANING")]),
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.swatch.cleaning_description) +
                      "\n      "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.swatch.enable_stain_chart
              ? _c("div", [
                  _c("span", [_vm._v("STAIN RESISTANT TEST RESULTS")]),
                  _vm._v(" "),
                  _c("table", [
                    _vm._m(0),
                    _vm._v(" "),
                    _c("tbody", [
                      _c("tr", [
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data
                                .stain_resistant_mustard
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data.stain_resistant_wine
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data.stain_resistant_soda
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data.stain_resistant_water
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data.stain_resistant_oil
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data
                                .stain_resistant_ketchup
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(
                              _vm.swatch.stain_chart_data.stain_resistant_soil
                            )
                          )
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    !_vm.isMobile ? _c("tfoot", [_vm._m(1)]) : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.isMobile
                    ? _c("div", [
                        _c("p", [_vm._v("1 = Partial stain release")]),
                        _vm._v(" "),
                        _c("p", [_vm._v("3.5+ = Commercial passing score")]),
                        _vm._v(" "),
                        _c("p", [_vm._v("5 = Complete stain release")])
                      ])
                    : _vm._e()
                ])
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _vm.hasPhotos
        ? _c("lifestyle-grid", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.activeTab === "photos",
                expression: "activeTab === 'photos'"
              }
            ],
            staticClass: "SwatchBrowser__Photos",
            attrs: { images: _vm.swatch.lifestyle_grid.images }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasRelated
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === "shop",
                  expression: "activeTab === 'shop'"
                }
              ],
              staticClass: "SwatchBrowser__Shop"
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "SwatchBrowser__RelatedProducts related-products__cards"
                },
                _vm._l(_vm.relatedProducts, function(relatedProduct) {
                  return _c(
                    "div",
                    {
                      key: relatedProduct.title,
                      staticClass: "related-products__card"
                    },
                    [
                      relatedProduct.image.medium
                        ? [
                            _c("a", { attrs: { href: relatedProduct.url } }, [
                              _c("img", {
                                staticClass: "related-products__image",
                                attrs: { src: relatedProduct.image.medium[0] }
                              })
                            ])
                          ]
                        : [
                            _c("a", { attrs: { href: relatedProduct.url } }, [
                              _c("img", {
                                staticClass: "related-products__image",
                                attrs: { src: relatedProduct.image }
                              })
                            ])
                          ],
                      _vm._v(" "),
                      _c("a", { attrs: { href: relatedProduct.url } }, [
                        _c("p", { staticClass: "related-products__title" }, [
                          _vm._v(_vm._s(relatedProduct.title))
                        ])
                      ]),
                      _vm._v(" "),
                      _c("a", { attrs: { href: relatedProduct.url } }, [
                        _vm._v("SHOP")
                      ])
                    ],
                    2
                  )
                }),
                0
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.isMobile
        ? _c(
            "button",
            {
              staticClass: "SwatchBrowser__Button SwatchBrowser__Button--Black",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$emit("close")
                }
              }
            },
            [_vm._v("BACK TO SWATCHES")]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Mustard")]),
        _vm._v(" "),
        _c("th", [_vm._v("Wine")]),
        _vm._v(" "),
        _c("th", [_vm._v("Soda")]),
        _vm._v(" "),
        _c("th", [_vm._v("Water")]),
        _vm._v(" "),
        _c("th", [_vm._v("Oil")]),
        _vm._v(" "),
        _c("th", [_vm._v("Ketchup")]),
        _vm._v(" "),
        _c("th", [_vm._v("Soil")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("td", { attrs: { colspan: "2" } }, [
        _vm._v("1 = Partial stain release")
      ]),
      _vm._v(" "),
      _c("td", { attrs: { colspan: "3" } }, [
        _vm._v("3.5+ = Commercial passing score")
      ]),
      _vm._v(" "),
      _c("td", { attrs: { colspan: "2" } }, [
        _vm._v("5 = Complete stain release")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SwatchesOrderForm.vue?vue&type=template&id=421cf268& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "SwatchesOrderForm" },
    [
      _c(
        "transition-group",
        {
          attrs: {
            "enter-active-class": "animated fadeInRight",
            "leave-active-class": "animated fadeOutRight"
          }
        },
        [
          !_vm.completed
            ? _c(
                "form",
                {
                  key: "form",
                  staticClass: "SwatchesOrderForm__Form",
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.submit.apply(null, arguments)
                    }
                  }
                },
                [
                  _c("div", { staticClass: "SwatchesOrderForm__Wrapper" }, [
                    !_vm.isMobile
                      ? _c(
                          "div",
                          { staticClass: "SwatchesOrderForm__Back" },
                          [
                            _c("arrow-button", {
                              nativeOn: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  return _vm.$emit("close")
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "SwatchBrowser__Button",
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    $event.stopPropagation()
                                    return _vm.$emit("close")
                                  }
                                }
                              },
                              [_vm._v("BACK TO SWATCHES")]
                            )
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "h2",
                      { staticClass: "SwatchesOrderForm__Heading" },
                      [
                        _vm._v("\n          Your Information\n          "),
                        _vm.isMobile
                          ? _c("close-button", {
                              attrs: { label: "BACK TO SWATCHES", size: 20 },
                              nativeOn: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  return _vm.$emit("close")
                                }
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.hasErrors
                      ? _c("p", { staticClass: "SwatchesOrderForm__Error" }, [
                          _vm._v(
                            "\n          Please correct the errors below and resubmit.\n        "
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.tooManySwatchOrders
                      ? _c("p", { staticClass: "SwatchesOrderForm__Error" }, [
                          _vm._v(
                            "\n          You've already placed a swatch order.\n        "
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "SwatchesOrderForm__Fields" },
                      [
                        _vm._l(_vm.fields, function(field) {
                          return _c(
                            "div",
                            {
                              key: field.name,
                              staticClass: "SwatchesOrderForm__Field",
                              class: {
                                "SwatchesOrderForm__Field--Full":
                                  field.fullWidth
                              }
                            },
                            [
                              _c("label", [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(field.label) +
                                    ":\n              "
                                ),
                                !field.required
                                  ? _c("span", [_vm._v("(OPTIONAL)")])
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              field.type == "state"
                                ? _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.address[field.name],
                                          expression: "address[field.name]"
                                        }
                                      ],
                                      class: {
                                        "has-error": _vm.hasError(field.name)
                                      },
                                      attrs: { name: field.name },
                                      on: {
                                        focus: function(e) {
                                          return _vm.$bus.$emit(
                                            "swatch-browser:focus-field",
                                            e
                                          )
                                        },
                                        change: function($event) {
                                          var $$selectedVal = Array.prototype.filter
                                            .call(
                                              $event.target.options,
                                              function(o) {
                                                return o.selected
                                              }
                                            )
                                            .map(function(o) {
                                              var val =
                                                "_value" in o
                                                  ? o._value
                                                  : o.value
                                              return val
                                            })
                                          _vm.$set(
                                            _vm.address,
                                            field.name,
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _c("option", { attrs: { value: "" } }, [
                                        _vm._v("Select")
                                      ]),
                                      _vm._v(" "),
                                      _vm._l(_vm.states, function(state) {
                                        return _c(
                                          "option",
                                          {
                                            key: state.abbreviation,
                                            domProps: {
                                              value: state.abbreviation
                                            }
                                          },
                                          [_vm._v(_vm._s(state.name))]
                                        )
                                      })
                                    ],
                                    2
                                  )
                                : field.type === "checkbox"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.address[field.name],
                                        expression: "address[field.name]"
                                      }
                                    ],
                                    class: {
                                      "has-error": _vm.hasError(field.name)
                                    },
                                    attrs: {
                                      name: field.name,
                                      type: "checkbox"
                                    },
                                    domProps: {
                                      checked: Array.isArray(
                                        _vm.address[field.name]
                                      )
                                        ? _vm._i(
                                            _vm.address[field.name],
                                            null
                                          ) > -1
                                        : _vm.address[field.name]
                                    },
                                    on: {
                                      focus: function(e) {
                                        return _vm.$bus.$emit(
                                          "swatch-browser:focus-field",
                                          e
                                        )
                                      },
                                      change: function($event) {
                                        var $$a = _vm.address[field.name],
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              _vm.$set(
                                                _vm.address,
                                                field.name,
                                                $$a.concat([$$v])
                                              )
                                          } else {
                                            $$i > -1 &&
                                              _vm.$set(
                                                _vm.address,
                                                field.name,
                                                $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1))
                                              )
                                          }
                                        } else {
                                          _vm.$set(_vm.address, field.name, $$c)
                                        }
                                      }
                                    }
                                  })
                                : field.type === "radio"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.address[field.name],
                                        expression: "address[field.name]"
                                      }
                                    ],
                                    class: {
                                      "has-error": _vm.hasError(field.name)
                                    },
                                    attrs: { name: field.name, type: "radio" },
                                    domProps: {
                                      checked: _vm._q(
                                        _vm.address[field.name],
                                        null
                                      )
                                    },
                                    on: {
                                      focus: function(e) {
                                        return _vm.$bus.$emit(
                                          "swatch-browser:focus-field",
                                          e
                                        )
                                      },
                                      change: function($event) {
                                        return _vm.$set(
                                          _vm.address,
                                          field.name,
                                          null
                                        )
                                      }
                                    }
                                  })
                                : _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.address[field.name],
                                        expression: "address[field.name]"
                                      }
                                    ],
                                    class: {
                                      "has-error": _vm.hasError(field.name)
                                    },
                                    attrs: {
                                      name: field.name,
                                      type: field.type
                                    },
                                    domProps: {
                                      value: _vm.address[field.name]
                                    },
                                    on: {
                                      focus: function(e) {
                                        return _vm.$bus.$emit(
                                          "swatch-browser:focus-field",
                                          e
                                        )
                                      },
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.address,
                                          field.name,
                                          $event.target.value
                                        )
                                      }
                                    }
                                  }),
                              _vm._v(" "),
                              _vm.hasError(field.name)
                                ? _c(
                                    "p",
                                    { staticClass: "SwatchesOrderForm__Error" },
                                    [_vm._v(_vm._s(_vm.errorFor(field.name)))]
                                  )
                                : _vm._e()
                            ]
                          )
                        }),
                        _vm._v(" "),
                        !_vm.isMobile
                          ? _c(
                              "button",
                              {
                                staticClass:
                                  "SwatchesOrderForm__Submit SwatchBrowser__Button SwatchBrowser__Button--Black",
                                class: { "btn--loading": _vm.isSubmitting },
                                attrs: {
                                  disabled: _vm.isSubmitting,
                                  type: "submit"
                                }
                              },
                              [_vm._v("SUBMIT SWATCH ORDER")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        !_vm.isMobile
                          ? _c("p", [
                              _vm._v(
                                "Swatches are FREE and arrive in 2-4 business days."
                              )
                            ])
                          : _vm._e()
                      ],
                      2
                    )
                  ])
                ]
              )
            : _c(
                "div",
                {
                  key: "thank-you",
                  staticClass: "SwatchesOrderForm__ThankYou"
                },
                [
                  _c("div", { staticClass: "SwatchesOrderForm__Wrapper" }, [
                    _c("h2", { staticClass: "SwatchesOrderForm__Heading" }, [
                      _vm._v("Thank You!")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "SwatchesOrderForm__Body" }, [
                      _vm._v(_vm._s(_vm.thankYouMessage))
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "SwatchBrowser__Button SwatchBrowser__Button--Black",
                        on: {
                          click: function($event) {
                            return _vm.$emit("close")
                          }
                        }
                      },
                      [_vm._v("CONTINUE SHOPPING")]
                    )
                  ])
                ]
              )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["widgets.vendor","widgets"], () => (__webpack_exec__("./src/swatches.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);