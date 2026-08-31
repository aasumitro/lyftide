import type { Wanderer } from "./wander"

/** Radians a second at full stride. Deliberately slow: anything that can spin
 *  faster than it walks reads as a turret rather than a body with legs. */
const TURN_RATE = 0.85

/** How much room this one needs to come about under that cap — a bird flying
 *  at four metres a second needs several times a grazing sheep's. */
export const turningRoom = (one: Wanderer) => one.speed / TURN_RATE

/**
 * Slews the heading onto the goal, the short way round and never faster than
 * neck and shoulders would manage; a resting animal barely turns at all. The
 * old step integrated a sine straight into the heading every frame, which is
 * what had them pirouetting on the spot and circling instead of grazing.
 */
export function steerToward(one: Wanderer, step: number): void {
  const offset = Math.atan2(
    Math.sin(one.goal - one.heading),
    Math.cos(one.goal - one.heading)
  )
  const limit = TURN_RATE * (0.15 + 0.85 * one.active) * step
  one.heading += Math.max(-limit, Math.min(limit, offset))
}
