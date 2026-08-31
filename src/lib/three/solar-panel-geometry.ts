import { BoxGeometry, type BufferGeometry } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

const GAP = 0.06
const THICKNESS = 0.09

/**
 * A solar array as one merged mesh. Built from separate tiles with real gaps
 * rather than a flat slab: the seams are what make it read as panels at all.
 */
export function buildSolarArrayGeometry(
  width: number,
  height: number,
  columns: number,
  rows: number
): BufferGeometry {
  const tileWidth = (width - GAP * (columns - 1)) / columns
  const tileHeight = (height - GAP * (rows - 1)) / rows
  const tiles: BufferGeometry[] = []

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const tile = new BoxGeometry(tileWidth, tileHeight, THICKNESS)
      tile.translate(
        -width / 2 + tileWidth / 2 + column * (tileWidth + GAP),
        -height / 2 + tileHeight / 2 + row * (tileHeight + GAP),
        0
      )
      tiles.push(tile)
    }
  }

  return mergeGeometries(tiles)
}
