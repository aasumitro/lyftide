import { useMemo } from "react"
import { buildBedFrameGeometry } from "@/lib/three/farm-field"
import { buildBedCropGeometry } from "@/lib/three/farm-field-crops"
import { farmMaterials } from "./farm-materials"

/** Three crops in the open beds, so the plot is not one flat green. */
const CROPS = ["#5f9c3a", "#93a83c", "#3f7d4d"]

export function FieldBeds() {
  const frames = useMemo(() => buildBedFrameGeometry(), [])
  const crops = useMemo(() => CROPS.map((_, i) => buildBedCropGeometry(i)), [])

  return (
    <group>
      <mesh
        geometry={frames}
        material={farmMaterials.timber}
        castShadow
        receiveShadow
      />
      {crops.map((geometry, index) =>
        geometry ? (
          <mesh key={index} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial color={CROPS[index]} roughness={0.88} />
          </mesh>
        ) : null
      )}
    </group>
  )
}
