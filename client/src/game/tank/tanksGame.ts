import { GAME_STATES } from "./tankConstants"
import { GameObject, updateGameObjects } from "./tankGameObject"
import { Player } from "./tankPlayer"
import { Enemy } from "./tankEnemy"
import * as draw from "../draw"
import { viewport } from "../viewport"
import { canvasContainer } from "../../components/canvas"

let lastTime = 0
let spawnEnemyTimer = 0
const spawnEnemyTick = 5000


export let player: GameObject

export function tankGameStart() {
    player = Player()
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
        requestAnimationFrame(loop)
    }

    function spawnEnemy(timeStamp:number){
        spawnEnemyTimer = timeStamp + spawnEnemyTick
        Enemy()
    }

    loop(0)
}



export let currentGameState = GAME_STATES.Menu

export function changeGameState(newGameState: GAME_STATES) {
    currentGameState = newGameState
}