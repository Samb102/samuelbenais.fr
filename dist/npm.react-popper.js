"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.react-popper"],{

/***/ "./node_modules/react-popper/lib/esm/Manager.js":
/*!******************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Manager.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager),
/* harmony export */   "ManagerReferenceNodeContext": () => (/* binding */ ManagerReferenceNodeContext),
/* harmony export */   "ManagerReferenceNodeSetterContext": () => (/* binding */ ManagerReferenceNodeSetterContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ManagerReferenceNodeContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext();
var ManagerReferenceNodeSetterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext();
function Manager(_ref) {
  var children = _ref.children;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
      referenceNode = _React$useState[0],
      setReferenceNode = _React$useState[1];

  var hasUnmounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    return function () {
      hasUnmounted.current = true;
    };
  }, []);
  var handleSetReferenceNode = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (node) {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ManagerReferenceNodeContext.Provider, {
    value: referenceNode
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ManagerReferenceNodeSetterContext.Provider, {
    value: handleSetReferenceNode
  }, children));
}

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/Popper.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Popper.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popper": () => (/* binding */ Popper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manager */ "./node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/react-popper/lib/esm/utils.js");
/* harmony import */ var _usePopper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usePopper */ "./node_modules/react-popper/lib/esm/usePopper.js");





var NOOP = function NOOP() {
  return void 0;
};

var NOOP_PROMISE = function NOOP_PROMISE() {
  return Promise.resolve(null);
};

var EMPTY_MODIFIERS = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === void 0 ? 'absolute' : _ref$strategy,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS : _ref$modifiers,
      referenceElement = _ref.referenceElement,
      onFirstUpdate = _ref.onFirstUpdate,
      innerRef = _ref.innerRef,
      children = _ref.children;
  var referenceNode = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_Manager__WEBPACK_IMPORTED_MODULE_1__.ManagerReferenceNodeContext);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
      popperElement = _React$useState[0],
      setPopperElement = _React$useState[1];

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
      arrowElement = _React$useState2[0],
      setArrowElement = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.setRef)(innerRef, popperElement);
  }, [innerRef, popperElement]);
  var options = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      placement: placement,
      strategy: strategy,
      onFirstUpdate: onFirstUpdate,
      modifiers: [].concat(modifiers, [{
        name: 'arrow',
        enabled: arrowElement != null,
        options: {
          element: arrowElement
        }
      }])
    };
  }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);

  var _usePopper = (0,_usePopper__WEBPACK_IMPORTED_MODULE_3__.usePopper)(referenceElement || referenceNode, popperElement, options),
      state = _usePopper.state,
      styles = _usePopper.styles,
      forceUpdate = _usePopper.forceUpdate,
      update = _usePopper.update;

  var childrenProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE
    };
  }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
  return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unwrapArray)(children)(childrenProps);
}

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/Reference.js":
/*!********************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Reference.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Reference": () => (/* binding */ Reference)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Manager */ "./node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-popper/lib/esm/utils.js");




function Reference(_ref) {
  var children = _ref.children,
      innerRef = _ref.innerRef;
  var setReferenceNode = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_Manager__WEBPACK_IMPORTED_MODULE_2__.ManagerReferenceNodeSetterContext);
  var refHandler = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (node) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.setRef)(innerRef, node);
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.safeInvoke)(setReferenceNode, node);
  }, [innerRef, setReferenceNode]); // ran on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    return function () {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.setRef)(innerRef, null);
    };
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    warning__WEBPACK_IMPORTED_MODULE_1___default()(Boolean(setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
  }, [setReferenceNode]);
  return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.unwrapArray)(children)({
    ref: refHandler
  });
}

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/usePopper.js":
/*!********************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/usePopper.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "usePopper": () => (/* binding */ usePopper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fast-compare */ "./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-popper/lib/esm/utils.js");





var EMPTY_MODIFIERS = [];
var usePopper = function usePopper(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }

  var prevOptions = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || 'bottom',
    strategy: options.strategy || 'absolute',
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var updateStateModifier = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      name: 'updateState',
      enabled: true,
      phase: 'write',
      fn: function fn(_ref) {
        var state = _ref.state;
        var elements = Object.keys(state.elements);
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(function () {
          setState({
            styles: (0,_utils__WEBPACK_IMPORTED_MODULE_3__.fromEntries)(elements.map(function (element) {
              return [element, state.styles[element] || {}];
            })),
            attributes: (0,_utils__WEBPACK_IMPORTED_MODULE_3__.fromEntries)(elements.map(function (element) {
              return [element, state.attributes[element]];
            }))
          });
        });
      },
      requires: ['computeStyles']
    };
  }, []);
  var popperOptions = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: 'applyStyles',
        enabled: false
      }])
    };

    if (react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicLayoutEffect)(function () {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicLayoutEffect)(function () {
    if (referenceElement == null || popperElement == null) {
      return;
    }

    var createPopper = options.createPopper || _popperjs_core__WEBPACK_IMPORTED_MODULE_4__.createPopper;
    var popperInstance = createPopper(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function () {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEntries": () => (/* binding */ fromEntries),
/* harmony export */   "safeInvoke": () => (/* binding */ safeInvoke),
/* harmony export */   "setRef": () => (/* binding */ setRef),
/* harmony export */   "unwrapArray": () => (/* binding */ unwrapArray),
/* harmony export */   "useIsomorphicLayoutEffect": () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === 'function') {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};
/**
 * Simple ponyfill for Object.fromEntries
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
        value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDM0I7QUFDQTtBQUNBOztBQUVBLCtDQUErQyx3REFBbUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckcrQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EsMkZBQTJGLGFBQWE7QUFDeEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sb0hBQW9ILGtEQUFxQixHQUFHLDRDQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL1BvcHBlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvcmVhY3QtcG9wcGVyL2xpYi9lc20vUmVmZXJlbmNlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy9yZWFjdC1wb3BwZXIvbGliL2VzbS91c2VQb3BwZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmV4cG9ydCB2YXIgTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpO1xuZXhwb3J0IHZhciBNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KCk7XG5leHBvcnQgZnVuY3Rpb24gTWFuYWdlcihfcmVmKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG5cbiAgdmFyIF9SZWFjdCR1c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLFxuICAgICAgcmVmZXJlbmNlTm9kZSA9IF9SZWFjdCR1c2VTdGF0ZVswXSxcbiAgICAgIHNldFJlZmVyZW5jZU5vZGUgPSBfUmVhY3QkdXNlU3RhdGVbMV07XG5cbiAgdmFyIGhhc1VubW91bnRlZCA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhhc1VubW91bnRlZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHZhciBoYW5kbGVTZXRSZWZlcmVuY2VOb2RlID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAoIWhhc1VubW91bnRlZC5jdXJyZW50KSB7XG4gICAgICBzZXRSZWZlcmVuY2VOb2RlKG5vZGUpO1xuICAgIH1cbiAgfSwgW10pO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHJlZmVyZW5jZU5vZGVcbiAgfSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTWFuYWdlclJlZmVyZW5jZU5vZGVTZXR0ZXJDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IGhhbmRsZVNldFJlZmVyZW5jZU5vZGVcbiAgfSwgY2hpbGRyZW4pKTtcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYW5hZ2VyUmVmZXJlbmNlTm9kZUNvbnRleHQgfSBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IHsgdW53cmFwQXJyYXksIHNldFJlZiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgdXNlUG9wcGVyIH0gZnJvbSAnLi91c2VQb3BwZXInO1xuXG52YXIgTk9PUCA9IGZ1bmN0aW9uIE5PT1AoKSB7XG4gIHJldHVybiB2b2lkIDA7XG59O1xuXG52YXIgTk9PUF9QUk9NSVNFID0gZnVuY3Rpb24gTk9PUF9QUk9NSVNFKCkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxudmFyIEVNUFRZX01PRElGSUVSUyA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIFBvcHBlcihfcmVmKSB7XG4gIHZhciBfcmVmJHBsYWNlbWVudCA9IF9yZWYucGxhY2VtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZiRwbGFjZW1lbnQgPT09IHZvaWQgMCA/ICdib3R0b20nIDogX3JlZiRwbGFjZW1lbnQsXG4gICAgICBfcmVmJHN0cmF0ZWd5ID0gX3JlZi5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX3JlZiRzdHJhdGVneSA9PT0gdm9pZCAwID8gJ2Fic29sdXRlJyA6IF9yZWYkc3RyYXRlZ3ksXG4gICAgICBfcmVmJG1vZGlmaWVycyA9IF9yZWYubW9kaWZpZXJzLFxuICAgICAgbW9kaWZpZXJzID0gX3JlZiRtb2RpZmllcnMgPT09IHZvaWQgMCA/IEVNUFRZX01PRElGSUVSUyA6IF9yZWYkbW9kaWZpZXJzLFxuICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IF9yZWYucmVmZXJlbmNlRWxlbWVudCxcbiAgICAgIG9uRmlyc3RVcGRhdGUgPSBfcmVmLm9uRmlyc3RVcGRhdGUsXG4gICAgICBpbm5lclJlZiA9IF9yZWYuaW5uZXJSZWYsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG4gIHZhciByZWZlcmVuY2VOb2RlID0gUmVhY3QudXNlQ29udGV4dChNYW5hZ2VyUmVmZXJlbmNlTm9kZUNvbnRleHQpO1xuXG4gIHZhciBfUmVhY3QkdXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShudWxsKSxcbiAgICAgIHBvcHBlckVsZW1lbnQgPSBfUmVhY3QkdXNlU3RhdGVbMF0sXG4gICAgICBzZXRQb3BwZXJFbGVtZW50ID0gX1JlYWN0JHVzZVN0YXRlWzFdO1xuXG4gIHZhciBfUmVhY3QkdXNlU3RhdGUyID0gUmVhY3QudXNlU3RhdGUobnVsbCksXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfUmVhY3QkdXNlU3RhdGUyWzBdLFxuICAgICAgc2V0QXJyb3dFbGVtZW50ID0gX1JlYWN0JHVzZVN0YXRlMlsxXTtcblxuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHNldFJlZihpbm5lclJlZiwgcG9wcGVyRWxlbWVudCk7XG4gIH0sIFtpbm5lclJlZiwgcG9wcGVyRWxlbWVudF0pO1xuICB2YXIgb3B0aW9ucyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIHN0cmF0ZWd5OiBzdHJhdGVneSxcbiAgICAgIG9uRmlyc3RVcGRhdGU6IG9uRmlyc3RVcGRhdGUsXG4gICAgICBtb2RpZmllcnM6IFtdLmNvbmNhdChtb2RpZmllcnMsIFt7XG4gICAgICAgIG5hbWU6ICdhcnJvdycsXG4gICAgICAgIGVuYWJsZWQ6IGFycm93RWxlbWVudCAhPSBudWxsLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgZWxlbWVudDogYXJyb3dFbGVtZW50XG4gICAgICAgIH1cbiAgICAgIH1dKVxuICAgIH07XG4gIH0sIFtwbGFjZW1lbnQsIHN0cmF0ZWd5LCBvbkZpcnN0VXBkYXRlLCBtb2RpZmllcnMsIGFycm93RWxlbWVudF0pO1xuXG4gIHZhciBfdXNlUG9wcGVyID0gdXNlUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQgfHwgcmVmZXJlbmNlTm9kZSwgcG9wcGVyRWxlbWVudCwgb3B0aW9ucyksXG4gICAgICBzdGF0ZSA9IF91c2VQb3BwZXIuc3RhdGUsXG4gICAgICBzdHlsZXMgPSBfdXNlUG9wcGVyLnN0eWxlcyxcbiAgICAgIGZvcmNlVXBkYXRlID0gX3VzZVBvcHBlci5mb3JjZVVwZGF0ZSxcbiAgICAgIHVwZGF0ZSA9IF91c2VQb3BwZXIudXBkYXRlO1xuXG4gIHZhciBjaGlsZHJlblByb3BzID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZjogc2V0UG9wcGVyRWxlbWVudCxcbiAgICAgIHN0eWxlOiBzdHlsZXMucG9wcGVyLFxuICAgICAgcGxhY2VtZW50OiBzdGF0ZSA/IHN0YXRlLnBsYWNlbWVudCA6IHBsYWNlbWVudCxcbiAgICAgIGhhc1BvcHBlckVzY2FwZWQ6IHN0YXRlICYmIHN0YXRlLm1vZGlmaWVyc0RhdGEuaGlkZSA/IHN0YXRlLm1vZGlmaWVyc0RhdGEuaGlkZS5oYXNQb3BwZXJFc2NhcGVkIDogbnVsbCxcbiAgICAgIGlzUmVmZXJlbmNlSGlkZGVuOiBzdGF0ZSAmJiBzdGF0ZS5tb2RpZmllcnNEYXRhLmhpZGUgPyBzdGF0ZS5tb2RpZmllcnNEYXRhLmhpZGUuaXNSZWZlcmVuY2VIaWRkZW4gOiBudWxsLFxuICAgICAgYXJyb3dQcm9wczoge1xuICAgICAgICBzdHlsZTogc3R5bGVzLmFycm93LFxuICAgICAgICByZWY6IHNldEFycm93RWxlbWVudFxuICAgICAgfSxcbiAgICAgIGZvcmNlVXBkYXRlOiBmb3JjZVVwZGF0ZSB8fCBOT09QLFxuICAgICAgdXBkYXRlOiB1cGRhdGUgfHwgTk9PUF9QUk9NSVNFXG4gICAgfTtcbiAgfSwgW3NldFBvcHBlckVsZW1lbnQsIHNldEFycm93RWxlbWVudCwgcGxhY2VtZW50LCBzdGF0ZSwgc3R5bGVzLCB1cGRhdGUsIGZvcmNlVXBkYXRlXSk7XG4gIHJldHVybiB1bndyYXBBcnJheShjaGlsZHJlbikoY2hpbGRyZW5Qcm9wcyk7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyBNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQgfSBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IHsgc2FmZUludm9rZSwgdW53cmFwQXJyYXksIHNldFJlZiB9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IGZ1bmN0aW9uIFJlZmVyZW5jZShfcmVmKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBpbm5lclJlZiA9IF9yZWYuaW5uZXJSZWY7XG4gIHZhciBzZXRSZWZlcmVuY2VOb2RlID0gUmVhY3QudXNlQ29udGV4dChNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQpO1xuICB2YXIgcmVmSGFuZGxlciA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgc2V0UmVmKGlubmVyUmVmLCBub2RlKTtcbiAgICBzYWZlSW52b2tlKHNldFJlZmVyZW5jZU5vZGUsIG5vZGUpO1xuICB9LCBbaW5uZXJSZWYsIHNldFJlZmVyZW5jZU5vZGVdKTsgLy8gcmFuIG9uIHVubW91bnRcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzZXRSZWYoaW5uZXJSZWYsIG51bGwpO1xuICAgIH07XG4gIH0sIFtdKTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICB3YXJuaW5nKEJvb2xlYW4oc2V0UmVmZXJlbmNlTm9kZSksICdgUmVmZXJlbmNlYCBzaG91bGQgbm90IGJlIHVzZWQgb3V0c2lkZSBvZiBhIGBNYW5hZ2VyYCBjb21wb25lbnQuJyk7XG4gIH0sIFtzZXRSZWZlcmVuY2VOb2RlXSk7XG4gIHJldHVybiB1bndyYXBBcnJheShjaGlsZHJlbikoe1xuICAgIHJlZjogcmVmSGFuZGxlclxuICB9KTtcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIGFzIGRlZmF1bHRDcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdyZWFjdC1mYXN0LWNvbXBhcmUnO1xuaW1wb3J0IHsgZnJvbUVudHJpZXMsIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgfSBmcm9tICcuL3V0aWxzJztcbnZhciBFTVBUWV9NT0RJRklFUlMgPSBbXTtcbmV4cG9ydCB2YXIgdXNlUG9wcGVyID0gZnVuY3Rpb24gdXNlUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHBvcHBlckVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBwcmV2T3B0aW9ucyA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgdmFyIG9wdGlvbnNXaXRoRGVmYXVsdHMgPSB7XG4gICAgb25GaXJzdFVwZGF0ZTogb3B0aW9ucy5vbkZpcnN0VXBkYXRlLFxuICAgIHBsYWNlbWVudDogb3B0aW9ucy5wbGFjZW1lbnQgfHwgJ2JvdHRvbScsXG4gICAgc3RyYXRlZ3k6IG9wdGlvbnMuc3RyYXRlZ3kgfHwgJ2Fic29sdXRlJyxcbiAgICBtb2RpZmllcnM6IG9wdGlvbnMubW9kaWZpZXJzIHx8IEVNUFRZX01PRElGSUVSU1xuICB9O1xuXG4gIHZhciBfUmVhY3QkdXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgc3R5bGVzOiB7XG4gICAgICBwb3BwZXI6IHtcbiAgICAgICAgcG9zaXRpb246IG9wdGlvbnNXaXRoRGVmYXVsdHMuc3RyYXRlZ3ksXG4gICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgdG9wOiAnMCdcbiAgICAgIH0sXG4gICAgICBhcnJvdzoge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgfVxuICAgIH0sXG4gICAgYXR0cmlidXRlczoge31cbiAgfSksXG4gICAgICBzdGF0ZSA9IF9SZWFjdCR1c2VTdGF0ZVswXSxcbiAgICAgIHNldFN0YXRlID0gX1JlYWN0JHVzZVN0YXRlWzFdO1xuXG4gIHZhciB1cGRhdGVTdGF0ZU1vZGlmaWVyID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICd1cGRhdGVTdGF0ZScsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgcGhhc2U6ICd3cml0ZScsXG4gICAgICBmbjogZnVuY3Rpb24gZm4oX3JlZikge1xuICAgICAgICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICAgICAgICB2YXIgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cyk7XG4gICAgICAgIFJlYWN0RE9NLmZsdXNoU3luYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3R5bGVzOiBmcm9tRW50cmllcyhlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtlbGVtZW50LCBzdGF0ZS5zdHlsZXNbZWxlbWVudF0gfHwge31dO1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZnJvbUVudHJpZXMoZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBbZWxlbWVudCwgc3RhdGUuYXR0cmlidXRlc1tlbGVtZW50XV07XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcmVxdWlyZXM6IFsnY29tcHV0ZVN0eWxlcyddXG4gICAgfTtcbiAgfSwgW10pO1xuICB2YXIgcG9wcGVyT3B0aW9ucyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdPcHRpb25zID0ge1xuICAgICAgb25GaXJzdFVwZGF0ZTogb3B0aW9uc1dpdGhEZWZhdWx0cy5vbkZpcnN0VXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBvcHRpb25zV2l0aERlZmF1bHRzLnBsYWNlbWVudCxcbiAgICAgIHN0cmF0ZWd5OiBvcHRpb25zV2l0aERlZmF1bHRzLnN0cmF0ZWd5LFxuICAgICAgbW9kaWZpZXJzOiBbXS5jb25jYXQob3B0aW9uc1dpdGhEZWZhdWx0cy5tb2RpZmllcnMsIFt1cGRhdGVTdGF0ZU1vZGlmaWVyLCB7XG4gICAgICAgIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICB9XSlcbiAgICB9O1xuXG4gICAgaWYgKGlzRXF1YWwocHJldk9wdGlvbnMuY3VycmVudCwgbmV3T3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5jdXJyZW50IHx8IG5ld09wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZPcHRpb25zLmN1cnJlbnQgPSBuZXdPcHRpb25zO1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICB9LCBbb3B0aW9uc1dpdGhEZWZhdWx0cy5vbkZpcnN0VXBkYXRlLCBvcHRpb25zV2l0aERlZmF1bHRzLnBsYWNlbWVudCwgb3B0aW9uc1dpdGhEZWZhdWx0cy5zdHJhdGVneSwgb3B0aW9uc1dpdGhEZWZhdWx0cy5tb2RpZmllcnMsIHVwZGF0ZVN0YXRlTW9kaWZpZXJdKTtcbiAgdmFyIHBvcHBlckluc3RhbmNlUmVmID0gUmVhY3QudXNlUmVmKCk7XG4gIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmIChwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50KSB7XG4gICAgICBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50LnNldE9wdGlvbnMocG9wcGVyT3B0aW9ucyk7XG4gICAgfVxuICB9LCBbcG9wcGVyT3B0aW9uc10pO1xuICB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmVmZXJlbmNlRWxlbWVudCA9PSBudWxsIHx8IHBvcHBlckVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjcmVhdGVQb3BwZXIgPSBvcHRpb25zLmNyZWF0ZVBvcHBlciB8fCBkZWZhdWx0Q3JlYXRlUG9wcGVyO1xuICAgIHZhciBwb3BwZXJJbnN0YW5jZSA9IGNyZWF0ZVBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCBwb3BwZXJFbGVtZW50LCBwb3BwZXJPcHRpb25zKTtcbiAgICBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50ID0gcG9wcGVySW5zdGFuY2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBvcHBlckluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgIHBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtyZWZlcmVuY2VFbGVtZW50LCBwb3BwZXJFbGVtZW50LCBvcHRpb25zLmNyZWF0ZVBvcHBlcl0pO1xuICByZXR1cm4ge1xuICAgIHN0YXRlOiBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50ID8gcG9wcGVySW5zdGFuY2VSZWYuY3VycmVudC5zdGF0ZSA6IG51bGwsXG4gICAgc3R5bGVzOiBzdGF0ZS5zdHlsZXMsXG4gICAgYXR0cmlidXRlczogc3RhdGUuYXR0cmlidXRlcyxcbiAgICB1cGRhdGU6IHBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQgPyBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50LnVwZGF0ZSA6IG51bGwsXG4gICAgZm9yY2VVcGRhdGU6IHBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQgPyBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50LmZvcmNlVXBkYXRlIDogbnVsbFxuICB9O1xufTsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogVGFrZXMgYW4gYXJndW1lbnQgYW5kIGlmIGl0J3MgYW4gYXJyYXksIHJldHVybnMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGFycmF5LFxuICogb3RoZXJ3aXNlIHJldHVybnMgdGhlIGFyZ3VtZW50LiBVc2VkIGZvciBQcmVhY3QgY29tcGF0aWJpbGl0eS5cbiAqL1xuZXhwb3J0IHZhciB1bndyYXBBcnJheSA9IGZ1bmN0aW9uIHVud3JhcEFycmF5KGFyZykge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpID8gYXJnWzBdIDogYXJnO1xufTtcbi8qKlxuICogVGFrZXMgYSBtYXliZS11bmRlZmluZWQgZnVuY3Rpb24gYW5kIGFyYml0cmFyeSBhcmdzIGFuZCBpbnZva2VzIHRoZSBmdW5jdGlvblxuICogb25seSBpZiBpdCBpcyBkZWZpbmVkLlxuICovXG5cbmV4cG9ydCB2YXIgc2FmZUludm9rZSA9IGZ1bmN0aW9uIHNhZmVJbnZva2UoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICB9XG59O1xuLyoqXG4gKiBTZXRzIGEgcmVmIHVzaW5nIGVpdGhlciBhIHJlZiBjYWxsYmFjayBvciBhIHJlZiBvYmplY3RcbiAqL1xuXG5leHBvcnQgdmFyIHNldFJlZiA9IGZ1bmN0aW9uIHNldFJlZihyZWYsIG5vZGUpIHtcbiAgLy8gaWYgaXRzIGEgZnVuY3Rpb24gY2FsbCBpdFxuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBzYWZlSW52b2tlKHJlZiwgbm9kZSk7XG4gIH0gLy8gb3RoZXJ3aXNlIHdlIHNob3VsZCB0cmVhdCBpdCBhcyBhIHJlZiBvYmplY3RcbiAgZWxzZSBpZiAocmVmICE9IG51bGwpIHtcbiAgICAgIHJlZi5jdXJyZW50ID0gbm9kZTtcbiAgICB9XG59O1xuLyoqXG4gKiBTaW1wbGUgcG9ueWZpbGwgZm9yIE9iamVjdC5mcm9tRW50cmllc1xuICovXG5cbmV4cG9ydCB2YXIgZnJvbUVudHJpZXMgPSBmdW5jdGlvbiBmcm9tRW50cmllcyhlbnRyaWVzKSB7XG4gIHJldHVybiBlbnRyaWVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBfcmVmKSB7XG4gICAgdmFyIGtleSA9IF9yZWZbMF0sXG4gICAgICAgIHZhbHVlID0gX3JlZlsxXTtcbiAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG4vKipcbiAqIFNtYWxsIHdyYXBwZXIgYXJvdW5kIGB1c2VMYXlvdXRFZmZlY3RgIHRvIGdldCByaWQgb2YgdGhlIHdhcm5pbmcgb24gU1NSIGVudnNcbiAqL1xuXG5leHBvcnQgdmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiBSZWFjdC51c2VFZmZlY3Q7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9