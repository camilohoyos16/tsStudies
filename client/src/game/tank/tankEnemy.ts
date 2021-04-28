import { currentPlayer, onGameRestart, enemies, checkRound } from "./tanksGame"
import { GameObject, gameObjects } from "./tankGameObject"
import { vector2, vector2Normalize } from "./tankVectors"
import { runningContainer } from "./tankContainers"
import { OBJECT_TAGS } from "./tankConstants"

const ENEMY_SPEED = 10
let currentEnemySpeed = ENEMY_SPEED

export function increaseEnemySpeed() {
    currentEnemySpeed += 2    
}

export const Enemy = (pathSprite: string, spawnPosition: {x: number, y: number}) =>{
    const enemy = new class Enemy extends GameObject {
        currentSpeed = 0
        moveDirection = vector2(0, 0)
        desiredDirection = vector2(0, 0)

        constructor() {
            super(pathSprite, (deltaTime) => {
                this.desiredDirection = vector2(
                    currentPlayer.position.x - this.position.x,
                    currentPlayer.position.y - this.position.y
                )

                this.desiredDirection = vector2Normalize(this.desiredDirection)
                this.currentSpeed = currentEnemySpeed / deltaTime
                
                this.setPosition(
                    enemy.position.x + enemy.currentSpeed * enemy.desiredDirection.x,
                    enemy.position.y + enemy.currentSpeed * enemy.desiredDirection.y
                )
            }, () => {
                runningContainer.removeChild(this.sprite)

                const index = gameObjects.indexOf(this)
                gameObjects.splice(index, 1)

                const indexEnemues = enemies.indexOf(this)
                enemies.splice(indexEnemues, 1)

                checkRound()
            })

            this.tags = [OBJECT_TAGS.ENEMY]
            this.setSize(60, 60)
            this.setPosition(spawnPosition.x, spawnPosition.y)
            this.sprite.anchor.set(0.5, 0.5)
            onGameRestart(() => {
                currentEnemySpeed = ENEMY_SPEED
                runningContainer.removeChild(this.sprite)
            })
        }
    }

    return enemy
}