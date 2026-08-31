import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { HOUSE, STARLINK_POSITION } from "./house-dimensions"
import { buildStarlinkFrameGeometry } from "./starlink-geometry"

type Box = [sx: number, sy: number, sz: number, x: number, y: number, z: number]
const MULLIONS = [-3.14, 0, 3.14]

/** Every dark metal frame member — glass mullions, the door track, the dish
 *  mount — shares one material and now one draw call. */
export function buildHouseFrameGeometry(): BufferGeometry {
  const { width: w, depth: d, lowerHeight: lh, upperHeight: uh } = HOUSE
  const boxes: Box[] = [
    ...MULLIONS.map((x): Box => [
      0.13,
      lh - 0.3,
      0.16,
      x,
      lh / 2,
      d / 2 + 0.04,
    ]),
    [w + 0.1, 0.22, 0.2, 0, lh - 0.2, d / 2 + 0.04],
    [w, 0.14, 0.22, 0, lh + uh - 0.16, d / 2],
    [w, 0.1, 0.22, 0, lh + 0.28, d / 2],
  ]

  const dish = buildStarlinkFrameGeometry()
  dish.translate(...STARLINK_POSITION)

  return mergeGeometries([
    ...boxes.map(([sx, sy, sz, x, y, z]) => {
      const geo = new BoxGeometry(sx, sy, sz)
      geo.translate(x, y, z)
      return geo
    }),
    dish,
  ])
}
