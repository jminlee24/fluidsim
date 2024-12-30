struct VOut {
  @builtin(position) position: vec4f,
  @location(0) pos: vec4f,
};

@fragment fn fs(vout: VOut) -> @location(0) vec4f {
    return vec4f(vout.pos.xyz, 1.0);
}
