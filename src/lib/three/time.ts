import { Vector3 } from "three"
import { smoothstep } from "./math"

/**
 * The 20-minute world day (plan D11): 10 minutes of light, 10 of dark, driven by
 * the epoch clock so every visitor shares one sky. Always recompute from
 * Date.now() — an accumulated delta desyncs the moment a tab is backgrounded.
 */

export const CYCLE_MS = 20 * 60 * 1000
const TAU = Math.PI * 2
/** The solar arc leans south, so shadows fall north and never sit under objects. */
const ARC_TILT = 0.36

export type WorldTime = {
  phase: number
  elevation: number // -1..1, above zero is daylight
  day: number // 0 fully night, 1 fully day
  dusk: number // 1 while the sun sits on the horizon
  sun: Vector3
  moon: Vector3
}

export const createWorldTime = (): WorldTime => ({
  phase: 0,
  elevation: 0,
  day: 0,
  dusk: 0,
  sun: new Vector3(1, 0, 0),
  moon: new Vector3(-1, 0, 0),
})

export function updateWorldTime(time: WorldTime, now = Date.now()): WorldTime {
  time.phase = (now % CYCLE_MS) / CYCLE_MS
  const theta = time.phase * TAU

  time.elevation = Math.sin(theta)
  time.sun
    .set(
      Math.cos(theta),
      time.elevation * Math.cos(ARC_TILT),
      time.elevation * Math.sin(ARC_TILT)
    )
    .normalize()
  time.moon.copy(time.sun).negate()

  time.day = smoothstep(-0.14, 0.2, time.elevation)
  time.dusk = 1 - smoothstep(0, 0.26, Math.abs(time.elevation))
  return time
}
