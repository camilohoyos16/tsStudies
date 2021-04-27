import { GameObject, gameObjects } from "./tankGameObject"
import { runningContainer } from "./tankContainers"
import { currentPlayer, onGameRestart } from "./tanksGame"
import { playerKillEnemy as playerKilledEnemy } from "./tankInterface"
import { vector2 } from "./tankVectors"
import { viewport } from "../viewport"
import { OBJECT_TAGS } from "./tankConstants"
import * as draw from "../draw"
import { Console } from "node:console"

const BULLET_SPEED = -50

export const Bullet = (pathSprite: string) => {
    const bullet = new class Bullet extends GameObject {
        moveDirection = vector2(0, 0)
        currentSpeed = vector2(0, 0)

        constructor() {
            super(pathSprite, (deltaTime) => {
                const collision = this.getObjectCollisions()

                if (collision?.tags.includes(OBJECT_TAGS.ENEMY)) {
                    this.destroy()
                    collision.destroy()

                    
                    currentPlayer.killedEnemy()
                    playerKilledEnemy()
                }

            
                this.currentSpeed = vector2(BULLET_SPEED / deltaTime, BULLET_SPEED / deltaTime)
                this.setPosition(
                    bullet.position.x + bullet.currentSpeed.x * bullet.moveDirection.x,
                    bullet.position.y + bullet.currentSpeed.y * bullet.moveDirection.y
                )

                this.checkBulletOffScreen()
            }, () => {
                runningContainer.removeChild(this.sprite)
                const index = gameObjects.indexOf(this)
                gameObjects.splice(index, 1)
            })
            
            this.setSize(45, 45)
            this.tags = [OBJECT_TAGS.BULLET]
            this.sprite.anchor.set(0.5, 0.5)

            onGameRestart(() => {
                runningContainer.removeChild(this.sprite)
            })
        }
    
        checkBulletOffScreen() {
            if (this.position.x < 0 || this.position.y < 0 || this.position.x > viewport.width || this.position.y > viewport.height) {
                this.destroy()
            }
        }

        setMoveDirection(direction: { x: number, y: number }) {
            this.moveDirection = Object.assign(direction)
        }
    }

    return bullet
} 