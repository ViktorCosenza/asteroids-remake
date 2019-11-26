class Asteroid extends PolygonThing {
  constructor({ x, y, size = 10, edges = 10, jitter = 15, velocity = 0.1, health = 1, numBreakups = 3, breakupsRemaining = 3}) {
    super(
      x,
      y,
      p5.Vector.random2D().setMag(random(velocity)),
      genJitteredEllipse(edges, size, jitter)
    )
    this.numBreakups = numBreakups
    this.breakupsRemaining = breakupsRemaining
    this.numEdges = edges
    this.size = size
    this.jitter = jitter
    this.health = health
    this.destroyed = false
    this.size = size
  }

  hit(dmg) {
    this.health -= dmg
    if (this.health < 1) this.destroyed = true
  }

  breakup() {
    if (this.breakupsRemaining === 0) return []
    return Array(this.breakupsRemaining).fill(0).map(e => 
      new Asteroid({
        x: this.pos.x + random(-this.size, this.size),
        y: this.pos.y + random(-this.size, this.size),
        size: random(this.size / 3, this.size/1.5),
        edges: this.numEdges + random(-this.numEdges/2, +this.numEdges/2) | 1,
        jitter: this.jitter + random(-this.jitter/2, this.jitter/2),
        velocity: this.velocity.mag(),
        health: random(1, this.health / 2) | 1,
        numBreakups: this.numBreakups - 1,
        breakupsRemaining: this.breakupsRemaining - 1
      }))
  }

  render() {
    this.tick()
    push()
    translate(this.pos.x, this.pos.y)
    noFill()
    stroke(255)
    beginShape(),
    this.edges.forEach(p => vertex(p.x, p.y))
    endShape(CLOSE)
    pop()
  }
}
