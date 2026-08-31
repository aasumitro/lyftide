import { terrainHeight } from "./terrain"
import { dryGround } from "./water-mask"

/**
 * Ground heights and walkable ground, cached over the roaming area.
 * `terrainHeight` walks the path and river samples on every call — far too slow
 * to ask once per animal per frame, so it is sampled once here.
 *
 * The dry mask matters as much as the height: the terrain under a pool is the
 * carved bed, metres *below* the water surface, so an animal placed on it
 * stands submerged.
 */
export const RESOLUTION = 1.5

export type WanderField = {
  x0: number
  z0: number
  cols: number
  heights: Float32Array
  dry: Float32Array
}

export function buildWanderField(
  centreX: number,
  centreZ: number,
  radius: number
): WanderField {
  const span = radius * 2 + 8
  const cols = Math.ceil(span / RESOLUTION) + 1
  const x0 = centreX - span / 2
  const z0 = centreZ - span / 2
  const heights = new Float32Array(cols * cols)
  const dry = new Float32Array(cols * cols)

  for (let row = 0; row < cols; row++) {
    for (let col = 0; col < cols; col++) {
      const x = x0 + col * RESOLUTION
      const z = z0 + row * RESOLUTION
      const height = terrainHeight(x, z)
      heights[row * cols + col] = height
      // Below a metre is beach or sea bed; neither is somewhere to graze.
      dry[row * cols + col] = height < 1 ? 0 : dryGround(x, z)
    }
  }

  return { x0, z0, cols, heights, dry }
}
