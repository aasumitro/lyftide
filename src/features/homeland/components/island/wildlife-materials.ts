import { MeshStandardMaterial } from "three"

/** Module scope: nothing the frame loop touches may be created during render. */
export const wildlifeMaterials = {
  rabbit: new MeshStandardMaterial({ color: "#9c8c76", roughness: 0.9 }),
  sheep: new MeshStandardMaterial({ color: "#e7e2d7", roughness: 0.94 }),
  bird: new MeshStandardMaterial({ color: "#4c525b", roughness: 0.75 }),
  chicken: new MeshStandardMaterial({ color: "#c2955e", roughness: 0.85 }),
}
