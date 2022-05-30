"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-polygon"],{

/***/ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonDrawer": () => (/* binding */ PolygonDrawer)
/* harmony export */ });
/* harmony import */ var _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawerBase */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js");

class PolygonDrawer extends _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__.PolygonDrawerBase {
    getSidesData(particle, radius) {
        var _a, _b;
        const polygon = particle.shapeData;
        const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }
    getCenter(particle, radius) {
        const sides = this.getSidesCount(particle);
        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonDrawerBase": () => (/* binding */ PolygonDrawerBase)
/* harmony export */ });
class PolygonDrawerBase {
    getSidesCount(particle) {
        var _a, _b;
        const polygon = particle.shapeData;
        return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
    draw(context, particle, radius) {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180;
        if (!context) {
            return;
        }
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);
        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TriangleDrawer": () => (/* binding */ TriangleDrawer)
/* harmony export */ });
/* harmony import */ var _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawerBase */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js");

class TriangleDrawer extends _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__.PolygonDrawerBase {
    getSidesCount() {
        return 3;
    }
    getSidesData(particle, radius) {
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
    }
    getCenter(particle, radius) {
        return {
            x: -radius,
            y: radius / 1.66,
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadGenericPolygonShape": () => (/* binding */ loadGenericPolygonShape),
/* harmony export */   "loadPolygonShape": () => (/* binding */ loadPolygonShape),
/* harmony export */   "loadTriangleShape": () => (/* binding */ loadTriangleShape)
/* harmony export */ });
/* harmony import */ var _PolygonDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawer */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js");
/* harmony import */ var _TriangleDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TriangleDrawer */ "./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js");


async function loadGenericPolygonShape(engine) {
    await engine.addShape("polygon", new _PolygonDrawer__WEBPACK_IMPORTED_MODULE_0__.PolygonDrawer());
}
async function loadTriangleShape(engine) {
    await engine.addShape("triangle", new _TriangleDrawer__WEBPACK_IMPORTED_MODULE_1__.TriangleDrawer());
}
async function loadPolygonShape(engine) {
    await loadGenericPolygonShape(engine);
    await loadTriangleShape(engine);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLXBvbHlnb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDakQsNEJBQTRCLGlFQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCd0Q7QUFDakQsNkJBQTZCLGlFQUFpQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJnRDtBQUNFO0FBQzNDO0FBQ1AseUNBQXlDLHlEQUFhO0FBQ3REO0FBQ087QUFDUCwwQ0FBMEMsMkRBQWM7QUFDeEQ7QUFDTztBQUNQO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1wb2x5Z29uL2VzbS9Qb2x5Z29uRHJhd2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1wb2x5Z29uL2VzbS9Qb2x5Z29uRHJhd2VyQmFzZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtc2hhcGUtcG9seWdvbi9lc20vVHJpYW5nbGVEcmF3ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXNoYXBlLXBvbHlnb24vZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvbHlnb25EcmF3ZXJCYXNlIH0gZnJvbSBcIi4vUG9seWdvbkRyYXdlckJhc2VcIjtcbmV4cG9ydCBjbGFzcyBQb2x5Z29uRHJhd2VyIGV4dGVuZHMgUG9seWdvbkRyYXdlckJhc2Uge1xuICAgIGdldFNpZGVzRGF0YShwYXJ0aWNsZSwgcmFkaXVzKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHBvbHlnb24gPSBwYXJ0aWNsZS5zaGFwZURhdGE7XG4gICAgICAgIGNvbnN0IHNpZGVzID0gKF9iID0gKF9hID0gcG9seWdvbiA9PT0gbnVsbCB8fCBwb2x5Z29uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2x5Z29uLnNpZGVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwb2x5Z29uID09PSBudWxsIHx8IHBvbHlnb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvbHlnb24ubmJfc2lkZXMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb3VudDoge1xuICAgICAgICAgICAgICAgIGRlbm9taW5hdG9yOiAxLFxuICAgICAgICAgICAgICAgIG51bWVyYXRvcjogc2lkZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiAocmFkaXVzICogMi42NikgLyAoc2lkZXMgLyAzKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0Q2VudGVyKHBhcnRpY2xlLCByYWRpdXMpIHtcbiAgICAgICAgY29uc3Qgc2lkZXMgPSB0aGlzLmdldFNpZGVzQ291bnQocGFydGljbGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogLXJhZGl1cyAvIChzaWRlcyAvIDMuNSksXG4gICAgICAgICAgICB5OiAtcmFkaXVzIC8gKDIuNjYgLyAzLjUpLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQb2x5Z29uRHJhd2VyQmFzZSB7XG4gICAgZ2V0U2lkZXNDb3VudChwYXJ0aWNsZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwb2x5Z29uID0gcGFydGljbGUuc2hhcGVEYXRhO1xuICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gcG9seWdvbiA9PT0gbnVsbCB8fCBwb2x5Z29uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2x5Z29uLnNpZGVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwb2x5Z29uID09PSBudWxsIHx8IHBvbHlnb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvbHlnb24ubmJfc2lkZXMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDU7XG4gICAgfVxuICAgIGRyYXcoY29udGV4dCwgcGFydGljbGUsIHJhZGl1cykge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZ2V0Q2VudGVyKHBhcnRpY2xlLCByYWRpdXMpO1xuICAgICAgICBjb25zdCBzaWRlID0gdGhpcy5nZXRTaWRlc0RhdGEocGFydGljbGUsIHJhZGl1cyk7XG4gICAgICAgIGNvbnN0IHNpZGVDb3VudCA9IHNpZGUuY291bnQubnVtZXJhdG9yICogc2lkZS5jb3VudC5kZW5vbWluYXRvcjtcbiAgICAgICAgY29uc3QgZGVjaW1hbFNpZGVzID0gc2lkZS5jb3VudC5udW1lcmF0b3IgLyBzaWRlLmNvdW50LmRlbm9taW5hdG9yO1xuICAgICAgICBjb25zdCBpbnRlcmlvckFuZ2xlRGVncmVlcyA9ICgxODAgKiAoZGVjaW1hbFNpZGVzIC0gMikpIC8gZGVjaW1hbFNpZGVzO1xuICAgICAgICBjb25zdCBpbnRlcmlvckFuZ2xlID0gTWF0aC5QSSAtIChNYXRoLlBJICogaW50ZXJpb3JBbmdsZURlZ3JlZXMpIC8gMTgwO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShzdGFydC54LCBzdGFydC55KTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oMCwgMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lkZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHNpZGUubGVuZ3RoLCAwKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHNpZGUubGVuZ3RoLCAwKTtcbiAgICAgICAgICAgIGNvbnRleHQucm90YXRlKGludGVyaW9yQW5nbGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUG9seWdvbkRyYXdlckJhc2UgfSBmcm9tIFwiLi9Qb2x5Z29uRHJhd2VyQmFzZVwiO1xuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlRHJhd2VyIGV4dGVuZHMgUG9seWdvbkRyYXdlckJhc2Uge1xuICAgIGdldFNpZGVzQ291bnQoKSB7XG4gICAgICAgIHJldHVybiAzO1xuICAgIH1cbiAgICBnZXRTaWRlc0RhdGEocGFydGljbGUsIHJhZGl1cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY291bnQ6IHtcbiAgICAgICAgICAgICAgICBkZW5vbWluYXRvcjogMixcbiAgICAgICAgICAgICAgICBudW1lcmF0b3I6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiByYWRpdXMgKiAyLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRDZW50ZXIocGFydGljbGUsIHJhZGl1cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogLXJhZGl1cyxcbiAgICAgICAgICAgIHk6IHJhZGl1cyAvIDEuNjYsXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUG9seWdvbkRyYXdlciB9IGZyb20gXCIuL1BvbHlnb25EcmF3ZXJcIjtcbmltcG9ydCB7IFRyaWFuZ2xlRHJhd2VyIH0gZnJvbSBcIi4vVHJpYW5nbGVEcmF3ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR2VuZXJpY1BvbHlnb25TaGFwZShlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkU2hhcGUoXCJwb2x5Z29uXCIsIG5ldyBQb2x5Z29uRHJhd2VyKCkpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRUcmlhbmdsZVNoYXBlKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRTaGFwZShcInRyaWFuZ2xlXCIsIG5ldyBUcmlhbmdsZURyYXdlcigpKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUG9seWdvblNoYXBlKGVuZ2luZSkge1xuICAgIGF3YWl0IGxvYWRHZW5lcmljUG9seWdvblNoYXBlKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZFRyaWFuZ2xlU2hhcGUoZW5naW5lKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==