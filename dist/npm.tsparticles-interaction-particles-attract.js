"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-particles-attract"],{

/***/ "./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attractor": () => (/* binding */ Attractor)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Attractor extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    async interact(p1) {
        var _a;
        const container = this.container, distance = (_a = p1.retina.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1000), ay = dy / (rotate.y * 1000), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
            p1.velocity.x -= ax * p1Factor;
            p1.velocity.y -= ay * p1Factor;
            p2.velocity.x += ax * p2Factor;
            p2.velocity.y += ay * p2Factor;
        }
    }
    isEnabled(particle) {
        return particle.options.move.attract.enable;
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-attract/esm/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-attract/esm/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadParticlesAttractInteraction": () => (/* binding */ loadParticlesAttractInteraction)
/* harmony export */ });
/* harmony import */ var _Attractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attractor */ "./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js");

async function loadParticlesAttractInteraction(engine) {
    await engine.addInteractor("particlesAttract", (container) => new _Attractor__WEBPACK_IMPORTED_MODULE_0__.Attractor(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLXBhcnRpY2xlcy1hdHRyYWN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJFO0FBQ3BFLHdCQUF3Qix1RUFBdUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUyxFQUFFLGdFQUFZO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCd0M7QUFDakM7QUFDUCxzRUFBc0UsaURBQVM7QUFDL0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tcGFydGljbGVzLWF0dHJhY3QvZXNtL0F0dHJhY3Rvci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tcGFydGljbGVzLWF0dHJhY3QvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcnRpY2xlc0ludGVyYWN0b3JCYXNlLCBnZXREaXN0YW5jZXMgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgQXR0cmFjdG9yIGV4dGVuZHMgUGFydGljbGVzSW50ZXJhY3RvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIpO1xuICAgIH1cbiAgICBhc3luYyBpbnRlcmFjdChwMSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBkaXN0YW5jZSA9IChfYSA9IHAxLnJldGluYS5hdHRyYWN0RGlzdGFuY2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvbnRhaW5lci5yZXRpbmEuYXR0cmFjdERpc3RhbmNlLCBwb3MxID0gcDEuZ2V0UG9zaXRpb24oKSwgcXVlcnkgPSBjb250YWluZXIucGFydGljbGVzLnF1YWRUcmVlLnF1ZXJ5Q2lyY2xlKHBvczEsIGRpc3RhbmNlKTtcbiAgICAgICAgZm9yIChjb25zdCBwMiBvZiBxdWVyeSkge1xuICAgICAgICAgICAgaWYgKHAxID09PSBwMiB8fCAhcDIub3B0aW9ucy5tb3ZlLmF0dHJhY3QuZW5hYmxlIHx8IHAyLmRlc3Ryb3llZCB8fCBwMi5zcGF3bmluZykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zMiA9IHAyLmdldFBvc2l0aW9uKCksIHsgZHgsIGR5IH0gPSBnZXREaXN0YW5jZXMocG9zMSwgcG9zMiksIHJvdGF0ZSA9IHAxLm9wdGlvbnMubW92ZS5hdHRyYWN0LnJvdGF0ZSwgYXggPSBkeCAvIChyb3RhdGUueCAqIDEwMDApLCBheSA9IGR5IC8gKHJvdGF0ZS55ICogMTAwMCksIHAxRmFjdG9yID0gcDIuc2l6ZS52YWx1ZSAvIHAxLnNpemUudmFsdWUsIHAyRmFjdG9yID0gMSAvIHAxRmFjdG9yO1xuICAgICAgICAgICAgcDEudmVsb2NpdHkueCAtPSBheCAqIHAxRmFjdG9yO1xuICAgICAgICAgICAgcDEudmVsb2NpdHkueSAtPSBheSAqIHAxRmFjdG9yO1xuICAgICAgICAgICAgcDIudmVsb2NpdHkueCArPSBheCAqIHAyRmFjdG9yO1xuICAgICAgICAgICAgcDIudmVsb2NpdHkueSArPSBheSAqIHAyRmFjdG9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICByZXR1cm4gcGFydGljbGUub3B0aW9ucy5tb3ZlLmF0dHJhY3QuZW5hYmxlO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBdHRyYWN0b3IgfSBmcm9tIFwiLi9BdHRyYWN0b3JcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUGFydGljbGVzQXR0cmFjdEludGVyYWN0aW9uKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRJbnRlcmFjdG9yKFwicGFydGljbGVzQXR0cmFjdFwiLCAoY29udGFpbmVyKSA9PiBuZXcgQXR0cmFjdG9yKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9