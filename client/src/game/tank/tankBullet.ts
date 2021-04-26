import { GameObject, gameObjects } from "./tankGameObject"
import { runningContainer } from "./tankContainers"
import { vector2 } from "./tankVectors"
import { viewport } from "../viewport"
import { OBJECT_TAGS } from "./tankConstants"
import * as draw from "../draw"

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
                }

            
                this.currentSpeed = vector2(BULLET_SPEED / deltaTime, BULLET_SPEED / deltaTime)
                this.setPosition(
                    bullet.position.x + bullet.currentSpeed.x * bullet.moveDirection.x,
                    bullet.position.y + bullet.currentSpeed.y * bullet.moveDirection.y
                )

                this.checkBulletOffScreen()

                return () => {
                    draw.circle(this.position.x, this.position.y, this.radius, 0x85dd27)
                }
            }, () => {
                runningContainer.removeChild(this.sprite)
                const index = gameObjects.indexOf(this)
                gameObjects.splice(index, 1)
            })
        
            this.setSize(45)
            this.tags = [OBJECT_TAGS.BULLET]
        }
    
        checkBulletOffScreen() {
            if (this.position.x < 0 || this.position.y < 0 || this.position.x > viewport.width || this.position.y > viewport.height) {
                this.destroy()
            }
        }

        checkBulletCollision() {
        
        }

        setMoveDirection(direction: { x: number, y: number }) {
            this.moveDirection = Object.assign(direction)
        }
    }

    return bullet
} 