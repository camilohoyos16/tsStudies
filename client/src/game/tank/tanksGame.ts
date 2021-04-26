import { GAME_STATES, IMAGES } from "./tankConstants"
import { updateGameObjects } from "./tankGameObject"
import { interfaceLoop as updateInterface, startGameInterface } from "./tankInterface"
import { Player, player } from "./tankPlayer"
import { keyboard } from "../input"
import { KEYBINDS } from "../../../../config"
import { Enemy } from "./tankEnemy"
import * as draw from "../draw"
import { viewport } from "../viewport"
import { EventEmitter } from 'events'
import { canvasContainer } from "../../components/canvas"

export let currentGameState = GAME_STATES.MENU


const gameStateEmitter = new EventEmitter()

export function onGameStateChanged(states: string[], callback: (newState: string) => void) {
    for (const state of states) {
        gameStateEmitter.on(state, callback)
    }
}

let lastTime = 0
let spawnEnemyTimer = 0
const spawnEnemyTick = 2000

export let currentPlayer: Player

export function tankGameStart() {
    changeGameState(GAME_STATES.MENU)
    currentPlayer = player(IMAGES.player)
    startGameInterface()
}

export function tankGameLoop() {
    const loop = (timeStamp:number) => {
        const { width, height } = canvasContainer.getBoundingClientRect()
        viewport.setSize(width, height)
        draw.clear()
        
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        if (spawnEnemyTimer < timeStamp) {
            spawnEnemy(timeStamp)
        }
    
        updateGameObjects(deltaTime)
        
        updateInterface()
        requestAnimationFrame(loop)
    }

    function spawnEnemy(timeStamp:number){
        spawnEnemyTimer = timeStamp + spawnEnemyTick
        Enemy(IMAGES.enemyClown)
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


export function changeGameState(newGameState: string) {
    currentGameState = newGameState
    gameStateEmitter.emit(currentGameState, currentGameState)

}