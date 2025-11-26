#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uDistort;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

#define PI 3.141592653589793

// Simple pseudo-random
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Value noise
float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal noise
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;

  // center correction
  vec2 st = uv;
  st.x *= uResolution.x / uResolution.y;

  // mouse influence
  vec2 m = uMouse;
  vec2 mouse = (m - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

  float t = uTime * 0.6;

  float n1 = fbm(st * 3.0 + vec2(t * 0.15, t * 0.1));
  float n2 = fbm(st * 6.0 - vec2(t * 0.2, t * 0.15));
  float n3 = sin((st.y + st.x * 0.5) * 10.0 + t * 1.8);

  float dist = distance(st, mouse * 0.6 + 0.5);
  float pull = exp(-dist * 6.0) * 1.5;

  float strength = mix(0.08, 0.6, uDistort);
  float warp = (n1 * 0.6 + n2 * 0.3 + n3 * 0.6) * strength;
  warp += pull * uDistort * 1.4;

  vec2 displaced = st + vec2(
    sin((st.y + warp * 1.3) * 12.0 + t) * 0.02,
    cos((st.x - warp * 1.1) * 12.0 - t) * 0.02
  );

  float mixVal = smoothstep(0.2, 0.8, fbm(displaced * 2.0 + t * 0.5));
  vec3 color = mix(uColorA, uColorB, mixVal);

  float sheen = pow(max(0.0, 1.0 - dist * 2.0), 2.0);
  color += sheen * 0.12 * (1.0 + sin(t * 3.0));

  gl_FragColor = vec4(color, 1.0);
}

