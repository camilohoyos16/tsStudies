import { GameObject } from "./gameObject";
import { GAME_WIDTH } from "./doodlerConstants"

const SPACE_BETWEEN_ICONS = 20
const OFFSET_WITH_GAME_CANVAS = 50

class InterfaceIcon extends GameObject{
    shouldBeRenderer: boolean = true
}

export class GameInterface {
    playerLives: number = 0
    playerLivesIcons: Array<InterfaceIcon> = []

    constructor() {
    }
    
    startGame(playerLives: number) {
        this.playerLives = playerLives
        this.createPlayerLivesIcons()
    }
    
    playerLoseLive() {
        this.playerLives--
        if (this.playerLives >= 0) {
            this.playerLivesIcons[this.playerLives].color = 0x000000
        }
    }
    
    renderInterface() {
        this.playerLivesIcons.forEach(icon => {
            if (icon.shouldBeRenderer) {
                icon.objectLoop(0);
            }
        });
    }
    
    createPlayerLivesIcons() {
        if (this.playerLivesIcons.length == 0) {
            let tempPosition = {
                x: GAME_WIDTH + OFFSET_WITH_GAME_CANVAS,
                y: 0
            }
            for (let i = 0; i < this.playerLives; i++) {
                let newIcon = new InterfaceIcon(30, 30, Object.assign(tempPosition))
                newIcon.color = 0xdb1414
                this.playerLivesIcons.push(newIcon)
                tempPosition.x += SPACE_BETWEEN_ICONS + newIcon.width
            }
        }
    }

}