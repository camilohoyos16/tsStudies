import { Ball } from "./ball";

export function collision(ball:Ball, gameObject:any){
    let ballTop = ball.position.y - ball.radius;
    let ballBottom = ball.position.y + ball.radius;
    let objectTop = gameObject.position.y;
    let objectBottom = gameObject.position.y + gameObject.heigth;
    let objectLeft = gameObject.position.x;
    let objectRight = gameObject.position.x + gameObject.width;

    if(ballBottom >= objectTop &&
        ballTop <= objectBottom &&
        ball.position.x >= objectLeft &&
        ball.position.x + ball.radius <= objectRight)
    {
        return true;
    }else{
        return false;
    }
}