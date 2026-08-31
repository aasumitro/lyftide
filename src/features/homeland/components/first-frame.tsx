import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

/** Signals once the scene has actually drawn, not merely mounted. Two frames:
 *  the first can still land before the GPU has the whole scene. */
export function FirstFrame({ onReady }: { onReady: () => void }) {
  const seen = useRef(0)

  useFrame(() => {
    if (seen.current > 2) return
    seen.current += 1
    if (seen.current === 2) onReady()
  })

  return null
}
