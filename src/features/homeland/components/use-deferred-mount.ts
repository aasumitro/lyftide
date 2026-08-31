import { useEffect, useState } from "react"

/**
 * Holds the canvas back for two frames so the loader is genuinely painted before
 * the island build takes the main thread. Mounting both at once means the
 * browser never gets a chance to show the loader at all.
 */
export function useDeferredMount(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      frame += 1
      if (frame < 2) requestAnimationFrame(tick)
      else setReady(true)
    }

    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  return ready
}
