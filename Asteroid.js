class Asteroid extends PolygonThing {
  constructor (x, y, size=10, edges=10, jitter=15, velocity=0.1) {
    super(
      x, 
      y, 
      p5.Vector.random2D().setMag(random(velocity)),
      genJitteredEllipse(edges, size, jitter)
      )
    this.size = size  
  }

  render() {
    this.tick()
    push()
    translate(this.pos.x, this.pos.y)
    noFill()
    stroke(255)
    beginShape()
    this.edges.forEach(p => {
      vertex(p.x, p.y)
    })
    endShape(CLOSE)
    pop()
  }
}
