import { OBJECT_TAGS } from "src/constants"
import { vector2 } from "./vectors"

export const gameObjects: GameObject[] = []

export class GameObject{
    position = vector2(0, 0)
    width = 0
    height = 0
    update: (deltaTime: number) => void | (() => void)
    destroy: () => void | undefined

    constructor(
        update: ((deltaTime: number) => void | (() => void)),
        destroy?: () => void | undefined
    ) {
        this.update = update
        this.destroy = destroy || (() => { })
        gameObjects.push(this)
    }

    setPosition(x: number, y: number) {
        this.position = Object.assign(vector2(x, y))
    }

    setSize(width: number, height: number) {
        this.width = width
        this.height = height
    }
}

export function updateGameObjects(deltaTime: number) {
    const draws = []

  for (const gameObject of gameObjects) {
      const draw = gameObject.update(deltaTime)
      if (draw) draws.push(draw)
  }

  for (const draw of draws) draw()

}