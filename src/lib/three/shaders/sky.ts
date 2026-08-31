export const skyVertexShader = /* glsl */ `
  varying vec3 vDirection;

  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const skyFragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGlow;
  uniform vec3 uSunDirection;
  uniform float uSunVisible;

  varying vec3 vDirection;

  void main() {
    vec3 dir = normalize(vDirection);
    float height = clamp(dir.y, 0.0, 1.0);

    vec3 colour = mix(uHorizon, uTop, pow(height, 0.55));

    // Light piles up around the sun: a wide bloom, then the disc itself.
    float toSun = max(dot(dir, uSunDirection), 0.0);
    colour += uGlow * pow(toSun, 6.0) * 0.55 * uSunVisible;
    colour += uGlow * pow(toSun, 64.0) * 0.9 * uSunVisible;
    colour += vec3(1.0, 0.96, 0.9) * smoothstep(0.9986, 0.9992, toSun) * uSunVisible;

    gl_FragColor = vec4(colour, 1.0);
    #include <colorspace_fragment>
  }
`
