import { Index } from "./index-min.js";
import { Renderer } from "./render.js";

export const lightController = (function() {
  let lightObj, firefly, fireflyMaterial;

  function createInstance() {}
  return {
    build: function(THREE) {
      // lightObj = new THREE.DirectionalLight(0xffffff);
      // lightObj.position.set(0, -1.1, 1).normalize();

      var intensity = 2.0;
      var distance = 30;
      var decay = 10.0;
      var c1 = 0xffffff,
        c2 = 0x0040ff,
        c3 = 0x80ff80,
        c4 = 0xffaa00,
        c5 = 0x00ffaa,
        c6 = 0xff1100;

      console.log("element");

      fireflyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        opacity: 0,
        transparent: true,
        emissive: 0xffffff,
      });

      lightObj = new THREE.PointLight(c1, intensity, distance, decay);
      firefly = new THREE.SphereBufferGeometry(0.005, 16, 8);
      lightObj.add(new THREE.Mesh(firefly, fireflyMaterial));

      lightObj.position.x = 0;
      lightObj.position.y = 0;
      lightObj.position.z = 0.3;
    },
    getLight: function() {
      return lightObj;
    },
    getFirefly: function() {
      return firefly;
    },
    getFireflyMaterial: function() {
      return fireflyMaterial;
    },
  };
})();
