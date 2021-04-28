import { GAME_STATES, IMAGES } from "./tankConstants"
import { updateGameObjects, resetGameObjects, GameObject } from "./tankGameObject"
import { interfaceLoop, startGameInterface, updateRounds, resetInterface } from "./tankInterface"
import { Player, player } from "./tankPlayer"
import { keyboard } from "../input"
import { KEYBINDS } from "../../../../config"
import { Enemy, increaseEnemySpeed } from "./tankEnemy"
import * as draw from "../draw"
import { viewport } from "../viewport"
import { EventEmitter } from 'events'
import { canvasContainer } from "../../components/canvas"
import { runningContainer } from "./tankContainers"
import { pixi } from "../pixi"
import { vector2 } from "./tankVectors"
import { getRandom, getRandomInt } from "./tankUtils"

export let currentGameState = GAME_STATES.MENU


const gameStateEmitter = new EventEmitter()
const gameRestartEmitter = new EventEmitter()

export function onGameStateChanged(states: string[], callback: (newState: string) => void) {
    for (const state of states) {
        gameStateEmitter.on(state, callback)
    }
}

export function onGameRestart(callback: (newState: string) => void) {
    gameRestartEmitter.on("", callback)
}

export let currentRound = 1
export const enemies = Array<GameObject> ()

let lastTime = 0
let spawnEnemyTimer = 0
let enemyRoundCount = 0
let currentEnemiesCount = 0
const spawnEnemyTick = 500

export let currentPlayer: Player

export function tankGameStart() {
    changeGameState(GAME_STATES.MENU)
    currentPlayer = player(IMAGES.player)
    runningContainer.addChild(currentPlayer.sprite)
    startGameInterface()

    currentRound = 1
    enemyRoundCount = 5
    currentEnemiesCount = 0
}

export function checkRound() {
    console.log(enemies.length)
    if (currentEnemiesCount >= enemyRoundCount && enemies.length == 0) {
        nextRound()
    }
}

function nextRound() {
    changeGameState(GAME_STATES.NEXT_ROUND)
    enemyRoundCount += 5
    currentEnemiesCount = 0
    increaseEnemySpeed()
    currentRound++
    updateRounds()
}

export function tankGameLoop() {
    const loop = (timeStamp:number) => {
        const { width, height } = canvasContainer.getBoundingClientRect()
        viewport.setSize(width, height)
        draw.clear()
        
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        if (currentGameState === GAME_STATES.RUNNING) {
            if (spawnEnemyTimer < timeStamp) {
                spawnEnemy(timeStamp)
            }
        }
    
        updateGameObjects(deltaTime)
        
        interfaceLoop()
        requestAnimationFrame(loop)
    }

    function spawnEnemy(timeStamp: number) {
        if (currentEnemiesCount >= enemyRoundCount) {
            return
        }

        spawnEnemyTimer = timeStamp + spawnEnemyTick
        const spawnPosition = vector2(getRandom(0, viewport.width), getRandom(0, viewport.height))

        // 1 = top / 2 = left / 3 = down / 4 = right
        const screenPosition = getRandomInt(1, 4)

        switch (screenPosition) {
            case 1:
                spawnPosition.y = 0
                break
            case 2:
                spawnPosition.x = 0
                break
            case 3:
                spawnPosition.y = viewport.height
                break
            case 4:
                spawnPosition.x = viewport.width
                break
        }

        const newEnemy = Enemy(IMAGES.enemyClown, spawnPosition)
        enemies.push(newEnemy)
        currentEnemiesCount ++
        runningContainer.addChild(newEnemy.sprite)
    }

    loop(0)
    assignKeyEvents()

    function assignKeyEvents() {
        //Press keys
        keyboard.onButtonPress(KEYBINDS.pause, () => {
            if (currentGameState == GAME_STATES.RUNNING) {
                changeGameState(GAME_STATES.PAUSED)
            } else if (currentGameState == GAME_STATES.PAUSED) {
                changeGameState(GAME_STATES.RUNNING)
            }
        })
    }
}

export function resetGame() {
    draw.clear()
    gameRestartEmitter.emit("")
    gameRestartEmitter.removeAllListeners()
    enemies.length = 0
    currentRound = 1
    resetGameObjects()
    changeGameState(GAME_STATES.RUNNING)
    currentPlayer.resetPlayer()
    resetInterface()

    currentRound = 1
    enemyRoundCount = 5
    currentEnemiesCount = 0
}


export function changeGameState(newGameState: string) {
    currentGameState = newGameState
    gameStateEmitter.emit(currentGameState, currentGameState)

}