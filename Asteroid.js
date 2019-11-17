class Asteroid extends PolygonThing {
  constructor({ x, y, size = 10, edges = 10, jitter = 15, velocity = 0.1, health = 1 }) {
    super(
      x,
      y,
      p5.Vector.random2D().setMag(random(velocity)),
      genJitteredEllipse(edges, size, jitter)
    )
    this.health = health
    this.destroyed = false
    this.size = size
  }

  hit(dmg) {
    this.health -= dmg
    if (this.health < 1) this.destroyed = true
  }

  breakup(numAsteroids = 0) {
    if (numAsteroids === 0) numAsteroids = random(1, this.size/4) | 1
    return Array(2).fill(0).map(e => 
      new Asteroid({
        x: this.x + random(-this.size, this.size),
        y: this.y + random(-this.size, this.size),
        size: random(this.size / 2),
        edges: random(this.edges / 2) | 1,
        jitter: random(this.jitter),
        velocity: random(this.velocity),
        health: random(1, this.health / 2) | 1
      }))
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
