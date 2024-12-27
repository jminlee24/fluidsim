import RenderObject from "./objects/renderObject";
import Renderer from "./Renderer";

class Scene {
  public objects: RenderObject[] = [];
  private device: GPUDevice;
  private ctx: GPUCanvasContext;

  public constructor(renderer: Renderer) {
    this.device = renderer.device;
    this.ctx = renderer.ctx;
  }

  public add(obj: RenderObject) {
    const format = this.ctx.getConfiguration()?.format;
    if (!format) {
      console.error("no context format");
    } else {
      obj.init(this.device, format);
    }
    this.objects.push(obj);
  }
}

export default Scene;
