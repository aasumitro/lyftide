import { Ocean } from "@/components/three/ocean"
import { PostEffects } from "@/components/three/post-effects"
import { SkyDome } from "@/components/three/sky-dome"
import { Stars } from "@/components/three/stars"
import { SunLight } from "@/components/three/sun-light"
import { WorldClock } from "@/components/three/world-clock"
import { CameraRig } from "./camera-rig"
import { Island } from "./island/island"

export function Scene() {
  return (
    <WorldClock>
      <SkyDome />
      <Stars />
      <SunLight />
      <CameraRig />
      <Island />
      <Ocean />
      <PostEffects />
    </WorldClock>
  )
}
