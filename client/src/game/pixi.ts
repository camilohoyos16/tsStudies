import { Application, Graphics } from 'pixi.js'

/**
 * Don't uses this directly, use `draw.ts` instead.
 */
export const pixi = new Application({
  backgroundAlpha: 0,
})

/**
 * Don't uses this directly, use `draw.ts` instead.
 */
export const pixiGraphics = new Graphics()

pixi.stage.addChild(pixiGraphics)
