import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let prevTime = performance.now();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const frameCounter = document.getElementById("frameCounter") as HTMLElement;

const sizes = {
  width: 800,
  height: 600,
};

const numInstances = 1000;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

const mesh = new THREE.InstancedMesh(geometry, material, numInstances);

const temp = new THREE.Object3D();
for (let i = 0; i < numInstances; i++) {
  temp.position.x = Math.random() * 40 - 20;
  temp.position.y = Math.random() * 40 - 20;
  temp.position.z = Math.random() * 40 - 20;

  temp.updateMatrix();
  mesh.setMatrixAt(i, temp.matrix);
  mesh.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));
}

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(camera);

camera.position.z = 50;
camera.position.y = 50;
camera.position.x = 50;

camera.lookAt(0, 0, 0);

function update(deltaTime: number) {
  for (let i = 0; i < numInstances; i++) {
    const m = new THREE.Matrix4();
    mesh.getMatrixAt(i, m);
    temp.matrix = m;
    temp.position.x += 0.01;
    temp.updateMatrix();
    mesh.setMatrixAt(i, temp.matrix);

    console.log(m);
  }
}

const render = () => {
  requestAnimationFrame(render);

  const time = performance.now();
  const deltaTime = time - prevTime;
  const fps = Math.round(1000 / deltaTime).toString();
  frameCounter.innerText = fps;
  prevTime = time;

  update(deltaTime);
  controls.update();
  renderer.render(scene, camera);
};

render();
