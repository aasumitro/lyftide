import { terrainHeight } from "./terrain"

/** Ground normal by finite difference — for slope masks and levelling props. */
export function terrainNormal(x: number, z: number, e = 0.8) {
  const dx = terrainHeight(x + e, z) - terrainHeight(x - e, z)
  const dz = terrainHeight(x, z + e) - terrainHeight(x, z - e)
  const len = Math.hypot(dx, 2 * e, dz)
  return { x: -dx / len, y: (2 * e) / len, z: -dz / len }
}

/** 0 on the flat, 1 on a vertical face. */
export const terrainSlope = (x: number, z: number) => 1 - terrainNormal(x, z).y
