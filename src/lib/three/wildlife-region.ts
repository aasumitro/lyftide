import type { Region } from "./wander"

/**
 * Deep in the north-west woods. Chosen by counting the actual trees inside each
 * candidate circle and rejecting any that touched water, a farm pad or ground
 * below 2.5 m — the first site sat on the spring pool, which is how animals
 * ended up standing under the surface.
 */
export const WILDLIFE_REGION: Region = { x: -42, z: -24, radius: 12 }

/** seed, count, speed, settle — settle is how much of the time an animal simply
 *  stands still. Constant motion is the single biggest tell that something is
 *  not alive.
 *
 *  Walking speeds are well under the real animal's: nothing here has a leg
 *  animation, so a body crossing the ground at its true pace reads as a hover. */
export const GROUND_SPECIES = {
  rabbit: { seed: 7141, count: 16, speed: 1.5, settle: 0.95 },
  sheep: { seed: 2255, count: 8, speed: 0.45, settle: 0.95 },
  chicken: { seed: 6390, count: 14, speed: 0.9, settle: 0.9 },
}

/** Birds never stop mid-air, so they barely settle. */
export const BIRD_FLOCK = { seed: 9012, count: 24, speed: 4.2, settle: 0.12 }
