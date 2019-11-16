class Ship extends PolygonThing {
  constructor(
    size = 10,
    maxAcceleration = 0.1,
    maxSpeed = 10,
    speedConservation = 0.999,
    health = 3,
    hitCooldown = 500) {
    super(
      windowWidth / 2,
      windowHeight / 2,
      createVector(0, 0),
      [createVector(-size, size), createVector(size, size), createVector(0, -size)])
    this.size = size
    this.maxAcceleration = maxAcceleration
    this.maxSpeed = maxSpeed
    this.speedConservation = speedConservation
    this.health = health
    this.hitCooldown = hitCooldown
    this.currentHitCooldown = 0
    this.heading = 0
    this.rotation = 0
    this.acceleration = 0
    this.maxSpeed = 10
    this.isShooting = false
    this.gun = new StandardGun()
    this.engine = new EngineThruster(this.pos, this.size)
  }


  tick() {
    this.turn(this.rotation)
    this.accelerate(this.acceleration)
    this.velocity.mult(this.speedConservation)
    if (this.isShooting) this.shoot()
    if (this.currentHitCooldown) --this.currentHitCooldown
    super.tick()
  }

  hit (dmg=1) {
    if (this.currentHitCooldown) return
    this.health -= dmg
    this.currentHitCooldown = this.hitCooldown
  }

  render() {
    this.tick()
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.heading + PI / 2)
    noFill()
    stroke(255)
    triangle(...this.edges.reduce((prev, e) => [...prev, e.x, e.y], []))
    pop()
    this.engine.render(this.acceleration, this.pos.copy(), this.heading)
    this.gun.render()
  }


  turn(theta) { this.heading += theta }

  move(v) {
    this.pos.add(v)
    if (this.pos.x > windowWidth) { this.pos.x = 0 }
    else if (this.pos.x < 0) { this.pos.x = windowWidth }
    if (this.pos.y > windowHeight) { this.pos.y = 0 }
    else if (this.pos.y < 0) { this.pos.y = windowHeight }
  }

  shoot() {
    this.gun.shoot(this.pos.copy(), this.heading)
  }

  accelerate(amount) {
    const scalar = this.maxAcceleration * amount
    this.velocity.add(p5.Vector.fromAngle(this.heading).mult(scalar))
    if (this.velocity.mag() > this.maxSpeed) { this.velocity.setMag(this.maxSpeed) }
  }
}


