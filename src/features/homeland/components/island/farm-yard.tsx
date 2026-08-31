import { farmMaterials } from "./farm-materials"

/** The working end of the plot: tool shed, water tank, stacked crates. A farm
 *  is equipment and clutter as much as it is plants. */
export function FarmYard() {
  return (
    <group>
      <mesh
        position={[7.6, 1.1, 5.4]}
        material={farmMaterials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.4, 2.2, 2]} />
      </mesh>
      <mesh
        position={[7.6, 2.32, 5.4]}
        material={farmMaterials.roof}
        castShadow
      >
        <boxGeometry args={[2.7, 0.24, 2.3]} />
      </mesh>

      <mesh position={[5.1, 1.35, 5.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 2.7, 14]} />
        <meshStandardMaterial
          color="#8d949b"
          roughness={0.45}
          metalness={0.55}
        />
      </mesh>

      {[
        [8.9, 0.3, 3.4, 0.2],
        [8.9, 0.9, 3.4, -0.15],
        [9.6, 0.3, 4.4, 0.5],
      ].map(([x, y, z, turn]) => (
        <mesh
          key={`${x}:${y}`}
          position={[x, y, z]}
          rotation={[0, turn, 0]}
          material={farmMaterials.timber}
          castShadow
        >
          <boxGeometry args={[0.8, 0.55, 0.8]} />
        </mesh>
      ))}
    </group>
  )
}
