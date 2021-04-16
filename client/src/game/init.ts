import { startGameLoop } from "./loop"
import { platformTest } from "./scenes"
import { startBreakoutGame } from "./breakout/index"
import { gameDoodlerStart } from "./Doodler/index"

export const initGame = (): void => {
  // startGameLoop()
  // platformTest()
  //startBreakoutGame();
  gameDoodlerStart();
}
