import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, type ReactNode } from "react"
import type { Group } from "three"
import { floatOnWater } from "@/lib/three/floating"
import { buildHullGeometry } from "@/lib/three/ship-geometry"

type ShipProps = {
  x: number
  z: number
  heading: number
  length: number
  beam: number
  draft: number
  colour: string
  children?: ReactNode
}

/** A hull sitting in the water, riding the same waves the shader draws (D5). */
export function Ship(props: ShipProps) {
  const { x, z, heading, length, beam, draft, colour, children } = props
  const group = useRef<Group>(null)
  const hull = useMemo(
    () => buildHullGeometry(length, beam, draft),
    [length, beam, draft]
  )

  useFrame((state) => {
    if (!group.current) return
    const now = state.clock.elapsedTime
    floatOnWater(group.current, x, z, now, length, beam, heading)
  })

  return (
    <group ref={group}>
      <mesh geometry={hull} castShadow receiveShadow>
        <meshStandardMaterial color={colour} roughness={0.62} />
      </mesh>
      {children}
    </group>
  )
}
