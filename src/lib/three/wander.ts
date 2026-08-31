import { makeRandom } from "./noise"

export type Region = { x: number; z: number; radius: number }

export type Wanderer = {
  x: number
  z: number
  heading: number
  /** Bearing it wants; heading slews onto this at a capped rate. */
  goal: number
  speed: number
  phase: number
  meander: number
  scale: number
  /** How fast this one's rest/move cycle runs. */
  rhythm: number
  /** 0 while standing still, 1 at full stride. Written by the step. */
  active: number
}

export function createWanderers(
  seed: number,
  count: number,
  region: Region,
  speed: number
): Wanderer[] {
  const random = makeRandom(seed)
  const herd: Wanderer[] = []

  for (let i = 0; i < count; i++) {
    const angle = random() * Math.PI * 2
    const distance = Math.sqrt(random()) * region.radius * 0.92
    const heading = random() * Math.PI * 2

    herd.push({
      x: region.x + Math.cos(angle) * distance,
      z: region.z + Math.sin(angle) * distance,
      heading,
      goal: heading,
      speed: speed * (0.7 + random() * 0.6),
      phase: random() * Math.PI * 2,
      meander: 0.5 + random() * 1.1,
      scale: 0.85 + random() * 0.35,
      rhythm: 0.22 + random() * 0.34,
      active: 1,
    })
  }

  return herd
}
