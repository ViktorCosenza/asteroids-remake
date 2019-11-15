class Asteroid extends Thing {
  constructor (x, y, size=10, edges=10, jitter=15, velocity=0.1) {
    super(x, y, p5.Vector.random2D().setMag(random(velocity)))
    this.size = size  
    this.edges = genJitteredEllipse(edges, size, jitter)
  }

  render() {
    this.tick()
    push()
    translate(this.pos.x, this.pos.y)
    noFill()
    stroke(255)
    beginShape()
    this.edges.map(e => vertex(...e))
    endShape(CLOSE)
    pop()
  }
}
