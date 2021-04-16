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

export function collisionTop(collider:GameObject, otherObject:GameObject):boolean{
    let colliderTopEdge = {
        xleft: collider.position.x,
        xright: collider.position.x + collider.width,
        y: collider.position.y
    }

    if(isPointInsideObject({x:colliderTopEdge.xleft, y:colliderTopEdge.y}, otherObject) ||
        isPointInsideObject({x:colliderTopEdge.xright, y:colliderTopEdge.y}, otherObject))
    {
        return true;
    }else{
        return false;
    }
}

export function collisionBottom(collider:GameObject, otherObject:GameObject):boolean{
    let colliderBottomEdge = {
        xleft: collider.position.x,
        xright: collider.position.x + collider.width,
        y: collider.position.y + collider.height
    }

    if(isPointInsideObject({x:colliderBottomEdge.xleft, y:colliderBottomEdge.y}, otherObject) ||
        isPointInsideObject({x:colliderBottomEdge.xright, y:colliderBottomEdge.y}, otherObject))
    {
        return true;
    }else{
        return false;
    }
    
}

export function collisionLeft(collider:GameObject, otherObject:GameObject):boolean{
    let colliderLeftEdge = {
        x: collider.position.x,
        yTop: collider.position.y,
        yBottom: collider.position.y + collider.height
    }

    if(isPointInsideObject({x:colliderLeftEdge.x, y:colliderLeftEdge.yTop}, otherObject) ||
        isPointInsideObject({x:colliderLeftEdge.x, y:colliderLeftEdge.yBottom}, otherObject))
    {
        return true;
    }else{
        return false;
    }
    
}

export function collisionRight(collider:GameObject, otherObject:GameObject):boolean{
    let colliderRightEdge = {
        x: collider.position.x + collider.width,
        yTop: collider.position.y,
        yBottom: collider.position.y + collider.height
    }

    if(isPointInsideObject({x:colliderRightEdge.x, y:colliderRightEdge.yTop}, otherObject) ||
        isPointInsideObject({x:colliderRightEdge.x, y:colliderRightEdge.yBottom}, otherObject))
    {
        return true;
    }else{
        return false;
    }
}

function isPointInsideObject(point:{x:number, y:number}, otherObject:GameObject):boolean{
    let otherObjectBox ={
        top: otherObject.position.y,
        bottom:otherObject.position.y +otherObject.height,
        left: otherObject.position.x,
        rigt: otherObject.position.x + otherObject.width
    }

    if(point.y < otherObjectBox.bottom &&
        point.y > otherObjectBox.top &&
        point.x > otherObjectBox.left && 
        point.x < otherObjectBox.rigt)
        {
            return true;
        }else{
            return false;
        }
}