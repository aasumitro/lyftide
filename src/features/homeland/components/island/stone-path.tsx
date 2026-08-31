import { useMemo } from "react"
import { buildPathStoneGeometry } from "@/lib/three/path-stones"

/** Polished stone walkways from the house to the beach and to the dock. Low
 *  roughness is the whole read of "licin": it catches the sun and the moon. */
export function StonePath() {
  const geometry = useMemo(() => buildPathStoneGeometry(), [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial color="#9a9791" roughness={0.24} metalness={0.08} />
    </mesh>
  )
}
