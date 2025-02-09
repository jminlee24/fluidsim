struct Mouse {
  x: vec2f, 
  y: vec2f, 
};

@group(0) @binding(0) var<uniform> mouse: Mouse;

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
