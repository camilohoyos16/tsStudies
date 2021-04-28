import { vector2, vector2Magnitude } from "./tankVectors"
import { GameObject } from "./tankGameObject"

export function collision(collider: GameObject, otherObject: GameObject): boolean{
    const newVector = vector2(
        collider.getCenter().x - otherObject.getCenter().x,
        collider.getCenter().y - otherObject.getCenter().y 
    )
    const magnitude = vector2Magnitude(newVector)
    const bounds1 = collider.sprite.width / 2
    const bounds2 = otherObject.sprite.width / 2
    return (magnitude / 2) + 10 < bounds1 || (magnitude / 2) + 10 < bounds2
}

function isPointInsideObject(point:{x:number, y:number}, otherObject:GameObject):boolean{
    const newVector = vector2(
        otherObject.position.x - point.x,
        otherObject.position.y - point.y
    )
    const magnitude = vector2Magnitude(newVector)

    return otherObject.width < magnitude
}