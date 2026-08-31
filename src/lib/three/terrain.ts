import { lerp, smoothstep } from "./math"
import { PATH_HALF_WIDTH, PATH_SHOULDER } from "./path-routes"
import { pathHeightAt } from "./path-profile"
import { nearestOnPath } from "./paths"
import { SUMMIT, shapeSummit } from "./summit"
import { padHeight } from "./pads"
import { naturalHeight } from "./terrain-natural"
import { carveWater } from "./water-carve"

/** Single source of ground height (D4): the mesh is displaced by this and every
 *  prop placed by it — never hand-tune a Y position. */

const PAD_HEIGHT = naturalHeight(SUMMIT.x, SUMMIT.z)

export function terrainHeight(x: number, z: number): number {
  const summit = shapeSummit(x, z, naturalHeight(x, z), PAD_HEIGHT)
  const built = padHeight(x, z, summit)
  const near = nearestOnPath(x, z)

  // The walkway is cut and filled to its own smooth gradient, and the ground is
  // graded into it — otherwise the paving floats over dips and buries in bumps.
  const onPath =
    1 -
    smoothstep(PATH_HALF_WIDTH, PATH_HALF_WIDTH + PATH_SHOULDER, near.distance)
  const paved =
    near.distance > PATH_HALF_WIDTH + PATH_SHOULDER
      ? built
      : lerp(built, pathHeightAt(near), onPath)

  // Water carves last, always: a levelled pad laid over the stream fills the
  // channel in and the water vanishes mid-course.
  return carveWater(x, z, paved)
}

/** Floor levels the house is built on. Both come from the terrain, never guessed. */
export const SUMMIT_PAD = {
  height: PAD_HEIGHT,
  terrace: PAD_HEIGHT - SUMMIT.terraceDrop,
}
