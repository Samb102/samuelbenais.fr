"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-square"],{

/***/ "./node_modules/tsparticles-shape-square/esm/SquareDrawer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-shape-square/esm/SquareDrawer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SquareDrawer": () => (/* binding */ SquareDrawer)
/* harmony export */ });
const fixFactor = Math.sqrt(2);
class SquareDrawer {
    getSidesCount() {
        return 4;
    }
    draw(context, particle, radius) {
        context.rect(-radius / fixFactor, -radius / fixFactor, (radius * 2) / fixFactor, (radius * 2) / fixFactor);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-square/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-shape-square/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSquareShape": () => (/* binding */ loadSquareShape)
/* harmony export */ });
/* harmony import */ var _SquareDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SquareDrawer */ "./node_modules/tsparticles-shape-square/esm/SquareDrawer.js");

async function loadSquareShape(engine) {
    const drawer = new _SquareDrawer__WEBPACK_IMPORTED_MODULE_0__.SquareDrawer();
    await engine.addShape("edge", drawer);
    await engine.addShape("square", drawer);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLXNxdWFyZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUjhDO0FBQ3ZDO0FBQ1AsdUJBQXVCLHVEQUFZO0FBQ25DO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1zcXVhcmUvZXNtL1NxdWFyZURyYXdlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtc2hhcGUtc3F1YXJlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmaXhGYWN0b3IgPSBNYXRoLnNxcnQoMik7XG5leHBvcnQgY2xhc3MgU3F1YXJlRHJhd2VyIHtcbiAgICBnZXRTaWRlc0NvdW50KCkge1xuICAgICAgICByZXR1cm4gNDtcbiAgICB9XG4gICAgZHJhdyhjb250ZXh0LCBwYXJ0aWNsZSwgcmFkaXVzKSB7XG4gICAgICAgIGNvbnRleHQucmVjdCgtcmFkaXVzIC8gZml4RmFjdG9yLCAtcmFkaXVzIC8gZml4RmFjdG9yLCAocmFkaXVzICogMikgLyBmaXhGYWN0b3IsIChyYWRpdXMgKiAyKSAvIGZpeEZhY3Rvcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3F1YXJlRHJhd2VyIH0gZnJvbSBcIi4vU3F1YXJlRHJhd2VyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNxdWFyZVNoYXBlKGVuZ2luZSkge1xuICAgIGNvbnN0IGRyYXdlciA9IG5ldyBTcXVhcmVEcmF3ZXIoKTtcbiAgICBhd2FpdCBlbmdpbmUuYWRkU2hhcGUoXCJlZGdlXCIsIGRyYXdlcik7XG4gICAgYXdhaXQgZW5naW5lLmFkZFNoYXBlKFwic3F1YXJlXCIsIGRyYXdlcik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=