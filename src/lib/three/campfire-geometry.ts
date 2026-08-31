import { CylinderGeometry, SphereGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { makeRandom } from "./noise"

/** Stones round the pit, sunk in and each one a different lump. */
export function buildFireRingGeometry(): BufferGeometry {
  const random = makeRandom(5309)
  const stones: BufferGeometry[] = []

  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2 + random() * 0.2
    const size = 0.19 + random() * 0.12
    const stone = new SphereGeometry(size, 6, 4)
    stone.scale(1, 0.72 + random() * 0.3, 1)
    stone.translate(Math.cos(angle) * 0.95, size * 0.42, Math.sin(angle) * 0.95)
    stones.push(stone)
  }

  return mergeGeometries(stones)
}

/** Sticks leaning into each other over the pit. */
export function buildFirewoodGeometry(): BufferGeometry {
  const random = makeRandom(1176)
  const logs: BufferGeometry[] = []

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + random() * 0.3
    const log = new CylinderGeometry(0.055, 0.085, 1.25, 5)
    log.rotateX(0.72)
    log.rotateY(angle)
    log.translate(Math.cos(angle) * 0.36, 0.34, Math.sin(angle) * 0.36)
    logs.push(log)
  }

  return mergeGeometries(logs)
}
