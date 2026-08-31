import { Color } from "three"
import { clamp, lerp, smoothstep } from "./math"
import { fbm, makeNoise } from "./noise"
import { PATH_HALF_WIDTH, PATH_SHOULDER } from "./path-routes"
import { pathDistance } from "./paths"
import { bearing, shoreRadius } from "./terrain-profile"

/** Ground colour by shoreline distance, elevation and slope. */

const variation = makeNoise(5150)

const WET_SAND = new Color("#8b7d61")
const DRY_SAND = new Color("#e6d5ab")
const MEADOW = new Color("#7d9550")
const FOREST = new Color("#3b5628")
const ROCK = new Color("#7a746b")
const CLIFF = new Color("#585349")
// Matches the paver colour in stone-path.tsx, so the graded shoulder reads as
// the same worn stone rather than handing off to a different grey.
const STONE = new Color("#9a9791")

const scratch = new Color()

export function groundColour(
  out: Color,
  x: number,
  z: number,
  height: number,
  slope: number
): Color {
  const tone = fbm(variation, x * 0.045, z * 0.045, 3)
  const b = bearing(x, z)

  // Sand is measured from the waterline, not from sea level: a beach is a strip
  // along a shore, and only the south shore has a wide one.
  const inland = shoreRadius(b) - Math.hypot(x, z)
  const width = lerp(4, 21, clamp(-Math.cos(b))) * (1 + tone * 0.25)
  const sand = 1 - smoothstep(width * 0.5, width, inland)

  out.copy(WET_SAND).lerp(DRY_SAND, smoothstep(-1.6, 0.5, height))
  scratch
    .copy(MEADOW)
    .lerp(FOREST, clamp(smoothstep(5, 26, height) + tone * 0.34))
  out.lerp(scratch, (1 - sand) * smoothstep(0.1, 1.1, height))

  scratch.copy(ROCK).lerp(CLIFF, smoothstep(0.4, 0.76, slope))
  out.lerp(scratch, smoothstep(0.3, 0.56, slope))
  out.lerp(ROCK, smoothstep(26, 35, height) * 0.72)

  // The graded shoulder around a walkway (D12) reads as worn stone regardless
  // of the biome it cuts through — sand, grass or rock all give way the same.
  const onPath =
    1 -
    smoothstep(
      PATH_HALF_WIDTH,
      PATH_HALF_WIDTH + PATH_SHOULDER,
      pathDistance(x, z)
    )
  out.lerp(STONE, onPath)

  // Light dies fast underwater; without this the seabed glows through the shallows.
  const drowned = smoothstep(0, -14, height)
  return out.multiplyScalar((1 + tone * 0.07) * (1 - 0.72 * drowned))
}
