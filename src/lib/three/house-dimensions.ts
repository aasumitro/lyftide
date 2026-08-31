/** Minimalist house on SUMMIT. Local +Z looks out over the water. */
export const HOUSE = {
  width: 9.4,
  depth: 6.6,
  /** Matches the terrace cut, so the upper floor lands exactly at pad level. */
  lowerHeight: 3.6,
  upperHeight: 3.1,
  roofThickness: 0.32,
  /** How far out from the summit centre the building sits. */
  offset: 3.4,
}

export const doorPanel = { width: 4.2, height: HOUSE.upperHeight - 0.5 }

/** Derived once so every geometry builder agrees on the same floor levels. */
export const HOUSE_TOP = HOUSE.lowerHeight + HOUSE.upperHeight
export const RETAINING_HEIGHT = HOUSE.lowerHeight + 0.5
export const RETAINING_SIDE = HOUSE.width / 2 + 1.05

/** Relative to the house group — the corner of the roof the dish sits on. */
export const STARLINK_POSITION: [number, number, number] = [
  HOUSE.width / 2 - 1.2,
  HOUSE_TOP + HOUSE.roofThickness,
  -HOUSE.depth / 2 + 1,
]
