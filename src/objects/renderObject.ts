interface RenderObject {
  vertices: Float32Array;
  indices?: Int16Array;
  vertexCount: number;
  pipeline: GPURenderPipeline;
  init: (device: GPUDevice, presentationFormat: GPUTextureFormat) => void;
}

export default RenderObject;
