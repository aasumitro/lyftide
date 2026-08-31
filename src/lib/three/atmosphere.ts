import { Color } from "three"
import { lerp } from "./math"
import type { WorldTime } from "./time"

/** How the world is lit through the cycle. Everything here is driven by D11. */

const SKY_NIGHT = new Color("#0b1526")
const SKY_DAY = new Color("#8fc0ea")
const SKY_DUSK = new Color("#e07a4e")

const LIGHT_NIGHT = new Color("#9db6d8")
const LIGHT_DAY = new Color("#fff4e0")
const LIGHT_DUSK = new Color("#ff9d52")

const FOG_NIGHT = new Color("#101d30")
const FOG_DAY = new Color("#bdd6ea")
const FOG_DUSK = new Color("#dc9169")

function blend(
  target: Color,
  night: Color,
  day: Color,
  dusk: Color,
  t: WorldTime
) {
  return target
    .copy(night)
    .lerp(day, t.day)
    .lerp(dusk, t.dusk * 0.75)
}

export const skyColor = (out: Color, t: WorldTime) =>
  blend(out, SKY_NIGHT, SKY_DAY, SKY_DUSK, t)

export const fogColor = (out: Color, t: WorldTime) =>
  blend(out, FOG_NIGHT, FOG_DAY, FOG_DUSK, t)

export const sunColor = (out: Color, t: WorldTime) =>
  blend(out, LIGHT_NIGHT, LIGHT_DAY, LIGHT_DUSK, t)

/** Key light. Moonlight is dim but never zero, or the night reads as a black screen. */
export const sunIntensity = (t: WorldTime) => lerp(0.22, 3.1, t.day)

/** Fill light, keeping shadowed faces readable. */
export const ambientIntensity = (t: WorldTime) => lerp(0.16, 0.62, t.day)

/** Shadows soften and fade as the sun drops. */
export const shadowOpacity = (t: WorldTime) => lerp(0.15, 1, t.day)

export const starOpacity = (t: WorldTime) => 1 - t.day
