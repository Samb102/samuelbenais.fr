"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-stroke-color"],{

/***/ "./node_modules/tsparticles-updater-stroke-color/esm/StrokeColorUpdater.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-stroke-color/esm/StrokeColorUpdater.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StrokeColorUpdater": () => (/* binding */ StrokeColorUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateColorValue(delta, value, valueAnimation, max, decrease) {
    var _a;
    const colorValue = value;
    if (!colorValue || !colorValue.enable) {
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
function updateStrokeColor(particle, delta) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
        return;
    }
    const animationOptions = particle.stroke.color.animation;
    const h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;
    if (h) {
        updateColorValue(delta, h, animationOptions.h, 360, false);
    }
    const s = (_f = (_e = particle.strokeColor) === null || _e === void 0 ? void 0 : _e.s) !== null && _f !== void 0 ? _f : (_g = particle.color) === null || _g === void 0 ? void 0 : _g.s;
    if (s) {
        updateColorValue(delta, s, animationOptions.s, 100, true);
    }
    const l = (_j = (_h = particle.strokeColor) === null || _h === void 0 ? void 0 : _h.l) !== null && _j !== void 0 ? _j : (_k = particle.color) === null || _k === void 0 ? void 0 : _k.l;
    if (l) {
        updateColorValue(delta, l, animationOptions.l, 100, true);
    }
}
class StrokeColorUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        var _a, _b;
        const container = this.container;
        particle.stroke =
            particle.options.stroke instanceof Array
                ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)(particle.options.stroke, particle.id, particle.options.reduceDuplicates)
                : particle.options.stroke;
        particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
        const strokeHslColor = (_a = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();
        if (strokeHslColor) {
            particle.strokeColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getHslAnimationFromHsl)(strokeHslColor, (_b = particle.stroke.color) === null || _b === void 0 ? void 0 : _b.animation, container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        const color = (_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color;
        return (!particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h.value) !== undefined && color.animation.h.enable) ||
                (((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.s.value) !== undefined && color.animation.s.enable) ||
                (((_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.l.value) !== undefined && color.animation.l.enable)));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateStrokeColor(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-stroke-color/esm/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-stroke-color/esm/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadStrokeColorUpdater": () => (/* binding */ loadStrokeColorUpdater)
/* harmony export */ });
/* harmony import */ var _StrokeColorUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StrokeColorUpdater */ "./node_modules/tsparticles-updater-stroke-color/esm/StrokeColorUpdater.js");

async function loadStrokeColorUpdater(engine) {
    await engine.addParticleUpdater("strokeColor", (container) => new _StrokeColorUpdater__WEBPACK_IMPORTED_MODULE_0__.StrokeColorUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItc3Ryb2tlLWNvbG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpRUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlFQUFhO0FBQy9CO0FBQ0E7QUFDQSxxQ0FBcUMsOERBQVU7QUFDL0M7QUFDQSxtQ0FBbUMsMEVBQXNCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0UwRDtBQUNuRDtBQUNQLHNFQUFzRSxtRUFBa0I7QUFDeEYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1zdHJva2UtY29sb3IvZXNtL1N0cm9rZUNvbG9yVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1zdHJva2UtY29sb3IvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbG9yVG9Ic2wsIGdldEhzbEFuaW1hdGlvbkZyb21Ic2wsIGl0ZW1Gcm9tQXJyYXksIHJhbmRvbUluUmFuZ2UgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5mdW5jdGlvbiB1cGRhdGVDb2xvclZhbHVlKGRlbHRhLCB2YWx1ZSwgdmFsdWVBbmltYXRpb24sIG1heCwgZGVjcmVhc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgY29sb3JWYWx1ZSA9IHZhbHVlO1xuICAgIGlmICghY29sb3JWYWx1ZSB8fCAhY29sb3JWYWx1ZS5lbmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSByYW5kb21JblJhbmdlKHZhbHVlQW5pbWF0aW9uLm9mZnNldCk7XG4gICAgY29uc3QgdmVsb2NpdHkgPSAoKF9hID0gdmFsdWUudmVsb2NpdHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApICogZGVsdGEuZmFjdG9yICsgb2Zmc2V0ICogMy42O1xuICAgIGlmICghZGVjcmVhc2UgfHwgY29sb3JWYWx1ZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSArPSB2ZWxvY2l0eTtcbiAgICAgICAgaWYgKGRlY3JlYXNlICYmIGNvbG9yVmFsdWUudmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIGNvbG9yVmFsdWUuc3RhdHVzID0gMTtcbiAgICAgICAgICAgIGNvbG9yVmFsdWUudmFsdWUgLT0gY29sb3JWYWx1ZS52YWx1ZSAlIG1heDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSAtPSB2ZWxvY2l0eTtcbiAgICAgICAgaWYgKGNvbG9yVmFsdWUudmFsdWUgPCAwKSB7XG4gICAgICAgICAgICBjb2xvclZhbHVlLnN0YXR1cyA9IDA7XG4gICAgICAgICAgICBjb2xvclZhbHVlLnZhbHVlICs9IGNvbG9yVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbG9yVmFsdWUudmFsdWUgPiBtYXgpIHtcbiAgICAgICAgY29sb3JWYWx1ZS52YWx1ZSAlPSBtYXg7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlU3Ryb2tlQ29sb3IocGFydGljbGUsIGRlbHRhKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xuICAgIGlmICghKChfYSA9IHBhcnRpY2xlLnN0cm9rZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbG9yKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbk9wdGlvbnMgPSBwYXJ0aWNsZS5zdHJva2UuY29sb3IuYW5pbWF0aW9uO1xuICAgIGNvbnN0IGggPSAoX2MgPSAoX2IgPSBwYXJ0aWNsZS5zdHJva2VDb2xvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmgpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IChfZCA9IHBhcnRpY2xlLmNvbG9yKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaDtcbiAgICBpZiAoaCkge1xuICAgICAgICB1cGRhdGVDb2xvclZhbHVlKGRlbHRhLCBoLCBhbmltYXRpb25PcHRpb25zLmgsIDM2MCwgZmFsc2UpO1xuICAgIH1cbiAgICBjb25zdCBzID0gKF9mID0gKF9lID0gcGFydGljbGUuc3Ryb2tlQ29sb3IpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5zKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAoX2cgPSBwYXJ0aWNsZS5jb2xvcikgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnM7XG4gICAgaWYgKHMpIHtcbiAgICAgICAgdXBkYXRlQ29sb3JWYWx1ZShkZWx0YSwgcywgYW5pbWF0aW9uT3B0aW9ucy5zLCAxMDAsIHRydWUpO1xuICAgIH1cbiAgICBjb25zdCBsID0gKF9qID0gKF9oID0gcGFydGljbGUuc3Ryb2tlQ29sb3IpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5sKSAhPT0gbnVsbCAmJiBfaiAhPT0gdm9pZCAwID8gX2ogOiAoX2sgPSBwYXJ0aWNsZS5jb2xvcikgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLmw7XG4gICAgaWYgKGwpIHtcbiAgICAgICAgdXBkYXRlQ29sb3JWYWx1ZShkZWx0YSwgbCwgYW5pbWF0aW9uT3B0aW9ucy5sLCAxMDAsIHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTdHJva2VDb2xvclVwZGF0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgaW5pdChwYXJ0aWNsZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgcGFydGljbGUuc3Ryb2tlID1cbiAgICAgICAgICAgIHBhcnRpY2xlLm9wdGlvbnMuc3Ryb2tlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICA/IGl0ZW1Gcm9tQXJyYXkocGFydGljbGUub3B0aW9ucy5zdHJva2UsIHBhcnRpY2xlLmlkLCBwYXJ0aWNsZS5vcHRpb25zLnJlZHVjZUR1cGxpY2F0ZXMpXG4gICAgICAgICAgICAgICAgOiBwYXJ0aWNsZS5vcHRpb25zLnN0cm9rZTtcbiAgICAgICAgcGFydGljbGUuc3Ryb2tlV2lkdGggPSBwYXJ0aWNsZS5zdHJva2Uud2lkdGggKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW87XG4gICAgICAgIGNvbnN0IHN0cm9rZUhzbENvbG9yID0gKF9hID0gY29sb3JUb0hzbChwYXJ0aWNsZS5zdHJva2UuY29sb3IpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwYXJ0aWNsZS5nZXRGaWxsQ29sb3IoKTtcbiAgICAgICAgaWYgKHN0cm9rZUhzbENvbG9yKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zdHJva2VDb2xvciA9IGdldEhzbEFuaW1hdGlvbkZyb21Ic2woc3Ryb2tlSHNsQ29sb3IsIChfYiA9IHBhcnRpY2xlLnN0cm9rZS5jb2xvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFuaW1hdGlvbiwgY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKF9hID0gcGFydGljbGUuc3Ryb2tlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29sb3I7XG4gICAgICAgIHJldHVybiAoIXBhcnRpY2xlLmRlc3Ryb3llZCAmJlxuICAgICAgICAgICAgIXBhcnRpY2xlLnNwYXduaW5nICYmXG4gICAgICAgICAgICAhIWNvbG9yICYmXG4gICAgICAgICAgICAoKCgoX2IgPSBwYXJ0aWNsZS5zdHJva2VDb2xvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmgudmFsdWUpICE9PSB1bmRlZmluZWQgJiYgY29sb3IuYW5pbWF0aW9uLmguZW5hYmxlKSB8fFxuICAgICAgICAgICAgICAgICgoKF9jID0gcGFydGljbGUuc3Ryb2tlQ29sb3IpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5zLnZhbHVlKSAhPT0gdW5kZWZpbmVkICYmIGNvbG9yLmFuaW1hdGlvbi5zLmVuYWJsZSkgfHxcbiAgICAgICAgICAgICAgICAoKChfZCA9IHBhcnRpY2xlLnN0cm9rZUNvbG9yKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QubC52YWx1ZSkgIT09IHVuZGVmaW5lZCAmJiBjb2xvci5hbmltYXRpb24ubC5lbmFibGUpKSk7XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZChwYXJ0aWNsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVTdHJva2VDb2xvcihwYXJ0aWNsZSwgZGVsdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN0cm9rZUNvbG9yVXBkYXRlciB9IGZyb20gXCIuL1N0cm9rZUNvbG9yVXBkYXRlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTdHJva2VDb2xvclVwZGF0ZXIoZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZFBhcnRpY2xlVXBkYXRlcihcInN0cm9rZUNvbG9yXCIsIChjb250YWluZXIpID0+IG5ldyBTdHJva2VDb2xvclVwZGF0ZXIoY29udGFpbmVyKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=