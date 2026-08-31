import { useEffect, useState } from "react"
import { cn } from "@/lib/ui"

/**
 * Covers the canvas until the first frame is on screen. Building the island
 * blocks the main thread for about a second, so every moving part here animates
 * transform and opacity only, and asks for its own layer — those are the
 * properties Chrome can keep running on the compositor while JavaScript is stuck.
 */
export function LoadingVeil({ done }: { done: boolean }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!done) return
    const id = setTimeout(() => setGone(true), 800)
    return () => clearTimeout(id)
  }, [done])

  if (gone) return null

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-7",
        "bg-[#0b1526] transition-opacity duration-700",
        done && "opacity-0"
      )}
    >
      <div className="relative size-20">
        <div className="absolute inset-0 [animation:swell_2.6s_ease-in-out_infinite] rounded-full bg-[#ffc46b]/10" />
        <div className="absolute inset-2 rounded-full border border-[#ffc46b]/25" />
        <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-[#ffc46b] will-change-transform [animation-duration:2.2s]" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-heading text-2xl tracking-wide text-[#e8ecf2]">
          Homeland
        </p>
        <p className="text-sm text-[#e8ecf2]/45">Raising the island</p>
      </div>

      <div className="h-px w-44 overflow-hidden bg-[#e8ecf2]/10">
        <div className="h-full w-1/3 [animation:drift_1.7s_ease-in-out_infinite] bg-[#ffc46b]/70" />
      </div>
    </div>
  )
}
