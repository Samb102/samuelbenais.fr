"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-tilt"],{

/***/ "./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TiltUpdater": () => (/* binding */ TiltUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateTilt(particle, delta) {
    var _a;
    if (!particle.tilt) {
        return;
    }
    const tilt = particle.options.tilt;
    const tiltAnimation = tilt.animation;
    const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const max = 2 * Math.PI;
    if (!tiltAnimation.enable) {
        return;
    }
    switch (particle.tilt.status) {
        case 0:
            particle.tilt.value += speed;
            if (particle.tilt.value > max) {
                particle.tilt.value -= max;
            }
            break;
        case 1:
        default:
            particle.tilt.value -= speed;
            if (particle.tilt.value < 0) {
                particle.tilt.value += max;
            }
            break;
    }
}
class TiltUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const tiltOptions = particle.options.tilt;
        particle.tilt = {
            enable: tiltOptions.enable,
            value: ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(tiltOptions.value) * Math.PI) / 180,
            sinDirection: Math.random() >= 0.5 ? 1 : -1,
            cosDirection: Math.random() >= 0.5 ? 1 : -1,
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === "random") {
            const index = Math.floor(Math.random() * 2);
            tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (tiltDirection) {
            case "counter-clockwise":
            case "counterClockwise":
                particle.tilt.status = 1;
                break;
            case "clockwise":
                particle.tilt.status = 0;
                break;
        }
        const tiltAnimation = particle.options.tilt.animation;
        if (tiltAnimation.enable) {
            particle.tilt.velocity = ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(tiltAnimation.speed) / 360) * this.container.retina.reduceFactor;
            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= Math.random();
            }
        }
    }
    isEnabled(particle) {
        const tilt = particle.options.tilt;
        const tiltAnimation = tilt.animation;
        return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateTilt(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-tilt/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadTiltUpdater": () => (/* binding */ loadTiltUpdater)
/* harmony export */ });
/* harmony import */ var _TiltUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TiltUpdater */ "./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js");

async function loadTiltUpdater(engine) {
    await engine.addParticleUpdater("tilt", (container) => new _TiltUpdater__WEBPACK_IMPORTED_MODULE_0__.TiltUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItdGlsdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUVBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsaUVBQWE7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFFNEM7QUFDckM7QUFDUCwrREFBK0QscURBQVc7QUFDMUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci10aWx0L2VzbS9UaWx0VXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci10aWx0L2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZnVuY3Rpb24gdXBkYXRlVGlsdChwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFwYXJ0aWNsZS50aWx0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGlsdCA9IHBhcnRpY2xlLm9wdGlvbnMudGlsdDtcbiAgICBjb25zdCB0aWx0QW5pbWF0aW9uID0gdGlsdC5hbmltYXRpb247XG4gICAgY29uc3Qgc3BlZWQgPSAoKF9hID0gcGFydGljbGUudGlsdC52ZWxvY2l0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCkgKiBkZWx0YS5mYWN0b3I7XG4gICAgY29uc3QgbWF4ID0gMiAqIE1hdGguUEk7XG4gICAgaWYgKCF0aWx0QW5pbWF0aW9uLmVuYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAocGFydGljbGUudGlsdC5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcGFydGljbGUudGlsdC52YWx1ZSArPSBzcGVlZDtcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS50aWx0LnZhbHVlID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudGlsdC52YWx1ZSAtPSBtYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFydGljbGUudGlsdC52YWx1ZSAtPSBzcGVlZDtcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS50aWx0LnZhbHVlIDwgMCkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnRpbHQudmFsdWUgKz0gbWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFRpbHRVcGRhdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIGluaXQocGFydGljbGUpIHtcbiAgICAgICAgY29uc3QgdGlsdE9wdGlvbnMgPSBwYXJ0aWNsZS5vcHRpb25zLnRpbHQ7XG4gICAgICAgIHBhcnRpY2xlLnRpbHQgPSB7XG4gICAgICAgICAgICBlbmFibGU6IHRpbHRPcHRpb25zLmVuYWJsZSxcbiAgICAgICAgICAgIHZhbHVlOiAoZ2V0UmFuZ2VWYWx1ZSh0aWx0T3B0aW9ucy52YWx1ZSkgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgICAgICAgIHNpbkRpcmVjdGlvbjogTWF0aC5yYW5kb20oKSA+PSAwLjUgPyAxIDogLTEsXG4gICAgICAgICAgICBjb3NEaXJlY3Rpb246IE1hdGgucmFuZG9tKCkgPj0gMC41ID8gMSA6IC0xLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgdGlsdERpcmVjdGlvbiA9IHRpbHRPcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgaWYgKHRpbHREaXJlY3Rpb24gPT09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICB0aWx0RGlyZWN0aW9uID0gaW5kZXggPiAwID8gXCJjb3VudGVyLWNsb2Nrd2lzZVwiIDogXCJjbG9ja3dpc2VcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRpbHREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJjb3VudGVyLWNsb2Nrd2lzZVwiOlxuICAgICAgICAgICAgY2FzZSBcImNvdW50ZXJDbG9ja3dpc2VcIjpcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS50aWx0LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvY2t3aXNlXCI6XG4gICAgICAgICAgICAgICAgcGFydGljbGUudGlsdC5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpbHRBbmltYXRpb24gPSBwYXJ0aWNsZS5vcHRpb25zLnRpbHQuYW5pbWF0aW9uO1xuICAgICAgICBpZiAodGlsdEFuaW1hdGlvbi5lbmFibGUpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnRpbHQudmVsb2NpdHkgPSAoZ2V0UmFuZ2VWYWx1ZSh0aWx0QW5pbWF0aW9uLnNwZWVkKSAvIDM2MCkgKiB0aGlzLmNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yO1xuICAgICAgICAgICAgaWYgKCF0aWx0QW5pbWF0aW9uLnN5bmMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS50aWx0LnZlbG9jaXR5ICo9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IHRpbHQgPSBwYXJ0aWNsZS5vcHRpb25zLnRpbHQ7XG4gICAgICAgIGNvbnN0IHRpbHRBbmltYXRpb24gPSB0aWx0LmFuaW1hdGlvbjtcbiAgICAgICAgcmV0dXJuICFwYXJ0aWNsZS5kZXN0cm95ZWQgJiYgIXBhcnRpY2xlLnNwYXduaW5nICYmIHRpbHRBbmltYXRpb24uZW5hYmxlO1xuICAgIH1cbiAgICB1cGRhdGUocGFydGljbGUsIGRlbHRhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVGlsdChwYXJ0aWNsZSwgZGVsdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFRpbHRVcGRhdGVyIH0gZnJvbSBcIi4vVGlsdFVwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVGlsdFVwZGF0ZXIoZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZFBhcnRpY2xlVXBkYXRlcihcInRpbHRcIiwgKGNvbnRhaW5lcikgPT4gbmV3IFRpbHRVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9