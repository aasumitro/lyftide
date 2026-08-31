import { Campfire } from "./campfire"
import { Dock } from "./dock"
import { SpringPool } from "./spring-pool"
import { Stream } from "./stream"
import { Farmstead } from "./farmstead"
import { Gazebos } from "./gazebos"
import { Palms } from "./palms"
import { PumpHouse } from "./pump-house"
import { Ships } from "./ships"
import { StonePath } from "./stone-path"
import { SummitHouse } from "./summit-house"
import { Terrain } from "./terrain"
import { Undergrowth } from "./undergrowth"
import { Vegetation } from "./vegetation"
import { Wildlife } from "./wildlife"

/** The island itself. Parts are added phase by phase — see docs/PLAN.md. */
export function Island() {
  return (
    <group>
      <Terrain />
      <SpringPool />
      <Stream />
      <SummitHouse />
      <StonePath />
      <Vegetation />
      <Undergrowth />
      <Palms />
      <PumpHouse />
      <Dock />
      <Ships />
      <Gazebos />
      <Campfire />
      <Farmstead />
      <Wildlife />
    </group>
  )
}
