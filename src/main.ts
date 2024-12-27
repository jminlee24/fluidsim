import Renderer from "./Renderer";
import Scene from "./Scene";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 900;
canvas.height = 600;

const renderer = new Renderer(canvas);
await renderer.init();

const scene = new Scene(renderer);

function render() {
  renderer.render(scene);
  requestAnimationFrame(render);
}

render();
