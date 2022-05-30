"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-line"],{

/***/ "./node_modules/tsparticles-shape-line/esm/LineDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-line/esm/LineDrawer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineDrawer": () => (/* binding */ LineDrawer)
/* harmony export */ });
class LineDrawer {
    getSidesCount() {
        return 1;
    }
    draw(context, particle, radius) {
        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-line/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-line/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadLineShape": () => (/* binding */ loadLineShape)
/* harmony export */ });
/* harmony import */ var _LineDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineDrawer */ "./node_modules/tsparticles-shape-line/esm/LineDrawer.js");

async function loadLineShape(engine) {
    await engine.addShape("line", new _LineDrawer__WEBPACK_IMPORTED_MODULE_0__.LineDrawer());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLWxpbmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1IwQztBQUNuQztBQUNQLHNDQUFzQyxtREFBVTtBQUNoRCIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1saW5lL2VzbS9MaW5lRHJhd2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1saW5lL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTGluZURyYXdlciB7XG4gICAgZ2V0U2lkZXNDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGRyYXcoY29udGV4dCwgcGFydGljbGUsIHJhZGl1cykge1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtcmFkaXVzIC8gMiwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHJhZGl1cyAvIDIsIDApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IExpbmVEcmF3ZXIgfSBmcm9tIFwiLi9MaW5lRHJhd2VyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZExpbmVTaGFwZShlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkU2hhcGUoXCJsaW5lXCIsIG5ldyBMaW5lRHJhd2VyKCkpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9