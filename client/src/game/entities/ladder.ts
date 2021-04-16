import { GameObject } from "../object"
import * as draw from "../draw"
import { OBJECT_TAGS } from "../../constants"

export const Ladder = (x: number, y: number, width: number, height: number) => {
  const ladder = new GameObject(() => {
    return () => {
      draw.rect(ladder.x, ladder.y, ladder.width, ladder.height, 0xffff00)
    }
  })

  ladder.setPosition(x, y)
  ladder.setSize(width, height)

  ladder.isTrigger = true
  ladder.tags = [OBJECT_TAGS.LADDER]
  ladder.depth = -1

  return ladder
}
