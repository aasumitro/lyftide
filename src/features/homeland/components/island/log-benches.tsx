import { useMemo } from "react"
import { buildSeats } from "@/lib/three/log-bench-layout"
import { buildLogBenchGeometry } from "@/lib/three/log-bench-geometry"
import { campfireMaterials } from "./campfire-materials"

/** Three trunks laid round the fire, each sitting on its own patch of ground. */
export function LogBenches() {
  const bench = useMemo(() => buildLogBenchGeometry(), [])
  const seats = useMemo(() => buildSeats(), [])

  return (
    <group>
      {seats.map((seat) => (
        <mesh
          key={seat.angle}
          geometry={bench}
          material={campfireMaterials.bark}
          position={[seat.x, seat.drop, seat.z]}
          rotation={[0, -seat.angle + Math.PI / 2, 0]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  )
}
