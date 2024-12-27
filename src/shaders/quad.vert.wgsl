struct VOut {
  @builtin(position) position : vec4f;
  @location(0) pos: vec4f;
}

@vertex fn vs(
  @location(0) pos vec2f,
  @builtin(vertex_index) vertexIndex : u32
) -> @builtin(position) vec4f {
    var vout: VOut;
    var position = vec4f(pos, 0.0, 1.0);
    vout.position = position;
    vout.pos = position;
    return vout
}
