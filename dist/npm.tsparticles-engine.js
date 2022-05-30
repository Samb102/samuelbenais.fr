"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-engine"],{

/***/ "./node_modules/tsparticles-engine/esm/Core/Canvas.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Canvas.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Canvas": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");




class Canvas {
    constructor(container) {
        this.container = container;
        this.size = {
            height: 0,
            width: 0,
        };
        this.context = null;
        this.generatedCanvas = false;
    }
    init() {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
        this.paint();
    }
    loadCanvas(canvas) {
        var _a;
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.generatedCanvas =
            canvas.dataset && _Utils_Constants__WEBPACK_IMPORTED_MODULE_3__.generatedAttribute in canvas.dataset
                ? canvas.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_3__.generatedAttribute] === "true"
                : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.deepExtend)({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }
    destroy() {
        var _a;
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.draw((ctx) => {
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.clear)(ctx, this.size);
        });
    }
    paint() {
        const options = this.container.actualOptions;
        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.clear)(ctx, this.size);
                this.paintBase(this.coverColorStyle);
            }
            else {
                this.paintBase();
            }
        });
    }
    clear() {
        const options = this.container.actualOptions, trail = options.particles.move.trail;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase((0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getStyleFromRgb)(this.trailFillColor, 1 / trail.length));
        }
        else {
            this.draw((ctx) => {
                (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.clear)(ctx, this.size);
            });
        }
    }
    async windowResize() {
        if (!this.element) {
            return;
        }
        this.resize();
        const container = this.container, needsRefresh = container.updateActualOptions();
        container.particles.setDensity();
        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
        if (needsRefresh) {
            await container.refresh();
        }
    }
    resize() {
        if (!this.element) {
            return;
        }
        const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
            width: this.element.offsetWidth * pxRatio,
            height: this.element.offsetHeight * pxRatio,
        };
        if (newSize.height === size.height &&
            newSize.width === size.width &&
            newSize.height === this.element.height &&
            newSize.width === this.element.width) {
            return;
        }
        const oldSize = Object.assign({}, size);
        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;
        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }
    drawConnectLine(p1, p2) {
        this.draw((ctx) => {
            var _a;
            const lineStyle = this.lineStyle(p1, p2);
            if (!lineStyle) {
                return;
            }
            const pos1 = p1.getPosition(), pos2 = p2.getPosition();
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.drawConnectLine)(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
        });
    }
    drawGrabLine(particle, lineColor, opacity, mousePos) {
        const container = this.container;
        this.draw((ctx) => {
            var _a;
            const beginPos = particle.getPosition();
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.drawGrabLine)(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
        });
    }
    drawParticle(particle, delta) {
        var _a, _b, _c, _d, _e, _f;
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius();
        if (radius <= 0) {
            return;
        }
        const pfColor = particle.getFillColor(), psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
        if (!pfColor && !psColor) {
            return;
        }
        let [fColor, sColor] = this.getPluginParticleColors(particle);
        if (!fColor || !sColor) {
            if (!fColor) {
                fColor = pfColor ? pfColor : undefined;
            }
            if (!sColor) {
                sColor = psColor ? psColor : undefined;
            }
        }
        const options = this.container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1, strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor;
        const colorStyles = {
            fill: fColor ? (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getStyleFromHsl)(fColor, zOpacity) : undefined,
        };
        colorStyles.stroke = sColor ? (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getStyleFromHsl)(sColor, zStrokeOpacity) : colorStyles.fill;
        this.draw((ctx) => {
            const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate, container = this.container;
            for (const updater of container.particles.updaters) {
                if (updater.beforeDraw) {
                    updater.beforeDraw(particle);
                }
                if (updater.getColorStyles) {
                    const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
                    if (fill) {
                        colorStyles.fill = fill;
                    }
                    if (stroke) {
                        colorStyles.stroke = stroke;
                    }
                }
            }
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.drawParticle)(container, ctx, particle, delta, colorStyles, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow);
            for (const updater of container.particles.updaters) {
                if (updater.afterDraw) {
                    updater.afterDraw(particle);
                }
            }
        });
    }
    drawPlugin(plugin, delta) {
        this.draw((ctx) => {
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.drawPlugin)(ctx, plugin, delta);
        });
    }
    drawParticlePlugin(plugin, particle, delta) {
        this.draw((ctx) => {
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.drawParticlePlugin)(ctx, plugin, particle, delta);
        });
    }
    initBackground() {
        const options = this.container.actualOptions, background = options.background, element = this.element, elementStyle = element === null || element === void 0 ? void 0 : element.style;
        if (!elementStyle) {
            return;
        }
        if (background.color) {
            const color = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToRgb)(background.color);
            elementStyle.backgroundColor = color ? (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getStyleFromRgb)(color, background.opacity) : "";
        }
        else {
            elementStyle.backgroundColor = "";
        }
        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }
    draw(cb) {
        if (!this.context) {
            return;
        }
        return cb(this.context);
    }
    initCover() {
        const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToRgb)(color);
        if (coverRgb) {
            const coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };
            this.coverColorStyle = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getStyleFromRgb)(coverColor, coverColor.a);
        }
    }
    initTrail() {
        const options = this.container.actualOptions, trail = options.particles.move.trail, fillColor = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToRgb)(trail.fillColor);
        if (fillColor) {
            const trail = options.particles.move.trail;
            this.trailFillColor = {
                r: fillColor.r,
                g: fillColor.g,
                b: fillColor.b,
                a: 1 / trail.length,
            };
        }
    }
    getPluginParticleColors(particle) {
        let fColor, sColor;
        for (const [, plugin] of this.container.plugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToHsl)(plugin.particleFillColor(particle));
            }
            if (!sColor && plugin.particleStrokeColor) {
                sColor = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToHsl)(plugin.particleStrokeColor(particle));
            }
            if (fColor && sColor) {
                break;
            }
        }
        return [fColor, sColor];
    }
    initStyle() {
        const element = this.element, options = this.container.actualOptions;
        if (!element) {
            return;
        }
        const originalStyle = this.originalStyle;
        if (options.fullScreen.enable) {
            this.originalStyle = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.deepExtend)({}, element.style);
            element.style.setProperty("position", "fixed", "important");
            element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
            element.style.setProperty("top", "0", "important");
            element.style.setProperty("left", "0", "important");
            element.style.setProperty("width", "100%", "important");
            element.style.setProperty("height", "100%", "important");
        }
        else if (originalStyle) {
            element.style.position = originalStyle.position;
            element.style.zIndex = originalStyle.zIndex;
            element.style.top = originalStyle.top;
            element.style.left = originalStyle.left;
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;
        }
        for (const key in options.style) {
            if (!key || !options.style) {
                continue;
            }
            const value = options.style[key];
            if (!value) {
                continue;
            }
            element.style.setProperty(key, value, "important");
        }
    }
    paintBase(baseColor) {
        this.draw((ctx) => {
            (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.paintBase)(ctx, this.size, baseColor);
        });
    }
    lineStyle(p1, p2) {
        return this.draw((ctx) => {
            const options = this.container.actualOptions, connectOptions = options.interactivity.modes.connect;
            return (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__.gradient)(ctx, p1, p2, connectOptions.links.opacity);
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Container.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Container.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas */ "./node_modules/tsparticles-engine/esm/Core/Canvas.js");
/* harmony import */ var _Utils_EventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/EventListeners */ "./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js");
/* harmony import */ var _Utils_FrameManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/FrameManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js");
/* harmony import */ var _Particles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Particles */ "./node_modules/tsparticles-engine/esm/Core/Particles.js");
/* harmony import */ var _Retina__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Retina */ "./node_modules/tsparticles-engine/esm/Core/Retina.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
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
var _Container_engine;







class Container {
    constructor(engine, id, sourceOptions) {
        this.id = id;
        _Container_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Container_engine, engine, "f");
        this.fpsLimit = 120;
        this.duration = 0;
        this.lifeTime = 0;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new _Retina__WEBPACK_IMPORTED_MODULE_5__.Retina(this);
        this.canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_1__.Canvas(this);
        this.particles = new _Particles__WEBPACK_IMPORTED_MODULE_4__.Particles(__classPrivateFieldGet(this, _Container_engine, "f"), this);
        this.drawer = new _Utils_FrameManager__WEBPACK_IMPORTED_MODULE_3__.FrameManager(this);
        this.pathGenerator = {
            generate: (p) => {
                const v = p.velocity.copy();
                v.angle += (v.length * Math.PI) / 180;
                return v;
            },
            init: () => {
            },
            update: () => {
            },
        };
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.plugins = new Map();
        this.drawers = new Map();
        this.density = 1;
        this._options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadContainerOptions)(__classPrivateFieldGet(this, _Container_engine, "f"));
        this.actualOptions = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadContainerOptions)(__classPrivateFieldGet(this, _Container_engine, "f"));
        this.eventListeners = new _Utils_EventListeners__WEBPACK_IMPORTED_MODULE_2__.EventListeners(this);
        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerBuilt", { container: this });
    }
    get options() {
        return this._options;
    }
    get sourceOptions() {
        return this._sourceOptions;
    }
    play(force) {
        const needsUpdate = this.paused || force;
        if (this.firstStart && !this.actualOptions.autoPlay) {
            this.firstStart = false;
            return;
        }
        if (this.paused) {
            this.paused = false;
        }
        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPlay", { container: this });
        this.draw(needsUpdate || false);
    }
    pause() {
        if (this.drawAnimationFrame !== undefined) {
            (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.cancelAnimation)()(this.drawAnimationFrame);
            delete this.drawAnimationFrame;
        }
        if (this.paused) {
            return;
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.pause) {
                plugin.pause();
            }
        }
        if (!this.pageHidden) {
            this.paused = true;
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPaused", { container: this });
    }
    draw(force) {
        let refreshTime = force;
        this.drawAnimationFrame = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.animate)()(async (timestamp) => {
            if (refreshTime) {
                this.lastFrameTime = undefined;
                refreshTime = false;
            }
            await this.drawer.nextFrame(timestamp);
        });
    }
    getAnimationStatus() {
        return !this.paused && !this.pageHidden;
    }
    setNoise(noiseOrGenerator, init, update) {
        this.setPath(noiseOrGenerator, init, update);
    }
    setPath(pathOrGenerator, init, update) {
        var _a, _b, _c;
        if (!pathOrGenerator) {
            return;
        }
        if (typeof pathOrGenerator === "function") {
            this.pathGenerator.generate = pathOrGenerator;
            if (init) {
                this.pathGenerator.init = init;
            }
            if (update) {
                this.pathGenerator.update = update;
            }
        }
        else {
            const oldGenerator = this.pathGenerator;
            this.pathGenerator = pathOrGenerator;
            (_a = this.pathGenerator).generate || (_a.generate = oldGenerator.generate);
            (_b = this.pathGenerator).init || (_b.init = oldGenerator.init);
            (_c = this.pathGenerator).update || (_c.update = oldGenerator.update);
        }
    }
    destroy() {
        this.stop();
        this.canvas.destroy();
        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }
        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }
        this.destroyed = true;
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerDestroyed", { container: this });
    }
    exportImg(callback) {
        this.exportImage(callback);
    }
    exportImage(callback, type, quality) {
        var _a;
        return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
    }
    exportConfiguration() {
        return JSON.stringify(this.actualOptions, undefined, 2);
    }
    refresh() {
        this.stop();
        return this.start();
    }
    reset() {
        this._options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadContainerOptions)(__classPrivateFieldGet(this, _Container_engine, "f"));
        return this.refresh();
    }
    stop() {
        if (!this.started) {
            return;
        }
        this.firstStart = true;
        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.unobserve(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }
        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }
        this.particles.linksColors = new Map();
        delete this.particles.grabLineColor;
        delete this.particles.linksColor;
        this._sourceOptions = this._options;
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStopped", { container: this });
    }
    async loadTheme(name) {
        this.currentTheme = name;
        await this.refresh();
    }
    async start() {
        if (this.started) {
            return;
        }
        await this.init();
        this.started = true;
        this.eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.startAsync !== undefined) {
                await plugin.startAsync();
            }
            else if (plugin.start !== undefined) {
                plugin.start();
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStarted", { container: this });
        this.play();
    }
    addClickHandler(callback) {
        const el = this.interactivity.element;
        if (!el) {
            return;
        }
        const clickOrTouchHandler = (e, pos, radius) => {
            if (this.destroyed) {
                return;
            }
            const pxRatio = this.retina.pixelRatio, posRetina = {
                x: pos.x * pxRatio,
                y: pos.y * pxRatio,
            }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
            callback(e, particles);
        };
        const clickHandler = (e) => {
            if (this.destroyed) {
                return;
            }
            const mouseEvent = e, pos = {
                x: mouseEvent.offsetX || mouseEvent.clientX,
                y: mouseEvent.offsetY || mouseEvent.clientY,
            };
            clickOrTouchHandler(e, pos, 1);
        };
        const touchStartHandler = () => {
            if (this.destroyed) {
                return;
            }
            touched = true;
            touchMoved = false;
        };
        const touchMoveHandler = () => {
            if (this.destroyed) {
                return;
            }
            touchMoved = true;
        };
        const touchEndHandler = (e) => {
            var _a, _b, _c;
            if (this.destroyed) {
                return;
            }
            if (touched && !touchMoved) {
                const touchEvent = e;
                let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                if (!lastTouch) {
                    lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
                    if (!lastTouch) {
                        return;
                    }
                }
                const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect(), pos = {
                    x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
                    y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0),
                };
                clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
            }
            touched = false;
            touchMoved = false;
        };
        const touchCancelHandler = () => {
            if (this.destroyed) {
                return;
            }
            touched = false;
            touchMoved = false;
        };
        let touched = false;
        let touchMoved = false;
        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
    }
    handleClickMode(mode) {
        this.particles.handleClickMode(mode);
        for (const [, plugin] of this.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }
    updateActualOptions() {
        this.actualOptions.responsive = [];
        const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
        this.actualOptions.setTheme(this.currentTheme);
        if (this.responsiveMaxWidth != newMaxWidth) {
            this.responsiveMaxWidth = newMaxWidth;
            return true;
        }
        return false;
    }
    async init() {
        const shapes = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getSupportedShapes();
        for (const type of shapes) {
            const drawer = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getShapeDrawer(type);
            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }
        this._options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadContainerOptions)(__classPrivateFieldGet(this, _Container_engine, "f"), this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadContainerOptions)(__classPrivateFieldGet(this, _Container_engine, "f"), this._options);
        this.retina.init();
        this.canvas.init();
        this.updateActualOptions();
        this.canvas.initBackground();
        this.canvas.resize();
        this.zLayers = this.actualOptions.zLayers;
        this.duration = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_6__.getRangeValue)(this.actualOptions.duration);
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        const availablePlugins = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getAvailablePlugins(this);
        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }
        for (const [, drawer] of this.drawers) {
            if (drawer.init) {
                await drawer.init(this);
            }
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.init) {
                plugin.init(this.actualOptions);
            }
            else if (plugin.initAsync !== undefined) {
                await plugin.initAsync(this.actualOptions);
            }
        }
        const pathOptions = this.actualOptions.particles.move.path;
        if (pathOptions.generator) {
            this.setPath(__classPrivateFieldGet(this, _Container_engine, "f").plugins.getPathGenerator(pathOptions.generator));
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerInit", { container: this });
        this.particles.init();
        this.particles.setDensity();
        for (const [, plugin] of this.plugins) {
            if (plugin.particlesSetup !== undefined) {
                plugin.particlesSetup();
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("particlesSetup", { container: this });
    }
    intersectionManager(entries) {
        if (!this.actualOptions.pauseOnOutsideViewport) {
            return;
        }
        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }
            if (entry.isIntersecting) {
                this.play();
            }
            else {
                this.pause();
            }
        }
    }
}
_Container_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Gradients.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/Gradients.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleGravity.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleGravity.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLoops.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLoops.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Loader.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Loader.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "./node_modules/tsparticles-engine/esm/Core/Container.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
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
var _Loader_engine;



function fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}
class Loader {
    constructor(engine) {
        _Loader_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Loader_engine, engine, "f");
    }
    dom() {
        return __classPrivateFieldGet(this, _Loader_engine, "f").domArray;
    }
    domItem(index) {
        const dom = this.dom();
        const item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`, { options, index } = params;
        let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
        if (!domContainer) {
            domContainer = document.createElement("div");
            domContainer.id = tagId;
            (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
        }
        const currentOptions = options instanceof Array ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(options, index) : options, dom = this.dom(), oldIndex = dom.findIndex((v) => v.id === tagId);
        if (oldIndex >= 0) {
            const old = this.domItem(oldIndex);
            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }
        let canvasEl;
        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer;
            canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.generatedAttribute] = "false";
        }
        else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];
                canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.generatedAttribute] = "false";
            }
            else {
                canvasEl = document.createElement("canvas");
                canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.generatedAttribute] = "true";
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";
                domContainer.appendChild(canvasEl);
            }
        }
        const newItem = new _Container__WEBPACK_IMPORTED_MODULE_0__.Container(__classPrivateFieldGet(this, _Loader_engine, "f"), tagId, currentOptions);
        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        }
        else {
            dom.push(newItem);
        }
        newItem.canvas.loadCanvas(canvasEl);
        await newItem.start();
        return newItem;
    }
    async loadRemoteOptions(params) {
        const { url: jsonUrl, index } = params, url = jsonUrl instanceof Array ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(jsonUrl, index) : jsonUrl;
        if (!url) {
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            fetchError(response.status);
            return;
        }
        const data = await response.json();
        return this.loadOptions({
            tagId: params.tagId,
            element: params.element,
            index,
            options: data,
        });
    }
    load(tagId, options, index) {
        const params = { index };
        if (typeof tagId === "string") {
            params.tagId = tagId;
        }
        else {
            params.options = tagId;
        }
        if (typeof options === "number") {
            params.index = options !== null && options !== void 0 ? options : params.index;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async set(id, domContainer, options, index) {
        const params = { index };
        if (typeof id === "string") {
            params.tagId = id;
        }
        else {
            params.element = id;
        }
        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        }
        else {
            params.options = domContainer;
        }
        if (typeof options === "number") {
            params.index = options;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async loadJSON(tagId, jsonUrl, index) {
        let url, id;
        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        }
        else {
            id = tagId;
            url = jsonUrl;
        }
        return this.loadRemoteOptions({ tagId: id, url, index });
    }
    async setJSON(id, domContainer, jsonUrl, index) {
        let url, newId, newIndex, element;
        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer;
            newIndex = jsonUrl;
        }
        else {
            newId = id;
            element = domContainer;
            url = jsonUrl;
            newIndex = index;
        }
        return this.loadRemoteOptions({ tagId: newId, url, index: newIndex, element });
    }
    setOnClickHandler(callback) {
        const dom = this.dom();
        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.addEventListener(type, listener);
    }
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.removeEventListener(type, listener);
    }
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.dispatchEvent(type, args);
    }
}
_Loader_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Particle.js":
/*!**************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Particle.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Particle": () => (/* binding */ Particle)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Options/Classes/Particles/Shape/Shape */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js");
/* harmony import */ var _Utils_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");
/* harmony import */ var _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils/Vector3d */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js");
/* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
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
var _Particle_engine;







const fixOutMode = (data) => {
    if (!((0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.isInArray)(data.outMode, data.checkModes) || (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.isInArray)(data.outMode, data.checkModes))) {
        return;
    }
    if (data.coord > data.maxCoord - data.radius * 2) {
        data.setCb(-data.radius);
    }
    else if (data.coord < data.radius * 2) {
        data.setCb(data.radius);
    }
};
class Particle {
    constructor(engine, id, container, position, overrideOptions, group) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.id = id;
        this.container = container;
        this.group = group;
        _Particle_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Particle_engine, engine, "f");
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.splitCount = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = "normal";
        this.ignoresResizeRatio = true;
        const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.loadParticlesOptions)(mainOptions.particles);
        const shapeType = particlesOptions.shape.type, reduceDuplicates = particlesOptions.reduceDuplicates;
        this.shape = shapeType instanceof Array ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(shapeType, this.id, reduceDuplicates) : shapeType;
        if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
            if (overrideOptions.shape.type) {
                const overrideShapeType = overrideOptions.shape.type;
                this.shape =
                    overrideShapeType instanceof Array
                        ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(overrideShapeType, this.id, reduceDuplicates)
                        : overrideShapeType;
            }
            const shapeOptions = new _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_3__.Shape();
            shapeOptions.load(overrideOptions.shape);
            if (this.shape) {
                this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
            }
        }
        else {
            this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
        }
        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }
        if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
            particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
        }
        this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
        this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
        this.options = particlesOptions;
        this.pathDelay = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(this.options.move.path.delay) * 1000;
        const zIndexValue = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.zIndex.value);
        container.retina.initParticle(this);
        const sizeOptions = this.options.size, sizeRange = sizeOptions.value;
        this.size = {
            enable: sizeOptions.animation.enable,
            value: (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(sizeOptions.value) * container.retina.pixelRatio,
            max: (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(sizeRange) * pxRatio,
            min: (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(sizeRange) * pxRatio,
            loops: 0,
            maxLoops: (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(sizeOptions.animation.count),
        };
        const sizeAnimation = sizeOptions.animation;
        if (sizeAnimation.enable) {
            this.size.status = 0;
            switch (sizeAnimation.startValue) {
                case "min":
                    this.size.value = this.size.min;
                    this.size.status = 0;
                    break;
                case "random":
                    this.size.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(this.size) * pxRatio;
                    this.size.status = Math.random() >= 0.5 ? 0 : 1;
                    break;
                case "max":
                default:
                    this.size.value = this.size.max;
                    this.size.status = 1;
                    break;
            }
            this.size.velocity =
                (((_g = this.retina.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100) *
                    container.retina.reduceFactor;
            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }
        this.bubble = {
            inRange: false,
        };
        this.position = this.calcPosition(container, position, (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.clamp)(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();
        const canvasSize = container.canvas.size, moveCenterPerc = this.options.move.center;
        this.moveCenter = {
            x: (canvasSize.width * moveCenterPerc.x) / 100,
            y: (canvasSize.height * moveCenterPerc.y) / 100,
            radius: this.options.move.center.radius,
        };
        this.direction = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getParticleDirectionAngle)(this.options.move.direction, this.position, this.moveCenter);
        switch (this.options.move.direction) {
            case "inside":
                this.outType = "inside";
                break;
            case "outside":
                this.outType = "outside";
                break;
        }
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(this.options.move.decay);
        const gravityOptions = this.options.move.gravity;
        this.gravity = {
            enable: gravityOptions.enable,
            acceleration: (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };
        this.offset = _Utils_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector.origin;
        const particles = container.particles;
        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = __classPrivateFieldGet(this, _Particle_engine, "f").plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
            drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
        }
        const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        this.life = this.loadLife();
        this.spawning = this.life.delay > 0;
        this.shadowColor = (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.colorToRgb)(this.options.shadow.color);
        for (const updater of container.particles.updaters) {
            if (updater.init) {
                updater.init(this);
            }
        }
        for (const mover of container.particles.movers) {
            if (mover.init) {
                mover.init(this);
            }
        }
        if (drawer && drawer.particleInit) {
            drawer.particleInit(container, this);
        }
        for (const [, plugin] of container.plugins) {
            if (plugin.particleCreated) {
                plugin.particleCreated(this);
            }
        }
    }
    isVisible() {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
    }
    isInsideCanvas() {
        const radius = this.getRadius(), canvasSize = this.container.canvas.size;
        return (this.position.x >= -radius &&
            this.position.y >= -radius &&
            this.position.y <= canvasSize.height + radius &&
            this.position.x <= canvasSize.width + radius);
    }
    draw(delta) {
        const container = this.container;
        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }
        container.canvas.drawParticle(this, delta);
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }
    getRadius() {
        var _a;
        return (_a = this.bubble.radius) !== null && _a !== void 0 ? _a : this.size.value;
    }
    getMass() {
        return (this.getRadius() ** 2 * Math.PI) / 2;
    }
    getFillColor() {
        var _a, _b;
        const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getHslFromAnimation)(this.color);
        if (color && this.roll && (this.backColor || this.roll.alter)) {
            const backFactor = this.options.roll.mode === "both" ? 2 : 1, backSum = this.options.roll.mode === "horizontal" ? Math.PI / 2 : 0, rolled = Math.floor((((_b = this.roll.angle) !== null && _b !== void 0 ? _b : 0) + backSum) / (Math.PI / backFactor)) % 2;
            if (rolled) {
                if (this.backColor) {
                    return this.backColor;
                }
                if (this.roll.alter) {
                    return (0,_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_6__.alterHsl)(color, this.roll.alter.type, this.roll.alter.value);
                }
            }
        }
        return color;
    }
    getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : (0,_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_1__.getHslFromAnimation)(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
    }
    destroy(override) {
        this.destroyed = true;
        this.bubble.inRange = false;
        if (this.unbreakable) {
            return;
        }
        this.destroyed = true;
        this.bubble.inRange = false;
        for (const [, plugin] of this.container.plugins) {
            if (plugin.particleDestroyed) {
                plugin.particleDestroyed(this, override);
            }
        }
        if (override) {
            return;
        }
        const destroyOptions = this.options.destroy;
        if (destroyOptions.mode === "split") {
            this.split();
        }
    }
    reset() {
        if (this.opacity) {
            this.opacity.loops = 0;
        }
        this.size.loops = 0;
    }
    split() {
        const splitOptions = this.options.destroy.split;
        if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
            return;
        }
        const rate = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(splitOptions.rate);
        for (let i = 0; i < rate; i++) {
            this.container.particles.addSplitParticle(this);
        }
    }
    calcPosition(container, position, zIndex, tryCount = 0) {
        var _a, _b, _c, _d;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__.Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
            }
        }
        const canvasSize = container.canvas.size, exactPosition = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.calcExactPositionOrRandomFromSize)({
            size: canvasSize,
            position: position,
        }), pos = _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__.Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
            fixOutMode({
                outMode,
                checkModes: ["bounce", "bounce-horizontal"],
                coord: pos.x,
                maxCoord: container.canvas.size.width,
                setCb: (value) => (pos.x += value),
                radius,
            });
        }, fixVertical = (outMode) => {
            fixOutMode({
                outMode,
                checkModes: ["bounce", "bounce-vertical"],
                coord: pos.y,
                maxCoord: container.canvas.size.height,
                setCb: (value) => (pos.y += value),
                radius,
            });
        };
        fixHorizontal((_a = outModes.left) !== null && _a !== void 0 ? _a : outModes.default);
        fixHorizontal((_b = outModes.right) !== null && _b !== void 0 ? _b : outModes.default);
        fixVertical((_c = outModes.top) !== null && _c !== void 0 ? _c : outModes.default);
        fixVertical((_d = outModes.bottom) !== null && _d !== void 0 ? _d : outModes.default);
        if (this.checkOverlap(pos, tryCount)) {
            return this.calcPosition(container, undefined, zIndex, tryCount + 1);
        }
        return pos;
    }
    checkOverlap(pos, tryCount = 0) {
        const collisionsOptions = this.options.collisions, radius = this.getRadius();
        if (!collisionsOptions.enable) {
            return false;
        }
        const overlapOptions = collisionsOptions.overlap;
        if (overlapOptions.enable) {
            return false;
        }
        const retries = overlapOptions.retries;
        if (retries >= 0 && tryCount > retries) {
            throw new Error("Particle is overlapping and can't be placed");
        }
        let overlaps = false;
        for (const particle of this.container.particles.array) {
            if ((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos, particle.position) < radius + particle.getRadius()) {
                overlaps = true;
                break;
            }
        }
        return overlaps;
    }
    calculateVelocity() {
        const baseVelocity = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getParticleBaseVelocity)(this.direction);
        const res = baseVelocity.copy();
        const moveOptions = this.options.move;
        if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
            return res;
        }
        const rad = (Math.PI / 180) * (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(moveOptions.angle.value);
        const radOffset = (Math.PI / 180) * (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(moveOptions.angle.offset);
        const range = {
            left: radOffset - rad / 2,
            right: radOffset + rad / 2,
        };
        if (!moveOptions.straight) {
            res.angle += (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(range.left, range.right));
        }
        if (moveOptions.random && typeof moveOptions.speed === "number") {
            res.length *= Math.random();
        }
        return res;
    }
    loadShapeData(shapeOptions, reduceDuplicates) {
        const shapeData = shapeOptions.options[this.shape];
        if (shapeData) {
            return (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.deepExtend)({}, shapeData instanceof Array ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(shapeData, this.id, reduceDuplicates) : shapeData);
        }
    }
    loadLife() {
        const container = this.container, particlesOptions = this.options, lifeOptions = particlesOptions.life, life = {
            delay: container.retina.reduceFactor
                ? (((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random())) /
                    container.retina.reduceFactor) *
                    1000
                : 0,
            delayTime: 0,
            duration: container.retina.reduceFactor
                ? (((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random())) /
                    container.retina.reduceFactor) *
                    1000
                : 0,
            time: 0,
            count: particlesOptions.life.count,
        };
        if (life.duration <= 0) {
            life.duration = -1;
        }
        if (life.count <= 0) {
            life.count = -1;
        }
        return life;
    }
}
_Particle_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Particles.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Particles.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Particles": () => (/* binding */ Particles)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/InteractionManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js");
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Particle */ "./node_modules/tsparticles-engine/esm/Core/Particle.js");
/* harmony import */ var _Utils_Point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/Point */ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js");
/* harmony import */ var _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils/QuadTree */ "./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js");
/* harmony import */ var _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils/Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
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
var _Particles_engine;







class Particles {
    constructor(engine, container) {
        this.container = container;
        _Particles_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Particles_engine, engine, "f");
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.freqs = {
            links: new Map(),
            triangles: new Map(),
        };
        this.interactionManager = new _Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_1__.InteractionManager(__classPrivateFieldGet(this, _Particles_engine, "f"), container);
        const canvasSize = this.container.canvas.size;
        this.linksColors = new Map();
        this.quadTree = new _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_4__.QuadTree(new _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_5__.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
        this.movers = __classPrivateFieldGet(this, _Particles_engine, "f").plugins.getMovers(container, true);
        this.updaters = __classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
    }
    get count() {
        return this.array.length;
    }
    init() {
        var _a;
        const container = this.container, options = container.actualOptions;
        this.lastZIndex = 0;
        this.needsSort = false;
        this.freqs.links = new Map();
        this.freqs.triangles = new Map();
        let handled = false;
        this.updaters = __classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
        this.interactionManager.init();
        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }
            if (handled) {
                break;
            }
        }
        this.addManualParticles();
        if (!handled) {
            for (const group in options.particles.groups) {
                const groupOptions = options.particles.groups[group];
                for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, j++) {
                    this.addParticle(undefined, groupOptions, group);
                }
            }
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }
        container.pathGenerator.init(container);
    }
    async redraw() {
        this.clear();
        this.init();
        await this.draw({ value: 0, factor: 0 });
    }
    removeAt(index, quantity = 1, group, override) {
        if (!(index >= 0 && index <= this.count)) {
            return;
        }
        let deleted = 0;
        for (let i = index; deleted < quantity && i < this.count; i++) {
            const particle = this.array[i];
            if (!particle || particle.group !== group) {
                continue;
            }
            particle.destroy(override);
            this.array.splice(i--, 1);
            const zIdx = this.zArray.indexOf(particle);
            this.zArray.splice(zIdx, 1);
            deleted++;
            __classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleRemoved", {
                container: this.container,
                data: {
                    particle,
                },
            });
        }
    }
    remove(particle, group, override) {
        this.removeAt(this.array.indexOf(particle), undefined, group, override);
    }
    async update(delta) {
        const container = this.container, particlesToDelete = [];
        container.pathGenerator.update();
        for (const [, plugin] of container.plugins) {
            if (plugin.update !== undefined) {
                plugin.update(delta);
            }
        }
        for (const particle of this.array) {
            const resizeFactor = container.canvas.resizeFactor;
            if (resizeFactor && !particle.ignoresResizeRatio) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
            }
            particle.ignoresResizeRatio = false;
            particle.bubble.inRange = false;
            for (const [, plugin] of this.container.plugins) {
                if (particle.destroyed) {
                    break;
                }
                if (plugin.particleUpdate) {
                    plugin.particleUpdate(particle, delta);
                }
            }
            for (const mover of this.movers) {
                if (mover.isEnabled(particle)) {
                    mover.move(particle, delta);
                }
            }
            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }
            this.quadTree.insert(new _Utils_Point__WEBPACK_IMPORTED_MODULE_3__.Point(particle.getPosition(), particle));
        }
        for (const particle of particlesToDelete) {
            this.remove(particle);
        }
        await this.interactionManager.externalInteract(delta);
        for (const particle of container.particles.array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }
            if (!particle.destroyed && !particle.spawning) {
                await this.interactionManager.particlesInteract(particle, delta);
            }
        }
        delete container.canvas.resizeFactor;
    }
    async draw(delta) {
        const container = this.container, canvasSize = this.container.canvas.size;
        this.quadTree = new _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_4__.QuadTree(new _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_5__.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
        container.canvas.clear();
        await this.update(delta);
        if (this.needsSort) {
            this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
            this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
            this.needsSort = false;
        }
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }
        for (const p of this.zArray) {
            p.draw(delta);
        }
    }
    clear() {
        this.array = [];
        this.zArray = [];
    }
    push(nb, mouse, overrideOptions, group) {
        this.pushing = true;
        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
        }
        this.pushing = false;
    }
    addParticle(position, overrideOptions, group) {
        const container = this.container, options = container.actualOptions, limit = options.particles.number.limit * container.density;
        if (limit > 0) {
            const countToRemove = this.count + 1 - limit;
            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }
        return this.pushParticle(position, overrideOptions, group);
    }
    addSplitParticle(parent) {
        const splitOptions = parent.options.destroy.split;
        const options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_6__.loadParticlesOptions)(parent.options);
        const factor = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(splitOptions.factor);
        options.color.load({
            value: {
                hsl: parent.getFillColor(),
            },
        });
        if (typeof options.size.value === "number") {
            options.size.value /= factor;
        }
        else {
            options.size.value.min /= factor;
            options.size.value.max /= factor;
        }
        options.load(splitOptions.particles);
        const offset = splitOptions.sizeOffset ? (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(-parent.size.value, parent.size.value) : 0, position = {
            x: parent.position.x + (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(offset),
            y: parent.position.y + (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(offset),
        };
        return this.pushParticle(position, options, parent.group, (particle) => {
            if (particle.size.value < 0.5) {
                return false;
            }
            particle.velocity.length = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(parent.velocity.length, particle.velocity.length));
            particle.splitCount = parent.splitCount + 1;
            particle.unbreakable = true;
            setTimeout(() => {
                particle.unbreakable = false;
            }, 500);
            return true;
        });
    }
    removeQuantity(quantity, group) {
        this.removeAt(0, quantity, group);
    }
    getLinkFrequency(p1, p2) {
        const range = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(p1.id, p2.id), key = `${(0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(range)}_${(0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(range)}`;
        let res = this.freqs.links.get(key);
        if (res === undefined) {
            res = Math.random();
            this.freqs.links.set(key, res);
        }
        return res;
    }
    getTriangleFrequency(p1, p2, p3) {
        let [id1, id2, id3] = [p1.id, p2.id, p3.id];
        if (id1 > id2) {
            [id2, id1] = [id1, id2];
        }
        if (id2 > id3) {
            [id3, id2] = [id2, id3];
        }
        if (id1 > id3) {
            [id3, id1] = [id1, id3];
        }
        const key = `${id1}_${id2}_${id3}`;
        let res = this.freqs.triangles.get(key);
        if (res === undefined) {
            res = Math.random();
            this.freqs.triangles.set(key, res);
        }
        return res;
    }
    addManualParticles() {
        const container = this.container, options = container.actualOptions;
        for (const particle of options.manualParticles) {
            this.addParticle((0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.calcPositionFromSize)({
                size: container.canvas.size,
                position: particle.position,
            }), particle.options);
        }
    }
    setDensity() {
        const options = this.container.actualOptions;
        for (const group in options.particles.groups) {
            this.applyDensity(options.particles.groups[group], 0, group);
        }
        this.applyDensity(options.particles, options.manualParticles.length);
    }
    handleClickMode(mode) {
        this.interactionManager.handleClickMode(mode);
    }
    applyDensity(options, manualCount, group) {
        var _a;
        if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
            return;
        }
        const numberOptions = options.number, densityFactor = this.initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.array.filter((t) => t.group === group).length);
        this.limit = numberOptions.limit * densityFactor;
        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        }
        else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber, group);
        }
    }
    initDensityFactor(densityOptions) {
        const container = this.container;
        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }
        const canvas = container.canvas.element, pxRatio = container.retina.pixelRatio;
        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    }
    pushParticle(position, overrideOptions, group, initializer) {
        try {
            const particle = new _Particle__WEBPACK_IMPORTED_MODULE_2__.Particle(__classPrivateFieldGet(this, _Particles_engine, "f"), this.nextId, this.container, position, overrideOptions, group);
            let canAdd = true;
            if (initializer) {
                canAdd = initializer(particle);
            }
            if (!canAdd) {
                return;
            }
            this.array.push(particle);
            this.zArray.push(particle);
            this.nextId++;
            __classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleAdded", {
                container: this.container,
                data: {
                    particle,
                },
            });
            return particle;
        }
        catch (e) {
            console.warn(`error adding particle: ${e}`);
            return;
        }
    }
}
_Particles_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Retina.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Retina.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Retina": () => (/* binding */ Retina)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class Retina {
    constructor(container) {
        this.container = container;
    }
    init() {
        const container = this.container, options = container.actualOptions;
        this.pixelRatio = !options.detectRetina || (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__.isSsr)() ? 1 : window.devicePixelRatio;
        const motionOptions = this.container.actualOptions.motion;
        if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
            if ((0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__.isSsr)() || typeof matchMedia === "undefined" || !matchMedia) {
                this.reduceFactor = 1;
            }
            else {
                const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
                if (mediaQuery) {
                    this.handleMotionChange(mediaQuery);
                    const handleChange = () => {
                        this.handleMotionChange(mediaQuery);
                        container.refresh().catch(() => {
                        });
                    };
                    if (mediaQuery.addEventListener !== undefined) {
                        mediaQuery.addEventListener("change", handleChange);
                    }
                    else if (mediaQuery.addListener !== undefined) {
                        mediaQuery.addListener(handleChange);
                    }
                }
            }
        }
        else {
            this.reduceFactor = 1;
        }
        const ratio = this.pixelRatio;
        if (container.canvas.element) {
            const element = container.canvas.element;
            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles;
        this.attractDistance = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(particles.move.attract.distance) * ratio;
        this.linksDistance = particles.links.distance * ratio;
        this.linksWidth = particles.links.width * ratio;
        this.sizeAnimationSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(particles.size.animation.speed) * ratio;
        this.maxSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(particles.move.gravity.maxSpeed) * ratio;
        const modes = options.interactivity.modes;
        this.connectModeDistance = modes.connect.distance * ratio;
        this.connectModeRadius = modes.connect.radius * ratio;
        this.grabModeDistance = modes.grab.distance * ratio;
        this.repulseModeDistance = modes.repulse.distance * ratio;
        this.bounceModeDistance = modes.bounce.distance * ratio;
        this.attractModeDistance = modes.attract.distance * ratio;
        this.slowModeRadius = modes.slow.radius * ratio;
        this.bubbleModeDistance = modes.bubble.distance * ratio;
        if (modes.bubble.size) {
            this.bubbleModeSize = modes.bubble.size * ratio;
        }
    }
    initParticle(particle) {
        const options = particle.options, ratio = this.pixelRatio, moveDistance = options.move.distance, props = particle.retina;
        props.attractDistance = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.move.attract.distance) * ratio;
        props.linksDistance = options.links.distance * ratio;
        props.linksWidth = options.links.width * ratio;
        props.moveDrift = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.move.drift) * ratio;
        props.moveSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.move.speed) * ratio;
        props.sizeAnimationSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.size.animation.speed) * ratio;
        const maxDistance = props.maxDistance;
        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
        props.maxSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.move.gravity.maxSpeed) * ratio;
    }
    handleMotionChange(mediaQuery) {
        const options = this.container.actualOptions;
        if (mediaQuery.matches) {
            const motion = options.motion;
            this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
        }
        else {
            this.reduceFactor = 1;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Circle": () => (/* binding */ Circle)
/* harmony export */ });
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class Circle extends _Range__WEBPACK_IMPORTED_MODULE_0__.Range {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    contains(point) {
        return (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.getDistance)(point, this.position) <= this.radius;
    }
    intersects(range) {
        const rect = range, circle = range, pos1 = this.position, pos2 = range.position, xDist = Math.abs(pos2.x - pos1.x), yDist = Math.abs(pos2.y - pos1.y), r = this.radius;
        if (circle.radius !== undefined) {
            const rSum = r + circle.radius, dist = Math.sqrt(xDist * xDist + yDist + yDist);
            return rSum > dist;
        }
        else if (rect.size !== undefined) {
            const w = rect.size.width, h = rect.size.height, edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
            if (xDist > r + w || yDist > r + h) {
                return false;
            }
            if (xDist <= w || yDist <= h) {
                return true;
            }
            return edges <= r * r;
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/CircleWarp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/CircleWarp.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CircleWarp": () => (/* binding */ CircleWarp)
/* harmony export */ });
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");


class CircleWarp extends _Circle__WEBPACK_IMPORTED_MODULE_0__.Circle {
    constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = Object.assign({}, canvasSize);
    }
    contains(point) {
        if (super.contains(point)) {
            return true;
        }
        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };
        if (super.contains(posNE)) {
            return true;
        }
        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };
        if (super.contains(posSE)) {
            return true;
        }
        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };
        return super.contains(posSW);
    }
    intersects(range) {
        if (super.intersects(range)) {
            return true;
        }
        const rect = range, circle = range, newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };
        if (circle.radius !== undefined) {
            const biggerCircle = new _Circle__WEBPACK_IMPORTED_MODULE_0__.Circle(newPos.x, newPos.y, circle.radius * 2);
            return super.intersects(biggerCircle);
        }
        else if (rect.size !== undefined) {
            const rectSW = new _Rectangle__WEBPACK_IMPORTED_MODULE_1__.Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
            return super.intersects(rectSW);
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generatedAttribute": () => (/* binding */ generatedAttribute),
/* harmony export */   "midColorValue": () => (/* binding */ midColorValue),
/* harmony export */   "mouseDownEvent": () => (/* binding */ mouseDownEvent),
/* harmony export */   "mouseLeaveEvent": () => (/* binding */ mouseLeaveEvent),
/* harmony export */   "mouseMoveEvent": () => (/* binding */ mouseMoveEvent),
/* harmony export */   "mouseOutEvent": () => (/* binding */ mouseOutEvent),
/* harmony export */   "mouseUpEvent": () => (/* binding */ mouseUpEvent),
/* harmony export */   "noPolygonDataLoaded": () => (/* binding */ noPolygonDataLoaded),
/* harmony export */   "noPolygonFound": () => (/* binding */ noPolygonFound),
/* harmony export */   "randomColorValue": () => (/* binding */ randomColorValue),
/* harmony export */   "resizeEvent": () => (/* binding */ resizeEvent),
/* harmony export */   "touchCancelEvent": () => (/* binding */ touchCancelEvent),
/* harmony export */   "touchEndEvent": () => (/* binding */ touchEndEvent),
/* harmony export */   "touchMoveEvent": () => (/* binding */ touchMoveEvent),
/* harmony export */   "touchStartEvent": () => (/* binding */ touchStartEvent),
/* harmony export */   "visibilityChangeEvent": () => (/* binding */ visibilityChangeEvent)
/* harmony export */ });
const generatedAttribute = "generated";
const randomColorValue = "random";
const midColorValue = "mid";
const touchEndEvent = "touchend";
const mouseDownEvent = "mousedown";
const mouseUpEvent = "mouseup";
const mouseMoveEvent = "mousemove";
const touchStartEvent = "touchstart";
const touchMoveEvent = "touchmove";
const mouseLeaveEvent = "mouseleave";
const mouseOutEvent = "mouseout";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";
const noPolygonDataLoaded = "No polygon data loaded.";
const noPolygonFound = "No polygon found, you need to specify SVG url in config.";


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventListeners": () => (/* binding */ EventListeners)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


function manageListener(element, event, handler, add, options) {
    if (add) {
        let addOptions = { passive: true };
        if (typeof options === "boolean") {
            addOptions.capture = options;
        }
        else if (options !== undefined) {
            addOptions = options;
        }
        element.addEventListener(event, handler, addOptions);
    }
    else {
        const removeOptions = options;
        element.removeEventListener(event, handler, removeOptions);
    }
}
class EventListeners {
    constructor(container) {
        this.container = container;
        this.canPush = true;
        this.mouseMoveHandler = (e) => this.mouseTouchMove(e);
        this.touchStartHandler = (e) => this.mouseTouchMove(e);
        this.touchMoveHandler = (e) => this.mouseTouchMove(e);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = (e) => this.mouseTouchClick(e);
        this.mouseUpHandler = (e) => this.mouseTouchClick(e);
        this.mouseDownHandler = () => this.mouseDown();
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.themeChangeHandler = (e) => this.handleThemeChange(e);
        this.oldThemeChangeHandler = (e) => this.handleThemeChange(e);
        this.resizeHandler = () => this.handleWindowResize();
    }
    addListeners() {
        this.manageListeners(true);
    }
    removeListeners() {
        this.manageListeners(false);
    }
    manageListeners(add) {
        var _a;
        const container = this.container, options = container.actualOptions, detectType = options.interactivity.detectsOn;
        let mouseLeaveTmpEvent = _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseLeaveEvent;
        if (detectType === "window") {
            container.interactivity.element = window;
            mouseLeaveTmpEvent = _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseOutEvent;
        }
        else if (detectType === "parent" && container.canvas.element) {
            const canvasEl = container.canvas.element;
            container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
        }
        else {
            container.interactivity.element = container.canvas.element;
        }
        const mediaMatch = !(0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__.isSsr)() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");
        if (mediaMatch) {
            if (mediaMatch.addEventListener !== undefined) {
                manageListener(mediaMatch, "change", this.themeChangeHandler, add);
            }
            else if (mediaMatch.addListener !== undefined) {
                if (add) {
                    mediaMatch.addListener(this.oldThemeChangeHandler);
                }
                else {
                    mediaMatch.removeListener(this.oldThemeChangeHandler);
                }
            }
        }
        const interactivityEl = container.interactivity.element;
        if (!interactivityEl) {
            return;
        }
        const html = interactivityEl;
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent, this.mouseMoveHandler, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.touchStartEvent, this.touchStartHandler, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.touchMoveEvent, this.touchMoveHandler, add);
            if (!options.interactivity.events.onClick.enable) {
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.touchEndEvent, this.touchEndHandler, add);
            }
            else {
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.touchEndEvent, this.touchEndClickHandler, add);
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseUpEvent, this.mouseUpHandler, add);
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseDownEvent, this.mouseDownHandler, add);
            }
            manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_0__.touchCancelEvent, this.touchCancelHandler, add);
        }
        if (container.canvas.element) {
            container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
        }
        if (options.interactivity.events.resize) {
            if (typeof ResizeObserver !== "undefined") {
                if (this.resizeObserver && !add) {
                    if (container.canvas.element) {
                        this.resizeObserver.unobserve(container.canvas.element);
                    }
                    this.resizeObserver.disconnect();
                    delete this.resizeObserver;
                }
                else if (!this.resizeObserver && add && container.canvas.element) {
                    this.resizeObserver = new ResizeObserver((entries) => {
                        const entry = entries.find((e) => e.target === container.canvas.element);
                        if (!entry) {
                            return;
                        }
                        this.handleWindowResize();
                    });
                    this.resizeObserver.observe(container.canvas.element);
                }
            }
            else {
                manageListener(window, _Constants__WEBPACK_IMPORTED_MODULE_0__.resizeEvent, this.resizeHandler, add);
            }
        }
        if (document) {
            manageListener(document, _Constants__WEBPACK_IMPORTED_MODULE_0__.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
        }
    }
    handleWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
            delete this.resizeTimeout;
        }
        this.resizeTimeout = setTimeout(async () => { var _a; return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize(); }, 500);
    }
    handleVisibilityChange() {
        const container = this.container, options = container.actualOptions;
        this.mouseTouchFinish();
        if (!options.pauseOnBlur) {
            return;
        }
        if (document === null || document === void 0 ? void 0 : document.hidden) {
            container.pageHidden = true;
            container.pause();
        }
        else {
            container.pageHidden = false;
            if (container.getAnimationStatus()) {
                container.play(true);
            }
            else {
                container.draw(true);
            }
        }
    }
    mouseDown() {
        const interactivity = this.container.interactivity;
        if (interactivity) {
            const mouse = interactivity.mouse;
            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        }
    }
    mouseTouchMove(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const container = this.container, options = container.actualOptions;
        if (!((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element)) {
            return;
        }
        container.interactivity.mouse.inside = true;
        let pos;
        const canvas = container.canvas.element;
        if (e.type.startsWith("mouse")) {
            this.canPush = true;
            const mouseEvent = e;
            if (container.interactivity.element === window) {
                if (canvas) {
                    const clientRect = canvas.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            }
            else if (options.interactivity.detectsOn === "parent") {
                const source = mouseEvent.target;
                const target = mouseEvent.currentTarget;
                const canvasEl = container.canvas.element;
                if (source && target && canvasEl) {
                    const sourceRect = source.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    const canvasRect = canvasEl.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                        y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                    };
                }
                else {
                    pos = {
                        x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
                        y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY,
                    };
                }
            }
            else {
                if (mouseEvent.target === container.canvas.element) {
                    pos = {
                        x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
                        y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY,
                    };
                }
            }
        }
        else {
            this.canPush = e.type !== "touchmove";
            const touchEvent = e;
            const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
            const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
            pos = {
                x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
                y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0),
            };
        }
        const pxRatio = container.retina.pixelRatio;
        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }
        container.interactivity.mouse.position = pos;
        container.interactivity.status = _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent;
    }
    mouseTouchFinish() {
        const interactivity = this.container.interactivity;
        if (!interactivity) {
            return;
        }
        const mouse = interactivity.mouse;
        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;
        interactivity.status = _Constants__WEBPACK_IMPORTED_MODULE_0__.mouseLeaveEvent;
        mouse.inside = false;
        mouse.clicking = false;
    }
    mouseTouchClick(e) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse;
        mouse.inside = true;
        let handled = false;
        const mousePosition = mouse.position;
        if (!mousePosition || !options.interactivity.events.onClick.enable) {
            return;
        }
        for (const [, plugin] of container.plugins) {
            if (!plugin.clickPositionValid) {
                continue;
            }
            handled = plugin.clickPositionValid(mousePosition);
            if (handled) {
                break;
            }
        }
        if (!handled) {
            this.doMouseTouchClick(e);
        }
        mouse.clicking = false;
    }
    doMouseTouchClick(e) {
        const container = this.container, options = container.actualOptions;
        if (this.canPush) {
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            container.interactivity.mouse.clickPosition = {
                x: mousePos.x,
                y: mousePos.y,
            };
            container.interactivity.mouse.clickTime = new Date().getTime();
            const onClick = options.interactivity.events.onClick;
            if (onClick.mode instanceof Array) {
                for (const mode of onClick.mode) {
                    this.handleClickMode(mode);
                }
            }
            else {
                this.handleClickMode(onClick.mode);
            }
        }
        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }
    handleThemeChange(e) {
        const mediaEvent = e, themeName = mediaEvent.matches
            ? this.container.options.defaultDarkTheme
            : this.container.options.defaultLightTheme, theme = this.container.options.themes.find((theme) => theme.name === themeName);
        if (theme && theme.default.auto) {
            this.container.loadTheme(themeName);
        }
    }
    handleClickMode(mode) {
        this.container.handleClickMode(mode);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExternalInteractorBase": () => (/* binding */ ExternalInteractorBase)
/* harmony export */ });
class ExternalInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = 0;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrameManager": () => (/* binding */ FrameManager)
/* harmony export */ });
class FrameManager {
    constructor(container) {
        this.container = container;
    }
    async nextFrame(timestamp) {
        var _a;
        try {
            const container = this.container;
            if (container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
                container.draw(false);
                return;
            }
            (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : (container.lastFrameTime = timestamp);
            const deltaValue = timestamp - container.lastFrameTime, delta = {
                value: deltaValue,
                factor: (60 * deltaValue) / 1000,
            };
            container.lifeTime += delta.value;
            container.lastFrameTime = timestamp;
            if (deltaValue > 1000) {
                container.draw(false);
                return;
            }
            await container.particles.draw(delta);
            if (container.duration > 0 && container.lifeTime > container.duration) {
                container.destroy();
                return;
            }
            if (container.getAnimationStatus()) {
                container.draw(false);
            }
        }
        catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InteractionManager": () => (/* binding */ InteractionManager)
/* harmony export */ });
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
var _InteractionManager_engine;
class InteractionManager {
    constructor(engine, container) {
        this.container = container;
        _InteractionManager_engine.set(this, void 0);
        __classPrivateFieldSet(this, _InteractionManager_engine, engine, "f");
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.init();
    }
    init() {
        const interactors = __classPrivateFieldGet(this, _InteractionManager_engine, "f").plugins.getInteractors(this.container, true);
        this.externalInteractors = [];
        this.particleInteractors = [];
        for (const interactor of interactors) {
            switch (interactor.type) {
                case 0:
                    this.externalInteractors.push(interactor);
                    break;
                case 1:
                    this.particleInteractors.push(interactor);
                    break;
            }
        }
    }
    async externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }
    async particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.interact(particle, delta);
            }
        }
    }
    handleClickMode(mode) {
        for (const interactor of this.externalInteractors) {
            if (interactor.handleClickMode) {
                interactor.handleClickMode(mode);
            }
        }
    }
}
_InteractionManager_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesInteractorBase": () => (/* binding */ ParticlesInteractorBase)
/* harmony export */ });
class ParticlesInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = 1;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plugins": () => (/* binding */ Plugins)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Plugins_engine;
class Plugins {
    constructor(engine) {
        _Plugins_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Plugins_engine, engine, "f");
        this.plugins = [];
        this.interactorsInitializers = new Map();
        this.moversInitializers = new Map();
        this.updatersInitializers = new Map();
        this.interactors = new Map();
        this.movers = new Map();
        this.updaters = new Map();
        this.presets = new Map();
        this.drawers = new Map();
        this.pathGenerators = new Map();
    }
    getPlugin(plugin) {
        return this.plugins.find((t) => t.id === plugin);
    }
    addPlugin(plugin) {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }
    getAvailablePlugins(container) {
        const res = new Map();
        for (const plugin of this.plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
    }
    loadOptions(options, sourceOptions) {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }
    getPreset(preset) {
        return this.presets.get(preset);
    }
    addPreset(presetKey, options, override = false) {
        if (override || !this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }
    getShapeDrawer(type) {
        return this.drawers.get(type);
    }
    addShapeDrawer(type, drawer) {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }
    getSupportedShapes() {
        return this.drawers.keys();
    }
    getPathGenerator(type) {
        return this.pathGenerators.get(type);
    }
    addPathGenerator(type, pathGenerator) {
        if (!this.getPathGenerator(type)) {
            this.pathGenerators.set(type, pathGenerator);
        }
    }
    getInteractors(container, force = false) {
        let res = this.interactors.get(container);
        if (!res || force) {
            res = [...this.interactorsInitializers.values()].map((t) => t(container));
            this.interactors.set(container, res);
        }
        return res;
    }
    addInteractor(name, initInteractor) {
        this.interactorsInitializers.set(name, initInteractor);
    }
    getUpdaters(container, force = false) {
        let res = this.updaters.get(container);
        if (!res || force) {
            res = [...this.updatersInitializers.values()].map((t) => t(container));
            this.updaters.set(container, res);
        }
        return res;
    }
    addParticleUpdater(name, initUpdater) {
        this.updatersInitializers.set(name, initUpdater);
    }
    getMovers(container, force = false) {
        let res = this.movers.get(container);
        if (!res || force) {
            res = [...this.moversInitializers.values()].map((t) => t(container));
            this.movers.set(container, res);
        }
        return res;
    }
    addParticleMover(name, initMover) {
        this.moversInitializers.set(name, initMover);
    }
}
_Plugins_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Point.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point)
/* harmony export */ });
class Point {
    constructor(position, particle) {
        this.position = position;
        this.particle = particle;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuadTree": () => (/* binding */ QuadTree)
/* harmony export */ });
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony import */ var _CircleWarp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleWarp */ "./node_modules/tsparticles-engine/esm/Core/Utils/CircleWarp.js");
/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");




class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return ((_e = (((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) ||
            ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) ||
            ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) ||
            ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point)))) !== null && _e !== void 0 ? _e : false);
    }
    queryCircle(position, radius) {
        return this.query(new _Circle__WEBPACK_IMPORTED_MODULE_0__.Circle(position.x, position.y, radius));
    }
    queryCircleWarp(position, radius, containerOrSize) {
        const container = containerOrSize, size = containerOrSize;
        return this.query(new _CircleWarp__WEBPACK_IMPORTED_MODULE_1__.CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
    }
    queryRectangle(position, size) {
        return this.query(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__.Rectangle(position.x, position.y, size.width, size.height));
    }
    query(range, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        for (const p of this.points) {
            if (!range.contains(p.position) && (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__.getDistance)(range.position, p.position) > p.particle.getRadius()) {
                continue;
            }
            res.push(p.particle);
        }
        if (this.divided) {
            (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
            (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
            (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
            (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
        }
        return res;
    }
    subdivide() {
        const x = this.rectangle.position.x, y = this.rectangle.position.y, w = this.rectangle.size.width, h = this.rectangle.size.height, capacity = this.capacity;
        this.northEast = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__.Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__.Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__.Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__.Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Range.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Range": () => (/* binding */ Range)
/* harmony export */ });
class Range {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rectangle": () => (/* binding */ Rectangle)
/* harmony export */ });
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");

class Rectangle extends _Range__WEBPACK_IMPORTED_MODULE_0__.Range {
    constructor(x, y, width, height) {
        super(x, y);
        this.size = {
            height: height,
            width: width,
        };
    }
    contains(point) {
        const w = this.size.width, h = this.size.height, pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }
    intersects(range) {
        const rect = range, circle = range, w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position;
        if (circle.radius !== undefined) {
            return circle.intersects(this);
        }
        if (!rect.size) {
            return false;
        }
        const size2 = rect.size, w2 = size2.width, h2 = size2.height;
        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector)
/* harmony export */ });
class Vector {
    constructor(xOrCoords, y) {
        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.x = xOrCoords.x;
            this.y = xOrCoords.y;
        }
        else if (xOrCoords !== undefined && y !== undefined) {
            this.x = xOrCoords;
            this.y = y;
        }
        else {
            throw new Error("tsParticles - Vector not initialized correctly");
        }
    }
    static clone(source) {
        return Vector.create(source.x, source.y);
    }
    static create(x, y) {
        return new Vector(x, y);
    }
    static get origin() {
        return Vector.create(0, 0);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(angle) {
        this.updateFromAngle(angle, this.length);
    }
    get length() {
        return Math.sqrt(this.getLengthSq());
    }
    set length(length) {
        this.updateFromAngle(this.angle, length);
    }
    add(v) {
        return Vector.create(this.x + v.x, this.y + v.y);
    }
    addTo(v) {
        this.x += v.x;
        this.y += v.y;
    }
    sub(v) {
        return Vector.create(this.x - v.x, this.y - v.y);
    }
    subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    mult(n) {
        return Vector.create(this.x * n, this.y * n);
    }
    multTo(n) {
        this.x *= n;
        this.y *= n;
    }
    div(n) {
        return Vector.create(this.x / n, this.y / n);
    }
    divTo(n) {
        this.x /= n;
        this.y /= n;
    }
    distanceTo(v) {
        return this.sub(v).length;
    }
    getLengthSq() {
        return this.x ** 2 + this.y ** 2;
    }
    distanceToSq(v) {
        return this.sub(v).getLengthSq();
    }
    manhattanDistanceTo(v) {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
    }
    copy() {
        return Vector.clone(this);
    }
    setTo(v) {
        this.x = v.x;
        this.y = v.y;
    }
    rotate(angle) {
        return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
    }
    updateFromAngle(angle, length) {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector3d": () => (/* binding */ Vector3d)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");

class Vector3d extends _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector {
    constructor(xOrCoords, y, z) {
        super(xOrCoords, y);
        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.z = xOrCoords.z;
        }
        else if (z !== undefined) {
            this.z = z;
        }
        else {
            throw new Error("tsParticles - Vector not initialized correctly");
        }
    }
    static clone(source) {
        return Vector3d.create(source.x, source.y, source.z);
    }
    static create(x, y, z) {
        return new Vector3d(x, y, z);
    }
    static get origin() {
        return Vector3d.create(0, 0, 0);
    }
    add(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }
    addTo(v) {
        super.addTo(v);
        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }
    sub(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }
    subFrom(v) {
        super.subFrom(v);
        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }
    mult(n) {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }
    multTo(n) {
        super.multTo(n);
        this.z *= n;
    }
    div(n) {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }
    divTo(n) {
        super.divTo(n);
        this.z /= n;
    }
    copy() {
        return Vector3d.clone(this);
    }
    setTo(v) {
        super.setTo(v);
        const v3d = v;
        if (v3d.z !== undefined) {
            this.z = v3d.z;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/TiltDirection.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/TiltDirection.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/DestroyMode.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/DestroyMode.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/RollMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/RollMode.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimatableColor": () => (/* binding */ AnimatableColor)
/* harmony export */ });
/* harmony import */ var _HslAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js");
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");


class AnimatableColor extends _OptionsColor__WEBPACK_IMPORTED_MODULE_1__.OptionsColor {
    constructor() {
        super();
        this.animation = new _HslAnimation__WEBPACK_IMPORTED_MODULE_0__.HslAnimation();
    }
    static create(source, data) {
        const color = new AnimatableColor();
        color.load(source);
        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const colorAnimation = data.animation;
        if (colorAnimation !== undefined) {
            if (colorAnimation.enable !== undefined) {
                this.animation.h.load(colorAnimation);
            }
            else {
                this.animation.load(data.animation);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableGradient.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableGradient.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimatableGradient": () => (/* binding */ AnimatableGradient),
/* harmony export */   "AnimatableGradientColor": () => (/* binding */ AnimatableGradientColor),
/* harmony export */   "GradientAngle": () => (/* binding */ GradientAngle),
/* harmony export */   "GradientAngleAnimation": () => (/* binding */ GradientAngleAnimation),
/* harmony export */   "GradientColorOpacity": () => (/* binding */ GradientColorOpacity),
/* harmony export */   "GradientColorOpacityAnimation": () => (/* binding */ GradientColorOpacityAnimation)
/* harmony export */ });
/* harmony import */ var _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class AnimatableGradient {
    constructor() {
        this.angle = new GradientAngle();
        this.colors = [];
        this.type = "random";
    }
    load(data) {
        if (!data) {
            return;
        }
        this.angle.load(data.angle);
        if (data.colors !== undefined) {
            this.colors = data.colors.map((s) => {
                const tmp = new AnimatableGradientColor();
                tmp.load(s);
                return tmp;
            });
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
class GradientAngle {
    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = "clockwise";
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
            this.value = data.value;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
    }
}
class GradientColorOpacity {
    constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.value);
        }
    }
}
class AnimatableGradientColor {
    constructor() {
        this.stop = 0;
        this.value = new _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.stop !== undefined) {
            this.stop = data.stop;
        }
        this.value = _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor.create(this.value, data.value);
        if (data.opacity !== undefined) {
            this.opacity = new GradientColorOpacity();
            if (typeof data.opacity === "number") {
                this.opacity.value = data.opacity;
            }
            else {
                this.opacity.load(data.opacity);
            }
        }
    }
}
class GradientAngleAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
class GradientColorOpacityAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
        this.startValue = "random";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationOptions": () => (/* binding */ AnimationOptions)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Background": () => (/* binding */ Background)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class Background {
    constructor() {
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.image !== undefined) {
            this.image = data.image;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.repeat !== undefined) {
            this.repeat = data.repeat;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundMask": () => (/* binding */ BackgroundMask)
/* harmony export */ });
/* harmony import */ var _BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js");

class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new _BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_0__.BackgroundMaskCover();
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.composite !== undefined) {
            this.composite = data.composite;
        }
        if (data.cover !== undefined) {
            const cover = data.cover;
            const color = (typeof data.cover === "string" ? { color: data.cover } : data.cover);
            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundMaskCover": () => (/* binding */ BackgroundMaskCover)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class BackgroundMaskCover {
    constructor() {
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.color.value = "#fff";
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorAnimation": () => (/* binding */ ColorAnimation)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset !== undefined) {
            this.offset = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.offset);
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullScreen": () => (/* binding */ FullScreen)
/* harmony export */ });
class FullScreen {
    constructor() {
        this.enable = true;
        this.zIndex = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HslAnimation": () => (/* binding */ HslAnimation)
/* harmony export */ });
/* harmony import */ var _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js");

class HslAnimation {
    constructor() {
        this.h = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();
        this.s = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();
        this.l = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickEvent": () => (/* binding */ ClickEvent)
/* harmony export */ });
class ClickEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DivEvent": () => (/* binding */ DivEvent)
/* harmony export */ });
class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = "circle";
    }
    get elementId() {
        return this.ids;
    }
    set elementId(value) {
        this.ids = value;
    }
    get el() {
        return this.elementId;
    }
    set el(value) {
        this.elementId = value;
    }
    get ids() {
        return this.selectors instanceof Array
            ? this.selectors.map((t) => t.replace("#", ""))
            : this.selectors.replace("#", "");
    }
    set ids(value) {
        this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
    }
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
        if (ids !== undefined) {
            this.ids = ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Events": () => (/* binding */ Events)
/* harmony export */ });
/* harmony import */ var _ClickEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js");
/* harmony import */ var _DivEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DivEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js");
/* harmony import */ var _HoverEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js");



class Events {
    constructor() {
        this.onClick = new _ClickEvent__WEBPACK_IMPORTED_MODULE_0__.ClickEvent();
        this.onDiv = new _DivEvent__WEBPACK_IMPORTED_MODULE_1__.DivEvent();
        this.onHover = new _HoverEvent__WEBPACK_IMPORTED_MODULE_2__.HoverEvent();
        this.resize = true;
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
        const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
        if (onDiv !== undefined) {
            if (onDiv instanceof Array) {
                this.onDiv = onDiv.map((div) => {
                    const tmp = new _DivEvent__WEBPACK_IMPORTED_MODULE_1__.DivEvent();
                    tmp.load(div);
                    return tmp;
                });
            }
            else {
                this.onDiv = new _DivEvent__WEBPACK_IMPORTED_MODULE_1__.DivEvent();
                this.onDiv.load(onDiv);
            }
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HoverEvent": () => (/* binding */ HoverEvent)
/* harmony export */ });
/* harmony import */ var _Parallax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parallax */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js");

class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new _Parallax__WEBPACK_IMPORTED_MODULE_0__.Parallax();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parallax": () => (/* binding */ Parallax)
/* harmony export */ });
class Parallax {
    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.force !== undefined) {
            this.force = data.force;
        }
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Interactivity": () => (/* binding */ Interactivity)
/* harmony export */ });
/* harmony import */ var _Events_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events/Events */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js");
/* harmony import */ var _Modes_Modes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modes/Modes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js");


class Interactivity {
    constructor() {
        this.detectsOn = "window";
        this.events = new _Events_Events__WEBPACK_IMPORTED_MODULE_0__.Events();
        this.modes = new _Modes_Modes__WEBPACK_IMPORTED_MODULE_1__.Modes();
    }
    get detect_on() {
        return this.detectsOn;
    }
    set detect_on(value) {
        this.detectsOn = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
        if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
            if (this.events.onHover.mode instanceof Array) {
                if (this.events.onHover.mode.indexOf("slow") < 0) {
                    this.events.onHover.mode.push("slow");
                }
            }
            else if (this.events.onHover.mode !== "slow") {
                this.events.onHover.mode = [this.events.onHover.mode, "slow"];
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Attract.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Attract.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attract": () => (/* binding */ Attract)
/* harmony export */ });
class Attract {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.easing = "ease-out-quad";
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.easing !== undefined) {
            this.easing = data.easing;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bounce.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bounce.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bounce": () => (/* binding */ Bounce)
/* harmony export */ });
class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bubble.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bubble.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bubble": () => (/* binding */ Bubble)
/* harmony export */ });
/* harmony import */ var _BubbleBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BubbleBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleBase.js");
/* harmony import */ var _BubbleDiv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BubbleDiv */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleDiv.js");


class Bubble extends _BubbleBase__WEBPACK_IMPORTED_MODULE_0__.BubbleBase {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new _BubbleDiv__WEBPACK_IMPORTED_MODULE_1__.BubbleDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new _BubbleDiv__WEBPACK_IMPORTED_MODULE_1__.BubbleDiv();
            }
            this.divs.load(data.divs);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleBase.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleBase.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BubbleBase": () => (/* binding */ BubbleBase)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.mix = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.mix !== undefined) {
            this.mix = data.mix;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
            if (data.color instanceof Array) {
                this.color = data.color.map((s) => _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(undefined, s));
            }
            else {
                if (this.color instanceof Array) {
                    this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
                }
                this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
            }
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleDiv.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleDiv.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BubbleDiv": () => (/* binding */ BubbleDiv)
/* harmony export */ });
/* harmony import */ var _BubbleBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BubbleBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleBase.js");

class BubbleDiv extends _BubbleBase__WEBPACK_IMPORTED_MODULE_0__.BubbleBase {
    constructor() {
        super();
        this.selectors = [];
    }
    get ids() {
        return this.selectors instanceof Array
            ? this.selectors.map((t) => t.replace("#", ""))
            : this.selectors.replace("#", "");
    }
    set ids(value) {
        this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Connect.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Connect.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connect": () => (/* binding */ Connect)
/* harmony export */ });
/* harmony import */ var _ConnectLinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnectLinks */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/ConnectLinks.js");

class Connect {
    constructor() {
        this.distance = 80;
        this.links = new _ConnectLinks__WEBPACK_IMPORTED_MODULE_0__.ConnectLinks();
        this.radius = 60;
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/ConnectLinks.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/ConnectLinks.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectLinks": () => (/* binding */ ConnectLinks)
/* harmony export */ });
class ConnectLinks {
    constructor() {
        this.opacity = 0.5;
    }
    load(data) {
        if (!(data !== undefined && data.opacity !== undefined)) {
            return;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Grab.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Grab.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grab": () => (/* binding */ Grab)
/* harmony export */ });
/* harmony import */ var _GrabLinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GrabLinks */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/GrabLinks.js");

class Grab {
    constructor() {
        this.distance = 100;
        this.links = new _GrabLinks__WEBPACK_IMPORTED_MODULE_0__.GrabLinks();
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/GrabLinks.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/GrabLinks.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GrabLinks": () => (/* binding */ GrabLinks)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class GrabLinks {
    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Light.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Light.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Light": () => (/* binding */ Light)
/* harmony export */ });
/* harmony import */ var _LightArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LightArea */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightArea.js");
/* harmony import */ var _LightShadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LightShadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightShadow.js");


class Light {
    constructor() {
        this.area = new _LightArea__WEBPACK_IMPORTED_MODULE_0__.LightArea();
        this.shadow = new _LightShadow__WEBPACK_IMPORTED_MODULE_1__.LightShadow();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightArea.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightArea.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LightArea": () => (/* binding */ LightArea)
/* harmony export */ });
/* harmony import */ var _LightGradient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LightGradient */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightGradient.js");

class LightArea {
    constructor() {
        this.gradient = new _LightGradient__WEBPACK_IMPORTED_MODULE_0__.LightGradient();
        this.radius = 1000;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.gradient.load(data.gradient);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightGradient.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightGradient.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LightGradient": () => (/* binding */ LightGradient)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class LightGradient {
    constructor() {
        this.start = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.stop = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.start.value = "#ffffff";
        this.stop.value = "#000000";
    }
    load(data) {
        if (!data) {
            return;
        }
        this.start = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.start, data.start);
        this.stop = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.stop, data.stop);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightShadow.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightShadow.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LightShadow": () => (/* binding */ LightShadow)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class LightShadow {
    constructor() {
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.color.value = "#000000";
        this.length = 2000;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modes": () => (/* binding */ Modes)
/* harmony export */ });
/* harmony import */ var _Attract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Attract.js");
/* harmony import */ var _Bounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bounce.js");
/* harmony import */ var _Bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bubble */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bubble.js");
/* harmony import */ var _Connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Connect */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Connect.js");
/* harmony import */ var _Grab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Grab */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Grab.js");
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Light */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Light.js");
/* harmony import */ var _Push__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Push */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Push.js");
/* harmony import */ var _Remove__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Remove */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Remove.js");
/* harmony import */ var _Repulse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Repulse */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Repulse.js");
/* harmony import */ var _Slow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Slow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Slow.js");
/* harmony import */ var _Trail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Trail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Trail.js");











class Modes {
    constructor() {
        this.attract = new _Attract__WEBPACK_IMPORTED_MODULE_0__.Attract();
        this.bounce = new _Bounce__WEBPACK_IMPORTED_MODULE_1__.Bounce();
        this.bubble = new _Bubble__WEBPACK_IMPORTED_MODULE_2__.Bubble();
        this.connect = new _Connect__WEBPACK_IMPORTED_MODULE_3__.Connect();
        this.grab = new _Grab__WEBPACK_IMPORTED_MODULE_4__.Grab();
        this.light = new _Light__WEBPACK_IMPORTED_MODULE_5__.Light();
        this.push = new _Push__WEBPACK_IMPORTED_MODULE_6__.Push();
        this.remove = new _Remove__WEBPACK_IMPORTED_MODULE_7__.Remove();
        this.repulse = new _Repulse__WEBPACK_IMPORTED_MODULE_8__.Repulse();
        this.slow = new _Slow__WEBPACK_IMPORTED_MODULE_9__.Slow();
        this.trail = new _Trail__WEBPACK_IMPORTED_MODULE_10__.Trail();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.attract.load(data.attract);
        this.bubble.load(data.bubble);
        this.connect.load(data.connect);
        this.grab.load(data.grab);
        this.light.load(data.light);
        this.push.load(data.push);
        this.remove.load(data.remove);
        this.repulse.load(data.repulse);
        this.slow.load(data.slow);
        this.trail.load(data.trail);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Push.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Push.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Push": () => (/* binding */ Push)
/* harmony export */ });
class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        if (data.groups !== undefined) {
            this.groups = data.groups.map((t) => t);
        }
        if (!this.groups.length) {
            this.default = true;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Remove.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Remove.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Remove": () => (/* binding */ Remove)
/* harmony export */ });
class Remove {
    constructor() {
        this.quantity = 2;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Repulse.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Repulse.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Repulse": () => (/* binding */ Repulse)
/* harmony export */ });
/* harmony import */ var _RepulseBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepulseBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseBase.js");
/* harmony import */ var _RepulseDiv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RepulseDiv */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseDiv.js");


class Repulse extends _RepulseBase__WEBPACK_IMPORTED_MODULE_0__.RepulseBase {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new _RepulseDiv__WEBPACK_IMPORTED_MODULE_1__.RepulseDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new _RepulseDiv__WEBPACK_IMPORTED_MODULE_1__.RepulseDiv();
            }
            this.divs.load(data.divs);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseBase.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseBase.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RepulseBase": () => (/* binding */ RepulseBase)
/* harmony export */ });
class RepulseBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.factor = 100;
        this.speed = 1;
        this.maxSpeed = 50;
        this.easing = "ease-out-quad";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.easing !== undefined) {
            this.easing = data.easing;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseDiv.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseDiv.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RepulseDiv": () => (/* binding */ RepulseDiv)
/* harmony export */ });
/* harmony import */ var _RepulseBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepulseBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseBase.js");

class RepulseDiv extends _RepulseBase__WEBPACK_IMPORTED_MODULE_0__.RepulseBase {
    constructor() {
        super();
        this.selectors = [];
    }
    get ids() {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        }
        else {
            return this.selectors.replace("#", "");
        }
    }
    set ids(value) {
        if (value instanceof Array) {
            this.selectors = value.map(() => `#${value}`);
        }
        else {
            this.selectors = `#${value}`;
        }
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Slow.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Slow.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slow": () => (/* binding */ Slow)
/* harmony export */ });
class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    get active() {
        return false;
    }
    set active(_value) {
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Trail.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Trail.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Trail": () => (/* binding */ Trail)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class Trail {
    constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
        if (data.particles !== undefined) {
            this.particles = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.particles);
        }
        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManualParticle": () => (/* binding */ ManualParticle)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class ManualParticle {
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.position !== undefined) {
            this.position = {
                x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
                y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50,
            };
        }
        if (data.options !== undefined) {
            this.options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/Motion.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Motion/Motion.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Motion": () => (/* binding */ Motion)
/* harmony export */ });
/* harmony import */ var _MotionReduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionReduce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/MotionReduce.js");

class Motion {
    constructor() {
        this.disable = false;
        this.reduce = new _MotionReduce__WEBPACK_IMPORTED_MODULE_0__.MotionReduce();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.disable !== undefined) {
            this.disable = data.disable;
        }
        this.reduce.load(data.reduce);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/MotionReduce.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Motion/MotionReduce.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MotionReduce": () => (/* binding */ MotionReduce)
/* harmony export */ });
class MotionReduce {
    constructor() {
        this.factor = 4;
        this.value = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Options.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Options": () => (/* binding */ Options)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Background_Background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Background/Background */ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js");
/* harmony import */ var _BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundMask/BackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js");
/* harmony import */ var _FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FullScreen/FullScreen */ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js");
/* harmony import */ var _Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interactivity/Interactivity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js");
/* harmony import */ var _ManualParticle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js");
/* harmony import */ var _Motion_Motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Motion/Motion */ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/Motion.js");
/* harmony import */ var _Responsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Responsive */ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js");
/* harmony import */ var _Theme_Theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Theme/Theme */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js");
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
var _Options_instances, _Options_engine, _Options_findDefaultTheme;









class Options {
    constructor(engine) {
        _Options_instances.add(this);
        _Options_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Options_engine, engine, "f");
        this.autoPlay = true;
        this.background = new _Background_Background__WEBPACK_IMPORTED_MODULE_1__.Background();
        this.backgroundMask = new _BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_2__.BackgroundMask();
        this.fullScreen = new _FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_3__.FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new _Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_4__.Interactivity();
        this.manualParticles = [];
        this.motion = new _Motion_Motion__WEBPACK_IMPORTED_MODULE_6__.Motion();
        this.particles = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.loadParticlesOptions)();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    get backgroundMode() {
        return this.fullScreen;
    }
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    load(data) {
        var _a, _b, _c, _d, _e;
        if (!data) {
            return;
        }
        if (data.preset !== undefined) {
            if (data.preset instanceof Array) {
                for (const preset of data.preset) {
                    this.importPreset(preset);
                }
            }
            else {
                this.importPreset(data.preset);
            }
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        if (data.zLayers !== undefined) {
            this.zLayers = data.zLayers;
        }
        this.background.load(data.background);
        const fullScreen = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;
        if (typeof fullScreen === "boolean") {
            this.fullScreen.enable = fullScreen;
        }
        else {
            this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new _ManualParticle__WEBPACK_IMPORTED_MODULE_5__.ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        this.style = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)(this.style, data.style);
        __classPrivateFieldGet(this, _Options_engine, "f").plugins.loadOptions(this, data);
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new _Responsive__WEBPACK_IMPORTED_MODULE_7__.Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const optTheme = new _Theme_Theme__WEBPACK_IMPORTED_MODULE_8__.Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
        this.defaultDarkTheme = (_d = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark")) === null || _d === void 0 ? void 0 : _d.name;
        this.defaultLightTheme = (_e = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light")) === null || _e === void 0 ? void 0 : _e.name;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark" : "light");
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t) => t.mode === "screen" && screen
            ? t.maxWidth * pxRatio > screen.availWidth
            : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
        return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
    }
    importPreset(preset) {
        this.load(__classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
    }
}
_Options_engine = new WeakMap(), _Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
    var _a;
    return ((_a = this.themes.find((theme) => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find((theme) => theme.default.value && theme.default.mode === "any"));
};


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsColor": () => (/* binding */ OptionsColor)
/* harmony export */ });
class OptionsColor {
    constructor() {
        this.value = "";
    }
    static create(source, data) {
        const color = new OptionsColor();
        color.load(source);
        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
            return;
        }
        this.value = data.value;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesBounce": () => (/* binding */ ParticlesBounce)
/* harmony export */ });
/* harmony import */ var _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesBounceFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js");

class ParticlesBounce {
    constructor() {
        this.horizontal = new _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounceFactor();
        this.vertical = new _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounceFactor();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesBounceFactor": () => (/* binding */ ParticlesBounceFactor)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class ParticlesBounceFactor extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collisions": () => (/* binding */ Collisions)
/* harmony export */ });
/* harmony import */ var _CollisionsOverlap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js");
/* harmony import */ var _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");


class Collisions {
    constructor() {
        this.bounce = new _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_1__.ParticlesBounce();
        this.enable = false;
        this.mode = "bounce";
        this.overlap = new _CollisionsOverlap__WEBPACK_IMPORTED_MODULE_0__.CollisionsOverlap();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollisionsOverlap": () => (/* binding */ CollisionsOverlap)
/* harmony export */ });
class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Destroy.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Destroy.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Destroy": () => (/* binding */ Destroy)
/* harmony export */ });
/* harmony import */ var _Split__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Split */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Split.js");

class Destroy {
    constructor() {
        this.mode = "none";
        this.split = new _Split__WEBPACK_IMPORTED_MODULE_0__.Split();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.split.load(data.split);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Split.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Split.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Split": () => (/* binding */ Split)
/* harmony export */ });
/* harmony import */ var _SplitFactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SplitFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitFactor.js");
/* harmony import */ var _SplitRate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SplitRate */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitRate.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");



class Split {
    constructor() {
        this.count = 1;
        this.factor = new _SplitFactor__WEBPACK_IMPORTED_MODULE_0__.SplitFactor();
        this.rate = new _SplitRate__WEBPACK_IMPORTED_MODULE_1__.SplitRate();
        this.sizeOffset = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        if (data.particles !== undefined) {
            this.particles = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_2__.deepExtend)({}, data.particles);
        }
        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitFactor.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitFactor.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SplitFactor": () => (/* binding */ SplitFactor)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class SplitFactor extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.value = 3;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitRate.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitRate.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SplitRate": () => (/* binding */ SplitRate)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class SplitRate extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.value = { min: 4, max: 9 };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/Life.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/Life.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Life": () => (/* binding */ Life)
/* harmony export */ });
/* harmony import */ var _LifeDelay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LifeDelay */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDelay.js");
/* harmony import */ var _LifeDuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LifeDuration */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDuration.js");


class Life {
    constructor() {
        this.count = 0;
        this.delay = new _LifeDelay__WEBPACK_IMPORTED_MODULE_0__.LifeDelay();
        this.duration = new _LifeDuration__WEBPACK_IMPORTED_MODULE_1__.LifeDuration();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDelay.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDelay.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeDelay": () => (/* binding */ LifeDelay)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class LifeDelay extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDuration.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDuration.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeDuration": () => (/* binding */ LifeDuration)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class LifeDuration extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.0001;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/Links.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/Links.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Links": () => (/* binding */ Links)
/* harmony export */ });
/* harmony import */ var _LinksShadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinksShadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksShadow.js");
/* harmony import */ var _LinksTriangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LinksTriangle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksTriangle.js");
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");



class Links {
    constructor() {
        this.blink = false;
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_2__.OptionsColor();
        this.color.value = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new _LinksShadow__WEBPACK_IMPORTED_MODULE_0__.LinksShadow();
        this.triangles = new _LinksTriangle__WEBPACK_IMPORTED_MODULE_1__.LinksTriangle();
        this.width = 1;
        this.warp = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.id !== undefined) {
            this.id = data.id;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_2__.OptionsColor.create(this.color, data.color);
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksShadow.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksShadow.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinksShadow": () => (/* binding */ LinksShadow)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class LinksShadow {
    constructor() {
        this.blur = 5;
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.color.value = "#000";
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksTriangle.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksTriangle.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinksTriangle": () => (/* binding */ LinksTriangle)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class LinksTriangle {
    constructor() {
        this.enable = false;
        this.frequency = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Move": () => (/* binding */ Move)
/* harmony export */ });
/* harmony import */ var _MoveAngle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js");
/* harmony import */ var _MoveAttract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js");
/* harmony import */ var _MoveGravity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js");
/* harmony import */ var _Path_MovePath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Path/MovePath */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js");
/* harmony import */ var _MoveTrail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js");
/* harmony import */ var _OutModes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OutModes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js");
/* harmony import */ var _Spin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Spin */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");









class Move {
    constructor() {
        this.angle = new _MoveAngle__WEBPACK_IMPORTED_MODULE_0__.MoveAngle();
        this.attract = new _MoveAttract__WEBPACK_IMPORTED_MODULE_1__.MoveAttract();
        this.center = {
            x: 50,
            y: 50,
            radius: 0,
        };
        this.decay = 0;
        this.distance = {};
        this.direction = "none";
        this.drift = 0;
        this.enable = false;
        this.gravity = new _MoveGravity__WEBPACK_IMPORTED_MODULE_2__.MoveGravity();
        this.path = new _Path_MovePath__WEBPACK_IMPORTED_MODULE_3__.MovePath();
        this.outModes = new _OutModes__WEBPACK_IMPORTED_MODULE_5__.OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new _Spin__WEBPACK_IMPORTED_MODULE_6__.Spin();
        this.straight = false;
        this.trail = new _MoveTrail__WEBPACK_IMPORTED_MODULE_4__.MoveTrail();
        this.vibrate = false;
        this.warp = false;
    }
    get collisions() {
        return false;
    }
    set collisions(value) {
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    get outMode() {
        return this.outModes.default;
    }
    set outMode(value) {
        this.outModes.default = value;
    }
    get noise() {
        return this.path;
    }
    set noise(value) {
        this.path = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            }
            else {
                this.angle.load(data.angle);
            }
        }
        this.attract.load(data.attract);
        this.center = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_7__.deepExtend)(this.center, data.center);
        if (data.decay !== undefined) {
            this.decay = data.decay;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance =
                typeof data.distance === "number"
                    ? {
                        horizontal: data.distance,
                        vertical: data.distance,
                    }
                    : (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_7__.deepExtend)({}, data.distance);
        }
        if (data.drift !== undefined) {
            this.drift = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__.setRangeValue)(data.drift);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                this.outModes.load({
                    default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode,
                });
            }
            else {
                this.outModes.load(data.outModes);
            }
        }
        this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__.setRangeValue)(data.speed);
        }
        this.spin.load(data.spin);
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoveAngle": () => (/* binding */ MoveAngle)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.offset);
        }
        if (data.value !== undefined) {
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.value);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoveAttract": () => (/* binding */ MoveAttract)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveAttract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    get rotateX() {
        return this.rotate.x;
    }
    set rotateX(value) {
        this.rotate.x = value;
    }
    get rotateY() {
        return this.rotate.y;
    }
    set rotateY(value) {
        this.rotate.y = value;
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }
        const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoveGravity": () => (/* binding */ MoveGravity)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveGravity {
    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.inverse !== undefined) {
            this.inverse = data.inverse;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.maxSpeed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoveTrail": () => (/* binding */ MoveTrail)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class MoveTrail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.fillColor.value = "#000000";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.fillColor = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutModes": () => (/* binding */ OutModes)
/* harmony export */ });
class OutModes {
    constructor() {
        this.default = "out";
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
        this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
        this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
        this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MovePath": () => (/* binding */ MovePath)
/* harmony export */ });
/* harmony import */ var _MovePathDelay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MovePathDelay */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePathDelay.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class MovePath {
    constructor() {
        this.clamp = true;
        this.delay = new _MovePathDelay__WEBPACK_IMPORTED_MODULE_0__.MovePathDelay();
        this.enable = false;
        this.options = {};
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
            this.options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__.deepExtend)(this.options, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePathDelay.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePathDelay.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MovePathDelay": () => (/* binding */ MovePathDelay)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class MovePathDelay extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spin": () => (/* binding */ Spin)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.position = data.position ? (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.position) : undefined;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesDensity": () => (/* binding */ ParticlesDensity)
/* harmony export */ });
class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }
    get value_area() {
        return this.area;
    }
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
        if (area !== undefined) {
            this.area = area;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesNumber": () => (/* binding */ ParticlesNumber)
/* harmony export */ });
/* harmony import */ var _ParticlesDensity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js");

class ParticlesNumber {
    constructor() {
        this.density = new _ParticlesDensity__WEBPACK_IMPORTED_MODULE_0__.ParticlesDensity();
        this.limit = 0;
        this.value = 100;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Opacity": () => (/* binding */ Opacity)
/* harmony export */ });
/* harmony import */ var _OpacityAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class Opacity extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__.ValueWithRandom {
    constructor() {
        super();
        this.animation = new _OpacityAnimation__WEBPACK_IMPORTED_MODULE_0__.OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpacityAnimation": () => (/* binding */ OpacityAnimation)
/* harmony export */ });
/* harmony import */ var _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");

class OpacityAnimation extends _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 2;
        this.startValue = "random";
        this.sync = false;
    }
    get opacity_min() {
        return this.minimumValue;
    }
    set opacity_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/Orbit.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/Orbit.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Orbit": () => (/* binding */ Orbit)
/* harmony export */ });
/* harmony import */ var _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");
/* harmony import */ var _OrbitRotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrbitRotation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/OrbitRotation.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");




class Orbit {
    constructor() {
        this.animation = new _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new _OrbitRotation__WEBPACK_IMPORTED_MODULE_2__.OrbitRotation();
        this.width = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        this.rotation.load(data.rotation);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.opacity !== undefined) {
            this.opacity = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__.setRangeValue)(data.opacity);
        }
        if (data.width !== undefined) {
            this.width = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__.setRangeValue)(data.width);
        }
        if (data.radius !== undefined) {
            this.radius = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_3__.setRangeValue)(data.radius);
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_1__.OptionsColor.create(this.color, data.color);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/OrbitRotation.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/OrbitRotation.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrbitRotation": () => (/* binding */ OrbitRotation)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class OrbitRotation extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.value = 45;
        this.random.enable = false;
        this.random.minimumValue = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        super.load(data);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesOptions": () => (/* binding */ ParticlesOptions)
/* harmony export */ });
/* harmony import */ var _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");
/* harmony import */ var _AnimatableGradient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AnimatableGradient */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableGradient.js");
/* harmony import */ var _Collisions_Collisions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Collisions/Collisions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js");
/* harmony import */ var _Destroy_Destroy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Destroy/Destroy */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Destroy.js");
/* harmony import */ var _Life_Life__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Life/Life */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/Life.js");
/* harmony import */ var _Links_Links__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Links/Links */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/Links.js");
/* harmony import */ var _Move_Move__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Move/Move */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js");
/* harmony import */ var _Opacity_Opacity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Opacity/Opacity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js");
/* harmony import */ var _Orbit_Orbit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Orbit/Orbit */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/Orbit.js");
/* harmony import */ var _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");
/* harmony import */ var _Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Number/ParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js");
/* harmony import */ var _Repulse_ParticlesRepulse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Repulse/ParticlesRepulse */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Repulse/ParticlesRepulse.js");
/* harmony import */ var _Roll_Roll__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Roll/Roll */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/Roll.js");
/* harmony import */ var _Rotate_Rotate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Rotate/Rotate */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/Rotate.js");
/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Shadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js");
/* harmony import */ var _Shape_Shape__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Shape/Shape */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js");
/* harmony import */ var _Size_Size__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Size/Size */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js");
/* harmony import */ var _Stroke__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Stroke */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js");
/* harmony import */ var _Tilt_Tilt__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Tilt/Tilt */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/Tilt.js");
/* harmony import */ var _Twinkle_Twinkle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Twinkle/Twinkle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/Twinkle.js");
/* harmony import */ var _Wobble_Wobble__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Wobble/Wobble */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Wobble/Wobble.js");
/* harmony import */ var _ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ZIndex/ZIndex */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");























class ParticlesOptions {
    constructor() {
        this.bounce = new _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_9__.ParticlesBounce();
        this.collisions = new _Collisions_Collisions__WEBPACK_IMPORTED_MODULE_2__.Collisions();
        this.color = new _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor();
        this.color.value = "#fff";
        this.destroy = new _Destroy_Destroy__WEBPACK_IMPORTED_MODULE_3__.Destroy();
        this.gradient = [];
        this.groups = {};
        this.life = new _Life_Life__WEBPACK_IMPORTED_MODULE_4__.Life();
        this.links = new _Links_Links__WEBPACK_IMPORTED_MODULE_5__.Links();
        this.move = new _Move_Move__WEBPACK_IMPORTED_MODULE_6__.Move();
        this.number = new _Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_10__.ParticlesNumber();
        this.opacity = new _Opacity_Opacity__WEBPACK_IMPORTED_MODULE_7__.Opacity();
        this.orbit = new _Orbit_Orbit__WEBPACK_IMPORTED_MODULE_8__.Orbit();
        this.reduceDuplicates = false;
        this.repulse = new _Repulse_ParticlesRepulse__WEBPACK_IMPORTED_MODULE_11__.ParticlesRepulse();
        this.roll = new _Roll_Roll__WEBPACK_IMPORTED_MODULE_12__.Roll();
        this.rotate = new _Rotate_Rotate__WEBPACK_IMPORTED_MODULE_13__.Rotate();
        this.shadow = new _Shadow__WEBPACK_IMPORTED_MODULE_14__.Shadow();
        this.shape = new _Shape_Shape__WEBPACK_IMPORTED_MODULE_15__.Shape();
        this.size = new _Size_Size__WEBPACK_IMPORTED_MODULE_16__.Size();
        this.stroke = new _Stroke__WEBPACK_IMPORTED_MODULE_17__.Stroke();
        this.tilt = new _Tilt_Tilt__WEBPACK_IMPORTED_MODULE_18__.Tilt();
        this.twinkle = new _Twinkle_Twinkle__WEBPACK_IMPORTED_MODULE_19__.Twinkle();
        this.wobble = new _Wobble_Wobble__WEBPACK_IMPORTED_MODULE_20__.Wobble();
        this.zIndex = new _ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_21__.ZIndex();
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!data) {
            return;
        }
        this.bounce.load(data.bounce);
        this.color.load(_AnimatableColor__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor.create(this.color, data.color));
        this.destroy.load(data.destroy);
        this.life.load(data.life);
        const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;
        if (links !== undefined) {
            this.links.load(links);
        }
        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];
                if (item !== undefined) {
                    this.groups[group] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_22__.deepExtend)((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
                }
            }
        }
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        this.orbit.load(data.orbit);
        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }
        this.repulse.load(data.repulse);
        this.roll.load(data.roll);
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.tilt.load(data.tilt);
        this.twinkle.load(data.twinkle);
        this.wobble.load(data.wobble);
        this.zIndex.load(data.zIndex);
        const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;
        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }
        this.collisions.load(data.collisions);
        const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;
        if (strokeToLoad) {
            if (strokeToLoad instanceof Array) {
                this.stroke = strokeToLoad.map((s) => {
                    const tmp = new _Stroke__WEBPACK_IMPORTED_MODULE_17__.Stroke();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.stroke instanceof Array) {
                    this.stroke = new _Stroke__WEBPACK_IMPORTED_MODULE_17__.Stroke();
                }
                this.stroke.load(strokeToLoad);
            }
        }
        const gradientToLoad = data.gradient;
        if (gradientToLoad) {
            if (gradientToLoad instanceof Array) {
                this.gradient = gradientToLoad.map((s) => {
                    const tmp = new _AnimatableGradient__WEBPACK_IMPORTED_MODULE_1__.AnimatableGradient();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.gradient instanceof Array) {
                    this.gradient = new _AnimatableGradient__WEBPACK_IMPORTED_MODULE_1__.AnimatableGradient();
                }
                this.gradient.load(gradientToLoad);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Repulse/ParticlesRepulse.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Repulse/ParticlesRepulse.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParticlesRepulse": () => (/* binding */ ParticlesRepulse)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class ParticlesRepulse extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.enabled = false;
        this.distance = 1;
        this.duration = 1;
        this.factor = 1;
        this.speed = 1;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.distance !== undefined) {
            this.distance = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.distance);
        }
        if (data.duration !== undefined) {
            this.duration = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.duration);
        }
        if (data.factor !== undefined) {
            this.factor = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.factor);
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.speed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/Roll.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/Roll.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Roll": () => (/* binding */ Roll)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");
/* harmony import */ var _RollLight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RollLight */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/RollLight.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class Roll {
    constructor() {
        this.darken = new _RollLight__WEBPACK_IMPORTED_MODULE_1__.RollLight();
        this.enable = false;
        this.enlighten = new _RollLight__WEBPACK_IMPORTED_MODULE_1__.RollLight();
        this.mode = "vertical";
        this.speed = 25;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.backColor !== undefined) {
            this.backColor = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.backColor, data.backColor);
        }
        this.darken.load(data.darken);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.enlighten.load(data.enlighten);
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.setRangeValue)(data.speed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/RollLight.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/RollLight.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RollLight": () => (/* binding */ RollLight)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class RollLight {
    constructor() {
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.value !== undefined) {
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.value);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/Rotate.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/Rotate.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rotate": () => (/* binding */ Rotate)
/* harmony export */ });
/* harmony import */ var _RotateAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RotateAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/RotateAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");


class Rotate extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__.ValueWithRandom {
    constructor() {
        super();
        this.animation = new _RotateAnimation__WEBPACK_IMPORTED_MODULE_0__.RotateAnimation();
        this.direction = "clockwise";
        this.path = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/RotateAnimation.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/RotateAnimation.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RotateAnimation": () => (/* binding */ RotateAnimation)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class RotateAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shadow": () => (/* binding */ Shadow)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class Shadow {
    constructor() {
        this.blur = 0;
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
        this.color.value = "#000";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset === undefined) {
            return;
        }
        if (data.offset.x !== undefined) {
            this.offset.x = data.offset.x;
        }
        if (data.offset.y !== undefined) {
            this.offset.y = data.offset.y;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class Shape {
    constructor() {
        this.options = {};
        this.type = "circle";
    }
    get image() {
        var _a;
        return ((_a = this.options["image"]) !== null && _a !== void 0 ? _a : this.options["images"]);
    }
    set image(value) {
        this.options["image"] = value;
        this.options["images"] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get images() {
        return this.image;
    }
    set images(value) {
        this.image = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    get character() {
        var _a;
        return ((_a = this.options["character"]) !== null && _a !== void 0 ? _a : this.options["char"]);
    }
    set character(value) {
        this.options["character"] = value;
        this.options["char"] = value;
    }
    get polygon() {
        var _a;
        return ((_a = this.options["polygon"]) !== null && _a !== void 0 ? _a : this.options["star"]);
    }
    set polygon(value) {
        this.options["polygon"] = value;
        this.options["star"] = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item) {
                    this.options[shape] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
                }
            }
        }
        this.loadShape(data.character, "character", "char", true);
        this.loadShape(data.polygon, "polygon", "star", false);
        this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, "image", "images", true);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
    loadShape(item, mainKey, altKey, altOverride) {
        var _a, _b, _c, _d;
        if (item === undefined) {
            return;
        }
        if (item instanceof Array) {
            if (!(this.options[mainKey] instanceof Array)) {
                this.options[mainKey] = [];
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = [];
                }
            }
            this.options[mainKey] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
            }
        }
        else {
            if (this.options[mainKey] instanceof Array) {
                this.options[mainKey] = {};
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = {};
                }
            }
            this.options[mainKey] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Size": () => (/* binding */ Size)
/* harmony export */ });
/* harmony import */ var _SizeAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class Size extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__.ValueWithRandom {
    constructor() {
        super();
        this.animation = new _SizeAnimation__WEBPACK_IMPORTED_MODULE_0__.SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        super.load(data);
        if (!data) {
            return;
        }
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SizeAnimation": () => (/* binding */ SizeAnimation)
/* harmony export */ });
/* harmony import */ var _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");

class SizeAnimation extends _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 5;
        this.startValue = "random";
        this.sync = false;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        super.load(data);
        if (!data) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stroke": () => (/* binding */ Stroke)
/* harmony export */ });
/* harmony import */ var _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");

class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/Tilt.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/Tilt.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tilt": () => (/* binding */ Tilt)
/* harmony export */ });
/* harmony import */ var _TiltAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TiltAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/TiltAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");


class Tilt extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__.ValueWithRandom {
    constructor() {
        super();
        this.animation = new _TiltAnimation__WEBPACK_IMPORTED_MODULE_0__.TiltAnimation();
        this.direction = "clockwise";
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/TiltAnimation.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/TiltAnimation.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TiltAnimation": () => (/* binding */ TiltAnimation)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class TiltAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/Twinkle.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/Twinkle.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Twinkle": () => (/* binding */ Twinkle)
/* harmony export */ });
/* harmony import */ var _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwinkleValues */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/TwinkleValues.js");

class Twinkle {
    constructor() {
        this.lines = new _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__.TwinkleValues();
        this.particles = new _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__.TwinkleValues();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/TwinkleValues.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/TwinkleValues.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TwinkleValues": () => (/* binding */ TwinkleValues)
/* harmony export */ });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.opacity);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Wobble/Wobble.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Wobble/Wobble.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wobble": () => (/* binding */ Wobble)
/* harmony export */ });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZIndex": () => (/* binding */ ZIndex)
/* harmony export */ });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class ZIndex extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {
    constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.opacityRate !== undefined) {
            this.opacityRate = data.opacityRate;
        }
        if (data.sizeRate !== undefined) {
            this.sizeRate = data.sizeRate;
        }
        if (data.velocityRate !== undefined) {
            this.velocityRate = data.velocityRate;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Random.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Random.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Random": () => (/* binding */ Random)
/* harmony export */ });
class Random {
    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Responsive": () => (/* binding */ Responsive)
/* harmony export */ });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
            if (data.mode === "screen") {
                this.mode = "screen";
            }
            else {
                this.mode = "canvas";
            }
        }
        if (data.options !== undefined) {
            this.options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Theme": () => (/* binding */ Theme)
/* harmony export */ });
/* harmony import */ var _ThemeDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class Theme {
    constructor() {
        this.name = "";
        this.default = new _ThemeDefault__WEBPACK_IMPORTED_MODULE_0__.ThemeDefault();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
            this.options = (0,_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__.deepExtend)({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeDefault": () => (/* binding */ ThemeDefault)
/* harmony export */ });
class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = "any";
        this.value = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.auto !== undefined) {
            this.auto = data.auto;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueWithRandom": () => (/* binding */ ValueWithRandom)
/* harmony export */ });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./node_modules/tsparticles-engine/esm/Options/Classes/Random.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class ValueWithRandom {
    constructor() {
        this.random = new _Random__WEBPACK_IMPORTED_MODULE_0__.Random();
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (typeof data.random === "boolean") {
            this.random.enable = data.random;
        }
        else {
            this.random.load(data.random);
        }
        if (data.value !== undefined) {
            this.value = (0,_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableGradient.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableGradient.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsGradient.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsGradient.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IAttract.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IAttract.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBounce.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBounce.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubble.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubble.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleBase.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleBase.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleDiv.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleDiv.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnect.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnect.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnectLinks.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnectLinks.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrab.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrab.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrabLinks.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrabLinks.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILight.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILight.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightArea.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightArea.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightGradient.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightGradient.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightShadow.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightShadow.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IPush.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IPush.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRemove.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRemove.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulse.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulse.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseBase.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseBase.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseDiv.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseDiv.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ISlow.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ISlow.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ITrail.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ITrail.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotion.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotion.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotionReduce.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotionReduce.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/IDestroy.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/IDestroy.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/ISplit.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/ISplit.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILife.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILife.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDelay.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDelay.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDuration.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDuration.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinks.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinks.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksShadow.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksShadow.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksTriangle.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksTriangle.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Orbit/IOrbit.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Orbit/IOrbit.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Repulse/IParticlesRepulse.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Repulse/IParticlesRepulse.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRoll.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRoll.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRollLight.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRollLight.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotate.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotate.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotateAnimation.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotateAnimation.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_Interfaces_IShapeValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Core/Interfaces/IShapeValues */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js");



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITilt.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITilt.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITiltAnimation.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITiltAnimation.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkle.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkle.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkleValues.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkleValues.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Wobble/IWobble.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Wobble/IWobble.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/PathOptions.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/PathOptions.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/RangeValue.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/RangeValue.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/ShapeData.js":
/*!****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/ShapeData.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alterHsl": () => (/* binding */ alterHsl),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "drawConnectLine": () => (/* binding */ drawConnectLine),
/* harmony export */   "drawEllipse": () => (/* binding */ drawEllipse),
/* harmony export */   "drawGrabLine": () => (/* binding */ drawGrabLine),
/* harmony export */   "drawLine": () => (/* binding */ drawLine),
/* harmony export */   "drawParticle": () => (/* binding */ drawParticle),
/* harmony export */   "drawParticlePlugin": () => (/* binding */ drawParticlePlugin),
/* harmony export */   "drawPlugin": () => (/* binding */ drawPlugin),
/* harmony export */   "drawShape": () => (/* binding */ drawShape),
/* harmony export */   "drawShapeAfterEffect": () => (/* binding */ drawShapeAfterEffect),
/* harmony export */   "drawTriangle": () => (/* binding */ drawTriangle),
/* harmony export */   "gradient": () => (/* binding */ gradient),
/* harmony export */   "paintBase": () => (/* binding */ paintBase)
/* harmony export */ });
/* harmony import */ var _ColorUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");

function drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}
function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
function paintBase(context, dimension, baseColor) {
    context.save();
    context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
}
function clear(context, dimension) {
    context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawConnectLine(context, width, lineStyle, begin, end) {
    context.save();
    drawLine(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
}
function gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
    if (!color1 || !color2) {
        return;
    }
    const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.colorMix)(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(0, (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl)(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(midRgb, opacity));
    grad.addColorStop(1, (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl)(color2, opacity));
    return grad;
}
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
    context.save();
    drawLine(context, begin, end);
    context.strokeStyle = (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
    context.restore();
}
function drawParticle(container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow) {
    var _a, _b, _c, _d;
    const pos = particle.getPosition(), tiltOptions = particle.options.tilt, rollOptions = particle.options.roll;
    context.save();
    if (tiltOptions.enable || rollOptions.enable) {
        const roll = rollOptions.enable && particle.roll, tilt = tiltOptions.enable && particle.tilt, rollHorizontal = roll && (rollOptions.mode === "horizontal" || rollOptions.mode === "both"), rollVertical = roll && (rollOptions.mode === "vertical" || rollOptions.mode === "both");
        context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
    }
    else {
        context.translate(pos.x, pos.y);
    }
    context.beginPath();
    const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);
    if (angle !== 0) {
        context.rotate(angle);
    }
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    const shadowColor = particle.shadowColor;
    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
    }
    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }
    const stroke = particle.stroke;
    context.lineWidth = (_c = particle.strokeWidth) !== null && _c !== void 0 ? _c : 0;
    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }
    drawShape(container, context, particle, radius, opacity, delta);
    if (((_d = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _d !== void 0 ? _d : 0) > 0) {
        context.stroke();
    }
    if (particle.close) {
        context.closePath();
    }
    if (particle.fill) {
        context.fill();
    }
    context.restore();
    context.save();
    if (tiltOptions.enable && particle.tilt) {
        context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
    }
    else {
        context.translate(pos.x, pos.y);
    }
    if (angle !== 0) {
        context.rotate(angle);
    }
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
    context.restore();
}
function drawShape(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!drawer) {
        return;
    }
    drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
        return;
    }
    drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawPlugin(context, plugin, delta) {
    if (!plugin.draw) {
        return;
    }
    context.save();
    plugin.draw(context, delta);
    context.restore();
}
function drawParticlePlugin(context, plugin, particle, delta) {
    if (!plugin.drawParticle) {
        return;
    }
    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
}
function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
    if (width <= 0) {
        return;
    }
    const pos = particle.getPosition();
    if (fillColorValue) {
        context.strokeStyle = (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl)(fillColorValue, opacity);
    }
    context.lineWidth = width;
    const rotationRadian = (rotation * Math.PI) / 180;
    context.beginPath();
    context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
    context.stroke();
}
function alterHsl(color, type, value) {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === "darken" ? -1 : 1) * value,
    };
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorMix": () => (/* binding */ colorMix),
/* harmony export */   "colorToHsl": () => (/* binding */ colorToHsl),
/* harmony export */   "colorToRgb": () => (/* binding */ colorToRgb),
/* harmony export */   "getHslAnimationFromHsl": () => (/* binding */ getHslAnimationFromHsl),
/* harmony export */   "getHslFromAnimation": () => (/* binding */ getHslFromAnimation),
/* harmony export */   "getLinkColor": () => (/* binding */ getLinkColor),
/* harmony export */   "getLinkRandomColor": () => (/* binding */ getLinkRandomColor),
/* harmony export */   "getRandomRgbColor": () => (/* binding */ getRandomRgbColor),
/* harmony export */   "getStyleFromHsl": () => (/* binding */ getStyleFromHsl),
/* harmony export */   "getStyleFromHsv": () => (/* binding */ getStyleFromHsv),
/* harmony export */   "getStyleFromRgb": () => (/* binding */ getStyleFromRgb),
/* harmony export */   "hslToHsv": () => (/* binding */ hslToHsv),
/* harmony export */   "hslToRgb": () => (/* binding */ hslToRgb),
/* harmony export */   "hslaToHsva": () => (/* binding */ hslaToHsva),
/* harmony export */   "hslaToRgba": () => (/* binding */ hslaToRgba),
/* harmony export */   "hsvToHsl": () => (/* binding */ hsvToHsl),
/* harmony export */   "hsvToRgb": () => (/* binding */ hsvToRgb),
/* harmony export */   "hsvaToHsla": () => (/* binding */ hsvaToHsla),
/* harmony export */   "hsvaToRgba": () => (/* binding */ hsvaToRgba),
/* harmony export */   "rgbToHsl": () => (/* binding */ rgbToHsl),
/* harmony export */   "rgbToHsv": () => (/* binding */ rgbToHsv),
/* harmony export */   "rgbaToHsva": () => (/* binding */ rgbaToHsva),
/* harmony export */   "stringToAlpha": () => (/* binding */ stringToAlpha),
/* harmony export */   "stringToRgb": () => (/* binding */ stringToRgb)
/* harmony export */ });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");



function hue2rgb(p, q, t) {
    let tCalc = t;
    if (tCalc < 0) {
        tCalc += 1;
    }
    if (tCalc > 1) {
        tCalc -= 1;
    }
    if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
    }
    if (tCalc < 1 / 2) {
        return q;
    }
    if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
    }
    return p;
}
function stringToRgba(input) {
    if (input.startsWith("rgb")) {
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? {
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                b: parseInt(result[3], 10),
                g: parseInt(result[2], 10),
                r: parseInt(result[1], 10),
            }
            : undefined;
    }
    else if (input.startsWith("hsl")) {
        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? hslaToRgba({
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                h: parseInt(result[1], 10),
                l: parseInt(result[3], 10),
                s: parseInt(result[2], 10),
            })
            : undefined;
    }
    else if (input.startsWith("hsv")) {
        const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? hsvaToRgba({
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                h: parseInt(result[1], 10),
                s: parseInt(result[2], 10),
                v: parseInt(result[3], 10),
            })
            : undefined;
    }
    else {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
        const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        });
        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
        const result = regex.exec(hexFixed);
        return result
            ? {
                a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                b: parseInt(result[3], 16),
                g: parseInt(result[2], 16),
                r: parseInt(result[1], 16),
            }
            : undefined;
    }
}
function colorToRgb(input, index, useIndex = true) {
    var _a, _b, _c;
    if (input === undefined) {
        return;
    }
    const color = typeof input === "string" ? { value: input } : input;
    let res;
    if (typeof color.value === "string") {
        res = color.value === _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
    }
    else {
        if (color.value instanceof Array) {
            const colorSelected = (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.itemFromArray)(color.value, index, useIndex);
            res = colorToRgb({ value: colorSelected });
        }
        else {
            const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
            if (rgbColor.r !== undefined) {
                res = rgbColor;
            }
            else {
                const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
                if (hslColor.h !== undefined && hslColor.l !== undefined) {
                    res = hslToRgb(hslColor);
                }
                else {
                    const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
                    if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
                        res = hsvToRgb(hsvColor);
                    }
                }
            }
        }
    }
    return res;
}
function colorToHsl(color, index, useIndex = true) {
    const rgb = colorToRgb(color, index, useIndex);
    return rgb !== undefined ? rgbToHsl(rgb) : undefined;
}
function rgbToHsl(color) {
    const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255;
    const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
    const res = {
        h: 0,
        l: (max + min) / 2,
        s: 0,
    };
    if (max !== min) {
        res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
        res.h =
            r1 === max
                ? (g1 - b1) / (max - min)
                : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
    }
    res.l *= 100;
    res.s *= 100;
    res.h *= 60;
    if (res.h < 0) {
        res.h += 360;
    }
    return res;
}
function stringToAlpha(input) {
    var _a;
    return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}
function stringToRgb(input) {
    return stringToRgba(input);
}
function hslToRgb(hsl) {
    const result = { b: 0, g: 0, r: 0 }, hslPercent = {
        h: hsl.h / 360,
        l: hsl.l / 100,
        s: hsl.s / 100,
    };
    if (hslPercent.s === 0) {
        result.b = hslPercent.l;
        result.g = hslPercent.l;
        result.r = hslPercent.l;
    }
    else {
        const q = hslPercent.l < 0.5
            ? hslPercent.l * (1 + hslPercent.s)
            : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
    }
    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);
    return result;
}
function hslaToRgba(hsla) {
    const rgbResult = hslToRgb(hsla);
    return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r,
    };
}
function hslToHsv(hsl) {
    const l = hsl.l / 100, sl = hsl.s / 100, v = l + sl * Math.min(l, 1 - l), sv = !v ? 0 : 2 * (1 - l / v);
    return {
        h: hsl.h,
        s: sv * 100,
        v: v * 100,
    };
}
function hslaToHsva(hsla) {
    const hsvResult = hslToHsv(hsla);
    return {
        a: hsla.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v,
    };
}
function hsvToHsl(hsv) {
    const v = hsv.v / 100, sv = hsv.s / 100, l = v * (1 - sv / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
    return {
        h: hsv.h,
        l: l * 100,
        s: sl * 100,
    };
}
function hsvaToHsla(hsva) {
    const hslResult = hsvToHsl(hsva);
    return {
        a: hsva.a,
        h: hslResult.h,
        l: hslResult.l,
        s: hslResult.s,
    };
}
function hsvToRgb(hsv) {
    const result = { b: 0, g: 0, r: 0 }, hsvPercent = {
        h: hsv.h / 60,
        s: hsv.s / 100,
        v: hsv.v / 100,
    };
    const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs((hsvPercent.h % 2) - 1));
    let tempRgb;
    if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
        tempRgb = {
            r: c,
            g: x,
            b: 0,
        };
    }
    else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
        tempRgb = {
            r: x,
            g: c,
            b: 0,
        };
    }
    else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
        tempRgb = {
            r: 0,
            g: c,
            b: x,
        };
    }
    else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
        tempRgb = {
            r: 0,
            g: x,
            b: c,
        };
    }
    else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
        tempRgb = {
            r: x,
            g: 0,
            b: c,
        };
    }
    else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
        tempRgb = {
            r: c,
            g: 0,
            b: x,
        };
    }
    if (tempRgb) {
        const m = hsvPercent.v - c;
        result.r = Math.floor((tempRgb.r + m) * 255);
        result.g = Math.floor((tempRgb.g + m) * 255);
        result.b = Math.floor((tempRgb.b + m) * 255);
    }
    return result;
}
function hsvaToRgba(hsva) {
    const rgbResult = hsvToRgb(hsva);
    return {
        a: hsva.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r,
    };
}
function rgbToHsv(rgb) {
    const rgbPercent = {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
    }, xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b), xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b), v = xMax, c = xMax - xMin;
    let h = 0;
    if (v === rgbPercent.r) {
        h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
    }
    else if (v === rgbPercent.g) {
        h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
    }
    else if (v === rgbPercent.b) {
        h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
    }
    const s = !v ? 0 : c / v;
    return {
        h,
        s: s * 100,
        v: v * 100,
    };
}
function rgbaToHsva(rgba) {
    const hsvResult = rgbToHsv(rgba);
    return {
        a: rgba.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v,
    };
}
function getRandomRgbColor(min) {
    const fixedMin = min !== null && min !== void 0 ? min : 0;
    return {
        b: Math.floor((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, 256))),
        g: Math.floor((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, 256))),
        r: Math.floor((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, 256))),
    };
}
function getStyleFromRgb(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsl(color, opacity) {
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsv(color, opacity) {
    return getStyleFromHsl(hsvToHsl(color), opacity);
}
function colorMix(color1, color2, size1, size2) {
    let rgb1 = color1, rgb2 = color2;
    if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1);
    }
    if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2);
    }
    return {
        b: (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.b, rgb2.b, size1, size2),
        g: (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.g, rgb2.g, size1, size2),
        r: (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.r, rgb2.r, size1, size2),
    };
}
function getLinkColor(p1, p2, linkColor) {
    var _a, _b;
    if (linkColor === _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.randomColorValue) {
        return getRandomRgbColor();
    }
    else if (linkColor === "mid") {
        const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(), destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
        if (sourceColor && destColor && p2) {
            return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
        }
        else {
            const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
            if (hslColor) {
                return hslToRgb(hslColor);
            }
        }
    }
    else {
        return linkColor;
    }
}
function getLinkRandomColor(optColor, blink, consent) {
    const color = typeof optColor === "string" ? optColor : optColor.value;
    if (color === _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.randomColorValue) {
        if (consent) {
            return colorToRgb({
                value: color,
            });
        }
        else if (blink) {
            return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.randomColorValue;
        }
        else {
            return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__.midColorValue;
        }
    }
    else {
        return colorToRgb({
            value: color,
        });
    }
}
function getHslFromAnimation(animation) {
    return animation !== undefined
        ? {
            h: animation.h.value,
            s: animation.s.value,
            l: animation.l.value,
        }
        : undefined;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
    const resColor = {
        h: {
            enable: false,
            value: hsl.h,
        },
        s: {
            enable: false,
            value: hsl.s,
        },
        l: {
            enable: false,
            value: hsl.l,
        },
    };
    if (animationOptions) {
        setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
        setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
        setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
    }
    return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
    colorValue.enable = colorAnimation.enable;
    if (colorValue.enable) {
        colorValue.velocity = ((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(colorAnimation.speed) / 100) * reduceFactor;
        if (colorAnimation.sync) {
            return;
        }
        colorValue.status = 0;
        colorValue.velocity *= Math.random();
        if (colorValue.value) {
            colorValue.value *= Math.random();
        }
    }
    else {
        colorValue.velocity = 0;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": () => (/* binding */ EventDispatcher)
/* harmony export */ });
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
var _EventDispatcher_listeners;
class EventDispatcher {
    constructor() {
        _EventDispatcher_listeners.set(this, void 0);
        __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
    }
    addEventListener(type, listener) {
        var _a;
        this.removeEventListener(type, listener);
        if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").set(type, []);
        }
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    removeEventListener(type, listener) {
        const arr = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
        if (!arr) {
            return;
        }
        const length = arr.length, idx = arr.indexOf(listener);
        if (idx < 0) {
            return;
        }
        if (length === 1) {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        }
        else {
            arr.splice(idx, 1);
        }
    }
    removeAllEventListeners(type) {
        if (!type) {
            __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
        }
        else {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        }
    }
    dispatchEvent(type, args) {
        var _a;
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => handler(args));
    }
    hasEventListener(type) {
        return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
    }
}
_EventDispatcher_listeners = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcEasing": () => (/* binding */ calcEasing),
/* harmony export */   "calcExactPositionOrRandomFromSize": () => (/* binding */ calcExactPositionOrRandomFromSize),
/* harmony export */   "calcExactPositionOrRandomFromSizeRanged": () => (/* binding */ calcExactPositionOrRandomFromSizeRanged),
/* harmony export */   "calcPositionFromSize": () => (/* binding */ calcPositionFromSize),
/* harmony export */   "calcPositionOrRandomFromSize": () => (/* binding */ calcPositionOrRandomFromSize),
/* harmony export */   "calcPositionOrRandomFromSizeRanged": () => (/* binding */ calcPositionOrRandomFromSizeRanged),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "collisionVelocity": () => (/* binding */ collisionVelocity),
/* harmony export */   "getDistance": () => (/* binding */ getDistance),
/* harmony export */   "getDistances": () => (/* binding */ getDistances),
/* harmony export */   "getParticleBaseVelocity": () => (/* binding */ getParticleBaseVelocity),
/* harmony export */   "getParticleDirectionAngle": () => (/* binding */ getParticleDirectionAngle),
/* harmony export */   "getRangeMax": () => (/* binding */ getRangeMax),
/* harmony export */   "getRangeMin": () => (/* binding */ getRangeMin),
/* harmony export */   "getRangeValue": () => (/* binding */ getRangeValue),
/* harmony export */   "getValue": () => (/* binding */ getValue),
/* harmony export */   "mix": () => (/* binding */ mix),
/* harmony export */   "randomInRange": () => (/* binding */ randomInRange),
/* harmony export */   "setRangeValue": () => (/* binding */ setRangeValue)
/* harmony export */ });
/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
function getRangeValue(value) {
    return typeof value === "number" ? value : randomInRange(value);
}
function getRangeMin(value) {
    return typeof value === "number" ? value : value.min;
}
function getRangeMax(value) {
    return typeof value === "number" ? value : value.max;
}
function setRangeValue(source, value) {
    if (source === value || (value === undefined && typeof source === "number")) {
        return source;
    }
    const min = getRangeMin(source), max = getRangeMax(source);
    return value !== undefined
        ? {
            min: Math.min(min, value),
            max: Math.max(max, value),
        }
        : setRangeValue(min, max);
}
function getValue(options) {
    const random = options.random, { enable, minimumValue } = typeof random === "boolean"
        ? {
            enable: random,
            minimumValue: 0,
        }
        : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
}
function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction, position, center) {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    }
    else {
        switch (direction) {
            case "top":
                return -Math.PI / 2;
            case "top-right":
                return -Math.PI / 4;
            case "right":
                return 0;
            case "bottom-right":
                return Math.PI / 4;
            case "bottom":
                return Math.PI / 2;
            case "bottom-left":
                return (3 * Math.PI) / 4;
            case "left":
                return Math.PI;
            case "top-left":
                return (-3 * Math.PI) / 4;
            case "inside":
                return Math.atan2(center.y - position.y, center.x - position.x);
            case "outside":
                return Math.atan2(position.y - center.y, position.x - center.x);
            case "none":
            default:
                return Math.random() * Math.PI * 2;
        }
    }
}
function getParticleBaseVelocity(direction) {
    const baseVelocity = _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
    return _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
function calcEasing(value, type) {
    switch (type) {
        case "ease-out-quad":
            return 1 - (1 - value) ** 2;
        case "ease-out-cubic":
            return 1 - (1 - value) ** 3;
        case "ease-out-quart":
            return 1 - (1 - value) ** 4;
        case "ease-out-quint":
            return 1 - (1 - value) ** 5;
        case "ease-out-expo":
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case "ease-out-sine":
            return Math.sin((value * Math.PI) / 2);
        case "ease-out-back": {
            const c1 = 1.70158, c3 = c1 + 1;
            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case "ease-out-circ":
            return Math.sqrt(1 - Math.pow(value - 1, 2));
        default:
            return value;
    }
}
function calcPositionFromSize(data) {
    var _a, _b;
    return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined
        ? {
            x: (data.position.x * data.size.width) / 100,
            y: (data.position.y * data.size.height) / 100,
        }
        : undefined;
}
function calcPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * 100) * data.size.width) / 100,
        y: (((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * 100) * data.size.height) / 100,
    };
}
function calcPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcPositionOrRandomFromSize({ size: data.size, position });
}
function calcExactPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * data.size.width,
        y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * data.size.height,
    };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/Utils.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/Utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate),
/* harmony export */   "areBoundsInside": () => (/* binding */ areBoundsInside),
/* harmony export */   "arrayRandomIndex": () => (/* binding */ arrayRandomIndex),
/* harmony export */   "calculateBounds": () => (/* binding */ calculateBounds),
/* harmony export */   "cancelAnimation": () => (/* binding */ cancelAnimation),
/* harmony export */   "circleBounce": () => (/* binding */ circleBounce),
/* harmony export */   "circleBounceDataFromParticle": () => (/* binding */ circleBounceDataFromParticle),
/* harmony export */   "deepExtend": () => (/* binding */ deepExtend),
/* harmony export */   "divMode": () => (/* binding */ divMode),
/* harmony export */   "divModeExecute": () => (/* binding */ divModeExecute),
/* harmony export */   "isDivModeEnabled": () => (/* binding */ isDivModeEnabled),
/* harmony export */   "isInArray": () => (/* binding */ isInArray),
/* harmony export */   "isPointInside": () => (/* binding */ isPointInside),
/* harmony export */   "isSsr": () => (/* binding */ isSsr),
/* harmony export */   "itemFromArray": () => (/* binding */ itemFromArray),
/* harmony export */   "loadContainerOptions": () => (/* binding */ loadContainerOptions),
/* harmony export */   "loadFont": () => (/* binding */ loadFont),
/* harmony export */   "loadParticlesOptions": () => (/* binding */ loadParticlesOptions),
/* harmony export */   "rectBounce": () => (/* binding */ rectBounce),
/* harmony export */   "singleDivModeExecute": () => (/* binding */ singleDivModeExecute)
/* harmony export */ });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Options/Classes/Options */ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js");
/* harmony import */ var _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Options/Classes/Particles/ParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js");
/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");




function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
    const res = { bounced: false };
    if (pOtherSide.min < rectOtherSide.min ||
        pOtherSide.min > rectOtherSide.max ||
        pOtherSide.max < rectOtherSide.min ||
        pOtherSide.max > rectOtherSide.max) {
        return res;
    }
    if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
        (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)) {
        res.velocity = velocity * -factor;
        res.bounced = true;
    }
    return res;
}
function checkSelector(element, selectors) {
    if (!(selectors instanceof Array)) {
        return element.matches(selectors);
    }
    for (const selector of selectors) {
        if (element.matches(selector)) {
            return true;
        }
    }
    return false;
}
function isSsr() {
    return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function animate() {
    return isSsr()
        ? (callback) => setTimeout(callback)
        : (callback) => (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.setTimeout)(callback);
}
function cancelAnimation() {
    return isSsr()
        ? (handle) => clearTimeout(handle)
        : (handle) => (window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.clearTimeout)(handle);
}
function isInArray(value, array) {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}
async function loadFont(font, weight) {
    try {
        await document.fonts.load(`${weight !== null && weight !== void 0 ? weight : "400"} 36px '${font !== null && font !== void 0 ? font : "Verdana"}'`);
    }
    catch (_a) {
    }
}
function arrayRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
    const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
    return array[fixedIndex];
}
function isPointInside(point, size, offset, radius, direction) {
    return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
    let inside = true;
    if (!direction || direction === "bottom") {
        inside = bounds.top < size.height + offset.x;
    }
    if (inside && (!direction || direction === "left")) {
        inside = bounds.right > offset.x;
    }
    if (inside && (!direction || direction === "right")) {
        inside = bounds.left < size.width + offset.y;
    }
    if (inside && (!direction || direction === "top")) {
        inside = bounds.bottom > offset.y;
    }
    return inside;
}
function calculateBounds(point, radius) {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius,
    };
}
function deepExtend(destination, ...sources) {
    for (const source of sources) {
        if (source === undefined || source === null) {
            continue;
        }
        if (typeof source !== "object") {
            destination = source;
            continue;
        }
        const sourceIsArray = Array.isArray(source);
        if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
            destination = [];
        }
        else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
            destination = {};
        }
        for (const key in source) {
            if (key === "__proto__") {
                continue;
            }
            const sourceDict = source, value = sourceDict[key], isObject = typeof value === "object", destDict = destination;
            destDict[key] =
                isObject && Array.isArray(value)
                    ? value.map((v) => deepExtend(destDict[key], v))
                    : deepExtend(destDict[key], value);
        }
    }
    return destination;
}
function isDivModeEnabled(mode, divs) {
    return divs instanceof Array ? !!divs.find((t) => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}
function divModeExecute(mode, divs, callback) {
    if (divs instanceof Array) {
        for (const div of divs) {
            const divMode = div.mode, divEnabled = div.enable;
            if (divEnabled && isInArray(mode, divMode)) {
                singleDivModeExecute(div, callback);
            }
        }
    }
    else {
        const divMode = divs.mode, divEnabled = divs.enable;
        if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(divs, callback);
        }
    }
}
function singleDivModeExecute(div, callback) {
    const selectors = div.selectors;
    if (selectors instanceof Array) {
        for (const selector of selectors) {
            callback(selector, div);
        }
    }
    else {
        callback(selectors, div);
    }
}
function divMode(divs, element) {
    if (!element || !divs) {
        return;
    }
    if (divs instanceof Array) {
        return divs.find((d) => checkSelector(element, d.selectors));
    }
    else if (checkSelector(element, divs.selectors)) {
        return divs;
    }
}
function circleBounceDataFromParticle(p) {
    return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector.create((0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(p.options.bounce.horizontal), (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(p.options.bounce.vertical)),
    };
}
function circleBounce(p1, p2) {
    const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getDistances)(pos2, pos1);
    if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
    }
    const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.collisionVelocity)(u1, u2, m1, m2), v2 = (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.collisionVelocity)(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
    const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size);
    const resH = rectSideBounce({
        min: bounds.left,
        max: bounds.right,
    }, {
        min: bounds.top,
        max: bounds.bottom,
    }, {
        min: divBounds.left,
        max: divBounds.right,
    }, {
        min: divBounds.top,
        max: divBounds.bottom,
    }, particle.velocity.x, (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(particle.options.bounce.horizontal));
    if (resH.bounced) {
        if (resH.velocity !== undefined) {
            particle.velocity.x = resH.velocity;
        }
        if (resH.position !== undefined) {
            particle.position.x = resH.position;
        }
    }
    const resV = rectSideBounce({
        min: bounds.top,
        max: bounds.bottom,
    }, {
        min: bounds.left,
        max: bounds.right,
    }, {
        min: divBounds.top,
        max: divBounds.bottom,
    }, {
        min: divBounds.left,
        max: divBounds.right,
    }, particle.velocity.y, (0,_NumberUtils__WEBPACK_IMPORTED_MODULE_0__.getValue)(particle.options.bounce.vertical));
    if (resV.bounced) {
        if (resV.velocity !== undefined) {
            particle.velocity.y = resV.velocity;
        }
        if (resV.position !== undefined) {
            particle.position.y = resV.position;
        }
    }
}
function loadOptions(options, ...sourceOptionsArr) {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}
function loadContainerOptions(engine, ...sourceOptionsArr) {
    const options = new _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_1__.Options(engine);
    loadOptions(options, ...sourceOptionsArr);
    return options;
}
function loadParticlesOptions(...sourceOptionsArr) {
    const options = new _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_2__.ParticlesOptions();
    loadOptions(options, ...sourceOptionsArr);
    return options;
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/engine.js":
/*!*******************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/engine.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Engine": () => (/* binding */ Engine)
/* harmony export */ });
/* harmony import */ var _Utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils/EventDispatcher */ "./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js");
/* harmony import */ var _Core_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/Loader */ "./node_modules/tsparticles-engine/esm/Core/Loader.js");
/* harmony import */ var _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/Utils/Plugins */ "./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js");
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
var _Engine_initialized, _Engine_loader;



class Engine {
    constructor() {
        _Engine_initialized.set(this, void 0);
        _Engine_loader.set(this, void 0);
        this.domArray = [];
        this.eventDispatcher = new _Utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher();
        __classPrivateFieldSet(this, _Engine_initialized, false, "f");
        __classPrivateFieldSet(this, _Engine_loader, new _Core_Loader__WEBPACK_IMPORTED_MODULE_1__.Loader(this), "f");
        this.plugins = new _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_2__.Plugins(this);
    }
    init() {
        if (!__classPrivateFieldGet(this, _Engine_initialized, "f")) {
            __classPrivateFieldSet(this, _Engine_initialized, true, "f");
        }
    }
    async loadFromArray(tagId, options, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
    }
    async load(tagId, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
    }
    async set(id, element, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
    }
    async loadJSON(tagId, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
    }
    async setJSON(id, element, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
    }
    setOnClickHandler(callback) {
        __classPrivateFieldGet(this, _Engine_loader, "f").setOnClickHandler(callback);
    }
    dom() {
        return __classPrivateFieldGet(this, _Engine_loader, "f").dom();
    }
    domItem(index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").domItem(index);
    }
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
    async addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        this.plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
    }
    async addPreset(preset, options, override = false) {
        this.plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    async addPlugin(plugin) {
        this.plugins.addPlugin(plugin);
        await this.refresh();
    }
    async addPathGenerator(name, generator) {
        this.plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    async addInteractor(name, interactorInitializer) {
        this.plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    async addMover(name, moverInitializer) {
        this.plugins.addParticleMover(name, moverInitializer);
        await this.refresh();
    }
    async addParticleUpdater(name, updaterInitializer) {
        this.plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").addEventListener(type, listener);
    }
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").removeEventListener(type, listener);
    }
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Engine_loader, "f").dispatchEvent(type, args);
    }
}
_Engine_initialized = new WeakMap(), _Engine_loader = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/index.js":
/*!******************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimatableColor": () => (/* reexport safe */ _Options_Classes_AnimatableColor__WEBPACK_IMPORTED_MODULE_79__.AnimatableColor),
/* harmony export */   "AnimatableGradient": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.AnimatableGradient),
/* harmony export */   "AnimatableGradientColor": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.AnimatableGradientColor),
/* harmony export */   "AnimationOptions": () => (/* reexport safe */ _Options_Classes_AnimationOptions__WEBPACK_IMPORTED_MODULE_81__.AnimationOptions),
/* harmony export */   "Attract": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Attract__WEBPACK_IMPORTED_MODULE_94__.Attract),
/* harmony export */   "Background": () => (/* reexport safe */ _Options_Classes_Background_Background__WEBPACK_IMPORTED_MODULE_82__.Background),
/* harmony export */   "BackgroundMask": () => (/* reexport safe */ _Options_Classes_BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_83__.BackgroundMask),
/* harmony export */   "BackgroundMaskCover": () => (/* reexport safe */ _Options_Classes_BackgroundMask_BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_84__.BackgroundMaskCover),
/* harmony export */   "Bounce": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Bounce__WEBPACK_IMPORTED_MODULE_95__.Bounce),
/* harmony export */   "Bubble": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Bubble__WEBPACK_IMPORTED_MODULE_96__.Bubble),
/* harmony export */   "BubbleBase": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_BubbleBase__WEBPACK_IMPORTED_MODULE_97__.BubbleBase),
/* harmony export */   "BubbleDiv": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_BubbleDiv__WEBPACK_IMPORTED_MODULE_98__.BubbleDiv),
/* harmony export */   "Canvas": () => (/* reexport safe */ _Core_Canvas__WEBPACK_IMPORTED_MODULE_49__.Canvas),
/* harmony export */   "Circle": () => (/* reexport safe */ _Core_Utils_Circle__WEBPACK_IMPORTED_MODULE_34__.Circle),
/* harmony export */   "CircleWarp": () => (/* reexport safe */ _Core_Utils_CircleWarp__WEBPACK_IMPORTED_MODULE_35__.CircleWarp),
/* harmony export */   "ClickEvent": () => (/* reexport safe */ _Options_Classes_Interactivity_Events_ClickEvent__WEBPACK_IMPORTED_MODULE_88__.ClickEvent),
/* harmony export */   "Collisions": () => (/* reexport safe */ _Options_Classes_Particles_Collisions_Collisions__WEBPACK_IMPORTED_MODULE_122__.Collisions),
/* harmony export */   "CollisionsOverlap": () => (/* reexport safe */ _Options_Classes_Particles_Collisions_CollisionsOverlap__WEBPACK_IMPORTED_MODULE_123__.CollisionsOverlap),
/* harmony export */   "ColorAnimation": () => (/* reexport safe */ _Options_Classes_ColorAnimation__WEBPACK_IMPORTED_MODULE_85__.ColorAnimation),
/* harmony export */   "Connect": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Connect__WEBPACK_IMPORTED_MODULE_99__.Connect),
/* harmony export */   "ConnectLinks": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_ConnectLinks__WEBPACK_IMPORTED_MODULE_100__.ConnectLinks),
/* harmony export */   "Container": () => (/* reexport safe */ _Core_Container__WEBPACK_IMPORTED_MODULE_50__.Container),
/* harmony export */   "Destroy": () => (/* reexport safe */ _Options_Classes_Particles_Destroy_Destroy__WEBPACK_IMPORTED_MODULE_124__.Destroy),
/* harmony export */   "DivEvent": () => (/* reexport safe */ _Options_Classes_Interactivity_Events_DivEvent__WEBPACK_IMPORTED_MODULE_89__.DivEvent),
/* harmony export */   "Engine": () => (/* reexport safe */ _engine__WEBPACK_IMPORTED_MODULE_0__.Engine),
/* harmony export */   "EventListeners": () => (/* reexport safe */ _Core_Utils_EventListeners__WEBPACK_IMPORTED_MODULE_37__.EventListeners),
/* harmony export */   "Events": () => (/* reexport safe */ _Options_Classes_Interactivity_Events_Events__WEBPACK_IMPORTED_MODULE_90__.Events),
/* harmony export */   "ExternalInteractorBase": () => (/* reexport safe */ _Core_Utils_ExternalInteractorBase__WEBPACK_IMPORTED_MODULE_38__.ExternalInteractorBase),
/* harmony export */   "FrameManager": () => (/* reexport safe */ _Core_Utils_FrameManager__WEBPACK_IMPORTED_MODULE_39__.FrameManager),
/* harmony export */   "FullScreen": () => (/* reexport safe */ _Options_Classes_FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_86__.FullScreen),
/* harmony export */   "Grab": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Grab__WEBPACK_IMPORTED_MODULE_101__.Grab),
/* harmony export */   "GrabLinks": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_GrabLinks__WEBPACK_IMPORTED_MODULE_102__.GrabLinks),
/* harmony export */   "GradientAngle": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.GradientAngle),
/* harmony export */   "GradientAngleAnimation": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.GradientAngleAnimation),
/* harmony export */   "GradientColorOpacity": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.GradientColorOpacity),
/* harmony export */   "GradientColorOpacityAnimation": () => (/* reexport safe */ _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__.GradientColorOpacityAnimation),
/* harmony export */   "HoverEvent": () => (/* reexport safe */ _Options_Classes_Interactivity_Events_HoverEvent__WEBPACK_IMPORTED_MODULE_91__.HoverEvent),
/* harmony export */   "HslAnimation": () => (/* reexport safe */ _Options_Classes_HslAnimation__WEBPACK_IMPORTED_MODULE_87__.HslAnimation),
/* harmony export */   "InteractionManager": () => (/* reexport safe */ _Core_Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_40__.InteractionManager),
/* harmony export */   "Interactivity": () => (/* reexport safe */ _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_93__.Interactivity),
/* harmony export */   "Life": () => (/* reexport safe */ _Options_Classes_Particles_Life_Life__WEBPACK_IMPORTED_MODULE_131__.Life),
/* harmony export */   "LifeDelay": () => (/* reexport safe */ _Options_Classes_Particles_Life_LifeDelay__WEBPACK_IMPORTED_MODULE_132__.LifeDelay),
/* harmony export */   "LifeDuration": () => (/* reexport safe */ _Options_Classes_Particles_Life_LifeDuration__WEBPACK_IMPORTED_MODULE_133__.LifeDuration),
/* harmony export */   "Light": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Light__WEBPACK_IMPORTED_MODULE_103__.Light),
/* harmony export */   "LightArea": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_LightArea__WEBPACK_IMPORTED_MODULE_104__.LightArea),
/* harmony export */   "LightGradient": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_LightGradient__WEBPACK_IMPORTED_MODULE_105__.LightGradient),
/* harmony export */   "LightShadow": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_LightShadow__WEBPACK_IMPORTED_MODULE_106__.LightShadow),
/* harmony export */   "Links": () => (/* reexport safe */ _Options_Classes_Particles_Links_Links__WEBPACK_IMPORTED_MODULE_134__.Links),
/* harmony export */   "LinksShadow": () => (/* reexport safe */ _Options_Classes_Particles_Links_LinksShadow__WEBPACK_IMPORTED_MODULE_135__.LinksShadow),
/* harmony export */   "LinksTriangle": () => (/* reexport safe */ _Options_Classes_Particles_Links_LinksTriangle__WEBPACK_IMPORTED_MODULE_136__.LinksTriangle),
/* harmony export */   "Loader": () => (/* reexport safe */ _Core_Loader__WEBPACK_IMPORTED_MODULE_51__.Loader),
/* harmony export */   "Main": () => (/* reexport safe */ _engine__WEBPACK_IMPORTED_MODULE_0__.Engine),
/* harmony export */   "ManualParticle": () => (/* reexport safe */ _Options_Classes_ManualParticle__WEBPACK_IMPORTED_MODULE_115__.ManualParticle),
/* harmony export */   "Modes": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Modes__WEBPACK_IMPORTED_MODULE_107__.Modes),
/* harmony export */   "Motion": () => (/* reexport safe */ _Options_Classes_Motion_Motion__WEBPACK_IMPORTED_MODULE_116__.Motion),
/* harmony export */   "MotionReduce": () => (/* reexport safe */ _Options_Classes_Motion_MotionReduce__WEBPACK_IMPORTED_MODULE_117__.MotionReduce),
/* harmony export */   "Move": () => (/* reexport safe */ _Options_Classes_Particles_Move_Move__WEBPACK_IMPORTED_MODULE_138__.Move),
/* harmony export */   "MoveAngle": () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveAngle__WEBPACK_IMPORTED_MODULE_139__.MoveAngle),
/* harmony export */   "MoveAttract": () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveAttract__WEBPACK_IMPORTED_MODULE_137__.MoveAttract),
/* harmony export */   "MoveGravity": () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveGravity__WEBPACK_IMPORTED_MODULE_140__.MoveGravity),
/* harmony export */   "MovePath": () => (/* reexport safe */ _Options_Classes_Particles_Move_Path_MovePath__WEBPACK_IMPORTED_MODULE_142__.MovePath),
/* harmony export */   "MovePathDelay": () => (/* reexport safe */ _Options_Classes_Particles_Move_Path_MovePathDelay__WEBPACK_IMPORTED_MODULE_143__.MovePathDelay),
/* harmony export */   "MoveTrail": () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveTrail__WEBPACK_IMPORTED_MODULE_145__.MoveTrail),
/* harmony export */   "Opacity": () => (/* reexport safe */ _Options_Classes_Particles_Opacity_Opacity__WEBPACK_IMPORTED_MODULE_148__.Opacity),
/* harmony export */   "OpacityAnimation": () => (/* reexport safe */ _Options_Classes_Particles_Opacity_OpacityAnimation__WEBPACK_IMPORTED_MODULE_149__.OpacityAnimation),
/* harmony export */   "Options": () => (/* reexport safe */ _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_118__.Options),
/* harmony export */   "OptionsColor": () => (/* reexport safe */ _Options_Classes_OptionsColor__WEBPACK_IMPORTED_MODULE_119__.OptionsColor),
/* harmony export */   "Orbit": () => (/* reexport safe */ _Options_Classes_Particles_Orbit_Orbit__WEBPACK_IMPORTED_MODULE_150__.Orbit),
/* harmony export */   "OrbitRotation": () => (/* reexport safe */ _Options_Classes_Particles_Orbit_OrbitRotation__WEBPACK_IMPORTED_MODULE_151__.OrbitRotation),
/* harmony export */   "OutModes": () => (/* reexport safe */ _Options_Classes_Particles_Move_OutModes__WEBPACK_IMPORTED_MODULE_141__.OutModes),
/* harmony export */   "Parallax": () => (/* reexport safe */ _Options_Classes_Interactivity_Events_Parallax__WEBPACK_IMPORTED_MODULE_92__.Parallax),
/* harmony export */   "Particle": () => (/* reexport safe */ _Core_Particle__WEBPACK_IMPORTED_MODULE_52__.Particle),
/* harmony export */   "Particles": () => (/* reexport safe */ _Core_Particles__WEBPACK_IMPORTED_MODULE_53__.Particles),
/* harmony export */   "ParticlesBounce": () => (/* reexport safe */ _Options_Classes_Particles_Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_120__.ParticlesBounce),
/* harmony export */   "ParticlesBounceFactor": () => (/* reexport safe */ _Options_Classes_Particles_Bounce_ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_121__.ParticlesBounceFactor),
/* harmony export */   "ParticlesDensity": () => (/* reexport safe */ _Options_Classes_Particles_Number_ParticlesDensity__WEBPACK_IMPORTED_MODULE_147__.ParticlesDensity),
/* harmony export */   "ParticlesInteractorBase": () => (/* reexport safe */ _Core_Utils_ParticlesInteractorBase__WEBPACK_IMPORTED_MODULE_41__.ParticlesInteractorBase),
/* harmony export */   "ParticlesNumber": () => (/* reexport safe */ _Options_Classes_Particles_Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_146__.ParticlesNumber),
/* harmony export */   "ParticlesOptions": () => (/* reexport safe */ _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_128__.ParticlesOptions),
/* harmony export */   "ParticlesRepulse": () => (/* reexport safe */ _Options_Classes_Particles_Repulse_ParticlesRepulse__WEBPACK_IMPORTED_MODULE_152__.ParticlesRepulse),
/* harmony export */   "Plugins": () => (/* reexport safe */ _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_42__.Plugins),
/* harmony export */   "Point": () => (/* reexport safe */ _Core_Utils_Point__WEBPACK_IMPORTED_MODULE_43__.Point),
/* harmony export */   "Push": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Push__WEBPACK_IMPORTED_MODULE_108__.Push),
/* harmony export */   "QuadTree": () => (/* reexport safe */ _Core_Utils_QuadTree__WEBPACK_IMPORTED_MODULE_44__.QuadTree),
/* harmony export */   "Range": () => (/* reexport safe */ _Core_Utils_Range__WEBPACK_IMPORTED_MODULE_45__.Range),
/* harmony export */   "Rectangle": () => (/* reexport safe */ _Core_Utils_Rectangle__WEBPACK_IMPORTED_MODULE_46__.Rectangle),
/* harmony export */   "Remove": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Remove__WEBPACK_IMPORTED_MODULE_109__.Remove),
/* harmony export */   "Repulse": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Repulse__WEBPACK_IMPORTED_MODULE_110__.Repulse),
/* harmony export */   "RepulseBase": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_RepulseBase__WEBPACK_IMPORTED_MODULE_111__.RepulseBase),
/* harmony export */   "RepulseDiv": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_RepulseDiv__WEBPACK_IMPORTED_MODULE_112__.RepulseDiv),
/* harmony export */   "Responsive": () => (/* reexport safe */ _Options_Classes_Responsive__WEBPACK_IMPORTED_MODULE_166__.Responsive),
/* harmony export */   "Retina": () => (/* reexport safe */ _Core_Retina__WEBPACK_IMPORTED_MODULE_54__.Retina),
/* harmony export */   "Roll": () => (/* reexport safe */ _Options_Classes_Particles_Roll_Roll__WEBPACK_IMPORTED_MODULE_153__.Roll),
/* harmony export */   "RollLight": () => (/* reexport safe */ _Options_Classes_Particles_Roll_RollLight__WEBPACK_IMPORTED_MODULE_154__.RollLight),
/* harmony export */   "Rotate": () => (/* reexport safe */ _Options_Classes_Particles_Rotate_Rotate__WEBPACK_IMPORTED_MODULE_155__.Rotate),
/* harmony export */   "RotateAnimation": () => (/* reexport safe */ _Options_Classes_Particles_Rotate_RotateAnimation__WEBPACK_IMPORTED_MODULE_156__.RotateAnimation),
/* harmony export */   "Shadow": () => (/* reexport safe */ _Options_Classes_Particles_Shadow__WEBPACK_IMPORTED_MODULE_129__.Shadow),
/* harmony export */   "Shape": () => (/* reexport safe */ _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_157__.Shape),
/* harmony export */   "Size": () => (/* reexport safe */ _Options_Classes_Particles_Size_Size__WEBPACK_IMPORTED_MODULE_158__.Size),
/* harmony export */   "SizeAnimation": () => (/* reexport safe */ _Options_Classes_Particles_Size_SizeAnimation__WEBPACK_IMPORTED_MODULE_159__.SizeAnimation),
/* harmony export */   "Slow": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Slow__WEBPACK_IMPORTED_MODULE_113__.Slow),
/* harmony export */   "Spin": () => (/* reexport safe */ _Options_Classes_Particles_Move_Spin__WEBPACK_IMPORTED_MODULE_144__.Spin),
/* harmony export */   "Split": () => (/* reexport safe */ _Options_Classes_Particles_Destroy_Split__WEBPACK_IMPORTED_MODULE_125__.Split),
/* harmony export */   "SplitFactor": () => (/* reexport safe */ _Options_Classes_Particles_Destroy_SplitFactor__WEBPACK_IMPORTED_MODULE_126__.SplitFactor),
/* harmony export */   "SplitRate": () => (/* reexport safe */ _Options_Classes_Particles_Destroy_SplitRate__WEBPACK_IMPORTED_MODULE_127__.SplitRate),
/* harmony export */   "Stroke": () => (/* reexport safe */ _Options_Classes_Particles_Stroke__WEBPACK_IMPORTED_MODULE_130__.Stroke),
/* harmony export */   "Theme": () => (/* reexport safe */ _Options_Classes_Theme_Theme__WEBPACK_IMPORTED_MODULE_167__.Theme),
/* harmony export */   "ThemeDefault": () => (/* reexport safe */ _Options_Classes_Theme_ThemeDefault__WEBPACK_IMPORTED_MODULE_168__.ThemeDefault),
/* harmony export */   "Tilt": () => (/* reexport safe */ _Options_Classes_Particles_Tilt_Tilt__WEBPACK_IMPORTED_MODULE_160__.Tilt),
/* harmony export */   "TiltAnimation": () => (/* reexport safe */ _Options_Classes_Particles_Tilt_TiltAnimation__WEBPACK_IMPORTED_MODULE_161__.TiltAnimation),
/* harmony export */   "Trail": () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Trail__WEBPACK_IMPORTED_MODULE_114__.Trail),
/* harmony export */   "Twinkle": () => (/* reexport safe */ _Options_Classes_Particles_Twinkle_Twinkle__WEBPACK_IMPORTED_MODULE_162__.Twinkle),
/* harmony export */   "TwinkleValues": () => (/* reexport safe */ _Options_Classes_Particles_Twinkle_TwinkleValues__WEBPACK_IMPORTED_MODULE_163__.TwinkleValues),
/* harmony export */   "ValueWithRandom": () => (/* reexport safe */ _Options_Classes_ValueWithRandom__WEBPACK_IMPORTED_MODULE_169__.ValueWithRandom),
/* harmony export */   "Vector": () => (/* reexport safe */ _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_47__.Vector),
/* harmony export */   "Vector3d": () => (/* reexport safe */ _Core_Utils_Vector3d__WEBPACK_IMPORTED_MODULE_48__.Vector3d),
/* harmony export */   "Wobble": () => (/* reexport safe */ _Options_Classes_Particles_Wobble_Wobble__WEBPACK_IMPORTED_MODULE_164__.Wobble),
/* harmony export */   "ZIndex": () => (/* reexport safe */ _Options_Classes_Particles_ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_165__.ZIndex),
/* harmony export */   "alterHsl": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.alterHsl),
/* harmony export */   "animate": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.animate),
/* harmony export */   "areBoundsInside": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.areBoundsInside),
/* harmony export */   "arrayRandomIndex": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.arrayRandomIndex),
/* harmony export */   "calcEasing": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcEasing),
/* harmony export */   "calcExactPositionOrRandomFromSize": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcExactPositionOrRandomFromSize),
/* harmony export */   "calcExactPositionOrRandomFromSizeRanged": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcExactPositionOrRandomFromSizeRanged),
/* harmony export */   "calcPositionFromSize": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcPositionFromSize),
/* harmony export */   "calcPositionOrRandomFromSize": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcPositionOrRandomFromSize),
/* harmony export */   "calcPositionOrRandomFromSizeRanged": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.calcPositionOrRandomFromSizeRanged),
/* harmony export */   "calculateBounds": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.calculateBounds),
/* harmony export */   "cancelAnimation": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.cancelAnimation),
/* harmony export */   "circleBounce": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.circleBounce),
/* harmony export */   "circleBounceDataFromParticle": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.circleBounceDataFromParticle),
/* harmony export */   "clamp": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.clamp),
/* harmony export */   "clear": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.clear),
/* harmony export */   "collisionVelocity": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.collisionVelocity),
/* harmony export */   "colorMix": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.colorMix),
/* harmony export */   "colorToHsl": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.colorToHsl),
/* harmony export */   "colorToRgb": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.colorToRgb),
/* harmony export */   "deepExtend": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.deepExtend),
/* harmony export */   "divMode": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.divMode),
/* harmony export */   "divModeExecute": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.divModeExecute),
/* harmony export */   "drawConnectLine": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawConnectLine),
/* harmony export */   "drawEllipse": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawEllipse),
/* harmony export */   "drawGrabLine": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawGrabLine),
/* harmony export */   "drawLine": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawLine),
/* harmony export */   "drawParticle": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawParticle),
/* harmony export */   "drawParticlePlugin": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawParticlePlugin),
/* harmony export */   "drawPlugin": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawPlugin),
/* harmony export */   "drawShape": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawShape),
/* harmony export */   "drawShapeAfterEffect": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawShapeAfterEffect),
/* harmony export */   "drawTriangle": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.drawTriangle),
/* harmony export */   "generatedAttribute": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.generatedAttribute),
/* harmony export */   "getDistance": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getDistance),
/* harmony export */   "getDistances": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getDistances),
/* harmony export */   "getHslAnimationFromHsl": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getHslAnimationFromHsl),
/* harmony export */   "getHslFromAnimation": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getHslFromAnimation),
/* harmony export */   "getLinkColor": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getLinkColor),
/* harmony export */   "getLinkRandomColor": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getLinkRandomColor),
/* harmony export */   "getParticleBaseVelocity": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getParticleBaseVelocity),
/* harmony export */   "getParticleDirectionAngle": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getParticleDirectionAngle),
/* harmony export */   "getRandomRgbColor": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getRandomRgbColor),
/* harmony export */   "getRangeMax": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getRangeMax),
/* harmony export */   "getRangeMin": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getRangeMin),
/* harmony export */   "getRangeValue": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getRangeValue),
/* harmony export */   "getStyleFromHsl": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getStyleFromHsl),
/* harmony export */   "getStyleFromHsv": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getStyleFromHsv),
/* harmony export */   "getStyleFromRgb": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.getStyleFromRgb),
/* harmony export */   "getValue": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.getValue),
/* harmony export */   "gradient": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.gradient),
/* harmony export */   "hslToHsv": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hslToHsv),
/* harmony export */   "hslToRgb": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hslToRgb),
/* harmony export */   "hslaToHsva": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hslaToHsva),
/* harmony export */   "hslaToRgba": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hslaToRgba),
/* harmony export */   "hsvToHsl": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hsvToHsl),
/* harmony export */   "hsvToRgb": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hsvToRgb),
/* harmony export */   "hsvaToHsla": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hsvaToHsla),
/* harmony export */   "hsvaToRgba": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.hsvaToRgba),
/* harmony export */   "isDivModeEnabled": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.isDivModeEnabled),
/* harmony export */   "isInArray": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.isInArray),
/* harmony export */   "isPointInside": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.isPointInside),
/* harmony export */   "isSsr": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.isSsr),
/* harmony export */   "itemFromArray": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.itemFromArray),
/* harmony export */   "loadContainerOptions": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.loadContainerOptions),
/* harmony export */   "loadFont": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.loadFont),
/* harmony export */   "loadParticlesOptions": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.loadParticlesOptions),
/* harmony export */   "midColorValue": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.midColorValue),
/* harmony export */   "mix": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.mix),
/* harmony export */   "mouseDownEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.mouseDownEvent),
/* harmony export */   "mouseLeaveEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.mouseLeaveEvent),
/* harmony export */   "mouseMoveEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.mouseMoveEvent),
/* harmony export */   "mouseOutEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.mouseOutEvent),
/* harmony export */   "mouseUpEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.mouseUpEvent),
/* harmony export */   "noPolygonDataLoaded": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.noPolygonDataLoaded),
/* harmony export */   "noPolygonFound": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.noPolygonFound),
/* harmony export */   "paintBase": () => (/* reexport safe */ _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__.paintBase),
/* harmony export */   "randomColorValue": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.randomColorValue),
/* harmony export */   "randomInRange": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.randomInRange),
/* harmony export */   "rectBounce": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.rectBounce),
/* harmony export */   "resizeEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.resizeEvent),
/* harmony export */   "rgbToHsl": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.rgbToHsl),
/* harmony export */   "rgbToHsv": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.rgbToHsv),
/* harmony export */   "rgbaToHsva": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.rgbaToHsva),
/* harmony export */   "setRangeValue": () => (/* reexport safe */ _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__.setRangeValue),
/* harmony export */   "singleDivModeExecute": () => (/* reexport safe */ _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__.singleDivModeExecute),
/* harmony export */   "stringToAlpha": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.stringToAlpha),
/* harmony export */   "stringToRgb": () => (/* reexport safe */ _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__.stringToRgb),
/* harmony export */   "touchCancelEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.touchCancelEvent),
/* harmony export */   "touchEndEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.touchEndEvent),
/* harmony export */   "touchMoveEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.touchMoveEvent),
/* harmony export */   "touchStartEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.touchStartEvent),
/* harmony export */   "tsParticles": () => (/* binding */ tsParticles),
/* harmony export */   "visibilityChangeEvent": () => (/* reexport safe */ _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__.visibilityChangeEvent)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./node_modules/tsparticles-engine/esm/engine.js");
/* harmony import */ var _Core_Interfaces_Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/Interfaces/Colors */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js");
/* harmony import */ var _Core_Interfaces_Gradients__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/Interfaces/Gradients */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Gradients.js");
/* harmony import */ var _Core_Interfaces_IBounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core/Interfaces/IBounds */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js");
/* harmony import */ var _Core_Interfaces_IBubbleParticleData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Core/Interfaces/IBubbleParticleData */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js");
/* harmony import */ var _Core_Interfaces_ICircleBouncer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Core/Interfaces/ICircleBouncer */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js");
/* harmony import */ var _Core_Interfaces_IContainerInteractivity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Core/Interfaces/IContainerInteractivity */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js");
/* harmony import */ var _Core_Interfaces_IContainerPlugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Core/Interfaces/IContainerPlugin */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js");
/* harmony import */ var _Core_Interfaces_ICoordinates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Core/Interfaces/ICoordinates */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js");
/* harmony import */ var _Core_Interfaces_IDelta__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Core/Interfaces/IDelta */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js");
/* harmony import */ var _Core_Interfaces_IDimension__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Core/Interfaces/IDimension */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js");
/* harmony import */ var _Core_Interfaces_IDistance__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Core/Interfaces/IDistance */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js");
/* harmony import */ var _Core_Interfaces_IExternalInteractor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Core/Interfaces/IExternalInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js");
/* harmony import */ var _Core_Interfaces_IInteractor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Core/Interfaces/IInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js");
/* harmony import */ var _Core_Interfaces_IMouseData__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Core/Interfaces/IMouseData */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js");
/* harmony import */ var _Core_Interfaces_IMovePathGenerator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Core/Interfaces/IMovePathGenerator */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js");
/* harmony import */ var _Core_Interfaces_IParticle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Core/Interfaces/IParticle */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js");
/* harmony import */ var _Core_Interfaces_IParticleColorStyle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Core/Interfaces/IParticleColorStyle */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js");
/* harmony import */ var _Core_Interfaces_IParticleGravity__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Core/Interfaces/IParticleGravity */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleGravity.js");
/* harmony import */ var _Core_Interfaces_IParticleHslAnimation__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Core/Interfaces/IParticleHslAnimation */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js");
/* harmony import */ var _Core_Interfaces_IParticlesInteractor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Core/Interfaces/IParticlesInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js");
/* harmony import */ var _Core_Interfaces_IParticleLife__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Core/Interfaces/IParticleLife */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js");
/* harmony import */ var _Core_Interfaces_IParticleLoops__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Core/Interfaces/IParticleLoops */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLoops.js");
/* harmony import */ var _Core_Interfaces_IParticleRetinaProps__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRetinaProps */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js");
/* harmony import */ var _Core_Interfaces_IParticleRoll__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRoll */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js");
/* harmony import */ var _Core_Interfaces_IParticleUpdater__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Core/Interfaces/IParticleUpdater */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js");
/* harmony import */ var _Core_Interfaces_IParticleValueAnimation__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Core/Interfaces/IParticleValueAnimation */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js");
/* harmony import */ var _Core_Interfaces_IParticleWobble__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Core/Interfaces/IParticleWobble */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js");
/* harmony import */ var _Core_Interfaces_IParticlesMover__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Core/Interfaces/IParticlesMover */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js");
/* harmony import */ var _Core_Interfaces_IPlugin__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Core/Interfaces/IPlugin */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js");
/* harmony import */ var _Core_Interfaces_IRangeValue__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Core/Interfaces/IRangeValue */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js");
/* harmony import */ var _Core_Interfaces_IRectSideResult__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Core/Interfaces/IRectSideResult */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js");
/* harmony import */ var _Core_Interfaces_IShapeDrawer__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Core/Interfaces/IShapeDrawer */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js");
/* harmony import */ var _Core_Interfaces_IShapeValues__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Core/Interfaces/IShapeValues */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js");
/* harmony import */ var _Core_Utils_Circle__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Core/Utils/Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony import */ var _Core_Utils_CircleWarp__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Core/Utils/CircleWarp */ "./node_modules/tsparticles-engine/esm/Core/Utils/CircleWarp.js");
/* harmony import */ var _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Core/Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony import */ var _Core_Utils_EventListeners__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Core/Utils/EventListeners */ "./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js");
/* harmony import */ var _Core_Utils_ExternalInteractorBase__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Core/Utils/ExternalInteractorBase */ "./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js");
/* harmony import */ var _Core_Utils_FrameManager__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Core/Utils/FrameManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js");
/* harmony import */ var _Core_Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./Core/Utils/InteractionManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js");
/* harmony import */ var _Core_Utils_ParticlesInteractorBase__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Core/Utils/ParticlesInteractorBase */ "./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js");
/* harmony import */ var _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Core/Utils/Plugins */ "./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js");
/* harmony import */ var _Core_Utils_Point__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Core/Utils/Point */ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js");
/* harmony import */ var _Core_Utils_QuadTree__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Core/Utils/QuadTree */ "./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js");
/* harmony import */ var _Core_Utils_Range__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./Core/Utils/Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");
/* harmony import */ var _Core_Utils_Rectangle__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Core/Utils/Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");
/* harmony import */ var _Core_Utils_Vector3d__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./Core/Utils/Vector3d */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js");
/* harmony import */ var _Core_Canvas__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Core/Canvas */ "./node_modules/tsparticles-engine/esm/Core/Canvas.js");
/* harmony import */ var _Core_Container__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Core/Container */ "./node_modules/tsparticles-engine/esm/Core/Container.js");
/* harmony import */ var _Core_Loader__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./Core/Loader */ "./node_modules/tsparticles-engine/esm/Core/Loader.js");
/* harmony import */ var _Core_Particle__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./Core/Particle */ "./node_modules/tsparticles-engine/esm/Core/Particle.js");
/* harmony import */ var _Core_Particles__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Core/Particles */ "./node_modules/tsparticles-engine/esm/Core/Particles.js");
/* harmony import */ var _Core_Retina__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Core/Retina */ "./node_modules/tsparticles-engine/esm/Core/Retina.js");
/* harmony import */ var _Enums_Directions_MoveDirection__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Enums/Directions/MoveDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js");
/* harmony import */ var _Enums_Directions_RotateDirection__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Enums/Directions/RotateDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js");
/* harmony import */ var _Enums_Directions_OutModeDirection__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Enums/Directions/OutModeDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js");
/* harmony import */ var _Enums_Directions_TiltDirection__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./Enums/Directions/TiltDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/TiltDirection.js");
/* harmony import */ var _Enums_Modes_ClickMode__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./Enums/Modes/ClickMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js");
/* harmony import */ var _Enums_Modes_DestroyMode__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Enums/Modes/DestroyMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/DestroyMode.js");
/* harmony import */ var _Enums_Modes_DivMode__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./Enums/Modes/DivMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js");
/* harmony import */ var _Enums_Modes_HoverMode__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./Enums/Modes/HoverMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js");
/* harmony import */ var _Enums_Modes_CollisionMode__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./Enums/Modes/CollisionMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js");
/* harmony import */ var _Enums_Modes_OutMode__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./Enums/Modes/OutMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js");
/* harmony import */ var _Enums_Modes_RollMode__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./Enums/Modes/RollMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/RollMode.js");
/* harmony import */ var _Enums_Modes_SizeMode__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Enums/Modes/SizeMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js");
/* harmony import */ var _Enums_Modes_ThemeMode__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Enums/Modes/ThemeMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js");
/* harmony import */ var _Enums_Modes_ResponsiveMode__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./Enums/Modes/ResponsiveMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js");
/* harmony import */ var _Enums_Types_AlterType__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./Enums/Types/AlterType */ "./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js");
/* harmony import */ var _Enums_Types_DestroyType__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./Enums/Types/DestroyType */ "./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js");
/* harmony import */ var _Enums_Types_GradientType__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./Enums/Types/GradientType */ "./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js");
/* harmony import */ var _Enums_Types_InteractorType__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Enums/Types/InteractorType */ "./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js");
/* harmony import */ var _Enums_Types_ParticleOutType__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./Enums/Types/ParticleOutType */ "./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js");
/* harmony import */ var _Enums_Types_StartValueType__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./Enums/Types/StartValueType */ "./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js");
/* harmony import */ var _Enums_Types_DivType__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./Enums/Types/DivType */ "./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js");
/* harmony import */ var _Enums_Types_EasingType__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./Enums/Types/EasingType */ "./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js");
/* harmony import */ var _Enums_AnimationStatus__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./Enums/AnimationStatus */ "./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js");
/* harmony import */ var _Enums_InteractivityDetect__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./Enums/InteractivityDetect */ "./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js");
/* harmony import */ var _Options_Classes_AnimatableColor__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./Options/Classes/AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");
/* harmony import */ var _Options_Classes_AnimatableGradient__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./Options/Classes/AnimatableGradient */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableGradient.js");
/* harmony import */ var _Options_Classes_AnimationOptions__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./Options/Classes/AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");
/* harmony import */ var _Options_Classes_Background_Background__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./Options/Classes/Background/Background */ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js");
/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js");
/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js");
/* harmony import */ var _Options_Classes_ColorAnimation__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./Options/Classes/ColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js");
/* harmony import */ var _Options_Classes_FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./Options/Classes/FullScreen/FullScreen */ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js");
/* harmony import */ var _Options_Classes_HslAnimation__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./Options/Classes/HslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js");
/* harmony import */ var _Options_Classes_Interactivity_Events_ClickEvent__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/ClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js");
/* harmony import */ var _Options_Classes_Interactivity_Events_DivEvent__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/DivEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js");
/* harmony import */ var _Options_Classes_Interactivity_Events_Events__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Events */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js");
/* harmony import */ var _Options_Classes_Interactivity_Events_HoverEvent__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/HoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js");
/* harmony import */ var _Options_Classes_Interactivity_Events_Parallax__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Parallax */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js");
/* harmony import */ var _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Interactivity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Attract__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Attract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Attract.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Bounce__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Bounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bounce.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Bubble__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Bubble */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Bubble.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_BubbleBase__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/BubbleBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleBase.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_BubbleDiv__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/BubbleDiv */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/BubbleDiv.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Connect__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Connect */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Connect.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_ConnectLinks__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/ConnectLinks */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/ConnectLinks.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Grab__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Grab */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Grab.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_GrabLinks__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/GrabLinks */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/GrabLinks.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Light__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Light */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Light.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_LightArea__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/LightArea */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightArea.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_LightGradient__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/LightGradient */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightGradient.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_LightShadow__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/LightShadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/LightShadow.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Modes__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Modes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Push__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Push */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Push.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Remove__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Remove */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Remove.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Repulse__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Repulse */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Repulse.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_RepulseBase__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/RepulseBase */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseBase.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_RepulseDiv__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/RepulseDiv */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/RepulseDiv.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Slow__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Slow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Slow.js");
/* harmony import */ var _Options_Classes_Interactivity_Modes_Trail__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Trail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Trail.js");
/* harmony import */ var _Options_Classes_ManualParticle__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./Options/Classes/ManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js");
/* harmony import */ var _Options_Classes_Motion_Motion__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./Options/Classes/Motion/Motion */ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/Motion.js");
/* harmony import */ var _Options_Classes_Motion_MotionReduce__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./Options/Classes/Motion/MotionReduce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Motion/MotionReduce.js");
/* harmony import */ var _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./Options/Classes/Options */ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js");
/* harmony import */ var _Options_Classes_OptionsColor__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./Options/Classes/OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");
/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");
/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounceFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js");
/* harmony import */ var _Options_Classes_Particles_Collisions_Collisions__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/Collisions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js");
/* harmony import */ var _Options_Classes_Particles_Collisions_CollisionsOverlap__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/CollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js");
/* harmony import */ var _Options_Classes_Particles_Destroy_Destroy__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./Options/Classes/Particles/Destroy/Destroy */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Destroy.js");
/* harmony import */ var _Options_Classes_Particles_Destroy_Split__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./Options/Classes/Particles/Destroy/Split */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/Split.js");
/* harmony import */ var _Options_Classes_Particles_Destroy_SplitFactor__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./Options/Classes/Particles/Destroy/SplitFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitFactor.js");
/* harmony import */ var _Options_Classes_Particles_Destroy_SplitRate__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./Options/Classes/Particles/Destroy/SplitRate */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Destroy/SplitRate.js");
/* harmony import */ var _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./Options/Classes/Particles/ParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js");
/* harmony import */ var _Options_Classes_Particles_Shadow__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./Options/Classes/Particles/Shadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js");
/* harmony import */ var _Options_Classes_Particles_Stroke__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./Options/Classes/Particles/Stroke */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js");
/* harmony import */ var _Options_Classes_Particles_Life_Life__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./Options/Classes/Particles/Life/Life */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/Life.js");
/* harmony import */ var _Options_Classes_Particles_Life_LifeDelay__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./Options/Classes/Particles/Life/LifeDelay */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDelay.js");
/* harmony import */ var _Options_Classes_Particles_Life_LifeDuration__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./Options/Classes/Particles/Life/LifeDuration */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Life/LifeDuration.js");
/* harmony import */ var _Options_Classes_Particles_Links_Links__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./Options/Classes/Particles/Links/Links */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/Links.js");
/* harmony import */ var _Options_Classes_Particles_Links_LinksShadow__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./Options/Classes/Particles/Links/LinksShadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksShadow.js");
/* harmony import */ var _Options_Classes_Particles_Links_LinksTriangle__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./Options/Classes/Particles/Links/LinksTriangle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Links/LinksTriangle.js");
/* harmony import */ var _Options_Classes_Particles_Move_MoveAttract__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js");
/* harmony import */ var _Options_Classes_Particles_Move_Move__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Move */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js");
/* harmony import */ var _Options_Classes_Particles_Move_MoveAngle__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js");
/* harmony import */ var _Options_Classes_Particles_Move_MoveGravity__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js");
/* harmony import */ var _Options_Classes_Particles_Move_OutModes__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/OutModes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js");
/* harmony import */ var _Options_Classes_Particles_Move_Path_MovePath__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Path/MovePath */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js");
/* harmony import */ var _Options_Classes_Particles_Move_Path_MovePathDelay__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Path/MovePathDelay */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePathDelay.js");
/* harmony import */ var _Options_Classes_Particles_Move_Spin__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Spin */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js");
/* harmony import */ var _Options_Classes_Particles_Move_MoveTrail__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js");
/* harmony import */ var _Options_Classes_Particles_Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js");
/* harmony import */ var _Options_Classes_Particles_Number_ParticlesDensity__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js");
/* harmony import */ var _Options_Classes_Particles_Opacity_Opacity__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/Opacity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js");
/* harmony import */ var _Options_Classes_Particles_Opacity_OpacityAnimation__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/OpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js");
/* harmony import */ var _Options_Classes_Particles_Orbit_Orbit__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./Options/Classes/Particles/Orbit/Orbit */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/Orbit.js");
/* harmony import */ var _Options_Classes_Particles_Orbit_OrbitRotation__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./Options/Classes/Particles/Orbit/OrbitRotation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Orbit/OrbitRotation.js");
/* harmony import */ var _Options_Classes_Particles_Repulse_ParticlesRepulse__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./Options/Classes/Particles/Repulse/ParticlesRepulse */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Repulse/ParticlesRepulse.js");
/* harmony import */ var _Options_Classes_Particles_Roll_Roll__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./Options/Classes/Particles/Roll/Roll */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/Roll.js");
/* harmony import */ var _Options_Classes_Particles_Roll_RollLight__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./Options/Classes/Particles/Roll/RollLight */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Roll/RollLight.js");
/* harmony import */ var _Options_Classes_Particles_Rotate_Rotate__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./Options/Classes/Particles/Rotate/Rotate */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/Rotate.js");
/* harmony import */ var _Options_Classes_Particles_Rotate_RotateAnimation__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./Options/Classes/Particles/Rotate/RotateAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Rotate/RotateAnimation.js");
/* harmony import */ var _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./Options/Classes/Particles/Shape/Shape */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js");
/* harmony import */ var _Options_Classes_Particles_Size_Size__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/Size */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js");
/* harmony import */ var _Options_Classes_Particles_Size_SizeAnimation__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/SizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js");
/* harmony import */ var _Options_Classes_Particles_Tilt_Tilt__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./Options/Classes/Particles/Tilt/Tilt */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/Tilt.js");
/* harmony import */ var _Options_Classes_Particles_Tilt_TiltAnimation__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./Options/Classes/Particles/Tilt/TiltAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Tilt/TiltAnimation.js");
/* harmony import */ var _Options_Classes_Particles_Twinkle_Twinkle__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./Options/Classes/Particles/Twinkle/Twinkle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/Twinkle.js");
/* harmony import */ var _Options_Classes_Particles_Twinkle_TwinkleValues__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./Options/Classes/Particles/Twinkle/TwinkleValues */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Twinkle/TwinkleValues.js");
/* harmony import */ var _Options_Classes_Particles_Wobble_Wobble__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./Options/Classes/Particles/Wobble/Wobble */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Wobble/Wobble.js");
/* harmony import */ var _Options_Classes_Particles_ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./Options/Classes/Particles/ZIndex/ZIndex */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js");
/* harmony import */ var _Options_Classes_Responsive__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./Options/Classes/Responsive */ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js");
/* harmony import */ var _Options_Classes_Theme_Theme__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./Options/Classes/Theme/Theme */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js");
/* harmony import */ var _Options_Classes_Theme_ThemeDefault__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./Options/Classes/Theme/ThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js");
/* harmony import */ var _Options_Classes_ValueWithRandom__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./Options/Classes/ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Options_Interfaces_Background_IBackground__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./Options/Interfaces/Background/IBackground */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js");
/* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMask__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js");
/* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMaskCover__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js");
/* harmony import */ var _Options_Interfaces_FullScreen_IFullScreen__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./Options/Interfaces/FullScreen/IFullScreen */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js");
/* harmony import */ var _Options_Interfaces_IAnimatable__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatable */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js");
/* harmony import */ var _Options_Interfaces_IAnimatableColor__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js");
/* harmony import */ var _Options_Interfaces_IAnimatableGradient__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatableGradient */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableGradient.js");
/* harmony import */ var _Options_Interfaces_IAnimation__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./Options/Interfaces/IAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js");
/* harmony import */ var _Options_Interfaces_IColorAnimation__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(/*! ./Options/Interfaces/IColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js");
/* harmony import */ var _Options_Interfaces_IHslAnimation__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(/*! ./Options/Interfaces/IHslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js");
/* harmony import */ var _Options_Interfaces_IManualParticle__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(/*! ./Options/Interfaces/IManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js");
/* harmony import */ var _Options_Interfaces_IOptionLoader__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(/*! ./Options/Interfaces/IOptionLoader */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js");
/* harmony import */ var _Options_Interfaces_IOptions__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(/*! ./Options/Interfaces/IOptions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js");
/* harmony import */ var _Options_Interfaces_IOptionsColor__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(/*! ./Options/Interfaces/IOptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js");
/* harmony import */ var _Options_Interfaces_IOptionsGradient__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(/*! ./Options/Interfaces/IOptionsGradient */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsGradient.js");
/* harmony import */ var _Options_Interfaces_IResponsive__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(/*! ./Options/Interfaces/IResponsive */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js");
/* harmony import */ var _Options_Interfaces_IValueWithRandom__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(/*! ./Options/Interfaces/IValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Events_IClickEvent__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Events_IDivEvent__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IDivEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Events_IEvents__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IEvents */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Events_IHoverEvent__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IHoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Events_IParallax__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IParallax */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IAttract__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IAttract */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IAttract.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IBounce__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IBounce */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBounce.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IBubble__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IBubble */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubble.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IBubbleBase__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IBubbleBase */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleBase.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IBubbleDiv__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IBubbleDiv */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IBubbleDiv.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IConnect__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IConnect */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnect.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IConnectLinks__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IConnectLinks */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IConnectLinks.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IGrab__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IGrab */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrab.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IGrabLinks__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IGrabLinks */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IGrabLinks.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ILight__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ILight */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILight.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ILightArea__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ILightArea */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightArea.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ILightGradient__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ILightGradient */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightGradient.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ILightShadow__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ILightShadow */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ILightShadow.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModeDiv__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModeDiv */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModes__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModes */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IPush__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IPush */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IPush.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IRemove__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IRemove */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRemove.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IRepulse__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IRepulse */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulse.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IRepulseBase__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IRepulseBase */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseBase.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IRepulseDiv__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IRepulseDiv */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IRepulseDiv.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ISlow__WEBPACK_IMPORTED_MODULE_212__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ISlow */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ISlow.js");
/* harmony import */ var _Options_Interfaces_Interactivity_Modes_ITrail__WEBPACK_IMPORTED_MODULE_213__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/ITrail */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/ITrail.js");
/* harmony import */ var _Options_Interfaces_Interactivity_IInteractivity__WEBPACK_IMPORTED_MODULE_214__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/IInteractivity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js");
/* harmony import */ var _Options_Interfaces_Motion_IMotion__WEBPACK_IMPORTED_MODULE_215__ = __webpack_require__(/*! ./Options/Interfaces/Motion/IMotion */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotion.js");
/* harmony import */ var _Options_Interfaces_Motion_IMotionReduce__WEBPACK_IMPORTED_MODULE_216__ = __webpack_require__(/*! ./Options/Interfaces/Motion/IMotionReduce */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Motion/IMotionReduce.js");
/* harmony import */ var _Options_Interfaces_Particles_Bounce_IParticlesBounce__WEBPACK_IMPORTED_MODULE_217__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Bounce/IParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js");
/* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisions__WEBPACK_IMPORTED_MODULE_218__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js");
/* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisionsOverlap__WEBPACK_IMPORTED_MODULE_219__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js");
/* harmony import */ var _Options_Interfaces_Particles_Destroy_IDestroy__WEBPACK_IMPORTED_MODULE_220__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Destroy/IDestroy */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/IDestroy.js");
/* harmony import */ var _Options_Interfaces_Particles_Destroy_ISplit__WEBPACK_IMPORTED_MODULE_221__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Destroy/ISplit */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Destroy/ISplit.js");
/* harmony import */ var _Options_Interfaces_Particles_IParticlesOptions__WEBPACK_IMPORTED_MODULE_222__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js");
/* harmony import */ var _Options_Interfaces_Particles_IShadow__WEBPACK_IMPORTED_MODULE_223__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IShadow */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js");
/* harmony import */ var _Options_Interfaces_Particles_IStroke__WEBPACK_IMPORTED_MODULE_224__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IStroke */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js");
/* harmony import */ var _Options_Interfaces_Particles_Life_ILife__WEBPACK_IMPORTED_MODULE_225__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Life/ILife */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILife.js");
/* harmony import */ var _Options_Interfaces_Particles_Life_ILifeDelay__WEBPACK_IMPORTED_MODULE_226__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Life/ILifeDelay */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDelay.js");
/* harmony import */ var _Options_Interfaces_Particles_Life_ILifeDuration__WEBPACK_IMPORTED_MODULE_227__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Life/ILifeDuration */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Life/ILifeDuration.js");
/* harmony import */ var _Options_Interfaces_Particles_Links_ILinks__WEBPACK_IMPORTED_MODULE_228__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Links/ILinks */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinks.js");
/* harmony import */ var _Options_Interfaces_Particles_Links_ILinksShadow__WEBPACK_IMPORTED_MODULE_229__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Links/ILinksShadow */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksShadow.js");
/* harmony import */ var _Options_Interfaces_Particles_Links_ILinksTriangle__WEBPACK_IMPORTED_MODULE_230__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Links/ILinksTriangle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Links/ILinksTriangle.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAttract__WEBPACK_IMPORTED_MODULE_231__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IMove__WEBPACK_IMPORTED_MODULE_232__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMove */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAngle__WEBPACK_IMPORTED_MODULE_233__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveGravity__WEBPACK_IMPORTED_MODULE_234__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_Path_IMovePath__WEBPACK_IMPORTED_MODULE_235__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/Path/IMovePath */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IOutModes__WEBPACK_IMPORTED_MODULE_236__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IOutModes */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_ISpin__WEBPACK_IMPORTED_MODULE_237__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/ISpin */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js");
/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveTrail__WEBPACK_IMPORTED_MODULE_238__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js");
/* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesDensity__WEBPACK_IMPORTED_MODULE_239__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js");
/* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesNumber__WEBPACK_IMPORTED_MODULE_240__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js");
/* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacity__WEBPACK_IMPORTED_MODULE_241__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js");
/* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacityAnimation__WEBPACK_IMPORTED_MODULE_242__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js");
/* harmony import */ var _Options_Interfaces_Particles_Orbit_IOrbit__WEBPACK_IMPORTED_MODULE_243__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Orbit/IOrbit */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Orbit/IOrbit.js");
/* harmony import */ var _Options_Interfaces_Particles_Repulse_IParticlesRepulse__WEBPACK_IMPORTED_MODULE_244__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Repulse/IParticlesRepulse */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Repulse/IParticlesRepulse.js");
/* harmony import */ var _Options_Interfaces_Particles_Roll_IRoll__WEBPACK_IMPORTED_MODULE_245__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Roll/IRoll */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRoll.js");
/* harmony import */ var _Options_Interfaces_Particles_Roll_IRollLight__WEBPACK_IMPORTED_MODULE_246__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Roll/IRollLight */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Roll/IRollLight.js");
/* harmony import */ var _Options_Interfaces_Particles_Rotate_IRotate__WEBPACK_IMPORTED_MODULE_247__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Rotate/IRotate */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotate.js");
/* harmony import */ var _Options_Interfaces_Particles_Rotate_IRotateAnimation__WEBPACK_IMPORTED_MODULE_248__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Rotate/IRotateAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Rotate/IRotateAnimation.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_ICharacterShape__WEBPACK_IMPORTED_MODULE_249__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/ICharacterShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_IImageShape__WEBPACK_IMPORTED_MODULE_250__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IImageShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_IPolygonShape__WEBPACK_IMPORTED_MODULE_251__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IPolygonShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_IShape__WEBPACK_IMPORTED_MODULE_252__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_IShapeValues__WEBPACK_IMPORTED_MODULE_253__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IShapeValues */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js");
/* harmony import */ var _Options_Interfaces_Particles_Shape_IStarShape__WEBPACK_IMPORTED_MODULE_254__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IStarShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js");
/* harmony import */ var _Options_Interfaces_Particles_Size_ISize__WEBPACK_IMPORTED_MODULE_255__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISize */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js");
/* harmony import */ var _Options_Interfaces_Particles_Size_ISizeAnimation__WEBPACK_IMPORTED_MODULE_256__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js");
/* harmony import */ var _Options_Interfaces_Particles_Tilt_ITilt__WEBPACK_IMPORTED_MODULE_257__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Tilt/ITilt */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITilt.js");
/* harmony import */ var _Options_Interfaces_Particles_Tilt_ITiltAnimation__WEBPACK_IMPORTED_MODULE_258__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Tilt/ITiltAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Tilt/ITiltAnimation.js");
/* harmony import */ var _Options_Interfaces_Particles_Twinkle_ITwinkle__WEBPACK_IMPORTED_MODULE_259__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Twinkle/ITwinkle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkle.js");
/* harmony import */ var _Options_Interfaces_Particles_Twinkle_ITwinkleValues__WEBPACK_IMPORTED_MODULE_260__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Twinkle/ITwinkleValues */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Twinkle/ITwinkleValues.js");
/* harmony import */ var _Options_Interfaces_Particles_Wobble_IWobble__WEBPACK_IMPORTED_MODULE_261__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Wobble/IWobble */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Wobble/IWobble.js");
/* harmony import */ var _Options_Interfaces_Particles_ZIndex_IZIndex__WEBPACK_IMPORTED_MODULE_262__ = __webpack_require__(/*! ./Options/Interfaces/Particles/ZIndex/IZIndex */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js");
/* harmony import */ var _Options_Interfaces_Theme_ITheme__WEBPACK_IMPORTED_MODULE_263__ = __webpack_require__(/*! ./Options/Interfaces/Theme/ITheme */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js");
/* harmony import */ var _Options_Interfaces_Theme_IThemeDefault__WEBPACK_IMPORTED_MODULE_264__ = __webpack_require__(/*! ./Options/Interfaces/Theme/IThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js");
/* harmony import */ var _Types_RangeValue__WEBPACK_IMPORTED_MODULE_265__ = __webpack_require__(/*! ./Types/RangeValue */ "./node_modules/tsparticles-engine/esm/Types/RangeValue.js");
/* harmony import */ var _Types_RecursivePartial__WEBPACK_IMPORTED_MODULE_266__ = __webpack_require__(/*! ./Types/RecursivePartial */ "./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js");
/* harmony import */ var _Types_ShapeData__WEBPACK_IMPORTED_MODULE_267__ = __webpack_require__(/*! ./Types/ShapeData */ "./node_modules/tsparticles-engine/esm/Types/ShapeData.js");
/* harmony import */ var _Types_ShapeDrawerFunctions__WEBPACK_IMPORTED_MODULE_268__ = __webpack_require__(/*! ./Types/ShapeDrawerFunctions */ "./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js");
/* harmony import */ var _Types_SingleOrMultiple__WEBPACK_IMPORTED_MODULE_269__ = __webpack_require__(/*! ./Types/SingleOrMultiple */ "./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js");
/* harmony import */ var _Types_PathOptions__WEBPACK_IMPORTED_MODULE_270__ = __webpack_require__(/*! ./Types/PathOptions */ "./node_modules/tsparticles-engine/esm/Types/PathOptions.js");
/* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_271__ = __webpack_require__(/*! ./Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_272__ = __webpack_require__(/*! ./Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_273__ = __webpack_require__(/*! ./Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_274__ = __webpack_require__(/*! ./Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

const tsParticles = new _engine__WEBPACK_IMPORTED_MODULE_0__.Engine();
tsParticles.init();
























































































































































































































































































/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pTTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0xPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JDQSw4QkFBOEIsU0FBSSxJQUFJLFNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixTQUFJLElBQUksU0FBSTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0RPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTEEsOEJBQThCLFNBQUksSUFBSSxTQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGtDO0FBQ1E7QUFDRjtBQUNjO0FBQy9DO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJDQUFNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtREFBVTtBQUN4QztBQUNBO0FBQ0EsOEJBQThCLGlEQUFTO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsK0RBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxpREFBUztBQUNuRCwwQ0FBMEMsaURBQVM7QUFDbkQsMENBQTBDLGlEQUFTO0FBQ25ELDBDQUEwQyxpREFBUztBQUNuRDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUGdDO0FBQ3pCLHdCQUF3Qix5Q0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekZrQztBQUMzQix1QkFBdUIsMkNBQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pFVTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FvQztBQUNBO0FBQ3ZDLDhCQUE4Qix1REFBWTtBQUNqRDtBQUNBO0FBQ0EsNkJBQTZCLHVEQUFZO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixhQUFhO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7OztBQ0ErQzs7Ozs7Ozs7Ozs7O0FDQS9DOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBZ0U7QUFDbkU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxxREFBUTtBQUNyRix5QkFBeUIsNERBQWU7QUFDeEMsbURBQW1ELDREQUFlO0FBQ2xFLHlCQUF5Qiw0REFBZTtBQUN4QztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsMEJBQTBCLDREQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsNERBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw0REFBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZLaUY7QUFDUDtBQUNsQztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R2tDO0FBQ2xDLHdCQUF3QiwyQ0FBTTtBQUM5QjtBQUN5QztBQUNHO0FBQ0Y7QUFDWTtBQUNMO0FBQ1M7QUFDUDtBQUNKO0FBQ047QUFDSTtBQUNEO0FBQ1U7QUFDUjtBQUNEO0FBQ1E7QUFDVDtBQUNVO0FBQ0g7QUFDSztBQUNEO0FBQ1A7QUFDQztBQUNNO0FBQ1A7QUFDRztBQUNPO0FBQ1I7QUFDQTtBQUNSO0FBQ0k7QUFDSTtBQUNIO0FBQ0E7QUFDWDtBQUNJO0FBQ0Q7QUFDSztBQUNRO0FBQ1Y7QUFDTTtBQUNLO0FBQ2hCO0FBQ0Y7QUFDRztBQUNIO0FBQ0k7QUFDSDtBQUNFO0FBQ1I7QUFDRztBQUNIO0FBQ0U7QUFDQztBQUNIO0FBQ21CO0FBQ0U7QUFDQztBQUNIO0FBQ1Q7QUFDRTtBQUNKO0FBQ0U7QUFDSTtBQUNOO0FBQ0M7QUFDQTtBQUNDO0FBQ0s7QUFDTDtBQUNFO0FBQ0M7QUFDRTtBQUNDO0FBQ0Q7QUFDUDtBQUNHO0FBQ0Q7QUFDSTtBQUNWO0FBQ2dCO0FBQ0c7QUFDRjtBQUNLO0FBQ1E7QUFDSztBQUNwQjtBQUNPO0FBQ1Q7QUFDbUI7QUFDRjtBQUNFO0FBQ0Y7QUFDRjtBQUNJO0FBQ0Y7QUFDRjtBQUNBO0FBQ0Q7QUFDQTtBQUNJO0FBQ0Q7QUFDRjtBQUNLO0FBQ1I7QUFDSztBQUNKO0FBQ0k7QUFDSTtBQUNGO0FBQ047QUFDRDtBQUNFO0FBQ0M7QUFDSTtBQUNEO0FBQ047QUFDQztBQUNYO0FBQ0Q7QUFDTTtBQUNaO0FBQ0s7QUFDb0I7QUFDTTtBQUNQO0FBQ087QUFDYjtBQUNGO0FBQ007QUFDRjtBQUNEO0FBQ1Y7QUFDQTtBQUNHO0FBQ0s7QUFDRztBQUNOO0FBQ007QUFDRTtBQUNIO0FBQ1A7QUFDSztBQUNFO0FBQ0g7QUFDSztBQUNLO0FBQ2Q7QUFDSztBQUNRO0FBQ0M7QUFDUjtBQUNTO0FBQ2I7QUFDUTtBQUNLO0FBQ2Y7QUFDSztBQUNEO0FBQ1M7QUFDWDtBQUNGO0FBQ1M7QUFDVDtBQUNTO0FBQ0g7QUFDTTtBQUNSO0FBQ0E7QUFDYjtBQUNDO0FBQ087QUFDSDtBQUNVO0FBQ1E7QUFDSztBQUNiO0FBQ1g7QUFDSztBQUNHO0FBQ1Q7QUFDSztBQUNGO0FBQ0U7QUFDRjtBQUNMO0FBQ0s7QUFDRztBQUNMO0FBQ0s7QUFDZ0I7QUFDRjtBQUNGO0FBQ0k7QUFDRjtBQUNGO0FBQ0Q7QUFDQTtBQUNJO0FBQ0Q7QUFDRjtBQUNLO0FBQ1I7QUFDSztBQUNKO0FBQ0k7QUFDSTtBQUNGO0FBQ0o7QUFDRjtBQUNEO0FBQ0U7QUFDQztBQUNJO0FBQ0Q7QUFDTjtBQUNDO0FBQ0U7QUFDZDtBQUNNO0FBQ2E7QUFDRDtBQUNPO0FBQ2I7QUFDRjtBQUNHO0FBQ1Y7QUFDQTtBQUNHO0FBQ0s7QUFDRztBQUNOO0FBQ007QUFDRTtBQUNIO0FBQ1A7QUFDSztBQUNFO0FBQ0U7QUFDTDtBQUNKO0FBQ0s7QUFDUztBQUNEO0FBQ1A7QUFDUztBQUNiO0FBQ2E7QUFDZjtBQUNLO0FBQ0Q7QUFDUztBQUNGO0FBQ0o7QUFDRTtBQUNQO0FBQ007QUFDRjtBQUNOO0FBQ1M7QUFDVDtBQUNTO0FBQ0g7QUFDTTtBQUNSO0FBQ0E7QUFDWjtBQUNPO0FBQ3RCO0FBQ007QUFDUDtBQUNXO0FBQ0o7QUFDTDtBQUNBO0FBQ0Q7QUFDQztBQUNOO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvQ29sb3JzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9HcmFkaWVudHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lCb3VuZHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lCdWJibGVQYXJ0aWNsZURhdGEuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lDaXJjbGVCb3VuY2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JQ29udGFpbmVySW50ZXJhY3Rpdml0eS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSUNvbnRhaW5lclBsdWdpbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSUNvb3JkaW5hdGVzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JRGVsdGEuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lEaW1lbnNpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lEaXN0YW5jZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSUV4dGVybmFsSW50ZXJhY3Rvci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSUludGVyYWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lNb3VzZURhdGEuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lNb3ZlUGF0aEdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVDb2xvclN0eWxlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVHcmF2aXR5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVIc2xBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZUxpZmUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZUxvb3BzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVSZXRpbmFQcm9wcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlUm9sbC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlVXBkYXRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlVmFsdWVBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZVdvYmJsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlc0ludGVyYWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZXNNb3Zlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVBsdWdpbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVJhbmdlVmFsdWUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9JbnRlcmZhY2VzL0lSZWN0U2lkZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL0ludGVyZmFjZXMvSVNoYXBlRHJhd2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvSW50ZXJmYWNlcy9JU2hhcGVWYWx1ZXMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9QYXJ0aWNsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1BhcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1JldGluYS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1V0aWxzL0NpcmNsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1V0aWxzL0NpcmNsZVdhcnAuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9FdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1V0aWxzL0V4dGVybmFsSW50ZXJhY3RvckJhc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9GcmFtZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9JbnRlcmFjdGlvbk1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9QYXJ0aWNsZXNJbnRlcmFjdG9yQmFzZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1V0aWxzL1BsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9Qb2ludC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9Db3JlL1V0aWxzL1F1YWRUcmVlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0NvcmUvVXRpbHMvUmFuZ2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9WZWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vQ29yZS9VdGlscy9WZWN0b3IzZC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9BbmltYXRpb25TdGF0dXMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvRGlyZWN0aW9ucy9Nb3ZlRGlyZWN0aW9uLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL0RpcmVjdGlvbnMvT3V0TW9kZURpcmVjdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9EaXJlY3Rpb25zL1JvdGF0ZURpcmVjdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9EaXJlY3Rpb25zL1RpbHREaXJlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvSW50ZXJhY3Rpdml0eURldGVjdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9Nb2Rlcy9DbGlja01vZGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvTW9kZXMvQ29sbGlzaW9uTW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9Nb2Rlcy9EZXN0cm95TW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9Nb2Rlcy9EaXZNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL01vZGVzL0hvdmVyTW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9Nb2Rlcy9PdXRNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL01vZGVzL1Jlc3BvbnNpdmVNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL01vZGVzL1JvbGxNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL01vZGVzL1NpemVNb2RlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL01vZGVzL1RoZW1lTW9kZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9UeXBlcy9BbHRlclR5cGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvVHlwZXMvRGVzdHJveVR5cGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvVHlwZXMvRGl2VHlwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9UeXBlcy9FYXNpbmdUeXBlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL0VudW1zL1R5cGVzL0dyYWRpZW50VHlwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9UeXBlcy9JbnRlcmFjdG9yVHlwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9FbnVtcy9UeXBlcy9QYXJ0aWNsZU91dFR5cGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vRW51bXMvVHlwZXMvU3RhcnRWYWx1ZVR5cGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0FuaW1hdGFibGVDb2xvci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvQW5pbWF0YWJsZUdyYWRpZW50LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9BbmltYXRpb25PcHRpb25zLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9CYWNrZ3JvdW5kL0JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0JhY2tncm91bmRNYXNrL0JhY2tncm91bmRNYXNrLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9CYWNrZ3JvdW5kTWFzay9CYWNrZ3JvdW5kTWFza0NvdmVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9Db2xvckFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvRnVsbFNjcmVlbi9GdWxsU2NyZWVuLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9Ic2xBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL0NsaWNrRXZlbnQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL0RpdkV2ZW50LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9FdmVudHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL0hvdmVyRXZlbnQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL1BhcmFsbGF4LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0ludGVyYWN0aXZpdHkuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvQXR0cmFjdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9Cb3VuY2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvQnViYmxlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0J1YmJsZUJhc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvQnViYmxlRGl2LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0Nvbm5lY3QuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvQ29ubmVjdExpbmtzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0dyYWIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvR3JhYkxpbmtzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0xpZ2h0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0xpZ2h0QXJlYS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9MaWdodEdyYWRpZW50LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0xpZ2h0U2hhZG93LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL01vZGVzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1B1c2guanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvUmVtb3ZlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1JlcHVsc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvUmVwdWxzZUJhc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvUmVwdWxzZURpdi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9TbG93LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1RyYWlsLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9NYW51YWxQYXJ0aWNsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvTW90aW9uL01vdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvTW90aW9uL01vdGlvblJlZHVjZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvT3B0aW9uc0NvbG9yLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvQm91bmNlL1BhcnRpY2xlc0JvdW5jZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0JvdW5jZS9QYXJ0aWNsZXNCb3VuY2VGYWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Db2xsaXNpb25zL0NvbGxpc2lvbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Db2xsaXNpb25zL0NvbGxpc2lvbnNPdmVybGFwLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvRGVzdHJveS9EZXN0cm95LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvRGVzdHJveS9TcGxpdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0Rlc3Ryb3kvU3BsaXRGYWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9EZXN0cm95L1NwbGl0UmF0ZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0xpZmUvTGlmZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0xpZmUvTGlmZURlbGF5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTGlmZS9MaWZlRHVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaW5rcy9MaW5rcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0xpbmtzL0xpbmtzU2hhZG93LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTGlua3MvTGlua3NUcmlhbmdsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZUFuZ2xlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTW92ZS9Nb3ZlQXR0cmFjdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZUdyYXZpdHkuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Nb3ZlL01vdmVUcmFpbC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvT3V0TW9kZXMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Nb3ZlL1BhdGgvTW92ZVBhdGguanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Nb3ZlL1BhdGgvTW92ZVBhdGhEZWxheS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvU3Bpbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL051bWJlci9QYXJ0aWNsZXNEZW5zaXR5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTnVtYmVyL1BhcnRpY2xlc051bWJlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL09wYWNpdHkvT3BhY2l0eS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL09wYWNpdHkvT3BhY2l0eUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL09yYml0L09yYml0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvT3JiaXQvT3JiaXRSb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1BhcnRpY2xlc09wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9SZXB1bHNlL1BhcnRpY2xlc1JlcHVsc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Sb2xsL1JvbGwuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Sb2xsL1JvbGxMaWdodC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1JvdGF0ZS9Sb3RhdGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Sb3RhdGUvUm90YXRlQW5pbWF0aW9uLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvU2hhZG93LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvU2hhcGUvU2hhcGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9TaXplL1NpemUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9TaXplL1NpemVBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9TdHJva2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9UaWx0L1RpbHQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9UaWx0L1RpbHRBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Ud2lua2xlL1R3aW5rbGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Ud2lua2xlL1R3aW5rbGVWYWx1ZXMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Xb2JibGUvV29iYmxlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvWkluZGV4L1pJbmRleC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvUmFuZG9tLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9SZXNwb25zaXZlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9UaGVtZS9UaGVtZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0NsYXNzZXMvVGhlbWUvVGhlbWVEZWZhdWx0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvQ2xhc3Nlcy9WYWx1ZVdpdGhSYW5kb20uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0JhY2tncm91bmQvSUJhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0JhY2tncm91bmRNYXNrL0lCYWNrZ3JvdW5kTWFzay5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvQmFja2dyb3VuZE1hc2svSUJhY2tncm91bmRNYXNrQ292ZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0Z1bGxTY3JlZW4vSUZ1bGxTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lBbmltYXRhYmxlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JQW5pbWF0YWJsZUNvbG9yLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JQW5pbWF0YWJsZUdyYWRpZW50LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JQW5pbWF0aW9uLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JQ29sb3JBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lIc2xBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lNYW51YWxQYXJ0aWNsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSU9wdGlvbkxvYWRlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSU9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lPcHRpb25zQ29sb3IuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lPcHRpb25zR3JhZGllbnQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0lSZXNwb25zaXZlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JVmFsdWVXaXRoUmFuZG9tLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JQ2xpY2tFdmVudC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSURpdkV2ZW50LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JRXZlbnRzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JSG92ZXJFdmVudC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSVBhcmFsbGF4LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L0lJbnRlcmFjdGl2aXR5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lBdHRyYWN0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lCb3VuY2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUJ1YmJsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JQnViYmxlQmFzZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JQnViYmxlRGl2LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lDb25uZWN0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lDb25uZWN0TGlua3MuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUdyYWIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUdyYWJMaW5rcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTGlnaHQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUxpZ2h0QXJlYS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTGlnaHRHcmFkaWVudC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTGlnaHRTaGFkb3cuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSU1vZGVEaXYuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSU1vZGVzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lQdXNoLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lSZW1vdmUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSVJlcHVsc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSVJlcHVsc2VCYXNlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lSZXB1bHNlRGl2LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lTbG93LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lUcmFpbC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvTW90aW9uL0lNb3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL01vdGlvbi9JTW90aW9uUmVkdWNlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvQm91bmNlL0lQYXJ0aWNsZXNCb3VuY2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Db2xsaXNpb25zL0lDb2xsaXNpb25zLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvQ29sbGlzaW9ucy9JQ29sbGlzaW9uc092ZXJsYXAuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9EZXN0cm95L0lEZXN0cm95LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvRGVzdHJveS9JU3BsaXQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9JUGFydGljbGVzT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0lTaGFkb3cuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9JU3Ryb2tlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTGlmZS9JTGlmZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpZmUvSUxpZmVEZWxheS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpZmUvSUxpZmVEdXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpbmtzL0lMaW5rcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpbmtzL0lMaW5rc1NoYWRvdy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpbmtzL0lMaW5rc1RyaWFuZ2xlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTW92ZS9JTW92ZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSU1vdmVBbmdsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSU1vdmVBdHRyYWN0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTW92ZS9JTW92ZUdyYXZpdHkuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Nb3ZlL0lNb3ZlVHJhaWwuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Nb3ZlL0lPdXRNb2Rlcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSVNwaW4uanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Nb3ZlL1BhdGgvSU1vdmVQYXRoLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTnVtYmVyL0lQYXJ0aWNsZXNEZW5zaXR5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTnVtYmVyL0lQYXJ0aWNsZXNOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9PcGFjaXR5L0lPcGFjaXR5LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvT3BhY2l0eS9JT3BhY2l0eUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL09yYml0L0lPcmJpdC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1JlcHVsc2UvSVBhcnRpY2xlc1JlcHVsc2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Sb2xsL0lSb2xsLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvUm9sbC9JUm9sbExpZ2h0LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvUm90YXRlL0lSb3RhdGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Sb3RhdGUvSVJvdGF0ZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lDaGFyYWN0ZXJTaGFwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lJbWFnZVNoYXBlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2hhcGUvSVBvbHlnb25TaGFwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lTaGFwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lTaGFwZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lTdGFyU2hhcGUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9TaXplL0lTaXplLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2l6ZS9JU2l6ZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1RpbHQvSVRpbHQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9UaWx0L0lUaWx0QW5pbWF0aW9uLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvVHdpbmtsZS9JVHdpbmtsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1R3aW5rbGUvSVR3aW5rbGVWYWx1ZXMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Xb2JibGUvSVdvYmJsZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1pJbmRleC9JWkluZGV4LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9UaGVtZS9JVGhlbWUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vT3B0aW9ucy9JbnRlcmZhY2VzL1RoZW1lL0lUaGVtZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vVHlwZXMvUGF0aE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vVHlwZXMvUmFuZ2VWYWx1ZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL1R5cGVzL1NoYXBlRGF0YS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9UeXBlcy9TaGFwZURyYXdlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9UeXBlcy9TaW5nbGVPck11bHRpcGxlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL1V0aWxzL0NhbnZhc1V0aWxzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL1V0aWxzL0NvbG9yVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWVuZ2luZS9lc20vVXRpbHMvRXZlbnREaXNwYXRjaGVyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL1V0aWxzL051bWJlclV0aWxzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL1V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1lbmdpbmUvZXNtL2VuZ2luZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtZW5naW5lL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGVhciwgZHJhd0Nvbm5lY3RMaW5lLCBkcmF3R3JhYkxpbmUsIGRyYXdQYXJ0aWNsZSwgZHJhd1BhcnRpY2xlUGx1Z2luLCBkcmF3UGx1Z2luLCBncmFkaWVudCwgcGFpbnRCYXNlLCB9IGZyb20gXCIuLi9VdGlscy9DYW52YXNVdGlsc1wiO1xuaW1wb3J0IHsgY29sb3JUb0hzbCwgY29sb3JUb1JnYiwgZ2V0U3R5bGVGcm9tSHNsLCBnZXRTdHlsZUZyb21SZ2IgfSBmcm9tIFwiLi4vVXRpbHMvQ29sb3JVdGlsc1wiO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gXCIuLi9VdGlscy9VdGlsc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVkQXR0cmlidXRlIH0gZnJvbSBcIi4vVXRpbHMvQ29uc3RhbnRzXCI7XG5leHBvcnQgY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHtcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmdlbmVyYXRlZENhbnZhcyA9IGZhbHNlO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmluaXRDb3ZlcigpO1xuICAgICAgICB0aGlzLmluaXRUcmFpbCgpO1xuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XG4gICAgICAgIHRoaXMucGFpbnQoKTtcbiAgICB9XG4gICAgbG9hZENhbnZhcyhjYW52YXMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZWRDYW52YXMpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuZWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkQ2FudmFzID1cbiAgICAgICAgICAgIGNhbnZhcy5kYXRhc2V0ICYmIGdlbmVyYXRlZEF0dHJpYnV0ZSBpbiBjYW52YXMuZGF0YXNldFxuICAgICAgICAgICAgICAgID8gY2FudmFzLmRhdGFzZXRbZ2VuZXJhdGVkQXR0cmlidXRlXSA9PT0gXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2VuZXJhdGVkQ2FudmFzO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBjYW52YXM7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdHlsZSA9IGRlZXBFeHRlbmQoe30sIHRoaXMuZWxlbWVudC5zdHlsZSk7XG4gICAgICAgIHRoaXMuc2l6ZS5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJldGluYS5pbml0KCk7XG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZWRDYW52YXMpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuZWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhdygoY3R4KSA9PiB7XG4gICAgICAgICAgICBjbGVhcihjdHgsIHRoaXMuc2l6ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYWludCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgIHRoaXMuZHJhdygoY3R4KSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5lbmFibGUgJiYgb3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5jb3Zlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyKGN0eCwgdGhpcy5zaXplKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhaW50QmFzZSh0aGlzLmNvdmVyQ29sb3JTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhaW50QmFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCB0cmFpbCA9IG9wdGlvbnMucGFydGljbGVzLm1vdmUudHJhaWw7XG4gICAgICAgIGlmIChvcHRpb25zLmJhY2tncm91bmRNYXNrLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wYWludCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRyYWlsLmVuYWJsZSAmJiB0cmFpbC5sZW5ndGggPiAwICYmIHRoaXMudHJhaWxGaWxsQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnRCYXNlKGdldFN0eWxlRnJvbVJnYih0aGlzLnRyYWlsRmlsbENvbG9yLCAxIC8gdHJhaWwubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcoKGN0eCkgPT4ge1xuICAgICAgICAgICAgICAgIGNsZWFyKGN0eCwgdGhpcy5zaXplKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgbmVlZHNSZWZyZXNoID0gY29udGFpbmVyLnVwZGF0ZUFjdHVhbE9wdGlvbnMoKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5zZXREZW5zaXR5KCk7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiBjb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi5yZXNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobmVlZHNSZWZyZXNoKSB7XG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgcHhSYXRpbyA9IGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbywgc2l6ZSA9IGNvbnRhaW5lci5jYW52YXMuc2l6ZSwgbmV3U2l6ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKiBweFJhdGlvLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0ICogcHhSYXRpbyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5ld1NpemUuaGVpZ2h0ID09PSBzaXplLmhlaWdodCAmJlxuICAgICAgICAgICAgbmV3U2l6ZS53aWR0aCA9PT0gc2l6ZS53aWR0aCAmJlxuICAgICAgICAgICAgbmV3U2l6ZS5oZWlnaHQgPT09IHRoaXMuZWxlbWVudC5oZWlnaHQgJiZcbiAgICAgICAgICAgIG5ld1NpemUud2lkdGggPT09IHRoaXMuZWxlbWVudC53aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFNpemUgPSBPYmplY3QuYXNzaWduKHt9LCBzaXplKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LndpZHRoID0gc2l6ZS53aWR0aCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAqIHB4UmF0aW87XG4gICAgICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBzaXplLmhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgKiBweFJhdGlvO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVGYWN0b3IgPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHNpemUud2lkdGggLyBvbGRTaXplLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHQgLyBvbGRTaXplLmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd0Nvbm5lY3RMaW5lKHAxLCBwMikge1xuICAgICAgICB0aGlzLmRyYXcoKGN0eCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgbGluZVN0eWxlID0gdGhpcy5saW5lU3R5bGUocDEsIHAyKTtcbiAgICAgICAgICAgIGlmICghbGluZVN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zMSA9IHAxLmdldFBvc2l0aW9uKCksIHBvczIgPSBwMi5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZHJhd0Nvbm5lY3RMaW5lKGN0eCwgKF9hID0gcDEucmV0aW5hLmxpbmtzV2lkdGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuY29udGFpbmVyLnJldGluYS5saW5rc1dpZHRoLCBsaW5lU3R5bGUsIHBvczEsIHBvczIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZHJhd0dyYWJMaW5lKHBhcnRpY2xlLCBsaW5lQ29sb3IsIG9wYWNpdHksIG1vdXNlUG9zKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICB0aGlzLmRyYXcoKGN0eCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgYmVnaW5Qb3MgPSBwYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZHJhd0dyYWJMaW5lKGN0eCwgKF9hID0gcGFydGljbGUucmV0aW5hLmxpbmtzV2lkdGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvbnRhaW5lci5yZXRpbmEubGlua3NXaWR0aCwgYmVnaW5Qb3MsIG1vdXNlUG9zLCBsaW5lQ29sb3IsIG9wYWNpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZHJhd1BhcnRpY2xlKHBhcnRpY2xlLCBkZWx0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgaWYgKHBhcnRpY2xlLnNwYXduaW5nIHx8IHBhcnRpY2xlLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHBhcnRpY2xlLmdldFJhZGl1cygpO1xuICAgICAgICBpZiAocmFkaXVzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZkNvbG9yID0gcGFydGljbGUuZ2V0RmlsbENvbG9yKCksIHBzQ29sb3IgPSAoX2EgPSBwYXJ0aWNsZS5nZXRTdHJva2VDb2xvcigpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwZkNvbG9yO1xuICAgICAgICBpZiAoIXBmQ29sb3IgJiYgIXBzQ29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgW2ZDb2xvciwgc0NvbG9yXSA9IHRoaXMuZ2V0UGx1Z2luUGFydGljbGVDb2xvcnMocGFydGljbGUpO1xuICAgICAgICBpZiAoIWZDb2xvciB8fCAhc0NvbG9yKSB7XG4gICAgICAgICAgICBpZiAoIWZDb2xvcikge1xuICAgICAgICAgICAgICAgIGZDb2xvciA9IHBmQ29sb3IgPyBwZkNvbG9yIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBzQ29sb3IgPSBwc0NvbG9yID8gcHNDb2xvciA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb250YWluZXIuYWN0dWFsT3B0aW9ucywgekluZGV4T3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnMuekluZGV4LCB6T3BhY2l0eUZhY3RvciA9ICgxIC0gcGFydGljbGUuekluZGV4RmFjdG9yKSAqKiB6SW5kZXhPcHRpb25zLm9wYWNpdHlSYXRlLCBvcGFjaXR5ID0gKF9kID0gKF9iID0gcGFydGljbGUuYnViYmxlLm9wYWNpdHkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IChfYyA9IHBhcnRpY2xlLm9wYWNpdHkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy52YWx1ZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMSwgc3Ryb2tlT3BhY2l0eSA9IChfZiA9IChfZSA9IHBhcnRpY2xlLnN0cm9rZSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLm9wYWNpdHkpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IG9wYWNpdHksIHpPcGFjaXR5ID0gb3BhY2l0eSAqIHpPcGFjaXR5RmFjdG9yLCB6U3Ryb2tlT3BhY2l0eSA9IHN0cm9rZU9wYWNpdHkgKiB6T3BhY2l0eUZhY3RvcjtcbiAgICAgICAgY29uc3QgY29sb3JTdHlsZXMgPSB7XG4gICAgICAgICAgICBmaWxsOiBmQ29sb3IgPyBnZXRTdHlsZUZyb21Ic2woZkNvbG9yLCB6T3BhY2l0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbG9yU3R5bGVzLnN0cm9rZSA9IHNDb2xvciA/IGdldFN0eWxlRnJvbUhzbChzQ29sb3IsIHpTdHJva2VPcGFjaXR5KSA6IGNvbG9yU3R5bGVzLmZpbGw7XG4gICAgICAgIHRoaXMuZHJhdygoY3R4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB6U2l6ZUZhY3RvciA9ICgxIC0gcGFydGljbGUuekluZGV4RmFjdG9yKSAqKiB6SW5kZXhPcHRpb25zLnNpemVSYXRlLCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdXBkYXRlciBvZiBjb250YWluZXIucGFydGljbGVzLnVwZGF0ZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZXIuYmVmb3JlRHJhdykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVyLmJlZm9yZURyYXcocGFydGljbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXBkYXRlci5nZXRDb2xvclN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGZpbGwsIHN0cm9rZSB9ID0gdXBkYXRlci5nZXRDb2xvclN0eWxlcyhwYXJ0aWNsZSwgY3R4LCByYWRpdXMsIHpPcGFjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yU3R5bGVzLmZpbGwgPSBmaWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yU3R5bGVzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdQYXJ0aWNsZShjb250YWluZXIsIGN0eCwgcGFydGljbGUsIGRlbHRhLCBjb2xvclN0eWxlcywgb3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5lbmFibGUsIG9wdGlvbnMuYmFja2dyb3VuZE1hc2suY29tcG9zaXRlLCByYWRpdXMgKiB6U2l6ZUZhY3Rvciwgek9wYWNpdHksIHBhcnRpY2xlLm9wdGlvbnMuc2hhZG93KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdXBkYXRlciBvZiBjb250YWluZXIucGFydGljbGVzLnVwZGF0ZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZXIuYWZ0ZXJEcmF3KSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZXIuYWZ0ZXJEcmF3KHBhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkcmF3UGx1Z2luKHBsdWdpbiwgZGVsdGEpIHtcbiAgICAgICAgdGhpcy5kcmF3KChjdHgpID0+IHtcbiAgICAgICAgICAgIGRyYXdQbHVnaW4oY3R4LCBwbHVnaW4sIGRlbHRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRyYXdQYXJ0aWNsZVBsdWdpbihwbHVnaW4sIHBhcnRpY2xlLCBkZWx0YSkge1xuICAgICAgICB0aGlzLmRyYXcoKGN0eCkgPT4ge1xuICAgICAgICAgICAgZHJhd1BhcnRpY2xlUGx1Z2luKGN0eCwgcGx1Z2luLCBwYXJ0aWNsZSwgZGVsdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5pdEJhY2tncm91bmQoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCBiYWNrZ3JvdW5kID0gb3B0aW9ucy5iYWNrZ3JvdW5kLCBlbGVtZW50ID0gdGhpcy5lbGVtZW50LCBlbGVtZW50U3R5bGUgPSBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGlmICghZWxlbWVudFN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJhY2tncm91bmQuY29sb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JUb1JnYihiYWNrZ3JvdW5kLmNvbG9yKTtcbiAgICAgICAgICAgIGVsZW1lbnRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvciA/IGdldFN0eWxlRnJvbVJnYihjb2xvciwgYmFja2dyb3VuZC5vcGFjaXR5KSA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50U3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50U3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZC5pbWFnZSB8fCBcIlwiO1xuICAgICAgICBlbGVtZW50U3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gYmFja2dyb3VuZC5wb3NpdGlvbiB8fCBcIlwiO1xuICAgICAgICBlbGVtZW50U3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IGJhY2tncm91bmQucmVwZWF0IHx8IFwiXCI7XG4gICAgICAgIGVsZW1lbnRTdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IGJhY2tncm91bmQuc2l6ZSB8fCBcIlwiO1xuICAgIH1cbiAgICBkcmF3KGNiKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiKHRoaXMuY29udGV4dCk7XG4gICAgfVxuICAgIGluaXRDb3ZlcigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIGNvdmVyID0gb3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5jb3ZlciwgY29sb3IgPSBjb3Zlci5jb2xvciwgY292ZXJSZ2IgPSBjb2xvclRvUmdiKGNvbG9yKTtcbiAgICAgICAgaWYgKGNvdmVyUmdiKSB7XG4gICAgICAgICAgICBjb25zdCBjb3ZlckNvbG9yID0ge1xuICAgICAgICAgICAgICAgIHI6IGNvdmVyUmdiLnIsXG4gICAgICAgICAgICAgICAgZzogY292ZXJSZ2IuZyxcbiAgICAgICAgICAgICAgICBiOiBjb3ZlclJnYi5iLFxuICAgICAgICAgICAgICAgIGE6IGNvdmVyLm9wYWNpdHksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jb3ZlckNvbG9yU3R5bGUgPSBnZXRTdHlsZUZyb21SZ2IoY292ZXJDb2xvciwgY292ZXJDb2xvci5hKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0VHJhaWwoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCB0cmFpbCA9IG9wdGlvbnMucGFydGljbGVzLm1vdmUudHJhaWwsIGZpbGxDb2xvciA9IGNvbG9yVG9SZ2IodHJhaWwuZmlsbENvbG9yKTtcbiAgICAgICAgaWYgKGZpbGxDb2xvcikge1xuICAgICAgICAgICAgY29uc3QgdHJhaWwgPSBvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLnRyYWlsO1xuICAgICAgICAgICAgdGhpcy50cmFpbEZpbGxDb2xvciA9IHtcbiAgICAgICAgICAgICAgICByOiBmaWxsQ29sb3IucixcbiAgICAgICAgICAgICAgICBnOiBmaWxsQ29sb3IuZyxcbiAgICAgICAgICAgICAgICBiOiBmaWxsQ29sb3IuYixcbiAgICAgICAgICAgICAgICBhOiAxIC8gdHJhaWwubGVuZ3RoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRQbHVnaW5QYXJ0aWNsZUNvbG9ycyhwYXJ0aWNsZSkge1xuICAgICAgICBsZXQgZkNvbG9yLCBzQ29sb3I7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiB0aGlzLmNvbnRhaW5lci5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAoIWZDb2xvciAmJiBwbHVnaW4ucGFydGljbGVGaWxsQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBmQ29sb3IgPSBjb2xvclRvSHNsKHBsdWdpbi5wYXJ0aWNsZUZpbGxDb2xvcihwYXJ0aWNsZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzQ29sb3IgJiYgcGx1Z2luLnBhcnRpY2xlU3Ryb2tlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBzQ29sb3IgPSBjb2xvclRvSHNsKHBsdWdpbi5wYXJ0aWNsZVN0cm9rZUNvbG9yKHBhcnRpY2xlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZkNvbG9yICYmIHNDb2xvcikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZkNvbG9yLCBzQ29sb3JdO1xuICAgIH1cbiAgICBpbml0U3R5bGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsIG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbFN0eWxlID0gdGhpcy5vcmlnaW5hbFN0eWxlO1xuICAgICAgICBpZiAob3B0aW9ucy5mdWxsU2NyZWVuLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gZGVlcEV4dGVuZCh7fSwgZWxlbWVudC5zdHlsZSk7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwicG9zaXRpb25cIiwgXCJmaXhlZFwiLCBcImltcG9ydGFudFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ6LWluZGV4XCIsIG9wdGlvbnMuZnVsbFNjcmVlbi56SW5kZXgudG9TdHJpbmcoMTApLCBcImltcG9ydGFudFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgXCIwXCIsIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgXCIwXCIsIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIndpZHRoXCIsIFwiMTAwJVwiLCBcImltcG9ydGFudFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIxMDAlXCIsIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsU3R5bGUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBvcmlnaW5hbFN0eWxlLnBvc2l0aW9uO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS56SW5kZXggPSBvcmlnaW5hbFN0eWxlLnpJbmRleDtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gb3JpZ2luYWxTdHlsZS50b3A7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBvcmlnaW5hbFN0eWxlLmxlZnQ7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gb3JpZ2luYWxTdHlsZS53aWR0aDtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gb3JpZ2luYWxTdHlsZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucy5zdHlsZSkge1xuICAgICAgICAgICAgaWYgKCFrZXkgfHwgIW9wdGlvbnMuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5zdHlsZVtrZXldO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBcImltcG9ydGFudFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWludEJhc2UoYmFzZUNvbG9yKSB7XG4gICAgICAgIHRoaXMuZHJhdygoY3R4KSA9PiB7XG4gICAgICAgICAgICBwYWludEJhc2UoY3R4LCB0aGlzLnNpemUsIGJhc2VDb2xvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsaW5lU3R5bGUocDEsIHAyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYXcoKGN0eCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIGNvbm5lY3RPcHRpb25zID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLmNvbm5lY3Q7XG4gICAgICAgICAgICByZXR1cm4gZ3JhZGllbnQoY3R4LCBwMSwgcDIsIGNvbm5lY3RPcHRpb25zLmxpbmtzLm9wYWNpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0NvbnRhaW5lcl9lbmdpbmU7XG5pbXBvcnQgeyBhbmltYXRlLCBjYW5jZWxBbmltYXRpb24sIGxvYWRDb250YWluZXJPcHRpb25zIH0gZnJvbSBcIi4uL1V0aWxzL1V0aWxzXCI7XG5pbXBvcnQgeyBDYW52YXMgfSBmcm9tIFwiLi9DYW52YXNcIjtcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vVXRpbHMvRXZlbnRMaXN0ZW5lcnNcIjtcbmltcG9ydCB7IEZyYW1lTWFuYWdlciB9IGZyb20gXCIuL1V0aWxzL0ZyYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgUGFydGljbGVzIH0gZnJvbSBcIi4vUGFydGljbGVzXCI7XG5pbXBvcnQgeyBSZXRpbmEgfSBmcm9tIFwiLi9SZXRpbmFcIjtcbmltcG9ydCB7IGdldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBDb250YWluZXIge1xuICAgIGNvbnN0cnVjdG9yKGVuZ2luZSwgaWQsIHNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICBfQ29udGFpbmVyX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgZW5naW5lLCBcImZcIik7XG4gICAgICAgIHRoaXMuZnBzTGltaXQgPSAxMjA7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgICAgICB0aGlzLmxpZmVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5maXJzdFN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gMDtcbiAgICAgICAgdGhpcy56TGF5ZXJzID0gMTAwO1xuICAgICAgICB0aGlzLnBhZ2VIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc291cmNlT3B0aW9ucyA9IHNvdXJjZU9wdGlvbnM7XG4gICAgICAgIHRoaXMuX2luaXRpYWxTb3VyY2VPcHRpb25zID0gc291cmNlT3B0aW9ucztcbiAgICAgICAgdGhpcy5yZXRpbmEgPSBuZXcgUmV0aW5hKHRoaXMpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXModGhpcyk7XG4gICAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFBhcnRpY2xlcyhfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250YWluZXJfZW5naW5lLCBcImZcIiksIHRoaXMpO1xuICAgICAgICB0aGlzLmRyYXdlciA9IG5ldyBGcmFtZU1hbmFnZXIodGhpcyk7XG4gICAgICAgIHRoaXMucGF0aEdlbmVyYXRvciA9IHtcbiAgICAgICAgICAgIGdlbmVyYXRlOiAocCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBwLnZlbG9jaXR5LmNvcHkoKTtcbiAgICAgICAgICAgICAgICB2LmFuZ2xlICs9ICh2Lmxlbmd0aCAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6ICgpID0+IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eSA9IHtcbiAgICAgICAgICAgIG1vdXNlOiB7XG4gICAgICAgICAgICAgICAgY2xpY2tpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZHJhd2VycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kZW5zaXR5ID0gMTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IGxvYWRDb250YWluZXJPcHRpb25zKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKSk7XG4gICAgICAgIHRoaXMuYWN0dWFsT3B0aW9ucyA9IGxvYWRDb250YWluZXJPcHRpb25zKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKSk7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBuZXcgRXZlbnRMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgIGlmICh0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHRoaXMuaW50ZXJzZWN0aW9uTWFuYWdlcihlbnRyaWVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJjb250YWluZXJCdWlsdFwiLCB7IGNvbnRhaW5lcjogdGhpcyB9KTtcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBnZXQgc291cmNlT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZU9wdGlvbnM7XG4gICAgfVxuICAgIHBsYXkoZm9yY2UpIHtcbiAgICAgICAgY29uc3QgbmVlZHNVcGRhdGUgPSB0aGlzLnBhdXNlZCB8fCBmb3JjZTtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RTdGFydCAmJiAhdGhpcy5hY3R1YWxPcHRpb25zLmF1dG9QbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsdWdpbi5wbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwiY29udGFpbmVyUGxheVwiLCB7IGNvbnRhaW5lcjogdGhpcyB9KTtcbiAgICAgICAgdGhpcy5kcmF3KG5lZWRzVXBkYXRlIHx8IGZhbHNlKTtcbiAgICB9XG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdBbmltYXRpb25GcmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb24oKSh0aGlzLmRyYXdBbmltYXRpb25GcmFtZSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kcmF3QW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbLCBwbHVnaW5dIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi5wYXVzZSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wYWdlSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJjb250YWluZXJQYXVzZWRcIiwgeyBjb250YWluZXI6IHRoaXMgfSk7XG4gICAgfVxuICAgIGRyYXcoZm9yY2UpIHtcbiAgICAgICAgbGV0IHJlZnJlc2hUaW1lID0gZm9yY2U7XG4gICAgICAgIHRoaXMuZHJhd0FuaW1hdGlvbkZyYW1lID0gYW5pbWF0ZSgpKGFzeW5jICh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgIGlmIChyZWZyZXNoVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEZyYW1lVGltZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZWZyZXNoVGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kcmF3ZXIubmV4dEZyYW1lKHRpbWVzdGFtcCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRBbmltYXRpb25TdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wYXVzZWQgJiYgIXRoaXMucGFnZUhpZGRlbjtcbiAgICB9XG4gICAgc2V0Tm9pc2Uobm9pc2VPckdlbmVyYXRvciwgaW5pdCwgdXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0UGF0aChub2lzZU9yR2VuZXJhdG9yLCBpbml0LCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRQYXRoKHBhdGhPckdlbmVyYXRvciwgaW5pdCwgdXBkYXRlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoIXBhdGhPckdlbmVyYXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aE9yR2VuZXJhdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aEdlbmVyYXRvci5nZW5lcmF0ZSA9IHBhdGhPckdlbmVyYXRvcjtcbiAgICAgICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoR2VuZXJhdG9yLmluaXQgPSBpbml0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aEdlbmVyYXRvci51cGRhdGUgPSB1cGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvbGRHZW5lcmF0b3IgPSB0aGlzLnBhdGhHZW5lcmF0b3I7XG4gICAgICAgICAgICB0aGlzLnBhdGhHZW5lcmF0b3IgPSBwYXRoT3JHZW5lcmF0b3I7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnBhdGhHZW5lcmF0b3IpLmdlbmVyYXRlIHx8IChfYS5nZW5lcmF0ZSA9IG9sZEdlbmVyYXRvci5nZW5lcmF0ZSk7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLnBhdGhHZW5lcmF0b3IpLmluaXQgfHwgKF9iLmluaXQgPSBvbGRHZW5lcmF0b3IuaW5pdCk7XG4gICAgICAgICAgICAoX2MgPSB0aGlzLnBhdGhHZW5lcmF0b3IpLnVwZGF0ZSB8fCAoX2MudXBkYXRlID0gb2xkR2VuZXJhdG9yLnVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMuY2FudmFzLmRlc3Ryb3koKTtcbiAgICAgICAgZm9yIChjb25zdCBbLCBkcmF3ZXJdIG9mIHRoaXMuZHJhd2Vycykge1xuICAgICAgICAgICAgaWYgKGRyYXdlci5kZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgZHJhd2VyLmRlc3Ryb3kodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5kcmF3ZXJzLmtleXMoKSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3ZXJzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJjb250YWluZXJEZXN0cm95ZWRcIiwgeyBjb250YWluZXI6IHRoaXMgfSk7XG4gICAgfVxuICAgIGV4cG9ydEltZyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmV4cG9ydEltYWdlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZXhwb3J0SW1hZ2UoY2FsbGJhY2ssIHR5cGUsIHF1YWxpdHkpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5jYW52YXMuZWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvQmxvYihjYWxsYmFjaywgdHlwZSAhPT0gbnVsbCAmJiB0eXBlICE9PSB2b2lkIDAgPyB0eXBlIDogXCJpbWFnZS9wbmdcIiwgcXVhbGl0eSk7XG4gICAgfVxuICAgIGV4cG9ydENvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmFjdHVhbE9wdGlvbnMsIHVuZGVmaW5lZCwgMik7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IGxvYWRDb250YWluZXJPcHRpb25zKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpcnN0U3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmNhbnZhcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGl2aXR5LmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmludGVyYWN0aXZpdHkuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbLCBwbHVnaW5dIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi5zdG9wKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLnBsdWdpbnMua2V5cygpKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMubGlua3NDb2xvcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBhcnRpY2xlcy5ncmFiTGluZUNvbG9yO1xuICAgICAgICBkZWxldGUgdGhpcy5wYXJ0aWNsZXMubGlua3NDb2xvcjtcbiAgICAgICAgdGhpcy5fc291cmNlT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwiY29udGFpbmVyU3RvcHBlZFwiLCB7IGNvbnRhaW5lcjogdGhpcyB9KTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZFRoZW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSBuYW1lO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgYXN5bmMgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5hZGRMaXN0ZW5lcnMoKTtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJhY3Rpdml0eS5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuaW50ZXJhY3Rpdml0eS5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAocGx1Z2luLnN0YXJ0QXN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHBsdWdpbi5zdGFydEFzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwbHVnaW4uc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwiY29udGFpbmVyU3RhcnRlZFwiLCB7IGNvbnRhaW5lcjogdGhpcyB9KTtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICAgIGFkZENsaWNrSGFuZGxlcihjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBlbCA9IHRoaXMuaW50ZXJhY3Rpdml0eS5lbGVtZW50O1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xpY2tPclRvdWNoSGFuZGxlciA9IChlLCBwb3MsIHJhZGl1cykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHhSYXRpbyA9IHRoaXMucmV0aW5hLnBpeGVsUmF0aW8sIHBvc1JldGluYSA9IHtcbiAgICAgICAgICAgICAgICB4OiBwb3MueCAqIHB4UmF0aW8sXG4gICAgICAgICAgICAgICAgeTogcG9zLnkgKiBweFJhdGlvLFxuICAgICAgICAgICAgfSwgcGFydGljbGVzID0gdGhpcy5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnlDaXJjbGUocG9zUmV0aW5hLCByYWRpdXMgKiBweFJhdGlvKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGUsIHBhcnRpY2xlcyk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtb3VzZUV2ZW50ID0gZSwgcG9zID0ge1xuICAgICAgICAgICAgICAgIHg6IG1vdXNlRXZlbnQub2Zmc2V0WCB8fCBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogbW91c2VFdmVudC5vZmZzZXRZIHx8IG1vdXNlRXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjbGlja09yVG91Y2hIYW5kbGVyKGUsIHBvcywgMSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHRvdWNoU3RhcnRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG91Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICB0b3VjaE1vdmVkID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHRvdWNoTW92ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3VjaE1vdmVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdG91Y2hFbmRIYW5kbGVyID0gKGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvdWNoZWQgJiYgIXRvdWNoTW92ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3VjaEV2ZW50ID0gZTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFRvdWNoID0gdG91Y2hFdmVudC50b3VjaGVzW3RvdWNoRXZlbnQudG91Y2hlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RUb3VjaCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0VG91Y2ggPSB0b3VjaEV2ZW50LmNoYW5nZWRUb3VjaGVzW3RvdWNoRXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGFzdFRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IChfYSA9IHRoaXMuY2FudmFzLmVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgcG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0VG91Y2guY2xpZW50WCAtICgoX2IgPSBjYW52YXNSZWN0ID09PSBudWxsIHx8IGNhbnZhc1JlY3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbnZhc1JlY3QubGVmdCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGxhc3RUb3VjaC5jbGllbnRZIC0gKChfYyA9IGNhbnZhc1JlY3QgPT09IG51bGwgfHwgY2FudmFzUmVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FudmFzUmVjdC50b3ApICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IDApLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2xpY2tPclRvdWNoSGFuZGxlcihlLCBwb3MsIE1hdGgubWF4KGxhc3RUb3VjaC5yYWRpdXNYLCBsYXN0VG91Y2gucmFkaXVzWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdG91Y2hNb3ZlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0b3VjaENhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0b3VjaE1vdmVkID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGxldCB0b3VjaGVkID0gZmFsc2U7XG4gICAgICAgIGxldCB0b3VjaE1vdmVkID0gZmFsc2U7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0b3VjaEVuZEhhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdG91Y2hDYW5jZWxIYW5kbGVyKTtcbiAgICB9XG4gICAgaGFuZGxlQ2xpY2tNb2RlKG1vZGUpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuaGFuZGxlQ2xpY2tNb2RlKG1vZGUpO1xuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhbmRsZUNsaWNrTW9kZSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5oYW5kbGVDbGlja01vZGUobW9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlQWN0dWFsT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5hY3R1YWxPcHRpb25zLnJlc3BvbnNpdmUgPSBbXTtcbiAgICAgICAgY29uc3QgbmV3TWF4V2lkdGggPSB0aGlzLmFjdHVhbE9wdGlvbnMuc2V0UmVzcG9uc2l2ZSh0aGlzLmNhbnZhcy5zaXplLndpZHRoLCB0aGlzLnJldGluYS5waXhlbFJhdGlvLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgdGhpcy5hY3R1YWxPcHRpb25zLnNldFRoZW1lKHRoaXMuY3VycmVudFRoZW1lKTtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZU1heFdpZHRoICE9IG5ld01heFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVNYXhXaWR0aCA9IG5ld01heFdpZHRoO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhc3luYyBpbml0KCkge1xuICAgICAgICBjb25zdCBzaGFwZXMgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250YWluZXJfZW5naW5lLCBcImZcIikucGx1Z2lucy5nZXRTdXBwb3J0ZWRTaGFwZXMoKTtcbiAgICAgICAgZm9yIChjb25zdCB0eXBlIG9mIHNoYXBlcykge1xuICAgICAgICAgICAgY29uc3QgZHJhd2VyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgXCJmXCIpLnBsdWdpbnMuZ2V0U2hhcGVEcmF3ZXIodHlwZSk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3ZXJzLnNldCh0eXBlLCBkcmF3ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBsb2FkQ29udGFpbmVyT3B0aW9ucyhfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250YWluZXJfZW5naW5lLCBcImZcIiksIHRoaXMuX2luaXRpYWxTb3VyY2VPcHRpb25zLCB0aGlzLnNvdXJjZU9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFjdHVhbE9wdGlvbnMgPSBsb2FkQ29udGFpbmVyT3B0aW9ucyhfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250YWluZXJfZW5naW5lLCBcImZcIiksIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB0aGlzLnJldGluYS5pbml0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzLmluaXQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBY3R1YWxPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2FudmFzLmluaXRCYWNrZ3JvdW5kKCk7XG4gICAgICAgIHRoaXMuY2FudmFzLnJlc2l6ZSgpO1xuICAgICAgICB0aGlzLnpMYXllcnMgPSB0aGlzLmFjdHVhbE9wdGlvbnMuekxheWVycztcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGdldFJhbmdlVmFsdWUodGhpcy5hY3R1YWxPcHRpb25zLmR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5saWZlVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZnBzTGltaXQgPSB0aGlzLmFjdHVhbE9wdGlvbnMuZnBzTGltaXQgPiAwID8gdGhpcy5hY3R1YWxPcHRpb25zLmZwc0xpbWl0IDogMTIwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVQbHVnaW5zID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udGFpbmVyX2VuZ2luZSwgXCJmXCIpLnBsdWdpbnMuZ2V0QXZhaWxhYmxlUGx1Z2lucyh0aGlzKTtcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIHBsdWdpbl0gb2YgYXZhaWxhYmxlUGx1Z2lucykge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnNldChpZCwgcGx1Z2luKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFssIGRyYXdlcl0gb2YgdGhpcy5kcmF3ZXJzKSB7XG4gICAgICAgICAgICBpZiAoZHJhd2VyLmluaXQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBkcmF3ZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAocGx1Z2luLmluaXQpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdCh0aGlzLmFjdHVhbE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGx1Z2luLmluaXRBc3luYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcGx1Z2luLmluaXRBc3luYyh0aGlzLmFjdHVhbE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGhPcHRpb25zID0gdGhpcy5hY3R1YWxPcHRpb25zLnBhcnRpY2xlcy5tb3ZlLnBhdGg7XG4gICAgICAgIGlmIChwYXRoT3B0aW9ucy5nZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF0aChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250YWluZXJfZW5naW5lLCBcImZcIikucGx1Z2lucy5nZXRQYXRoR2VuZXJhdG9yKHBhdGhPcHRpb25zLmdlbmVyYXRvcikpO1xuICAgICAgICB9XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwiY29udGFpbmVySW5pdFwiLCB7IGNvbnRhaW5lcjogdGhpcyB9KTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zZXREZW5zaXR5KCk7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmIChwbHVnaW4ucGFydGljbGVzU2V0dXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5wYXJ0aWNsZXNTZXR1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRhaW5lcl9lbmdpbmUsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KFwicGFydGljbGVzU2V0dXBcIiwgeyBjb250YWluZXI6IHRoaXMgfSk7XG4gICAgfVxuICAgIGludGVyc2VjdGlvbk1hbmFnZXIoZW50cmllcykge1xuICAgICAgICBpZiAoIXRoaXMuYWN0dWFsT3B0aW9ucy5wYXVzZU9uT3V0c2lkZVZpZXdwb3J0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoZW50cnkudGFyZ2V0ICE9PSB0aGlzLmludGVyYWN0aXZpdHkuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5fQ29udGFpbmVyX2VuZ2luZSA9IG5ldyBXZWFrTWFwKCk7XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0xvYWRlcl9lbmdpbmU7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlZEF0dHJpYnV0ZSB9IGZyb20gXCIuL1V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgaXRlbUZyb21BcnJheSB9IGZyb20gXCIuLi9VdGlscy9VdGlsc1wiO1xuZnVuY3Rpb24gZmV0Y2hFcnJvcihzdGF0dXNDb2RlKSB7XG4gICAgY29uc29sZS5lcnJvcihgRXJyb3IgdHNQYXJ0aWNsZXMgLSBmZXRjaCBzdGF0dXM6ICR7c3RhdHVzQ29kZX1gKTtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdHNQYXJ0aWNsZXMgLSBGaWxlIGNvbmZpZyBub3QgZm91bmRcIik7XG59XG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbmdpbmUpIHtcbiAgICAgICAgX0xvYWRlcl9lbmdpbmUuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0xvYWRlcl9lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgIH1cbiAgICBkb20oKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Mb2FkZXJfZW5naW5lLCBcImZcIikuZG9tQXJyYXk7XG4gICAgfVxuICAgIGRvbUl0ZW0oaW5kZXgpIHtcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5kb20oKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvbVtpbmRleF07XG4gICAgICAgIGlmIChpdGVtICYmICFpdGVtLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgZG9tLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRPcHRpb25zKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgdGFnSWQgPSAoX2EgPSBwYXJhbXMudGFnSWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGB0c3BhcnRpY2xlcyR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApfWAsIHsgb3B0aW9ucywgaW5kZXggfSA9IHBhcmFtcztcbiAgICAgICAgbGV0IGRvbUNvbnRhaW5lciA9IChfYiA9IHBhcmFtcy5lbGVtZW50KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdJZCk7XG4gICAgICAgIGlmICghZG9tQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBkb21Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZG9tQ29udGFpbmVyLmlkID0gdGFnSWQ7XG4gICAgICAgICAgICAoX2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFwcGVuZChkb21Db250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gb3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5ID8gaXRlbUZyb21BcnJheShvcHRpb25zLCBpbmRleCkgOiBvcHRpb25zLCBkb20gPSB0aGlzLmRvbSgpLCBvbGRJbmRleCA9IGRvbS5maW5kSW5kZXgoKHYpID0+IHYuaWQgPT09IHRhZ0lkKTtcbiAgICAgICAgaWYgKG9sZEluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZG9tSXRlbShvbGRJbmRleCk7XG4gICAgICAgICAgICBpZiAob2xkICYmICFvbGQuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBkb20uc3BsaWNlKG9sZEluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FudmFzRWw7XG4gICAgICAgIGlmIChkb21Db250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImNhbnZhc1wiKSB7XG4gICAgICAgICAgICBjYW52YXNFbCA9IGRvbUNvbnRhaW5lcjtcbiAgICAgICAgICAgIGNhbnZhc0VsLmRhdGFzZXRbZ2VuZXJhdGVkQXR0cmlidXRlXSA9IFwiZmFsc2VcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ2FudmFzZXMgPSBkb21Db250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdDYW52YXNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYW52YXNFbCA9IGV4aXN0aW5nQ2FudmFzZXNbMF07XG4gICAgICAgICAgICAgICAgY2FudmFzRWwuZGF0YXNldFtnZW5lcmF0ZWRBdHRyaWJ1dGVdID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FudmFzRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgIGNhbnZhc0VsLmRhdGFzZXRbZ2VuZXJhdGVkQXR0cmlidXRlXSA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgICAgIGNhbnZhc0VsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgICAgICAgY2FudmFzRWwuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgICAgICAgICAgZG9tQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhc0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdJdGVtID0gbmV3IENvbnRhaW5lcihfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Mb2FkZXJfZW5naW5lLCBcImZcIiksIHRhZ0lkLCBjdXJyZW50T3B0aW9ucyk7XG4gICAgICAgIGlmIChvbGRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBkb20uc3BsaWNlKG9sZEluZGV4LCAwLCBuZXdJdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIG5ld0l0ZW0uY2FudmFzLmxvYWRDYW52YXMoY2FudmFzRWwpO1xuICAgICAgICBhd2FpdCBuZXdJdGVtLnN0YXJ0KCk7XG4gICAgICAgIHJldHVybiBuZXdJdGVtO1xuICAgIH1cbiAgICBhc3luYyBsb2FkUmVtb3RlT3B0aW9ucyhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyB1cmw6IGpzb25VcmwsIGluZGV4IH0gPSBwYXJhbXMsIHVybCA9IGpzb25VcmwgaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW1Gcm9tQXJyYXkoanNvblVybCwgaW5kZXgpIDoganNvblVybDtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGZldGNoRXJyb3IocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkT3B0aW9ucyh7XG4gICAgICAgICAgICB0YWdJZDogcGFyYW1zLnRhZ0lkLFxuICAgICAgICAgICAgZWxlbWVudDogcGFyYW1zLmVsZW1lbnQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIG9wdGlvbnM6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkKHRhZ0lkLCBvcHRpb25zLCBpbmRleCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7IGluZGV4IH07XG4gICAgICAgIGlmICh0eXBlb2YgdGFnSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcy50YWdJZCA9IHRhZ0lkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zLm9wdGlvbnMgPSB0YWdJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcy5pbmRleCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHBhcmFtcy5pbmRleDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcy5vcHRpb25zID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgPyBvcHRpb25zIDogcGFyYW1zLm9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZE9wdGlvbnMocGFyYW1zKTtcbiAgICB9XG4gICAgYXN5bmMgc2V0KGlkLCBkb21Db250YWluZXIsIG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaW5kZXggfTtcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zLnRhZ0lkID0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb21Db250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnQgPSBkb21Db250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMub3B0aW9ucyA9IGRvbUNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcy5pbmRleCA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMub3B0aW9ucyA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHBhcmFtcy5vcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRPcHRpb25zKHBhcmFtcyk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRKU09OKHRhZ0lkLCBqc29uVXJsLCBpbmRleCkge1xuICAgICAgICBsZXQgdXJsLCBpZDtcbiAgICAgICAgaWYgKHR5cGVvZiBqc29uVXJsID09PSBcIm51bWJlclwiIHx8IGpzb25VcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdXJsID0gdGFnSWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZCA9IHRhZ0lkO1xuICAgICAgICAgICAgdXJsID0ganNvblVybDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkUmVtb3RlT3B0aW9ucyh7IHRhZ0lkOiBpZCwgdXJsLCBpbmRleCB9KTtcbiAgICB9XG4gICAgYXN5bmMgc2V0SlNPTihpZCwgZG9tQ29udGFpbmVyLCBqc29uVXJsLCBpbmRleCkge1xuICAgICAgICBsZXQgdXJsLCBuZXdJZCwgbmV3SW5kZXgsIGVsZW1lbnQ7XG4gICAgICAgIGlmIChpZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gaWQ7XG4gICAgICAgICAgICB1cmwgPSBkb21Db250YWluZXI7XG4gICAgICAgICAgICBuZXdJbmRleCA9IGpzb25Vcmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdJZCA9IGlkO1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvbUNvbnRhaW5lcjtcbiAgICAgICAgICAgIHVybCA9IGpzb25Vcmw7XG4gICAgICAgICAgICBuZXdJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRSZW1vdGVPcHRpb25zKHsgdGFnSWQ6IG5ld0lkLCB1cmwsIGluZGV4OiBuZXdJbmRleCwgZWxlbWVudCB9KTtcbiAgICB9XG4gICAgc2V0T25DbGlja0hhbmRsZXIoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5kb20oKTtcbiAgICAgICAgaWYgKCFkb20ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBzZXQgY2xpY2sgaGFuZGxlcnMgYWZ0ZXIgY2FsbGluZyB0c1BhcnRpY2xlcy5sb2FkKCkgb3IgdHNQYXJ0aWNsZXMubG9hZEpTT04oKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGRvbUl0ZW0gb2YgZG9tKSB7XG4gICAgICAgICAgICBkb21JdGVtLmFkZENsaWNrSGFuZGxlcihjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Mb2FkZXJfZW5naW5lLCBcImZcIikuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0xvYWRlcl9lbmdpbmUsIFwiZlwiKS5ldmVudERpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Mb2FkZXJfZW5naW5lLCBcImZcIikuZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQodHlwZSwgYXJncyk7XG4gICAgfVxufVxuX0xvYWRlcl9lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9QYXJ0aWNsZV9lbmdpbmU7XG5pbXBvcnQgeyBjYWxjRXhhY3RQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUsIGNsYW1wLCBnZXREaXN0YW5jZSwgZ2V0UGFydGljbGVCYXNlVmVsb2NpdHksIGdldFBhcnRpY2xlRGlyZWN0aW9uQW5nbGUsIGdldFJhbmdlTWF4LCBnZXRSYW5nZU1pbiwgZ2V0UmFuZ2VWYWx1ZSwgZ2V0VmFsdWUsIHJhbmRvbUluUmFuZ2UsIHNldFJhbmdlVmFsdWUsIH0gZnJvbSBcIi4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgeyBjb2xvclRvUmdiLCBnZXRIc2xGcm9tQW5pbWF0aW9uIH0gZnJvbSBcIi4uL1V0aWxzL0NvbG9yVXRpbHNcIjtcbmltcG9ydCB7IGRlZXBFeHRlbmQsIGlzSW5BcnJheSwgaXRlbUZyb21BcnJheSwgbG9hZFBhcnRpY2xlc09wdGlvbnMgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSBcIi4uL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvU2hhcGUvU2hhcGVcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1V0aWxzL1ZlY3RvclwiO1xuaW1wb3J0IHsgVmVjdG9yM2QgfSBmcm9tIFwiLi9VdGlscy9WZWN0b3IzZFwiO1xuaW1wb3J0IHsgYWx0ZXJIc2wgfSBmcm9tIFwiLi4vVXRpbHMvQ2FudmFzVXRpbHNcIjtcbmNvbnN0IGZpeE91dE1vZGUgPSAoZGF0YSkgPT4ge1xuICAgIGlmICghKGlzSW5BcnJheShkYXRhLm91dE1vZGUsIGRhdGEuY2hlY2tNb2RlcykgfHwgaXNJbkFycmF5KGRhdGEub3V0TW9kZSwgZGF0YS5jaGVja01vZGVzKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jb29yZCA+IGRhdGEubWF4Q29vcmQgLSBkYXRhLnJhZGl1cyAqIDIpIHtcbiAgICAgICAgZGF0YS5zZXRDYigtZGF0YS5yYWRpdXMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmNvb3JkIDwgZGF0YS5yYWRpdXMgKiAyKSB7XG4gICAgICAgIGRhdGEuc2V0Q2IoZGF0YS5yYWRpdXMpO1xuICAgIH1cbn07XG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKGVuZ2luZSwgaWQsIGNvbnRhaW5lciwgcG9zaXRpb24sIG92ZXJyaWRlT3B0aW9ucywgZ3JvdXApIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIF9QYXJ0aWNsZV9lbmdpbmUuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1BhcnRpY2xlX2VuZ2luZSwgZW5naW5lLCBcImZcIik7XG4gICAgICAgIHRoaXMuZmlsbCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhc3RQYXRoVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5icmVha2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGxpdENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5taXNwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXRpbmEgPSB7XG4gICAgICAgICAgICBtYXhEaXN0YW5jZToge30sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3V0VHlwZSA9IFwibm9ybWFsXCI7XG4gICAgICAgIHRoaXMuaWdub3Jlc1Jlc2l6ZVJhdGlvID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcHhSYXRpbyA9IGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbywgbWFpbk9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgcGFydGljbGVzT3B0aW9ucyA9IGxvYWRQYXJ0aWNsZXNPcHRpb25zKG1haW5PcHRpb25zLnBhcnRpY2xlcyk7XG4gICAgICAgIGNvbnN0IHNoYXBlVHlwZSA9IHBhcnRpY2xlc09wdGlvbnMuc2hhcGUudHlwZSwgcmVkdWNlRHVwbGljYXRlcyA9IHBhcnRpY2xlc09wdGlvbnMucmVkdWNlRHVwbGljYXRlcztcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlVHlwZSBpbnN0YW5jZW9mIEFycmF5ID8gaXRlbUZyb21BcnJheShzaGFwZVR5cGUsIHRoaXMuaWQsIHJlZHVjZUR1cGxpY2F0ZXMpIDogc2hhcGVUeXBlO1xuICAgICAgICBpZiAob3ZlcnJpZGVPcHRpb25zID09PSBudWxsIHx8IG92ZXJyaWRlT3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3ZlcnJpZGVPcHRpb25zLnNoYXBlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGVPcHRpb25zLnNoYXBlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdmVycmlkZVNoYXBlVHlwZSA9IG92ZXJyaWRlT3B0aW9ucy5zaGFwZS50eXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGUgPVxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZVNoYXBlVHlwZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW1Gcm9tQXJyYXkob3ZlcnJpZGVTaGFwZVR5cGUsIHRoaXMuaWQsIHJlZHVjZUR1cGxpY2F0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG92ZXJyaWRlU2hhcGVUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2hhcGVPcHRpb25zID0gbmV3IFNoYXBlKCk7XG4gICAgICAgICAgICBzaGFwZU9wdGlvbnMubG9hZChvdmVycmlkZU9wdGlvbnMuc2hhcGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlRGF0YSA9IHRoaXMubG9hZFNoYXBlRGF0YShzaGFwZU9wdGlvbnMsIHJlZHVjZUR1cGxpY2F0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZURhdGEgPSB0aGlzLmxvYWRTaGFwZURhdGEocGFydGljbGVzT3B0aW9ucy5zaGFwZSwgcmVkdWNlRHVwbGljYXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJyaWRlT3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZXNPcHRpb25zLmxvYWQob3ZlcnJpZGVPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKChfYSA9IHRoaXMuc2hhcGVEYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFydGljbGVzKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZXNPcHRpb25zLmxvYWQoKF9iID0gdGhpcy5zaGFwZURhdGEpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0aWNsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsbCA9IChfZCA9IChfYyA9IHRoaXMuc2hhcGVEYXRhKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZmlsbCkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogdGhpcy5maWxsO1xuICAgICAgICB0aGlzLmNsb3NlID0gKF9mID0gKF9lID0gdGhpcy5zaGFwZURhdGEpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5jbG9zZSkgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogdGhpcy5jbG9zZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcGFydGljbGVzT3B0aW9ucztcbiAgICAgICAgdGhpcy5wYXRoRGVsYXkgPSBnZXRWYWx1ZSh0aGlzLm9wdGlvbnMubW92ZS5wYXRoLmRlbGF5KSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHpJbmRleFZhbHVlID0gZ2V0UmFuZ2VWYWx1ZSh0aGlzLm9wdGlvbnMuekluZGV4LnZhbHVlKTtcbiAgICAgICAgY29udGFpbmVyLnJldGluYS5pbml0UGFydGljbGUodGhpcyk7XG4gICAgICAgIGNvbnN0IHNpemVPcHRpb25zID0gdGhpcy5vcHRpb25zLnNpemUsIHNpemVSYW5nZSA9IHNpemVPcHRpb25zLnZhbHVlO1xuICAgICAgICB0aGlzLnNpemUgPSB7XG4gICAgICAgICAgICBlbmFibGU6IHNpemVPcHRpb25zLmFuaW1hdGlvbi5lbmFibGUsXG4gICAgICAgICAgICB2YWx1ZTogZ2V0UmFuZ2VWYWx1ZShzaXplT3B0aW9ucy52YWx1ZSkgKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8sXG4gICAgICAgICAgICBtYXg6IGdldFJhbmdlTWF4KHNpemVSYW5nZSkgKiBweFJhdGlvLFxuICAgICAgICAgICAgbWluOiBnZXRSYW5nZU1pbihzaXplUmFuZ2UpICogcHhSYXRpbyxcbiAgICAgICAgICAgIGxvb3BzOiAwLFxuICAgICAgICAgICAgbWF4TG9vcHM6IGdldFJhbmdlVmFsdWUoc2l6ZU9wdGlvbnMuYW5pbWF0aW9uLmNvdW50KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2l6ZUFuaW1hdGlvbiA9IHNpemVPcHRpb25zLmFuaW1hdGlvbjtcbiAgICAgICAgaWYgKHNpemVBbmltYXRpb24uZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUuc3RhdHVzID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAoc2l6ZUFuaW1hdGlvbi5zdGFydFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUudmFsdWUgPSB0aGlzLnNpemUubWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUuc3RhdHVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhbmRvbVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUudmFsdWUgPSByYW5kb21JblJhbmdlKHRoaXMuc2l6ZSkgKiBweFJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUuc3RhdHVzID0gTWF0aC5yYW5kb20oKSA+PSAwLjUgPyAwIDogMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS52YWx1ZSA9IHRoaXMuc2l6ZS5tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2l6ZS52ZWxvY2l0eSA9XG4gICAgICAgICAgICAgICAgKCgoX2cgPSB0aGlzLnJldGluYS5zaXplQW5pbWF0aW9uU3BlZWQpICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IGNvbnRhaW5lci5yZXRpbmEuc2l6ZUFuaW1hdGlvblNwZWVkKSAvIDEwMCkgKlxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvcjtcbiAgICAgICAgICAgIGlmICghc2l6ZUFuaW1hdGlvbi5zeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplLnZlbG9jaXR5ICo9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWJibGUgPSB7XG4gICAgICAgICAgICBpblJhbmdlOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuY2FsY1Bvc2l0aW9uKGNvbnRhaW5lciwgcG9zaXRpb24sIGNsYW1wKHpJbmRleFZhbHVlLCAwLCBjb250YWluZXIuekxheWVycykpO1xuICAgICAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uY29weSgpO1xuICAgICAgICBjb25zdCBjYW52YXNTaXplID0gY29udGFpbmVyLmNhbnZhcy5zaXplLCBtb3ZlQ2VudGVyUGVyYyA9IHRoaXMub3B0aW9ucy5tb3ZlLmNlbnRlcjtcbiAgICAgICAgdGhpcy5tb3ZlQ2VudGVyID0ge1xuICAgICAgICAgICAgeDogKGNhbnZhc1NpemUud2lkdGggKiBtb3ZlQ2VudGVyUGVyYy54KSAvIDEwMCxcbiAgICAgICAgICAgIHk6IChjYW52YXNTaXplLmhlaWdodCAqIG1vdmVDZW50ZXJQZXJjLnkpIC8gMTAwLFxuICAgICAgICAgICAgcmFkaXVzOiB0aGlzLm9wdGlvbnMubW92ZS5jZW50ZXIucmFkaXVzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGdldFBhcnRpY2xlRGlyZWN0aW9uQW5nbGUodGhpcy5vcHRpb25zLm1vdmUuZGlyZWN0aW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLm1vdmVDZW50ZXIpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9ucy5tb3ZlLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImluc2lkZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMub3V0VHlwZSA9IFwiaW5zaWRlXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib3V0c2lkZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMub3V0VHlwZSA9IFwib3V0c2lkZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbFZlbG9jaXR5ID0gdGhpcy5jYWxjdWxhdGVWZWxvY2l0eSgpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5pbml0aWFsVmVsb2NpdHkuY29weSgpO1xuICAgICAgICB0aGlzLm1vdmVEZWNheSA9IDEgLSBnZXRSYW5nZVZhbHVlKHRoaXMub3B0aW9ucy5tb3ZlLmRlY2F5KTtcbiAgICAgICAgY29uc3QgZ3Jhdml0eU9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubW92ZS5ncmF2aXR5O1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSB7XG4gICAgICAgICAgICBlbmFibGU6IGdyYXZpdHlPcHRpb25zLmVuYWJsZSxcbiAgICAgICAgICAgIGFjY2VsZXJhdGlvbjogZ2V0UmFuZ2VWYWx1ZShncmF2aXR5T3B0aW9ucy5hY2NlbGVyYXRpb24pLFxuICAgICAgICAgICAgaW52ZXJzZTogZ3Jhdml0eU9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBWZWN0b3Iub3JpZ2luO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXMgPSBjb250YWluZXIucGFydGljbGVzO1xuICAgICAgICBwYXJ0aWNsZXMubmVlZHNTb3J0ID0gcGFydGljbGVzLm5lZWRzU29ydCB8fCBwYXJ0aWNsZXMubGFzdFpJbmRleCA8IHRoaXMucG9zaXRpb24uejtcbiAgICAgICAgcGFydGljbGVzLmxhc3RaSW5kZXggPSB0aGlzLnBvc2l0aW9uLno7XG4gICAgICAgIHRoaXMuekluZGV4RmFjdG9yID0gdGhpcy5wb3NpdGlvbi56IC8gY29udGFpbmVyLnpMYXllcnM7XG4gICAgICAgIHRoaXMuc2lkZXMgPSAyNDtcbiAgICAgICAgbGV0IGRyYXdlciA9IGNvbnRhaW5lci5kcmF3ZXJzLmdldCh0aGlzLnNoYXBlKTtcbiAgICAgICAgaWYgKCFkcmF3ZXIpIHtcbiAgICAgICAgICAgIGRyYXdlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1BhcnRpY2xlX2VuZ2luZSwgXCJmXCIpLnBsdWdpbnMuZ2V0U2hhcGVEcmF3ZXIodGhpcy5zaGFwZSk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRyYXdlcnMuc2V0KHRoaXMuc2hhcGUsIGRyYXdlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRyYXdlciA9PT0gbnVsbCB8fCBkcmF3ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRyYXdlci5sb2FkU2hhcGUpIHtcbiAgICAgICAgICAgIGRyYXdlciA9PT0gbnVsbCB8fCBkcmF3ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRyYXdlci5sb2FkU2hhcGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2lkZUNvdW50RnVuYyA9IGRyYXdlciA9PT0gbnVsbCB8fCBkcmF3ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRyYXdlci5nZXRTaWRlc0NvdW50O1xuICAgICAgICBpZiAoc2lkZUNvdW50RnVuYykge1xuICAgICAgICAgICAgdGhpcy5zaWRlcyA9IHNpZGVDb3VudEZ1bmModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saWZlID0gdGhpcy5sb2FkTGlmZSgpO1xuICAgICAgICB0aGlzLnNwYXduaW5nID0gdGhpcy5saWZlLmRlbGF5ID4gMDtcbiAgICAgICAgdGhpcy5zaGFkb3dDb2xvciA9IGNvbG9yVG9SZ2IodGhpcy5vcHRpb25zLnNoYWRvdy5jb2xvcik7XG4gICAgICAgIGZvciAoY29uc3QgdXBkYXRlciBvZiBjb250YWluZXIucGFydGljbGVzLnVwZGF0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlci5pbml0KSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlci5pbml0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbW92ZXIgb2YgY29udGFpbmVyLnBhcnRpY2xlcy5tb3ZlcnMpIHtcbiAgICAgICAgICAgIGlmIChtb3Zlci5pbml0KSB7XG4gICAgICAgICAgICAgICAgbW92ZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZHJhd2VyICYmIGRyYXdlci5wYXJ0aWNsZUluaXQpIHtcbiAgICAgICAgICAgIGRyYXdlci5wYXJ0aWNsZUluaXQoY29udGFpbmVyLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgY29udGFpbmVyLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmIChwbHVnaW4ucGFydGljbGVDcmVhdGVkKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnBhcnRpY2xlQ3JlYXRlZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1Zpc2libGUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5kZXN0cm95ZWQgJiYgIXRoaXMuc3Bhd25pbmcgJiYgdGhpcy5pc0luc2lkZUNhbnZhcygpO1xuICAgIH1cbiAgICBpc0luc2lkZUNhbnZhcygpIHtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoKSwgY2FudmFzU2l6ZSA9IHRoaXMuY29udGFpbmVyLmNhbnZhcy5zaXplO1xuICAgICAgICByZXR1cm4gKHRoaXMucG9zaXRpb24ueCA+PSAtcmFkaXVzICYmXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPj0gLXJhZGl1cyAmJlxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IDw9IGNhbnZhc1NpemUuaGVpZ2h0ICsgcmFkaXVzICYmXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPD0gY2FudmFzU2l6ZS53aWR0aCArIHJhZGl1cyk7XG4gICAgfVxuICAgIGRyYXcoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiBjb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgY29udGFpbmVyLmNhbnZhcy5kcmF3UGFydGljbGVQbHVnaW4ocGx1Z2luLCB0aGlzLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmNhbnZhcy5kcmF3UGFydGljbGUodGhpcywgZGVsdGEpO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCArIHRoaXMub2Zmc2V0LngsXG4gICAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLm9mZnNldC55LFxuICAgICAgICAgICAgejogdGhpcy5wb3NpdGlvbi56LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRSYWRpdXMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuYnViYmxlLnJhZGl1cykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5zaXplLnZhbHVlO1xuICAgIH1cbiAgICBnZXRNYXNzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0UmFkaXVzKCkgKiogMiAqIE1hdGguUEkpIC8gMjtcbiAgICB9XG4gICAgZ2V0RmlsbENvbG9yKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBjb2xvciA9IChfYSA9IHRoaXMuYnViYmxlLmNvbG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBnZXRIc2xGcm9tQW5pbWF0aW9uKHRoaXMuY29sb3IpO1xuICAgICAgICBpZiAoY29sb3IgJiYgdGhpcy5yb2xsICYmICh0aGlzLmJhY2tDb2xvciB8fCB0aGlzLnJvbGwuYWx0ZXIpKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrRmFjdG9yID0gdGhpcy5vcHRpb25zLnJvbGwubW9kZSA9PT0gXCJib3RoXCIgPyAyIDogMSwgYmFja1N1bSA9IHRoaXMub3B0aW9ucy5yb2xsLm1vZGUgPT09IFwiaG9yaXpvbnRhbFwiID8gTWF0aC5QSSAvIDIgOiAwLCByb2xsZWQgPSBNYXRoLmZsb29yKCgoKF9iID0gdGhpcy5yb2xsLmFuZ2xlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwKSArIGJhY2tTdW0pIC8gKE1hdGguUEkgLyBiYWNrRmFjdG9yKSkgJSAyO1xuICAgICAgICAgICAgaWYgKHJvbGxlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhY2tDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5iYWNrQ29sb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGwuYWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsdGVySHNsKGNvbG9yLCB0aGlzLnJvbGwuYWx0ZXIudHlwZSwgdGhpcy5yb2xsLmFsdGVyLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbiAgICBnZXRTdHJva2VDb2xvcigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IHRoaXMuYnViYmxlLmNvbG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBnZXRIc2xGcm9tQW5pbWF0aW9uKHRoaXMuc3Ryb2tlQ29sb3IpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0aGlzLmdldEZpbGxDb2xvcigpO1xuICAgIH1cbiAgICBkZXN0cm95KG92ZXJyaWRlKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idWJibGUuaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy51bmJyZWFrYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idWJibGUuaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5jb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi5wYXJ0aWNsZURlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5wYXJ0aWNsZURlc3Ryb3llZCh0aGlzLCBvdmVycmlkZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzdHJveU9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZGVzdHJveTtcbiAgICAgICAgaWYgKGRlc3Ryb3lPcHRpb25zLm1vZGUgPT09IFwic3BsaXRcIikge1xuICAgICAgICAgICAgdGhpcy5zcGxpdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5vcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkubG9vcHMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l6ZS5sb29wcyA9IDA7XG4gICAgfVxuICAgIHNwbGl0KCkge1xuICAgICAgICBjb25zdCBzcGxpdE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZGVzdHJveS5zcGxpdDtcbiAgICAgICAgaWYgKHNwbGl0T3B0aW9ucy5jb3VudCA+PSAwICYmIHRoaXMuc3BsaXRDb3VudCsrID4gc3BsaXRPcHRpb25zLmNvdW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmF0ZSA9IGdldFZhbHVlKHNwbGl0T3B0aW9ucy5yYXRlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXRlOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBhcnRpY2xlcy5hZGRTcGxpdFBhcnRpY2xlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhbGNQb3NpdGlvbihjb250YWluZXIsIHBvc2l0aW9uLCB6SW5kZXgsIHRyeUNvdW50ID0gMCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiBjb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luUG9zID0gcGx1Z2luLnBhcnRpY2xlUG9zaXRpb24gIT09IHVuZGVmaW5lZCA/IHBsdWdpbi5wYXJ0aWNsZVBvc2l0aW9uKHBvc2l0aW9uLCB0aGlzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChwbHVnaW5Qb3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBWZWN0b3IzZC5jcmVhdGUocGx1Z2luUG9zLngsIHBsdWdpblBvcy55LCB6SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbnZhc1NpemUgPSBjb250YWluZXIuY2FudmFzLnNpemUsIGV4YWN0UG9zaXRpb24gPSBjYWxjRXhhY3RQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUoe1xuICAgICAgICAgICAgc2l6ZTogY2FudmFzU2l6ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgfSksIHBvcyA9IFZlY3RvcjNkLmNyZWF0ZShleGFjdFBvc2l0aW9uLngsIGV4YWN0UG9zaXRpb24ueSwgekluZGV4KSwgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoKSwgb3V0TW9kZXMgPSB0aGlzLm9wdGlvbnMubW92ZS5vdXRNb2RlcywgZml4SG9yaXpvbnRhbCA9IChvdXRNb2RlKSA9PiB7XG4gICAgICAgICAgICBmaXhPdXRNb2RlKHtcbiAgICAgICAgICAgICAgICBvdXRNb2RlLFxuICAgICAgICAgICAgICAgIGNoZWNrTW9kZXM6IFtcImJvdW5jZVwiLCBcImJvdW5jZS1ob3Jpem9udGFsXCJdLFxuICAgICAgICAgICAgICAgIGNvb3JkOiBwb3MueCxcbiAgICAgICAgICAgICAgICBtYXhDb29yZDogY29udGFpbmVyLmNhbnZhcy5zaXplLndpZHRoLFxuICAgICAgICAgICAgICAgIHNldENiOiAodmFsdWUpID0+IChwb3MueCArPSB2YWx1ZSksXG4gICAgICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZpeFZlcnRpY2FsID0gKG91dE1vZGUpID0+IHtcbiAgICAgICAgICAgIGZpeE91dE1vZGUoe1xuICAgICAgICAgICAgICAgIG91dE1vZGUsXG4gICAgICAgICAgICAgICAgY2hlY2tNb2RlczogW1wiYm91bmNlXCIsIFwiYm91bmNlLXZlcnRpY2FsXCJdLFxuICAgICAgICAgICAgICAgIGNvb3JkOiBwb3MueSxcbiAgICAgICAgICAgICAgICBtYXhDb29yZDogY29udGFpbmVyLmNhbnZhcy5zaXplLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzZXRDYjogKHZhbHVlKSA9PiAocG9zLnkgKz0gdmFsdWUpLFxuICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBmaXhIb3Jpem9udGFsKChfYSA9IG91dE1vZGVzLmxlZnQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG91dE1vZGVzLmRlZmF1bHQpO1xuICAgICAgICBmaXhIb3Jpem9udGFsKChfYiA9IG91dE1vZGVzLnJpZ2h0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBvdXRNb2Rlcy5kZWZhdWx0KTtcbiAgICAgICAgZml4VmVydGljYWwoKF9jID0gb3V0TW9kZXMudG9wKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBvdXRNb2Rlcy5kZWZhdWx0KTtcbiAgICAgICAgZml4VmVydGljYWwoKF9kID0gb3V0TW9kZXMuYm90dG9tKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBvdXRNb2Rlcy5kZWZhdWx0KTtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tPdmVybGFwKHBvcywgdHJ5Q291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjUG9zaXRpb24oY29udGFpbmVyLCB1bmRlZmluZWQsIHpJbmRleCwgdHJ5Q291bnQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cbiAgICBjaGVja092ZXJsYXAocG9zLCB0cnlDb3VudCA9IDApIHtcbiAgICAgICAgY29uc3QgY29sbGlzaW9uc09wdGlvbnMgPSB0aGlzLm9wdGlvbnMuY29sbGlzaW9ucywgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoKTtcbiAgICAgICAgaWYgKCFjb2xsaXNpb25zT3B0aW9ucy5lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvdmVybGFwT3B0aW9ucyA9IGNvbGxpc2lvbnNPcHRpb25zLm92ZXJsYXA7XG4gICAgICAgIGlmIChvdmVybGFwT3B0aW9ucy5lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXRyaWVzID0gb3ZlcmxhcE9wdGlvbnMucmV0cmllcztcbiAgICAgICAgaWYgKHJldHJpZXMgPj0gMCAmJiB0cnlDb3VudCA+IHJldHJpZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnRpY2xlIGlzIG92ZXJsYXBwaW5nIGFuZCBjYW4ndCBiZSBwbGFjZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG92ZXJsYXBzID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgdGhpcy5jb250YWluZXIucGFydGljbGVzLmFycmF5KSB7XG4gICAgICAgICAgICBpZiAoZ2V0RGlzdGFuY2UocG9zLCBwYXJ0aWNsZS5wb3NpdGlvbikgPCByYWRpdXMgKyBwYXJ0aWNsZS5nZXRSYWRpdXMoKSkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXBzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3ZlcmxhcHM7XG4gICAgfVxuICAgIGNhbGN1bGF0ZVZlbG9jaXR5KCkge1xuICAgICAgICBjb25zdCBiYXNlVmVsb2NpdHkgPSBnZXRQYXJ0aWNsZUJhc2VWZWxvY2l0eSh0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIGNvbnN0IHJlcyA9IGJhc2VWZWxvY2l0eS5jb3B5KCk7XG4gICAgICAgIGNvbnN0IG1vdmVPcHRpb25zID0gdGhpcy5vcHRpb25zLm1vdmU7XG4gICAgICAgIGlmIChtb3ZlT3B0aW9ucy5kaXJlY3Rpb24gPT09IFwiaW5zaWRlXCIgfHwgbW92ZU9wdGlvbnMuZGlyZWN0aW9uID09PSBcIm91dHNpZGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYWQgPSAoTWF0aC5QSSAvIDE4MCkgKiBnZXRSYW5nZVZhbHVlKG1vdmVPcHRpb25zLmFuZ2xlLnZhbHVlKTtcbiAgICAgICAgY29uc3QgcmFkT2Zmc2V0ID0gKE1hdGguUEkgLyAxODApICogZ2V0UmFuZ2VWYWx1ZShtb3ZlT3B0aW9ucy5hbmdsZS5vZmZzZXQpO1xuICAgICAgICBjb25zdCByYW5nZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHJhZE9mZnNldCAtIHJhZCAvIDIsXG4gICAgICAgICAgICByaWdodDogcmFkT2Zmc2V0ICsgcmFkIC8gMixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFtb3ZlT3B0aW9ucy5zdHJhaWdodCkge1xuICAgICAgICAgICAgcmVzLmFuZ2xlICs9IHJhbmRvbUluUmFuZ2Uoc2V0UmFuZ2VWYWx1ZShyYW5nZS5sZWZ0LCByYW5nZS5yaWdodCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb3ZlT3B0aW9ucy5yYW5kb20gJiYgdHlwZW9mIG1vdmVPcHRpb25zLnNwZWVkID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXMubGVuZ3RoICo9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgbG9hZFNoYXBlRGF0YShzaGFwZU9wdGlvbnMsIHJlZHVjZUR1cGxpY2F0ZXMpIHtcbiAgICAgICAgY29uc3Qgc2hhcGVEYXRhID0gc2hhcGVPcHRpb25zLm9wdGlvbnNbdGhpcy5zaGFwZV07XG4gICAgICAgIGlmIChzaGFwZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWVwRXh0ZW5kKHt9LCBzaGFwZURhdGEgaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW1Gcm9tQXJyYXkoc2hhcGVEYXRhLCB0aGlzLmlkLCByZWR1Y2VEdXBsaWNhdGVzKSA6IHNoYXBlRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZExpZmUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBwYXJ0aWNsZXNPcHRpb25zID0gdGhpcy5vcHRpb25zLCBsaWZlT3B0aW9ucyA9IHBhcnRpY2xlc09wdGlvbnMubGlmZSwgbGlmZSA9IHtcbiAgICAgICAgICAgIGRlbGF5OiBjb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvclxuICAgICAgICAgICAgICAgID8gKChnZXRSYW5nZVZhbHVlKGxpZmVPcHRpb25zLmRlbGF5LnZhbHVlKSAqIChsaWZlT3B0aW9ucy5kZWxheS5zeW5jID8gMSA6IE1hdGgucmFuZG9tKCkpKSAvXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZXRpbmEucmVkdWNlRmFjdG9yKSAqXG4gICAgICAgICAgICAgICAgICAgIDEwMDBcbiAgICAgICAgICAgICAgICA6IDAsXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAsXG4gICAgICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLnJldGluYS5yZWR1Y2VGYWN0b3JcbiAgICAgICAgICAgICAgICA/ICgoZ2V0UmFuZ2VWYWx1ZShsaWZlT3B0aW9ucy5kdXJhdGlvbi52YWx1ZSkgKiAobGlmZU9wdGlvbnMuZHVyYXRpb24uc3luYyA/IDEgOiBNYXRoLnJhbmRvbSgpKSkgL1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmV0aW5hLnJlZHVjZUZhY3RvcikgKlxuICAgICAgICAgICAgICAgICAgICAxMDAwXG4gICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgdGltZTogMCxcbiAgICAgICAgICAgIGNvdW50OiBwYXJ0aWNsZXNPcHRpb25zLmxpZmUuY291bnQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaWZlLmR1cmF0aW9uIDw9IDApIHtcbiAgICAgICAgICAgIGxpZmUuZHVyYXRpb24gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlmZS5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICBsaWZlLmNvdW50ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpZmU7XG4gICAgfVxufVxuX1BhcnRpY2xlX2VuZ2luZSA9IG5ldyBXZWFrTWFwKCk7XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX1BhcnRpY2xlc19lbmdpbmU7XG5pbXBvcnQgeyBjYWxjUG9zaXRpb25Gcm9tU2l6ZSwgZ2V0UmFuZ2VNYXgsIGdldFJhbmdlTWluLCBnZXRWYWx1ZSwgcmFuZG9tSW5SYW5nZSwgc2V0UmFuZ2VWYWx1ZSwgfSBmcm9tIFwiLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEludGVyYWN0aW9uTWFuYWdlciB9IGZyb20gXCIuL1V0aWxzL0ludGVyYWN0aW9uTWFuYWdlclwiO1xuaW1wb3J0IHsgUGFydGljbGUgfSBmcm9tIFwiLi9QYXJ0aWNsZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9VdGlscy9Qb2ludFwiO1xuaW1wb3J0IHsgUXVhZFRyZWUgfSBmcm9tIFwiLi9VdGlscy9RdWFkVHJlZVwiO1xuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4vVXRpbHMvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgeyBsb2FkUGFydGljbGVzT3B0aW9ucyB9IGZyb20gXCIuLi9VdGlscy9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyB7XG4gICAgY29uc3RydWN0b3IoZW5naW5lLCBjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF9QYXJ0aWNsZXNfZW5naW5lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9QYXJ0aWNsZXNfZW5naW5lLCBlbmdpbmUsIFwiZlwiKTtcbiAgICAgICAgdGhpcy5uZXh0SWQgPSAwO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgICAgIHRoaXMuekFycmF5ID0gW107XG4gICAgICAgIHRoaXMubGltaXQgPSAwO1xuICAgICAgICB0aGlzLm5lZWRzU29ydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3RaSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmZyZXFzID0ge1xuICAgICAgICAgICAgbGlua3M6IG5ldyBNYXAoKSxcbiAgICAgICAgICAgIHRyaWFuZ2xlczogbmV3IE1hcCgpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmludGVyYWN0aW9uTWFuYWdlciA9IG5ldyBJbnRlcmFjdGlvbk1hbmFnZXIoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfUGFydGljbGVzX2VuZ2luZSwgXCJmXCIpLCBjb250YWluZXIpO1xuICAgICAgICBjb25zdCBjYW52YXNTaXplID0gdGhpcy5jb250YWluZXIuY2FudmFzLnNpemU7XG4gICAgICAgIHRoaXMubGlua3NDb2xvcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucXVhZFRyZWUgPSBuZXcgUXVhZFRyZWUobmV3IFJlY3RhbmdsZSgtY2FudmFzU2l6ZS53aWR0aCAvIDQsIC1jYW52YXNTaXplLmhlaWdodCAvIDQsIChjYW52YXNTaXplLndpZHRoICogMykgLyAyLCAoY2FudmFzU2l6ZS5oZWlnaHQgKiAzKSAvIDIpLCA0KTtcbiAgICAgICAgdGhpcy5tb3ZlcnMgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9QYXJ0aWNsZXNfZW5naW5lLCBcImZcIikucGx1Z2lucy5nZXRNb3ZlcnMoY29udGFpbmVyLCB0cnVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVycyA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1BhcnRpY2xlc19lbmdpbmUsIFwiZlwiKS5wbHVnaW5zLmdldFVwZGF0ZXJzKGNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXkubGVuZ3RoO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgIHRoaXMubGFzdFpJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubmVlZHNTb3J0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJlcXMubGlua3MgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZnJlcXMudHJpYW5nbGVzID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZXJzID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfUGFydGljbGVzX2VuZ2luZSwgXCJmXCIpLnBsdWdpbnMuZ2V0VXBkYXRlcnMoY29udGFpbmVyLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIuaW5pdCgpO1xuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgY29udGFpbmVyLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmIChwbHVnaW4ucGFydGljbGVzSW5pdGlhbGl6YXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSBwbHVnaW4ucGFydGljbGVzSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRNYW51YWxQYXJ0aWNsZXMoKTtcbiAgICAgICAgaWYgKCFoYW5kbGVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIGluIG9wdGlvbnMucGFydGljbGVzLmdyb3Vwcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwT3B0aW9ucyA9IG9wdGlvbnMucGFydGljbGVzLmdyb3Vwc1tncm91cF07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuY291bnQsIGogPSAwOyBqIDwgKChfYSA9IGdyb3VwT3B0aW9ucy5udW1iZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZSkgJiYgaSA8IG9wdGlvbnMucGFydGljbGVzLm51bWJlci52YWx1ZTsgaSsrLCBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZSh1bmRlZmluZWQsIGdyb3VwT3B0aW9ucywgZ3JvdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNvdW50OyBpIDwgb3B0aW9ucy5wYXJ0aWNsZXMubnVtYmVyLnZhbHVlOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLnBhdGhHZW5lcmF0b3IuaW5pdChjb250YWluZXIpO1xuICAgIH1cbiAgICBhc3luYyByZWRyYXcoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZHJhdyh7IHZhbHVlOiAwLCBmYWN0b3I6IDAgfSk7XG4gICAgfVxuICAgIHJlbW92ZUF0KGluZGV4LCBxdWFudGl0eSA9IDEsIGdyb3VwLCBvdmVycmlkZSkge1xuICAgICAgICBpZiAoIShpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMuY291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlbGV0ZWQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGRlbGV0ZWQgPCBxdWFudGl0eSAmJiBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMuYXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoIXBhcnRpY2xlIHx8IHBhcnRpY2xlLmdyb3VwICE9PSBncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydGljbGUuZGVzdHJveShvdmVycmlkZSk7XG4gICAgICAgICAgICB0aGlzLmFycmF5LnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgY29uc3QgeklkeCA9IHRoaXMuekFycmF5LmluZGV4T2YocGFydGljbGUpO1xuICAgICAgICAgICAgdGhpcy56QXJyYXkuc3BsaWNlKHpJZHgsIDEpO1xuICAgICAgICAgICAgZGVsZXRlZCsrO1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfUGFydGljbGVzX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJwYXJ0aWNsZVJlbW92ZWRcIiwge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlKHBhcnRpY2xlLCBncm91cCwgb3ZlcnJpZGUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdCh0aGlzLmFycmF5LmluZGV4T2YocGFydGljbGUpLCB1bmRlZmluZWQsIGdyb3VwLCBvdmVycmlkZSk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZShkZWx0YSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgcGFydGljbGVzVG9EZWxldGUgPSBbXTtcbiAgICAgICAgY29udGFpbmVyLnBhdGhHZW5lcmF0b3IudXBkYXRlKCk7XG4gICAgICAgIGZvciAoY29uc3QgWywgcGx1Z2luXSBvZiBjb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi51cGRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi51cGRhdGUoZGVsdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgdGhpcy5hcnJheSkge1xuICAgICAgICAgICAgY29uc3QgcmVzaXplRmFjdG9yID0gY29udGFpbmVyLmNhbnZhcy5yZXNpemVGYWN0b3I7XG4gICAgICAgICAgICBpZiAocmVzaXplRmFjdG9yICYmICFwYXJ0aWNsZS5pZ25vcmVzUmVzaXplUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ICo9IHJlc2l6ZUZhY3Rvci53aWR0aDtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICo9IHJlc2l6ZUZhY3Rvci5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0aWNsZS5pZ25vcmVzUmVzaXplUmF0aW8gPSBmYWxzZTtcbiAgICAgICAgICAgIHBhcnRpY2xlLmJ1YmJsZS5pblJhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgdGhpcy5jb250YWluZXIucGx1Z2lucykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbHVnaW4ucGFydGljbGVVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlLCBkZWx0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBtb3ZlciBvZiB0aGlzLm1vdmVycykge1xuICAgICAgICAgICAgICAgIGlmIChtb3Zlci5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVyLm1vdmUocGFydGljbGUsIGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFydGljbGUuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGVzVG9EZWxldGUucHVzaChwYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnF1YWRUcmVlLmluc2VydChuZXcgUG9pbnQocGFydGljbGUuZ2V0UG9zaXRpb24oKSwgcGFydGljbGUpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIHBhcnRpY2xlc1RvRGVsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShwYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIuZXh0ZXJuYWxJbnRlcmFjdChkZWx0YSk7XG4gICAgICAgIGZvciAoY29uc3QgcGFydGljbGUgb2YgY29udGFpbmVyLnBhcnRpY2xlcy5hcnJheSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1cGRhdGVyIG9mIHRoaXMudXBkYXRlcnMpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVyLnVwZGF0ZShwYXJ0aWNsZSwgZGVsdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNsZS5kZXN0cm95ZWQgJiYgIXBhcnRpY2xlLnNwYXduaW5nKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIucGFydGljbGVzSW50ZXJhY3QocGFydGljbGUsIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgY29udGFpbmVyLmNhbnZhcy5yZXNpemVGYWN0b3I7XG4gICAgfVxuICAgIGFzeW5jIGRyYXcoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIGNhbnZhc1NpemUgPSB0aGlzLmNvbnRhaW5lci5jYW52YXMuc2l6ZTtcbiAgICAgICAgdGhpcy5xdWFkVHJlZSA9IG5ldyBRdWFkVHJlZShuZXcgUmVjdGFuZ2xlKC1jYW52YXNTaXplLndpZHRoIC8gNCwgLWNhbnZhc1NpemUuaGVpZ2h0IC8gNCwgKGNhbnZhc1NpemUud2lkdGggKiAzKSAvIDIsIChjYW52YXNTaXplLmhlaWdodCAqIDMpIC8gMiksIDQpO1xuICAgICAgICBjb250YWluZXIuY2FudmFzLmNsZWFyKCk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlKGRlbHRhKTtcbiAgICAgICAgaWYgKHRoaXMubmVlZHNTb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnpBcnJheS5zb3J0KChhLCBiKSA9PiBiLnBvc2l0aW9uLnogLSBhLnBvc2l0aW9uLnogfHwgYS5pZCAtIGIuaWQpO1xuICAgICAgICAgICAgdGhpcy5sYXN0WkluZGV4ID0gdGhpcy56QXJyYXlbdGhpcy56QXJyYXkubGVuZ3RoIC0gMV0ucG9zaXRpb24uejtcbiAgICAgICAgICAgIHRoaXMubmVlZHNTb3J0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbLCBwbHVnaW5dIG9mIGNvbnRhaW5lci5wbHVnaW5zKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmRyYXdQbHVnaW4ocGx1Z2luLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuekFycmF5KSB7XG4gICAgICAgICAgICBwLmRyYXcoZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgICAgIHRoaXMuekFycmF5ID0gW107XG4gICAgfVxuICAgIHB1c2gobmIsIG1vdXNlLCBvdmVycmlkZU9wdGlvbnMsIGdyb3VwKSB7XG4gICAgICAgIHRoaXMucHVzaGluZyA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZShtb3VzZSA9PT0gbnVsbCB8fCBtb3VzZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW91c2UucG9zaXRpb24sIG92ZXJyaWRlT3B0aW9ucywgZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBhZGRQYXJ0aWNsZShwb3NpdGlvbiwgb3ZlcnJpZGVPcHRpb25zLCBncm91cCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCBsaW1pdCA9IG9wdGlvbnMucGFydGljbGVzLm51bWJlci5saW1pdCAqIGNvbnRhaW5lci5kZW5zaXR5O1xuICAgICAgICBpZiAobGltaXQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjb3VudFRvUmVtb3ZlID0gdGhpcy5jb3VudCArIDEgLSBsaW1pdDtcbiAgICAgICAgICAgIGlmIChjb3VudFRvUmVtb3ZlID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUXVhbnRpdHkoY291bnRUb1JlbW92ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaFBhcnRpY2xlKHBvc2l0aW9uLCBvdmVycmlkZU9wdGlvbnMsIGdyb3VwKTtcbiAgICB9XG4gICAgYWRkU3BsaXRQYXJ0aWNsZShwYXJlbnQpIHtcbiAgICAgICAgY29uc3Qgc3BsaXRPcHRpb25zID0gcGFyZW50Lm9wdGlvbnMuZGVzdHJveS5zcGxpdDtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGxvYWRQYXJ0aWNsZXNPcHRpb25zKHBhcmVudC5vcHRpb25zKTtcbiAgICAgICAgY29uc3QgZmFjdG9yID0gZ2V0VmFsdWUoc3BsaXRPcHRpb25zLmZhY3Rvcik7XG4gICAgICAgIG9wdGlvbnMuY29sb3IubG9hZCh7XG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIGhzbDogcGFyZW50LmdldEZpbGxDb2xvcigpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaXplLnZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBvcHRpb25zLnNpemUudmFsdWUgLz0gZmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy5zaXplLnZhbHVlLm1pbiAvPSBmYWN0b3I7XG4gICAgICAgICAgICBvcHRpb25zLnNpemUudmFsdWUubWF4IC89IGZhY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLmxvYWQoc3BsaXRPcHRpb25zLnBhcnRpY2xlcyk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHNwbGl0T3B0aW9ucy5zaXplT2Zmc2V0ID8gc2V0UmFuZ2VWYWx1ZSgtcGFyZW50LnNpemUudmFsdWUsIHBhcmVudC5zaXplLnZhbHVlKSA6IDAsIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogcGFyZW50LnBvc2l0aW9uLnggKyByYW5kb21JblJhbmdlKG9mZnNldCksXG4gICAgICAgICAgICB5OiBwYXJlbnQucG9zaXRpb24ueSArIHJhbmRvbUluUmFuZ2Uob2Zmc2V0KSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaFBhcnRpY2xlKHBvc2l0aW9uLCBvcHRpb25zLCBwYXJlbnQuZ3JvdXAsIChwYXJ0aWNsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNpemUudmFsdWUgPCAwLjUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS5sZW5ndGggPSByYW5kb21JblJhbmdlKHNldFJhbmdlVmFsdWUocGFyZW50LnZlbG9jaXR5Lmxlbmd0aCwgcGFydGljbGUudmVsb2NpdHkubGVuZ3RoKSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zcGxpdENvdW50ID0gcGFyZW50LnNwbGl0Q291bnQgKyAxO1xuICAgICAgICAgICAgcGFydGljbGUudW5icmVha2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudW5icmVha2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZVF1YW50aXR5KHF1YW50aXR5LCBncm91cCkge1xuICAgICAgICB0aGlzLnJlbW92ZUF0KDAsIHF1YW50aXR5LCBncm91cCk7XG4gICAgfVxuICAgIGdldExpbmtGcmVxdWVuY3kocDEsIHAyKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gc2V0UmFuZ2VWYWx1ZShwMS5pZCwgcDIuaWQpLCBrZXkgPSBgJHtnZXRSYW5nZU1pbihyYW5nZSl9XyR7Z2V0UmFuZ2VNYXgocmFuZ2UpfWA7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmZyZXFzLmxpbmtzLmdldChrZXkpO1xuICAgICAgICBpZiAocmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcyA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB0aGlzLmZyZXFzLmxpbmtzLnNldChrZXksIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZ2V0VHJpYW5nbGVGcmVxdWVuY3kocDEsIHAyLCBwMykge1xuICAgICAgICBsZXQgW2lkMSwgaWQyLCBpZDNdID0gW3AxLmlkLCBwMi5pZCwgcDMuaWRdO1xuICAgICAgICBpZiAoaWQxID4gaWQyKSB7XG4gICAgICAgICAgICBbaWQyLCBpZDFdID0gW2lkMSwgaWQyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQyID4gaWQzKSB7XG4gICAgICAgICAgICBbaWQzLCBpZDJdID0gW2lkMiwgaWQzXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQxID4gaWQzKSB7XG4gICAgICAgICAgICBbaWQzLCBpZDFdID0gW2lkMSwgaWQzXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXkgPSBgJHtpZDF9XyR7aWQyfV8ke2lkM31gO1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5mcmVxcy50cmlhbmdsZXMuZ2V0KGtleSk7XG4gICAgICAgIGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIHRoaXMuZnJlcXMudHJpYW5nbGVzLnNldChrZXksIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgYWRkTWFudWFsUGFydGljbGVzKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgb3B0aW9ucyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIG9wdGlvbnMubWFudWFsUGFydGljbGVzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlKGNhbGNQb3NpdGlvbkZyb21TaXplKHtcbiAgICAgICAgICAgICAgICBzaXplOiBjb250YWluZXIuY2FudmFzLnNpemUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBhcnRpY2xlLnBvc2l0aW9uLFxuICAgICAgICAgICAgfSksIHBhcnRpY2xlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldERlbnNpdHkoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIGluIG9wdGlvbnMucGFydGljbGVzLmdyb3Vwcykge1xuICAgICAgICAgICAgdGhpcy5hcHBseURlbnNpdHkob3B0aW9ucy5wYXJ0aWNsZXMuZ3JvdXBzW2dyb3VwXSwgMCwgZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlEZW5zaXR5KG9wdGlvbnMucGFydGljbGVzLCBvcHRpb25zLm1hbnVhbFBhcnRpY2xlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBoYW5kbGVDbGlja01vZGUobW9kZSkge1xuICAgICAgICB0aGlzLmludGVyYWN0aW9uTWFuYWdlci5oYW5kbGVDbGlja01vZGUobW9kZSk7XG4gICAgfVxuICAgIGFwcGx5RGVuc2l0eShvcHRpb25zLCBtYW51YWxDb3VudCwgZ3JvdXApIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoISgoX2EgPSBvcHRpb25zLm51bWJlci5kZW5zaXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZW5hYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bWJlck9wdGlvbnMgPSBvcHRpb25zLm51bWJlciwgZGVuc2l0eUZhY3RvciA9IHRoaXMuaW5pdERlbnNpdHlGYWN0b3IobnVtYmVyT3B0aW9ucy5kZW5zaXR5KSwgb3B0UGFydGljbGVzTnVtYmVyID0gbnVtYmVyT3B0aW9ucy52YWx1ZSwgb3B0UGFydGljbGVzTGltaXQgPSBudW1iZXJPcHRpb25zLmxpbWl0ID4gMCA/IG51bWJlck9wdGlvbnMubGltaXQgOiBvcHRQYXJ0aWNsZXNOdW1iZXIsIHBhcnRpY2xlc051bWJlciA9IE1hdGgubWluKG9wdFBhcnRpY2xlc051bWJlciwgb3B0UGFydGljbGVzTGltaXQpICogZGVuc2l0eUZhY3RvciArIG1hbnVhbENvdW50LCBwYXJ0aWNsZXNDb3VudCA9IE1hdGgubWluKHRoaXMuY291bnQsIHRoaXMuYXJyYXkuZmlsdGVyKCh0KSA9PiB0Lmdyb3VwID09PSBncm91cCkubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5saW1pdCA9IG51bWJlck9wdGlvbnMubGltaXQgKiBkZW5zaXR5RmFjdG9yO1xuICAgICAgICBpZiAocGFydGljbGVzQ291bnQgPCBwYXJ0aWNsZXNOdW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChNYXRoLmFicyhwYXJ0aWNsZXNOdW1iZXIgLSBwYXJ0aWNsZXNDb3VudCksIHVuZGVmaW5lZCwgb3B0aW9ucywgZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcnRpY2xlc0NvdW50ID4gcGFydGljbGVzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVF1YW50aXR5KHBhcnRpY2xlc0NvdW50IC0gcGFydGljbGVzTnVtYmVyLCBncm91cCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdERlbnNpdHlGYWN0b3IoZGVuc2l0eU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghY29udGFpbmVyLmNhbnZhcy5lbGVtZW50IHx8ICFkZW5zaXR5T3B0aW9ucy5lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCwgcHhSYXRpbyA9IGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbztcbiAgICAgICAgcmV0dXJuIChjYW52YXMud2lkdGggKiBjYW52YXMuaGVpZ2h0KSAvIChkZW5zaXR5T3B0aW9ucy5mYWN0b3IgKiBweFJhdGlvICoqIDIgKiBkZW5zaXR5T3B0aW9ucy5hcmVhKTtcbiAgICB9XG4gICAgcHVzaFBhcnRpY2xlKHBvc2l0aW9uLCBvdmVycmlkZU9wdGlvbnMsIGdyb3VwLCBpbml0aWFsaXplcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFydGljbGUgPSBuZXcgUGFydGljbGUoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfUGFydGljbGVzX2VuZ2luZSwgXCJmXCIpLCB0aGlzLm5leHRJZCwgdGhpcy5jb250YWluZXIsIHBvc2l0aW9uLCBvdmVycmlkZU9wdGlvbnMsIGdyb3VwKTtcbiAgICAgICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgY2FuQWRkID0gaW5pdGlhbGl6ZXIocGFydGljbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjYW5BZGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFycmF5LnB1c2gocGFydGljbGUpO1xuICAgICAgICAgICAgdGhpcy56QXJyYXkucHVzaChwYXJ0aWNsZSk7XG4gICAgICAgICAgICB0aGlzLm5leHRJZCsrO1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfUGFydGljbGVzX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJwYXJ0aWNsZUFkZGVkXCIsIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHBhcnRpY2xlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGVycm9yIGFkZGluZyBwYXJ0aWNsZTogJHtlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuX1BhcnRpY2xlc19lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwiaW1wb3J0IHsgZ2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IHsgaXNTc3IgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBSZXRpbmEge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gIW9wdGlvbnMuZGV0ZWN0UmV0aW5hIHx8IGlzU3NyKCkgPyAxIDogd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIGNvbnN0IG1vdGlvbk9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zLm1vdGlvbjtcbiAgICAgICAgaWYgKG1vdGlvbk9wdGlvbnMgJiYgKG1vdGlvbk9wdGlvbnMuZGlzYWJsZSB8fCBtb3Rpb25PcHRpb25zLnJlZHVjZS52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpc1NzcigpIHx8IHR5cGVvZiBtYXRjaE1lZGlhID09PSBcInVuZGVmaW5lZFwiIHx8ICFtYXRjaE1lZGlhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWR1Y2VGYWN0b3IgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVkaWFRdWVyeSA9IG1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKTtcbiAgICAgICAgICAgICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdGlvbkNoYW5nZShtZWRpYVF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3Rpb25DaGFuZ2UobWVkaWFRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmVmcmVzaCgpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVkaWFRdWVyeS5hZGRFdmVudExpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhUXVlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBoYW5kbGVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnkuYWRkTGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWFRdWVyeS5hZGRMaXN0ZW5lcihoYW5kbGVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWR1Y2VGYWN0b3IgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICBpZiAoY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50O1xuICAgICAgICAgICAgY29udGFpbmVyLmNhbnZhcy5zaXplLndpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCAqIHJhdGlvO1xuICAgICAgICAgICAgY29udGFpbmVyLmNhbnZhcy5zaXplLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICogcmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFydGljbGVzID0gb3B0aW9ucy5wYXJ0aWNsZXM7XG4gICAgICAgIHRoaXMuYXR0cmFjdERpc3RhbmNlID0gZ2V0UmFuZ2VWYWx1ZShwYXJ0aWNsZXMubW92ZS5hdHRyYWN0LmRpc3RhbmNlKSAqIHJhdGlvO1xuICAgICAgICB0aGlzLmxpbmtzRGlzdGFuY2UgPSBwYXJ0aWNsZXMubGlua3MuZGlzdGFuY2UgKiByYXRpbztcbiAgICAgICAgdGhpcy5saW5rc1dpZHRoID0gcGFydGljbGVzLmxpbmtzLndpZHRoICogcmF0aW87XG4gICAgICAgIHRoaXMuc2l6ZUFuaW1hdGlvblNwZWVkID0gZ2V0UmFuZ2VWYWx1ZShwYXJ0aWNsZXMuc2l6ZS5hbmltYXRpb24uc3BlZWQpICogcmF0aW87XG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSBnZXRSYW5nZVZhbHVlKHBhcnRpY2xlcy5tb3ZlLmdyYXZpdHkubWF4U3BlZWQpICogcmF0aW87XG4gICAgICAgIGNvbnN0IG1vZGVzID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzO1xuICAgICAgICB0aGlzLmNvbm5lY3RNb2RlRGlzdGFuY2UgPSBtb2Rlcy5jb25uZWN0LmRpc3RhbmNlICogcmF0aW87XG4gICAgICAgIHRoaXMuY29ubmVjdE1vZGVSYWRpdXMgPSBtb2Rlcy5jb25uZWN0LnJhZGl1cyAqIHJhdGlvO1xuICAgICAgICB0aGlzLmdyYWJNb2RlRGlzdGFuY2UgPSBtb2Rlcy5ncmFiLmRpc3RhbmNlICogcmF0aW87XG4gICAgICAgIHRoaXMucmVwdWxzZU1vZGVEaXN0YW5jZSA9IG1vZGVzLnJlcHVsc2UuZGlzdGFuY2UgKiByYXRpbztcbiAgICAgICAgdGhpcy5ib3VuY2VNb2RlRGlzdGFuY2UgPSBtb2Rlcy5ib3VuY2UuZGlzdGFuY2UgKiByYXRpbztcbiAgICAgICAgdGhpcy5hdHRyYWN0TW9kZURpc3RhbmNlID0gbW9kZXMuYXR0cmFjdC5kaXN0YW5jZSAqIHJhdGlvO1xuICAgICAgICB0aGlzLnNsb3dNb2RlUmFkaXVzID0gbW9kZXMuc2xvdy5yYWRpdXMgKiByYXRpbztcbiAgICAgICAgdGhpcy5idWJibGVNb2RlRGlzdGFuY2UgPSBtb2Rlcy5idWJibGUuZGlzdGFuY2UgKiByYXRpbztcbiAgICAgICAgaWYgKG1vZGVzLmJ1YmJsZS5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLmJ1YmJsZU1vZGVTaXplID0gbW9kZXMuYnViYmxlLnNpemUgKiByYXRpbztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0UGFydGljbGUocGFydGljbGUpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnMsIHJhdGlvID0gdGhpcy5waXhlbFJhdGlvLCBtb3ZlRGlzdGFuY2UgPSBvcHRpb25zLm1vdmUuZGlzdGFuY2UsIHByb3BzID0gcGFydGljbGUucmV0aW5hO1xuICAgICAgICBwcm9wcy5hdHRyYWN0RGlzdGFuY2UgPSBnZXRSYW5nZVZhbHVlKG9wdGlvbnMubW92ZS5hdHRyYWN0LmRpc3RhbmNlKSAqIHJhdGlvO1xuICAgICAgICBwcm9wcy5saW5rc0Rpc3RhbmNlID0gb3B0aW9ucy5saW5rcy5kaXN0YW5jZSAqIHJhdGlvO1xuICAgICAgICBwcm9wcy5saW5rc1dpZHRoID0gb3B0aW9ucy5saW5rcy53aWR0aCAqIHJhdGlvO1xuICAgICAgICBwcm9wcy5tb3ZlRHJpZnQgPSBnZXRSYW5nZVZhbHVlKG9wdGlvbnMubW92ZS5kcmlmdCkgKiByYXRpbztcbiAgICAgICAgcHJvcHMubW92ZVNwZWVkID0gZ2V0UmFuZ2VWYWx1ZShvcHRpb25zLm1vdmUuc3BlZWQpICogcmF0aW87XG4gICAgICAgIHByb3BzLnNpemVBbmltYXRpb25TcGVlZCA9IGdldFJhbmdlVmFsdWUob3B0aW9ucy5zaXplLmFuaW1hdGlvbi5zcGVlZCkgKiByYXRpbztcbiAgICAgICAgY29uc3QgbWF4RGlzdGFuY2UgPSBwcm9wcy5tYXhEaXN0YW5jZTtcbiAgICAgICAgbWF4RGlzdGFuY2UuaG9yaXpvbnRhbCA9IG1vdmVEaXN0YW5jZS5ob3Jpem9udGFsICE9PSB1bmRlZmluZWQgPyBtb3ZlRGlzdGFuY2UuaG9yaXpvbnRhbCAqIHJhdGlvIDogdW5kZWZpbmVkO1xuICAgICAgICBtYXhEaXN0YW5jZS52ZXJ0aWNhbCA9IG1vdmVEaXN0YW5jZS52ZXJ0aWNhbCAhPT0gdW5kZWZpbmVkID8gbW92ZURpc3RhbmNlLnZlcnRpY2FsICogcmF0aW8gOiB1bmRlZmluZWQ7XG4gICAgICAgIHByb3BzLm1heFNwZWVkID0gZ2V0UmFuZ2VWYWx1ZShvcHRpb25zLm1vdmUuZ3Jhdml0eS5tYXhTcGVlZCkgKiByYXRpbztcbiAgICB9XG4gICAgaGFuZGxlTW90aW9uQ2hhbmdlKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vdGlvbiA9IG9wdGlvbnMubW90aW9uO1xuICAgICAgICAgICAgdGhpcy5yZWR1Y2VGYWN0b3IgPSBtb3Rpb24uZGlzYWJsZSA/IDAgOiBtb3Rpb24ucmVkdWNlLnZhbHVlID8gMSAvIG1vdGlvbi5yZWR1Y2UuZmFjdG9yIDogMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVkdWNlRmFjdG9yID0gMTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJhbmdlIH0gZnJvbSBcIi4vUmFuZ2VcIjtcbmltcG9ydCB7IGdldERpc3RhbmNlIH0gZnJvbSBcIi4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cykge1xuICAgICAgICBzdXBlcih4LCB5KTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfVxuICAgIGNvbnRhaW5zKHBvaW50KSB7XG4gICAgICAgIHJldHVybiBnZXREaXN0YW5jZShwb2ludCwgdGhpcy5wb3NpdGlvbikgPD0gdGhpcy5yYWRpdXM7XG4gICAgfVxuICAgIGludGVyc2VjdHMocmFuZ2UpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHJhbmdlLCBjaXJjbGUgPSByYW5nZSwgcG9zMSA9IHRoaXMucG9zaXRpb24sIHBvczIgPSByYW5nZS5wb3NpdGlvbiwgeERpc3QgPSBNYXRoLmFicyhwb3MyLnggLSBwb3MxLngpLCB5RGlzdCA9IE1hdGguYWJzKHBvczIueSAtIHBvczEueSksIHIgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgaWYgKGNpcmNsZS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgclN1bSA9IHIgKyBjaXJjbGUucmFkaXVzLCBkaXN0ID0gTWF0aC5zcXJ0KHhEaXN0ICogeERpc3QgKyB5RGlzdCArIHlEaXN0KTtcbiAgICAgICAgICAgIHJldHVybiByU3VtID4gZGlzdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWN0LnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgdyA9IHJlY3Quc2l6ZS53aWR0aCwgaCA9IHJlY3Quc2l6ZS5oZWlnaHQsIGVkZ2VzID0gTWF0aC5wb3coeERpc3QgLSB3LCAyKSArIE1hdGgucG93KHlEaXN0IC0gaCwgMik7XG4gICAgICAgICAgICBpZiAoeERpc3QgPiByICsgdyB8fCB5RGlzdCA+IHIgKyBoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHhEaXN0IDw9IHcgfHwgeURpc3QgPD0gaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVkZ2VzIDw9IHIgKiByO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDaXJjbGUgfSBmcm9tIFwiLi9DaXJjbGVcIjtcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuL1JlY3RhbmdsZVwiO1xuZXhwb3J0IGNsYXNzIENpcmNsZVdhcnAgZXh0ZW5kcyBDaXJjbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cywgY2FudmFzU2l6ZSkge1xuICAgICAgICBzdXBlcih4LCB5LCByYWRpdXMpO1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBjYW52YXNTaXplO1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBPYmplY3QuYXNzaWduKHt9LCBjYW52YXNTaXplKTtcbiAgICB9XG4gICAgY29udGFpbnMocG9pbnQpIHtcbiAgICAgICAgaWYgKHN1cGVyLmNvbnRhaW5zKHBvaW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zTkUgPSB7XG4gICAgICAgICAgICB4OiBwb2ludC54IC0gdGhpcy5jYW52YXNTaXplLndpZHRoLFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN1cGVyLmNvbnRhaW5zKHBvc05FKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zU0UgPSB7XG4gICAgICAgICAgICB4OiBwb2ludC54IC0gdGhpcy5jYW52YXNTaXplLndpZHRoLFxuICAgICAgICAgICAgeTogcG9pbnQueSAtIHRoaXMuY2FudmFzU2l6ZS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChzdXBlci5jb250YWlucyhwb3NTRSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc1NXID0ge1xuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnkgLSB0aGlzLmNhbnZhc1NpemUuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3VwZXIuY29udGFpbnMocG9zU1cpO1xuICAgIH1cbiAgICBpbnRlcnNlY3RzKHJhbmdlKSB7XG4gICAgICAgIGlmIChzdXBlci5pbnRlcnNlY3RzKHJhbmdlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVjdCA9IHJhbmdlLCBjaXJjbGUgPSByYW5nZSwgbmV3UG9zID0ge1xuICAgICAgICAgICAgeDogcmFuZ2UucG9zaXRpb24ueCAtIHRoaXMuY2FudmFzU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIHk6IHJhbmdlLnBvc2l0aW9uLnkgLSB0aGlzLmNhbnZhc1NpemUuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY2lyY2xlLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBiaWdnZXJDaXJjbGUgPSBuZXcgQ2lyY2xlKG5ld1Bvcy54LCBuZXdQb3MueSwgY2lyY2xlLnJhZGl1cyAqIDIpO1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdHMoYmlnZ2VyQ2lyY2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWN0LnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdFNXID0gbmV3IFJlY3RhbmdsZShuZXdQb3MueCwgbmV3UG9zLnksIHJlY3Quc2l6ZS53aWR0aCAqIDIsIHJlY3Quc2l6ZS5oZWlnaHQgKiAyKTtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3RzKHJlY3RTVyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBnZW5lcmF0ZWRBdHRyaWJ1dGUgPSBcImdlbmVyYXRlZFwiO1xuZXhwb3J0IGNvbnN0IHJhbmRvbUNvbG9yVmFsdWUgPSBcInJhbmRvbVwiO1xuZXhwb3J0IGNvbnN0IG1pZENvbG9yVmFsdWUgPSBcIm1pZFwiO1xuZXhwb3J0IGNvbnN0IHRvdWNoRW5kRXZlbnQgPSBcInRvdWNoZW5kXCI7XG5leHBvcnQgY29uc3QgbW91c2VEb3duRXZlbnQgPSBcIm1vdXNlZG93blwiO1xuZXhwb3J0IGNvbnN0IG1vdXNlVXBFdmVudCA9IFwibW91c2V1cFwiO1xuZXhwb3J0IGNvbnN0IG1vdXNlTW92ZUV2ZW50ID0gXCJtb3VzZW1vdmVcIjtcbmV4cG9ydCBjb25zdCB0b3VjaFN0YXJ0RXZlbnQgPSBcInRvdWNoc3RhcnRcIjtcbmV4cG9ydCBjb25zdCB0b3VjaE1vdmVFdmVudCA9IFwidG91Y2htb3ZlXCI7XG5leHBvcnQgY29uc3QgbW91c2VMZWF2ZUV2ZW50ID0gXCJtb3VzZWxlYXZlXCI7XG5leHBvcnQgY29uc3QgbW91c2VPdXRFdmVudCA9IFwibW91c2VvdXRcIjtcbmV4cG9ydCBjb25zdCB0b3VjaENhbmNlbEV2ZW50ID0gXCJ0b3VjaGNhbmNlbFwiO1xuZXhwb3J0IGNvbnN0IHJlc2l6ZUV2ZW50ID0gXCJyZXNpemVcIjtcbmV4cG9ydCBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlRXZlbnQgPSBcInZpc2liaWxpdHljaGFuZ2VcIjtcbmV4cG9ydCBjb25zdCBub1BvbHlnb25EYXRhTG9hZGVkID0gXCJObyBwb2x5Z29uIGRhdGEgbG9hZGVkLlwiO1xuZXhwb3J0IGNvbnN0IG5vUG9seWdvbkZvdW5kID0gXCJObyBwb2x5Z29uIGZvdW5kLCB5b3UgbmVlZCB0byBzcGVjaWZ5IFNWRyB1cmwgaW4gY29uZmlnLlwiO1xuIiwiaW1wb3J0IHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTGVhdmVFdmVudCwgbW91c2VNb3ZlRXZlbnQsIG1vdXNlT3V0RXZlbnQsIG1vdXNlVXBFdmVudCwgcmVzaXplRXZlbnQsIHRvdWNoQ2FuY2VsRXZlbnQsIHRvdWNoRW5kRXZlbnQsIHRvdWNoTW92ZUV2ZW50LCB0b3VjaFN0YXJ0RXZlbnQsIHZpc2liaWxpdHlDaGFuZ2VFdmVudCwgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGlzU3NyIH0gZnJvbSBcIi4uLy4uL1V0aWxzL1V0aWxzXCI7XG5mdW5jdGlvbiBtYW5hZ2VMaXN0ZW5lcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgYWRkLCBvcHRpb25zKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgICBsZXQgYWRkT3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICBhZGRPcHRpb25zLmNhcHR1cmUgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWRkT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBhZGRPcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZU9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHJlbW92ZU9wdGlvbnMpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVycyB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmNhblB1c2ggPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdXNlTW92ZUhhbmRsZXIgPSAoZSkgPT4gdGhpcy5tb3VzZVRvdWNoTW92ZShlKTtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0SGFuZGxlciA9IChlKSA9PiB0aGlzLm1vdXNlVG91Y2hNb3ZlKGUpO1xuICAgICAgICB0aGlzLnRvdWNoTW92ZUhhbmRsZXIgPSAoZSkgPT4gdGhpcy5tb3VzZVRvdWNoTW92ZShlKTtcbiAgICAgICAgdGhpcy50b3VjaEVuZEhhbmRsZXIgPSAoKSA9PiB0aGlzLm1vdXNlVG91Y2hGaW5pc2goKTtcbiAgICAgICAgdGhpcy5tb3VzZUxlYXZlSGFuZGxlciA9ICgpID0+IHRoaXMubW91c2VUb3VjaEZpbmlzaCgpO1xuICAgICAgICB0aGlzLnRvdWNoQ2FuY2VsSGFuZGxlciA9ICgpID0+IHRoaXMubW91c2VUb3VjaEZpbmlzaCgpO1xuICAgICAgICB0aGlzLnRvdWNoRW5kQ2xpY2tIYW5kbGVyID0gKGUpID0+IHRoaXMubW91c2VUb3VjaENsaWNrKGUpO1xuICAgICAgICB0aGlzLm1vdXNlVXBIYW5kbGVyID0gKGUpID0+IHRoaXMubW91c2VUb3VjaENsaWNrKGUpO1xuICAgICAgICB0aGlzLm1vdXNlRG93bkhhbmRsZXIgPSAoKSA9PiB0aGlzLm1vdXNlRG93bigpO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyID0gKCkgPT4gdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudGhlbWVDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHRoaXMuaGFuZGxlVGhlbWVDaGFuZ2UoZSk7XG4gICAgICAgIHRoaXMub2xkVGhlbWVDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHRoaXMuaGFuZGxlVGhlbWVDaGFuZ2UoZSk7XG4gICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9ICgpID0+IHRoaXMuaGFuZGxlV2luZG93UmVzaXplKCk7XG4gICAgfVxuICAgIGFkZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VMaXN0ZW5lcnModHJ1ZSk7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VMaXN0ZW5lcnMoZmFsc2UpO1xuICAgIH1cbiAgICBtYW5hZ2VMaXN0ZW5lcnMoYWRkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgZGV0ZWN0VHlwZSA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5kZXRlY3RzT247XG4gICAgICAgIGxldCBtb3VzZUxlYXZlVG1wRXZlbnQgPSBtb3VzZUxlYXZlRXZlbnQ7XG4gICAgICAgIGlmIChkZXRlY3RUeXBlID09PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gd2luZG93O1xuICAgICAgICAgICAgbW91c2VMZWF2ZVRtcEV2ZW50ID0gbW91c2VPdXRFdmVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXRlY3RUeXBlID09PSBcInBhcmVudFwiICYmIGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzRWwgPSBjb250YWluZXIuY2FudmFzLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gKF9hID0gY2FudmFzRWwucGFyZW50RWxlbWVudCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY2FudmFzRWwucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LmVsZW1lbnQgPSBjb250YWluZXIuY2FudmFzLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWVkaWFNYXRjaCA9ICFpc1NzcigpICYmIHR5cGVvZiBtYXRjaE1lZGlhICE9PSBcInVuZGVmaW5lZFwiICYmIG1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpO1xuICAgICAgICBpZiAobWVkaWFNYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1lZGlhTWF0Y2guYWRkRXZlbnRMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlTGlzdGVuZXIobWVkaWFNYXRjaCwgXCJjaGFuZ2VcIiwgdGhpcy50aGVtZUNoYW5nZUhhbmRsZXIsIGFkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtZWRpYU1hdGNoLmFkZExpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lZGlhTWF0Y2guYWRkTGlzdGVuZXIodGhpcy5vbGRUaGVtZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWVkaWFNYXRjaC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9sZFRoZW1lQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGludGVyYWN0aXZpdHlFbCA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LmVsZW1lbnQ7XG4gICAgICAgIGlmICghaW50ZXJhY3Rpdml0eUVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaHRtbCA9IGludGVyYWN0aXZpdHlFbDtcbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5lbmFibGUgfHwgb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrLmVuYWJsZSkge1xuICAgICAgICAgICAgbWFuYWdlTGlzdGVuZXIoaW50ZXJhY3Rpdml0eUVsLCBtb3VzZU1vdmVFdmVudCwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCBhZGQpO1xuICAgICAgICAgICAgbWFuYWdlTGlzdGVuZXIoaW50ZXJhY3Rpdml0eUVsLCB0b3VjaFN0YXJ0RXZlbnQsIHRoaXMudG91Y2hTdGFydEhhbmRsZXIsIGFkZCk7XG4gICAgICAgICAgICBtYW5hZ2VMaXN0ZW5lcihpbnRlcmFjdGl2aXR5RWwsIHRvdWNoTW92ZUV2ZW50LCB0aGlzLnRvdWNoTW92ZUhhbmRsZXIsIGFkZCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGljay5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICBtYW5hZ2VMaXN0ZW5lcihpbnRlcmFjdGl2aXR5RWwsIHRvdWNoRW5kRXZlbnQsIHRoaXMudG91Y2hFbmRIYW5kbGVyLCBhZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlTGlzdGVuZXIoaW50ZXJhY3Rpdml0eUVsLCB0b3VjaEVuZEV2ZW50LCB0aGlzLnRvdWNoRW5kQ2xpY2tIYW5kbGVyLCBhZGQpO1xuICAgICAgICAgICAgICAgIG1hbmFnZUxpc3RlbmVyKGludGVyYWN0aXZpdHlFbCwgbW91c2VVcEV2ZW50LCB0aGlzLm1vdXNlVXBIYW5kbGVyLCBhZGQpO1xuICAgICAgICAgICAgICAgIG1hbmFnZUxpc3RlbmVyKGludGVyYWN0aXZpdHlFbCwgbW91c2VEb3duRXZlbnQsIHRoaXMubW91c2VEb3duSGFuZGxlciwgYWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hbmFnZUxpc3RlbmVyKGludGVyYWN0aXZpdHlFbCwgbW91c2VMZWF2ZVRtcEV2ZW50LCB0aGlzLm1vdXNlTGVhdmVIYW5kbGVyLCBhZGQpO1xuICAgICAgICAgICAgbWFuYWdlTGlzdGVuZXIoaW50ZXJhY3Rpdml0eUVsLCB0b3VjaENhbmNlbEV2ZW50LCB0aGlzLnRvdWNoQ2FuY2VsSGFuZGxlciwgYWRkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IGh0bWwgPT09IGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCA/IFwiaW5pdGlhbFwiIDogXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMucmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIgJiYgIWFkZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZShjb250YWluZXIuY2FudmFzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZXNpemVPYnNlcnZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMucmVzaXplT2JzZXJ2ZXIgJiYgYWRkICYmIGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXMuZmluZCgoZSkgPT4gZS50YXJnZXQgPT09IGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIuY2FudmFzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hbmFnZUxpc3RlbmVyKHdpbmRvdywgcmVzaXplRXZlbnQsIHRoaXMucmVzaXplSGFuZGxlciwgYWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG1hbmFnZUxpc3RlbmVyKGRvY3VtZW50LCB2aXNpYmlsaXR5Q2hhbmdlRXZlbnQsIHRoaXMudmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIsIGFkZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZW91dCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yZXNpemVUaW1lb3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSB0aGlzLmNvbnRhaW5lci5jYW52YXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS53aW5kb3dSZXNpemUoKTsgfSwgNTAwKTtcbiAgICB9XG4gICAgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucztcbiAgICAgICAgdGhpcy5tb3VzZVRvdWNoRmluaXNoKCk7XG4gICAgICAgIGlmICghb3B0aW9ucy5wYXVzZU9uQmx1cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudCA9PT0gbnVsbCB8fCBkb2N1bWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICBjb250YWluZXIucGFnZUhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5wYWdlSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmdldEFuaW1hdGlvblN0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZHJhdyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb3VzZURvd24oKSB7XG4gICAgICAgIGNvbnN0IGludGVyYWN0aXZpdHkgPSB0aGlzLmNvbnRhaW5lci5pbnRlcmFjdGl2aXR5O1xuICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eSkge1xuICAgICAgICAgICAgY29uc3QgbW91c2UgPSBpbnRlcmFjdGl2aXR5Lm1vdXNlO1xuICAgICAgICAgICAgbW91c2UuY2xpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgbW91c2UuZG93blBvc2l0aW9uID0gbW91c2UucG9zaXRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW91c2VUb3VjaE1vdmUoZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgIGlmICghKChfYSA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5pbnNpZGUgPSB0cnVlO1xuICAgICAgICBsZXQgcG9zO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBjb250YWluZXIuY2FudmFzLmVsZW1lbnQ7XG4gICAgICAgIGlmIChlLnR5cGUuc3RhcnRzV2l0aChcIm1vdXNlXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmNhblB1c2ggPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbW91c2VFdmVudCA9IGU7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmludGVyYWN0aXZpdHkuZWxlbWVudCA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGllbnRSZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBtb3VzZUV2ZW50LmNsaWVudFggLSBjbGllbnRSZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBtb3VzZUV2ZW50LmNsaWVudFkgLSBjbGllbnRSZWN0LnRvcCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmludGVyYWN0aXZpdHkuZGV0ZWN0c09uID09PSBcInBhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gbW91c2VFdmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbW91c2VFdmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc0VsID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgJiYgdGFyZ2V0ICYmIGNhbnZhc0VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZVJlY3QgPSBzb3VyY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc1JlY3QgPSBjYW52YXNFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogbW91c2VFdmVudC5vZmZzZXRYICsgMiAqIHNvdXJjZVJlY3QubGVmdCAtICh0YXJnZXRSZWN0LmxlZnQgKyBjYW52YXNSZWN0LmxlZnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogbW91c2VFdmVudC5vZmZzZXRZICsgMiAqIHNvdXJjZVJlY3QudG9wIC0gKHRhcmdldFJlY3QudG9wICsgY2FudmFzUmVjdC50b3ApLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogKF9iID0gbW91c2VFdmVudC5vZmZzZXRYKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAoX2MgPSBtb3VzZUV2ZW50Lm9mZnNldFkpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IG1vdXNlRXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobW91c2VFdmVudC50YXJnZXQgPT09IGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAoX2QgPSBtb3VzZUV2ZW50Lm9mZnNldFgpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IG1vdXNlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IChfZSA9IG1vdXNlRXZlbnQub2Zmc2V0WSkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogbW91c2VFdmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FuUHVzaCA9IGUudHlwZSAhPT0gXCJ0b3VjaG1vdmVcIjtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoRXZlbnQgPSBlO1xuICAgICAgICAgICAgY29uc3QgbGFzdFRvdWNoID0gdG91Y2hFdmVudC50b3VjaGVzW3RvdWNoRXZlbnQudG91Y2hlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc1JlY3QgPSBjYW52YXMgPT09IG51bGwgfHwgY2FudmFzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgICAgeDogbGFzdFRvdWNoLmNsaWVudFggLSAoKF9mID0gY2FudmFzUmVjdCA9PT0gbnVsbCB8fCBjYW52YXNSZWN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYW52YXNSZWN0LmxlZnQpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IDApLFxuICAgICAgICAgICAgICAgIHk6IGxhc3RUb3VjaC5jbGllbnRZIC0gKChfZyA9IGNhbnZhc1JlY3QgPT09IG51bGwgfHwgY2FudmFzUmVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FudmFzUmVjdC50b3ApICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IDApLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBweFJhdGlvID0gY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvO1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBwb3MueCAqPSBweFJhdGlvO1xuICAgICAgICAgICAgcG9zLnkgKj0gcHhSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbiA9IHBvcztcbiAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzID0gbW91c2VNb3ZlRXZlbnQ7XG4gICAgfVxuICAgIG1vdXNlVG91Y2hGaW5pc2goKSB7XG4gICAgICAgIGNvbnN0IGludGVyYWN0aXZpdHkgPSB0aGlzLmNvbnRhaW5lci5pbnRlcmFjdGl2aXR5O1xuICAgICAgICBpZiAoIWludGVyYWN0aXZpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb3VzZSA9IGludGVyYWN0aXZpdHkubW91c2U7XG4gICAgICAgIGRlbGV0ZSBtb3VzZS5wb3NpdGlvbjtcbiAgICAgICAgZGVsZXRlIG1vdXNlLmNsaWNrUG9zaXRpb247XG4gICAgICAgIGRlbGV0ZSBtb3VzZS5kb3duUG9zaXRpb247XG4gICAgICAgIGludGVyYWN0aXZpdHkuc3RhdHVzID0gbW91c2VMZWF2ZUV2ZW50O1xuICAgICAgICBtb3VzZS5pbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgbW91c2UuY2xpY2tpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbW91c2VUb3VjaENsaWNrKGUpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgbW91c2UgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZTtcbiAgICAgICAgbW91c2UuaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbW91c2VQb3NpdGlvbiA9IG1vdXNlLnBvc2l0aW9uO1xuICAgICAgICBpZiAoIW1vdXNlUG9zaXRpb24gfHwgIW9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGljay5lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFssIHBsdWdpbl0gb2YgY29udGFpbmVyLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmICghcGx1Z2luLmNsaWNrUG9zaXRpb25WYWxpZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlZCA9IHBsdWdpbi5jbGlja1Bvc2l0aW9uVmFsaWQobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaGFuZGxlZCkge1xuICAgICAgICAgICAgdGhpcy5kb01vdXNlVG91Y2hDbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgICBtb3VzZS5jbGlja2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICBkb01vdXNlVG91Y2hDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmNhblB1c2gpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlUG9zID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UucG9zaXRpb247XG4gICAgICAgICAgICBpZiAoIW1vdXNlUG9zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBtb3VzZVBvcy54LFxuICAgICAgICAgICAgICAgIHk6IG1vdXNlUG9zLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBvbkNsaWNrID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrO1xuICAgICAgICAgICAgaWYgKG9uQ2xpY2subW9kZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIG9uQ2xpY2subW9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrTW9kZShtb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrTW9kZShvbkNsaWNrLm1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlLnR5cGUgPT09IFwidG91Y2hlbmRcIikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm1vdXNlVG91Y2hGaW5pc2goKSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVUaGVtZUNoYW5nZShlKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhRXZlbnQgPSBlLCB0aGVtZU5hbWUgPSBtZWRpYUV2ZW50Lm1hdGNoZXNcbiAgICAgICAgICAgID8gdGhpcy5jb250YWluZXIub3B0aW9ucy5kZWZhdWx0RGFya1RoZW1lXG4gICAgICAgICAgICA6IHRoaXMuY29udGFpbmVyLm9wdGlvbnMuZGVmYXVsdExpZ2h0VGhlbWUsIHRoZW1lID0gdGhpcy5jb250YWluZXIub3B0aW9ucy50aGVtZXMuZmluZCgodGhlbWUpID0+IHRoZW1lLm5hbWUgPT09IHRoZW1lTmFtZSk7XG4gICAgICAgIGlmICh0aGVtZSAmJiB0aGVtZS5kZWZhdWx0LmF1dG8pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmxvYWRUaGVtZSh0aGVtZU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUNsaWNrTW9kZShtb2RlKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmhhbmRsZUNsaWNrTW9kZShtb2RlKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXh0ZXJuYWxJbnRlcmFjdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnR5cGUgPSAwO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBGcmFtZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgYXN5bmMgbmV4dEZyYW1lKHRpbWVzdGFtcCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIubGFzdEZyYW1lVGltZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wIDwgY29udGFpbmVyLmxhc3RGcmFtZVRpbWUgKyAxMDAwIC8gY29udGFpbmVyLmZwc0xpbWl0KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRyYXcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChfYSA9IGNvbnRhaW5lci5sYXN0RnJhbWVUaW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoY29udGFpbmVyLmxhc3RGcmFtZVRpbWUgPSB0aW1lc3RhbXApO1xuICAgICAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IHRpbWVzdGFtcCAtIGNvbnRhaW5lci5sYXN0RnJhbWVUaW1lLCBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGVsdGFWYWx1ZSxcbiAgICAgICAgICAgICAgICBmYWN0b3I6ICg2MCAqIGRlbHRhVmFsdWUpIC8gMTAwMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb250YWluZXIubGlmZVRpbWUgKz0gZGVsdGEudmFsdWU7XG4gICAgICAgICAgICBjb250YWluZXIubGFzdEZyYW1lVGltZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmIChkZWx0YVZhbHVlID4gMTAwMCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5kcmF3KGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIucGFydGljbGVzLmRyYXcoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5kdXJhdGlvbiA+IDAgJiYgY29udGFpbmVyLmxpZmVUaW1lID4gY29udGFpbmVyLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmdldEFuaW1hdGlvblN0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRyYXcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidHNQYXJ0aWNsZXMgZXJyb3IgaW4gYW5pbWF0aW9uIGxvb3BcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0ludGVyYWN0aW9uTWFuYWdlcl9lbmdpbmU7XG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihlbmdpbmUsIGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgX0ludGVyYWN0aW9uTWFuYWdlcl9lbmdpbmUuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0ludGVyYWN0aW9uTWFuYWdlcl9lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSW50ZXJhY3RvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZUludGVyYWN0b3JzID0gW107XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBpbnRlcmFjdG9ycyA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0ludGVyYWN0aW9uTWFuYWdlcl9lbmdpbmUsIFwiZlwiKS5wbHVnaW5zLmdldEludGVyYWN0b3JzKHRoaXMuY29udGFpbmVyLCB0cnVlKTtcbiAgICAgICAgdGhpcy5leHRlcm5hbEludGVyYWN0b3JzID0gW107XG4gICAgICAgIHRoaXMucGFydGljbGVJbnRlcmFjdG9ycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVyYWN0b3Igb2YgaW50ZXJhY3RvcnMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaW50ZXJhY3Rvci50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dGVybmFsSW50ZXJhY3RvcnMucHVzaChpbnRlcmFjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlSW50ZXJhY3RvcnMucHVzaChpbnRlcmFjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZXh0ZXJuYWxJbnRlcmFjdChkZWx0YSkge1xuICAgICAgICBmb3IgKGNvbnN0IGludGVyYWN0b3Igb2YgdGhpcy5leHRlcm5hbEludGVyYWN0b3JzKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rvci5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGludGVyYWN0b3IuaW50ZXJhY3QoZGVsdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHBhcnRpY2xlc0ludGVyYWN0KHBhcnRpY2xlLCBkZWx0YSkge1xuICAgICAgICBmb3IgKGNvbnN0IGludGVyYWN0b3Igb2YgdGhpcy5leHRlcm5hbEludGVyYWN0b3JzKSB7XG4gICAgICAgICAgICBpbnRlcmFjdG9yLnJlc2V0KHBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGludGVyYWN0b3Igb2YgdGhpcy5wYXJ0aWNsZUludGVyYWN0b3JzKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rvci5pc0VuYWJsZWQocGFydGljbGUpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgaW50ZXJhY3Rvci5pbnRlcmFjdChwYXJ0aWNsZSwgZGVsdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUNsaWNrTW9kZShtb2RlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJhY3RvciBvZiB0aGlzLmV4dGVybmFsSW50ZXJhY3RvcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcmFjdG9yLmhhbmRsZUNsaWNrTW9kZSkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0b3IuaGFuZGxlQ2xpY2tNb2RlKG1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuX0ludGVyYWN0aW9uTWFuYWdlcl9lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwiZXhwb3J0IGNsYXNzIFBhcnRpY2xlc0ludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMudHlwZSA9IDE7XG4gICAgfVxufVxuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfUGx1Z2luc19lbmdpbmU7XG5leHBvcnQgY2xhc3MgUGx1Z2lucyB7XG4gICAgY29uc3RydWN0b3IoZW5naW5lKSB7XG4gICAgICAgIF9QbHVnaW5zX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfUGx1Z2luc19lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdG9yc0luaXRpYWxpemVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tb3ZlcnNJbml0aWFsaXplcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudXBkYXRlcnNJbml0aWFsaXplcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuaW50ZXJhY3RvcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubW92ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnByZXNldHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZHJhd2VycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5wYXRoR2VuZXJhdG9ycyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZ2V0UGx1Z2luKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zLmZpbmQoKHQpID0+IHQuaWQgPT09IHBsdWdpbik7XG4gICAgfVxuICAgIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBsdWdpbihwbHVnaW4uaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEF2YWlsYWJsZVBsdWdpbnMoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbi5uZWVkc1BsdWdpbihjb250YWluZXIuYWN0dWFsT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5zZXQocGx1Z2luLmlkLCBwbHVnaW4uZ2V0UGx1Z2luKGNvbnRhaW5lcikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGxvYWRPcHRpb25zKG9wdGlvbnMsIHNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ubG9hZE9wdGlvbnMob3B0aW9ucywgc291cmNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0UHJlc2V0KHByZXNldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVzZXRzLmdldChwcmVzZXQpO1xuICAgIH1cbiAgICBhZGRQcmVzZXQocHJlc2V0S2V5LCBvcHRpb25zLCBvdmVycmlkZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvdmVycmlkZSB8fCAhdGhpcy5nZXRQcmVzZXQocHJlc2V0S2V5KSkge1xuICAgICAgICAgICAgdGhpcy5wcmVzZXRzLnNldChwcmVzZXRLZXksIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNoYXBlRHJhd2VyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhd2Vycy5nZXQodHlwZSk7XG4gICAgfVxuICAgIGFkZFNoYXBlRHJhd2VyKHR5cGUsIGRyYXdlcikge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0U2hhcGVEcmF3ZXIodHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2Vycy5zZXQodHlwZSwgZHJhd2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTdXBwb3J0ZWRTaGFwZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYXdlcnMua2V5cygpO1xuICAgIH1cbiAgICBnZXRQYXRoR2VuZXJhdG9yKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aEdlbmVyYXRvcnMuZ2V0KHR5cGUpO1xuICAgIH1cbiAgICBhZGRQYXRoR2VuZXJhdG9yKHR5cGUsIHBhdGhHZW5lcmF0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBhdGhHZW5lcmF0b3IodHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aEdlbmVyYXRvcnMuc2V0KHR5cGUsIHBhdGhHZW5lcmF0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEludGVyYWN0b3JzKGNvbnRhaW5lciwgZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5pbnRlcmFjdG9ycy5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgaWYgKCFyZXMgfHwgZm9yY2UpIHtcbiAgICAgICAgICAgIHJlcyA9IFsuLi50aGlzLmludGVyYWN0b3JzSW5pdGlhbGl6ZXJzLnZhbHVlcygpXS5tYXAoKHQpID0+IHQoY29udGFpbmVyKSk7XG4gICAgICAgICAgICB0aGlzLmludGVyYWN0b3JzLnNldChjb250YWluZXIsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgYWRkSW50ZXJhY3RvcihuYW1lLCBpbml0SW50ZXJhY3Rvcikge1xuICAgICAgICB0aGlzLmludGVyYWN0b3JzSW5pdGlhbGl6ZXJzLnNldChuYW1lLCBpbml0SW50ZXJhY3Rvcik7XG4gICAgfVxuICAgIGdldFVwZGF0ZXJzKGNvbnRhaW5lciwgZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcmVzID0gdGhpcy51cGRhdGVycy5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgaWYgKCFyZXMgfHwgZm9yY2UpIHtcbiAgICAgICAgICAgIHJlcyA9IFsuLi50aGlzLnVwZGF0ZXJzSW5pdGlhbGl6ZXJzLnZhbHVlcygpXS5tYXAoKHQpID0+IHQoY29udGFpbmVyKSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZXJzLnNldChjb250YWluZXIsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgYWRkUGFydGljbGVVcGRhdGVyKG5hbWUsIGluaXRVcGRhdGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlcnNJbml0aWFsaXplcnMuc2V0KG5hbWUsIGluaXRVcGRhdGVyKTtcbiAgICB9XG4gICAgZ2V0TW92ZXJzKGNvbnRhaW5lciwgZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5tb3ZlcnMuZ2V0KGNvbnRhaW5lcik7XG4gICAgICAgIGlmICghcmVzIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICByZXMgPSBbLi4udGhpcy5tb3ZlcnNJbml0aWFsaXplcnMudmFsdWVzKCldLm1hcCgodCkgPT4gdChjb250YWluZXIpKTtcbiAgICAgICAgICAgIHRoaXMubW92ZXJzLnNldChjb250YWluZXIsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgYWRkUGFydGljbGVNb3ZlcihuYW1lLCBpbml0TW92ZXIpIHtcbiAgICAgICAgdGhpcy5tb3ZlcnNJbml0aWFsaXplcnMuc2V0KG5hbWUsIGluaXRNb3Zlcik7XG4gICAgfVxufVxuX1BsdWdpbnNfZW5naW5lID0gbmV3IFdlYWtNYXAoKTtcbiIsImV4cG9ydCBjbGFzcyBQb2ludCB7XG4gICAgY29uc3RydWN0b3IocG9zaXRpb24sIHBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZSA9IHBhcnRpY2xlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENpcmNsZSB9IGZyb20gXCIuL0NpcmNsZVwiO1xuaW1wb3J0IHsgQ2lyY2xlV2FycCB9IGZyb20gXCIuL0NpcmNsZVdhcnBcIjtcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuL1JlY3RhbmdsZVwiO1xuaW1wb3J0IHsgZ2V0RGlzdGFuY2UgfSBmcm9tIFwiLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBRdWFkVHJlZSB7XG4gICAgY29uc3RydWN0b3IocmVjdGFuZ2xlLCBjYXBhY2l0eSkge1xuICAgICAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgICAgICB0aGlzLmRpdmlkZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaW5zZXJ0KHBvaW50KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgICAgIGlmICghdGhpcy5yZWN0YW5nbGUuY29udGFpbnMocG9pbnQucG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA8IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRpdmlkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViZGl2aWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgoX2UgPSAoKChfYSA9IHRoaXMubm9ydGhFYXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5zZXJ0KHBvaW50KSkgfHxcbiAgICAgICAgICAgICgoX2IgPSB0aGlzLm5vcnRoV2VzdCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmluc2VydChwb2ludCkpIHx8XG4gICAgICAgICAgICAoKF9jID0gdGhpcy5zb3V0aEVhc3QpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pbnNlcnQocG9pbnQpKSB8fFxuICAgICAgICAgICAgKChfZCA9IHRoaXMuc291dGhXZXN0KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaW5zZXJ0KHBvaW50KSkpKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiBmYWxzZSk7XG4gICAgfVxuICAgIHF1ZXJ5Q2lyY2xlKHBvc2l0aW9uLCByYWRpdXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkobmV3IENpcmNsZShwb3NpdGlvbi54LCBwb3NpdGlvbi55LCByYWRpdXMpKTtcbiAgICB9XG4gICAgcXVlcnlDaXJjbGVXYXJwKHBvc2l0aW9uLCByYWRpdXMsIGNvbnRhaW5lck9yU2l6ZSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJPclNpemUsIHNpemUgPSBjb250YWluZXJPclNpemU7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5KG5ldyBDaXJjbGVXYXJwKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHJhZGl1cywgY29udGFpbmVyLmNhbnZhcyAhPT0gdW5kZWZpbmVkID8gY29udGFpbmVyLmNhbnZhcy5zaXplIDogc2l6ZSkpO1xuICAgIH1cbiAgICBxdWVyeVJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeShuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSk7XG4gICAgfVxuICAgIHF1ZXJ5KHJhbmdlLCBmb3VuZCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZvdW5kICE9PSBudWxsICYmIGZvdW5kICE9PSB2b2lkIDAgPyBmb3VuZCA6IFtdO1xuICAgICAgICBpZiAoIXJhbmdlLmludGVyc2VjdHModGhpcy5yZWN0YW5nbGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMucG9pbnRzKSB7XG4gICAgICAgICAgICBpZiAoIXJhbmdlLmNvbnRhaW5zKHAucG9zaXRpb24pICYmIGdldERpc3RhbmNlKHJhbmdlLnBvc2l0aW9uLCBwLnBvc2l0aW9uKSA+IHAucGFydGljbGUuZ2V0UmFkaXVzKCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5wdXNoKHAucGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpdmlkZWQpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMubm9ydGhFYXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnkocmFuZ2UsIHJlcyk7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLm5vcnRoV2VzdCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5KHJhbmdlLCByZXMpO1xuICAgICAgICAgICAgKF9jID0gdGhpcy5zb3V0aEVhc3QpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5xdWVyeShyYW5nZSwgcmVzKTtcbiAgICAgICAgICAgIChfZCA9IHRoaXMuc291dGhXZXN0KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucXVlcnkocmFuZ2UsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgc3ViZGl2aWRlKCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueCwgeSA9IHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnksIHcgPSB0aGlzLnJlY3RhbmdsZS5zaXplLndpZHRoLCBoID0gdGhpcy5yZWN0YW5nbGUuc2l6ZS5oZWlnaHQsIGNhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgdGhpcy5ub3J0aEVhc3QgPSBuZXcgUXVhZFRyZWUobmV3IFJlY3RhbmdsZSh4LCB5LCB3IC8gMiwgaCAvIDIpLCBjYXBhY2l0eSk7XG4gICAgICAgIHRoaXMubm9ydGhXZXN0ID0gbmV3IFF1YWRUcmVlKG5ldyBSZWN0YW5nbGUoeCArIHcgLyAyLCB5LCB3IC8gMiwgaCAvIDIpLCBjYXBhY2l0eSk7XG4gICAgICAgIHRoaXMuc291dGhFYXN0ID0gbmV3IFF1YWRUcmVlKG5ldyBSZWN0YW5nbGUoeCwgeSArIGggLyAyLCB3IC8gMiwgaCAvIDIpLCBjYXBhY2l0eSk7XG4gICAgICAgIHRoaXMuc291dGhXZXN0ID0gbmV3IFF1YWRUcmVlKG5ldyBSZWN0YW5nbGUoeCArIHcgLyAyLCB5ICsgaCAvIDIsIHcgLyAyLCBoIC8gMiksIGNhcGFjaXR5KTtcbiAgICAgICAgdGhpcy5kaXZpZGVkID0gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFJhbmdlIH0gZnJvbSBcIi4vUmFuZ2VcIjtcbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBSYW5nZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih4LCB5KTtcbiAgICAgICAgdGhpcy5zaXplID0ge1xuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnRhaW5zKHBvaW50KSB7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnNpemUud2lkdGgsIGggPSB0aGlzLnNpemUuaGVpZ2h0LCBwb3MgPSB0aGlzLnBvc2l0aW9uO1xuICAgICAgICByZXR1cm4gcG9pbnQueCA+PSBwb3MueCAmJiBwb2ludC54IDw9IHBvcy54ICsgdyAmJiBwb2ludC55ID49IHBvcy55ICYmIHBvaW50LnkgPD0gcG9zLnkgKyBoO1xuICAgIH1cbiAgICBpbnRlcnNlY3RzKHJhbmdlKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSByYW5nZSwgY2lyY2xlID0gcmFuZ2UsIHcgPSB0aGlzLnNpemUud2lkdGgsIGggPSB0aGlzLnNpemUuaGVpZ2h0LCBwb3MxID0gdGhpcy5wb3NpdGlvbiwgcG9zMiA9IHJhbmdlLnBvc2l0aW9uO1xuICAgICAgICBpZiAoY2lyY2xlLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2lyY2xlLmludGVyc2VjdHModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZWN0LnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaXplMiA9IHJlY3Quc2l6ZSwgdzIgPSBzaXplMi53aWR0aCwgaDIgPSBzaXplMi5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBwb3MyLnggPCBwb3MxLnggKyB3ICYmIHBvczIueCArIHcyID4gcG9zMS54ICYmIHBvczIueSA8IHBvczEueSArIGggJiYgcG9zMi55ICsgaDIgPiBwb3MxLnk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZlY3RvciB7XG4gICAgY29uc3RydWN0b3IoeE9yQ29vcmRzLCB5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yQ29vcmRzICE9PSBcIm51bWJlclwiICYmIHhPckNvb3Jkcykge1xuICAgICAgICAgICAgdGhpcy54ID0geE9yQ29vcmRzLng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JDb29yZHMueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh4T3JDb29yZHMgIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPckNvb3JkcztcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0c1BhcnRpY2xlcyAtIFZlY3RvciBub3QgaW5pdGlhbGl6ZWQgY29ycmVjdGx5XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBjbG9uZShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5jcmVhdGUoc291cmNlLngsIHNvdXJjZS55KTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZSh4LCB5KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHgsIHkpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IG9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5jcmVhdGUoMCwgMCk7XG4gICAgfVxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIH1cbiAgICBzZXQgYW5nbGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGcm9tQW5nbGUoYW5nbGUsIHRoaXMubGVuZ3RoKTtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmdldExlbmd0aFNxKCkpO1xuICAgIH1cbiAgICBzZXQgbGVuZ3RoKGxlbmd0aCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZyb21BbmdsZSh0aGlzLmFuZ2xlLCBsZW5ndGgpO1xuICAgIH1cbiAgICBhZGQodikge1xuICAgICAgICByZXR1cm4gVmVjdG9yLmNyZWF0ZSh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSk7XG4gICAgfVxuICAgIGFkZFRvKHYpIHtcbiAgICAgICAgdGhpcy54ICs9IHYueDtcbiAgICAgICAgdGhpcy55ICs9IHYueTtcbiAgICB9XG4gICAgc3ViKHYpIHtcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5jcmVhdGUodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnkpO1xuICAgIH1cbiAgICBzdWJGcm9tKHYpIHtcbiAgICAgICAgdGhpcy54IC09IHYueDtcbiAgICAgICAgdGhpcy55IC09IHYueTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3IuY3JlYXRlKHRoaXMueCAqIG4sIHRoaXMueSAqIG4pO1xuICAgIH1cbiAgICBtdWx0VG8obikge1xuICAgICAgICB0aGlzLnggKj0gbjtcbiAgICAgICAgdGhpcy55ICo9IG47XG4gICAgfVxuICAgIGRpdihuKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3IuY3JlYXRlKHRoaXMueCAvIG4sIHRoaXMueSAvIG4pO1xuICAgIH1cbiAgICBkaXZUbyhuKSB7XG4gICAgICAgIHRoaXMueCAvPSBuO1xuICAgICAgICB0aGlzLnkgLz0gbjtcbiAgICB9XG4gICAgZGlzdGFuY2VUbyh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Yih2KS5sZW5ndGg7XG4gICAgfVxuICAgIGdldExlbmd0aFNxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG4gICAgZGlzdGFuY2VUb1NxKHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViKHYpLmdldExlbmd0aFNxKCk7XG4gICAgfVxuICAgIG1hbmhhdHRhbkRpc3RhbmNlVG8odikge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModi54IC0gdGhpcy54KSArIE1hdGguYWJzKHYueSAtIHRoaXMueSk7XG4gICAgfVxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3IuY2xvbmUodGhpcyk7XG4gICAgfVxuICAgIHNldFRvKHYpIHtcbiAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICB0aGlzLnkgPSB2Lnk7XG4gICAgfVxuICAgIHJvdGF0ZShhbmdsZSkge1xuICAgICAgICByZXR1cm4gVmVjdG9yLmNyZWF0ZSh0aGlzLnggKiBNYXRoLmNvcyhhbmdsZSkgLSB0aGlzLnkgKiBNYXRoLnNpbihhbmdsZSksIHRoaXMueCAqIE1hdGguc2luKGFuZ2xlKSArIHRoaXMueSAqIE1hdGguY29zKGFuZ2xlKSk7XG4gICAgfVxuICAgIHVwZGF0ZUZyb21BbmdsZShhbmdsZSwgbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMueCA9IE1hdGguY29zKGFuZ2xlKSAqIGxlbmd0aDtcbiAgICAgICAgdGhpcy55ID0gTWF0aC5zaW4oYW5nbGUpICogbGVuZ3RoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuZXhwb3J0IGNsYXNzIFZlY3RvcjNkIGV4dGVuZHMgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4T3JDb29yZHMsIHksIHopIHtcbiAgICAgICAgc3VwZXIoeE9yQ29vcmRzLCB5KTtcbiAgICAgICAgaWYgKHR5cGVvZiB4T3JDb29yZHMgIT09IFwibnVtYmVyXCIgJiYgeE9yQ29vcmRzKSB7XG4gICAgICAgICAgICB0aGlzLnogPSB4T3JDb29yZHMuejtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh6ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0c1BhcnRpY2xlcyAtIFZlY3RvciBub3QgaW5pdGlhbGl6ZWQgY29ycmVjdGx5XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBjbG9uZShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIFZlY3RvcjNkLmNyZWF0ZShzb3VyY2UueCwgc291cmNlLnksIHNvdXJjZS56KTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZSh4LCB5LCB6KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yM2QoeCwgeSwgeik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgb3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gVmVjdG9yM2QuY3JlYXRlKDAsIDAsIDApO1xuICAgIH1cbiAgICBhZGQodikge1xuICAgICAgICByZXR1cm4gdiBpbnN0YW5jZW9mIFZlY3RvcjNkID8gVmVjdG9yM2QuY3JlYXRlKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopIDogc3VwZXIuYWRkKHYpO1xuICAgIH1cbiAgICBhZGRUbyh2KSB7XG4gICAgICAgIHN1cGVyLmFkZFRvKHYpO1xuICAgICAgICBpZiAodiBpbnN0YW5jZW9mIFZlY3RvcjNkKSB7XG4gICAgICAgICAgICB0aGlzLnogKz0gdi56O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN1Yih2KSB7XG4gICAgICAgIHJldHVybiB2IGluc3RhbmNlb2YgVmVjdG9yM2QgPyBWZWN0b3IzZC5jcmVhdGUodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueikgOiBzdXBlci5zdWIodik7XG4gICAgfVxuICAgIHN1YkZyb20odikge1xuICAgICAgICBzdXBlci5zdWJGcm9tKHYpO1xuICAgICAgICBpZiAodiBpbnN0YW5jZW9mIFZlY3RvcjNkKSB7XG4gICAgICAgICAgICB0aGlzLnogLT0gdi56O1xuICAgICAgICB9XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICByZXR1cm4gVmVjdG9yM2QuY3JlYXRlKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xuICAgIH1cbiAgICBtdWx0VG8obikge1xuICAgICAgICBzdXBlci5tdWx0VG8obik7XG4gICAgICAgIHRoaXMueiAqPSBuO1xuICAgIH1cbiAgICBkaXYobikge1xuICAgICAgICByZXR1cm4gVmVjdG9yM2QuY3JlYXRlKHRoaXMueCAvIG4sIHRoaXMueSAvIG4sIHRoaXMueiAvIG4pO1xuICAgIH1cbiAgICBkaXZUbyhuKSB7XG4gICAgICAgIHN1cGVyLmRpdlRvKG4pO1xuICAgICAgICB0aGlzLnogLz0gbjtcbiAgICB9XG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIFZlY3RvcjNkLmNsb25lKHRoaXMpO1xuICAgIH1cbiAgICBzZXRUbyh2KSB7XG4gICAgICAgIHN1cGVyLnNldFRvKHYpO1xuICAgICAgICBjb25zdCB2M2QgPSB2O1xuICAgICAgICBpZiAodjNkLnogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy56ID0gdjNkLno7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJpbXBvcnQgeyBIc2xBbmltYXRpb24gfSBmcm9tIFwiLi9Ic2xBbmltYXRpb25cIjtcbmltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuL09wdGlvbnNDb2xvclwiO1xuZXhwb3J0IGNsYXNzIEFuaW1hdGFibGVDb2xvciBleHRlbmRzIE9wdGlvbnNDb2xvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEhzbEFuaW1hdGlvbigpO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKHNvdXJjZSwgZGF0YSkge1xuICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBBbmltYXRhYmxlQ29sb3IoKTtcbiAgICAgICAgY29sb3IubG9hZChzb3VyY2UpO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHwgZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29sb3IubG9hZCh7IHZhbHVlOiBkYXRhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sb3IubG9hZChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2xvckFuaW1hdGlvbiA9IGRhdGEuYW5pbWF0aW9uO1xuICAgICAgICBpZiAoY29sb3JBbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGNvbG9yQW5pbWF0aW9uLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uaC5sb2FkKGNvbG9yQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmxvYWQoZGF0YS5hbmltYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0YWJsZUNvbG9yIH0gZnJvbSBcIi4vQW5pbWF0YWJsZUNvbG9yXCI7XG5pbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgQW5pbWF0YWJsZUdyYWRpZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbmdsZSA9IG5ldyBHcmFkaWVudEFuZ2xlKCk7XG4gICAgICAgIHRoaXMuY29sb3JzID0gW107XG4gICAgICAgIHRoaXMudHlwZSA9IFwicmFuZG9tXCI7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuZ2xlLmxvYWQoZGF0YS5hbmdsZSk7XG4gICAgICAgIGlmIChkYXRhLmNvbG9ycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IGRhdGEuY29sb3JzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBBbmltYXRhYmxlR3JhZGllbnRDb2xvcigpO1xuICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBHcmFkaWVudEFuZ2xlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEdyYWRpZW50QW5nbGVBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBcImNsb2Nrd2lzZVwiO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb24ubG9hZChkYXRhLmFuaW1hdGlvbik7XG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRhdGEuZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdyYWRpZW50Q29sb3JPcGFjaXR5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEdyYWRpZW50Q29sb3JPcGFjaXR5QW5pbWF0aW9uKCk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5sb2FkKGRhdGEuYW5pbWF0aW9uKTtcbiAgICAgICAgaWYgKGRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNldFJhbmdlVmFsdWUoZGF0YS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQW5pbWF0YWJsZUdyYWRpZW50Q29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN0b3AgPSAwO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IEFuaW1hdGFibGVDb2xvcigpO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3RvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AgPSBkYXRhLnN0b3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IEFuaW1hdGFibGVDb2xvci5jcmVhdGUodGhpcy52YWx1ZSwgZGF0YS52YWx1ZSk7XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gbmV3IEdyYWRpZW50Q29sb3JPcGFjaXR5KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEub3BhY2l0eSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eS52YWx1ZSA9IGRhdGEub3BhY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eS5sb2FkKGRhdGEub3BhY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgR3JhZGllbnRBbmdsZUFuaW1hdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnNwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luYyA9IGRhdGEuc3luYztcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBHcmFkaWVudENvbG9yT3BhY2l0eUFuaW1hdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnRWYWx1ZSA9IFwicmFuZG9tXCI7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnNwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luYyA9IGRhdGEuc3luYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zdGFydFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRWYWx1ZSA9IGRhdGEuc3RhcnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25PcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSBzZXRSYW5nZVZhbHVlKGRhdGEuY291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBzZXRSYW5nZVZhbHVlKGRhdGEuc3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgT3B0aW9uc0NvbG9yIH0gZnJvbSBcIi4uL09wdGlvbnNDb2xvclwiO1xuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IE9wdGlvbnNDb2xvcigpO1xuICAgICAgICB0aGlzLmNvbG9yLnZhbHVlID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbWFnZSA9IFwiXCI7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBcIlwiO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmNvbG9yLCBkYXRhLmNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5pbWFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gZGF0YS5pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5yZXBlYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQgPSBkYXRhLnJlcGVhdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IGRhdGEub3BhY2l0eTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhY2tncm91bmRNYXNrQ292ZXIgfSBmcm9tIFwiLi9CYWNrZ3JvdW5kTWFza0NvdmVyXCI7XG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZE1hc2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvc2l0ZSA9IFwiZGVzdGluYXRpb24tb3V0XCI7XG4gICAgICAgIHRoaXMuY292ZXIgPSBuZXcgQmFja2dyb3VuZE1hc2tDb3ZlcigpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29tcG9zaXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9zaXRlID0gZGF0YS5jb21wb3NpdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY292ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY292ZXIgPSBkYXRhLmNvdmVyO1xuICAgICAgICAgICAgY29uc3QgY29sb3IgPSAodHlwZW9mIGRhdGEuY292ZXIgPT09IFwic3RyaW5nXCIgPyB7IGNvbG9yOiBkYXRhLmNvdmVyIH0gOiBkYXRhLmNvdmVyKTtcbiAgICAgICAgICAgIHRoaXMuY292ZXIubG9hZChjb3Zlci5jb2xvciAhPT0gdW5kZWZpbmVkID8gY292ZXIgOiB7IGNvbG9yOiBjb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kTWFza0NvdmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBPcHRpb25zQ29sb3IoKTtcbiAgICAgICAgdGhpcy5jb2xvci52YWx1ZSA9IFwiI2ZmZlwiO1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSAxO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IE9wdGlvbnNDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgQ29sb3JBbmltYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5zeW5jID0gdHJ1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSBzZXRSYW5nZVZhbHVlKGRhdGEuY291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IHNldFJhbmdlVmFsdWUoZGF0YS5vZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBzZXRSYW5nZVZhbHVlKGRhdGEuc3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuekluZGV4ID0gMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnpJbmRleCA9IGRhdGEuekluZGV4O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29sb3JBbmltYXRpb24gfSBmcm9tIFwiLi9Db2xvckFuaW1hdGlvblwiO1xuZXhwb3J0IGNsYXNzIEhzbEFuaW1hdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaCA9IG5ldyBDb2xvckFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnMgPSBuZXcgQ29sb3JBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5sID0gbmV3IENvbG9yQW5pbWF0aW9uKCk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmgubG9hZChkYXRhLmgpO1xuICAgICAgICB0aGlzLnMubG9hZChkYXRhLnMpO1xuICAgICAgICB0aGlzLmwubG9hZChkYXRhLmwpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDbGlja0V2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2RlID0gW107XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5tb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IGRhdGEubW9kZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBEaXZFdmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0gW107XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZSA9IFtdO1xuICAgICAgICB0aGlzLnR5cGUgPSBcImNpcmNsZVwiO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZHM7XG4gICAgfVxuICAgIHNldCBlbGVtZW50SWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50SWQ7XG4gICAgfVxuICAgIHNldCBlbCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRJZCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgaWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgPyB0aGlzLnNlbGVjdG9ycy5tYXAoKHQpID0+IHQucmVwbGFjZShcIiNcIiwgXCJcIikpXG4gICAgICAgICAgICA6IHRoaXMuc2VsZWN0b3JzLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAgIH1cbiAgICBzZXQgaWRzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0gdmFsdWUgaW5zdGFuY2VvZiBBcnJheSA/IHZhbHVlLm1hcCgodCkgPT4gYCMke3R9YCkgOiBgIyR7dmFsdWV9YDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlkcyA9IChfYiA9IChfYSA9IGRhdGEuaWRzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLmVsZW1lbnRJZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZGF0YS5lbDtcbiAgICAgICAgaWYgKGlkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmlkcyA9IGlkcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zZWxlY3RvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBkYXRhLnNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5tb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IGRhdGEubW9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENsaWNrRXZlbnQgfSBmcm9tIFwiLi9DbGlja0V2ZW50XCI7XG5pbXBvcnQgeyBEaXZFdmVudCB9IGZyb20gXCIuL0RpdkV2ZW50XCI7XG5pbXBvcnQgeyBIb3ZlckV2ZW50IH0gZnJvbSBcIi4vSG92ZXJFdmVudFwiO1xuZXhwb3J0IGNsYXNzIEV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25DbGljayA9IG5ldyBDbGlja0V2ZW50KCk7XG4gICAgICAgIHRoaXMub25EaXYgPSBuZXcgRGl2RXZlbnQoKTtcbiAgICAgICAgdGhpcy5vbkhvdmVyID0gbmV3IEhvdmVyRXZlbnQoKTtcbiAgICAgICAgdGhpcy5yZXNpemUgPSB0cnVlO1xuICAgIH1cbiAgICBnZXQgb25jbGljaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25DbGljaztcbiAgICB9XG4gICAgc2V0IG9uY2xpY2sodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBvbmRpdigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25EaXY7XG4gICAgfVxuICAgIHNldCBvbmRpdih2YWx1ZSkge1xuICAgICAgICB0aGlzLm9uRGl2ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBvbmhvdmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhvdmVyO1xuICAgIH1cbiAgICBzZXQgb25ob3Zlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLm9uSG92ZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2xpY2subG9hZCgoX2EgPSBkYXRhLm9uQ2xpY2spICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEub25jbGljayk7XG4gICAgICAgIGNvbnN0IG9uRGl2ID0gKF9iID0gZGF0YS5vbkRpdikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZGF0YS5vbmRpdjtcbiAgICAgICAgaWYgKG9uRGl2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChvbkRpdiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRpdiA9IG9uRGl2Lm1hcCgoZGl2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBEaXZFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChkaXYpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRpdiA9IG5ldyBEaXZFdmVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25EaXYubG9hZChvbkRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkhvdmVyLmxvYWQoKF9jID0gZGF0YS5vbkhvdmVyKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkYXRhLm9uaG92ZXIpO1xuICAgICAgICBpZiAoZGF0YS5yZXNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemUgPSBkYXRhLnJlc2l6ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFBhcmFsbGF4IH0gZnJvbSBcIi4vUGFyYWxsYXhcIjtcbmV4cG9ydCBjbGFzcyBIb3ZlckV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2RlID0gW107XG4gICAgICAgIHRoaXMucGFyYWxsYXggPSBuZXcgUGFyYWxsYXgoKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gZGF0YS5tb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyYWxsYXgubG9hZChkYXRhLnBhcmFsbGF4KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUGFyYWxsYXgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvcmNlID0gMjtcbiAgICAgICAgdGhpcy5zbW9vdGggPSAxMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZvcmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yY2UgPSBkYXRhLmZvcmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNtb290aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNtb290aCA9IGRhdGEuc21vb3RoO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSBcIi4vRXZlbnRzL0V2ZW50c1wiO1xuaW1wb3J0IHsgTW9kZXMgfSBmcm9tIFwiLi9Nb2Rlcy9Nb2Rlc1wiO1xuZXhwb3J0IGNsYXNzIEludGVyYWN0aXZpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldGVjdHNPbiA9IFwid2luZG93XCI7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgICAgICB0aGlzLm1vZGVzID0gbmV3IE1vZGVzKCk7XG4gICAgfVxuICAgIGdldCBkZXRlY3Rfb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldGVjdHNPbjtcbiAgICB9XG4gICAgc2V0IGRldGVjdF9vbih2YWx1ZSkge1xuICAgICAgICB0aGlzLmRldGVjdHNPbiA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRldGVjdHNPbiA9IChfYSA9IGRhdGEuZGV0ZWN0c09uKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLmRldGVjdF9vbjtcbiAgICAgICAgaWYgKGRldGVjdHNPbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRldGVjdHNPbiA9IGRldGVjdHNPbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy5sb2FkKGRhdGEuZXZlbnRzKTtcbiAgICAgICAgdGhpcy5tb2Rlcy5sb2FkKGRhdGEubW9kZXMpO1xuICAgICAgICBpZiAoKChfYyA9IChfYiA9IGRhdGEubW9kZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zbG93KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYWN0aXZlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzLm9uSG92ZXIubW9kZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzLm9uSG92ZXIubW9kZS5pbmRleE9mKFwic2xvd1wiKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMub25Ib3Zlci5tb2RlLnB1c2goXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRzLm9uSG92ZXIubW9kZSAhPT0gXCJzbG93XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5vbkhvdmVyLm1vZGUgPSBbdGhpcy5ldmVudHMub25Ib3Zlci5tb2RlLCBcInNsb3dcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQXR0cmFjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAyMDA7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwLjQ7XG4gICAgICAgIHRoaXMuZWFzaW5nID0gXCJlYXNlLW91dC1xdWFkXCI7XG4gICAgICAgIHRoaXMuZmFjdG9yID0gMTtcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDUwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVhc2luZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVhc2luZyA9IGRhdGEuZWFzaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvciA9IGRhdGEuZmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1heFNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWF4U3BlZWQgPSBkYXRhLm1heFNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnNwZWVkO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEJvdW5jZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAyMDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gZGF0YS5kaXN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEJ1YmJsZUJhc2UgfSBmcm9tIFwiLi9CdWJibGVCYXNlXCI7XG5pbXBvcnQgeyBCdWJibGVEaXYgfSBmcm9tIFwiLi9CdWJibGVEaXZcIjtcbmV4cG9ydCBjbGFzcyBCdWJibGUgZXh0ZW5kcyBCdWJibGVCYXNlIHtcbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgc3VwZXIubG9hZChkYXRhKTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZGl2cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLmRpdnMgPSBkYXRhLmRpdnMubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gbmV3IEJ1YmJsZURpdigpO1xuICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpdnMgaW5zdGFuY2VvZiBBcnJheSB8fCAhdGhpcy5kaXZzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZzID0gbmV3IEJ1YmJsZURpdigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXZzLmxvYWQoZGF0YS5kaXZzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi8uLi9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCBjbGFzcyBCdWJibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDIwMDtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IDAuNDtcbiAgICAgICAgdGhpcy5taXggPSBmYWxzZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1peCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1peCA9IGRhdGEubWl4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gZGF0YS5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmNvbG9yIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvci5tYXAoKHMpID0+IE9wdGlvbnNDb2xvci5jcmVhdGUodW5kZWZpbmVkLCBzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2xvciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBuZXcgT3B0aW9uc0NvbG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuY29sb3IsIGRhdGEuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQnViYmxlQmFzZSB9IGZyb20gXCIuL0J1YmJsZUJhc2VcIjtcbmV4cG9ydCBjbGFzcyBCdWJibGVEaXYgZXh0ZW5kcyBCdWJibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBbXTtcbiAgICB9XG4gICAgZ2V0IGlkcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgID8gdGhpcy5zZWxlY3RvcnMubWFwKCh0KSA9PiB0LnJlcGxhY2UoXCIjXCIsIFwiXCIpKVxuICAgICAgICAgICAgOiB0aGlzLnNlbGVjdG9ycy5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgICB9XG4gICAgc2V0IGlkcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgPyB2YWx1ZS5tYXAoKHQpID0+IGAjJHt0fWApIDogYCMke3ZhbHVlfWA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5pZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pZHMgPSBkYXRhLmlkcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zZWxlY3RvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBkYXRhLnNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3RMaW5rcyB9IGZyb20gXCIuL0Nvbm5lY3RMaW5rc1wiO1xuZXhwb3J0IGNsYXNzIENvbm5lY3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gODA7XG4gICAgICAgIHRoaXMubGlua3MgPSBuZXcgQ29ubmVjdExpbmtzKCk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gNjA7XG4gICAgfVxuICAgIGdldCBsaW5lX2xpbmtlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlua3M7XG4gICAgfVxuICAgIHNldCBsaW5lX2xpbmtlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpbmtzID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBsaW5lTGlua2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saW5rcztcbiAgICB9XG4gICAgc2V0IGxpbmVMaW5rZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saW5rcyA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGRhdGEuZGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saW5rcy5sb2FkKChfYiA9IChfYSA9IGRhdGEubGlua3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEubGluZUxpbmtlZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZGF0YS5saW5lX2xpbmtlZCk7XG4gICAgICAgIGlmIChkYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IGRhdGEucmFkaXVzO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbm5lY3RMaW5rcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDAuNTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghKGRhdGEgIT09IHVuZGVmaW5lZCAmJiBkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IGRhdGEub3BhY2l0eTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEdyYWJMaW5rcyB9IGZyb20gXCIuL0dyYWJMaW5rc1wiO1xuZXhwb3J0IGNsYXNzIEdyYWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMTAwO1xuICAgICAgICB0aGlzLmxpbmtzID0gbmV3IEdyYWJMaW5rcygpO1xuICAgIH1cbiAgICBnZXQgbGluZV9saW5rZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbmtzO1xuICAgIH1cbiAgICBzZXQgbGluZV9saW5rZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saW5rcyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgbGluZUxpbmtlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlua3M7XG4gICAgfVxuICAgIHNldCBsaW5lTGlua2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlua3MubG9hZCgoX2IgPSAoX2EgPSBkYXRhLmxpbmtzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLmxpbmVMaW5rZWQpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGRhdGEubGluZV9saW5rZWQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi8uLi9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCBjbGFzcyBHcmFiTGlua3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJsaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSAxO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYmxpbmsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ibGluayA9IGRhdGEuYmxpbms7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IE9wdGlvbnNDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29uc2VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSBkYXRhLmNvbnNlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBMaWdodEFyZWEgfSBmcm9tIFwiLi9MaWdodEFyZWFcIjtcbmltcG9ydCB7IExpZ2h0U2hhZG93IH0gZnJvbSBcIi4vTGlnaHRTaGFkb3dcIjtcbmV4cG9ydCBjbGFzcyBMaWdodCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXJlYSA9IG5ldyBMaWdodEFyZWEoKTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSBuZXcgTGlnaHRTaGFkb3coKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJlYS5sb2FkKGRhdGEuYXJlYSk7XG4gICAgICAgIHRoaXMuc2hhZG93LmxvYWQoZGF0YS5zaGFkb3cpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IExpZ2h0R3JhZGllbnQgfSBmcm9tIFwiLi9MaWdodEdyYWRpZW50XCI7XG5leHBvcnQgY2xhc3MgTGlnaHRBcmVhIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ncmFkaWVudCA9IG5ldyBMaWdodEdyYWRpZW50KCk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMTAwMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JhZGllbnQubG9hZChkYXRhLmdyYWRpZW50KTtcbiAgICAgICAgaWYgKGRhdGEucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IgfSBmcm9tIFwiLi4vLi4vT3B0aW9uc0NvbG9yXCI7XG5leHBvcnQgY2xhc3MgTGlnaHRHcmFkaWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgT3B0aW9uc0NvbG9yKCk7XG4gICAgICAgIHRoaXMuc3RvcCA9IG5ldyBPcHRpb25zQ29sb3IoKTtcbiAgICAgICAgdGhpcy5zdGFydC52YWx1ZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLnN0b3AudmFsdWUgPSBcIiMwMDAwMDBcIjtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnQgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuc3RhcnQsIGRhdGEuc3RhcnQpO1xuICAgICAgICB0aGlzLnN0b3AgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuc3RvcCwgZGF0YS5zdG9wKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IgfSBmcm9tIFwiLi4vLi4vT3B0aW9uc0NvbG9yXCI7XG5leHBvcnQgY2xhc3MgTGlnaHRTaGFkb3cge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IE9wdGlvbnNDb2xvcigpO1xuICAgICAgICB0aGlzLmNvbG9yLnZhbHVlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMjAwMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuY29sb3IsIGRhdGEuY29sb3IpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEF0dHJhY3QgfSBmcm9tIFwiLi9BdHRyYWN0XCI7XG5pbXBvcnQgeyBCb3VuY2UgfSBmcm9tIFwiLi9Cb3VuY2VcIjtcbmltcG9ydCB7IEJ1YmJsZSB9IGZyb20gXCIuL0J1YmJsZVwiO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gXCIuL0Nvbm5lY3RcIjtcbmltcG9ydCB7IEdyYWIgfSBmcm9tIFwiLi9HcmFiXCI7XG5pbXBvcnQgeyBMaWdodCB9IGZyb20gXCIuL0xpZ2h0XCI7XG5pbXBvcnQgeyBQdXNoIH0gZnJvbSBcIi4vUHVzaFwiO1xuaW1wb3J0IHsgUmVtb3ZlIH0gZnJvbSBcIi4vUmVtb3ZlXCI7XG5pbXBvcnQgeyBSZXB1bHNlIH0gZnJvbSBcIi4vUmVwdWxzZVwiO1xuaW1wb3J0IHsgU2xvdyB9IGZyb20gXCIuL1Nsb3dcIjtcbmltcG9ydCB7IFRyYWlsIH0gZnJvbSBcIi4vVHJhaWxcIjtcbmV4cG9ydCBjbGFzcyBNb2RlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXR0cmFjdCA9IG5ldyBBdHRyYWN0KCk7XG4gICAgICAgIHRoaXMuYm91bmNlID0gbmV3IEJvdW5jZSgpO1xuICAgICAgICB0aGlzLmJ1YmJsZSA9IG5ldyBCdWJibGUoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ID0gbmV3IENvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5ncmFiID0gbmV3IEdyYWIoKTtcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBMaWdodCgpO1xuICAgICAgICB0aGlzLnB1c2ggPSBuZXcgUHVzaCgpO1xuICAgICAgICB0aGlzLnJlbW92ZSA9IG5ldyBSZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZXB1bHNlID0gbmV3IFJlcHVsc2UoKTtcbiAgICAgICAgdGhpcy5zbG93ID0gbmV3IFNsb3coKTtcbiAgICAgICAgdGhpcy50cmFpbCA9IG5ldyBUcmFpbCgpO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdHRyYWN0LmxvYWQoZGF0YS5hdHRyYWN0KTtcbiAgICAgICAgdGhpcy5idWJibGUubG9hZChkYXRhLmJ1YmJsZSk7XG4gICAgICAgIHRoaXMuY29ubmVjdC5sb2FkKGRhdGEuY29ubmVjdCk7XG4gICAgICAgIHRoaXMuZ3JhYi5sb2FkKGRhdGEuZ3JhYik7XG4gICAgICAgIHRoaXMubGlnaHQubG9hZChkYXRhLmxpZ2h0KTtcbiAgICAgICAgdGhpcy5wdXNoLmxvYWQoZGF0YS5wdXNoKTtcbiAgICAgICAgdGhpcy5yZW1vdmUubG9hZChkYXRhLnJlbW92ZSk7XG4gICAgICAgIHRoaXMucmVwdWxzZS5sb2FkKGRhdGEucmVwdWxzZSk7XG4gICAgICAgIHRoaXMuc2xvdy5sb2FkKGRhdGEuc2xvdyk7XG4gICAgICAgIHRoaXMudHJhaWwubG9hZChkYXRhLnRyYWlsKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUHVzaCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSA0O1xuICAgIH1cbiAgICBnZXQgcGFydGljbGVzX25iKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWFudGl0eTtcbiAgICB9XG4gICAgc2V0IHBhcnRpY2xlc19uYih2YWx1ZSkge1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gdmFsdWU7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGF0YS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmdyb3VwcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwcyA9IGRhdGEuZ3JvdXBzLm1hcCgodCkgPT4gdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAoX2EgPSBkYXRhLnF1YW50aXR5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLnBhcnRpY2xlc19uYjtcbiAgICAgICAgaWYgKHF1YW50aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZW1vdmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMjtcbiAgICB9XG4gICAgZ2V0IHBhcnRpY2xlc19uYigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVhbnRpdHk7XG4gICAgfVxuICAgIHNldCBwYXJ0aWNsZXNfbmIodmFsdWUpIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWFudGl0eSA9IChfYSA9IGRhdGEucXVhbnRpdHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEucGFydGljbGVzX25iO1xuICAgICAgICBpZiAocXVhbnRpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVwdWxzZUJhc2UgfSBmcm9tIFwiLi9SZXB1bHNlQmFzZVwiO1xuaW1wb3J0IHsgUmVwdWxzZURpdiB9IGZyb20gXCIuL1JlcHVsc2VEaXZcIjtcbmV4cG9ydCBjbGFzcyBSZXB1bHNlIGV4dGVuZHMgUmVwdWxzZUJhc2Uge1xuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXZzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuZGl2cyA9IGRhdGEuZGl2cy5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgUmVwdWxzZURpdigpO1xuICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpdnMgaW5zdGFuY2VvZiBBcnJheSB8fCAhdGhpcy5kaXZzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZzID0gbmV3IFJlcHVsc2VEaXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGl2cy5sb2FkKGRhdGEuZGl2cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUmVwdWxzZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMjAwO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gMC40O1xuICAgICAgICB0aGlzLmZhY3RvciA9IDEwMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSA1MDtcbiAgICAgICAgdGhpcy5lYXNpbmcgPSBcImVhc2Utb3V0LXF1YWRcIjtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVhc2luZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVhc2luZyA9IGRhdGEuZWFzaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvciA9IGRhdGEuZmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1heFNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWF4U3BlZWQgPSBkYXRhLm1heFNwZWVkO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVwdWxzZUJhc2UgfSBmcm9tIFwiLi9SZXB1bHNlQmFzZVwiO1xuZXhwb3J0IGNsYXNzIFJlcHVsc2VEaXYgZXh0ZW5kcyBSZXB1bHNlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0gW107XG4gICAgfVxuICAgIGdldCBpZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdG9ycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMubWFwKCh0KSA9PiB0LnJlcGxhY2UoXCIjXCIsIFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycy5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgaWRzKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHZhbHVlLm1hcCgoKSA9PiBgIyR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IGAjJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5pZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pZHMgPSBkYXRhLmlkcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zZWxlY3RvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBkYXRhLnNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTbG93IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3IgPSAzO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDIwMDtcbiAgICB9XG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYWN0aXZlKF92YWx1ZSkge1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZmFjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yID0gZGF0YS5mYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBkZWVwRXh0ZW5kIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL1V0aWxzXCI7XG5leHBvcnQgY2xhc3MgVHJhaWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRlbGF5ID0gMTtcbiAgICAgICAgdGhpcy5wYXVzZU9uU3RvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSBkYXRhLmRlbGF5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnF1YW50aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnBhcnRpY2xlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IGRlZXBFeHRlbmQoe30sIGRhdGEucGFydGljbGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wYXVzZU9uU3RvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlT25TdG9wID0gZGF0YS5wYXVzZU9uU3RvcDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBNYW51YWxQYXJ0aWNsZSB7XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogKF9hID0gZGF0YS5wb3NpdGlvbi54KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiA1MCxcbiAgICAgICAgICAgICAgICB5OiAoX2IgPSBkYXRhLnBvc2l0aW9uLnkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDUwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGRlZXBFeHRlbmQoe30sIGRhdGEub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb3Rpb25SZWR1Y2UgfSBmcm9tIFwiLi9Nb3Rpb25SZWR1Y2VcIjtcbmV4cG9ydCBjbGFzcyBNb3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWR1Y2UgPSBuZXcgTW90aW9uUmVkdWNlKCk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXNhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSA9IGRhdGEuZGlzYWJsZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHVjZS5sb2FkKGRhdGEucmVkdWNlKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTW90aW9uUmVkdWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3IgPSA0O1xuICAgICAgICB0aGlzLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvciA9IGRhdGEuZmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9PcHRpb25zX2luc3RhbmNlcywgX09wdGlvbnNfZW5naW5lLCBfT3B0aW9uc19maW5kRGVmYXVsdFRoZW1lO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCwgbG9hZFBhcnRpY2xlc09wdGlvbnMgfSBmcm9tIFwiLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmltcG9ydCB7IEJhY2tncm91bmQgfSBmcm9tIFwiLi9CYWNrZ3JvdW5kL0JhY2tncm91bmRcIjtcbmltcG9ydCB7IEJhY2tncm91bmRNYXNrIH0gZnJvbSBcIi4vQmFja2dyb3VuZE1hc2svQmFja2dyb3VuZE1hc2tcIjtcbmltcG9ydCB7IEZ1bGxTY3JlZW4gfSBmcm9tIFwiLi9GdWxsU2NyZWVuL0Z1bGxTY3JlZW5cIjtcbmltcG9ydCB7IEludGVyYWN0aXZpdHkgfSBmcm9tIFwiLi9JbnRlcmFjdGl2aXR5L0ludGVyYWN0aXZpdHlcIjtcbmltcG9ydCB7IE1hbnVhbFBhcnRpY2xlIH0gZnJvbSBcIi4vTWFudWFsUGFydGljbGVcIjtcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gXCIuL01vdGlvbi9Nb3Rpb25cIjtcbmltcG9ydCB7IFJlc3BvbnNpdmUgfSBmcm9tIFwiLi9SZXNwb25zaXZlXCI7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gXCIuL1RoZW1lL1RoZW1lXCI7XG5leHBvcnQgY2xhc3MgT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoZW5naW5lKSB7XG4gICAgICAgIF9PcHRpb25zX2luc3RhbmNlcy5hZGQodGhpcyk7XG4gICAgICAgIF9PcHRpb25zX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfT3B0aW9uc19lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLmF1dG9QbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTWFzayA9IG5ldyBCYWNrZ3JvdW5kTWFzaygpO1xuICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBuZXcgRnVsbFNjcmVlbigpO1xuICAgICAgICB0aGlzLmRldGVjdFJldGluYSA9IHRydWU7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgICAgICB0aGlzLmZwc0xpbWl0ID0gMTIwO1xuICAgICAgICB0aGlzLmludGVyYWN0aXZpdHkgPSBuZXcgSW50ZXJhY3Rpdml0eSgpO1xuICAgICAgICB0aGlzLm1hbnVhbFBhcnRpY2xlcyA9IFtdO1xuICAgICAgICB0aGlzLm1vdGlvbiA9IG5ldyBNb3Rpb24oKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBsb2FkUGFydGljbGVzT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnBhdXNlT25CbHVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXVzZU9uT3V0c2lkZVZpZXdwb3J0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNwb25zaXZlID0gW107XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7fTtcbiAgICAgICAgdGhpcy50aGVtZXMgPSBbXTtcbiAgICAgICAgdGhpcy56TGF5ZXJzID0gMTAwO1xuICAgIH1cbiAgICBnZXQgZnBzX2xpbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcHNMaW1pdDtcbiAgICB9XG4gICAgc2V0IGZwc19saW1pdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmZwc0xpbWl0ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCByZXRpbmFfZGV0ZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRlY3RSZXRpbmE7XG4gICAgfVxuICAgIHNldCByZXRpbmFfZGV0ZWN0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGV0ZWN0UmV0aW5hID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBiYWNrZ3JvdW5kTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVsbFNjcmVlbjtcbiAgICB9XG4gICAgc2V0IGJhY2tncm91bmRNb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZnVsbFNjcmVlbi5sb2FkKHZhbHVlKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByZXNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5wcmVzZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJlc2V0IG9mIGRhdGEucHJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1wb3J0UHJlc2V0KHByZXNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRQcmVzZXQoZGF0YS5wcmVzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmF1dG9QbGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1BsYXkgPSBkYXRhLmF1dG9QbGF5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRldGVjdFJldGluYSA9IChfYSA9IGRhdGEuZGV0ZWN0UmV0aW5hKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLnJldGluYV9kZXRlY3Q7XG4gICAgICAgIGlmIChkZXRlY3RSZXRpbmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RSZXRpbmEgPSBkZXRlY3RSZXRpbmE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGRhdGEuZHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnBzTGltaXQgPSAoX2IgPSBkYXRhLmZwc0xpbWl0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBkYXRhLmZwc19saW1pdDtcbiAgICAgICAgaWYgKGZwc0xpbWl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZnBzTGltaXQgPSBmcHNMaW1pdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wYXVzZU9uQmx1ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlT25CbHVyID0gZGF0YS5wYXVzZU9uQmx1cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wYXVzZU9uT3V0c2lkZVZpZXdwb3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VPbk91dHNpZGVWaWV3cG9ydCA9IGRhdGEucGF1c2VPbk91dHNpZGVWaWV3cG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS56TGF5ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuekxheWVycyA9IGRhdGEuekxheWVycztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJhY2tncm91bmQubG9hZChkYXRhLmJhY2tncm91bmQpO1xuICAgICAgICBjb25zdCBmdWxsU2NyZWVuID0gKF9jID0gZGF0YS5mdWxsU2NyZWVuKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkYXRhLmJhY2tncm91bmRNb2RlO1xuICAgICAgICBpZiAodHlwZW9mIGZ1bGxTY3JlZW4gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4uZW5hYmxlID0gZnVsbFNjcmVlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbi5sb2FkKGZ1bGxTY3JlZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZE1hc2subG9hZChkYXRhLmJhY2tncm91bmRNYXNrKTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2aXR5LmxvYWQoZGF0YS5pbnRlcmFjdGl2aXR5KTtcbiAgICAgICAgaWYgKGRhdGEubWFudWFsUGFydGljbGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsUGFydGljbGVzID0gZGF0YS5tYW51YWxQYXJ0aWNsZXMubWFwKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gbmV3IE1hbnVhbFBhcnRpY2xlKCk7XG4gICAgICAgICAgICAgICAgdG1wLmxvYWQodCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW90aW9uLmxvYWQoZGF0YS5tb3Rpb24pO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5sb2FkKGRhdGEucGFydGljbGVzKTtcbiAgICAgICAgdGhpcy5zdHlsZSA9IGRlZXBFeHRlbmQodGhpcy5zdHlsZSwgZGF0YS5zdHlsZSk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX09wdGlvbnNfZW5naW5lLCBcImZcIikucGx1Z2lucy5sb2FkT3B0aW9ucyh0aGlzLCBkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEucmVzcG9uc2l2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc3BvbnNpdmUgb2YgZGF0YS5yZXNwb25zaXZlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0UmVzcG9uc2l2ZSA9IG5ldyBSZXNwb25zaXZlKCk7XG4gICAgICAgICAgICAgICAgb3B0UmVzcG9uc2l2ZS5sb2FkKHJlc3BvbnNpdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2l2ZS5wdXNoKG9wdFJlc3BvbnNpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2l2ZS5zb3J0KChhLCBiKSA9PiBhLm1heFdpZHRoIC0gYi5tYXhXaWR0aCk7XG4gICAgICAgIGlmIChkYXRhLnRoZW1lcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRoZW1lIG9mIGRhdGEudGhlbWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0VGhlbWUgPSBuZXcgVGhlbWUoKTtcbiAgICAgICAgICAgICAgICBvcHRUaGVtZS5sb2FkKHRoZW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lcy5wdXNoKG9wdFRoZW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlZmF1bHREYXJrVGhlbWUgPSAoX2QgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9PcHRpb25zX2luc3RhbmNlcywgXCJtXCIsIF9PcHRpb25zX2ZpbmREZWZhdWx0VGhlbWUpLmNhbGwodGhpcywgXCJkYXJrXCIpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QubmFtZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0TGlnaHRUaGVtZSA9IChfZSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX09wdGlvbnNfaW5zdGFuY2VzLCBcIm1cIiwgX09wdGlvbnNfZmluZERlZmF1bHRUaGVtZSkuY2FsbCh0aGlzLCBcImxpZ2h0XCIpKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UubmFtZTtcbiAgICB9XG4gICAgc2V0VGhlbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgY29uc3QgY2hvc2VuVGhlbWUgPSB0aGlzLnRoZW1lcy5maW5kKCh0aGVtZSkgPT4gdGhlbWUubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgICBpZiAoY2hvc2VuVGhlbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoY2hvc2VuVGhlbWUub3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtZWRpYU1hdGNoID0gdHlwZW9mIG1hdGNoTWVkaWEgIT09IFwidW5kZWZpbmVkXCIgJiYgbWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIiksIGNsaWVudERhcmtNb2RlID0gbWVkaWFNYXRjaCAmJiBtZWRpYU1hdGNoLm1hdGNoZXMsIGRlZmF1bHRUaGVtZSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX09wdGlvbnNfaW5zdGFuY2VzLCBcIm1cIiwgX09wdGlvbnNfZmluZERlZmF1bHRUaGVtZSkuY2FsbCh0aGlzLCBjbGllbnREYXJrTW9kZSA/IFwiZGFya1wiIDogXCJsaWdodFwiKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoZGVmYXVsdFRoZW1lLm9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldFJlc3BvbnNpdmUod2lkdGgsIHB4UmF0aW8sIGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMubG9hZChkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNpdmVPcHRpb25zID0gdGhpcy5yZXNwb25zaXZlLmZpbmQoKHQpID0+IHQubW9kZSA9PT0gXCJzY3JlZW5cIiAmJiBzY3JlZW5cbiAgICAgICAgICAgID8gdC5tYXhXaWR0aCAqIHB4UmF0aW8gPiBzY3JlZW4uYXZhaWxXaWR0aFxuICAgICAgICAgICAgOiB0Lm1heFdpZHRoICogcHhSYXRpbyA+IHdpZHRoKTtcbiAgICAgICAgdGhpcy5sb2FkKHJlc3BvbnNpdmVPcHRpb25zID09PSBudWxsIHx8IHJlc3BvbnNpdmVPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zaXZlT3B0aW9ucy5vcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNpdmVPcHRpb25zID09PSBudWxsIHx8IHJlc3BvbnNpdmVPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zaXZlT3B0aW9ucy5tYXhXaWR0aDtcbiAgICB9XG4gICAgaW1wb3J0UHJlc2V0KHByZXNldCkge1xuICAgICAgICB0aGlzLmxvYWQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfT3B0aW9uc19lbmdpbmUsIFwiZlwiKS5wbHVnaW5zLmdldFByZXNldChwcmVzZXQpKTtcbiAgICB9XG59XG5fT3B0aW9uc19lbmdpbmUgPSBuZXcgV2Vha01hcCgpLCBfT3B0aW9uc19pbnN0YW5jZXMgPSBuZXcgV2Vha1NldCgpLCBfT3B0aW9uc19maW5kRGVmYXVsdFRoZW1lID0gZnVuY3Rpb24gX09wdGlvbnNfZmluZERlZmF1bHRUaGVtZShtb2RlKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoKF9hID0gdGhpcy50aGVtZXMuZmluZCgodGhlbWUpID0+IHRoZW1lLmRlZmF1bHQudmFsdWUgJiYgdGhlbWUuZGVmYXVsdC5tb2RlID09PSBtb2RlKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy50aGVtZXMuZmluZCgodGhlbWUpID0+IHRoZW1lLmRlZmF1bHQudmFsdWUgJiYgdGhlbWUuZGVmYXVsdC5tb2RlID09PSBcImFueVwiKSk7XG59O1xuIiwiZXhwb3J0IGNsYXNzIE9wdGlvbnNDb2xvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKHNvdXJjZSwgZGF0YSkge1xuICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBPcHRpb25zQ29sb3IoKTtcbiAgICAgICAgY29sb3IubG9hZChzb3VyY2UpO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHwgZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29sb3IubG9hZCh7IHZhbHVlOiBkYXRhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sb3IubG9hZChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS52YWx1ZSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBhcnRpY2xlc0JvdW5jZUZhY3RvciB9IGZyb20gXCIuL1BhcnRpY2xlc0JvdW5jZUZhY3RvclwiO1xuZXhwb3J0IGNsYXNzIFBhcnRpY2xlc0JvdW5jZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbCA9IG5ldyBQYXJ0aWNsZXNCb3VuY2VGYWN0b3IoKTtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IG5ldyBQYXJ0aWNsZXNCb3VuY2VGYWN0b3IoKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbC5sb2FkKGRhdGEuaG9yaXpvbnRhbCk7XG4gICAgICAgIHRoaXMudmVydGljYWwubG9hZChkYXRhLnZlcnRpY2FsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWYWx1ZVdpdGhSYW5kb20gfSBmcm9tIFwiLi4vLi4vVmFsdWVXaXRoUmFuZG9tXCI7XG5leHBvcnQgY2xhc3MgUGFydGljbGVzQm91bmNlRmFjdG9yIGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yYW5kb20ubWluaW11bVZhbHVlID0gMC4xO1xuICAgICAgICB0aGlzLnZhbHVlID0gMTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb2xsaXNpb25zT3ZlcmxhcCB9IGZyb20gXCIuL0NvbGxpc2lvbnNPdmVybGFwXCI7XG5pbXBvcnQgeyBQYXJ0aWNsZXNCb3VuY2UgfSBmcm9tIFwiLi4vQm91bmNlL1BhcnRpY2xlc0JvdW5jZVwiO1xuZXhwb3J0IGNsYXNzIENvbGxpc2lvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvdW5jZSA9IG5ldyBQYXJ0aWNsZXNCb3VuY2UoKTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJib3VuY2VcIjtcbiAgICAgICAgdGhpcy5vdmVybGFwID0gbmV3IENvbGxpc2lvbnNPdmVybGFwKCk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJvdW5jZS5sb2FkKGRhdGEuYm91bmNlKTtcbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBkYXRhLm1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVybGFwLmxvYWQoZGF0YS5vdmVybGFwKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ29sbGlzaW9uc092ZXJsYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmV0cmllcyA9IDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5yZXRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmV0cmllcyA9IGRhdGEucmV0cmllcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFNwbGl0IH0gZnJvbSBcIi4vU3BsaXRcIjtcbmV4cG9ydCBjbGFzcyBEZXN0cm95IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuc3BsaXQgPSBuZXcgU3BsaXQoKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gZGF0YS5tb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3BsaXQubG9hZChkYXRhLnNwbGl0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTcGxpdEZhY3RvciB9IGZyb20gXCIuL1NwbGl0RmFjdG9yXCI7XG5pbXBvcnQgeyBTcGxpdFJhdGUgfSBmcm9tIFwiLi9TcGxpdFJhdGVcIjtcbmltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBTcGxpdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICB0aGlzLmZhY3RvciA9IG5ldyBTcGxpdEZhY3RvcigpO1xuICAgICAgICB0aGlzLnJhdGUgPSBuZXcgU3BsaXRSYXRlKCk7XG4gICAgICAgIHRoaXMuc2l6ZU9mZnNldCA9IHRydWU7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZhY3Rvci5sb2FkKGRhdGEuZmFjdG9yKTtcbiAgICAgICAgdGhpcy5yYXRlLmxvYWQoZGF0YS5yYXRlKTtcbiAgICAgICAgaWYgKGRhdGEucGFydGljbGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzID0gZGVlcEV4dGVuZCh7fSwgZGF0YS5wYXJ0aWNsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNpemVPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaXplT2Zmc2V0ID0gZGF0YS5zaXplT2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVmFsdWVXaXRoUmFuZG9tIH0gZnJvbSBcIi4uLy4uL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0IGNsYXNzIFNwbGl0RmFjdG9yIGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVmFsdWVXaXRoUmFuZG9tIH0gZnJvbSBcIi4uLy4uL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0IGNsYXNzIFNwbGl0UmF0ZSBleHRlbmRzIFZhbHVlV2l0aFJhbmRvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB7IG1pbjogNCwgbWF4OiA5IH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGlmZURlbGF5IH0gZnJvbSBcIi4vTGlmZURlbGF5XCI7XG5pbXBvcnQgeyBMaWZlRHVyYXRpb24gfSBmcm9tIFwiLi9MaWZlRHVyYXRpb25cIjtcbmV4cG9ydCBjbGFzcyBMaWZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBuZXcgTGlmZURlbGF5KCk7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBuZXcgTGlmZUR1cmF0aW9uKCk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGF5LmxvYWQoZGF0YS5kZWxheSk7XG4gICAgICAgIHRoaXMuZHVyYXRpb24ubG9hZChkYXRhLmR1cmF0aW9uKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWYWx1ZVdpdGhSYW5kb20gfSBmcm9tIFwiLi4vLi4vVmFsdWVXaXRoUmFuZG9tXCI7XG5leHBvcnQgY2xhc3MgTGlmZURlbGF5IGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YS5zeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luYyA9IGRhdGEuc3luYztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFZhbHVlV2l0aFJhbmRvbSB9IGZyb20gXCIuLi8uLi9WYWx1ZVdpdGhSYW5kb21cIjtcbmV4cG9ydCBjbGFzcyBMaWZlRHVyYXRpb24gZXh0ZW5kcyBWYWx1ZVdpdGhSYW5kb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJhbmRvbS5taW5pbXVtVmFsdWUgPSAwLjAwMDE7XG4gICAgICAgIHRoaXMuc3luYyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIubG9hZChkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEuc3luYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN5bmMgPSBkYXRhLnN5bmM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBMaW5rc1NoYWRvdyB9IGZyb20gXCIuL0xpbmtzU2hhZG93XCI7XG5pbXBvcnQgeyBMaW5rc1RyaWFuZ2xlIH0gZnJvbSBcIi4vTGlua3NUcmlhbmdsZVwiO1xuaW1wb3J0IHsgT3B0aW9uc0NvbG9yIH0gZnJvbSBcIi4uLy4uL09wdGlvbnNDb2xvclwiO1xuZXhwb3J0IGNsYXNzIExpbmtzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ibGluayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IE9wdGlvbnNDb2xvcigpO1xuICAgICAgICB0aGlzLmNvbG9yLnZhbHVlID0gXCIjZmZmXCI7XG4gICAgICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMTAwO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZyZXF1ZW5jeSA9IDE7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gbmV3IExpbmtzU2hhZG93KCk7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gbmV3IExpbmtzVHJpYW5nbGUoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE7XG4gICAgICAgIHRoaXMud2FycCA9IGZhbHNlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYmxpbmsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ibGluayA9IGRhdGEuYmxpbms7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvciA9IE9wdGlvbnNDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcik7XG4gICAgICAgIGlmIChkYXRhLmNvbnNlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gZGF0YS5jb25zZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZyZXF1ZW5jeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZyZXF1ZW5jeSA9IGRhdGEuZnJlcXVlbmN5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gZGF0YS5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhZG93LmxvYWQoZGF0YS5zaGFkb3cpO1xuICAgICAgICB0aGlzLnRyaWFuZ2xlcy5sb2FkKGRhdGEudHJpYW5nbGVzKTtcbiAgICAgICAgaWYgKGRhdGEud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEud2FycCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcnAgPSBkYXRhLndhcnA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IgfSBmcm9tIFwiLi4vLi4vT3B0aW9uc0NvbG9yXCI7XG5leHBvcnQgY2xhc3MgTGlua3NTaGFkb3cge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJsdXIgPSA1O1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IE9wdGlvbnNDb2xvcigpO1xuICAgICAgICB0aGlzLmNvbG9yLnZhbHVlID0gXCIjMDAwXCI7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5ibHVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmx1ciA9IGRhdGEuYmx1cjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmNvbG9yLCBkYXRhLmNvbG9yKTtcbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IgfSBmcm9tIFwiLi4vLi4vT3B0aW9uc0NvbG9yXCI7XG5leHBvcnQgY2xhc3MgTGlua3NUcmlhbmdsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJlcXVlbmN5ID0gMTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuY29sb3IsIGRhdGEuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZyZXF1ZW5jeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZyZXF1ZW5jeSA9IGRhdGEuZnJlcXVlbmN5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gZGF0YS5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW92ZUFuZ2xlIH0gZnJvbSBcIi4vTW92ZUFuZ2xlXCI7XG5pbXBvcnQgeyBNb3ZlQXR0cmFjdCB9IGZyb20gXCIuL01vdmVBdHRyYWN0XCI7XG5pbXBvcnQgeyBNb3ZlR3Jhdml0eSB9IGZyb20gXCIuL01vdmVHcmF2aXR5XCI7XG5pbXBvcnQgeyBNb3ZlUGF0aCB9IGZyb20gXCIuL1BhdGgvTW92ZVBhdGhcIjtcbmltcG9ydCB7IE1vdmVUcmFpbCB9IGZyb20gXCIuL01vdmVUcmFpbFwiO1xuaW1wb3J0IHsgT3V0TW9kZXMgfSBmcm9tIFwiLi9PdXRNb2Rlc1wiO1xuaW1wb3J0IHsgU3BpbiB9IGZyb20gXCIuL1NwaW5cIjtcbmltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBNb3ZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbmdsZSA9IG5ldyBNb3ZlQW5nbGUoKTtcbiAgICAgICAgdGhpcy5hdHRyYWN0ID0gbmV3IE1vdmVBdHRyYWN0KCk7XG4gICAgICAgIHRoaXMuY2VudGVyID0ge1xuICAgICAgICAgICAgeDogNTAsXG4gICAgICAgICAgICB5OiA1MCxcbiAgICAgICAgICAgIHJhZGl1czogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWNheSA9IDA7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSB7fTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5kcmlmdCA9IDA7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IG5ldyBNb3ZlR3Jhdml0eSgpO1xuICAgICAgICB0aGlzLnBhdGggPSBuZXcgTW92ZVBhdGgoKTtcbiAgICAgICAgdGhpcy5vdXRNb2RlcyA9IG5ldyBPdXRNb2RlcygpO1xuICAgICAgICB0aGlzLnJhbmRvbSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpemUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMuc3BpbiA9IG5ldyBTcGluKCk7XG4gICAgICAgIHRoaXMuc3RyYWlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFpbCA9IG5ldyBNb3ZlVHJhaWwoKTtcbiAgICAgICAgdGhpcy52aWJyYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2FycCA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY29sbGlzaW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXQgY29sbGlzaW9ucyh2YWx1ZSkge1xuICAgIH1cbiAgICBnZXQgYm91bmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zO1xuICAgIH1cbiAgICBzZXQgYm91bmNlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgb3V0X21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dE1vZGU7XG4gICAgfVxuICAgIHNldCBvdXRfbW9kZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLm91dE1vZGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IG91dE1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dE1vZGVzLmRlZmF1bHQ7XG4gICAgfVxuICAgIHNldCBvdXRNb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3V0TW9kZXMuZGVmYXVsdCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgbm9pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgfVxuICAgIHNldCBub2lzZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhdGggPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5hbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEuYW5nbGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlLnZhbHVlID0gZGF0YS5hbmdsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUubG9hZChkYXRhLmFuZ2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF0dHJhY3QubG9hZChkYXRhLmF0dHJhY3QpO1xuICAgICAgICB0aGlzLmNlbnRlciA9IGRlZXBFeHRlbmQodGhpcy5jZW50ZXIsIGRhdGEuY2VudGVyKTtcbiAgICAgICAgaWYgKGRhdGEuZGVjYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZWNheSA9IGRhdGEuZGVjYXk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGF0YS5kaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9XG4gICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuZGlzdGFuY2UgPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiBkYXRhLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWw6IGRhdGEuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiBkZWVwRXh0ZW5kKHt9LCBkYXRhLmRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kcmlmdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyaWZ0ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmRyaWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyYXZpdHkubG9hZChkYXRhLmdyYXZpdHkpO1xuICAgICAgICBjb25zdCBvdXRNb2RlID0gKF9hID0gZGF0YS5vdXRNb2RlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhLm91dF9tb2RlO1xuICAgICAgICBpZiAoZGF0YS5vdXRNb2RlcyAhPT0gdW5kZWZpbmVkIHx8IG91dE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLm91dE1vZGVzID09PSBcInN0cmluZ1wiIHx8IChkYXRhLm91dE1vZGVzID09PSB1bmRlZmluZWQgJiYgb3V0TW9kZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0TW9kZXMubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IChfYiA9IGRhdGEub3V0TW9kZXMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG91dE1vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm91dE1vZGVzLmxvYWQoZGF0YS5vdXRNb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRoLmxvYWQoKF9jID0gZGF0YS5wYXRoKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkYXRhLm5vaXNlKTtcbiAgICAgICAgaWYgKGRhdGEucmFuZG9tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tID0gZGF0YS5yYW5kb207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNldFJhbmdlVmFsdWUoZGF0YS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcGluLmxvYWQoZGF0YS5zcGluKTtcbiAgICAgICAgaWYgKGRhdGEuc3RyYWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdHJhaWdodCA9IGRhdGEuc3RyYWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFpbC5sb2FkKGRhdGEudHJhaWwpO1xuICAgICAgICBpZiAoZGF0YS52aWJyYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlicmF0ZSA9IGRhdGEudmlicmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS53YXJwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FycCA9IGRhdGEud2FycDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBNb3ZlQW5nbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMudmFsdWUgPSA5MDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IHNldFJhbmdlVmFsdWUoZGF0YS5vZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZXRSYW5nZVZhbHVlKGRhdGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuZXhwb3J0IGNsYXNzIE1vdmVBdHRyYWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDIwMDtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGUgPSB7XG4gICAgICAgICAgICB4OiAzMDAwLFxuICAgICAgICAgICAgeTogMzAwMCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IHJvdGF0ZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdGF0ZS54O1xuICAgIH1cbiAgICBzZXQgcm90YXRlWCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJvdGF0ZS54ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCByb3RhdGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGUueTtcbiAgICB9XG4gICAgc2V0IHJvdGF0ZVkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5yb3RhdGUueSA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3RhdGVYID0gKF9iID0gKF9hID0gZGF0YS5yb3RhdGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS54KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBkYXRhLnJvdGF0ZVg7XG4gICAgICAgIGlmIChyb3RhdGVYICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucm90YXRlLnggPSByb3RhdGVYO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSAoX2QgPSAoX2MgPSBkYXRhLnJvdGF0ZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IGRhdGEucm90YXRlWTtcbiAgICAgICAgaWYgKHJvdGF0ZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGUueSA9IHJvdGF0ZVk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgTW92ZUdyYXZpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IDkuODE7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW52ZXJzZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1heFNwZWVkID0gNTA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5hY2NlbGVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSBzZXRSYW5nZVZhbHVlKGRhdGEuYWNjZWxlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5pbnZlcnNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW52ZXJzZSA9IGRhdGEuaW52ZXJzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5tYXhTcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gc2V0UmFuZ2VWYWx1ZShkYXRhLm1heFNwZWVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi8uLi9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCBjbGFzcyBNb3ZlVHJhaWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDEwO1xuICAgICAgICB0aGlzLmZpbGxDb2xvciA9IG5ldyBPcHRpb25zQ29sb3IoKTtcbiAgICAgICAgdGhpcy5maWxsQ29sb3IudmFsdWUgPSBcIiMwMDAwMDBcIjtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsbENvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmZpbGxDb2xvciwgZGF0YS5maWxsQ29sb3IpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBPdXRNb2RlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IFwib3V0XCI7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGF0YS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm90dG9tID0gKF9hID0gZGF0YS5ib3R0b20pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEuZGVmYXVsdDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gKF9iID0gZGF0YS5sZWZ0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBkYXRhLmRlZmF1bHQ7XG4gICAgICAgIHRoaXMucmlnaHQgPSAoX2MgPSBkYXRhLnJpZ2h0KSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkYXRhLmRlZmF1bHQ7XG4gICAgICAgIHRoaXMudG9wID0gKF9kID0gZGF0YS50b3ApICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IGRhdGEuZGVmYXVsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb3ZlUGF0aERlbGF5IH0gZnJvbSBcIi4vTW92ZVBhdGhEZWxheVwiO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9VdGlscy9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIE1vdmVQYXRoIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jbGFtcCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBuZXcgTW92ZVBhdGhEZWxheSgpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNsYW1wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhbXAgPSBkYXRhLmNsYW1wO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsYXkubG9hZChkYXRhLmRlbGF5KTtcbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBkYXRhLmdlbmVyYXRvcjtcbiAgICAgICAgaWYgKGRhdGEub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gZGVlcEV4dGVuZCh0aGlzLm9wdGlvbnMsIGRhdGEub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWYWx1ZVdpdGhSYW5kb20gfSBmcm9tIFwiLi4vLi4vLi4vVmFsdWVXaXRoUmFuZG9tXCI7XG5leHBvcnQgY2xhc3MgTW92ZVBhdGhEZWxheSBleHRlbmRzIFZhbHVlV2l0aFJhbmRvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9VdGlscy9VdGlsc1wiO1xuaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFNwaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5hY2NlbGVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSBzZXRSYW5nZVZhbHVlKGRhdGEuYWNjZWxlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbiA/IGRlZXBFeHRlbmQoe30sIGRhdGEucG9zaXRpb24pIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQYXJ0aWNsZXNEZW5zaXR5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcmVhID0gODAwO1xuICAgICAgICB0aGlzLmZhY3RvciA9IDEwMDA7XG4gICAgfVxuICAgIGdldCB2YWx1ZV9hcmVhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmVhO1xuICAgIH1cbiAgICBzZXQgdmFsdWVfYXJlYSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFyZWEgPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJlYSA9IChfYSA9IGRhdGEuYXJlYSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YS52YWx1ZV9hcmVhO1xuICAgICAgICBpZiAoYXJlYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvciA9IGRhdGEuZmFjdG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFydGljbGVzRGVuc2l0eSB9IGZyb20gXCIuL1BhcnRpY2xlc0RlbnNpdHlcIjtcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZXNOdW1iZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRlbnNpdHkgPSBuZXcgUGFydGljbGVzRGVuc2l0eSgpO1xuICAgICAgICB0aGlzLmxpbWl0ID0gMDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDEwMDtcbiAgICB9XG4gICAgZ2V0IG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGltaXQ7XG4gICAgfVxuICAgIHNldCBtYXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saW1pdCA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbnNpdHkubG9hZChkYXRhLmRlbnNpdHkpO1xuICAgICAgICBjb25zdCBsaW1pdCA9IChfYSA9IGRhdGEubGltaXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEubWF4O1xuICAgICAgICBpZiAobGltaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5saW1pdCA9IGxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgT3BhY2l0eUFuaW1hdGlvbiB9IGZyb20gXCIuL09wYWNpdHlBbmltYXRpb25cIjtcbmltcG9ydCB7IFZhbHVlV2l0aFJhbmRvbSB9IGZyb20gXCIuLi8uLi9WYWx1ZVdpdGhSYW5kb21cIjtcbmltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBPcGFjaXR5IGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgT3BhY2l0eUFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnJhbmRvbS5taW5pbXVtVmFsdWUgPSAwLjE7XG4gICAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgICBnZXQgYW5pbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uO1xuICAgIH1cbiAgICBzZXQgYW5pbSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSAoX2EgPSBkYXRhLmFuaW1hdGlvbikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YS5hbmltO1xuICAgICAgICBpZiAoYW5pbWF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmxvYWQoYW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZXRSYW5nZVZhbHVlKHRoaXMudmFsdWUsIHRoaXMuYW5pbWF0aW9uLmVuYWJsZSA/IHRoaXMuYW5pbWF0aW9uLm1pbmltdW1WYWx1ZSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25PcHRpb25zIH0gZnJvbSBcIi4uLy4uL0FuaW1hdGlvbk9wdGlvbnNcIjtcbmV4cG9ydCBjbGFzcyBPcGFjaXR5QW5pbWF0aW9uIGV4dGVuZHMgQW5pbWF0aW9uT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwZWVkID0gMjtcbiAgICAgICAgdGhpcy5zdGFydFZhbHVlID0gXCJyYW5kb21cIjtcbiAgICAgICAgdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIGdldCBvcGFjaXR5X21pbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWluaW11bVZhbHVlO1xuICAgIH1cbiAgICBzZXQgb3BhY2l0eV9taW4odmFsdWUpIHtcbiAgICAgICAgdGhpcy5taW5pbXVtVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIubG9hZChkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEuZGVzdHJveSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBkYXRhLmRlc3Ryb3k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5taW5pbXVtVmFsdWUgPSAoX2EgPSBkYXRhLm1pbmltdW1WYWx1ZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YS5vcGFjaXR5X21pbjtcbiAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGRhdGEuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3RhcnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VmFsdWUgPSBkYXRhLnN0YXJ0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3luYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN5bmMgPSBkYXRhLnN5bmM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25PcHRpb25zIH0gZnJvbSBcIi4uLy4uL0FuaW1hdGlvbk9wdGlvbnNcIjtcbmltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi8uLi9PcHRpb25zQ29sb3JcIjtcbmltcG9ydCB7IE9yYml0Um90YXRpb24gfSBmcm9tIFwiLi9PcmJpdFJvdGF0aW9uXCI7XG5pbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgT3JiaXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb25PcHRpb25zKCk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSBuZXcgT3JiaXRSb3RhdGlvbigpO1xuICAgICAgICB0aGlzLndpZHRoID0gMTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmxvYWQoZGF0YS5hbmltYXRpb24pO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLmxvYWQoZGF0YS5yb3RhdGlvbik7XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gc2V0UmFuZ2VWYWx1ZShkYXRhLm9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBzZXRSYW5nZVZhbHVlKGRhdGEud2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHNldFJhbmdlVmFsdWUoZGF0YS5yYWRpdXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuY29sb3IsIGRhdGEuY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVmFsdWVXaXRoUmFuZG9tIH0gZnJvbSBcIi4uLy4uL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0IGNsYXNzIE9yYml0Um90YXRpb24gZXh0ZW5kcyBWYWx1ZVdpdGhSYW5kb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gNDU7XG4gICAgICAgIHRoaXMucmFuZG9tLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmRvbS5taW5pbXVtVmFsdWUgPSAwO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmxvYWQoZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0YWJsZUNvbG9yIH0gZnJvbSBcIi4uL0FuaW1hdGFibGVDb2xvclwiO1xuaW1wb3J0IHsgQW5pbWF0YWJsZUdyYWRpZW50IH0gZnJvbSBcIi4uL0FuaW1hdGFibGVHcmFkaWVudFwiO1xuaW1wb3J0IHsgQ29sbGlzaW9ucyB9IGZyb20gXCIuL0NvbGxpc2lvbnMvQ29sbGlzaW9uc1wiO1xuaW1wb3J0IHsgRGVzdHJveSB9IGZyb20gXCIuL0Rlc3Ryb3kvRGVzdHJveVwiO1xuaW1wb3J0IHsgTGlmZSB9IGZyb20gXCIuL0xpZmUvTGlmZVwiO1xuaW1wb3J0IHsgTGlua3MgfSBmcm9tIFwiLi9MaW5rcy9MaW5rc1wiO1xuaW1wb3J0IHsgTW92ZSB9IGZyb20gXCIuL01vdmUvTW92ZVwiO1xuaW1wb3J0IHsgT3BhY2l0eSB9IGZyb20gXCIuL09wYWNpdHkvT3BhY2l0eVwiO1xuaW1wb3J0IHsgT3JiaXQgfSBmcm9tIFwiLi9PcmJpdC9PcmJpdFwiO1xuaW1wb3J0IHsgUGFydGljbGVzQm91bmNlIH0gZnJvbSBcIi4vQm91bmNlL1BhcnRpY2xlc0JvdW5jZVwiO1xuaW1wb3J0IHsgUGFydGljbGVzTnVtYmVyIH0gZnJvbSBcIi4vTnVtYmVyL1BhcnRpY2xlc051bWJlclwiO1xuaW1wb3J0IHsgUGFydGljbGVzUmVwdWxzZSB9IGZyb20gXCIuL1JlcHVsc2UvUGFydGljbGVzUmVwdWxzZVwiO1xuaW1wb3J0IHsgUm9sbCB9IGZyb20gXCIuL1JvbGwvUm9sbFwiO1xuaW1wb3J0IHsgUm90YXRlIH0gZnJvbSBcIi4vUm90YXRlL1JvdGF0ZVwiO1xuaW1wb3J0IHsgU2hhZG93IH0gZnJvbSBcIi4vU2hhZG93XCI7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gXCIuL1NoYXBlL1NoYXBlXCI7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSBcIi4vU2l6ZS9TaXplXCI7XG5pbXBvcnQgeyBTdHJva2UgfSBmcm9tIFwiLi9TdHJva2VcIjtcbmltcG9ydCB7IFRpbHQgfSBmcm9tIFwiLi9UaWx0L1RpbHRcIjtcbmltcG9ydCB7IFR3aW5rbGUgfSBmcm9tIFwiLi9Ud2lua2xlL1R3aW5rbGVcIjtcbmltcG9ydCB7IFdvYmJsZSB9IGZyb20gXCIuL1dvYmJsZS9Xb2JibGVcIjtcbmltcG9ydCB7IFpJbmRleCB9IGZyb20gXCIuL1pJbmRleC9aSW5kZXhcIjtcbmltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZXNPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3VuY2UgPSBuZXcgUGFydGljbGVzQm91bmNlKCk7XG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IG5ldyBDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY29sb3IgPSBuZXcgQW5pbWF0YWJsZUNvbG9yKCk7XG4gICAgICAgIHRoaXMuY29sb3IudmFsdWUgPSBcIiNmZmZcIjtcbiAgICAgICAgdGhpcy5kZXN0cm95ID0gbmV3IERlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudCA9IFtdO1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLmxpZmUgPSBuZXcgTGlmZSgpO1xuICAgICAgICB0aGlzLmxpbmtzID0gbmV3IExpbmtzKCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBNb3ZlKCk7XG4gICAgICAgIHRoaXMubnVtYmVyID0gbmV3IFBhcnRpY2xlc051bWJlcigpO1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSBuZXcgT3BhY2l0eSgpO1xuICAgICAgICB0aGlzLm9yYml0ID0gbmV3IE9yYml0KCk7XG4gICAgICAgIHRoaXMucmVkdWNlRHVwbGljYXRlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcHVsc2UgPSBuZXcgUGFydGljbGVzUmVwdWxzZSgpO1xuICAgICAgICB0aGlzLnJvbGwgPSBuZXcgUm9sbCgpO1xuICAgICAgICB0aGlzLnJvdGF0ZSA9IG5ldyBSb3RhdGUoKTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSBuZXcgU2hhZG93KCk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBuZXcgU2hhcGUoKTtcbiAgICAgICAgdGhpcy5zaXplID0gbmV3IFNpemUoKTtcbiAgICAgICAgdGhpcy5zdHJva2UgPSBuZXcgU3Ryb2tlKCk7XG4gICAgICAgIHRoaXMudGlsdCA9IG5ldyBUaWx0KCk7XG4gICAgICAgIHRoaXMudHdpbmtsZSA9IG5ldyBUd2lua2xlKCk7XG4gICAgICAgIHRoaXMud29iYmxlID0gbmV3IFdvYmJsZSgpO1xuICAgICAgICB0aGlzLnpJbmRleCA9IG5ldyBaSW5kZXgoKTtcbiAgICB9XG4gICAgZ2V0IGxpbmVfbGlua2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saW5rcztcbiAgICB9XG4gICAgc2V0IGxpbmVfbGlua2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxpbmVMaW5rZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbmtzO1xuICAgIH1cbiAgICBzZXQgbGluZUxpbmtlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpbmtzID0gdmFsdWU7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJvdW5jZS5sb2FkKGRhdGEuYm91bmNlKTtcbiAgICAgICAgdGhpcy5jb2xvci5sb2FkKEFuaW1hdGFibGVDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcikpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kubG9hZChkYXRhLmRlc3Ryb3kpO1xuICAgICAgICB0aGlzLmxpZmUubG9hZChkYXRhLmxpZmUpO1xuICAgICAgICBjb25zdCBsaW5rcyA9IChfYiA9IChfYSA9IGRhdGEubGlua3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEubGluZUxpbmtlZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZGF0YS5saW5lX2xpbmtlZDtcbiAgICAgICAgaWYgKGxpbmtzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MubG9hZChsaW5rcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZ3JvdXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgaW4gZGF0YS5ncm91cHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZGF0YS5ncm91cHNbZ3JvdXBdO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gZGVlcEV4dGVuZCgoX2MgPSB0aGlzLmdyb3Vwc1tncm91cF0pICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHt9LCBpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlLmxvYWQoZGF0YS5tb3ZlKTtcbiAgICAgICAgdGhpcy5udW1iZXIubG9hZChkYXRhLm51bWJlcik7XG4gICAgICAgIHRoaXMub3BhY2l0eS5sb2FkKGRhdGEub3BhY2l0eSk7XG4gICAgICAgIHRoaXMub3JiaXQubG9hZChkYXRhLm9yYml0KTtcbiAgICAgICAgaWYgKGRhdGEucmVkdWNlRHVwbGljYXRlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlZHVjZUR1cGxpY2F0ZXMgPSBkYXRhLnJlZHVjZUR1cGxpY2F0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXB1bHNlLmxvYWQoZGF0YS5yZXB1bHNlKTtcbiAgICAgICAgdGhpcy5yb2xsLmxvYWQoZGF0YS5yb2xsKTtcbiAgICAgICAgdGhpcy5yb3RhdGUubG9hZChkYXRhLnJvdGF0ZSk7XG4gICAgICAgIHRoaXMuc2hhcGUubG9hZChkYXRhLnNoYXBlKTtcbiAgICAgICAgdGhpcy5zaXplLmxvYWQoZGF0YS5zaXplKTtcbiAgICAgICAgdGhpcy5zaGFkb3cubG9hZChkYXRhLnNoYWRvdyk7XG4gICAgICAgIHRoaXMudGlsdC5sb2FkKGRhdGEudGlsdCk7XG4gICAgICAgIHRoaXMudHdpbmtsZS5sb2FkKGRhdGEudHdpbmtsZSk7XG4gICAgICAgIHRoaXMud29iYmxlLmxvYWQoZGF0YS53b2JibGUpO1xuICAgICAgICB0aGlzLnpJbmRleC5sb2FkKGRhdGEuekluZGV4KTtcbiAgICAgICAgY29uc3QgY29sbGlzaW9ucyA9IChfZSA9IChfZCA9IGRhdGEubW92ZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNvbGxpc2lvbnMpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IChfZiA9IGRhdGEubW92ZSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmJvdW5jZTtcbiAgICAgICAgaWYgKGNvbGxpc2lvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zLmVuYWJsZSA9IGNvbGxpc2lvbnM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xsaXNpb25zLmxvYWQoZGF0YS5jb2xsaXNpb25zKTtcbiAgICAgICAgY29uc3Qgc3Ryb2tlVG9Mb2FkID0gKF9nID0gZGF0YS5zdHJva2UpICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IChfaCA9IGRhdGEuc2hhcGUpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5zdHJva2U7XG4gICAgICAgIGlmIChzdHJva2VUb0xvYWQpIHtcbiAgICAgICAgICAgIGlmIChzdHJva2VUb0xvYWQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlVG9Mb2FkLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBuZXcgU3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Ryb2tlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJva2UgPSBuZXcgU3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb2tlLmxvYWQoc3Ryb2tlVG9Mb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncmFkaWVudFRvTG9hZCA9IGRhdGEuZ3JhZGllbnQ7XG4gICAgICAgIGlmIChncmFkaWVudFRvTG9hZCkge1xuICAgICAgICAgICAgaWYgKGdyYWRpZW50VG9Mb2FkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYWRpZW50ID0gZ3JhZGllbnRUb0xvYWQubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBBbmltYXRhYmxlR3JhZGllbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wLmxvYWQocyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmFkaWVudCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhZGllbnQgPSBuZXcgQW5pbWF0YWJsZUdyYWRpZW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhZGllbnQubG9hZChncmFkaWVudFRvTG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWYWx1ZVdpdGhSYW5kb20gfSBmcm9tIFwiLi4vLi4vVmFsdWVXaXRoUmFuZG9tXCI7XG5pbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgUGFydGljbGVzUmVwdWxzZSBleHRlbmRzIFZhbHVlV2l0aFJhbmRvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IDE7XG4gICAgICAgIHRoaXMuZmFjdG9yID0gMTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGRhdGEuZW5hYmxlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gc2V0UmFuZ2VWYWx1ZShkYXRhLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5mYWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3IgPSBzZXRSYW5nZVZhbHVlKGRhdGEuZmFjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnNwZWVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi8uLi9PcHRpb25zQ29sb3JcIjtcbmltcG9ydCB7IFJvbGxMaWdodCB9IGZyb20gXCIuL1JvbGxMaWdodFwiO1xuaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFJvbGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhcmtlbiA9IG5ldyBSb2xsTGlnaHQoKTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmxpZ2h0ZW4gPSBuZXcgUm9sbExpZ2h0KCk7XG4gICAgICAgIHRoaXMubW9kZSA9IFwidmVydGljYWxcIjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI1O1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYmFja0NvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmJhY2tDb2xvciwgZGF0YS5iYWNrQ29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGFya2VuLmxvYWQoZGF0YS5kYXJrZW4pO1xuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVubGlnaHRlbi5sb2FkKGRhdGEuZW5saWdodGVuKTtcbiAgICAgICAgaWYgKGRhdGEubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBkYXRhLm1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNldFJhbmdlVmFsdWUoZGF0YS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgUm9sbExpZ2h0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJvdGF0ZUFuaW1hdGlvbiB9IGZyb20gXCIuL1JvdGF0ZUFuaW1hdGlvblwiO1xuaW1wb3J0IHsgVmFsdWVXaXRoUmFuZG9tIH0gZnJvbSBcIi4uLy4uL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0IGNsYXNzIFJvdGF0ZSBleHRlbmRzIFZhbHVlV2l0aFJhbmRvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IFJvdGF0ZUFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFwiY2xvY2t3aXNlXCI7XG4gICAgICAgIHRoaXMucGF0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmxvYWQoZGF0YSk7XG4gICAgICAgIGlmIChkYXRhLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRhdGEuZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmxvYWQoZGF0YS5hbmltYXRpb24pO1xuICAgICAgICBpZiAoZGF0YS5wYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IGRhdGEucGF0aDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBSb3RhdGVBbmltYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc2V0UmFuZ2VWYWx1ZShkYXRhLnNwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luYyA9IGRhdGEuc3luYztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wdGlvbnNDb2xvciB9IGZyb20gXCIuLi9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCBjbGFzcyBTaGFkb3cge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJsdXIgPSAwO1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IE9wdGlvbnNDb2xvcigpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbG9yLnZhbHVlID0gXCIjMDAwXCI7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5ibHVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmx1ciA9IGRhdGEuYmx1cjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmNvbG9yLCBkYXRhLmNvbG9yKTtcbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vZmZzZXQueCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldC54ID0gZGF0YS5vZmZzZXQueDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vZmZzZXQueSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldC55ID0gZGF0YS5vZmZzZXQueTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLnR5cGUgPSBcImNpcmNsZVwiO1xuICAgIH1cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLm9wdGlvbnNbXCJpbWFnZVwiXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5vcHRpb25zW1wiaW1hZ2VzXCJdKTtcbiAgICB9XG4gICAgc2V0IGltYWdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1tcImltYWdlXCJdID0gdmFsdWU7XG4gICAgICAgIHRoaXMub3B0aW9uc1tcImltYWdlc1wiXSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgY3VzdG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICAgIH1cbiAgICBzZXQgY3VzdG9tKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgaW1hZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9XG4gICAgc2V0IGltYWdlcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmltYWdlID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBzdHJva2UoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgc2V0IHN0cm9rZShfdmFsdWUpIHtcbiAgICB9XG4gICAgZ2V0IGNoYXJhY3RlcigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMub3B0aW9uc1tcImNoYXJhY3RlclwiXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5vcHRpb25zW1wiY2hhclwiXSk7XG4gICAgfVxuICAgIHNldCBjaGFyYWN0ZXIodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zW1wiY2hhcmFjdGVyXCJdID0gdmFsdWU7XG4gICAgICAgIHRoaXMub3B0aW9uc1tcImNoYXJcIl0gPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHBvbHlnb24oKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLm9wdGlvbnNbXCJwb2x5Z29uXCJdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLm9wdGlvbnNbXCJzdGFyXCJdKTtcbiAgICB9XG4gICAgc2V0IHBvbHlnb24odmFsdWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zW1wicG9seWdvblwiXSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9wdGlvbnNbXCJzdGFyXCJdID0gdmFsdWU7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IChfYSA9IGRhdGEub3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YS5jdXN0b207XG4gICAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2hhcGUgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBvcHRpb25zW3NoYXBlXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbc2hhcGVdID0gZGVlcEV4dGVuZCgoX2IgPSB0aGlzLm9wdGlvbnNbc2hhcGVdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZFNoYXBlKGRhdGEuY2hhcmFjdGVyLCBcImNoYXJhY3RlclwiLCBcImNoYXJcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubG9hZFNoYXBlKGRhdGEucG9seWdvbiwgXCJwb2x5Z29uXCIsIFwic3RhclwiLCBmYWxzZSk7XG4gICAgICAgIHRoaXMubG9hZFNoYXBlKChfYyA9IGRhdGEuaW1hZ2UpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGRhdGEuaW1hZ2VzLCBcImltYWdlXCIsIFwiaW1hZ2VzXCIsIHRydWUpO1xuICAgICAgICBpZiAoZGF0YS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkU2hhcGUoaXRlbSwgbWFpbktleSwgYWx0S2V5LCBhbHRPdmVycmlkZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnNbbWFpbktleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbbWFpbktleV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1thbHRLZXldIHx8IGFsdE92ZXJyaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1thbHRLZXldID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zW21haW5LZXldID0gZGVlcEV4dGVuZCgoX2EgPSB0aGlzLm9wdGlvbnNbbWFpbktleV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdLCBpdGVtKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zW2FsdEtleV0gfHwgYWx0T3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWx0S2V5XSA9IGRlZXBFeHRlbmQoKF9iID0gdGhpcy5vcHRpb25zW2FsdEtleV0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbbWFpbktleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1ttYWluS2V5XSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zW2FsdEtleV0gfHwgYWx0T3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FsdEtleV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbbWFpbktleV0gPSBkZWVwRXh0ZW5kKChfYyA9IHRoaXMub3B0aW9uc1ttYWluS2V5XSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDoge30sIGl0ZW0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNbYWx0S2V5XSB8fCBhbHRPdmVycmlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1thbHRLZXldID0gZGVlcEV4dGVuZCgoX2QgPSB0aGlzLm9wdGlvbnNbYWx0S2V5XSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDoge30sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2l6ZUFuaW1hdGlvbiB9IGZyb20gXCIuL1NpemVBbmltYXRpb25cIjtcbmltcG9ydCB7IFZhbHVlV2l0aFJhbmRvbSB9IGZyb20gXCIuLi8uLi9WYWx1ZVdpdGhSYW5kb21cIjtcbmltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBTaXplIGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgU2l6ZUFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnJhbmRvbS5taW5pbXVtVmFsdWUgPSAxO1xuICAgICAgICB0aGlzLnZhbHVlID0gMztcbiAgICB9XG4gICAgZ2V0IGFuaW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbjtcbiAgICB9XG4gICAgc2V0IGFuaW0odmFsdWUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIubG9hZChkYXRhKTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gKF9hID0gZGF0YS5hbmltYXRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEuYW5pbTtcbiAgICAgICAgaWYgKGFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5sb2FkKGFuaW1hdGlvbik7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gc2V0UmFuZ2VWYWx1ZSh0aGlzLnZhbHVlLCB0aGlzLmFuaW1hdGlvbi5lbmFibGUgPyB0aGlzLmFuaW1hdGlvbi5taW5pbXVtVmFsdWUgOiB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9BbmltYXRpb25PcHRpb25zXCI7XG5leHBvcnQgY2xhc3MgU2l6ZUFuaW1hdGlvbiBleHRlbmRzIEFuaW1hdGlvbk9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMuc3RhcnRWYWx1ZSA9IFwicmFuZG9tXCI7XG4gICAgICAgIHRoaXMuc3luYyA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgc2l6ZV9taW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbmltdW1WYWx1ZTtcbiAgICB9XG4gICAgc2V0IHNpemVfbWluKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubWluaW11bVZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyLmxvYWQoZGF0YSk7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRlc3Ryb3kgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95ID0gZGF0YS5kZXN0cm95O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWluaW11bVZhbHVlID0gKF9hID0gZGF0YS5taW5pbXVtVmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGEuc2l6ZV9taW47XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN0YXJ0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFZhbHVlID0gZGF0YS5zdGFydFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0YWJsZUNvbG9yIH0gZnJvbSBcIi4uL0FuaW1hdGFibGVDb2xvclwiO1xuZXhwb3J0IGNsYXNzIFN0cm9rZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IEFuaW1hdGFibGVDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBUaWx0QW5pbWF0aW9uIH0gZnJvbSBcIi4vVGlsdEFuaW1hdGlvblwiO1xuaW1wb3J0IHsgVmFsdWVXaXRoUmFuZG9tIH0gZnJvbSBcIi4uLy4uL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0IGNsYXNzIFRpbHQgZXh0ZW5kcyBWYWx1ZVdpdGhSYW5kb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBUaWx0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gXCJjbG9ja3dpc2VcIjtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5sb2FkKGRhdGEuYW5pbWF0aW9uKTtcbiAgICAgICAgaWYgKGRhdGEuZGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGF0YS5kaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzZXRSYW5nZVZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgY2xhc3MgVGlsdEFuaW1hdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBzZXRSYW5nZVZhbHVlKGRhdGEuc3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHdpbmtsZVZhbHVlcyB9IGZyb20gXCIuL1R3aW5rbGVWYWx1ZXNcIjtcbmV4cG9ydCBjbGFzcyBUd2lua2xlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saW5lcyA9IG5ldyBUd2lua2xlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFR3aW5rbGVWYWx1ZXMoKTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGluZXMubG9hZChkYXRhLmxpbmVzKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMubG9hZChkYXRhLnBhcnRpY2xlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgT3B0aW9uc0NvbG9yIH0gZnJvbSBcIi4uLy4uL09wdGlvbnNDb2xvclwiO1xuaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFR3aW5rbGVWYWx1ZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZyZXF1ZW5jeSA9IDAuMDU7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gT3B0aW9uc0NvbG9yLmNyZWF0ZSh0aGlzLmNvbG9yLCBkYXRhLmNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5mcmVxdWVuY3kgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5mcmVxdWVuY3kgPSBkYXRhLmZyZXF1ZW5jeTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IHNldFJhbmdlVmFsdWUoZGF0YS5vcGFjaXR5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVXRpbHMvTnVtYmVyVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBXb2JibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gNTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDUwO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHNldFJhbmdlVmFsdWUoZGF0YS5kaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNldFJhbmdlVmFsdWUoZGF0YS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWYWx1ZVdpdGhSYW5kb20gfSBmcm9tIFwiLi4vLi4vVmFsdWVXaXRoUmFuZG9tXCI7XG5leHBvcnQgY2xhc3MgWkluZGV4IGV4dGVuZHMgVmFsdWVXaXRoUmFuZG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcGFjaXR5UmF0ZSA9IDE7XG4gICAgICAgIHRoaXMuc2l6ZVJhdGUgPSAxO1xuICAgICAgICB0aGlzLnZlbG9jaXR5UmF0ZSA9IDE7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBzdXBlci5sb2FkKGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcGFjaXR5UmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlSYXRlID0gZGF0YS5vcGFjaXR5UmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zaXplUmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNpemVSYXRlID0gZGF0YS5zaXplUmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS52ZWxvY2l0eVJhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVJhdGUgPSBkYXRhLnZlbG9jaXR5UmF0ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSYW5kb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1pbmltdW1WYWx1ZSA9IDA7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5taW5pbXVtVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5taW5pbXVtVmFsdWUgPSBkYXRhLm1pbmltdW1WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tIFwiLi4vLi4vVXRpbHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBSZXNwb25zaXZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYXhXaWR0aCA9IEluZmluaXR5O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJjYW52YXNcIjtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1heFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWF4V2lkdGggPSBkYXRhLm1heFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEubW9kZSA9PT0gXCJzY3JlZW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IFwic2NyZWVuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBcImNhbnZhc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gZGVlcEV4dGVuZCh7fSwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFRoZW1lRGVmYXVsdCB9IGZyb20gXCIuL1RoZW1lRGVmYXVsdFwiO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gXCIuLi8uLi8uLi9VdGlscy9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFRoZW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gbmV3IFRoZW1lRGVmYXVsdCgpO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEubmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWZhdWx0LmxvYWQoZGF0YS5kZWZhdWx0KTtcbiAgICAgICAgaWYgKGRhdGEub3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBkZWVwRXh0ZW5kKHt9LCBkYXRhLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRoZW1lRGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGUgPSBcImFueVwiO1xuICAgICAgICB0aGlzLnZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5hdXRvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0byA9IGRhdGEuYXV0bztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5tb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IGRhdGEubW9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuL1JhbmRvbVwiO1xuaW1wb3J0IHsgc2V0UmFuZ2VWYWx1ZSB9IGZyb20gXCIuLi8uLi9VdGlscy9OdW1iZXJVdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFZhbHVlV2l0aFJhbmRvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmFuZG9tID0gbmV3IFJhbmRvbSgpO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5yYW5kb20gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbS5lbmFibGUgPSBkYXRhLnJhbmRvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tLmxvYWQoZGF0YS5yYW5kb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZXRSYW5nZVZhbHVlKGRhdGEudmFsdWUsIHRoaXMucmFuZG9tLmVuYWJsZSA/IHRoaXMucmFuZG9tLm1pbmltdW1WYWx1ZSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQgKiBmcm9tIFwiLi4vLi4vLi4vLi4vQ29yZS9JbnRlcmZhY2VzL0lTaGFwZVZhbHVlc1wiO1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgY29sb3JNaXgsIGdldFN0eWxlRnJvbUhzbCwgZ2V0U3R5bGVGcm9tUmdiIH0gZnJvbSBcIi4vQ29sb3JVdGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdMaW5lKGNvbnRleHQsIGJlZ2luLCBlbmQpIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKGJlZ2luLngsIGJlZ2luLnkpO1xuICAgIGNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VHJpYW5nbGUoY29udGV4dCwgcDEsIHAyLCBwMykge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5tb3ZlVG8ocDEueCwgcDEueSk7XG4gICAgY29udGV4dC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgY29udGV4dC5saW5lVG8ocDMueCwgcDMueSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYWludEJhc2UoY29udGV4dCwgZGltZW5zaW9uLCBiYXNlQ29sb3IpIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJhc2VDb2xvciAhPT0gbnVsbCAmJiBiYXNlQ29sb3IgIT09IHZvaWQgMCA/IGJhc2VDb2xvciA6IFwicmdiYSgwLDAsMCwwKVwiO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgZGltZW5zaW9uLndpZHRoLCBkaW1lbnNpb24uaGVpZ2h0KTtcbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihjb250ZXh0LCBkaW1lbnNpb24pIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBkaW1lbnNpb24ud2lkdGgsIGRpbWVuc2lvbi5oZWlnaHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDb25uZWN0TGluZShjb250ZXh0LCB3aWR0aCwgbGluZVN0eWxlLCBiZWdpbiwgZW5kKSB7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd0xpbmUoY29udGV4dCwgYmVnaW4sIGVuZCk7XG4gICAgY29udGV4dC5saW5lV2lkdGggPSB3aWR0aDtcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gbGluZVN0eWxlO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ3JhZGllbnQoY29udGV4dCwgcDEsIHAyLCBvcGFjaXR5KSB7XG4gICAgY29uc3QgZ3JhZFN0b3AgPSBNYXRoLmZsb29yKHAyLmdldFJhZGl1cygpIC8gcDEuZ2V0UmFkaXVzKCkpLCBjb2xvcjEgPSBwMS5nZXRGaWxsQ29sb3IoKSwgY29sb3IyID0gcDIuZ2V0RmlsbENvbG9yKCk7XG4gICAgaWYgKCFjb2xvcjEgfHwgIWNvbG9yMikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZVBvcyA9IHAxLmdldFBvc2l0aW9uKCksIGRlc3RQb3MgPSBwMi5nZXRQb3NpdGlvbigpLCBtaWRSZ2IgPSBjb2xvck1peChjb2xvcjEsIGNvbG9yMiwgcDEuZ2V0UmFkaXVzKCksIHAyLmdldFJhZGl1cygpKSwgZ3JhZCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoc291cmNlUG9zLngsIHNvdXJjZVBvcy55LCBkZXN0UG9zLngsIGRlc3RQb3MueSk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoMCwgZ2V0U3R5bGVGcm9tSHNsKGNvbG9yMSwgb3BhY2l0eSkpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKGdyYWRTdG9wID4gMSA/IDEgOiBncmFkU3RvcCwgZ2V0U3R5bGVGcm9tUmdiKG1pZFJnYiwgb3BhY2l0eSkpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKDEsIGdldFN0eWxlRnJvbUhzbChjb2xvcjIsIG9wYWNpdHkpKTtcbiAgICByZXR1cm4gZ3JhZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3R3JhYkxpbmUoY29udGV4dCwgd2lkdGgsIGJlZ2luLCBlbmQsIGNvbG9yTGluZSwgb3BhY2l0eSkge1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdMaW5lKGNvbnRleHQsIGJlZ2luLCBlbmQpO1xuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBnZXRTdHlsZUZyb21SZ2IoY29sb3JMaW5lLCBvcGFjaXR5KTtcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhd1BhcnRpY2xlKGNvbnRhaW5lciwgY29udGV4dCwgcGFydGljbGUsIGRlbHRhLCBjb2xvclN0eWxlcywgYmFja2dyb3VuZE1hc2ssIGNvbXBvc2l0ZSwgcmFkaXVzLCBvcGFjaXR5LCBzaGFkb3cpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgY29uc3QgcG9zID0gcGFydGljbGUuZ2V0UG9zaXRpb24oKSwgdGlsdE9wdGlvbnMgPSBwYXJ0aWNsZS5vcHRpb25zLnRpbHQsIHJvbGxPcHRpb25zID0gcGFydGljbGUub3B0aW9ucy5yb2xsO1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGlmICh0aWx0T3B0aW9ucy5lbmFibGUgfHwgcm9sbE9wdGlvbnMuZW5hYmxlKSB7XG4gICAgICAgIGNvbnN0IHJvbGwgPSByb2xsT3B0aW9ucy5lbmFibGUgJiYgcGFydGljbGUucm9sbCwgdGlsdCA9IHRpbHRPcHRpb25zLmVuYWJsZSAmJiBwYXJ0aWNsZS50aWx0LCByb2xsSG9yaXpvbnRhbCA9IHJvbGwgJiYgKHJvbGxPcHRpb25zLm1vZGUgPT09IFwiaG9yaXpvbnRhbFwiIHx8IHJvbGxPcHRpb25zLm1vZGUgPT09IFwiYm90aFwiKSwgcm9sbFZlcnRpY2FsID0gcm9sbCAmJiAocm9sbE9wdGlvbnMubW9kZSA9PT0gXCJ2ZXJ0aWNhbFwiIHx8IHJvbGxPcHRpb25zLm1vZGUgPT09IFwiYm90aFwiKTtcbiAgICAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0ocm9sbEhvcml6b250YWwgPyBNYXRoLmNvcyhwYXJ0aWNsZS5yb2xsLmFuZ2xlKSA6IDEsIHRpbHQgPyBNYXRoLmNvcyhwYXJ0aWNsZS50aWx0LnZhbHVlKSAqIHBhcnRpY2xlLnRpbHQuY29zRGlyZWN0aW9uIDogMCwgdGlsdCA/IE1hdGguc2luKHBhcnRpY2xlLnRpbHQudmFsdWUpICogcGFydGljbGUudGlsdC5zaW5EaXJlY3Rpb24gOiAwLCByb2xsVmVydGljYWwgPyBNYXRoLnNpbihwYXJ0aWNsZS5yb2xsLmFuZ2xlKSA6IDEsIHBvcy54LCBwb3MueSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShwb3MueCwgcG9zLnkpO1xuICAgIH1cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnN0IGFuZ2xlID0gKChfYiA9IChfYSA9IHBhcnRpY2xlLnJvdGF0ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZhbHVlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwKSArIChwYXJ0aWNsZS5vcHRpb25zLnJvdGF0ZS5wYXRoID8gcGFydGljbGUudmVsb2NpdHkuYW5nbGUgOiAwKTtcbiAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgIH1cbiAgICBpZiAoYmFja2dyb3VuZE1hc2spIHtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBjb21wb3NpdGU7XG4gICAgfVxuICAgIGNvbnN0IHNoYWRvd0NvbG9yID0gcGFydGljbGUuc2hhZG93Q29sb3I7XG4gICAgaWYgKHNoYWRvdy5lbmFibGUgJiYgc2hhZG93Q29sb3IpIHtcbiAgICAgICAgY29udGV4dC5zaGFkb3dCbHVyID0gc2hhZG93LmJsdXI7XG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSBnZXRTdHlsZUZyb21SZ2Ioc2hhZG93Q29sb3IpO1xuICAgICAgICBjb250ZXh0LnNoYWRvd09mZnNldFggPSBzaGFkb3cub2Zmc2V0Lng7XG4gICAgICAgIGNvbnRleHQuc2hhZG93T2Zmc2V0WSA9IHNoYWRvdy5vZmZzZXQueTtcbiAgICB9XG4gICAgaWYgKGNvbG9yU3R5bGVzLmZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvclN0eWxlcy5maWxsO1xuICAgIH1cbiAgICBjb25zdCBzdHJva2UgPSBwYXJ0aWNsZS5zdHJva2U7XG4gICAgY29udGV4dC5saW5lV2lkdGggPSAoX2MgPSBwYXJ0aWNsZS5zdHJva2VXaWR0aCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMDtcbiAgICBpZiAoY29sb3JTdHlsZXMuc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvclN0eWxlcy5zdHJva2U7XG4gICAgfVxuICAgIGRyYXdTaGFwZShjb250YWluZXIsIGNvbnRleHQsIHBhcnRpY2xlLCByYWRpdXMsIG9wYWNpdHksIGRlbHRhKTtcbiAgICBpZiAoKChfZCA9IHN0cm9rZSA9PT0gbnVsbCB8fCBzdHJva2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0cm9rZS53aWR0aCkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMCkgPiAwKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICAgIGlmIChwYXJ0aWNsZS5jbG9zZSkge1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICBpZiAocGFydGljbGUuZmlsbCkge1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICB9XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgaWYgKHRpbHRPcHRpb25zLmVuYWJsZSAmJiBwYXJ0aWNsZS50aWx0KSB7XG4gICAgICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIE1hdGguY29zKHBhcnRpY2xlLnRpbHQudmFsdWUpICogcGFydGljbGUudGlsdC5jb3NEaXJlY3Rpb24sIE1hdGguc2luKHBhcnRpY2xlLnRpbHQudmFsdWUpICogcGFydGljbGUudGlsdC5zaW5EaXJlY3Rpb24sIDEsIHBvcy54LCBwb3MueSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShwb3MueCwgcG9zLnkpO1xuICAgIH1cbiAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgIH1cbiAgICBpZiAoYmFja2dyb3VuZE1hc2spIHtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBjb21wb3NpdGU7XG4gICAgfVxuICAgIGRyYXdTaGFwZUFmdGVyRWZmZWN0KGNvbnRhaW5lciwgY29udGV4dCwgcGFydGljbGUsIHJhZGl1cywgb3BhY2l0eSwgZGVsdGEpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTaGFwZShjb250YWluZXIsIGNvbnRleHQsIHBhcnRpY2xlLCByYWRpdXMsIG9wYWNpdHksIGRlbHRhKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zaGFwZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRyYXdlciA9IGNvbnRhaW5lci5kcmF3ZXJzLmdldChwYXJ0aWNsZS5zaGFwZSk7XG4gICAgaWYgKCFkcmF3ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmF3ZXIuZHJhdyhjb250ZXh0LCBwYXJ0aWNsZSwgcmFkaXVzLCBvcGFjaXR5LCBkZWx0YSwgY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U2hhcGVBZnRlckVmZmVjdChjb250YWluZXIsIGNvbnRleHQsIHBhcnRpY2xlLCByYWRpdXMsIG9wYWNpdHksIGRlbHRhKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS5zaGFwZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRyYXdlciA9IGNvbnRhaW5lci5kcmF3ZXJzLmdldChwYXJ0aWNsZS5zaGFwZSk7XG4gICAgaWYgKCEoZHJhd2VyID09PSBudWxsIHx8IGRyYXdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZHJhd2VyLmFmdGVyRWZmZWN0KSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYXdlci5hZnRlckVmZmVjdChjb250ZXh0LCBwYXJ0aWNsZSwgcmFkaXVzLCBvcGFjaXR5LCBkZWx0YSwgY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UGx1Z2luKGNvbnRleHQsIHBsdWdpbiwgZGVsdGEpIHtcbiAgICBpZiAoIXBsdWdpbi5kcmF3KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgcGx1Z2luLmRyYXcoY29udGV4dCwgZGVsdGEpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdQYXJ0aWNsZVBsdWdpbihjb250ZXh0LCBwbHVnaW4sIHBhcnRpY2xlLCBkZWx0YSkge1xuICAgIGlmICghcGx1Z2luLmRyYXdQYXJ0aWNsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIHBsdWdpbi5kcmF3UGFydGljbGUoY29udGV4dCwgcGFydGljbGUsIGRlbHRhKTtcbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3RWxsaXBzZShjb250ZXh0LCBwYXJ0aWNsZSwgZmlsbENvbG9yVmFsdWUsIHJhZGl1cywgb3BhY2l0eSwgd2lkdGgsIHJvdGF0aW9uLCBzdGFydCwgZW5kKSB7XG4gICAgaWYgKHdpZHRoIDw9IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb3MgPSBwYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xuICAgIGlmIChmaWxsQ29sb3JWYWx1ZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gZ2V0U3R5bGVGcm9tSHNsKGZpbGxDb2xvclZhbHVlLCBvcGFjaXR5KTtcbiAgICB9XG4gICAgY29udGV4dC5saW5lV2lkdGggPSB3aWR0aDtcbiAgICBjb25zdCByb3RhdGlvblJhZGlhbiA9IChyb3RhdGlvbiAqIE1hdGguUEkpIC8gMTgwO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5lbGxpcHNlKHBvcy54LCBwb3MueSwgcmFkaXVzIC8gMiwgcmFkaXVzICogMiwgcm90YXRpb25SYWRpYW4sIHN0YXJ0LCBlbmQpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWx0ZXJIc2woY29sb3IsIHR5cGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgbDogY29sb3IubCArICh0eXBlID09PSBcImRhcmtlblwiID8gLTEgOiAxKSAqIHZhbHVlLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBnZXRSYW5nZVZhbHVlLCBtaXgsIHJhbmRvbUluUmFuZ2UsIHNldFJhbmdlVmFsdWUgfSBmcm9tIFwiLi9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IHsgbWlkQ29sb3JWYWx1ZSwgcmFuZG9tQ29sb3JWYWx1ZSB9IGZyb20gXCIuLi9Db3JlL1V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgaXRlbUZyb21BcnJheSB9IGZyb20gXCIuL1V0aWxzXCI7XG5mdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBsZXQgdENhbGMgPSB0O1xuICAgIGlmICh0Q2FsYyA8IDApIHtcbiAgICAgICAgdENhbGMgKz0gMTtcbiAgICB9XG4gICAgaWYgKHRDYWxjID4gMSkge1xuICAgICAgICB0Q2FsYyAtPSAxO1xuICAgIH1cbiAgICBpZiAodENhbGMgPCAxIC8gNikge1xuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdENhbGM7XG4gICAgfVxuICAgIGlmICh0Q2FsYyA8IDEgLyAyKSB7XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cbiAgICBpZiAodENhbGMgPCAyIC8gMykge1xuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0Q2FsYykgKiA2O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbn1cbmZ1bmN0aW9uIHN0cmluZ1RvUmdiYShpbnB1dCkge1xuICAgIGlmIChpbnB1dC5zdGFydHNXaXRoKFwicmdiXCIpKSB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gL3JnYmE/XFwoXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyooLFxccyooW1xcZC5dKylcXHMqKT9cXCkvaTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGE6IHJlc3VsdC5sZW5ndGggPiA0ID8gcGFyc2VGbG9hdChyZXN1bHRbNV0pIDogMSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDEwKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDEwKSxcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDEwKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC5zdGFydHNXaXRoKFwiaHNsXCIpKSB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gL2hzbGE/XFwoXFxzKihcXGQrKVxccyosXFxzKihcXGQrKSVcXHMqLFxccyooXFxkKyklXFxzKigsXFxzKihbXFxkLl0rKVxccyopP1xcKS9pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWdleC5leGVjKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgPyBoc2xhVG9SZ2JhKHtcbiAgICAgICAgICAgICAgICBhOiByZXN1bHQubGVuZ3RoID4gNCA/IHBhcnNlRmxvYXQocmVzdWx0WzVdKSA6IDEsXG4gICAgICAgICAgICAgICAgaDogcGFyc2VJbnQocmVzdWx0WzFdLCAxMCksXG4gICAgICAgICAgICAgICAgbDogcGFyc2VJbnQocmVzdWx0WzNdLCAxMCksXG4gICAgICAgICAgICAgICAgczogcGFyc2VJbnQocmVzdWx0WzJdLCAxMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0LnN0YXJ0c1dpdGgoXCJoc3ZcIikpIHtcbiAgICAgICAgY29uc3QgcmVnZXggPSAvaHN2YT9cXChcXHMqKFxcZCspwrBcXHMqLFxccyooXFxkKyklXFxzKixcXHMqKFxcZCspJVxccyooLFxccyooW1xcZC5dKylcXHMqKT9cXCkvaTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgID8gaHN2YVRvUmdiYSh7XG4gICAgICAgICAgICAgICAgYTogcmVzdWx0Lmxlbmd0aCA+IDQgPyBwYXJzZUZsb2F0KHJlc3VsdFs1XSkgOiAxLFxuICAgICAgICAgICAgICAgIGg6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTApLFxuICAgICAgICAgICAgICAgIHM6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTApLFxuICAgICAgICAgICAgICAgIHY6IHBhcnNlSW50KHJlc3VsdFszXSwgMTApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKT8kL2k7XG4gICAgICAgIGNvbnN0IGhleEZpeGVkID0gaW5wdXQucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgKF9tLCByLCBnLCBiLCBhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiICsgKGEgIT09IHVuZGVmaW5lZCA/IGEgKyBhIDogXCJcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZWdleCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pPyQvaTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVnZXguZXhlYyhoZXhGaXhlZCk7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGE6IHJlc3VsdFs0XSAhPT0gdW5kZWZpbmVkID8gcGFyc2VJbnQocmVzdWx0WzRdLCAxNikgLyAweGZmIDogMSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjb2xvclRvUmdiKGlucHV0LCBpbmRleCwgdXNlSW5kZXggPSB0cnVlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb2xvciA9IHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIiA/IHsgdmFsdWU6IGlucHV0IH0gOiBpbnB1dDtcbiAgICBsZXQgcmVzO1xuICAgIGlmICh0eXBlb2YgY29sb3IudmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmVzID0gY29sb3IudmFsdWUgPT09IHJhbmRvbUNvbG9yVmFsdWUgPyBnZXRSYW5kb21SZ2JDb2xvcigpIDogc3RyaW5nVG9SZ2IoY29sb3IudmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGNvbG9yLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yU2VsZWN0ZWQgPSBpdGVtRnJvbUFycmF5KGNvbG9yLnZhbHVlLCBpbmRleCwgdXNlSW5kZXgpO1xuICAgICAgICAgICAgcmVzID0gY29sb3JUb1JnYih7IHZhbHVlOiBjb2xvclNlbGVjdGVkIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IGNvbG9yLnZhbHVlLCByZ2JDb2xvciA9IChfYSA9IGNvbG9yVmFsdWUucmdiKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb2xvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChyZ2JDb2xvci5yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXMgPSByZ2JDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhzbENvbG9yID0gKF9iID0gY29sb3JWYWx1ZS5oc2wpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGNvbG9yLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChoc2xDb2xvci5oICE9PSB1bmRlZmluZWQgJiYgaHNsQ29sb3IubCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGhzbFRvUmdiKGhzbENvbG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhzdkNvbG9yID0gKF9jID0gY29sb3JWYWx1ZS5oc3YpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGNvbG9yLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHN2Q29sb3IuaCAhPT0gdW5kZWZpbmVkICYmIGhzdkNvbG9yLnYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gaHN2VG9SZ2IoaHN2Q29sb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gY29sb3JUb0hzbChjb2xvciwgaW5kZXgsIHVzZUluZGV4ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHJnYiA9IGNvbG9yVG9SZ2IoY29sb3IsIGluZGV4LCB1c2VJbmRleCk7XG4gICAgcmV0dXJuIHJnYiAhPT0gdW5kZWZpbmVkID8gcmdiVG9Ic2wocmdiKSA6IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hzbChjb2xvcikge1xuICAgIGNvbnN0IHIxID0gY29sb3IuciAvIDI1NSwgZzEgPSBjb2xvci5nIC8gMjU1LCBiMSA9IGNvbG9yLmIgLyAyNTU7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgocjEsIGcxLCBiMSksIG1pbiA9IE1hdGgubWluKHIxLCBnMSwgYjEpO1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgICAgaDogMCxcbiAgICAgICAgbDogKG1heCArIG1pbikgLyAyLFxuICAgICAgICBzOiAwLFxuICAgIH07XG4gICAgaWYgKG1heCAhPT0gbWluKSB7XG4gICAgICAgIHJlcy5zID0gcmVzLmwgPCAwLjUgPyAobWF4IC0gbWluKSAvIChtYXggKyBtaW4pIDogKG1heCAtIG1pbikgLyAoMi4wIC0gbWF4IC0gbWluKTtcbiAgICAgICAgcmVzLmggPVxuICAgICAgICAgICAgcjEgPT09IG1heFxuICAgICAgICAgICAgICAgID8gKGcxIC0gYjEpIC8gKG1heCAtIG1pbilcbiAgICAgICAgICAgICAgICA6IChyZXMuaCA9IGcxID09PSBtYXggPyAyLjAgKyAoYjEgLSByMSkgLyAobWF4IC0gbWluKSA6IDQuMCArIChyMSAtIGcxKSAvIChtYXggLSBtaW4pKTtcbiAgICB9XG4gICAgcmVzLmwgKj0gMTAwO1xuICAgIHJlcy5zICo9IDEwMDtcbiAgICByZXMuaCAqPSA2MDtcbiAgICBpZiAocmVzLmggPCAwKSB7XG4gICAgICAgIHJlcy5oICs9IDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0FscGhhKGlucHV0KSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBzdHJpbmdUb1JnYmEoaW5wdXQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb1JnYihpbnB1dCkge1xuICAgIHJldHVybiBzdHJpbmdUb1JnYmEoaW5wdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhzbFRvUmdiKGhzbCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgYjogMCwgZzogMCwgcjogMCB9LCBoc2xQZXJjZW50ID0ge1xuICAgICAgICBoOiBoc2wuaCAvIDM2MCxcbiAgICAgICAgbDogaHNsLmwgLyAxMDAsXG4gICAgICAgIHM6IGhzbC5zIC8gMTAwLFxuICAgIH07XG4gICAgaWYgKGhzbFBlcmNlbnQucyA9PT0gMCkge1xuICAgICAgICByZXN1bHQuYiA9IGhzbFBlcmNlbnQubDtcbiAgICAgICAgcmVzdWx0LmcgPSBoc2xQZXJjZW50Lmw7XG4gICAgICAgIHJlc3VsdC5yID0gaHNsUGVyY2VudC5sO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgcSA9IGhzbFBlcmNlbnQubCA8IDAuNVxuICAgICAgICAgICAgPyBoc2xQZXJjZW50LmwgKiAoMSArIGhzbFBlcmNlbnQucylcbiAgICAgICAgICAgIDogaHNsUGVyY2VudC5sICsgaHNsUGVyY2VudC5zIC0gaHNsUGVyY2VudC5sICogaHNsUGVyY2VudC5zLCBwID0gMiAqIGhzbFBlcmNlbnQubCAtIHE7XG4gICAgICAgIHJlc3VsdC5yID0gaHVlMnJnYihwLCBxLCBoc2xQZXJjZW50LmggKyAxIC8gMyk7XG4gICAgICAgIHJlc3VsdC5nID0gaHVlMnJnYihwLCBxLCBoc2xQZXJjZW50LmgpO1xuICAgICAgICByZXN1bHQuYiA9IGh1ZTJyZ2IocCwgcSwgaHNsUGVyY2VudC5oIC0gMSAvIDMpO1xuICAgIH1cbiAgICByZXN1bHQuciA9IE1hdGguZmxvb3IocmVzdWx0LnIgKiAyNTUpO1xuICAgIHJlc3VsdC5nID0gTWF0aC5mbG9vcihyZXN1bHQuZyAqIDI1NSk7XG4gICAgcmVzdWx0LmIgPSBNYXRoLmZsb29yKHJlc3VsdC5iICogMjU1KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhzbGFUb1JnYmEoaHNsYSkge1xuICAgIGNvbnN0IHJnYlJlc3VsdCA9IGhzbFRvUmdiKGhzbGEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGE6IGhzbGEuYSxcbiAgICAgICAgYjogcmdiUmVzdWx0LmIsXG4gICAgICAgIGc6IHJnYlJlc3VsdC5nLFxuICAgICAgICByOiByZ2JSZXN1bHQucixcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhzbFRvSHN2KGhzbCkge1xuICAgIGNvbnN0IGwgPSBoc2wubCAvIDEwMCwgc2wgPSBoc2wucyAvIDEwMCwgdiA9IGwgKyBzbCAqIE1hdGgubWluKGwsIDEgLSBsKSwgc3YgPSAhdiA/IDAgOiAyICogKDEgLSBsIC8gdik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaDogaHNsLmgsXG4gICAgICAgIHM6IHN2ICogMTAwLFxuICAgICAgICB2OiB2ICogMTAwLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gaHNsYVRvSHN2YShoc2xhKSB7XG4gICAgY29uc3QgaHN2UmVzdWx0ID0gaHNsVG9Ic3YoaHNsYSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYTogaHNsYS5hLFxuICAgICAgICBoOiBoc3ZSZXN1bHQuaCxcbiAgICAgICAgczogaHN2UmVzdWx0LnMsXG4gICAgICAgIHY6IGhzdlJlc3VsdC52LFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gaHN2VG9Ic2woaHN2KSB7XG4gICAgY29uc3QgdiA9IGhzdi52IC8gMTAwLCBzdiA9IGhzdi5zIC8gMTAwLCBsID0gdiAqICgxIC0gc3YgLyAyKSwgc2wgPSBsID09PSAwIHx8IGwgPT09IDEgPyAwIDogKHYgLSBsKSAvIE1hdGgubWluKGwsIDEgLSBsKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBoOiBoc3YuaCxcbiAgICAgICAgbDogbCAqIDEwMCxcbiAgICAgICAgczogc2wgKiAxMDAsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoc3ZhVG9Ic2xhKGhzdmEpIHtcbiAgICBjb25zdCBoc2xSZXN1bHQgPSBoc3ZUb0hzbChoc3ZhKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhOiBoc3ZhLmEsXG4gICAgICAgIGg6IGhzbFJlc3VsdC5oLFxuICAgICAgICBsOiBoc2xSZXN1bHQubCxcbiAgICAgICAgczogaHNsUmVzdWx0LnMsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb1JnYihoc3YpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGI6IDAsIGc6IDAsIHI6IDAgfSwgaHN2UGVyY2VudCA9IHtcbiAgICAgICAgaDogaHN2LmggLyA2MCxcbiAgICAgICAgczogaHN2LnMgLyAxMDAsXG4gICAgICAgIHY6IGhzdi52IC8gMTAwLFxuICAgIH07XG4gICAgY29uc3QgYyA9IGhzdlBlcmNlbnQudiAqIGhzdlBlcmNlbnQucywgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoc3ZQZXJjZW50LmggJSAyKSAtIDEpKTtcbiAgICBsZXQgdGVtcFJnYjtcbiAgICBpZiAoaHN2UGVyY2VudC5oID49IDAgJiYgaHN2UGVyY2VudC5oIDw9IDEpIHtcbiAgICAgICAgdGVtcFJnYiA9IHtcbiAgICAgICAgICAgIHI6IGMsXG4gICAgICAgICAgICBnOiB4LFxuICAgICAgICAgICAgYjogMCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaHN2UGVyY2VudC5oID4gMSAmJiBoc3ZQZXJjZW50LmggPD0gMikge1xuICAgICAgICB0ZW1wUmdiID0ge1xuICAgICAgICAgICAgcjogeCxcbiAgICAgICAgICAgIGc6IGMsXG4gICAgICAgICAgICBiOiAwLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChoc3ZQZXJjZW50LmggPiAyICYmIGhzdlBlcmNlbnQuaCA8PSAzKSB7XG4gICAgICAgIHRlbXBSZ2IgPSB7XG4gICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgZzogYyxcbiAgICAgICAgICAgIGI6IHgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGhzdlBlcmNlbnQuaCA+IDMgJiYgaHN2UGVyY2VudC5oIDw9IDQpIHtcbiAgICAgICAgdGVtcFJnYiA9IHtcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBnOiB4LFxuICAgICAgICAgICAgYjogYyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaHN2UGVyY2VudC5oID4gNCAmJiBoc3ZQZXJjZW50LmggPD0gNSkge1xuICAgICAgICB0ZW1wUmdiID0ge1xuICAgICAgICAgICAgcjogeCxcbiAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICBiOiBjLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChoc3ZQZXJjZW50LmggPiA1ICYmIGhzdlBlcmNlbnQuaCA8PSA2KSB7XG4gICAgICAgIHRlbXBSZ2IgPSB7XG4gICAgICAgICAgICByOiBjLFxuICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgIGI6IHgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0ZW1wUmdiKSB7XG4gICAgICAgIGNvbnN0IG0gPSBoc3ZQZXJjZW50LnYgLSBjO1xuICAgICAgICByZXN1bHQuciA9IE1hdGguZmxvb3IoKHRlbXBSZ2IuciArIG0pICogMjU1KTtcbiAgICAgICAgcmVzdWx0LmcgPSBNYXRoLmZsb29yKCh0ZW1wUmdiLmcgKyBtKSAqIDI1NSk7XG4gICAgICAgIHJlc3VsdC5iID0gTWF0aC5mbG9vcigodGVtcFJnYi5iICsgbSkgKiAyNTUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhzdmFUb1JnYmEoaHN2YSkge1xuICAgIGNvbnN0IHJnYlJlc3VsdCA9IGhzdlRvUmdiKGhzdmEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGE6IGhzdmEuYSxcbiAgICAgICAgYjogcmdiUmVzdWx0LmIsXG4gICAgICAgIGc6IHJnYlJlc3VsdC5nLFxuICAgICAgICByOiByZ2JSZXN1bHQucixcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSHN2KHJnYikge1xuICAgIGNvbnN0IHJnYlBlcmNlbnQgPSB7XG4gICAgICAgIHI6IHJnYi5yIC8gMjU1LFxuICAgICAgICBnOiByZ2IuZyAvIDI1NSxcbiAgICAgICAgYjogcmdiLmIgLyAyNTUsXG4gICAgfSwgeE1heCA9IE1hdGgubWF4KHJnYlBlcmNlbnQuciwgcmdiUGVyY2VudC5nLCByZ2JQZXJjZW50LmIpLCB4TWluID0gTWF0aC5taW4ocmdiUGVyY2VudC5yLCByZ2JQZXJjZW50LmcsIHJnYlBlcmNlbnQuYiksIHYgPSB4TWF4LCBjID0geE1heCAtIHhNaW47XG4gICAgbGV0IGggPSAwO1xuICAgIGlmICh2ID09PSByZ2JQZXJjZW50LnIpIHtcbiAgICAgICAgaCA9IDYwICogKChyZ2JQZXJjZW50LmcgLSByZ2JQZXJjZW50LmIpIC8gYyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHYgPT09IHJnYlBlcmNlbnQuZykge1xuICAgICAgICBoID0gNjAgKiAoMiArIChyZ2JQZXJjZW50LmIgLSByZ2JQZXJjZW50LnIpIC8gYyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHYgPT09IHJnYlBlcmNlbnQuYikge1xuICAgICAgICBoID0gNjAgKiAoNCArIChyZ2JQZXJjZW50LnIgLSByZ2JQZXJjZW50LmcpIC8gYyk7XG4gICAgfVxuICAgIGNvbnN0IHMgPSAhdiA/IDAgOiBjIC8gdjtcbiAgICByZXR1cm4ge1xuICAgICAgICBoLFxuICAgICAgICBzOiBzICogMTAwLFxuICAgICAgICB2OiB2ICogMTAwLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gcmdiYVRvSHN2YShyZ2JhKSB7XG4gICAgY29uc3QgaHN2UmVzdWx0ID0gcmdiVG9Ic3YocmdiYSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYTogcmdiYS5hLFxuICAgICAgICBoOiBoc3ZSZXN1bHQuaCxcbiAgICAgICAgczogaHN2UmVzdWx0LnMsXG4gICAgICAgIHY6IGhzdlJlc3VsdC52LFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tUmdiQ29sb3IobWluKSB7XG4gICAgY29uc3QgZml4ZWRNaW4gPSBtaW4gIT09IG51bGwgJiYgbWluICE9PSB2b2lkIDAgPyBtaW4gOiAwO1xuICAgIHJldHVybiB7XG4gICAgICAgIGI6IE1hdGguZmxvb3IocmFuZG9tSW5SYW5nZShzZXRSYW5nZVZhbHVlKGZpeGVkTWluLCAyNTYpKSksXG4gICAgICAgIGc6IE1hdGguZmxvb3IocmFuZG9tSW5SYW5nZShzZXRSYW5nZVZhbHVlKGZpeGVkTWluLCAyNTYpKSksXG4gICAgICAgIHI6IE1hdGguZmxvb3IocmFuZG9tSW5SYW5nZShzZXRSYW5nZVZhbHVlKGZpeGVkTWluLCAyNTYpKSksXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZUZyb21SZ2IoY29sb3IsIG9wYWNpdHkpIHtcbiAgICByZXR1cm4gYHJnYmEoJHtjb2xvci5yfSwgJHtjb2xvci5nfSwgJHtjb2xvci5ifSwgJHtvcGFjaXR5ICE9PSBudWxsICYmIG9wYWNpdHkgIT09IHZvaWQgMCA/IG9wYWNpdHkgOiAxfSlgO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlRnJvbUhzbChjb2xvciwgb3BhY2l0eSkge1xuICAgIHJldHVybiBgaHNsYSgke2NvbG9yLmh9LCAke2NvbG9yLnN9JSwgJHtjb2xvci5sfSUsICR7b3BhY2l0eSAhPT0gbnVsbCAmJiBvcGFjaXR5ICE9PSB2b2lkIDAgPyBvcGFjaXR5IDogMX0pYDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZUZyb21Ic3YoY29sb3IsIG9wYWNpdHkpIHtcbiAgICByZXR1cm4gZ2V0U3R5bGVGcm9tSHNsKGhzdlRvSHNsKGNvbG9yKSwgb3BhY2l0eSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29sb3JNaXgoY29sb3IxLCBjb2xvcjIsIHNpemUxLCBzaXplMikge1xuICAgIGxldCByZ2IxID0gY29sb3IxLCByZ2IyID0gY29sb3IyO1xuICAgIGlmIChyZ2IxLnIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZ2IxID0gaHNsVG9SZ2IoY29sb3IxKTtcbiAgICB9XG4gICAgaWYgKHJnYjIuciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJnYjIgPSBoc2xUb1JnYihjb2xvcjIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiOiBtaXgocmdiMS5iLCByZ2IyLmIsIHNpemUxLCBzaXplMiksXG4gICAgICAgIGc6IG1peChyZ2IxLmcsIHJnYjIuZywgc2l6ZTEsIHNpemUyKSxcbiAgICAgICAgcjogbWl4KHJnYjEuciwgcmdiMi5yLCBzaXplMSwgc2l6ZTIpLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua0NvbG9yKHAxLCBwMiwgbGlua0NvbG9yKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAobGlua0NvbG9yID09PSByYW5kb21Db2xvclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBnZXRSYW5kb21SZ2JDb2xvcigpO1xuICAgIH1cbiAgICBlbHNlIGlmIChsaW5rQ29sb3IgPT09IFwibWlkXCIpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29sb3IgPSAoX2EgPSBwMS5nZXRGaWxsQ29sb3IoKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcDEuZ2V0U3Ryb2tlQ29sb3IoKSwgZGVzdENvbG9yID0gKF9iID0gcDIgPT09IG51bGwgfHwgcDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHAyLmdldEZpbGxDb2xvcigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBwMiA9PT0gbnVsbCB8fCBwMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcDIuZ2V0U3Ryb2tlQ29sb3IoKTtcbiAgICAgICAgaWYgKHNvdXJjZUNvbG9yICYmIGRlc3RDb2xvciAmJiBwMikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yTWl4KHNvdXJjZUNvbG9yLCBkZXN0Q29sb3IsIHAxLmdldFJhZGl1cygpLCBwMi5nZXRSYWRpdXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBoc2xDb2xvciA9IHNvdXJjZUNvbG9yICE9PSBudWxsICYmIHNvdXJjZUNvbG9yICE9PSB2b2lkIDAgPyBzb3VyY2VDb2xvciA6IGRlc3RDb2xvcjtcbiAgICAgICAgICAgIGlmIChoc2xDb2xvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBoc2xUb1JnYihoc2xDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBsaW5rQ29sb3I7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtSYW5kb21Db2xvcihvcHRDb2xvciwgYmxpbmssIGNvbnNlbnQpIHtcbiAgICBjb25zdCBjb2xvciA9IHR5cGVvZiBvcHRDb2xvciA9PT0gXCJzdHJpbmdcIiA/IG9wdENvbG9yIDogb3B0Q29sb3IudmFsdWU7XG4gICAgaWYgKGNvbG9yID09PSByYW5kb21Db2xvclZhbHVlKSB7XG4gICAgICAgIGlmIChjb25zZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JUb1JnYih7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbG9yLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYmxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Db2xvclZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1pZENvbG9yVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBjb2xvclRvUmdiKHtcbiAgICAgICAgICAgIHZhbHVlOiBjb2xvcixcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEhzbEZyb21BbmltYXRpb24oYW5pbWF0aW9uKSB7XG4gICAgcmV0dXJuIGFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaDogYW5pbWF0aW9uLmgudmFsdWUsXG4gICAgICAgICAgICBzOiBhbmltYXRpb24ucy52YWx1ZSxcbiAgICAgICAgICAgIGw6IGFuaW1hdGlvbi5sLnZhbHVlLFxuICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEhzbEFuaW1hdGlvbkZyb21Ic2woaHNsLCBhbmltYXRpb25PcHRpb25zLCByZWR1Y2VGYWN0b3IpIHtcbiAgICBjb25zdCByZXNDb2xvciA9IHtcbiAgICAgICAgaDoge1xuICAgICAgICAgICAgZW5hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBoc2wuaCxcbiAgICAgICAgfSxcbiAgICAgICAgczoge1xuICAgICAgICAgICAgZW5hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBoc2wucyxcbiAgICAgICAgfSxcbiAgICAgICAgbDoge1xuICAgICAgICAgICAgZW5hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBoc2wubCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChhbmltYXRpb25PcHRpb25zKSB7XG4gICAgICAgIHNldENvbG9yQW5pbWF0aW9uKHJlc0NvbG9yLmgsIGFuaW1hdGlvbk9wdGlvbnMuaCwgcmVkdWNlRmFjdG9yKTtcbiAgICAgICAgc2V0Q29sb3JBbmltYXRpb24ocmVzQ29sb3IucywgYW5pbWF0aW9uT3B0aW9ucy5zLCByZWR1Y2VGYWN0b3IpO1xuICAgICAgICBzZXRDb2xvckFuaW1hdGlvbihyZXNDb2xvci5sLCBhbmltYXRpb25PcHRpb25zLmwsIHJlZHVjZUZhY3Rvcik7XG4gICAgfVxuICAgIHJldHVybiByZXNDb2xvcjtcbn1cbmZ1bmN0aW9uIHNldENvbG9yQW5pbWF0aW9uKGNvbG9yVmFsdWUsIGNvbG9yQW5pbWF0aW9uLCByZWR1Y2VGYWN0b3IpIHtcbiAgICBjb2xvclZhbHVlLmVuYWJsZSA9IGNvbG9yQW5pbWF0aW9uLmVuYWJsZTtcbiAgICBpZiAoY29sb3JWYWx1ZS5lbmFibGUpIHtcbiAgICAgICAgY29sb3JWYWx1ZS52ZWxvY2l0eSA9IChnZXRSYW5nZVZhbHVlKGNvbG9yQW5pbWF0aW9uLnNwZWVkKSAvIDEwMCkgKiByZWR1Y2VGYWN0b3I7XG4gICAgICAgIGlmIChjb2xvckFuaW1hdGlvbi5zeW5jKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29sb3JWYWx1ZS5zdGF0dXMgPSAwO1xuICAgICAgICBjb2xvclZhbHVlLnZlbG9jaXR5ICo9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGlmIChjb2xvclZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBjb2xvclZhbHVlLnZhbHVlICo9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbG9yVmFsdWUudmVsb2NpdHkgPSAwO1xuICAgIH1cbn1cbiIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycztcbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycy5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycywgbmV3IE1hcCgpLCBcImZcIik7XG4gICAgfVxuICAgIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V2ZW50RGlzcGF0Y2hlcl9saXN0ZW5lcnMsIFwiZlwiKS5nZXQodHlwZSkpIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V2ZW50RGlzcGF0Y2hlcl9saXN0ZW5lcnMsIFwiZlwiKS5zZXQodHlwZSwgW10pO1xuICAgICAgICB9XG4gICAgICAgIChfYSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V2ZW50RGlzcGF0Y2hlcl9saXN0ZW5lcnMsIFwiZlwiKS5nZXQodHlwZSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBjb25zdCBhcnIgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FdmVudERpc3BhdGNoZXJfbGlzdGVuZXJzLCBcImZcIikuZ2V0KHR5cGUpO1xuICAgICAgICBpZiAoIWFycikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGFyci5sZW5ndGgsIGlkeCA9IGFyci5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKGlkeCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FdmVudERpc3BhdGNoZXJfbGlzdGVuZXJzLCBcImZcIikuZGVsZXRlKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXJyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FdmVudERpc3BhdGNoZXJfbGlzdGVuZXJzLCBuZXcgTWFwKCksIFwiZlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V2ZW50RGlzcGF0Y2hlcl9saXN0ZW5lcnMsIFwiZlwiKS5kZWxldGUodHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudCh0eXBlLCBhcmdzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycywgXCJmXCIpLmdldCh0eXBlKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoYXJncykpO1xuICAgIH1cbiAgICBoYXNFdmVudExpc3RlbmVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuICEhX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycywgXCJmXCIpLmdldCh0eXBlKTtcbiAgICB9XG59XG5fRXZlbnREaXNwYXRjaGVyX2xpc3RlbmVycyA9IG5ldyBXZWFrTWFwKCk7XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vQ29yZS9VdGlscy9WZWN0b3JcIjtcbmV4cG9ydCBmdW5jdGlvbiBjbGFtcChudW0sIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bSwgbWluKSwgbWF4KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtaXgoY29tcDEsIGNvbXAyLCB3ZWlnaHQxLCB3ZWlnaHQyKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGNvbXAxICogd2VpZ2h0MSArIGNvbXAyICogd2VpZ2h0MikgLyAod2VpZ2h0MSArIHdlaWdodDIpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21JblJhbmdlKHIpIHtcbiAgICBjb25zdCBtYXggPSBnZXRSYW5nZU1heChyKTtcbiAgICBsZXQgbWluID0gZ2V0UmFuZ2VNaW4ocik7XG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZ2VWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgPyB2YWx1ZSA6IHJhbmRvbUluUmFuZ2UodmFsdWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmdlTWluKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiA/IHZhbHVlIDogdmFsdWUubWluO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmdlTWF4KHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiA/IHZhbHVlIDogdmFsdWUubWF4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhbmdlVmFsdWUoc291cmNlLCB2YWx1ZSkge1xuICAgIGlmIChzb3VyY2UgPT09IHZhbHVlIHx8ICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBzb3VyY2UgPT09IFwibnVtYmVyXCIpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICAgIGNvbnN0IG1pbiA9IGdldFJhbmdlTWluKHNvdXJjZSksIG1heCA9IGdldFJhbmdlTWF4KHNvdXJjZSk7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBtaW46IE1hdGgubWluKG1pbiwgdmFsdWUpLFxuICAgICAgICAgICAgbWF4OiBNYXRoLm1heChtYXgsIHZhbHVlKSxcbiAgICAgICAgfVxuICAgICAgICA6IHNldFJhbmdlVmFsdWUobWluLCBtYXgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlKG9wdGlvbnMpIHtcbiAgICBjb25zdCByYW5kb20gPSBvcHRpb25zLnJhbmRvbSwgeyBlbmFibGUsIG1pbmltdW1WYWx1ZSB9ID0gdHlwZW9mIHJhbmRvbSA9PT0gXCJib29sZWFuXCJcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBlbmFibGU6IHJhbmRvbSxcbiAgICAgICAgICAgIG1pbmltdW1WYWx1ZTogMCxcbiAgICAgICAgfVxuICAgICAgICA6IHJhbmRvbTtcbiAgICByZXR1cm4gZW5hYmxlID8gZ2V0UmFuZ2VWYWx1ZShzZXRSYW5nZVZhbHVlKG9wdGlvbnMudmFsdWUsIG1pbmltdW1WYWx1ZSkpIDogZ2V0UmFuZ2VWYWx1ZShvcHRpb25zLnZhbHVlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXN0YW5jZXMocG9pbnRBLCBwb2ludEIpIHtcbiAgICBjb25zdCBkeCA9IHBvaW50QS54IC0gcG9pbnRCLngsIGR5ID0gcG9pbnRBLnkgLSBwb2ludEIueTtcbiAgICByZXR1cm4geyBkeDogZHgsIGR5OiBkeSwgZGlzdGFuY2U6IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXN0YW5jZShwb2ludEEsIHBvaW50Qikge1xuICAgIHJldHVybiBnZXREaXN0YW5jZXMocG9pbnRBLCBwb2ludEIpLmRpc3RhbmNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpY2xlRGlyZWN0aW9uQW5nbGUoZGlyZWN0aW9uLCBwb3NpdGlvbiwgY2VudGVyKSB7XG4gICAgaWYgKHR5cGVvZiBkaXJlY3Rpb24gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIChkaXJlY3Rpb24gKiBNYXRoLlBJKSAvIDE4MDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLlBJIC8gMjtcbiAgICAgICAgICAgIGNhc2UgXCJ0b3AtcmlnaHRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGguUEkgLyA0O1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tLXJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgLyA0O1xuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgIGNhc2UgXCJib3R0b20tbGVmdFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAoMyAqIE1hdGguUEkpIC8gNDtcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguUEk7XG4gICAgICAgICAgICBjYXNlIFwidG9wLWxlZnRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKC0zICogTWF0aC5QSSkgLyA0O1xuICAgICAgICAgICAgY2FzZSBcImluc2lkZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmF0YW4yKGNlbnRlci55IC0gcG9zaXRpb24ueSwgY2VudGVyLnggLSBwb3NpdGlvbi54KTtcbiAgICAgICAgICAgIGNhc2UgXCJvdXRzaWRlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIocG9zaXRpb24ueSAtIGNlbnRlci55LCBwb3NpdGlvbi54IC0gY2VudGVyLngpO1xuICAgICAgICAgICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0aWNsZUJhc2VWZWxvY2l0eShkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBiYXNlVmVsb2NpdHkgPSBWZWN0b3Iub3JpZ2luO1xuICAgIGJhc2VWZWxvY2l0eS5sZW5ndGggPSAxO1xuICAgIGJhc2VWZWxvY2l0eS5hbmdsZSA9IGRpcmVjdGlvbjtcbiAgICByZXR1cm4gYmFzZVZlbG9jaXR5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvblZlbG9jaXR5KHYxLCB2MiwgbTEsIG0yKSB7XG4gICAgcmV0dXJuIFZlY3Rvci5jcmVhdGUoKHYxLnggKiAobTEgLSBtMikpIC8gKG0xICsgbTIpICsgKHYyLnggKiAyICogbTIpIC8gKG0xICsgbTIpLCB2MS55KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjRWFzaW5nKHZhbHVlLCB0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJlYXNlLW91dC1xdWFkXCI6XG4gICAgICAgICAgICByZXR1cm4gMSAtICgxIC0gdmFsdWUpICoqIDI7XG4gICAgICAgIGNhc2UgXCJlYXNlLW91dC1jdWJpY1wiOlxuICAgICAgICAgICAgcmV0dXJuIDEgLSAoMSAtIHZhbHVlKSAqKiAzO1xuICAgICAgICBjYXNlIFwiZWFzZS1vdXQtcXVhcnRcIjpcbiAgICAgICAgICAgIHJldHVybiAxIC0gKDEgLSB2YWx1ZSkgKiogNDtcbiAgICAgICAgY2FzZSBcImVhc2Utb3V0LXF1aW50XCI6XG4gICAgICAgICAgICByZXR1cm4gMSAtICgxIC0gdmFsdWUpICoqIDU7XG4gICAgICAgIGNhc2UgXCJlYXNlLW91dC1leHBvXCI6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0xMCAqIHZhbHVlKTtcbiAgICAgICAgY2FzZSBcImVhc2Utb3V0LXNpbmVcIjpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbigodmFsdWUgKiBNYXRoLlBJKSAvIDIpO1xuICAgICAgICBjYXNlIFwiZWFzZS1vdXQtYmFja1wiOiB7XG4gICAgICAgICAgICBjb25zdCBjMSA9IDEuNzAxNTgsIGMzID0gYzEgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIDEgKyBjMyAqIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyBjMSAqIE1hdGgucG93KHZhbHVlIC0gMSwgMik7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImVhc2Utb3V0LWNpcmNcIjpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjUG9zaXRpb25Gcm9tU2l6ZShkYXRhKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICByZXR1cm4gKChfYSA9IGRhdGEucG9zaXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS54KSAhPT0gdW5kZWZpbmVkICYmICgoX2IgPSBkYXRhLnBvc2l0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IueSkgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHg6IChkYXRhLnBvc2l0aW9uLnggKiBkYXRhLnNpemUud2lkdGgpIC8gMTAwLFxuICAgICAgICAgICAgeTogKGRhdGEucG9zaXRpb24ueSAqIGRhdGEuc2l6ZS5oZWlnaHQpIC8gMTAwLFxuICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUoZGF0YSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAoKChfYiA9IChfYSA9IGRhdGEucG9zaXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS54KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBNYXRoLnJhbmRvbSgpICogMTAwKSAqIGRhdGEuc2l6ZS53aWR0aCkgLyAxMDAsXG4gICAgICAgIHk6ICgoKF9kID0gKF9jID0gZGF0YS5wb3NpdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IE1hdGgucmFuZG9tKCkgKiAxMDApICogZGF0YS5zaXplLmhlaWdodCkgLyAxMDAsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjUG9zaXRpb25PclJhbmRvbUZyb21TaXplUmFuZ2VkKGRhdGEpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICB4OiAoKF9hID0gZGF0YS5wb3NpdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLngpICE9PSB1bmRlZmluZWQgPyBnZXRSYW5nZVZhbHVlKGRhdGEucG9zaXRpb24ueCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHk6ICgoX2IgPSBkYXRhLnBvc2l0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IueSkgIT09IHVuZGVmaW5lZCA/IGdldFJhbmdlVmFsdWUoZGF0YS5wb3NpdGlvbi55KSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHJldHVybiBjYWxjUG9zaXRpb25PclJhbmRvbUZyb21TaXplKHsgc2l6ZTogZGF0YS5zaXplLCBwb3NpdGlvbiB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjRXhhY3RQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUoZGF0YSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAoX2IgPSAoX2EgPSBkYXRhLnBvc2l0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EueCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogTWF0aC5yYW5kb20oKSAqIGRhdGEuc2l6ZS53aWR0aCxcbiAgICAgICAgeTogKF9kID0gKF9jID0gZGF0YS5wb3NpdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IE1hdGgucmFuZG9tKCkgKiBkYXRhLnNpemUuaGVpZ2h0LFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY0V4YWN0UG9zaXRpb25PclJhbmRvbUZyb21TaXplUmFuZ2VkKGRhdGEpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICB4OiAoKF9hID0gZGF0YS5wb3NpdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLngpICE9PSB1bmRlZmluZWQgPyBnZXRSYW5nZVZhbHVlKGRhdGEucG9zaXRpb24ueCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHk6ICgoX2IgPSBkYXRhLnBvc2l0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IueSkgIT09IHVuZGVmaW5lZCA/IGdldFJhbmdlVmFsdWUoZGF0YS5wb3NpdGlvbi55KSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHJldHVybiBjYWxjRXhhY3RQb3NpdGlvbk9yUmFuZG9tRnJvbVNpemUoeyBzaXplOiBkYXRhLnNpemUsIHBvc2l0aW9uIH0pO1xufVxuIiwiaW1wb3J0IHsgY29sbGlzaW9uVmVsb2NpdHksIGdldERpc3RhbmNlcywgZ2V0VmFsdWUgfSBmcm9tIFwiLi9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCIuLi9PcHRpb25zL0NsYXNzZXMvT3B0aW9uc1wiO1xuaW1wb3J0IHsgUGFydGljbGVzT3B0aW9ucyB9IGZyb20gXCIuLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1BhcnRpY2xlc09wdGlvbnNcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9Db3JlL1V0aWxzL1ZlY3RvclwiO1xuZnVuY3Rpb24gcmVjdFNpZGVCb3VuY2UocFNpZGUsIHBPdGhlclNpZGUsIHJlY3RTaWRlLCByZWN0T3RoZXJTaWRlLCB2ZWxvY2l0eSwgZmFjdG9yKSB7XG4gICAgY29uc3QgcmVzID0geyBib3VuY2VkOiBmYWxzZSB9O1xuICAgIGlmIChwT3RoZXJTaWRlLm1pbiA8IHJlY3RPdGhlclNpZGUubWluIHx8XG4gICAgICAgIHBPdGhlclNpZGUubWluID4gcmVjdE90aGVyU2lkZS5tYXggfHxcbiAgICAgICAgcE90aGVyU2lkZS5tYXggPCByZWN0T3RoZXJTaWRlLm1pbiB8fFxuICAgICAgICBwT3RoZXJTaWRlLm1heCA+IHJlY3RPdGhlclNpZGUubWF4KSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICgocFNpZGUubWF4ID49IHJlY3RTaWRlLm1pbiAmJiBwU2lkZS5tYXggPD0gKHJlY3RTaWRlLm1heCArIHJlY3RTaWRlLm1pbikgLyAyICYmIHZlbG9jaXR5ID4gMCkgfHxcbiAgICAgICAgKHBTaWRlLm1pbiA8PSByZWN0U2lkZS5tYXggJiYgcFNpZGUubWluID4gKHJlY3RTaWRlLm1heCArIHJlY3RTaWRlLm1pbikgLyAyICYmIHZlbG9jaXR5IDwgMCkpIHtcbiAgICAgICAgcmVzLnZlbG9jaXR5ID0gdmVsb2NpdHkgKiAtZmFjdG9yO1xuICAgICAgICByZXMuYm91bmNlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBjaGVja1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9ycykge1xuICAgIGlmICghKHNlbGVjdG9ycyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTc3IoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdyB8fCB0eXBlb2Ygd2luZG93LmRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cuZG9jdW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXR1cm4gaXNTc3IoKVxuICAgICAgICA/IChjYWxsYmFjaykgPT4gc2V0VGltZW91dChjYWxsYmFjaylcbiAgICAgICAgOiAoY2FsbGJhY2spID0+ICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCkoY2FsbGJhY2spO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbEFuaW1hdGlvbigpIHtcbiAgICByZXR1cm4gaXNTc3IoKVxuICAgICAgICA/IChoYW5kbGUpID0+IGNsZWFyVGltZW91dChoYW5kbGUpXG4gICAgICAgIDogKGhhbmRsZSkgPT4gKHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCkoaGFuZGxlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBhcnJheSB8fCAoYXJyYXkgaW5zdGFuY2VvZiBBcnJheSAmJiBhcnJheS5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRm9udChmb250LCB3ZWlnaHQpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb2N1bWVudC5mb250cy5sb2FkKGAke3dlaWdodCAhPT0gbnVsbCAmJiB3ZWlnaHQgIT09IHZvaWQgMCA/IHdlaWdodCA6IFwiNDAwXCJ9IDM2cHggJyR7Zm9udCAhPT0gbnVsbCAmJiBmb250ICE9PSB2b2lkIDAgPyBmb250IDogXCJWZXJkYW5hXCJ9J2ApO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYXJyYXlSYW5kb21JbmRleChhcnJheSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGl0ZW1Gcm9tQXJyYXkoYXJyYXksIGluZGV4LCB1c2VJbmRleCA9IHRydWUpIHtcbiAgICBjb25zdCBmaXhlZEluZGV4ID0gaW5kZXggIT09IHVuZGVmaW5lZCAmJiB1c2VJbmRleCA/IGluZGV4ICUgYXJyYXkubGVuZ3RoIDogYXJyYXlSYW5kb21JbmRleChhcnJheSk7XG4gICAgcmV0dXJuIGFycmF5W2ZpeGVkSW5kZXhdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUG9pbnRJbnNpZGUocG9pbnQsIHNpemUsIG9mZnNldCwgcmFkaXVzLCBkaXJlY3Rpb24pIHtcbiAgICByZXR1cm4gYXJlQm91bmRzSW5zaWRlKGNhbGN1bGF0ZUJvdW5kcyhwb2ludCwgcmFkaXVzICE9PSBudWxsICYmIHJhZGl1cyAhPT0gdm9pZCAwID8gcmFkaXVzIDogMCksIHNpemUsIG9mZnNldCwgZGlyZWN0aW9uKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVCb3VuZHNJbnNpZGUoYm91bmRzLCBzaXplLCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgIGxldCBpbnNpZGUgPSB0cnVlO1xuICAgIGlmICghZGlyZWN0aW9uIHx8IGRpcmVjdGlvbiA9PT0gXCJib3R0b21cIikge1xuICAgICAgICBpbnNpZGUgPSBib3VuZHMudG9wIDwgc2l6ZS5oZWlnaHQgKyBvZmZzZXQueDtcbiAgICB9XG4gICAgaWYgKGluc2lkZSAmJiAoIWRpcmVjdGlvbiB8fCBkaXJlY3Rpb24gPT09IFwibGVmdFwiKSkge1xuICAgICAgICBpbnNpZGUgPSBib3VuZHMucmlnaHQgPiBvZmZzZXQueDtcbiAgICB9XG4gICAgaWYgKGluc2lkZSAmJiAoIWRpcmVjdGlvbiB8fCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIikpIHtcbiAgICAgICAgaW5zaWRlID0gYm91bmRzLmxlZnQgPCBzaXplLndpZHRoICsgb2Zmc2V0Lnk7XG4gICAgfVxuICAgIGlmIChpbnNpZGUgJiYgKCFkaXJlY3Rpb24gfHwgZGlyZWN0aW9uID09PSBcInRvcFwiKSkge1xuICAgICAgICBpbnNpZGUgPSBib3VuZHMuYm90dG9tID4gb2Zmc2V0Lnk7XG4gICAgfVxuICAgIHJldHVybiBpbnNpZGU7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQm91bmRzKHBvaW50LCByYWRpdXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBib3R0b206IHBvaW50LnkgKyByYWRpdXMsXG4gICAgICAgIGxlZnQ6IHBvaW50LnggLSByYWRpdXMsXG4gICAgICAgIHJpZ2h0OiBwb2ludC54ICsgcmFkaXVzLFxuICAgICAgICB0b3A6IHBvaW50LnkgLSByYWRpdXMsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXh0ZW5kKGRlc3RpbmF0aW9uLCAuLi5zb3VyY2VzKSB7XG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQgfHwgc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBzb3VyY2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlSXNBcnJheSAmJiAodHlwZW9mIGRlc3RpbmF0aW9uICE9PSBcIm9iamVjdFwiIHx8ICFkZXN0aW5hdGlvbiB8fCAhQXJyYXkuaXNBcnJheShkZXN0aW5hdGlvbikpKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFzb3VyY2VJc0FycmF5ICYmICh0eXBlb2YgZGVzdGluYXRpb24gIT09IFwib2JqZWN0XCIgfHwgIWRlc3RpbmF0aW9uIHx8IEFycmF5LmlzQXJyYXkoZGVzdGluYXRpb24pKSkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZURpY3QgPSBzb3VyY2UsIHZhbHVlID0gc291cmNlRGljdFtrZXldLCBpc09iamVjdCA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiwgZGVzdERpY3QgPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGRlc3REaWN0W2tleV0gPVxuICAgICAgICAgICAgICAgIGlzT2JqZWN0ICYmIEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgID8gdmFsdWUubWFwKCh2KSA9PiBkZWVwRXh0ZW5kKGRlc3REaWN0W2tleV0sIHYpKVxuICAgICAgICAgICAgICAgICAgICA6IGRlZXBFeHRlbmQoZGVzdERpY3Rba2V5XSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0Rpdk1vZGVFbmFibGVkKG1vZGUsIGRpdnMpIHtcbiAgICByZXR1cm4gZGl2cyBpbnN0YW5jZW9mIEFycmF5ID8gISFkaXZzLmZpbmQoKHQpID0+IHQuZW5hYmxlICYmIGlzSW5BcnJheShtb2RlLCB0Lm1vZGUpKSA6IGlzSW5BcnJheShtb2RlLCBkaXZzLm1vZGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpdk1vZGVFeGVjdXRlKG1vZGUsIGRpdnMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGRpdnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKGNvbnN0IGRpdiBvZiBkaXZzKSB7XG4gICAgICAgICAgICBjb25zdCBkaXZNb2RlID0gZGl2Lm1vZGUsIGRpdkVuYWJsZWQgPSBkaXYuZW5hYmxlO1xuICAgICAgICAgICAgaWYgKGRpdkVuYWJsZWQgJiYgaXNJbkFycmF5KG1vZGUsIGRpdk1vZGUpKSB7XG4gICAgICAgICAgICAgICAgc2luZ2xlRGl2TW9kZUV4ZWN1dGUoZGl2LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpdk1vZGUgPSBkaXZzLm1vZGUsIGRpdkVuYWJsZWQgPSBkaXZzLmVuYWJsZTtcbiAgICAgICAgaWYgKGRpdkVuYWJsZWQgJiYgaXNJbkFycmF5KG1vZGUsIGRpdk1vZGUpKSB7XG4gICAgICAgICAgICBzaW5nbGVEaXZNb2RlRXhlY3V0ZShkaXZzLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2luZ2xlRGl2TW9kZUV4ZWN1dGUoZGl2LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGRpdi5zZWxlY3RvcnM7XG4gICAgaWYgKHNlbGVjdG9ycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhzZWxlY3RvciwgZGl2KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soc2VsZWN0b3JzLCBkaXYpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXZNb2RlKGRpdnMsIGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWRpdnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGl2cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkaXZzLmZpbmQoKGQpID0+IGNoZWNrU2VsZWN0b3IoZWxlbWVudCwgZC5zZWxlY3RvcnMpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2hlY2tTZWxlY3RvcihlbGVtZW50LCBkaXZzLnNlbGVjdG9ycykpIHtcbiAgICAgICAgcmV0dXJuIGRpdnM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNpcmNsZUJvdW5jZURhdGFGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBvc2l0aW9uOiBwLmdldFBvc2l0aW9uKCksXG4gICAgICAgIHJhZGl1czogcC5nZXRSYWRpdXMoKSxcbiAgICAgICAgbWFzczogcC5nZXRNYXNzKCksXG4gICAgICAgIHZlbG9jaXR5OiBwLnZlbG9jaXR5LFxuICAgICAgICBmYWN0b3I6IFZlY3Rvci5jcmVhdGUoZ2V0VmFsdWUocC5vcHRpb25zLmJvdW5jZS5ob3Jpem9udGFsKSwgZ2V0VmFsdWUocC5vcHRpb25zLmJvdW5jZS52ZXJ0aWNhbCkpLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gY2lyY2xlQm91bmNlKHAxLCBwMikge1xuICAgIGNvbnN0IHsgeDogeFZlbG9jaXR5RGlmZiwgeTogeVZlbG9jaXR5RGlmZiB9ID0gcDEudmVsb2NpdHkuc3ViKHAyLnZlbG9jaXR5KSwgW3BvczEsIHBvczJdID0gW3AxLnBvc2l0aW9uLCBwMi5wb3NpdGlvbl0sIHsgZHg6IHhEaXN0LCBkeTogeURpc3QgfSA9IGdldERpc3RhbmNlcyhwb3MyLCBwb3MxKTtcbiAgICBpZiAoeFZlbG9jaXR5RGlmZiAqIHhEaXN0ICsgeVZlbG9jaXR5RGlmZiAqIHlEaXN0IDwgMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFuZ2xlID0gLU1hdGguYXRhbjIoeURpc3QsIHhEaXN0KSwgbTEgPSBwMS5tYXNzLCBtMiA9IHAyLm1hc3MsIHUxID0gcDEudmVsb2NpdHkucm90YXRlKGFuZ2xlKSwgdTIgPSBwMi52ZWxvY2l0eS5yb3RhdGUoYW5nbGUpLCB2MSA9IGNvbGxpc2lvblZlbG9jaXR5KHUxLCB1MiwgbTEsIG0yKSwgdjIgPSBjb2xsaXNpb25WZWxvY2l0eSh1MiwgdTEsIG0xLCBtMiksIHZGaW5hbDEgPSB2MS5yb3RhdGUoLWFuZ2xlKSwgdkZpbmFsMiA9IHYyLnJvdGF0ZSgtYW5nbGUpO1xuICAgIHAxLnZlbG9jaXR5LnggPSB2RmluYWwxLnggKiBwMS5mYWN0b3IueDtcbiAgICBwMS52ZWxvY2l0eS55ID0gdkZpbmFsMS55ICogcDEuZmFjdG9yLnk7XG4gICAgcDIudmVsb2NpdHkueCA9IHZGaW5hbDIueCAqIHAyLmZhY3Rvci54O1xuICAgIHAyLnZlbG9jaXR5LnkgPSB2RmluYWwyLnkgKiBwMi5mYWN0b3IueTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWN0Qm91bmNlKHBhcnRpY2xlLCBkaXZCb3VuZHMpIHtcbiAgICBjb25zdCBwUG9zID0gcGFydGljbGUuZ2V0UG9zaXRpb24oKSwgc2l6ZSA9IHBhcnRpY2xlLmdldFJhZGl1cygpLCBib3VuZHMgPSBjYWxjdWxhdGVCb3VuZHMocFBvcywgc2l6ZSk7XG4gICAgY29uc3QgcmVzSCA9IHJlY3RTaWRlQm91bmNlKHtcbiAgICAgICAgbWluOiBib3VuZHMubGVmdCxcbiAgICAgICAgbWF4OiBib3VuZHMucmlnaHQsXG4gICAgfSwge1xuICAgICAgICBtaW46IGJvdW5kcy50b3AsXG4gICAgICAgIG1heDogYm91bmRzLmJvdHRvbSxcbiAgICB9LCB7XG4gICAgICAgIG1pbjogZGl2Qm91bmRzLmxlZnQsXG4gICAgICAgIG1heDogZGl2Qm91bmRzLnJpZ2h0LFxuICAgIH0sIHtcbiAgICAgICAgbWluOiBkaXZCb3VuZHMudG9wLFxuICAgICAgICBtYXg6IGRpdkJvdW5kcy5ib3R0b20sXG4gICAgfSwgcGFydGljbGUudmVsb2NpdHkueCwgZ2V0VmFsdWUocGFydGljbGUub3B0aW9ucy5ib3VuY2UuaG9yaXpvbnRhbCkpO1xuICAgIGlmIChyZXNILmJvdW5jZWQpIHtcbiAgICAgICAgaWYgKHJlc0gudmVsb2NpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkueCA9IHJlc0gudmVsb2NpdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc0gucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHJlc0gucG9zaXRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzViA9IHJlY3RTaWRlQm91bmNlKHtcbiAgICAgICAgbWluOiBib3VuZHMudG9wLFxuICAgICAgICBtYXg6IGJvdW5kcy5ib3R0b20sXG4gICAgfSwge1xuICAgICAgICBtaW46IGJvdW5kcy5sZWZ0LFxuICAgICAgICBtYXg6IGJvdW5kcy5yaWdodCxcbiAgICB9LCB7XG4gICAgICAgIG1pbjogZGl2Qm91bmRzLnRvcCxcbiAgICAgICAgbWF4OiBkaXZCb3VuZHMuYm90dG9tLFxuICAgIH0sIHtcbiAgICAgICAgbWluOiBkaXZCb3VuZHMubGVmdCxcbiAgICAgICAgbWF4OiBkaXZCb3VuZHMucmlnaHQsXG4gICAgfSwgcGFydGljbGUudmVsb2NpdHkueSwgZ2V0VmFsdWUocGFydGljbGUub3B0aW9ucy5ib3VuY2UudmVydGljYWwpKTtcbiAgICBpZiAocmVzVi5ib3VuY2VkKSB7XG4gICAgICAgIGlmIChyZXNWLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgPSByZXNWLnZlbG9jaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNWLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSByZXNWLnBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gbG9hZE9wdGlvbnMob3B0aW9ucywgLi4uc291cmNlT3B0aW9uc0Fycikge1xuICAgIGZvciAoY29uc3Qgc291cmNlT3B0aW9ucyBvZiBzb3VyY2VPcHRpb25zQXJyKSB7XG4gICAgICAgIG9wdGlvbnMubG9hZChzb3VyY2VPcHRpb25zKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbnRhaW5lck9wdGlvbnMoZW5naW5lLCAuLi5zb3VyY2VPcHRpb25zQXJyKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBPcHRpb25zKGVuZ2luZSk7XG4gICAgbG9hZE9wdGlvbnMob3B0aW9ucywgLi4uc291cmNlT3B0aW9uc0Fycik7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gbG9hZFBhcnRpY2xlc09wdGlvbnMoLi4uc291cmNlT3B0aW9uc0Fycikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUGFydGljbGVzT3B0aW9ucygpO1xuICAgIGxvYWRPcHRpb25zKG9wdGlvbnMsIC4uLnNvdXJjZU9wdGlvbnNBcnIpO1xuICAgIHJldHVybiBvcHRpb25zO1xufVxuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9FbmdpbmVfaW5pdGlhbGl6ZWQsIF9FbmdpbmVfbG9hZGVyO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcIi4vVXRpbHMvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiLi9Db3JlL0xvYWRlclwiO1xuaW1wb3J0IHsgUGx1Z2lucyB9IGZyb20gXCIuL0NvcmUvVXRpbHMvUGx1Z2luc1wiO1xuZXhwb3J0IGNsYXNzIEVuZ2luZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9FbmdpbmVfaW5pdGlhbGl6ZWQuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9FbmdpbmVfbG9hZGVyLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmRvbUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FbmdpbmVfaW5pdGlhbGl6ZWQsIGZhbHNlLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0VuZ2luZV9sb2FkZXIsIG5ldyBMb2FkZXIodGhpcyksIFwiZlwiKTtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gbmV3IFBsdWdpbnModGhpcyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW5naW5lX2luaXRpYWxpemVkLCBcImZcIikpIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0VuZ2luZV9pbml0aWFsaXplZCwgdHJ1ZSwgXCJmXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvYWRGcm9tQXJyYXkodGFnSWQsIG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbmdpbmVfbG9hZGVyLCBcImZcIikubG9hZCh0YWdJZCwgb3B0aW9ucywgaW5kZXgpO1xuICAgIH1cbiAgICBhc3luYyBsb2FkKHRhZ0lkLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbmdpbmVfbG9hZGVyLCBcImZcIikubG9hZCh0YWdJZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIHNldChpZCwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW5naW5lX2xvYWRlciwgXCJmXCIpLnNldChpZCwgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRKU09OKHRhZ0lkLCBwYXRoQ29uZmlnSnNvbiwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VuZ2luZV9sb2FkZXIsIFwiZlwiKS5sb2FkSlNPTih0YWdJZCwgcGF0aENvbmZpZ0pzb24sIGluZGV4KTtcbiAgICB9XG4gICAgYXN5bmMgc2V0SlNPTihpZCwgZWxlbWVudCwgcGF0aENvbmZpZ0pzb24sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbmdpbmVfbG9hZGVyLCBcImZcIikuc2V0SlNPTihpZCwgZWxlbWVudCwgcGF0aENvbmZpZ0pzb24sIGluZGV4KTtcbiAgICB9XG4gICAgc2V0T25DbGlja0hhbmRsZXIoY2FsbGJhY2spIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW5naW5lX2xvYWRlciwgXCJmXCIpLnNldE9uQ2xpY2tIYW5kbGVyKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZG9tKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW5naW5lX2xvYWRlciwgXCJmXCIpLmRvbSgpO1xuICAgIH1cbiAgICBkb21JdGVtKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FbmdpbmVfbG9hZGVyLCBcImZcIikuZG9tSXRlbShpbmRleCk7XG4gICAgfVxuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgdGhpcy5kb20oKSkge1xuICAgICAgICAgICAgYXdhaXQgaW5zdGFuY2UucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZFNoYXBlKHNoYXBlLCBkcmF3ZXIsIGluaXQsIGFmdGVyRWZmZWN0LCBkZXN0cm95KSB7XG4gICAgICAgIGxldCBjdXN0b21EcmF3ZXI7XG4gICAgICAgIGlmICh0eXBlb2YgZHJhd2VyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGN1c3RvbURyYXdlciA9IHtcbiAgICAgICAgICAgICAgICBhZnRlckVmZmVjdDogYWZ0ZXJFZmZlY3QsXG4gICAgICAgICAgICAgICAgZGVzdHJveTogZGVzdHJveSxcbiAgICAgICAgICAgICAgICBkcmF3OiBkcmF3ZXIsXG4gICAgICAgICAgICAgICAgaW5pdDogaW5pdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXN0b21EcmF3ZXIgPSBkcmF3ZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW5zLmFkZFNoYXBlRHJhd2VyKHNoYXBlLCBjdXN0b21EcmF3ZXIpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgYXN5bmMgYWRkUHJlc2V0KHByZXNldCwgb3B0aW9ucywgb3ZlcnJpZGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnBsdWdpbnMuYWRkUHJlc2V0KHByZXNldCwgb3B0aW9ucywgb3ZlcnJpZGUpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgYXN5bmMgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgICAgICB0aGlzLnBsdWdpbnMuYWRkUGx1Z2luKHBsdWdpbik7XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgICBhc3luYyBhZGRQYXRoR2VuZXJhdG9yKG5hbWUsIGdlbmVyYXRvcikge1xuICAgICAgICB0aGlzLnBsdWdpbnMuYWRkUGF0aEdlbmVyYXRvcihuYW1lLCBnZW5lcmF0b3IpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgYXN5bmMgYWRkSW50ZXJhY3RvcihuYW1lLCBpbnRlcmFjdG9ySW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zLmFkZEludGVyYWN0b3IobmFtZSwgaW50ZXJhY3RvckluaXRpYWxpemVyKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGFzeW5jIGFkZE1vdmVyKG5hbWUsIG1vdmVySW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zLmFkZFBhcnRpY2xlTW92ZXIobmFtZSwgbW92ZXJJbml0aWFsaXplcik7XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgICBhc3luYyBhZGRQYXJ0aWNsZVVwZGF0ZXIobmFtZSwgdXBkYXRlckluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMucGx1Z2lucy5hZGRQYXJ0aWNsZVVwZGF0ZXIobmFtZSwgdXBkYXRlckluaXRpYWxpemVyKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRW5naW5lX2xvYWRlciwgXCJmXCIpLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VuZ2luZV9sb2FkZXIsIFwiZlwiKS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudCh0eXBlLCBhcmdzKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0VuZ2luZV9sb2FkZXIsIFwiZlwiKS5kaXNwYXRjaEV2ZW50KHR5cGUsIGFyZ3MpO1xuICAgIH1cbn1cbl9FbmdpbmVfaW5pdGlhbGl6ZWQgPSBuZXcgV2Vha01hcCgpLCBfRW5naW5lX2xvYWRlciA9IG5ldyBXZWFrTWFwKCk7XG4iLCJpbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmNvbnN0IHRzUGFydGljbGVzID0gbmV3IEVuZ2luZSgpO1xudHNQYXJ0aWNsZXMuaW5pdCgpO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0NvbG9yc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0dyYWRpZW50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lCb3VuZHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JQnViYmxlUGFydGljbGVEYXRhXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSUNpcmNsZUJvdW5jZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JQ29udGFpbmVySW50ZXJhY3Rpdml0eVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lDb250YWluZXJQbHVnaW5cIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JRGVsdGFcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JRGltZW5zaW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSURpc3RhbmNlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSUV4dGVybmFsSW50ZXJhY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lJbnRlcmFjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSU1vdXNlRGF0YVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lNb3ZlUGF0aEdlbmVyYXRvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZUNvbG9yU3R5bGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVHcmF2aXR5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlSHNsQW5pbWF0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlc0ludGVyYWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVMaWZlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlTG9vcHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVSZXRpbmFQcm9wc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9JbnRlcmZhY2VzL0lQYXJ0aWNsZVJvbGxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVVcGRhdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSVBhcnRpY2xlVmFsdWVBbmltYXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVXb2JibGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGFydGljbGVzTW92ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUGx1Z2luXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0ludGVyZmFjZXMvSVJhbmdlVmFsdWVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JUmVjdFNpZGVSZXN1bHRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JU2hhcGVEcmF3ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvSW50ZXJmYWNlcy9JU2hhcGVWYWx1ZXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvVXRpbHMvQ2lyY2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL0NpcmNsZVdhcnBcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvVXRpbHMvQ29uc3RhbnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL0V2ZW50TGlzdGVuZXJzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL0V4dGVybmFsSW50ZXJhY3RvckJhc2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvVXRpbHMvRnJhbWVNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL0ludGVyYWN0aW9uTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9VdGlscy9QYXJ0aWNsZXNJbnRlcmFjdG9yQmFzZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9VdGlscy9QbHVnaW5zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL1BvaW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL1F1YWRUcmVlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL1JhbmdlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1V0aWxzL1JlY3RhbmdsZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9VdGlscy9WZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvVXRpbHMvVmVjdG9yM2RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvQ2FudmFzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL0NvbnRhaW5lclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ29yZS9Mb2FkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvUGFydGljbGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvcmUvUGFydGljbGVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db3JlL1JldGluYVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvRGlyZWN0aW9ucy9Nb3ZlRGlyZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9EaXJlY3Rpb25zL1JvdGF0ZURpcmVjdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvRGlyZWN0aW9ucy9PdXRNb2RlRGlyZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9EaXJlY3Rpb25zL1RpbHREaXJlY3Rpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL01vZGVzL0NsaWNrTW9kZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvTW9kZXMvRGVzdHJveU1vZGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL01vZGVzL0Rpdk1vZGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL01vZGVzL0hvdmVyTW9kZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvTW9kZXMvQ29sbGlzaW9uTW9kZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvTW9kZXMvT3V0TW9kZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRW51bXMvTW9kZXMvUm9sbE1vZGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL01vZGVzL1NpemVNb2RlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9Nb2Rlcy9UaGVtZU1vZGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL01vZGVzL1Jlc3BvbnNpdmVNb2RlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9UeXBlcy9BbHRlclR5cGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL1R5cGVzL0Rlc3Ryb3lUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9UeXBlcy9HcmFkaWVudFR5cGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL1R5cGVzL0ludGVyYWN0b3JUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9UeXBlcy9QYXJ0aWNsZU91dFR5cGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL1R5cGVzL1N0YXJ0VmFsdWVUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9UeXBlcy9EaXZUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9UeXBlcy9FYXNpbmdUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9BbmltYXRpb25TdGF0dXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0VudW1zL0ludGVyYWN0aXZpdHlEZXRlY3RcIjtcbmV4cG9ydCB7IEVuZ2luZSwgRW5naW5lIGFzIE1haW4gfTtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9BbmltYXRhYmxlQ29sb3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9BbmltYXRhYmxlR3JhZGllbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9BbmltYXRpb25PcHRpb25zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvQmFja2dyb3VuZC9CYWNrZ3JvdW5kXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvQmFja2dyb3VuZE1hc2svQmFja2dyb3VuZE1hc2tcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9CYWNrZ3JvdW5kTWFzay9CYWNrZ3JvdW5kTWFza0NvdmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvQ29sb3JBbmltYXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9GdWxsU2NyZWVuL0Z1bGxTY3JlZW5cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9Ic2xBbmltYXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9DbGlja0V2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvRGl2RXZlbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9DbGlja0V2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvRGl2RXZlbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9FdmVudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9Ib3ZlckV2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvUGFyYWxsYXhcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L0ludGVyYWN0aXZpdHlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0F0dHJhY3RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0JvdW5jZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvQnViYmxlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9CdWJibGVCYXNlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9CdWJibGVEaXZcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0Nvbm5lY3RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0Nvbm5lY3RMaW5rc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvR3JhYlwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvR3JhYkxpbmtzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9MaWdodFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvTGlnaHRBcmVhXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9MaWdodEdyYWRpZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9MaWdodFNoYWRvd1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvTW9kZXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1B1c2hcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1JlbW92ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvUmVwdWxzZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvUmVwdWxzZUJhc2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1JlcHVsc2VEaXZcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1Nsb3dcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9JbnRlcmFjdGl2aXR5L01vZGVzL1RyYWlsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvTWFudWFsUGFydGljbGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9Nb3Rpb24vTW90aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvTW90aW9uL01vdGlvblJlZHVjZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL09wdGlvbnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9PcHRpb25zQ29sb3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvQm91bmNlL1BhcnRpY2xlc0JvdW5jZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Cb3VuY2UvUGFydGljbGVzQm91bmNlRmFjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0NvbGxpc2lvbnMvQ29sbGlzaW9uc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Db2xsaXNpb25zL0NvbGxpc2lvbnNPdmVybGFwXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0Rlc3Ryb3kvRGVzdHJveVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9EZXN0cm95L1NwbGl0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0Rlc3Ryb3kvU3BsaXRGYWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvRGVzdHJveS9TcGxpdFJhdGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvUGFydGljbGVzT3B0aW9uc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9TaGFkb3dcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvU3Ryb2tlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL0xpZmUvTGlmZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaWZlL0xpZmVEZWxheVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaWZlL0xpZmVEdXJhdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaW5rcy9MaW5rc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaW5rcy9MaW5rc1NoYWRvd1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9MaW5rcy9MaW5rc1RyaWFuZ2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZUF0dHJhY3RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTW92ZS9Nb3ZlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZUFuZ2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZUdyYXZpdHlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTW92ZS9PdXRNb2Rlc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Nb3ZlL1BhdGgvTW92ZVBhdGhcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTW92ZS9QYXRoL01vdmVQYXRoRGVsYXlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTW92ZS9TcGluXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL01vdmUvTW92ZVRyYWlsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL051bWJlci9QYXJ0aWNsZXNOdW1iZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvTnVtYmVyL1BhcnRpY2xlc0RlbnNpdHlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvT3BhY2l0eS9PcGFjaXR5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL09wYWNpdHkvT3BhY2l0eUFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9PcmJpdC9PcmJpdFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9PcmJpdC9PcmJpdFJvdGF0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1JlcHVsc2UvUGFydGljbGVzUmVwdWxzZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Sb2xsL1JvbGxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvUm9sbC9Sb2xsTGlnaHRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvUm90YXRlL1JvdGF0ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Sb3RhdGUvUm90YXRlQW5pbWF0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1NoYXBlL1NoYXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1NpemUvU2l6ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9TaXplL1NpemVBbmltYXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvVGlsdC9UaWx0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1RpbHQvVGlsdEFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BhcnRpY2xlcy9Ud2lua2xlL1R3aW5rbGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvVHdpbmtsZS9Ud2lua2xlVmFsdWVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0NsYXNzZXMvUGFydGljbGVzL1dvYmJsZS9Xb2JibGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9QYXJ0aWNsZXMvWkluZGV4L1pJbmRleFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1Jlc3BvbnNpdmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9UaGVtZS9UaGVtZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1RoZW1lL1RoZW1lRGVmYXVsdFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1ZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0JhY2tncm91bmQvSUJhY2tncm91bmRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9CYWNrZ3JvdW5kTWFzay9JQmFja2dyb3VuZE1hc2tcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9CYWNrZ3JvdW5kTWFzay9JQmFja2dyb3VuZE1hc2tDb3ZlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0Z1bGxTY3JlZW4vSUZ1bGxTY3JlZW5cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JQW5pbWF0YWJsZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0lBbmltYXRhYmxlQ29sb3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JQW5pbWF0YWJsZUdyYWRpZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSUFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0lDb2xvckFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0lIc2xBbmltYXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JTWFudWFsUGFydGljbGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JT3B0aW9uTG9hZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSU9wdGlvbnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JT3B0aW9uc0NvbG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSU9wdGlvbnNHcmFkaWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0lSZXNwb25zaXZlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSVZhbHVlV2l0aFJhbmRvbVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL0lDbGlja0V2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSURpdkV2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSUV2ZW50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvRXZlbnRzL0lIb3ZlckV2ZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSVBhcmFsbGF4XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JQXR0cmFjdFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUJvdW5jZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUJ1YmJsZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUJ1YmJsZUJhc2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lCdWJibGVEaXZcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lDb25uZWN0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JQ29ubmVjdExpbmtzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JR3JhYlwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUdyYWJMaW5rc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUxpZ2h0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTGlnaHRBcmVhXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTGlnaHRHcmFkaWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSUxpZ2h0U2hhZG93XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JTW9kZURpdlwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSU1vZGVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JUHVzaFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSVJlbW92ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSVJlcHVsc2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lSZXB1bHNlQmFzZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL0ludGVyYWN0aXZpdHkvTW9kZXMvSVJlcHVsc2VEaXZcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L01vZGVzL0lTbG93XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JVHJhaWxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JbnRlcmFjdGl2aXR5L0lJbnRlcmFjdGl2aXR5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvTW90aW9uL0lNb3Rpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9Nb3Rpb24vSU1vdGlvblJlZHVjZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Cb3VuY2UvSVBhcnRpY2xlc0JvdW5jZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Db2xsaXNpb25zL0lDb2xsaXNpb25zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0NvbGxpc2lvbnMvSUNvbGxpc2lvbnNPdmVybGFwXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0Rlc3Ryb3kvSURlc3Ryb3lcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvRGVzdHJveS9JU3BsaXRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvSVBhcnRpY2xlc09wdGlvbnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvSVNoYWRvd1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9JU3Ryb2tlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpZmUvSUxpZmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTGlmZS9JTGlmZURlbGF5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpZmUvSUxpZmVEdXJhdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9MaW5rcy9JTGlua3NcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTGlua3MvSUxpbmtzU2hhZG93XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL0xpbmtzL0lMaW5rc1RyaWFuZ2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSU1vdmVBdHRyYWN0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSU1vdmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTW92ZS9JTW92ZUFuZ2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvSU1vdmVHcmF2aXR5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL01vdmUvUGF0aC9JTW92ZVBhdGhcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTW92ZS9JT3V0TW9kZXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTW92ZS9JU3BpblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Nb3ZlL0lNb3ZlVHJhaWxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvTnVtYmVyL0lQYXJ0aWNsZXNEZW5zaXR5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL051bWJlci9JUGFydGljbGVzTnVtYmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL09wYWNpdHkvSU9wYWNpdHlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvT3BhY2l0eS9JT3BhY2l0eUFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9PcmJpdC9JT3JiaXRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvUmVwdWxzZS9JUGFydGljbGVzUmVwdWxzZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Sb2xsL0lSb2xsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1JvbGwvSVJvbGxMaWdodFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Sb3RhdGUvSVJvdGF0ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Sb3RhdGUvSVJvdGF0ZUFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9TaGFwZS9JQ2hhcmFjdGVyU2hhcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2hhcGUvSUltYWdlU2hhcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2hhcGUvSVBvbHlnb25TaGFwZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9TaGFwZS9JU2hhcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2hhcGUvSVNoYXBlVmFsdWVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1NoYXBlL0lTdGFyU2hhcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvU2l6ZS9JU2l6ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9TaXplL0lTaXplQW5pbWF0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1RpbHQvSVRpbHRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvVGlsdC9JVGlsdEFuaW1hdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vT3B0aW9ucy9JbnRlcmZhY2VzL1BhcnRpY2xlcy9Ud2lua2xlL0lUd2lua2xlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9PcHRpb25zL0ludGVyZmFjZXMvUGFydGljbGVzL1R3aW5rbGUvSVR3aW5rbGVWYWx1ZXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvV29iYmxlL0lXb2JibGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9QYXJ0aWNsZXMvWkluZGV4L0laSW5kZXhcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9UaGVtZS9JVGhlbWVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9UaGVtZS9JVGhlbWVEZWZhdWx0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UeXBlcy9SYW5nZVZhbHVlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UeXBlcy9TaGFwZURhdGFcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1R5cGVzL1NoYXBlRHJhd2VyRnVuY3Rpb25zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UeXBlcy9TaW5nbGVPck11bHRpcGxlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UeXBlcy9QYXRoT3B0aW9uc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vVXRpbHMvQ2FudmFzVXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1V0aWxzL0NvbG9yVXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1V0aWxzL051bWJlclV0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9VdGlscy9VdGlsc1wiO1xuZXhwb3J0IHsgdHNQYXJ0aWNsZXMgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==