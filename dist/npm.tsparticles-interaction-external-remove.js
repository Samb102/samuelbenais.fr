"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-remove"],{

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/Remover.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/Remover.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Remover": () => (/* binding */ Remover)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Remover extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "remove") {
                return;
            }
            const container = this.container;
            const options = container.actualOptions;
            const removeNb = options.interactivity.modes.remove.quantity;
            container.particles.removeQuantity(removeNb);
        };
    }
    isEnabled() {
        return true;
    }
    reset() {
    }
    async interact() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalRemoveInteraction": () => (/* binding */ loadExternalRemoveInteraction)
/* harmony export */ });
/* harmony import */ var _Remover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Remover */ "./node_modules/tsparticles-interaction-external-remove/esm/Remover.js");

function loadExternalRemoveInteraction(engine) {
    engine.addInteractor("externalRemove", (container) => new _Remover__WEBPACK_IMPORTED_MODULE_0__.Remover(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXJlbW92ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE0RDtBQUNyRCxzQkFBc0Isc0VBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQm9DO0FBQzdCO0FBQ1AsOERBQThELDZDQUFPO0FBQ3JFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXJlbW92ZS9lc20vUmVtb3Zlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtcmVtb3ZlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHRlcm5hbEludGVyYWN0b3JCYXNlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGNsYXNzIFJlbW92ZXIgZXh0ZW5kcyBFeHRlcm5hbEludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbGlja01vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1vZGUgIT09IFwicmVtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZU5iID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlbW92ZS5xdWFudGl0eTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMucmVtb3ZlUXVhbnRpdHkocmVtb3ZlTmIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICB9XG4gICAgYXN5bmMgaW50ZXJhY3QoKSB7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVtb3ZlciB9IGZyb20gXCIuL1JlbW92ZXJcIjtcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRXh0ZXJuYWxSZW1vdmVJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBlbmdpbmUuYWRkSW50ZXJhY3RvcihcImV4dGVybmFsUmVtb3ZlXCIsIChjb250YWluZXIpID0+IG5ldyBSZW1vdmVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9