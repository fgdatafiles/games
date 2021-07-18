import * as THREE from "./../vendor/Threejs/r105/build/three.module.js";
import { Preloader } from "./preloader-min.js";
// import { HomeSlider } from "./homeSlider-min.js";

export const initController = (function() {
  function createInstance() {}
  return {
    build: function() {
      ////// SET HEIGHT OF CONTAINER FOR MOBILE DEVICES
      let vh = window.innerHeight * 0.01;
      container.style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", function() {
        vh = window.innerHeight * 0.01;
        container.style.setProperty("--vh", `${vh}px`);
      });
      // var textureManager = new THREE.LoadingManager();
      // textureManager.onProgress = function(item, loaded, total) {
      //   // this gets called after any item has been loaded
      // };
      // textureManager.onLoad = function() {
      //   // all textures are loaded
      //   // ...
      //   console.log("! loaded");
      //   TweenMax.to(preloader, 1, {
      //     opacity: 0,
      //     top: -20,
      //     onComplete: function() {
      //       preloader.classList.add("displayNone");
      //     },
      //   });
      //   HomeSlider.runFirstSlide();
      // };
      // var preloader = new Preloader();
      Preloader.build();
      // var textureLoader = new THREE.ImageLoader(textureManager);
      // var myTextureArray = [];
      // var myTexture = new THREE.Texture();
      // myTextureArray.push(myTexture);
    },
    // camera: function() {
    // return cameraobj;
    // },
  };
})();
