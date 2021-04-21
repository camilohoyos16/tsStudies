import { OBJECT_TAGS } from "src/constants"
import { vector2 } from "./tankVectors"
import { collision } from "./tankCollisions"

export const gameObjects: GameObject[] = []

export class GameObject{
    position = vector2(0, 0)
    radius = 0
    tags: Array<string | number | symbol> = []

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

    setSize(radius: number) {
        this.radius = radius
    }

    getObjectCollisions() {
        for (const gameObject of gameObjects) {
            if(this != gameObject && collision(this, gameObject)) {
                return gameObject
            }
        }
        return null
    }

    getCenter() {
        return vector2(
            this.position.x + this.radius,
            this.position.y + this.radius
        )
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