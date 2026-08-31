import {
  CylinderGeometry,
  IcosahedronGeometry,
  type BufferGeometry,
} from "three"
import {
  mergeGeometries,
  mergeVertices,
} from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { fbm, makeNoise } from "./noise"

const shape = makeNoise(6180)

export function buildTrunkGeometry(): BufferGeometry {
  const trunk = new CylinderGeometry(0.16, 0.4, 3.6, 5, 1)
  trunk.translate(0, 1.8, 0)
  return trunk
}

/** One blob of foliage, pushed around by noise so no two faces agree. */
function buildBlob(radius: number, y: number, offset: number): BufferGeometry {
  const blob = new IcosahedronGeometry(radius, 1)
  const position = blob.attributes.position

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const py = position.getY(i)
    const z = position.getZ(i)
    const push = 1 + fbm(shape, x * 0.7 + offset, z * 0.7 - py * 0.4, 3) * 0.34
    position.setXYZ(i, x * push, py * push * 0.82, z * push)
  }

  blob.translate(offset * 0.5, y, offset * 0.35)
  return blob
}

/** Canopy as a cluster rather than a ball: the broken silhouette is what makes
 *  a tree read as a tree at distance (naturalism 3 and 4). */
export function buildCanopyGeometry(): BufferGeometry {
  const canopy = mergeGeometries([
    buildBlob(2.25, 4.15, 0),
    buildBlob(1.7, 3.05, 1.45),
    buildBlob(1.35, 3.6, -1.5),
  ])

  const welded = mergeVertices(canopy, 0.01)
  welded.computeVertexNormals()
  return welded
}
