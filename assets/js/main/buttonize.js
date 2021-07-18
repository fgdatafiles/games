import { Index } from "./index-min.js";
import { HomeSliderInteraction } from "./homeSliderController-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { cameraController } from "./camera-min.js";
import { mousemoveController } from "./mousemove-min.js";
import { Info } from "./info-min.js";
import { Route } from "./route-min.js";
import { devicemotionController } from "./devicemotion-min.js";

export const ButtonizeController = (function() {
  let camera;
  let planes;
  let targetY = 0;
  const infobutton = document.querySelector("#infoButton");
  const infoButtonHover = document.querySelector("#infoButtonHover");
  let currentSlide;
  const containerObj = document.querySelector("#container");
  const a = document.querySelectorAll(".homeSlide");
  const c = document.querySelector("#container");
  const logo = document.querySelector("#logo");
  const sliderNav = document.querySelector("#sliderNav");

  function buttonize() {
    infoButton.addEventListener(
      "mouseup",
      function(event) {
        TweenMax.to(containerObj, 0.5, {
          opacity: 0,
        });
        currentSlide = HomeSliderInteraction.getCurrentSlide();
        HomeSlider.getSliderData()[currentSlide].hide();
        Info.show();
        mousemoveController.setSize(2);
        devicemotionController.setSize(2);
        Route.setCurrentPageId(1);
        // let cameraVectors = cameraController.getCameraVectors();
        // cameraVectors.cameraTargetZ = 6;
        // cameraController.setCameraVectors(cameraVectors);
        let cameraVectors = cameraController.getCameraVectors();
        cameraVectors.lookatTargetX = 0;
        cameraVectors.cameraTargetZ = 0.1;
        if (Index.getIsMobile() == 1) {
          // cameraVectors.lookatTargetX = 0;
        } else {
          // cameraVectors.lookatTargetX = 1;
        }
        TweenMax.to(logo, 0.3, { opacity: 1 });
        cameraController.setCameraVectors(cameraVectors);
        TweenMax.to(infoButtonHover, 0.3, { height: 0 });
        sliderNav.classList.add("displayNone");
        infoButtonHideFn();
      },
      false,
    );
    infoButton.addEventListener(
      "mouseenter",
      function(event) {
        TweenMax.to(a, 0.3, { opacity: 0 });
        TweenMax.to(c, 1, { opacity: 0.2 });
        TweenMax.to(logo, 0.3, { opacity: 0 });
        TweenMax.to(sliderNav, 0.3, { opacity: 0 });
        let cameraVectors = cameraController.getCameraVectors();
        cameraVectors.lookatTargetX = 0;
        cameraVectors.cameraTargetZ = 0.1;
        if (Index.getIsMobile() == 1) {
          // cameraVectors.lookatTargetX = 0;
        } else {
          // cameraVectors.lookatTargetX = 1;
        }
        cameraController.setCameraVectors(cameraVectors);
        TweenMax.to(infoButtonHover, 1, { width: 112, height: 10 });
      },
      false,
    );
    infoButton.addEventListener(
      "mouseleave",
      function(event) {
        if (Route.getCurrentPageId() == 1) return;
        if (Index.getIsMobile() == 1) {
          TweenMax.to(c, 0.3, { opacity: 0.5 });
        } else {
          TweenMax.to(c, 0.3, { opacity: 1 });
        }
        TweenMax.to(a, 0.3, { opacity: 1 });
        TweenMax.to(sliderNav, 0.3, { opacity: 1 });

        TweenMax.to(logo, 0.3, { opacity: 1 });
        let cameraVectors = cameraController.getCameraVectors();
        // cameraVectors.lookatTargetX = 1;
        cameraVectors.cameraTargetZ = 1;

        cameraVectors.lookatTargetX = HomeSlider.getlastLookatTargetX();
        cameraController.setCameraVectors(cameraVectors);
        TweenMax.to(infoButtonHover, 1, { height: 0 });
      },
      false,
    );
  }

  function infoButtonShowFn() {
    TweenMax.killTweensOf(infobutton);
    infoButton.classList.remove("displayNone");
    TweenMax.to(infobutton, 0, { y: 50, rotationZ: -4 });
    TweenMax.to(infobutton, 1, { opacity: 1, y: 0, rotationZ: 0 });
  }

  function infoButtonHideFn() {
    TweenMax.killTweensOf(infobutton);
    TweenMax.to(infobutton, 1, {
      opacity: 0,
      y: 50,
      rotation: -4,
      onComplete: function() {
        infoButton.classList.add("displayNone");
      },
    });
  }

  function createInstance() {}
  return {
    build: function() {
      planes = Index.getPlanes();
      camera = cameraController.camera();
      buttonize();
    },
    infoButtonShow: function() {
      infoButtonShowFn();
    },
    infoButtonHide: function() {
      infoButtonHideFn();
    },
  };
})();
