import { BRICK_HEIGHT, BRICK_WIDTH } from "../../constants";
import { Brick } from "./brick";
import { Game } from "./game";

export class Level{
    gameBricks: Array<Brick> = [];
    constructor(game:Game, level:Array<number>[]){
        level.forEach((row, rowIndex)=>{
            row.forEach((brick, brickIndex) =>{
                if(brick === 1){
                    let position = {
                        x: 80 * brickIndex,
                        y: 75 + BRICK_HEIGHT * rowIndex
                    };

                    this.gameBricks.push(new Brick(game, BRICK_WIDTH, BRICK_HEIGHT, position));
                }
            })
        })
    }

    initLevel(){
        return this.gameBricks;
    }
}

export let level1:Array<number>[]=[
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 ]

 export let level2:Array<number>[]=[
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 ]