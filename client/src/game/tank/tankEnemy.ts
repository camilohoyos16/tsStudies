import { GameObject, gameObjects } from "./tankGameObject"
import { vector2, vector2Normalize } from "./tankVectors"
import { currentPlayer } from "./tanksGame"
import * as draw from "../draw"
import { OBJECT_TAGS } from "./tankConstants"
import { runningContainer } from "./tankContainers"

const ENEMY_SPEED = 15

export const Enemy = (pathSprite: string) =>{
    const enemy = new class Enemy extends GameObject {
        currentSpeed = vector2(0, 0)
        moveDirection = vector2(0, 0)
        desiredDirection = vector2(0, 0)

        constructor() {
            super(pathSprite, (deltaTime) => {
                this.desiredDirection = vector2(
                    currentPlayer.position.x - this.position.x,
                    currentPlayer.position.y - this.position.y
                )

                this.desiredDirection = vector2Normalize(this.desiredDirection)
                this.currentSpeed = vector2(ENEMY_SPEED / deltaTime, ENEMY_SPEED / deltaTime)
                this.position.x += this.currentSpeed.x * this.desiredDirection.x
                this.position.y += this.currentSpeed.y * this.desiredDirection.y


                return () => {
                    const render = draw.circle(this.position.x, this.position.y, this.radius, 0xc11f1f)
                    runningContainer.addChild(render!)
                    return render
                }
            }, () => {
                const index = gameObjects.indexOf(this)
                gameObjects.splice(index, 1)
            })

            this.tags = [OBJECT_TAGS.ENEMY]
            this.setSize(40)
            this.setPosition(0, 0)
        }
    }

    return enemy
}