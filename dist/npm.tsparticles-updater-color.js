"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-color"],{

/***/ "./node_modules/tsparticles-updater-color/esm/ColorUpdater.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-color/esm/ColorUpdater.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorUpdater": () => (/* binding */ ColorUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateColorValue(delta, value, valueAnimation, max, decrease) {
    var _a;
    const colorValue = value;
    if (!colorValue || !valueAnimation.enable) {
        return;
    }
    const offset = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(valueAnimation.offset);
    const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;
    if (!decrease || colorValue.status === 0) {
        colorValue.value += velocity;
        if (decrease && colorValue.value > max) {
            colorValue.status = 1;
            colorValue.value -= colorValue.value % max;
        }
    }
    else {
        colorValue.value -= velocity;
        if (colorValue.value < 0) {
            colorValue.status = 0;
            colorValue.value += colorValue.value;
        }
    }
    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}
function updateColor(particle, delta) {
    var _a, _b, _c;
    const animationOptions = particle.options.color.animation;
    if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
        updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
    }
    if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
        updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
    }
    if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
        updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
    }
}
class ColorUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const hslColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(particle.options.color, particle.id, particle.options.reduceDuplicates);
        if (hslColor) {
            particle.color = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getHslAnimationFromHsl)(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        var _a, _b, _c;
        const animationOptions = particle.options.color.animation;
        return (!particle.destroyed &&
            !particle.spawning &&
            ((((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && animationOptions.h.enable) ||
                (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && animationOptions.s.enable) ||
                (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && animationOptions.l.enable)));
    }
    update(particle, delta) {
        updateColor(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-color/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-updater-color/esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadColorUpdater": () => (/* binding */ loadColorUpdater)
/* harmony export */ });
/* harmony import */ var _ColorUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorUpdater */ "./node_modules/tsparticles-updater-color/esm/ColorUpdater.js");

async function loadColorUpdater(engine) {
    await engine.addParticleUpdater("color", (container) => new _ColorUpdater__WEBPACK_IMPORTED_MODULE_0__.ColorUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItY29sb3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlFQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhEQUFVO0FBQ25DO0FBQ0EsNkJBQTZCLDBFQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RDhDO0FBQ3ZDO0FBQ1AsZ0VBQWdFLHVEQUFZO0FBQzVFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItY29sb3IvZXNtL0NvbG9yVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1jb2xvci9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29sb3JUb0hzbCwgZ2V0SHNsQW5pbWF0aW9uRnJvbUhzbCwgcmFuZG9tSW5SYW5nZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmZ1bmN0aW9uIHVwZGF0ZUNvbG9yVmFsdWUoZGVsdGEsIHZhbHVlLCB2YWx1ZUFuaW1hdGlvbiwgbWF4LCBkZWNyZWFzZSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjb2xvclZhbHVlID0gdmFsdWU7XG4gICAgaWYgKCFjb2xvclZhbHVlIHx8ICF2YWx1ZUFuaW1hdGlvbi5lbmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSByYW5kb21JblJhbmdlKHZhbHVlQW5pbWF0aW9uLm9mZnNldCk7XG4gICAgY29uc3QgdmVsb2NpdHkgPSAoKF9hID0gdmFsdWUudmVsb2NpdHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApICogZGVsdGEuZmFjdG9yICsgb2Zmc2V0ICogMy42O1xuICAgIGlmICghZGVjcmVhc2UgfHwgY29sb3JWYWx1ZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSArPSB2ZWxvY2l0eTtcbiAgICAgICAgaWYgKGRlY3JlYXNlICYmIGNvbG9yVmFsdWUudmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIGNvbG9yVmFsdWUuc3RhdHVzID0gMTtcbiAgICAgICAgICAgIGNvbG9yVmFsdWUudmFsdWUgLT0gY29sb3JWYWx1ZS52YWx1ZSAlIG1heDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSAtPSB2ZWxvY2l0eTtcbiAgICAgICAgaWYgKGNvbG9yVmFsdWUudmFsdWUgPCAwKSB7XG4gICAgICAgICAgICBjb2xvclZhbHVlLnN0YXR1cyA9IDA7XG4gICAgICAgICAgICBjb2xvclZhbHVlLnZhbHVlICs9IGNvbG9yVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbG9yVmFsdWUudmFsdWUgPiBtYXgpIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSAlPSBtYXg7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ29sb3IocGFydGljbGUsIGRlbHRhKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgY29uc3QgYW5pbWF0aW9uT3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnMuY29sb3IuYW5pbWF0aW9uO1xuICAgIGlmICgoKF9hID0gcGFydGljbGUuY29sb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZUNvbG9yVmFsdWUoZGVsdGEsIHBhcnRpY2xlLmNvbG9yLmgsIGFuaW1hdGlvbk9wdGlvbnMuaCwgMzYwLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICgoKF9iID0gcGFydGljbGUuY29sb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZUNvbG9yVmFsdWUoZGVsdGEsIHBhcnRpY2xlLmNvbG9yLnMsIGFuaW1hdGlvbk9wdGlvbnMucywgMTAwLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCgoX2MgPSBwYXJ0aWNsZS5jb2xvcikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmwpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXBkYXRlQ29sb3JWYWx1ZShkZWx0YSwgcGFydGljbGUuY29sb3IubCwgYW5pbWF0aW9uT3B0aW9ucy5sLCAxMDAsIHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDb2xvclVwZGF0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgaW5pdChwYXJ0aWNsZSkge1xuICAgICAgICBjb25zdCBoc2xDb2xvciA9IGNvbG9yVG9Ic2wocGFydGljbGUub3B0aW9ucy5jb2xvciwgcGFydGljbGUuaWQsIHBhcnRpY2xlLm9wdGlvbnMucmVkdWNlRHVwbGljYXRlcyk7XG4gICAgICAgIGlmIChoc2xDb2xvcikge1xuICAgICAgICAgICAgcGFydGljbGUuY29sb3IgPSBnZXRIc2xBbmltYXRpb25Gcm9tSHNsKGhzbENvbG9yLCBwYXJ0aWNsZS5vcHRpb25zLmNvbG9yLmFuaW1hdGlvbiwgdGhpcy5jb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBhbmltYXRpb25PcHRpb25zID0gcGFydGljbGUub3B0aW9ucy5jb2xvci5hbmltYXRpb247XG4gICAgICAgIHJldHVybiAoIXBhcnRpY2xlLmRlc3Ryb3llZCAmJlxuICAgICAgICAgICAgIXBhcnRpY2xlLnNwYXduaW5nICYmXG4gICAgICAgICAgICAoKCgoX2EgPSBwYXJ0aWNsZS5jb2xvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmgudmFsdWUpICE9PSB1bmRlZmluZWQgJiYgYW5pbWF0aW9uT3B0aW9ucy5oLmVuYWJsZSkgfHxcbiAgICAgICAgICAgICAgICAoKChfYiA9IHBhcnRpY2xlLmNvbG9yKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iucy52YWx1ZSkgIT09IHVuZGVmaW5lZCAmJiBhbmltYXRpb25PcHRpb25zLnMuZW5hYmxlKSB8fFxuICAgICAgICAgICAgICAgICgoKF9jID0gcGFydGljbGUuY29sb3IpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sLnZhbHVlKSAhPT0gdW5kZWZpbmVkICYmIGFuaW1hdGlvbk9wdGlvbnMubC5lbmFibGUpKSk7XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICAgICAgdXBkYXRlQ29sb3IocGFydGljbGUsIGRlbHRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb2xvclVwZGF0ZXIgfSBmcm9tIFwiLi9Db2xvclVwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQ29sb3JVcGRhdGVyKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQYXJ0aWNsZVVwZGF0ZXIoXCJjb2xvclwiLCAoY29udGFpbmVyKSA9PiBuZXcgQ29sb3JVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9