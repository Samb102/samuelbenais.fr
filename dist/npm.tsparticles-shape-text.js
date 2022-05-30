"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-text"],{

/***/ "./node_modules/tsparticles-shape-text/esm/TextDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-text/esm/TextDrawer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextDrawer": () => (/* binding */ TextDrawer),
/* harmony export */   "validTypes": () => (/* binding */ validTypes)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

const validTypes = ["text", "character", "char"];
class TextDrawer {
    getSidesCount() {
        return 12;
    }
    async init(container) {
        const options = container.actualOptions;
        if (validTypes.find((t) => (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                .map((t) => options.particles.shape.options[t])
                .find((t) => !!t);
            if (shapeOptions instanceof Array) {
                const promises = [];
                for (const character of shapeOptions) {
                    const charShape = character;
                    promises.push((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.loadFont)(charShape.font, charShape.weight));
                }
                await Promise.allSettled(promises);
            }
            else {
                if (shapeOptions !== undefined) {
                    const charShape = shapeOptions;
                    await (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.loadFont)(charShape.font, charShape.weight);
                }
            }
        }
    }
    draw(context, particle, radius, opacity) {
        var _a, _b, _c;
        const character = particle.shapeData;
        if (character === undefined) {
            return;
        }
        const textData = character.value;
        if (textData === undefined) {
            return;
        }
        const textParticle = particle;
        if (textParticle.text === undefined) {
            textParticle.text =
                textData instanceof Array ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)(textData, particle.randomIndexData) : textData;
        }
        const text = textParticle.text;
        const style = (_a = character.style) !== null && _a !== void 0 ? _a : "";
        const weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400";
        const size = Math.round(radius) * 2;
        const font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana";
        const fill = particle.fill;
        const offsetX = (text.length * radius) / 2;
        context.font = `${style} ${weight} ${size}px "${font}"`;
        const pos = {
            x: -offsetX,
            y: radius / 2,
        };
        context.globalAlpha = opacity;
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        }
        else {
            context.strokeText(text, pos.x, pos.y);
        }
        context.globalAlpha = 1;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-text/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-text/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadTextShape": () => (/* binding */ loadTextShape)
/* harmony export */ });
/* harmony import */ var _TextDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextDrawer */ "./node_modules/tsparticles-shape-text/esm/TextDrawer.js");

async function loadTextShape(engine) {
    const drawer = new _TextDrawer__WEBPACK_IMPORTED_MODULE_0__.TextDrawer();
    for (const type of _TextDrawer__WEBPACK_IMPORTED_MODULE_0__.validTypes) {
        await engine.addShape(type, drawer);
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLXRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ2pFO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDZEQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDREQUFRO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw0REFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGlFQUFhO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLE1BQU0sS0FBSztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVzRDtBQUMvQztBQUNQLHVCQUF1QixtREFBVTtBQUNqQyx1QkFBdUIsbURBQVU7QUFDakM7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXNoYXBlLXRleHQvZXNtL1RleHREcmF3ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXNoYXBlLXRleHQvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzSW5BcnJheSwgaXRlbUZyb21BcnJheSwgbG9hZEZvbnQgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY29uc3QgdmFsaWRUeXBlcyA9IFtcInRleHRcIiwgXCJjaGFyYWN0ZXJcIiwgXCJjaGFyXCJdO1xuZXhwb3J0IGNsYXNzIFRleHREcmF3ZXIge1xuICAgIGdldFNpZGVzQ291bnQoKSB7XG4gICAgICAgIHJldHVybiAxMjtcbiAgICB9XG4gICAgYXN5bmMgaW5pdChjb250YWluZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBpZiAodmFsaWRUeXBlcy5maW5kKCh0KSA9PiBpc0luQXJyYXkodCwgb3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUudHlwZSkpKSB7XG4gICAgICAgICAgICBjb25zdCBzaGFwZU9wdGlvbnMgPSB2YWxpZFR5cGVzXG4gICAgICAgICAgICAgICAgLm1hcCgodCkgPT4gb3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUub3B0aW9uc1t0XSlcbiAgICAgICAgICAgICAgICAuZmluZCgodCkgPT4gISF0KTtcbiAgICAgICAgICAgIGlmIChzaGFwZU9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGFyYWN0ZXIgb2Ygc2hhcGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJTaGFwZSA9IGNoYXJhY3RlcjtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChsb2FkRm9udChjaGFyU2hhcGUuZm9udCwgY2hhclNoYXBlLndlaWdodCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQocHJvbWlzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlT3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJTaGFwZSA9IHNoYXBlT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbG9hZEZvbnQoY2hhclNoYXBlLmZvbnQsIGNoYXJTaGFwZS53ZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3KGNvbnRleHQsIHBhcnRpY2xlLCByYWRpdXMsIG9wYWNpdHkpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IHBhcnRpY2xlLnNoYXBlRGF0YTtcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dERhdGEgPSBjaGFyYWN0ZXIudmFsdWU7XG4gICAgICAgIGlmICh0ZXh0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dFBhcnRpY2xlID0gcGFydGljbGU7XG4gICAgICAgIGlmICh0ZXh0UGFydGljbGUudGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ZXh0UGFydGljbGUudGV4dCA9XG4gICAgICAgICAgICAgICAgdGV4dERhdGEgaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW1Gcm9tQXJyYXkodGV4dERhdGEsIHBhcnRpY2xlLnJhbmRvbUluZGV4RGF0YSkgOiB0ZXh0RGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dFBhcnRpY2xlLnRleHQ7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gKF9hID0gY2hhcmFjdGVyLnN0eWxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiO1xuICAgICAgICBjb25zdCB3ZWlnaHQgPSAoX2IgPSBjaGFyYWN0ZXIud2VpZ2h0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBcIjQwMFwiO1xuICAgICAgICBjb25zdCBzaXplID0gTWF0aC5yb3VuZChyYWRpdXMpICogMjtcbiAgICAgICAgY29uc3QgZm9udCA9IChfYyA9IGNoYXJhY3Rlci5mb250KSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBcIlZlcmRhbmFcIjtcbiAgICAgICAgY29uc3QgZmlsbCA9IHBhcnRpY2xlLmZpbGw7XG4gICAgICAgIGNvbnN0IG9mZnNldFggPSAodGV4dC5sZW5ndGggKiByYWRpdXMpIC8gMjtcbiAgICAgICAgY29udGV4dC5mb250ID0gYCR7c3R5bGV9ICR7d2VpZ2h0fSAke3NpemV9cHggXCIke2ZvbnR9XCJgO1xuICAgICAgICBjb25zdCBwb3MgPSB7XG4gICAgICAgICAgICB4OiAtb2Zmc2V0WCxcbiAgICAgICAgICAgIHk6IHJhZGl1cyAvIDIsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBvcGFjaXR5O1xuICAgICAgICBpZiAoZmlsbCkge1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBwb3MueCwgcG9zLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VUZXh0KHRleHQsIHBvcy54LCBwb3MueSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGV4dERyYXdlciwgdmFsaWRUeXBlcyB9IGZyb20gXCIuL1RleHREcmF3ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVGV4dFNoYXBlKGVuZ2luZSkge1xuICAgIGNvbnN0IGRyYXdlciA9IG5ldyBUZXh0RHJhd2VyKCk7XG4gICAgZm9yIChjb25zdCB0eXBlIG9mIHZhbGlkVHlwZXMpIHtcbiAgICAgICAgYXdhaXQgZW5naW5lLmFkZFNoYXBlKHR5cGUsIGRyYXdlcik7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9