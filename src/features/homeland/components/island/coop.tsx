import { useMemo } from "react"
import { buildCoopTimberGeometry } from "@/lib/three/coop-geometry"
import { farmMaterials } from "./farm-materials"

/** Hen house: raised off the ground, with a ramp up to the door. */
export function Coop({ position }: { position: [number, number, number] }) {
  const timber = useMemo(() => buildCoopTimberGeometry(), [])

  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      <mesh
        geometry={timber}
        material={farmMaterials.timber}
        castShadow
        receiveShadow
      />

      <mesh
        position={[0, 0.95, 0]}
        material={farmMaterials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.6, 1.1, 2]} />
      </mesh>

      <mesh position={[0, 1.72, 0]} material={farmMaterials.roof} castShadow>
        <boxGeometry args={[2.9, 0.5, 2.3]} />
      </mesh>
    </group>
  )
}
