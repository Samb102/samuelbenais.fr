"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-life"],{

/***/ "./node_modules/tsparticles-updater-life/esm/LifeUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/LifeUpdater.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeUpdater": () => (/* binding */ LifeUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class LifeUpdater {
    constructor(container) {
        this.container = container;
    }
    init() {
    }
    isEnabled(particle) {
        return !particle.destroyed;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        const life = particle.life;
        let justSpawned = false;
        if (particle.spawning) {
            life.delayTime += delta.value;
            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = 0;
                life.time = 0;
            }
            else {
                return;
            }
        }
        if (life.duration === -1) {
            return;
        }
        if (particle.spawning) {
            return;
        }
        if (justSpawned) {
            life.time = 0;
        }
        else {
            life.time += delta.value;
        }
        if (life.time < life.duration) {
            return;
        }
        life.time = 0;
        if (particle.life.count > 0) {
            particle.life.count--;
        }
        if (particle.life.count === 0) {
            particle.destroy();
            return;
        }
        const canvasSize = this.container.canvas.size, widthRange = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(0, canvasSize.width), heightRange = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(0, canvasSize.width);
        particle.position.x = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(widthRange);
        particle.position.y = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(heightRange);
        particle.spawning = true;
        life.delayTime = 0;
        life.time = 0;
        particle.reset();
        const lifeOptions = particle.options.life;
        life.delay = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(lifeOptions.delay.value) * 1000;
        life.duration = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(lifeOptions.duration.value) * 1000;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-life/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadLifeUpdater": () => (/* binding */ loadLifeUpdater)
/* harmony export */ });
/* harmony import */ var _LifeUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LifeUpdater */ "./node_modules/tsparticles-updater-life/esm/LifeUpdater.js");

async function loadLifeUpdater(engine) {
    await engine.addParticleUpdater("life", (container) => new _LifeUpdater__WEBPACK_IMPORTED_MODULE_0__.LifeUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItbGlmZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFpRjtBQUMxRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLGlFQUFhLHFDQUFxQyxpRUFBYTtBQUNuSSw4QkFBOEIsaUVBQWE7QUFDM0MsOEJBQThCLGlFQUFhO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUVBQWE7QUFDbEMsd0JBQXdCLGlFQUFhO0FBQ3JDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RDRDO0FBQ3JDO0FBQ1AsK0RBQStELHFEQUFXO0FBQzFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItbGlmZS9lc20vTGlmZVVwZGF0ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItbGlmZS9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UmFuZ2VWYWx1ZSwgcmFuZG9tSW5SYW5nZSwgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBMaWZlVXBkYXRlciB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgIH1cbiAgICBpc0VuYWJsZWQocGFydGljbGUpIHtcbiAgICAgICAgcmV0dXJuICFwYXJ0aWNsZS5kZXN0cm95ZWQ7XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZChwYXJ0aWNsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaWZlID0gcGFydGljbGUubGlmZTtcbiAgICAgICAgbGV0IGp1c3RTcGF3bmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChwYXJ0aWNsZS5zcGF3bmluZykge1xuICAgICAgICAgICAgbGlmZS5kZWxheVRpbWUgKz0gZGVsdGEudmFsdWU7XG4gICAgICAgICAgICBpZiAobGlmZS5kZWxheVRpbWUgPj0gcGFydGljbGUubGlmZS5kZWxheSkge1xuICAgICAgICAgICAgICAgIGp1c3RTcGF3bmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zcGF3bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxpZmUuZGVsYXlUaW1lID0gMDtcbiAgICAgICAgICAgICAgICBsaWZlLnRpbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChsaWZlLmR1cmF0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0aWNsZS5zcGF3bmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqdXN0U3Bhd25lZCkge1xuICAgICAgICAgICAgbGlmZS50aW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxpZmUudGltZSArPSBkZWx0YS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlmZS50aW1lIDwgbGlmZS5kdXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpZmUudGltZSA9IDA7XG4gICAgICAgIGlmIChwYXJ0aWNsZS5saWZlLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgcGFydGljbGUubGlmZS5jb3VudC0tO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0aWNsZS5saWZlLmNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FudmFzU2l6ZSA9IHRoaXMuY29udGFpbmVyLmNhbnZhcy5zaXplLCB3aWR0aFJhbmdlID0gc2V0UmFuZ2VWYWx1ZSgwLCBjYW52YXNTaXplLndpZHRoKSwgaGVpZ2h0UmFuZ2UgPSBzZXRSYW5nZVZhbHVlKDAsIGNhbnZhc1NpemUud2lkdGgpO1xuICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gcmFuZG9tSW5SYW5nZSh3aWR0aFJhbmdlKTtcbiAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHJhbmRvbUluUmFuZ2UoaGVpZ2h0UmFuZ2UpO1xuICAgICAgICBwYXJ0aWNsZS5zcGF3bmluZyA9IHRydWU7XG4gICAgICAgIGxpZmUuZGVsYXlUaW1lID0gMDtcbiAgICAgICAgbGlmZS50aW1lID0gMDtcbiAgICAgICAgcGFydGljbGUucmVzZXQoKTtcbiAgICAgICAgY29uc3QgbGlmZU9wdGlvbnMgPSBwYXJ0aWNsZS5vcHRpb25zLmxpZmU7XG4gICAgICAgIGxpZmUuZGVsYXkgPSBnZXRSYW5nZVZhbHVlKGxpZmVPcHRpb25zLmRlbGF5LnZhbHVlKSAqIDEwMDA7XG4gICAgICAgIGxpZmUuZHVyYXRpb24gPSBnZXRSYW5nZVZhbHVlKGxpZmVPcHRpb25zLmR1cmF0aW9uLnZhbHVlKSAqIDEwMDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGlmZVVwZGF0ZXIgfSBmcm9tIFwiLi9MaWZlVXBkYXRlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRMaWZlVXBkYXRlcihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGFydGljbGVVcGRhdGVyKFwibGlmZVwiLCAoY29udGFpbmVyKSA9PiBuZXcgTGlmZVVwZGF0ZXIoY29udGFpbmVyKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=