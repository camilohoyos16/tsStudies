import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { Brick } from "./brick";
import { Level, level1, level2 } from "./levels";
import { GAME_WIDTH, GAME_HEIGHT, GAME_STATE } from "../../constants";
import {InputHandler} from "./input"
import * as draw from "../draw"

export class Game{
    paddle: Paddle;
    ball: Ball;
    input: InputHandler;
    gameObjects : Array<any> = [];
    bricks: Array<Brick> = [];
    currentlevel : Level | null;
    GameState:GAME_STATE;
    lives:number;
    levels:Array<object>=[];
    currentLevelIndex:number=0;

    constructor(){
        this.paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
        this.ball = new Ball(20, this, {x : 10, y: 400});
        this.input = new InputHandler(this, this.paddle);
        this.currentlevel = null;
        this.GameState = GAME_STATE.Menu;
        this.lives = 3;
        this.levels.push(level1, level2);
        this.gameObjects.push(this.paddle, this.ball);
    }
    
    gameStart(){
        if(this.GameState !== GAME_STATE.Menu && this.GameState !== GAME_STATE.NewLevel){
            return;
        }
        
        this.lives = 3;
        this.ball.resetBall();
        this.currentlevel = new Level(this, <Array<number>[]>this.levels[this.currentLevelIndex]);
        this.bricks.push(...this.currentlevel.initLevel());
        
        this.GameState = GAME_STATE.Running;
    }
    
    gameUpdate(deltaTime:number){
        if(this.GameState == GAME_STATE.Paused || 
            this.GameState == GAME_STATE.Menu ||
            this.GameState == GAME_STATE.GameOver)
        {
            return;
        }
            
        if(this.lives === 0){
            this.GameState = GAME_STATE.GameOver;
        }
        
        if(this.bricks.length == 0){
            this.GameState = GAME_STATE.NewLevel;
            this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levels.length;
            this.gameStart();
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }
    
    gameDraw(){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw());

        if(this.GameState === GAME_STATE.Paused){
            draw.rect(0, 0, GAME_WIDTH + 20, GAME_HEIGHT, 0x000000, 0.8);
        }

        if(this.GameState === GAME_STATE.Menu){
            draw.rect(0, 0, GAME_WIDTH + 20, GAME_HEIGHT, 0x000000);
            draw.rect(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2 - 20, 10, 30);
            draw.rect(GAME_WIDTH / 2 + 50, GAME_HEIGHT / 2- 20, 10, 30);
            draw.rect(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2 + 50, 120, 20);
            draw.rect(GAME_WIDTH / 2 - 50 - 20, GAME_HEIGHT / 2 + 50 - 20, 20, 20);
            draw.rect(GAME_WIDTH / 2 + 50 + 20, GAME_HEIGHT / 2 + 50 - 20, 20, 20);
        }

        if(this.GameState === GAME_STATE.GameOver){
            draw.rect(0, 0, GAME_WIDTH + 20, GAME_HEIGHT, 0x000000);
            draw.rect(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2 - 20, 10, 30);
            draw.rect(GAME_WIDTH / 2 + 50, GAME_HEIGHT / 2- 20, 10, 30);
            draw.rect(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2 + 50, 120, 20);
            draw.rect(GAME_WIDTH / 2 - 50 - 20, GAME_HEIGHT / 2 + 50 + 20, 20, 20);
            draw.rect(GAME_WIDTH / 2 + 50 + 20, GAME_HEIGHT / 2 + 50 + 20, 20, 20);
        }
    }

    togglePause(){
        if(this.GameState == GAME_STATE.Paused){
            this.GameState = GAME_STATE.Running;
        }else{
            this.GameState = GAME_STATE.Paused;
        }
    }
}