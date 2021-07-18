import * as THREE from "./../vendor/Threejs/r105/build/three.module.js";
import { initController } from "./init-min.js";
import { devicemotionController } from "./devicemotion-min.js";
import { cameraController } from "./camera-min.js";
import { lightController } from "./light-min.js";
import { meshController } from "./mesh-min.js";
import { ButtonizeController } from "./buttonize-min.js";
import { mousemoveController } from "./mousemove-min.js";
import { HomeSliderInteraction } from "./homeSliderController-min.js";
import { Renderer } from "./render-min.js";
import { Route } from "./route-min.js";
import { Info } from "./info-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { SliderNav } from "./sliderNav-min.js";

//////  INITIAL SETTINGS

const container = document.getElementById("container"),
  body = document.querySelector("body"),
  noise = document.querySelector("#noise");
let hasNavBar = 0;

let ww = window.innerWidth,
  hh = window.innerHeight;

let planes = [],
  targetY = 1,
  loader,
  planeGeo,
  canvas,
  currentPlane = -1,
  currentPlaneObj,
  scene,
  camera,
  pointLight;

let isMobile;

// Check if mobile
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
) {
  body.classList.add("mobile");
  isMobile = 1;
} else {
  body.classList.add("desktop");
  isMobile = 0;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  isMobile = 1;
  hasNavBar = 1;
}

var ua = navigator.userAgent || navigator.vendor || window.opera;
var isInstagram = ua.indexOf("Instagram") > -1 ? true : false;
var isMessenger = ua.indexOf("FBAN") > -1 ? true : false;
// alert(ua);
// alert(isMessenger);
if (isInstagram) {
  hasNavBar = 0;
}
if (isMessenger) {
  hasNavBar = 0;
}
if (hasNavBar) {
  body.classList.add("hasNavBar");
} else {
  body.classList.remove("hasNavBar");
}

// Scroll Lock
scrollLock.disablePageScroll();

//
// setVH();

// init();
initController.build();

// Device Motion
devicemotionController.build();

// Loader
loader = new THREE.TextureLoader();

// SCENE
scene = new THREE.Scene();

// CAMERA
cameraController.build(THREE);
camera = cameraController.camera();
camera.lookAt(scene.position);

// Device Motion

if (isMobile === 1) {
  devicemotionController.build();
}

// MESH

meshController.build(loader, THREE);
meshController.addPhoto(
  scene,
  planes,
  "./assets/img/refik-color.jpg",
  0,
  0,
  0,
  0,
);
meshController.addPhoto(
  scene,
  planes,
  "./assets/img/atolye-color.jpg",
  0,
  -2,
  0,
  0,
);
meshController.addPhoto(
  scene,
  planes,
  "./assets/img/salon-color.jpg",
  0,
  -4,
  0,
  0,
);
meshController.addPhoto(
  scene,
  planes,
  "./assets/img/kraken-color-6.jpg",
  0,
  -6,
  0,
  0,
);
meshController.addPhoto(
  scene,
  planes,
  "./assets/img/day-color.jpg",
  0,
  -8,
  0,
  0,
);
// meshController.addPhoto(
//   scene,
//   planes,
//   "./assets/img/empty-color.jpg",
//   0,
//   -10,
//   0,
//   0,
// );
meshController.addEmptiness(scene, planes, -10);

// meshController.addPhoto2(scene, planes, "common-image-4.jpg", 0, 0, 4, -3);

const commonPlaneId = 3;

export const Index = (function() {
  function createInstance() {}
  return {
    getPlanes: function() {
      return planes;
    },
    getScene: function() {
      return scene;
    },
    getCamera: function() {
      return camera;
    },
    getIsMobile: function() {
      return isMobile;
    },
    setCurrentcard: function(currentPlane_) {
      currentPlane = currentPlane_;
    },
    getCurrentcard: function() {
      return currentPlane;
    },
    setTargetY: function(targetY_) {
      targetY = targetY_;
    },
    getCurrentplaneobj: function() {
      return currentPlaneObj;
    },
    setCurrentplaneobj: function(currentPlaneObj_) {
      currentPlaneObj = currentPlaneObj_;
    },
    getWW: function() {
      return ww;
    },
    getHH: function() {
      return hh;
    },
  };
})();

// Mouse Move
mousemoveController.build(camera, ww, hh, targetY);
//
// Device Motion

if (isMobile === 1) {
  devicemotionController.build(camera, ww, hh, targetY);
}

// LIGHTS
// let pointLight;
lightController.build(THREE);
pointLight = lightController.getLight();
scene.add(pointLight);

Renderer.build(scene, camera, planeGeo, planes);

HomeSlider.build();

HomeSliderInteraction.build(camera);

ButtonizeController.build();

Info.build();
Route.build();

function onWindowResize() {
  ww = window.innerWidth;
  hh = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  Renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
  if (window.innerWidth <= 800) {
    isMobile = 1;
    let cameraVectors = cameraController.getCameraVectors();
    // cameraVectors.lookatTargetX = 0;
    cameraController.setCameraVectors(cameraVectors);
    if (Route.getCurrentPageId() == 0) {
      TweenMax.to(container, 1, { opacity: 0.5 });
    }
    body.classList.add("mobile");
    body.classList.remove("desktop");
  } else {
    isMobile = 0;
    let cameraVectors = cameraController.getCameraVectors();
    // cameraVectors.lookatTargetX = 1;
    cameraController.setCameraVectors(cameraVectors);
    if (Route.getCurrentPageId() == 0) {
      TweenMax.to(container, 1, { opacity: 1 });
    }
    body.classList.add("desktop");
    body.classList.remove("mobile");
  }
  HomeSlider.updateLogoPosition();
}

window.addEventListener("resize", onWindowResize, false);

window.onload = function(e) {
  window.dispatchEvent(new Event("resize"));
  TweenMax.to(noise, 1, { opacity: 0.15 });
};

SliderNav.build();
