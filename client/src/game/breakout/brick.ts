import * as draw from "../draw"
import { Game } from "./game";
import {collision} from  "./collisions";

export class Brick{
    position = {
        x:0,
        y:0
    }
    width:number = 0;
    heigth:number = 0;
    game:Game;
    markedForDeletion:boolean = false;

    constructor(game:Game, width:number, height:number, position:{x:number, y:number}){
        this.width = width;
        this.heigth = height;
        this.position = position;
        this.game = game;
    }

    draw(){
        draw.rect(this.position.x, this.position.y, this.width, this.heigth);
    }

    update(deltaTime:number){
        if(collision(this.game.ball, this)){
            this.game.ball.currentSpeed.y *= -1;
            this.markedForDeletion = true;
        }
    }
}