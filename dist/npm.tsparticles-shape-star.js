"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-star"],{

/***/ "./node_modules/tsparticles-shape-star/esm/StarDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-star/esm/StarDrawer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StarDrawer": () => (/* binding */ StarDrawer)
/* harmony export */ });
class StarDrawer {
    getSidesCount(particle) {
        var _a, _b;
        const star = particle.shapeData;
        return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
    draw(context, particle, radius) {
        var _a;
        const star = particle.shapeData;
        const sides = this.getSidesCount(particle);
        const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
        context.moveTo(0, 0 - radius);
        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-star/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-star/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadStarShape": () => (/* binding */ loadStarShape)
/* harmony export */ });
/* harmony import */ var _StarDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StarDrawer */ "./node_modules/tsparticles-shape-star/esm/StarDrawer.js");

async function loadStarShape(engine) {
    await engine.addShape("star", new _StarDrawer__WEBPACK_IMPORTED_MODULE_0__.StarDrawer());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLXN0YXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixXQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkIwQztBQUNuQztBQUNQLHNDQUFzQyxtREFBVTtBQUNoRCIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1zdGFyL2VzbS9TdGFyRHJhd2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1zdGFyL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RhckRyYXdlciB7XG4gICAgZ2V0U2lkZXNDb3VudChwYXJ0aWNsZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBzdGFyID0gcGFydGljbGUuc2hhcGVEYXRhO1xuICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gc3RhciA9PT0gbnVsbCB8fCBzdGFyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGFyLnNpZGVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzdGFyID09PSBudWxsIHx8IHN0YXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXIubmJfc2lkZXMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDU7XG4gICAgfVxuICAgIGRyYXcoY29udGV4dCwgcGFydGljbGUsIHJhZGl1cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHN0YXIgPSBwYXJ0aWNsZS5zaGFwZURhdGE7XG4gICAgICAgIGNvbnN0IHNpZGVzID0gdGhpcy5nZXRTaWRlc0NvdW50KHBhcnRpY2xlKTtcbiAgICAgICAgY29uc3QgaW5zZXQgPSAoX2EgPSBzdGFyID09PSBudWxsIHx8IHN0YXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXIuaW5zZXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDI7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKDAsIDAgLSByYWRpdXMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZGVzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRleHQucm90YXRlKE1hdGguUEkgLyBzaWRlcyk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbygwLCAwIC0gcmFkaXVzICogaW5zZXQpO1xuICAgICAgICAgICAgY29udGV4dC5yb3RhdGUoTWF0aC5QSSAvIHNpZGVzKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKDAsIDAgLSByYWRpdXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3RhckRyYXdlciB9IGZyb20gXCIuL1N0YXJEcmF3ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkU3RhclNoYXBlKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRTaGFwZShcInN0YXJcIiwgbmV3IFN0YXJEcmF3ZXIoKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=