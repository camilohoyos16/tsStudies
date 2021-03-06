import { pixi, Container } from "../pixi"
import { viewport } from "../viewport"

export const menuContainer = new Container()
export const pausedContainer = new Container()
export const runningContainer = new Container()
export const gameOverContainer = new Container()
export const nextRoundContainer = new Container()

runningContainer.position.set(0, 0)
runningContainer.width = viewport.width
runningContainer.height = viewport.height

pixi.stage.addChild(runningContainer)
pixi.stage.addChild(menuContainer)
pixi.stage.addChild(pausedContainer)
pixi.stage.addChild(gameOverContainer)
pixi.stage.addChild(nextRoundContainer)