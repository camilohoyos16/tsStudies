import React, { useEffect, useRef } from "react"
import { initGame } from "../../game/init"
import { pixi } from "../../game/pixi"
import "./index.css"

export let canvasContainer: HTMLDivElement

export const CanvasContainer: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current === null) return

    canvasContainer = container.current

    // TODO: add webgl/canvas flag
    if (true) {
      container.current.appendChild(pixi.view)
      pixi.resizeTo = container.current

      initGame()
    }
  })

  return <div id="canvas-container" ref={container} />
}
