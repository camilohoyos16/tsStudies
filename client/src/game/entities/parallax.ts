import { GameObject } from "../object"
import { viewport } from "../viewport"

/**
 * Draw repeating patterns based on adjusted viewport coordinates.
 */
export const Parallax = (
  { speed, width, depth }: {
    speed: number
    width: number
    depth: number
  },

  draw: (x: number, y: number) => void,
) => {
  const parallax = new GameObject(() => {
    return () => {
      const count = Math.ceil(viewport.width / width)
      const size = width * count
      const x = speed * viewport.x + Math.round(viewport.x * (1 - speed) / size) * size

      for (let i = -count * 1; i < count * 2; i++) {
        draw(x + (width * i) + parallax.x, parallax.y)
      }
    }
  })

  parallax.depth = depth

  return parallax
}