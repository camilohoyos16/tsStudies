import {Game} from "./game"
import * as draw from "../draw"

let game = new Game();
let lastTime = 0;

export function gameDoodlerStart(){
    game.startGame();
    requestAnimationFrame(update);
}

function update(timeStamp:number){
    draw.clear();
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;  
    game.gameLoop(deltaTime);
    requestAnimationFrame(update);
}