import { GameObject } from "./gameObject";

export const PLATFORM_WIDTH = 150, PLATFORM_HEIGHT = 15;

export class Platform extends GameObject{
    alreadyTouched:boolean = false;
    fallSpeed:number;

    constructor(position:{x:number, y:number}, fallSpeed:number){
        super(PLATFORM_WIDTH, PLATFORM_HEIGHT, position);
        this.fallSpeed = fallSpeed;
    }


    protected objectUpdate(deltaTime:number){
        this.position.y += this.fallSpeed / deltaTime;
    }
}