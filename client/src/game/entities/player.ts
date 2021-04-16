import { GameObject } from "../object"
import * as draw from "../draw"
import { keyboard } from "../input"
import { viewport } from "../viewport"
import { OBJECT_TAGS } from "../../constants"

export const Player = () => new class Player extends GameObject {
  speed = 10
  gravity = 0.8
  hAcceleration = 0
  vAcceleration = 0
  maxVAcceleration = 25
  jumpSpeed = 18
  climbingSpeed = 5
  isClimbingLadder = false
  canJump = false

  constructor () {
    super((delta) => {
      this.hAcceleration = this.speed * delta
      this.vAcceleration += this.gravity * delta
    
      const triggers = this.getBoxTriggers()
    
      const isOnLadder = triggers.some(({ tags }) => tags.includes(OBJECT_TAGS.LADDER))
    
      if (!isOnLadder) this.isClimbingLadder = false
    
      const climbingDirection = -keyboard.getButtonDown(keyboard.bindings.up) +keyboard.getButtonDown(keyboard.bindings.down)
    
      if (isOnLadder) {
        if (climbingDirection !== 0) this.isClimbingLadder = true
      } else {
        this.isClimbingLadder = false
      }
    
      if (this.isClimbingLadder) {
        this.vAcceleration = climbingDirection * this.climbingSpeed
        this.hAcceleration /= 2
      } else if (this.vAcceleration > this.maxVAcceleration) {
        this.vAcceleration = this.maxVAcceleration
      }
    
      const isInsidePlatform = this.getBoxCollider()?.tags.includes(OBJECT_TAGS.PLATFORM)
      const groundCollider = this.getBoxCollider({ y: this.vAcceleration })

      // Will hit ground
      if (
        groundCollider !== null && 
        this.vAcceleration > 0 &&
        !(this.isClimbingLadder && groundCollider.tags.includes(OBJECT_TAGS.PLATFORM)) &&
        !isInsidePlatform
      ) {
        this.vAcceleration = 0
        this.y = groundCollider.y - this.height
        this.canJump = true
      } else {
        this.canJump = false
      }
    
      this.y += this.vAcceleration
    
      const hDirection = -keyboard.getButtonDown(keyboard.bindings.right) +keyboard.getButtonDown(keyboard.bindings.left)
    
      this.x -= this.hAcceleration * hDirection
    
      viewport.x = this.x - (this.width / 2) - (viewport.width / 2)
    
      return () => {
        draw.rect(this.x, this.y, this.width, this.height)
      }
    })
    
    this.setSize(50, 50)
    this.canCollide = true

    keyboard.onButtonPress(keyboard.bindings.jump, () => {
      const isOnGround = this.getBoxCollider({ y: 1 })

      if (isOnGround && this.canJump) {
        this.vAcceleration = -this.jumpSpeed
        this.canJump = false
      }
    })

    keyboard.onButtonPress(keyboard.bindings.down, () => {
      const isOnPlatform = this.getBoxCollider({ y: 1 })?.tags.includes(OBJECT_TAGS.PLATFORM)

      if (isOnPlatform) {
        this.y++
      }
    })
  }
}
