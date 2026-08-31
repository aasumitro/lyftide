import { clamp, smoothstep } from "./math"
import { makeRandom } from "./noise"
import type { Placement, ScatterOptions } from "./placement"
import { terrainSlope } from "./ground"
import { terrainHeight } from "./terrain"
import { bearing, shoreRadius } from "./terrain-profile"

/**
 * Jittered grid rather than pure random: the jitter keeps it from reading as a
 * lattice while the grid stops everything piling into one corner (naturalism 4).
 */
export function scatterOnLand(options: ScatterOptions): Placement[] {
  const random = makeRandom(options.seed)
  const placements: Placement[] = []
  const reach = shoreRadius(0) * 1.35

  for (let x = -reach; x <= reach; x += options.spacing) {
    for (let z = -reach; z <= reach; z += options.spacing) {
      const px = x + (random() - 0.5) * options.spacing * 1.7
      const pz = z + (random() - 0.5) * options.spacing * 1.7
      const chance = options.density?.(px, pz) ?? 1
      if (random() > chance) continue

      const inland = shoreRadius(bearing(px, pz)) - Math.hypot(px, pz)
      if (inland < options.minInland) continue

      const y = terrainHeight(px, pz)
      if (y < options.minHeight || y > options.maxHeight) continue
      if (terrainSlope(px, pz) > options.maxSlope) continue

      const edge = smoothstep(options.maxHeight, options.maxHeight - 8, y)
      placements.push({
        x: px,
        y,
        z: pz,
        scale: 0.62 + random() * 0.75 * clamp(0.45 + edge),
        rotation: random() * Math.PI * 2,
        tilt: (random() - 0.5) * 0.14,
      })
    }
  }

  return placements
}
