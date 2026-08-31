import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

export const TIER_HEIGHTS = [1.35, 2.75, 4.15]
const TOP = 4.95

/** Steel frame of the growing house: uprights and a ring beam at every tier. */
export function buildFarmFrameGeometry(
  halfX: number,
  halfZ: number
): BufferGeometry {
  const parts: BufferGeometry[] = []

  for (const x of [-halfX, 0, halfX]) {
    for (const z of [-halfZ, halfZ]) {
      const post = new BoxGeometry(0.16, TOP, 0.16)
      post.translate(x, TOP / 2, z)
      parts.push(post)
    }
  }

  for (const y of [...TIER_HEIGHTS, TOP]) {
    for (const z of [-halfZ, halfZ]) {
      const beam = new BoxGeometry(halfX * 2, 0.12, 0.12)
      beam.translate(0, y, z)
      parts.push(beam)
    }
    for (const x of [-halfX, 0, halfX]) {
      const beam = new BoxGeometry(0.12, 0.12, halfZ * 2)
      beam.translate(x, y, 0)
      parts.push(beam)
    }
  }

  return mergeGeometries(parts)
}
