import { Color, Vector3, type Fog } from "three"
import { fogColor, sunColor } from "./atmosphere"
import type { WorldTime } from "./time"
import { buildSeabedTexture } from "./seabed-texture"
import { TERRAIN_SIZE } from "./terrain-mesh"
import { waveUniform } from "./waves"

export const SHALLOW_WATER = new Color("#3fb0a4")
export const DEEP_WATER = new Color("#0a3a5e")

export const createOceanUniforms = () => ({
  uTime: { value: 0 },
  uWaves: { value: waveUniform() },
  uSeabed: { value: buildSeabedTexture() },
  uTerrainSize: { value: TERRAIN_SIZE },
  uShallow: { value: new Color() },
  uDeep: { value: new Color() },
  uSunColour: { value: new Color() },
  uSunDirection: { value: new Vector3(1, 0, 0) },
  uFogColour: { value: new Color() },
  uFogNear: { value: 420 },
  uFogFar: { value: 2400 },
  uDaylight: { value: 1 },
})

export type OceanUniforms = ReturnType<typeof createOceanUniforms>

/** Written every frame. Kept out of the component so the uniforms are mutated
 *  through a call rather than assigned on a value the compiler treats as pure. */
export function updateOceanUniforms(
  uniforms: OceanUniforms,
  time: WorldTime,
  elapsed: number,
  fog: Fog | null
): void {
  const lit = 0.09 + 0.91 * time.day

  uniforms.uTime.value = elapsed
  uniforms.uDaylight.value = time.day
  uniforms.uShallow.value.copy(SHALLOW_WATER).multiplyScalar(lit)
  uniforms.uDeep.value.copy(DEEP_WATER).multiplyScalar(lit)
  uniforms.uSunDirection.value.copy(time.elevation > 0 ? time.sun : time.moon)
  sunColor(uniforms.uSunColour.value, time)
  fogColor(uniforms.uFogColour.value, time)

  if (!fog) return
  uniforms.uFogNear.value = fog.near
  uniforms.uFogFar.value = fog.far
}
