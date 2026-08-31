import { LivestockPen } from "./livestock-pen"
import { PoultryPen } from "./poultry-pen"
import { VerticalFarm } from "./vertical-farm"

/** What the island grows and raises, all of it on the stream side of the hill
 *  and well back from the beach. */
export function Farmstead() {
  return (
    <group>
      <VerticalFarm />
      <PoultryPen />
      <LivestockPen />
    </group>
  )
}
