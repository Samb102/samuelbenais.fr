"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-particles-links"],{

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkInstance": () => (/* binding */ LinkInstance)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-interaction-particles-links/esm/Utils.js");


class LinkInstance {
    constructor(container) {
        this.container = container;
    }
    particleCreated(particle) {
        const linkParticle = particle;
        linkParticle.links = [];
    }
    particleDestroyed(particle) {
        const linkParticle = particle;
        linkParticle.links = [];
    }
    drawParticle(context, particle) {
        const linkParticle = particle, container = this.container, particles = container.particles, pOptions = particle.options;
        if (linkParticle.links.length <= 0) {
            return;
        }
        context.save();
        const p1Links = linkParticle.links.filter((l) => {
            const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);
            return linkFreq <= pOptions.links.frequency;
        });
        for (const link of p1Links) {
            const p2 = link.destination;
            if (pOptions.links.triangles.enable) {
                const links = p1Links.map((l) => l.destination), vertices = p2.links.filter((t) => {
                    const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
                    return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                });
                if (vertices.length) {
                    for (const vertex of vertices) {
                        const p3 = vertex.destination, triangleFreq = particles.getTriangleFrequency(linkParticle, p2, p3);
                        if (triangleFreq > pOptions.links.triangles.frequency) {
                            continue;
                        }
                        this.drawLinkTriangle(linkParticle, link, vertex);
                    }
                }
            }
            if (link.opacity > 0 && container.retina.linksWidth > 0) {
                this.drawLinkLine(linkParticle, link);
            }
        }
        context.restore();
    }
    drawLinkTriangle(p1, link1, link2) {
        var _a;
        const container = this.container, options = container.actualOptions, p2 = link1.destination, p3 = link2.destination, triangleOptions = p1.options.links.triangles, opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
        if (opacityTriangle <= 0) {
            return;
        }
        container.canvas.draw((ctx) => {
            const pos1 = p1.getPosition();
            const pos2 = p2.getPosition();
            const pos3 = p3.getPosition();
            if ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2) > container.retina.linksDistance ||
                (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos3, pos2) > container.retina.linksDistance ||
                (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos3, pos1) > container.retina.linksDistance) {
                return;
            }
            let colorTriangle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(triangleOptions.color);
            if (!colorTriangle) {
                const linksOptions = p1.options.links, linkColor = linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorTriangle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkColor)(p1, p2, linkColor);
            }
            if (!colorTriangle) {
                return;
            }
            (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.drawLinkTriangle)(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
        });
    }
    drawLinkLine(p1, link) {
        const container = this.container, options = container.actualOptions, p2 = link.destination, pos1 = p1.getPosition(), pos2 = p2.getPosition();
        let opacity = link.opacity;
        container.canvas.draw((ctx) => {
            var _a, _b;
            let colorLine;
            const twinkle = p1.options.twinkle.lines;
            if (twinkle.enable) {
                const twinkleFreq = twinkle.frequency, twinkleRgb = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(twinkle.color), twinkling = Math.random() < twinkleFreq;
                if (twinkling && twinkleRgb) {
                    colorLine = twinkleRgb;
                    opacity = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(twinkle.opacity);
                }
            }
            if (!colorLine) {
                const linksOptions = p1.options.links, linkColor = linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorLine = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkColor)(p1, p2, linkColor);
            }
            if (!colorLine) {
                return;
            }
            const width = (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, maxDistance = (_b = p1.retina.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
            (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.drawLinkLine)(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Linker.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Linker.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Linker": () => (/* binding */ Linker)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
    let distance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2);
    if (!warp || distance <= optDistance) {
        return distance;
    }
    const pos2NE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y,
    };
    distance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2NE);
    if (distance <= optDistance) {
        return distance;
    }
    const pos2SE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y - canvasSize.height,
    };
    distance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2SE);
    if (distance <= optDistance) {
        return distance;
    }
    const pos2SW = {
        x: pos2.x,
        y: pos2.y - canvasSize.height,
    };
    distance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos1, pos2SW);
    return distance;
}
class Linker extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled(particle) {
        return particle.options.links.enable;
    }
    reset() {
    }
    async interact(p1) {
        var _a;
        p1.links = [];
        const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
        if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
            return;
        }
        const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance, warp = linkOpt1.warp, range = warp
            ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(pos1.x, pos1.y, optDistance), query = container.particles.quadTree.query(range);
        for (const p2 of query) {
            const linkOpt2 = p2.options.links;
            if (p1 === p2 ||
                !linkOpt2.enable ||
                linkOpt1.id !== linkOpt2.id ||
                p2.spawning ||
                p2.destroyed ||
                p1.links.map((t) => t.destination).indexOf(p2) !== -1 ||
                p2.links.map((t) => t.destination).indexOf(p1) !== -1) {
                continue;
            }
            const pos2 = p2.getPosition();
            if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                continue;
            }
            const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
            if (distance > optDistance) {
                return;
            }
            const opacityLine = (1 - distance / optDistance) * optOpacity;
            this.setColor(p1);
            p1.links.push({
                destination: p2,
                opacity: opacityLine,
            });
        }
    }
    setColor(p1) {
        const container = this.container, linksOptions = p1.options.links;
        let linkColor = linksOptions.id === undefined
            ? container.particles.linksColor
            : container.particles.linksColors.get(linksOptions.id);
        if (!linkColor) {
            const optColor = linksOptions.color;
            linkColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);
            if (linksOptions.id === undefined) {
                container.particles.linksColor = linkColor;
            }
            else {
                container.particles.linksColors.set(linksOptions.id, linkColor);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Utils.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Utils.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawLinkLine": () => (/* binding */ drawLinkLine),
/* harmony export */   "drawLinkTriangle": () => (/* binding */ drawLinkTriangle)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
    let drawn = false;
    if ((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(begin, end) <= maxDistance) {
        (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawLine)(context, begin, end);
        drawn = true;
    }
    else if (warp) {
        let pi1;
        let pi2;
        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };
        const d1 = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(begin, endNE);
        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;
            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        }
        else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            };
            const d2 = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(begin, endSW);
            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                const xi = -yi / (d2.dy / d2.dx);
                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            }
            else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                };
                const d3 = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances)(begin, endSE);
                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);
                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }
        if (pi1 && pi2) {
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawLine)(context, begin, pi1);
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawLine)(context, end, pi2);
            drawn = true;
        }
    }
    if (!drawn) {
        return;
    }
    context.lineWidth = width;
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.strokeStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(colorLine, opacity);
    if (shadow.enable) {
        const shadowColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(shadow.color);
        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(shadowColor);
        }
    }
    context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
    (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawTriangle)(context, pos1, pos2, pos3);
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.fillStyle = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(colorTriangle, opacityTriangle);
    context.fill();
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadParticlesLinksInteraction": () => (/* binding */ loadParticlesLinksInteraction)
/* harmony export */ });
/* harmony import */ var _interaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interaction */ "./node_modules/tsparticles-interaction-particles-links/esm/interaction.js");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin */ "./node_modules/tsparticles-interaction-particles-links/esm/plugin.js");


async function loadParticlesLinksInteraction(engine) {
    await (0,_interaction__WEBPACK_IMPORTED_MODULE_0__.loadInteraction)(engine);
    await (0,_plugin__WEBPACK_IMPORTED_MODULE_1__.loadPlugin)(engine);
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/interaction.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/interaction.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadInteraction": () => (/* binding */ loadInteraction)
/* harmony export */ });
/* harmony import */ var _Linker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Linker */ "./node_modules/tsparticles-interaction-particles-links/esm/Linker.js");

async function loadInteraction(engine) {
    await engine.addInteractor("particlesLinks", (container) => new _Linker__WEBPACK_IMPORTED_MODULE_0__.Linker(container));
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/plugin.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/plugin.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadPlugin": () => (/* binding */ loadPlugin)
/* harmony export */ });
/* harmony import */ var _LinkInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinkInstance */ "./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js");

class LinksPlugin {
    constructor() {
        this.id = "links";
    }
    getPlugin(container) {
        return new _LinkInstance__WEBPACK_IMPORTED_MODULE_0__.LinkInstance(container);
    }
    needsPlugin() {
        return true;
    }
    loadOptions() {
    }
}
async function loadPlugin(engine) {
    const plugin = new LinksPlugin();
    await engine.addPlugin(plugin);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLXBhcnRpY2xlcy1saW5rcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEY7QUFDakM7QUFDbEQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFXO0FBQzNCLGdCQUFnQiwrREFBVztBQUMzQixnQkFBZ0IsK0RBQVc7QUFDM0I7QUFDQTtBQUNBLGdDQUFnQyw4REFBVTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxnRUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksd0RBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsOERBQVU7QUFDOUU7QUFDQTtBQUNBLDhCQUE4QixpRUFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0VBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQVk7QUFDeEIsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R2tIO0FBQ2xIO0FBQ0EsbUJBQW1CLCtEQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtEQUFXO0FBQzFCO0FBQ0E7QUFDTyxxQkFBcUIsdUVBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBEQUFVO0FBQzVCLGtCQUFrQixzREFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZxSDtBQUM5RztBQUNQO0FBQ0EsUUFBUSwrREFBVztBQUNuQixRQUFRLDREQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnRUFBWTtBQUMvQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0VBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0VBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNERBQVE7QUFDcEIsWUFBWSw0REFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtRUFBZTtBQUN6QztBQUNBLDRCQUE0Qiw4REFBVTtBQUN0QztBQUNBO0FBQ0Esa0NBQWtDLG1FQUFlO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxJQUFJLGdFQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtRUFBZTtBQUN2QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVFZ0Q7QUFDVjtBQUMvQjtBQUNQLFVBQVUsNkRBQWU7QUFDekIsVUFBVSxtREFBVTtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQ0xrQztBQUMzQjtBQUNQLG9FQUFvRSwyQ0FBTTtBQUMxRTs7Ozs7Ozs7Ozs7Ozs7OztBQ0g4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tcGFydGljbGVzLWxpbmtzL2VzbS9MaW5rSW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLXBhcnRpY2xlcy1saW5rcy9lc20vTGlua2VyLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtbGlua3MvZXNtL1V0aWxzLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtbGlua3MvZXNtL2luZGV4LmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtbGlua3MvZXNtL2ludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3NhbXVlbGJlbmFpcy5mci8uL25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtbGlua3MvZXNtL3BsdWdpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2xvclRvUmdiLCBnZXREaXN0YW5jZSwgZ2V0TGlua0NvbG9yLCBnZXRSYW5nZVZhbHVlIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuaW1wb3J0IHsgZHJhd0xpbmtMaW5lLCBkcmF3TGlua1RyaWFuZ2xlIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBMaW5rSW5zdGFuY2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgcGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IGxpbmtQYXJ0aWNsZSA9IHBhcnRpY2xlO1xuICAgICAgICBsaW5rUGFydGljbGUubGlua3MgPSBbXTtcbiAgICB9XG4gICAgcGFydGljbGVEZXN0cm95ZWQocGFydGljbGUpIHtcbiAgICAgICAgY29uc3QgbGlua1BhcnRpY2xlID0gcGFydGljbGU7XG4gICAgICAgIGxpbmtQYXJ0aWNsZS5saW5rcyA9IFtdO1xuICAgIH1cbiAgICBkcmF3UGFydGljbGUoY29udGV4dCwgcGFydGljbGUpIHtcbiAgICAgICAgY29uc3QgbGlua1BhcnRpY2xlID0gcGFydGljbGUsIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBwYXJ0aWNsZXMgPSBjb250YWluZXIucGFydGljbGVzLCBwT3B0aW9ucyA9IHBhcnRpY2xlLm9wdGlvbnM7XG4gICAgICAgIGlmIChsaW5rUGFydGljbGUubGlua3MubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29uc3QgcDFMaW5rcyA9IGxpbmtQYXJ0aWNsZS5saW5rcy5maWx0ZXIoKGwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtGcmVxID0gY29udGFpbmVyLnBhcnRpY2xlcy5nZXRMaW5rRnJlcXVlbmN5KGxpbmtQYXJ0aWNsZSwgbC5kZXN0aW5hdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gbGlua0ZyZXEgPD0gcE9wdGlvbnMubGlua3MuZnJlcXVlbmN5O1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIHAxTGlua3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHAyID0gbGluay5kZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChwT3B0aW9ucy5saW5rcy50cmlhbmdsZXMuZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlua3MgPSBwMUxpbmtzLm1hcCgobCkgPT4gbC5kZXN0aW5hdGlvbiksIHZlcnRpY2VzID0gcDIubGlua3MuZmlsdGVyKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtGcmVxID0gY29udGFpbmVyLnBhcnRpY2xlcy5nZXRMaW5rRnJlcXVlbmN5KHAyLCB0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmtGcmVxIDw9IHAyLm9wdGlvbnMubGlua3MuZnJlcXVlbmN5ICYmIGxpbmtzLmluZGV4T2YodC5kZXN0aW5hdGlvbikgPj0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodmVydGljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmVydGV4IG9mIHZlcnRpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwMyA9IHZlcnRleC5kZXN0aW5hdGlvbiwgdHJpYW5nbGVGcmVxID0gcGFydGljbGVzLmdldFRyaWFuZ2xlRnJlcXVlbmN5KGxpbmtQYXJ0aWNsZSwgcDIsIHAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmlhbmdsZUZyZXEgPiBwT3B0aW9ucy5saW5rcy50cmlhbmdsZXMuZnJlcXVlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdMaW5rVHJpYW5nbGUobGlua1BhcnRpY2xlLCBsaW5rLCB2ZXJ0ZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmsub3BhY2l0eSA+IDAgJiYgY29udGFpbmVyLnJldGluYS5saW5rc1dpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0xpbmtMaW5lKGxpbmtQYXJ0aWNsZSwgbGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIGRyYXdMaW5rVHJpYW5nbGUocDEsIGxpbmsxLCBsaW5rMikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIHAyID0gbGluazEuZGVzdGluYXRpb24sIHAzID0gbGluazIuZGVzdGluYXRpb24sIHRyaWFuZ2xlT3B0aW9ucyA9IHAxLm9wdGlvbnMubGlua3MudHJpYW5nbGVzLCBvcGFjaXR5VHJpYW5nbGUgPSAoX2EgPSB0cmlhbmdsZU9wdGlvbnMub3BhY2l0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKGxpbmsxLm9wYWNpdHkgKyBsaW5rMi5vcGFjaXR5KSAvIDI7XG4gICAgICAgIGlmIChvcGFjaXR5VHJpYW5nbGUgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5jYW52YXMuZHJhdygoY3R4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3MxID0gcDEuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHBvczIgPSBwMi5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgcG9zMyA9IHAzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBpZiAoZ2V0RGlzdGFuY2UocG9zMSwgcG9zMikgPiBjb250YWluZXIucmV0aW5hLmxpbmtzRGlzdGFuY2UgfHxcbiAgICAgICAgICAgICAgICBnZXREaXN0YW5jZShwb3MzLCBwb3MyKSA+IGNvbnRhaW5lci5yZXRpbmEubGlua3NEaXN0YW5jZSB8fFxuICAgICAgICAgICAgICAgIGdldERpc3RhbmNlKHBvczMsIHBvczEpID4gY29udGFpbmVyLnJldGluYS5saW5rc0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNvbG9yVHJpYW5nbGUgPSBjb2xvclRvUmdiKHRyaWFuZ2xlT3B0aW9ucy5jb2xvcik7XG4gICAgICAgICAgICBpZiAoIWNvbG9yVHJpYW5nbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rc09wdGlvbnMgPSBwMS5vcHRpb25zLmxpbmtzLCBsaW5rQ29sb3IgPSBsaW5rc09wdGlvbnMuaWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IGNvbnRhaW5lci5wYXJ0aWNsZXMubGlua3NDb2xvcnMuZ2V0KGxpbmtzT3B0aW9ucy5pZClcbiAgICAgICAgICAgICAgICAgICAgOiBjb250YWluZXIucGFydGljbGVzLmxpbmtzQ29sb3I7XG4gICAgICAgICAgICAgICAgY29sb3JUcmlhbmdsZSA9IGdldExpbmtDb2xvcihwMSwgcDIsIGxpbmtDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbG9yVHJpYW5nbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3TGlua1RyaWFuZ2xlKGN0eCwgcG9zMSwgcG9zMiwgcG9zMywgb3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5lbmFibGUsIG9wdGlvbnMuYmFja2dyb3VuZE1hc2suY29tcG9zaXRlLCBjb2xvclRyaWFuZ2xlLCBvcGFjaXR5VHJpYW5nbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZHJhd0xpbmtMaW5lKHAxLCBsaW5rKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIHAyID0gbGluay5kZXN0aW5hdGlvbiwgcG9zMSA9IHAxLmdldFBvc2l0aW9uKCksIHBvczIgPSBwMi5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgb3BhY2l0eSA9IGxpbmsub3BhY2l0eTtcbiAgICAgICAgY29udGFpbmVyLmNhbnZhcy5kcmF3KChjdHgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBsZXQgY29sb3JMaW5lO1xuICAgICAgICAgICAgY29uc3QgdHdpbmtsZSA9IHAxLm9wdGlvbnMudHdpbmtsZS5saW5lcztcbiAgICAgICAgICAgIGlmICh0d2lua2xlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR3aW5rbGVGcmVxID0gdHdpbmtsZS5mcmVxdWVuY3ksIHR3aW5rbGVSZ2IgPSBjb2xvclRvUmdiKHR3aW5rbGUuY29sb3IpLCB0d2lua2xpbmcgPSBNYXRoLnJhbmRvbSgpIDwgdHdpbmtsZUZyZXE7XG4gICAgICAgICAgICAgICAgaWYgKHR3aW5rbGluZyAmJiB0d2lua2xlUmdiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTGluZSA9IHR3aW5rbGVSZ2I7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBnZXRSYW5nZVZhbHVlKHR3aW5rbGUub3BhY2l0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb2xvckxpbmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rc09wdGlvbnMgPSBwMS5vcHRpb25zLmxpbmtzLCBsaW5rQ29sb3IgPSBsaW5rc09wdGlvbnMuaWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IGNvbnRhaW5lci5wYXJ0aWNsZXMubGlua3NDb2xvcnMuZ2V0KGxpbmtzT3B0aW9ucy5pZClcbiAgICAgICAgICAgICAgICAgICAgOiBjb250YWluZXIucGFydGljbGVzLmxpbmtzQ29sb3I7XG4gICAgICAgICAgICAgICAgY29sb3JMaW5lID0gZ2V0TGlua0NvbG9yKHAxLCBwMiwgbGlua0NvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29sb3JMaW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSAoX2EgPSBwMS5yZXRpbmEubGlua3NXaWR0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY29udGFpbmVyLnJldGluYS5saW5rc1dpZHRoLCBtYXhEaXN0YW5jZSA9IChfYiA9IHAxLnJldGluYS5saW5rc0Rpc3RhbmNlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb250YWluZXIucmV0aW5hLmxpbmtzRGlzdGFuY2U7XG4gICAgICAgICAgICBkcmF3TGlua0xpbmUoY3R4LCB3aWR0aCwgcG9zMSwgcG9zMiwgbWF4RGlzdGFuY2UsIGNvbnRhaW5lci5jYW52YXMuc2l6ZSwgcDEub3B0aW9ucy5saW5rcy53YXJwLCBvcHRpb25zLmJhY2tncm91bmRNYXNrLmVuYWJsZSwgb3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5jb21wb3NpdGUsIGNvbG9yTGluZSwgb3BhY2l0eSwgcDEub3B0aW9ucy5saW5rcy5zaGFkb3cpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDaXJjbGUsIENpcmNsZVdhcnAsIFBhcnRpY2xlc0ludGVyYWN0b3JCYXNlLCBnZXREaXN0YW5jZSwgZ2V0TGlua1JhbmRvbUNvbG9yIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZnVuY3Rpb24gZ2V0TGlua0Rpc3RhbmNlKHBvczEsIHBvczIsIG9wdERpc3RhbmNlLCBjYW52YXNTaXplLCB3YXJwKSB7XG4gICAgbGV0IGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UocG9zMSwgcG9zMik7XG4gICAgaWYgKCF3YXJwIHx8IGRpc3RhbmNlIDw9IG9wdERpc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgcG9zMk5FID0ge1xuICAgICAgICB4OiBwb3MyLnggLSBjYW52YXNTaXplLndpZHRoLFxuICAgICAgICB5OiBwb3MyLnksXG4gICAgfTtcbiAgICBkaXN0YW5jZSA9IGdldERpc3RhbmNlKHBvczEsIHBvczJORSk7XG4gICAgaWYgKGRpc3RhbmNlIDw9IG9wdERpc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgcG9zMlNFID0ge1xuICAgICAgICB4OiBwb3MyLnggLSBjYW52YXNTaXplLndpZHRoLFxuICAgICAgICB5OiBwb3MyLnkgLSBjYW52YXNTaXplLmhlaWdodCxcbiAgICB9O1xuICAgIGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UocG9zMSwgcG9zMlNFKTtcbiAgICBpZiAoZGlzdGFuY2UgPD0gb3B0RGlzdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCBwb3MyU1cgPSB7XG4gICAgICAgIHg6IHBvczIueCxcbiAgICAgICAgeTogcG9zMi55IC0gY2FudmFzU2l6ZS5oZWlnaHQsXG4gICAgfTtcbiAgICBkaXN0YW5jZSA9IGdldERpc3RhbmNlKHBvczEsIHBvczJTVyk7XG4gICAgcmV0dXJuIGRpc3RhbmNlO1xufVxuZXhwb3J0IGNsYXNzIExpbmtlciBleHRlbmRzIFBhcnRpY2xlc0ludGVyYWN0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyKTtcbiAgICB9XG4gICAgaXNFbmFibGVkKHBhcnRpY2xlKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWNsZS5vcHRpb25zLmxpbmtzLmVuYWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgfVxuICAgIGFzeW5jIGludGVyYWN0KHAxKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcDEubGlua3MgPSBbXTtcbiAgICAgICAgY29uc3QgcG9zMSA9IHAxLmdldFBvc2l0aW9uKCksIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBjYW52YXNTaXplID0gY29udGFpbmVyLmNhbnZhcy5zaXplO1xuICAgICAgICBpZiAocG9zMS54IDwgMCB8fCBwb3MxLnkgPCAwIHx8IHBvczEueCA+IGNhbnZhc1NpemUud2lkdGggfHwgcG9zMS55ID4gY2FudmFzU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaW5rT3B0MSA9IHAxLm9wdGlvbnMubGlua3MsIG9wdE9wYWNpdHkgPSBsaW5rT3B0MS5vcGFjaXR5LCBvcHREaXN0YW5jZSA9IChfYSA9IHAxLnJldGluYS5saW5rc0Rpc3RhbmNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb250YWluZXIucmV0aW5hLmxpbmtzRGlzdGFuY2UsIHdhcnAgPSBsaW5rT3B0MS53YXJwLCByYW5nZSA9IHdhcnBcbiAgICAgICAgICAgID8gbmV3IENpcmNsZVdhcnAocG9zMS54LCBwb3MxLnksIG9wdERpc3RhbmNlLCBjYW52YXNTaXplKVxuICAgICAgICAgICAgOiBuZXcgQ2lyY2xlKHBvczEueCwgcG9zMS55LCBvcHREaXN0YW5jZSksIHF1ZXJ5ID0gY29udGFpbmVyLnBhcnRpY2xlcy5xdWFkVHJlZS5xdWVyeShyYW5nZSk7XG4gICAgICAgIGZvciAoY29uc3QgcDIgb2YgcXVlcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtPcHQyID0gcDIub3B0aW9ucy5saW5rcztcbiAgICAgICAgICAgIGlmIChwMSA9PT0gcDIgfHxcbiAgICAgICAgICAgICAgICAhbGlua09wdDIuZW5hYmxlIHx8XG4gICAgICAgICAgICAgICAgbGlua09wdDEuaWQgIT09IGxpbmtPcHQyLmlkIHx8XG4gICAgICAgICAgICAgICAgcDIuc3Bhd25pbmcgfHxcbiAgICAgICAgICAgICAgICBwMi5kZXN0cm95ZWQgfHxcbiAgICAgICAgICAgICAgICBwMS5saW5rcy5tYXAoKHQpID0+IHQuZGVzdGluYXRpb24pLmluZGV4T2YocDIpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgIHAyLmxpbmtzLm1hcCgodCkgPT4gdC5kZXN0aW5hdGlvbikuaW5kZXhPZihwMSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb3MyID0gcDIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChwb3MyLnggPCAwIHx8IHBvczIueSA8IDAgfHwgcG9zMi54ID4gY2FudmFzU2l6ZS53aWR0aCB8fCBwb3MyLnkgPiBjYW52YXNTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBnZXRMaW5rRGlzdGFuY2UocG9zMSwgcG9zMiwgb3B0RGlzdGFuY2UsIGNhbnZhc1NpemUsIHdhcnAgJiYgbGlua09wdDIud2FycCk7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPiBvcHREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9wYWNpdHlMaW5lID0gKDEgLSBkaXN0YW5jZSAvIG9wdERpc3RhbmNlKSAqIG9wdE9wYWNpdHk7XG4gICAgICAgICAgICB0aGlzLnNldENvbG9yKHAxKTtcbiAgICAgICAgICAgIHAxLmxpbmtzLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBwMixcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5TGluZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldENvbG9yKHAxKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBsaW5rc09wdGlvbnMgPSBwMS5vcHRpb25zLmxpbmtzO1xuICAgICAgICBsZXQgbGlua0NvbG9yID0gbGlua3NPcHRpb25zLmlkID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY29udGFpbmVyLnBhcnRpY2xlcy5saW5rc0NvbG9yXG4gICAgICAgICAgICA6IGNvbnRhaW5lci5wYXJ0aWNsZXMubGlua3NDb2xvcnMuZ2V0KGxpbmtzT3B0aW9ucy5pZCk7XG4gICAgICAgIGlmICghbGlua0NvbG9yKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRDb2xvciA9IGxpbmtzT3B0aW9ucy5jb2xvcjtcbiAgICAgICAgICAgIGxpbmtDb2xvciA9IGdldExpbmtSYW5kb21Db2xvcihvcHRDb2xvciwgbGlua3NPcHRpb25zLmJsaW5rLCBsaW5rc09wdGlvbnMuY29uc2VudCk7XG4gICAgICAgICAgICBpZiAobGlua3NPcHRpb25zLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmxpbmtzQ29sb3IgPSBsaW5rQ29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmxpbmtzQ29sb3JzLnNldChsaW5rc09wdGlvbnMuaWQsIGxpbmtDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjb2xvclRvUmdiLCBkcmF3TGluZSwgZHJhd1RyaWFuZ2xlLCBnZXREaXN0YW5jZSwgZ2V0RGlzdGFuY2VzLCBnZXRTdHlsZUZyb21SZ2IsIH0gZnJvbSBcInRzcGFydGljbGVzLWVuZ2luZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdMaW5rTGluZShjb250ZXh0LCB3aWR0aCwgYmVnaW4sIGVuZCwgbWF4RGlzdGFuY2UsIGNhbnZhc1NpemUsIHdhcnAsIGJhY2tncm91bmRNYXNrLCBjb21wb3NpdGUsIGNvbG9yTGluZSwgb3BhY2l0eSwgc2hhZG93KSB7XG4gICAgbGV0IGRyYXduID0gZmFsc2U7XG4gICAgaWYgKGdldERpc3RhbmNlKGJlZ2luLCBlbmQpIDw9IG1heERpc3RhbmNlKSB7XG4gICAgICAgIGRyYXdMaW5lKGNvbnRleHQsIGJlZ2luLCBlbmQpO1xuICAgICAgICBkcmF3biA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdhcnApIHtcbiAgICAgICAgbGV0IHBpMTtcbiAgICAgICAgbGV0IHBpMjtcbiAgICAgICAgY29uc3QgZW5kTkUgPSB7XG4gICAgICAgICAgICB4OiBlbmQueCAtIGNhbnZhc1NpemUud2lkdGgsXG4gICAgICAgICAgICB5OiBlbmQueSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZDEgPSBnZXREaXN0YW5jZXMoYmVnaW4sIGVuZE5FKTtcbiAgICAgICAgaWYgKGQxLmRpc3RhbmNlIDw9IG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCB5aSA9IGJlZ2luLnkgLSAoZDEuZHkgLyBkMS5keCkgKiBiZWdpbi54O1xuICAgICAgICAgICAgcGkxID0geyB4OiAwLCB5OiB5aSB9O1xuICAgICAgICAgICAgcGkyID0geyB4OiBjYW52YXNTaXplLndpZHRoLCB5OiB5aSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZW5kU1cgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kLngsXG4gICAgICAgICAgICAgICAgeTogZW5kLnkgLSBjYW52YXNTaXplLmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBkMiA9IGdldERpc3RhbmNlcyhiZWdpbiwgZW5kU1cpO1xuICAgICAgICAgICAgaWYgKGQyLmRpc3RhbmNlIDw9IG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeWkgPSBiZWdpbi55IC0gKGQyLmR5IC8gZDIuZHgpICogYmVnaW4ueDtcbiAgICAgICAgICAgICAgICBjb25zdCB4aSA9IC15aSAvIChkMi5keSAvIGQyLmR4KTtcbiAgICAgICAgICAgICAgICBwaTEgPSB7IHg6IHhpLCB5OiAwIH07XG4gICAgICAgICAgICAgICAgcGkyID0geyB4OiB4aSwgeTogY2FudmFzU2l6ZS5oZWlnaHQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZFNFID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBlbmQueCAtIGNhbnZhc1NpemUud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGVuZC55IC0gY2FudmFzU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBkMyA9IGdldERpc3RhbmNlcyhiZWdpbiwgZW5kU0UpO1xuICAgICAgICAgICAgICAgIGlmIChkMy5kaXN0YW5jZSA8PSBtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5aSA9IGJlZ2luLnkgLSAoZDMuZHkgLyBkMy5keCkgKiBiZWdpbi54O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4aSA9IC15aSAvIChkMy5keSAvIGQzLmR4KTtcbiAgICAgICAgICAgICAgICAgICAgcGkxID0geyB4OiB4aSwgeTogeWkgfTtcbiAgICAgICAgICAgICAgICAgICAgcGkyID0geyB4OiBwaTEueCArIGNhbnZhc1NpemUud2lkdGgsIHk6IHBpMS55ICsgY2FudmFzU2l6ZS5oZWlnaHQgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBpMSAmJiBwaTIpIHtcbiAgICAgICAgICAgIGRyYXdMaW5lKGNvbnRleHQsIGJlZ2luLCBwaTEpO1xuICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgZW5kLCBwaTIpO1xuICAgICAgICAgICAgZHJhd24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZHJhd24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgIGlmIChiYWNrZ3JvdW5kTWFzaykge1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IGNvbXBvc2l0ZTtcbiAgICB9XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGdldFN0eWxlRnJvbVJnYihjb2xvckxpbmUsIG9wYWNpdHkpO1xuICAgIGlmIChzaGFkb3cuZW5hYmxlKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0NvbG9yID0gY29sb3JUb1JnYihzaGFkb3cuY29sb3IpO1xuICAgICAgICBpZiAoc2hhZG93Q29sb3IpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2hhZG93Qmx1ciA9IHNoYWRvdy5ibHVyO1xuICAgICAgICAgICAgY29udGV4dC5zaGFkb3dDb2xvciA9IGdldFN0eWxlRnJvbVJnYihzaGFkb3dDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3TGlua1RyaWFuZ2xlKGNvbnRleHQsIHBvczEsIHBvczIsIHBvczMsIGJhY2tncm91bmRNYXNrLCBjb21wb3NpdGUsIGNvbG9yVHJpYW5nbGUsIG9wYWNpdHlUcmlhbmdsZSkge1xuICAgIGRyYXdUcmlhbmdsZShjb250ZXh0LCBwb3MxLCBwb3MyLCBwb3MzKTtcbiAgICBpZiAoYmFja2dyb3VuZE1hc2spIHtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBjb21wb3NpdGU7XG4gICAgfVxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ2V0U3R5bGVGcm9tUmdiKGNvbG9yVHJpYW5nbGUsIG9wYWNpdHlUcmlhbmdsZSk7XG4gICAgY29udGV4dC5maWxsKCk7XG59XG4iLCJpbXBvcnQgeyBsb2FkSW50ZXJhY3Rpb24gfSBmcm9tIFwiLi9pbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgbG9hZFBsdWdpbiB9IGZyb20gXCIuL3BsdWdpblwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRQYXJ0aWNsZXNMaW5rc0ludGVyYWN0aW9uKGVuZ2luZSkge1xuICAgIGF3YWl0IGxvYWRJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRQbHVnaW4oZW5naW5lKTtcbn1cbiIsImltcG9ydCB7IExpbmtlciB9IGZyb20gXCIuL0xpbmtlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRJbnRlcmFjdGlvbihlbmdpbmUpIHtcbiAgICBhd2FpdCBlbmdpbmUuYWRkSW50ZXJhY3RvcihcInBhcnRpY2xlc0xpbmtzXCIsIChjb250YWluZXIpID0+IG5ldyBMaW5rZXIoY29udGFpbmVyKSk7XG59XG4iLCJpbXBvcnQgeyBMaW5rSW5zdGFuY2UgfSBmcm9tIFwiLi9MaW5rSW5zdGFuY2VcIjtcbmNsYXNzIExpbmtzUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pZCA9IFwibGlua3NcIjtcbiAgICB9XG4gICAgZ2V0UGx1Z2luKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gbmV3IExpbmtJbnN0YW5jZShjb250YWluZXIpO1xuICAgIH1cbiAgICBuZWVkc1BsdWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvYWRPcHRpb25zKCkge1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUGx1Z2luKGVuZ2luZSkge1xuICAgIGNvbnN0IHBsdWdpbiA9IG5ldyBMaW5rc1BsdWdpbigpO1xuICAgIGF3YWl0IGVuZ2luZS5hZGRQbHVnaW4ocGx1Z2luKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==