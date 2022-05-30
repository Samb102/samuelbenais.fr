"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-twinkle"],{

/***/ "./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TwinkleUpdater": () => (/* binding */ TwinkleUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class TwinkleUpdater {
    getColorStyles(particle, context, radius, opacity) {
        const pOptions = particle.options, twinkle = pOptions.twinkle.particles, twinkling = twinkle.enable && Math.random() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(twinkle.color), twinkleStyle = twinkleRgb ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl)(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;
        return res;
    }
    init() {
    }
    isEnabled(particle) {
        return particle.options.twinkle.particles.enable;
    }
    update() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-twinkle/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadTwinkleUpdater": () => (/* binding */ loadTwinkleUpdater)
/* harmony export */ });
/* harmony import */ var _TwinkleUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwinkleUpdater */ "./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js");

async function loadTwinkleUpdater(engine) {
    await engine.addParticleUpdater("twinkle", () => new _TwinkleUpdater__WEBPACK_IMPORTED_MODULE_0__.TwinkleUpdater());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItdHdpbmtsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFnRjtBQUN6RTtBQUNQO0FBQ0EscVNBQXFTLGlFQUFhLDJEQUEyRCw4REFBVSw2Q0FBNkMsbUVBQWUsb0RBQW9EO0FBQ3ZlO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZrRDtBQUMzQztBQUNQLHlEQUF5RCwyREFBYztBQUN2RSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy11cGRhdGVyLXR3aW5rbGUvZXNtL1R3aW5rbGVVcGRhdGVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy11cGRhdGVyLXR3aW5rbGUvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbG9yVG9Ic2wsIGdldFJhbmdlVmFsdWUsIGdldFN0eWxlRnJvbUhzbCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBUd2lua2xlVXBkYXRlciB7XG4gICAgZ2V0Q29sb3JTdHlsZXMocGFydGljbGUsIGNvbnRleHQsIHJhZGl1cywgb3BhY2l0eSkge1xuICAgICAgICBjb25zdCBwT3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnMsIHR3aW5rbGUgPSBwT3B0aW9ucy50d2lua2xlLnBhcnRpY2xlcywgdHdpbmtsaW5nID0gdHdpbmtsZS5lbmFibGUgJiYgTWF0aC5yYW5kb20oKSA8IHR3aW5rbGUuZnJlcXVlbmN5LCB6SW5kZXhPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy56SW5kZXgsIHpPcGFjaXR5RmFjdG9yID0gKDEgLSBwYXJ0aWNsZS56SW5kZXhGYWN0b3IpICoqIHpJbmRleE9wdGlvbnMub3BhY2l0eVJhdGUsIHR3aW5rbGluZ09wYWNpdHkgPSB0d2lua2xpbmcgPyBnZXRSYW5nZVZhbHVlKHR3aW5rbGUub3BhY2l0eSkgKiB6T3BhY2l0eUZhY3RvciA6IG9wYWNpdHksIHR3aW5rbGVSZ2IgPSBjb2xvclRvSHNsKHR3aW5rbGUuY29sb3IpLCB0d2lua2xlU3R5bGUgPSB0d2lua2xlUmdiID8gZ2V0U3R5bGVGcm9tSHNsKHR3aW5rbGVSZ2IsIHR3aW5rbGluZ09wYWNpdHkpIDogdW5kZWZpbmVkLCByZXMgPSB7fSwgbmVlZHNUd2lua2xlID0gdHdpbmtsaW5nICYmIHR3aW5rbGVTdHlsZTtcbiAgICAgICAgcmVzLmZpbGwgPSBuZWVkc1R3aW5rbGUgPyB0d2lua2xlU3R5bGUgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJlcy5zdHJva2UgPSBuZWVkc1R3aW5rbGUgPyB0d2lua2xlU3R5bGUgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICByZXR1cm4gcGFydGljbGUub3B0aW9ucy50d2lua2xlLnBhcnRpY2xlcy5lbmFibGU7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBUd2lua2xlVXBkYXRlciB9IGZyb20gXCIuL1R3aW5rbGVVcGRhdGVyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFR3aW5rbGVVcGRhdGVyKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQYXJ0aWNsZVVwZGF0ZXIoXCJ0d2lua2xlXCIsICgpID0+IG5ldyBUd2lua2xlVXBkYXRlcigpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==