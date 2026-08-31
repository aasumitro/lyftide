import { useMemo } from "react"
import { HOUSE } from "@/lib/three/house-dimensions"
import { buildHouseConcreteGeometry } from "@/lib/three/house-geometry-concrete"
import { buildHouseFrameGeometry } from "@/lib/three/house-geometry-frame"
import { buildHouseGlassGeometry } from "@/lib/three/house-geometry-glass"
import { buildHouseInteriorGeometry } from "@/lib/three/house-geometry-interior"
import { buildHouseSolarGeometry } from "@/lib/three/house-geometry-solar"
import { houseMaterials } from "./house-materials"

/** The whole dwelling as five meshes, one per material — concrete, interior,
 *  glass, frame, solar — instead of one per part (D10 still holds: the
 *  geometry math lives in lib/three, this file is composition only). */
export function HouseStructure() {
  const concrete = useMemo(() => buildHouseConcreteGeometry(), [])
  const interior = useMemo(() => buildHouseInteriorGeometry(), [])
  const glass = useMemo(() => buildHouseGlassGeometry(), [])
  const frame = useMemo(() => buildHouseFrameGeometry(), [])
  const solar = useMemo(() => buildHouseSolarGeometry(), [])

  return (
    <group position={[0, 0, HOUSE.offset]}>
      <mesh
        geometry={concrete}
        material={houseMaterials.concrete}
        castShadow
        receiveShadow
      />
      <mesh geometry={interior} material={houseMaterials.interior} />
      <mesh geometry={glass} material={houseMaterials.glass} />
      <mesh geometry={frame} material={houseMaterials.frame} castShadow />
      <mesh geometry={solar} material={houseMaterials.solar} castShadow />
    </group>
  )
}
