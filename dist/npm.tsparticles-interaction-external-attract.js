"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-attract"],{

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attractor": () => (/* binding */ Attractor)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Attractor extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        if (!container.attract) {
            container.attract = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions;
            if (mode !== "attract") {
                return;
            }
            if (!container.attract) {
                container.attract = { particles: [] };
            }
            container.attract.clicking = true;
            container.attract.count = 0;
            for (const particle of container.attract.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.attract.particles = [];
            container.attract.finish = false;
            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.attract) {
                        container.attract = { particles: [] };
                    }
                    container.attract.clicking = false;
                }
            }, options.interactivity.modes.attract.duration * 1000);
        };
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("attract", hoverMode) || (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("attract", clickMode);
    }
    reset() {
    }
    async interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
        if (mouseMoveStatus && hoverEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("attract", hoverMode)) {
            this.hoverAttract();
        }
        else if (clickEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("attract", clickMode)) {
            this.clickAttract();
        }
    }
    hoverAttract() {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const attractRadius = container.retina.attractModeDistance;
        this.processAttract(mousePos, attractRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(mousePos.x, mousePos.y, attractRadius));
    }
    processAttract(position, attractRadius, area) {
        const container = this.container;
        const attractOptions = container.actualOptions.interactivity.modes.attract;
        const query = container.particles.quadTree.query(area);
        for (const particle of query) {
            const { dx, dy, distance } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, position);
            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcEasing)(1 - distance / attractRadius, attractOptions.easing) * velocity, 0, attractOptions.maxSpeed);
            const normVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(distance === 0 ? velocity : (dx / distance) * attractFactor, distance === 0 ? velocity : (dy / distance) * attractFactor);
            particle.position.subFrom(normVec);
        }
    }
    clickAttract() {
        const container = this.container;
        if (!container.attract) {
            container.attract = { particles: [] };
        }
        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }
            container.attract.count++;
            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }
        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;
            if (!mousePos) {
                return;
            }
            const attractRadius = container.retina.attractModeDistance;
            this.processAttract(mousePos, attractRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(mousePos.x, mousePos.y, attractRadius));
        }
        else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }
        return;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalAttractInteraction": () => (/* binding */ loadExternalAttractInteraction)
/* harmony export */ });
/* harmony import */ var _Attractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attractor */ "./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js");

async function loadExternalAttractInteraction(engine) {
    await engine.addInteractor("externalAttract", (container) => new _Attractor__WEBPACK_IMPORTED_MODULE_0__.Attractor(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWF0dHJhY3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBeUk7QUFDbEksd0JBQXdCLHNFQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNkRBQVMsMEJBQTBCLDZEQUFTO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0lBQWtJLDhEQUFjO0FBQ2hKLCtDQUErQyw2REFBUztBQUN4RDtBQUNBO0FBQ0EsaUNBQWlDLDZEQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELHNEQUFNO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUIsRUFBRSxnRUFBWTtBQUNyRDtBQUNBLGtDQUFrQyx5REFBSyxDQUFDLDhEQUFVO0FBQ2xELDRCQUE0Qiw2REFBYTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsc0RBQU07QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR3dDO0FBQ2pDO0FBQ1AscUVBQXFFLGlEQUFTO0FBQzlFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWF0dHJhY3QvZXNtL0F0dHJhY3Rvci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtYXR0cmFjdC9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2lyY2xlLCBFeHRlcm5hbEludGVyYWN0b3JCYXNlLCBWZWN0b3IsIGNhbGNFYXNpbmcsIGNsYW1wLCBnZXREaXN0YW5jZXMsIGlzSW5BcnJheSwgbW91c2VNb3ZlRXZlbnQsIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGNsYXNzIEF0dHJhY3RvciBleHRlbmRzIEV4dGVybmFsSW50ZXJhY3RvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lci5hdHRyYWN0KSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXR0cmFjdCA9IHsgcGFydGljbGVzOiBbXSB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICAgICAgaWYgKG1vZGUgIT09IFwiYXR0cmFjdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb250YWluZXIuYXR0cmFjdCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0ID0geyBwYXJ0aWNsZXM6IFtdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXR0cmFjdC5jbGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIuYXR0cmFjdC5jb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIGNvbnRhaW5lci5hdHRyYWN0LnBhcnRpY2xlcykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnNldFRvKHBhcnRpY2xlLmluaXRpYWxWZWxvY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXR0cmFjdC5wYXJ0aWNsZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0LmZpbmlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLmF0dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0ID0geyBwYXJ0aWNsZXM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmF0dHJhY3QuY2xpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuYXR0cmFjdC5kdXJhdGlvbiAqIDEwMDApO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIG1vdXNlID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UsIGV2ZW50cyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHM7XG4gICAgICAgIGlmICgoIW1vdXNlLnBvc2l0aW9uIHx8ICFldmVudHMub25Ib3Zlci5lbmFibGUpICYmICghbW91c2UuY2xpY2tQb3NpdGlvbiB8fCAhZXZlbnRzLm9uQ2xpY2suZW5hYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvdmVyTW9kZSA9IGV2ZW50cy5vbkhvdmVyLm1vZGUsIGNsaWNrTW9kZSA9IGV2ZW50cy5vbkNsaWNrLm1vZGU7XG4gICAgICAgIHJldHVybiBpc0luQXJyYXkoXCJhdHRyYWN0XCIsIGhvdmVyTW9kZSkgfHwgaXNJbkFycmF5KFwiYXR0cmFjdFwiLCBjbGlja01vZGUpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG4gICAgYXN5bmMgaW50ZXJhY3QoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIG1vdXNlTW92ZVN0YXR1cyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LnN0YXR1cyA9PT0gbW91c2VNb3ZlRXZlbnQsIGV2ZW50cyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMsIGhvdmVyRW5hYmxlZCA9IGV2ZW50cy5vbkhvdmVyLmVuYWJsZSwgaG92ZXJNb2RlID0gZXZlbnRzLm9uSG92ZXIubW9kZSwgY2xpY2tFbmFibGVkID0gZXZlbnRzLm9uQ2xpY2suZW5hYmxlLCBjbGlja01vZGUgPSBldmVudHMub25DbGljay5tb2RlO1xuICAgICAgICBpZiAobW91c2VNb3ZlU3RhdHVzICYmIGhvdmVyRW5hYmxlZCAmJiBpc0luQXJyYXkoXCJhdHRyYWN0XCIsIGhvdmVyTW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJBdHRyYWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2xpY2tFbmFibGVkICYmIGlzSW5BcnJheShcImF0dHJhY3RcIiwgY2xpY2tNb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja0F0dHJhY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBob3ZlckF0dHJhY3QoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBtb3VzZVBvcyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uO1xuICAgICAgICBpZiAoIW1vdXNlUG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXR0cmFjdFJhZGl1cyA9IGNvbnRhaW5lci5yZXRpbmEuYXR0cmFjdE1vZGVEaXN0YW5jZTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQXR0cmFjdChtb3VzZVBvcywgYXR0cmFjdFJhZGl1cywgbmV3IENpcmNsZShtb3VzZVBvcy54LCBtb3VzZVBvcy55LCBhdHRyYWN0UmFkaXVzKSk7XG4gICAgfVxuICAgIHByb2Nlc3NBdHRyYWN0KHBvc2l0aW9uLCBhdHRyYWN0UmFkaXVzLCBhcmVhKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBhdHRyYWN0T3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuYXR0cmFjdDtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBjb250YWluZXIucGFydGljbGVzLnF1YWRUcmVlLnF1ZXJ5KGFyZWEpO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIHF1ZXJ5KSB7XG4gICAgICAgICAgICBjb25zdCB7IGR4LCBkeSwgZGlzdGFuY2UgfSA9IGdldERpc3RhbmNlcyhwYXJ0aWNsZS5wb3NpdGlvbiwgcG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgdmVsb2NpdHkgPSBhdHRyYWN0T3B0aW9ucy5zcGVlZCAqIGF0dHJhY3RPcHRpb25zLmZhY3RvcjtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3RGYWN0b3IgPSBjbGFtcChjYWxjRWFzaW5nKDEgLSBkaXN0YW5jZSAvIGF0dHJhY3RSYWRpdXMsIGF0dHJhY3RPcHRpb25zLmVhc2luZykgKiB2ZWxvY2l0eSwgMCwgYXR0cmFjdE9wdGlvbnMubWF4U3BlZWQpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybVZlYyA9IFZlY3Rvci5jcmVhdGUoZGlzdGFuY2UgPT09IDAgPyB2ZWxvY2l0eSA6IChkeCAvIGRpc3RhbmNlKSAqIGF0dHJhY3RGYWN0b3IsIGRpc3RhbmNlID09PSAwID8gdmVsb2NpdHkgOiAoZHkgLyBkaXN0YW5jZSkgKiBhdHRyYWN0RmFjdG9yKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnN1YkZyb20obm9ybVZlYyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xpY2tBdHRyYWN0KCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFjb250YWluZXIuYXR0cmFjdCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmF0dHJhY3QgPSB7IHBhcnRpY2xlczogW10gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbnRhaW5lci5hdHRyYWN0LmZpbmlzaCkge1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIuYXR0cmFjdC5jb3VudCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0LmNvdW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0LmNvdW50Kys7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmF0dHJhY3QuY291bnQgPT09IGNvbnRhaW5lci5wYXJ0aWNsZXMuY291bnQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXR0cmFjdC5maW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb250YWluZXIuYXR0cmFjdC5jbGlja2luZykge1xuICAgICAgICAgICAgY29uc3QgbW91c2VQb3MgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja1Bvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKCFtb3VzZVBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3RSYWRpdXMgPSBjb250YWluZXIucmV0aW5hLmF0dHJhY3RNb2RlRGlzdGFuY2U7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NBdHRyYWN0KG1vdXNlUG9zLCBhdHRyYWN0UmFkaXVzLCBuZXcgQ2lyY2xlKG1vdXNlUG9zLngsIG1vdXNlUG9zLnksIGF0dHJhY3RSYWRpdXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250YWluZXIuYXR0cmFjdC5jbGlja2luZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRyYWN0LnBhcnRpY2xlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBdHRyYWN0b3IgfSBmcm9tIFwiLi9BdHRyYWN0b3JcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRXh0ZXJuYWxBdHRyYWN0SW50ZXJhY3Rpb24oZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZEludGVyYWN0b3IoXCJleHRlcm5hbEF0dHJhY3RcIiwgKGNvbnRhaW5lcikgPT4gbmV3IEF0dHJhY3Rvcihjb250YWluZXIpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==