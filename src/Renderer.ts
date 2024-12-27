import Scene from "./Scene";

class Renderer {
  public device!: GPUDevice;
  public canvas!: HTMLCanvasElement;
  public ctx!: GPUCanvasContext;
  private presentationFormat!: GPUTextureFormat;
  private renderPassDescriptor!: GPURenderPassDescriptor;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public async init() {
    await this.getDevice();
    await this.getContext();

    this.renderPassDescriptor = {
      colorAttachments: [
        {
          view: this.ctx.getCurrentTexture().createView(),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };
  }

  private async getDevice() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();

    if (!device) {
      console.error("browser does not support webgpu");
      return;
    }

    this.device = device;
  }

  private async getContext() {
    this.ctx = this.canvas.getContext("webgpu")!;
    this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.ctx.configure({
      device: this.device,
      format: this.presentationFormat,
    });
  }

  public render(scene: Scene) {
    (
      this.renderPassDescriptor
        .colorAttachments as GPURenderPassColorAttachment[]
    )[0].view = this.ctx.getCurrentTexture().createView();
    const encoder = this.device.createCommandEncoder();

    const pass = encoder.beginRenderPass(this.renderPassDescriptor);

    for (const object of scene.objects) {
      pass.setPipeline(object.pipeline);
      pass.draw(object.vertexCount);
    }

    pass.end();

    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);
  }
}

export default Renderer;
