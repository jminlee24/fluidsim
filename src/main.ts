import webgpuContext from "./gpu/WebGPUContext";
import Quad from "./objects/quad";
import Renderer from "./Renderer";
import Scene from "./Scene";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 900;
canvas.height = 900;

await webgpuContext.init(canvas);
const renderer = new Renderer();
renderer.init();

const scene = new Scene();
const quad = new Quad();

scene.add(quad);

const render = () => {
  renderer.render(scene);
  requestAnimationFrame(render);
};

render();
