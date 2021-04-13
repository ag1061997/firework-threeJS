import * as THREE from "three";
import ExplodeAnimation from "./ExplodeAnimation.js";

class Firework {
  constructor() {
    this.sizeRandomness = 4000;
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
    this.parts.push(new ExplodeAnimation(0, 0, this.scene));
    this.render();
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
      new ExplodeAnimation(
        Math.random() * this.sizeRandomness - this.sizeRandomness / 2,
        Math.random() * this.sizeRandomness - this.sizeRandomness / 2,
        this.scene
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
