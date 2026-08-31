import { CAMPFIRE } from "./campfire-site"
import { terrainHeight } from "./terrain"

/** distance from the fire, bearing round it. */
const SEATS: [number, number][] = [
  [2.7, 0.2],
  [2.5, 2.4],
  [2.9, 4.3],
]

/** How far the fire circle is turned as a whole. */
export const CAMPFIRE_YAW = 0.4

export type Seat = { x: number; z: number; drop: number; angle: number }

/**
 * Each trunk reads the ground beneath itself. Inheriting one height from the
 * fire leaves the far ends of the benches hanging above the sand.
 */
export function buildSeats(): Seat[] {
  const base = terrainHeight(CAMPFIRE.x, CAMPFIRE.z)
  const cos = Math.cos(CAMPFIRE_YAW)
  const sin = Math.sin(CAMPFIRE_YAW)

  return SEATS.map(([distance, angle]) => {
    const lx = Math.cos(angle) * distance
    const lz = Math.sin(angle) * distance
    const worldX = CAMPFIRE.x + lx * cos + lz * sin
    const worldZ = CAMPFIRE.z - lx * sin + lz * cos

    return { x: lx, z: lz, angle, drop: terrainHeight(worldX, worldZ) - base }
  })
}
