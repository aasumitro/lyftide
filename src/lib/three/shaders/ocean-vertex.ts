export const oceanVertexShader = /* glsl */ `
  #define WAVE_COUNT 6

  uniform float uTime;
  uniform vec4 uWaves[WAVE_COUNT];
  uniform sampler2D uSeabed;
  uniform float uTerrainSize;

  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vDepth;

  void main() {
    vec3 world = (modelMatrix * vec4(position, 1.0)).xyz;

    vec2 uv = world.xz / uTerrainSize + 0.5;
    vDepth = texture2D(uSeabed, uv).r;

    // Waves flatten as the water shallows, so they never saw through the beach.
    float shallow = smoothstep(0.0, 0.16, vDepth);

    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 displaced = world;

    for (int i = 0; i < WAVE_COUNT; i++) {
      vec2 dir = uWaves[i].xy;
      float steepness = uWaves[i].z * shallow;
      float k = 6.2831853 / uWaves[i].w;
      float speed = sqrt(9.81 / k);
      float amplitude = steepness / k;
      float phase = k * (dot(dir, world.xz) - speed * uTime);
      float c = cos(phase);
      float s = sin(phase);

      displaced += vec3(dir.x * amplitude * c, amplitude * s, dir.y * amplitude * c);
      tangent += steepness * vec3(-dir.x * dir.x * s, dir.x * c, -dir.x * dir.y * s);
      binormal += steepness * vec3(-dir.x * dir.y * s, dir.y * c, -dir.y * dir.y * s);
    }

    vNormal = normalize(cross(binormal, tangent));
    vWorld = displaced;
    gl_Position = projectionMatrix * viewMatrix * vec4(displaced, 1.0);
  }
`
