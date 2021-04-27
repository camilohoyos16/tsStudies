import { GameObject } from "./tankGameObject"
import { Bullet } from "./tankBullet"
import { vector2, vector2Normalize } from "./tankVectors"
import { keyboard } from "../input"
import * as draw from "../draw"
import { KEYBINDS } from "../../../../config"
import { viewport } from "../viewport"
import { OBJECT_TAGS, IMAGES } from "./tankConstants"
import { runningContainer } from "./tankContainers"

const PLAYER_SPEED = 30
const AIM_OFFSET_WITH_PLAYER = 50
const INITIAL_LIVES = 1

export const player = (pathSprite: string) => {
    const newPlayer = new Player(pathSprite,(deltaTime) => {
        newPlayer.currentSpeed = vector2(PLAYER_SPEED / deltaTime, PLAYER_SPEED / deltaTime)
        newPlayer.setPosition(
            newPlayer.position.x + newPlayer.currentSpeed.x * newPlayer.moveDirection.x,
            newPlayer.position.y + newPlayer.currentSpeed.y * newPlayer.moveDirection.y
        )

        // newPlayer.setPosition(
        //     newPlayer.mousePosition.x,
        //     newPlayer.mousePosition.y
        // )

        const collision = newPlayer.getObjectCollisions()


        if (collision?.tags.includes(OBJECT_TAGS.ENEMY)) {
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
    currentLives: number
    maxLives: number
    score: number

    /**
    *@property It is Normalized
    */
    aimDirection = vector2(0, 0)
    aimTargetPosition = vector2(0, 0)

    currentSpeed = vector2(0, 0)

    constructor(pathSprite: string,update: ((deltaTime: number) => void | (() => void)),destroy?: () => void | undefined) {
        super(pathSprite, update)

        this.setSize(95, 95)
        this.setPosition (viewport.width / 2, viewport.height / 2)
        this.assignKeyEvents()
        this.assigMouseEvents()
        this.tags = [OBJECT_TAGS.PLAYER]
        this.currentLives = INITIAL_LIVES
        this.maxLives = INITIAL_LIVES
        this.score = 0
        this.sprite.anchor.set(0.5, 0.5)
    }

    resetPlayer() {
        this.currentLives = INITIAL_LIVES
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