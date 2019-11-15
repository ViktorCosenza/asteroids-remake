class Particle extends Thing {
  constructor (x, y, velocity, size=3, duration=50) {
    super(x, y, velocity)
    this.duration = duration
    this.size = size
    this.alpha = 255
    this.alphaStep = this.alpha / duration
  }

  tick() {
    this.alpha -= this.alphaStep
    super.tick()
  }

  render () {
    this.tick()
    push()
      stroke(255, 200, 0, this.alpha)
      strokeWeight(this.size)
      point(this.pos.x, this.pos.y)
    pop()  
  }
}