import { useMemo } from "react"
import { buildFowlGeometry } from "@/lib/three/animal-geometry"
import { buildBirdGeometry } from "@/lib/three/bird-geometry"
import { buildWanderField } from "@/lib/three/wander-field"
import { BIRD_FLOCK, WILDLIFE_REGION } from "@/lib/three/wildlife-region"
import {
  buildRabbitGeometry,
  buildSheepGeometry,
} from "@/lib/three/wildlife-geometry"
import { GroundWildlife } from "./ground-wildlife"
import { WanderingHerd } from "./wandering-herd"
import { wildlifeMaterials } from "./wildlife-materials"

const { x, z, radius } = WILDLIFE_REGION

/** Free-roaming animals deep in the woods — the island's larder. */
export function Wildlife() {
  const field = useMemo(() => buildWanderField(x, z, radius), [])
  const rabbit = useMemo(() => buildRabbitGeometry(), [])
  const sheep = useMemo(() => buildSheepGeometry(), [])
  const chicken = useMemo(() => buildFowlGeometry(), [])
  const bird = useMemo(() => buildBirdGeometry(), [])

  const ground = { region: WILDLIFE_REGION, field, settle: 0.9, keepDry: true }

  return (
    <group>
      <GroundWildlife
        motion={ground}
        rabbit={rabbit}
        sheep={sheep}
        chicken={chicken}
      />
      <WanderingHerd
        motion={{ ...ground, settle: BIRD_FLOCK.settle, keepDry: false }}
        seed={BIRD_FLOCK.seed}
        count={BIRD_FLOCK.count}
        speed={BIRD_FLOCK.speed}
        geometry={bird}
        material={wildlifeMaterials.bird}
        gait="fly"
      />
    </group>
  )
}
