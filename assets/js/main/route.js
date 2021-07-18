import { Index } from "./index-min.js";

export const Route = (function() {
  const pages = [{ name: "home" }, { name: "info" }];
  let currentpageId = 0;
  function createInstance() {}
  return {
    build: function() {
    },
    getCurrentPageId: function() {
      return currentpageId;
    },
    setCurrentPageId: function(id) {
      currentpageId = id;
    },
  };
})();
