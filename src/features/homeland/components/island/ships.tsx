import { Dinghy } from "./dinghy"
import { SailingBoat } from "./sailing-boat"

/** Two boats at EAST_DOCK: one big enough to cross open water, one for the day. */
export function Ships() {
  return (
    <group>
      <SailingBoat />
      <Dinghy />
    </group>
  )
}
