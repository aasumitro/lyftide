import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AmbientLight, Color, DirectionalLight, HemisphereLight } from "three"
import {
  ambientIntensity,
  sunColor,
  sunIntensity,
} from "@/lib/three/atmosphere"
import { keyShadowProps } from "@/lib/three/shadow"
import { useWorldTime } from "./world-clock-context"

const KEY_DISTANCE = 340

/** The one shadow-casting light in the scene (plan D6). */
export function SunLight() {
  const key = useRef<DirectionalLight>(null)
  const ambient = useRef<AmbientLight>(null)
  const fill = useRef<HemisphereLight>(null)
  const time = useWorldTime()
  const tint = useMemo(() => new Color(), [])

  useFrame(() => {
    if (!key.current || !ambient.current || !fill.current) return

    // Once the sun is down the moon becomes the key light, so night still has form.
    const direction = time.elevation > 0 ? time.sun : time.moon
    key.current.position.copy(direction).multiplyScalar(KEY_DISTANCE)
    key.current.intensity = sunIntensity(time)
    key.current.color.copy(sunColor(tint, time))

    ambient.current.intensity = ambientIntensity(time)
    fill.current.intensity = ambientIntensity(time) * 1.45
  })

  return (
    <>
      <directionalLight ref={key} castShadow {...keyShadowProps} />
      <ambientLight ref={ambient} />
      <hemisphereLight ref={fill} args={["#9dc4f2", "#6b6152", 0.4]} />
    </>
  )
}
