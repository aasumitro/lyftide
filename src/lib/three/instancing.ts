import {
  Color,
  Euler,
  InstancedMesh,
  Matrix4,
  Quaternion,
  Vector3,
} from "three"
import type { Placement } from "./placement"

const matrix = new Matrix4()
const position = new Vector3()
const quaternion = new Quaternion()
const euler = new Euler()
const scale = new Vector3()

/** Writes placements into an InstancedMesh, optionally colouring each instance. */
export function applyPlacements(
  mesh: InstancedMesh,
  placements: Placement[],
  colourAt?: (placement: Placement, index: number) => Color
): void {
  placements.forEach((placement, index) => {
    position.set(placement.x, placement.y, placement.z)
    euler.set(placement.tilt, placement.rotation, placement.tilt * 0.7)
    quaternion.setFromEuler(euler)
    scale.set(
      placement.scale,
      placement.scale * (0.88 + placement.tilt),
      placement.scale
    )

    mesh.setMatrixAt(index, matrix.compose(position, quaternion, scale))
    if (colourAt) mesh.setColorAt(index, colourAt(placement, index))
  })

  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  mesh.computeBoundingSphere()
}
