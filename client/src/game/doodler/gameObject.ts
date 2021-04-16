import { GAME_POSITION_X, GAME_POSITION_Y } from "./doodlerConstants";
import * as draw from "../draw"

export class GameObject{
    width : number = 0;
    height : number = 0;
    position = {
        x:0,
        y:0
    }
    canCollide = true;
    color: number = 0x000000;

    ///This constructor position put object inside canvas positions, you dont need to always calculate canvas game position
    constructor(width:number, heigth:number, position:{x:number, y:number}){
        this.width = width;
        this.height = heigth;
        this.position = {
            x: position.x + GAME_POSITION_X, 
            y: position.y + GAME_POSITION_Y
        }
    }
    changePosition(newPosition:{x:number, y:number}){
        this.position = {
            x: newPosition.x, 
            y: newPosition.y
        }
    }

    objectUpdate(deltaTime:number){

    }

    objectRender(){
        draw.rect(this.position.x, this.position.y, this.width, this.height, this.color);
    }
}