import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { makeRandom } from "./noise"

/** Growing tray for one tier. */
export function buildTrayGeometry(
  halfX: number,
  halfZ: number
): BufferGeometry {
  const tray = new BoxGeometry(halfX * 2 - 0.2, 0.12, halfZ * 2 - 0.2)
  tray.translate(0, -0.06, 0)
  return tray
}

/**
 * Rows of plants on a tray. Built as separate clumps with jittered height so a
 * tier reads as a crop rather than a painted green slab (naturalism rule 4).
 */
export function buildCropRowsGeometry(
  halfX: number,
  halfZ: number
): BufferGeometry {
  const random = makeRandom(9182)
  const rows: BufferGeometry[] = []
  const spacing = 0.62

  for (let x = -halfX + 0.7; x < halfX - 0.5; x += spacing) {
    for (let z = -halfZ + 0.7; z < halfZ - 0.5; z += spacing) {
      const height = 0.26 + random() * 0.22
      const plant = new BoxGeometry(
        0.36 + random() * 0.1,
        height,
        0.36 + random() * 0.1
      )
      plant.rotateY(random() * 0.6)
      plant.translate(x, height / 2, z)
      rows.push(plant)
    }
  }

  return mergeGeometries(rows)
}
