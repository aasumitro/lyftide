import { lerp, smoothstep } from "./math"
import { fbm, makeNoise, ridge } from "./noise"
import * as profile from "./terrain-profile"

/** Ground height before anything is built on it. Kept separate from terrain.ts so
 *  the path profile can sample it without a circular import. */

const relief = makeNoise(31415)
const rough = makeNoise(27182)
const HILL_RADIUS = 31
const HILL_HEIGHT = 21
/** Compass blending fades out near the centre or the summit tears apart. */
const COMPASS_FADE = 42

export function naturalHeight(x: number, z: number): number {
  const r = Math.hypot(x, z)
  const b = profile.bearing(x, z)
  const shore = profile.shoreRadius(b)

  if (r >= shore) return profile.seabedHeight(r - shore, b)

  const blend = smoothstep(0, COMPASS_FADE, r)
  const t = 1 - r / shore
  const land = Math.pow(t, lerp(0.92, profile.shoreExponent(b), blend))
  const hill = HILL_HEIGHT * Math.exp(-((r / HILL_RADIUS) ** 2))
  const base = land * lerp(17, profile.massHeight(b), blend) + hill

  // Relief stays off anything low enough that a dip would flood as a puddle.
  const mask =
    smoothstep(0.35, 2.4, base) *
    (1 - 0.78 * smoothstep(0, 1, Math.max(0, -Math.cos(b))))
  const detail = fbm(relief, x * 0.026, z * 0.026, 5) * 4.4 * mask
  const grain = fbm(rough, x * 0.1, z * 0.1, 3) * 0.85 * mask

  // The north face is rock, so it gets ridges rather than that soft relief.
  const face = Math.max(0, Math.cos(b)) * smoothstep(0.34, 0.04, t)
  const rocky = (ridge(rough, x * 0.085, z * 0.085) - 0.5) * 5.2 * face

  return base + detail + grain + rocky
}
