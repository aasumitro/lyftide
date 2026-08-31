import { farmMaterials } from "./farm-materials"

/** Translucent roof over the growing decks — shelter without shading them out. */
export function FarmCanopy({ halfX, halfZ }: { halfX: number; halfZ: number }) {
  return (
    <mesh position={[0, 5.05, 0]} material={farmMaterials.canopy}>
      <boxGeometry args={[halfX * 2 + 0.5, 0.1, halfZ * 2 + 0.5]} />
    </mesh>
  )
}
