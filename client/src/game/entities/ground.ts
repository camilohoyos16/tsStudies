import { GameObject } from "../object"
import * as draw from "../draw"
import { viewport } from "../viewport"

export const Ground = () => {
  const ground = new GameObject(() => {
    ground.x = viewport.x
    ground.width = viewport.width
    ground.height = 50

    return () => {
      draw.rect(ground.x, ground.y, ground.width, ground.height)
    }
  })

  ground.canCollide = true

  return ground
}
