import { makeRandom } from "./noise"
import type { Placement } from "./placement"

/**
 * Animals inside a pen. Loosely clustered rather than evenly spread — a herd
 * standing on a grid reads as furniture (naturalism rule 4).
 */
export function scatterInPen(
  seed: number,
  count: number,
  halfX: number,
  halfZ: number
): Placement[] {
  const random = makeRandom(seed)
  const herd: Placement[] = []

  for (let i = 0; i < count; i++) {
    const clusterX = (random() - 0.5) * 2 * (halfX - 1.2)
    const clusterZ = (random() - 0.5) * 2 * (halfZ - 1.2)

    herd.push({
      x: clusterX + (random() - 0.5) * 1.6,
      y: 0,
      z: clusterZ + (random() - 0.5) * 1.6,
      scale: 0.86 + random() * 0.3,
      rotation: random() * Math.PI * 2,
      tilt: 0,
    })
  }

  return herd
}
