import { riverPoints } from "./river-path"
import { naturalHeight } from "./terrain-natural"
import { LAKE } from "./water-routes"

/** Bed heights, forced to fall the whole way and to stop at the shore. */
export const riverBed = (() => {
  const bed: number[] = []
  const start = LAKE.level - 0.4
  const mouth = 0.2
  let previous = start

  riverPoints.forEach((point, index) => {
    const target = start + (mouth - start) * (index / (riverPoints.length - 1))
    const ground = naturalHeight(point.x, point.z)
    // Always falling, if only slightly: where the ground flattens out, a bed
    // held at one height reads as a canal rather than a stream.
    previous = Math.max(mouth, Math.min(previous - 0.035, target, ground))
    bed.push(previous)
  })

  return bed
})()

/** Nearest point on the stream: distance from the centreline and its bed height. */
export function nearestRiver(x: number, z: number) {
  let distance = Infinity
  let index = 0

  riverPoints.forEach((point, i) => {
    const d = (point.x - x) ** 2 + (point.z - z) ** 2
    if (d < distance) {
      distance = d
      index = i
    }
  })

  return { distance: Math.sqrt(distance), bed: riverBed[index], index }
}
