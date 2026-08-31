import { BoxGeometry, SphereGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** A bird: body, head, beak, two legs. Small enough that silhouette is all of it. */
export function buildFowlGeometry(): BufferGeometry {
  const body = new SphereGeometry(0.19, 7, 5)
  body.scale(1, 0.92, 1.35)
  body.translate(0, 0.26, 0)

  const head = new SphereGeometry(0.1, 6, 5)
  head.translate(0, 0.45, 0.17)

  const beak = new BoxGeometry(0.05, 0.05, 0.1)
  beak.translate(0, 0.44, 0.29)

  const legs = [-0.07, 0.07].map((x) => {
    const leg = new BoxGeometry(0.035, 0.16, 0.035)
    leg.translate(x, 0.08, 0)
    return leg
  })

  return mergeGeometries([body, head, beak, ...legs])
}

/** A four-legged animal: barrel body, neck, head, four legs. */
export function buildLivestockGeometry(): BufferGeometry {
  const body = new BoxGeometry(0.68, 0.72, 1.5)
  body.translate(0, 0.98, 0)

  const neck = new BoxGeometry(0.34, 0.36, 0.42)
  neck.translate(0, 1.16, 0.86)

  const head = new BoxGeometry(0.3, 0.3, 0.52)
  head.translate(0, 1.06, 1.16)

  const legs = [-0.24, 0.24].flatMap((x) =>
    [-0.52, 0.52].map((z) => {
      const leg = new BoxGeometry(0.15, 0.64, 0.15)
      leg.translate(x, 0.32, z)
      return leg
    })
  )

  return mergeGeometries([body, neck, head, ...legs])
}
