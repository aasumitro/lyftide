import { terrainHeight } from "./terrain"
import { LANDMARKS } from "./world"

export const JETTY = {
  z: LANDMARKS.EAST_DOCK[2],
  deckHeight: 2.1,
  width: 3.4,
}

export type JettyLayout = ReturnType<typeof buildJettyLayout>

/** Walks east from the dock until the water is deep enough to moor in, so the
 *  jetty is as long as the seabed requires rather than a guessed number. */
export function buildJettyLayout() {
  const { z } = JETTY
  // Start where the ground has dropped to deck level, or the landward end of
  // the jetty buries itself in the slope.
  let start = 40
  while (start < 120 && terrainHeight(start, z) > JETTY.deckHeight - 0.15)
    start += 0.5

  let end = start
  while (end < 140 && terrainHeight(end, z) > -3.4) end += 0.5

  const posts: [number, number][] = []
  for (let x = start + 1; x <= end; x += 3.6) {
    posts.push([x, terrainHeight(x, z)])
  }

  return { start: start - 1.2, end: end + 1.5, posts }
}
