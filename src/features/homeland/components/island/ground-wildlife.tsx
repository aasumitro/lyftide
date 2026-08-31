import type { BufferGeometry } from "three"
import type { Motion } from "@/lib/three/motion"
import { GROUND_SPECIES } from "@/lib/three/wildlife-region"
import { WanderingHerd } from "./wandering-herd"
import { wildlifeMaterials } from "./wildlife-materials"

type Props = {
  motion: Motion
  rabbit: BufferGeometry
  sheep: BufferGeometry
  chicken: BufferGeometry
}

/** Everything that walks the forest floor. */
export function GroundWildlife({ motion, rabbit, sheep, chicken }: Props) {
  return (
    <group>
      <WanderingHerd
        motion={{ ...motion, settle: GROUND_SPECIES.rabbit.settle }}
        seed={GROUND_SPECIES.rabbit.seed}
        count={GROUND_SPECIES.rabbit.count}
        speed={GROUND_SPECIES.rabbit.speed}
        geometry={rabbit}
        material={wildlifeMaterials.rabbit}
        gait="hop"
      />
      <WanderingHerd
        motion={{ ...motion, settle: GROUND_SPECIES.sheep.settle }}
        seed={GROUND_SPECIES.sheep.seed}
        count={GROUND_SPECIES.sheep.count}
        speed={GROUND_SPECIES.sheep.speed}
        geometry={sheep}
        material={wildlifeMaterials.sheep}
        gait="walk"
      />
      <WanderingHerd
        motion={{ ...motion, settle: GROUND_SPECIES.chicken.settle }}
        seed={GROUND_SPECIES.chicken.seed}
        count={GROUND_SPECIES.chicken.count}
        speed={GROUND_SPECIES.chicken.speed}
        geometry={chicken}
        material={wildlifeMaterials.chicken}
        gait="walk"
      />
    </group>
  )
}
