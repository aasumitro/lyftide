/** Filter tank and the intake pipe that reaches down into the pool. */
export function PumpPlant() {
  return (
    <group>
      <mesh position={[2.3, 1.35, 0.3]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 2.7, 12]} />
        <meshStandardMaterial color="#8d949b" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh
        position={[-2.6, 0.5, 0.6]}
        rotation={[0, 0, Math.PI / 2 - 0.35]}
        castShadow
      >
        <cylinderGeometry args={[0.16, 0.16, 5.4, 8]} />
        <meshStandardMaterial color="#5c6268" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}
