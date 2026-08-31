import { smoothstep } from "./math"
import { nearestRiver } from "./water-profile"
import { LAKE, RIVER_HALF_WIDTH } from "./water-routes"

/**
 * Where nothing grows: the pool, the stream and their banks. The same shared
 * mask idea as the walkways (D12) — without it trees sprout out of the water.
 */
export function dryGround(x: number, z: number): number {
  const inLake = Math.hypot(
    (x - LAKE.x) / LAKE.radiusX,
    (z - LAKE.z) / LAKE.radiusZ
  )
  // Wide enough that canopies do not reach out over the water.
  const lakeClear = smoothstep(1.05, 1.8, inLake)
  const bankClear = smoothstep(
    RIVER_HALF_WIDTH + 1.5,
    RIVER_HALF_WIDTH + 4.5,
    nearestRiver(x, z).distance
  )
  return Math.min(lakeClear, bankClear)
}
