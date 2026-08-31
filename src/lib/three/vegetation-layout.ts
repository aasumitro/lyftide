import { clamp, smoothstep } from "./math"
import { fbm, makeNoise } from "./noise"
import type { Placement } from "./placement"
import { scatterOnLand } from "./scatter"
import { pathDistance } from "./paths"
import { builtGround } from "./built-ground"
import { padClear } from "./pads"
import { dryGround } from "./water-mask"

const clumping = makeNoise(4242)
/** Forest is thickest at WEST_WILDS and thins towards the shore and the summit. */
function forestDensity(x: number, z: number): number {
  const radius = Math.max(1, Math.hypot(x, z))
  const west = clamp(-x / radius)
  // Strong clumping: a forest is thickets and glades, never an even sprinkle.
  const clumps = fbm(clumping, x * 0.028, z * 0.028, 4)
  const bare = 1 - 0.55 * clamp(1 - Math.hypot(x, z) / 26)
  const clear = smoothstep(1.6, 3.4, pathDistance(x, z))
  return (
    clamp((0.3 + 0.34 * west + clumps * 1.15) * bare) *
    builtGround(x, z) *
    clear *
    dryGround(x, z) *
    padClear(x, z)
  )
}

export const buildForest = (): Placement[] =>
  scatterOnLand({
    seed: 90210,
    spacing: 2.35,
    minHeight: 1.4,
    maxHeight: 28,
    maxSlope: 0.44,
    minInland: 5,
    density: forestDensity,
  })

/** Undergrowth fills the floor between trunks, where bare ground would read as lawn. */
export const buildUndergrowth = (): Placement[] =>
  scatterOnLand({
    seed: 13577,
    spacing: 2.1,
    minHeight: 1.1,
    maxHeight: 30,
    maxSlope: 0.5,
    minInland: 3,
    density: (x, z) => forestDensity(x, z) * 0.85,
  })
