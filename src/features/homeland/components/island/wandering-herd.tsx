import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import type { BufferGeometry, InstancedMesh, Material } from "three"
import type { Motion } from "@/lib/three/motion"
import { createWanderers } from "@/lib/three/wander"
import type { Gait } from "@/lib/three/gait"
import { applyWanderers } from "@/lib/three/wander-instancing"
import { stepWanderers } from "@/lib/three/wander-step"

type HerdProps = {
  geometry: BufferGeometry
  material: Material
  motion: Motion
  gait: Gait
  seed: number
  count: number
  speed: number
}

/** One species, roaming free. State lives in a plain array that lib functions
 *  mutate — the frame loop must not write to values created during render. */
export function WanderingHerd(props: HerdProps) {
  const { geometry, material, motion, gait, seed, count, speed } = props
  const mesh = useRef<InstancedMesh>(null)
  const herd = useMemo(
    () => createWanderers(seed, count, motion.region, speed),
    [seed, count, motion.region, speed]
  )

  useFrame((state, delta) => {
    if (!mesh.current) return
    stepWanderers(herd, motion, state.clock.elapsedTime, delta)
    applyWanderers(
      mesh.current,
      herd,
      motion.field,
      gait,
      state.clock.elapsedTime
    )
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      frustumCulled={false}
      castShadow
    />
  )
}
