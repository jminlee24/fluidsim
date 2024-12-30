struct VOut {
  @builtin(position) position: vec4f,
  @location(0) pos: vec4f,
};

@vertex fn vs(@location(0) pos: vec2f) -> VOut {
    var vout: VOut;
    vout.position = vec4f(pos, 0.0, 1.0);
    vout.pos = vout.position;
    return vout;
}
