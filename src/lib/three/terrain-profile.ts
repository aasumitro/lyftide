import { fbm, makeNoise } from "./noise"
import { smoothstep } from "./math"
import { ISLAND_RADIUS, SEABED_DEPTH } from "./world"

/**
 * The island's shape by compass bearing. The canon says the north is a cliff and
 * the south shelves gently into a beach, so every profile term below is a blend
 * between a "northness" and a "southness" weight rather than a single silhouette.
 */

const outline = makeNoise(20260822)

/** Bearing in radians from north (-Z), turning east (+X). */
export const bearing = (x: number, z: number) => Math.atan2(x, -z)

const northness = (b: number) => smoothstep(0, 1, Math.max(0, Math.cos(b)))
const southness = (b: number) => smoothstep(0, 1, Math.max(0, -Math.cos(b)))

/** Distance to the shoreline for a bearing. Sampled on a circle, so it never seams. */
export function shoreRadius(b: number): number {
  const wobble = fbm(outline, Math.cos(b) * 1.7, Math.sin(b) * 1.7, 4)
  return (
    ISLAND_RADIUS *
    (1 + 0.19 * wobble - 0.08 * northness(b) + 0.14 * southness(b))
  )
}

/** How high the land mass rises inland of the shore. */
export const massHeight = (b: number) =>
  15 + 20 * northness(b) - 5.5 * southness(b)

/**
 * Shape of the rise. Below 1 the land leaps up at the waterline — that is the
 * cliff. Above 1 it creeps up slowly — that is the beach. Kept clear of zero:
 * the land must climb out of the water fast enough to be an island, not a bar.
 */
export const shoreExponent = (b: number) =>
  0.92 - 0.6 * northness(b) + 1.7 * southness(b)

/** Seabed below the waterline: a deep drop in the north, a wading shelf in the south. */
export function seabedHeight(distance: number, b: number): number {
  const slope = 0.14 + 1.35 * northness(b)
  return -SEABED_DEPTH * (1 - Math.exp((-distance * slope) / SEABED_DEPTH))
}
