class Thing {
  constructor (x, y, velocity) {
    this.pos = createVector(x, y)
    this.velocity = velocity
  }

  tick () {
    this.pos.add(this.velocity)
    if (this.pos.x > windowWidth) {this.pos.x = 0}
    else if (this.pos.x < 0) {this.pos.x = windowWidth}
    if (this.pos.y > windowHeight) {this.pos.y = 0}
    else if (this.pos.y < 0) {this.pos.y = windowHeight}
  }
}