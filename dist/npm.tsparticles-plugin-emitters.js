"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-plugin-emitters"],{

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmitterInstance": () => (/* binding */ EmitterInstance)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _Options_Classes_EmitterSize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/EmitterSize */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmitterInstance_firstSpawn, _EmitterInstance_startParticlesAdded, _EmitterInstance_engine;



class EmitterInstance {
    constructor(engine, emitters, container, options, position) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h;
        this.emitters = emitters;
        this.container = container;
        _EmitterInstance_firstSpawn.set(this, void 0);
        _EmitterInstance_startParticlesAdded.set(this, void 0);
        _EmitterInstance_engine.set(this, void 0);
        __classPrivateFieldSet(this, _EmitterInstance_engine, engine, "f");
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        if (options instanceof _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter) {
            this.options = options;
        }
        else {
            this.options = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
            this.options.load(options);
        }
        this.spawnDelay = (((_a = this.options.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000) / this.container.retina.reduceFactor;
        this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
        this.name = this.options.name;
        this.shape = (_c = __classPrivateFieldGet(this, _EmitterInstance_engine, "f").emitterShapeManager) === null || _c === void 0 ? void 0 : _c.getShape(this.options.shape);
        this.fill = this.options.fill;
        __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.options.life.wait, "f");
        __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");
        let particlesOptions = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, this.options.particles);
        particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : (particlesOptions = {});
        (_d = particlesOptions.move) !== null && _d !== void 0 ? _d : (particlesOptions.move = {});
        (_e = (_h = particlesOptions.move).direction) !== null && _e !== void 0 ? _e : (_h.direction = this.options.direction);
        if (this.options.spawnColor) {
            this.spawnColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(this.options.spawnColor);
        }
        this.paused = !this.options.autoPlay;
        this.particlesOptions = particlesOptions;
        this.size =
            (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
                const size = new _Options_Classes_EmitterSize__WEBPACK_IMPORTED_MODULE_2__.EmitterSize();
                size.load({
                    height: 0,
                    mode: "percent",
                    width: 0,
                });
                return size;
            })();
        this.lifeCount = (_g = this.options.life.count) !== null && _g !== void 0 ? _g : -1;
        this.immortal = this.lifeCount <= 0;
        __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterCreated", {
            container,
            data: {
                emitter: this,
            },
        });
        this.play();
    }
    externalPlay() {
        this.paused = false;
        this.play();
    }
    externalPause() {
        this.paused = true;
        this.pause();
    }
    play() {
        var _a;
        if (this.paused) {
            return;
        }
        if (!(this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal || !this.options.life.count) &&
            (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0)))) {
            return;
        }
        if (this.emitDelay === undefined) {
            const delay = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.rate.delay);
            this.emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
        }
        if (this.lifeCount > 0 || this.immortal) {
            this.prepareToDie();
        }
    }
    pause() {
        if (this.paused) {
            return;
        }
        delete this.emitDelay;
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside)(initialPosition, this.container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.origin)
                ? initialPosition
                : this.calcPosition();
    }
    update(delta) {
        var _a, _b, _c;
        if (this.paused) {
            return;
        }
        if (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f")) {
            __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, false, "f");
            this.currentSpawnDelay = (_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0;
            this.currentEmitDelay = (_b = this.emitDelay) !== null && _b !== void 0 ? _b : 0;
        }
        if (!__classPrivateFieldGet(this, _EmitterInstance_startParticlesAdded, "f")) {
            __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, true, "f");
            this.emitParticles(this.options.startCount);
        }
        if (this.duration !== undefined) {
            this.currentDuration += delta.value;
            if (this.currentDuration >= this.duration) {
                this.pause();
                if (this.spawnDelay !== undefined) {
                    delete this.spawnDelay;
                }
                if (!this.immortal) {
                    this.lifeCount--;
                }
                if (this.lifeCount > 0 || this.immortal) {
                    this.position = this.calcPosition();
                    this.spawnDelay = (((_c = this.options.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000) / this.container.retina.reduceFactor;
                }
                else {
                    this.destroy();
                }
                this.currentDuration -= this.duration;
                delete this.duration;
            }
        }
        if (this.spawnDelay !== undefined) {
            this.currentSpawnDelay += delta.value;
            if (this.currentSpawnDelay >= this.spawnDelay) {
                __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterPlay", {
                    container: this.container,
                });
                this.play();
                this.currentSpawnDelay -= this.currentSpawnDelay;
                delete this.spawnDelay;
            }
        }
        if (this.emitDelay !== undefined) {
            this.currentEmitDelay += delta.value;
            if (this.currentEmitDelay >= this.emitDelay) {
                this.emit();
                this.currentEmitDelay -= this.emitDelay;
            }
        }
    }
    getPosition() {
        if (this.options.domId) {
            const container = this.container, element = document.getElementById(this.options.domId);
            if (element) {
                const elRect = element.getBoundingClientRect();
                return {
                    x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
                    y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio,
                };
            }
        }
        return this.position;
    }
    getSize() {
        const container = this.container;
        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);
            if (element) {
                const elRect = element.getBoundingClientRect();
                return {
                    width: elRect.width * container.retina.pixelRatio,
                    height: elRect.height * container.retina.pixelRatio,
                };
            }
        }
        return {
            width: this.size.mode === "percent"
                ? (container.canvas.size.width * this.size.width) / 100
                : this.size.width,
            height: this.size.mode === "percent"
                ? (container.canvas.size.height * this.size.height) / 100
                : this.size.height,
        };
    }
    prepareToDie() {
        var _a;
        if (this.paused) {
            return;
        }
        const duration = (_a = this.options.life) === null || _a === void 0 ? void 0 : _a.duration;
        if (this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal) &&
            duration !== undefined &&
            duration > 0) {
            this.duration = duration * 1000;
        }
    }
    destroy() {
        this.emitters.removeEmitter(this);
        __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this,
            },
        });
    }
    calcPosition() {
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionOrRandomFromSizeRanged)({
            size: this.container.canvas.size,
            position: this.options.position,
        });
    }
    emit() {
        if (this.paused) {
            return;
        }
        const quantity = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.rate.quantity);
        this.emitParticles(quantity);
    }
    emitParticles(quantity) {
        var _a, _b, _c;
        const position = this.getPosition(), size = this.getSize();
        for (let i = 0; i < quantity; i++) {
            const particlesOptions = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, this.particlesOptions);
            if (this.spawnColor) {
                const hslAnimation = (_a = this.options.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
                if (hslAnimation) {
                    this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                    this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                    this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                }
                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                }
                else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }
            if (!position) {
                return;
            }
            const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, size, this.fill)) !== null && _c !== void 0 ? _c : position;
            this.container.particles.addParticle(pPosition, particlesOptions);
        }
    }
    setColorAnimation(animation, initValue, maxValue) {
        var _a;
        const container = this.container;
        if (!animation.enable) {
            return initValue;
        }
        const colorOffset = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(animation.offset), delay = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.rate.delay), emitFactor = (1000 * delay) / container.retina.reduceFactor, colorSpeed = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)((_a = animation.speed) !== null && _a !== void 0 ? _a : 0);
        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
_EmitterInstance_firstSpawn = new WeakMap(), _EmitterInstance_startParticlesAdded = new WeakMap(), _EmitterInstance_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Emitters.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Emitters.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Emitters": () => (/* binding */ Emitters)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _EmitterInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitterInstance */ "./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Emitters_engine;



class Emitters {
    constructor(engine, container) {
        this.container = container;
        _Emitters_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Emitters_engine, engine, "f");
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = [];
        container.getEmitter = (idxOrName) => idxOrName === undefined || typeof idxOrName === "number"
            ? this.array[idxOrName || 0]
            : this.array.find((t) => t.name === idxOrName);
        container.addEmitter = (options, position) => this.addEmitter(options, position);
        container.removeEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                this.removeEmitter(emitter);
            }
        };
        container.playEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPlay();
            }
        };
        container.pauseEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPause();
            }
        };
    }
    init(options) {
        var _a, _b;
        if (!options) {
            return;
        }
        if (options.emitters) {
            if (options.emitters instanceof Array) {
                this.emitters = options.emitters.map((s) => {
                    const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.emitters instanceof Array) {
                    this.emitters = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                }
                this.emitters.load(options.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                this.interactivityEmitters = interactivityEmitters.map((s) => {
                    const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.interactivityEmitters instanceof Array) {
                    this.interactivityEmitters = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                }
                this.interactivityEmitters.load(interactivityEmitters);
            }
        }
        if (this.emitters instanceof Array) {
            for (const emitterOptions of this.emitters) {
                this.addEmitter(emitterOptions);
            }
        }
        else {
            this.addEmitter(this.emitters);
        }
    }
    play() {
        for (const emitter of this.array) {
            emitter.play();
        }
    }
    pause() {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }
    stop() {
        this.array = [];
    }
    update(delta) {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }
    handleClickMode(mode) {
        const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
        if (mode === "emitter") {
            let emitterModeOptions;
            if (modeEmitters instanceof Array) {
                if (modeEmitters.length > 0) {
                    emitterModeOptions = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)(modeEmitters);
                }
            }
            else {
                emitterModeOptions = modeEmitters;
            }
            const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : (emitterOptions instanceof Array ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)(emitterOptions) : emitterOptions), ePosition = this.container.interactivity.mouse.clickPosition;
            this.addEmitter((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, emittersOptions), ePosition);
        }
    }
    resize() {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }
    addEmitter(options, position) {
        const emitterOptions = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
        emitterOptions.load(options);
        const emitter = new _EmitterInstance__WEBPACK_IMPORTED_MODULE_2__.EmitterInstance(__classPrivateFieldGet(this, _Emitters_engine, "f"), this, this.container, emitterOptions, position);
        this.array.push(emitter);
        return emitter;
    }
    removeEmitter(emitter) {
        const index = this.array.indexOf(emitter);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
_Emitters_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Emitter": () => (/* binding */ Emitter)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _EmitterLife__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmitterLife */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js");
/* harmony import */ var _EmitterRate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitterRate */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js");
/* harmony import */ var _EmitterSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EmitterSize */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js");




class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new _EmitterLife__WEBPACK_IMPORTED_MODULE_1__.EmitterLife();
        this.rate = new _EmitterRate__WEBPACK_IMPORTED_MODULE_2__.EmitterRate();
        this.shape = "square";
        this.startCount = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new _EmitterSize__WEBPACK_IMPORTED_MODULE_3__.EmitterSize();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        if (data.particles !== undefined) {
            this.particles = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.particles);
        }
        this.rate.load(data.rate);
        if (data.shape !== undefined) {
            this.shape = data.shape;
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
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor();
            }
            this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmitterLife": () => (/* binding */ EmitterLife)
/* harmony export */ });
class EmitterLife {
    constructor() {
        this.wait = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.wait !== undefined) {
            this.wait = data.wait;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmitterRate": () => (/* binding */ EmitterRate)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.quantity !== undefined) {
            this.quantity = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.quantity);
        }
        if (data.delay !== undefined) {
            this.delay = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.delay);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmitterSize": () => (/* binding */ EmitterSize)
/* harmony export */ });
class EmitterSize {
    constructor() {
        this.mode = "percent";
        this.height = 0;
        this.width = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Interfaces/IEmitterOptions.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Interfaces/IEmitterOptions.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeManager": () => (/* binding */ ShapeManager)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ShapeManager_engine;
const shapes = new Map();
class ShapeManager {
    constructor(engine) {
        _ShapeManager_engine.set(this, void 0);
        __classPrivateFieldSet(this, _ShapeManager_engine, engine, "f");
    }
    addShape(name, drawer) {
        if (!this.getShape(name)) {
            shapes.set(name, drawer);
        }
    }
    getShape(name) {
        return shapes.get(name);
    }
    getSupportedShapes() {
        return shapes.keys();
    }
}
_ShapeManager_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CircleShape": () => (/* binding */ CircleShape)
/* harmony export */ });
class CircleShape {
    randomPosition(position, size, fill) {
        const generateTheta = (x, y) => {
            const u = Math.random() / 4.0, theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u)), v = Math.random();
            if (v < 0.25) {
                return theta;
            }
            else if (v < 0.5) {
                return Math.PI - theta;
            }
            else if (v < 0.75) {
                return Math.PI + theta;
            }
            else {
                return -theta;
            }
        }, radius = (x, y, theta) => (x * y) / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2), [a, b] = [size.width / 2, size.height / 2], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;
        return {
            x: position.x + randomRadius * Math.cos(randomTheta),
            y: position.y + randomRadius * Math.sin(randomTheta),
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SquareShape": () => (/* binding */ SquareShape)
/* harmony export */ });
function randomSquareCoordinate(position, offset) {
    return position + offset * (Math.random() - 0.5);
}
class SquareShape {
    randomPosition(position, size, fill) {
        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, size.width),
                y: randomSquareCoordinate(position.y, size.height),
            };
        }
        else {
            const halfW = size.width / 2, halfH = size.height / 2, side = Math.floor(Math.random() * 4), v = (Math.random() - 0.5) * 2;
            switch (side) {
                case 0:
                    return {
                        x: position.x + v * halfW,
                        y: position.y - halfH,
                    };
                case 1:
                    return {
                        x: position.x - halfW,
                        y: position.y + v * halfH,
                    };
                case 2:
                    return {
                        x: position.x + v * halfW,
                        y: position.y + halfH,
                    };
                case 3:
                default:
                    return {
                        x: position.x + halfW,
                        y: position.y + v * halfH,
                    };
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadEmittersPlugin": () => (/* binding */ loadEmittersPlugin)
/* harmony export */ });
/* harmony import */ var _Shapes_Circle_CircleShape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shapes/Circle/CircleShape */ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _Emitters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Emitters */ "./node_modules/tsparticles-plugin-emitters/esm/Emitters.js");
/* harmony import */ var _ShapeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShapeManager */ "./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js");
/* harmony import */ var _Shapes_Square_SquareShape__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shapes/Square/SquareShape */ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _EmitterContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EmitterContainer */ "./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js");
/* harmony import */ var _EmittersEngine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EmittersEngine */ "./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js");
/* harmony import */ var _Enums_EmitterClickMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Enums/EmitterClickMode */ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js");
/* harmony import */ var _Enums_EmitterShapeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Enums/EmitterShapeType */ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js");
/* harmony import */ var _Options_Interfaces_IEmitterOptions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Options/Interfaces/IEmitterOptions */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Interfaces/IEmitterOptions.js");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmittersPlugin_engine;






class EmittersPlugin {
    constructor(engine) {
        _EmittersPlugin_engine.set(this, void 0);
        __classPrivateFieldSet(this, _EmittersPlugin_engine, engine, "f");
        this.id = "emitters";
    }
    getPlugin(container) {
        return new _Emitters__WEBPACK_IMPORTED_MODULE_2__.Emitters(__classPrivateFieldGet(this, _EmittersPlugin_engine, "f"), container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
            return false;
        }
        const emitters = options.emitters;
        return ((emitters instanceof Array && !!emitters.length) ||
            emitters !== undefined ||
            (!!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
                (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_5__.isInArray)("emitter", options.interactivity.events.onClick.mode)));
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.emitters) {
            if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
                optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s) => {
                    const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.emitters = emitterOptions = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                }
                emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s) => {
                    const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.interactivity.modes.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.interactivity.modes.emitters = emitterOptions = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter();
                }
                emitterOptions.load(interactivityEmitters);
            }
        }
    }
}
_EmittersPlugin_engine = new WeakMap();
async function loadEmittersPlugin(engine) {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new _ShapeManager__WEBPACK_IMPORTED_MODULE_3__.ShapeManager(engine);
    }
    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name, shape) => {
            var _a;
            (_a = engine.emitterShapeManager) === null || _a === void 0 ? void 0 : _a.addShape(name, shape);
        };
    }
    const plugin = new EmittersPlugin(engine);
    await engine.addPlugin(plugin);
    engine.addEmitterShape("circle", new _Shapes_Circle_CircleShape__WEBPACK_IMPORTED_MODULE_0__.CircleShape());
    engine.addEmitterShape("square", new _Shapes_Square_SquareShape__WEBPACK_IMPORTED_MODULE_4__.SquareShape());
}







/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLDZEQUFPO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkRBQU87QUFDM0M7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRiw2REFBTztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSx5Q0FBeUMsdURBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG1FQUFXO0FBQ3BELHlDQUF5QyxtRUFBVztBQUNwRDtBQUNtQztBQUNGO0FBQ1E7QUFDQTtBQUNZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vRW1pdHRlckNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWVtaXR0ZXJzL2VzbS9FbWl0dGVySW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vRW1pdHRlcnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vRW1pdHRlcnNFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vRW51bXMvRW1pdHRlckNsaWNrTW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWVtaXR0ZXJzL2VzbS9FbnVtcy9FbWl0dGVyU2hhcGVUeXBlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tZW1pdHRlcnMvZXNtL09wdGlvbnMvQ2xhc3Nlcy9FbWl0dGVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tZW1pdHRlcnMvZXNtL09wdGlvbnMvQ2xhc3Nlcy9FbWl0dGVyTGlmZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWVtaXR0ZXJzL2VzbS9PcHRpb25zL0NsYXNzZXMvRW1pdHRlclJhdGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vT3B0aW9ucy9DbGFzc2VzL0VtaXR0ZXJTaXplLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tZW1pdHRlcnMvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JRW1pdHRlck9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vU2hhcGVNYW5hZ2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tZW1pdHRlcnMvZXNtL1NoYXBlcy9DaXJjbGUvQ2lyY2xlU2hhcGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1lbWl0dGVycy9lc20vU2hhcGVzL1NxdWFyZS9TcXVhcmVTaGFwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLWVtaXR0ZXJzL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge307XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0VtaXR0ZXJJbnN0YW5jZV9maXJzdFNwYXduLCBfRW1pdHRlckluc3RhbmNlX3N0YXJ0UGFydGljbGVzQWRkZWQsIF9FbWl0dGVySW5zdGFuY2VfZW5naW5lO1xuaW1wb3J0IHsgVmVjdG9yLCBjYWxjUG9zaXRpb25PclJhbmRvbUZyb21TaXplUmFuZ2VkLCBjb2xvclRvSHNsLCBkZWVwRXh0ZW5kLCBnZXRSYW5nZVZhbHVlLCBpc1BvaW50SW5zaWRlLCByYW5kb21JblJhbmdlLCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvRW1pdHRlclwiO1xuaW1wb3J0IHsgRW1pdHRlclNpemUgfSBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvRW1pdHRlclNpemVcIjtcbmV4cG9ydCBjbGFzcyBFbWl0dGVySW5zdGFuY2Uge1xuICAgIGNvbnN0cnVjdG9yKGVuZ2luZSwgZW1pdHRlcnMsIGNvbnRhaW5lciwgb3B0aW9ucywgcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgICAgICB2YXIgX2g7XG4gICAgICAgIHRoaXMuZW1pdHRlcnMgPSBlbWl0dGVycztcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF9FbWl0dGVySW5zdGFuY2VfZmlyc3RTcGF3bi5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0VtaXR0ZXJJbnN0YW5jZV9zdGFydFBhcnRpY2xlc0FkZGVkLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfRW1pdHRlckluc3RhbmNlX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRW1pdHRlckluc3RhbmNlX2VuZ2luZSwgZW5naW5lLCBcImZcIik7XG4gICAgICAgIHRoaXMuY3VycmVudER1cmF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50RW1pdERlbGF5ID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3Bhd25EZWxheSA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zIGluc3RhbmNlb2YgRW1pdHRlcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubG9hZChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwYXduRGVsYXkgPSAoKChfYSA9IHRoaXMub3B0aW9ucy5saWZlLmRlbGF5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSAqIDEwMDApIC8gdGhpcy5jb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IChfYiA9IHRoaXMuaW5pdGlhbFBvc2l0aW9uKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0aGlzLmNhbGNQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm9wdGlvbnMubmFtZTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IChfYyA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VtaXR0ZXJJbnN0YW5jZV9lbmdpbmUsIFwiZlwiKS5lbWl0dGVyU2hhcGVNYW5hZ2VyKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0U2hhcGUodGhpcy5vcHRpb25zLnNoYXBlKTtcbiAgICAgICAgdGhpcy5maWxsID0gdGhpcy5vcHRpb25zLmZpbGw7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0VtaXR0ZXJJbnN0YW5jZV9maXJzdFNwYXduLCAhdGhpcy5vcHRpb25zLmxpZmUud2FpdCwgXCJmXCIpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FbWl0dGVySW5zdGFuY2Vfc3RhcnRQYXJ0aWNsZXNBZGRlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgbGV0IHBhcnRpY2xlc09wdGlvbnMgPSBkZWVwRXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMucGFydGljbGVzKTtcbiAgICAgICAgcGFydGljbGVzT3B0aW9ucyAhPT0gbnVsbCAmJiBwYXJ0aWNsZXNPcHRpb25zICE9PSB2b2lkIDAgPyBwYXJ0aWNsZXNPcHRpb25zIDogKHBhcnRpY2xlc09wdGlvbnMgPSB7fSk7XG4gICAgICAgIChfZCA9IHBhcnRpY2xlc09wdGlvbnMubW92ZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogKHBhcnRpY2xlc09wdGlvbnMubW92ZSA9IHt9KTtcbiAgICAgICAgKF9lID0gKF9oID0gcGFydGljbGVzT3B0aW9ucy5tb3ZlKS5kaXJlY3Rpb24pICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IChfaC5kaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zcGF3bkNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLnNwYXduQ29sb3IgPSBjb2xvclRvSHNsKHRoaXMub3B0aW9ucy5zcGF3bkNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLm9wdGlvbnMuYXV0b1BsYXk7XG4gICAgICAgIHRoaXMucGFydGljbGVzT3B0aW9ucyA9IHBhcnRpY2xlc09wdGlvbnM7XG4gICAgICAgIHRoaXMuc2l6ZSA9XG4gICAgICAgICAgICAoX2YgPSB0aGlzLm9wdGlvbnMuc2l6ZSkgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gbmV3IEVtaXR0ZXJTaXplKCk7XG4gICAgICAgICAgICAgICAgc2l6ZS5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInBlcmNlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB0aGlzLmxpZmVDb3VudCA9IChfZyA9IHRoaXMub3B0aW9ucy5saWZlLmNvdW50KSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAtMTtcbiAgICAgICAgdGhpcy5pbW1vcnRhbCA9IHRoaXMubGlmZUNvdW50IDw9IDA7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VtaXR0ZXJJbnN0YW5jZV9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwiZW1pdHRlckNyZWF0ZWRcIiwge1xuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXI6IHRoaXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICAgIGV4dGVybmFsUGxheSgpIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICAgIGV4dGVybmFsUGF1c2UoKSB7XG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgICBwbGF5KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHRoaXMuY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3IgJiZcbiAgICAgICAgICAgICh0aGlzLmxpZmVDb3VudCA+IDAgfHwgdGhpcy5pbW1vcnRhbCB8fCAhdGhpcy5vcHRpb25zLmxpZmUuY291bnQpICYmXG4gICAgICAgICAgICAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW1pdHRlckluc3RhbmNlX2ZpcnN0U3Bhd24sIFwiZlwiKSB8fCB0aGlzLmN1cnJlbnRTcGF3bkRlbGF5ID49ICgoX2EgPSB0aGlzLnNwYXduRGVsYXkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbWl0RGVsYXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBnZXRSYW5nZVZhbHVlKHRoaXMub3B0aW9ucy5yYXRlLmRlbGF5KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdERlbGF5ID0gKDEwMDAgKiBkZWxheSkgLyB0aGlzLmNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxpZmVDb3VudCA+IDAgfHwgdGhpcy5pbW1vcnRhbCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9EaWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMuZW1pdERlbGF5O1xuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuaW5pdGlhbFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID1cbiAgICAgICAgICAgIGluaXRpYWxQb3NpdGlvbiAmJiBpc1BvaW50SW5zaWRlKGluaXRpYWxQb3NpdGlvbiwgdGhpcy5jb250YWluZXIuY2FudmFzLnNpemUsIFZlY3Rvci5vcmlnaW4pXG4gICAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb25cbiAgICAgICAgICAgICAgICA6IHRoaXMuY2FsY1Bvc2l0aW9uKCk7XG4gICAgfVxuICAgIHVwZGF0ZShkZWx0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VtaXR0ZXJJbnN0YW5jZV9maXJzdFNwYXduLCBcImZcIikpIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0VtaXR0ZXJJbnN0YW5jZV9maXJzdFNwYXduLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3Bhd25EZWxheSA9IChfYSA9IHRoaXMuc3Bhd25EZWxheSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEVtaXREZWxheSA9IChfYiA9IHRoaXMuZW1pdERlbGF5KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW1pdHRlckluc3RhbmNlX3N0YXJ0UGFydGljbGVzQWRkZWQsIFwiZlwiKSkge1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRW1pdHRlckluc3RhbmNlX3N0YXJ0UGFydGljbGVzQWRkZWQsIHRydWUsIFwiZlwiKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFBhcnRpY2xlcyh0aGlzLm9wdGlvbnMuc3RhcnRDb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RHVyYXRpb24gKz0gZGVsdGEudmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RHVyYXRpb24gPj0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGF3bkRlbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3Bhd25EZWxheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmltbW9ydGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlmZUNvdW50LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpZmVDb3VudCA+IDAgfHwgdGhpcy5pbW1vcnRhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5jYWxjUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGF3bkRlbGF5ID0gKCgoX2MgPSB0aGlzLm9wdGlvbnMubGlmZS5kZWxheSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCkgKiAxMDAwKSAvIHRoaXMuY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RHVyYXRpb24gLT0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zcGF3bkRlbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwYXduRGVsYXkgKz0gZGVsdGEudmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3Bhd25EZWxheSA+PSB0aGlzLnNwYXduRGVsYXkpIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbWl0dGVySW5zdGFuY2VfZW5naW5lLCBcImZcIikuZGlzcGF0Y2hFdmVudChcImVtaXR0ZXJQbGF5XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTcGF3bkRlbGF5IC09IHRoaXMuY3VycmVudFNwYXduRGVsYXk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3Bhd25EZWxheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbWl0RGVsYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RW1pdERlbGF5ICs9IGRlbHRhLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEVtaXREZWxheSA+PSB0aGlzLmVtaXREZWxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEVtaXREZWxheSAtPSB0aGlzLmVtaXREZWxheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21JZCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm9wdGlvbnMuZG9tSWQpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IChlbFJlY3QueCArIGVsUmVjdC53aWR0aCAvIDIpICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvLFxuICAgICAgICAgICAgICAgICAgICB5OiAoZWxSZWN0LnkgKyBlbFJlY3QuaGVpZ2h0IC8gMikgKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICB9XG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm9wdGlvbnMuZG9tSWQpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBlbFJlY3Qud2lkdGggKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZWxSZWN0LmhlaWdodCAqIGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zaXplLm1vZGUgPT09IFwicGVyY2VudFwiXG4gICAgICAgICAgICAgICAgPyAoY29udGFpbmVyLmNhbnZhcy5zaXplLndpZHRoICogdGhpcy5zaXplLndpZHRoKSAvIDEwMFxuICAgICAgICAgICAgICAgIDogdGhpcy5zaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUubW9kZSA9PT0gXCJwZXJjZW50XCJcbiAgICAgICAgICAgICAgICA/IChjb250YWluZXIuY2FudmFzLnNpemUuaGVpZ2h0ICogdGhpcy5zaXplLmhlaWdodCkgLyAxMDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2l6ZS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHByZXBhcmVUb0RpZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IChfYSA9IHRoaXMub3B0aW9ucy5saWZlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZHVyYXRpb247XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yICYmXG4gICAgICAgICAgICAodGhpcy5saWZlQ291bnQgPiAwIHx8IHRoaXMuaW1tb3J0YWwpICYmXG4gICAgICAgICAgICBkdXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBkdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbiAqIDEwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVycy5yZW1vdmVFbWl0dGVyKHRoaXMpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbWl0dGVySW5zdGFuY2VfZW5naW5lLCBcImZcIikuZGlzcGF0Y2hFdmVudChcImVtaXR0ZXJEZXN0cm95ZWRcIiwge1xuICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhbGNQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNhbGNQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemVSYW5nZWQoe1xuICAgICAgICAgICAgc2l6ZTogdGhpcy5jb250YWluZXIuY2FudmFzLnNpemUsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5vcHRpb25zLnBvc2l0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBnZXRSYW5nZVZhbHVlKHRoaXMub3B0aW9ucy5yYXRlLnF1YW50aXR5KTtcbiAgICAgICAgdGhpcy5lbWl0UGFydGljbGVzKHF1YW50aXR5KTtcbiAgICB9XG4gICAgZW1pdFBhcnRpY2xlcyhxdWFudGl0eSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCksIHNpemUgPSB0aGlzLmdldFNpemUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0aWNsZXNPcHRpb25zID0gZGVlcEV4dGVuZCh7fSwgdGhpcy5wYXJ0aWNsZXNPcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwYXduQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoc2xBbmltYXRpb24gPSAoX2EgPSB0aGlzLm9wdGlvbnMuc3Bhd25Db2xvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoaHNsQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25Db2xvci5oID0gdGhpcy5zZXRDb2xvckFuaW1hdGlvbihoc2xBbmltYXRpb24uaCwgdGhpcy5zcGF3bkNvbG9yLmgsIDM2MCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25Db2xvci5zID0gdGhpcy5zZXRDb2xvckFuaW1hdGlvbihoc2xBbmltYXRpb24ucywgdGhpcy5zcGF3bkNvbG9yLnMsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25Db2xvci5sID0gdGhpcy5zZXRDb2xvckFuaW1hdGlvbihoc2xBbmltYXRpb24ubCwgdGhpcy5zcGF3bkNvbG9yLmwsIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcGFydGljbGVzT3B0aW9ucy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNPcHRpb25zLmNvbG9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3Bhd25Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc09wdGlvbnMuY29sb3IudmFsdWUgPSB0aGlzLnNwYXduQ29sb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBQb3NpdGlvbiA9IChfYyA9IChfYiA9IHRoaXMuc2hhcGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yYW5kb21Qb3NpdGlvbihwb3NpdGlvbiwgc2l6ZSwgdGhpcy5maWxsKSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogcG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5wYXJ0aWNsZXMuYWRkUGFydGljbGUocFBvc2l0aW9uLCBwYXJ0aWNsZXNPcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRDb2xvckFuaW1hdGlvbihhbmltYXRpb24sIGluaXRWYWx1ZSwgbWF4VmFsdWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFhbmltYXRpb24uZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbG9yT2Zmc2V0ID0gcmFuZG9tSW5SYW5nZShhbmltYXRpb24ub2Zmc2V0KSwgZGVsYXkgPSBnZXRSYW5nZVZhbHVlKHRoaXMub3B0aW9ucy5yYXRlLmRlbGF5KSwgZW1pdEZhY3RvciA9ICgxMDAwICogZGVsYXkpIC8gY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3IsIGNvbG9yU3BlZWQgPSBnZXRSYW5nZVZhbHVlKChfYSA9IGFuaW1hdGlvbi5zcGVlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCk7XG4gICAgICAgIHJldHVybiAoaW5pdFZhbHVlICsgKGNvbG9yU3BlZWQgKiBjb250YWluZXIuZnBzTGltaXQpIC8gZW1pdEZhY3RvciArIGNvbG9yT2Zmc2V0ICogMy42KSAlIG1heFZhbHVlO1xuICAgIH1cbn1cbl9FbWl0dGVySW5zdGFuY2VfZmlyc3RTcGF3biA9IG5ldyBXZWFrTWFwKCksIF9FbWl0dGVySW5zdGFuY2Vfc3RhcnRQYXJ0aWNsZXNBZGRlZCA9IG5ldyBXZWFrTWFwKCksIF9FbWl0dGVySW5zdGFuY2VfZW5naW5lID0gbmV3IFdlYWtNYXAoKTtcbiIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfRW1pdHRlcnNfZW5naW5lO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCwgaXRlbUZyb21BcnJheSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvRW1pdHRlclwiO1xuaW1wb3J0IHsgRW1pdHRlckluc3RhbmNlIH0gZnJvbSBcIi4vRW1pdHRlckluc3RhbmNlXCI7XG5leHBvcnQgY2xhc3MgRW1pdHRlcnMge1xuICAgIGNvbnN0cnVjdG9yKGVuZ2luZSwgY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBfRW1pdHRlcnNfZW5naW5lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FbWl0dGVyc19lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZW1pdHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2aXR5RW1pdHRlcnMgPSBbXTtcbiAgICAgICAgY29udGFpbmVyLmdldEVtaXR0ZXIgPSAoaWR4T3JOYW1lKSA9PiBpZHhPck5hbWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgaWR4T3JOYW1lID09PSBcIm51bWJlclwiXG4gICAgICAgICAgICA/IHRoaXMuYXJyYXlbaWR4T3JOYW1lIHx8IDBdXG4gICAgICAgICAgICA6IHRoaXMuYXJyYXkuZmluZCgodCkgPT4gdC5uYW1lID09PSBpZHhPck5hbWUpO1xuICAgICAgICBjb250YWluZXIuYWRkRW1pdHRlciA9IChvcHRpb25zLCBwb3NpdGlvbikgPT4gdGhpcy5hZGRFbWl0dGVyKG9wdGlvbnMsIHBvc2l0aW9uKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUVtaXR0ZXIgPSAoaWR4T3JOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGFpbmVyLmdldEVtaXR0ZXIoaWR4T3JOYW1lKTtcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFbWl0dGVyKGVtaXR0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb250YWluZXIucGxheUVtaXR0ZXIgPSAoaWR4T3JOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGFpbmVyLmdldEVtaXR0ZXIoaWR4T3JOYW1lKTtcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5leHRlcm5hbFBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGFpbmVyLnBhdXNlRW1pdHRlciA9IChpZHhPck5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250YWluZXIuZ2V0RW1pdHRlcihpZHhPck5hbWUpO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmV4dGVybmFsUGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgaW5pdChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmVtaXR0ZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lbWl0dGVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVycyA9IG9wdGlvbnMuZW1pdHRlcnMubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdHRlcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJzID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVycy5sb2FkKG9wdGlvbnMuZW1pdHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGludGVyYWN0aXZpdHlFbWl0dGVycyA9IChfYiA9IChfYSA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1vZGVzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZW1pdHRlcnM7XG4gICAgICAgIGlmIChpbnRlcmFjdGl2aXR5RW1pdHRlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcmFjdGl2aXR5RW1pdHRlcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eUVtaXR0ZXJzID0gaW50ZXJhY3Rpdml0eUVtaXR0ZXJzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmludGVyYWN0aXZpdHlFbWl0dGVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eUVtaXR0ZXJzID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2aXR5RW1pdHRlcnMubG9hZChpbnRlcmFjdGl2aXR5RW1pdHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVtaXR0ZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW1pdHRlck9wdGlvbnMgb2YgdGhpcy5lbWl0dGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW1pdHRlcihlbWl0dGVyT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZEVtaXR0ZXIodGhpcy5lbWl0dGVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbWl0dGVyIG9mIHRoaXMuYXJyYXkpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhdXNlKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVtaXR0ZXIgb2YgdGhpcy5hcnJheSkge1xuICAgICAgICAgICAgZW1pdHRlci5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBbXTtcbiAgICB9XG4gICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgICAgIGZvciAoY29uc3QgZW1pdHRlciBvZiB0aGlzLmFycmF5KSB7XG4gICAgICAgICAgICBlbWl0dGVyLnVwZGF0ZShkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlQ2xpY2tNb2RlKG1vZGUpIHtcbiAgICAgICAgY29uc3QgZW1pdHRlck9wdGlvbnMgPSB0aGlzLmVtaXR0ZXJzLCBtb2RlRW1pdHRlcnMgPSB0aGlzLmludGVyYWN0aXZpdHlFbWl0dGVycztcbiAgICAgICAgaWYgKG1vZGUgPT09IFwiZW1pdHRlclwiKSB7XG4gICAgICAgICAgICBsZXQgZW1pdHRlck1vZGVPcHRpb25zO1xuICAgICAgICAgICAgaWYgKG1vZGVFbWl0dGVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVFbWl0dGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXJNb2RlT3B0aW9ucyA9IGl0ZW1Gcm9tQXJyYXkobW9kZUVtaXR0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyTW9kZU9wdGlvbnMgPSBtb2RlRW1pdHRlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyc09wdGlvbnMgPSBlbWl0dGVyTW9kZU9wdGlvbnMgIT09IG51bGwgJiYgZW1pdHRlck1vZGVPcHRpb25zICE9PSB2b2lkIDAgPyBlbWl0dGVyTW9kZU9wdGlvbnMgOiAoZW1pdHRlck9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW1Gcm9tQXJyYXkoZW1pdHRlck9wdGlvbnMpIDogZW1pdHRlck9wdGlvbnMpLCBlUG9zaXRpb24gPSB0aGlzLmNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrUG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLmFkZEVtaXR0ZXIoZGVlcEV4dGVuZCh7fSwgZW1pdHRlcnNPcHRpb25zKSwgZVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZW1pdHRlciBvZiB0aGlzLmFycmF5KSB7XG4gICAgICAgICAgICBlbWl0dGVyLnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEVtaXR0ZXIob3B0aW9ucywgcG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgZW1pdHRlck9wdGlvbnMgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICBlbWl0dGVyT3B0aW9ucy5sb2FkKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gbmV3IEVtaXR0ZXJJbnN0YW5jZShfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbWl0dGVyc19lbmdpbmUsIFwiZlwiKSwgdGhpcywgdGhpcy5jb250YWluZXIsIGVtaXR0ZXJPcHRpb25zLCBwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuYXJyYXkucHVzaChlbWl0dGVyKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuICAgIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXJyYXkuaW5kZXhPZihlbWl0dGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbl9FbWl0dGVyc19lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgQW5pbWF0YWJsZUNvbG9yLCBkZWVwRXh0ZW5kLCBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgRW1pdHRlckxpZmUgfSBmcm9tIFwiLi9FbWl0dGVyTGlmZVwiO1xuaW1wb3J0IHsgRW1pdHRlclJhdGUgfSBmcm9tIFwiLi9FbWl0dGVyUmF0ZVwiO1xuaW1wb3J0IHsgRW1pdHRlclNpemUgfSBmcm9tIFwiLi9FbWl0dGVyU2l6ZVwiO1xuZXhwb3J0IGNsYXNzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmF1dG9QbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWxsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5saWZlID0gbmV3IEVtaXR0ZXJMaWZlKCk7XG4gICAgICAgIHRoaXMucmF0ZSA9IG5ldyBFbWl0dGVyUmF0ZSgpO1xuICAgICAgICB0aGlzLnNoYXBlID0gXCJzcXVhcmVcIjtcbiAgICAgICAgdGhpcy5zdGFydENvdW50ID0gMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5hdXRvUGxheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9QbGF5ID0gZGF0YS5hdXRvUGxheTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IG5ldyBFbWl0dGVyU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaXplLmxvYWQoZGF0YS5zaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkYXRhLmRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbUlkID0gZGF0YS5kb21JZDtcbiAgICAgICAgaWYgKGRhdGEuZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGwgPSBkYXRhLmZpbGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saWZlLmxvYWQoZGF0YS5saWZlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICBpZiAoZGF0YS5wYXJ0aWNsZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBkZWVwRXh0ZW5kKHt9LCBkYXRhLnBhcnRpY2xlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yYXRlLmxvYWQoZGF0YS5yYXRlKTtcbiAgICAgICAgaWYgKGRhdGEuc2hhcGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IGRhdGEuc2hhcGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHt9O1xuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnBvc2l0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwYXduQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3Bhd25Db2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGF3bkNvbG9yID0gbmV3IEFuaW1hdGFibGVDb2xvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zcGF3bkNvbG9yLmxvYWQoZGF0YS5zcGF3bkNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zdGFydENvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCA9IGRhdGEuc3RhcnRDb3VudDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFbWl0dGVyTGlmZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMud2FpdCA9IGZhbHNlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSBkYXRhLmRlbGF5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLndhaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YWl0ID0gZGF0YS53YWl0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmV4cG9ydCBjbGFzcyBFbWl0dGVyUmF0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAxO1xuICAgICAgICB0aGlzLmRlbGF5ID0gMC4xO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnF1YW50aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBzZXRSYW5nZVZhbHVlKGRhdGEucXVhbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSBzZXRSYW5nZVZhbHVlKGRhdGEuZGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVtaXR0ZXJTaXplIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJwZXJjZW50XCI7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBkYXRhLm1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9TaGFwZU1hbmFnZXJfZW5naW5lO1xuY29uc3Qgc2hhcGVzID0gbmV3IE1hcCgpO1xuZXhwb3J0IGNsYXNzIFNoYXBlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoZW5naW5lKSB7XG4gICAgICAgIF9TaGFwZU1hbmFnZXJfZW5naW5lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TaGFwZU1hbmFnZXJfZW5naW5lLCBlbmdpbmUsIFwiZlwiKTtcbiAgICB9XG4gICAgYWRkU2hhcGUobmFtZSwgZHJhd2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRTaGFwZShuYW1lKSkge1xuICAgICAgICAgICAgc2hhcGVzLnNldChuYW1lLCBkcmF3ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNoYXBlKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlcy5nZXQobmFtZSk7XG4gICAgfVxuICAgIGdldFN1cHBvcnRlZFNoYXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlcy5rZXlzKCk7XG4gICAgfVxufVxuX1NoYXBlTWFuYWdlcl9lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwiZXhwb3J0IGNsYXNzIENpcmNsZVNoYXBlIHtcbiAgICByYW5kb21Qb3NpdGlvbihwb3NpdGlvbiwgc2l6ZSwgZmlsbCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVRoZXRhID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHUgPSBNYXRoLnJhbmRvbSgpIC8gNC4wLCB0aGV0YSA9IE1hdGguYXRhbigoeSAvIHgpICogTWF0aC50YW4oMiAqIE1hdGguUEkgKiB1KSksIHYgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgaWYgKHYgPCAwLjI1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodiA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLlBJIC0gdGhldGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2IDwgMC43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLlBJICsgdGhldGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLXRoZXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCByYWRpdXMgPSAoeCwgeSwgdGhldGEpID0+ICh4ICogeSkgLyBNYXRoLnNxcnQoKHkgKiBNYXRoLmNvcyh0aGV0YSkpICoqIDIgKyAoeCAqIE1hdGguc2luKHRoZXRhKSkgKiogMiksIFthLCBiXSA9IFtzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgLyAyXSwgcmFuZG9tVGhldGEgPSBnZW5lcmF0ZVRoZXRhKGEsIGIpLCBtYXhSYWRpdXMgPSByYWRpdXMoYSwgYiwgcmFuZG9tVGhldGEpLCByYW5kb21SYWRpdXMgPSBmaWxsID8gbWF4UmFkaXVzICogTWF0aC5zcXJ0KE1hdGgucmFuZG9tKCkpIDogbWF4UmFkaXVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9zaXRpb24ueCArIHJhbmRvbVJhZGl1cyAqIE1hdGguY29zKHJhbmRvbVRoZXRhKSxcbiAgICAgICAgICAgIHk6IHBvc2l0aW9uLnkgKyByYW5kb21SYWRpdXMgKiBNYXRoLnNpbihyYW5kb21UaGV0YSksXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiZnVuY3Rpb24gcmFuZG9tU3F1YXJlQ29vcmRpbmF0ZShwb3NpdGlvbiwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uICsgb2Zmc2V0ICogKE1hdGgucmFuZG9tKCkgLSAwLjUpO1xufVxuZXhwb3J0IGNsYXNzIFNxdWFyZVNoYXBlIHtcbiAgICByYW5kb21Qb3NpdGlvbihwb3NpdGlvbiwgc2l6ZSwgZmlsbCkge1xuICAgICAgICBpZiAoZmlsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiByYW5kb21TcXVhcmVDb29yZGluYXRlKHBvc2l0aW9uLngsIHNpemUud2lkdGgpLFxuICAgICAgICAgICAgICAgIHk6IHJhbmRvbVNxdWFyZUNvb3JkaW5hdGUocG9zaXRpb24ueSwgc2l6ZS5oZWlnaHQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbGZXID0gc2l6ZS53aWR0aCAvIDIsIGhhbGZIID0gc2l6ZS5oZWlnaHQgLyAyLCBzaWRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCksIHYgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyO1xuICAgICAgICAgICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9zaXRpb24ueCArIHYgKiBoYWxmVyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvc2l0aW9uLnkgLSBoYWxmSCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54IC0gaGFsZlcsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55ICsgdiAqIGhhbGZILFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvc2l0aW9uLnggKyB2ICogaGFsZlcsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55ICsgaGFsZkgsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54ICsgaGFsZlcsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55ICsgdiAqIGhhbGZILFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9FbWl0dGVyc1BsdWdpbl9lbmdpbmU7XG5pbXBvcnQgeyBDaXJjbGVTaGFwZSB9IGZyb20gXCIuL1NoYXBlcy9DaXJjbGUvQ2lyY2xlU2hhcGVcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvRW1pdHRlclwiO1xuaW1wb3J0IHsgRW1pdHRlcnMgfSBmcm9tIFwiLi9FbWl0dGVyc1wiO1xuaW1wb3J0IHsgU2hhcGVNYW5hZ2VyIH0gZnJvbSBcIi4vU2hhcGVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTcXVhcmVTaGFwZSB9IGZyb20gXCIuL1NoYXBlcy9TcXVhcmUvU3F1YXJlU2hhcGVcIjtcbmltcG9ydCB7IGlzSW5BcnJheSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmNsYXNzIEVtaXR0ZXJzUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcihlbmdpbmUpIHtcbiAgICAgICAgX0VtaXR0ZXJzUGx1Z2luX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRW1pdHRlcnNQbHVnaW5fZW5naW5lLCBlbmdpbmUsIFwiZlwiKTtcbiAgICAgICAgdGhpcy5pZCA9IFwiZW1pdHRlcnNcIjtcbiAgICB9XG4gICAgZ2V0UGx1Z2luKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gbmV3IEVtaXR0ZXJzKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VtaXR0ZXJzUGx1Z2luX2VuZ2luZSwgXCJmXCIpLCBjb250YWluZXIpO1xuICAgIH1cbiAgICBuZWVkc1BsdWdpbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW1pdHRlcnMgPSBvcHRpb25zLmVtaXR0ZXJzO1xuICAgICAgICByZXR1cm4gKChlbWl0dGVycyBpbnN0YW5jZW9mIEFycmF5ICYmICEhZW1pdHRlcnMubGVuZ3RoKSB8fFxuICAgICAgICAgICAgZW1pdHRlcnMgIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgKCEhKChfYyA9IChfYiA9IChfYSA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2ZW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9uQ2xpY2spID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5tb2RlKSAmJlxuICAgICAgICAgICAgICAgIGlzSW5BcnJheShcImVtaXR0ZXJcIiwgb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrLm1vZGUpKSk7XG4gICAgfVxuICAgIGxvYWRPcHRpb25zKG9wdGlvbnMsIHNvdXJjZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIXRoaXMubmVlZHNQbHVnaW4ob3B0aW9ucykgJiYgIXRoaXMubmVlZHNQbHVnaW4oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnNDYXN0ID0gb3B0aW9ucztcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5lbWl0dGVycykge1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2UuZW1pdHRlcnMpIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zQ2FzdC5lbWl0dGVycyA9IHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5lbWl0dGVycy5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wLmxvYWQocyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZW1pdHRlck9wdGlvbnMgPSBvcHRpb25zQ2FzdC5lbWl0dGVycztcbiAgICAgICAgICAgICAgICBpZiAoKGVtaXR0ZXJPcHRpb25zID09PSBudWxsIHx8IGVtaXR0ZXJPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlbWl0dGVyT3B0aW9ucy5sb2FkKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNDYXN0LmVtaXR0ZXJzID0gZW1pdHRlck9wdGlvbnMgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbWl0dGVyT3B0aW9ucy5sb2FkKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5lbWl0dGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW50ZXJhY3Rpdml0eUVtaXR0ZXJzID0gKF9iID0gKF9hID0gc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmludGVyYWN0aXZpdHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmVtaXR0ZXJzO1xuICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eUVtaXR0ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eUVtaXR0ZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zQ2FzdC5pbnRlcmFjdGl2aXR5Lm1vZGVzLmVtaXR0ZXJzID0gaW50ZXJhY3Rpdml0eUVtaXR0ZXJzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlbWl0dGVyT3B0aW9ucyA9IG9wdGlvbnNDYXN0LmludGVyYWN0aXZpdHkubW9kZXMuZW1pdHRlcnM7XG4gICAgICAgICAgICAgICAgaWYgKChlbWl0dGVyT3B0aW9ucyA9PT0gbnVsbCB8fCBlbWl0dGVyT3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZW1pdHRlck9wdGlvbnMubG9hZCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zQ2FzdC5pbnRlcmFjdGl2aXR5Lm1vZGVzLmVtaXR0ZXJzID0gZW1pdHRlck9wdGlvbnMgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbWl0dGVyT3B0aW9ucy5sb2FkKGludGVyYWN0aXZpdHlFbWl0dGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5fRW1pdHRlcnNQbHVnaW5fZW5naW5lID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRW1pdHRlcnNQbHVnaW4oZW5naW5lKSB7XG4gICAgaWYgKCFlbmdpbmUuZW1pdHRlclNoYXBlTWFuYWdlcikge1xuICAgICAgICBlbmdpbmUuZW1pdHRlclNoYXBlTWFuYWdlciA9IG5ldyBTaGFwZU1hbmFnZXIoZW5naW5lKTtcbiAgICB9XG4gICAgaWYgKCFlbmdpbmUuYWRkRW1pdHRlclNoYXBlKSB7XG4gICAgICAgIGVuZ2luZS5hZGRFbWl0dGVyU2hhcGUgPSAobmFtZSwgc2hhcGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IGVuZ2luZS5lbWl0dGVyU2hhcGVNYW5hZ2VyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkU2hhcGUobmFtZSwgc2hhcGUpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBwbHVnaW4gPSBuZXcgRW1pdHRlcnNQbHVnaW4oZW5naW5lKTtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGx1Z2luKHBsdWdpbik7XG4gICAgZW5naW5lLmFkZEVtaXR0ZXJTaGFwZShcImNpcmNsZVwiLCBuZXcgQ2lyY2xlU2hhcGUoKSk7XG4gICAgZW5naW5lLmFkZEVtaXR0ZXJTaGFwZShcInNxdWFyZVwiLCBuZXcgU3F1YXJlU2hhcGUoKSk7XG59XG5leHBvcnQgKiBmcm9tIFwiLi9FbWl0dGVyQ29udGFpbmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbWl0dGVyc0VuZ2luZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvRW1pdHRlckNsaWNrTW9kZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvRW1pdHRlclNoYXBlVHlwZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0lFbWl0dGVyT3B0aW9uc1wiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9