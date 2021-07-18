export const meshController = (function() {
  let loader;
  let THREE;
  let meshCounter = 0;
  // let planes;

  function createInstance() {}
  return {
    build: function(loader_, three_) {
      THREE = three_;
      loader = loader_;
    },
    addEmptiness: function(scene, planes, y) {
      var planeGeo = new THREE.PlaneGeometry(0, 0, 0, 0);
      // var texture = loader.load(texture_);

      let photoMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
      });

      var vertexHeight = 0.01,
        planeDefinition = 100,
        planeSize = 1,
        totalObjects = 1,
        background = "#002135",
        meshColor = "#005e97";

      // for (var i = 0; i < planeGeo.vertices.length; i++) {
      //   planeGeo.vertices[i].z += 1 * vertexHeight - vertexHeight;
      //   planeGeo.vertices[i]._myZ = Math.random();
      // }

      let plane = new THREE.Mesh(planeGeo, photoMaterial);
      plane.position.x = 0;
      plane.position.y = y;
      plane.position.z = 0;
      // new TWEEN.Tween(planes[5].material).to({ opacity: 0 }, 0).start();
      planes.push(plane);
      scene.add(plane);
      meshCounter++;
    },
    addPhoto: function(
      scene,
      planes,
      texture_,
      xPos,
      yPos,
      zPos,
      rotation,
      planeGeo,
    ) {
      planeGeo = new THREE.PlaneGeometry(1, 1.7, 10, 20);
      // var video = document.getElementById("video");
      // var vid_texture = new THREE.VideoTexture(video);
      var texture = loader.load(texture_);

      let photoMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture,
      });

      var vertexHeight = 0.01,
        planeDefinition = 100,
        planeSize = 1,
        totalObjects = 1,
        background = "#002135",
        meshColor = "#005e97";

      for (var i = 0; i < planeGeo.vertices.length; i++) {
        planeGeo.vertices[i].z += 1 * vertexHeight - vertexHeight;
        planeGeo.vertices[i]._myZ = Math.random();
      }

      let plane = new THREE.Mesh(planeGeo, photoMaterial);
      plane.position.x = xPos;
      plane.position.y = yPos;
      plane.position.z = zPos;
      plane.rotation.y = rotation;
      planes.push(plane);
      scene.add(plane);
      meshCounter++;
    },
    addPhoto2: function(
      scene,
      planes,
      texture_,
      xPos,
      yPos,
      zPos,
      rotation,
      planeGeo,
    ) {
      planeGeo = new THREE.PlaneGeometry(1.7, 1, 10, 20);
      // var video = document.getElementById("video");
      // var vid_texture = new THREE.VideoTexture(video);
      var texture = loader.load(texture_);
      // var dispMap = loader.load("map-6.jpg");

      let photoMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture,
      });

      var vertexHeight = 0.01,
        planeDefinition = 100,
        planeSize = 1,
        totalObjects = 1,
        background = "#002135",
        meshColor = "#005e97";

      for (var i = 0; i < planeGeo.vertices.length; i++) {
        planeGeo.vertices[i].z += 1 * vertexHeight - vertexHeight;
        planeGeo.vertices[i]._myZ = Math.random();
      }

      let plane = new THREE.Mesh(planeGeo, photoMaterial);
      plane.position.x = xPos;
      plane.position.y = yPos;
      plane.position.z = zPos;
      plane.rotation.y = rotation;
      planes.push(plane);
      scene.add(plane);
      meshCounter++;
    },
  };
})();
