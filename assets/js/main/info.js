import { Index } from "./index-min.js";
import { HomeSliderInteraction } from "./homeSliderController-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { cameraController } from "./camera-min.js";
import { mousemoveController } from "./mousemove-min.js";
import { Route } from "./route-min.js";
import { devicemotionController } from "./devicemotion-min.js";
import { ButtonizeController } from "./buttonize-min.js";

export const Info = (function() {
  let currentSlide;

  const html = document.querySelector("#info"),
    infoButton = document.querySelector("#infoButton"),
    infoCloseButton = document.querySelector("#infoCloseButton"),
    containerObj = document.querySelector("#container"),
    infoSubBox = document.querySelectorAll(".infoSubBox");
  const a = document.querySelectorAll(".homeSlide");
  const c = document.querySelector("#container");
  const l = document.querySelector("#logo");
  const infoContent = document.querySelector("#infoContent");
  const sliderNav = document.querySelector("#sliderNav");

  function hideThis() {
    if (Index.getIsMobile() == 1) {
      TweenMax.to(c, 2, { opacity: 0.5 });
    } else {
      TweenMax.to(c, 2, { opacity: 1 });
    }
    TweenMax.to(l, 0.3, { opacity: 1 });
    TweenMax.to(infoContent, 1, {
      opacity: 0,
      scale: 0.8,
      rotationX: -2,
      rotationY: 0,
      onComplete: function() {
        html.classList.add("displayNone");
      },
    });

    // TweenMax.to(containerObj, 2, { opacity: 1 });
    currentSlide = HomeSliderInteraction.getCurrentSlide();
    HomeSlider.getSliderData()[currentSlide].show();
    let cameraVectors = cameraController.getCameraVectors();
    cameraVectors.lookatTargetX = HomeSlider.getlastLookatTargetX();
    cameraVectors.cameraTargetZ = 1;
    cameraController.setCameraVectors(cameraVectors);
    mousemoveController.setSize(1);
    devicemotionController.setSize(1);
    for (let i = 0; i < infoSubBox.length; i++) {
      const e = infoSubBox[i];
      TweenMax.to(e, 1, { opacity: 0, scale: 1, delay: 0 + i * 0.3 });
    }
    Route.setCurrentPageId(0);
    // removeEventListener(infoCloseButton, "mouseleave");
    TweenMax.killTweensOf(infoCloseButton);
    setTimeout(() => {
      TweenMax.to(infoCloseButton, 1, { scale: 0 });
    }, 10);
    setTimeout(() => {
      TweenMax.to(a, 0.3, { opacity: 1 });
      TweenMax.to(sliderNav, 1, { opacity: 1 });
    }, 1000);
    sliderNav.classList.remove("displayNone");
  }

  function createInstance() {}
  return {
    build: function() {
      TweenMax.to(infoContent, 0, {
        transformOrigin: "center",
        transformPerspective: "50",
        force3D: true,
      });
      TweenMax.to(infoSubBox, 0, {
        transformOrigin: "center",
        transformPerspective: "50",
        force3D: true,
      });
      infoCloseButton.addEventListener(
        "mouseup",
        function(event) {
          ButtonizeController.infoButtonShow();
          hideThis();
        },
        false,
      );
      infoCloseButton.addEventListener(
        "mouseenter",
        function(event) {
          TweenMax.to(infoCloseButton, 1, { scale: 0.8, rotation: -90 });
        },
        false,
      );
      infoCloseButton.addEventListener(
        "mouseleave",
        function(event) {
          if (Route.getCurrentPageId() == 1) {
            TweenMax.to(infoCloseButton, 1, { scale: 1, rotation: 0 });
          }
        },
        false,
      );
    },
    show: function() {
      for (let i = 0; i < infoSubBox.length; i++) {
        const e = infoSubBox[i];
        TweenMax.to(e, 0, { scale: 1, opacity: 0, rotationX: 0, delay: 0 });
        TweenMax.to(e, 2, {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          delay: 0.5 + i * 0.3,
        });
      }
      html.classList.remove("displayNone");
      TweenMax.to(infoContent, 0, { scale: 1.3, rotationX: -2 });
      TweenMax.to(infoContent, 2, { scale: 1, rotationX: 0, opacity: 1 });
      TweenMax.to(html, 1, { opacity: 1 });
      TweenMax.to(infoCloseButton, 0, { scale: 0, rotation: 45 });
      TweenMax.to(infoCloseButton, 1, { scale: 1, rotation: 0 });
      TweenMax.to(sliderNav, 1, { opacity: 0 });
    },
    hide: function() {
      hideThis();
    },
  };
})();
