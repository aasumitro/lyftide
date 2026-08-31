import { useMemo } from "react"
import { buildBarnTimberGeometry } from "@/lib/three/barn-geometry"
import { farmMaterials } from "./farm-materials"

/** Open shelter: a back wall, posts and a roof — animals walk in and out. */
export function Barn({ position }: { position: [number, number, number] }) {
  const timber = useMemo(() => buildBarnTimberGeometry(), [])

  return (
    <group position={position} rotation={[0, -0.2, 0]}>
      <mesh
        position={[0, 1.3, -1.6]}
        material={farmMaterials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6, 2.6, 0.22]} />
      </mesh>

      <mesh
        geometry={timber}
        material={farmMaterials.timber}
        castShadow
        receiveShadow
      />

      <mesh
        position={[0, 2.8, 0]}
        rotation={[-0.16, 0, 0]}
        material={farmMaterials.roof}
        castShadow
      >
        <boxGeometry args={[6.6, 0.24, 4]} />
      </mesh>
    </group>
  )
}
