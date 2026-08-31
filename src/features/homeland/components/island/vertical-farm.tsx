import { useMemo } from "react"
import { buildCropRowsGeometry, buildTrayGeometry } from "@/lib/three/farm-deck"
import { TIER_HEIGHTS, buildFarmFrameGeometry } from "@/lib/three/farm-frame"
import { site } from "@/lib/three/farm-sites"
import { padLevel } from "@/lib/three/pads"
import { FarmCanopy } from "./farm-canopy"
import { FarmYard } from "./farm-yard"
import { FieldBeds } from "./field-beds"
import { FarmTier } from "./farm-tier"
import { farmMaterials } from "./farm-materials"

/** A different crop on each deck. */
const CROPS = ["#6fae3f", "#a9b445", "#4d8f5e"]

/** Modern plantation: three stacked growing decks under one canopy. */
export function VerticalFarm() {
  const spot = site("plantation")
  // The growing house only takes the middle; the rest of the pad is field.
  const hx = 4.6
  const hz = 3.1

  const frame = useMemo(() => buildFarmFrameGeometry(hx, hz), [hx, hz])
  const tray = useMemo(() => buildTrayGeometry(hx, hz), [hx, hz])
  const crops = useMemo(() => buildCropRowsGeometry(hx, hz), [hx, hz])

  return (
    <group
      position={[spot.x, padLevel("plantation"), spot.z]}
      rotation={[0, spot.rotation, 0]}
    >
      <group position={[0, 0, -3]}>
        <mesh
          geometry={frame}
          material={farmMaterials.steel}
          castShadow
          receiveShadow
        />
        {TIER_HEIGHTS.map((y, i) => (
          <FarmTier key={y} y={y} colour={CROPS[i]} tray={tray} crops={crops} />
        ))}
        <FarmCanopy halfX={hx} halfZ={hz} />
      </group>

      <FieldBeds />
      <FarmYard />
    </group>
  )
}
