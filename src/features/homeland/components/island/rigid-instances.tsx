import { useLayoutEffect, useRef } from "react"
import type { BufferGeometry, InstancedMesh, Material } from "three"
import { applyUprightPlacements } from "@/lib/three/upright-instancing"
import type { Placement } from "@/lib/three/placement"

type RigidInstancesProps = {
  geometry: BufferGeometry
  material: Material
  placements: Placement[]
}

/** Identical built parts repeated at fixed positions — one draw call for as
 *  many copies as there are placements, no per-instance jitter (D9). */
export function RigidInstances({
  geometry,
  material,
  placements,
}: RigidInstancesProps) {
  const mesh = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    if (mesh.current) applyUprightPlacements(mesh.current, placements)
  }, [placements])

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, placements.length]}
      castShadow
      receiveShadow
    />
  )
}
