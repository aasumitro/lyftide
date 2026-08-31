import { useState, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import { createWorldTime, updateWorldTime } from "@/lib/three/time"
import { WorldClockContext } from "./world-clock-context"

/**
 * Publishes the world clock (D11) to the scene. The value is a single mutable
 * object updated in place: consumers read it inside their own useFrame, so the
 * cycle never triggers a React re-render.
 */
export function WorldClock({ children }: { children: ReactNode }) {
  const [time] = useState(createWorldTime)

  // Negative priority: the clock is refreshed before anything reads it.
  useFrame(() => {
    updateWorldTime(time)
  }, -1000)

  return (
    <WorldClockContext.Provider value={time}>
      {children}
    </WorldClockContext.Provider>
  )
}
