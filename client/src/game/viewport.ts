export const viewport = new class Viewport {
  x = 0
  y = 0
  width = 0
  height = 0

  setPosition (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  setSize (width: number, height: number): void {
    this.width = width
    this.height = height
  }
}
