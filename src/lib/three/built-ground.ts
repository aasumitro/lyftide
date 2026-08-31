import { CAMPFIRE } from "./campfire-site"
import { smoothstep } from "./math"
import { SUMMIT, toHouseLocal } from "./summit"

/** Nothing grows where the house stands. Shared by every scatter, the same way
 *  the paths will be (D12) — otherwise trees sprout through the walls. */
export function builtGround(x: number, z: number): number {
  const [lx, lz] = toHouseLocal(x - SUMMIT.x, z - SUMMIT.z)
  const inside =
    Math.abs(lx) < SUMMIT.terraceWidth / 2 + 2 &&
    lz > -3 &&
    lz < SUMMIT.terraceDepth + 3
  if (inside) return 0

  // The fire clearing is kept open too.
  const toFire = Math.hypot(x - CAMPFIRE.x, z - CAMPFIRE.z)
  return smoothstep(CAMPFIRE.radius, CAMPFIRE.radius + 3, toFire)
}
