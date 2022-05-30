"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-roll"],{

/***/ "./node_modules/tsparticles-updater-roll/esm/RollUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/RollUpdater.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RollUpdater": () => (/* binding */ RollUpdater)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateRoll(particle, delta) {
    const roll = particle.options.roll;
    if (!particle.roll || !roll.enable) {
        return;
    }
    const speed = particle.roll.speed * delta.factor;
    const max = 2 * Math.PI;
    particle.roll.angle += speed;
    if (particle.roll.angle > max) {
        particle.roll.angle -= max;
    }
}
class RollUpdater {
    init(particle) {
        const rollOpt = particle.options.roll;
        if (rollOpt.enable) {
            particle.roll = {
                angle: Math.random() * Math.PI * 2,
                speed: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rollOpt.speed) / 360,
            };
            if (rollOpt.backColor) {
                particle.backColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(rollOpt.backColor);
            }
            else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
                const alterType = Math.random() >= 0.5 ? "darken" : "enlighten";
                particle.roll.alter = {
                    type: alterType,
                    value: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(alterType === "darken" ? rollOpt.darken.value : rollOpt.enlighten.value),
                };
            }
            else if (rollOpt.darken.enable) {
                particle.roll.alter = {
                    type: "darken",
                    value: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rollOpt.darken.value),
                };
            }
            else if (rollOpt.enlighten.enable) {
                particle.roll.alter = {
                    type: "enlighten",
                    value: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rollOpt.enlighten.value),
                };
            }
        }
        else {
            particle.roll = { angle: 0, speed: 0 };
        }
    }
    isEnabled(particle) {
        const roll = particle.options.roll;
        return !particle.destroyed && !particle.spawning && roll.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateRoll(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-roll/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadRollUpdater": () => (/* binding */ loadRollUpdater)
/* harmony export */ });
/* harmony import */ var _RollUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RollUpdater */ "./node_modules/tsparticles-updater-roll/esm/RollUpdater.js");

async function loadRollUpdater(engine) {
    await engine.addParticleUpdater("roll", () => new _RollUpdater__WEBPACK_IMPORTED_MODULE_0__.RollUpdater());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXVwZGF0ZXItcm9sbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUVBQWE7QUFDcEM7QUFDQTtBQUNBLHFDQUFxQyw4REFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlFQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUVBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpRUFBYTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFENEM7QUFDckM7QUFDUCxzREFBc0QscURBQVc7QUFDakUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1yb2xsL2VzbS9Sb2xsVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1yb2xsL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2xvclRvSHNsLCBnZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZnVuY3Rpb24gdXBkYXRlUm9sbChwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICBjb25zdCByb2xsID0gcGFydGljbGUub3B0aW9ucy5yb2xsO1xuICAgIGlmICghcGFydGljbGUucm9sbCB8fCAhcm9sbC5lbmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzcGVlZCA9IHBhcnRpY2xlLnJvbGwuc3BlZWQgKiBkZWx0YS5mYWN0b3I7XG4gICAgY29uc3QgbWF4ID0gMiAqIE1hdGguUEk7XG4gICAgcGFydGljbGUucm9sbC5hbmdsZSArPSBzcGVlZDtcbiAgICBpZiAocGFydGljbGUucm9sbC5hbmdsZSA+IG1heCkge1xuICAgICAgICBwYXJ0aWNsZS5yb2xsLmFuZ2xlIC09IG1heDtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgUm9sbFVwZGF0ZXIge1xuICAgIGluaXQocGFydGljbGUpIHtcbiAgICAgICAgY29uc3Qgcm9sbE9wdCA9IHBhcnRpY2xlLm9wdGlvbnMucm9sbDtcbiAgICAgICAgaWYgKHJvbGxPcHQuZW5hYmxlKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5yb2xsID0ge1xuICAgICAgICAgICAgICAgIGFuZ2xlOiBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IGdldFJhbmdlVmFsdWUocm9sbE9wdC5zcGVlZCkgLyAzNjAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHJvbGxPcHQuYmFja0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuYmFja0NvbG9yID0gY29sb3JUb0hzbChyb2xsT3B0LmJhY2tDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb2xsT3B0LmRhcmtlbi5lbmFibGUgJiYgcm9sbE9wdC5lbmxpZ2h0ZW4uZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWx0ZXJUeXBlID0gTWF0aC5yYW5kb20oKSA+PSAwLjUgPyBcImRhcmtlblwiIDogXCJlbmxpZ2h0ZW5cIjtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb2xsLmFsdGVyID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBhbHRlclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRSYW5nZVZhbHVlKGFsdGVyVHlwZSA9PT0gXCJkYXJrZW5cIiA/IHJvbGxPcHQuZGFya2VuLnZhbHVlIDogcm9sbE9wdC5lbmxpZ2h0ZW4udmFsdWUpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb2xsT3B0LmRhcmtlbi5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb2xsLmFsdGVyID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhcmtlblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0UmFuZ2VWYWx1ZShyb2xsT3B0LmRhcmtlbi52YWx1ZSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvbGxPcHQuZW5saWdodGVuLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvbGwuYWx0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZW5saWdodGVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRSYW5nZVZhbHVlKHJvbGxPcHQuZW5saWdodGVuLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFydGljbGUucm9sbCA9IHsgYW5nbGU6IDAsIHNwZWVkOiAwIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IHJvbGwgPSBwYXJ0aWNsZS5vcHRpb25zLnJvbGw7XG4gICAgICAgIHJldHVybiAhcGFydGljbGUuZGVzdHJveWVkICYmICFwYXJ0aWNsZS5zcGF3bmluZyAmJiByb2xsLmVuYWJsZTtcbiAgICB9XG4gICAgdXBkYXRlKHBhcnRpY2xlLCBkZWx0YSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKHBhcnRpY2xlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVJvbGwocGFydGljbGUsIGRlbHRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSb2xsVXBkYXRlciB9IGZyb20gXCIuL1JvbGxVcGRhdGVyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFJvbGxVcGRhdGVyKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQYXJ0aWNsZVVwZGF0ZXIoXCJyb2xsXCIsICgpID0+IG5ldyBSb2xsVXBkYXRlcigpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==