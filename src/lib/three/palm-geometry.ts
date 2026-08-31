import { CylinderGeometry, SphereGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { PALM_HEIGHT, PALM_LEAN, PALM_SEGMENTS } from "./palm-dimensions"

/** Trunk stacked from tapering segments along a curve — a straight cylinder
 *  reads as a pole, and the bend is most of what says "palm". */
export function buildPalmTrunkGeometry(): BufferGeometry {
  const parts: BufferGeometry[] = []
  let offset = 0

  for (let i = 0; i < PALM_SEGMENTS; i++) {
    const t = i / PALM_SEGMENTS
    const length = PALM_HEIGHT / PALM_SEGMENTS
    const piece = new CylinderGeometry(
      0.19 - t * 0.07,
      0.23 - t * 0.07,
      length,
      6
    )
    piece.translate(0, length / 2, 0)
    piece.rotateX(-PALM_LEAN * t)
    piece.translate(0, offset, Math.sin(PALM_LEAN * t) * length * i * 0.34)
    parts.push(piece)
    offset += length * Math.cos(PALM_LEAN * t)
  }

  // Sphere, not an icosahedron: mergeGeometries needs every part indexed, and
  // IcosahedronGeometry is not.
  for (const angle of [0.4, 2.5, 4.6]) {
    const nut = new SphereGeometry(0.26, 5, 4)
    nut.translate(
      Math.cos(angle) * 0.42,
      offset - 0.55,
      Math.sin(angle) * 0.42 + 1.1
    )
    parts.push(nut)
  }

  return mergeGeometries(parts)
}
