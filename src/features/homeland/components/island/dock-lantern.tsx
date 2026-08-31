import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { MeshStandardMaterial, type PointLight } from "three"
import { useWorldTime } from "@/components/three/world-clock-context"

/** Shared at module scope: both lanterns burn together, and a material created
 *  during render must not be mutated from the frame loop. */
const lampGlass = new MeshStandardMaterial({
  color: "#3a3228",
  emissive: "#ffb457",
  emissiveIntensity: 0,
})

/** The second light on the island after dark. Without it the harbour vanishes
 *  for half of every cycle and the dock stops reading as a place. */
export function DockLantern({ x, y, z }: { x: number; y: number; z: number }) {
  const time = useWorldTime()
  const light = useRef<PointLight>(null)

  useFrame(() => {
    const night = 1 - time.day
    lampGlass.emissiveIntensity = night * 4
    if (light.current) light.current.intensity = night * 26
  })

  return (
    <group position={[x, y, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.09, 2.4, 6]} />
        <meshStandardMaterial color="#5c4c38" roughness={0.9} />
      </mesh>
      <mesh material={lampGlass} position={[0, 1.42, 0]}>
        <boxGeometry args={[0.34, 0.44, 0.34]} />
      </mesh>
      <pointLight
        ref={light}
        position={[0, 1.42, 0]}
        color="#ffb457"
        distance={26}
        decay={2}
      />
    </group>
  )
}
