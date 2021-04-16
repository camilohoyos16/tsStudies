import { Player, Ladder, Platform, Ground, Parallax } from "../entities"
import { GameObject } from "../object"
import { viewport } from "../viewport"
import * as draw from "../draw"

export const platformTest = () => {
  Player()

  Platform(100, 800, 200, 10)
  Platform(100+140, 700, 200, 10)
  Platform(100+40, 800-200, 200, 10)
  Platform(100+280, 800, 200, 10)
  Platform(100+280-40, 800-200, 200, 10)

  Ladder(175+(25/2), 800-200, 25, 400)
  Ladder(175+280+(25/2), 800-200, 25, 400)

  Parallax({
    speed: 0.4, 
    width: 1000, 
    depth: -100,
  }, (x) => {
    draw.rect(x, 200, 250, 1000, 0x003355, 0.5)
  })

  {
    const parallax = Parallax({
      speed: 0.6, 
      width: 600, 
      depth: -102,
    }, (x) => {
      draw.rect(x, 400, 200, 1000, 0x002233, 0.3)
    })

    parallax.x = 400
  }

  {
    const parallax = Parallax({
      speed: 0.7, 
      width: 400, 
      depth: -103,
    }, (x) => {
      draw.rect(x, 600, 150, 1000, 0x002233, 0.3)
    })

    parallax.x = 200
  }

  const ground = Ground()
  ground.y = 950

  new GameObject(() => {
    viewport.y = ground.y + ground.height - viewport.height
  })
}