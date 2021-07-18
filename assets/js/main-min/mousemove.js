import { Index } from "./index-min.js";
import { cameraController } from "./camera-min.js";
import { Renderer } from "./render-min.js";

export const mousemoveController = (function() {
  // let cameraobj;

  var ww;
  var hh;
  var camera;
  var targetY;
  var size = 1;
  var posX = 0;
  var posY = 0;

  function onDocumentMouseMove(event) {
    event.preventDefault();
    if (size == 1) {
      posX = (event.clientX - ww / 2) / -ww + 0.5;
      posY = (event.clientY - hh / 2) / 2000;
      var posZ = camera.position.z - 0;
      var from = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
      var to = {
        x: posX,
        y: posY,
        z: posZ,
      };
      let cameraVectors = cameraController.getCameraVectors();
      cameraVectors.cameraTargetX = -posX;
      cameraVectors.cameraSwingY = -posY;
      cameraController.setCameraVectors(cameraVectors);
    } else if (size == 2) {
      posX = (event.clientX - ww / 2) / -6000;
      posY = (event.clientY - hh / 2) / 20000;
    }
    // Renderer.setfireflyInteractionX(posX * -0.2);
    // Renderer.setfireflyInteractionY(posY * -1.2);
  }

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function createInstance() {}
  return {
    build: function(camera_, ww_, hh_, targetY_) {
      // Mousemove
      ww = ww_;
      hh = hh_;
      targetY = targetY_;
      camera = camera_;
      document.addEventListener("mousemove", onDocumentMouseMove, false);
    },
    setSize: function(size_) {
      size = size_;
    },
    getX: function() {
      return posX;
    },
    getY: function() {
      return posY;
    },
    // camera: function() {
    // return cameraobj;
    // },
  };
})();
