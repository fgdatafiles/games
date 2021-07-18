import * as THREE from "./../vendor/Threejs/r105/build/three.module.js";
import { Renderer } from "./render-min.js";
import { Index } from "./index-min.js";

export const cameraController = (function() {
  let cameraobj;
  let cameraVectors = {};
  (cameraVectors.cameraCenter = new THREE.Vector3(0, 0, 1)),
    (cameraVectors.lookatCenter = new THREE.Vector3(0, 0, 0)),
    (cameraVectors.cameraTargetX = 0),
    (cameraVectors.cameraTargetY = 1),
    (cameraVectors.cameraTargetZ = 1),
    (cameraVectors.cameraSwingX = 0),
    (cameraVectors.cameraSwingY = 0),
    (cameraVectors.lookatTargetX = 0), //
    (cameraVectors.lookatTargetY = 1.25), // Starting lookat Y
    (cameraVectors.lookatTargetZ = 0); // Starting lookat Y

  function createInstance() {}
  return {
    build: function(THREE, renderer) {
      cameraobj = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      cameraobj.position.z = 6; // first setup
      // cameraobj.position.z = 0.4; // first setup
      cameraobj.position.x = 0;
      cameraobj.position.y = -5;
    },
    camera: function() {
      return cameraobj;
    },
    getCameraVectors: function() {
      return cameraVectors;
    },
    setCameraVectors: function(cameraVectors_) {
      cameraVectors = cameraVectors_;
    },
    setTargetPosition: function(params) {},
    setPosition: function(params) {},
  };
})();
