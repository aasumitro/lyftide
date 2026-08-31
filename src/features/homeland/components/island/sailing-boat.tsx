import { JETTY } from "@/lib/three/jetty-layout"
import { boatMaterials } from "./boat-materials"
import { Ship } from "./ship"

/** The big boat: the one that could actually cross open water to the fishing
 *  grounds. Moored at the deep end of the jetty. */
export function SailingBoat() {
  return (
    <Ship
      x={93}
      z={JETTY.z + 8}
      heading={Math.PI / 2 + 0.04}
      length={16.5}
      beam={4.6}
      draft={2}
      colour="#e8e3d8"
    >
      <mesh position={[0, 2.5, -1.4]} material={boatMaterials.cabin} castShadow>
        <boxGeometry args={[3.2, 1.9, 5.2]} />
      </mesh>
      <mesh position={[0, 6.4, 1.2]} material={boatMaterials.spar} castShadow>
        <cylinderGeometry args={[0.13, 0.19, 9.4, 8]} />
      </mesh>
      <mesh
        position={[0, 2.6, -0.6]}
        rotation={[0, 0, Math.PI / 2]}
        material={boatMaterials.spar}
        castShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 4.6, 6]} />
      </mesh>
    </Ship>
  )
}
