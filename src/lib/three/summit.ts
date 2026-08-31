import { lerp, smoothstep } from "./math"

/** Shaping of the summit for the house. The terrace is cut into the terrain
 *  itself, not faked with a platform mesh, so trees, paths and props all read
 *  the same surface (D4). */
export const SUMMIT = {
  x: 2,
  z: 4,
  padRadius: 11.5,
  /** Bearing the house faces — out over the south-east water. */
  yaw: 0.6,
  terraceDrop: 3.6,
  terraceWidth: 12.8,
  terraceDepth: 11.5,
}

/** World offset to the house's local frame, where +Z is the way it looks. */
export function toHouseLocal(dx: number, dz: number): [number, number] {
  const cos = Math.cos(SUMMIT.yaw)
  const sin = Math.sin(SUMMIT.yaw)
  return [dx * cos - dz * sin, dx * sin + dz * cos]
}

export function shapeSummit(
  x: number,
  z: number,
  natural: number,
  padHeight: number
): number {
  const dx = x - SUMMIT.x
  const dz = z - SUMMIT.z

  const away = Math.hypot(dx, dz)
  const pad = smoothstep(SUMMIT.padRadius, SUMMIT.padRadius * 0.55, away)
  const height = lerp(natural, padHeight, pad)

  const [lx, lz] = toHouseLocal(dx, dz)
  const half = SUMMIT.terraceWidth / 2
  // Sharp edges on purpose: a gentle blend reads as a dirt mound, and the point
  // is that this floor is cut into rock.
  const along =
    smoothstep(-1.4, 0.4, lz) *
    (1 - smoothstep(SUMMIT.terraceDepth - 1.2, SUMMIT.terraceDepth, lz))
  const across = 1 - smoothstep(half - 0.9, half, Math.abs(lx))

  return lerp(height, padHeight - SUMMIT.terraceDrop, along * across)
}
