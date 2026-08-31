import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three"
import { lift, type Gait } from "./gait"
import { groundAt } from "./wander-sample"
import type { WanderField } from "./wander-field"
import type { Wanderer } from "./wander"

const matrix = new Matrix4()
const position = new Vector3()
const quaternion = new Quaternion()
const euler = new Euler()
const scale = new Vector3()

/** Writes the herd's current positions into the instanced mesh. */
export function applyWanderers(
  mesh: InstancedMesh,
  herd: Wanderer[],
  field: WanderField,
  gait: Gait,
  elapsed: number
): void {
  herd.forEach((one, index) => {
    position.set(
      one.x,
      groundAt(field, one.x, one.z) + lift(gait, one, elapsed),
      one.z
    )
    // Birds bank into their turns; anything on the ground stays level.
    const bank =
      gait === "fly"
        ? Math.sin(elapsed * 0.35 + one.phase) * one.meander * 0.45
        : 0
    euler.set(0, one.heading, bank)
    quaternion.setFromEuler(euler)
    scale.setScalar(one.scale)
    mesh.setMatrixAt(index, matrix.compose(position, quaternion, scale))
  })

  mesh.instanceMatrix.needsUpdate = true
}
