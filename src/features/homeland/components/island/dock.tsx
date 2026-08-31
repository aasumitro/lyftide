import { useMemo } from "react"
import {
  buildJettyDeckGeometry,
  buildJettyPostGeometry,
} from "@/lib/three/jetty-deck"
import { JETTY, buildJettyLayout } from "@/lib/three/jetty-layout"
import { DockLantern } from "./dock-lantern"

/** The jetty at EAST_DOCK. Posts reach the real seabed, sampled from terrain. */
export function Dock() {
  const layout = useMemo(() => buildJettyLayout(), [])
  const deck = useMemo(
    () => buildJettyDeckGeometry(layout.start, layout.end),
    [layout]
  )
  const posts = useMemo(() => buildJettyPostGeometry(layout), [layout])

  return (
    <group position={[0, 0, JETTY.z]}>
      <mesh
        geometry={deck}
        position={[0, JETTY.deckHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#a58e6c" roughness={0.92} />
      </mesh>
      <mesh geometry={posts} castShadow receiveShadow>
        <meshStandardMaterial color="#6b5842" roughness={0.95} />
      </mesh>

      <DockLantern x={layout.end - 1.4} y={JETTY.deckHeight + 1.2} z={0} />
      <DockLantern x={layout.start + 1.6} y={JETTY.deckHeight + 1.2} z={0} />
    </group>
  )
}
