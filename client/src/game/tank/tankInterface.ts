import { currentPlayer, changeGameState, onGameStateChanged, resetGame, currentRound } from "./tanksGame"
import { vector2 } from "./tankVectors"
import { levelUpBulletSpeed } from "./tankBullet"
import { levelUpPlayerSpeed } from "./tankPlayer"
import { GAME_STATES, IMAGES } from "./tankConstants"
import { menuContainer, runningContainer, pausedContainer, gameOverContainer, nextRoundContainer } from "./tankContainers"
import { viewport } from "../viewport"
import * as draw from "../draw"
import * as PIXI from 'pixi.js'
import { Sprite, Text } from "pixi.js"

const ICONS_PADDING = 50
const playerLiveIcons: Array<Icon> = []

let playButton
let restartButton

let levelUpContainer
let playerSpeedButton
let bulletSpeedButton
let fillUpLifesButton
let extraLifeButton

let scoreText: PIXI.Text
let roundsText: PIXI.Text
let gameoverText: PIXI.Text
let nextRoundText: PIXI.Text


export const interfaceLoop = () => {
    for (let i = 0; i < playerLiveIcons.length; i++) {
        playerLiveIcons[i].changeIconState(currentPlayer.currentLifes - 1 >= i)
    }
}

export function updatePlayerScore() {
    scoreText.text = `Score: ${currentPlayer.score}`
}

export function updateRounds() {
    roundsText.text = `Rounds: ${currentRound}`
}

export function resetInterface() {
    updatePlayerScore()
    updateRounds()

    for (let i = 0; i < playerLiveIcons.length; i++) {
        runningContainer.removeChild(playerLiveIcons[i].sprite)  
    }
    playerLiveIcons.length = 0

    createPlayerLives()
}

export function startGameInterface() {
    playButton = draw.button("Play", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 75)
    playButton.container.on("click", () => {
        changeGameState(GAME_STATES.RUNNING)
    })

    restartButton = draw.button("Restart", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 75)
    restartButton.container.on("click", () => {
        resetGame()
    })
    
    const style = new PIXI.TextStyle({
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
    })

    scoreText = draw.createText('Score: 0', 50, 50, 32)!
    scoreText.style = style

    roundsText = draw.createText('Rounds: 1', scoreText.width + 200, 50, 32)!
    roundsText.style = style

    gameoverText = draw.createText('Game Over!', 0, 0, 20)!
    gameoverText.style = {
        fontFamily: "Impact, Charcoal, sans-serif",
        letterSpacing: 11,
        lineJoin: "bevel",
        fontSize: 120,
        miterLimit: 4,
        stroke: "red",
        strokeThickness: 4
    }
    gameoverText.position.set(
        viewport.width / 2 - gameoverText.width / 2,
        viewport.height / 2 - gameoverText.height / 2 - 200
    )

    nextRoundText = draw.createText('Round Completed', 0, 0, 20)!
    nextRoundText.style = {
        fontFamily: "Impact, Charcoal, sans-serif",
        letterSpacing: 11,
        lineJoin: "bevel",
        fontSize: 100,
        miterLimit: 4,
        stroke: "red",
        strokeThickness: 4
    }
    nextRoundText.position.set(
        viewport.width / 2 - nextRoundText.width / 2,
        viewport.height / 2 - nextRoundText.height / 2 - 200
    )

    levelUpContainer = new PIXI.Container()

    playerSpeedButton = draw.button("+ Player Speed", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 150)
    playerSpeedButton.container.on("click", () => {
        levelUpPlayerSpeed()
        changeGameState(GAME_STATES.RUNNING)
    })
    
    bulletSpeedButton = draw.button("+ Bullet Speed", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 150)
    bulletSpeedButton.container.on("click", () => {
        levelUpBulletSpeed(10)
        changeGameState(GAME_STATES.RUNNING)
    })
    
    fillUpLifesButton = draw.button("Fill Lifes", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 150)
    fillUpLifesButton.container.on("click", () => {
        currentPlayer.fillUpLifes()
        changeGameState(GAME_STATES.RUNNING)
    })
    
    extraLifeButton = draw.button("+ Life", viewport.width / 2 - 75, viewport.height / 2 - 36, 150, 150)
    extraLifeButton.container.on("click", () => {
        playerLiveIcons.push(new Icon(viewport.width - 100, playerLiveIcons[playerLiveIcons.length - 1].postion.y + ICONS_PADDING, 30))
        currentPlayer.levelUpLifes()
        changeGameState(GAME_STATES.RUNNING)
    })

    levelUpContainer.addChild(
        playerSpeedButton.container,
        bulletSpeedButton.container,
        fillUpLifesButton.container,
        extraLifeButton.container,
        nextRoundText
    )

    playerSpeedButton.container.position.set(0, 0)
    bulletSpeedButton.container.position.set(playerSpeedButton.container.width + 20, 0)
    fillUpLifesButton.container.position.set(0, playerSpeedButton.container.height + 20)
    extraLifeButton.container.position.set(playerSpeedButton.container.width + 20, playerSpeedButton.container.height + 20)

    levelUpContainer.position.set(viewport.width / 2 - levelUpContainer.width / 2, viewport.height / 2)
      
    createPlayerLives()
    
    onGameStateChanged([
        GAME_STATES.GAMEOVER,
        GAME_STATES.MENU,
        GAME_STATES.PAUSED,
        GAME_STATES.RUNNING,
        GAME_STATES.NEXT_ROUND,
    ], onGameStateChangedListener)
    
    pausedContainer.addChild(draw.createText("Paused", viewport.width / 2 - 75, viewport.height / 2 - 75, 80))
    runningContainer.addChild(scoreText)
    runningContainer.addChild(roundsText)
    menuContainer.addChild(playButton.container)
    gameOverContainer.addChild(gameoverText)
    gameOverContainer.addChild(restartButton.container)
    nextRoundContainer.addChild(levelUpContainer)

    nextRoundContainer.visible = false
    runningContainer.visible = false
    pausedContainer.visible = false
    gameOverContainer.visible = false
    menuContainer.visible = true
}

function onGameStateChangedListener(newGameState: string) {
    switch (newGameState) {
        case GAME_STATES.GAMEOVER:
            gameOverContainer.visible = true
            break
        case GAME_STATES.MENU:
            menuContainer.visible = true
        break
        case GAME_STATES.PAUSED:
            runningContainer.visible = true
            pausedContainer.visible = true
            break
        case GAME_STATES.RUNNING:
            menuContainer.visible = false
            gameOverContainer.visible = false
            pausedContainer.visible = false
            nextRoundContainer.visible = false
            runningContainer.visible = true
            break
        case GAME_STATES.NEXT_ROUND:
            nextRoundContainer.visible = true
            break
        default:
            break
    }
}

function createPlayerLives() {
    let positionY = 100
    for (let i = 0; i < currentPlayer.maxLifes; i++) {
        playerLiveIcons.push(new Icon(viewport.width - 100, positionY, 30))
        positionY += ICONS_PADDING
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