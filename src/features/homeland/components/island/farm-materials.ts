import { MeshStandardMaterial } from "three"

/** One shared set of surfaces for every farm structure, defined at module scope
 *  so nothing animated is created during render. */
export const farmMaterials = {
  steel: new MeshStandardMaterial({
    color: "#c6cbd1",
    roughness: 0.4,
    metalness: 0.55,
  }),
  tray: new MeshStandardMaterial({
    color: "#8f959c",
    roughness: 0.55,
    metalness: 0.35,
  }),
  canopy: new MeshStandardMaterial({
    color: "#dfe9ef",
    roughness: 0.2,
    transparent: true,
    opacity: 0.42,
  }),
  timber: new MeshStandardMaterial({ color: "#9a7a52", roughness: 0.92 }),
  roof: new MeshStandardMaterial({ color: "#7a6449", roughness: 0.85 }),
  wall: new MeshStandardMaterial({ color: "#cbbfa6", roughness: 0.88 }),
  fowl: new MeshStandardMaterial({ color: "#e4ded2", roughness: 0.8 }),
  livestock: new MeshStandardMaterial({ color: "#8a6a52", roughness: 0.85 }),
}
