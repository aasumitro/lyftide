import { createNoise2D, type NoiseFunction2D } from "simplex-noise"

/**
 * Seeded noise. The island must be identical on every reload (plan D3), so every
 * random stream here is explicitly seeded and never shared: giving each system its
 * own generator means adding trees cannot shift where the rocks land.
 */

export function makeRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function makeNoise(seed: number): NoiseFunction2D {
  return createNoise2D(makeRandom(seed))
}

/** Fractal brownian motion. Returns roughly -1..1. */
export function fbm(
  noise: NoiseFunction2D,
  x: number,
  y: number,
  octaves = 4,
  lacunarity = 2.07,
  gain = 0.5
): number {
  let amplitude = 1
  let frequency = 1
  let sum = 0
  let norm = 0

  for (let i = 0; i < octaves; i++) {
    sum += amplitude * noise(x * frequency, y * frequency)
    norm += amplitude
    amplitude *= gain
    frequency *= lacunarity
  }

  return sum / norm
}

/** Ridged noise — sharp crests, good for rock and cliff faces. */
export function ridge(noise: NoiseFunction2D, x: number, y: number): number {
  return 1 - Math.abs(noise(x, y))
}
