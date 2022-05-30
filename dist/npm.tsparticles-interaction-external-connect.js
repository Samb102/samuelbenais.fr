"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-connect"],{

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Connector.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Connector.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connector": () => (/* binding */ Connector)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Connector extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("connect", events.onHover.mode);
    }
    reset() {
    }
    async interact() {
        const container = this.container, options = container.actualOptions;
        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const distance = Math.abs(container.retina.connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance);
            let i = 0;
            for (const p1 of query) {
                const pos1 = p1.getPosition();
                for (const p2 of query.slice(i + 1)) {
                    const pos2 = p2.getPosition(), distMax = Math.abs(container.retina.connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
                    if (xDiff < distMax && yDiff < distMax) {
                        container.canvas.drawConnectLine(p1, p2);
                    }
                }
                ++i;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalConnectInteraction": () => (/* binding */ loadExternalConnectInteraction)
/* harmony export */ });
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Connector */ "./node_modules/tsparticles-interaction-external-connect/esm/Connector.js");

async function loadExternalConnectInteraction(engine) {
    await engine.addInteractor("externalConnect", (container) => new _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWNvbm5lY3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFDaEUsd0JBQXdCLHNFQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw2REFBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25Dd0M7QUFDakM7QUFDUCxxRUFBcUUsaURBQVM7QUFDOUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtY29ubmVjdC9lc20vQ29ubmVjdG9yLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1jb25uZWN0L2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHRlcm5hbEludGVyYWN0b3JCYXNlLCBpc0luQXJyYXkgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yIGV4dGVuZHMgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG1vdXNlID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UsIGV2ZW50cyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzO1xuICAgICAgICBpZiAoIShldmVudHMub25Ib3Zlci5lbmFibGUgJiYgbW91c2UucG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzSW5BcnJheShcImNvbm5lY3RcIiwgZXZlbnRzLm9uSG92ZXIubW9kZSk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgIH1cbiAgICBhc3luYyBpbnRlcmFjdCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5lbmFibGUgJiYgY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzID09PSBcIm1vdXNlbW92ZVwiKSB7XG4gICAgICAgICAgICBjb25zdCBtb3VzZVBvcyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKCFtb3VzZVBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMoY29udGFpbmVyLnJldGluYS5jb25uZWN0TW9kZVJhZGl1cyksIHF1ZXJ5ID0gY29udGFpbmVyLnBhcnRpY2xlcy5xdWFkVHJlZS5xdWVyeUNpcmNsZShtb3VzZVBvcywgZGlzdGFuY2UpO1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwMSBvZiBxdWVyeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvczEgPSBwMS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcDIgb2YgcXVlcnkuc2xpY2UoaSArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvczIgPSBwMi5nZXRQb3NpdGlvbigpLCBkaXN0TWF4ID0gTWF0aC5hYnMoY29udGFpbmVyLnJldGluYS5jb25uZWN0TW9kZURpc3RhbmNlKSwgeERpZmYgPSBNYXRoLmFicyhwb3MxLnggLSBwb3MyLngpLCB5RGlmZiA9IE1hdGguYWJzKHBvczEueSAtIHBvczIueSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4RGlmZiA8IGRpc3RNYXggJiYgeURpZmYgPCBkaXN0TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmRyYXdDb25uZWN0TGluZShwMSwgcDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuL0Nvbm5lY3RvclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRFeHRlcm5hbENvbm5lY3RJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkSW50ZXJhY3RvcihcImV4dGVybmFsQ29ubmVjdFwiLCAoY29udGFpbmVyKSA9PiBuZXcgQ29ubmVjdG9yKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9