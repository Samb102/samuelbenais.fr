"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-push"],{

/***/ "./node_modules/tsparticles-interaction-external-push/esm/Pusher.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/Pusher.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pusher": () => (/* binding */ Pusher)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class Pusher extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "push") {
                return;
            }
            const container = this.container;
            const options = container.actualOptions;
            const pushNb = options.interactivity.modes.push.quantity;
            if (pushNb <= 0) {
                return;
            }
            const pushOptions = options.interactivity.modes.push;
            const group = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)([undefined, ...pushOptions.groups]);
            const groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
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

/***/ "./node_modules/tsparticles-interaction-external-push/esm/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalPushInteraction": () => (/* binding */ loadExternalPushInteraction)
/* harmony export */ });
/* harmony import */ var _Pusher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pusher */ "./node_modules/tsparticles-interaction-external-push/esm/Pusher.js");

async function loadExternalPushInteraction(engine) {
    await engine.addInteractor("externalPush", (container) => new _Pusher__WEBPACK_IMPORTED_MODULE_0__.Pusher(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXB1c2guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNEQ7QUFDVDtBQUM1QyxxQkFBcUIsc0VBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlFQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCa0M7QUFDM0I7QUFDUCxrRUFBa0UsMkNBQU07QUFDeEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtcHVzaC9lc20vUHVzaGVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1wdXNoL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHRlcm5hbEludGVyYWN0b3JCYXNlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgaXRlbUZyb21BcnJheSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBQdXNoZXIgZXh0ZW5kcyBFeHRlcm5hbEludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbGlja01vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1vZGUgIT09IFwicHVzaFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBwdXNoTmIgPSBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMucHVzaC5xdWFudGl0eTtcbiAgICAgICAgICAgIGlmIChwdXNoTmIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHB1c2hPcHRpb25zID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2g7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGl0ZW1Gcm9tQXJyYXkoW3VuZGVmaW5lZCwgLi4ucHVzaE9wdGlvbnMuZ3JvdXBzXSk7XG4gICAgICAgICAgICBjb25zdCBncm91cE9wdGlvbnMgPSBncm91cCAhPT0gdW5kZWZpbmVkID8gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMucGFydGljbGVzLmdyb3Vwc1tncm91cF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnB1c2gocHVzaE5iLCBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZSwgZ3JvdXBPcHRpb25zLCBncm91cCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgIH1cbiAgICBhc3luYyBpbnRlcmFjdCgpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQdXNoZXIgfSBmcm9tIFwiLi9QdXNoZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRXh0ZXJuYWxQdXNoSW50ZXJhY3Rpb24oZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZEludGVyYWN0b3IoXCJleHRlcm5hbFB1c2hcIiwgKGNvbnRhaW5lcikgPT4gbmV3IFB1c2hlcihjb250YWluZXIpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==