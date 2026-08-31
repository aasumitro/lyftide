/**
 * Walkway routes (D12), traced from the lines drawn on docs/ss.png.
 *
 * One main line runs dock to beach. The climb to the summit leaves it low on
 * the slope and switches back twice up the east flank: the flank rises about a
 * metre for every metre and a half, so a straight run would be a ladder — the
 * zigzag is what makes it walkable with something in your hands.
 *
 * Pure 2D: terrain and scatters read this, so it must read neither.
 */

/** Where the climb meets the main line. Deliberately well down the slope. */
const FOOT: [number, number] = [22.5, 16.5]

export const PATH_ROUTES: [number, number][][] = [
  [
    [57, 10.2],
    [53, 10.7],
    [46, 11.4],
    [38, 12.2],
    [30, 12.8],
    [25.5, 14],
    FOOT,
    [19, 20],
    [15, 25],
    [11, 30],
    [6.5, 35],
    [2, 40],
    [-3, 45],
    [-8, 49.5],
    [-12, 55],
  ],
  [FOOT, [32, 12], [36, 7], [30, 2], [24, -2], [17, -3], [14, 2]],
]

/** Points sampled per route — roughly one every 0.8 m. */
export const PATH_SAMPLES = [150, 64]

/** Half the paved width. Beyond this the ground goes back to being ground. */
export const PATH_HALF_WIDTH = 1.6

/** How far past the paving the ground grades back to natural — shared by the
 *  height blend (terrain.ts) and the colour blend (terrain-palette.ts), so the
 *  worn stone edge lines up with the graded shoulder rather than the two
 *  drifting apart. */
export const PATH_SHOULDER = 2.6
