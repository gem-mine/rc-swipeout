webpackJsonp([1],{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(58);


/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src___ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);




/* eslint-disable no-console */
/* tslint:disable:no-console */





var Demo = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

    function Demo() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

        var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));

        _this.state = {
            open: true
        };
        _this.onClick = function () {
            _this.setState({ open: !_this.state.open });
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'div',
                { style: { marginBottom: 12 } },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    'a',
                    { onClick: this.onClick },
                    'swipe'
                ),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5__src___["a" /* default */],
                    { style: { backgroundColor: 'white' }, open: this.state.open, right: [{ text: 'more',
                            onPress: function onPress() {
                                _this2.setState({ open: false });
                            },
                            style: { backgroundColor: 'orange', color: 'white' }
                        }, { text: 'delete',
                            onPress: function onPress() {
                                return console.log('delete');
                            },
                            style: { backgroundColor: 'red', color: 'white' }
                        }], onOpen: function onOpen() {
                            return console.log('open');
                        }, onClose: function onClose() {
                            return console.log('close');
                        } },
                    __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                        'div',
                        { onClick: function onClick() {
                                console.log('emit an event on children element!');
                            }, style: {
                                height: 44,
                                backgroundColor: 'white',
                                lineHeight: '44px',
                                borderTop: '1px solid #dedede',
                                borderBottom: '1px solid #dedede'
                            } },
                        'swipe out simple demo'
                    )
                )
            );
        }
    }]);

    return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[116]);
//# sourceMappingURL=right.js.map