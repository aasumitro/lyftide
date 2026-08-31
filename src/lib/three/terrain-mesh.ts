import { BufferAttribute, Color, PlaneGeometry } from "three"
import { terrainHeight } from "./terrain"
import { groundColour } from "./terrain-palette"

/** Extent of the terrain mesh. Beyond this the seabed is flat and the ocean covers it. */
export const TERRAIN_SIZE = 280
export const TERRAIN_SEGMENTS = 320

export function buildTerrainGeometry(): PlaneGeometry {
  const geometry = new PlaneGeometry(
    TERRAIN_SIZE,
    TERRAIN_SIZE,
    TERRAIN_SEGMENTS,
    TERRAIN_SEGMENTS
  )
  geometry.rotateX(-Math.PI / 2)

  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    position.setY(i, terrainHeight(position.getX(i), position.getZ(i)))
  }

  // PlaneGeometry is indexed, so shared vertices give smooth normals for free.
  geometry.computeVertexNormals()

  const normal = geometry.attributes.normal
  const colours = new Float32Array(position.count * 3)
  const colour = new Color()

  for (let i = 0; i < position.count; i++) {
    groundColour(
      colour,
      position.getX(i),
      position.getZ(i),
      position.getY(i),
      1 - normal.getY(i)
    )
    colours.set([colour.r, colour.g, colour.b], i * 3)
  }

  geometry.setAttribute("color", new BufferAttribute(colours, 3))
  geometry.computeBoundingSphere()
  return geometry
}
