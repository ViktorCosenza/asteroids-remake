class MachineGun {
  constructor(dmg=0.1, range=50, velocity=5, cooldown=2, ammo=Infinity, bulletColor=[255, 200, 0]) {
    this.dmg = dmg
    this.range = range
    this.velocity = velocity
    this.cooldown = cooldown
    this.currentCooldown = 0
    this.bullets = []
    this.ammo = ammo
    this.bulletColor = bulletColor
    this.bulletSize = 2
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
      new StandardBullet(this.dmg, this.range, this.velocity, position, heading + random_float(0, 0.1), this.bulletColor, this.bulletSize)
    ]
    this.currentCooldown = this.cooldown
  }
}