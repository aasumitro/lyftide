import { Color } from "three"
import { clamp } from "./math"
import type { Placement } from "./placement"

const YOUNG = new Color("#6f8f3e")
const OLD = new Color("#2f4a22")
const scratch = new Color()

/** Canopy tint varies per tree, or a forest reads as one repeated object. */
export function canopyColour(placement: Placement, index: number): Color {
  const age = ((index * 2654435761) % 1000) / 1000
  scratch.copy(YOUNG).lerp(OLD, clamp(age * 0.75 + placement.y / 60))
  return scratch.multiplyScalar(0.88 + age * 0.24)
}
