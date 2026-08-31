import type { NearestPath } from "./paths"
import { pathCurves } from "./paths"
import { naturalHeight } from "./terrain-natural"

/**
 * Heights along each walkway, smoothed. A path is *built*: it takes an even
 * gradient rather than following every bump the ground happens to have, which
 * is exactly what makes paving read as paving instead of stepping stones.
 */
const WINDOW = 5

function smoothSeries(values: number[]): number[] {
  return values.map((_, i) => {
    let sum = 0
    let count = 0
    for (let k = -WINDOW; k <= WINDOW; k++) {
      const value = values[i + k]
      if (value === undefined) continue
      sum += value
      count++
    }
    return sum / count
  })
}

export const pathHeights = pathCurves.map((points) =>
  smoothSeries(points.map((point) => naturalHeight(point.x, point.z)))
)

/** Surface height of the walkway at an already-located nearest point. */
export function pathHeightAt(near: NearestPath): number {
  return pathHeights[near.route][near.index]
}
