import { EventEmitter } from 'events'
import { KEYBINDS } from "../../../config"

const keyboardEmitter = new EventEmitter()

let keyCount = 0

const keys: Record<string, boolean> = { }

window.addEventListener('keydown', ({ key }) => {
  if (keys[key] === undefined) {
    keys[key] = true

    keyboardEmitter.emit(`keyboard-${key}`)
    keyboardEmitter.emit(`keyboard-any`, keyboard, key)

    keyCount++
  }
})

window.addEventListener('keyup', ({ key }) => {
  delete keys[key]

  keyboardEmitter.emit(`keyboard-${key}-up`)
  keyboardEmitter.emit(`keyboard-any-up`, keyboard, key)

  keyCount--
})

export const keyboard = {
  bindings: KEYBINDS,

  index: 'keyboard',

  getButtonDown (binding: string[]): 1 | 0 {
    for (const key of binding) {
      if (keys[key]) return 1
    }

    return 0
  },

  getAnyButtonDown (): 1 | 0 {
    return keyCount > 0 ? 1 : 0
  },
  
  onButtonPress (binding: string[], callback: () => void) {
    for (const key of binding) {
      keyboardEmitter.on(`keyboard-${key}`, callback)
    }
    
    let releaseListener: ReturnType<typeof keyboard.onButtonRelease>

    return {
      removeListener () {
        if (releaseListener) releaseListener.removeListener()

        for (const key of binding) {
          keyboardEmitter.removeListener(`keyboard-${key}`, callback)
        }
      },

      onRelease (callback: () => void) {
        const releaseListener = keyboard.onButtonRelease(binding, callback)

        return releaseListener
      },
    }
  },

  onButtonRelease (binding: string[], callback: () => void) {
    for (const key of binding) {
      keyboardEmitter.on(`keyboard-${key}-up`, callback)
    }
    
    return {
      removeListener () {
        for (const key of binding) {
          keyboardEmitter.removeListener(`keyboard-${key}-up`, callback)
        }
      },
    }
  },

  
  onAnyButtonPress (callback: () => void) {
    keyboardEmitter.on(`keyboard-any`, callback)
    
    return {
      removeListener () {
        keyboardEmitter.removeListener(`keyboard-any`, callback)
      },
    }
  },
}
