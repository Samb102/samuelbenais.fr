"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-repulse"],{

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Repulser": () => (/* binding */ Repulser)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Repulser extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions;
            if (mode !== "repulse") {
                return;
            }
            if (!container.repulse) {
                container.repulse = { particles: [] };
            }
            container.repulse.clicking = true;
            container.repulse.count = 0;
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
            container.repulse.finish = false;
            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.repulse) {
                        container.repulse = { particles: [] };
                    }
                    container.repulse.clicking = false;
                }
            }, options.interactivity.modes.repulse.duration * 1000);
        };
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv, divRepulse = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isDivModeEnabled)("repulse", divs);
        if (!(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("repulse", hoverMode) || (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("repulse", clickMode) || divRepulse;
    }
    reset() {
    }
    async interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("repulse", hoverMode)) {
            this.hoverRepulse();
        }
        else if (clickEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("repulse", clickMode)) {
            this.clickRepulse();
        }
        else {
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divModeExecute)("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
        }
    }
    singleSelectorRepulse(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(pos.x, pos.y, repulseRadius)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = container.actualOptions.interactivity.modes.repulse.divs, divRepulse = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divMode)(divs, elem);
            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
    hoverRepulse() {
        const container = this.container, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const repulseRadius = container.retina.repulseModeDistance;
        this.processRepulse(mousePos, repulseRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(mousePos.x, mousePos.y, repulseRadius));
    }
    processRepulse(position, repulseRadius, area, divRepulse) {
        var _a;
        const container = this.container, query = container.particles.quadTree.query(area), repulseOptions = container.actualOptions.interactivity.modes.repulse;
        for (const particle of query) {
            const { dx, dy, distance } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, position), velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor, repulseFactor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcEasing)(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed), normVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(distance === 0 ? velocity : (dx / distance) * repulseFactor, distance === 0 ? velocity : (dy / distance) * repulseFactor);
            particle.position.addTo(normVec);
        }
    }
    clickRepulse() {
        const container = this.container;
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }
            container.repulse.count++;
            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }
        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance, repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container.interactivity.mouse.clickPosition;
            if (mouseClickPos === undefined) {
                return;
            }
            const range = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range);
            for (const particle of query) {
                const { dx, dy, distance } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(mouseClickPos, particle.position), d = distance ** 2, velocity = container.actualOptions.interactivity.modes.repulse.speed, force = (-repulseRadius * velocity) / d;
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    const vect = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(dx, dy);
                    vect.length = force;
                    particle.velocity.setTo(vect);
                }
            }
        }
        else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalRepulseInteraction": () => (/* binding */ loadExternalRepulseInteraction)
/* harmony export */ });
/* harmony import */ var _Repulser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Repulser */ "./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js");

async function loadExternalRepulseInteraction(engine) {
    await engine.addInteractor("externalRepulse", (container) => new _Repulser__WEBPACK_IMPORTED_MODULE_0__.Repulser(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXJlcHVsc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0w7QUFDeEwsdUJBQXVCLHNFQUFzQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNkxBQTZMLG9FQUFnQjtBQUM3TTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNkRBQVMsMEJBQTBCLDZEQUFTO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0lBQWtJLDhEQUFjO0FBQ2hKLCtDQUErQyw2REFBUztBQUN4RDtBQUNBO0FBQ0EsaUNBQWlDLDZEQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLFlBQVksa0VBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixzQkFBc0Isc0RBQU07QUFDNUIsc0JBQXNCLHlEQUFTLDhMQUE4TCwyREFBTztBQUNwTztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxzREFBTTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQixFQUFFLGdFQUFZLDJOQUEyTix5REFBSyxDQUFDLDhEQUFVLHlHQUF5Ryw2REFBYTtBQUN0WjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNEQUFNO0FBQ3BDO0FBQ0Esd0JBQXdCLG1CQUFtQixFQUFFLGdFQUFZO0FBQ3pEO0FBQ0E7QUFDQSxpQ0FBaUMsNkRBQWE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSHNDO0FBQy9CO0FBQ1AscUVBQXFFLCtDQUFRO0FBQzdFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXJlcHVsc2UvZXNtL1JlcHVsc2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1yZXB1bHNlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXJjbGUsIEV4dGVybmFsSW50ZXJhY3RvckJhc2UsIFJlY3RhbmdsZSwgVmVjdG9yLCBjYWxjRWFzaW5nLCBjbGFtcCwgZGl2TW9kZSwgZGl2TW9kZUV4ZWN1dGUsIGdldERpc3RhbmNlcywgaXNEaXZNb2RlRW5hYmxlZCwgaXNJbkFycmF5LCBtb3VzZU1vdmVFdmVudCwgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgUmVwdWxzZXIgZXh0ZW5kcyBFeHRlcm5hbEludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcbiAgICAgICAgaWYgKCFjb250YWluZXIucmVwdWxzZSkge1xuICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UgPSB7IHBhcnRpY2xlczogW10gfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICAgICAgICAgIGlmIChtb2RlICE9PSBcInJlcHVsc2VcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29udGFpbmVyLnJlcHVsc2UpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVwdWxzZSA9IHsgcGFydGljbGVzOiBbXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UuY2xpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UuY291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0aWNsZSBvZiBjb250YWluZXIucmVwdWxzZS5wYXJ0aWNsZXMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS5zZXRUbyhwYXJ0aWNsZS5pbml0aWFsVmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UucGFydGljbGVzID0gW107XG4gICAgICAgICAgICBjb250YWluZXIucmVwdWxzZS5maW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5yZXB1bHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmVwdWxzZSA9IHsgcGFydGljbGVzOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZXB1bHNlLmNsaWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2UuZHVyYXRpb24gKiAxMDAwKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCBtb3VzZSA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLCBldmVudHMgPSBvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLCBkaXZzID0gZXZlbnRzLm9uRGl2LCBkaXZSZXB1bHNlID0gaXNEaXZNb2RlRW5hYmxlZChcInJlcHVsc2VcIiwgZGl2cyk7XG4gICAgICAgIGlmICghKGRpdlJlcHVsc2UgfHwgKGV2ZW50cy5vbkhvdmVyLmVuYWJsZSAmJiBtb3VzZS5wb3NpdGlvbikgfHwgKGV2ZW50cy5vbkNsaWNrLmVuYWJsZSAmJiBtb3VzZS5jbGlja1Bvc2l0aW9uKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3Zlck1vZGUgPSBldmVudHMub25Ib3Zlci5tb2RlLCBjbGlja01vZGUgPSBldmVudHMub25DbGljay5tb2RlO1xuICAgICAgICByZXR1cm4gaXNJbkFycmF5KFwicmVwdWxzZVwiLCBob3Zlck1vZGUpIHx8IGlzSW5BcnJheShcInJlcHVsc2VcIiwgY2xpY2tNb2RlKSB8fCBkaXZSZXB1bHNlO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG4gICAgYXN5bmMgaW50ZXJhY3QoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIG1vdXNlTW92ZVN0YXR1cyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LnN0YXR1cyA9PT0gbW91c2VNb3ZlRXZlbnQsIGV2ZW50cyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMsIGhvdmVyRW5hYmxlZCA9IGV2ZW50cy5vbkhvdmVyLmVuYWJsZSwgaG92ZXJNb2RlID0gZXZlbnRzLm9uSG92ZXIubW9kZSwgY2xpY2tFbmFibGVkID0gZXZlbnRzLm9uQ2xpY2suZW5hYmxlLCBjbGlja01vZGUgPSBldmVudHMub25DbGljay5tb2RlLCBkaXZzID0gZXZlbnRzLm9uRGl2O1xuICAgICAgICBpZiAobW91c2VNb3ZlU3RhdHVzICYmIGhvdmVyRW5hYmxlZCAmJiBpc0luQXJyYXkoXCJyZXB1bHNlXCIsIGhvdmVyTW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJSZXB1bHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2xpY2tFbmFibGVkICYmIGlzSW5BcnJheShcInJlcHVsc2VcIiwgY2xpY2tNb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja1JlcHVsc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpdk1vZGVFeGVjdXRlKFwicmVwdWxzZVwiLCBkaXZzLCAoc2VsZWN0b3IsIGRpdikgPT4gdGhpcy5zaW5nbGVTZWxlY3RvclJlcHVsc2Uoc2VsZWN0b3IsIGRpdikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNpbmdsZVNlbGVjdG9yUmVwdWxzZShzZWxlY3RvciwgZGl2KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoIXF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBpdGVtLCBweFJhdGlvID0gY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvLCBwb3MgPSB7XG4gICAgICAgICAgICAgICAgeDogKGVsZW0ub2Zmc2V0TGVmdCArIGVsZW0ub2Zmc2V0V2lkdGggLyAyKSAqIHB4UmF0aW8sXG4gICAgICAgICAgICAgICAgeTogKGVsZW0ub2Zmc2V0VG9wICsgZWxlbS5vZmZzZXRIZWlnaHQgLyAyKSAqIHB4UmF0aW8sXG4gICAgICAgICAgICB9LCByZXB1bHNlUmFkaXVzID0gKGVsZW0ub2Zmc2V0V2lkdGggLyAyKSAqIHB4UmF0aW8sIGFyZWEgPSBkaXYudHlwZSA9PT0gXCJjaXJjbGVcIlxuICAgICAgICAgICAgICAgID8gbmV3IENpcmNsZShwb3MueCwgcG9zLnksIHJlcHVsc2VSYWRpdXMpXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVjdGFuZ2xlKGVsZW0ub2Zmc2V0TGVmdCAqIHB4UmF0aW8sIGVsZW0ub2Zmc2V0VG9wICogcHhSYXRpbywgZWxlbS5vZmZzZXRXaWR0aCAqIHB4UmF0aW8sIGVsZW0ub2Zmc2V0SGVpZ2h0ICogcHhSYXRpbyksIGRpdnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2UuZGl2cywgZGl2UmVwdWxzZSA9IGRpdk1vZGUoZGl2cywgZWxlbSk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXB1bHNlKHBvcywgcmVwdWxzZVJhZGl1cywgYXJlYSwgZGl2UmVwdWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBob3ZlclJlcHVsc2UoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBtb3VzZVBvcyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uO1xuICAgICAgICBpZiAoIW1vdXNlUG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVwdWxzZVJhZGl1cyA9IGNvbnRhaW5lci5yZXRpbmEucmVwdWxzZU1vZGVEaXN0YW5jZTtcbiAgICAgICAgdGhpcy5wcm9jZXNzUmVwdWxzZShtb3VzZVBvcywgcmVwdWxzZVJhZGl1cywgbmV3IENpcmNsZShtb3VzZVBvcy54LCBtb3VzZVBvcy55LCByZXB1bHNlUmFkaXVzKSk7XG4gICAgfVxuICAgIHByb2Nlc3NSZXB1bHNlKHBvc2l0aW9uLCByZXB1bHNlUmFkaXVzLCBhcmVhLCBkaXZSZXB1bHNlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIHF1ZXJ5ID0gY29udGFpbmVyLnBhcnRpY2xlcy5xdWFkVHJlZS5xdWVyeShhcmVhKSwgcmVwdWxzZU9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgcXVlcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5LCBkaXN0YW5jZSB9ID0gZ2V0RGlzdGFuY2VzKHBhcnRpY2xlLnBvc2l0aW9uLCBwb3NpdGlvbiksIHZlbG9jaXR5ID0gKChfYSA9IGRpdlJlcHVsc2UgPT09IG51bGwgfHwgZGl2UmVwdWxzZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGl2UmVwdWxzZS5zcGVlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcmVwdWxzZU9wdGlvbnMuc3BlZWQpICogcmVwdWxzZU9wdGlvbnMuZmFjdG9yLCByZXB1bHNlRmFjdG9yID0gY2xhbXAoY2FsY0Vhc2luZygxIC0gZGlzdGFuY2UgLyByZXB1bHNlUmFkaXVzLCByZXB1bHNlT3B0aW9ucy5lYXNpbmcpICogdmVsb2NpdHksIDAsIHJlcHVsc2VPcHRpb25zLm1heFNwZWVkKSwgbm9ybVZlYyA9IFZlY3Rvci5jcmVhdGUoZGlzdGFuY2UgPT09IDAgPyB2ZWxvY2l0eSA6IChkeCAvIGRpc3RhbmNlKSAqIHJlcHVsc2VGYWN0b3IsIGRpc3RhbmNlID09PSAwID8gdmVsb2NpdHkgOiAoZHkgLyBkaXN0YW5jZSkgKiByZXB1bHNlRmFjdG9yKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLmFkZFRvKG5vcm1WZWMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsaWNrUmVwdWxzZSgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghY29udGFpbmVyLnJlcHVsc2UpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZXB1bHNlID0geyBwYXJ0aWNsZXM6IFtdIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250YWluZXIucmVwdWxzZS5maW5pc2gpIHtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyLnJlcHVsc2UuY291bnQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVwdWxzZS5jb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIucmVwdWxzZS5jb3VudCsrO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5yZXB1bHNlLmNvdW50ID09PSBjb250YWluZXIucGFydGljbGVzLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UuZmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGFpbmVyLnJlcHVsc2UuY2xpY2tpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcHVsc2VEaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEucmVwdWxzZU1vZGVEaXN0YW5jZSwgcmVwdWxzZVJhZGl1cyA9IE1hdGgucG93KHJlcHVsc2VEaXN0YW5jZSAvIDYsIDMpLCBtb3VzZUNsaWNrUG9zID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tQb3NpdGlvbjtcbiAgICAgICAgICAgIGlmIChtb3VzZUNsaWNrUG9zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IG5ldyBDaXJjbGUobW91c2VDbGlja1Bvcy54LCBtb3VzZUNsaWNrUG9zLnksIHJlcHVsc2VSYWRpdXMpLCBxdWVyeSA9IGNvbnRhaW5lci5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnkocmFuZ2UpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0aWNsZSBvZiBxdWVyeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5LCBkaXN0YW5jZSB9ID0gZ2V0RGlzdGFuY2VzKG1vdXNlQ2xpY2tQb3MsIHBhcnRpY2xlLnBvc2l0aW9uKSwgZCA9IGRpc3RhbmNlICoqIDIsIHZlbG9jaXR5ID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZXB1bHNlLnNwZWVkLCBmb3JjZSA9ICgtcmVwdWxzZVJhZGl1cyAqIHZlbG9jaXR5KSAvIGQ7XG4gICAgICAgICAgICAgICAgaWYgKGQgPD0gcmVwdWxzZVJhZGl1cykge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmVwdWxzZS5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlY3QgPSBWZWN0b3IuY3JlYXRlKGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgIHZlY3QubGVuZ3RoID0gZm9yY2U7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnNldFRvKHZlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250YWluZXIucmVwdWxzZS5jbGlja2luZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgY29udGFpbmVyLnJlcHVsc2UucGFydGljbGVzKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkuc2V0VG8ocGFydGljbGUuaW5pdGlhbFZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5yZXB1bHNlLnBhcnRpY2xlcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVwdWxzZXIgfSBmcm9tIFwiLi9SZXB1bHNlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRFeHRlcm5hbFJlcHVsc2VJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkSW50ZXJhY3RvcihcImV4dGVybmFsUmVwdWxzZVwiLCAoY29udGFpbmVyKSA9PiBuZXcgUmVwdWxzZXIoY29udGFpbmVyKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=