"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-bounce"],{

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bouncer": () => (/* binding */ Bouncer)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Bouncer extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv;
        return ((mouse.position && events.onHover.enable && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bounce", events.onHover.mode)) ||
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isDivModeEnabled)("bounce", divs));
    }
    async interact() {
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bounce", hoverMode)) {
            this.processMouseBounce();
        }
        else {
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divModeExecute)("bounce", divs, (selector, div) => this.singleSelectorBounce(selector, div));
        }
    }
    reset() {
    }
    processMouseBounce() {
        const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
        if (mousePos) {
            this.processBounce(mousePos, radius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(mousePos.x, mousePos.y, radius + tolerance));
        }
    }
    singleSelectorBounce(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, radius = (elem.offsetWidth / 2) * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(pos.x, pos.y, radius + tolerance)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
            this.processBounce(pos, radius, area);
        });
    }
    processBounce(position, radius, area) {
        const query = this.container.particles.quadTree.query(area);
        for (const particle of query) {
            if (area instanceof tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle) {
                (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounce)((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounceDataFromParticle)(particle), {
                    position,
                    radius,
                    mass: (radius ** 2 * Math.PI) / 2,
                    velocity: tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin,
                    factor: tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin,
                });
            }
            else if (area instanceof tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Rectangle) {
                (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rectBounce)(particle, (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calculateBounds)(position, radius));
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalBounceInteraction": () => (/* binding */ loadExternalBounceInteraction)
/* harmony export */ });
/* harmony import */ var _Bouncer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bouncer */ "./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js");

async function loadExternalBounceInteraction(engine) {
    await engine.addInteractor("externalBounce", (container) => new _Bouncer__WEBPACK_IMPORTED_MODULE_0__.Bouncer(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWJvdW5jZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4TjtBQUN2TixzQkFBc0Isc0VBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsNkRBQVM7QUFDckUsWUFBWSxvRUFBZ0I7QUFDNUI7QUFDQTtBQUNBLHlLQUF5Syw4REFBYztBQUN2TCwrQ0FBK0MsNkRBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrRUFBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxzREFBTTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHNCQUFzQixzREFBTTtBQUM1QixzQkFBc0IseURBQVM7QUFDL0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0RBQU07QUFDdEMsZ0JBQWdCLGdFQUFZLENBQUMsZ0ZBQTRCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw2REFBYTtBQUMzQyw0QkFBNEIsNkRBQWE7QUFDekMsaUJBQWlCO0FBQ2pCO0FBQ0EscUNBQXFDLHlEQUFTO0FBQzlDLGdCQUFnQiw4REFBVSxXQUFXLG1FQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0RvQztBQUM3QjtBQUNQLG9FQUFvRSw2Q0FBTztBQUMzRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1ib3VuY2UvZXNtL0JvdW5jZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWJvdW5jZS9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2lyY2xlLCBFeHRlcm5hbEludGVyYWN0b3JCYXNlLCBSZWN0YW5nbGUsIFZlY3RvciwgY2FsY3VsYXRlQm91bmRzLCBjaXJjbGVCb3VuY2UsIGNpcmNsZUJvdW5jZURhdGFGcm9tUGFydGljbGUsIGRpdk1vZGVFeGVjdXRlLCBpc0Rpdk1vZGVFbmFibGVkLCBpc0luQXJyYXksIG1vdXNlTW92ZUV2ZW50LCByZWN0Qm91bmNlLCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBCb3VuY2VyIGV4dGVuZHMgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgbW91c2UgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZSwgZXZlbnRzID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cywgZGl2cyA9IGV2ZW50cy5vbkRpdjtcbiAgICAgICAgcmV0dXJuICgobW91c2UucG9zaXRpb24gJiYgZXZlbnRzLm9uSG92ZXIuZW5hYmxlICYmIGlzSW5BcnJheShcImJvdW5jZVwiLCBldmVudHMub25Ib3Zlci5tb2RlKSkgfHxcbiAgICAgICAgICAgIGlzRGl2TW9kZUVuYWJsZWQoXCJib3VuY2VcIiwgZGl2cykpO1xuICAgIH1cbiAgICBhc3luYyBpbnRlcmFjdCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgZXZlbnRzID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cywgbW91c2VNb3ZlU3RhdHVzID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzID09PSBtb3VzZU1vdmVFdmVudCwgaG92ZXJFbmFibGVkID0gZXZlbnRzLm9uSG92ZXIuZW5hYmxlLCBob3Zlck1vZGUgPSBldmVudHMub25Ib3Zlci5tb2RlLCBkaXZzID0gZXZlbnRzLm9uRGl2O1xuICAgICAgICBpZiAobW91c2VNb3ZlU3RhdHVzICYmIGhvdmVyRW5hYmxlZCAmJiBpc0luQXJyYXkoXCJib3VuY2VcIiwgaG92ZXJNb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTW91c2VCb3VuY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpdk1vZGVFeGVjdXRlKFwiYm91bmNlXCIsIGRpdnMsIChzZWxlY3RvciwgZGl2KSA9PiB0aGlzLnNpbmdsZVNlbGVjdG9yQm91bmNlKHNlbGVjdG9yLCBkaXYpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG4gICAgcHJvY2Vzc01vdXNlQm91bmNlKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgcHhSYXRpbyA9IGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbywgdG9sZXJhbmNlID0gMTAgKiBweFJhdGlvLCBtb3VzZVBvcyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uLCByYWRpdXMgPSBjb250YWluZXIucmV0aW5hLmJvdW5jZU1vZGVEaXN0YW5jZTtcbiAgICAgICAgaWYgKG1vdXNlUG9zKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NCb3VuY2UobW91c2VQb3MsIHJhZGl1cywgbmV3IENpcmNsZShtb3VzZVBvcy54LCBtb3VzZVBvcy55LCByYWRpdXMgKyB0b2xlcmFuY2UpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaW5nbGVTZWxlY3RvckJvdW5jZShzZWxlY3RvciwgZGl2KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoIXF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBpdGVtLCBweFJhdGlvID0gY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvLCBwb3MgPSB7XG4gICAgICAgICAgICAgICAgeDogKGVsZW0ub2Zmc2V0TGVmdCArIGVsZW0ub2Zmc2V0V2lkdGggLyAyKSAqIHB4UmF0aW8sXG4gICAgICAgICAgICAgICAgeTogKGVsZW0ub2Zmc2V0VG9wICsgZWxlbS5vZmZzZXRIZWlnaHQgLyAyKSAqIHB4UmF0aW8sXG4gICAgICAgICAgICB9LCByYWRpdXMgPSAoZWxlbS5vZmZzZXRXaWR0aCAvIDIpICogcHhSYXRpbywgdG9sZXJhbmNlID0gMTAgKiBweFJhdGlvLCBhcmVhID0gZGl2LnR5cGUgPT09IFwiY2lyY2xlXCJcbiAgICAgICAgICAgICAgICA/IG5ldyBDaXJjbGUocG9zLngsIHBvcy55LCByYWRpdXMgKyB0b2xlcmFuY2UpXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVjdGFuZ2xlKGVsZW0ub2Zmc2V0TGVmdCAqIHB4UmF0aW8gLSB0b2xlcmFuY2UsIGVsZW0ub2Zmc2V0VG9wICogcHhSYXRpbyAtIHRvbGVyYW5jZSwgZWxlbS5vZmZzZXRXaWR0aCAqIHB4UmF0aW8gKyB0b2xlcmFuY2UgKiAyLCBlbGVtLm9mZnNldEhlaWdodCAqIHB4UmF0aW8gKyB0b2xlcmFuY2UgKiAyKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0JvdW5jZShwb3MsIHJhZGl1cywgYXJlYSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwcm9jZXNzQm91bmNlKHBvc2l0aW9uLCByYWRpdXMsIGFyZWEpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmNvbnRhaW5lci5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnkoYXJlYSk7XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgcXVlcnkpIHtcbiAgICAgICAgICAgIGlmIChhcmVhIGluc3RhbmNlb2YgQ2lyY2xlKSB7XG4gICAgICAgICAgICAgICAgY2lyY2xlQm91bmNlKGNpcmNsZUJvdW5jZURhdGFGcm9tUGFydGljbGUocGFydGljbGUpLCB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgIG1hc3M6IChyYWRpdXMgKiogMiAqIE1hdGguUEkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHk6IFZlY3Rvci5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcjogVmVjdG9yLm9yaWdpbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZWEgaW5zdGFuY2VvZiBSZWN0YW5nbGUpIHtcbiAgICAgICAgICAgICAgICByZWN0Qm91bmNlKHBhcnRpY2xlLCBjYWxjdWxhdGVCb3VuZHMocG9zaXRpb24sIHJhZGl1cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQm91bmNlciB9IGZyb20gXCIuL0JvdW5jZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRXh0ZXJuYWxCb3VuY2VJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkSW50ZXJhY3RvcihcImV4dGVybmFsQm91bmNlXCIsIChjb250YWluZXIpID0+IG5ldyBCb3VuY2VyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9