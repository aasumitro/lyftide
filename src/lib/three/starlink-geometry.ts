import { BoxGeometry, CylinderGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** Pole, base ring and dish mount all read as one frame material — merged
 *  into a single draw call. The solar panel keeps its own material. */
export function buildStarlinkFrameGeometry(): BufferGeometry {
  const pole = new CylinderGeometry(0.07, 0.09, 0.56, 8)
  pole.translate(0, 0.28, 0)

  const base = new CylinderGeometry(0.22, 0.26, 0.08, 10)
  base.translate(0, 0.04, 0)

  const mount = new BoxGeometry(0.5, 0.06, 0.78)
  mount.translate(0, -0.05, 0)
  mount.rotateY(0.5)
  mount.rotateX(-0.42)
  mount.translate(0, 0.62, 0)

  return mergeGeometries([pole, base, mount])
}

export function buildStarlinkPanelGeometry(): BufferGeometry {
  const panel = new BoxGeometry(0.62, 0.05, 0.94)
  panel.rotateY(0.5)
  panel.rotateX(-0.42)
  panel.translate(0, 0.62, 0)
  return panel
}
