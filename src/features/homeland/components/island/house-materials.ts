import { MeshStandardMaterial } from "three"

/** One shared set of materials for the house — minimalist means few surfaces. */
export const houseMaterials = {
  concrete: new MeshStandardMaterial({ color: "#c3bdb2", roughness: 0.88 }),
  frame: new MeshStandardMaterial({
    color: "#25282c",
    roughness: 0.42,
    metalness: 0.55,
  }),
  solar: new MeshStandardMaterial({
    color: "#0e1626",
    roughness: 0.22,
    metalness: 0.78,
  }),
  interior: new MeshStandardMaterial({
    color: "#6d6155",
    roughness: 0.9,
    emissive: "#ffb861",
    emissiveIntensity: 0,
  }),
  glass: new MeshStandardMaterial({
    color: "#7fa9bd",
    roughness: 0.04,
    metalness: 0.72,
    transparent: true,
    opacity: 0.36,
    emissive: "#ffcf8a",
    emissiveIntensity: 0,
  }),
}
