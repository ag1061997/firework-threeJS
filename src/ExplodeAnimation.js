import * as THREE from "three";

class ExplodeAnimation {
  constructor(x, y, scene) {
    this.geometry = new THREE.Geometry();
    this.movementSpeed = 80;
    this.totalObjects = 1000;
    this.objectSize = 10;
    this.colors = [0xff0fff, 0xccff00, 0xff000f, 0x996600, 0xffffff];
    this.dirs = [];
    this.status = false;
    this.scene = scene;
    this.material = null;
    this.particles = null;

    for (let i = 0; i < this.totalObjects; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = x;
      vertex.y = y;
      vertex.z = 0;

      this.geometry.vertices.push(vertex);
      this.dirs.push({
        x: Math.random() * this.movementSpeed - this.movementSpeed / 2,
        y: Math.random() * this.movementSpeed - this.movementSpeed / 2,
        z: Math.random() * this.movementSpeed - this.movementSpeed / 2,
      });
    }
    this.material = new THREE.ParticleBasicMaterial({
      size: this.objectSize,
      color: this.colors[Math.round(Math.random() * this.colors.length)],
    });
    this.particles = new THREE.ParticleSystem(this.geometry, this.material);
    this.status = true;

    this.xDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;
    this.yDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;
    this.zDir = Math.random() * this.movementSpeed - this.movementSpeed / 2;

    this.scene.add(this.particles);
  }

  update = function () {
    if (this.status === true) {
      var pCount = this.totalObjects;
      while (pCount--) {
        var particle = this.geometry.vertices[pCount];
        particle.y += this.dirs[pCount].y;
        particle.x += this.dirs[pCount].x;
        particle.z += this.dirs[pCount].z;
      }
      this.geometry.verticesNeedUpdate = true;
    }
  };
}

export default ExplodeAnimation;
