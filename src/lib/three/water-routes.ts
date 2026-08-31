/**
 * Fresh water on the island (from the annotation). Deep groundwater surfaces on
 * the west flank, pools into a small spring lake, and overflows as a narrow
 * stream that runs to the sea.
 *
 * The flank falls about a metre for every metre and a half, so the pool only
 * holds because its downhill rim stands proud of the water line — that rim is
 * what `carveWater` builds, and why the level can sit above the open slope.
 *
 * Pure 2D and pure constants: the terrain reads this, so it must read nothing back.
 */
export const LAKE = {
  x: -24,
  z: 5,
  radiusX: 5,
  radiusZ: 6.4,
  /** Water line — the spring sits brim full and spills into the stream. */
  level: 18.6,
  floor: 16.1,
}

/** Stream from the overflow down to the west shore. */
export const RIVER: [number, number][] = [
  [-30, 6],
  [-36, 9.5],
  [-42, 12],
  [-49, 14],
  [-57, 16],
  [-65, 18],
  [-72, 20],
  [-80, 21.5],
]

export const RIVER_SAMPLES = 80
/** A stream you could step across. The cut is a little wider than the water so
 *  the channel floor is flat enough for the ribbon to sit inside it. */
export const RIVER_HALF_WIDTH = 0.8
/** Shallow — at this width a deep cut would just look like a trench. */
export const RIVER_DEPTH = 0.42
