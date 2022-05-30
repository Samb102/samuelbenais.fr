"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-plugin-absorbers"],{

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbsorberInstance": () => (/* binding */ AbsorberInstance)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Absorber */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js");


class AbsorberInstance {
    constructor(absorbers, container, options, position) {
        var _a, _b, _c;
        this.absorbers = absorbers;
        this.container = container;
        this.initialPosition = position ? tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(position.x, position.y) : undefined;
        if (options instanceof _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__.Absorber) {
            this.options = options;
        }
        else {
            this.options = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__.Absorber();
            this.options.load(options);
        }
        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
        const limit = this.options.size.limit;
        this.limit = {
            radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
            mass: limit.mass,
        };
        this.color = (_a = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(this.options.color)) !== null && _a !== void 0 ? _a : {
            b: 0,
            g: 0,
            r: 0,
        };
        this.position = (_c = (_b = this.initialPosition) === null || _b === void 0 ? void 0 : _b.copy()) !== null && _c !== void 0 ? _c : this.calcPosition();
    }
    attract(particle) {
        const container = this.container, options = this.options;
        if (options.draggable) {
            const mouse = container.interactivity.mouse;
            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(this.position, mouse.downPosition);
                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            }
            else {
                this.dragging = false;
            }
            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }
        const pos = particle.getPosition(), { dx, dy, distance } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(this.position, pos), v = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(dx, dy);
        v.length = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;
        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;
            if ((this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0)) {
                if (options.destroy) {
                    particle.destroy();
                }
                else {
                    particle.needsNewPosition = true;
                    this.updateParticlePosition(particle, v);
                }
            }
            else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }
                this.updateParticlePosition(particle, v);
            }
            if (this.limit.radius <= 0 || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }
            if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        }
        else {
            this.updateParticlePosition(particle, v);
        }
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside)(initialPosition, this.container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin)
                ? initialPosition
                : this.calcPosition();
    }
    draw(context) {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(this.color, this.opacity);
        context.fill();
    }
    calcPosition() {
        const exactPosition = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionOrRandomFromSizeRanged)({
            size: this.container.canvas.size,
            position: this.options.position,
        });
        return tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(exactPosition.x, exactPosition.y);
    }
    updateParticlePosition(particle, v) {
        var _a;
        if (particle.destroyed) {
            return;
        }
        const container = this.container, canvasSize = container.canvas.size;
        if (particle.needsNewPosition) {
            const newPosition = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionOrRandomFromSize)({ size: canvasSize });
            particle.position.setTo(newPosition);
            particle.velocity.setTo(particle.initialVelocity);
            particle.absorberOrbit = undefined;
            particle.needsNewPosition = false;
        }
        if (this.options.orbits) {
            if (particle.absorberOrbit === undefined) {
                particle.absorberOrbit = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(0, 0);
                particle.absorberOrbit.length = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
            }
            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);
                particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
            }
            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise";
            }
            const orbitRadius = particle.absorberOrbit.length, orbitAngle = particle.absorberOrbit.angle, orbitDirection = particle.absorberOrbitDirection;
            particle.velocity.setTo(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin);
            const updateFunc = {
                x: orbitDirection === "clockwise" ? Math.cos : Math.sin,
                y: orbitDirection === "clockwise" ? Math.sin : Math.cos,
            };
            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
            particle.absorberOrbit.length -= v.length;
            particle.absorberOrbit.angle +=
                ((((_a = particle.retina.moveSpeed) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio) / 100) *
                    container.retina.reduceFactor;
        }
        else {
            const addV = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin;
            addV.length = v.length;
            addV.angle = v.angle;
            particle.velocity.addTo(addV);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Absorbers": () => (/* binding */ Absorbers)
/* harmony export */ });
/* harmony import */ var _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options/Classes/Absorber */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js");
/* harmony import */ var _AbsorberInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbsorberInstance */ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");



class Absorbers {
    constructor(container) {
        this.container = container;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];
        container.getAbsorber = (idxOrName) => idxOrName === undefined || typeof idxOrName === "number"
            ? this.array[idxOrName || 0]
            : this.array.find((t) => t.name === idxOrName);
        container.addAbsorber = (options, position) => this.addAbsorber(options, position);
    }
    init(options) {
        var _a, _b;
        if (!options) {
            return;
        }
        if (options.absorbers) {
            if (options.absorbers instanceof Array) {
                this.absorbers = options.absorbers.map((s) => {
                    const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.absorbers instanceof Array) {
                    this.absorbers = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                }
                this.absorbers.load(options.absorbers);
            }
        }
        const interactivityAbsorbers = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                this.interactivityAbsorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.interactivityAbsorbers instanceof Array) {
                    this.interactivityAbsorbers = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                }
                this.interactivityAbsorbers.load(interactivityAbsorbers);
            }
        }
        if (this.absorbers instanceof Array) {
            for (const absorberOptions of this.absorbers) {
                this.addAbsorber(absorberOptions);
            }
        }
        else {
            this.addAbsorber(this.absorbers);
        }
    }
    particleUpdate(particle) {
        for (const absorber of this.array) {
            absorber.attract(particle);
            if (particle.destroyed) {
                break;
            }
        }
    }
    draw(context) {
        for (const absorber of this.array) {
            context.save();
            absorber.draw(context);
            context.restore();
        }
    }
    stop() {
        this.array = [];
    }
    resize() {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }
    handleClickMode(mode) {
        const absorberOptions = this.absorbers, modeAbsorbers = this.interactivityAbsorbers;
        if (mode === "absorber") {
            let absorbersModeOptions;
            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(modeAbsorbers);
                }
            }
            else {
                absorbersModeOptions = modeAbsorbers;
            }
            const absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : (absorberOptions instanceof Array ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(absorberOptions) : absorberOptions), aPosition = this.container.interactivity.mouse.clickPosition;
            this.addAbsorber(absorbersOptions, aPosition);
        }
    }
    addAbsorber(options, position) {
        const absorber = new _AbsorberInstance__WEBPACK_IMPORTED_MODULE_1__.AbsorberInstance(this, this.container, options, position);
        this.array.push(absorber);
        return absorber;
    }
    removeAbsorber(absorber) {
        const index = this.array.indexOf(absorber);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Absorber": () => (/* binding */ Absorber)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _AbsorberSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbsorberSize */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js");


class Absorber {
    constructor() {
        this.color = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new _AbsorberSize__WEBPACK_IMPORTED_MODULE_1__.AbsorberSize();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }
        this.name = data.name;
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.position.y);
            }
        }
        if (data.size !== undefined) {
            this.size.load(data.size);
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbsorberSize": () => (/* binding */ AbsorberSize)
/* harmony export */ });
/* harmony import */ var _AbsorberSizeLimit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbsorberSizeLimit */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class AbsorberSize extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.ValueWithRandom {
    constructor() {
        super();
        this.density = 5;
        this.value = 50;
        this.limit = new _AbsorberSizeLimit__WEBPACK_IMPORTED_MODULE_0__.AbsorberSizeLimit();
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.density !== undefined) {
            this.density = data.density;
        }
        if (typeof data.limit === "number") {
            this.limit.radius = data.limit;
        }
        else {
            this.limit.load(data.limit);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbsorberSizeLimit": () => (/* binding */ AbsorberSizeLimit)
/* harmony export */ });
class AbsorberSizeLimit {
    constructor() {
        this.radius = 0;
        this.mass = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mass !== undefined) {
            this.mass = data.mass;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Interfaces/IAbsorberOptions.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Interfaces/IAbsorberOptions.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadAbsorbersPlugin": () => (/* binding */ loadAbsorbersPlugin)
/* harmony export */ });
/* harmony import */ var _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options/Classes/Absorber */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js");
/* harmony import */ var _Absorbers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Absorbers */ "./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _AbsorberContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AbsorberContainer */ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js");
/* harmony import */ var _Enums_AbsorberClickMode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Enums/AbsorberClickMode */ "./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js");
/* harmony import */ var _Options_Interfaces_IAbsorberOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Options/Interfaces/IAbsorberOptions */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Interfaces/IAbsorberOptions.js");



class AbsorbersPlugin {
    constructor() {
        this.id = "absorbers";
    }
    getPlugin(container) {
        return new _Absorbers__WEBPACK_IMPORTED_MODULE_1__.Absorbers(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (!options) {
            return false;
        }
        const absorbers = options.absorbers;
        if (absorbers instanceof Array) {
            return !!absorbers.length;
        }
        else if (absorbers) {
            return true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__.isInArray)("absorber", options.interactivity.events.onClick.mode)) {
            return true;
        }
        return false;
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.absorbers) {
            if ((source === null || source === void 0 ? void 0 : source.absorbers) instanceof Array) {
                optionsCast.absorbers = source === null || source === void 0 ? void 0 : source.absorbers.map((s) => {
                    const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let absorberOptions = optionsCast.absorbers;
                if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
                    optionsCast.absorbers = absorberOptions = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                }
                absorberOptions.load(source === null || source === void 0 ? void 0 : source.absorbers);
            }
        }
        const interactivityAbsorbers = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                optionsCast.interactivity.modes.absorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let absorberOptions = optionsCast.interactivity.modes.absorbers;
                if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
                    optionsCast.interactivity.modes.absorbers = absorberOptions = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_0__.Absorber();
                }
                absorberOptions.load(interactivityAbsorbers);
            }
        }
    }
}
async function loadAbsorbersPlugin(engine) {
    const plugin = new AbsorbersPlugin();
    await engine.addPlugin(plugin);
}





/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzVDO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsK0RBQVE7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQywrREFBUTtBQUM1QztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLCtEQUFRO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ29DO0FBQ007QUFDWSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tYWJzb3JiZXJzL2VzbS9BYnNvcmJlckNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWFic29yYmVycy9lc20vQWJzb3JiZXJJbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWFic29yYmVycy9lc20vQWJzb3JiZXJzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tYWJzb3JiZXJzL2VzbS9FbnVtcy9BYnNvcmJlckNsaWNrTW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWFic29yYmVycy9lc20vT3B0aW9ucy9DbGFzc2VzL0Fic29yYmVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tYWJzb3JiZXJzL2VzbS9PcHRpb25zL0NsYXNzZXMvQWJzb3JiZXJTaXplLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tYWJzb3JiZXJzL2VzbS9PcHRpb25zL0NsYXNzZXMvQWJzb3JiZXJTaXplTGltaXQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1hYnNvcmJlcnMvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JQWJzb3JiZXJPcHRpb25zLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tYWJzb3JiZXJzL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge307XG4iLCJpbXBvcnQgeyBWZWN0b3IsIGNhbGNQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUsIGNhbGNQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemVSYW5nZWQsIGNvbG9yVG9SZ2IsIGdldERpc3RhbmNlLCBnZXREaXN0YW5jZXMsIGdldFJhbmdlVmFsdWUsIGdldFN0eWxlRnJvbVJnYiwgaXNQb2ludEluc2lkZSwgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5pbXBvcnQgeyBBYnNvcmJlciB9IGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9BYnNvcmJlclwiO1xuZXhwb3J0IGNsYXNzIEFic29yYmVySW5zdGFuY2Uge1xuICAgIGNvbnN0cnVjdG9yKGFic29yYmVycywgY29udGFpbmVyLCBvcHRpb25zLCBwb3NpdGlvbikge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdGhpcy5hYnNvcmJlcnMgPSBhYnNvcmJlcnM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IHBvc2l0aW9uID8gVmVjdG9yLmNyZWF0ZShwb3NpdGlvbi54LCBwb3NpdGlvbi55KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBYnNvcmJlcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBBYnNvcmJlcigpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxvYWQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm9wdGlvbnMubmFtZTtcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gdGhpcy5vcHRpb25zLm9wYWNpdHk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IGdldFJhbmdlVmFsdWUodGhpcy5vcHRpb25zLnNpemUudmFsdWUpICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLnNpemUgKiB0aGlzLm9wdGlvbnMuc2l6ZS5kZW5zaXR5ICogY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3I7XG4gICAgICAgIGNvbnN0IGxpbWl0ID0gdGhpcy5vcHRpb25zLnNpemUubGltaXQ7XG4gICAgICAgIHRoaXMubGltaXQgPSB7XG4gICAgICAgICAgICByYWRpdXM6IGxpbWl0LnJhZGl1cyAqIGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbyAqIGNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yLFxuICAgICAgICAgICAgbWFzczogbGltaXQubWFzcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb2xvciA9IChfYSA9IGNvbG9yVG9SZ2IodGhpcy5vcHRpb25zLmNvbG9yKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge1xuICAgICAgICAgICAgYjogMCxcbiAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICByOiAwLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gKF9jID0gKF9iID0gdGhpcy5pbml0aWFsUG9zaXRpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb3B5KCkpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHRoaXMuY2FsY1Bvc2l0aW9uKCk7XG4gICAgfVxuICAgIGF0dHJhY3QocGFydGljbGUpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRpb25zLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgY29uc3QgbW91c2UgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZTtcbiAgICAgICAgICAgIGlmIChtb3VzZS5jbGlja2luZyAmJiBtb3VzZS5kb3duUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3VzZURpc3QgPSBnZXREaXN0YW5jZSh0aGlzLnBvc2l0aW9uLCBtb3VzZS5kb3duUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChtb3VzZURpc3QgPD0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nICYmIG1vdXNlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gbW91c2UucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSBtb3VzZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvcyA9IHBhcnRpY2xlLmdldFBvc2l0aW9uKCksIHsgZHgsIGR5LCBkaXN0YW5jZSB9ID0gZ2V0RGlzdGFuY2VzKHRoaXMucG9zaXRpb24sIHBvcyksIHYgPSBWZWN0b3IuY3JlYXRlKGR4LCBkeSk7XG4gICAgICAgIHYubGVuZ3RoID0gKHRoaXMubWFzcyAvIE1hdGgucG93KGRpc3RhbmNlLCAyKSkgKiBjb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvcjtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5zaXplICsgcGFydGljbGUuZ2V0UmFkaXVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpemVGYWN0b3IgPSBwYXJ0aWNsZS5nZXRSYWRpdXMoKSAqIDAuMDMzICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvO1xuICAgICAgICAgICAgaWYgKCh0aGlzLnNpemUgPiBwYXJ0aWNsZS5nZXRSYWRpdXMoKSAmJiBkaXN0YW5jZSA8IHRoaXMuc2l6ZSAtIHBhcnRpY2xlLmdldFJhZGl1cygpKSB8fFxuICAgICAgICAgICAgICAgIChwYXJ0aWNsZS5hYnNvcmJlck9yYml0ICE9PSB1bmRlZmluZWQgJiYgcGFydGljbGUuYWJzb3JiZXJPcmJpdC5sZW5ndGggPCAwKSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUubmVlZHNOZXdQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFydGljbGVQb3NpdGlvbihwYXJ0aWNsZSwgdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVzdHJveSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnZhbHVlIC09IHNpemVGYWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFydGljbGVQb3NpdGlvbihwYXJ0aWNsZSwgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5saW1pdC5yYWRpdXMgPD0gMCB8fCB0aGlzLnNpemUgPCB0aGlzLmxpbWl0LnJhZGl1cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSArPSBzaXplRmFjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGltaXQubWFzcyA8PSAwIHx8IHRoaXMubWFzcyA8IHRoaXMubGltaXQubWFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFzcyArPSBzaXplRmFjdG9yICogdGhpcy5vcHRpb25zLnNpemUuZGVuc2l0eSAqIGNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNsZVBvc2l0aW9uKHBhcnRpY2xlLCB2KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuaW5pdGlhbFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID1cbiAgICAgICAgICAgIGluaXRpYWxQb3NpdGlvbiAmJiBpc1BvaW50SW5zaWRlKGluaXRpYWxQb3NpdGlvbiwgdGhpcy5jb250YWluZXIuY2FudmFzLnNpemUsIFZlY3Rvci5vcmlnaW4pXG4gICAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb25cbiAgICAgICAgICAgICAgICA6IHRoaXMuY2FsY1Bvc2l0aW9uKCk7XG4gICAgfVxuICAgIGRyYXcoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHRoaXMuc2l6ZSwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBnZXRTdHlsZUZyb21SZ2IodGhpcy5jb2xvciwgdGhpcy5vcGFjaXR5KTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgfVxuICAgIGNhbGNQb3NpdGlvbigpIHtcbiAgICAgICAgY29uc3QgZXhhY3RQb3NpdGlvbiA9IGNhbGNQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemVSYW5nZWQoe1xuICAgICAgICAgICAgc2l6ZTogdGhpcy5jb250YWluZXIuY2FudmFzLnNpemUsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5vcHRpb25zLnBvc2l0aW9uLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5jcmVhdGUoZXhhY3RQb3NpdGlvbi54LCBleGFjdFBvc2l0aW9uLnkpO1xuICAgIH1cbiAgICB1cGRhdGVQYXJ0aWNsZVBvc2l0aW9uKHBhcnRpY2xlLCB2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHBhcnRpY2xlLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBjYW52YXNTaXplID0gY29udGFpbmVyLmNhbnZhcy5zaXplO1xuICAgICAgICBpZiAocGFydGljbGUubmVlZHNOZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBjYWxjUG9zaXRpb25PclJhbmRvbUZyb21TaXplKHsgc2l6ZTogY2FudmFzU2l6ZSB9KTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnNldFRvKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnNldFRvKHBhcnRpY2xlLmluaXRpYWxWZWxvY2l0eSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5hYnNvcmJlck9yYml0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcGFydGljbGUubmVlZHNOZXdQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3JiaXRzKSB7XG4gICAgICAgICAgICBpZiAocGFydGljbGUuYWJzb3JiZXJPcmJpdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuYWJzb3JiZXJPcmJpdCA9IFZlY3Rvci5jcmVhdGUoMCwgMCk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuYWJzb3JiZXJPcmJpdC5sZW5ndGggPSBnZXREaXN0YW5jZShwYXJ0aWNsZS5nZXRQb3NpdGlvbigpLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5hYnNvcmJlck9yYml0LmFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLmFic29yYmVyT3JiaXQubGVuZ3RoIDw9IHRoaXMuc2l6ZSAmJiAhdGhpcy5vcHRpb25zLmRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5TaXplID0gTWF0aC5taW4oY2FudmFzU2l6ZS53aWR0aCwgY2FudmFzU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLmFic29yYmVyT3JiaXQubGVuZ3RoID0gbWluU2l6ZSAqICgxICsgKE1hdGgucmFuZG9tKCkgKiAwLjIgLSAwLjEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5hYnNvcmJlck9yYml0RGlyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5hYnNvcmJlck9yYml0RGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkueCA+PSAwID8gXCJjbG9ja3dpc2VcIiA6IFwiY291bnRlci1jbG9ja3dpc2VcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9yYml0UmFkaXVzID0gcGFydGljbGUuYWJzb3JiZXJPcmJpdC5sZW5ndGgsIG9yYml0QW5nbGUgPSBwYXJ0aWNsZS5hYnNvcmJlck9yYml0LmFuZ2xlLCBvcmJpdERpcmVjdGlvbiA9IHBhcnRpY2xlLmFic29yYmVyT3JiaXREaXJlY3Rpb247XG4gICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS5zZXRUbyhWZWN0b3Iub3JpZ2luKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUZ1bmMgPSB7XG4gICAgICAgICAgICAgICAgeDogb3JiaXREaXJlY3Rpb24gPT09IFwiY2xvY2t3aXNlXCIgPyBNYXRoLmNvcyA6IE1hdGguc2luLFxuICAgICAgICAgICAgICAgIHk6IG9yYml0RGlyZWN0aW9uID09PSBcImNsb2Nrd2lzZVwiID8gTWF0aC5zaW4gOiBNYXRoLmNvcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvbi54ICsgb3JiaXRSYWRpdXMgKiB1cGRhdGVGdW5jLngob3JiaXRBbmdsZSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi55ICsgb3JiaXRSYWRpdXMgKiB1cGRhdGVGdW5jLnkob3JiaXRBbmdsZSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5hYnNvcmJlck9yYml0Lmxlbmd0aCAtPSB2Lmxlbmd0aDtcbiAgICAgICAgICAgIHBhcnRpY2xlLmFic29yYmVyT3JiaXQuYW5nbGUgKz1cbiAgICAgICAgICAgICAgICAoKCgoX2EgPSBwYXJ0aWNsZS5yZXRpbmEubW92ZVNwZWVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSAqIGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbykgLyAxMDApICpcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGRWID0gVmVjdG9yLm9yaWdpbjtcbiAgICAgICAgICAgIGFkZFYubGVuZ3RoID0gdi5sZW5ndGg7XG4gICAgICAgICAgICBhZGRWLmFuZ2xlID0gdi5hbmdsZTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LmFkZFRvKGFkZFYpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzb3JiZXIgfSBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvQWJzb3JiZXJcIjtcbmltcG9ydCB7IEFic29yYmVySW5zdGFuY2UgfSBmcm9tIFwiLi9BYnNvcmJlckluc3RhbmNlXCI7XG5pbXBvcnQgeyBpdGVtRnJvbUFycmF5IH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGNsYXNzIEFic29yYmVycyB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgICAgIHRoaXMuYWJzb3JiZXJzID0gW107XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eUFic29yYmVycyA9IFtdO1xuICAgICAgICBjb250YWluZXIuZ2V0QWJzb3JiZXIgPSAoaWR4T3JOYW1lKSA9PiBpZHhPck5hbWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgaWR4T3JOYW1lID09PSBcIm51bWJlclwiXG4gICAgICAgICAgICA/IHRoaXMuYXJyYXlbaWR4T3JOYW1lIHx8IDBdXG4gICAgICAgICAgICA6IHRoaXMuYXJyYXkuZmluZCgodCkgPT4gdC5uYW1lID09PSBpZHhPck5hbWUpO1xuICAgICAgICBjb250YWluZXIuYWRkQWJzb3JiZXIgPSAob3B0aW9ucywgcG9zaXRpb24pID0+IHRoaXMuYWRkQWJzb3JiZXIob3B0aW9ucywgcG9zaXRpb24pO1xuICAgIH1cbiAgICBpbml0KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYWJzb3JiZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hYnNvcmJlcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWJzb3JiZXJzID0gb3B0aW9ucy5hYnNvcmJlcnMubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBBYnNvcmJlcigpO1xuICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFic29yYmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJzb3JiZXJzID0gbmV3IEFic29yYmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWJzb3JiZXJzLmxvYWQob3B0aW9ucy5hYnNvcmJlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGludGVyYWN0aXZpdHlBYnNvcmJlcnMgPSAoX2IgPSAoX2EgPSBvcHRpb25zLmludGVyYWN0aXZpdHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFic29yYmVycztcbiAgICAgICAgaWYgKGludGVyYWN0aXZpdHlBYnNvcmJlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcmFjdGl2aXR5QWJzb3JiZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyYWN0aXZpdHlBYnNvcmJlcnMgPSBpbnRlcmFjdGl2aXR5QWJzb3JiZXJzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgQWJzb3JiZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wLmxvYWQocyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGl2aXR5QWJzb3JiZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2aXR5QWJzb3JiZXJzID0gbmV3IEFic29yYmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eUFic29yYmVycy5sb2FkKGludGVyYWN0aXZpdHlBYnNvcmJlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFic29yYmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFic29yYmVyT3B0aW9ucyBvZiB0aGlzLmFic29yYmVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQWJzb3JiZXIoYWJzb3JiZXJPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQWJzb3JiZXIodGhpcy5hYnNvcmJlcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgICAgIGZvciAoY29uc3QgYWJzb3JiZXIgb2YgdGhpcy5hcnJheSkge1xuICAgICAgICAgICAgYWJzb3JiZXIuYXR0cmFjdChwYXJ0aWNsZSk7XG4gICAgICAgICAgICBpZiAocGFydGljbGUuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhdyhjb250ZXh0KSB7XG4gICAgICAgIGZvciAoY29uc3QgYWJzb3JiZXIgb2YgdGhpcy5hcnJheSkge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBhYnNvcmJlci5kcmF3KGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5hcnJheSA9IFtdO1xuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYWJzb3JiZXIgb2YgdGhpcy5hcnJheSkge1xuICAgICAgICAgICAgYWJzb3JiZXIucmVzaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlQ2xpY2tNb2RlKG1vZGUpIHtcbiAgICAgICAgY29uc3QgYWJzb3JiZXJPcHRpb25zID0gdGhpcy5hYnNvcmJlcnMsIG1vZGVBYnNvcmJlcnMgPSB0aGlzLmludGVyYWN0aXZpdHlBYnNvcmJlcnM7XG4gICAgICAgIGlmIChtb2RlID09PSBcImFic29yYmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBhYnNvcmJlcnNNb2RlT3B0aW9ucztcbiAgICAgICAgICAgIGlmIChtb2RlQWJzb3JiZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZUFic29yYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFic29yYmVyc01vZGVPcHRpb25zID0gaXRlbUZyb21BcnJheShtb2RlQWJzb3JiZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhYnNvcmJlcnNNb2RlT3B0aW9ucyA9IG1vZGVBYnNvcmJlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhYnNvcmJlcnNPcHRpb25zID0gYWJzb3JiZXJzTW9kZU9wdGlvbnMgIT09IG51bGwgJiYgYWJzb3JiZXJzTW9kZU9wdGlvbnMgIT09IHZvaWQgMCA/IGFic29yYmVyc01vZGVPcHRpb25zIDogKGFic29yYmVyT3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5ID8gaXRlbUZyb21BcnJheShhYnNvcmJlck9wdGlvbnMpIDogYWJzb3JiZXJPcHRpb25zKSwgYVBvc2l0aW9uID0gdGhpcy5jb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja1Bvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5hZGRBYnNvcmJlcihhYnNvcmJlcnNPcHRpb25zLCBhUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEFic29yYmVyKG9wdGlvbnMsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFic29yYmVyID0gbmV3IEFic29yYmVySW5zdGFuY2UodGhpcywgdGhpcy5jb250YWluZXIsIG9wdGlvbnMsIHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5hcnJheS5wdXNoKGFic29yYmVyKTtcbiAgICAgICAgcmV0dXJuIGFic29yYmVyO1xuICAgIH1cbiAgICByZW1vdmVBYnNvcmJlcihhYnNvcmJlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXJyYXkuaW5kZXhPZihhYnNvcmJlcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IsIHNldFJhbmdlVmFsdWUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5pbXBvcnQgeyBBYnNvcmJlclNpemUgfSBmcm9tIFwiLi9BYnNvcmJlclNpemVcIjtcbmV4cG9ydCBjbGFzcyBBYnNvcmJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBuZXcgT3B0aW9uc0NvbG9yKCk7XG4gICAgICAgIHRoaXMuY29sb3IudmFsdWUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5kZXN0cm95ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcmJpdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gbmV3IEFic29yYmVyU2l6ZSgpO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuY29sb3IsIGRhdGEuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRyYWdnYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGRhdGEuZHJhZ2dhYmxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgaWYgKGRhdGEub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHt9O1xuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnBvc2l0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaXplLmxvYWQoZGF0YS5zaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kZXN0cm95ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGRhdGEuZGVzdHJveTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcmJpdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcmJpdHMgPSBkYXRhLm9yYml0cztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic29yYmVyU2l6ZUxpbWl0IH0gZnJvbSBcIi4vQWJzb3JiZXJTaXplTGltaXRcIjtcbmltcG9ydCB7IFZhbHVlV2l0aFJhbmRvbSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBBYnNvcmJlclNpemUgZXh0ZW5kcyBWYWx1ZVdpdGhSYW5kb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRlbnNpdHkgPSA1O1xuICAgICAgICB0aGlzLnZhbHVlID0gNTA7XG4gICAgICAgIHRoaXMubGltaXQgPSBuZXcgQWJzb3JiZXJTaXplTGltaXQoKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmxvYWQoZGF0YSk7XG4gICAgICAgIGlmIChkYXRhLmRlbnNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZW5zaXR5ID0gZGF0YS5kZW5zaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5saW1pdCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhpcy5saW1pdC5yYWRpdXMgPSBkYXRhLmxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saW1pdC5sb2FkKGRhdGEubGltaXQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEFic29yYmVyU2l6ZUxpbWl0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAwO1xuICAgICAgICB0aGlzLm1hc3MgPSAwO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEubWFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1hc3MgPSBkYXRhLm1hc3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJpbXBvcnQgeyBBYnNvcmJlciB9IGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9BYnNvcmJlclwiO1xuaW1wb3J0IHsgQWJzb3JiZXJzIH0gZnJvbSBcIi4vQWJzb3JiZXJzXCI7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5jbGFzcyBBYnNvcmJlcnNQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gXCJhYnNvcmJlcnNcIjtcbiAgICB9XG4gICAgZ2V0UGx1Z2luKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gbmV3IEFic29yYmVycyhjb250YWluZXIpO1xuICAgIH1cbiAgICBuZWVkc1BsdWdpbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhYnNvcmJlcnMgPSBvcHRpb25zLmFic29yYmVycztcbiAgICAgICAgaWYgKGFic29yYmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gISFhYnNvcmJlcnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFic29yYmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKChfYyA9IChfYiA9IChfYSA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2ZW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9uQ2xpY2spID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5tb2RlKSAmJlxuICAgICAgICAgICAgaXNJbkFycmF5KFwiYWJzb3JiZXJcIiwgb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrLm1vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxvYWRPcHRpb25zKG9wdGlvbnMsIHNvdXJjZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIXRoaXMubmVlZHNQbHVnaW4ob3B0aW9ucykgJiYgIXRoaXMubmVlZHNQbHVnaW4oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnNDYXN0ID0gb3B0aW9ucztcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5hYnNvcmJlcnMpIHtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmFic29yYmVycykgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNDYXN0LmFic29yYmVycyA9IHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5hYnNvcmJlcnMubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBBYnNvcmJlcigpO1xuICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvcmJlck9wdGlvbnMgPSBvcHRpb25zQ2FzdC5hYnNvcmJlcnM7XG4gICAgICAgICAgICAgICAgaWYgKChhYnNvcmJlck9wdGlvbnMgPT09IG51bGwgfHwgYWJzb3JiZXJPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhYnNvcmJlck9wdGlvbnMubG9hZCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zQ2FzdC5hYnNvcmJlcnMgPSBhYnNvcmJlck9wdGlvbnMgPSBuZXcgQWJzb3JiZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWJzb3JiZXJPcHRpb25zLmxvYWQoc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmFic29yYmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW50ZXJhY3Rpdml0eUFic29yYmVycyA9IChfYiA9IChfYSA9IHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5pbnRlcmFjdGl2aXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubW9kZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hYnNvcmJlcnM7XG4gICAgICAgIGlmIChpbnRlcmFjdGl2aXR5QWJzb3JiZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eUFic29yYmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc0Nhc3QuaW50ZXJhY3Rpdml0eS5tb2Rlcy5hYnNvcmJlcnMgPSBpbnRlcmFjdGl2aXR5QWJzb3JiZXJzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgQWJzb3JiZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wLmxvYWQocyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb3JiZXJPcHRpb25zID0gb3B0aW9uc0Nhc3QuaW50ZXJhY3Rpdml0eS5tb2Rlcy5hYnNvcmJlcnM7XG4gICAgICAgICAgICAgICAgaWYgKChhYnNvcmJlck9wdGlvbnMgPT09IG51bGwgfHwgYWJzb3JiZXJPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhYnNvcmJlck9wdGlvbnMubG9hZCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zQ2FzdC5pbnRlcmFjdGl2aXR5Lm1vZGVzLmFic29yYmVycyA9IGFic29yYmVyT3B0aW9ucyA9IG5ldyBBYnNvcmJlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhYnNvcmJlck9wdGlvbnMubG9hZChpbnRlcmFjdGl2aXR5QWJzb3JiZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQWJzb3JiZXJzUGx1Z2luKGVuZ2luZSkge1xuICAgIGNvbnN0IHBsdWdpbiA9IG5ldyBBYnNvcmJlcnNQbHVnaW4oKTtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGx1Z2luKHBsdWdpbik7XG59XG5leHBvcnQgKiBmcm9tIFwiLi9BYnNvcmJlckNvbnRhaW5lclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvQWJzb3JiZXJDbGlja01vZGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JQWJzb3JiZXJPcHRpb25zXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=