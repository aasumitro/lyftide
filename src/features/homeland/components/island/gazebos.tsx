import { useMemo } from "react"
import { buildGazeboLayout } from "@/lib/three/gazebo-layout"
import {
  buildGazeboBeamGeometry,
  buildGazeboFloorGeometry,
  buildGazeboPostGeometry,
  buildGazeboRoofGeometry,
} from "@/lib/three/gazebo-geometry"
import { gazeboMaterials } from "./gazebo-materials"
import { RigidInstances } from "./rigid-instances"

/** Four picnic shelters, each part instanced across every gazebo rather than
 *  merged per-gazebo — they are identical, so one draw call per part (D9). */
export function Gazebos() {
  const layout = useMemo(() => buildGazeboLayout(), [])
  const floor = useMemo(() => buildGazeboFloorGeometry(), [])
  const post = useMemo(() => buildGazeboPostGeometry(), [])
  const roof = useMemo(() => buildGazeboRoofGeometry(), [])
  const beam = useMemo(() => buildGazeboBeamGeometry(), [])

  return (
    <group>
      <RigidInstances
        geometry={floor}
        material={gazeboMaterials.floor}
        placements={layout.shelters}
      />
      <RigidInstances
        geometry={post}
        material={gazeboMaterials.post}
        placements={layout.posts}
      />
      <RigidInstances
        geometry={roof}
        material={gazeboMaterials.roof}
        placements={layout.shelters}
      />
      <RigidInstances
        geometry={beam}
        material={gazeboMaterials.beam}
        placements={layout.shelters}
      />
    </group>
  )
}
