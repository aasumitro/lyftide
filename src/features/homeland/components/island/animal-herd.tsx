import { useLayoutEffect, useMemo, useRef } from "react"
import type { BufferGeometry, InstancedMesh, Material } from "three"
import { scatterInPen } from "@/lib/three/animal-scatter"
import { applyUprightPlacements } from "@/lib/three/upright-instancing"

type HerdProps = {
  geometry: BufferGeometry
  material: Material
  seed: number
  count: number
  halfX: number
  halfZ: number
}

/** Animals loose inside a pen. */
export function AnimalHerd({
  geometry,
  material,
  seed,
  count,
  halfX,
  halfZ,
}: HerdProps) {
  const herd = useMemo(
    () => scatterInPen(seed, count, halfX, halfZ),
    [seed, count, halfX, halfZ]
  )
  const mesh = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    if (mesh.current) applyUprightPlacements(mesh.current, herd)
  }, [herd])

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, herd.length]}
      castShadow
      receiveShadow
    />
  )
}
