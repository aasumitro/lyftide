import { useMemo } from "react"
import { buildLivestockGeometry } from "@/lib/three/animal-geometry"
import { buildFenceGeometry } from "@/lib/three/fence-ring"
import { site } from "@/lib/three/farm-sites"
import { padLevel } from "@/lib/three/pads"
import { AnimalHerd } from "./animal-herd"
import { Barn } from "./barn"
import { farmMaterials } from "./farm-materials"

/** The four-legged stock, kept in their own paddock well away from the birds. */
export function LivestockPen() {
  const spot = site("livestock")
  const hx = spot.halfX - 0.4
  const hz = spot.halfZ - 0.4

  const fence = useMemo(() => buildFenceGeometry(hx, hz, 1.35), [hx, hz])
  const beast = useMemo(() => buildLivestockGeometry(), [])

  return (
    <group
      position={[spot.x, padLevel("livestock"), spot.z]}
      rotation={[0, spot.rotation, 0]}
    >
      <mesh
        geometry={fence}
        material={farmMaterials.timber}
        castShadow
        receiveShadow
      />

      <AnimalHerd
        geometry={beast}
        material={farmMaterials.livestock}
        seed={3307}
        count={7}
        halfX={hx - 1}
        halfZ={hz - 1}
      />

      <Barn position={[-hx + 4.6, 0, -hz + 3]} />
    </group>
  )
}
