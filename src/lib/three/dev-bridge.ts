import type { RootState } from "@react-three/fiber"

declare global {
  interface Window {
    __world?: RootState
  }
}

/**
 * Dev-only handle on the R3F root, so the scene can be probed and captured from
 * outside React. Never attached in a production build.
 */
export function exposeWorld(state: RootState): void {
  if (import.meta.env.DEV) {
    window.__world = state
  }
}
