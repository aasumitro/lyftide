import type { Object3D } from "three"
import { waveHeight } from "./waves"

/**
 * Sits a hull in the water using the same wave table the ocean shader draws
 * (D5). Pitch and roll come from sampling the surface fore/aft and port/starboard,
 * so a boat leans with the swell instead of sliding across a flat plane.
 */
export function floatOnWater(
  object: Object3D,
  x: number,
  z: number,
  time: number,
  length: number,
  beam: number,
  heading: number
): void {
  const cos = Math.cos(heading)
  const sin = Math.sin(heading)
  const half = length / 2
  const side = beam / 2

  const fore = waveHeight(x + sin * half, z + cos * half, time)
  const aft = waveHeight(x - sin * half, z - cos * half, time)
  const port = waveHeight(x + cos * side, z - sin * side, time)
  const starboard = waveHeight(x - cos * side, z + sin * side, time)

  object.position.set(x, (fore + aft + port + starboard) / 4, z)
  object.rotation.set(
    Math.atan2(aft - fore, length),
    heading,
    Math.atan2(starboard - port, beam)
  )
}
