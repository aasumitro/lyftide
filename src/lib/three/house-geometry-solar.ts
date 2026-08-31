import type { BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { HOUSE, HOUSE_TOP, STARLINK_POSITION } from "./house-dimensions"
import { buildSolarArrayGeometry } from "./solar-panel-geometry"
import { buildStarlinkPanelGeometry } from "./starlink-geometry"

/** Every panel the house wears — both flanks, the roof, the dish — one skin,
 *  one draw call. */
export function buildHouseSolarGeometry(): BufferGeometry {
  const {
    width: w,
    depth: d,
    lowerHeight: lh,
    upperHeight: uh,
    roofThickness: rt,
  } = HOUSE
  const parts: BufferGeometry[] = []

  for (const side of [-1, 1]) {
    const flank = buildSolarArrayGeometry(d - 0.9, uh - 0.8, 3, 2)
    flank.rotateY((side * Math.PI) / 2)
    flank.translate(side * (w / 2 + 0.17), lh + uh / 2, 0)
    parts.push(flank)
  }

  const roof = buildSolarArrayGeometry(w - 0.5, d - 0.5, 5, 3)
  roof.rotateX(-Math.PI / 2)
  roof.translate(0, HOUSE_TOP + rt + 0.05, 0)
  parts.push(roof)

  const dish = buildStarlinkPanelGeometry()
  dish.translate(...STARLINK_POSITION)
  parts.push(dish)

  return mergeGeometries(parts)
}
