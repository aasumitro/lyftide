import { CatmullRomCurve3, Vector3 } from "three"
import { naturalHeight } from "./terrain-natural"
import { RIVER, RIVER_SAMPLES } from "./water-routes"

/** Stream centreline, sampled evenly. */
export const riverPoints = new CatmullRomCurve3(
  RIVER.map(([x, z]) => new Vector3(x, 0, z)),
  false,
  "catmullrom",
  0.4
).getSpacedPoints(RIVER_SAMPLES)

/**
 * Where the stream reaches the sea. A few samples past the waterline, so the cut
 * end of the ribbon sits under the surf instead of stopping in a straight line
 * across the sand.
 */
export const riverMouth = (() => {
  const index = riverPoints.findIndex(
    (point) => naturalHeight(point.x, point.z) < 0.1
  )
  return index === -1
    ? riverPoints.length - 1
    : Math.min(index + 5, riverPoints.length - 1)
})()
