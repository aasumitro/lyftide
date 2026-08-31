import { BoxGeometry, SphereGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** A bird on the wing: swept wings and a tail, read entirely by silhouette
 *  from below. Small enough that anything more would never be seen. */
export function buildBirdGeometry(): BufferGeometry {
  const body = new SphereGeometry(0.11, 6, 4)
  body.scale(1, 0.85, 2.1)

  const head = new SphereGeometry(0.07, 5, 4)
  head.translate(0, 0.02, 0.24)

  const wings = [-1, 1].map((side) => {
    const wing = new BoxGeometry(0.52, 0.03, 0.17)
    wing.rotateY(side * 0.42)
    wing.rotateZ(side * -0.14)
    wing.translate(side * 0.29, 0.03, -0.02)
    return wing
  })

  const tail = new BoxGeometry(0.11, 0.025, 0.19)
  tail.translate(0, 0.01, -0.28)

  return mergeGeometries([body, head, ...wings, tail])
}
