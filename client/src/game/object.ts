import { CanvasContainer, canvasContainer } from "../components/canvas"
import { viewport } from "./viewport"
import * as draw from "./draw"
import { App } from "../App"
import * as PIXI from "pixi.js"

export const gameObjects: GameObject[] = []

export class GameObject {
  x = 0
  y = 0
  width = 0
  height = 0
  depth = 0
  canCollide = false
  isTrigger = false
  tags: Array<string | number | symbol> = []
  persistant = false

  /**
   * Disable updates and collision.
   */
  disabled = false

  symbol = Symbol()

  private onDestroy: () => void

  update: (delta: number) => void | (() => void)

  constructor (
    update: (delta: number) => void | (() => void), 
    onDestroy?: () => void, 
    depth = 0
  ) {
    this.update = update
    this.onDestroy = onDestroy || (() => {})
    this.depth = depth    

    gameObjects.push(this)
  }

  /**
   * Helper to set x and y.
   */
  setPosition (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * Helper to set width and height.
   */
  setSize (width: number, height: number): void {
    this.width = width
    this.height = height
  }

  getBoxCollider = (offset?: { x?: number, y?: number}): null | GameObject => {
    const x = this.x + (offset?.x || 0)
    const y = this.y + (offset?.y || 0)

    for (const collider of gameObjects) {
      if (collider.disabled || !collider.canCollide || collider.symbol === this.symbol) continue
  
      const willCollide = (
        x < collider.x + collider.width &&
        x + this.width > collider.x &&
        y < collider.y + collider.height &&
        y + this.height > collider.y
      )
  
      if (willCollide) return collider
    }
  
    return null
  }

  getBoxTriggers = (offset?: { x?: number, y?: number}): GameObject[] => {
    const x = this.x + (offset?.x || 0)
    const y = this.y + (offset?.y || 0)

    const triggers: GameObject[] = []

    for (const collider of gameObjects) {
      if (collider.disabled || !collider.isTrigger || collider.symbol === this.symbol) continue
  
      const willCollide = (
        x < collider.x + collider.width &&
        x + this.width > collider.x &&
        y < collider.y + collider.height &&
        y + this.height > collider.y
      )
  
      if (willCollide) triggers.push(collider)
    }
  
    return triggers
  }
  
  /**
   * Remove object from the game loop.
   */
  destroy (): void {
    gameObjects.splice(gameObjects.indexOf(this), 1)
    this.onDestroy()
  }
}

let lastUpdate: number | null = null

/**
 * Sort objects by depth, resize viewport, clear canvas, and update all objects.
 */
export const updateGameObjects = (): void => {
  const sortedObjects = gameObjects.sort((a, b) => a.depth - b.depth)

  const { width, height } = canvasContainer.getBoundingClientRect()

  viewport.setSize(width, height)

  draw.clear()
  
  const now = performance.now()
  const delta = lastUpdate ? (now - lastUpdate) / 15 : 0

  const draws = []

  for (const gameObject of sortedObjects) {
    if (!gameObject.disabled) {
      const draw = gameObject.update(delta)
      if (draw) draws.push(draw)
    }
  }

  for (const draw of draws) draw()

  lastUpdate = now
}

export const clearScene = (clearPersistantObjects = false) => {
  for (const gameObject of gameObjects) {
    if (!clearPersistantObjects && gameObject.persistant) continue

    gameObject.destroy()
  }
}
