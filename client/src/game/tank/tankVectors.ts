export const vector2 = (x: number, y: number) => {
    return {x: x, y: y}
}

export const vector2Magnitude = (vector: { x: number, y: number }) => {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)) 
}

export const vector2Normalize = (vector: { x: number, y: number }) => {
    const magnitude = vector2Magnitude(vector)
    return {x: vector.x / magnitude, y: vector.y / magnitude}
}