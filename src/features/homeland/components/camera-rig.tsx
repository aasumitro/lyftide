import { OrbitControls } from "@react-three/drei"
import { CAMERA_LIMITS, OPENING_CAMERA } from "@/lib/three/world"

/**
 * Orbit constrained so the shot is always a good one: the camera can never drop
 * below the waterline or climb to a flat top-down map view.
 */
export function CameraRig() {
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.45}
      zoomSpeed={0.6}
      autoRotate
      autoRotateSpeed={0.12}
      target={OPENING_CAMERA.target}
      {...CAMERA_LIMITS}
    />
  )
}
