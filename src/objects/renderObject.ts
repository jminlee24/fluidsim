interface RenderObject {
  vertices: Float32Array;
  indices?: Int16Array;
  vertexCount: number;
  pipeline: GPURenderPipeline;
  vertexBuffer: GPUBuffer;
  init: (device: GPUDevice, presentationFormat: GPUTextureFormat) => void;
  draw: (device: GPUDevice, passEncoder: GPURenderPassEncoder) => void;
}

export default RenderObject;
