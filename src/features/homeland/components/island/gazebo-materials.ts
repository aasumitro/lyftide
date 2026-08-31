import { MeshStandardMaterial } from "three"

/** One shared set of surfaces for the picnic shelters. */
export const gazeboMaterials = {
  floor: new MeshStandardMaterial({ color: "#c2a279", roughness: 0.9 }),
  post: new MeshStandardMaterial({ color: "#8a6b47", roughness: 0.92 }),
  roof: new MeshStandardMaterial({
    color: "#7f6a4d",
    roughness: 0.88,
    flatShading: true,
  }),
  beam: new MeshStandardMaterial({ color: "#a5834f", roughness: 0.9 }),
}
