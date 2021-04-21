import { pixiGraphics } from "./pixi"
import { viewport } from "./viewport"

// Abstraction layer for graphics to switch between Canvas and WebGL.

const IS_USING_PIXI = true

/**
 * Clear entire canvas.
 */
export const clear = (): void => {
  if (IS_USING_PIXI) {
    pixiGraphics.clear()
  }
}

export const rect = (x: number, y: number, width: number, height: number, color = 0xffffff, alpha = 1): void => {
  if (IS_USING_PIXI) {
    pixiGraphics.beginFill(color, alpha)
    pixiGraphics.drawRect(x - viewport.x, y - viewport.y, width, height)
  }
}

export const circle  = (x: number, y: number, radius: number, color = 0xffffff, alpha = 1): void => {
  if (IS_USING_PIXI) {
    pixiGraphics.beginFill(color, alpha)
    pixiGraphics.drawCircle(x - viewport.x, y - viewport.y, radius)
  }
}