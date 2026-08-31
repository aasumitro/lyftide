import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AdditiveBlending, PointsMaterial } from "three"
import { starOpacity } from "@/lib/three/atmosphere"
import { buildStarField } from "@/lib/three/stars"
import { useWorldTime } from "./world-clock-context"

export function Stars() {
  const material = useRef<PointsMaterial>(null)
  const geometry = useMemo(() => buildStarField(), [])
  const time = useWorldTime()

  useFrame(() => {
    if (!material.current) return
    material.current.opacity = starOpacity(time)
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={material}
        size={7}
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
