"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-angle"],{

/***/ "./node_modules/tsparticles-updater-angle/esm/AngleUpdater.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/AngleUpdater.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AngleUpdater": () => (/* binding */ AngleUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateAngle(particle, delta) {
    var _a;
    const rotate = particle.rotate;
    if (!rotate) {
        return;
    }
    const rotateOptions = particle.options.rotate;
    const rotateAnimation = rotateOptions.animation;
    const speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const max = 2 * Math.PI;
    if (!rotateAnimation.enable) {
        return;
    }
    switch (rotate.status) {
        case 0:
            rotate.value += speed;
            if (rotate.value > max) {
                rotate.value -= max;
            }
            break;
        case 1:
        default:
            rotate.value -= speed;
            if (rotate.value < 0) {
                rotate.value += max;
            }
            break;
    }
}
class AngleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const rotateOptions = particle.options.rotate;
        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rotateOptions.value) * Math.PI) / 180,
        };
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === "random") {
            const index = Math.floor(Math.random() * 2);
            rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (rotateDirection) {
            case "counter-clockwise":
            case "counterClockwise":
                particle.rotate.status = 1;
                break;
            case "clockwise":
                particle.rotate.status = 0;
                break;
        }
        const rotateAnimation = particle.options.rotate.animation;
        if (rotateAnimation.enable) {
            particle.rotate.velocity =
                ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rotateAnimation.speed) / 360) * this.container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= Math.random();
            }
        }
    }
    isEnabled(particle) {
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;
        return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateAngle(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-angle/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadAngleUpdater": () => (/* binding */ loadAngleUpdater)
/* harmony export */ });
/* harmony import */ var _AngleUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AngleUpdater */ "./node_modules/tsparticles-updater-angle/esm/AngleUpdater.js");

async function loadAngleUpdater(engine) {
    await engine.addParticleUpdater("angle", (container) => new _AngleUpdater__WEBPACK_IMPORTED_MODULE_0__.AngleUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItYW5nbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUVBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlFQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRThDO0FBQ3ZDO0FBQ1AsZ0VBQWdFLHVEQUFZO0FBQzVFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItYW5nbGUvZXNtL0FuZ2xlVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1hbmdsZS9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmZ1bmN0aW9uIHVwZGF0ZUFuZ2xlKHBhcnRpY2xlLCBkZWx0YSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCByb3RhdGUgPSBwYXJ0aWNsZS5yb3RhdGU7XG4gICAgaWYgKCFyb3RhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb3RhdGVPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy5yb3RhdGU7XG4gICAgY29uc3Qgcm90YXRlQW5pbWF0aW9uID0gcm90YXRlT3B0aW9ucy5hbmltYXRpb247XG4gICAgY29uc3Qgc3BlZWQgPSAoKF9hID0gcm90YXRlLnZlbG9jaXR5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSAqIGRlbHRhLmZhY3RvcjtcbiAgICBjb25zdCBtYXggPSAyICogTWF0aC5QSTtcbiAgICBpZiAoIXJvdGF0ZUFuaW1hdGlvbi5lbmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJvdGF0ZS5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcm90YXRlLnZhbHVlICs9IHNwZWVkO1xuICAgICAgICAgICAgaWYgKHJvdGF0ZS52YWx1ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIHJvdGF0ZS52YWx1ZSAtPSBtYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcm90YXRlLnZhbHVlIC09IHNwZWVkO1xuICAgICAgICAgICAgaWYgKHJvdGF0ZS52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgICAgICByb3RhdGUudmFsdWUgKz0gbWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEFuZ2xlVXBkYXRlciB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cbiAgICBpbml0KHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZU9wdGlvbnMgPSBwYXJ0aWNsZS5vcHRpb25zLnJvdGF0ZTtcbiAgICAgICAgcGFydGljbGUucm90YXRlID0ge1xuICAgICAgICAgICAgZW5hYmxlOiByb3RhdGVPcHRpb25zLmFuaW1hdGlvbi5lbmFibGUsXG4gICAgICAgICAgICB2YWx1ZTogKGdldFJhbmdlVmFsdWUocm90YXRlT3B0aW9ucy52YWx1ZSkgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdGlvbiA9IHJvdGF0ZU9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICBpZiAocm90YXRlRGlyZWN0aW9uID09PSBcInJhbmRvbVwiKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0aW9uID0gaW5kZXggPiAwID8gXCJjb3VudGVyLWNsb2Nrd2lzZVwiIDogXCJjbG9ja3dpc2VcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHJvdGF0ZURpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImNvdW50ZXItY2xvY2t3aXNlXCI6XG4gICAgICAgICAgICBjYXNlIFwiY291bnRlckNsb2Nrd2lzZVwiOlxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsb2Nrd2lzZVwiOlxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0ZS5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdGF0ZUFuaW1hdGlvbiA9IHBhcnRpY2xlLm9wdGlvbnMucm90YXRlLmFuaW1hdGlvbjtcbiAgICAgICAgaWYgKHJvdGF0ZUFuaW1hdGlvbi5lbmFibGUpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0ZS52ZWxvY2l0eSA9XG4gICAgICAgICAgICAgICAgKGdldFJhbmdlVmFsdWUocm90YXRlQW5pbWF0aW9uLnNwZWVkKSAvIDM2MCkgKiB0aGlzLmNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yO1xuICAgICAgICAgICAgaWYgKCFyb3RhdGVBbmltYXRpb24uc3luYykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0ZS52ZWxvY2l0eSAqPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICBjb25zdCByb3RhdGUgPSBwYXJ0aWNsZS5vcHRpb25zLnJvdGF0ZTtcbiAgICAgICAgY29uc3Qgcm90YXRlQW5pbWF0aW9uID0gcm90YXRlLmFuaW1hdGlvbjtcbiAgICAgICAgcmV0dXJuICFwYXJ0aWNsZS5kZXN0cm95ZWQgJiYgIXBhcnRpY2xlLnNwYXduaW5nICYmICFyb3RhdGUucGF0aCAmJiByb3RhdGVBbmltYXRpb24uZW5hYmxlO1xuICAgIH1cbiAgICB1cGRhdGUocGFydGljbGUsIGRlbHRhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQW5nbGUocGFydGljbGUsIGRlbHRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmdsZVVwZGF0ZXIgfSBmcm9tIFwiLi9BbmdsZVVwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQW5nbGVVcGRhdGVyKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQYXJ0aWNsZVVwZGF0ZXIoXCJhbmdsZVwiLCAoY29udGFpbmVyKSA9PiBuZXcgQW5nbGVVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9