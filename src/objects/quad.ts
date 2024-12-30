import vert from "../shaders/quad.vert.wgsl?raw";
import frag from "../shaders/quad.frag.wgsl?raw";
import RenderObject from "./renderObject";

class Quad implements RenderObject {
  public pipeline!: GPURenderPipeline;
  public vertexCount: number = 6;
  public vertices: Float32Array;
  public vertexBuffer!: GPUBuffer;

  public constructor() {
    // prettier-ignore
    this.vertices = new Float32Array([
      -1,  -1, 
      -1,   1,
       1,   1,
       1,   1,
       1,  -1,
       -1, -1,
    ]);
  }

  public init(device: GPUDevice, presentationFormat: GPUTextureFormat) {
    this.pipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: device.createShaderModule({
          code: vert,
        }),
        buffers: [
          {
            arrayStride: 2 * 4,
            attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }],
          },
        ],
      },
      fragment: {
        module: device.createShaderModule({
          code: frag,
        }),
        targets: [{ format: presentationFormat }],
      },
    });

    this.vertexBuffer = device.createBuffer({
      size: this.vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(this.vertexBuffer, 0, this.vertices);
  }
}

export default Quad;
