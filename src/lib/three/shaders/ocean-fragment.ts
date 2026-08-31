export const oceanFragmentShader = /* glsl */ `
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uSunColour;
  uniform vec3 uSunDirection;
  uniform vec3 uFogColour;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  uniform float uDaylight;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vDepth;
  void main() {
    // Ripples too small to carry as geometry, added to the normal as a gradient.
    // Off-axis on purpose: axis-aligned ripples read as a grid.
    vec2 r = vWorld.xz;
    vec2 d1 = vec2(0.83, 0.56), d2 = vec2(-0.41, 0.91), d3 = vec2(0.62, -0.78);
    vec2 grad =
      d1 * cos(dot(r, d1) * 1.7 + uTime * 2.1) * 0.09 +
      d2 * cos(dot(r, d2) * 2.6 - uTime * 1.7) * 0.06 +
      d3 * cos(dot(r, d3) * 4.3 + uTime * 3.0) * 0.03;
    // Fade with distance or it turns into moire at the horizon.
    float near = 1.0 - smoothstep(90.0, 460.0, length(cameraPosition - vWorld));
    vec3 normal = normalize(vNormal + vec3(grad.x, 0.0, grad.y) * near);
    vec3 view = normalize(cameraPosition - vWorld);

    vec3 colour = mix(uShallow, uDeep, smoothstep(0.02, 0.34, vDepth));

    // Grazing angles reflect sky, steep angles look into the water.
    float fresnel = pow(1.0 - max(dot(normal, view), 0.0), 4.0);
    colour = mix(colour, uFogColour, fresnel * 0.55);

    // Sun glitter: tight and bright, so the sea has a direction to it.
    vec3 halfway = normalize(uSunDirection + view);
    colour += uSunColour * pow(max(dot(normal, halfway), 0.0), 260.0) * 1.7;
    colour += uSunColour * pow(max(dot(normal, halfway), 0.0), 24.0) * 0.11 * uDaylight;
    // Foam belongs where the water runs out of depth, not on the open sea.
    float shore = 1.0 - smoothstep(0.004, 0.032, vDepth);
    float crest = smoothstep(1.3, 2.1, vWorld.y) * shore;
    float wash = shore * (0.72 + 0.28 * sin(uTime * 1.5 + vWorld.x * 0.3));
    float foam = clamp(wash + crest * 0.4, 0.0, 1.0);
    // Foam is unlit white: untied from daylight it blazes at night.
    colour = mix(colour, vec3(0.95, 0.97, 0.98) * (0.09 + 0.91 * uDaylight), foam);

    float fog = smoothstep(uFogNear, uFogFar, length(cameraPosition - vWorld));
    gl_FragColor = vec4(mix(colour, uFogColour, fog), 1.0);
    #include <colorspace_fragment>
  }
`
