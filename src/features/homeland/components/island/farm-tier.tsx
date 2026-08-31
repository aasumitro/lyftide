import type { BufferGeometry } from "three"
import { farmMaterials } from "./farm-materials"

type TierProps = {
  y: number
  colour: string
  tray: BufferGeometry
  crops: BufferGeometry
}

/** One growing deck. Each tier carries a different crop, hence its own colour. */
export function FarmTier({ y, colour, tray, crops }: TierProps) {
  return (
    <group position={[0, y, 0]}>
      <mesh
        geometry={tray}
        material={farmMaterials.tray}
        receiveShadow
        castShadow
      />
      <mesh geometry={crops} castShadow>
        <meshStandardMaterial color={colour} roughness={0.85} />
      </mesh>
    </group>
  )
}
