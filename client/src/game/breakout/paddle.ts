import * as draw from "../draw"
import { GAME_WIDTH, GAME_HEIGHT } from "../../constants";
import { viewport } from "../viewport"

export class Paddle {
  width: number = 0;
  heigth : number = 0;
  maxSpeed:number= 20;
  currentSpeed:number = 0;
  position={
    x:0,
    y:0
  };

  constructor(gameWidth: number, gameHeight: number) { 
    this.width = 150;
    this.heigth = 30;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.heigth - 10
    };
  }

  draw() {
    draw.rect(this.position.x, this.position.y, this.width, this.heigth);
  }

  moveRight(){
    this.currentSpeed = this.maxSpeed;
  }
  
  moveLeft(){
    this.currentSpeed = -this.maxSpeed;
  }

  stop(){
    this.currentSpeed = 0;
  }

  update(deltaTime: number){
    this.position.x += this.currentSpeed / deltaTime;

    if((this.position.x - viewport.x) < 0){
      this.position.x = 0;
    }
    if((this.position.x - viewport.x) + this.width > GAME_WIDTH){
      this.position.x = GAME_WIDTH - this.width;
    }
  }
}
