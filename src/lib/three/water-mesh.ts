import { CircleGeometry, type BufferGeometry } from "three"
import { smoothstep } from "./math"
import { buildRibbon, type RibbonRow } from "./ribbon"
import { riverMouth, riverPoints } from "./river-path"
import { riverBed } from "./water-profile"
import { LAKE, RIVER_HALF_WIDTH } from "./water-routes"

/** The ribbon starts below the lip; the fall covers the drop above it. */
export const SPILL_END = 3

/** Spring pool surface: one flat ellipse at the water line. */
export function buildLakeSurfaceGeometry(): BufferGeometry {
  const disc = new CircleGeometry(1, 48)
  disc.rotateX(-Math.PI / 2)
  disc.scale(LAKE.radiusX * 0.97, 1, LAKE.radiusZ * 0.97)
  disc.translate(LAKE.x, LAKE.level, LAKE.z)
  return disc
}

/**
 * Stream surface, following the bed so the water runs downhill, and fanning out
 * where it reaches the sand — a stream that stops dead at the beach reads as a
 * cut-off ribbon rather than a mouth.
 */
export function buildRiverSurfaceGeometry(): BufferGeometry {
  const last = riverMouth
  const rows: RibbonRow[] = []

  for (let i = SPILL_END; i <= last; i++) {
    const point = riverPoints[i]
    const before = riverPoints[Math.max(SPILL_END, i - 1)]
    const after = riverPoints[Math.min(last, i + 1)]

    rows.push({
      x: point.x,
      y: riverBed[i] - 0.14,
      z: point.z,
      heading: Math.atan2(after.x - before.x, after.z - before.z),
      half: RIVER_HALF_WIDTH * 0.78 * (1 + 3 * smoothstep(last - 15, last, i)),
    })
  }

  return buildRibbon(rows)
}
