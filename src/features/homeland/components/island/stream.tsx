import { useMemo } from "react"
import { DoubleSide } from "three"
import { buildRiverSurfaceGeometry } from "@/lib/three/water-mesh"

/** The stream from the pool down to the sea, fanning out at its mouth. */
export function Stream() {
  const river = useMemo(() => buildRiverSurfaceGeometry(), [])

  return (
    <mesh geometry={river}>
      <meshStandardMaterial
        color="#3d8794"
        roughness={0.12}
        metalness={0.25}
        transparent
        opacity={0.86}
        side={DoubleSide}
      />
    </mesh>
  )
}
