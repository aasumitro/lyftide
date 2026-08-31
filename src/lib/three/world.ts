/**
 * World canon. See docs/PLAN.md — 1 unit = 1 metre, Y is up, sea level at y = 0.
 * Compass: -Z north, +X east, +Z south, -X west.
 */

export type Vec3 = [number, number, number]

export const SEA_LEVEL = 0

/** Distance from the origin to the mean shoreline. */
export const ISLAND_RADIUS = 72

/** Height of the central hill, where the house stands. */
export const SUMMIT_HEIGHT = 38

/** How far the ocean plane and the seabed extend. */
export const OCEAN_RADIUS = 2600
export const SEABED_DEPTH = 34

/** Compass bearings in radians, measured from north, turning east. */
export const NORTH = 0
export const EAST = Math.PI / 2
export const SOUTH = Math.PI
export const WEST = -Math.PI / 2

/** Named places from the canon. Y is filled in from the terrain at build time. */
export const LANDMARKS = {
  SUMMIT: [2, SUMMIT_HEIGHT, 4],
  NORTH_CLIFF: [-4, 0, -ISLAND_RADIUS * 0.82],
  EAST_DOCK: [ISLAND_RADIUS * 0.94, 0, 10],
  SOUTH_BEACH: [-10, 0, ISLAND_RADIUS * 0.88],
  WEST_WILDS: [-ISLAND_RADIUS * 0.62, 0, -14],
} satisfies Record<string, Vec3>

/** The opening shot: low, south-east, looking at the hill across the water. */
export const OPENING_CAMERA = {
  position: [116, 47, 141],
  target: [0, 13, 0],
  fov: 40,
} satisfies { position: Vec3; target: Vec3; fov: number }

export const CAMERA_LIMITS = {
  minDistance: 95,
  maxDistance: 340,
  minPolarAngle: Math.PI * 0.14,
  maxPolarAngle: Math.PI * 0.47,
}
