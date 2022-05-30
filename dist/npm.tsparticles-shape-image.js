"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-shape-image"],{

/***/ "./node_modules/tsparticles-shape-image/esm/ImageDrawer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/ImageDrawer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDrawer": () => (/* binding */ ImageDrawer)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-shape-image/esm/Utils.js");
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
var _ImageDrawer_images;

class ImageDrawer {
    constructor() {
        _ImageDrawer_images.set(this, void 0);
        __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
    }
    getSidesCount() {
        return 12;
    }
    getImages(container) {
        const containerImages = __classPrivateFieldGet(this, _ImageDrawer_images, "f").find((t) => t.id === container.id);
        if (!containerImages) {
            __classPrivateFieldGet(this, _ImageDrawer_images, "f").push({
                id: container.id,
                images: [],
            });
            return this.getImages(container);
        }
        else {
            return containerImages;
        }
    }
    addImage(container, image) {
        const containerImages = this.getImages(container);
        containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
    }
    destroy() {
        __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
    }
    draw(context, particle, radius, opacity) {
        var _a, _b;
        const image = particle.image;
        const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;
        if (!element) {
            return;
        }
        const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
        const pos = {
            x: -radius,
            y: -radius,
        };
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = opacity;
        }
        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = 1;
        }
    }
    loadShape(particle) {
        var _a, _b, _c;
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        const images = this.getImages(particle.container).images;
        const imageData = particle.shapeData;
        const image = images.find((t) => t.source === imageData.src);
        let imageRes;
        if (!image) {
            this.loadImageShape(particle.container, imageData).then(() => {
                this.loadShape(particle);
            });
            return;
        }
        if (image.error) {
            return;
        }
        const color = particle.getFillColor();
        if (image.svgData && imageData.replaceColor && color) {
            imageRes = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.replaceImageColor)(image, imageData, color, particle);
        }
        else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: (_a = imageData.replaceColor) !== null && _a !== void 0 ? _a : imageData.replace_color,
                source: imageData.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = (_b = imageData.fill) !== null && _b !== void 0 ? _b : particle.fill;
        const close = (_c = imageData.close) !== null && _c !== void 0 ? _c : particle.close;
        const imageShape = {
            image: imageRes,
            fill,
            close,
        };
        particle.image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
    }
    async loadImageShape(container, imageShape) {
        const source = imageShape.src;
        if (!source) {
            throw new Error("Error tsParticles - No image.src");
        }
        try {
            const image = {
                source: source,
                type: source.substr(source.length - 3),
                error: false,
                loading: true,
            };
            this.addImage(container, image);
            const imageFunc = imageShape.replaceColor ? _Utils__WEBPACK_IMPORTED_MODULE_0__.downloadSvgImage : _Utils__WEBPACK_IMPORTED_MODULE_0__.loadImage;
            await imageFunc(image);
        }
        catch (_a) {
            throw new Error(`tsParticles error - ${imageShape.src} not found`);
        }
    }
}
_ImageDrawer_images = new WeakMap();


/***/ }),

/***/ "./node_modules/tsparticles-shape-image/esm/Utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/Utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downloadSvgImage": () => (/* binding */ downloadSvgImage),
/* harmony export */   "loadImage": () => (/* binding */ loadImage),
/* harmony export */   "replaceImageColor": () => (/* binding */ replaceImageColor)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
    const { svgData } = imageShape;
    if (!svgData) {
        return "";
    }
    const colorStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl)(color, opacity);
    if (svgData.includes("fill")) {
        return svgData.replace(currentColorRegex, () => colorStyle);
    }
    const preFillIndex = svgData.indexOf(">");
    return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
    return new Promise((resolve) => {
        image.loading = true;
        const img = new Image();
        img.addEventListener("load", () => {
            image.element = img;
            image.loading = false;
            resolve();
        });
        img.addEventListener("error", () => {
            image.error = true;
            image.loading = false;
            console.error(`Error tsParticles - loading image: ${image.source}`);
            resolve();
        });
        img.src = image.source;
    });
}
async function downloadSvgImage(image) {
    if (image.type !== "svg") {
        await loadImage(image);
        return;
    }
    image.loading = true;
    const response = await fetch(image.source);
    image.loading = false;
    if (!response.ok) {
        console.error("Error tsParticles - Image not found");
        image.error = true;
    }
    if (!image.error) {
        image.svgData = await response.text();
    }
}
function replaceImageColor(image, imageData, color, particle) {
    var _a, _b, _c;
    const svgColoredData = replaceColorSvg(image, color, (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1);
    const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
    const domUrl = URL || window.URL || window.webkitURL || window;
    const url = domUrl.createObjectURL(svg);
    const img = new Image();
    const imageRes = {
        data: Object.assign(Object.assign({}, image), { svgData: svgColoredData }),
        ratio: imageData.width / imageData.height,
        replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
        source: imageData.src,
    };
    img.addEventListener("load", () => {
        const pImage = particle.image;
        if (pImage) {
            pImage.loaded = true;
            image.element = img;
        }
        domUrl.revokeObjectURL(url);
    });
    img.addEventListener("error", () => {
        domUrl.revokeObjectURL(url);
        const img2 = Object.assign(Object.assign({}, image), { error: false, loading: true });
        loadImage(img2).then(() => {
            const pImage = particle.image;
            if (pImage) {
                image.element = img2.element;
                pImage.loaded = true;
            }
        });
    });
    img.src = url;
    return imageRes;
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-image/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadImageShape": () => (/* binding */ loadImageShape)
/* harmony export */ });
/* harmony import */ var _ImageDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageDrawer */ "./node_modules/tsparticles-shape-image/esm/ImageDrawer.js");

async function loadImageShape(engine) {
    const imageDrawer = new _ImageDrawer__WEBPACK_IMPORTED_MODULE_0__.ImageDrawer();
    await engine.addShape("image", imageDrawer);
    await engine.addShape("images", imageDrawer);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNoYXBlLWltYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQThCLFNBQUksSUFBSSxTQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsU0FBSSxJQUFJLFNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5RTtBQUNsRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5REFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsb0RBQWdCLEdBQUcsNkNBQVM7QUFDcEY7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdCQUFnQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0hxRDtBQUNyRCx5Q0FBeUMsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLCtCQUErQixJQUFJO0FBQ2xHO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtRUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsb0NBQW9DLFFBQVEsV0FBVyxHQUFHLGdDQUFnQztBQUN4RztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGFBQWE7QUFDN0U7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLDZDQUE2Qyx1QkFBdUI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsWUFBWSx5QkFBeUI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbURBQW1ELFlBQVksNkJBQTZCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEY0QztBQUNyQztBQUNQLDRCQUE0QixxREFBVztBQUN2QztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtc2hhcGUtaW1hZ2UvZXNtL0ltYWdlRHJhd2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1zaGFwZS1pbWFnZS9lc20vVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXNoYXBlLWltYWdlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0ltYWdlRHJhd2VyX2ltYWdlcztcbmltcG9ydCB7IGRvd25sb2FkU3ZnSW1hZ2UsIGxvYWRJbWFnZSwgcmVwbGFjZUltYWdlQ29sb3IgfSBmcm9tIFwiLi9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIEltYWdlRHJhd2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgX0ltYWdlRHJhd2VyX2ltYWdlcy5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfSW1hZ2VEcmF3ZXJfaW1hZ2VzLCBbXSwgXCJmXCIpO1xuICAgIH1cbiAgICBnZXRTaWRlc0NvdW50KCkge1xuICAgICAgICByZXR1cm4gMTI7XG4gICAgfVxuICAgIGdldEltYWdlcyhjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVySW1hZ2VzID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfSW1hZ2VEcmF3ZXJfaW1hZ2VzLCBcImZcIikuZmluZCgodCkgPT4gdC5pZCA9PT0gY29udGFpbmVyLmlkKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJJbWFnZXMpIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0ltYWdlRHJhd2VyX2ltYWdlcywgXCJmXCIpLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBjb250YWluZXIuaWQsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBbXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW1hZ2VzKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVySW1hZ2VzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEltYWdlKGNvbnRhaW5lciwgaW1hZ2UpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVySW1hZ2VzID0gdGhpcy5nZXRJbWFnZXMoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVySW1hZ2VzID09PSBudWxsIHx8IGNvbnRhaW5lckltYWdlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVySW1hZ2VzLmltYWdlcy5wdXNoKGltYWdlKTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfSW1hZ2VEcmF3ZXJfaW1hZ2VzLCBbXSwgXCJmXCIpO1xuICAgIH1cbiAgICBkcmF3KGNvbnRleHQsIHBhcnRpY2xlLCByYWRpdXMsIG9wYWNpdHkpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBwYXJ0aWNsZS5pbWFnZTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IChfYSA9IGltYWdlID09PSBudWxsIHx8IGltYWdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbWFnZS5kYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmF0aW8gPSAoX2IgPSBpbWFnZSA9PT0gbnVsbCB8fCBpbWFnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW1hZ2UucmF0aW8pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDE7XG4gICAgICAgIGNvbnN0IHBvcyA9IHtcbiAgICAgICAgICAgIHg6IC1yYWRpdXMsXG4gICAgICAgICAgICB5OiAtcmFkaXVzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIShpbWFnZSA9PT0gbnVsbCB8fCBpbWFnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW1hZ2UuZGF0YS5zdmdEYXRhKSB8fCAhKGltYWdlID09PSBudWxsIHx8IGltYWdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbWFnZS5yZXBsYWNlQ29sb3IpKSB7XG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gb3BhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShlbGVtZW50LCBwb3MueCwgcG9zLnksIHJhZGl1cyAqIDIsIChyYWRpdXMgKiAyKSAvIHJhdGlvKTtcbiAgICAgICAgaWYgKCEoaW1hZ2UgPT09IG51bGwgfHwgaW1hZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGltYWdlLmRhdGEuc3ZnRGF0YSkgfHwgIShpbWFnZSA9PT0gbnVsbCB8fCBpbWFnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW1hZ2UucmVwbGFjZUNvbG9yKSkge1xuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZFNoYXBlKHBhcnRpY2xlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUgIT09IFwiaW1hZ2VcIiAmJiBwYXJ0aWNsZS5zaGFwZSAhPT0gXCJpbWFnZXNcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuZ2V0SW1hZ2VzKHBhcnRpY2xlLmNvbnRhaW5lcikuaW1hZ2VzO1xuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBwYXJ0aWNsZS5zaGFwZURhdGE7XG4gICAgICAgIGNvbnN0IGltYWdlID0gaW1hZ2VzLmZpbmQoKHQpID0+IHQuc291cmNlID09PSBpbWFnZURhdGEuc3JjKTtcbiAgICAgICAgbGV0IGltYWdlUmVzO1xuICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZVNoYXBlKHBhcnRpY2xlLmNvbnRhaW5lciwgaW1hZ2VEYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTaGFwZShwYXJ0aWNsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1hZ2UuZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2xvciA9IHBhcnRpY2xlLmdldEZpbGxDb2xvcigpO1xuICAgICAgICBpZiAoaW1hZ2Uuc3ZnRGF0YSAmJiBpbWFnZURhdGEucmVwbGFjZUNvbG9yICYmIGNvbG9yKSB7XG4gICAgICAgICAgICBpbWFnZVJlcyA9IHJlcGxhY2VJbWFnZUNvbG9yKGltYWdlLCBpbWFnZURhdGEsIGNvbG9yLCBwYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbWFnZVJlcyA9IHtcbiAgICAgICAgICAgICAgICBkYXRhOiBpbWFnZSxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmF0aW86IGltYWdlRGF0YS53aWR0aCAvIGltYWdlRGF0YS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgcmVwbGFjZUNvbG9yOiAoX2EgPSBpbWFnZURhdGEucmVwbGFjZUNvbG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBpbWFnZURhdGEucmVwbGFjZV9jb2xvcixcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGltYWdlRGF0YS5zcmMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaW1hZ2VSZXMucmF0aW8pIHtcbiAgICAgICAgICAgIGltYWdlUmVzLnJhdGlvID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxsID0gKF9iID0gaW1hZ2VEYXRhLmZpbGwpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHBhcnRpY2xlLmZpbGw7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKF9jID0gaW1hZ2VEYXRhLmNsb3NlKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBwYXJ0aWNsZS5jbG9zZTtcbiAgICAgICAgY29uc3QgaW1hZ2VTaGFwZSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZVJlcyxcbiAgICAgICAgICAgIGZpbGwsXG4gICAgICAgICAgICBjbG9zZSxcbiAgICAgICAgfTtcbiAgICAgICAgcGFydGljbGUuaW1hZ2UgPSBpbWFnZVNoYXBlLmltYWdlO1xuICAgICAgICBwYXJ0aWNsZS5maWxsID0gaW1hZ2VTaGFwZS5maWxsO1xuICAgICAgICBwYXJ0aWNsZS5jbG9zZSA9IGltYWdlU2hhcGUuY2xvc2U7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRJbWFnZVNoYXBlKGNvbnRhaW5lciwgaW1hZ2VTaGFwZSkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBpbWFnZVNoYXBlLnNyYztcbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHRzUGFydGljbGVzIC0gTm8gaW1hZ2Uuc3JjXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2Uuc3Vic3RyKHNvdXJjZS5sZW5ndGggLSAzKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFkZEltYWdlKGNvbnRhaW5lciwgaW1hZ2UpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VGdW5jID0gaW1hZ2VTaGFwZS5yZXBsYWNlQ29sb3IgPyBkb3dubG9hZFN2Z0ltYWdlIDogbG9hZEltYWdlO1xuICAgICAgICAgICAgYXdhaXQgaW1hZ2VGdW5jKGltYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdHNQYXJ0aWNsZXMgZXJyb3IgLSAke2ltYWdlU2hhcGUuc3JjfSBub3QgZm91bmRgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbl9JbWFnZURyYXdlcl9pbWFnZXMgPSBuZXcgV2Vha01hcCgpO1xuIiwiaW1wb3J0IHsgZ2V0U3R5bGVGcm9tSHNsIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuY29uc3QgY3VycmVudENvbG9yUmVnZXggPSAvKCMoPzpbMC05YS1mXXsyfSl7Miw0fXwoI1swLTlhLWZdezN9KXwocmdifGhzbClhP1xcKCgtP1xcZCslP1ssXFxzXSspezIsM31cXHMqW1xcZC5dKyU/XFwpKXxjdXJyZW50Y29sb3IvZ2k7XG5mdW5jdGlvbiByZXBsYWNlQ29sb3JTdmcoaW1hZ2VTaGFwZSwgY29sb3IsIG9wYWNpdHkpIHtcbiAgICBjb25zdCB7IHN2Z0RhdGEgfSA9IGltYWdlU2hhcGU7XG4gICAgaWYgKCFzdmdEYXRhKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBjb2xvclN0eWxlID0gZ2V0U3R5bGVGcm9tSHNsKGNvbG9yLCBvcGFjaXR5KTtcbiAgICBpZiAoc3ZnRGF0YS5pbmNsdWRlcyhcImZpbGxcIikpIHtcbiAgICAgICAgcmV0dXJuIHN2Z0RhdGEucmVwbGFjZShjdXJyZW50Q29sb3JSZWdleCwgKCkgPT4gY29sb3JTdHlsZSk7XG4gICAgfVxuICAgIGNvbnN0IHByZUZpbGxJbmRleCA9IHN2Z0RhdGEuaW5kZXhPZihcIj5cIik7XG4gICAgcmV0dXJuIGAke3N2Z0RhdGEuc3Vic3RyaW5nKDAsIHByZUZpbGxJbmRleCl9IGZpbGw9XCIke2NvbG9yU3R5bGV9XCIke3N2Z0RhdGEuc3Vic3RyaW5nKHByZUZpbGxJbmRleCl9YDtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgaW1hZ2UubG9hZGluZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaW1hZ2UuZWxlbWVudCA9IGltZztcbiAgICAgICAgICAgIGltYWdlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaW1hZ2UuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgaW1hZ2UubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgdHNQYXJ0aWNsZXMgLSBsb2FkaW5nIGltYWdlOiAke2ltYWdlLnNvdXJjZX1gKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltZy5zcmMgPSBpbWFnZS5zb3VyY2U7XG4gICAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRTdmdJbWFnZShpbWFnZSkge1xuICAgIGlmIChpbWFnZS50eXBlICE9PSBcInN2Z1wiKSB7XG4gICAgICAgIGF3YWl0IGxvYWRJbWFnZShpbWFnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW1hZ2UubG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChpbWFnZS5zb3VyY2UpO1xuICAgIGltYWdlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB0c1BhcnRpY2xlcyAtIEltYWdlIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgaW1hZ2UuZXJyb3IgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIWltYWdlLmVycm9yKSB7XG4gICAgICAgIGltYWdlLnN2Z0RhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VJbWFnZUNvbG9yKGltYWdlLCBpbWFnZURhdGEsIGNvbG9yLCBwYXJ0aWNsZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IHN2Z0NvbG9yZWREYXRhID0gcmVwbGFjZUNvbG9yU3ZnKGltYWdlLCBjb2xvciwgKF9iID0gKF9hID0gcGFydGljbGUub3BhY2l0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZhbHVlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxKTtcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbc3ZnQ29sb3JlZERhdGFdLCB7IHR5cGU6IFwiaW1hZ2Uvc3ZnK3htbFwiIH0pO1xuICAgIGNvbnN0IGRvbVVybCA9IFVSTCB8fCB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93O1xuICAgIGNvbnN0IHVybCA9IGRvbVVybC5jcmVhdGVPYmplY3RVUkwoc3ZnKTtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zdCBpbWFnZVJlcyA9IHtcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbWFnZSksIHsgc3ZnRGF0YTogc3ZnQ29sb3JlZERhdGEgfSksXG4gICAgICAgIHJhdGlvOiBpbWFnZURhdGEud2lkdGggLyBpbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICByZXBsYWNlQ29sb3I6IChfYyA9IGltYWdlRGF0YS5yZXBsYWNlQ29sb3IpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGltYWdlRGF0YS5yZXBsYWNlX2NvbG9yLFxuICAgICAgICBzb3VyY2U6IGltYWdlRGF0YS5zcmMsXG4gICAgfTtcbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwSW1hZ2UgPSBwYXJ0aWNsZS5pbWFnZTtcbiAgICAgICAgaWYgKHBJbWFnZSkge1xuICAgICAgICAgICAgcEltYWdlLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBpbWFnZS5lbGVtZW50ID0gaW1nO1xuICAgICAgICB9XG4gICAgICAgIGRvbVVybC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9KTtcbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgZG9tVXJsLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBjb25zdCBpbWcyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbWFnZSksIHsgZXJyb3I6IGZhbHNlLCBsb2FkaW5nOiB0cnVlIH0pO1xuICAgICAgICBsb2FkSW1hZ2UoaW1nMikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwSW1hZ2UgPSBwYXJ0aWNsZS5pbWFnZTtcbiAgICAgICAgICAgIGlmIChwSW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBpbWFnZS5lbGVtZW50ID0gaW1nMi5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHBJbWFnZS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICAgIHJldHVybiBpbWFnZVJlcztcbn1cbiIsImltcG9ydCB7IEltYWdlRHJhd2VyIH0gZnJvbSBcIi4vSW1hZ2VEcmF3ZXJcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkSW1hZ2VTaGFwZShlbmdpbmUpIHtcbiAgICBjb25zdCBpbWFnZURyYXdlciA9IG5ldyBJbWFnZURyYXdlcigpO1xuICAgIGF3YWl0IGVuZ2luZS5hZGRTaGFwZShcImltYWdlXCIsIGltYWdlRHJhd2VyKTtcbiAgICBhd2FpdCBlbmdpbmUuYWRkU2hhcGUoXCJpbWFnZXNcIiwgaW1hZ2VEcmF3ZXIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9