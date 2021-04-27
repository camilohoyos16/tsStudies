import { currentGameState, currentPlayer, changeGameState, onGameStateChanged } from "./tanksGame"
import { vector2 } from "./tankVectors"
import { GAME_STATES, IMAGES } from "./tankConstants"
import { menuContainer, runningContainer, pausedContainer } from "./tankContainers"
import { viewport } from "../viewport"
import * as draw from "../draw"
import * as PIXI from 'pixi.js'
import { Sprite, Text } from "pixi.js"

const playerLiveIcons: Array<Icon> = []
let playButton
let scoreText: PIXI.Text

export const interfaceLoop = () => {
    renderMenu()
    renderGame()
    renderPaused()
}

export function playerKillEnemy() {
    scoreText.text = `Score: ${currentPlayer.score}`
}

export function startGameInterface() {
    playButton = draw.button("Play", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 75)
    playButton.container.on("click", () => {
        changeGameState(GAME_STATES.RUNNING)
    })
    
    scoreText = draw.createText('Score: 0', 50, 50, 32)!
    scoreText.style = {
        dropShadow: true,
        dropShadowAngle: -2.3,
        dropShadowBlur: 3,
        dropShadowDistance: 3,
        fontFamily: "\"Lucida Console\", Monaco, monospace",
        fontWeight: "bold",
        lineJoin: "bevel",
        miterLimit: 4,
        stroke: "red",
        strokeThickness: 4
    }
    
    pausedContainer.addChild(draw.createText("Paused", viewport.width / 2 - 75, viewport.height / 2 - 75, 80))
    
    runningContainer.addChild(scoreText)
    menuContainer.addChild(playButton.container)

    createPlayerLives()

    onGameStateChanged([
        GAME_STATES.GAMEOVER,
        GAME_STATES.MENU,
        GAME_STATES.PAUSED,
        GAME_STATES.RUNNING,
    ], onGameStateChangedListener)

    runningContainer.visible = false
    pausedContainer.visible = false
    menuContainer.visible = true
}

function onGameStateChangedListener(newGameState: string) {
    switch (newGameState) {
        case GAME_STATES.GAMEOVER:
            break
            case GAME_STATES.MENU:
                runningContainer.visible = false
                pausedContainer.visible = false
                menuContainer.visible = true
            break
            case GAME_STATES.PAUSED:
                runningContainer.visible = true
                menuContainer.visible = false
                pausedContainer.visible = true
            break
            case GAME_STATES.RUNNING:
                pausedContainer.visible = false
                menuContainer.visible = false
                runningContainer.visible = true
            break
        default:
            break
    }
}

function renderPaused() {
    // pausedContainer.addChildAt(draw.rect(0, 0, viewport.width, viewport.height, 0xffffff, 0.5)!, 0)
}

function renderMenu() {
    //draw.rect(0, 0, viewport.width, viewport.height, 0xffffff)
}

function renderGame() {
    for (let i = 0; i < playerLiveIcons.length; i++) {
        playerLiveIcons[i].changeIconState(currentPlayer.currentLives >= i)
    }
}

function createPlayerLives() {
    for (let i = 0; i < currentPlayer.maxLives; i++) {
        playerLiveIcons.push(new Icon(viewport.width - 500, 100, 30))
    }
}

class Icon{
    postion = vector2(0, 0)
    radius: number
    activeColor = 0xdb1414
    inactiveColor = 0xffffff
    sprite: Sprite

    isActive = true

    constructor(x: number, y: number, radius: number) {
        this.postion = vector2(x, y)
        this.radius = radius
        this.sprite = draw.sprite(x, y, radius, radius, IMAGES.bullet)
        this.sprite.anchor.set(0.5, 0.5)
        runningContainer.addChild(this.sprite)
    }

    changeIconState(active: boolean) {
        this.isActive = active
        this.sprite.texture = draw.getTexture(this.isActive ? IMAGES.heartRed : IMAGES.heartBlack)
    }
}