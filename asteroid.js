function genJitteredEllipse(n, size, jitter) {
  const e = Array(n).fill(0).map((e, idx) => {
    const theta = map(idx, 0, n, 0, TWO_PI)
    const x = size * cos(theta) + random(-jitter, jitter)
    const y = size * sin(theta) + random(-jitter, jitter)
    return [x, y]
  })
  console.log(e)
  return e
}

const Asteroid = function (x, y, size=10, edges=10, jitter=15, velocity=5) {
  this.size = size  
  this.velocity = velocity
  this.heading = p5.Vector.random2D()
  this.pos = createVector(x, y)

  this.edges = genJitteredEllipse(edges, size, jitter)

  this.tick = () => {
    this.move(this.velocity)
  }

  this.render = () => {
    push()
    translate(this.pos.x, this.pos.y)
    noFill()
    stroke(255)
    beginShape()
    this.edges.map(e => vertex(...e))
    endShape(CLOSE)
    pop()
  }

  this.move = v => {
    this.pos.add(v)
    if (this.pos.x > windowWidth) {this.pos.x = 0}
    else if (this.pos.x < 0) {this.pos.x = windowWidth}
    if (this.pos.y > windowHeight) {this.pos.y = 0}
    else if (this.pos.y < 0) {this.pos.y = windowHeight}
  }

}