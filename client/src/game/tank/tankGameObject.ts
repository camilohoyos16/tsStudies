import { OBJECT_TAGS } from "src/constants"
import { vector2 } from "./tankVectors"
import { currentGameState } from "./tanksGame"
import { GAME_STATES } from "./tankConstants"
import { collision } from "./tankCollisions"
import { runningContainer } from "./tankContainers"
import * as draw from "../draw"
import * as PIXI from 'pixi.js'

export const gameObjects: GameObject[] = []

export class GameObject{
    position = vector2(0, 0)
    radius = 0
    tags: Array<string | number | symbol> = []
    sprite: PIXI.Sprite

    update: (deltaTime: number) => void | (() => void)
    destroy: () => void | undefined

    constructor(
        pathSprite: string,
        update: ((deltaTime: number) => void | (() => void)),
        destroy?: () => void | undefined
    ) {
        this.sprite = draw.sprite(0, 0, 0, 0, pathSprite)
        this.update = update
        this.destroy = destroy || (() => { })
        gameObjects.push(this)
    }

    setPosition(x: number, y: number) {
        this.position = Object.assign(vector2(x, y))
        this.sprite.position.set(this.position.x, this.position.y)
    }
    
    setSize(radius: number) {
        this.radius = radius
        this.sprite.width = radius
        this.sprite.height = radius
    }

    // setSprite(pathSprite: string) {
    //     (this.render).texture = "" as <PIXI.Sprite>
    // }

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
        let draw
        if (currentGameState === GAME_STATES.RUNNING) {
            draw = gameObject.update(deltaTime)
        }
        if (draw) draws.push(draw)
    }

    for (const draw of draws) draw()

}