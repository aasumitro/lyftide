/**
 * Where the island farms. Chosen by searching the ground itself for the flattest
 * spots that are near the stream (irrigation) but well back from the beach —
 * every site here is 20 m or more inland.
 *
 * Pure 2D and pure constants: the terrain reads this, so it must read nothing back.
 */
export type FarmSite = {
  name: string
  x: number
  z: number
  halfX: number
  halfZ: number
  rotation: number
}

export const FARM_SITES: FarmSite[] = [
  { name: "plantation", x: -53, z: 7, halfX: 10.5, halfZ: 7, rotation: 0.22 },
  { name: "livestock", x: -52, z: 35, halfX: 8.5, halfZ: 6.5, rotation: 0.1 },
  { name: "poultry", x: -31, z: 33, halfX: 6, halfZ: 4.5, rotation: -0.32 },
]

export const site = (name: string): FarmSite => {
  const found = FARM_SITES.find((entry) => entry.name === name)
  if (!found) throw new Error(`unknown farm site: ${name}`)
  return found
}

/** How far past a pad edge the ground is graded back to its natural level. */
export const PAD_SHOULDER = 3.2

/** World position in a pad's own frame, measured from its centre. */
export function toPadLocal(
  pad: FarmSite,
  x: number,
  z: number
): [number, number] {
  const dx = x - pad.x
  const dz = z - pad.z
  const cos = Math.cos(pad.rotation)
  const sin = Math.sin(pad.rotation)
  return [Math.abs(dx * cos - dz * sin), Math.abs(dx * sin + dz * cos)]
}
