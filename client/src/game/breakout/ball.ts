import * as draw from "../draw"
import { GAME_WIDTH, GAME_HEIGHT } from "../../constants";
import { viewport } from "../viewport"
import { Game } from "./game";
import {collision} from  "./collisions";

export class Ball{
    position = {
        x:0,
        y:0
    }
    private initialPosition = {
        x:0,
        y:0
    }
    radius:number = 0;
    currentSpeed = {
        x:2,
        y:-2
    };
    private intitialSpeed = {
        x:2,
        y:-2
    }
    game:Game;

    constructor(radius:number, game:Game, position:{x:number,y:number}){
        this.radius = radius;
        this.game = game;
        this.position = position;
        Object.assign(this.initialPosition, position);
        Object.assign(this.intitialSpeed, this.currentSpeed);
    }
    
    resetBall(){
        console.log(this.currentSpeed);
        Object.assign(this.position, this.initialPosition);
        Object.assign(this.currentSpeed, this.intitialSpeed);
    }

    draw(){
        draw.rect(this.position.x, this.position.y, this.radius, this.radius);
    }

    update(deltaTime: number){
        this.position.x += this.currentSpeed.x;
        this.position.y += this.currentSpeed.y;
        
        this.worldCollisions();
        this.paddleCollision();
    }

    paddleCollision(){
        if(collision(this, this.game.paddle))
        {
            this.currentSpeed.y *= -1;
        }
    }
    
    worldCollisions(){
        //World Sides
        if((this.position.x - viewport.x) > GAME_WIDTH || (this.position.x - viewport.x) < 0){
            this.currentSpeed.x *= -1;
        }

        //Top
        if((this.position.y - viewport.y) < 0){
            this.currentSpeed.y *= -1;
        }

        //Bottom
        if((this.position.y - viewport.y) > GAME_HEIGHT){
            this.game.lives --;
            this.resetBall();
        }
    }
}