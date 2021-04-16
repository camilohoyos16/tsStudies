import * as draw from "../draw"
import {Game} from "./game"

let game = new Game();
let lastTime = 0;

export const startBreakoutGame = () => {
    requestAnimationFrame(update);
}

function update(timeStamp:number){
    draw.clear();
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;  
    game.gameUpdate(deltaTime);
    game.gameDraw();
    requestAnimationFrame(update);
}
