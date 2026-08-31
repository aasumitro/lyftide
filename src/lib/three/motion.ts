import type { Region } from "./wander"
import type { WanderField } from "./wander-field"

export type Motion = {
  region: Region
  field: WanderField
  /** 0 never stops, 1 spends most of its time standing. */
  settle: number
  keepDry: boolean
}
