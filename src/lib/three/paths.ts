import { CatmullRomCurve3, Vector3 } from "three"
import { PATH_ROUTES, PATH_SAMPLES } from "./path-routes"

export const pathCurves = PATH_ROUTES.map((route, index) => {
  const points = route.map(([x, z]) => new Vector3(x, 0, z))
  const curve = new CatmullRomCurve3(points, false, "catmullrom", 0.35)
  return curve.getSpacedPoints(PATH_SAMPLES[index])
})

export type NearestPath = { distance: number; route: number; index: number }

/** Nearest point on any walkway, and where along it that point sits. */
export function nearestOnPath(x: number, z: number): NearestPath {
  let best: NearestPath = { distance: Infinity, route: 0, index: 0 }

  pathCurves.forEach((points, route) => {
    points.forEach((point, index) => {
      const d = (point.x - x) ** 2 + (point.z - z) ** 2
      if (d < best.distance) best = { distance: d, route, index }
    })
  })

  return { ...best, distance: Math.sqrt(best.distance) }
}

export const pathDistance = (x: number, z: number) =>
  nearestOnPath(x, z).distance
