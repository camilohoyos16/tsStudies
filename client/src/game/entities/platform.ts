import { GameObject } from "../object"
import * as draw from "../draw"
import { OBJECT_TAGS } from "../../constants"

export const Platform = (x: number, y: number, width: number, height: number) => {
  const platform = new GameObject(() => {
    return () => {
      draw.rect(platform.x, platform.y, platform.width, platform.height)
    }
  })

  platform.setPosition(x, y)
  platform.setSize(width, height)

  platform.canCollide = true
  platform.tags = [OBJECT_TAGS.PLATFORM]

  return platform
}
