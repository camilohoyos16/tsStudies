import { updatePlayerScore as playerKilledEnemy } from "./tankInterface"
import { currentPlayer, onGameRestart } from "./tanksGame"
import { GameObject, gameObjects } from "./tankGameObject"
import { runningContainer } from "./tankContainers"
import { OBJECT_TAGS } from "./tankConstants"
import { vector2 } from "./tankVectors"
import { viewport } from "../viewport"

const BULLET_SPEED = -30
let currentBulletsSpeed = BULLET_SPEED

export function levelUpBulletSpeed() {
    currentBulletsSpeed -= 20
}

export const Bullet = (pathSprite: string) => {
    const bullet = new class Bullet extends GameObject {
        moveDirection = vector2(0, 0)
        currentSpeed = 0

        constructor() {
            super(pathSprite, (deltaTime) => {
                const collision = this.getObjectCollisions()

                if (collision?.tags.includes(OBJECT_TAGS.ENEMY)) {
                    this.destroy()
                    collision.destroy()

                    currentPlayer.killedEnemy()
                    playerKilledEnemy()
                }

            
                this.currentSpeed = currentBulletsSpeed / deltaTime
                this.setPosition(
                    bullet.position.x + bullet.currentSpeed * bullet.moveDirection.x,
                    bullet.position.y + bullet.currentSpeed * bullet.moveDirection.y
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
                currentBulletsSpeed = BULLET_SPEED
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