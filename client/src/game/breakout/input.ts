import { Game } from "./game";
import { Paddle } from "./paddle";
import { GAME_STATE } from "../../constants";


export class InputHandler{
    constructor(game:Game, paddle:Paddle){
        document.addEventListener("keydown", ({key})=>{
            switch (key) {
                case "d":
                    paddle.moveRight();
                    break;
                case "a":
                    paddle.moveLeft();
                    break;
                case "Escape":
                    game.togglePause();
                    break;
                case " ":
                    
                    if(game.GameState === GAME_STATE.Menu){
                        game.gameStart();
                    }else if(game.GameState === GAME_STATE.GameOver){
                        console.log(game.lives);
                        game.GameState = GAME_STATE.Menu;
                    }
                    break;
                default:
                    break;
            }
        });

        document.addEventListener("keyup", ({key}) =>{
            switch (key) {
                case "d":
                    if(paddle.currentSpeed > 0){
                        paddle.stop();
                    }
                    break;
                    case "a":
                    if(paddle.currentSpeed < 0){
                        paddle.stop();
                    }
                    break;
                default:
                    break;
            }
        })

    }
}