class Particle  {
  constructor (x, y, velocity, size=3, duration=50, color=[255, 200, 0]) {
    this.pos = createVector(x, y)
    this.velocity = velocity
    this.duration = duration
    this.size = size
    this.color = color
    this.alpha = 255
    this.alphaStep = this.alpha / duration
  }

  tick() {
    this.alpha -= this.alphaStep
    this.pos.add(this.velocity)
  }

  render () {
    this.tick()
    push()
      stroke(...this.color, this.alpha)
      strokeWeight(this.size)
      point(this.pos.x, this.pos.y)
    pop()  
  }
}