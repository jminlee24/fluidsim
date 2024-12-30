import webgpuContext from "./gpu/WebGPUContext";
import Scene from "./Scene";

class Renderer {
  public ctx = webgpuContext;
  private renderPassDescriptor!: GPURenderPassDescriptor;

  public constructor() {}

  public async init() {
    this.renderPassDescriptor = {
      colorAttachments: [
        {
          view: this.ctx.context.getCurrentTexture().createView(),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };
  }

  public render(scene: Scene) {
    (
      this.renderPassDescriptor
        .colorAttachments as GPURenderPassColorAttachment[]
    )[0].view = this.ctx.context.getCurrentTexture().createView();

    const encoder = this.ctx.device.createCommandEncoder();
    const pass = encoder.beginRenderPass(this.renderPassDescriptor);

    for (const object of scene.objects) {
      object.draw(this.ctx.device, pass);
    }

    pass.end();

    const commandBuffer = encoder.finish();
    this.ctx.device.queue.submit([commandBuffer]);
  }
}

export default Renderer;
