import { MeshStandardMaterial } from "three"

/** Module scope: the frame loop writes to these, so they must not be created
 *  during render. */
export const campfireMaterials = {
  stone: new MeshStandardMaterial({ color: "#7d7871", roughness: 0.95 }),
  wood: new MeshStandardMaterial({ color: "#5f4a34", roughness: 0.94 }),
  bark: new MeshStandardMaterial({ color: "#6d5540", roughness: 0.95 }),
  ember: new MeshStandardMaterial({
    color: "#2a1a10",
    emissive: "#ff5a1e",
    emissiveIntensity: 0,
    roughness: 1,
  }),
  flame: new MeshStandardMaterial({
    color: "#4a2408",
    emissive: "#ffb347",
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0.9,
  }),
}
