import { BoxGeometry, CylinderGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { JETTY, type JettyLayout } from "./jetty-layout"

const PLANK = 0.52
const GAP = 0.06

/** Deck built plank by plank and merged. The gaps are the point: one long box
 *  reads as a ramp, a run of planks reads as a jetty. One draw call either way. */
export function buildJettyDeckGeometry(
  start: number,
  end: number
): BufferGeometry {
  const parts: BufferGeometry[] = []

  for (let x = start; x < end; x += PLANK + GAP) {
    const plank = new BoxGeometry(PLANK, 0.16, JETTY.width)
    plank.translate(x + PLANK / 2, 0, 0)
    parts.push(plank)
  }

  for (const side of [-1, 1]) {
    const beam = new BoxGeometry(end - start, 0.26, 0.3)
    beam.translate((start + end) / 2, -0.2, (side * (JETTY.width - 0.4)) / 2)
    parts.push(beam)
  }

  return mergeGeometries(parts)
}

/** All the posts as a single mesh — 22 separate cylinders is 22 draw calls (D9). */
export function buildJettyPostGeometry(layout: JettyLayout): BufferGeometry {
  const posts = layout.posts.flatMap(([x, seabed]) =>
    [-1, 1].map((side) => {
      const height = JETTY.deckHeight - seabed + 0.4
      const post = new CylinderGeometry(0.19, 0.24, height, 7)
      post.translate(
        x,
        seabed + height / 2 - 0.2,
        (side * (JETTY.width - 0.5)) / 2
      )
      return post
    })
  )

  return mergeGeometries(posts)
}
