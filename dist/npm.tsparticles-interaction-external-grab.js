"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-grab"],{

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grabber": () => (/* binding */ Grabber)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Grabber extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
        return events.onHover.enable && !!mouse.position && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("grab", events.onHover.mode);
    }
    reset() {
    }
    async interact() {
        var _a;
        const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
        if (!interactivity.events.onHover.enable || container.interactivity.status !== tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent) {
            return;
        }
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const distance = container.retina.grabModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
        for (const particle of query) {
            const pos = particle.getPosition(), pointDistance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos, mousePos);
            if (pointDistance > distance) {
                continue;
            }
            const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
            if (opacityLine <= 0) {
                continue;
            }
            const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;
            if (!container.particles.grabLineColor) {
                const linksOptions = options.interactivity.modes.grab.links;
                container.particles.grabLineColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);
            }
            const colorLine = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkColor)(particle, undefined, container.particles.grabLineColor);
            if (!colorLine) {
                return;
            }
            container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalGrabInteraction": () => (/* binding */ loadExternalGrabInteraction)
/* harmony export */ });
/* harmony import */ var _Grabber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grabber */ "./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js");

async function loadExternalGrabInteraction(engine) {
    await engine.addInteractor("externalGrab", (container) => new _Grabber__WEBPACK_IMPORTED_MODULE_0__.Grabber(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWdyYWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUk7QUFDaEksc0JBQXNCLHNFQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELDZEQUFTO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1Riw4REFBYztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLCtEQUFXO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHNFQUFrQjtBQUN0RTtBQUNBLDhCQUE4QixnRUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNDb0M7QUFDN0I7QUFDUCxrRUFBa0UsNkNBQU87QUFDekUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtZ3JhYi9lc20vR3JhYmJlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtZ3JhYi9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSwgZ2V0RGlzdGFuY2UsIGdldExpbmtDb2xvciwgZ2V0TGlua1JhbmRvbUNvbG9yLCBpc0luQXJyYXksIG1vdXNlTW92ZUV2ZW50LCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBHcmFiYmVyIGV4dGVuZHMgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG1vdXNlID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UsIGV2ZW50cyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzO1xuICAgICAgICByZXR1cm4gZXZlbnRzLm9uSG92ZXIuZW5hYmxlICYmICEhbW91c2UucG9zaXRpb24gJiYgaXNJbkFycmF5KFwiZ3JhYlwiLCBldmVudHMub25Ib3Zlci5tb2RlKTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgfVxuICAgIGFzeW5jIGludGVyYWN0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIGludGVyYWN0aXZpdHkgPSBvcHRpb25zLmludGVyYWN0aXZpdHk7XG4gICAgICAgIGlmICghaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5lbmFibGUgfHwgY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzICE9PSBtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UucG9zaXRpb247XG4gICAgICAgIGlmICghbW91c2VQb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEuZ3JhYk1vZGVEaXN0YW5jZSwgcXVlcnkgPSBjb250YWluZXIucGFydGljbGVzLnF1YWRUcmVlLnF1ZXJ5Q2lyY2xlKG1vdXNlUG9zLCBkaXN0YW5jZSk7XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgcXVlcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnRpY2xlLmdldFBvc2l0aW9uKCksIHBvaW50RGlzdGFuY2UgPSBnZXREaXN0YW5jZShwb3MsIG1vdXNlUG9zKTtcbiAgICAgICAgICAgIGlmIChwb2ludERpc3RhbmNlID4gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdyYWJMaW5lT3B0aW9ucyA9IGludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5saW5rcywgbGluZU9wYWNpdHkgPSBncmFiTGluZU9wdGlvbnMub3BhY2l0eSwgb3BhY2l0eUxpbmUgPSBsaW5lT3BhY2l0eSAtIChwb2ludERpc3RhbmNlICogbGluZU9wYWNpdHkpIC8gZGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAob3BhY2l0eUxpbmUgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3B0Q29sb3IgPSAoX2EgPSBncmFiTGluZU9wdGlvbnMuY29sb3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHBhcnRpY2xlLm9wdGlvbnMubGlua3MuY29sb3I7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5wYXJ0aWNsZXMuZ3JhYkxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtzT3B0aW9ucyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmxpbmtzO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuZ3JhYkxpbmVDb2xvciA9IGdldExpbmtSYW5kb21Db2xvcihvcHRDb2xvciwgbGlua3NPcHRpb25zLmJsaW5rLCBsaW5rc09wdGlvbnMuY29uc2VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb2xvckxpbmUgPSBnZXRMaW5rQ29sb3IocGFydGljbGUsIHVuZGVmaW5lZCwgY29udGFpbmVyLnBhcnRpY2xlcy5ncmFiTGluZUNvbG9yKTtcbiAgICAgICAgICAgIGlmICghY29sb3JMaW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmNhbnZhcy5kcmF3R3JhYkxpbmUocGFydGljbGUsIGNvbG9yTGluZSwgb3BhY2l0eUxpbmUsIG1vdXNlUG9zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEdyYWJiZXIgfSBmcm9tIFwiLi9HcmFiYmVyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEV4dGVybmFsR3JhYkludGVyYWN0aW9uKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRJbnRlcmFjdG9yKFwiZXh0ZXJuYWxHcmFiXCIsIChjb250YWluZXIpID0+IG5ldyBHcmFiYmVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9