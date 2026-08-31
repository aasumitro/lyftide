import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { PALM_HEIGHT } from "./palm-dimensions"

const FRONDS = 9
const SEGMENTS = 3
const SEGMENT = 1.25
const DROOP = 0.42

/**
 * Each frond is a chain of segments, every one angled a little further down, so
 * the blade rises off the crown and then arcs over. Built as one flat piece it
 * reads as a spike; the arc is the whole silhouette of a palm.
 */
export function buildPalmFrondsGeometry(): BufferGeometry {
  const fronds: BufferGeometry[] = []

  for (let i = 0; i < FRONDS; i++) {
    const yaw = (i / FRONDS) * Math.PI * 2
    let y = PALM_HEIGHT
    let reach = 0.24
    let angle = -0.22

    for (let s = 0; s < SEGMENTS; s++) {
      angle += DROOP
      const blade = new BoxGeometry(0.6 - s * 0.16, 0.06, SEGMENT)
      blade.rotateX(angle)
      blade.translate(
        0,
        y - (Math.sin(angle) * SEGMENT) / 2,
        reach + (Math.cos(angle) * SEGMENT) / 2
      )
      blade.rotateY(yaw)
      fronds.push(blade)

      y -= Math.sin(angle) * SEGMENT
      reach += Math.cos(angle) * SEGMENT
    }
  }

  return mergeGeometries(fronds)
}
