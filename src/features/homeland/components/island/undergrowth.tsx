import { useLayoutEffect, useMemo, useRef } from "react"
import type { InstancedMesh } from "three"
import { buildBushGeometry } from "@/lib/three/bush-geometry"
import { applyPlacements } from "@/lib/three/instancing"
import { canopyColour } from "@/lib/three/foliage-colour"
import { buildUndergrowth } from "@/lib/three/vegetation-layout"

export function Undergrowth() {
  const bushes = useMemo(() => buildUndergrowth(), [])
  const geometry = useMemo(() => buildBushGeometry(), [])
  const mesh = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    if (!mesh.current) return
    applyPlacements(mesh.current, bushes, canopyColour)
  }, [bushes])

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, undefined, bushes.length]}
      receiveShadow
    >
      <meshStandardMaterial roughness={0.9} />
    </instancedMesh>
  )
}
