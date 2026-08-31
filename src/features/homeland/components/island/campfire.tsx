import { useMemo } from "react"
import {
  buildFireRingGeometry,
  buildFirewoodGeometry,
} from "@/lib/three/campfire-geometry"
import { CAMPFIRE } from "@/lib/three/campfire-site"
import { CAMPFIRE_YAW } from "@/lib/three/log-bench-layout"
import { terrainHeight } from "@/lib/three/terrain"
import { campfireMaterials } from "./campfire-materials"
import { FireFlames } from "./fire-flames"
import { LogBenches } from "./log-benches"

/** A fire pit above the south-west sand, with felled trunks to sit on. */
export function Campfire() {
  const ring = useMemo(() => buildFireRingGeometry(), [])
  const wood = useMemo(() => buildFirewoodGeometry(), [])
  const ground = useMemo(() => terrainHeight(CAMPFIRE.x, CAMPFIRE.z), [])

  return (
    <group
      position={[CAMPFIRE.x, ground, CAMPFIRE.z]}
      rotation={[0, CAMPFIRE_YAW, 0]}
    >
      <mesh
        geometry={ring}
        material={campfireMaterials.stone}
        castShadow
        receiveShadow
      />
      <mesh geometry={wood} material={campfireMaterials.wood} castShadow />
      <FireFlames />
      <LogBenches />
    </group>
  )
}
