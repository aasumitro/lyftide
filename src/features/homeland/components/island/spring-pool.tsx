import { useMemo } from "react"
import { DoubleSide } from "three"
import { buildPlungeGeometry, buildSpillGeometry } from "@/lib/three/spill-mesh"
import { buildLakeSurfaceGeometry } from "@/lib/three/water-mesh"

/** The spring pool and the fall where it overflows. */
export function SpringPool() {
  const lake = useMemo(() => buildLakeSurfaceGeometry(), [])
  const spill = useMemo(() => buildSpillGeometry(), [])
  const plunge = useMemo(() => buildPlungeGeometry(), [])

  return (
    <group>
      <mesh geometry={lake} receiveShadow>
        <meshStandardMaterial
          color="#2f7382"
          roughness={0.07}
          metalness={0.3}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh geometry={spill}>
        <meshStandardMaterial
          color="#cfe6ea"
          roughness={0.18}
          transparent
          opacity={0.82}
          side={DoubleSide}
        />
      </mesh>
      <mesh geometry={plunge}>
        <meshStandardMaterial
          color="#eaf4f5"
          roughness={0.5}
          transparent
          opacity={0.72}
        />
      </mesh>
    </group>
  )
}
