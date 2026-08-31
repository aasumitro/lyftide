import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import { ACESFilmicToneMapping } from "three"
import { exposeWorld } from "@/lib/three/dev-bridge"
import { OPENING_CAMERA } from "@/lib/three/world"
import { FirstFrame } from "./components/first-frame"
import { LoadingVeil } from "./components/loading-veil"
import { Scene } from "./components/scene"
import { useDeferredMount } from "./components/use-deferred-mount"

// Stable references: an inline object literal here changes identity on every
// re-render (e.g. the `drawn` state flip). Not required for correctness, but
// avoids R3F re-running renderer setup work for no reason.
// Antialiasing now comes from EffectComposer's multisampling (PostEffects),
// so the renderer's own is redundant cost.
const GL_CONFIG = { antialias: false, toneMapping: ACESFilmicToneMapping }
const CANVAS_CAMERA = {
  position: OPENING_CAMERA.position,
  fov: OPENING_CAMERA.fov,
  near: 1,
  far: 8000,
}

export function Homeland() {
  const mounted = useDeferredMount()
  const [drawn, setDrawn] = useState(false)

  return (
    <div className="relative h-dvh w-full bg-[#0b1526]">
      {mounted && (
        <Canvas
          shadows="percentage"
          onCreated={exposeWorld}
          dpr={[1, 2]}
          gl={GL_CONFIG}
          camera={CANVAS_CAMERA}
        >
          <Scene />
          <FirstFrame onReady={() => setDrawn(true)} />
        </Canvas>
      )}

      <LoadingVeil done={drawn} />
    </div>
  )
}
