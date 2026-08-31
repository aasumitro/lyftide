import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import {
  HOUSE,
  HOUSE_TOP,
  RETAINING_HEIGHT,
  RETAINING_SIDE,
} from "./house-dimensions"

type Box = [sx: number, sy: number, sz: number, x: number, y: number, z: number]

/** Every solid concrete surface — retaining walls, floor pads, the roof slab,
 *  the upper floor's flanks — merged into one draw call (shared material). */
export function buildHouseConcreteGeometry(): BufferGeometry {
  const {
    width: w,
    depth: d,
    lowerHeight: lh,
    upperHeight: uh,
    roofThickness: rt,
  } = HOUSE
  const rh = RETAINING_HEIGHT
  const boxes: Box[] = [
    [w + 2.4, rh, 0.5, 0, rh / 2 - 0.6, -d / 2 - 0.55],
    [0.5, rh, d + 3, -RETAINING_SIDE, rh / 2 - 0.6, 0.6],
    [0.5, rh, d + 3, RETAINING_SIDE, rh / 2 - 0.6, 0.6],
    [w + 1.2, 0.3, d + 4, 0, -0.08, 1.6],
    [w + 0.7, 0.34, d + 0.7, 0, lh + 0.12, 0],
    [w + 0.9, rt, d + 0.9, 0, HOUSE_TOP + rt / 2, 0],
    [0.3, uh, d, -w / 2, lh + uh / 2, 0],
    [0.3, uh, d, w / 2, lh + uh / 2, 0],
  ]

  return mergeGeometries(
    boxes.map(([sx, sy, sz, x, y, z]) => {
      const geo = new BoxGeometry(sx, sy, sz)
      geo.translate(x, y, z)
      return geo
    })
  )
}
