import { DataTexture, LinearFilter, RedFormat, UnsignedByteType } from "three"
import { naturalHeight } from "./terrain-natural"
import { TERRAIN_SIZE } from "./terrain-mesh"

const RESOLUTION = 512
/** Depth at which the water is treated as fully deep. */
const DEEP = 26

/**
 * Water depth baked over the island, so the ocean shader can colour shallows,
 * fade the waves out at the shore and draw a foam line — all without the
 * fragment shader knowing anything about the terrain function.
 *
 * Sampled from the *natural* ground on purpose. Walkways, farm pads and the
 * stream carve are all above the waterline, so they cannot change a depth, and
 * asking the full terrain function here cost 1.5 s of the first boot.
 */
export function buildSeabedTexture(): DataTexture {
  const data = new Uint8Array(RESOLUTION * RESOLUTION)

  for (let y = 0; y < RESOLUTION; y++) {
    for (let x = 0; x < RESOLUTION; x++) {
      const worldX = (x / (RESOLUTION - 1) - 0.5) * TERRAIN_SIZE
      const worldZ = (y / (RESOLUTION - 1) - 0.5) * TERRAIN_SIZE
      const depth = Math.max(0, -naturalHeight(worldX, worldZ))
      data[y * RESOLUTION + x] = Math.round(Math.min(1, depth / DEEP) * 255)
    }
  }

  const texture = new DataTexture(
    data,
    RESOLUTION,
    RESOLUTION,
    RedFormat,
    UnsignedByteType
  )
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.needsUpdate = true
  return texture
}
