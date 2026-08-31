import { CircleGeometry, type BufferGeometry } from "three"
import { lerp } from "./math"
import { buildRibbon, type RibbonRow } from "./ribbon"
import { riverPoints } from "./river-path"
import { riverBed } from "./water-profile"
import { SPILL_END } from "./water-mesh"
import { LAKE, RIVER_HALF_WIDTH } from "./water-routes"

const ROWS = 14

/** The overflow. The pool sits about three metres above the head of the stream
 *  and nothing else bridges that step. Y follows a parabola — the way water
 *  leaves a lip and then drops. */
export function buildSpillGeometry(): BufferGeometry {
  const head = riverPoints[0]
  const base = riverPoints[SPILL_END]

  // Start exactly on the pool's rim, not at the first stream sample — that sits
  // a metre outside the ellipse and leaves the fall hanging in mid air.
  const dx = head.x - LAKE.x
  const dz = head.z - LAKE.z
  const rim = 1 / Math.hypot(dx / LAKE.radiusX, dz / LAKE.radiusZ)
  const top = { x: LAKE.x + dx * rim, z: LAKE.z + dz * rim }

  const drop = LAKE.level - (riverBed[SPILL_END] - 0.14)
  const heading = Math.atan2(base.x - top.x, base.z - top.z)

  const rows: RibbonRow[] = []
  for (let r = 0; r <= ROWS; r++) {
    const t = r / ROWS
    rows.push({
      x: lerp(top.x, base.x, t),
      y: LAKE.level - drop * t * t,
      z: lerp(top.z, base.z, t),
      heading,
      half: lerp(RIVER_HALF_WIDTH * 1.05, RIVER_HALF_WIDTH * 0.58, t),
    })
  }

  return buildRibbon(rows)
}

/** Foam where the fall lands. */
export function buildPlungeGeometry(): BufferGeometry {
  const base = riverPoints[SPILL_END]
  const disc = new CircleGeometry(RIVER_HALF_WIDTH * 1.5, 20)
  disc.rotateX(-Math.PI / 2)
  disc.translate(base.x, riverBed[SPILL_END] - 0.06, base.z)
  return disc
}
