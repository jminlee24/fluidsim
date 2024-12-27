import vert from "../shaders/triangle.vert.wgsl?raw";
import frag from "../shaders/triangle.frag.wgsl?raw";
import RenderObject from "./renderObject";

class Triangle implements RenderObject {
  public pipeline!: GPURenderPipeline;
  public vertexCount: number = 6;
  public vertices: Float32Array;

  public constructor() {
    // prettier-ignore
    this.vertices = new Float32Array([
      -1, -1, 
      -1,  1,
       1,  1,
       1,  1,
       1, -1,
       -1, 1,
    ]);
  }

  public init(device: GPUDevice, presentationFormat: GPUTextureFormat) {
    this.pipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: device.createShaderModule({
          code: vert,
        }),
      },
      fragment: {
        module: device.createShaderModule({
          code: frag,
        }),
        targets: [{ format: presentationFormat }],
      },
    });
  }
}

export default Triangle;
