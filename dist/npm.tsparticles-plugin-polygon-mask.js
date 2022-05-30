"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-plugin-polygon-mask"],{

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskInlineArrangement.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskInlineArrangement.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskMoveType.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskMoveType.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskType.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskType.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMask.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMask.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMask": () => (/* binding */ PolygonMask)
/* harmony export */ });
/* harmony import */ var _PolygonMaskDraw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonMaskDraw */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDraw.js");
/* harmony import */ var _PolygonMaskInline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PolygonMaskInline */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskInline.js");
/* harmony import */ var _PolygonMaskLocalSvg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PolygonMaskLocalSvg */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskLocalSvg.js");
/* harmony import */ var _PolygonMaskMove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PolygonMaskMove */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskMove.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");





class PolygonMask {
    constructor() {
        this.draw = new _PolygonMaskDraw__WEBPACK_IMPORTED_MODULE_0__.PolygonMaskDraw();
        this.enable = false;
        this.inline = new _PolygonMaskInline__WEBPACK_IMPORTED_MODULE_1__.PolygonMaskInline();
        this.move = new _PolygonMaskMove__WEBPACK_IMPORTED_MODULE_3__.PolygonMaskMove();
        this.scale = 1;
        this.type = "none";
    }
    get inlineArrangement() {
        return this.inline.arrangement;
    }
    set inlineArrangement(value) {
        this.inline.arrangement = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.draw.load(data.draw);
        this.inline.load(data.inline);
        this.move.load(data.move);
        if (data.scale !== undefined) {
            this.scale = data.scale;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        else {
            this.enable = this.type !== "none";
        }
        if (data.url !== undefined) {
            this.url = data.url;
        }
        if (data.data !== undefined) {
            if (typeof data.data === "string") {
                this.data = data.data;
            }
            else {
                this.data = new _PolygonMaskLocalSvg__WEBPACK_IMPORTED_MODULE_2__.PolygonMaskLocalSvg();
                this.data.load(data.data);
            }
        }
        if (data.position !== undefined) {
            this.position = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_4__.deepExtend)({}, data.position);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDraw.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDraw.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskDraw": () => (/* binding */ PolygonMaskDraw)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _PolygonMaskDrawStroke__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PolygonMaskDrawStroke */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDrawStroke.js");


class PolygonMaskDraw {
    constructor() {
        this.enable = false;
        this.stroke = new _PolygonMaskDrawStroke__WEBPACK_IMPORTED_MODULE_1__.PolygonMaskDrawStroke();
    }
    get lineWidth() {
        return this.stroke.width;
    }
    set lineWidth(value) {
        this.stroke.width = value;
    }
    get lineColor() {
        return this.stroke.color;
    }
    set lineColor(value) {
        this.stroke.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.stroke.color, value);
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
            color: data.lineColor,
            width: data.lineWidth,
        };
        this.stroke.load(stroke);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDrawStroke.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskDrawStroke.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskDrawStroke": () => (/* binding */ PolygonMaskDrawStroke)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class PolygonMaskDrawStroke {
    constructor() {
        this.color = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);
        if (typeof this.color.value === "string") {
            this.opacity = (_a = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.stringToAlpha)(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskInline.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskInline.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskInline": () => (/* binding */ PolygonMaskInline)
/* harmony export */ });
class PolygonMaskInline {
    constructor() {
        this.arrangement = "one-per-point";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.arrangement !== undefined) {
            this.arrangement = data.arrangement;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskLocalSvg.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskLocalSvg.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskLocalSvg": () => (/* binding */ PolygonMaskLocalSvg)
/* harmony export */ });
class PolygonMaskLocalSvg {
    constructor() {
        this.path = [];
        this.size = {
            height: 0,
            width: 0,
        };
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.path !== undefined) {
            this.path = data.path;
        }
        if (data.size !== undefined) {
            if (data.size.width !== undefined) {
                this.size.width = data.size.width;
            }
            if (data.size.height !== undefined) {
                this.size.height = data.size.height;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskMove.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMaskMove.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskMove": () => (/* binding */ PolygonMaskMove)
/* harmony export */ });
class PolygonMaskMove {
    constructor() {
        this.radius = 10;
        this.type = "path";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Interfaces/IPolygonMaskOptions.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Interfaces/IPolygonMaskOptions.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/PolygonMaskInstance.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/PolygonMaskInstance.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PolygonMaskInstance": () => (/* binding */ PolygonMaskInstance)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/tsparticles-plugin-polygon-mask/esm/utils.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_PolygonMask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/PolygonMask */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMask.js");
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
var _PolygonMaskInstance_engine;



class PolygonMaskInstance {
    constructor(container, engine) {
        this.container = container;
        _PolygonMaskInstance_engine.set(this, void 0);
        __classPrivateFieldSet(this, _PolygonMaskInstance_engine, engine, "f");
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new _Options_Classes_PolygonMask__WEBPACK_IMPORTED_MODULE_2__.PolygonMask();
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
    }
    async initAsync(options) {
        this.options.load(options === null || options === void 0 ? void 0 : options.polygon);
        const polygonMaskOptions = this.options;
        this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
        if (polygonMaskOptions.enable) {
            await this.initRawData();
        }
    }
    resize() {
        const container = this.container, options = this.options;
        if (!(options.enable && options.type !== "none")) {
            return;
        }
        if (this.redrawTimeout) {
            clearTimeout(this.redrawTimeout);
        }
        this.redrawTimeout = window.setTimeout(async () => {
            await this.initRawData(true);
            await container.particles.redraw();
        }, 250);
    }
    stop() {
        delete this.raw;
        delete this.paths;
    }
    particlesInitialization() {
        const options = this.options;
        if (options.enable &&
            options.type === "inline" &&
            (options.inline.arrangement === "one-per-point" ||
                options.inline.arrangement === "per-point")) {
            this.drawPoints();
            return true;
        }
        return false;
    }
    particlePosition(position) {
        var _a, _b;
        const options = this.options;
        if (!(options.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0)) {
            return;
        }
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.deepExtend)({}, position ? position : this.randomPoint());
    }
    particleBounce(particle, delta, direction) {
        return this.polygonBounce(particle, delta, direction);
    }
    clickPositionValid(position) {
        const options = this.options;
        return (options.enable &&
            options.type !== "none" &&
            options.type !== "inline" &&
            this.checkInsidePolygon(position));
    }
    draw(context) {
        var _a;
        if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const options = this.options, polygonDraw = options.draw;
        if (!options.enable || !polygonDraw.enable) {
            return;
        }
        const rawData = this.raw;
        for (const path of this.paths) {
            const path2d = path.path2d, path2dSupported = this.path2DSupported;
            if (!context) {
                continue;
            }
            if (path2dSupported && path2d && this.offset) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.drawPolygonMaskPath)(context, path2d, polygonDraw.stroke, this.offset);
            }
            else if (rawData) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.drawPolygonMask)(context, rawData, polygonDraw.stroke);
            }
        }
    }
    polygonBounce(particle, _delta, direction) {
        const options = this.options;
        if (!this.raw || !options.enable || direction !== "top") {
            return false;
        }
        if (options.type === "inside" || options.type === "outside") {
            let closest, dx, dy;
            const pos = particle.getPosition(), radius = particle.getRadius();
            for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                const pi = this.raw[i], pj = this.raw[j];
                closest = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.calcClosestPtOnSegment)(pi, pj, pos);
                const dist = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.getDistances)(pos, closest);
                [dx, dy] = [dist.dx, dist.dy];
                if (dist.distance < radius) {
                    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.segmentBounce)(pi, pj, particle.velocity);
                    return true;
                }
            }
            if (closest && dx !== undefined && dy !== undefined && !this.checkInsidePolygon(pos)) {
                const factor = { x: 1, y: 1 };
                if (particle.position.x >= closest.x) {
                    factor.x = -1;
                }
                if (particle.position.y >= closest.y) {
                    factor.y = -1;
                }
                particle.position.x = closest.x + radius * 2 * factor.x;
                particle.position.y = closest.y + radius * 2 * factor.y;
                particle.velocity.mult(-1);
                return true;
            }
        }
        else if (options.type === "inline" && particle.initialPosition) {
            const dist = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.getDistance)(particle.initialPosition, particle.getPosition());
            if (dist > this.polygonMaskMoveRadius) {
                particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
                particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
                return true;
            }
        }
        return false;
    }
    checkInsidePolygon(position) {
        var _a, _b;
        const container = this.container, options = this.options;
        if (!options.enable || options.type === "none" || options.type === "inline") {
            return true;
        }
        if (!this.raw) {
            throw new Error(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.noPolygonFound);
        }
        const canvasSize = container.canvas.size, x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width, y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height;
        let inside = false;
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
            const pi = this.raw[i], pj = this.raw[j], intersect = pi.y > y !== pj.y > y && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;
            if (intersect) {
                inside = !inside;
            }
        }
        return options.type === "inside"
            ? inside
            : options.type === "outside"
                ? !inside
                : false;
    }
    parseSvgPath(xml, force) {
        var _a, _b, _c;
        const forceDownload = force !== null && force !== void 0 ? force : false;
        if (this.paths !== undefined && !forceDownload) {
            return this.raw;
        }
        const container = this.container, options = this.options, parser = new DOMParser(), doc = parser.parseFromString(xml, "image/svg+xml"), svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
            svgPaths = doc.getElementsByTagName("path");
        }
        this.paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
            const path = svgPaths.item(i);
            if (path) {
                this.paths.push({
                    element: path,
                    length: path.getTotalLength(),
                });
            }
        }
        const pxRatio = container.retina.pixelRatio, scale = options.scale / pxRatio;
        this.dimension.width = parseFloat((_a = svg.getAttribute("width")) !== null && _a !== void 0 ? _a : "0") * scale;
        this.dimension.height = parseFloat((_b = svg.getAttribute("height")) !== null && _b !== void 0 ? _b : "0") * scale;
        const position = (_c = options.position) !== null && _c !== void 0 ? _c : {
            x: 50,
            y: 50,
        };
        this.offset = {
            x: (container.canvas.size.width * position.x) / (100 * pxRatio) - this.dimension.width / 2,
            y: (container.canvas.size.height * position.y) / (100 * pxRatio) - this.dimension.height / 2,
        };
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parsePaths)(this.paths, scale, this.offset);
    }
    async downloadSvgPath(svgUrl, force) {
        const options = this.options, url = svgUrl || options.url, forceDownload = force !== null && force !== void 0 ? force : false;
        if (!url || (this.paths !== undefined && !forceDownload)) {
            return this.raw;
        }
        const req = await fetch(url);
        if (!req.ok) {
            throw new Error("tsParticles Error - Error occurred during polygon mask download");
        }
        return this.parseSvgPath(await req.text(), force);
    }
    drawPoints() {
        if (!this.raw) {
            return;
        }
        for (const item of this.raw) {
            this.container.particles.addParticle({
                x: item.x,
                y: item.y,
            });
        }
    }
    randomPoint() {
        const container = this.container, options = this.options;
        let position;
        if (options.type === "inline") {
            switch (options.inline.arrangement) {
                case "random-point":
                    position = this.getRandomPoint();
                    break;
                case "random-length":
                    position = this.getRandomPointByLength();
                    break;
                case "equidistant":
                    position = this.getEquidistantPointByIndex(container.particles.count);
                    break;
                case "one-per-point":
                case "per-point":
                default:
                    position = this.getPointByIndex(container.particles.count);
            }
        }
        else {
            position = {
                x: Math.random() * container.canvas.size.width,
                y: Math.random() * container.canvas.size.height,
            };
        }
        if (this.checkInsidePolygon(position)) {
            return position;
        }
        else {
            return this.randomPoint();
        }
    }
    getRandomPoint() {
        if (!this.raw || !this.raw.length) {
            throw new Error(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.noPolygonDataLoaded);
        }
        const coords = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.itemFromArray)(this.raw);
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    getRandomPointByLength() {
        var _a, _b, _c;
        const options = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.noPolygonDataLoaded);
        }
        const path = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.itemFromArray)(this.paths), distance = Math.floor(Math.random() * path.length) + 1, point = path.element.getPointAtLength(distance);
        return {
            x: point.x * options.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
            y: point.y * options.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0),
        };
    }
    getEquidistantPointByIndex(index) {
        var _a, _b, _c, _d, _e, _f, _g;
        const options = this.container.actualOptions, polygonMaskOptions = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.noPolygonDataLoaded);
        let offset = 0, point;
        const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0), distance = totalLength / options.particles.number.value;
        for (const path of this.paths) {
            const pathDistance = distance * index - offset;
            if (pathDistance <= path.length) {
                point = path.element.getPointAtLength(pathDistance);
                break;
            }
            else {
                offset += path.length;
            }
        }
        return {
            x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
            y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0),
        };
    }
    getPointByIndex(index) {
        if (!this.raw || !this.raw.length) {
            throw new Error(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__.noPolygonDataLoaded);
        }
        const coords = this.raw[index % this.raw.length];
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    createPath2D() {
        var _a, _b;
        const options = this.options;
        if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        for (const path of this.paths) {
            const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");
            if (pathData) {
                const path2d = new Path2D(pathData), matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(), finalPath = new Path2D(), transform = matrix.scale(options.scale);
                if (finalPath.addPath) {
                    finalPath.addPath(path2d, transform);
                    path.path2d = finalPath;
                }
                else {
                    delete path.path2d;
                }
            }
            else {
                delete path.path2d;
            }
            if (path.path2d || !this.raw) {
                continue;
            }
            path.path2d = new Path2D();
            path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
            this.raw.forEach((pos, i) => {
                var _a;
                if (i > 0) {
                    (_a = path.path2d) === null || _a === void 0 ? void 0 : _a.lineTo(pos.x, pos.y);
                }
            });
            path.path2d.closePath();
        }
    }
    async initRawData(force) {
        const options = this.options;
        if (options.url) {
            this.raw = await this.downloadSvgPath(options.url, force);
        }
        else if (options.data) {
            const data = options.data;
            let svg;
            if (typeof data !== "string") {
                const path = data.path instanceof Array
                    ? data.path.map((t) => `<path d="${t}" />`).join("")
                    : `<path d="${data.path}" />`;
                const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
            }
            else {
                svg = data;
            }
            this.raw = this.parseSvgPath(svg, force);
        }
        this.createPath2D();
        __classPrivateFieldGet(this, _PolygonMaskInstance_engine, "f").dispatchEvent("polygonMaskLoaded", {
            container: this.container,
        });
    }
}
_PolygonMaskInstance_engine = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadPolygonMaskPlugin": () => (/* binding */ loadPolygonMaskPlugin)
/* harmony export */ });
/* harmony import */ var _Options_Classes_PolygonMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options/Classes/PolygonMask */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Classes/PolygonMask.js");
/* harmony import */ var _PolygonMaskInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PolygonMaskInstance */ "./node_modules/tsparticles-plugin-polygon-mask/esm/PolygonMaskInstance.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Enums_PolygonMaskInlineArrangement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enums/PolygonMaskInlineArrangement */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskInlineArrangement.js");
/* harmony import */ var _Enums_PolygonMaskMoveType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Enums/PolygonMaskMoveType */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskMoveType.js");
/* harmony import */ var _Enums_PolygonMaskType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Enums/PolygonMaskType */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Enums/PolygonMaskType.js");
/* harmony import */ var _Options_Interfaces_IPolygonMaskOptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Options/Interfaces/IPolygonMaskOptions */ "./node_modules/tsparticles-plugin-polygon-mask/esm/Options/Interfaces/IPolygonMaskOptions.js");
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
var _PolygonMaskPlugin_engine;



class PolygonMaskPlugin {
    constructor(engine) {
        _PolygonMaskPlugin_engine.set(this, void 0);
        this.id = "polygonMask";
        __classPrivateFieldSet(this, _PolygonMaskPlugin_engine, engine, "f");
    }
    getPlugin(container) {
        return new _PolygonMaskInstance__WEBPACK_IMPORTED_MODULE_1__.PolygonMaskInstance(container, __classPrivateFieldGet(this, _PolygonMaskPlugin_engine, "f"));
    }
    needsPlugin(options) {
        var _a, _b, _c;
        return ((_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : (((_c = options === null || options === void 0 ? void 0 : options.polygon) === null || _c === void 0 ? void 0 : _c.type) !== undefined && options.polygon.type !== "none"));
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        let polygonOptions = optionsCast.polygon;
        if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === undefined) {
            optionsCast.polygon = polygonOptions = new _Options_Classes_PolygonMask__WEBPACK_IMPORTED_MODULE_0__.PolygonMask();
        }
        polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
    }
}
_PolygonMaskPlugin_engine = new WeakMap();
async function loadPolygonMaskPlugin(engine) {
    if (!(0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__.isSsr)() && !("SVGPathSeg" in window)) {
        await __webpack_require__.e(/*! import() */ "npm.tsparticles-plugin-polygon-mask").then(__webpack_require__.t.bind(__webpack_require__, /*! ./pathseg.js */ "./node_modules/tsparticles-plugin-polygon-mask/esm/pathseg.js", 23));
    }
    const plugin = new PolygonMaskPlugin(engine);
    await engine.addPlugin(plugin);
}






/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/pathseg.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/pathseg.js ***!
  \*********************************************************************/
/***/ (() => {


(function () {
    "use strict";
    try {
        if (typeof window === "undefined")
            return;
        if (!("SVGPathSeg" in window)) {
            window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
                this.pathSegType = type;
                this.pathSegTypeAsLetter = typeAsLetter;
                this._owningPathSegList = owningPathSegList;
            };
            window.SVGPathSeg.prototype.classname = "SVGPathSeg";
            window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
            window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
            window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
            window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
            window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
            window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
            window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
            window.SVGPathSeg.PATHSEG_ARC_REL = 11;
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
            window.SVGPathSeg.prototype._segmentChanged = function () {
                if (this._owningPathSegList)
                    this._owningPathSegList.segmentChanged(this);
            };
            window.SVGPathSegClosePath = function (owningPathSegList) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
            };
            window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegClosePath.prototype.toString = function () {
                return "[object SVGPathSegClosePath]";
            };
            window.SVGPathSegClosePath.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter;
            };
            window.SVGPathSegClosePath.prototype.clone = function () {
                return new window.SVGPathSegClosePath(undefined);
            };
            window.SVGPathSegMovetoAbs = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegMovetoAbs.prototype.toString = function () {
                return "[object SVGPathSegMovetoAbs]";
            };
            window.SVGPathSegMovetoAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegMovetoAbs.prototype.clone = function () {
                return new window.SVGPathSegMovetoAbs(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegMovetoRel = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegMovetoRel.prototype.toString = function () {
                return "[object SVGPathSegMovetoRel]";
            };
            window.SVGPathSegMovetoRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegMovetoRel.prototype.clone = function () {
                return new window.SVGPathSegMovetoRel(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoAbs = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoAbs.prototype.toString = function () {
                return "[object SVGPathSegLinetoAbs]";
            };
            window.SVGPathSegLinetoAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegLinetoAbs.prototype.clone = function () {
                return new window.SVGPathSegLinetoAbs(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoRel = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoRel.prototype.toString = function () {
                return "[object SVGPathSegLinetoRel]";
            };
            window.SVGPathSegLinetoRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegLinetoRel.prototype.clone = function () {
                return new window.SVGPathSegLinetoRel(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoCubicAbs = function (owningPathSegList, x, y, x1, y1, x2, y2) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x1 = x1;
                this._y1 = y1;
                this._x2 = x2;
                this._y2 = y2;
            };
            window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
                return "[object SVGPathSegCurvetoCubicAbs]";
            };
            window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
                return (this.pathSegTypeAsLetter +
                    " " +
                    this._x1 +
                    " " +
                    this._y1 +
                    " " +
                    this._x2 +
                    " " +
                    this._y2 +
                    " " +
                    this._x +
                    " " +
                    this._y);
            };
            window.SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
                return new window.SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
                get: function () {
                    return this._x1;
                },
                set: function (x1) {
                    this._x1 = x1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
                get: function () {
                    return this._y1;
                },
                set: function (y1) {
                    this._y1 = y1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
                get: function () {
                    return this._x2;
                },
                set: function (x2) {
                    this._x2 = x2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
                get: function () {
                    return this._y2;
                },
                set: function (y2) {
                    this._y2 = y2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoCubicRel = function (owningPathSegList, x, y, x1, y1, x2, y2) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x1 = x1;
                this._y1 = y1;
                this._x2 = x2;
                this._y2 = y2;
            };
            window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicRel.prototype.toString = function () {
                return "[object SVGPathSegCurvetoCubicRel]";
            };
            window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
                return (this.pathSegTypeAsLetter +
                    " " +
                    this._x1 +
                    " " +
                    this._y1 +
                    " " +
                    this._x2 +
                    " " +
                    this._y2 +
                    " " +
                    this._x +
                    " " +
                    this._y);
            };
            window.SVGPathSegCurvetoCubicRel.prototype.clone = function () {
                return new window.SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
                get: function () {
                    return this._x1;
                },
                set: function (x1) {
                    this._x1 = x1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
                get: function () {
                    return this._y1;
                },
                set: function (y1) {
                    this._y1 = y1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
                get: function () {
                    return this._x2;
                },
                set: function (x2) {
                    this._x2 = x2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
                get: function () {
                    return this._y2;
                },
                set: function (y2) {
                    this._y2 = y2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoQuadraticAbs = function (owningPathSegList, x, y, x1, y1) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x1 = x1;
                this._y1 = y1;
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
                return "[object SVGPathSegCurvetoQuadraticAbs]";
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
                return new window.SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1);
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
                get: function () {
                    return this._x1;
                },
                set: function (x1) {
                    this._x1 = x1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
                get: function () {
                    return this._y1;
                },
                set: function (y1) {
                    this._y1 = y1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoQuadraticRel = function (owningPathSegList, x, y, x1, y1) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x1 = x1;
                this._y1 = y1;
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
                return "[object SVGPathSegCurvetoQuadraticRel]";
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
                return new window.SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1);
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
                get: function () {
                    return this._x1;
                },
                set: function (x1) {
                    this._x1 = x1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
                get: function () {
                    return this._y1;
                },
                set: function (y1) {
                    this._y1 = y1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegArcAbs = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
                this._x = x;
                this._y = y;
                this._r1 = r1;
                this._r2 = r2;
                this._angle = angle;
                this._largeArcFlag = largeArcFlag;
                this._sweepFlag = sweepFlag;
            };
            window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegArcAbs.prototype.toString = function () {
                return "[object SVGPathSegArcAbs]";
            };
            window.SVGPathSegArcAbs.prototype._asPathString = function () {
                return (this.pathSegTypeAsLetter +
                    " " +
                    this._r1 +
                    " " +
                    this._r2 +
                    " " +
                    this._angle +
                    " " +
                    (this._largeArcFlag ? "1" : "0") +
                    " " +
                    (this._sweepFlag ? "1" : "0") +
                    " " +
                    this._x +
                    " " +
                    this._y);
            };
            window.SVGPathSegArcAbs.prototype.clone = function () {
                return new window.SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
            };
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
                get: function () {
                    return this._r1;
                },
                set: function (r1) {
                    this._r1 = r1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
                get: function () {
                    return this._r2;
                },
                set: function (r2) {
                    this._r2 = r2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
                get: function () {
                    return this._angle;
                },
                set: function (angle) {
                    this._angle = angle;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
                get: function () {
                    return this._largeArcFlag;
                },
                set: function (largeArcFlag) {
                    this._largeArcFlag = largeArcFlag;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
                get: function () {
                    return this._sweepFlag;
                },
                set: function (sweepFlag) {
                    this._sweepFlag = sweepFlag;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegArcRel = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
                this._x = x;
                this._y = y;
                this._r1 = r1;
                this._r2 = r2;
                this._angle = angle;
                this._largeArcFlag = largeArcFlag;
                this._sweepFlag = sweepFlag;
            };
            window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegArcRel.prototype.toString = function () {
                return "[object SVGPathSegArcRel]";
            };
            window.SVGPathSegArcRel.prototype._asPathString = function () {
                return (this.pathSegTypeAsLetter +
                    " " +
                    this._r1 +
                    " " +
                    this._r2 +
                    " " +
                    this._angle +
                    " " +
                    (this._largeArcFlag ? "1" : "0") +
                    " " +
                    (this._sweepFlag ? "1" : "0") +
                    " " +
                    this._x +
                    " " +
                    this._y);
            };
            window.SVGPathSegArcRel.prototype.clone = function () {
                return new window.SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
            };
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
                get: function () {
                    return this._r1;
                },
                set: function (r1) {
                    this._r1 = r1;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
                get: function () {
                    return this._r2;
                },
                set: function (r2) {
                    this._r2 = r2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
                get: function () {
                    return this._angle;
                },
                set: function (angle) {
                    this._angle = angle;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
                get: function () {
                    return this._largeArcFlag;
                },
                set: function (largeArcFlag) {
                    this._largeArcFlag = largeArcFlag;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
                get: function () {
                    return this._sweepFlag;
                },
                set: function (sweepFlag) {
                    this._sweepFlag = sweepFlag;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoHorizontalAbs = function (owningPathSegList, x) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
                this._x = x;
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
                return "[object SVGPathSegLinetoHorizontalAbs]";
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x;
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
                return new window.SVGPathSegLinetoHorizontalAbs(undefined, this._x);
            };
            Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoHorizontalRel = function (owningPathSegList, x) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
                this._x = x;
            };
            window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
                return "[object SVGPathSegLinetoHorizontalRel]";
            };
            window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x;
            };
            window.SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
                return new window.SVGPathSegLinetoHorizontalRel(undefined, this._x);
            };
            Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoVerticalAbs = function (owningPathSegList, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
                this._y = y;
            };
            window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
                return "[object SVGPathSegLinetoVerticalAbs]";
            };
            window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._y;
            };
            window.SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
                return new window.SVGPathSegLinetoVerticalAbs(undefined, this._y);
            };
            Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegLinetoVerticalRel = function (owningPathSegList, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
                this._y = y;
            };
            window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoVerticalRel.prototype.toString = function () {
                return "[object SVGPathSegLinetoVerticalRel]";
            };
            window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._y;
            };
            window.SVGPathSegLinetoVerticalRel.prototype.clone = function () {
                return new window.SVGPathSegLinetoVerticalRel(undefined, this._y);
            };
            Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoCubicSmoothAbs = function (owningPathSegList, x, y, x2, y2) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x2 = x2;
                this._y2 = y2;
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
                return "[object SVGPathSegCurvetoCubicSmoothAbs]";
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
                return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2);
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
                get: function () {
                    return this._x2;
                },
                set: function (x2) {
                    this._x2 = x2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
                get: function () {
                    return this._y2;
                },
                set: function (y2) {
                    this._y2 = y2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoCubicSmoothRel = function (owningPathSegList, x, y, x2, y2) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
                this._x = x;
                this._y = y;
                this._x2 = x2;
                this._y2 = y2;
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
                return "[object SVGPathSegCurvetoCubicSmoothRel]";
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
                return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2);
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
                get: function () {
                    return this._x2;
                },
                set: function (x2) {
                    this._x2 = x2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
                get: function () {
                    return this._y2;
                },
                set: function (y2) {
                    this._y2 = y2;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoQuadraticSmoothAbs = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () {
                return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () {
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathSegCurvetoQuadraticSmoothRel = function (owningPathSegList, x, y) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
                this._x = x;
                this._y = y;
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () {
                return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () {
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y);
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    this._segmentChanged();
                },
                enumerable: true,
            });
            window.SVGPathElement.prototype.createSVGPathSegClosePath = function () {
                return new window.SVGPathSegClosePath(undefined);
            };
            window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (x, y) {
                return new window.SVGPathSegMovetoAbs(undefined, x, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function (x, y) {
                return new window.SVGPathSegMovetoRel(undefined, x, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (x, y) {
                return new window.SVGPathSegLinetoAbs(undefined, x, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function (x, y) {
                return new window.SVGPathSegLinetoRel(undefined, x, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (x, y, x1, y1, x2, y2) {
                return new window.SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (x, y, x1, y1, x2, y2) {
                return new window.SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (x, y, x1, y1) {
                return new window.SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (x, y, x1, y1) {
                return new window.SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1);
            };
            window.SVGPathElement.prototype.createSVGPathSegArcAbs = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
                return new window.SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
            };
            window.SVGPathElement.prototype.createSVGPathSegArcRel = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
                return new window.SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (x) {
                return new window.SVGPathSegLinetoHorizontalAbs(undefined, x);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (x) {
                return new window.SVGPathSegLinetoHorizontalRel(undefined, x);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (y) {
                return new window.SVGPathSegLinetoVerticalAbs(undefined, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (y) {
                return new window.SVGPathSegLinetoVerticalRel(undefined, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (x, y, x2, y2) {
                return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (x, y, x2, y2) {
                return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (x, y) {
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y);
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (x, y) {
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y);
            };
            if (!("getPathSegAtLength" in window.SVGPathElement.prototype)) {
                window.SVGPathElement.prototype.getPathSegAtLength = function (distance) {
                    if (distance === undefined || !isFinite(distance))
                        throw "Invalid arguments.";
                    const measurementElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    measurementElement.setAttribute("d", this.getAttribute("d"));
                    let lastPathSegment = measurementElement.pathSegList.numberOfItems - 1;
                    if (lastPathSegment <= 0)
                        return 0;
                    do {
                        measurementElement.pathSegList.removeItem(lastPathSegment);
                        if (distance > measurementElement.getTotalLength())
                            break;
                        lastPathSegment--;
                    } while (lastPathSegment > 0);
                    return lastPathSegment;
                };
            }
        }
        if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
            window.SVGPathSegList = function (pathElement) {
                this._pathElement = pathElement;
                this._list = this._parsePath(this._pathElement.getAttribute("d"));
                this._mutationObserverConfig = { attributes: true, attributeFilter: ["d"] };
                this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
                this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
            };
            window.SVGPathSegList.prototype.classname = "SVGPathSegList";
            Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
                get: function () {
                    this._checkPathSynchronizedToList();
                    return this._list.length;
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathSegList.prototype, "length", {
                get: function () {
                    this._checkPathSynchronizedToList();
                    return this._list.length;
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
                get: function () {
                    if (!this._pathSegList)
                        this._pathSegList = new window.SVGPathSegList(this);
                    return this._pathSegList;
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
                get: function () {
                    return this.pathSegList;
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
                get: function () {
                    return this.pathSegList;
                },
                enumerable: true,
            });
            Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
                get: function () {
                    return this.pathSegList;
                },
                enumerable: true,
            });
            window.SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
                this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
            };
            window.SVGPathSegList.prototype._updateListFromPathMutations = function (mutationRecords) {
                if (!this._pathElement)
                    return;
                let hasPathMutations = false;
                mutationRecords.forEach(function (record) {
                    if (record.attributeName == "d")
                        hasPathMutations = true;
                });
                if (hasPathMutations)
                    this._list = this._parsePath(this._pathElement.getAttribute("d"));
            };
            window.SVGPathSegList.prototype._writeListToPath = function () {
                this._pathElementMutationObserver.disconnect();
                this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
                this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
            };
            window.SVGPathSegList.prototype.segmentChanged = function (pathSeg) {
                this._writeListToPath();
            };
            window.SVGPathSegList.prototype.clear = function () {
                this._checkPathSynchronizedToList();
                this._list.forEach(function (pathSeg) {
                    pathSeg._owningPathSegList = null;
                });
                this._list = [];
                this._writeListToPath();
            };
            window.SVGPathSegList.prototype.initialize = function (newItem) {
                this._checkPathSynchronizedToList();
                this._list = [newItem];
                newItem._owningPathSegList = this;
                this._writeListToPath();
                return newItem;
            };
            window.SVGPathSegList.prototype._checkValidIndex = function (index) {
                if (isNaN(index) || index < 0 || index >= this.numberOfItems)
                    throw "INDEX_SIZE_ERR";
            };
            window.SVGPathSegList.prototype.getItem = function (index) {
                this._checkPathSynchronizedToList();
                this._checkValidIndex(index);
                return this._list[index];
            };
            window.SVGPathSegList.prototype.insertItemBefore = function (newItem, index) {
                this._checkPathSynchronizedToList();
                if (index > this.numberOfItems)
                    index = this.numberOfItems;
                if (newItem._owningPathSegList) {
                    newItem = newItem.clone();
                }
                this._list.splice(index, 0, newItem);
                newItem._owningPathSegList = this;
                this._writeListToPath();
                return newItem;
            };
            window.SVGPathSegList.prototype.replaceItem = function (newItem, index) {
                this._checkPathSynchronizedToList();
                if (newItem._owningPathSegList) {
                    newItem = newItem.clone();
                }
                this._checkValidIndex(index);
                this._list[index] = newItem;
                newItem._owningPathSegList = this;
                this._writeListToPath();
                return newItem;
            };
            window.SVGPathSegList.prototype.removeItem = function (index) {
                this._checkPathSynchronizedToList();
                this._checkValidIndex(index);
                const item = this._list[index];
                this._list.splice(index, 1);
                this._writeListToPath();
                return item;
            };
            window.SVGPathSegList.prototype.appendItem = function (newItem) {
                this._checkPathSynchronizedToList();
                if (newItem._owningPathSegList) {
                    newItem = newItem.clone();
                }
                this._list.push(newItem);
                newItem._owningPathSegList = this;
                this._writeListToPath();
                return newItem;
            };
            window.SVGPathSegList._pathSegArrayAsString = function (pathSegArray) {
                let string = "";
                let first = true;
                pathSegArray.forEach(function (pathSeg) {
                    if (first) {
                        first = false;
                        string += pathSeg._asPathString();
                    }
                    else {
                        string += " " + pathSeg._asPathString();
                    }
                });
                return string;
            };
            window.SVGPathSegList.prototype._parsePath = function (string) {
                if (!string || string.length == 0)
                    return [];
                const owningPathSegList = this;
                const Builder = function () {
                    this.pathSegList = [];
                };
                Builder.prototype.appendSegment = function (pathSeg) {
                    this.pathSegList.push(pathSeg);
                };
                const Source = function (string) {
                    this._string = string;
                    this._currentIndex = 0;
                    this._endIndex = this._string.length;
                    this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;
                    this._skipOptionalSpaces();
                };
                Source.prototype._isCurrentSpace = function () {
                    const character = this._string[this._currentIndex];
                    return (character <= " " &&
                        (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f"));
                };
                Source.prototype._skipOptionalSpaces = function () {
                    while (this._currentIndex < this._endIndex && this._isCurrentSpace())
                        this._currentIndex++;
                    return this._currentIndex < this._endIndex;
                };
                Source.prototype._skipOptionalSpacesOrDelimiter = function () {
                    if (this._currentIndex < this._endIndex &&
                        !this._isCurrentSpace() &&
                        this._string.charAt(this._currentIndex) != ",")
                        return false;
                    if (this._skipOptionalSpaces()) {
                        if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                            this._currentIndex++;
                            this._skipOptionalSpaces();
                        }
                    }
                    return this._currentIndex < this._endIndex;
                };
                Source.prototype.hasMoreData = function () {
                    return this._currentIndex < this._endIndex;
                };
                Source.prototype.peekSegmentType = function () {
                    const lookahead = this._string[this._currentIndex];
                    return this._pathSegTypeFromChar(lookahead);
                };
                Source.prototype._pathSegTypeFromChar = function (lookahead) {
                    switch (lookahead) {
                        case "Z":
                        case "z":
                            return window.SVGPathSeg.PATHSEG_CLOSEPATH;
                        case "M":
                            return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
                        case "m":
                            return window.SVGPathSeg.PATHSEG_MOVETO_REL;
                        case "L":
                            return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                        case "l":
                            return window.SVGPathSeg.PATHSEG_LINETO_REL;
                        case "C":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                        case "c":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                        case "Q":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                        case "q":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                        case "A":
                            return window.SVGPathSeg.PATHSEG_ARC_ABS;
                        case "a":
                            return window.SVGPathSeg.PATHSEG_ARC_REL;
                        case "H":
                            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                        case "h":
                            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                        case "V":
                            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                        case "v":
                            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                        case "S":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                        case "s":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                        case "T":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                        case "t":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                        default:
                            return window.SVGPathSeg.PATHSEG_UNKNOWN;
                    }
                };
                Source.prototype._nextCommandHelper = function (lookahead, previousCommand) {
                    if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) &&
                        previousCommand != window.SVGPathSeg.PATHSEG_CLOSEPATH) {
                        if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_ABS)
                            return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                        if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_REL)
                            return window.SVGPathSeg.PATHSEG_LINETO_REL;
                        return previousCommand;
                    }
                    return window.SVGPathSeg.PATHSEG_UNKNOWN;
                };
                Source.prototype.initialCommandIsMoveTo = function () {
                    if (!this.hasMoreData())
                        return true;
                    const command = this.peekSegmentType();
                    return command == window.SVGPathSeg.PATHSEG_MOVETO_ABS || command == window.SVGPathSeg.PATHSEG_MOVETO_REL;
                };
                Source.prototype._parseNumber = function () {
                    let exponent = 0;
                    let integer = 0;
                    let frac = 1;
                    let decimal = 0;
                    let sign = 1;
                    let expsign = 1;
                    const startIndex = this._currentIndex;
                    this._skipOptionalSpaces();
                    if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
                        this._currentIndex++;
                    else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                        this._currentIndex++;
                        sign = -1;
                    }
                    if (this._currentIndex == this._endIndex ||
                        ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") &&
                            this._string.charAt(this._currentIndex) != "."))
                        return undefined;
                    const startIntPartIndex = this._currentIndex;
                    while (this._currentIndex < this._endIndex &&
                        this._string.charAt(this._currentIndex) >= "0" &&
                        this._string.charAt(this._currentIndex) <= "9")
                        this._currentIndex++;
                    if (this._currentIndex != startIntPartIndex) {
                        let scanIntPartIndex = this._currentIndex - 1;
                        let multiplier = 1;
                        while (scanIntPartIndex >= startIntPartIndex) {
                            integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                            multiplier *= 10;
                        }
                    }
                    if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                        this._currentIndex++;
                        if (this._currentIndex >= this._endIndex ||
                            this._string.charAt(this._currentIndex) < "0" ||
                            this._string.charAt(this._currentIndex) > "9")
                            return undefined;
                        while (this._currentIndex < this._endIndex &&
                            this._string.charAt(this._currentIndex) >= "0" &&
                            this._string.charAt(this._currentIndex) <= "9") {
                            frac *= 10;
                            decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
                            this._currentIndex += 1;
                        }
                    }
                    if (this._currentIndex != startIndex &&
                        this._currentIndex + 1 < this._endIndex &&
                        (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") &&
                        this._string.charAt(this._currentIndex + 1) != "x" &&
                        this._string.charAt(this._currentIndex + 1) != "m") {
                        this._currentIndex++;
                        if (this._string.charAt(this._currentIndex) == "+") {
                            this._currentIndex++;
                        }
                        else if (this._string.charAt(this._currentIndex) == "-") {
                            this._currentIndex++;
                            expsign = -1;
                        }
                        if (this._currentIndex >= this._endIndex ||
                            this._string.charAt(this._currentIndex) < "0" ||
                            this._string.charAt(this._currentIndex) > "9")
                            return undefined;
                        while (this._currentIndex < this._endIndex &&
                            this._string.charAt(this._currentIndex) >= "0" &&
                            this._string.charAt(this._currentIndex) <= "9") {
                            exponent *= 10;
                            exponent += this._string.charAt(this._currentIndex) - "0";
                            this._currentIndex++;
                        }
                    }
                    let number = integer + decimal;
                    number *= sign;
                    if (exponent)
                        number *= Math.pow(10, expsign * exponent);
                    if (startIndex == this._currentIndex)
                        return undefined;
                    this._skipOptionalSpacesOrDelimiter();
                    return number;
                };
                Source.prototype._parseArcFlag = function () {
                    if (this._currentIndex >= this._endIndex)
                        return undefined;
                    let flag = false;
                    const flagChar = this._string.charAt(this._currentIndex++);
                    if (flagChar == "0")
                        flag = false;
                    else if (flagChar == "1")
                        flag = true;
                    else
                        return undefined;
                    this._skipOptionalSpacesOrDelimiter();
                    return flag;
                };
                Source.prototype.parseSegment = function () {
                    const lookahead = this._string[this._currentIndex];
                    let command = this._pathSegTypeFromChar(lookahead);
                    if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) {
                        if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
                            return null;
                        command = this._nextCommandHelper(lookahead, this._previousCommand);
                        if (command == window.SVGPathSeg.PATHSEG_UNKNOWN)
                            return null;
                    }
                    else {
                        this._currentIndex++;
                    }
                    this._previousCommand = command;
                    let points;
                    switch (command) {
                        case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                            return new window.SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                            return new window.SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_REL:
                            return new window.SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                            return new window.SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                            return new window.SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                            return new window.SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                            return new window.SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                            return new window.SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                            this._skipOptionalSpaces();
                            return new window.SVGPathSegClosePath(owningPathSegList);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                            points = {
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                            points = {
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                            return new window.SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                            return new window.SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_ARC_REL:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                arcAngle: this._parseNumber(),
                                arcLarge: this._parseArcFlag(),
                                arcSweep: this._parseArcFlag(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                        case window.SVGPathSeg.PATHSEG_ARC_ABS:
                            points = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                arcAngle: this._parseNumber(),
                                arcLarge: this._parseArcFlag(),
                                arcSweep: this._parseArcFlag(),
                                x: this._parseNumber(),
                                y: this._parseNumber(),
                            };
                            return new window.SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                        default:
                            throw "Unknown path seg type.";
                    }
                };
                const builder = new Builder();
                const source = new Source(string);
                if (!source.initialCommandIsMoveTo())
                    return [];
                while (source.hasMoreData()) {
                    const pathSeg = source.parseSegment();
                    if (!pathSeg)
                        return [];
                    builder.appendSegment(pathSeg);
                }
                return builder.pathSegList;
            };
        }
    }
    catch (e) {
        console.warn("An error occurred in tsParticles pathseg polyfill. If the Polygon Mask is not working, please open an issue here: https://github.com/matteobruni/tsparticles", e);
    }
})();


/***/ }),

/***/ "./node_modules/tsparticles-plugin-polygon-mask/esm/utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-polygon-mask/esm/utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcClosestPtOnSegment": () => (/* binding */ calcClosestPtOnSegment),
/* harmony export */   "drawPolygonMask": () => (/* binding */ drawPolygonMask),
/* harmony export */   "drawPolygonMaskPath": () => (/* binding */ drawPolygonMaskPath),
/* harmony export */   "parsePaths": () => (/* binding */ parsePaths),
/* harmony export */   "segmentBounce": () => (/* binding */ segmentBounce)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function drawPolygonMask(context, rawData, stroke) {
    const color = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(stroke.color);
    if (!color) {
        return;
    }
    context.beginPath();
    context.moveTo(rawData[0].x, rawData[0].y);
    for (const item of rawData) {
        context.lineTo(item.x, item.y);
    }
    context.closePath();
    context.strokeStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(color);
    context.lineWidth = stroke.width;
    context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
    context.translate(position.x, position.y);
    const color = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(stroke.color);
    if (!color) {
        return;
    }
    context.strokeStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(color, stroke.opacity);
    context.lineWidth = stroke.width;
    context.stroke(path);
}
function parsePaths(paths, scale, offset) {
    var _a;
    const res = [];
    for (const path of paths) {
        const segments = path.element.pathSegList, len = (_a = segments === null || segments === void 0 ? void 0 : segments.numberOfItems) !== null && _a !== void 0 ? _a : 0, p = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < len; i++) {
            const segment = segments === null || segments === void 0 ? void 0 : segments.getItem(i);
            const svgPathSeg = window.SVGPathSeg;
            switch (segment === null || segment === void 0 ? void 0 : segment.pathSegType) {
                case svgPathSeg.PATHSEG_MOVETO_ABS:
                case svgPathSeg.PATHSEG_LINETO_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case svgPathSeg.PATHSEG_ARC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                    const absSeg = segment;
                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = segment.y;
                    break;
                case svgPathSeg.PATHSEG_LINETO_REL:
                case svgPathSeg.PATHSEG_MOVETO_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case svgPathSeg.PATHSEG_ARC_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                    const relSeg = segment;
                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += segment.y;
                    break;
                case svgPathSeg.PATHSEG_UNKNOWN:
                case svgPathSeg.PATHSEG_CLOSEPATH:
                    continue;
            }
            res.push({
                x: p.x * scale + offset.x,
                y: p.y * scale + offset.y,
            });
        }
    }
    return res;
}
function calcClosestPtOnSegment(s1, s2, pos) {
    const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(pos, s1), { dx: dxx, dy: dyy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(s2, s1), t = (dx * dxx + dy * dyy) / (dxx ** 2 + dyy ** 2), res = {
        x: s1.x + dxx * t,
        y: s1.x + dyy * t,
        isOnSegment: t >= 0 && t <= 1,
    };
    if (t < 0) {
        res.x = s1.x;
        res.y = s1.y;
    }
    else if (t > 1) {
        res.x = s2.x;
        res.y = s2.y;
    }
    return res;
}
function segmentBounce(start, stop, velocity) {
    const { dx, dy } = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(start, stop), wallAngle = Math.atan2(dy, dx), wallNormal = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)), d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);
    wallNormal.multTo(d);
    velocity.subFrom(wallNormal);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFVOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTBDO0FBQ0k7QUFDSTtBQUNSO0FBQ0o7QUFDekM7QUFDUDtBQUNBLHdCQUF3Qiw2REFBZTtBQUN2QztBQUNBLDBCQUEwQixpRUFBaUI7QUFDM0Msd0JBQXdCLDZEQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxRUFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsOERBQVUsR0FBRztBQUN6QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRrRDtBQUNjO0FBQ3pEO0FBQ1A7QUFDQTtBQUNBLDBCQUEwQix5RUFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtRUFBbUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ2lFO0FBQzFEO0FBQ1A7QUFDQSx5QkFBeUIsNERBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtRUFBbUI7QUFDeEM7QUFDQSxpQ0FBaUMsaUVBQWE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1pPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEJVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBViw4QkFBOEIsU0FBSSxJQUFJLFNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixTQUFJLElBQUksU0FBSTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tIO0FBQ2M7QUFDcEU7QUFDckQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscUVBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4REFBVSxHQUFHO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyREFBbUI7QUFDbkM7QUFDQTtBQUNBLGdCQUFnQix1REFBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHFCQUFxQjtBQUMxRTtBQUNBLDBCQUEwQiw4REFBc0I7QUFDaEQsNkJBQTZCLGdFQUFZO0FBQ3pDO0FBQ0E7QUFDQSxvQkFBb0IscURBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0RBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDhEQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0RBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtRUFBbUI7QUFDL0M7QUFDQSx1QkFBdUIsaUVBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1FQUFtQjtBQUMvQztBQUNBLHFCQUFxQixpRUFBYTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUVBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1FQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEVBQUU7QUFDekQsa0NBQWtDLFVBQVU7QUFDNUM7QUFDQSw4QkFBOEIsWUFBWSxTQUFTLGdCQUFnQixZQUFZLGlCQUFpQixJQUFJLEtBQUs7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RYQSw4QkFBOEIsU0FBSSxJQUFJLFNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixTQUFJLElBQUksU0FBSTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzREO0FBQ0E7QUFDakI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUVBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxxRUFBVztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxTQUFTLHlEQUFLO0FBQ2QsY0FBYywyTkFBc0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDcUQ7QUFDVDtBQUNKO0FBQ2lCOzs7Ozs7Ozs7OztBQ25ENUM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqZ0RzRjtBQUNoRjtBQUNQLGtCQUFrQiw4REFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGtCQUFrQiw4REFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLFNBQVMsRUFBRSxnRUFBWSxhQUFhLG1CQUFtQixFQUFFLGdFQUFZO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFlBQVksU0FBUyxFQUFFLGdFQUFZLDREQUE0RCw2REFBYTtBQUM1RztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vRW51bXMvUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vRW51bXMvUG9seWdvbk1hc2tNb3ZlVHlwZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vRW51bXMvUG9seWdvbk1hc2tUeXBlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tcG9seWdvbi1tYXNrL2VzbS9PcHRpb25zL0NsYXNzZXMvUG9seWdvbk1hc2suanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2svZXNtL09wdGlvbnMvQ2xhc3Nlcy9Qb2x5Z29uTWFza0RyYXcuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2svZXNtL09wdGlvbnMvQ2xhc3Nlcy9Qb2x5Z29uTWFza0RyYXdTdHJva2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2svZXNtL09wdGlvbnMvQ2xhc3Nlcy9Qb2x5Z29uTWFza0lubGluZS5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vT3B0aW9ucy9DbGFzc2VzL1BvbHlnb25NYXNrTG9jYWxTdmcuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2svZXNtL09wdGlvbnMvQ2xhc3Nlcy9Qb2x5Z29uTWFza01vdmUuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXBsdWdpbi1wb2x5Z29uLW1hc2svZXNtL09wdGlvbnMvSW50ZXJmYWNlcy9JUG9seWdvbk1hc2tPcHRpb25zLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tcG9seWdvbi1tYXNrL2VzbS9Qb2x5Z29uTWFza0luc3RhbmNlLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1wbHVnaW4tcG9seWdvbi1tYXNrL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vcGF0aHNlZy5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGx1Z2luLXBvbHlnb24tbWFzay9lc20vdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgUG9seWdvbk1hc2tEcmF3IH0gZnJvbSBcIi4vUG9seWdvbk1hc2tEcmF3XCI7XG5pbXBvcnQgeyBQb2x5Z29uTWFza0lubGluZSB9IGZyb20gXCIuL1BvbHlnb25NYXNrSW5saW5lXCI7XG5pbXBvcnQgeyBQb2x5Z29uTWFza0xvY2FsU3ZnIH0gZnJvbSBcIi4vUG9seWdvbk1hc2tMb2NhbFN2Z1wiO1xuaW1wb3J0IHsgUG9seWdvbk1hc2tNb3ZlIH0gZnJvbSBcIi4vUG9seWdvbk1hc2tNb3ZlXCI7XG5pbXBvcnQgeyBkZWVwRXh0ZW5kIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGNsYXNzIFBvbHlnb25NYXNrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kcmF3ID0gbmV3IFBvbHlnb25NYXNrRHJhdygpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlubGluZSA9IG5ldyBQb2x5Z29uTWFza0lubGluZSgpO1xuICAgICAgICB0aGlzLm1vdmUgPSBuZXcgUG9seWdvbk1hc2tNb3ZlKCk7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgZ2V0IGlubGluZUFycmFuZ2VtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmxpbmUuYXJyYW5nZW1lbnQ7XG4gICAgfVxuICAgIHNldCBpbmxpbmVBcnJhbmdlbWVudCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlubGluZS5hcnJhbmdlbWVudCA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3LmxvYWQoZGF0YS5kcmF3KTtcbiAgICAgICAgdGhpcy5pbmxpbmUubG9hZChkYXRhLmlubGluZSk7XG4gICAgICAgIHRoaXMubW92ZS5sb2FkKGRhdGEubW92ZSk7XG4gICAgICAgIGlmIChkYXRhLnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0aGlzLnR5cGUgIT09IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnVybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IGRhdGEudXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgUG9seWdvbk1hc2tMb2NhbFN2ZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5sb2FkKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGRlZXBFeHRlbmQoe30sIGRhdGEucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgT3B0aW9uc0NvbG9yIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgUG9seWdvbk1hc2tEcmF3U3Ryb2tlIH0gZnJvbSBcIi4vUG9seWdvbk1hc2tEcmF3U3Ryb2tlXCI7XG5leHBvcnQgY2xhc3MgUG9seWdvbk1hc2tEcmF3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdHJva2UgPSBuZXcgUG9seWdvbk1hc2tEcmF3U3Ryb2tlKCk7XG4gICAgfVxuICAgIGdldCBsaW5lV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9rZS53aWR0aDtcbiAgICB9XG4gICAgc2V0IGxpbmVXaWR0aCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnN0cm9rZS53aWR0aCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgbGluZUNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgfVxuICAgIHNldCBsaW5lQ29sb3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdHJva2UuY29sb3IgPSBPcHRpb25zQ29sb3IuY3JlYXRlKHRoaXMuc3Ryb2tlLmNvbG9yLCB2YWx1ZSk7XG4gICAgfVxuICAgIGxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0cm9rZSA9IChfYSA9IGRhdGEuc3Ryb2tlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7XG4gICAgICAgICAgICBjb2xvcjogZGF0YS5saW5lQ29sb3IsXG4gICAgICAgICAgICB3aWR0aDogZGF0YS5saW5lV2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3Ryb2tlLmxvYWQoc3Ryb2tlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQ29sb3IsIHN0cmluZ1RvQWxwaGEgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgY2xhc3MgUG9seWdvbk1hc2tEcmF3U3Ryb2tlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBPcHRpb25zQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDAuNTtcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvciA9IE9wdGlvbnNDb2xvci5jcmVhdGUodGhpcy5jb2xvciwgZGF0YS5jb2xvcik7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2xvci52YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gKF9hID0gc3RyaW5nVG9BbHBoYSh0aGlzLmNvbG9yLnZhbHVlKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gZGF0YS5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBvbHlnb25NYXNrSW5saW5lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlbWVudCA9IFwib25lLXBlci1wb2ludFwiO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYXJyYW5nZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hcnJhbmdlbWVudCA9IGRhdGEuYXJyYW5nZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUG9seWdvbk1hc2tMb2NhbFN2ZyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IFtdO1xuICAgICAgICB0aGlzLnNpemUgPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wYXRoID0gZGF0YS5wYXRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc2l6ZS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplLndpZHRoID0gZGF0YS5zaXplLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuc2l6ZS5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS5oZWlnaHQgPSBkYXRhLnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBvbHlnb25NYXNrTW92ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgICAgIHRoaXMudHlwZSA9IFwicGF0aFwiO1xuICAgIH1cbiAgICBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQge307XG4iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX1BvbHlnb25NYXNrSW5zdGFuY2VfZW5naW5lO1xuaW1wb3J0IHsgY2FsY0Nsb3Nlc3RQdE9uU2VnbWVudCwgZHJhd1BvbHlnb25NYXNrLCBkcmF3UG9seWdvbk1hc2tQYXRoLCBwYXJzZVBhdGhzLCBzZWdtZW50Qm91bmNlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGRlZXBFeHRlbmQsIGdldERpc3RhbmNlLCBnZXREaXN0YW5jZXMsIGl0ZW1Gcm9tQXJyYXksIG5vUG9seWdvbkRhdGFMb2FkZWQsIG5vUG9seWdvbkZvdW5kLCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmltcG9ydCB7IFBvbHlnb25NYXNrIH0gZnJvbSBcIi4vT3B0aW9ucy9DbGFzc2VzL1BvbHlnb25NYXNrXCI7XG5leHBvcnQgY2xhc3MgUG9seWdvbk1hc2tJbnN0YW5jZSB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBlbmdpbmUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF9Qb2x5Z29uTWFza0luc3RhbmNlX2VuZ2luZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfUG9seWdvbk1hc2tJbnN0YW5jZV9lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLmRpbWVuc2lvbiA9IHtcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhdGgyRFN1cHBvcnRlZCA9ICEhd2luZG93LlBhdGgyRDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFBvbHlnb25NYXNrKCk7XG4gICAgICAgIHRoaXMucG9seWdvbk1hc2tNb3ZlUmFkaXVzID0gdGhpcy5vcHRpb25zLm1vdmUucmFkaXVzICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvO1xuICAgIH1cbiAgICBhc3luYyBpbml0QXN5bmMob3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMubG9hZChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucG9seWdvbik7XG4gICAgICAgIGNvbnN0IHBvbHlnb25NYXNrT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5wb2x5Z29uTWFza01vdmVSYWRpdXMgPSBwb2x5Z29uTWFza09wdGlvbnMubW92ZS5yYWRpdXMgKiB0aGlzLmNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbztcbiAgICAgICAgaWYgKHBvbHlnb25NYXNrT3B0aW9ucy5lbmFibGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFJhd0RhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAoIShvcHRpb25zLmVuYWJsZSAmJiBvcHRpb25zLnR5cGUgIT09IFwibm9uZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlZHJhd1RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlZHJhd1RpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFJhd0RhdGEodHJ1ZSk7XG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIucGFydGljbGVzLnJlZHJhdygpO1xuICAgICAgICB9LCAyNTApO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBkZWxldGUgdGhpcy5yYXc7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBhdGhzO1xuICAgIH1cbiAgICBwYXJ0aWNsZXNJbml0aWFsaXphdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMuZW5hYmxlICYmXG4gICAgICAgICAgICBvcHRpb25zLnR5cGUgPT09IFwiaW5saW5lXCIgJiZcbiAgICAgICAgICAgIChvcHRpb25zLmlubGluZS5hcnJhbmdlbWVudCA9PT0gXCJvbmUtcGVyLXBvaW50XCIgfHxcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlubGluZS5hcnJhbmdlbWVudCA9PT0gXCJwZXItcG9pbnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BvaW50cygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwYXJ0aWNsZVBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmICghKG9wdGlvbnMuZW5hYmxlICYmICgoX2IgPSAoX2EgPSB0aGlzLnJhdykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCkgPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWVwRXh0ZW5kKHt9LCBwb3NpdGlvbiA/IHBvc2l0aW9uIDogdGhpcy5yYW5kb21Qb2ludCgpKTtcbiAgICB9XG4gICAgcGFydGljbGVCb3VuY2UocGFydGljbGUsIGRlbHRhLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9seWdvbkJvdW5jZShwYXJ0aWNsZSwgZGVsdGEsIGRpcmVjdGlvbik7XG4gICAgfVxuICAgIGNsaWNrUG9zaXRpb25WYWxpZChwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICByZXR1cm4gKG9wdGlvbnMuZW5hYmxlICYmXG4gICAgICAgICAgICBvcHRpb25zLnR5cGUgIT09IFwibm9uZVwiICYmXG4gICAgICAgICAgICBvcHRpb25zLnR5cGUgIT09IFwiaW5saW5lXCIgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJbnNpZGVQb2x5Z29uKHBvc2l0aW9uKSk7XG4gICAgfVxuICAgIGRyYXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghKChfYSA9IHRoaXMucGF0aHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucywgcG9seWdvbkRyYXcgPSBvcHRpb25zLmRyYXc7XG4gICAgICAgIGlmICghb3B0aW9ucy5lbmFibGUgfHwgIXBvbHlnb25EcmF3LmVuYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhd0RhdGEgPSB0aGlzLnJhdztcbiAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucGF0aHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGgyZCA9IHBhdGgucGF0aDJkLCBwYXRoMmRTdXBwb3J0ZWQgPSB0aGlzLnBhdGgyRFN1cHBvcnRlZDtcbiAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgyZFN1cHBvcnRlZCAmJiBwYXRoMmQgJiYgdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBkcmF3UG9seWdvbk1hc2tQYXRoKGNvbnRleHQsIHBhdGgyZCwgcG9seWdvbkRyYXcuc3Ryb2tlLCB0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyYXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgZHJhd1BvbHlnb25NYXNrKGNvbnRleHQsIHJhd0RhdGEsIHBvbHlnb25EcmF3LnN0cm9rZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcG9seWdvbkJvdW5jZShwYXJ0aWNsZSwgX2RlbHRhLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKCF0aGlzLnJhdyB8fCAhb3B0aW9ucy5lbmFibGUgfHwgZGlyZWN0aW9uICE9PSBcInRvcFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gXCJpbnNpZGVcIiB8fCBvcHRpb25zLnR5cGUgPT09IFwib3V0c2lkZVwiKSB7XG4gICAgICAgICAgICBsZXQgY2xvc2VzdCwgZHgsIGR5O1xuICAgICAgICAgICAgY29uc3QgcG9zID0gcGFydGljbGUuZ2V0UG9zaXRpb24oKSwgcmFkaXVzID0gcGFydGljbGUuZ2V0UmFkaXVzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IHRoaXMucmF3Lmxlbmd0aCAtIDE7IGkgPCB0aGlzLnJhdy5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaSA9IHRoaXMucmF3W2ldLCBwaiA9IHRoaXMucmF3W2pdO1xuICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBjYWxjQ2xvc2VzdFB0T25TZWdtZW50KHBpLCBwaiwgcG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gZ2V0RGlzdGFuY2VzKHBvcywgY2xvc2VzdCk7XG4gICAgICAgICAgICAgICAgW2R4LCBkeV0gPSBbZGlzdC5keCwgZGlzdC5keV07XG4gICAgICAgICAgICAgICAgaWYgKGRpc3QuZGlzdGFuY2UgPCByYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudEJvdW5jZShwaSwgcGosIHBhcnRpY2xlLnZlbG9jaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsb3Nlc3QgJiYgZHggIT09IHVuZGVmaW5lZCAmJiBkeSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmNoZWNrSW5zaWRlUG9seWdvbihwb3MpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yID0geyB4OiAxLCB5OiAxIH07XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnBvc2l0aW9uLnggPj0gY2xvc2VzdC54KSB7XG4gICAgICAgICAgICAgICAgICAgIGZhY3Rvci54ID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5wb3NpdGlvbi55ID49IGNsb3Nlc3QueSkge1xuICAgICAgICAgICAgICAgICAgICBmYWN0b3IueSA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gY2xvc2VzdC54ICsgcmFkaXVzICogMiAqIGZhY3Rvci54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSBjbG9zZXN0LnkgKyByYWRpdXMgKiAyICogZmFjdG9yLnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkubXVsdCgtMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy50eXBlID09PSBcImlubGluZVwiICYmIHBhcnRpY2xlLmluaXRpYWxQb3NpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgZGlzdCA9IGdldERpc3RhbmNlKHBhcnRpY2xlLmluaXRpYWxQb3NpdGlvbiwgcGFydGljbGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICBpZiAoZGlzdCA+IHRoaXMucG9seWdvbk1hc2tNb3ZlUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkueCA9IHBhcnRpY2xlLnZlbG9jaXR5LnkgLyAyIC0gcGFydGljbGUudmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ID0gcGFydGljbGUudmVsb2NpdHkueCAvIDIgLSBwYXJ0aWNsZS52ZWxvY2l0eS55O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tJbnNpZGVQb2x5Z29uKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAoIW9wdGlvbnMuZW5hYmxlIHx8IG9wdGlvbnMudHlwZSA9PT0gXCJub25lXCIgfHwgb3B0aW9ucy50eXBlID09PSBcImlubGluZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucmF3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm9Qb2x5Z29uRm91bmQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbnZhc1NpemUgPSBjb250YWluZXIuY2FudmFzLnNpemUsIHggPSAoX2EgPSBwb3NpdGlvbiA9PT0gbnVsbCB8fCBwb3NpdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zaXRpb24ueCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogTWF0aC5yYW5kb20oKSAqIGNhbnZhc1NpemUud2lkdGgsIHkgPSAoX2IgPSBwb3NpdGlvbiA9PT0gbnVsbCB8fCBwb3NpdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zaXRpb24ueSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogTWF0aC5yYW5kb20oKSAqIGNhbnZhc1NpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gdGhpcy5yYXcubGVuZ3RoIC0gMTsgaSA8IHRoaXMucmF3Lmxlbmd0aDsgaiA9IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGkgPSB0aGlzLnJhd1tpXSwgcGogPSB0aGlzLnJhd1tqXSwgaW50ZXJzZWN0ID0gcGkueSA+IHkgIT09IHBqLnkgPiB5ICYmIHggPCAoKHBqLnggLSBwaS54KSAqICh5IC0gcGkueSkpIC8gKHBqLnkgLSBwaS55KSArIHBpLng7XG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucy50eXBlID09PSBcImluc2lkZVwiXG4gICAgICAgICAgICA/IGluc2lkZVxuICAgICAgICAgICAgOiBvcHRpb25zLnR5cGUgPT09IFwib3V0c2lkZVwiXG4gICAgICAgICAgICAgICAgPyAhaW5zaWRlXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB9XG4gICAgcGFyc2VTdmdQYXRoKHhtbCwgZm9yY2UpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IGZvcmNlRG93bmxvYWQgPSBmb3JjZSAhPT0gbnVsbCAmJiBmb3JjZSAhPT0gdm9pZCAwID8gZm9yY2UgOiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMucGF0aHMgIT09IHVuZGVmaW5lZCAmJiAhZm9yY2VEb3dubG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gdGhpcy5vcHRpb25zLCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCksIGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoeG1sLCBcImltYWdlL3N2Zyt4bWxcIiksIHN2ZyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN2Z1wiKVswXTtcbiAgICAgICAgbGV0IHN2Z1BhdGhzID0gc3ZnLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGF0aFwiKTtcbiAgICAgICAgaWYgKCFzdmdQYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN2Z1BhdGhzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGF0aFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGhzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ZnUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBzdmdQYXRocy5pdGVtKGkpO1xuICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGhzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHBhdGguZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBweFJhdGlvID0gY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvLCBzY2FsZSA9IG9wdGlvbnMuc2NhbGUgLyBweFJhdGlvO1xuICAgICAgICB0aGlzLmRpbWVuc2lvbi53aWR0aCA9IHBhcnNlRmxvYXQoKF9hID0gc3ZnLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIjBcIikgKiBzY2FsZTtcbiAgICAgICAgdGhpcy5kaW1lbnNpb24uaGVpZ2h0ID0gcGFyc2VGbG9hdCgoX2IgPSBzdmcuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBcIjBcIikgKiBzY2FsZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSAoX2MgPSBvcHRpb25zLnBvc2l0aW9uKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7XG4gICAgICAgICAgICB4OiA1MCxcbiAgICAgICAgICAgIHk6IDUwLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IChjb250YWluZXIuY2FudmFzLnNpemUud2lkdGggKiBwb3NpdGlvbi54KSAvICgxMDAgKiBweFJhdGlvKSAtIHRoaXMuZGltZW5zaW9uLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IChjb250YWluZXIuY2FudmFzLnNpemUuaGVpZ2h0ICogcG9zaXRpb24ueSkgLyAoMTAwICogcHhSYXRpbykgLSB0aGlzLmRpbWVuc2lvbi5oZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcGFyc2VQYXRocyh0aGlzLnBhdGhzLCBzY2FsZSwgdGhpcy5vZmZzZXQpO1xuICAgIH1cbiAgICBhc3luYyBkb3dubG9hZFN2Z1BhdGgoc3ZnVXJsLCBmb3JjZSkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLCB1cmwgPSBzdmdVcmwgfHwgb3B0aW9ucy51cmwsIGZvcmNlRG93bmxvYWQgPSBmb3JjZSAhPT0gbnVsbCAmJiBmb3JjZSAhPT0gdm9pZCAwID8gZm9yY2UgOiBmYWxzZTtcbiAgICAgICAgaWYgKCF1cmwgfHwgKHRoaXMucGF0aHMgIT09IHVuZGVmaW5lZCAmJiAhZm9yY2VEb3dubG9hZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhdztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXEgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICBpZiAoIXJlcS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHNQYXJ0aWNsZXMgRXJyb3IgLSBFcnJvciBvY2N1cnJlZCBkdXJpbmcgcG9seWdvbiBtYXNrIGRvd25sb2FkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3ZnUGF0aChhd2FpdCByZXEudGV4dCgpLCBmb3JjZSk7XG4gICAgfVxuICAgIGRyYXdQb2ludHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5yYXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5yYXcpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBhcnRpY2xlcy5hZGRQYXJ0aWNsZSh7XG4gICAgICAgICAgICAgICAgeDogaXRlbS54LFxuICAgICAgICAgICAgICAgIHk6IGl0ZW0ueSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJhbmRvbVBvaW50KCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgbGV0IHBvc2l0aW9uO1xuICAgICAgICBpZiAob3B0aW9ucy50eXBlID09PSBcImlubGluZVwiKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMuaW5saW5lLmFycmFuZ2VtZW50KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhbmRvbS1wb2ludFwiOlxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UmFuZG9tUG9pbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhbmRvbS1sZW5ndGhcIjpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFJhbmRvbVBvaW50QnlMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVxdWlkaXN0YW50XCI6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5nZXRFcXVpZGlzdGFudFBvaW50QnlJbmRleChjb250YWluZXIucGFydGljbGVzLmNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9uZS1wZXItcG9pbnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVyLXBvaW50XCI6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFBvaW50QnlJbmRleChjb250YWluZXIucGFydGljbGVzLmNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiBjb250YWluZXIuY2FudmFzLnNpemUud2lkdGgsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yYW5kb20oKSAqIGNvbnRhaW5lci5jYW52YXMuc2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSW5zaWRlUG9seWdvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVBvaW50KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0UmFuZG9tUG9pbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5yYXcgfHwgIXRoaXMucmF3Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vUG9seWdvbkRhdGFMb2FkZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGl0ZW1Gcm9tQXJyYXkodGhpcy5yYXcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY29vcmRzLngsXG4gICAgICAgICAgICB5OiBjb29yZHMueSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tUG9pbnRCeUxlbmd0aCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmICghdGhpcy5yYXcgfHwgIXRoaXMucmF3Lmxlbmd0aCB8fCAhKChfYSA9IHRoaXMucGF0aHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm9Qb2x5Z29uRGF0YUxvYWRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aCA9IGl0ZW1Gcm9tQXJyYXkodGhpcy5wYXRocyksIGRpc3RhbmNlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGF0aC5sZW5ndGgpICsgMSwgcG9pbnQgPSBwYXRoLmVsZW1lbnQuZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBwb2ludC54ICogb3B0aW9ucy5zY2FsZSArICgoKF9iID0gdGhpcy5vZmZzZXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi54KSB8fCAwKSxcbiAgICAgICAgICAgIHk6IHBvaW50LnkgKiBvcHRpb25zLnNjYWxlICsgKCgoX2MgPSB0aGlzLm9mZnNldCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnkpIHx8IDApLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRFcXVpZGlzdGFudFBvaW50QnlJbmRleChpbmRleCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zLCBwb2x5Z29uTWFza09wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmICghdGhpcy5yYXcgfHwgIXRoaXMucmF3Lmxlbmd0aCB8fCAhKChfYSA9IHRoaXMucGF0aHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vUG9seWdvbkRhdGFMb2FkZWQpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMCwgcG9pbnQ7XG4gICAgICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gdGhpcy5wYXRocy5yZWR1Y2UoKHRvdCwgcGF0aCkgPT4gdG90ICsgcGF0aC5sZW5ndGgsIDApLCBkaXN0YW5jZSA9IHRvdGFsTGVuZ3RoIC8gb3B0aW9ucy5wYXJ0aWNsZXMubnVtYmVyLnZhbHVlO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5wYXRocykge1xuICAgICAgICAgICAgY29uc3QgcGF0aERpc3RhbmNlID0gZGlzdGFuY2UgKiBpbmRleCAtIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChwYXRoRGlzdGFuY2UgPD0gcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHBhdGguZWxlbWVudC5nZXRQb2ludEF0TGVuZ3RoKHBhdGhEaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gcGF0aC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6ICgoX2IgPSBwb2ludCA9PT0gbnVsbCB8fCBwb2ludCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9pbnQueCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCkgKiBwb2x5Z29uTWFza09wdGlvbnMuc2NhbGUgKyAoKF9kID0gKF9jID0gdGhpcy5vZmZzZXQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy54KSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAwKSxcbiAgICAgICAgICAgIHk6ICgoX2UgPSBwb2ludCA9PT0gbnVsbCB8fCBwb2ludCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9pbnQueSkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMCkgKiBwb2x5Z29uTWFza09wdGlvbnMuc2NhbGUgKyAoKF9nID0gKF9mID0gdGhpcy5vZmZzZXQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi55KSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAwKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0UG9pbnRCeUluZGV4KGluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5yYXcgfHwgIXRoaXMucmF3Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vUG9seWdvbkRhdGFMb2FkZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMucmF3W2luZGV4ICUgdGhpcy5yYXcubGVuZ3RoXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxuICAgICAgICAgICAgeTogY29vcmRzLnksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZVBhdGgyRCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKCF0aGlzLnBhdGgyRFN1cHBvcnRlZCB8fCAhKChfYSA9IHRoaXMucGF0aHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucGF0aHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGhEYXRhID0gKF9iID0gcGF0aC5lbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0QXR0cmlidXRlKFwiZFwiKTtcbiAgICAgICAgICAgIGlmIChwYXRoRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGgyZCA9IG5ldyBQYXRoMkQocGF0aERhdGEpLCBtYXRyaXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKS5jcmVhdGVTVkdNYXRyaXgoKSwgZmluYWxQYXRoID0gbmV3IFBhdGgyRCgpLCB0cmFuc2Zvcm0gPSBtYXRyaXguc2NhbGUob3B0aW9ucy5zY2FsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmFsUGF0aC5hZGRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUGF0aC5hZGRQYXRoKHBhdGgyZCwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5wYXRoMmQgPSBmaW5hbFBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF0aC5wYXRoMmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhdGgucGF0aDJkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgucGF0aDJkIHx8ICF0aGlzLnJhdykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5wYXRoMmQgPSBuZXcgUGF0aDJEKCk7XG4gICAgICAgICAgICBwYXRoLnBhdGgyZC5tb3ZlVG8odGhpcy5yYXdbMF0ueCwgdGhpcy5yYXdbMF0ueSk7XG4gICAgICAgICAgICB0aGlzLnJhdy5mb3JFYWNoKChwb3MsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IHBhdGgucGF0aDJkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZVRvKHBvcy54LCBwb3MueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXRoLnBhdGgyZC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpbml0UmF3RGF0YShmb3JjZSkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9ucy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMucmF3ID0gYXdhaXQgdGhpcy5kb3dubG9hZFN2Z1BhdGgob3B0aW9ucy51cmwsIGZvcmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICBsZXQgc3ZnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGRhdGEucGF0aCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgID8gZGF0YS5wYXRoLm1hcCgodCkgPT4gYDxwYXRoIGQ9XCIke3R9XCIgLz5gKS5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIDogYDxwYXRoIGQ9XCIke2RhdGEucGF0aH1cIiAvPmA7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZXNwYWNlcyA9ICd4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCInO1xuICAgICAgICAgICAgICAgIHN2ZyA9IGA8c3ZnICR7bmFtZXNwYWNlc30gd2lkdGg9XCIke2RhdGEuc2l6ZS53aWR0aH1cIiBoZWlnaHQ9XCIke2RhdGEuc2l6ZS5oZWlnaHR9XCI+JHtwYXRofTwvc3ZnPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdmcgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yYXcgPSB0aGlzLnBhcnNlU3ZnUGF0aChzdmcsIGZvcmNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyZWF0ZVBhdGgyRCgpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Qb2x5Z29uTWFza0luc3RhbmNlX2VuZ2luZSwgXCJmXCIpLmRpc3BhdGNoRXZlbnQoXCJwb2x5Z29uTWFza0xvYWRlZFwiLCB7XG4gICAgICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5fUG9seWdvbk1hc2tJbnN0YW5jZV9lbmdpbmUgPSBuZXcgV2Vha01hcCgpO1xuIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9Qb2x5Z29uTWFza1BsdWdpbl9lbmdpbmU7XG5pbXBvcnQgeyBQb2x5Z29uTWFzayB9IGZyb20gXCIuL09wdGlvbnMvQ2xhc3Nlcy9Qb2x5Z29uTWFza1wiO1xuaW1wb3J0IHsgUG9seWdvbk1hc2tJbnN0YW5jZSB9IGZyb20gXCIuL1BvbHlnb25NYXNrSW5zdGFuY2VcIjtcbmltcG9ydCB7IGlzU3NyIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuY2xhc3MgUG9seWdvbk1hc2tQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKGVuZ2luZSkge1xuICAgICAgICBfUG9seWdvbk1hc2tQbHVnaW5fZW5naW5lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmlkID0gXCJwb2x5Z29uTWFza1wiO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9Qb2x5Z29uTWFza1BsdWdpbl9lbmdpbmUsIGVuZ2luZSwgXCJmXCIpO1xuICAgIH1cbiAgICBnZXRQbHVnaW4oY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWdvbk1hc2tJbnN0YW5jZShjb250YWluZXIsIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1BvbHlnb25NYXNrUGx1Z2luX2VuZ2luZSwgXCJmXCIpKTtcbiAgICB9XG4gICAgbmVlZHNQbHVnaW4ob3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgcmV0dXJuICgoX2IgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucG9seWdvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVuYWJsZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogKCgoX2MgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucG9seWdvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnR5cGUpICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5wb2x5Z29uLnR5cGUgIT09IFwibm9uZVwiKSk7XG4gICAgfVxuICAgIGxvYWRPcHRpb25zKG9wdGlvbnMsIHNvdXJjZSkge1xuICAgICAgICBpZiAoIXRoaXMubmVlZHNQbHVnaW4oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnNDYXN0ID0gb3B0aW9ucztcbiAgICAgICAgbGV0IHBvbHlnb25PcHRpb25zID0gb3B0aW9uc0Nhc3QucG9seWdvbjtcbiAgICAgICAgaWYgKChwb2x5Z29uT3B0aW9ucyA9PT0gbnVsbCB8fCBwb2x5Z29uT3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9seWdvbk9wdGlvbnMubG9hZCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9uc0Nhc3QucG9seWdvbiA9IHBvbHlnb25PcHRpb25zID0gbmV3IFBvbHlnb25NYXNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcG9seWdvbk9wdGlvbnMubG9hZChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2UucG9seWdvbik7XG4gICAgfVxufVxuX1BvbHlnb25NYXNrUGx1Z2luX2VuZ2luZSA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFBvbHlnb25NYXNrUGx1Z2luKGVuZ2luZSkge1xuICAgIGlmICghaXNTc3IoKSAmJiAhKFwiU1ZHUGF0aFNlZ1wiIGluIHdpbmRvdykpIHtcbiAgICAgICAgYXdhaXQgaW1wb3J0KFwiLi9wYXRoc2VnLmpzXCIpO1xuICAgIH1cbiAgICBjb25zdCBwbHVnaW4gPSBuZXcgUG9seWdvbk1hc2tQbHVnaW4oZW5naW5lKTtcbiAgICBhd2FpdCBlbmdpbmUuYWRkUGx1Z2luKHBsdWdpbik7XG59XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9Qb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9Qb2x5Z29uTWFza01vdmVUeXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FbnVtcy9Qb2x5Z29uTWFza1R5cGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL09wdGlvbnMvSW50ZXJmYWNlcy9JUG9seWdvbk1hc2tPcHRpb25zXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghKFwiU1ZHUGF0aFNlZ1wiIGluIHdpbmRvdykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnID0gZnVuY3Rpb24gKHR5cGUsIHR5cGVBc0xldHRlciwgb3duaW5nUGF0aFNlZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGhTZWdUeXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXIgPSB0eXBlQXNMZXR0ZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duaW5nUGF0aFNlZ0xpc3QgPSBvd25pbmdQYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUuY2xhc3NuYW1lID0gXCJTVkdQYXRoU2VnXCI7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX1VOS05PV04gPSAwO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DTE9TRVBBVEggPSAxO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fQUJTID0gMjtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTU9WRVRPX1JFTCA9IDM7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19BQlMgPSA0O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fUkVMID0gNTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19BQlMgPSA2O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1JFTCA9IDc7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX0FCUyA9IDg7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1JFTCA9IDk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0FSQ19BQlMgPSAxMDtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQVJDX1JFTCA9IDExO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fSE9SSVpPTlRBTF9BQlMgPSAxMjtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX0hPUklaT05UQUxfUkVMID0gMTM7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19WRVJUSUNBTF9BQlMgPSAxNDtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX1ZFUlRJQ0FMX1JFTCA9IDE1O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9BQlMgPSAxNjtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19TTU9PVEhfUkVMID0gMTc7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1NNT09USF9BQlMgPSAxODtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX1JFTCA9IDE5O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlLl9zZWdtZW50Q2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3duaW5nUGF0aFNlZ0xpc3QpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX293bmluZ1BhdGhTZWdMaXN0LnNlZ21lbnRDaGFuZ2VkKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ2xvc2VQYXRoID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NMT1NFUEFUSCwgXCJ6XCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0Nsb3NlUGF0aC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHdpbmRvdy5TVkdQYXRoU2VnLnByb3RvdHlwZSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0Nsb3NlUGF0aC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnQ2xvc2VQYXRoXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ2xvc2VQYXRoLnByb3RvdHlwZS5fYXNQYXRoU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDbG9zZVBhdGgucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDbG9zZVBhdGgodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0FicyA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeCwgeSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fQUJTLCBcIk1cIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvQWJzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdNb3ZldG9BYnNdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdNb3ZldG9BYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feCArIFwiIFwiICsgdGhpcy5feTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0Ficy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0Ficyh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0Ficy5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0Ficy5wcm90b3R5cGUsIFwieVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19SRUwsIFwibVwiLCBvd25pbmdQYXRoU2VnTGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdNb3ZldG9SZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdNb3ZldG9SZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIltvYmplY3QgU1ZHUGF0aFNlZ01vdmV0b1JlbF1cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b1JlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl94ICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsKHVuZGVmaW5lZCwgdGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsLnByb3RvdHlwZSwgXCJ4XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsLnByb3RvdHlwZSwgXCJ5XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnMgPSBmdW5jdGlvbiAob3duaW5nUGF0aFNlZ0xpc3QsIHgsIHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5jYWxsKHRoaXMsIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX0FCUywgXCJMXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0Ficy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHdpbmRvdy5TVkdQYXRoU2VnLnByb3RvdHlwZSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0Ficy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnTGluZXRvQWJzXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvQWJzLnByb3RvdHlwZS5fYXNQYXRoU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXIgKyBcIiBcIiArIHRoaXMuX3ggKyBcIiBcIiArIHRoaXMuX3k7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnMucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnModW5kZWZpbmVkLCB0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnMucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnMucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1JlbCA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeCwgeSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fUkVMLCBcImxcIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvUmVsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdMaW5ldG9SZWxdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9SZWwucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feCArIFwiIFwiICsgdGhpcy5feTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1JlbC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1JlbCh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1JlbC5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1JlbC5wcm90b3R5cGUsIFwieVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5LCB4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX0FCUywgXCJDXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnNdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3gxICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kyICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY0Ficy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY0Ficyh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3gxLCB0aGlzLl95MSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnMucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnMucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnMucHJvdG90eXBlLCBcIngxXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gxO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDEgPSB4MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY0Ficy5wcm90b3R5cGUsIFwieTFcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5MSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MSA9IHkxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzLnByb3RvdHlwZSwgXCJ4MlwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94MjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3gyID0geDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNBYnMucHJvdG90eXBlLCBcInkyXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3kyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feTIgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5LCB4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1JFTCwgXCJjXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWxdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3gxICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kyICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbCh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3gxLCB0aGlzLl95MSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwucHJvdG90eXBlLCBcIngxXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gxO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDEgPSB4MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbC5wcm90b3R5cGUsIFwieTFcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5MSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MSA9IHkxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsLnByb3RvdHlwZSwgXCJ4MlwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94MjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3gyID0geDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwucHJvdG90eXBlLCBcInkyXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3kyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feTIgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0FicyA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeCwgeSwgeDEsIHkxKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX0FCUywgXCJRXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Ficy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Fic11cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feDEgKyBcIiBcIiArIHRoaXMuX3kxICsgXCIgXCIgKyB0aGlzLl94ICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Ficy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnModW5kZWZpbmVkLCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl94MSwgdGhpcy5feTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnMucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljQWJzLnByb3RvdHlwZSwgXCJ5XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Ficy5wcm90b3R5cGUsIFwieDFcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh4MSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Ficy5wcm90b3R5cGUsIFwieTFcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5MSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MSA9IHkxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5LCB4MSwgeTEpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5jYWxsKHRoaXMsIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfUkVMLCBcInFcIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMuX3gxID0geDE7XG4gICAgICAgICAgICAgICAgdGhpcy5feTEgPSB5MTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNSZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1JlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl94MSArIFwiIFwiICsgdGhpcy5feTEgKyBcIiBcIiArIHRoaXMuX3ggKyBcIiBcIiArIHRoaXMuX3k7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1JlbCh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3gxLCB0aGlzLl95MSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1JlbC5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNSZWwucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsLnByb3RvdHlwZSwgXCJ4MVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94MTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3gxID0geDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsLnByb3RvdHlwZSwgXCJ5MVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl95MTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0FyY0FicyA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeCwgeSwgcjEsIHIyLCBhbmdsZSwgbGFyZ2VBcmNGbGFnLCBzd2VlcEZsYWcpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5jYWxsKHRoaXMsIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQVJDX0FCUywgXCJBXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yMSA9IHIxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3IyID0gcjI7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXJnZUFyY0ZsYWcgPSBsYXJnZUFyY0ZsYWc7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3dlZXBGbGFnID0gc3dlZXBGbGFnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQXJjQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQXJjQWJzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdBcmNBYnNdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdBcmNBYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnBhdGhTZWdUeXBlQXNMZXR0ZXIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3IxICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yMiArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5nbGUgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9sYXJnZUFyY0ZsYWcgPyBcIjFcIiA6IFwiMFwiKSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3N3ZWVwRmxhZyA/IFwiMVwiIDogXCIwXCIpICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0FyY0Ficy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0FyY0Ficyh1bmRlZmluZWQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3IxLCB0aGlzLl9yMiwgdGhpcy5fYW5nbGUsIHRoaXMuX2xhcmdlQXJjRmxhZywgdGhpcy5fc3dlZXBGbGFnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNBYnMucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNBYnMucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNBYnMucHJvdG90eXBlLCBcInIxXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3IxO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAocjEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcjEgPSByMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0FyY0Ficy5wcm90b3R5cGUsIFwicjJcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcjI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yMiA9IHIyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQXJjQWJzLnByb3RvdHlwZSwgXCJhbmdsZVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmdsZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNBYnMucHJvdG90eXBlLCBcImxhcmdlQXJjRmxhZ1wiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXJnZUFyY0ZsYWc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChsYXJnZUFyY0ZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFyZ2VBcmNGbGFnID0gbGFyZ2VBcmNGbGFnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQXJjQWJzLnByb3RvdHlwZSwgXCJzd2VlcEZsYWdcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3dlZXBGbGFnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoc3dlZXBGbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N3ZWVwRmxhZyA9IHN3ZWVwRmxhZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQXJjUmVsID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5LCByMSwgcjIsIGFuZ2xlLCBsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19BUkNfUkVMLCBcImFcIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMuX3IxID0gcjE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcjIgPSByMjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhcmdlQXJjRmxhZyA9IGxhcmdlQXJjRmxhZztcbiAgICAgICAgICAgICAgICB0aGlzLl9zd2VlcEZsYWcgPSBzd2VlcEZsYWc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdBcmNSZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdBcmNSZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIltvYmplY3QgU1ZHUGF0aFNlZ0FyY1JlbF1cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcjEgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3IyICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmdsZSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2xhcmdlQXJjRmxhZyA/IFwiMVwiIDogXCIwXCIpICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5fc3dlZXBGbGFnID8gXCIxXCIgOiBcIjBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQXJjUmVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQXJjUmVsKHVuZGVmaW5lZCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy5fcjEsIHRoaXMuX3IyLCB0aGlzLl9hbmdsZSwgdGhpcy5fbGFyZ2VBcmNGbGFnLCB0aGlzLl9zd2VlcEZsYWcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbC5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbC5wcm90b3R5cGUsIFwieVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbC5wcm90b3R5cGUsIFwicjFcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcjE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yMSA9IHIxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQXJjUmVsLnByb3RvdHlwZSwgXCJyMlwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yMjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHIyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3IyID0gcjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNSZWwucHJvdG90eXBlLCBcImFuZ2xlXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ2xlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbC5wcm90b3R5cGUsIFwibGFyZ2VBcmNGbGFnXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhcmdlQXJjRmxhZztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGxhcmdlQXJjRmxhZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXJnZUFyY0ZsYWcgPSBsYXJnZUFyY0ZsYWc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdBcmNSZWwucHJvdG90eXBlLCBcInN3ZWVwRmxhZ1wiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zd2VlcEZsYWc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzd2VlcEZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3dlZXBGbGFnID0gc3dlZXBGbGFnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX0FCUywgXCJIXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxBYnMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbEFicy5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl94O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbEFicy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxBYnModW5kZWZpbmVkLCB0aGlzLl94KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzLnByb3RvdHlwZSwgXCJ4XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX1JFTCwgXCJoXCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxSZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbFJlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl94O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbFJlbC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxSZWwodW5kZWZpbmVkLCB0aGlzLl94KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsLnByb3RvdHlwZSwgXCJ4XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicyA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfQUJTLCBcIlZcIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnNdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicy5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnMucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicyh1bmRlZmluZWQsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1ZlcnRpY2FsQWJzLnByb3RvdHlwZSwgXCJ5XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbCA9IGZ1bmN0aW9uIChvd25pbmdQYXRoU2VnTGlzdCwgeSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfUkVMLCBcInZcIiwgb3duaW5nUGF0aFNlZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxSZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnTGluZXRvVmVydGljYWxSZWxdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxSZWwucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbCh1bmRlZmluZWQsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0xpbmV0b1ZlcnRpY2FsUmVsLnByb3RvdHlwZSwgXCJ5XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMgPSBmdW5jdGlvbiAob3duaW5nUGF0aFNlZ0xpc3QsIHgsIHksIHgyLCB5Mikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9BQlMsIFwiU1wiLCBvd25pbmdQYXRoU2VnTGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoQWJzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnNdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feDIgKyBcIiBcIiArIHRoaXMuX3kyICsgXCIgXCIgKyB0aGlzLl94ICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoQWJzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoQWJzKHVuZGVmaW5lZCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMucHJvdG90eXBlLCBcIngyXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aEFicy5wcm90b3R5cGUsIFwieTJcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5Mikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwgPSBmdW5jdGlvbiAob3duaW5nUGF0aFNlZ0xpc3QsIHgsIHksIHgyLCB5Mikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnLmNhbGwodGhpcywgd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9SRUwsIFwic1wiLCBvd25pbmdQYXRoU2VnTGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoUmVsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWxdXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feDIgKyBcIiBcIiArIHRoaXMuX3kyICsgXCIgXCIgKyB0aGlzLl94ICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoUmVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoUmVsKHVuZGVmaW5lZCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwucHJvdG90eXBlLCBcInhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwucHJvdG90eXBlLCBcIngyXCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aFJlbC5wcm90b3R5cGUsIFwieTJcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5Mikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoQWJzID0gZnVuY3Rpb24gKG93bmluZ1BhdGhTZWdMaXN0LCB4LCB5KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWcuY2FsbCh0aGlzLCB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1NNT09USF9BQlMsIFwiVFwiLCBvd25pbmdQYXRoU2VnTGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoQWJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LlNWR1BhdGhTZWcucHJvdG90eXBlKTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aEFicy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aEFic11cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnMucHJvdG90eXBlLl9hc1BhdGhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ1R5cGVBc0xldHRlciArIFwiIFwiICsgdGhpcy5feCArIFwiIFwiICsgdGhpcy5feTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnMucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoQWJzKHVuZGVmaW5lZCwgdGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aEFicy5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnMucHJvdG90eXBlLCBcInlcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhSZWwgPSBmdW5jdGlvbiAob3duaW5nUGF0aFNlZ0xpc3QsIHgsIHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZy5jYWxsKHRoaXMsIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX1JFTCwgXCJ0XCIsIG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhSZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuU1ZHUGF0aFNlZy5wcm90b3R5cGUpO1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoUmVsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbb2JqZWN0IFNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoUmVsXVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aFJlbC5wcm90b3R5cGUuX2FzUGF0aFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnVHlwZUFzTGV0dGVyICsgXCIgXCIgKyB0aGlzLl94ICsgXCIgXCIgKyB0aGlzLl95O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aFJlbC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhSZWwodW5kZWZpbmVkLCB0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoUmVsLnByb3RvdHlwZSwgXCJ4XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aFJlbC5wcm90b3R5cGUsIFwieVwiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VnbWVudENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0Nsb3NlUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ2xvc2VQYXRoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvQWJzKHVuZGVmaW5lZCwgeCwgeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvUmVsID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTW92ZXRvUmVsKHVuZGVmaW5lZCwgeCwgeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnTGluZXRvQWJzID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvQWJzKHVuZGVmaW5lZCwgeCwgeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnTGluZXRvUmVsID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvUmVsKHVuZGVmaW5lZCwgeCwgeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzID0gZnVuY3Rpb24gKHgsIHksIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY0Ficyh1bmRlZmluZWQsIHgsIHksIHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwgPSBmdW5jdGlvbiAoeCwgeSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsKHVuZGVmaW5lZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnMgPSBmdW5jdGlvbiAoeCwgeSwgeDEsIHkxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnModW5kZWZpbmVkLCB4LCB5LCB4MSwgeTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNSZWwgPSBmdW5jdGlvbiAoeCwgeSwgeDEsIHkxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNSZWwodW5kZWZpbmVkLCB4LCB5LCB4MSwgeTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0FyY0FicyA9IGZ1bmN0aW9uICh4LCB5LCByMSwgcjIsIGFuZ2xlLCBsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdBcmNBYnModW5kZWZpbmVkLCB4LCB5LCByMSwgcjIsIGFuZ2xlLCBsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnQXJjUmVsID0gZnVuY3Rpb24gKHgsIHksIHIxLCByMiwgYW5nbGUsIGxhcmdlQXJjRmxhZywgc3dlZXBGbGFnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0FyY1JlbCh1bmRlZmluZWQsIHgsIHksIHIxLCByMiwgYW5nbGUsIGxhcmdlQXJjRmxhZywgc3dlZXBGbGFnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbEFicyh1bmRlZmluZWQsIHgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxSZWwgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsKHVuZGVmaW5lZCwgeCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnMgPSBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicyh1bmRlZmluZWQsIHkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0xpbmV0b1ZlcnRpY2FsUmVsID0gZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxSZWwodW5kZWZpbmVkLCB5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMgPSBmdW5jdGlvbiAoeCwgeSwgeDIsIHkyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aEFicyh1bmRlZmluZWQsIHgsIHksIHgyLCB5Mik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoUmVsID0gZnVuY3Rpb24gKHgsIHksIHgyLCB5Mikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWwodW5kZWZpbmVkLCB4LCB5LCB4MiwgeTIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnMgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoQWJzKHVuZGVmaW5lZCwgeCwgeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aFJlbCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhSZWwodW5kZWZpbmVkLCB4LCB5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIShcImdldFBhdGhTZWdBdExlbmd0aFwiIGluIHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZS5nZXRQYXRoU2VnQXRMZW5ndGggPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID09PSB1bmRlZmluZWQgfHwgIWlzRmluaXRlKGRpc3RhbmNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCBhcmd1bWVudHMuXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lYXN1cmVtZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRcIiwgdGhpcy5nZXRBdHRyaWJ1dGUoXCJkXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RQYXRoU2VnbWVudCA9IG1lYXN1cmVtZW50RWxlbWVudC5wYXRoU2VnTGlzdC5udW1iZXJPZkl0ZW1zIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQYXRoU2VnbWVudCA8PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50RWxlbWVudC5wYXRoU2VnTGlzdC5yZW1vdmVJdGVtKGxhc3RQYXRoU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPiBtZWFzdXJlbWVudEVsZW1lbnQuZ2V0VG90YWxMZW5ndGgoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYXRoU2VnbWVudC0tO1xuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChsYXN0UGF0aFNlZ21lbnQgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RQYXRoU2VnbWVudDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghKFwiU1ZHUGF0aFNlZ0xpc3RcIiBpbiB3aW5kb3cpIHx8ICEoXCJhcHBlbmRJdGVtXCIgaW4gd2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZSkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGlzdCA9IGZ1bmN0aW9uIChwYXRoRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGhFbGVtZW50ID0gcGF0aEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMuX3BhcnNlUGF0aCh0aGlzLl9wYXRoRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkXCIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXRhdGlvbk9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFtcImRcIl0gfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoRWxlbWVudE11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLl91cGRhdGVMaXN0RnJvbVBhdGhNdXRhdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aEVsZW1lbnRNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5fcGF0aEVsZW1lbnQsIHRoaXMuX211dGF0aW9uT2JzZXJ2ZXJDb25maWcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGlzdC5wcm90b3R5cGUuY2xhc3NuYW1lID0gXCJTVkdQYXRoU2VnTGlzdFwiO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoU2VnTGlzdC5wcm90b3R5cGUsIFwibnVtYmVyT2ZJdGVtc1wiLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrUGF0aFN5bmNocm9uaXplZFRvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1BhdGhTeW5jaHJvbml6ZWRUb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5TVkdQYXRoRWxlbWVudC5wcm90b3R5cGUsIFwicGF0aFNlZ0xpc3RcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3BhdGhTZWdMaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGF0aFNlZ0xpc3QgPSBuZXcgd2luZG93LlNWR1BhdGhTZWdMaXN0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlNWR1BhdGhFbGVtZW50LnByb3RvdHlwZSwgXCJub3JtYWxpemVkUGF0aFNlZ0xpc3RcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aEVsZW1lbnQucHJvdG90eXBlLCBcImFuaW1hdGVkUGF0aFNlZ0xpc3RcIiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuU1ZHUGF0aEVsZW1lbnQucHJvdG90eXBlLCBcImFuaW1hdGVkTm9ybWFsaXplZFBhdGhTZWdMaXN0XCIsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLl9jaGVja1BhdGhTeW5jaHJvbml6ZWRUb0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGlzdEZyb21QYXRoTXV0YXRpb25zKHRoaXMuX3BhdGhFbGVtZW50TXV0YXRpb25PYnNlcnZlci50YWtlUmVjb3JkcygpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLl91cGRhdGVMaXN0RnJvbVBhdGhNdXRhdGlvbnMgPSBmdW5jdGlvbiAobXV0YXRpb25SZWNvcmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXRoRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGxldCBoYXNQYXRoTXV0YXRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25SZWNvcmRzLmZvckVhY2goZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLmF0dHJpYnV0ZU5hbWUgPT0gXCJkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNQYXRoTXV0YXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzUGF0aE11dGF0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMuX3BhcnNlUGF0aCh0aGlzLl9wYXRoRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkXCIpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLl93cml0ZUxpc3RUb1BhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aEVsZW1lbnRNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkXCIsIHdpbmRvdy5TVkdQYXRoU2VnTGlzdC5fcGF0aFNlZ0FycmF5QXNTdHJpbmcodGhpcy5fbGlzdCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGhFbGVtZW50TXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuX3BhdGhFbGVtZW50LCB0aGlzLl9tdXRhdGlvbk9ic2VydmVyQ29uZmlnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLnNlZ21lbnRDaGFuZ2VkID0gZnVuY3Rpb24gKHBhdGhTZWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZUxpc3RUb1BhdGgoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrUGF0aFN5bmNocm9uaXplZFRvTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QuZm9yRWFjaChmdW5jdGlvbiAocGF0aFNlZykge1xuICAgICAgICAgICAgICAgICAgICBwYXRoU2VnLl9vd25pbmdQYXRoU2VnTGlzdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlTGlzdFRvUGF0aCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGlzdC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChuZXdJdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tQYXRoU3luY2hyb25pemVkVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdCA9IFtuZXdJdGVtXTtcbiAgICAgICAgICAgICAgICBuZXdJdGVtLl9vd25pbmdQYXRoU2VnTGlzdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVMaXN0VG9QYXRoKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0l0ZW07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZS5fY2hlY2tWYWxpZEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGluZGV4KSB8fCBpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5udW1iZXJPZkl0ZW1zKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIklOREVYX1NJWkVfRVJSXCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tQYXRoU3luY2hyb25pemVkVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tWYWxpZEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtpbmRleF07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZS5pbnNlcnRJdGVtQmVmb3JlID0gZnVuY3Rpb24gKG5ld0l0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tQYXRoU3luY2hyb25pemVkVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gdGhpcy5udW1iZXJPZkl0ZW1zKVxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgICAgICBpZiAobmV3SXRlbS5fb3duaW5nUGF0aFNlZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbSA9IG5ld0l0ZW0uY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoaW5kZXgsIDAsIG5ld0l0ZW0pO1xuICAgICAgICAgICAgICAgIG5ld0l0ZW0uX293bmluZ1BhdGhTZWdMaXN0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZUxpc3RUb1BhdGgoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLnJlcGxhY2VJdGVtID0gZnVuY3Rpb24gKG5ld0l0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tQYXRoU3luY2hyb25pemVkVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0l0ZW0uX293bmluZ1BhdGhTZWdMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0gPSBuZXdJdGVtLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrVmFsaWRJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdFtpbmRleF0gPSBuZXdJdGVtO1xuICAgICAgICAgICAgICAgIG5ld0l0ZW0uX293bmluZ1BhdGhTZWdMaXN0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZUxpc3RUb1BhdGgoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1BhdGhTeW5jaHJvbml6ZWRUb0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1ZhbGlkSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9saXN0W2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVMaXN0VG9QYXRoKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LlNWR1BhdGhTZWdMaXN0LnByb3RvdHlwZS5hcHBlbmRJdGVtID0gZnVuY3Rpb24gKG5ld0l0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1BhdGhTeW5jaHJvbml6ZWRUb0xpc3QoKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3SXRlbS5fb3duaW5nUGF0aFNlZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbSA9IG5ld0l0ZW0uY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICAgICAgICAgIG5ld0l0ZW0uX293bmluZ1BhdGhTZWdMaXN0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZUxpc3RUb1BhdGgoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuU1ZHUGF0aFNlZ0xpc3QuX3BhdGhTZWdBcnJheUFzU3RyaW5nID0gZnVuY3Rpb24gKHBhdGhTZWdBcnJheSkge1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGF0aFNlZ0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHBhdGhTZWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IHBhdGhTZWcuX2FzUGF0aFN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IFwiIFwiICsgcGF0aFNlZy5fYXNQYXRoU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5TVkdQYXRoU2VnTGlzdC5wcm90b3R5cGUuX3BhcnNlUGF0aCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0cmluZyB8fCBzdHJpbmcubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25pbmdQYXRoU2VnTGlzdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgQnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRoU2VnTGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kU2VnbWVudCA9IGZ1bmN0aW9uIChwYXRoU2VnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0aFNlZ0xpc3QucHVzaChwYXRoU2VnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IFNvdXJjZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nID0gc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmRJbmRleCA9IHRoaXMuX3N0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ29tbWFuZCA9IHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfVU5LTk9XTjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2tpcE9wdGlvbmFsU3BhY2VzKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTb3VyY2UucHJvdG90eXBlLl9pc0N1cnJlbnRTcGFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gdGhpcy5fc3RyaW5nW3RoaXMuX2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2hhcmFjdGVyIDw9IFwiIFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhcmFjdGVyID09IFwiIFwiIHx8IGNoYXJhY3RlciA9PSBcIlxcblwiIHx8IGNoYXJhY3RlciA9PSBcIlxcdFwiIHx8IGNoYXJhY3RlciA9PSBcIlxcclwiIHx8IGNoYXJhY3RlciA9PSBcIlxcZlwiKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTb3VyY2UucHJvdG90eXBlLl9za2lwT3B0aW9uYWxTcGFjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleCAmJiB0aGlzLl9pc0N1cnJlbnRTcGFjZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNvdXJjZS5wcm90b3R5cGUuX3NraXBPcHRpb25hbFNwYWNlc09yRGVsaW1pdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fZW5kSW5kZXggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLl9pc0N1cnJlbnRTcGFjZSgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgIT0gXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9za2lwT3B0aW9uYWxTcGFjZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRJbmRleCA8IHRoaXMuX2VuZEluZGV4ICYmIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraXBPcHRpb25hbFNwYWNlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNvdXJjZS5wcm90b3R5cGUuaGFzTW9yZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNvdXJjZS5wcm90b3R5cGUucGVla1NlZ21lbnRUeXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb29rYWhlYWQgPSB0aGlzLl9zdHJpbmdbdGhpcy5fY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhTZWdUeXBlRnJvbUNoYXIobG9va2FoZWFkKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFNvdXJjZS5wcm90b3R5cGUuX3BhdGhTZWdUeXBlRnJvbUNoYXIgPSBmdW5jdGlvbiAobG9va2FoZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobG9va2FoZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiWlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DTE9TRVBBVEg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19BQlM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19SRUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19BQlM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19SRUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfQUJTO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1JFTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJRXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfQUJTO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19SRUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0FSQ19BQlM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0FSQ19SRUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX0FCUztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX0hPUklaT05UQUxfUkVMO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlZcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfQUJTO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfUkVMO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9BQlM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfU01PT1RIX1JFTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX0FCUztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX1JFTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfVU5LTk9XTjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU291cmNlLnByb3RvdHlwZS5fbmV4dENvbW1hbmRIZWxwZXIgPSBmdW5jdGlvbiAobG9va2FoZWFkLCBwcmV2aW91c0NvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChsb29rYWhlYWQgPT0gXCIrXCIgfHwgbG9va2FoZWFkID09IFwiLVwiIHx8IGxvb2thaGVhZCA9PSBcIi5cIiB8fCAobG9va2FoZWFkID49IFwiMFwiICYmIGxvb2thaGVhZCA8PSBcIjlcIikpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvbW1hbmQgIT0gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DTE9TRVBBVEgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0NvbW1hbmQgPT0gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fQUJTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19BQlM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNDb21tYW5kID09IHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTU9WRVRPX1JFTClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fUkVMO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzQ29tbWFuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19VTktOT1dOO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU291cmNlLnByb3RvdHlwZS5pbml0aWFsQ29tbWFuZElzTW92ZVRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzTW9yZURhdGEoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5wZWVrU2VnbWVudFR5cGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQgPT0gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fQUJTIHx8IGNvbW1hbmQgPT0gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fUkVMO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU291cmNlLnByb3RvdHlwZS5fcGFyc2VOdW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBleHBvbmVudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnRlZ2VyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyYWMgPSAxO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjaW1hbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWduID0gMTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4cHNpZ24gPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lwT3B0aW9uYWxTcGFjZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRJbmRleCA8IHRoaXMuX2VuZEluZGV4ICYmIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA9PSBcIitcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleCAmJiB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPT0gdGhpcy5fZW5kSW5kZXggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICgodGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpIDwgXCIwXCIgfHwgdGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpID4gXCI5XCIpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpICE9IFwiLlwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW50UGFydEluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fZW5kSW5kZXggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA+PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpIDw9IFwiOVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggIT0gc3RhcnRJbnRQYXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FuSW50UGFydEluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtdWx0aXBsaWVyID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChzY2FuSW50UGFydEluZGV4ID49IHN0YXJ0SW50UGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZWdlciArPSBtdWx0aXBsaWVyICogKHRoaXMuX3N0cmluZy5jaGFyQXQoc2NhbkludFBhcnRJbmRleC0tKSAtIFwiMFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyICo9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleCAmJiB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRJbmRleCA+PSB0aGlzLl9lbmRJbmRleCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA8IFwiMFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpID4gXCI5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9lbmRJbmRleCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA+PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA8PSBcIjlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWMgKj0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbCArPSAodGhpcy5fc3RyaW5nLmNoYXJBdCh0aGlzLl9jdXJyZW50SW5kZXgpIC0gXCIwXCIpIC8gZnJhYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEluZGV4ICE9IHN0YXJ0SW5kZXggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCArIDEgPCB0aGlzLl9lbmRJbmRleCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA9PSBcImVcIiB8fCB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPT0gXCJFXCIpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCArIDEpICE9IFwieFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCArIDEpICE9IFwibVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHNpZ24gPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPj0gdGhpcy5fZW5kSW5kZXggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPCBcIjBcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KSA+IFwiOVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fZW5kSW5kZXggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPj0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgPD0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvbmVudCAqPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvbmVudCArPSB0aGlzLl9zdHJpbmcuY2hhckF0KHRoaXMuX2N1cnJlbnRJbmRleCkgLSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gaW50ZWdlciArIGRlY2ltYWw7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciAqPSBzaWduO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb25lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXIgKj0gTWF0aC5wb3coMTAsIGV4cHNpZ24gKiBleHBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydEluZGV4ID09IHRoaXMuX2N1cnJlbnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraXBPcHRpb25hbFNwYWNlc09yRGVsaW1pdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBTb3VyY2UucHJvdG90eXBlLl9wYXJzZUFyY0ZsYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPj0gdGhpcy5fZW5kSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmbGFnQ2hhciA9IHRoaXMuX3N0cmluZy5jaGFyQXQodGhpcy5fY3VycmVudEluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ0NoYXIgPT0gXCIwXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZsYWdDaGFyID09IFwiMVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraXBPcHRpb25hbFNwYWNlc09yRGVsaW1pdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgU291cmNlLnByb3RvdHlwZS5wYXJzZVNlZ21lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvb2thaGVhZCA9IHRoaXMuX3N0cmluZ1t0aGlzLl9jdXJyZW50SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29tbWFuZCA9IHRoaXMuX3BhdGhTZWdUeXBlRnJvbUNoYXIobG9va2FoZWFkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQgPT0gd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19VTktOT1dOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNDb21tYW5kID09IHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfVU5LTk9XTilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSB0aGlzLl9uZXh0Q29tbWFuZEhlbHBlcihsb29rYWhlYWQsIHRoaXMuX3ByZXZpb3VzQ29tbWFuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZCA9PSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX1VOS05PV04pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0NvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19NT1ZFVE9fUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdNb3ZldG9SZWwob3duaW5nUGF0aFNlZ0xpc3QsIHRoaXMuX3BhcnNlTnVtYmVyKCksIHRoaXMuX3BhcnNlTnVtYmVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19BQlM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ01vdmV0b0Ficyhvd25pbmdQYXRoU2VnTGlzdCwgdGhpcy5fcGFyc2VOdW1iZXIoKSwgdGhpcy5fcGFyc2VOdW1iZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvUmVsKG93bmluZ1BhdGhTZWdMaXN0LCB0aGlzLl9wYXJzZU51bWJlcigpLCB0aGlzLl9wYXJzZU51bWJlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9BYnMob3duaW5nUGF0aFNlZ0xpc3QsIHRoaXMuX3BhcnNlTnVtYmVyKCksIHRoaXMuX3BhcnNlTnVtYmVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbFJlbChvd25pbmdQYXRoU2VnTGlzdCwgdGhpcy5fcGFyc2VOdW1iZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX0hPUklaT05UQUxfQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzKG93bmluZ1BhdGhTZWdMaXN0LCB0aGlzLl9wYXJzZU51bWJlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbChvd25pbmdQYXRoU2VnTGlzdCwgdGhpcy5fcGFyc2VOdW1iZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX1ZFUlRJQ0FMX0FCUzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnMob3duaW5nUGF0aFNlZ0xpc3QsIHRoaXMuX3BhcnNlTnVtYmVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NMT1NFUEFUSDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lwT3B0aW9uYWxTcGFjZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ2xvc2VQYXRoKG93bmluZ1BhdGhTZWdMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5MTogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDI6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkyOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbChvd25pbmdQYXRoU2VnTGlzdCwgcG9pbnRzLngsIHBvaW50cy55LCBwb2ludHMueDEsIHBvaW50cy55MSwgcG9pbnRzLngyLCBwb2ludHMueTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4MjogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTI6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzKG93bmluZ1BhdGhTZWdMaXN0LCBwb2ludHMueCwgcG9pbnRzLnksIHBvaW50cy54MSwgcG9pbnRzLnkxLCBwb2ludHMueDIsIHBvaW50cy55Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19TTU9PVEhfUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDI6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkyOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aFJlbChvd25pbmdQYXRoU2VnTGlzdCwgcG9pbnRzLngsIHBvaW50cy55LCBwb2ludHMueDIsIHBvaW50cy55Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19TTU9PVEhfQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDI6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkyOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aEFicyhvd25pbmdQYXRoU2VnTGlzdCwgcG9pbnRzLngsIHBvaW50cy55LCBwb2ludHMueDIsIHBvaW50cy55Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNSZWwob3duaW5nUGF0aFNlZ0xpc3QsIHBvaW50cy54LCBwb2ludHMueSwgcG9pbnRzLngxLCBwb2ludHMueTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX0FCUzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5MTogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljQWJzKG93bmluZ1BhdGhTZWdMaXN0LCBwb2ludHMueCwgcG9pbnRzLnksIHBvaW50cy54MSwgcG9pbnRzLnkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19TTU9PVEhfUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoUmVsKG93bmluZ1BhdGhTZWdMaXN0LCB0aGlzLl9wYXJzZU51bWJlcigpLCB0aGlzLl9wYXJzZU51bWJlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19TTU9PVEhfQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoQWJzKG93bmluZ1BhdGhTZWdMaXN0LCB0aGlzLl9wYXJzZU51bWJlcigpLCB0aGlzLl9wYXJzZU51bWJlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19BUkNfUkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNBbmdsZTogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjTGFyZ2U6IHRoaXMuX3BhcnNlQXJjRmxhZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNTd2VlcDogdGhpcy5fcGFyc2VBcmNGbGFnKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQXJjUmVsKG93bmluZ1BhdGhTZWdMaXN0LCBwb2ludHMueCwgcG9pbnRzLnksIHBvaW50cy54MSwgcG9pbnRzLnkxLCBwb2ludHMuYXJjQW5nbGUsIHBvaW50cy5hcmNMYXJnZSwgcG9pbnRzLmFyY1N3ZWVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19BUkNfQUJTOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxOiB0aGlzLl9wYXJzZU51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNBbmdsZTogdGhpcy5fcGFyc2VOdW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjTGFyZ2U6IHRoaXMuX3BhcnNlQXJjRmxhZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNTd2VlcDogdGhpcy5fcGFyc2VBcmNGbGFnKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuX3BhcnNlTnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5TVkdQYXRoU2VnQXJjQWJzKG93bmluZ1BhdGhTZWdMaXN0LCBwb2ludHMueCwgcG9pbnRzLnksIHBvaW50cy54MSwgcG9pbnRzLnkxLCBwb2ludHMuYXJjQW5nbGUsIHBvaW50cy5hcmNMYXJnZSwgcG9pbnRzLmFyY1N3ZWVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJVbmtub3duIHBhdGggc2VnIHR5cGUuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgQnVpbGRlcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG5ldyBTb3VyY2Uoc3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZS5pbml0aWFsQ29tbWFuZElzTW92ZVRvKCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc291cmNlLmhhc01vcmVEYXRhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aFNlZyA9IHNvdXJjZS5wYXJzZVNlZ21lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXRoU2VnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmFwcGVuZFNlZ21lbnQocGF0aFNlZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBidWlsZGVyLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJBbiBlcnJvciBvY2N1cnJlZCBpbiB0c1BhcnRpY2xlcyBwYXRoc2VnIHBvbHlmaWxsLiBJZiB0aGUgUG9seWdvbiBNYXNrIGlzIG5vdCB3b3JraW5nLCBwbGVhc2Ugb3BlbiBhbiBpc3N1ZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGVvYnJ1bmkvdHNwYXJ0aWNsZXNcIiwgZSk7XG4gICAgfVxufSkoKTtcbiIsImltcG9ydCB7IFZlY3RvciwgY29sb3JUb1JnYiwgZ2V0RGlzdGFuY2VzLCBnZXRTdHlsZUZyb21SZ2IgfSBmcm9tIFwidHNwYXJ0aWNsZXMtZW5naW5lXCI7XG5leHBvcnQgZnVuY3Rpb24gZHJhd1BvbHlnb25NYXNrKGNvbnRleHQsIHJhd0RhdGEsIHN0cm9rZSkge1xuICAgIGNvbnN0IGNvbG9yID0gY29sb3JUb1JnYihzdHJva2UuY29sb3IpO1xuICAgIGlmICghY29sb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKHJhd0RhdGFbMF0ueCwgcmF3RGF0YVswXS55KTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmF3RGF0YSkge1xuICAgICAgICBjb250ZXh0LmxpbmVUbyhpdGVtLngsIGl0ZW0ueSk7XG4gICAgfVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGdldFN0eWxlRnJvbVJnYihjb2xvcik7XG4gICAgY29udGV4dC5saW5lV2lkdGggPSBzdHJva2Uud2lkdGg7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UG9seWdvbk1hc2tQYXRoKGNvbnRleHQsIHBhdGgsIHN0cm9rZSwgcG9zaXRpb24pIHtcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICBjb25zdCBjb2xvciA9IGNvbG9yVG9SZ2Ioc3Ryb2tlLmNvbG9yKTtcbiAgICBpZiAoIWNvbG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGdldFN0eWxlRnJvbVJnYihjb2xvciwgc3Ryb2tlLm9wYWNpdHkpO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gc3Ryb2tlLndpZHRoO1xuICAgIGNvbnRleHQuc3Ryb2tlKHBhdGgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUGF0aHMocGF0aHMsIHNjYWxlLCBvZmZzZXQpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5lbGVtZW50LnBhdGhTZWdMaXN0LCBsZW4gPSAoX2EgPSBzZWdtZW50cyA9PT0gbnVsbCB8fCBzZWdtZW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VnbWVudHMubnVtYmVyT2ZJdGVtcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCwgcCA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gc2VnbWVudHMgPT09IG51bGwgfHwgc2VnbWVudHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlZ21lbnRzLmdldEl0ZW0oaSk7XG4gICAgICAgICAgICBjb25zdCBzdmdQYXRoU2VnID0gd2luZG93LlNWR1BhdGhTZWc7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlZ21lbnQgPT09IG51bGwgfHwgc2VnbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VnbWVudC5wYXRoU2VnVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX01PVkVUT19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfTElORVRPX0FCUzpcbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX0FCUzpcbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQVJDX0FCUzpcbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX0FCUzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhYnNTZWcgPSBzZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBwLnggPSBhYnNTZWcueDtcbiAgICAgICAgICAgICAgICAgICAgcC55ID0gYWJzU2VnLnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fSE9SSVpPTlRBTF9BQlM6XG4gICAgICAgICAgICAgICAgICAgIHAueCA9IHNlZ21lbnQueDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfTElORVRPX1ZFUlRJQ0FMX0FCUzpcbiAgICAgICAgICAgICAgICAgICAgcC55ID0gc2VnbWVudC55O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fUkVMOlxuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX01PVkVUT19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfUkVMOlxuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX0FSQ19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19TTU9PVEhfUkVMOlxuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1NNT09USF9SRUw6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsU2VnID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgcC54ICs9IHJlbFNlZy54O1xuICAgICAgICAgICAgICAgICAgICBwLnkgKz0gcmVsU2VnLnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIHN2Z1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fSE9SSVpPTlRBTF9SRUw6XG4gICAgICAgICAgICAgICAgICAgIHAueCArPSBzZWdtZW50Lng7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19WRVJUSUNBTF9SRUw6XG4gICAgICAgICAgICAgICAgICAgIHAueSArPSBzZWdtZW50Lnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugc3ZnUGF0aFNlZy5QQVRIU0VHX1VOS05PV046XG4gICAgICAgICAgICAgICAgY2FzZSBzdmdQYXRoU2VnLlBBVEhTRUdfQ0xPU0VQQVRIOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBwLnggKiBzY2FsZSArIG9mZnNldC54LFxuICAgICAgICAgICAgICAgIHk6IHAueSAqIHNjYWxlICsgb2Zmc2V0LnksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNDbG9zZXN0UHRPblNlZ21lbnQoczEsIHMyLCBwb3MpIHtcbiAgICBjb25zdCB7IGR4LCBkeSB9ID0gZ2V0RGlzdGFuY2VzKHBvcywgczEpLCB7IGR4OiBkeHgsIGR5OiBkeXkgfSA9IGdldERpc3RhbmNlcyhzMiwgczEpLCB0ID0gKGR4ICogZHh4ICsgZHkgKiBkeXkpIC8gKGR4eCAqKiAyICsgZHl5ICoqIDIpLCByZXMgPSB7XG4gICAgICAgIHg6IHMxLnggKyBkeHggKiB0LFxuICAgICAgICB5OiBzMS54ICsgZHl5ICogdCxcbiAgICAgICAgaXNPblNlZ21lbnQ6IHQgPj0gMCAmJiB0IDw9IDEsXG4gICAgfTtcbiAgICBpZiAodCA8IDApIHtcbiAgICAgICAgcmVzLnggPSBzMS54O1xuICAgICAgICByZXMueSA9IHMxLnk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHQgPiAxKSB7XG4gICAgICAgIHJlcy54ID0gczIueDtcbiAgICAgICAgcmVzLnkgPSBzMi55O1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlZ21lbnRCb3VuY2Uoc3RhcnQsIHN0b3AsIHZlbG9jaXR5KSB7XG4gICAgY29uc3QgeyBkeCwgZHkgfSA9IGdldERpc3RhbmNlcyhzdGFydCwgc3RvcCksIHdhbGxBbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KSwgd2FsbE5vcm1hbCA9IFZlY3Rvci5jcmVhdGUoTWF0aC5zaW4od2FsbEFuZ2xlKSwgLU1hdGguY29zKHdhbGxBbmdsZSkpLCBkID0gMiAqICh2ZWxvY2l0eS54ICogd2FsbE5vcm1hbC54ICsgdmVsb2NpdHkueSAqIHdhbGxOb3JtYWwueSk7XG4gICAgd2FsbE5vcm1hbC5tdWx0VG8oZCk7XG4gICAgdmVsb2NpdHkuc3ViRnJvbSh3YWxsTm9ybWFsKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==