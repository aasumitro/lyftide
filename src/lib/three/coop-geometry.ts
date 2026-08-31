import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** Legs and the ramp share one material (timber), merged into one draw call. */
export function buildCoopTimberGeometry(): BufferGeometry {
  const parts: BufferGeometry[] = []

  for (const x of [-1.1, 1.1]) {
    for (const z of [-0.8, 0.8]) {
      const leg = new BoxGeometry(0.12, 0.6, 0.12)
      leg.translate(x, 0.3, z)
      parts.push(leg)
    }
  }

  const ramp = new BoxGeometry(0.7, 0.07, 1.5)
  ramp.rotateX(-0.55)
  ramp.translate(0, 0.4, 1.5)
  parts.push(ramp)

  return mergeGeometries(parts)
}
