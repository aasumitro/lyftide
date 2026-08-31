import { createContext, useContext } from "react"
import type { WorldTime } from "@/lib/three/time"

/** Separate from the provider component so the file that exports <WorldClock>
 *  exports only a component, which is what fast refresh needs. */
export const WorldClockContext = createContext<WorldTime | null>(null)

export function useWorldTime(): WorldTime {
  const time = useContext(WorldClockContext)

  if (!time) {
    throw new Error("useWorldTime must be used inside <WorldClock>")
  }

  return time
}
