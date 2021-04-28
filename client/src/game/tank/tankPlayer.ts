import { OBJECT_TAGS, IMAGES, GAME_STATES } from "./tankConstants"
import { changeGameState, currentGameState } from "./tanksGame"
import { GameObject, gameObjects } from "./tankGameObject"
import { vector2, vector2Normalize } from "./tankVectors"
import { runningContainer } from "./tankContainers"
import { Bullet } from "./tankBullet"
import { viewport } from "../viewport"
import { keyboard } from "../input"
import * as draw from "../draw"
import { KEYBINDS } from "../../../../config"

const PLAYER_SPEED = 30
let currentPlayerSpeed = PLAYER_SPEED

export function levelUpPlayerSpeed() {
    currentPlayerSpeed += 10
}

const AIM_OFFSET_WITH_PLAYER = 50
const INITIAL_LIVES = 3

export const player = (pathSprite: string) => {
    const newPlayer = new Player(pathSprite,(deltaTime) => {
        newPlayer.currentSpeed = currentPlayerSpeed / deltaTime
        newPlayer.setPosition(
            newPlayer.position.x + newPlayer.currentSpeed * newPlayer.moveDirection.x,
            newPlayer.position.y + newPlayer.currentSpeed * newPlayer.moveDirection.y
        )

        // newPlayer.setPosition(
        //     newPlayer.mousePosition.x,
        //     newPlayer.mousePosition.y
        // )

        const collision = newPlayer.getObjectCollisions()


        if (collision?.tags.includes(OBJECT_TAGS.ENEMY)) {
            collision.destroy()
            newPlayer.currentLifes --
        }

        if (newPlayer.currentLifes <= 0) {
            changeGameState(GAME_STATES.GAMEOVER)
        }

        newPlayer.aimDirection = vector2(
            newPlayer.position.x - newPlayer.mousePosition.x,
            newPlayer.position.y - newPlayer.mousePosition.y
        )

        newPlayer.aimDirection = vector2Normalize(newPlayer.aimDirection)

        return () => {
            newPlayer.drawAimTarget()
        }
    })
    return newPlayer
}

export class Player extends GameObject{
    moveDirection = vector2(0, 0)
    mousePosition = vector2(0, 0)
    currentLifes: number
    maxLifes: number
    score: number

    /**
    *@property It is Normalized
    */
    aimDirection = vector2(0, 0)
    aimTargetPosition = vector2(0, 0)

    currentSpeed = 0

    constructor(pathSprite: string,update: ((deltaTime: number) => void | (() => void)),destroy?: () => void | undefined) {
        super(pathSprite, update)

        this.setSize(95, 95)
        this.setPosition (viewport.width / 2, viewport.height / 2)
        this.assignKeyEvents()
        this.assigMouseEvents()
        this.tags = [OBJECT_TAGS.PLAYER]
        this.currentLifes = INITIAL_LIVES
        this.maxLifes = INITIAL_LIVES
        this.score = 0
        this.sprite.anchor.set(0.5, 0.5)
    }

    resetPlayer() {
        this.maxLifes = INITIAL_LIVES
        this.currentLifes = this.maxLifes
        currentPlayerSpeed = PLAYER_SPEED
        this.score = 0
        gameObjects.push(this)
        this.setPosition (viewport.width / 2, viewport.height / 2)
    }

    fillUpLifes() {
        this.currentLifes = this.maxLifes
    }

    levelUpLifes() {
        this.maxLifes++
        
        this.currentLifes++
        if (this.currentLifes > this.maxLifes) {
            this.currentLifes = this.maxLifes
        }
    }

    killedEnemy() {
        this.score += 10
    }

    drawAimTarget() {
        const edge = 20
        this.aimTargetPosition = vector2(
            (this.position.x - (this.aimDirection.x * AIM_OFFSET_WITH_PLAYER) - edge / 2),
            (this.position.y - (this.aimDirection.y * AIM_OFFSET_WITH_PLAYER) - edge/ 2)
        )
        draw.rect(
            this.aimTargetPosition.x,
            this.aimTargetPosition.y,
            edge,
            edge,
            0x000000
        )
    }

    assigMouseEvents() {
        window.addEventListener('mousemove', (mouse: MouseEvent) => {
            this.mousePosition = vector2(mouse.clientX, mouse.clientY)
        })

        window.addEventListener('mousedown', () => {
            if (currentGameState != GAME_STATES.RUNNING)
                return

            const newBullet = Bullet(IMAGES.bullet)
            newBullet.setPosition(this.aimTargetPosition.x, this.aimTargetPosition.y)
            newBullet.setMoveDirection(this.aimDirection)
            runningContainer.addChild(newBullet.sprite)
        })
    }

    assignKeyEvents() {
        keyboard.onButtonPress(KEYBINDS.up, () => {
            this.moveDirection.y = -1
        }).onRelease(() => {
            if (this.moveDirection.y == -1) {
                this.moveDirection.y = 0
            }
        })

        keyboard.onButtonPress(KEYBINDS.left, () => {
            this.moveDirection.x = -1
        }).onRelease(() => {
            if (this.moveDirection.x == -1) {
                this.moveDirection.x = 0
            }
        })

        keyboard.onButtonPress(KEYBINDS.down, () => {
            this.moveDirection.y = 1
        }).onRelease(() => {
            if (this.moveDirection.y == 1) {
                this.moveDirection.y = 0
            }
        })

        keyboard.onButtonPress(KEYBINDS.right, () => {
            this.moveDirection.x = 1
        }).onRelease(() => {
            if (this.moveDirection.x == 1) {
                this.moveDirection.x = 0
            }
        })
    }
}