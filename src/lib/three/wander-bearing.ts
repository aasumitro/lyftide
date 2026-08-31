import type { Region, Wanderer } from "./wander"
import { turningRoom } from "./wander-steer"

/** A fresh bearing, taken the moment an animal sets off and then held — a
 *  grazing animal crosses a few metres in a straight line and stops again. */
export function pickBearing(one: Wanderer, elapsed: number): void {
  const turn = Math.sin(elapsed * 2.3 + one.phase * 4.1)
  one.goal = one.heading + turn * one.meander * 1.7
}

/** A slow wheel on top, scaled by how restless the species is: grazers hold
 *  their line, birds — which never stop to re-aim — circle on this alone. */
export function driftBearing(
  one: Wanderer,
  restless: number,
  elapsed: number,
  step: number
): void {
  const wheel = Math.sin(elapsed * 0.4 + one.phase) * one.meander * 0.35
  one.goal += wheel * restless * step
}

/** Turns for home early enough to actually come about, aimed off centre so the
 *  flock wheels round the clearing rather than shuttling through the middle. */
export function holdRegion(one: Wanderer, region: Region): void {
  const leash = region.radius - turningRoom(one)
  if (Math.hypot(one.x - region.x, one.z - region.z) < leash) return

  const inward = Math.atan2(region.x - one.x, region.z - one.z)
  one.goal = inward + (one.phase > Math.PI ? 0.8 : -0.8)
}
