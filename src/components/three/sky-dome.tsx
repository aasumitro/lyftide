import { useFrame, useThree } from "@react-three/fiber"
import { useLayoutEffect, useMemo, useRef } from "react"
import { BackSide, Fog, ShaderMaterial } from "three"
import { fogColor } from "@/lib/three/atmosphere"
import { skyFragmentShader, skyVertexShader } from "@/lib/three/shaders/sky"
import { createSkyUniforms, updateSkyUniforms } from "@/lib/three/sky-uniforms"
import { OCEAN_RADIUS } from "@/lib/three/world"
import { useWorldTime } from "./world-clock-context"

/** Gradient sky dome plus the distance fog that hides the edge of the ocean. */
export function SkyDome() {
  const material = useRef<ShaderMaterial>(null)
  const time = useWorldTime()
  const scene = useThree((state) => state.scene)

  const uniforms = useMemo(() => createSkyUniforms(), [])

  // Assigned rather than passed as a prop: R3F copies the uniforms object.
  useLayoutEffect(() => {
    if (material.current) material.current.uniforms = uniforms
  }, [uniforms])

  useFrame(() => {
    updateSkyUniforms(uniforms, time)

    if (!(scene.fog instanceof Fog)) return
    fogColor(scene.fog.color, time)
  })

  return (
    <>
      <mesh scale={OCEAN_RADIUS * 1.4} frustumCulled={false}>
        <sphereGeometry args={[1, 32, 24]} />
        <shaderMaterial
          ref={material}
          side={BackSide}
          depthWrite={false}
          vertexShader={skyVertexShader}
          fragmentShader={skyFragmentShader}
        />
      </mesh>
      <fog attach="fog" args={["#bdd6ea", 420, 2400]} />
    </>
  )
}
