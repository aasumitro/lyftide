import { ExtrudeGeometry, Shape, type BufferGeometry } from "three"

/**
 * Hull from an extruded plan view. The bevel is doing real work here: a hull is
 * the one shape where a hard edge instantly reads as a box (naturalism rule 2).
 */
function hullShape(length: number, beam: number): Shape {
  const shape = new Shape()
  const half = length / 2

  shape.moveTo(0, half)
  shape.quadraticCurveTo(beam * 0.55, half * 0.45, beam * 0.5, -half * 0.1)
  shape.quadraticCurveTo(beam * 0.46, -half * 0.72, beam * 0.3, -half)
  shape.lineTo(-beam * 0.3, -half)
  shape.quadraticCurveTo(-beam * 0.46, -half * 0.72, -beam * 0.5, -half * 0.1)
  shape.quadraticCurveTo(-beam * 0.55, half * 0.45, 0, half)

  return shape
}

export function buildHullGeometry(
  length: number,
  beam: number,
  draft: number,
  freeboard = draft * 0.75
): BufferGeometry {
  const hull = new ExtrudeGeometry(hullShape(length, beam), {
    depth: draft + freeboard,
    bevelEnabled: true,
    bevelThickness: draft * 0.3,
    bevelSize: beam * 0.09,
    bevelSegments: 3,
    curveSegments: 10,
  })

  // Extruded along Z, so stand it up, then seat it by its own bounds: the bevel
  // adds real height, and guessing the offset floats or sinks the hull.
  hull.rotateX(-Math.PI / 2)
  hull.computeBoundingBox()
  const bounds = hull.boundingBox
  if (bounds) hull.translate(0, -bounds.min.y - draft, 0)

  hull.computeVertexNormals()
  return hull
}
