"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-particles.js"],{

/***/ "./node_modules/tsparticles-particles.js/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-particles.js/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initPjs": () => (/* binding */ initPjs)
/* harmony export */ });
const initPjs = (engine) => {
    const particlesJS = (tagId, options) => {
        return engine.load(tagId, options);
    };
    particlesJS.load = (tagId, pathConfigJson, callback) => {
        engine
            .loadJSON(tagId, pathConfigJson)
            .then((container) => {
            if (container) {
                callback(container);
            }
        })
            .catch(() => {
            callback(undefined);
        });
    };
    particlesJS.setOnClickHandler = (callback) => {
        engine.setOnClickHandler(callback);
    };
    const pJSDom = engine.dom();
    return { particlesJS, pJSDom };
};



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXBhcnRpY2xlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW11ZWxiZW5haXMuZnIvLi9ub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMtcGFydGljbGVzLmpzL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbml0UGpzID0gKGVuZ2luZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRpY2xlc0pTID0gKHRhZ0lkLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmdpbmUubG9hZCh0YWdJZCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBwYXJ0aWNsZXNKUy5sb2FkID0gKHRhZ0lkLCBwYXRoQ29uZmlnSnNvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgZW5naW5lXG4gICAgICAgICAgICAubG9hZEpTT04odGFnSWQsIHBhdGhDb25maWdKc29uKVxuICAgICAgICAgICAgLnRoZW4oKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBwYXJ0aWNsZXNKUy5zZXRPbkNsaWNrSGFuZGxlciA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICBlbmdpbmUuc2V0T25DbGlja0hhbmRsZXIoY2FsbGJhY2spO1xuICAgIH07XG4gICAgY29uc3QgcEpTRG9tID0gZW5naW5lLmRvbSgpO1xuICAgIHJldHVybiB7IHBhcnRpY2xlc0pTLCBwSlNEb20gfTtcbn07XG5leHBvcnQgeyBpbml0UGpzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=