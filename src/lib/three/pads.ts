import { lerp } from "./math"
import { FARM_SITES } from "./farm-sites"
import { padWeight, riverClearance } from "./pad-weight"
import { naturalHeight } from "./terrain-natural"

/** Each pad is levelled to the ground at its own centre. */
const levels = FARM_SITES.map((pad) => naturalHeight(pad.x, pad.z))
/** Cleared well past the fences: a canopy is three metres wide, so clearing
 *  only the pad still leaves branches inside the pen. */
const SCATTER_MARGIN = 5.5

/** Levels the ground under each farm, cutting into the slope and filling below. */
export function padHeight(x: number, z: number, height: number): number {
  let out = height
  const clear = riverClearance(x, z)

  FARM_SITES.forEach((pad, index) => {
    const weight = padWeight(pad, x, z, 0, clear)
    if (weight > 0) out = lerp(out, levels[index], weight)
  })

  return out
}

/** 0 on a pad, 1 on open ground — nothing is scattered where a farm stands. */
export function padClear(x: number, z: number): number {
  const river = riverClearance(x, z)
  return FARM_SITES.reduce(
    (clear, pad) =>
      Math.min(clear, 1 - padWeight(pad, x, z, SCATTER_MARGIN, river)),
    1
  )
}

/** Finished floor level of a pad, for placing what stands on it. */
export const padLevel = (name: string) =>
  levels[FARM_SITES.findIndex((pad) => pad.name === name)]
