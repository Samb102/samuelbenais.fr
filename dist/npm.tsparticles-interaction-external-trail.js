"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-trail"],{

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrailMaker": () => (/* binding */ TrailMaker)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class TrailMaker extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.delay = 0;
    }
    async interact(delta) {
        var _a, _b, _c, _d;
        if (!this.container.retina.reduceFactor) {
            return;
        }
        const container = this.container, options = container.actualOptions, trailOptions = options.interactivity.modes.trail, optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;
        if (this.delay < optDelay) {
            this.delay += delta.value;
        }
        if (this.delay < optDelay) {
            return;
        }
        let canEmit = true;
        if (trailOptions.pauseOnStop) {
            if (container.interactivity.mouse.position === this.lastPosition ||
                (((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.lastPosition) === null || _b === void 0 ? void 0 : _b.x) &&
                    ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this.lastPosition) === null || _d === void 0 ? void 0 : _d.y))) {
                canEmit = false;
            }
        }
        if (container.interactivity.mouse.position) {
            this.lastPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        }
        else {
            delete this.lastPosition;
        }
        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }
        this.delay -= optDelay;
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
        return ((mouse.clicking && mouse.inside && !!mouse.position && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("trail", events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("trail", events.onHover.mode)));
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalTrailInteraction": () => (/* binding */ loadExternalTrailInteraction)
/* harmony export */ });
/* harmony import */ var _TrailMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrailMaker */ "./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js");

async function loadExternalTrailInteraction(engine) {
    await engine.addInteractor("externalTrail", (container) => new _TrailMaker__WEBPACK_IMPORTED_MODULE_0__.TrailMaker(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXRyYWlsLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXVFO0FBQ2hFLHlCQUF5QixzRUFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsNkRBQVM7QUFDaEYsaURBQWlELDZEQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0MwQztBQUNuQztBQUNQLG1FQUFtRSxtREFBVTtBQUM3RSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC10cmFpbC9lc20vVHJhaWxNYWtlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtdHJhaWwvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4dGVybmFsSW50ZXJhY3RvckJhc2UsIGlzSW5BcnJheSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBUcmFpbE1ha2VyIGV4dGVuZHMgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZGVsYXkgPSAwO1xuICAgIH1cbiAgICBhc3luYyBpbnRlcmFjdChkZWx0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIHRyYWlsT3B0aW9ucyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5tb2Rlcy50cmFpbCwgb3B0RGVsYXkgPSAodHJhaWxPcHRpb25zLmRlbGF5ICogMTAwMCkgLyB0aGlzLmNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yO1xuICAgICAgICBpZiAodGhpcy5kZWxheSA8IG9wdERlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmRlbGF5ICs9IGRlbHRhLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRlbGF5IDwgb3B0RGVsYXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FuRW1pdCA9IHRydWU7XG4gICAgICAgIGlmICh0cmFpbE9wdGlvbnMucGF1c2VPblN0b3ApIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbiA9PT0gdGhpcy5sYXN0UG9zaXRpb24gfHxcbiAgICAgICAgICAgICAgICAoKChfYSA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EueCkgPT09ICgoX2IgPSB0aGlzLmxhc3RQb3NpdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLngpICYmXG4gICAgICAgICAgICAgICAgICAgICgoX2MgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnkpID09PSAoKF9kID0gdGhpcy5sYXN0UG9zaXRpb24pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC55KSkpIHtcbiAgICAgICAgICAgICAgICBjYW5FbWl0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgIHk6IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGFzdFBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYW5FbWl0KSB7XG4gICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnB1c2godHJhaWxPcHRpb25zLnF1YW50aXR5LCBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZSwgdHJhaWxPcHRpb25zLnBhcnRpY2xlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSAtPSBvcHREZWxheTtcbiAgICB9XG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCBtb3VzZSA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLCBldmVudHMgPSBvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzO1xuICAgICAgICByZXR1cm4gKChtb3VzZS5jbGlja2luZyAmJiBtb3VzZS5pbnNpZGUgJiYgISFtb3VzZS5wb3NpdGlvbiAmJiBpc0luQXJyYXkoXCJ0cmFpbFwiLCBldmVudHMub25DbGljay5tb2RlKSkgfHxcbiAgICAgICAgICAgIChtb3VzZS5pbnNpZGUgJiYgISFtb3VzZS5wb3NpdGlvbiAmJiBpc0luQXJyYXkoXCJ0cmFpbFwiLCBldmVudHMub25Ib3Zlci5tb2RlKSkpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBUcmFpbE1ha2VyIH0gZnJvbSBcIi4vVHJhaWxNYWtlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRFeHRlcm5hbFRyYWlsSW50ZXJhY3Rpb24oZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZEludGVyYWN0b3IoXCJleHRlcm5hbFRyYWlsXCIsIChjb250YWluZXIpID0+IG5ldyBUcmFpbE1ha2VyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9