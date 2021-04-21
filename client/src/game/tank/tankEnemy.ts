import { GameObject } from "./tankGameObject"
import { vector2, vector2Normalize } from "./vectors"
import { player } from "./tanksGame"
import * as draw from "../draw"

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
                draw.circle(this.position.x, this.position.y, this.width, 0xc11f1f)
            }
        })
        this.setSize(40, 40)
        this.setPosition(0, 0)
    }
}