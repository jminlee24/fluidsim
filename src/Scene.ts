import webgpuContext from "./gpu/WebGPUContext";
import RenderObject from "./objects/renderObject";

class Scene {
  public objects: RenderObject[] = [];
  private device: GPUDevice;
  private ctx: GPUCanvasContext;

  public constructor() {
    this.device = webgpuContext.device;
    this.ctx = webgpuContext.context;
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
