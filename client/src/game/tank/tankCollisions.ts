import { GameObject } from "./tankGameObject"
import { vector2, vector2Magnitude } from "./tankVectors"

export function collision(collider: GameObject, otherObject: GameObject): boolean{
    const newVector = vector2(
        collider.getCenter().x -otherObject.getCenter().x,
        collider.getCenter().y - otherObject.getCenter().y 
    )
    const magnitude = vector2Magnitude(newVector)

    return (magnitude / 2) + 10 < collider.radius || (magnitude / 2) + 10 < otherObject.radius
}

function isPointInsideObject(point:{x:number, y:number}, otherObject:GameObject):boolean{
    const newVector = vector2(
        otherObject.position.x - point.x,
        otherObject.position.y - point.y
    )
    const magnitude = vector2Magnitude(newVector)

    return otherObject.radius < magnitude
}