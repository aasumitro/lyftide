import { FLAME_CONES } from "@/lib/three/flame-cones"
import { campfireMaterials } from "./campfire-materials"

/** The tongues of flame themselves. */
export function FlameCones() {
  return (
    <>
      {FLAME_CONES.map(([x, radius, height], index) => (
        <mesh
          key={index}
          material={campfireMaterials.flame}
          position={[x, height / 2 + 0.12, 0]}
        >
          <coneGeometry args={[radius, height, 7]} />
        </mesh>
      ))}
    </>
  )
}
