import { GameObject } from "./gameObject";
import { GAME_HEIGHT, GAME_POSITION_Y } from "./doodlerConstants";

const PLAYER_FALL_ACCELERATION = 15;
const PLAYER_JUMP_ACCELERATION = 8;
const PLAYER_MAX_JUMP_SPEED = -20;
const PLAYER_MAX_FALL_SPEED = 30;

export class Player extends GameObject{
    isFalling : boolean = false;
    canCollide : boolean = false;
    private currentSpeed : number = 0;

    changePosition(newPosition:{x:number, y:number}){
        this.position = {
            x: (newPosition.x  - this.width / 2), 
            y: (newPosition.y - this.height )
        }
    }

    protected objectUpdate(deltaTime:number){
        if(this.isFalling){
            this.currentSpeed = Math.min(PLAYER_MAX_FALL_SPEED, (this.currentSpeed) + (PLAYER_FALL_ACCELERATION / deltaTime));
            this.position.y += this.currentSpeed;
            if(this.touchedPlatform()){
                console.log(this.currentSpeed);
                this.jump();
            }
        }else{
            this.currentSpeed = Math.max(PLAYER_MAX_JUMP_SPEED, (this.currentSpeed) - (PLAYER_JUMP_ACCELERATION/ deltaTime));
            this.position.y += this.currentSpeed;
            if(this.position.y < (GAME_HEIGHT / 2) + GAME_POSITION_Y + this.height){
                console.log(this.currentSpeed);
                this.startToFall();
            }
        }
    }

    startToFall(){
        this.isFalling = true;
        this.canCollide = true;
    }
    
    jump(){
        this.currentSpeed = PLAYER_MAX_JUMP_SPEED;
        this.isFalling = false;
        this.canCollide = false;
    }

    touchedPlatform():boolean{
        if(this.position.y  + this.height > GAME_HEIGHT + GAME_POSITION_Y){
            console.log("Player position: " + this.position.y);
            console.log("Bottom map: " + GAME_HEIGHT + GAME_POSITION_Y + this.height);
            return true;
        }else{
            return false;
        }
    }
}