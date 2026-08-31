import { useLayoutEffect, useMemo, useRef } from "react"
import type { InstancedMesh } from "three"
import { applyPlacements } from "@/lib/three/instancing"
import { buildPalmFrondsGeometry } from "@/lib/three/palm-fronds"
import { buildPalmTrunkGeometry } from "@/lib/three/palm-geometry"
import { buildPalmGrove } from "@/lib/three/palm-layout"

/** Coconut palms along the beach line, per docs/pohon kelapa.png. */
export function Palms() {
  const grove = useMemo(() => buildPalmGrove(), [])
  const trunkGeometry = useMemo(() => buildPalmTrunkGeometry(), [])
  const frondGeometry = useMemo(() => buildPalmFrondsGeometry(), [])
  const trunks = useRef<InstancedMesh>(null)
  const fronds = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    if (!trunks.current || !fronds.current) return
    applyPlacements(trunks.current, grove)
    applyPlacements(fronds.current, grove)
  }, [grove])

  return (
    <group>
      <instancedMesh
        ref={trunks}
        args={[trunkGeometry, undefined, grove.length]}
        receiveShadow
      >
        <meshStandardMaterial color="#8a7250" roughness={0.92} />
      </instancedMesh>
      <instancedMesh
        ref={fronds}
        args={[frondGeometry, undefined, grove.length]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#5d8a34" roughness={0.82} />
      </instancedMesh>
    </group>
  )
}
