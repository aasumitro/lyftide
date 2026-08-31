import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { HOUSE } from "./house-dimensions"

/** The two inner walls seen through the glass — warm at night (D via
 *  houseMaterials.interior's emissive), never shadowed since they're indoors. */
export function buildHouseInteriorGeometry(): BufferGeometry {
  const { width: w, depth: d, lowerHeight: lh, upperHeight: uh } = HOUSE

  const lower = new BoxGeometry(w - 0.5, lh - 0.3, d - 1.4)
  lower.translate(0, lh / 2, -1.1)

  const upper = new BoxGeometry(w, uh, 0.3)
  upper.translate(0, lh + uh / 2, -d / 2 + 0.3)

  return mergeGeometries([lower, upper])
}
