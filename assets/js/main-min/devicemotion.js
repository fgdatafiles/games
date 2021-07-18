import { Index } from "./index-min.js";
import { cameraController } from "./camera-min.js";
import { Renderer } from "./render-min.js";

export const devicemotionController = (function() {
  // let cameraobj;

  let ww,
    hh,
    camera,
    targetY,
    size = 1,
    firstX = 0,
    firstY = 0,
    prevX = 0,
    prevY = 0,
    posX,
    posY,
    firstSet = 0,
    n = 0;
  function onDocumentDeviceMotion(event) {
    event.preventDefault();
    if (firstSet === 0) {
      firstX = event.accelerationIncludingGravity.x;
      firstY = event.accelerationIncludingGravity.y;
      console.log(firstX);
      console.log(firstY);
      firstSet = 1;
    }
    setTimeout(() => {
      prevX = event.accelerationIncludingGravity.x;
      prevY = event.accelerationIncludingGravity.y;
    }, 50);
    var aspectRatio = hh / ww;
    // Renderer.setfireflyInteractionX(event.accelerationIncludingGravity.x * 0.1);
    // Renderer.setfireflyInteractionY(
    //   1 + event.accelerationIncludingGravity.y * 0.1,
    // );
    // Renderer.setfireflyInteractionY(
    //   event.accelerationIncludingGravity.y * 0.02,
    // );
    // console.log(event.accelerationIncludingGravity.x * 2);
    if (size == 1) {
      posX = aspectRatio * (prevX - event.accelerationIncludingGravity.x);
      posY = aspectRatio * (prevY - event.accelerationIncludingGravity.y);
      if (n => 500) {
        // Renderer.setfireflyInteractionX(posX / 100);
        // Renderer.setfireflyInteractionY(posY / 100);
        n = 0;
      }
      n++;
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
      cameraVectors.cameraSwingX = -posX;
      cameraVectors.cameraSwingY = -posY;
      cameraController.setCameraVectors(cameraVectors);
    } else if (size == 2) {
      posX = aspectRatio * (prevX - event.accelerationIncludingGravity.x);
      posY = aspectRatio * (prevY - event.accelerationIncludingGravity.y);
    }
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
      window.addEventListener("devicemotion", onDocumentDeviceMotion, false);
    },
    setSize: function(size_) {
      size = size_;
    },
    // camera: function() {
    // return cameraobj;
    // },
  };
})();
