"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-size"],{

/***/ "./node_modules/tsparticles-updater-size/esm/SizeUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-size/esm/SizeUpdater.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SizeUpdater": () => (/* binding */ SizeUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.size.animation.destroy) {
        case "max":
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case "min":
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
function updateSize(particle, delta) {
    var _a, _b, _c, _d;
    const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const minValue = particle.size.min;
    const maxValue = particle.size.max;
    if (particle.destroyed ||
        !particle.size.enable ||
        (((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0))) {
        return;
    }
    switch (particle.size.status) {
        case 0:
            if (particle.size.value >= maxValue) {
                particle.size.status = 1;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value += sizeVelocity;
            }
            break;
        case 1:
            if (particle.size.value <= minValue) {
                particle.size.status = 0;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value -= sizeVelocity;
            }
    }
    checkDestroy(particle, particle.size.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.size.value = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(particle.size.value, minValue, maxValue);
    }
}
class SizeUpdater {
    init() {
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        return (!particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            (((_a = particle.size.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 ||
                (((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0))));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateSize(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-size/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-size/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSizeUpdater": () => (/* binding */ loadSizeUpdater)
/* harmony export */ });
/* harmony import */ var _SizeUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SizeUpdater */ "./node_modules/tsparticles-updater-size/esm/SizeUpdater.js");

async function loadSizeUpdater(engine) {
    await engine.addParticleUpdater("size", () => new _SizeUpdater__WEBPACK_IMPORTED_MODULE_0__.SizeUpdater());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItc2l6ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIseURBQUs7QUFDbkM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFNEM7QUFDckM7QUFDUCxzREFBc0QscURBQVc7QUFDakUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1zaXplL2VzbS9TaXplVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1zaXplL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGFtcCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmZ1bmN0aW9uIGNoZWNrRGVzdHJveShwYXJ0aWNsZSwgdmFsdWUsIG1pblZhbHVlLCBtYXhWYWx1ZSkge1xuICAgIHN3aXRjaCAocGFydGljbGUub3B0aW9ucy5zaXplLmFuaW1hdGlvbi5kZXN0cm95KSB7XG4gICAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gbWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVTaXplKHBhcnRpY2xlLCBkZWx0YSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCBzaXplVmVsb2NpdHkgPSAoKF9hID0gcGFydGljbGUuc2l6ZS52ZWxvY2l0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCkgKiBkZWx0YS5mYWN0b3I7XG4gICAgY29uc3QgbWluVmFsdWUgPSBwYXJ0aWNsZS5zaXplLm1pbjtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHBhcnRpY2xlLnNpemUubWF4O1xuICAgIGlmIChwYXJ0aWNsZS5kZXN0cm95ZWQgfHxcbiAgICAgICAgIXBhcnRpY2xlLnNpemUuZW5hYmxlIHx8XG4gICAgICAgICgoKF9iID0gcGFydGljbGUuc2l6ZS5tYXhMb29wcykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCkgPiAwICYmICgoX2MgPSBwYXJ0aWNsZS5zaXplLmxvb3BzKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAwKSA+ICgoX2QgPSBwYXJ0aWNsZS5zaXplLm1heExvb3BzKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAwKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHBhcnRpY2xlLnNpemUuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaXplLnZhbHVlID49IG1heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgIGlmICghcGFydGljbGUuc2l6ZS5sb29wcykge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLmxvb3BzID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS5sb29wcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS52YWx1ZSArPSBzaXplVmVsb2NpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNpemUudmFsdWUgPD0gbWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNsZS5zaXplLmxvb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUubG9vcHMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLmxvb3BzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnZhbHVlIC09IHNpemVWZWxvY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tEZXN0cm95KHBhcnRpY2xlLCBwYXJ0aWNsZS5zaXplLnZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgIGlmICghcGFydGljbGUuZGVzdHJveWVkKSB7XG4gICAgICAgIHBhcnRpY2xlLnNpemUudmFsdWUgPSBjbGFtcChwYXJ0aWNsZS5zaXplLnZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTaXplVXBkYXRlciB7XG4gICAgaW5pdCgpIHtcbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgcmV0dXJuICghcGFydGljbGUuZGVzdHJveWVkICYmXG4gICAgICAgICAgICAhcGFydGljbGUuc3Bhd25pbmcgJiZcbiAgICAgICAgICAgIHBhcnRpY2xlLnNpemUuZW5hYmxlICYmXG4gICAgICAgICAgICAoKChfYSA9IHBhcnRpY2xlLnNpemUubWF4TG9vcHMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApIDw9IDAgfHxcbiAgICAgICAgICAgICAgICAoKChfYiA9IHBhcnRpY2xlLnNpemUubWF4TG9vcHMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDApID4gMCAmJiAoKF9jID0gcGFydGljbGUuc2l6ZS5sb29wcykgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCkgPCAoKF9kID0gcGFydGljbGUuc2l6ZS5tYXhMb29wcykgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMCkpKSk7XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZChwYXJ0aWNsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVTaXplKHBhcnRpY2xlLCBkZWx0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2l6ZVVwZGF0ZXIgfSBmcm9tIFwiLi9TaXplVXBkYXRlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTaXplVXBkYXRlcihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGFydGljbGVVcGRhdGVyKFwic2l6ZVwiLCAoKSA9PiBuZXcgU2l6ZVVwZGF0ZXIoKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=