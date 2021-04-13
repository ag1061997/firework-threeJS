import * as THREE from "three";

class Firework {
  constructor() {
    this.movementSpeed = 80;
    this.totalObjects = 1000;
    this.objectSize = 10;
    this.sizeRandomness = 4000;
    this.colors = [0xff0fff, 0xccff00, 0xff000f, 0x996600, 0xffffff];
    /////////////////////////////////
    this.dirs = [];
    this.parts = [];
    this.container = document.createElement("div");
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
    this.parts.push(this.ExplodeAnimation(0, 0));
    this.render();
  }

  ExplodeAnimation(x, y) {
    var geometry = new THREE.Geometry();
    console.log(geometry);

    for (let i = 0; i < this.totalObjects; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = x;
      vertex.y = y;
      vertex.z = 0;

      geometry.vertices.push(vertex);
      this.dirs.push({
        x: Math.random() * this.movementSpeed - this.movementSpeed / 2,
        y: Math.random() * this.movementSpeed - this.movementSpeed / 2,
        z: Math.random() * this.movementSpeed - this.movementSpeed / 2,
      });
    }
    var material = new THREE.ParticleBasicMaterial({
      size: this.objectSize,
      color: this.colors[Math.round(Math.random() * this.colors.length)],
    });
    var particles = new THREE.ParticleSystem(geometry, material);

    this.object = particles;
    this.status = true;

    this.xDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;
    this.yDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;
    this.zDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;

    this.scene.add(this.object);

    this.update = function () {
      if (this.status === true) {
        var pCount = this.totalObjects;
        while (pCount--) {
          var particle = this.object.geometry.vertices[pCount];
          particle.y += this.dirs[pCount].y;
          particle.x += this.dirs[pCount].x;
          particle.z += this.dirs[pCount].z;
        }
        this.object.geometry.verticesNeedUpdate = true;
      }
    };
  }

  render() {
    requestAnimationFrame(this.render);

    var pCount = this.parts.length;
    while (pCount--) {
      this.parts[pCount].update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  onclick() {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    this.parts.push(
      this.ExplodeAnimation(
        Math.random() * this.sizeRandomness - this.sizeRandomness / 2,
        Math.random() * this.sizeRandomness - this.sizeRandomness / 2
      )
    );
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default Firework;
