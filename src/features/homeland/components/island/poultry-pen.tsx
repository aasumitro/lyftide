import { useMemo } from "react"
import { buildFowlGeometry } from "@/lib/three/animal-geometry"
import { buildFenceGeometry } from "@/lib/three/fence-ring"
import { site } from "@/lib/three/farm-sites"
import { padLevel } from "@/lib/three/pads"
import { Coop } from "./coop"
import { farmMaterials } from "./farm-materials"
import { FLOCKS } from "@/lib/three/poultry-flocks"
import { PoultryFlock } from "./poultry-flock"

/** Poultry, split down the middle: meat birds one side, layers the other. */
export function PoultryPen() {
  const spot = site("poultry")
  const hx = spot.halfX - 0.4
  const hz = spot.halfZ - 0.4

  const fence = useMemo(() => buildFenceGeometry(hx, hz, 1, true), [hx, hz])
  const fowl = useMemo(() => buildFowlGeometry(), [])

  return (
    <group
      position={[spot.x, padLevel("poultry"), spot.z]}
      rotation={[0, spot.rotation, 0]}
    >
      <mesh
        geometry={fence}
        material={farmMaterials.timber}
        castShadow
        receiveShadow
      />

      {FLOCKS.map(([seed, count, side]) => (
        <PoultryFlock
          key={seed}
          geometry={fowl}
          seed={seed}
          count={count}
          x={(side * hx) / 2}
          halfX={hx / 2}
          halfZ={hz}
        />
      ))}

      <Coop position={[hx - 1.9, 0, -hz + 1.6]} />
    </group>
  )
}
