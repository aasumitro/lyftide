import { BoxGeometry, SphereGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

/** Rabbit: crouched body, upright ears — the ears are the whole read at distance. */
export function buildRabbitGeometry(): BufferGeometry {
  const body = new SphereGeometry(0.17, 7, 5)
  body.scale(1, 0.9, 1.4)
  body.translate(0, 0.17, 0)

  const head = new SphereGeometry(0.1, 6, 5)
  head.translate(0, 0.28, 0.19)

  const ears = [-0.05, 0.05].map((x) => {
    const ear = new BoxGeometry(0.045, 0.19, 0.06)
    ear.rotateX(-0.2)
    ear.translate(x, 0.42, 0.16)
    return ear
  })

  const tail = new SphereGeometry(0.06, 5, 4)
  tail.translate(0, 0.19, -0.22)

  return mergeGeometries([body, head, ...ears, tail])
}

/** Sheep or goat: a woolly barrel on short legs. */
export function buildSheepGeometry(): BufferGeometry {
  const parts = [-0.2, 0.1, 0.4].map((z, i) => {
    const lump = new SphereGeometry(0.35 - i * 0.03, 7, 5)
    lump.scale(1, 0.92, 1)
    lump.translate(0, 0.62, z - 0.1)
    return lump
  })

  const head = new BoxGeometry(0.2, 0.22, 0.3)
  head.translate(0, 0.6, 0.62)

  const legs = [-0.16, 0.16].flatMap((x) =>
    [-0.24, 0.26].map((z) => {
      const leg = new BoxGeometry(0.09, 0.4, 0.09)
      leg.translate(x, 0.2, z)
      return leg
    })
  )

  return mergeGeometries([...parts, head, ...legs])
}
