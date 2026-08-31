import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Group, PointLight } from "three"
import { useWorldTime } from "@/components/three/world-clock-context"
import { campfireMaterials } from "./campfire-materials"
import { FlameCones } from "./flame-cones"

/** Only alight after dark. Everything here is driven by the world clock, so the
 *  fire keeps time with the sky rather than running on its own timer. */
export function FireFlames() {
  const flames = useRef<Group>(null)
  const light = useRef<PointLight>(null)
  const time = useWorldTime()

  useFrame((state) => {
    const night = 1 - time.day
    const t = state.clock.elapsedTime
    const flicker = 0.78 + Math.sin(t * 11) * 0.13 + Math.sin(t * 4.3) * 0.09

    campfireMaterials.flame.emissiveIntensity = night * flicker * 9
    campfireMaterials.ember.emissiveIntensity = night * 2.4
    if (light.current) light.current.intensity = night * flicker * 42
    if (flames.current) {
      flames.current.visible = night > 0.05
      flames.current.scale.setScalar(0.9 + flicker * 0.22)
    }
  })

  return (
    <group>
      <mesh material={campfireMaterials.ember} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.62, 0.7, 0.12, 12]} />
      </mesh>

      <group ref={flames}>
        <FlameCones />
      </group>

      <pointLight
        ref={light}
        position={[0, 0.9, 0]}
        color="#ff8a30"
        distance={26}
        decay={2}
      />
    </group>
  )
}
