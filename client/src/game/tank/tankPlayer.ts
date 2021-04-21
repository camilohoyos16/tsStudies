import { GameObject } from "./tankGameObject"
import { Bullet } from "./tankBullet"
import { vector2, vector2Normalize } from "./vectors"
import { keyboard } from "../input"
import * as draw from "../draw"
import { KEYBINDS } from "../../../../config"
import { viewport } from "../viewport"

const PLAYER_SPEED = 30
const AIM_OFFSET_WITH_PLAYER = 50

export const Player = () => new class Player extends GameObject {
    moveDirection = vector2(0, 0)
    mousePosition = vector2(0, 0)
    
    /** 
    *@property It is Normalized
    */
    aimDirection = vector2(0, 0)
    aimTargetPosition = vector2(0, 0)

    currentSpeed = vector2(0, 0)

    constructor() {
        super((deltaTime) => {
            this.currentSpeed = vector2(PLAYER_SPEED / deltaTime, PLAYER_SPEED / deltaTime)
            this.position.x += this.currentSpeed.x  * this.moveDirection.x
            this.position.y += this.currentSpeed.y * this.moveDirection.y

            this.aimDirection = vector2(
                this.position.x - this.mousePosition.x,
                this.position.y - this.mousePosition.y
            )

            this.aimDirection = vector2Normalize(this.aimDirection)

            
            return () => {
                draw.circle(this.position.x, this.position.y, this.width)
                this.drawAimTarget()
            }
        })

        this.setSize(50, 50)
        this.setPosition (viewport.width / 2, viewport.height / 2)
        this.assignKeyEvents()
        this.assigMouseEvents()

    }

    drawAimTarget() {
        const edge = this.width / 3
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
            const newBullet = Bullet()
            newBullet.setPosition(this.aimTargetPosition.x, this.aimTargetPosition.y)
            newBullet.setMoveDirection(this.aimDirection)
        })
    }

    assignKeyEvents() {
        //Press keys
        keyboard.onButtonPress(KEYBINDS.up, () => {
            this.moveDirection.y = -1
        })

        keyboard.onButtonPress(KEYBINDS.left, () => {
            this.moveDirection.x = -1
        })

        keyboard.onButtonPress(KEYBINDS.down, () => {
            this.moveDirection.y = 1
        })

        keyboard.onButtonPress(KEYBINDS.right, () => {
            this.moveDirection.x = 1
        })

        //Release keys
        keyboard.onButtonRelease(KEYBINDS.up, () => {
            if (this.moveDirection.y == -1) {
                this.moveDirection.y = 0
            }
        })

        keyboard.onButtonRelease(KEYBINDS.left, () => {
            if (this.moveDirection.x == -1) {
                this.moveDirection.x = 0
            }
        })

        keyboard.onButtonRelease(KEYBINDS.down, () => {
            if (this.moveDirection.y == 1) {
                this.moveDirection.y = 0
            }
        })

        keyboard.onButtonRelease(KEYBINDS.right, () => {
            if (this.moveDirection.x == 1) {
                this.moveDirection.x = 0
            }
        })
    }
}