import {GAME_HEIGHT, GAME_WIDTH, GAME_POSITION_X, GAME_POSITION_Y, INITIAL_PLATFORMS_SPACE, INITIAL_PLATFORM_FALL_SPEED} from "./doodlerConstants"
import * as draw from "../draw"
import {Player} from "./player"
import { GameObject } from "./gameObject";
import {Platform, PLATFORM_HEIGHT, PLATFORM_WIDTH} from "./platform"
import { getRandomArbitrary } from "./doodleUtils";
import { collisionBottom } from "./collisions";

export class Game{
    player : Player;
    gameObjects : Array<GameObject> = [];
    platforms : Array<Platform> = []
    platformSpace:number;
    topPlatformsOffset:number = 0
    currentPlatformFallSpeed:number = 0;

    constructor(){
        this.player = new Player(40, 70, {x:250, y:450});
        this.platformSpace = INITIAL_PLATFORMS_SPACE
    }
    
    startGame(){
        this.gameObjects.push(this.player);
        this.currentPlatformFallSpeed = INITIAL_PLATFORM_FALL_SPEED
        this.spawnInitialPlatforms();
        this.player.changePosition({
            x: this.platforms[0].position.x + PLATFORM_WIDTH / 2,
            y: this.platforms[0].position.y
            });
        this.player.jump();
    }

    spawnInitialPlatforms(){
        let platformsCount:number = Math.ceil(GAME_HEIGHT / this.platformSpace); 
        for (let i = 0; i < platformsCount; i++) {
            let position = {
                x: getRandomArbitrary(0, GAME_WIDTH - PLATFORM_WIDTH),
                y: (GAME_HEIGHT - i * this.platformSpace) - PLATFORM_HEIGHT
            }
            if(position.y < 0){
                continue;
            }
            let newPlatform = new Platform(position, this.currentPlatformFallSpeed);
            this.platforms.push(newPlatform);
        }
        let positionY = this.platforms[this.platforms.length - 1].position.y;
        this.topPlatformsOffset = (positionY - GAME_POSITION_Y) - (this.platformSpace - (positionY - GAME_POSITION_Y));
    }

    finishGame(){
        this.gameObjects.length = 0;
        this.platforms.length = 0;
        this.platformSpace = INITIAL_PLATFORMS_SPACE
    }

    
    gameLoop (deltaTime:number){
        this.gameRender();
        
        this.gameUpdate(deltaTime);

        this.renderForeground();
    }

    private gameUpdate(deltaTime:number){
        [...this.gameObjects, ...this.platforms].forEach((object:GameObject) => {
            object.objectLoop(deltaTime);
            if(typeof object != typeof Player){
                if(collisionBottom(this.player, object) && this.player.canCollide){
                    this.player.jump();
                }
            }
        });

        this.checkForNewPlatforms();
    }
    
    checkForNewPlatforms(){
        if(this.platforms[this.platforms.length - 1].position.y - this.topPlatformsOffset > this.platformSpace){
            this.platforms.splice(0, 1);
            let position = {
                x: getRandomArbitrary(0, GAME_WIDTH - PLATFORM_WIDTH),
                y: 0 -  PLATFORM_HEIGHT * 2
            }
            this.platforms.push(new Platform(position, this.currentPlatformFallSpeed));
        }
    }
    
    private gameRender(){
        this.renderBackgorund();
    }

    private renderBackgorund(){
        draw.rect(GAME_POSITION_X, GAME_POSITION_Y, GAME_WIDTH, GAME_HEIGHT, 0xffffff);
    }
    
    private renderForeground(){
        draw.rect(GAME_POSITION_X, 0, GAME_WIDTH, GAME_POSITION_Y, 0x4DA3BD);
        draw.rect(GAME_POSITION_X, GAME_HEIGHT + GAME_POSITION_Y, GAME_WIDTH, 200, 0x4DA3BD);
    }
}

