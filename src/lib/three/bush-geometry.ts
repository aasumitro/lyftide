import { IcosahedronGeometry, type BufferGeometry } from "three"
import {
  mergeGeometries,
  mergeVertices,
} from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { fbm, makeNoise } from "./noise"

const shape = makeNoise(8642)

function buildLump(radius: number, x: number, y: number): BufferGeometry {
  const lump = new IcosahedronGeometry(radius, 1)
  const position = lump.attributes.position

  for (let i = 0; i < position.count; i++) {
    const px = position.getX(i)
    const py = position.getY(i)
    const pz = position.getZ(i)
    const push = 1 + fbm(shape, px * 1.1 + x, pz * 1.1 - py, 2) * 0.4
    position.setXYZ(i, px * push, py * push * 0.66, pz * push)
  }

  lump.translate(x, y, x * 0.4)
  return lump
}

export function buildBushGeometry(): BufferGeometry {
  const bush = mergeGeometries([
    buildLump(0.95, 0, 0.62),
    buildLump(0.66, 0.78, 0.44),
  ])
  const welded = mergeVertices(bush, 0.01)
  welded.computeVertexNormals()
  return welded
}
