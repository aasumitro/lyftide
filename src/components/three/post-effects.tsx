import { EffectComposer, N8AO } from "@react-three/postprocessing"

/**
 * Screen-space ambient occlusion (naturalism rule 5) — the contact darkening
 * that makes trees and buildings read as sitting on the ground rather than
 * floating over it. N8AO specifically because it's built for this budget:
 * half-res sampling and a "performance" quality tier keep it affordable on
 * integrated graphics, unlike a default SSAO pass at full resolution.
 */
export function PostEffects() {
  return (
    <EffectComposer multisampling={4}>
      <N8AO
        halfRes
        screenSpaceRadius
        quality="performance"
        aoRadius={1.5}
        distanceFalloff={1}
        intensity={2}
      />
    </EffectComposer>
  )
}
