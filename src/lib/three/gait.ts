import type { Wanderer } from "./wander"

/** walk keeps feet down, hop bounces, fly rides above the canopy. */
export type Gait = "walk" | "hop" | "fly"

export function lift(gait: Gait, one: Wanderer, elapsed: number): number {
  if (gait === "hop") {
    // Scaled by activity: a rabbit sitting still must not keep bouncing.
    return Math.abs(Math.sin(elapsed * 5.2 + one.phase)) * 0.3 * one.active
  }
  if (gait === "fly") {
    // Clear of the canopy: the trees top out around seven metres, and birds
    // threaded through the leaves read as bugs in the geometry.
    return 11 + one.meander * 2.4 + Math.sin(elapsed * 0.8 + one.phase) * 1.4
  }
  // A walk lifts the body a touch on every stride. Without it the animal
  // slides over the ground like a puck, which reads as far too fast.
  return Math.abs(Math.sin(elapsed * 3.4 + one.phase)) * 0.04 * one.active
}
