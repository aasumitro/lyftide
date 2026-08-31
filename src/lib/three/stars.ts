import { BufferAttribute, BufferGeometry } from "three"
import { makeRandom } from "./noise"
import { OCEAN_RADIUS } from "./world"

const COUNT = 1100

/** Our own starfield rather than drei's, so the fade can follow the world clock. */
export function buildStarField(): BufferGeometry {
  const random = makeRandom(77213)
  const positions = new Float32Array(COUNT * 3)
  const colours = new Float32Array(COUNT * 3)

  for (let i = 0; i < COUNT; i++) {
    const theta = random() * Math.PI * 2
    // Upper hemisphere only — nothing below the horizon is ever visible.
    const y = 0.04 + random() * 0.96
    const ring = Math.sqrt(1 - y * y)
    positions.set([Math.cos(theta) * ring, y, Math.sin(theta) * ring], i * 3)

    const shade = 0.55 + random() * 0.45
    colours.set([shade * 0.92, shade * 0.95, shade], i * 3)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(positions, 3))
  geometry.setAttribute("color", new BufferAttribute(colours, 3))
  const radius = OCEAN_RADIUS * 1.2
  geometry.scale(radius, radius, radius)
  return geometry
}
