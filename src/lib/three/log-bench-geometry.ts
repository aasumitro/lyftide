import { CylinderGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/**
 * A felled trunk laid on its side, resting on two offcuts. Bark left on, ends
 * cut flat — the seating is the tree, not carpentry.
 */
export function buildLogBenchGeometry(length = 3.2): BufferGeometry {
  const trunk = new CylinderGeometry(0.31, 0.34, length, 9)
  trunk.rotateZ(Math.PI / 2)
  trunk.translate(0, 0.42, 0)

  const props = [-1, 1].map((side) => {
    const prop = new CylinderGeometry(0.17, 0.19, 0.42, 7)
    prop.translate((side * length) / 3.2, 0.21, 0)
    return prop
  })

  return mergeGeometries([trunk, ...props])
}
