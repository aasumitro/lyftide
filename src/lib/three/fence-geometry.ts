import { BoxGeometry, CylinderGeometry, type BufferGeometry } from "three"

/** One run of fence: posts along it and two rails. */
export function fenceLine(
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  height: number,
  spacing = 2.3
): BufferGeometry[] {
  const parts: BufferGeometry[] = []
  const length = Math.hypot(x2 - x1, z2 - z1)
  const steps = Math.max(2, Math.round(length / spacing))

  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const post = new CylinderGeometry(0.07, 0.09, height, 6)
    post.translate(x1 + (x2 - x1) * t, height / 2, z1 + (z2 - z1) * t)
    parts.push(post)
  }

  for (const railY of [height * 0.42, height * 0.82]) {
    const rail = new BoxGeometry(0.05, 0.08, length)
    rail.rotateY(Math.atan2(x2 - x1, z2 - z1))
    rail.translate((x1 + x2) / 2, railY, (z1 + z2) / 2)
    parts.push(rail)
  }

  return parts
}
