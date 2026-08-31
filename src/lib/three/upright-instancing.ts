import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three"
import type { Placement } from "./placement"

const matrix = new Matrix4()
const position = new Vector3()
const quaternion = new Quaternion()
const euler = new Euler()
const scale = new Vector3()

/** Placements that stay upright: animals lean with nothing, and the tilt jitter
 *  that suits foliage makes a standing animal look injured. */
export function applyUprightPlacements(
  mesh: InstancedMesh,
  placements: Placement[]
): void {
  placements.forEach((placement, index) => {
    position.set(placement.x, placement.y, placement.z)
    euler.set(0, placement.rotation, 0)
    quaternion.setFromEuler(euler)
    scale.setScalar(placement.scale)
    mesh.setMatrixAt(index, matrix.compose(position, quaternion, scale))
  })

  mesh.instanceMatrix.needsUpdate = true
  mesh.computeBoundingSphere()
}
