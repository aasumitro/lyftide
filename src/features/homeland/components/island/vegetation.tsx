import { useLayoutEffect, useMemo, useRef } from "react"
import type { InstancedMesh } from "three"
import { applyPlacements } from "@/lib/three/instancing"
import {
  buildCanopyGeometry,
  buildTrunkGeometry,
} from "@/lib/three/tree-geometry"
import { canopyColour } from "@/lib/three/foliage-colour"
import { buildForest } from "@/lib/three/vegetation-layout"

export function Vegetation() {
  const forest = useMemo(() => buildForest(), [])
  const trunkGeometry = useMemo(() => buildTrunkGeometry(), [])
  const canopyGeometry = useMemo(() => buildCanopyGeometry(), [])
  const trunks = useRef<InstancedMesh>(null)
  const canopies = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    if (!trunks.current || !canopies.current) return
    applyPlacements(trunks.current, forest)
    applyPlacements(canopies.current, forest, canopyColour)
  }, [forest])

  return (
    <group>
      <instancedMesh
        ref={trunks}
        args={[trunkGeometry, undefined, forest.length]}
        receiveShadow
      >
        <meshStandardMaterial color="#5b4530" roughness={0.94} />
      </instancedMesh>
      <instancedMesh
        ref={canopies}
        args={[canopyGeometry, undefined, forest.length]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial roughness={0.86} />
      </instancedMesh>
    </group>
  )
}
