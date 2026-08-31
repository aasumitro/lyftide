import { Vector4 } from "three"

/** The one wave table (plan D5): GLSL reads it via `waveUniform`, the CPU via
 * `waveHeight`. Anything that floats uses the sampler, never its own guess. */

export type Wave = {
  direction: [number, number]
  steepness: number
  wavelength: number
}

export const WAVES: Wave[] = [
  { direction: [1, 0.31], steepness: 0.1, wavelength: 71 },
  { direction: [0.83, -0.56], steepness: 0.07, wavelength: 43 },
  { direction: [0.55, 0.84], steepness: 0.055, wavelength: 24.5 },
  { direction: [-0.37, 0.93], steepness: 0.04, wavelength: 13.3 },
  { direction: [0.94, 0.35], steepness: 0.03, wavelength: 7.1 },
  { direction: [-0.78, -0.63], steepness: 0.022, wavelength: 4.3 },
]

const GRAVITY = 9.81

/** Direction, wavenumber and phase speed, derived once per wave rather than
 *  reallocated on every `waveHeight` call — boats sample this every frame. */
const WAVE_TERMS = WAVES.map((wave) => {
  const [x, z] = wave.direction
  const size = Math.hypot(x, z)
  const k = (Math.PI * 2) / wave.wavelength
  return { dx: x / size, dz: z / size, k, speed: Math.sqrt(GRAVITY / k) }
})

export const waveUniform = () =>
  WAVES.map((wave, i) => {
    const { dx, dz } = WAVE_TERMS[i]
    return new Vector4(dx, dz, wave.steepness, wave.wavelength)
  })

/** Surface height at a world position. Gerstner waves also move points
 *  horizontally, so this samples the undisplaced column — close enough for a
 *  floating hull, and it is the same table the shader draws. */
export function waveHeight(x: number, z: number, time: number): number {
  let height = 0

  for (let i = 0; i < WAVES.length; i++) {
    const wave = WAVES[i]
    const { dx, dz, k, speed } = WAVE_TERMS[i]
    height +=
      (wave.steepness / k) * Math.sin(k * (dx * x + dz * z - speed * time))
  }

  return height
}
