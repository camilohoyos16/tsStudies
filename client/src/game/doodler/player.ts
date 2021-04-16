import { GameObject } from "./gameObject";
import { GAME_HEIGHT, GAME_POSITION_Y } from "./doodlerConstants";
import * as draw from "../draw"
import { keyboard } from "../input"

export const PLAYER_INTIAL_LIVES = 5;

const PLAYER_FALL_ACCELERATION = 5;
const PLAYER_JUMP_ACCELERATION = 15;
const PLAYER_MAX_JUMP_SPEED = -80;
const PLAYER_MAX_FALL_SPEED = 60;
const PLAYER_SIDE_MOVE_SPEED = 40;

export class Player extends GameObject{
    isFalling: boolean = false;
    canCollide: boolean = false;
    lives: number = 0;
    
    private currentSpeed: number = 0;
    private sideMoveDirection = 0;
    
    constructor(width: number, heigth: number, position: { x: number, y: number }) {
        super(width, heigth, position);

        this.lives = PLAYER_INTIAL_LIVES;

        keyboard.onButtonPress(["d"], () => {
            this.sideMoveDirection = 1;
        })

        keyboard.onButtonPress(["a"], () => {
            this.sideMoveDirection = -1;
        })

        keyboard.onButtonRelease(["d", "a"], () => {
            if (!keyboard.getAnyButtonDown()) {
                this.sideMoveDirection = 0;
            }
        })
    }

    reset(lives: number) {
        this.lives = lives
        this.color = 0x000000
    }

    dead() {
        this.color = 0xdb1414
    }

    touchFloor() {
        this.color = 0xdb1414
        this.lives--;
        if (this.lives > 0) {
            setTimeout(() => {
                this.color = 0x000000
            }, 300);
        }
    }

    ///Thi position is with the pivot on Bottom - Center
    changePosition(newPosition:{x: number, y: number}){
        this.position = {
            x: newPosition.x != Infinity ? (newPosition.x  - this.width / 2) : this.position.x, 
            y: newPosition.y != Infinity ? (newPosition.y - this.height) : this.position.y
        }
    }

    objectUpdate(deltaTime: number) {
        this.position.x += (PLAYER_SIDE_MOVE_SPEED / deltaTime) * this.sideMoveDirection;

        if(this.isFalling){
            this.currentSpeed = Math.min(PLAYER_MAX_FALL_SPEED, (this.currentSpeed + PLAYER_FALL_ACCELERATION));
            this.position.y += this.currentSpeed / deltaTime;
        }else{
            this.currentSpeed = Math.max(PLAYER_MAX_JUMP_SPEED, (this.currentSpeed - PLAYER_JUMP_ACCELERATION));
            this.position.y += this.currentSpeed / deltaTime;
            if(this.position.y + this.height < (GAME_HEIGHT / 2) + GAME_POSITION_Y ){
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

    objectRender() {
        super.objectRender();
        this.renderPlayerFace();
    }

    renderPlayerFace() {
        if (this.lives > 0) {
            this.renderHappyFace();
        } else{
            this.renderSadFace();
        }
    }

    private renderHappyFace() {
        //Eyes
        draw.rect((this.position.x + this.width / 2) - 15, this.position.y + 20, 10, 10);
        draw.rect((this.position.x + this.width / 2) + 5, this.position.y + 20, 10, 10);
        
        //Mouth
        draw.rect((this.position.x + this.width / 2) - 10, this.position.y + 50, 20, 7);

        draw.rect((this.position.x + this.width / 2) - 15, this.position.y + 43, 5, 10);
        draw.rect((this.position.x + this.width / 2) - 10 + 20, this.position.y + 43, 5, 10);
    }

    private renderSadFace() {
        //Eyes
        draw.rect((this.position.x + this.width / 2) - 15, this.position.y + 20, 10, 10);
        draw.rect((this.position.x + this.width / 2) + 5, this.position.y + 20, 10, 10);
        
        //Mouth
        draw.rect((this.position.x + this.width / 2) - 10, this.position.y + 40, 20, 7);

        draw.rect((this.position.x + this.width / 2) - 15, this.position.y + 43, 5, 10);
        draw.rect((this.position.x + this.width / 2) - 10 + 20, this.position.y + 43, 5, 10);
    }
}