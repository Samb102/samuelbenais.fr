"use strict";
(self["webpackChunksamuelbenais_fr"] = self["webpackChunksamuelbenais_fr"] || []).push([["npm.tsparticles-slim"],{

/***/ "./node_modules/tsparticles-slim/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tsparticles-slim/esm/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSlim": () => (/* binding */ loadSlim)
/* harmony export */ });
/* harmony import */ var tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-particles.js */ "./node_modules/tsparticles-particles.js/esm/index.js");
/* harmony import */ var tsparticles_updater_angle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-updater-angle */ "./node_modules/tsparticles-updater-angle/esm/index.js");
/* harmony import */ var tsparticles_move_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-move-base */ "./node_modules/tsparticles-move-base/esm/index.js");
/* harmony import */ var tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tsparticles-shape-circle */ "./node_modules/tsparticles-shape-circle/esm/index.js");
/* harmony import */ var tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tsparticles-updater-color */ "./node_modules/tsparticles-updater-color/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tsparticles-interaction-external-attract */ "./node_modules/tsparticles-interaction-external-attract/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tsparticles-interaction-external-bounce */ "./node_modules/tsparticles-interaction-external-bounce/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tsparticles-interaction-external-bubble */ "./node_modules/tsparticles-interaction-external-bubble/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tsparticles-interaction-external-connect */ "./node_modules/tsparticles-interaction-external-connect/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tsparticles-interaction-external-grab */ "./node_modules/tsparticles-interaction-external-grab/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tsparticles-interaction-external-pause */ "./node_modules/tsparticles-interaction-external-pause/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tsparticles-interaction-external-push */ "./node_modules/tsparticles-interaction-external-push/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tsparticles-interaction-external-remove */ "./node_modules/tsparticles-interaction-external-remove/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tsparticles-interaction-external-repulse */ "./node_modules/tsparticles-interaction-external-repulse/esm/index.js");
/* harmony import */ var tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tsparticles-shape-image */ "./node_modules/tsparticles-shape-image/esm/index.js");
/* harmony import */ var tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tsparticles-updater-life */ "./node_modules/tsparticles-updater-life/esm/index.js");
/* harmony import */ var tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tsparticles-shape-line */ "./node_modules/tsparticles-shape-line/esm/index.js");
/* harmony import */ var tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! tsparticles-updater-opacity */ "./node_modules/tsparticles-updater-opacity/esm/index.js");
/* harmony import */ var tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tsparticles-updater-out-modes */ "./node_modules/tsparticles-updater-out-modes/esm/index.js");
/* harmony import */ var tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tsparticles-move-parallax */ "./node_modules/tsparticles-move-parallax/esm/index.js");
/* harmony import */ var tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! tsparticles-interaction-particles-attract */ "./node_modules/tsparticles-interaction-particles-attract/esm/index.js");
/* harmony import */ var tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! tsparticles-interaction-particles-collisions */ "./node_modules/tsparticles-interaction-particles-collisions/esm/index.js");
/* harmony import */ var tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! tsparticles-interaction-particles-links */ "./node_modules/tsparticles-interaction-particles-links/esm/index.js");
/* harmony import */ var tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! tsparticles-shape-polygon */ "./node_modules/tsparticles-shape-polygon/esm/index.js");
/* harmony import */ var tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! tsparticles-updater-size */ "./node_modules/tsparticles-updater-size/esm/index.js");
/* harmony import */ var tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! tsparticles-shape-square */ "./node_modules/tsparticles-shape-square/esm/index.js");
/* harmony import */ var tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! tsparticles-shape-star */ "./node_modules/tsparticles-shape-star/esm/index.js");
/* harmony import */ var tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! tsparticles-updater-stroke-color */ "./node_modules/tsparticles-updater-stroke-color/esm/index.js");
/* harmony import */ var tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! tsparticles-shape-text */ "./node_modules/tsparticles-shape-text/esm/index.js");





























async function loadSlim(engine) {
    await (0,tsparticles_move_base__WEBPACK_IMPORTED_MODULE_2__.loadBaseMover)(engine);
    await (0,tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_19__.loadParallaxMover)(engine);
    await (0,tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_5__.loadExternalAttractInteraction)(engine);
    await (0,tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_6__.loadExternalBounceInteraction)(engine);
    await (0,tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_7__.loadExternalBubbleInteraction)(engine);
    await (0,tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_8__.loadExternalConnectInteraction)(engine);
    await (0,tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_9__.loadExternalGrabInteraction)(engine);
    await (0,tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_10__.loadExternalPauseInteraction)(engine);
    await (0,tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_11__.loadExternalPushInteraction)(engine);
    await (0,tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_12__.loadExternalRemoveInteraction)(engine);
    await (0,tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_13__.loadExternalRepulseInteraction)(engine);
    await (0,tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_20__.loadParticlesAttractInteraction)(engine);
    await (0,tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_21__.loadParticlesCollisionsInteraction)(engine);
    await (0,tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_22__.loadParticlesLinksInteraction)(engine);
    await (0,tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_3__.loadCircleShape)(engine);
    await (0,tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_14__.loadImageShape)(engine);
    await (0,tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_16__.loadLineShape)(engine);
    await (0,tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_23__.loadPolygonShape)(engine);
    await (0,tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_25__.loadSquareShape)(engine);
    await (0,tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_26__.loadStarShape)(engine);
    await (0,tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_28__.loadTextShape)(engine);
    await (0,tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_15__.loadLifeUpdater)(engine);
    await (0,tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_17__.loadOpacityUpdater)(engine);
    await (0,tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_24__.loadSizeUpdater)(engine);
    await (0,tsparticles_updater_angle__WEBPACK_IMPORTED_MODULE_1__.loadAngleUpdater)(engine);
    await (0,tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_4__.loadColorUpdater)(engine);
    await (0,tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_27__.loadStrokeColorUpdater)(engine);
    await (0,tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_18__.loadOutModesUpdater)(engine);
    await (0,tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0__.initPjs)(engine);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnRzcGFydGljbGVzLXNsaW0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ1U7QUFDUDtBQUNLO0FBQ0U7QUFDNkI7QUFDRjtBQUNBO0FBQ0U7QUFDTjtBQUNFO0FBQ0Y7QUFDSTtBQUNFO0FBQ2pDO0FBQ0U7QUFDSjtBQUNVO0FBQ0c7QUFDTjtBQUM4QjtBQUNNO0FBQ1Y7QUFDM0I7QUFDRjtBQUNBO0FBQ0o7QUFDbUI7QUFDbkI7QUFDaEQ7QUFDUCxVQUFVLG9FQUFhO0FBQ3ZCLFVBQVUsNkVBQWlCO0FBQzNCLFVBQVUsd0dBQThCO0FBQ3hDLFVBQVUsc0dBQTZCO0FBQ3ZDLFVBQVUsc0dBQTZCO0FBQ3ZDLFVBQVUsd0dBQThCO0FBQ3hDLFVBQVUsa0dBQTJCO0FBQ3JDLFVBQVUscUdBQTRCO0FBQ3RDLFVBQVUsbUdBQTJCO0FBQ3JDLFVBQVUsdUdBQTZCO0FBQ3ZDLFVBQVUseUdBQThCO0FBQ3hDLFVBQVUsMkdBQStCO0FBQ3pDLFVBQVUsaUhBQWtDO0FBQzVDLFVBQVUsdUdBQTZCO0FBQ3ZDLFVBQVUseUVBQWU7QUFDekIsVUFBVSx3RUFBYztBQUN4QixVQUFVLHNFQUFhO0FBQ3ZCLFVBQVUsNEVBQWdCO0FBQzFCLFVBQVUsMEVBQWU7QUFDekIsVUFBVSxzRUFBYTtBQUN2QixVQUFVLHNFQUFhO0FBQ3ZCLFVBQVUsMEVBQWU7QUFDekIsVUFBVSxnRkFBa0I7QUFDNUIsVUFBVSwwRUFBZTtBQUN6QixVQUFVLDJFQUFnQjtBQUMxQixVQUFVLDJFQUFnQjtBQUMxQixVQUFVLHlGQUFzQjtBQUNoQyxVQUFVLG1GQUFtQjtBQUM3QixVQUFVLGlFQUFPO0FBQ2pCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FtdWVsYmVuYWlzLmZyLy4vbm9kZV9tb2R1bGVzL3RzcGFydGljbGVzLXNsaW0vZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRQanMgfSBmcm9tIFwidHNwYXJ0aWNsZXMtcGFydGljbGVzLmpzXCI7XG5pbXBvcnQgeyBsb2FkQW5nbGVVcGRhdGVyIH0gZnJvbSBcInRzcGFydGljbGVzLXVwZGF0ZXItYW5nbGVcIjtcbmltcG9ydCB7IGxvYWRCYXNlTW92ZXIgfSBmcm9tIFwidHNwYXJ0aWNsZXMtbW92ZS1iYXNlXCI7XG5pbXBvcnQgeyBsb2FkQ2lyY2xlU2hhcGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtc2hhcGUtY2lyY2xlXCI7XG5pbXBvcnQgeyBsb2FkQ29sb3JVcGRhdGVyIH0gZnJvbSBcInRzcGFydGljbGVzLXVwZGF0ZXItY29sb3JcIjtcbmltcG9ydCB7IGxvYWRFeHRlcm5hbEF0dHJhY3RJbnRlcmFjdGlvbiB9IGZyb20gXCJ0c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1hdHRyYWN0XCI7XG5pbXBvcnQgeyBsb2FkRXh0ZXJuYWxCb3VuY2VJbnRlcmFjdGlvbiB9IGZyb20gXCJ0c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1ib3VuY2VcIjtcbmltcG9ydCB7IGxvYWRFeHRlcm5hbEJ1YmJsZUludGVyYWN0aW9uIH0gZnJvbSBcInRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWJ1YmJsZVwiO1xuaW1wb3J0IHsgbG9hZEV4dGVybmFsQ29ubmVjdEludGVyYWN0aW9uIH0gZnJvbSBcInRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLWNvbm5lY3RcIjtcbmltcG9ydCB7IGxvYWRFeHRlcm5hbEdyYWJJbnRlcmFjdGlvbiB9IGZyb20gXCJ0c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1leHRlcm5hbC1ncmFiXCI7XG5pbXBvcnQgeyBsb2FkRXh0ZXJuYWxQYXVzZUludGVyYWN0aW9uIH0gZnJvbSBcInRzcGFydGljbGVzLWludGVyYWN0aW9uLWV4dGVybmFsLXBhdXNlXCI7XG5pbXBvcnQgeyBsb2FkRXh0ZXJuYWxQdXNoSW50ZXJhY3Rpb24gfSBmcm9tIFwidHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtcHVzaFwiO1xuaW1wb3J0IHsgbG9hZEV4dGVybmFsUmVtb3ZlSW50ZXJhY3Rpb24gfSBmcm9tIFwidHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtcmVtb3ZlXCI7XG5pbXBvcnQgeyBsb2FkRXh0ZXJuYWxSZXB1bHNlSW50ZXJhY3Rpb24gfSBmcm9tIFwidHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tZXh0ZXJuYWwtcmVwdWxzZVwiO1xuaW1wb3J0IHsgbG9hZEltYWdlU2hhcGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtc2hhcGUtaW1hZ2VcIjtcbmltcG9ydCB7IGxvYWRMaWZlVXBkYXRlciB9IGZyb20gXCJ0c3BhcnRpY2xlcy11cGRhdGVyLWxpZmVcIjtcbmltcG9ydCB7IGxvYWRMaW5lU2hhcGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtc2hhcGUtbGluZVwiO1xuaW1wb3J0IHsgbG9hZE9wYWNpdHlVcGRhdGVyIH0gZnJvbSBcInRzcGFydGljbGVzLXVwZGF0ZXItb3BhY2l0eVwiO1xuaW1wb3J0IHsgbG9hZE91dE1vZGVzVXBkYXRlciB9IGZyb20gXCJ0c3BhcnRpY2xlcy11cGRhdGVyLW91dC1tb2Rlc1wiO1xuaW1wb3J0IHsgbG9hZFBhcmFsbGF4TW92ZXIgfSBmcm9tIFwidHNwYXJ0aWNsZXMtbW92ZS1wYXJhbGxheFwiO1xuaW1wb3J0IHsgbG9hZFBhcnRpY2xlc0F0dHJhY3RJbnRlcmFjdGlvbiB9IGZyb20gXCJ0c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtYXR0cmFjdFwiO1xuaW1wb3J0IHsgbG9hZFBhcnRpY2xlc0NvbGxpc2lvbnNJbnRlcmFjdGlvbiB9IGZyb20gXCJ0c3BhcnRpY2xlcy1pbnRlcmFjdGlvbi1wYXJ0aWNsZXMtY29sbGlzaW9uc1wiO1xuaW1wb3J0IHsgbG9hZFBhcnRpY2xlc0xpbmtzSW50ZXJhY3Rpb24gfSBmcm9tIFwidHNwYXJ0aWNsZXMtaW50ZXJhY3Rpb24tcGFydGljbGVzLWxpbmtzXCI7XG5pbXBvcnQgeyBsb2FkUG9seWdvblNoYXBlIH0gZnJvbSBcInRzcGFydGljbGVzLXNoYXBlLXBvbHlnb25cIjtcbmltcG9ydCB7IGxvYWRTaXplVXBkYXRlciB9IGZyb20gXCJ0c3BhcnRpY2xlcy11cGRhdGVyLXNpemVcIjtcbmltcG9ydCB7IGxvYWRTcXVhcmVTaGFwZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1zaGFwZS1zcXVhcmVcIjtcbmltcG9ydCB7IGxvYWRTdGFyU2hhcGUgfSBmcm9tIFwidHNwYXJ0aWNsZXMtc2hhcGUtc3RhclwiO1xuaW1wb3J0IHsgbG9hZFN0cm9rZUNvbG9yVXBkYXRlciB9IGZyb20gXCJ0c3BhcnRpY2xlcy11cGRhdGVyLXN0cm9rZS1jb2xvclwiO1xuaW1wb3J0IHsgbG9hZFRleHRTaGFwZSB9IGZyb20gXCJ0c3BhcnRpY2xlcy1zaGFwZS10ZXh0XCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNsaW0oZW5naW5lKSB7XG4gICAgYXdhaXQgbG9hZEJhc2VNb3ZlcihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRQYXJhbGxheE1vdmVyKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZEV4dGVybmFsQXR0cmFjdEludGVyYWN0aW9uKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZEV4dGVybmFsQm91bmNlSW50ZXJhY3Rpb24oZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkRXh0ZXJuYWxCdWJibGVJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRFeHRlcm5hbENvbm5lY3RJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRFeHRlcm5hbEdyYWJJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRFeHRlcm5hbFBhdXNlSW50ZXJhY3Rpb24oZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkRXh0ZXJuYWxQdXNoSW50ZXJhY3Rpb24oZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkRXh0ZXJuYWxSZW1vdmVJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRFeHRlcm5hbFJlcHVsc2VJbnRlcmFjdGlvbihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRQYXJ0aWNsZXNBdHRyYWN0SW50ZXJhY3Rpb24oZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkUGFydGljbGVzQ29sbGlzaW9uc0ludGVyYWN0aW9uKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZFBhcnRpY2xlc0xpbmtzSW50ZXJhY3Rpb24oZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkQ2lyY2xlU2hhcGUoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkSW1hZ2VTaGFwZShlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRMaW5lU2hhcGUoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkUG9seWdvblNoYXBlKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZFNxdWFyZVNoYXBlKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZFN0YXJTaGFwZShlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRUZXh0U2hhcGUoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkTGlmZVVwZGF0ZXIoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkT3BhY2l0eVVwZGF0ZXIoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkU2l6ZVVwZGF0ZXIoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkQW5nbGVVcGRhdGVyKGVuZ2luZSk7XG4gICAgYXdhaXQgbG9hZENvbG9yVXBkYXRlcihlbmdpbmUpO1xuICAgIGF3YWl0IGxvYWRTdHJva2VDb2xvclVwZGF0ZXIoZW5naW5lKTtcbiAgICBhd2FpdCBsb2FkT3V0TW9kZXNVcGRhdGVyKGVuZ2luZSk7XG4gICAgYXdhaXQgaW5pdFBqcyhlbmdpbmUpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9