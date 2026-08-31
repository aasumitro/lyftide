/** One scattered object on the ground. Y always comes from the terrain (D4). */
export type Placement = {
  x: number
  y: number
  z: number
  scale: number
  rotation: number
  tilt: number
}

export type ScatterOptions = {
  seed: number
  spacing: number
  minHeight: number
  maxHeight: number
  maxSlope: number
  /** How far inland of the waterline a placement must sit. */
  minInland: number
  /** 0..1 chance at a position — used to thin or thicken a region. */
  density?: (x: number, z: number) => number
}
