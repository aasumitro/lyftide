import { BufferAttribute, BufferGeometry } from "three"
import { OCEAN_RADIUS } from "./world"

const RINGS = 150
const SEGMENTS = 200

/**
 * A radial water sheet rather than a flat grid: rings bunch up near the island
 * where the waves are read close-up, and stretch towards the horizon where they
 * are not. A uniform plane dense enough for the shoreline would cost 40x this.
 */
export function buildOceanGeometry(): BufferGeometry {
  const positions = new Float32Array((RINGS + 1) * (SEGMENTS + 1) * 3)
  const indices: number[] = []

  for (let ring = 0; ring <= RINGS; ring++) {
    const t = ring / RINGS
    const radius = OCEAN_RADIUS * (0.02 * t + 0.98 * t ** 3)

    for (let segment = 0; segment <= SEGMENTS; segment++) {
      const angle = (segment / SEGMENTS) * Math.PI * 2
      const index = (ring * (SEGMENTS + 1) + segment) * 3
      positions[index] = Math.cos(angle) * radius
      positions[index + 2] = Math.sin(angle) * radius
    }
  }

  for (let ring = 0; ring < RINGS; ring++) {
    for (let segment = 0; segment < SEGMENTS; segment++) {
      const a = ring * (SEGMENTS + 1) + segment
      const b = a + SEGMENTS + 1
      // Wound so the surface faces up; the other order is culled from above.
      indices.push(a, a + 1, b, a + 1, b + 1, b)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}
