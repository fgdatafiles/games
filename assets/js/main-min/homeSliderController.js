import { Index } from "./index-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { cameraController } from "./camera-min.js";
import { Route } from "./route-min.js";

export const HomeSliderInteraction = (function() {
  let xDown = null,
    yDown = null,
    canvas,
    logo,
    camera;
  let currentStep = -1;
  let currentSlide = 0;
  let swipelock = 0;
  let swipelockTimer;
  let isScrollingStarted = 0;
  let planes;
  let sliderData;
  const sliderNav = document.querySelector("#sliderNav");
  const sliderNavLeft = document.querySelector("#sliderNavLeft");
  const sliderNavRight = document.querySelector("#sliderNavRight");
  const sliderNavSeperatorImg = document.querySelectorAll(
    ".sliderNavSeperatorImg",
  );

  function addTouchInteraction() {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
  }

  function addScrollInteraction() {
    canvas = document.querySelectorAll("canvas")[0];
    let wheel = function(event) {
      event.deltaY;
      if (event.deltaY >= 6) {
        if (Route.getCurrentPageId() === 0) {
          goDown();
        }
      }
      if (event.deltaY <= -6) {
        if (Route.getCurrentPageId() === 0) {
          goUp();
        }
      }
    };
    window.addEventListener("wheel", wheel, false);
  }

  function addLogoInteraction() {
    logo = document.querySelector("#logo");
    let clickHandler = function(event) {
      if (Route.getCurrentPageId() === 0) {
        goFirst();
      }
    };
    logo.addEventListener("click", clickHandler, false);
  }

  function getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
    } else {
      if (yDiff > 0) {
        goDown();
      } else {
        goUp();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  const lockswipe = function() {
    swipelock = 1;
    clearTimeout(swipelockTimer);
    swipelockTimer = setTimeout(function() {
      swipelock = 0;
    }, 1000);
  };

  const goDown = function() {
    if (swipelock === 1) return;
    if (sliderData[currentSlide + 1]) {
      sliderData[currentSlide].hide();
      currentSlide++;
      sliderData[currentSlide].show();
      HomeSlider.down();
      updateIndicator();
      lockswipe();
    }
  };

  const goUp = function() {
    if (swipelock === 1) return;
    if (sliderData[currentSlide - 1]) {
      sliderData[currentSlide].hide();
      currentSlide--;
      sliderData[currentSlide].show();
      HomeSlider.up();
      updateIndicator();

      lockswipe();
    }
  };

  const goDownFast = function() {
    // if (swipelock === 1) return;
    if (sliderData[currentSlide + 1]) {
      sliderData[currentSlide].hide();
      currentSlide++;
      sliderData[currentSlide].show();
      HomeSlider.down();
      updateIndicator();
      // lockswipe();
    }
  };

  const goUpFast = function() {
    // if (swipelock === 1) return;
    if (sliderData[currentSlide - 1]) {
      sliderData[currentSlide].hide();
      currentSlide--;
      sliderData[currentSlide].show();
      HomeSlider.up();
      updateIndicator();
      // lockswipe();
    }
  };

  const goFirst = function() {
    if (currentSlide !== 0) {
      sliderData[currentSlide].hide();
      currentSlide = 0;
      sliderData[0].show();
      HomeSlider.up();
      lockswipe();
    }
  };

  const updateIndicator = function() {
    // TweenMax.to(sliderNavSeperatorImg[currentSlide], 0, { height: 50 });
    // TweenMax.to(sliderNavSeperatorImg[currentSlide], 1, { height: 40 });
    for (let i = 0; i < sliderNavSeperatorImg.length + 1; i++) {
      const e = sliderNavSeperatorImg[i];
      if (sliderNavSeperatorImg[i - 1]) {
        if (i - 1 <= currentSlide - 1) {
          sliderNavSeperatorImg[i - 1].classList.add("opacity100");
        } else {
          sliderNavSeperatorImg[i - 1].classList.remove("opacity100");
        }
      }
    }
  };

  function createInstance() {}
  return {
    build: function(camera_) {
      camera = camera_;
      planes = Index.getPlanes();
      sliderData = HomeSlider.getSliderData();
      addTouchInteraction();
      addScrollInteraction();
      addLogoInteraction();
    },
    getCurrentSlide: function() {
      return currentSlide;
    },
    up: function() {
      goUpFast();
    },
    down: function() {
      goDownFast();
    },
  };
})();
