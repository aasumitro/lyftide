import { CylinderGeometry, ConeGeometry, BoxGeometry } from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import type { BufferGeometry } from "three"

/** One picnic shelter's parts, local to its own origin — instanced across all
 *  four gazebos (D9) rather than merged per-gazebo, since the shape repeats. */

export const GAZEBO_POST_OFFSETS: [number, number][] = [
  [-1.7, -1.7],
  [1.7, -1.7],
  [-1.7, 1.7],
  [1.7, 1.7],
]

export function buildGazeboFloorGeometry(): BufferGeometry {
  const floor = new RoundedBoxGeometry(4.4, 0.22, 4.4, 2, 0.05)
  floor.translate(0, 0.12, 0)
  return floor
}

export function buildGazeboPostGeometry(): BufferGeometry {
  return new CylinderGeometry(0.11, 0.13, 2.5, 6)
}

export function buildGazeboRoofGeometry(): BufferGeometry {
  const roof = new ConeGeometry(3.5, 1.1, 4)
  roof.rotateY(Math.PI / 4)
  roof.translate(0, 2.9, 0)
  return roof
}

export function buildGazeboBeamGeometry(): BufferGeometry {
  const beam = new BoxGeometry(3.2, 0.16, 0.5)
  beam.translate(0, 0.62, -1.6)
  return beam
}
