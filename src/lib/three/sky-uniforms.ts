import { Color, Vector3 } from "three"
import { fogColor, skyColor, sunColor } from "./atmosphere"
import type { WorldTime } from "./time"

export const createSkyUniforms = () => ({
  uTop: { value: new Color() },
  uHorizon: { value: new Color() },
  uGlow: { value: new Color() },
  uSunDirection: { value: new Vector3(1, 0, 0) },
  uSunVisible: { value: 1 },
})

export type SkyUniforms = ReturnType<typeof createSkyUniforms>

/** Written every frame. Kept out of the component so the uniforms are mutated
 *  through a call rather than assigned on a value the compiler treats as pure. */
export function updateSkyUniforms(
  uniforms: SkyUniforms,
  time: WorldTime
): void {
  skyColor(uniforms.uTop.value, time).multiplyScalar(0.82)
  fogColor(uniforms.uHorizon.value, time)
  sunColor(uniforms.uGlow.value, time)
  uniforms.uSunDirection.value.copy(time.elevation > 0 ? time.sun : time.moon)
  uniforms.uSunVisible.value = Math.max(time.day, 0.35)
}
