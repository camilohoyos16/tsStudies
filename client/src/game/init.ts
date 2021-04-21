import { startGameLoop } from "./loop"
import { platformTest } from "./scenes"
import { startBreakoutGame } from "./breakout/index"
import { gameDoodlerStart as startDoddlerGame } from "./Doodler/index"
import { tankGameLoop, tankGameStart } from "./tank/tanksGame"

export const initGame = (): void => {
  startGameLoop()
  //platformTest()
  tankGameLoop()
  tankGameStart()
  //startBreakoutGame()
  //startDoddlerGame()
}
