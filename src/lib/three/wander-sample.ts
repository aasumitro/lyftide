import { RESOLUTION, type WanderField } from "./wander-field"

/** Bilinear read, so animals walk over a smooth surface rather than steps. */
function sample(
  field: WanderField,
  values: Float32Array,
  x: number,
  z: number
) {
  const limit = field.cols - 1.001
  const fx = Math.min(limit, Math.max(0, (x - field.x0) / RESOLUTION))
  const fz = Math.min(limit, Math.max(0, (z - field.z0) / RESOLUTION))
  const cx = Math.floor(fx)
  const cz = Math.floor(fz)
  const tx = fx - cx
  const tz = fz - cz
  const row0 = cz * field.cols
  const row1 = row0 + field.cols

  const top = values[row0 + cx] * (1 - tx) + values[row0 + cx + 1] * tx
  const bottom = values[row1 + cx] * (1 - tx) + values[row1 + cx + 1] * tx
  return top * (1 - tz) + bottom * tz
}

export const groundAt = (field: WanderField, x: number, z: number) =>
  sample(field, field.heights, x, z)

/** 1 where an animal can stand, 0 on water. */
export const drynessAt = (field: WanderField, x: number, z: number) =>
  sample(field, field.dry, x, z)
