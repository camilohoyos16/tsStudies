import { updateGameObjects } from "./object"

let isRunning = false

export const startGameLoop = (): void => {
  isRunning = true

  const loop = () => {
    updateGameObjects()

    if (isRunning) {
      requestAnimationFrame(loop)
    }
  }

  loop()
}

export const stopGameLoop = (): void => {
  isRunning = false
}
