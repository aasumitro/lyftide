import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import type { BufferGeometry } from "three"
import { fenceLine } from "./fence-geometry"

/** Posts and rails around a rectangle, merged into one mesh (D9). */
export function buildFenceGeometry(
  halfX: number,
  halfZ: number,
  height = 1.2,
  divider = false
): BufferGeometry {
  const parts = [
    ...fenceLine(-halfX, -halfZ, halfX, -halfZ, height),
    ...fenceLine(halfX, -halfZ, halfX, halfZ, height),
    ...fenceLine(halfX, halfZ, -halfX, halfZ, height),
    ...fenceLine(-halfX, halfZ, -halfX, -halfZ, height),
  ]

  // Splits the run in two — meat on one side, layers on the other.
  if (divider) parts.push(...fenceLine(0, -halfZ, 0, halfZ, height))

  return mergeGeometries(parts)
}
