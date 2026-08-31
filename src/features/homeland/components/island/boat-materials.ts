import { MeshStandardMaterial } from "three"

/** Shared trim materials for the two boats — each hull keeps its own colour
 *  prop (D9 doesn't apply, there are only two), but repeated fittings share
 *  one material rather than declaring the same colour twice per file. */
export const boatMaterials = {
  dinghyTimber: new MeshStandardMaterial({ color: "#8a5f39", roughness: 0.92 }),
  cabin: new MeshStandardMaterial({ color: "#3d4a56", roughness: 0.7 }),
  spar: new MeshStandardMaterial({ color: "#d8d2c6", roughness: 0.5 }),
}
