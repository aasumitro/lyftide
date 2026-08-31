import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** Posts and the door threshold share one material (timber), so they merge
 *  into a single draw call; the wall and roof keep their own materials. */
export function buildBarnTimberGeometry(): BufferGeometry {
  const parts: BufferGeometry[] = []

  for (const x of [-2.8, 0, 2.8]) {
    const post = new BoxGeometry(0.18, 2.6, 0.18)
    post.translate(x, 1.3, 1.5)
    parts.push(post)
  }

  const threshold = new BoxGeometry(3.4, 0.45, 0.7)
  threshold.translate(0, 0.28, 2.1)
  parts.push(threshold)

  return mergeGeometries(parts)
}
