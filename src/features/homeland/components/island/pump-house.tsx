import { RoundedBox } from "@react-three/drei"
import { useMemo } from "react"
import { MeshStandardMaterial } from "three"
import { buildSolarArrayGeometry } from "@/lib/three/solar-panel-geometry"
import { terrainHeight } from "@/lib/three/terrain"
import { LAKE } from "@/lib/three/water-routes"
import { houseMaterials } from "./house-materials"
import { PumpPlant } from "./pump-plant"

const pumpHouseBody = new MeshStandardMaterial({
  color: "#b9b3a7",
  roughness: 0.85,
})

/** Where the spring is tapped: on the pool's uphill rim, the side facing the
 *  house. Pump and filter, so the water arrives ready to use. */
const SPOT: [number, number] = [LAKE.x + LAKE.radiusX * 1.32, LAKE.z - 2.4]

export function PumpHouse() {
  const ground = useMemo(() => terrainHeight(SPOT[0], SPOT[1]), [])
  const panels = useMemo(() => buildSolarArrayGeometry(2.6, 2, 3, 2), [])

  return (
    <group position={[SPOT[0], ground, SPOT[1]]} rotation={[0, -0.5, 0]}>
      <RoundedBox
        args={[3.2, 2.5, 2.6]}
        radius={0.08}
        position={[0, 1.25, 0]}
        material={pumpHouseBody}
        castShadow
        receiveShadow
      />

      <mesh
        geometry={panels}
        position={[0, 2.58, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={houseMaterials.solar}
        castShadow
      />

      <PumpPlant />
    </group>
  )
}
