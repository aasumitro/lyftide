import { JETTY } from "@/lib/three/jetty-layout"
import { boatMaterials } from "./boat-materials"
import { Ship } from "./ship"

/** The small boat: thwarts and an oar, for a morning on the water. */
export function Dinghy() {
  return (
    <Ship
      x={80}
      z={JETTY.z + 4.3}
      heading={Math.PI / 2 - 0.14}
      length={6.4}
      beam={2}
      draft={0.75}
      colour="#b8823f"
    >
      {[-1.1, 0.5].map((z) => (
        <mesh
          key={z}
          position={[0, 0.44, z]}
          material={boatMaterials.dinghyTimber}
          castShadow
        >
          <boxGeometry args={[1.7, 0.1, 0.42]} />
        </mesh>
      ))}
      <mesh
        position={[0.75, 0.5, -0.4]}
        rotation={[0.2, 0, 0.35]}
        material={boatMaterials.dinghyTimber}
        castShadow
      >
        <boxGeometry args={[0.09, 0.09, 3.2]} />
      </mesh>
    </Ship>
  )
}
