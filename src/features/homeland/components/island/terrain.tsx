import { useMemo } from "react"
import { buildTerrainGeometry } from "@/lib/three/terrain-mesh"

export function Terrain() {
  const geometry = useMemo(() => buildTerrainGeometry(), [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.94} metalness={0} />
    </mesh>
  )
}
