/** Shadow settings for the scene's single casting light (plan D6). Tight enough
 * that the shadow map lands mostly on the island rather than on empty ocean. */
const EXTENT = 135

export const keyShadowProps = {
  "shadow-mapSize": [2048, 2048],
  "shadow-bias": -0.0004,
  "shadow-normalBias": 0.7,
  "shadow-camera-near": 60,
  "shadow-camera-far": 640,
  "shadow-camera-left": -EXTENT,
  "shadow-camera-right": EXTENT,
  "shadow-camera-top": EXTENT,
  "shadow-camera-bottom": -EXTENT,
} as const
