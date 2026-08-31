import { BufferAttribute, BufferGeometry } from "three"

export type RibbonRow = {
  x: number
  y: number
  z: number
  /** Direction of travel; the row is laid across it. */
  heading: number
  half: number
}

/** A strip of quads through a run of rows. Shared by the stream and the fall. */
export function buildRibbon(rows: RibbonRow[]): BufferGeometry {
  const positions: number[] = []
  const indices: number[] = []

  rows.forEach((row, i) => {
    const across = Math.cos(row.heading) * row.half
    const along = Math.sin(row.heading) * row.half

    positions.push(
      row.x + across,
      row.y,
      row.z - along,
      row.x - across,
      row.y,
      row.z + along
    )

    if (i === 0) return
    const a = (i - 1) * 2
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  })

  const ribbon = new BufferGeometry()
  ribbon.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(positions), 3)
  )
  ribbon.setIndex(indices)
  ribbon.computeVertexNormals()
  return ribbon
}
