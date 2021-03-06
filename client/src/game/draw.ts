import { Sprite, pixiGraphics, Texture, Container, TextStyle, Text, Loader } from "./pixi"
import { IMAGES } from "./tank/tankConstants"
import { viewport } from "./viewport"

const loader = Loader.shared

// loader.add(Array.from(IMAGES) as Array<string>)
loader.add([
  IMAGES.bullet,
  IMAGES.buttonClicked,
  IMAGES.buttonNormal,
  IMAGES.default,
  IMAGES.enemyAlien,
  IMAGES.enemyClown,
  IMAGES.enemyDracula,
  IMAGES.heartBlack,
  IMAGES.heartRed,
  IMAGES.player,
])
loader.load()

const IS_USING_PIXI = true

/**
 * Clear entire canvas.`
 */
export const clear = (): void => {
  if (IS_USING_PIXI) {
    
    pixiGraphics.children.length = 0
    pixiGraphics.clear()
  }
}

export const rect = (x: number, y: number, width: number, height: number, color = 0xffffff, alpha = 1) => {
  if (IS_USING_PIXI) {
    pixiGraphics.beginFill(color, alpha)
    return pixiGraphics.drawRect(x - viewport.x, y - viewport.y, width, height)
  }
}

export const circle  = (x: number, y: number, radius: number, color = 0xffffff, alpha = 1):void => {
  if (IS_USING_PIXI) {
    pixiGraphics.beginFill(color, alpha)
    pixiGraphics.drawCircle(x - viewport.x, y - viewport.y, radius)
  }
}

export const sprite = (x: number, y: number, widht: number, height: number, path = "", alpha = 1) => {
  const spritePath = path || "images/default.png"
  const newSprite = new Sprite(getTexture(spritePath))

  //Check why the texture is not loading from the resources at the time the sprite is created
  setTimeout(() => {
    newSprite.texture = loader.resources[spritePath].texture!
  }, 100)
  // const newSprite = new Sprite(buttonSprite)

  newSprite.position.set(x, y)
  newSprite.width = widht
  newSprite.height = height
  newSprite.tint = 0xffffff
  newSprite.visible = true
  newSprite.alpha = 1

  return newSprite
}

export function getTexture(spritePath: string): Texture{
  return loader.resources[spritePath].texture!
}


export const button = (text: string, x: number, y: number, width: number, height: number) => {
  const buttonContainer = new Container()
  buttonContainer.position.set(x, y)
  
  const buttonSprite = sprite(0, 0, width, height, "images/buttonNormal.png")


  buttonContainer.interactive = true
  buttonContainer.buttonMode = true
  buttonContainer.visible = true

  
  const textValue = createText(text, buttonSprite.width / 2, buttonSprite.height / 2)
  textValue.position.set((buttonSprite.width / 2) - (textValue.width / 2),
    (buttonSprite.height / 2) - (textValue.height / 2))
  
  buttonContainer.on("mouseover", () => {
    buttonSprite.tint = 0x52c2ff
  }).on("mouseout", () => {
    buttonSprite.texture = getTexture(IMAGES.buttonNormal)
    buttonSprite.tint = 0xffffff
  }).on("mousedown", () => {
    buttonSprite.texture = getTexture(IMAGES.buttonClicked)
  }).on("mouseup", () => {
    buttonSprite.texture = getTexture(IMAGES.buttonNormal)
  })

  buttonContainer.addChild(buttonSprite)
  buttonContainer.addChild(textValue)

  return {
    button: buttonSprite,
    container: buttonContainer
  }
}

export function createText(text: string, x: number, y: number, fontSize = 32, color = 0x000000, fontFamily = "Arial", interactive = false)
{
    const style = new TextStyle({
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: 'bold',
        fill: color,
        wordWrap: true,
        wordWrapWidth: 200,
        padding: 10
    })
    const basicText = new Text(text, style)
    basicText.x = x
    basicText.y = y
    basicText.buttonMode = interactive
    basicText.interactive = interactive

    return basicText
}