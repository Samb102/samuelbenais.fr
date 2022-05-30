"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-wobble"],{

/***/ "./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WobbleUpdater": () => (/* binding */ WobbleUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateWobble(particle, delta) {
    var _a;
    const wobble = particle.options.wobble;
    if (!wobble.enable || !particle.wobble) {
        return;
    }
    const speed = particle.wobble.speed * delta.factor;
    const distance = (((_a = particle.retina.wobbleDistance) !== null && _a !== void 0 ? _a : 0) * delta.factor) / (1000 / 60);
    const max = 2 * Math.PI;
    particle.wobble.angle += speed;
    if (particle.wobble.angle > max) {
        particle.wobble.angle -= max;
    }
    particle.position.x += distance * Math.cos(particle.wobble.angle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}
class WobbleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const wobbleOpt = particle.options.wobble;
        if (wobbleOpt.enable) {
            particle.wobble = {
                angle: Math.random() * Math.PI * 2,
                speed: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(wobbleOpt.speed) / 360,
            };
        }
        else {
            particle.wobble = {
                angle: 0,
                speed: 0,
            };
        }
        particle.retina.wobbleDistance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(wobbleOpt.distance) * this.container.retina.pixelRatio;
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning && particle.options.wobble.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateWobble(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-wobble/esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadWobbleUpdater": () => (/* binding */ loadWobbleUpdater)
/* harmony export */ });
/* harmony import */ var _WobbleUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WobbleUpdater */ "./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js");

async function loadWobbleUpdater(engine) {
    await engine.addParticleUpdater("wobble", (container) => new _WobbleUpdater__WEBPACK_IMPORTED_MODULE_0__.WobbleUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItd29iYmxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlFQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsaUVBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlDZ0Q7QUFDekM7QUFDUCxpRUFBaUUseURBQWE7QUFDOUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci13b2JibGUvZXNtL1dvYmJsZVVwZGF0ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItd29iYmxlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZnVuY3Rpb24gdXBkYXRlV29iYmxlKHBhcnRpY2xlLCBkZWx0YSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB3b2JibGUgPSBwYXJ0aWNsZS5vcHRpb25zLndvYmJsZTtcbiAgICBpZiAoIXdvYmJsZS5lbmFibGUgfHwgIXBhcnRpY2xlLndvYmJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNwZWVkID0gcGFydGljbGUud29iYmxlLnNwZWVkICogZGVsdGEuZmFjdG9yO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gKCgoX2EgPSBwYXJ0aWNsZS5yZXRpbmEud29iYmxlRGlzdGFuY2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApICogZGVsdGEuZmFjdG9yKSAvICgxMDAwIC8gNjApO1xuICAgIGNvbnN0IG1heCA9IDIgKiBNYXRoLlBJO1xuICAgIHBhcnRpY2xlLndvYmJsZS5hbmdsZSArPSBzcGVlZDtcbiAgICBpZiAocGFydGljbGUud29iYmxlLmFuZ2xlID4gbWF4KSB7XG4gICAgICAgIHBhcnRpY2xlLndvYmJsZS5hbmdsZSAtPSBtYXg7XG4gICAgfVxuICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gZGlzdGFuY2UgKiBNYXRoLmNvcyhwYXJ0aWNsZS53b2JibGUuYW5nbGUpO1xuICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gZGlzdGFuY2UgKiBNYXRoLmFicyhNYXRoLnNpbihwYXJ0aWNsZS53b2JibGUuYW5nbGUpKTtcbn1cbmV4cG9ydCBjbGFzcyBXb2JibGVVcGRhdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIGluaXQocGFydGljbGUpIHtcbiAgICAgICAgY29uc3Qgd29iYmxlT3B0ID0gcGFydGljbGUub3B0aW9ucy53b2JibGU7XG4gICAgICAgIGlmICh3b2JibGVPcHQuZW5hYmxlKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS53b2JibGUgPSB7XG4gICAgICAgICAgICAgICAgYW5nbGU6IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMixcbiAgICAgICAgICAgICAgICBzcGVlZDogZ2V0UmFuZ2VWYWx1ZSh3b2JibGVPcHQuc3BlZWQpIC8gMzYwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLndvYmJsZSA9IHtcbiAgICAgICAgICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcGFydGljbGUucmV0aW5hLndvYmJsZURpc3RhbmNlID0gZ2V0UmFuZ2VWYWx1ZSh3b2JibGVPcHQuZGlzdGFuY2UpICogdGhpcy5jb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW87XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICByZXR1cm4gIXBhcnRpY2xlLmRlc3Ryb3llZCAmJiAhcGFydGljbGUuc3Bhd25pbmcgJiYgcGFydGljbGUub3B0aW9ucy53b2JibGUuZW5hYmxlO1xuICAgIH1cbiAgICB1cGRhdGUocGFydGljbGUsIGRlbHRhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlV29iYmxlKHBhcnRpY2xlLCBkZWx0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgV29iYmxlVXBkYXRlciB9IGZyb20gXCIuL1dvYmJsZVVwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV29iYmxlVXBkYXRlcihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGFydGljbGVVcGRhdGVyKFwid29iYmxlXCIsIChjb250YWluZXIpID0+IG5ldyBXb2JibGVVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9