import { currentGameState } from "./tanksGame"
import { GAME_STATES } from "./tankConstants"
import { collision } from "./tankCollisions"
import { vector2 } from "./tankVectors"
import { Sprite } from "../pixi"
import * as draws from "../draw"

export const gameObjects: GameObject[] = []

export class GameObject{
    position = vector2(0, 0)
    width = 0
    height = 0
    tags: Array<string | number | symbol> = []
    sprite: Sprite

    update: (deltaTime: number) => void | (() => void)
    destroy: () => void | undefined

    constructor(
        pathSprite: string,
        update: ((deltaTime: number) => void | (() => void)),
        destroy?: () => void | undefined
    ) {
        this.sprite = draws.sprite(0, 0, 0, 0, pathSprite)
        this.update = update
        this.destroy = destroy || (() => { })
        gameObjects.push(this)
    }

    setPosition(x: number, y: number) {
        this.position = Object.assign(vector2(x, y))
        this.sprite.position.set(this.position.x, this.position.y)
    }
    
    setSize(width: number, height: number) {
        this.width = width
        this.height = height
        this.sprite.width = width
        this.sprite.height = height
    }

    setSprite(pathSprite: string) {
        this.sprite.texture = draws.getTexture(pathSprite)
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
            this.position.x,
            this.position.y
        )
    }
}

export function resetGameObjects() {
    gameObjects.length = 0
}

export function updateGameObjects(deltaTime: number) {
    const draws = []

    for (const gameObject of gameObjects) {
        let draw 
        if (currentGameState === GAME_STATES.RUNNING) {
            draw = gameObject.update(deltaTime)
        }
        if (draw) draws.push(draw)
    }

    for (const draw of draws) draw()
}