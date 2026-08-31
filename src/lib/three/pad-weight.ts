import { smoothstep } from "./math"
import { PAD_SHOULDER, toPadLocal, type FarmSite } from "./farm-sites"
import { nearestRiver } from "./water-profile"
import { RIVER_HALF_WIDTH } from "./water-routes"

/** 1 inside a pad, falling to 0 across the shoulder. */
export function padWeight(
  pad: FarmSite,
  x: number,
  z: number,
  margin = 0,
  clearOfWater = riverClearance(x, z)
): number {
  const [lx, lz] = toPadLocal(pad, x, z)
  const halfX = pad.halfX + margin
  const halfZ = pad.halfZ + margin

  return (
    (1 - smoothstep(halfX, halfX + PAD_SHOULDER, lx)) *
    (1 - smoothstep(halfZ, halfZ + PAD_SHOULDER, lz)) *
    clearOfWater
  )
}

/**
 * A pad never levels the stream corridor: grading a plot across a watercourse
 * fills the channel in and the water disappears halfway down the hill. Computed
 * once per position rather than once per pad — it does not depend on the pad.
 */
export function riverClearance(x: number, z: number): number {
  return smoothstep(
    RIVER_HALF_WIDTH + 1,
    RIVER_HALF_WIDTH + 4.5,
    nearestRiver(x, z).distance
  )
}
