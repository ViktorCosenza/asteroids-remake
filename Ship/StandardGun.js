class StandardGun {
  constructor(dmg=1, range=100, velocity=10, cooldown=30, ammo=Infinity, bulletColor=[200, 255, 100], bulletSize=2) {
    this.dmg = dmg
    this.range = range
    this.velocity = velocity
    this.cooldown = cooldown
    this.currentCooldown = 0
    this.bullets = []
    this.ammo = ammo
    this.bulletColor = bulletColor
    this.size = bulletSize
  }

  tick() {
    --this.currentCooldown
    this.bullets = this.bullets.filter(b => {
      b.render()
      return b.range > 0
    })
  }

  render() {
    this.tick()
  }

  checkHit(asteroids) {
    this.bullets = this.bullets.filter(b => {
      const hitAsteroid = asteroids.find(a => collidePointPoly(b.pos.x, b.pos.y, a.globalEdges))
      
      if (hitAsteroid)
        hitAsteroid.hit(this.dmg)
      return !hitAsteroid
    })
  }

  shoot(position, heading) {
    if (!this.ammo)
      return
    if (this.currentCooldown > 0)
      return

    this.bullets = [
      ...this.bullets,
      new StandardBullet(this.dmg, this.range, this.velocity, position, heading, this.bulletColor, this.size)
    ]
    this.currentCooldown = this.cooldown
  }
}

class StandardBullet {
  constructor(dmg, range, velocity, position, heading, color, size=1) {
    this.dmg = dmg
    this.range = range
    this.velocity = p5.Vector.fromAngle(heading).mult(velocity)
    this.pos = position
    this.color = color
    this.size = size
  }

  tick() {
    --this.range
    this.pos.add(this.velocity)
  }

  render() {
    this.tick()
    push()
    stroke(...this.color)
    strokeWeight(this.size)
    point(this.pos)
    pop()
  }
}