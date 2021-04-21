import { GameObject, gameObjects } from "./tankGameObject"
import { vector2 } from "./vectors"
import { viewport } from "../viewport"
import * as draw from "../draw"

const BULLET_SPEED = -50

export const Bullet = () => new class Bullet extends GameObject{
    moveDirection = vector2(0, 0)
    currentSpeed = vector2(0, 0)

    constructor() {
        super((deltaTime) => {
            this.currentSpeed = vector2(BULLET_SPEED / deltaTime, BULLET_SPEED / deltaTime)
            this.position.x += this.currentSpeed.x  * this.moveDirection.x
            this.position.y += this.currentSpeed.y * this.moveDirection.y

            if (this.position.x < 0 || this.position.y < 0 || this.position.x > viewport.width || this.position.y > viewport.height) {
                this.destroy()
            }

            return () => {
                draw.circle(this.position.x, this.position.y, this.width, 0x85dd27)
            }
        }, () => {
            const index = gameObjects.indexOf(this)
            gameObjects.splice(index,1)
        })

        this.setSize(20, 20)
    }

    setMoveDirection(direction: {x: number, y: number}) {
        this.moveDirection = Object.assign(direction)
    }
} 