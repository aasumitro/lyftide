import { drynessAt } from "./wander-sample"
import type { WanderField } from "./wander-field"
import type { Wanderer } from "./wander"

const LOOK = 2.4
const PROBE = 0.95

/**
 * Turns an animal away from water. Reads the baked dry mask ahead and to either
 * side and aims at the drier one — cheap, and it lets them walk right up to a
 * bank without wading in. It sets the goal rather than the heading, so the turn
 * still goes through the rate cap instead of snapping the body round.
 */
export function avoidWater(one: Wanderer, field: WanderField): number {
  const ahead = drynessAt(
    field,
    one.x + Math.sin(one.heading) * LOOK,
    one.z + Math.cos(one.heading) * LOOK
  )
  if (ahead > 0.8) return 1

  const left = drynessAt(
    field,
    one.x + Math.sin(one.heading - PROBE) * LOOK,
    one.z + Math.cos(one.heading - PROBE) * LOOK
  )
  const right = drynessAt(
    field,
    one.x + Math.sin(one.heading + PROBE) * LOOK,
    one.z + Math.cos(one.heading + PROBE) * LOOK
  )
  one.goal = one.heading + (right > left ? PROBE : -PROBE)

  // Slow down at the edge rather than skating along it.
  return 0.35 + ahead * 0.65
}
