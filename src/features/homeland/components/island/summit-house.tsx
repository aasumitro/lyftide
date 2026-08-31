import { useFrame } from "@react-three/fiber"
import { useWorldTime } from "@/components/three/world-clock-context"
import { SUMMIT } from "@/lib/three/summit"
import { SUMMIT_PAD } from "@/lib/three/terrain"
import { houseMaterials } from "./house-materials"
import { HouseStructure } from "./house-structure"

/**
 * The dwelling on SUMMIT: ground floor cut into the rock behind a full glass
 * wall, an open upper floor, solar on every surface it can carry.
 */
export function SummitHouse() {
  const time = useWorldTime()

  useFrame(() => {
    // The house is the only warm light on the island once the sun is gone.
    const night = 1 - time.day
    houseMaterials.interior.emissiveIntensity = night * 1.5
    houseMaterials.glass.emissiveIntensity = night * 0.75
    houseMaterials.glass.opacity = 0.36 + night * 0.24
  })

  return (
    <group
      position={[SUMMIT.x, SUMMIT_PAD.terrace, SUMMIT.z]}
      rotation={[0, SUMMIT.yaw, 0]}
    >
      <HouseStructure />
    </group>
  )
}
