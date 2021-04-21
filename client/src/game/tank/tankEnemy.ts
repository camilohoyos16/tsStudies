import { GameObject, gameObjects } from "./tankGameObject"
import { vector2, vector2Normalize } from "./tankVectors"
import { player } from "./tanksGame"
import * as draw from "../draw"
import { OBJECT_TAGS } from "./tankConstants"

const ENEMY_SPEED = 15

export const Enemy = () => new class Enemy extends GameObject {
    currentSpeed = vector2(0, 0)
    moveDirection = vector2(0, 0)
    desiredDirection = vector2(0, 0)

    constructor() {
        super((deltaTime) => {
            this.desiredDirection = vector2(
                player.position.x - this.position.x,
                player.position.y - this.position.y
            )

            this.desiredDirection = vector2Normalize(this.desiredDirection)
            this.currentSpeed = vector2(ENEMY_SPEED / deltaTime, ENEMY_SPEED / deltaTime)
            this.position.x += this.currentSpeed.x  * this.desiredDirection.x
            this.position.y += this.currentSpeed.y * this.desiredDirection.y


            return () => {
                draw.circle(this.position.x, this.position.y, this.radius, 0xc11f1f)
            }
        }, () => {
            const index = gameObjects.indexOf(this)
            gameObjects.splice(index, 1)
        })

        this.tags = [OBJECT_TAGS.ENEMY]
        this.setSize(40)
        this.setPosition(0, 0)
        //this.setPosition(player.position.x - 100, player.position.y - 100)
    }
}