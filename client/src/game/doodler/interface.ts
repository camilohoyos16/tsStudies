import { GameObject } from "./gameObject";
import { GAME_WIDTH, GAME_HEIGHT, GAME_POSITION_X, GAME_POSITION_Y, GAME_STATES } from "./doodlerConstants"
import * as draw from "../draw"

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

    resetGame() {
        this.playerLivesIcons.forEach(icon => {
            icon.color = 0xdb1414
        });
    }
    
    playerLoseLive() {
        this.playerLives--
        if (this.playerLives >= 0) {
            this.playerLivesIcons[this.playerLives].color = 0x000000
        }
    }
    
    renderInterface(currentGameState: GAME_STATES) {
        switch (currentGameState) {
            case GAME_STATES.GameOver:
                this.renderGameRunning()
                break;
            case GAME_STATES.Running:
                this.renderGameRunning()
                break;
            case GAME_STATES.Menu:
                this.renderGameMenu()
                break;
            case GAME_STATES.Pause:
                this.renderGamePaused()
                break;
        
            default:
                break;
        }
    }
    
    private renderGameRunning() {
        this.playerLivesIcons.forEach(icon => {
            if (icon.shouldBeRenderer) {
                icon.objectRender();
            }
        });
    }

    private renderGameMenu() {
        draw.rect(GAME_POSITION_X, GAME_POSITION_Y, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.2)
    }

    private renderGamePaused() {
        draw.rect(GAME_POSITION_X, GAME_POSITION_Y, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7)
    }
    
    private createPlayerLivesIcons() {
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