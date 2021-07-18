import * as THREE from "./../vendor/Threejs/r105/build/three.module.js";
import { EffectComposer } from "./../vendor/Threejs/r105/src/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./../vendor/Threejs/r105/src/jsm/postprocessing/RenderPass.js";
import { cameraController } from "./camera-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { lightController } from "./light-min.js";
import { Index } from "./index-min.js";
import { mousemoveController } from "./mousemove-min.js";

export const Renderer = (function() {
  let renderer,
    then = 0,
    composer,
    planeGeo,
    planes,
    light,
    count = 0,
    xxx = 0.002,
    fireflyX = 0,
    fireflyY = 0,
    fireflyZ = 0,
    fireflyTargetX = 0,
    fireflyTargetY = 0,
    fireflyTargetZ = 0,
    fireflyControlledX = 1.5,
    fireflyInteractionY = 0,
    fireflyInteractionX = 0;

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;
    composer.render(deltaTime);
    TWEEN.update();
    let currentplane = HomeSlider.getCurrentPlane();
    if (currentplane) {
      var currentGeometry = currentplane.geometry;
      for (var i = 0; i < currentGeometry.vertices.length; i++) {
        var z = +currentGeometry.vertices[i].z;
        currentGeometry.vertices[i].z = lerp(
          z,
          Math.sin(i + count * xxx) *
            (currentGeometry.vertices[i]._myZ -
              currentGeometry.vertices[i]._myZ *
                Math.tan(currentGeometry.vertices[i].z)),
          0.003,
        );

        currentGeometry.verticesNeedUpdate = true;

        count += 0.1;
      }
    }

    var camera = Index.getCamera();

    const cameraVectors = cameraController.getCameraVectors();

    let lookat = cameraVectors.lookatCenter;
    var currentLookatX = cameraVectors.lookatCenter.x;
    var currentLookatY = cameraVectors.lookatCenter.y;
    var currentLookatZ = cameraVectors.lookatCenter.z;
    var targetLookatY = cameraVectors.lookatTargetY;
    var targetLookatX = cameraVectors.lookatTargetX;
    var targetLookatZ = cameraVectors.lookatTargetZ;
    var cameraSwingY = cameraVectors.cameraSwingY;
    var cameraSwingX = cameraVectors.cameraSwingX;
    var cameraTargetX = cameraVectors.cameraTargetX;
    var cameraTargetY = cameraVectors.cameraTargetY;
    var cameraTargetZ = cameraVectors.cameraTargetZ;

    camera.position.x = lerp(
      camera.position.x,
      cameraTargetX + cameraSwingX,
      0.01,
    );
    camera.position.z = lerp(camera.position.z, cameraTargetZ, 0.01);

    // console.log(cameraTargetX);

    camera.position.y = lerp(
      camera.position.y,
      targetLookatY + cameraSwingY,
      0.01,
    );

    var lookatY = lerp(currentLookatY, targetLookatY, 0.05);
    lookat.y = lookatY;
    var lookatX = lerp(currentLookatX, targetLookatX, 0.05);
    lookat.x = lookatX;
    var lookatZ = lerp(currentLookatZ, targetLookatZ, 0.05);
    lookat.z = lookatZ;

    fireflyX = lerp(fireflyX, fireflyTargetX + fireflyInteractionX, 0.01);
    fireflyY = lerp(fireflyY, fireflyTargetY + fireflyInteractionY, 0.01);

    light.position.x = lookatX - fireflyControlledX + fireflyX;
    light.position.y = lookatY - 0.5 + fireflyY;

    camera.lookAt(lookat);

    requestAnimationFrame(render);
  }

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function createInstance() {}
  return {
    build: function(scene, camera, planeGeo_, planes_) {
      light = lightController.getLight();
      planes = planes_;
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
      });
      // RENDERER
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = false;
      document.querySelector("#mid").appendChild(renderer.domElement);

      // Filters
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      if (Index.getIsMobile() == 0) {
        fireflyTargetX = 0.75;
        fireflyTargetY = 0.75;
      } else {
        fireflyTargetX = 1.75;
        fireflyTargetY = 0.75;
      }

      render();
    },
    getRenderer: function() {
      return renderer;
    },
    setfireflyTargetX: function(i) {
      fireflyControlledX = i;
      let intNum = 0;
      let int = setInterval(function() {
        fireflyControlledX = lerp(fireflyControlledX, i, 0.01);
        intNum++;
        if (intNum == 500) {
          clearInterval(int);
        }
      }, 1);
    },
    setfireflyInteractionX: function(i) {
      fireflyInteractionX = i;
    },
    setfireflyInteractionY: function(i) {
      fireflyInteractionY = i;
    },
  };
})();
