import { smoothstep } from "./math"
import type { Motion } from "./motion"
import type { Wanderer } from "./wander"
import { avoidWater } from "./wander-avoid"
import { driftBearing, holdRegion, pickBearing } from "./wander-bearing"
import { steerToward } from "./wander-steer"

/** Below this an animal counts as stopped rather than walking. */
const STRIDE = 0.3

/**
 * Moves the herd. Each animal keeps a bearing and only steers onto it at a
 * capped rate, so a walk is a short straight line between stops rather than one
 * endless curve. Speed still pulses between grazing and walking: anything that
 * glides along at a constant rate reads as a vehicle.
 */
export function stepWanderers(
  herd: Wanderer[],
  motion: Motion,
  elapsed: number,
  delta: number
): void {
  const step = Math.min(delta, 0.1)

  for (const one of herd) {
    const walking = one.active > STRIDE
    const pulse = Math.sin(elapsed * one.rhythm + one.phase)
    one.active =
      1 - motion.settle + motion.settle * smoothstep(-0.15, 0.45, pulse)

    if (!walking && one.active > STRIDE) pickBearing(one, elapsed)
    driftBearing(one, 1 - motion.settle, elapsed, step)
    holdRegion(one, motion.region)

    const brake = motion.keepDry ? avoidWater(one, motion.field) : 1
    steerToward(one, step)

    const travel = one.speed * one.active * brake * step
    one.x += Math.sin(one.heading) * travel
    one.z += Math.cos(one.heading) * travel
  }
}
