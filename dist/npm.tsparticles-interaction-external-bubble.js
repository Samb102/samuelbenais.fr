"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-interaction-external-bubble"],{

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bubbler": () => (/* binding */ Bubbler)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
    if (modeValue >= optionsValue) {
        const value = particleValue + (modeValue - optionsValue) * ratio;
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(value, particleValue, modeValue);
    }
    else if (modeValue < optionsValue) {
        const value = particleValue - (optionsValue - modeValue) * ratio;
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp)(value, modeValue, particleValue);
    }
}
class Bubbler extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase {
    constructor(container) {
        super(container);
        if (!container.bubble) {
            container.bubble = {};
        }
        this.handleClickMode = (mode) => {
            if (mode !== "bubble") {
                return;
            }
            if (!container.bubble) {
                container.bubble = {};
            }
            container.bubble.clicking = true;
        };
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv, divBubble = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isDivModeEnabled)("bubble", divs);
        if (!(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bubble", hoverMode) || (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bubble", clickMode) || divBubble;
    }
    reset(particle, force) {
        if (!(!particle.bubble.inRange || force)) {
            return;
        }
        delete particle.bubble.div;
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }
    async interact() {
        const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
        if (hoverEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bubble", hoverMode)) {
            this.hoverBubble();
        }
        else if (clickEnabled && (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray)("bubble", clickMode)) {
            this.clickBubble();
        }
        else {
            (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divModeExecute)("bubble", divs, (selector, div) => this.singleSelectorHover(selector, div));
        }
    }
    singleSelectorHover(selector, div) {
        const container = this.container, selectors = document.querySelectorAll(selector);
        if (!selectors.length) {
            return;
        }
        selectors.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle(pos.x, pos.y, repulseRadius)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container.particles.quadTree.query(area);
            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }
                particle.bubble.inRange = true;
                const divs = container.actualOptions.interactivity.modes.bubble.divs;
                const divBubble = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divMode)(divs, elem);
                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.reset(particle, true);
                    particle.bubble.div = elem;
                }
                this.hoverBubbleSize(particle, 1, divBubble);
                this.hoverBubbleOpacity(particle, 1, divBubble);
                this.hoverBubbleColor(particle, 1, divBubble);
            }
        });
    }
    process(particle, distMouse, timeSpent, data) {
        const container = this.container, bubbleParam = data.bubbleObj.optValue;
        if (bubbleParam === undefined) {
            return;
        }
        const options = container.actualOptions, bubbleDuration = options.interactivity.modes.bubble.duration, bubbleDistance = container.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
        if (bubbleParam === particlesParam) {
            return;
        }
        if (!container.bubble) {
            container.bubble = {};
        }
        if (!container.bubble.durationEnd) {
            if (distMouse <= bubbleDistance) {
                const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
                if (obj !== bubbleParam) {
                    const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;
                    if (type === "size") {
                        particle.bubble.radius = value;
                    }
                    if (type === "opacity") {
                        particle.bubble.opacity = value;
                    }
                }
            }
            else {
                if (type === "size") {
                    delete particle.bubble.radius;
                }
                if (type === "opacity") {
                    delete particle.bubble.opacity;
                }
            }
        }
        else if (pObjBubble) {
            if (type === "size") {
                delete particle.bubble.radius;
            }
            if (type === "opacity") {
                delete particle.bubble.opacity;
            }
        }
    }
    clickBubble() {
        var _a, _b;
        const container = this.container, options = container.actualOptions, mouseClickPos = container.interactivity.mouse.clickPosition;
        if (!mouseClickPos) {
            return;
        }
        if (!container.bubble) {
            container.bubble = {};
        }
        const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mouseClickPos, distance);
        for (const particle of query) {
            if (!container.bubble.clicking) {
                continue;
            }
            particle.bubble.inRange = !container.bubble.durationEnd;
            const pos = particle.getPosition(), distMouse = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos, mouseClickPos), timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.durationEnd = true;
            }
            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }
            const sizeData = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: particle.bubble.radius,
                },
                particlesObj: {
                    optValue: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(particle.options.size.value) * container.retina.pixelRatio,
                    value: particle.size.value,
                },
                type: "size",
            };
            this.process(particle, distMouse, timeSpent, sizeData);
            const opacityData = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(particle.options.opacity.value),
                    value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1,
                },
                type: "opacity",
            };
            this.process(particle, distMouse, timeSpent, opacityData);
            if (!container.bubble.durationEnd) {
                if (distMouse <= container.retina.bubbleModeDistance) {
                    this.hoverBubbleColor(particle, distMouse);
                }
                else {
                    delete particle.bubble.color;
                }
            }
            else {
                delete particle.bubble.color;
            }
        }
    }
    hoverBubble() {
        const container = this.container, mousePos = container.interactivity.mouse.position;
        if (mousePos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition(), pointDistance = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance)(pos, mousePos), ratio = 1 - pointDistance / distance;
            if (pointDistance <= distance) {
                if (ratio >= 0 && container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent) {
                    this.hoverBubbleSize(particle, ratio);
                    this.hoverBubbleOpacity(particle, ratio);
                    this.hoverBubbleColor(particle, ratio);
                }
            }
            else {
                this.reset(particle);
            }
            if (container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }
    hoverBubbleSize(particle, ratio, divBubble) {
        const container = this.container, modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
        if (modeSize === undefined) {
            return;
        }
        const optSize = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(particle.options.size.value) * container.retina.pixelRatio;
        const pSize = particle.size.value;
        const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }
    hoverBubbleOpacity(particle, ratio, divBubble) {
        var _a, _b, _c;
        const container = this.container, options = container.actualOptions, modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;
        if (!modeOpacity) {
            return;
        }
        const optOpacity = particle.options.opacity.value;
        const pOpacity = (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1;
        const opacity = calculateBubbleValue(pOpacity, modeOpacity, (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(optOpacity), ratio);
        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }
    hoverBubbleColor(particle, ratio, divBubble) {
        const options = this.container.actualOptions;
        const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;
        if (!particle.bubble.finalColor) {
            const modeColor = bubbleOptions.color;
            if (!modeColor) {
                return;
            }
            const bubbleColor = modeColor instanceof Array ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray)(modeColor) : modeColor;
            particle.bubble.finalColor = (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl)(bubbleColor);
        }
        if (!particle.bubble.finalColor) {
            return;
        }
        if (bubbleOptions.mix) {
            particle.bubble.color = undefined;
            const pColor = particle.getFillColor();
            particle.bubble.color = pColor
                ? (0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rgbToHsl)((0,tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorMix)(pColor, particle.bubble.finalColor, 1 - ratio, ratio))
                : particle.bubble.finalColor;
        }
        else {
            particle.bubble.color = particle.bubble.finalColor;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalBubbleInteraction": () => (/* binding */ loadExternalBubbleInteraction)
/* harmony export */ });
/* harmony import */ var _Bubbler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bubbler */ "./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js");

async function loadExternalBubbleInteraction(engine) {
    await engine.addInteractor("externalBubble", (container) => new _Bubbler__WEBPACK_IMPORTED_MODULE_0__.Bubbler(container));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWJ1YmJsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1UDtBQUN2UDtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlEQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGVBQWUseURBQUs7QUFDcEI7QUFDQTtBQUNPLHNCQUFzQixzRUFBc0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0TEFBNEwsb0VBQWdCO0FBQzVNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDZEQUFTLHlCQUF5Qiw2REFBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkRBQVM7QUFDckM7QUFDQTtBQUNBLGlDQUFpQyw2REFBUztBQUMxQztBQUNBO0FBQ0E7QUFDQSxZQUFZLGtFQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isc0JBQXNCLHNEQUFNO0FBQzVCLHNCQUFzQix5REFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMkRBQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELCtEQUFXO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw4QkFBOEIsK0RBQVc7QUFDekM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw4QkFBOEIsK0RBQVc7QUFDekM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLCtEQUFXO0FBQzNFO0FBQ0EscUVBQXFFLDhEQUFjO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsK0RBQWU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsK0RBQVc7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGlFQUFhO0FBQzFFLHlDQUF5Qyw4REFBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDREQUFRLENBQUMsNERBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UW9DO0FBQzdCO0FBQ1Asb0VBQW9FLDZDQUFPO0FBQzNFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWJ1YmJsZS9lc20vQnViYmxlci5qcyIsIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtYnViYmxlL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXJjbGUsIEV4dGVybmFsSW50ZXJhY3RvckJhc2UsIFJlY3RhbmdsZSwgY2xhbXAsIGNvbG9yTWl4LCBjb2xvclRvSHNsLCBkaXZNb2RlLCBkaXZNb2RlRXhlY3V0ZSwgZ2V0RGlzdGFuY2UsIGdldFJhbmdlTWF4LCBpc0Rpdk1vZGVFbmFibGVkLCBpc0luQXJyYXksIGl0ZW1Gcm9tQXJyYXksIG1vdXNlTGVhdmVFdmVudCwgbW91c2VNb3ZlRXZlbnQsIHJnYlRvSHNsLCB9IGZyb20gXCJ0c3BhcnRpY2xlcy1lbmdpbmVcIjtcbmZ1bmN0aW9uIGNhbGN1bGF0ZUJ1YmJsZVZhbHVlKHBhcnRpY2xlVmFsdWUsIG1vZGVWYWx1ZSwgb3B0aW9uc1ZhbHVlLCByYXRpbykge1xuICAgIGlmIChtb2RlVmFsdWUgPj0gb3B0aW9uc1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFydGljbGVWYWx1ZSArIChtb2RlVmFsdWUgLSBvcHRpb25zVmFsdWUpICogcmF0aW87XG4gICAgICAgIHJldHVybiBjbGFtcCh2YWx1ZSwgcGFydGljbGVWYWx1ZSwgbW9kZVZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZVZhbHVlIDwgb3B0aW9uc1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFydGljbGVWYWx1ZSAtIChvcHRpb25zVmFsdWUgLSBtb2RlVmFsdWUpICogcmF0aW87XG4gICAgICAgIHJldHVybiBjbGFtcCh2YWx1ZSwgbW9kZVZhbHVlLCBwYXJ0aWNsZVZhbHVlKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQnViYmxlciBleHRlbmRzIEV4dGVybmFsSW50ZXJhY3RvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lci5idWJibGUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAobW9kZSAhPT0gXCJidWJibGVcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29udGFpbmVyLmJ1YmJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUuY2xpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIG1vdXNlID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UsIGV2ZW50cyA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMsIGRpdnMgPSBldmVudHMub25EaXYsIGRpdkJ1YmJsZSA9IGlzRGl2TW9kZUVuYWJsZWQoXCJidWJibGVcIiwgZGl2cyk7XG4gICAgICAgIGlmICghKGRpdkJ1YmJsZSB8fCAoZXZlbnRzLm9uSG92ZXIuZW5hYmxlICYmIG1vdXNlLnBvc2l0aW9uKSB8fCAoZXZlbnRzLm9uQ2xpY2suZW5hYmxlICYmIG1vdXNlLmNsaWNrUG9zaXRpb24pKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvdmVyTW9kZSA9IGV2ZW50cy5vbkhvdmVyLm1vZGU7XG4gICAgICAgIGNvbnN0IGNsaWNrTW9kZSA9IGV2ZW50cy5vbkNsaWNrLm1vZGU7XG4gICAgICAgIHJldHVybiBpc0luQXJyYXkoXCJidWJibGVcIiwgaG92ZXJNb2RlKSB8fCBpc0luQXJyYXkoXCJidWJibGVcIiwgY2xpY2tNb2RlKSB8fCBkaXZCdWJibGU7XG4gICAgfVxuICAgIHJlc2V0KHBhcnRpY2xlLCBmb3JjZSkge1xuICAgICAgICBpZiAoISghcGFydGljbGUuYnViYmxlLmluUmFuZ2UgfHwgZm9yY2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHBhcnRpY2xlLmJ1YmJsZS5kaXY7XG4gICAgICAgIGRlbGV0ZSBwYXJ0aWNsZS5idWJibGUub3BhY2l0eTtcbiAgICAgICAgZGVsZXRlIHBhcnRpY2xlLmJ1YmJsZS5yYWRpdXM7XG4gICAgICAgIGRlbGV0ZSBwYXJ0aWNsZS5idWJibGUuY29sb3I7XG4gICAgfVxuICAgIGFzeW5jIGludGVyYWN0KCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb250YWluZXIuYWN0dWFsT3B0aW9ucywgZXZlbnRzID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cywgb25Ib3ZlciA9IGV2ZW50cy5vbkhvdmVyLCBvbkNsaWNrID0gZXZlbnRzLm9uQ2xpY2ssIGhvdmVyRW5hYmxlZCA9IG9uSG92ZXIuZW5hYmxlLCBob3Zlck1vZGUgPSBvbkhvdmVyLm1vZGUsIGNsaWNrRW5hYmxlZCA9IG9uQ2xpY2suZW5hYmxlLCBjbGlja01vZGUgPSBvbkNsaWNrLm1vZGUsIGRpdnMgPSBldmVudHMub25EaXY7XG4gICAgICAgIGlmIChob3ZlckVuYWJsZWQgJiYgaXNJbkFycmF5KFwiYnViYmxlXCIsIGhvdmVyTW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJCdWJibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjbGlja0VuYWJsZWQgJiYgaXNJbkFycmF5KFwiYnViYmxlXCIsIGNsaWNrTW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdWJibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpdk1vZGVFeGVjdXRlKFwiYnViYmxlXCIsIGRpdnMsIChzZWxlY3RvciwgZGl2KSA9PiB0aGlzLnNpbmdsZVNlbGVjdG9ySG92ZXIoc2VsZWN0b3IsIGRpdikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNpbmdsZVNlbGVjdG9ySG92ZXIoc2VsZWN0b3IsIGRpdikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGlmICghc2VsZWN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gaXRlbSwgcHhSYXRpbyA9IGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbywgcG9zID0ge1xuICAgICAgICAgICAgICAgIHg6IChlbGVtLm9mZnNldExlZnQgKyBlbGVtLm9mZnNldFdpZHRoIC8gMikgKiBweFJhdGlvLFxuICAgICAgICAgICAgICAgIHk6IChlbGVtLm9mZnNldFRvcCArIGVsZW0ub2Zmc2V0SGVpZ2h0IC8gMikgKiBweFJhdGlvLFxuICAgICAgICAgICAgfSwgcmVwdWxzZVJhZGl1cyA9IChlbGVtLm9mZnNldFdpZHRoIC8gMikgKiBweFJhdGlvLCBhcmVhID0gZGl2LnR5cGUgPT09IFwiY2lyY2xlXCJcbiAgICAgICAgICAgICAgICA/IG5ldyBDaXJjbGUocG9zLngsIHBvcy55LCByZXB1bHNlUmFkaXVzKVxuICAgICAgICAgICAgICAgIDogbmV3IFJlY3RhbmdsZShlbGVtLm9mZnNldExlZnQgKiBweFJhdGlvLCBlbGVtLm9mZnNldFRvcCAqIHB4UmF0aW8sIGVsZW0ub2Zmc2V0V2lkdGggKiBweFJhdGlvLCBlbGVtLm9mZnNldEhlaWdodCAqIHB4UmF0aW8pLCBxdWVyeSA9IGNvbnRhaW5lci5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnkoYXJlYSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmVhLmNvbnRhaW5zKHBhcnRpY2xlLmdldFBvc2l0aW9uKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5idWJibGUuaW5SYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZGl2cyA9IGNvbnRhaW5lci5hY3R1YWxPcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmRpdnM7XG4gICAgICAgICAgICAgICAgY29uc3QgZGl2QnViYmxlID0gZGl2TW9kZShkaXZzLCBlbGVtKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnRpY2xlLmJ1YmJsZS5kaXYgfHwgcGFydGljbGUuYnViYmxlLmRpdiAhPT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KHBhcnRpY2xlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuYnViYmxlLmRpdiA9IGVsZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJCdWJibGVTaXplKHBhcnRpY2xlLCAxLCBkaXZCdWJibGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJCdWJibGVPcGFjaXR5KHBhcnRpY2xlLCAxLCBkaXZCdWJibGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJCdWJibGVDb2xvcihwYXJ0aWNsZSwgMSwgZGl2QnViYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByb2Nlc3MocGFydGljbGUsIGRpc3RNb3VzZSwgdGltZVNwZW50LCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBidWJibGVQYXJhbSA9IGRhdGEuYnViYmxlT2JqLm9wdFZhbHVlO1xuICAgICAgICBpZiAoYnViYmxlUGFyYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgYnViYmxlRHVyYXRpb24gPSBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmR1cmF0aW9uLCBidWJibGVEaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEuYnViYmxlTW9kZURpc3RhbmNlLCBwYXJ0aWNsZXNQYXJhbSA9IGRhdGEucGFydGljbGVzT2JqLm9wdFZhbHVlLCBwT2JqQnViYmxlID0gZGF0YS5idWJibGVPYmoudmFsdWUsIHBPYmogPSBkYXRhLnBhcnRpY2xlc09iai52YWx1ZSB8fCAwLCB0eXBlID0gZGF0YS50eXBlO1xuICAgICAgICBpZiAoYnViYmxlUGFyYW0gPT09IHBhcnRpY2xlc1BhcmFtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250YWluZXIuYnViYmxlKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYnViYmxlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250YWluZXIuYnViYmxlLmR1cmF0aW9uRW5kKSB7XG4gICAgICAgICAgICBpZiAoZGlzdE1vdXNlIDw9IGJ1YmJsZURpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gcE9iakJ1YmJsZSAhPT0gbnVsbCAmJiBwT2JqQnViYmxlICE9PSB2b2lkIDAgPyBwT2JqQnViYmxlIDogcE9iajtcbiAgICAgICAgICAgICAgICBpZiAob2JqICE9PSBidWJibGVQYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBPYmogLSAodGltZVNwZW50ICogKHBPYmogLSBidWJibGVQYXJhbSkpIC8gYnViYmxlRHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInNpemVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuYnViYmxlLnJhZGl1cyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9wYWNpdHlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuYnViYmxlLm9wYWNpdHkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInNpemVcIikge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFydGljbGUuYnViYmxlLnJhZGl1cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib3BhY2l0eVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJ0aWNsZS5idWJibGUub3BhY2l0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocE9iakJ1YmJsZSkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwic2l6ZVwiKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhcnRpY2xlLmJ1YmJsZS5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvcGFjaXR5XCIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGFydGljbGUuYnViYmxlLm9wYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xpY2tCdWJibGUoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCBvcHRpb25zID0gY29udGFpbmVyLmFjdHVhbE9wdGlvbnMsIG1vdXNlQ2xpY2tQb3MgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja1Bvc2l0aW9uO1xuICAgICAgICBpZiAoIW1vdXNlQ2xpY2tQb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbnRhaW5lci5idWJibGUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEuYnViYmxlTW9kZURpc3RhbmNlLCBxdWVyeSA9IGNvbnRhaW5lci5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnlDaXJjbGUobW91c2VDbGlja1BvcywgZGlzdGFuY2UpO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnRpY2xlIG9mIHF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5idWJibGUuY2xpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRpY2xlLmJ1YmJsZS5pblJhbmdlID0gIWNvbnRhaW5lci5idWJibGUuZHVyYXRpb25FbmQ7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBwYXJ0aWNsZS5nZXRQb3NpdGlvbigpLCBkaXN0TW91c2UgPSBnZXREaXN0YW5jZShwb3MsIG1vdXNlQ2xpY2tQb3MpLCB0aW1lU3BlbnQgPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSAoY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tUaW1lIHx8IDApKSAvIDEwMDA7XG4gICAgICAgICAgICBpZiAodGltZVNwZW50ID4gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUuZHVyYXRpb25FbmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVTcGVudCA+IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZHVyYXRpb24gKiAyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmJ1YmJsZS5jbGlja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5idWJibGUuZHVyYXRpb25FbmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNpemVEYXRhID0ge1xuICAgICAgICAgICAgICAgIGJ1YmJsZU9iajoge1xuICAgICAgICAgICAgICAgICAgICBvcHRWYWx1ZTogY29udGFpbmVyLnJldGluYS5idWJibGVNb2RlU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnRpY2xlLmJ1YmJsZS5yYWRpdXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXNPYmo6IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0VmFsdWU6IGdldFJhbmdlTWF4KHBhcnRpY2xlLm9wdGlvbnMuc2l6ZS52YWx1ZSkgKiBjb250YWluZXIucmV0aW5hLnBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJ0aWNsZS5zaXplLnZhbHVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzaXplXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzKHBhcnRpY2xlLCBkaXN0TW91c2UsIHRpbWVTcGVudCwgc2l6ZURhdGEpO1xuICAgICAgICAgICAgY29uc3Qgb3BhY2l0eURhdGEgPSB7XG4gICAgICAgICAgICAgICAgYnViYmxlT2JqOiB7XG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbHVlOiBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJ0aWNsZS5idWJibGUub3BhY2l0eSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2xlc09iajoge1xuICAgICAgICAgICAgICAgICAgICBvcHRWYWx1ZTogZ2V0UmFuZ2VNYXgocGFydGljbGUub3B0aW9ucy5vcGFjaXR5LnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IChfYiA9IChfYSA9IHBhcnRpY2xlLm9wYWNpdHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwib3BhY2l0eVwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucHJvY2VzcyhwYXJ0aWNsZSwgZGlzdE1vdXNlLCB0aW1lU3BlbnQsIG9wYWNpdHlEYXRhKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyLmJ1YmJsZS5kdXJhdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgIGlmIChkaXN0TW91c2UgPD0gY29udGFpbmVyLnJldGluYS5idWJibGVNb2RlRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlckJ1YmJsZUNvbG9yKHBhcnRpY2xlLCBkaXN0TW91c2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcnRpY2xlLmJ1YmJsZS5jb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGFydGljbGUuYnViYmxlLmNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhvdmVyQnViYmxlKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgbW91c2VQb3MgPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG1vdXNlUG9zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEuYnViYmxlTW9kZURpc3RhbmNlLCBxdWVyeSA9IGNvbnRhaW5lci5wYXJ0aWNsZXMucXVhZFRyZWUucXVlcnlDaXJjbGUobW91c2VQb3MsIGRpc3RhbmNlKTtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0aWNsZSBvZiBxdWVyeSkge1xuICAgICAgICAgICAgcGFydGljbGUuYnViYmxlLmluUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcG9zID0gcGFydGljbGUuZ2V0UG9zaXRpb24oKSwgcG9pbnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHBvcywgbW91c2VQb3MpLCByYXRpbyA9IDEgLSBwb2ludERpc3RhbmNlIC8gZGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAocG9pbnREaXN0YW5jZSA8PSBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGlmIChyYXRpbyA+PSAwICYmIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LnN0YXR1cyA9PT0gbW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlckJ1YmJsZVNpemUocGFydGljbGUsIHJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlckJ1YmJsZU9wYWNpdHkocGFydGljbGUsIHJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlckJ1YmJsZUNvbG9yKHBhcnRpY2xlLCByYXRpbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldChwYXJ0aWNsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzID09PSBtb3VzZUxlYXZlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KHBhcnRpY2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBob3ZlckJ1YmJsZVNpemUocGFydGljbGUsIHJhdGlvLCBkaXZCdWJibGUpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG1vZGVTaXplID0gKGRpdkJ1YmJsZSA9PT0gbnVsbCB8fCBkaXZCdWJibGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRpdkJ1YmJsZS5zaXplKSA/IGRpdkJ1YmJsZS5zaXplICogY29udGFpbmVyLnJldGluYS5waXhlbFJhdGlvIDogY29udGFpbmVyLnJldGluYS5idWJibGVNb2RlU2l6ZTtcbiAgICAgICAgaWYgKG1vZGVTaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRTaXplID0gZ2V0UmFuZ2VNYXgocGFydGljbGUub3B0aW9ucy5zaXplLnZhbHVlKSAqIGNvbnRhaW5lci5yZXRpbmEucGl4ZWxSYXRpbztcbiAgICAgICAgY29uc3QgcFNpemUgPSBwYXJ0aWNsZS5zaXplLnZhbHVlO1xuICAgICAgICBjb25zdCBzaXplID0gY2FsY3VsYXRlQnViYmxlVmFsdWUocFNpemUsIG1vZGVTaXplLCBvcHRTaXplLCByYXRpbyk7XG4gICAgICAgIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLmJ1YmJsZS5yYWRpdXMgPSBzaXplO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhvdmVyQnViYmxlT3BhY2l0eShwYXJ0aWNsZSwgcmF0aW8sIGRpdkJ1YmJsZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsIG9wdGlvbnMgPSBjb250YWluZXIuYWN0dWFsT3B0aW9ucywgbW9kZU9wYWNpdHkgPSAoX2EgPSBkaXZCdWJibGUgPT09IG51bGwgfHwgZGl2QnViYmxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkaXZCdWJibGUub3BhY2l0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5O1xuICAgICAgICBpZiAoIW1vZGVPcGFjaXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0T3BhY2l0eSA9IHBhcnRpY2xlLm9wdGlvbnMub3BhY2l0eS52YWx1ZTtcbiAgICAgICAgY29uc3QgcE9wYWNpdHkgPSAoX2MgPSAoX2IgPSBwYXJ0aWNsZS5vcGFjaXR5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWUpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IDE7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBjYWxjdWxhdGVCdWJibGVWYWx1ZShwT3BhY2l0eSwgbW9kZU9wYWNpdHksIGdldFJhbmdlTWF4KG9wdE9wYWNpdHkpLCByYXRpbyk7XG4gICAgICAgIGlmIChvcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLmJ1YmJsZS5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBob3ZlckJ1YmJsZUNvbG9yKHBhcnRpY2xlLCByYXRpbywgZGl2QnViYmxlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5hY3R1YWxPcHRpb25zO1xuICAgICAgICBjb25zdCBidWJibGVPcHRpb25zID0gZGl2QnViYmxlICE9PSBudWxsICYmIGRpdkJ1YmJsZSAhPT0gdm9pZCAwID8gZGl2QnViYmxlIDogb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZTtcbiAgICAgICAgaWYgKCFwYXJ0aWNsZS5idWJibGUuZmluYWxDb2xvcikge1xuICAgICAgICAgICAgY29uc3QgbW9kZUNvbG9yID0gYnViYmxlT3B0aW9ucy5jb2xvcjtcbiAgICAgICAgICAgIGlmICghbW9kZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYnViYmxlQ29sb3IgPSBtb2RlQ29sb3IgaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW1Gcm9tQXJyYXkobW9kZUNvbG9yKSA6IG1vZGVDb2xvcjtcbiAgICAgICAgICAgIHBhcnRpY2xlLmJ1YmJsZS5maW5hbENvbG9yID0gY29sb3JUb0hzbChidWJibGVDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwYXJ0aWNsZS5idWJibGUuZmluYWxDb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWJibGVPcHRpb25zLm1peCkge1xuICAgICAgICAgICAgcGFydGljbGUuYnViYmxlLmNvbG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgcENvbG9yID0gcGFydGljbGUuZ2V0RmlsbENvbG9yKCk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5idWJibGUuY29sb3IgPSBwQ29sb3JcbiAgICAgICAgICAgICAgICA/IHJnYlRvSHNsKGNvbG9yTWl4KHBDb2xvciwgcGFydGljbGUuYnViYmxlLmZpbmFsQ29sb3IsIDEgLSByYXRpbywgcmF0aW8pKVxuICAgICAgICAgICAgICAgIDogcGFydGljbGUuYnViYmxlLmZpbmFsQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5idWJibGUuY29sb3IgPSBwYXJ0aWNsZS5idWJibGUuZmluYWxDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEJ1YmJsZXIgfSBmcm9tIFwiLi9CdWJibGVyXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEV4dGVybmFsQnViYmxlSW50ZXJhY3Rpb24oZW5naW5lKSB7XG4gICAgYXdhaXQgZW5naW5lLmFkZEludGVyYWN0b3IoXCJleHRlcm5hbEJ1YmJsZVwiLCAoY29udGFpbmVyKSA9PiBuZXcgQnViYmxlcihjb250YWluZXIpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==