import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

export type Bed = {
  x: number
  z: number
  halfX: number
  halfZ: number
  crop: number
}

/**
 * Open beds around the growing house. Without them the plot reads as a lone
 * greenhouse; the ground rows are what make it a plantation.
 */
export const BEDS: Bed[] = [
  // Long rows across the front of the plot — the part that reads as a field.
  { x: 0, z: 1.9, halfX: 9.4, halfZ: 0.55, crop: 0 },
  { x: 0, z: 3.3, halfX: 9.4, halfZ: 0.55, crop: 1 },
  { x: -1.4, z: 4.7, halfX: 8, halfZ: 0.55, crop: 2 },
  { x: -2.6, z: 6.1, halfX: 6.8, halfZ: 0.55, crop: 0 },
  // Blocks either side of the growing house.
  { x: -8, z: -3, halfX: 1.7, halfZ: 3, crop: 1 },
  { x: 8, z: -3, halfX: 1.7, halfZ: 3, crop: 2 },
]

/** Low timber edging around every bed. */
export function buildBedFrameGeometry(): BufferGeometry {
  const parts: BufferGeometry[] = []

  for (const bed of BEDS) {
    for (const [w, d, ox, oz] of [
      [bed.halfX * 2, 0.14, 0, bed.halfZ],
      [bed.halfX * 2, 0.14, 0, -bed.halfZ],
      [0.14, bed.halfZ * 2, bed.halfX, 0],
      [0.14, bed.halfZ * 2, -bed.halfX, 0],
    ]) {
      const rail = new BoxGeometry(w, 0.26, d)
      rail.translate(bed.x + ox, 0.13, bed.z + oz)
      parts.push(rail)
    }
  }

  return mergeGeometries(parts)
}
