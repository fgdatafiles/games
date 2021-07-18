import { Index } from "./index-min.js";
import { HomeSlider } from "./homeSlider-min.js";
import { HomeSliderInteraction } from "./homeSliderController-min.js";

export const SliderNav = (function() {
  // vars
  const sliderNav = document.querySelector("#sliderNav");
  const sliderNavLeft = document.querySelector("#sliderNavLeft");
  const sliderNavRight = document.querySelector("#sliderNavRight");
  const sliderNavSeperatorImg = document.querySelectorAll(
    ".sliderNavSeperatorImg",
  );
  function createInstance() {}
  return {
    build: function() {
      sliderNavLeft.addEventListener(
        "mouseup",
        function(event) {
          HomeSliderInteraction.up();
        },
        false,
      );
      sliderNavRight.addEventListener(
        "mouseup",
        function(event) {
          HomeSliderInteraction.down();
        },
        false,
      );
    },
  };
})();
