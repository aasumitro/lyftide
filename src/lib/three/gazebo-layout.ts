import { terrainHeight } from "./terrain"
import { GAZEBO_POST_OFFSETS } from "./gazebo-geometry"
import type { Placement } from "./placement"

/** Placed as a group facing the water, so they read as somewhere people chose
 *  rather than props sprinkled on sand. Y always from the terrain (D4).
 *
 *  The row runs east along the south beach; each one is turned to its own
 *  outward bearing so the open side looks out to sea rather than up the slope. */
const SPOTS: [number, number, number][] = [
  [-2, 62, 0.1],
  [7, 59, -0.26],
  [26, 56, 0.42],
  [34, 50, 0.58],
]

/** One placement per gazebo (floor, roof, beam) plus one per post, both ready
 *  for a rigid `InstancedMesh` — no scale or tilt jitter, these are built things. */
export function buildGazeboLayout(): {
  shelters: Placement[]
  posts: Placement[]
} {
  const shelters = SPOTS.map(([x, z, rotation]) => ({
    x,
    y: terrainHeight(x, z),
    z,
    rotation,
    scale: 1,
    tilt: 0,
  }))

  const posts = shelters.flatMap((shelter) => {
    const cos = Math.cos(shelter.rotation)
    const sin = Math.sin(shelter.rotation)
    return GAZEBO_POST_OFFSETS.map(([lx, lz]) => ({
      x: shelter.x + lx * cos + lz * sin,
      y: shelter.y + 1.35,
      z: shelter.z - lx * sin + lz * cos,
      rotation: shelter.rotation,
      scale: 1,
      tilt: 0,
    }))
  })

  return { shelters, posts }
}
