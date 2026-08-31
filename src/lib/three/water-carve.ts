import { lerp, smoothstep } from "./math"
import { nearestRiver } from "./water-profile"
import { LAKE, RIVER_DEPTH, RIVER_HALF_WIDTH } from "./water-routes"

/** How far out from the lake rim the berm is graded back into the hillside. */
const BANK = 1.55

const lakeRadius = (x: number, z: number) =>
  Math.hypot((x - LAKE.x) / LAKE.radiusX, (z - LAKE.z) / LAKE.radiusZ)

/** Cuts the reservoir and the stream channel into the ground. */
export function carveWater(x: number, z: number, height: number): number {
  let carved = height

  // Stream first: inside the reservoir the lake overrides it, so the outlet is
  // the rim rather than a gully cut through the middle of the water.
  const river = nearestRiver(x, z)
  const bankWidth = RIVER_HALF_WIDTH + 2.2
  if (river.distance < bankWidth) {
    const channel = 1 - smoothstep(RIVER_HALF_WIDTH, bankWidth, river.distance)
    carved = lerp(carved, Math.min(carved, river.bed - RIVER_DEPTH), channel)
  }

  const t = lakeRadius(x, z)
  if (t >= BANK) return carved

  if (t < 1) {
    // A bowl, not a dish: shallow at the rim, deepest in the middle.
    return LAKE.level - (LAKE.level - LAKE.floor) * smoothstep(1, 0, t)
  }

  // Outside the rim the ground must stay above the water line, or the reservoir
  // simply drains down the hill.
  return lerp(
    Math.max(carved, LAKE.level + 0.55),
    carved,
    smoothstep(1, BANK, t)
  )
}
