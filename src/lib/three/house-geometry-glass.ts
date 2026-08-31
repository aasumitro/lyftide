import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { HOUSE, doorPanel } from "./house-dimensions"

/** The seaward glass wall and the two sliding-door panels — one transparent
 *  surface, drawn once. */
export function buildHouseGlassGeometry(): BufferGeometry {
  const { width: w, depth: d, lowerHeight: lh } = HOUSE

  const wall = new BoxGeometry(w, lh - 0.3, 0.1)
  wall.translate(0, lh / 2, d / 2)

  const panels = [-2.55, -1.9].map((x, index) => {
    const panel = new BoxGeometry(doorPanel.width, doorPanel.height, 0.08)
    panel.translate(
      x,
      lh + doorPanel.height / 2 + 0.34,
      d / 2 - 0.08 + index * 0.15
    )
    return panel
  })

  return mergeGeometries([wall, ...panels])
}
