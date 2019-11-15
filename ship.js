const Ship = function (
    size=10, 
    maxAcceleration=0.1, 
    maxSpeed=10,
    speedConservation=0.999) {
  this.pos = createVector(width/2, height/2)
  this.size = size
  this.maxAcceleration = maxAcceleration
  this.maxSpeed = maxSpeed
  this.speedConservation = speedConservation
  this.heading = 0
  this.rotation = 0

  this.acceleration = 0
  this.maxSpeed = 10
  this.velocity = createVector(0, 0)

  this.tick = () => {
    this.turn(this.rotation)
    this.accelerate(this.acceleration)
    this.move(this.velocity)
    this.velocity.mult(this.speedConservation)
  }

  this.render = () => {
    this.tick()

    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.heading + PI/2)
    noFill()
    stroke(255)
    triangle(-this.size, this.size, this.size, this.size, 0, -this.size)
    pop()
  }

  this.turn = theta => this.heading += theta
  this.move = v => {
    this.pos.add(v)
    if (this.pos.x > windowWidth) {this.pos.x = 0}
    else if (this.pos.x < 0) {this.pos.x = windowWidth}
    if (this.pos.y > windowHeight) {this.pos.y = 0}
    else if (this.pos.y < 0) {this.pos.y = windowHeight}
  }
  
  this.accelerate = amount => {
    const scalar = this.maxAcceleration * amount
    this.velocity.add(p5.Vector.fromAngle(this.heading).mult(scalar))
    if (this.velocity.mag() > this.maxSpeed) {this.velocity.setMag(this.maxSpeed)}
  }
}