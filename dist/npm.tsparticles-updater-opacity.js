"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-opacity"],{

/***/ "./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpacityUpdater": () => (/* binding */ OpacityUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.opacity.animation.destroy) {
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
function updateOpacity(particle, delta) {
    var _a, _b, _c, _d, _e;
    if (!particle.opacity) {
        return;
    }
    const minValue = particle.opacity.min;
    const maxValue = particle.opacity.max;
    if (particle.destroyed ||
        !particle.opacity.enable ||
        (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) > 0 && ((_b = particle.opacity.loops) !== null && _b !== void 0 ? _b : 0) > ((_c = particle.opacity.maxLoops) !== null && _c !== void 0 ? _c : 0))) {
        return;
    }
    switch (particle.opacity.status) {
        case 0:
            if (particle.opacity.value >= maxValue) {
                particle.opacity.status = 1;
                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }
                particle.opacity.loops++;
            }
            else {
                particle.opacity.value += ((_d = particle.opacity.velocity) !== null && _d !== void 0 ? _d : 0) * delta.factor;
            }
            break;
        case 1:
            if (particle.opacity.value <= minValue) {
                particle.opacity.status = 0;
                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }
                particle.opacity.loops++;
            }
            else {
                particle.opacity.value -= ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
            }
            break;
    }
    checkDestroy(particle, particle.opacity.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.opacity.value = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(particle.opacity.value, minValue, maxValue);
    }
}
class OpacityUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const opacityOptions = particle.options.opacity;
        particle.opacity = {
            enable: opacityOptions.animation.enable,
            max: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(opacityOptions.value),
            min: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(opacityOptions.value),
            value: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(opacityOptions.value),
            loops: 0,
            maxLoops: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(opacityOptions.animation.count),
        };
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            particle.opacity.status = 0;
            const opacityRange = opacityOptions.value;
            particle.opacity.min = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(opacityRange);
            particle.opacity.max = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(opacityRange);
            switch (opacityAnimation.startValue) {
                case "min":
                    particle.opacity.value = particle.opacity.min;
                    particle.opacity.status = 0;
                    break;
                case "random":
                    particle.opacity.value = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(particle.opacity);
                    particle.opacity.status =
                        Math.random() >= 0.5 ? 0 : 1;
                    break;
                case "max":
                default:
                    particle.opacity.value = particle.opacity.max;
                    particle.opacity.status = 1;
                    break;
            }
            particle.opacity.velocity =
                ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(opacityAnimation.speed) / 100) * this.container.retina.reduceFactor;
            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= Math.random();
            }
        }
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        return (!particle.destroyed &&
            !particle.spawning &&
            !!particle.opacity &&
            particle.opacity.enable &&
            (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 ||
                (((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 &&
                    ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0))));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateOpacity(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-opacity/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-updater-opacity/esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadOpacityUpdater": () => (/* binding */ loadOpacityUpdater)
/* harmony export */ });
/* harmony import */ var _OpacityUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OpacityUpdater */ "./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js");

async function loadOpacityUpdater(engine) {
    await engine.addParticleUpdater("opacity", (container) => new _OpacityUpdater__WEBPACK_IMPORTED_MODULE_0__.OpacityUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItb3BhY2l0eS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFvRztBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMseURBQUs7QUFDdEM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0RBQVc7QUFDNUIsaUJBQWlCLCtEQUFXO0FBQzVCLG1CQUFtQixpRUFBYTtBQUNoQztBQUNBLHNCQUFzQixpRUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtEQUFXO0FBQzlDLG1DQUFtQywrREFBVztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsaUVBQWE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUVBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySGtEO0FBQzNDO0FBQ1Asa0VBQWtFLDJEQUFjO0FBQ2hGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItb3BhY2l0eS9lc20vT3BhY2l0eVVwZGF0ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItb3BhY2l0eS9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xhbXAsIGdldFJhbmdlTWF4LCBnZXRSYW5nZU1pbiwgZ2V0UmFuZ2VWYWx1ZSwgcmFuZG9tSW5SYW5nZSwgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5mdW5jdGlvbiBjaGVja0Rlc3Ryb3kocGFydGljbGUsIHZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpIHtcbiAgICBzd2l0Y2ggKHBhcnRpY2xlLm9wdGlvbnMub3BhY2l0eS5hbmltYXRpb24uZGVzdHJveSkge1xuICAgICAgICBjYXNlIFwibWF4XCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gbWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgICAgICAgaWYgKHZhbHVlIDw9IG1pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlT3BhY2l0eShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgIGlmICghcGFydGljbGUub3BhY2l0eSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1pblZhbHVlID0gcGFydGljbGUub3BhY2l0eS5taW47XG4gICAgY29uc3QgbWF4VmFsdWUgPSBwYXJ0aWNsZS5vcGFjaXR5Lm1heDtcbiAgICBpZiAocGFydGljbGUuZGVzdHJveWVkIHx8XG4gICAgICAgICFwYXJ0aWNsZS5vcGFjaXR5LmVuYWJsZSB8fFxuICAgICAgICAoKChfYSA9IHBhcnRpY2xlLm9wYWNpdHkubWF4TG9vcHMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApID4gMCAmJiAoKF9iID0gcGFydGljbGUub3BhY2l0eS5sb29wcykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCkgPiAoKF9jID0gcGFydGljbGUub3BhY2l0eS5tYXhMb29wcykgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChwYXJ0aWNsZS5vcGFjaXR5LnN0YXR1cykge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAocGFydGljbGUub3BhY2l0eS52YWx1ZSA+PSBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnRpY2xlLm9wYWNpdHkubG9vcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS5sb29wcyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkubG9vcHMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkudmFsdWUgKz0gKChfZCA9IHBhcnRpY2xlLm9wYWNpdHkudmVsb2NpdHkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDApICogZGVsdGEuZmFjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlIDw9IG1pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgIGlmICghcGFydGljbGUub3BhY2l0eS5sb29wcykge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5Lmxvb3BzID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS5sb29wcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS52YWx1ZSAtPSAoKF9lID0gcGFydGljbGUub3BhY2l0eS52ZWxvY2l0eSkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMCkgKiBkZWx0YS5mYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY2hlY2tEZXN0cm95KHBhcnRpY2xlLCBwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgIGlmICghcGFydGljbGUuZGVzdHJveWVkKSB7XG4gICAgICAgIHBhcnRpY2xlLm9wYWNpdHkudmFsdWUgPSBjbGFtcChwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBPcGFjaXR5VXBkYXRlciB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cbiAgICBpbml0KHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IG9wYWNpdHlPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy5vcGFjaXR5O1xuICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5ID0ge1xuICAgICAgICAgICAgZW5hYmxlOiBvcGFjaXR5T3B0aW9ucy5hbmltYXRpb24uZW5hYmxlLFxuICAgICAgICAgICAgbWF4OiBnZXRSYW5nZU1heChvcGFjaXR5T3B0aW9ucy52YWx1ZSksXG4gICAgICAgICAgICBtaW46IGdldFJhbmdlTWluKG9wYWNpdHlPcHRpb25zLnZhbHVlKSxcbiAgICAgICAgICAgIHZhbHVlOiBnZXRSYW5nZVZhbHVlKG9wYWNpdHlPcHRpb25zLnZhbHVlKSxcbiAgICAgICAgICAgIGxvb3BzOiAwLFxuICAgICAgICAgICAgbWF4TG9vcHM6IGdldFJhbmdlVmFsdWUob3BhY2l0eU9wdGlvbnMuYW5pbWF0aW9uLmNvdW50KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb3BhY2l0eUFuaW1hdGlvbiA9IG9wYWNpdHlPcHRpb25zLmFuaW1hdGlvbjtcbiAgICAgICAgaWYgKG9wYWNpdHlBbmltYXRpb24uZW5hYmxlKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5LnN0YXR1cyA9IDA7XG4gICAgICAgICAgICBjb25zdCBvcGFjaXR5UmFuZ2UgPSBvcGFjaXR5T3B0aW9ucy52YWx1ZTtcbiAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkubWluID0gZ2V0UmFuZ2VNaW4ob3BhY2l0eVJhbmdlKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkubWF4ID0gZ2V0UmFuZ2VNYXgob3BhY2l0eVJhbmdlKTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BhY2l0eUFuaW1hdGlvbi5zdGFydFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlID0gcGFydGljbGUub3BhY2l0eS5taW47XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkuc3RhdHVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhbmRvbVwiOlxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlID0gcmFuZG9tSW5SYW5nZShwYXJ0aWNsZS5vcGFjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS5zdGF0dXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSA+PSAwLjUgPyAwIDogMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkudmFsdWUgPSBwYXJ0aWNsZS5vcGFjaXR5Lm1heDtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUub3BhY2l0eS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkudmVsb2NpdHkgPVxuICAgICAgICAgICAgICAgIChnZXRSYW5nZVZhbHVlKG9wYWNpdHlBbmltYXRpb24uc3BlZWQpIC8gMTAwKSAqIHRoaXMuY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3I7XG4gICAgICAgICAgICBpZiAoIW9wYWNpdHlBbmltYXRpb24uc3luYykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLm9wYWNpdHkudmVsb2NpdHkgKj0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0VuYWJsZWQocGFydGljbGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICByZXR1cm4gKCFwYXJ0aWNsZS5kZXN0cm95ZWQgJiZcbiAgICAgICAgICAgICFwYXJ0aWNsZS5zcGF3bmluZyAmJlxuICAgICAgICAgICAgISFwYXJ0aWNsZS5vcGFjaXR5ICYmXG4gICAgICAgICAgICBwYXJ0aWNsZS5vcGFjaXR5LmVuYWJsZSAmJlxuICAgICAgICAgICAgKCgoX2EgPSBwYXJ0aWNsZS5vcGFjaXR5Lm1heExvb3BzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSA8PSAwIHx8XG4gICAgICAgICAgICAgICAgKCgoX2IgPSBwYXJ0aWNsZS5vcGFjaXR5Lm1heExvb3BzKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwKSA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IHBhcnRpY2xlLm9wYWNpdHkubG9vcHMpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IDApIDwgKChfZCA9IHBhcnRpY2xlLm9wYWNpdHkubWF4TG9vcHMpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDApKSkpO1xuICAgIH1cbiAgICB1cGRhdGUocGFydGljbGUsIGRlbHRhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlT3BhY2l0eShwYXJ0aWNsZSwgZGVsdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wYWNpdHlVcGRhdGVyIH0gZnJvbSBcIi4vT3BhY2l0eVVwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkT3BhY2l0eVVwZGF0ZXIoZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZFBhcnRpY2xlVXBkYXRlcihcIm9wYWNpdHlcIiwgKGNvbnRhaW5lcikgPT4gbmV3IE9wYWNpdHlVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9