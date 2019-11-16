class StandardGun {
  constructor(dmg = 1, range = 100, velocity = 10, cooldown = 30, ammo = Infinity) {
    this.dmg = dmg
    this.range = range
    this.velocity = velocity
    this.cooldown = cooldown
    this.currentCooldown = 0
    this.bullets = []
    this.ammo = ammo
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
    let hits = this.bullets.reduce((prev, bullet) => {    
      const idx = asteroids.findIndex(a => collidePointPoly(bullet.pos.x, bullet.pos.y, a.globalEdges))
      if (idx < 0) return prev
      return [...prev, idx]  
    }, []
    )
    if (hits) console.log(hits)
    return hits
  }

  shoot(position, heading) {
    if (!this.ammo)
      return
    if (this.currentCooldown > 0)
      return

    this.bullets = [
      ...this.bullets,
      new StandardBullet(this.dmg, this.range, this.velocity, position, heading)
    ]
    this.currentCooldown = this.cooldown
  }
}

class StandardBullet {
  constructor(dmg, range, velocity, position, heading) {
    this.dmg = dmg
    this.range = range
    this.velocity = p5.Vector.fromAngle(heading).mult(velocity)
    this.pos = position
  }

  tick() {
    --this.range
    this.pos.add(this.velocity)
  }

  render() {
    const lineDest = this.velocity.copy().mult(1.5).add(this.pos)
    this.tick()
    push()
    stroke(255)
    strokeWeight(2)
    point(this.pos)
    pop()
  }
}