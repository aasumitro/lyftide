import { useFrame } from "@react-three/fiber"
import { useLayoutEffect, useMemo, useRef } from "react"
import { Fog, type ShaderMaterial } from "three"
import { buildOceanGeometry } from "@/lib/three/ocean-mesh"
import {
  createOceanUniforms,
  updateOceanUniforms,
} from "@/lib/three/ocean-uniforms"
import { oceanFragmentShader } from "@/lib/three/shaders/ocean-fragment"
import { oceanVertexShader } from "@/lib/three/shaders/ocean-vertex"
import { useWorldTime } from "./world-clock-context"

/** The sea. Shared with sailing and fishing — it must never be reimplemented. */
export function Ocean() {
  const time = useWorldTime()
  const material = useRef<ShaderMaterial>(null)
  const geometry = useMemo(() => buildOceanGeometry(), [])
  const uniforms = useMemo(() => createOceanUniforms(), [])

  // Assigned rather than passed as a prop: R3F copies the uniforms object on
  // apply, and the frame loop would then be writing to a detached one.
  useLayoutEffect(() => {
    if (material.current) material.current.uniforms = uniforms
  }, [uniforms])

  useFrame((state) => {
    const fog = state.scene.fog instanceof Fog ? state.scene.fog : null
    updateOceanUniforms(uniforms, time, state.clock.elapsedTime, fog)
  })

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
      />
    </mesh>
  )
}
