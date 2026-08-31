import type { BufferGeometry } from "three"

import { AnimalHerd } from "./animal-herd"
import { farmMaterials } from "./farm-materials"

type FlockProps = {
  geometry: BufferGeometry
  seed: number
  count: number
  x: number
  halfX: number
  halfZ: number
}

/** One compartment of birds. */
export function PoultryFlock({
  geometry,
  seed,
  count,
  x,
  halfX,
  halfZ,
}: FlockProps) {
  return (
    <group position={[x, 0, 0]}>
      <AnimalHerd
        geometry={geometry}
        material={farmMaterials.fowl}
        seed={seed}
        count={count}
        halfX={halfX}
        halfZ={halfZ}
      />
    </group>
  )
}
