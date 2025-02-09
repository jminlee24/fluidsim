import webgpuContext from "./gpu/WebGPUContext";

class Mouse {
  private device = webgpuContext.device;
  private canvas = webgpuContext.canvas;
  public position: Float32Array;
  public uniformBuffer: GPUBuffer;

  constructor() {
    this.position = new Float32Array(4);
    this.uniformBuffer = this.device.createBuffer({
      size: 2 * 4 + 2 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.canvas.onmouseover = (event: MouseEvent) => {
      const pos = this.getPos(event);
      this.position.set(pos);
    };
  }

  getPos(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  }
}

export default Mouse;
