import { GameObject } from "./gameObject";

export function collision(collider:GameObject, otherObject:GameObject):boolean{
    if(collisionTop(collider, otherObject) || 
    collisionBottom(collider, otherObject) ||
    collisionLeft(collider, otherObject) ||
    collisionRight(collider, otherObject))
    {
        return true;
    }else{
        return false;
    }
}

export function collisionTop(collider: GameObject, otherObject: GameObject):boolean{
    let colliderTopEdge = {
        xleft: collider.position.x,
        xright: collider.position.x + collider.width,
        y: collider.position.y
    }

    return isPointInsideObject({x:colliderTopEdge.xleft, y:colliderTopEdge.y}, otherObject) ||
        isPointInsideObject({x:colliderTopEdge.xright, y:colliderTopEdge.y}, otherObject);
}

export function collisionBottom(collider:GameObject, otherObject:GameObject):boolean{
    let colliderBottomEdge = {
        xleft: collider.position.x,
        xright: collider.position.x + collider.width,
        y: collider.position.y + collider.height
    }

    return isPointInsideObject({x:colliderBottomEdge.xleft, y:colliderBottomEdge.y}, otherObject) ||
        isPointInsideObject({x:colliderBottomEdge.xright, y:colliderBottomEdge.y}, otherObject);
}

export function collisionLeft(collider:GameObject, otherObject:GameObject):boolean{
    let colliderLeftEdge = {
        x: collider.position.x,
        yTop: collider.position.y,
        yBottom: collider.position.y + collider.height
    }

    return isPointInsideObject({x:colliderLeftEdge.x, y:colliderLeftEdge.yTop}, otherObject) ||
        isPointInsideObject({x:colliderLeftEdge.x, y:colliderLeftEdge.yBottom}, otherObject);
}

export function collisionRight(collider:GameObject, otherObject:GameObject):boolean{
    let colliderRightEdge = {
        x: collider.position.x + collider.width,
        yTop: collider.position.y,
        yBottom: collider.position.y + collider.height
    }

    return isPointInsideObject({ x: colliderRightEdge.x, y: colliderRightEdge.yTop }, otherObject) ||
        isPointInsideObject({ x: colliderRightEdge.x, y: colliderRightEdge.yBottom }, otherObject);
}

function isPointInsideObject(point:{x:number, y:number}, otherObject:GameObject):boolean{
    let otherObjectBox ={
        top: otherObject.position.y,
        bottom:otherObject.position.y +otherObject.height,
        left: otherObject.position.x,
        rigt: otherObject.position.x + otherObject.width
    }

    return point.y < otherObjectBox.bottom + 20 &&
           point.y > otherObjectBox.top &&
           point.x > otherObjectBox.left &&
           point.x < otherObjectBox.rigt;
}