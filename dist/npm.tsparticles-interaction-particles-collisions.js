"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-particles-collisions"],{

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "absorb": () => (/* binding */ absorb)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function absorb(p1, p2, fps, pixelRatio) {
    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        if (p1.getRadius() >= p2.getRadius()) {
            const factor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
            p1.size.value += factor;
            p2.size.value -= factor;
            if (p2.getRadius() <= pixelRatio) {
                p2.size.value = 0;
                p2.destroy();
            }
        }
        else {
            const factor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
            p1.size.value -= factor;
            p2.size.value += factor;
            if (p1.getRadius() <= pixelRatio) {
                p1.size.value = 0;
                p1.destroy();
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bounce": () => (/* binding */ bounce)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function bounce(p1, p2) {
    (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounce)((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounceDataFromParticle)(p1), (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounceDataFromParticle)(p2));
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collider": () => (/* binding */ Collider)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _ResolveCollision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResolveCollision */ "./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js");


class Collider extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled(particle) {
        return particle.options.collisions.enable;
    }
    reset() {
    }
    async interact(p1) {
        const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
        for (const p2 of query) {
            if (p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition();
            const radius2 = p2.getRadius();
            if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
                continue;
            }
            const dist = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2);
            const distP = radius1 + radius2;
            if (dist > distP) {
                continue;
            }
            (0,_ResolveCollision__WEBPACK_IMPORTED_MODULE_1__.resolveCollision)(p1, p2, container.fpsLimit / 1000, container.retina.pixelRatio);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destroy": () => (/* binding */ destroy)
/* harmony export */ });
/* harmony import */ var _Bounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bounce */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js");

function destroy(p1, p2) {
    if (!p1.unbreakable && !p2.unbreakable) {
        (0,_Bounce__WEBPACK_IMPORTED_MODULE_0__.bounce)(p1, p2);
    }
    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        if (p1.getRadius() >= p2.getRadius()) {
            p2.destroy();
        }
        else {
            p1.destroy();
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveCollision": () => (/* binding */ resolveCollision)
/* harmony export */ });
/* harmony import */ var _Absorb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Absorb */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js");
/* harmony import */ var _Bounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bounce */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js");
/* harmony import */ var _Destroy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Destroy */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js");



function resolveCollision(p1, p2, fps, pixelRatio) {
    switch (p1.options.collisions.mode) {
        case "absorb": {
            (0,_Absorb__WEBPACK_IMPORTED_MODULE_0__.absorb)(p1, p2, fps, pixelRatio);
            break;
        }
        case "bounce": {
            (0,_Bounce__WEBPACK_IMPORTED_MODULE_1__.bounce)(p1, p2);
            break;
        }
        case "destroy": {
            (0,_Destroy__WEBPACK_IMPORTED_MODULE_2__.destroy)(p1, p2);
            break;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadParticlesCollisionsInteraction": () => (/* binding */ loadParticlesCollisionsInteraction)
/* harmony export */ });
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Collider */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js");

async function loadParticlesCollisionsInteraction(engine) {
    await engine.addInteractor("particlesCollisions", (container) => new _Collider__WEBPACK_IMPORTED_MODULE_0__.Collider(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLXBhcnRpY2xlcy1jb2xsaXNpb25zLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ3BDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix5REFBSztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlEQUFLO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCZ0Y7QUFDekU7QUFDUCxJQUFJLGdFQUFZLENBQUMsZ0ZBQTRCLE1BQU0sZ0ZBQTRCO0FBQy9FOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0gwRTtBQUNwQjtBQUMvQyx1QkFBdUIsdUVBQXVCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0RBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1FQUFnQjtBQUM1QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ2tDO0FBQzNCO0FBQ1A7QUFDQSxRQUFRLCtDQUFNO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25Ca0M7QUFDQTtBQUNFO0FBQzdCO0FBQ1A7QUFDQTtBQUNBLFlBQVksK0NBQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQ0FBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlEQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJzQztBQUMvQjtBQUNQLHlFQUF5RSwrQ0FBUTtBQUNqRiIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtY29sbGlzaW9ucy9lc20vQWJzb3JiLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtY29sbGlzaW9ucy9lc20vQm91bmNlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtY29sbGlzaW9ucy9lc20vQ29sbGlkZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLXBhcnRpY2xlcy1jb2xsaXNpb25zL2VzbS9EZXN0cm95LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtY29sbGlzaW9ucy9lc20vUmVzb2x2ZUNvbGxpc2lvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tcGFydGljbGVzLWNvbGxpc2lvbnMvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsYW1wIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGFic29yYihwMSwgcDIsIGZwcywgcGl4ZWxSYXRpbykge1xuICAgIGlmIChwMS5nZXRSYWRpdXMoKSA9PT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcDEuZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMS5nZXRSYWRpdXMoKSAhPT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcDIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMS5nZXRSYWRpdXMoKSAhPT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHAxLmdldFJhZGl1cygpID49IHAyLmdldFJhZGl1cygpKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBjbGFtcChwMS5nZXRSYWRpdXMoKSAvIHAyLmdldFJhZGl1cygpLCAwLCBwMi5nZXRSYWRpdXMoKSkgKiBmcHM7XG4gICAgICAgICAgICBwMS5zaXplLnZhbHVlICs9IGZhY3RvcjtcbiAgICAgICAgICAgIHAyLnNpemUudmFsdWUgLT0gZmFjdG9yO1xuICAgICAgICAgICAgaWYgKHAyLmdldFJhZGl1cygpIDw9IHBpeGVsUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBwMi5zaXplLnZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICBwMi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBjbGFtcChwMi5nZXRSYWRpdXMoKSAvIHAxLmdldFJhZGl1cygpLCAwLCBwMS5nZXRSYWRpdXMoKSkgKiBmcHM7XG4gICAgICAgICAgICBwMS5zaXplLnZhbHVlIC09IGZhY3RvcjtcbiAgICAgICAgICAgIHAyLnNpemUudmFsdWUgKz0gZmFjdG9yO1xuICAgICAgICAgICAgaWYgKHAxLmdldFJhZGl1cygpIDw9IHBpeGVsUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBwMS5zaXplLnZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICBwMS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjaXJjbGVCb3VuY2UsIGNpcmNsZUJvdW5jZURhdGFGcm9tUGFydGljbGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgZnVuY3Rpb24gYm91bmNlKHAxLCBwMikge1xuICAgIGNpcmNsZUJvdW5jZShjaXJjbGVCb3VuY2VEYXRhRnJvbVBhcnRpY2xlKHAxKSwgY2lyY2xlQm91bmNlRGF0YUZyb21QYXJ0aWNsZShwMikpO1xufVxuIiwiaW1wb3J0IHsgUGFydGljbGVzSW50ZXJhY3RvckJhc2UsIGdldERpc3RhbmNlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZUNvbGxpc2lvbiB9IGZyb20gXCIuL1Jlc29sdmVDb2xsaXNpb25cIjtcbmV4cG9ydCBjbGFzcyBDb2xsaWRlciBleHRlbmRzIFBhcnRpY2xlc0ludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWNsZS5vcHRpb25zLmNvbGxpc2lvbnMuZW5hYmxlO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG4gICAgYXN5bmMgaW50ZXJhY3QocDEpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIHBvczEgPSBwMS5nZXRQb3NpdGlvbigpLCByYWRpdXMxID0gcDEuZ2V0UmFkaXVzKCksIHF1ZXJ5ID0gY29udGFpbmVyLnBhcnRpY2xlcy5xdWFkVHJlZS5xdWVyeUNpcmNsZShwb3MxLCByYWRpdXMxICogMik7XG4gICAgICAgIGZvciAoY29uc3QgcDIgb2YgcXVlcnkpIHtcbiAgICAgICAgICAgIGlmIChwMSA9PT0gcDIgfHxcbiAgICAgICAgICAgICAgICAhcDIub3B0aW9ucy5jb2xsaXNpb25zLmVuYWJsZSB8fFxuICAgICAgICAgICAgICAgIHAxLm9wdGlvbnMuY29sbGlzaW9ucy5tb2RlICE9PSBwMi5vcHRpb25zLmNvbGxpc2lvbnMubW9kZSB8fFxuICAgICAgICAgICAgICAgIHAyLmRlc3Ryb3llZCB8fFxuICAgICAgICAgICAgICAgIHAyLnNwYXduaW5nKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb3MyID0gcDIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1czIgPSBwMi5nZXRSYWRpdXMoKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhNYXRoLnJvdW5kKHBvczEueikgLSBNYXRoLnJvdW5kKHBvczIueikpID4gcmFkaXVzMSArIHJhZGl1czIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBnZXREaXN0YW5jZShwb3MxLCBwb3MyKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RQID0gcmFkaXVzMSArIHJhZGl1czI7XG4gICAgICAgICAgICBpZiAoZGlzdCA+IGRpc3RQKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlQ29sbGlzaW9uKHAxLCBwMiwgY29udGFpbmVyLmZwc0xpbWl0IC8gMTAwMCwgY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGJvdW5jZSB9IGZyb20gXCIuL0JvdW5jZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3kocDEsIHAyKSB7XG4gICAgaWYgKCFwMS51bmJyZWFrYWJsZSAmJiAhcDIudW5icmVha2FibGUpIHtcbiAgICAgICAgYm91bmNlKHAxLCBwMik7XG4gICAgfVxuICAgIGlmIChwMS5nZXRSYWRpdXMoKSA9PT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcDEuZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMS5nZXRSYWRpdXMoKSAhPT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcDIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMS5nZXRSYWRpdXMoKSAhPT0gdW5kZWZpbmVkICYmIHAyLmdldFJhZGl1cygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHAxLmdldFJhZGl1cygpID49IHAyLmdldFJhZGl1cygpKSB7XG4gICAgICAgICAgICBwMi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwMS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBhYnNvcmIgfSBmcm9tIFwiLi9BYnNvcmJcIjtcbmltcG9ydCB7IGJvdW5jZSB9IGZyb20gXCIuL0JvdW5jZVwiO1xuaW1wb3J0IHsgZGVzdHJveSB9IGZyb20gXCIuL0Rlc3Ryb3lcIjtcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQ29sbGlzaW9uKHAxLCBwMiwgZnBzLCBwaXhlbFJhdGlvKSB7XG4gICAgc3dpdGNoIChwMS5vcHRpb25zLmNvbGxpc2lvbnMubW9kZSkge1xuICAgICAgICBjYXNlIFwiYWJzb3JiXCI6IHtcbiAgICAgICAgICAgIGFic29yYihwMSwgcDIsIGZwcywgcGl4ZWxSYXRpbyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYm91bmNlXCI6IHtcbiAgICAgICAgICAgIGJvdW5jZShwMSwgcDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImRlc3Ryb3lcIjoge1xuICAgICAgICAgICAgZGVzdHJveShwMSwgcDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb2xsaWRlciB9IGZyb20gXCIuL0NvbGxpZGVyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFBhcnRpY2xlc0NvbGxpc2lvbnNJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkSW50ZXJhY3RvcihcInBhcnRpY2xlc0NvbGxpc2lvbnNcIiwgKGNvbnRhaW5lcikgPT4gbmV3IENvbGxpZGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9