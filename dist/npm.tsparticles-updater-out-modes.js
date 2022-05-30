"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-updater-out-modes"],{

/***/ "./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BounceOutMode": () => (/* binding */ BounceOutMode)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-updater-out-modes/esm/Utils.js");


class BounceOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [
            "bounce",
            "bounce-vertical",
            "bounce-horizontal",
            "bounceVertical",
            "bounceHorizontal",
            "split",
        ];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        let handled = false;
        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
            }
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calculateBounds)(pos, size), canvasSize = container.canvas.size;
        (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.bounceHorizontal)({ particle, outMode, direction, bounds, canvasSize, offset, size });
        (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.bounceVertical)({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DestroyOutMode": () => (/* binding */ DestroyOutMode)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class DestroyOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["destroy"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case "normal":
            case "outside":
                if ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside)(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin, particle.getRadius(), direction)) {
                    return;
                }
                break;
            case "inside": {
                const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, particle.moveCenter);
                const { x: vx, y: vy } = particle.velocity;
                if ((vx < 0 && dx > particle.moveCenter.radius) ||
                    (vy < 0 && dy > particle.moveCenter.radius) ||
                    (vx >= 0 && dx < -particle.moveCenter.radius) ||
                    (vy >= 0 && dy < -particle.moveCenter.radius)) {
                    return;
                }
                break;
            }
        }
        container.particles.remove(particle, undefined, true);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoneOutMode": () => (/* binding */ NoneOutMode)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class NoneOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["none"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        if ((particle.options.move.distance.horizontal &&
            (direction === "left" || direction === "right")) ||
            (particle.options.move.distance.vertical &&
                (direction === "top" || direction === "bottom"))) {
            return;
        }
        const gravityOptions = particle.options.move.gravity, container = this.container;
        const canvasSize = container.canvas.size;
        const pRadius = particle.getRadius();
        if (!gravityOptions.enable) {
            if ((particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius) ||
                (particle.velocity.y < 0 && particle.position.y >= -pRadius) ||
                (particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius) ||
                (particle.velocity.x < 0 && particle.position.x >= -pRadius)) {
                return;
            }
            if (!(0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside)(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin, pRadius, direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((!gravityOptions.inverse &&
                position.y > canvasSize.height + pRadius &&
                direction === "bottom") ||
                (gravityOptions.inverse && position.y < -pRadius && direction === "top")) {
                container.particles.remove(particle);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutOfCanvasUpdater": () => (/* binding */ OutOfCanvasUpdater)
/* harmony export */ });
/* harmony import */ var _BounceOutMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BounceOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js");
/* harmony import */ var _DestroyOutMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DestroyOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js");
/* harmony import */ var _NoneOutMode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoneOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js");
/* harmony import */ var _OutOutMode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OutOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js");




class OutOfCanvasUpdater {
    constructor(container) {
        this.container = container;
        this.updaters = [
            new _BounceOutMode__WEBPACK_IMPORTED_MODULE_0__.BounceOutMode(container),
            new _DestroyOutMode__WEBPACK_IMPORTED_MODULE_1__.DestroyOutMode(container),
            new _OutOutMode__WEBPACK_IMPORTED_MODULE_3__.OutOutMode(container),
            new _NoneOutMode__WEBPACK_IMPORTED_MODULE_2__.NoneOutMode(container),
        ];
    }
    init() {
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning;
    }
    update(particle, delta) {
        var _a, _b, _c, _d;
        const outModes = particle.options.move.outModes;
        this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, "bottom");
        this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, "left");
        this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, "right");
        this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, "top");
    }
    updateOutMode(particle, delta, outMode, direction) {
        for (const updater of this.updaters) {
            updater.update(particle, direction, delta, outMode);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutOutMode": () => (/* binding */ OutOutMode)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class OutOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["out"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case "inside": {
                const { x: vx, y: vy } = particle.velocity;
                const circVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin;
                circVec.length = particle.moveCenter.radius;
                circVec.angle = particle.velocity.angle + Math.PI;
                circVec.addTo(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(particle.moveCenter));
                const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, circVec);
                if ((vx <= 0 && dx >= 0) || (vy <= 0 && dy >= 0) || (vx >= 0 && dx <= 0) || (vy >= 0 && dy <= 0)) {
                    return;
                }
                particle.position.x = Math.floor((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)({
                    min: 0,
                    max: container.canvas.size.width,
                }));
                particle.position.y = Math.floor((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)({
                    min: 0,
                    max: container.canvas.size.height,
                }));
                const { dx: newDx, dy: newDy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, particle.moveCenter);
                particle.direction = Math.atan2(-newDy, -newDx);
                particle.velocity.angle = particle.direction;
                break;
            }
            default: {
                if ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside)(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin, particle.getRadius(), direction)) {
                    return;
                }
                switch (particle.outType) {
                    case "outside": {
                        particle.position.x =
                            Math.floor((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)({
                                min: -particle.moveCenter.radius,
                                max: particle.moveCenter.radius,
                            })) + particle.moveCenter.x;
                        particle.position.y =
                            Math.floor((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)({
                                min: -particle.moveCenter.radius,
                                max: particle.moveCenter.radius,
                            })) + particle.moveCenter.y;
                        const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(particle.position, particle.moveCenter);
                        if (particle.moveCenter.radius) {
                            particle.direction = Math.atan2(dy, dx);
                            particle.velocity.angle = particle.direction;
                        }
                        break;
                    }
                    case "normal": {
                        const wrap = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
                            bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                            left: -particle.getRadius() - particle.offset.x,
                            right: canvasSize.width + particle.getRadius() + particle.offset.x,
                            top: -particle.getRadius() - particle.offset.y,
                        }, sizeValue = particle.getRadius(), nextBounds = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calculateBounds)(particle.position, sizeValue);
                        if (direction === "right" &&
                            nextBounds.left > canvasSize.width + particle.offset.x) {
                            particle.position.x = newPos.left;
                            particle.initialPosition.x = particle.position.x;
                            if (!wrap) {
                                particle.position.y = Math.random() * canvasSize.height;
                                particle.initialPosition.y = particle.position.y;
                            }
                        }
                        else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                            particle.position.x = newPos.right;
                            particle.initialPosition.x = particle.position.x;
                            if (!wrap) {
                                particle.position.y = Math.random() * canvasSize.height;
                                particle.initialPosition.y = particle.position.y;
                            }
                        }
                        if (direction === "bottom" &&
                            nextBounds.top > canvasSize.height + particle.offset.y) {
                            if (!wrap) {
                                particle.position.x = Math.random() * canvasSize.width;
                                particle.initialPosition.x = particle.position.x;
                            }
                            particle.position.y = newPos.top;
                            particle.initialPosition.y = particle.position.y;
                        }
                        else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                            if (!wrap) {
                                particle.position.x = Math.random() * canvasSize.width;
                                particle.initialPosition.x = particle.position.x;
                            }
                            particle.position.y = newPos.bottom;
                            particle.initialPosition.y = particle.position.y;
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/Utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/Utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bounceHorizontal": () => (/* binding */ bounceHorizontal),
/* harmony export */   "bounceVertical": () => (/* binding */ bounceVertical)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function bounceHorizontal(data) {
    if (!(data.outMode === "bounce" ||
        data.outMode === "bounce-horizontal" ||
        data.outMode === "bounceHorizontal" ||
        data.outMode === "split")) {
        return;
    }
    const velocity = data.particle.velocity.x;
    let bounced = false;
    if ((data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === "left" && data.bounds.left <= 0 && velocity < 0)) {
        const newVelocity = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getValue)(data.particle.options.bounce.horizontal);
        data.particle.velocity.x *= -newVelocity;
        bounced = true;
    }
    if (!bounced) {
        return;
    }
    const minPos = data.offset.x + data.size;
    if (data.bounds.right >= data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - minPos;
    }
    else if (data.bounds.left <= 0) {
        data.particle.position.x = minPos;
    }
    if (data.outMode === "split") {
        data.particle.destroy();
    }
}
function bounceVertical(data) {
    if (data.outMode === "bounce" ||
        data.outMode === "bounce-vertical" ||
        data.outMode === "bounceVertical" ||
        data.outMode === "split") {
        const velocity = data.particle.velocity.y;
        let bounced = false;
        if ((data.direction === "bottom" &&
            data.bounds.bottom >= data.canvasSize.height &&
            velocity > 0) ||
            (data.direction === "top" && data.bounds.top <= 0 && velocity < 0)) {
            const newVelocity = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getValue)(data.particle.options.bounce.vertical);
            data.particle.velocity.y *= -newVelocity;
            bounced = true;
        }
        if (!bounced) {
            return;
        }
        const minPos = data.offset.y + data.size;
        if (data.bounds.bottom >= data.canvasSize.height) {
            data.particle.position.y = data.canvasSize.height - minPos;
        }
        else if (data.bounds.top <= 0) {
            data.particle.position.y = minPos;
        }
        if (data.outMode === "split") {
            data.particle.destroy();
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadOutModesUpdater": () => (/* binding */ loadOutModesUpdater)
/* harmony export */ });
/* harmony import */ var _OutOfCanvasUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutOfCanvasUpdater */ "./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js");

async function loadOutModesUpdater(engine) {
    await engine.addParticleUpdater("outModes", (container) => new _OutOfCanvasUpdater__WEBPACK_IMPORTED_MODULE_0__.OutOfCanvasUpdater(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzhDO0FBQ3ZDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNERBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNERBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0QwRDtBQUNuRDtBQUNQLG1FQUFtRSxtRUFBa0I7QUFDckYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1vdXQtbW9kZXMvZXNtL0JvdW5jZU91dE1vZGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXVwZGF0ZXItb3V0LW1vZGVzL2VzbS9EZXN0cm95T3V0TW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1vdXQtbW9kZXMvZXNtL05vbmVPdXRNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy11cGRhdGVyLW91dC1tb2Rlcy9lc20vT3V0T2ZDYW52YXNVcGRhdGVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy11cGRhdGVyLW91dC1tb2Rlcy9lc20vT3V0T3V0TW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtdXBkYXRlci1vdXQtbW9kZXMvZXNtL1V0aWxzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy11cGRhdGVyLW91dC1tb2Rlcy9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FsY3VsYXRlQm91bmRzIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgYm91bmNlSG9yaXpvbnRhbCwgYm91bmNlVmVydGljYWwgfSBmcm9tIFwiLi9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIEJvdW5jZU91dE1vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5tb2RlcyA9IFtcbiAgICAgICAgICAgIFwiYm91bmNlXCIsXG4gICAgICAgICAgICBcImJvdW5jZS12ZXJ0aWNhbFwiLFxuICAgICAgICAgICAgXCJib3VuY2UtaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgXCJib3VuY2VWZXJ0aWNhbFwiLFxuICAgICAgICAgICAgXCJib3VuY2VIb3Jpem9udGFsXCIsXG4gICAgICAgICAgICBcInNwbGl0XCIsXG4gICAgICAgIF07XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGlyZWN0aW9uLCBkZWx0YSwgb3V0TW9kZSkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZXMuaW5jbHVkZXMob3V0TW9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBbLCBwbHVnaW5dIG9mIGNvbnRhaW5lci5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAocGx1Z2luLnBhcnRpY2xlQm91bmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVkID0gcGx1Z2luLnBhcnRpY2xlQm91bmNlKHBhcnRpY2xlLCBkZWx0YSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwb3MgPSBwYXJ0aWNsZS5nZXRQb3NpdGlvbigpLCBvZmZzZXQgPSBwYXJ0aWNsZS5vZmZzZXQsIHNpemUgPSBwYXJ0aWNsZS5nZXRSYWRpdXMoKSwgYm91bmRzID0gY2FsY3VsYXRlQm91bmRzKHBvcywgc2l6ZSksIGNhbnZhc1NpemUgPSBjb250YWluZXIuY2FudmFzLnNpemU7XG4gICAgICAgIGJvdW5jZUhvcml6b250YWwoeyBwYXJ0aWNsZSwgb3V0TW9kZSwgZGlyZWN0aW9uLCBib3VuZHMsIGNhbnZhc1NpemUsIG9mZnNldCwgc2l6ZSB9KTtcbiAgICAgICAgYm91bmNlVmVydGljYWwoeyBwYXJ0aWNsZSwgb3V0TW9kZSwgZGlyZWN0aW9uLCBib3VuZHMsIGNhbnZhc1NpemUsIG9mZnNldCwgc2l6ZSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IsIGdldERpc3RhbmNlcywgaXNQb2ludEluc2lkZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBEZXN0cm95T3V0TW9kZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLm1vZGVzID0gW1wiZGVzdHJveVwiXTtcbiAgICB9XG4gICAgdXBkYXRlKHBhcnRpY2xlLCBkaXJlY3Rpb24sIGRlbHRhLCBvdXRNb2RlKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2Rlcy5pbmNsdWRlcyhvdXRNb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBzd2l0Y2ggKHBhcnRpY2xlLm91dFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJub3JtYWxcIjpcbiAgICAgICAgICAgIGNhc2UgXCJvdXRzaWRlXCI6XG4gICAgICAgICAgICAgICAgaWYgKGlzUG9pbnRJbnNpZGUocGFydGljbGUucG9zaXRpb24sIGNvbnRhaW5lci5jYW52YXMuc2l6ZSwgVmVjdG9yLm9yaWdpbiwgcGFydGljbGUuZ2V0UmFkaXVzKCksIGRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpbnNpZGVcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBnZXREaXN0YW5jZXMocGFydGljbGUucG9zaXRpb24sIHBhcnRpY2xlLm1vdmVDZW50ZXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgeDogdngsIHk6IHZ5IH0gPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICAgICAgICAgICAgICBpZiAoKHZ4IDwgMCAmJiBkeCA+IHBhcnRpY2xlLm1vdmVDZW50ZXIucmFkaXVzKSB8fFxuICAgICAgICAgICAgICAgICAgICAodnkgPCAwICYmIGR5ID4gcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMpIHx8XG4gICAgICAgICAgICAgICAgICAgICh2eCA+PSAwICYmIGR4IDwgLXBhcnRpY2xlLm1vdmVDZW50ZXIucmFkaXVzKSB8fFxuICAgICAgICAgICAgICAgICAgICAodnkgPj0gMCAmJiBkeSA8IC1wYXJ0aWNsZS5tb3ZlQ2VudGVyLnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIucGFydGljbGVzLnJlbW92ZShwYXJ0aWNsZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IsIGlzUG9pbnRJbnNpZGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgTm9uZU91dE1vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5tb2RlcyA9IFtcIm5vbmVcIl07XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGlyZWN0aW9uLCBkZWx0YSwgb3V0TW9kZSkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZXMuaW5jbHVkZXMob3V0TW9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHBhcnRpY2xlLm9wdGlvbnMubW92ZS5kaXN0YW5jZS5ob3Jpem9udGFsICYmXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSBcImxlZnRcIiB8fCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIikpIHx8XG4gICAgICAgICAgICAocGFydGljbGUub3B0aW9ucy5tb3ZlLmRpc3RhbmNlLnZlcnRpY2FsICYmXG4gICAgICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gXCJ0b3BcIiB8fCBkaXJlY3Rpb24gPT09IFwiYm90dG9tXCIpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyYXZpdHlPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy5tb3ZlLmdyYXZpdHksIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBjYW52YXNTaXplID0gY29udGFpbmVyLmNhbnZhcy5zaXplO1xuICAgICAgICBjb25zdCBwUmFkaXVzID0gcGFydGljbGUuZ2V0UmFkaXVzKCk7XG4gICAgICAgIGlmICghZ3Jhdml0eU9wdGlvbnMuZW5hYmxlKSB7XG4gICAgICAgICAgICBpZiAoKHBhcnRpY2xlLnZlbG9jaXR5LnkgPiAwICYmIHBhcnRpY2xlLnBvc2l0aW9uLnkgPD0gY2FudmFzU2l6ZS5oZWlnaHQgKyBwUmFkaXVzKSB8fFxuICAgICAgICAgICAgICAgIChwYXJ0aWNsZS52ZWxvY2l0eS55IDwgMCAmJiBwYXJ0aWNsZS5wb3NpdGlvbi55ID49IC1wUmFkaXVzKSB8fFxuICAgICAgICAgICAgICAgIChwYXJ0aWNsZS52ZWxvY2l0eS54ID4gMCAmJiBwYXJ0aWNsZS5wb3NpdGlvbi54IDw9IGNhbnZhc1NpemUud2lkdGggKyBwUmFkaXVzKSB8fFxuICAgICAgICAgICAgICAgIChwYXJ0aWNsZS52ZWxvY2l0eS54IDwgMCAmJiBwYXJ0aWNsZS5wb3NpdGlvbi54ID49IC1wUmFkaXVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQb2ludEluc2lkZShwYXJ0aWNsZS5wb3NpdGlvbiwgY29udGFpbmVyLmNhbnZhcy5zaXplLCBWZWN0b3Iub3JpZ2luLCBwUmFkaXVzLCBkaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5yZW1vdmUocGFydGljbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICgoIWdyYXZpdHlPcHRpb25zLmludmVyc2UgJiZcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID4gY2FudmFzU2l6ZS5oZWlnaHQgKyBwUmFkaXVzICYmXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID09PSBcImJvdHRvbVwiKSB8fFxuICAgICAgICAgICAgICAgIChncmF2aXR5T3B0aW9ucy5pbnZlcnNlICYmIHBvc2l0aW9uLnkgPCAtcFJhZGl1cyAmJiBkaXJlY3Rpb24gPT09IFwidG9wXCIpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5yZW1vdmUocGFydGljbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQm91bmNlT3V0TW9kZSB9IGZyb20gXCIuL0JvdW5jZU91dE1vZGVcIjtcbmltcG9ydCB7IERlc3Ryb3lPdXRNb2RlIH0gZnJvbSBcIi4vRGVzdHJveU91dE1vZGVcIjtcbmltcG9ydCB7IE5vbmVPdXRNb2RlIH0gZnJvbSBcIi4vTm9uZU91dE1vZGVcIjtcbmltcG9ydCB7IE91dE91dE1vZGUgfSBmcm9tIFwiLi9PdXRPdXRNb2RlXCI7XG5leHBvcnQgY2xhc3MgT3V0T2ZDYW52YXNVcGRhdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMudXBkYXRlcnMgPSBbXG4gICAgICAgICAgICBuZXcgQm91bmNlT3V0TW9kZShjb250YWluZXIpLFxuICAgICAgICAgICAgbmV3IERlc3Ryb3lPdXRNb2RlKGNvbnRhaW5lciksXG4gICAgICAgICAgICBuZXcgT3V0T3V0TW9kZShjb250YWluZXIpLFxuICAgICAgICAgICAgbmV3IE5vbmVPdXRNb2RlKGNvbnRhaW5lciksXG4gICAgICAgIF07XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgfVxuICAgIGlzRW5hYmxlZChwYXJ0aWNsZSkge1xuICAgICAgICByZXR1cm4gIXBhcnRpY2xlLmRlc3Ryb3llZCAmJiAhcGFydGljbGUuc3Bhd25pbmc7XG4gICAgfVxuICAgIHVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBjb25zdCBvdXRNb2RlcyA9IHBhcnRpY2xlLm9wdGlvbnMubW92ZS5vdXRNb2RlcztcbiAgICAgICAgdGhpcy51cGRhdGVPdXRNb2RlKHBhcnRpY2xlLCBkZWx0YSwgKF9hID0gb3V0TW9kZXMuYm90dG9tKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBvdXRNb2Rlcy5kZWZhdWx0LCBcImJvdHRvbVwiKTtcbiAgICAgICAgdGhpcy51cGRhdGVPdXRNb2RlKHBhcnRpY2xlLCBkZWx0YSwgKF9iID0gb3V0TW9kZXMubGVmdCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogb3V0TW9kZXMuZGVmYXVsdCwgXCJsZWZ0XCIpO1xuICAgICAgICB0aGlzLnVwZGF0ZU91dE1vZGUocGFydGljbGUsIGRlbHRhLCAoX2MgPSBvdXRNb2Rlcy5yaWdodCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogb3V0TW9kZXMuZGVmYXVsdCwgXCJyaWdodFwiKTtcbiAgICAgICAgdGhpcy51cGRhdGVPdXRNb2RlKHBhcnRpY2xlLCBkZWx0YSwgKF9kID0gb3V0TW9kZXMudG9wKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBvdXRNb2Rlcy5kZWZhdWx0LCBcInRvcFwiKTtcbiAgICB9XG4gICAgdXBkYXRlT3V0TW9kZShwYXJ0aWNsZSwgZGVsdGEsIG91dE1vZGUsIGRpcmVjdGlvbikge1xuICAgICAgICBmb3IgKGNvbnN0IHVwZGF0ZXIgb2YgdGhpcy51cGRhdGVycykge1xuICAgICAgICAgICAgdXBkYXRlci51cGRhdGUocGFydGljbGUsIGRpcmVjdGlvbiwgZGVsdGEsIG91dE1vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yLCBjYWxjdWxhdGVCb3VuZHMsIGdldERpc3RhbmNlcywgaXNQb2ludEluc2lkZSwgcmFuZG9tSW5SYW5nZSwgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgT3V0T3V0TW9kZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLm1vZGVzID0gW1wib3V0XCJdO1xuICAgIH1cbiAgICB1cGRhdGUocGFydGljbGUsIGRpcmVjdGlvbiwgZGVsdGEsIG91dE1vZGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVzLmluY2x1ZGVzKG91dE1vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIHN3aXRjaCAocGFydGljbGUub3V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImluc2lkZVwiOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB4OiB2eCwgeTogdnkgfSA9IHBhcnRpY2xlLnZlbG9jaXR5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNWZWMgPSBWZWN0b3Iub3JpZ2luO1xuICAgICAgICAgICAgICAgIGNpcmNWZWMubGVuZ3RoID0gcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXM7XG4gICAgICAgICAgICAgICAgY2lyY1ZlYy5hbmdsZSA9IHBhcnRpY2xlLnZlbG9jaXR5LmFuZ2xlICsgTWF0aC5QSTtcbiAgICAgICAgICAgICAgICBjaXJjVmVjLmFkZFRvKFZlY3Rvci5jcmVhdGUocGFydGljbGUubW92ZUNlbnRlcikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBnZXREaXN0YW5jZXMocGFydGljbGUucG9zaXRpb24sIGNpcmNWZWMpO1xuICAgICAgICAgICAgICAgIGlmICgodnggPD0gMCAmJiBkeCA+PSAwKSB8fCAodnkgPD0gMCAmJiBkeSA+PSAwKSB8fCAodnggPj0gMCAmJiBkeCA8PSAwKSB8fCAodnkgPj0gMCAmJiBkeSA8PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSBNYXRoLmZsb29yKHJhbmRvbUluUmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogY29udGFpbmVyLmNhbnZhcy5zaXplLndpZHRoLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gTWF0aC5mbG9vcihyYW5kb21JblJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IGNvbnRhaW5lci5jYW52YXMuc2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHg6IG5ld0R4LCBkeTogbmV3RHkgfSA9IGdldERpc3RhbmNlcyhwYXJ0aWNsZS5wb3NpdGlvbiwgcGFydGljbGUubW92ZUNlbnRlcik7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuZGlyZWN0aW9uID0gTWF0aC5hdGFuMigtbmV3RHksIC1uZXdEeCk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkuYW5nbGUgPSBwYXJ0aWNsZS5kaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUG9pbnRJbnNpZGUocGFydGljbGUucG9zaXRpb24sIGNvbnRhaW5lci5jYW52YXMuc2l6ZSwgVmVjdG9yLm9yaWdpbiwgcGFydGljbGUuZ2V0UmFkaXVzKCksIGRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBhcnRpY2xlLm91dFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dHNpZGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihyYW5kb21JblJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAtcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpICsgcGFydGljbGUubW92ZUNlbnRlci54O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihyYW5kb21JblJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAtcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogcGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpICsgcGFydGljbGUubW92ZUNlbnRlci55O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkeCwgZHkgfSA9IGdldERpc3RhbmNlcyhwYXJ0aWNsZS5wb3NpdGlvbiwgcGFydGljbGUubW92ZUNlbnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydGljbGUubW92ZUNlbnRlci5yYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5kaXJlY3Rpb24gPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkuYW5nbGUgPSBwYXJ0aWNsZS5kaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9ybWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyYXAgPSBwYXJ0aWNsZS5vcHRpb25zLm1vdmUud2FycCwgY2FudmFzU2l6ZSA9IGNvbnRhaW5lci5jYW52YXMuc2l6ZSwgbmV3UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogY2FudmFzU2l6ZS5oZWlnaHQgKyBwYXJ0aWNsZS5nZXRSYWRpdXMoKSArIHBhcnRpY2xlLm9mZnNldC55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IC1wYXJ0aWNsZS5nZXRSYWRpdXMoKSAtIHBhcnRpY2xlLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBjYW52YXNTaXplLndpZHRoICsgcGFydGljbGUuZ2V0UmFkaXVzKCkgKyBwYXJ0aWNsZS5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC1wYXJ0aWNsZS5nZXRSYWRpdXMoKSAtIHBhcnRpY2xlLm9mZnNldC55LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgc2l6ZVZhbHVlID0gcGFydGljbGUuZ2V0UmFkaXVzKCksIG5leHRCb3VuZHMgPSBjYWxjdWxhdGVCb3VuZHMocGFydGljbGUucG9zaXRpb24sIHNpemVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Qm91bmRzLmxlZnQgPiBjYW52YXNTaXplLndpZHRoICsgcGFydGljbGUub2Zmc2V0LngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gbmV3UG9zLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuaW5pdGlhbFBvc2l0aW9uLnggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd3JhcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gTWF0aC5yYW5kb20oKSAqIGNhbnZhc1NpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5pbml0aWFsUG9zaXRpb24ueSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIiAmJiBuZXh0Qm91bmRzLnJpZ2h0IDwgLXBhcnRpY2xlLm9mZnNldC54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IG5ld1Bvcy5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5pbml0aWFsUG9zaXRpb24ueCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3cmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSBNYXRoLnJhbmRvbSgpICogY2FudmFzU2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLmluaXRpYWxQb3NpdGlvbi55ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImJvdHRvbVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEJvdW5kcy50b3AgPiBjYW52YXNTaXplLmhlaWdodCArIHBhcnRpY2xlLm9mZnNldC55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3cmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSBNYXRoLnJhbmRvbSgpICogY2FudmFzU2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuaW5pdGlhbFBvc2l0aW9uLnggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gbmV3UG9zLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5pbml0aWFsUG9zaXRpb24ueSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidG9wXCIgJiYgbmV4dEJvdW5kcy5ib3R0b20gPCAtcGFydGljbGUub2Zmc2V0LnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdyYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IE1hdGgucmFuZG9tKCkgKiBjYW52YXNTaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5pbml0aWFsUG9zaXRpb24ueCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSBuZXdQb3MuYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLmluaXRpYWxQb3NpdGlvbi55ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0VmFsdWUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgZnVuY3Rpb24gYm91bmNlSG9yaXpvbnRhbChkYXRhKSB7XG4gICAgaWYgKCEoZGF0YS5vdXRNb2RlID09PSBcImJvdW5jZVwiIHx8XG4gICAgICAgIGRhdGEub3V0TW9kZSA9PT0gXCJib3VuY2UtaG9yaXpvbnRhbFwiIHx8XG4gICAgICAgIGRhdGEub3V0TW9kZSA9PT0gXCJib3VuY2VIb3Jpem9udGFsXCIgfHxcbiAgICAgICAgZGF0YS5vdXRNb2RlID09PSBcInNwbGl0XCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmVsb2NpdHkgPSBkYXRhLnBhcnRpY2xlLnZlbG9jaXR5Lng7XG4gICAgbGV0IGJvdW5jZWQgPSBmYWxzZTtcbiAgICBpZiAoKGRhdGEuZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiYgZGF0YS5ib3VuZHMucmlnaHQgPj0gZGF0YS5jYW52YXNTaXplLndpZHRoICYmIHZlbG9jaXR5ID4gMCkgfHxcbiAgICAgICAgKGRhdGEuZGlyZWN0aW9uID09PSBcImxlZnRcIiAmJiBkYXRhLmJvdW5kcy5sZWZ0IDw9IDAgJiYgdmVsb2NpdHkgPCAwKSkge1xuICAgICAgICBjb25zdCBuZXdWZWxvY2l0eSA9IGdldFZhbHVlKGRhdGEucGFydGljbGUub3B0aW9ucy5ib3VuY2UuaG9yaXpvbnRhbCk7XG4gICAgICAgIGRhdGEucGFydGljbGUudmVsb2NpdHkueCAqPSAtbmV3VmVsb2NpdHk7XG4gICAgICAgIGJvdW5jZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIWJvdW5jZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtaW5Qb3MgPSBkYXRhLm9mZnNldC54ICsgZGF0YS5zaXplO1xuICAgIGlmIChkYXRhLmJvdW5kcy5yaWdodCA+PSBkYXRhLmNhbnZhc1NpemUud2lkdGgpIHtcbiAgICAgICAgZGF0YS5wYXJ0aWNsZS5wb3NpdGlvbi54ID0gZGF0YS5jYW52YXNTaXplLndpZHRoIC0gbWluUG9zO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmJvdW5kcy5sZWZ0IDw9IDApIHtcbiAgICAgICAgZGF0YS5wYXJ0aWNsZS5wb3NpdGlvbi54ID0gbWluUG9zO1xuICAgIH1cbiAgICBpZiAoZGF0YS5vdXRNb2RlID09PSBcInNwbGl0XCIpIHtcbiAgICAgICAgZGF0YS5wYXJ0aWNsZS5kZXN0cm95KCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZVZlcnRpY2FsKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5vdXRNb2RlID09PSBcImJvdW5jZVwiIHx8XG4gICAgICAgIGRhdGEub3V0TW9kZSA9PT0gXCJib3VuY2UtdmVydGljYWxcIiB8fFxuICAgICAgICBkYXRhLm91dE1vZGUgPT09IFwiYm91bmNlVmVydGljYWxcIiB8fFxuICAgICAgICBkYXRhLm91dE1vZGUgPT09IFwic3BsaXRcIikge1xuICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IGRhdGEucGFydGljbGUudmVsb2NpdHkueTtcbiAgICAgICAgbGV0IGJvdW5jZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKChkYXRhLmRpcmVjdGlvbiA9PT0gXCJib3R0b21cIiAmJlxuICAgICAgICAgICAgZGF0YS5ib3VuZHMuYm90dG9tID49IGRhdGEuY2FudmFzU2l6ZS5oZWlnaHQgJiZcbiAgICAgICAgICAgIHZlbG9jaXR5ID4gMCkgfHxcbiAgICAgICAgICAgIChkYXRhLmRpcmVjdGlvbiA9PT0gXCJ0b3BcIiAmJiBkYXRhLmJvdW5kcy50b3AgPD0gMCAmJiB2ZWxvY2l0eSA8IDApKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWZWxvY2l0eSA9IGdldFZhbHVlKGRhdGEucGFydGljbGUub3B0aW9ucy5ib3VuY2UudmVydGljYWwpO1xuICAgICAgICAgICAgZGF0YS5wYXJ0aWNsZS52ZWxvY2l0eS55ICo9IC1uZXdWZWxvY2l0eTtcbiAgICAgICAgICAgIGJvdW5jZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYm91bmNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pblBvcyA9IGRhdGEub2Zmc2V0LnkgKyBkYXRhLnNpemU7XG4gICAgICAgIGlmIChkYXRhLmJvdW5kcy5ib3R0b20gPj0gZGF0YS5jYW52YXNTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgZGF0YS5wYXJ0aWNsZS5wb3NpdGlvbi55ID0gZGF0YS5jYW52YXNTaXplLmhlaWdodCAtIG1pblBvcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhLmJvdW5kcy50b3AgPD0gMCkge1xuICAgICAgICAgICAgZGF0YS5wYXJ0aWNsZS5wb3NpdGlvbi55ID0gbWluUG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm91dE1vZGUgPT09IFwic3BsaXRcIikge1xuICAgICAgICAgICAgZGF0YS5wYXJ0aWNsZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPdXRPZkNhbnZhc1VwZGF0ZXIgfSBmcm9tIFwiLi9PdXRPZkNhbnZhc1VwZGF0ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkT3V0TW9kZXNVcGRhdGVyKGVuZ2luZSkge1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQYXJ0aWNsZVVwZGF0ZXIoXCJvdXRNb2Rlc1wiLCAoY29udGFpbmVyKSA9PiBuZXcgT3V0T2ZDYW52YXNVcGRhdGVyKGNvbnRhaW5lcikpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9