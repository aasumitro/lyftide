import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { makeRandom } from "./noise"
import { PATH_HALF_WIDTH } from "./path-routes"
import { pathCurves } from "./paths"
import { terrainHeight } from "./terrain"

const PAVER = 0.78
const GAP = 0.07
const THICKNESS = 0.14
const ACROSS = [-1.17, -0.39, 0.39, 1.17]

/**
 * Laid as paving, not as stepping stones: even rows, a running bond, and a flat
 * surface. The ground beneath is already graded to the walkway's own gradient,
 * so every paver sits level with its neighbours.
 */
export function buildPathStoneGeometry(): BufferGeometry {
  const random = makeRandom(31337)
  const pavers: BufferGeometry[] = []

  pathCurves.forEach((points, route) => {
    for (let i = route === 0 ? 1 : 2; i < points.length; i++) {
      const previous = points[i - 1]
      const point = points[i]
      const heading = Math.atan2(point.x - previous.x, point.z - previous.z)
      const shift = i % 2 === 0 ? (PAVER + GAP) / 2 : 0

      for (const offset of ACROSS) {
        const across = offset * (PATH_HALF_WIDTH / 1.6)
        const x =
          point.x + Math.cos(heading) * across + Math.sin(heading) * shift
        const z =
          point.z - Math.sin(heading) * across + Math.cos(heading) * shift
        const size = PAVER - random() * 0.05

        const paver = new BoxGeometry(size, THICKNESS, size * 0.92)
        paver.rotateY(heading)
        paver.translate(x, terrainHeight(x, z) + THICKNESS / 2 - 0.05, z)
        pavers.push(paver)
      }
    }
  })

  return mergeGeometries(pavers)
}
