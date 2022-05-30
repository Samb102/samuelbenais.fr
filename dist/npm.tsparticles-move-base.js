"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-move-base"],{

/***/ "./node_modules/tsparticles-move-base/esm/BaseMover.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/BaseMover.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseMover": () => (/* binding */ BaseMover)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-move-base/esm/Utils.js");


class BaseMover {
    init(particle) {
        var _a;
        const container = particle.container, options = particle.options, spinOptions = options.move.spin;
        if (spinOptions.enable) {
            const spinPos = (_a = spinOptions.position) !== null && _a !== void 0 ? _a : { x: 50, y: 50 };
            const spinCenter = {
                x: (spinPos.x / 100) * container.canvas.size.width,
                y: (spinPos.y / 100) * container.canvas.size.height,
            };
            const pos = particle.getPosition();
            const distance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos, spinCenter);
            const spinAcceleration = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(spinOptions.acceleration);
            particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
            particle.spin = {
                center: spinCenter,
                direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
                angle: particle.velocity.angle,
                radius: distance,
                acceleration: particle.retina.spinAcceleration,
            };
        }
    }
    isEnabled(particle) {
        return !particle.destroyed && particle.options.move.enable;
    }
    move(particle, delta) {
        var _a, _b, _c;
        var _d, _e;
        const particleOptions = particle.options, moveOptions = particleOptions.move;
        if (!moveOptions.enable) {
            return;
        }
        const container = particle.container, slowFactor = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getProximitySpeedFactor)(particle), baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : (_d.moveSpeed = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(moveOptions.speed) * container.retina.pixelRatio)) *
            container.retina.reduceFactor, moveDrift = ((_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : (_e.moveDrift = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(particle.options.move.drift) * container.retina.pixelRatio)), maxSize = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(particleOptions.size.value) * container.retina.pixelRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1, speedFactor = sizeFactor * slowFactor * (delta.factor || 1), diffFactor = 2, moveSpeed = (baseSpeed * speedFactor) / diffFactor;
        (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.applyPath)(particle, delta);
        const gravityOptions = particle.gravity, gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;
        if (gravityOptions.enable && moveSpeed) {
            particle.velocity.y += (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
        }
        if (moveDrift && moveSpeed) {
            particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);
        }
        const decay = particle.moveDecay;
        if (decay != 1) {
            particle.velocity.multTo(decay);
        }
        const velocity = particle.velocity.mult(moveSpeed), maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;
        if (gravityOptions.enable &&
            maxSpeed > 0 &&
            ((!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed) ||
                (gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed))) {
            velocity.y = gravityFactor * maxSpeed;
            if (moveSpeed) {
                particle.velocity.y = velocity.y / moveSpeed;
            }
        }
        const zIndexOptions = particle.options.zIndex, zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
        if (moveOptions.spin.enable) {
            (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.spin)(particle, moveSpeed);
        }
        else {
            if (zVelocityFactor != 1) {
                velocity.multTo(zVelocityFactor);
            }
            particle.position.addTo(velocity);
            if (moveOptions.vibrate) {
                particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
                particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
            }
        }
        (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.applyDistance)(particle);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-move-base/esm/Utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/Utils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyDistance": () => (/* binding */ applyDistance),
/* harmony export */   "applyPath": () => (/* binding */ applyPath),
/* harmony export */   "getProximitySpeedFactor": () => (/* binding */ getProximitySpeedFactor),
/* harmony export */   "spin": () => (/* binding */ spin)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function applyDistance(particle) {
    const initialPosition = particle.initialPosition;
    const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(initialPosition, particle.position);
    const dxFixed = Math.abs(dx), dyFixed = Math.abs(dy);
    const hDistance = particle.retina.maxDistance.horizontal;
    const vDistance = particle.retina.maxDistance.vertical;
    if (!hDistance && !vDistance) {
        return;
    }
    if (((hDistance && dxFixed >= hDistance) || (vDistance && dyFixed >= vDistance)) && !particle.misplaced) {
        particle.misplaced = (!!hDistance && dxFixed > hDistance) || (!!vDistance && dyFixed > vDistance);
        if (hDistance) {
            particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        }
        if (vDistance) {
            particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        }
    }
    else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
        particle.misplaced = false;
    }
    else if (particle.misplaced) {
        const pos = particle.position, vel = particle.velocity;
        if (hDistance && ((pos.x < initialPosition.x && vel.x < 0) || (pos.x > initialPosition.x && vel.x > 0))) {
            vel.x *= -Math.random();
        }
        if (vDistance && ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))) {
            vel.y *= -Math.random();
        }
    }
}
function spin(particle, moveSpeed) {
    const container = particle.container;
    if (!particle.spin) {
        return;
    }
    const updateFunc = {
        x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
        y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos,
    };
    particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
    particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
    particle.spin.radius += particle.spin.acceleration;
    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);
    if (particle.spin.radius > maxCanvasSize / 2) {
        particle.spin.radius = maxCanvasSize / 2;
        particle.spin.acceleration *= -1;
    }
    else if (particle.spin.radius < 0) {
        particle.spin.radius = 0;
        particle.spin.acceleration *= -1;
    }
    particle.spin.angle += (moveSpeed / 100) * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
    const particlesOptions = particle.options;
    const pathOptions = particlesOptions.move.path;
    const pathEnabled = pathOptions.enable;
    if (!pathEnabled) {
        return;
    }
    const container = particle.container;
    if (particle.lastPathTime <= particle.pathDelay) {
        particle.lastPathTime += delta.value;
        return;
    }
    const path = container.pathGenerator.generate(particle);
    particle.velocity.addTo(path);
    if (pathOptions.clamp) {
        particle.velocity.x = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(particle.velocity.x, -1, 1);
        particle.velocity.y = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(particle.velocity.y, -1, 1);
    }
    particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
    const container = particle.container;
    const options = container.actualOptions;
    const active = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("slow", options.interactivity.events.onHover.mode);
    if (!active) {
        return 1;
    }
    const mousePos = particle.container.interactivity.mouse.position;
    if (!mousePos) {
        return 1;
    }
    const particlePos = particle.getPosition();
    const dist = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(mousePos, particlePos);
    const radius = container.retina.slowModeRadius;
    if (dist > radius) {
        return 1;
    }
    const proximityFactor = dist / radius || 0;
    const slowFactor = options.interactivity.modes.slow.factor;
    return proximityFactor / slowFactor;
}


/***/ }),

/***/ "./node_modules/tsparticles-move-base/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadBaseMover": () => (/* binding */ loadBaseMover)
/* harmony export */ });
/* harmony import */ var _BaseMover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseMover */ "./node_modules/tsparticles-move-base/esm/BaseMover.js");

async function loadBaseMover(engine) {
    engine.addMover("base", () => new _BaseMover__WEBPACK_IMPORTED_MODULE_0__.BaseMover());
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLW1vdmUtYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNkU7QUFDSztBQUMzRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsK0RBQVc7QUFDeEMscUNBQXFDLGlFQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsK0RBQXVCLGtIQUFrSCxpRUFBYTtBQUNqTixpSkFBaUosaUVBQWEseUVBQXlFLCtEQUFXO0FBQ2xQLFFBQVEsaURBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNENBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQWE7QUFDckI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFaUY7QUFDMUU7QUFDUDtBQUNBLFlBQVksU0FBUyxFQUFFLGdFQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix5REFBSztBQUNuQyw4QkFBOEIseURBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsbUJBQW1CLDZEQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0RBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9Gd0M7QUFDakM7QUFDUCxzQ0FBc0MsaURBQVM7QUFDL0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtbW92ZS1iYXNlL2VzbS9CYXNlTW92ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLW1vdmUtYmFzZS9lc20vVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLW1vdmUtYmFzZS9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RGlzdGFuY2UsIGdldFJhbmdlTWF4LCBnZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgYXBwbHlEaXN0YW5jZSwgYXBwbHlQYXRoLCBnZXRQcm94aW1pdHlTcGVlZEZhY3Rvciwgc3BpbiB9IGZyb20gXCIuL1V0aWxzXCI7XG5leHBvcnQgY2xhc3MgQmFzZU1vdmVyIHtcbiAgICBpbml0KHBhcnRpY2xlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gcGFydGljbGUuY29udGFpbmVyLCBvcHRpb25zID0gcGFydGljbGUub3B0aW9ucywgc3Bpbk9wdGlvbnMgPSBvcHRpb25zLm1vdmUuc3BpbjtcbiAgICAgICAgaWYgKHNwaW5PcHRpb25zLmVuYWJsZSkge1xuICAgICAgICAgICAgY29uc3Qgc3BpblBvcyA9IChfYSA9IHNwaW5PcHRpb25zLnBvc2l0aW9uKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7IHg6IDUwLCB5OiA1MCB9O1xuICAgICAgICAgICAgY29uc3Qgc3BpbkNlbnRlciA9IHtcbiAgICAgICAgICAgICAgICB4OiAoc3BpblBvcy54IC8gMTAwKSAqIGNvbnRhaW5lci5jYW52YXMuc2l6ZS53aWR0aCxcbiAgICAgICAgICAgICAgICB5OiAoc3BpblBvcy55IC8gMTAwKSAqIGNvbnRhaW5lci5jYW52YXMuc2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcG9zID0gcGFydGljbGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UocG9zLCBzcGluQ2VudGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHNwaW5BY2NlbGVyYXRpb24gPSBnZXRSYW5nZVZhbHVlKHNwaW5PcHRpb25zLmFjY2VsZXJhdGlvbik7XG4gICAgICAgICAgICBwYXJ0aWNsZS5yZXRpbmEuc3BpbkFjY2VsZXJhdGlvbiA9IHNwaW5BY2NlbGVyYXRpb24gKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW87XG4gICAgICAgICAgICBwYXJ0aWNsZS5zcGluID0ge1xuICAgICAgICAgICAgICAgIGNlbnRlcjogc3BpbkNlbnRlcixcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IHBhcnRpY2xlLnZlbG9jaXR5LnggPj0gMCA/IFwiY2xvY2t3aXNlXCIgOiBcImNvdW50ZXItY2xvY2t3aXNlXCIsXG4gICAgICAgICAgICAgICAgYW5nbGU6IHBhcnRpY2xlLnZlbG9jaXR5LmFuZ2xlLFxuICAgICAgICAgICAgICAgIHJhZGl1czogZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgYWNjZWxlcmF0aW9uOiBwYXJ0aWNsZS5yZXRpbmEuc3BpbkFjY2VsZXJhdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIHJldHVybiAhcGFydGljbGUuZGVzdHJveWVkICYmIHBhcnRpY2xlLm9wdGlvbnMubW92ZS5lbmFibGU7XG4gICAgfVxuICAgIG1vdmUocGFydGljbGUsIGRlbHRhKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB2YXIgX2QsIF9lO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZU9wdGlvbnMgPSBwYXJ0aWNsZS5vcHRpb25zLCBtb3ZlT3B0aW9ucyA9IHBhcnRpY2xlT3B0aW9ucy5tb3ZlO1xuICAgICAgICBpZiAoIW1vdmVPcHRpb25zLmVuYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHBhcnRpY2xlLmNvbnRhaW5lciwgc2xvd0ZhY3RvciA9IGdldFByb3hpbWl0eVNwZWVkRmFjdG9yKHBhcnRpY2xlKSwgYmFzZVNwZWVkID0gKChfYSA9IChfZCA9IHBhcnRpY2xlLnJldGluYSkubW92ZVNwZWVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoX2QubW92ZVNwZWVkID0gZ2V0UmFuZ2VWYWx1ZShtb3ZlT3B0aW9ucy5zcGVlZCkgKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8pKSAqXG4gICAgICAgICAgICBjb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvciwgbW92ZURyaWZ0ID0gKChfYiA9IChfZSA9IHBhcnRpY2xlLnJldGluYSkubW92ZURyaWZ0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAoX2UubW92ZURyaWZ0ID0gZ2V0UmFuZ2VWYWx1ZShwYXJ0aWNsZS5vcHRpb25zLm1vdmUuZHJpZnQpICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvKSksIG1heFNpemUgPSBnZXRSYW5nZU1heChwYXJ0aWNsZU9wdGlvbnMuc2l6ZS52YWx1ZSkgKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8sIHNpemVGYWN0b3IgPSBtb3ZlT3B0aW9ucy5zaXplID8gcGFydGljbGUuZ2V0UmFkaXVzKCkgLyBtYXhTaXplIDogMSwgc3BlZWRGYWN0b3IgPSBzaXplRmFjdG9yICogc2xvd0ZhY3RvciAqIChkZWx0YS5mYWN0b3IgfHwgMSksIGRpZmZGYWN0b3IgPSAyLCBtb3ZlU3BlZWQgPSAoYmFzZVNwZWVkICogc3BlZWRGYWN0b3IpIC8gZGlmZkZhY3RvcjtcbiAgICAgICAgYXBwbHlQYXRoKHBhcnRpY2xlLCBkZWx0YSk7XG4gICAgICAgIGNvbnN0IGdyYXZpdHlPcHRpb25zID0gcGFydGljbGUuZ3Jhdml0eSwgZ3Jhdml0eUZhY3RvciA9IGdyYXZpdHlPcHRpb25zLmVuYWJsZSAmJiBncmF2aXR5T3B0aW9ucy5pbnZlcnNlID8gLTEgOiAxO1xuICAgICAgICBpZiAoZ3Jhdml0eU9wdGlvbnMuZW5hYmxlICYmIG1vdmVTcGVlZCkge1xuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkueSArPSAoZ3Jhdml0eUZhY3RvciAqIChncmF2aXR5T3B0aW9ucy5hY2NlbGVyYXRpb24gKiBkZWx0YS5mYWN0b3IpKSAvICg2MCAqIG1vdmVTcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vdmVEcmlmdCAmJiBtb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnggKz0gKG1vdmVEcmlmdCAqIGRlbHRhLmZhY3RvcikgLyAoNjAgKiBtb3ZlU3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlY2F5ID0gcGFydGljbGUubW92ZURlY2F5O1xuICAgICAgICBpZiAoZGVjYXkgIT0gMSkge1xuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkubXVsdFRvKGRlY2F5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IHBhcnRpY2xlLnZlbG9jaXR5Lm11bHQobW92ZVNwZWVkKSwgbWF4U3BlZWQgPSAoX2MgPSBwYXJ0aWNsZS5yZXRpbmEubWF4U3BlZWQpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGNvbnRhaW5lci5yZXRpbmEubWF4U3BlZWQ7XG4gICAgICAgIGlmIChncmF2aXR5T3B0aW9ucy5lbmFibGUgJiZcbiAgICAgICAgICAgIG1heFNwZWVkID4gMCAmJlxuICAgICAgICAgICAgKCghZ3Jhdml0eU9wdGlvbnMuaW52ZXJzZSAmJiB2ZWxvY2l0eS55ID49IDAgJiYgdmVsb2NpdHkueSA+PSBtYXhTcGVlZCkgfHxcbiAgICAgICAgICAgICAgICAoZ3Jhdml0eU9wdGlvbnMuaW52ZXJzZSAmJiB2ZWxvY2l0eS55IDw9IDAgJiYgdmVsb2NpdHkueSA8PSAtbWF4U3BlZWQpKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkueSA9IGdyYXZpdHlGYWN0b3IgKiBtYXhTcGVlZDtcbiAgICAgICAgICAgIGlmIChtb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ID0gdmVsb2NpdHkueSAvIG1vdmVTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB6SW5kZXhPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy56SW5kZXgsIHpWZWxvY2l0eUZhY3RvciA9ICgxIC0gcGFydGljbGUuekluZGV4RmFjdG9yKSAqKiB6SW5kZXhPcHRpb25zLnZlbG9jaXR5UmF0ZTtcbiAgICAgICAgaWYgKG1vdmVPcHRpb25zLnNwaW4uZW5hYmxlKSB7XG4gICAgICAgICAgICBzcGluKHBhcnRpY2xlLCBtb3ZlU3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHpWZWxvY2l0eUZhY3RvciAhPSAxKSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkubXVsdFRvKHpWZWxvY2l0eUZhY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi5hZGRUbyh2ZWxvY2l0eSk7XG4gICAgICAgICAgICBpZiAobW92ZU9wdGlvbnMudmlicmF0ZSkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gTWF0aC5zaW4ocGFydGljbGUucG9zaXRpb24ueCAqIE1hdGguY29zKHBhcnRpY2xlLnBvc2l0aW9uLnkpKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IE1hdGguY29zKHBhcnRpY2xlLnBvc2l0aW9uLnkgKiBNYXRoLnNpbihwYXJ0aWNsZS5wb3NpdGlvbi54KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXBwbHlEaXN0YW5jZShwYXJ0aWNsZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2xhbXAsIGdldERpc3RhbmNlLCBnZXREaXN0YW5jZXMsIGlzSW5BcnJheSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBmdW5jdGlvbiBhcHBseURpc3RhbmNlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW5pdGlhbFBvc2l0aW9uID0gcGFydGljbGUuaW5pdGlhbFBvc2l0aW9uO1xuICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBnZXREaXN0YW5jZXMoaW5pdGlhbFBvc2l0aW9uLCBwYXJ0aWNsZS5wb3NpdGlvbik7XG4gICAgY29uc3QgZHhGaXhlZCA9IE1hdGguYWJzKGR4KSwgZHlGaXhlZCA9IE1hdGguYWJzKGR5KTtcbiAgICBjb25zdCBoRGlzdGFuY2UgPSBwYXJ0aWNsZS5yZXRpbmEubWF4RGlzdGFuY2UuaG9yaXpvbnRhbDtcbiAgICBjb25zdCB2RGlzdGFuY2UgPSBwYXJ0aWNsZS5yZXRpbmEubWF4RGlzdGFuY2UudmVydGljYWw7XG4gICAgaWYgKCFoRGlzdGFuY2UgJiYgIXZEaXN0YW5jZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgoKGhEaXN0YW5jZSAmJiBkeEZpeGVkID49IGhEaXN0YW5jZSkgfHwgKHZEaXN0YW5jZSAmJiBkeUZpeGVkID49IHZEaXN0YW5jZSkpICYmICFwYXJ0aWNsZS5taXNwbGFjZWQpIHtcbiAgICAgICAgcGFydGljbGUubWlzcGxhY2VkID0gKCEhaERpc3RhbmNlICYmIGR4Rml4ZWQgPiBoRGlzdGFuY2UpIHx8ICghIXZEaXN0YW5jZSAmJiBkeUZpeGVkID4gdkRpc3RhbmNlKTtcbiAgICAgICAgaWYgKGhEaXN0YW5jZSkge1xuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkueCA9IHBhcnRpY2xlLnZlbG9jaXR5LnkgLyAyIC0gcGFydGljbGUudmVsb2NpdHkueDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodkRpc3RhbmNlKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ID0gcGFydGljbGUudmVsb2NpdHkueCAvIDIgLSBwYXJ0aWNsZS52ZWxvY2l0eS55O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCghaERpc3RhbmNlIHx8IGR4Rml4ZWQgPCBoRGlzdGFuY2UpICYmICghdkRpc3RhbmNlIHx8IGR5Rml4ZWQgPCB2RGlzdGFuY2UpICYmIHBhcnRpY2xlLm1pc3BsYWNlZCkge1xuICAgICAgICBwYXJ0aWNsZS5taXNwbGFjZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGFydGljbGUubWlzcGxhY2VkKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBhcnRpY2xlLnBvc2l0aW9uLCB2ZWwgPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICAgICAgaWYgKGhEaXN0YW5jZSAmJiAoKHBvcy54IDwgaW5pdGlhbFBvc2l0aW9uLnggJiYgdmVsLnggPCAwKSB8fCAocG9zLnggPiBpbml0aWFsUG9zaXRpb24ueCAmJiB2ZWwueCA+IDApKSkge1xuICAgICAgICAgICAgdmVsLnggKj0gLU1hdGgucmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZEaXN0YW5jZSAmJiAoKHBvcy55IDwgaW5pdGlhbFBvc2l0aW9uLnkgJiYgdmVsLnkgPCAwKSB8fCAocG9zLnkgPiBpbml0aWFsUG9zaXRpb24ueSAmJiB2ZWwueSA+IDApKSkge1xuICAgICAgICAgICAgdmVsLnkgKj0gLU1hdGgucmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3BpbihwYXJ0aWNsZSwgbW92ZVNwZWVkKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gcGFydGljbGUuY29udGFpbmVyO1xuICAgIGlmICghcGFydGljbGUuc3Bpbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZUZ1bmMgPSB7XG4gICAgICAgIHg6IHBhcnRpY2xlLnNwaW4uZGlyZWN0aW9uID09PSBcImNsb2Nrd2lzZVwiID8gTWF0aC5jb3MgOiBNYXRoLnNpbixcbiAgICAgICAgeTogcGFydGljbGUuc3Bpbi5kaXJlY3Rpb24gPT09IFwiY2xvY2t3aXNlXCIgPyBNYXRoLnNpbiA6IE1hdGguY29zLFxuICAgIH07XG4gICAgcGFydGljbGUucG9zaXRpb24ueCA9IHBhcnRpY2xlLnNwaW4uY2VudGVyLnggKyBwYXJ0aWNsZS5zcGluLnJhZGl1cyAqIHVwZGF0ZUZ1bmMueChwYXJ0aWNsZS5zcGluLmFuZ2xlKTtcbiAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gcGFydGljbGUuc3Bpbi5jZW50ZXIueSArIHBhcnRpY2xlLnNwaW4ucmFkaXVzICogdXBkYXRlRnVuYy55KHBhcnRpY2xlLnNwaW4uYW5nbGUpO1xuICAgIHBhcnRpY2xlLnNwaW4ucmFkaXVzICs9IHBhcnRpY2xlLnNwaW4uYWNjZWxlcmF0aW9uO1xuICAgIGNvbnN0IG1heENhbnZhc1NpemUgPSBNYXRoLm1heChjb250YWluZXIuY2FudmFzLnNpemUud2lkdGgsIGNvbnRhaW5lci5jYW52YXMuc2l6ZS5oZWlnaHQpO1xuICAgIGlmIChwYXJ0aWNsZS5zcGluLnJhZGl1cyA+IG1heENhbnZhc1NpemUgLyAyKSB7XG4gICAgICAgIHBhcnRpY2xlLnNwaW4ucmFkaXVzID0gbWF4Q2FudmFzU2l6ZSAvIDI7XG4gICAgICAgIHBhcnRpY2xlLnNwaW4uYWNjZWxlcmF0aW9uICo9IC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChwYXJ0aWNsZS5zcGluLnJhZGl1cyA8IDApIHtcbiAgICAgICAgcGFydGljbGUuc3Bpbi5yYWRpdXMgPSAwO1xuICAgICAgICBwYXJ0aWNsZS5zcGluLmFjY2VsZXJhdGlvbiAqPSAtMTtcbiAgICB9XG4gICAgcGFydGljbGUuc3Bpbi5hbmdsZSArPSAobW92ZVNwZWVkIC8gMTAwKSAqICgxIC0gcGFydGljbGUuc3Bpbi5yYWRpdXMgLyBtYXhDYW52YXNTaXplKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGgocGFydGljbGUsIGRlbHRhKSB7XG4gICAgY29uc3QgcGFydGljbGVzT3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnM7XG4gICAgY29uc3QgcGF0aE9wdGlvbnMgPSBwYXJ0aWNsZXNPcHRpb25zLm1vdmUucGF0aDtcbiAgICBjb25zdCBwYXRoRW5hYmxlZCA9IHBhdGhPcHRpb25zLmVuYWJsZTtcbiAgICBpZiAoIXBhdGhFbmFibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udGFpbmVyID0gcGFydGljbGUuY29udGFpbmVyO1xuICAgIGlmIChwYXJ0aWNsZS5sYXN0UGF0aFRpbWUgPD0gcGFydGljbGUucGF0aERlbGF5KSB7XG4gICAgICAgIHBhcnRpY2xlLmxhc3RQYXRoVGltZSArPSBkZWx0YS52YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwYXRoID0gY29udGFpbmVyLnBhdGhHZW5lcmF0b3IuZ2VuZXJhdGUocGFydGljbGUpO1xuICAgIHBhcnRpY2xlLnZlbG9jaXR5LmFkZFRvKHBhdGgpO1xuICAgIGlmIChwYXRoT3B0aW9ucy5jbGFtcCkge1xuICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS54ID0gY2xhbXAocGFydGljbGUudmVsb2NpdHkueCwgLTEsIDEpO1xuICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ID0gY2xhbXAocGFydGljbGUudmVsb2NpdHkueSwgLTEsIDEpO1xuICAgIH1cbiAgICBwYXJ0aWNsZS5sYXN0UGF0aFRpbWUgLT0gcGFydGljbGUucGF0aERlbGF5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3hpbWl0eVNwZWVkRmFjdG9yKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gcGFydGljbGUuY29udGFpbmVyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICBjb25zdCBhY3RpdmUgPSBpc0luQXJyYXkoXCJzbG93XCIsIG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5tb2RlKTtcbiAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgY29uc3QgbW91c2VQb3MgPSBwYXJ0aWNsZS5jb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbjtcbiAgICBpZiAoIW1vdXNlUG9zKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBjb25zdCBwYXJ0aWNsZVBvcyA9IHBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG4gICAgY29uc3QgZGlzdCA9IGdldERpc3RhbmNlKG1vdXNlUG9zLCBwYXJ0aWNsZVBvcyk7XG4gICAgY29uc3QgcmFkaXVzID0gY29udGFpbmVyLnJldGluYS5zbG93TW9kZVJhZGl1cztcbiAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgY29uc3QgcHJveGltaXR5RmFjdG9yID0gZGlzdCAvIHJhZGl1cyB8fCAwO1xuICAgIGNvbnN0IHNsb3dGYWN0b3IgPSBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuc2xvdy5mYWN0b3I7XG4gICAgcmV0dXJuIHByb3hpbWl0eUZhY3RvciAvIHNsb3dGYWN0b3I7XG59XG4iLCJpbXBvcnQgeyBCYXNlTW92ZXIgfSBmcm9tIFwiLi9CYXNlTW92ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQmFzZU1vdmVyKGVuZ2luZSkge1xuICAgIGVuZ2luZS5hZGRNb3ZlcihcImJhc2VcIiwgKCkgPT4gbmV3IEJhc2VNb3ZlcigpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==