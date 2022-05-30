"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-move-parallax"],{

/***/ "./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParallaxMover": () => (/* binding */ ParallaxMover)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class ParallaxMover {
    init() {
    }
    isEnabled(particle) {
        return (!(0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isSsr)() &&
            !particle.destroyed &&
            particle.container.actualOptions.interactivity.events.onHover.parallax.enable);
    }
    move(particle) {
        const container = particle.container, options = container.actualOptions;
        if ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isSsr)() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }
        const parallaxForce = options.interactivity.events.onHover.parallax.force, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        }, parallaxSmooth = options.interactivity.events.onHover.parallax.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };
        particle.offset.x += (centerDistance.x - particle.offset.x) / parallaxSmooth;
        particle.offset.y += (centerDistance.y - particle.offset.y) / parallaxSmooth;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-move-parallax/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-move-parallax/esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadParallaxMover": () => (/* binding */ loadParallaxMover)
/* harmony export */ });
/* harmony import */ var _ParallaxMover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParallaxMover */ "./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js");

async function loadParallaxMover(engine) {
    engine.addMover("parallax", () => new _ParallaxMover__WEBPACK_IMPORTED_MODULE_0__.ParallaxMover());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLW1vdmUtcGFyYWxsYXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMkM7QUFDcEM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIseURBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkseURBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJnRDtBQUN6QztBQUNQLDBDQUEwQyx5REFBYTtBQUN2RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1tb3ZlLXBhcmFsbGF4L2VzbS9QYXJhbGxheE1vdmVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1tb3ZlLXBhcmFsbGF4L2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1NzciB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBQYXJhbGxheE1vdmVyIHtcbiAgICBpbml0KCkge1xuICAgIH1cbiAgICBpc0VuYWJsZWQocGFydGljbGUpIHtcbiAgICAgICAgcmV0dXJuICghaXNTc3IoKSAmJlxuICAgICAgICAgICAgIXBhcnRpY2xlLmRlc3Ryb3llZCAmJlxuICAgICAgICAgICAgcGFydGljbGUuY29udGFpbmVyLmFjdHVhbE9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5wYXJhbGxheC5lbmFibGUpO1xuICAgIH1cbiAgICBtb3ZlKHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHBhcnRpY2xlLmNvbnRhaW5lciwgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBpZiAoaXNTc3IoKSB8fCAhb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkhvdmVyLnBhcmFsbGF4LmVuYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFsbGF4Rm9yY2UgPSBvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uSG92ZXIucGFyYWxsYXguZm9yY2UsIG1vdXNlUG9zID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UucG9zaXRpb247XG4gICAgICAgIGlmICghbW91c2VQb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYW52YXNDZW50ZXIgPSB7XG4gICAgICAgICAgICB4OiBjb250YWluZXIuY2FudmFzLnNpemUud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogY29udGFpbmVyLmNhbnZhcy5zaXplLmhlaWdodCAvIDIsXG4gICAgICAgIH0sIHBhcmFsbGF4U21vb3RoID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkhvdmVyLnBhcmFsbGF4LnNtb290aCwgZmFjdG9yID0gcGFydGljbGUuZ2V0UmFkaXVzKCkgLyBwYXJhbGxheEZvcmNlLCBjZW50ZXJEaXN0YW5jZSA9IHtcbiAgICAgICAgICAgIHg6IChtb3VzZVBvcy54IC0gY2FudmFzQ2VudGVyLngpICogZmFjdG9yLFxuICAgICAgICAgICAgeTogKG1vdXNlUG9zLnkgLSBjYW52YXNDZW50ZXIueSkgKiBmYWN0b3IsXG4gICAgICAgIH07XG4gICAgICAgIHBhcnRpY2xlLm9mZnNldC54ICs9IChjZW50ZXJEaXN0YW5jZS54IC0gcGFydGljbGUub2Zmc2V0LngpIC8gcGFyYWxsYXhTbW9vdGg7XG4gICAgICAgIHBhcnRpY2xlLm9mZnNldC55ICs9IChjZW50ZXJEaXN0YW5jZS55IC0gcGFydGljbGUub2Zmc2V0LnkpIC8gcGFyYWxsYXhTbW9vdGg7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFyYWxsYXhNb3ZlciB9IGZyb20gXCIuL1BhcmFsbGF4TW92ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUGFyYWxsYXhNb3ZlcihlbmdpbmUpIHtcbiAgICBlbmdpbmUuYWRkTW92ZXIoXCJwYXJhbGxheFwiLCAoKSA9PiBuZXcgUGFyYWxsYXhNb3ZlcigpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==