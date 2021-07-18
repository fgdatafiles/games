import { Index } from "./index-min.js";
import { ButtonizeController } from "./buttonize-min.js";
import { cameraController } from "./camera-min.js";
import { devicemotionController } from "./devicemotion-min.js";
import { mousemoveController } from "./mousemove-min.js";
import { lightController } from "./light-min.js";
import { Renderer } from "./render-min.js";

export const HomeSlider = (function() {
  let slideHTMLs = document.querySelectorAll(".homeSlide");
  let planes;
  let currentSlide = 0;
  let currentPlane = null;
  let sliderData;
  let isScrollingStarted = 0;
  const mouseIndicator = document.querySelector("#mouseIndicator");
  const logo = document.querySelector("#logo");
  const logoW = logo.clientWidth;
  let logoTop = 0,
    logoLeft = 0;
  const mousepoint = document.querySelector("#mousePoint");
  const infobutton = document.querySelector("#infoButton");
  const containerObj = document.querySelector("#container");
  const visitButton = document.querySelectorAll(".visitButton");
  const sliderNav = document.querySelector("#sliderNav");
  const homeSlideEndSeperatorDesktop = document.querySelector(
    "#homeSlideEndSeperatorDesktop",
  );
  const homeSlideEndSeperatorMobile = document.querySelector(
    "#homeSlideEndSeperatorMobile",
  );
  let mousepointerTimeline, logoTimeline;
  let logofirstInit = 1;
  let isLogoAtTop = 0;
  let lastLookatTargetX = 0;
  let firefly;
  let fireflymaterial;

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
  function buttonize() {
    // for (let i = 0; i < visitButton.length; i++) {
    //   const e = visitButton[i];
    //   e.innerHTML =
    //     "<div class='visitButtonLayer1'>Visit Website</div><div class='visitButtonLayer2'>Visit Website</div>";
    // }
  }
  function slideAnimateIn(slide, slideInner) {
    TweenMax.killTweensOf(slide);
    TweenMax.killTweensOf(slideInner);
    TweenMax.to(slideInner, 0, {
      y: 0,
      x: 0,
      scale: 0.8,
      rotationY: -0,
      rotationX: -2,
      opacity: 0,
      transformOrigin: "center",
      transformPerspective: "50",
      force3D: true,
    });
    TweenMax.to(slideInner, 1.5, {
      y: 0,
      x: 0,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      opacity: 1,
      delay: 1,
    });
  }
  function slideAnimateOut(slide, slideInner) {
    TweenMax.killTweensOf(slide);
    TweenMax.killTweensOf(slideInner);
    TweenMax.to(slideInner, 0.5, {
      y: 0,
      x: 0,
      scale: 0.9,
      rotationY: 0,
      rotationX: 0,
      opacity: 0,
      onComplete: function() {
        slide.classList.add("displayNone");
      },
    });
  }
  function gotoPlane(id) {
    const _trgt = planes[id].position.y;
    let cameraVectors = cameraController.getCameraVectors();
    cameraVectors.cameraTargetY = _trgt;
    cameraVectors.lookatTargetY = _trgt;
    if (Index.getIsMobile() == 1) {
      cameraVectors.lookatTargetX = 0;
      lastLookatTargetX = 0;
    } else {
      cameraVectors.lookatTargetX = 1;
      lastLookatTargetX = 1;
    }
    cameraController.setCameraVectors(cameraVectors);
  }
  function getLogoLeft() {
    return (Index.getWW() - logoW - 0) / 2;
  }
  function getLogoTop() {
    if (Index.getIsMobile() === 0) {
      return (Index.getHH() - 0) / 2 - 150;
    } else {
      return (Index.getHH() - 0) / 2 - 200;
    }
  }
  function defocusPlane(obj) {
    // if (step <= -1) return;
    var currentGeometry = obj.geometry;
    var defocusIntervalCounter = 0;
    var defocusInterval = setInterval(function() {
      for (var i = 0; i < currentGeometry.vertices.length; i++) {
        var z = +currentGeometry.vertices[i].z;
        currentGeometry.vertices[i].z = lerp(z, 0, 0.4);
        currentGeometry.verticesNeedUpdate = true;
      }
    }, 100);
    setTimeout(function() {
      clearInterval(defocusInterval);
    }, 1000);
  }
  function showNav() {
    TweenMax.killTweensOf(sliderNav);
    sliderNav.classList.remove("displayNone");
    TweenMax.to(sliderNav, 1, { opacity: 1 });
  }
  function hideNav() {
    TweenMax.killTweensOf(sliderNav);
    TweenMax.to(sliderNav, 1, {
      opacity: 0,
      onComplete: function() {
        sliderNav.classList.add("displayNone");
      },
    });
  }
  function createInstance() {}
  return {
    build: function() {
      planes = Index.getPlanes();
      buttonize();
      sliderData = [
        {
          name: "start",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlide1"),
          htmlObjectInner: document.querySelector(
            "#homeSlide1 .homeSlideInner",
          ),
          webglObject: planes[0],
          show: function() {
            document
              .querySelector("#homeSlide1")
              .classList.remove("displayNone");
            let cameraVectors = cameraController.getCameraVectors();
            cameraVectors.cameraTargetY = 0;
            cameraVectors.cameraTargetX = 0;
            cameraVectors.lookatTargetY = 1.25;
            cameraVectors.lookatTargetX = 0;
            lastLookatTargetX = 0;
            cameraController.setCameraVectors(cameraVectors);
            mouseIndicator.classList.remove("displayNone");
            TweenMax.to(mouseIndicator, 5, { opacity: 1, delay: 4 });
            if (logofirstInit) {
              TweenMax.to(container, 1, { opacity: 1, delay: 2 });
              TweenMax.to(logo, 0, {
                left: getLogoLeft(),
                top: getLogoTop() + 30,
                force3D: true,
                rotationZ: 0.0001,
              });
              TweenMax.to(logo, 1.5, {
                opacity: 1,
                ease: Circ.easeOut,
                top: getLogoTop(),
              });
              logofirstInit = 0;
            } else {
              TweenMax.to(container, 1, { opacity: 1, delay: 0 });

              if (Index.getIsMobile() === 0) {
                TweenMax.to(logo, 2.5, {
                  left: getLogoLeft(),
                  top: getLogoTop(),
                  ease: Circ.easeInOut,
                });
              } else {
                logoTimeline = new TimelineMax({
                  repeatDelay: 0,
                });
                logoTimeline.to(logo, 1, { opacity: 0 });
                logoTimeline.to(logo, 0, {
                  left: getLogoLeft(),
                  top: getLogoTop(),
                });
                logoTimeline.to(logo, 1, { opacity: 1 });
              }
              logofirstInit = 0;
            }
            isLogoAtTop = 0;

            mousepointerTimeline = new TimelineMax({
              repeat: -1,
              repeatDelay: 0,
            });
            mousepointerTimeline.to(mousepoint, 0, { y: 20, opacity: 0 });
            mousepointerTimeline.to(mousepoint, 0.5, { y: 0, opacity: 1 });
            mousepointerTimeline.to(mousepoint, 0.5, { y: -20, opacity: 0 });
            TweenMax.to(this.htmlObjectInner, 0, {
              y: 50,
              x: 0,
              scale: 0.8,
              rotationY: -3,
              rotationX: -3,
              opacity: 0,
              transformOrigin: "center",
              transformPerspective: "50",
              force3D: true,
            });
            TweenMax.to(this.htmlObjectInner, 2.5, {
              y: 0,
              x: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              opacity: 1,
              delay: 1,
            });
            // TweenMax.to(infobutton, 1, { opacity: 0 });
            ButtonizeController.infoButtonHide();
            setTimeout(() => {
              hideNav();
            }, 500);
            TweenMax.to(fireflymaterial, 1, { opacity: 0 });
            // Renderer.setfireflyTargetX(-0.5);
          },
          hide: function() {
            // document.querySelector("#homeSlide1").classList.add("displayNone");
            TweenMax.killTweensOf(this.htmlObject);
            TweenMax.killTweensOf(this.htmlObjectInner);
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            TweenMax.killTweensOf(mouseIndicator);
            TweenMax.to(mouseIndicator, 1, {
              opacity: 0,
              onComplete: function() {
                mouseIndicator.classList.add("displayNone");
              },
            });
            if (Index.getIsMobile() == 1) {
              logoTimeline = new TimelineMax({
                // repeat: -1,
                repeatDelay: 0,
              });
              logoTimeline.to(logo, 1, { opacity: 0 });
              logoTimeline.to(logo, 0, {
                left: 0,
                top: 0,
              });
              logoTimeline.to(logo, 1, { opacity: 1 });
            } else {
              TweenMax.to(logo, 1, { top: 0, ease: Circ.easeInOut });
            }
            isLogoAtTop = 1;
            mousepointerTimeline.kill();
            ButtonizeController.infoButtonShow();
            showNav();
            if (Index.getIsMobile() === 1) {
              TweenMax.to(container, 1, { opacity: 0.5, delay: 0 });
            }
            TweenMax.to(fireflymaterial, 1, { opacity: 1 });
            // if (Index.getIsMobile() == 1) {
            //   Renderer.setfireflyTargetX(0.5);
            // } else {
            //   Renderer.setfireflyTargetX(1.5);
            // }
          },
        },

        {
          name: "refik",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlide2"),
          htmlObjectInner: document.querySelector(
            "#homeSlide2 .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlide2 .homeSlideAnimObj",
          ),
          webglObject: planes[0],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            gotoPlane(0);
            currentPlane = this.webglObject;
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
          },
          hide: function() {
            TweenMax.killTweensOf(this.htmlObject);
            TweenMax.killTweensOf(this.htmlObjectInner);
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            defocusPlane(this.webglObject);
          },
        },
        {
          name: "atolye",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlideAtolye"),
          htmlObjectInner: document.querySelector(
            "#homeSlideAtolye .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlideAtolye .homeSlideAnimObj",
          ),
          webglObject: planes[1],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            gotoPlane(1);
            currentPlane = this.webglObject;
            // console.log(homeSlideAnimObj);
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
          },
          hide: function() {
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            defocusPlane(this.webglObject);
          },
        },
        {
          name: "salon",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlideSalon"),
          htmlObjectInner: document.querySelector(
            "#homeSlideSalon .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlideSalon .homeSlideAnimObj",
          ),
          webglObject: planes[2],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            gotoPlane(2);
            currentPlane = this.webglObject;
            // console.log(homeSlideAnimObj);
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
          },
          hide: function() {
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            defocusPlane(this.webglObject);
          },
        },
        {
          name: "kraken",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlideKraken"),
          htmlObjectInner: document.querySelector(
            "#homeSlideKraken .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlideKraken .homeSlideAnimObj",
          ),
          webglObject: planes[3],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            gotoPlane(3);
            currentPlane = this.webglObject;
            // console.log(homeSlideAnimObj);
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
          },
          hide: function() {
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            defocusPlane(this.webglObject);
          },
        },

        {
          name: "day",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlide4"),
          htmlObjectInner: document.querySelector(
            "#homeSlide4 .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlide4 .homeSlideAnimObj",
          ),
          webglObject: planes[4],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            gotoPlane(4);
            currentPlane = this.webglObject;
            // console.log(homeSlideAnimObj);
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
          },
          hide: function() {
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            defocusPlane(this.webglObject);
          },
        },

        {
          name: "end",
          cameraTargetPosition: null,
          cameraPosition: null,
          htmlObject: document.querySelector("#homeSlideEnd"),
          htmlObjectInner: document.querySelector(
            "#homeSlideEnd .homeSlideInner",
          ),
          homeSlideAnimObj: document.querySelectorAll(
            "#homeSlideEnd .homeSlideAnimObj",
          ),
          webglObject: planes[4],
          show: function() {
            this.htmlObject.classList.remove("displayNone");
            currentPlane = this.webglObject;
            slideAnimateIn(this.htmlObject, this.htmlObjectInner);
            let cameraVectors = cameraController.getCameraVectors();
            cameraVectors.cameraTargetX = 0;
            cameraVectors.cameraTargetY = planes[4].position.y - 1.5;
            cameraVectors.lookatTargetY = planes[4].position.y - 1.5;
            cameraVectors.lookatTargetX = 0;
            lastLookatTargetX = 0;
            TweenMax.killTweensOf(this.homeSlideEndSeperatorDesktop);
            TweenMax.killTweensOf(this.homeSlideEndSeperatorMobile);
            TweenMax.to(homeSlideEndSeperatorDesktop, 2.5, {
              opacity: 0.15,
              height: 180,
              delay: 1,
            });
            TweenMax.to(homeSlideEndSeperatorMobile, 1.5, {
              opacity: 0.15,
              width: 100,
              delay: 1,
              rotation: -5,
            });
            TweenMax.to(fireflymaterial, 1, { opacity: 0 });
          },
          hide: function() {
            slideAnimateOut(this.htmlObject, this.htmlObjectInner);
            mousemoveController.setSize(1);
            devicemotionController.setSize(1);
            TweenMax.killTweensOf(this.homeSlideEndSeperatorDesktop);
            TweenMax.killTweensOf(this.homeSlideEndSeperatorMobile);
            TweenMax.to(homeSlideEndSeperatorDesktop, 0.5, {
              opacity: 1,
              height: 0,
              delay: 0,
              force3D: true,
            });
            TweenMax.to(homeSlideEndSeperatorMobile, 0.5, {
              opacity: 1,
              width: 0,
              delay: 0,
              rotation: 0,
            });
            TweenMax.to(fireflymaterial, 1, { opacity: 1 });
          },
        },
      ];
      // console.log(sliderData);
    },
    up: function() {
      // goUp();
    },
    down: function() {
      // goDown();
    },
    runFirstSlide: function() {
      firefly = lightController.getFirefly();
      fireflymaterial = lightController.getFireflyMaterial();
      currentPlane = planes[0];
      logoLeft = (Index.getWW() - logoW - 0) / 2;
      if (Index.getIsMobile() === 0) {
        // logoTop = (Index.getHH() - 0) / 2 - 0;
        // console.log(Index.getHH());
        // console.log(logoTop);
      } else {
        // logoTop = (Index.getHH() - 0) / 2 - 300;
      }
      // setTimeout(() => {
      setTimeout(() => {
        sliderData[0].show();
        // TweenMax.to(container, 3, { opacity: 1, delay: 3 });
      }, 1000);
      // }, 2000);
    },
    getSliderData: function() {
      return sliderData;
    },
    getCurrentPlane: function() {
      return currentPlane;
    },
    setCurrentPlane: function(currentPlane_) {
      currentPlane = currentPlane_;
    },
    getlastLookatTargetX: function() {
      return lastLookatTargetX;
    },
    updateLogoPosition: function() {
      if (isLogoAtTop == 0) {
        TweenMax.to(logo, 1, {
          left: getLogoLeft(),
          top: getLogoTop(),
          ease: Circ.easeInOut,
        });
      } else {
        TweenMax.to(logo, 1, {
          left: getLogoLeft(),
          ease: Circ.easeInOut,
        });
      }
    },
  };
})();
