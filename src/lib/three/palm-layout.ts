import { builtGround } from "./built-ground"
import { padClear } from "./pads"
import { dryGround } from "./water-mask"
import { clamp, smoothstep } from "./math"
import { pathDistance } from "./paths"
import type { Placement } from "./placement"
import { scatterOnLand } from "./scatter"
import { bearing, shoreRadius } from "./terrain-profile"

/** Coconut palms line the shore, thickest along the south and west beach. */
function palmDensity(x: number, z: number): number {
  const radius = Math.max(1, Math.hypot(x, z))
  const b = bearing(x, z)
  const inland = shoreRadius(b) - radius

  // A band just above the sand: none out on the water, none deep in the forest.
  const band = smoothstep(1.5, 5, inland) * (1 - smoothstep(13, 24, inland))
  const facing = clamp(-Math.cos(b)) * 1.1 + clamp(-x / radius) * 0.5
  const clear = smoothstep(1.8, 3.6, pathDistance(x, z))

  return (
    clamp(band * (0.2 + facing)) *
    clear *
    builtGround(x, z) *
    dryGround(x, z) *
    padClear(x, z)
  )
}

export function buildPalmGrove(): Placement[] {
  return scatterOnLand({
    seed: 60451,
    spacing: 4.6,
    minHeight: 0.3,
    maxHeight: 7,
    maxSlope: 0.3,
    minInland: 1.5,
    density: palmDensity,
  }).map((palm) => ({
    ...palm,
    // Turn each palm so its baked lean points away from the island.
    rotation: Math.atan2(palm.x, palm.z) + palm.tilt * 2.5,
    tilt: palm.tilt * 0.4,
    scale: 0.78 + palm.scale * 0.42,
  }))
}
