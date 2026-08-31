import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { BEDS } from "./farm-field"
import { makeRandom } from "./noise"

/** Plants in the open beds, one merged mesh per crop so each can be its own
 *  colour. Rows run the long way, the way a bed is actually planted. */
export function buildBedCropGeometry(crop: number): BufferGeometry | null {
  const random = makeRandom(4400 + crop * 97)
  const plants: BufferGeometry[] = []

  for (const bed of BEDS) {
    if (bed.crop !== crop) continue

    for (let x = -bed.halfX + 0.32; x < bed.halfX - 0.2; x += 0.46) {
      for (let z = -bed.halfZ + 0.32; z < bed.halfZ - 0.2; z += 0.42) {
        const height = 0.3 + random() * 0.34
        const plant = new BoxGeometry(0.26 + random() * 0.1, height, 0.24)
        plant.rotateY(random() * 0.8)
        plant.translate(bed.x + x, height / 2 + 0.08, bed.z + z)
        plants.push(plant)
      }
    }
  }

  return plants.length ? mergeGeometries(plants) : null
}
